# 🚀 Bootstrap de Infraestructura con Terraform

Este documento explica cómo hacer el **primer despliegue** de tu infraestructura, resolviendo el problema del "huevo o gallina" entre OIDC y Terraform.

## 🐔🥚 El Problema

Para usar OIDC necesitas un IAM Role, pero para crear el Role necesitas ejecutar Terraform con credenciales AWS...

```
┌─────────────────────────────────────────┐
│  Para crear OIDC Role → Terraform       │
│  Para Terraform con OIDC → OIDC Role    │
│  Pero OIDC Role no existe... 🤔         │
└─────────────────────────────────────────┘
```

## ✅ La Solución: Bootstrap en 2 Fases

El workflow ya está configurado para detectar automáticamente si usar IAM User o OIDC Role.

---

## 📋 Fase 1: Bootstrap Inicial (Primera Vez)

### Paso 1: Crear Infraestructura Base

```bash
# Variables
REGION="mexico-central-1"
STATE_BUCKET="tu-nombre-terraform-state"  # Cambiar!
LOCK_TABLE="terraform-locks"

# 1. Crear bucket S3 para Terraform state
aws s3 mb s3://${STATE_BUCKET} --region ${REGION}

# 2. Habilitar versionado
aws s3api put-bucket-versioning \
  --bucket ${STATE_BUCKET} \
  --versioning-configuration Status=Enabled \
  --region ${REGION}

# 3. Habilitar encriptación
aws s3api put-bucket-encryption \
  --bucket ${STATE_BUCKET} \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }'

# 4. Bloquear acceso público
aws s3api put-public-access-block \
  --bucket ${STATE_BUCKET} \
  --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

# 5. Crear tabla DynamoDB para locks
aws dynamodb create-table \
  --table-name ${LOCK_TABLE} \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region ${REGION}
```

### Paso 2: Crear IAM User (Temporal para Bootstrap)

```bash
# 1. Crear usuario
aws iam create-user --user-name github-actions-terraform-bootstrap

# 2. Crear access key
aws iam create-access-key --user-name github-actions-terraform-bootstrap

# 📝 IMPORTANTE: Guarda estos valores, los necesitarás en GitHub Secrets
# AccessKeyId: AKIA...
# SecretAccessKey: wJal...

# 3. Dar permisos de administrador (temporal)
aws iam attach-user-policy \
  --user-name github-actions-terraform-bootstrap \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
```

### Paso 3: Configurar tu Repositorio GitHub

Edita `terraform/iam.tf` línea 87 con tu repositorio:

```hcl
# Cambiar esto:
values = ["repo:YOUR_GITHUB_ORG/YOUR_REPO:*"]

# Por tu repo real:
values = ["repo:bxyznm/me:*"]  # 👈 Tu usuario/repo
```

### Paso 4: Configurar GitHub Secrets (Bootstrap)

Ve a tu repo → **Settings → Secrets and variables → Actions → Secrets**

**Configurar SOLO estos secrets** (por ahora):

```
TF_AWS_ACCESS_KEY_ID = AKIA...  (del paso 2)
TF_AWS_SECRET_ACCESS_KEY = wJal...  (del paso 2)
TF_STATE_BUCKET = tu-nombre-terraform-state
TF_STATE_LOCK_TABLE = terraform-locks
TF_DOMAIN_NAME = tudominio.com
```

**NO configures todavía**:
- ❌ `TF_AWS_ROLE_ARN` (el role no existe aún)

### Paso 5: Configurar GitHub Variables

**Settings → Secrets and variables → Actions → Variables**

```
TF_AWS_REGION = mexico-central-1
TF_PROJECT_NAME = bryan-portfolio
TF_ENVIRONMENT = production
TF_CREATE_DNS_RECORDS = false
TF_OWNER = Bryan
```

### Paso 6: Ejecutar el Primer Deploy

1. Ve a **GitHub Actions**
2. Selecciona **Terraform Infrastructure**
3. Click **Run workflow**
4. Configurar:
   - **Action**: `plan`
   - **Auto-approve**: ❌ (déjalo desmarcado)
5. Click **Run workflow**

6. **Revisar el plan** - verifica que se vayan a crear:
   - ✅ S3 bucket
   - ✅ CloudFront distribution
   - ✅ ACM certificate
   - ✅ OIDC Provider (`aws_iam_openid_connect_provider.github_actions`)
   - ✅ OIDC Role (`aws_iam_role.github_actions`)
   - ✅ IAM User/Keys (para CI/CD tradicional)

7. Si todo se ve bien, ejecuta de nuevo con:
   - **Action**: `apply`
   - **Auto-approve**: ✅ (marcado)

### Paso 7: Obtener el ARN del OIDC Role

Después del `apply` exitoso:

1. Ve a **GitHub Actions → Summary** del workflow
2. Busca en los outputs:
   ```
   github_actions_role_arn = arn:aws:iam::123456789012:role/bryan-portfolio-github-actions
   ```

3. O descarga el artifact `terraform-outputs` y lee:
   ```bash
   cat terraform-outputs/terraform-outputs.json | grep github_actions_role_arn
   ```

---

## 🔄 Fase 2: Migrar a OIDC (Más Seguro)

Una vez que el Role existe, migra a OIDC:

### Paso 1: Agregar el Role ARN a GitHub Secrets

**Settings → Secrets and variables → Actions → Secrets → New repository secret**

```
Name: TF_AWS_ROLE_ARN
Value: arn:aws:iam::123456789012:role/bryan-portfolio-github-actions
```

### Paso 2: Probar OIDC

1. **GitHub Actions → Terraform Infrastructure → Run workflow**
2. **Action**: `plan`
3. Click **Run workflow**

4. **Verificar en los logs**:
   ```
   Configure AWS credentials (OIDC)
   Assuming role with OIDC
   Role ARN: arn:aws:iam::123456789012:role/bryan-portfolio-github-actions
   ✅ Successfully assumed role
   ```

5. Si dice `Configure AWS credentials (IAM User - Bootstrap)`, el role ARN no está configurado correctamente

### Paso 3: Limpiar (Opcional pero Recomendado)

Una vez que OIDC funciona, puedes:

**Opción A: Eliminar completamente el IAM User de bootstrap**

```bash
# 1. Listar access keys
aws iam list-access-keys --user-name github-actions-terraform-bootstrap

# 2. Eliminar access key
aws iam delete-access-key \
  --user-name github-actions-terraform-bootstrap \
  --access-key-id AKIA...

# 3. Quitar política
aws iam detach-user-policy \
  --user-name github-actions-terraform-bootstrap \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess

# 4. Eliminar usuario
aws iam delete-user --user-name github-actions-terraform-bootstrap
```

**Opción B: Mantener el IAM User como backup**

```bash
# Solo eliminar el secret de GitHub (mantén el user en AWS por si acaso)
# Settings → Secrets → TF_AWS_ACCESS_KEY_ID → Remove
# Settings → Secrets → TF_AWS_SECRET_ACCESS_KEY → Remove
```

---

## 🎯 Cómo Funciona el Workflow Híbrido

El workflow detecta automáticamente qué método usar:

```yaml
# Si TF_AWS_ROLE_ARN está vacío → Usa IAM User (Bootstrap)
- name: Configure AWS credentials (IAM User - Bootstrap)
  if: secrets.TF_AWS_ROLE_ARN == ''
  uses: aws-actions/configure-aws-credentials@v4
  with:
    aws-access-key-id: ${{ secrets.TF_AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.TF_AWS_SECRET_ACCESS_KEY }}

# Si TF_AWS_ROLE_ARN existe → Usa OIDC (Producción)
- name: Configure AWS credentials (OIDC)
  if: secrets.TF_AWS_ROLE_ARN != ''
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: ${{ secrets.TF_AWS_ROLE_ARN }}
```

**Flujo**:
```
Primera ejecución → No hay TF_AWS_ROLE_ARN → Usa IAM User → Crea OIDC Role
Segunda ejecución → Existe TF_AWS_ROLE_ARN → Usa OIDC → Más seguro ✅
```

---

## 📊 Checklist Completo

### Fase 1: Bootstrap
- [ ] Crear bucket S3 para Terraform state
- [ ] Crear tabla DynamoDB para locks
- [ ] Crear IAM User temporal con access keys
- [ ] Editar `iam.tf` con tu repo de GitHub
- [ ] Configurar GitHub Secrets (IAM User)
- [ ] Configurar GitHub Variables
- [ ] Ejecutar workflow con `action=plan`
- [ ] Revisar que se cree el OIDC Provider y Role
- [ ] Ejecutar workflow con `action=apply`
- [ ] Guardar el ARN del OIDC Role

### Fase 2: Migración a OIDC
- [ ] Agregar `TF_AWS_ROLE_ARN` a GitHub Secrets
- [ ] Ejecutar workflow con `action=plan` para probar OIDC
- [ ] Verificar en logs que use OIDC (no IAM User)
- [ ] Eliminar IAM User de bootstrap (opcional)
- [ ] Eliminar secrets de access keys (opcional)

---

## 🔍 Troubleshooting

### Error: "User: arn:aws:iam::xxx:user/github-actions-terraform-bootstrap is not authorized"

**Causa**: El usuario no tiene permisos

**Solución**:
```bash
aws iam attach-user-policy \
  --user-name github-actions-terraform-bootstrap \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
```

### Error: "No valid credential sources found"

**Causa**: Ni IAM User ni OIDC Role están configurados

**Solución**: Verifica que tengas configurado al menos uno:
- `TF_AWS_ACCESS_KEY_ID` + `TF_AWS_SECRET_ACCESS_KEY`
- O `TF_AWS_ROLE_ARN`

### Error: "User: ... is not authorized to perform: sts:AssumeRoleWithWebIdentity"

**Causa**: El OIDC Provider no existe o el repo en `iam.tf` no coincide

**Solución**:
1. Verifica que el OIDC Provider esté creado:
   ```bash
   aws iam list-open-id-connect-providers
   ```

2. Verifica que `iam.tf` línea 87 tenga tu repo correcto:
   ```hcl
   values = ["repo:TU_USUARIO/TU_REPO:*"]
   ```

### Workflow usa IAM User en vez de OIDC

**Causa**: `TF_AWS_ROLE_ARN` no está configurado o está vacío

**Solución**: Verifica el secret:
```
Settings → Secrets → TF_AWS_ROLE_ARN
```

Debe tener un valor como: `arn:aws:iam::123456789012:role/bryan-portfolio-github-actions`

---

## 🎓 Próximos Pasos

Una vez completado el bootstrap:

1. ✅ Configurar DNS (Route53 o manual)
2. ✅ Esperar validación del certificado SSL (5-10 min)
3. ✅ Actualizar workflow de deploy con los outputs:
   ```bash
   AWS_S3_BUCKET = (del output s3_bucket_name)
   AWS_CLOUDFRONT_DISTRIBUTION_ID = (del output cloudfront_distribution_id)
   ```
4. ✅ Probar despliegue de la aplicación
5. ✅ Eliminar IAM User de bootstrap si todo funciona bien

---

## 💡 Por Qué Este Enfoque

**Ventajas**:
- ✅ No necesitas crear el OIDC Role manualmente
- ✅ Todo está en código (Infrastructure as Code)
- ✅ Fácil de reproducir en otras cuentas AWS
- ✅ Transición suave de IAM User → OIDC
- ✅ Workflow híbrido funciona en ambos modos

**Desventajas del bootstrap manual**:
- ❌ Necesitarías crear el OIDC Provider manualmente
- ❌ Necesitarías crear el Role manualmente con la política correcta
- ❌ Difícil de reproducir
- ❌ No es Infrastructure as Code

---

## 📚 Referencias

- [GitHub Actions OIDC with AWS](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)
- [AWS IAM OIDC Identity Providers](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html)
- [Terraform AWS Provider - OIDC](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_openid_connect_provider)
