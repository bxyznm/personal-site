# 🚀 Checklist de Deployment Completo

Este documento contiene todos los pasos necesarios para desplegar tu portfolio en AWS con Terraform y GitHub Actions.

---

## 📋 Pre-requisitos

- [ ] Cuenta AWS activa
- [ ] AWS CLI instalado y configurado localmente
- [ ] Repositorio GitHub: `bxyznm/me`
- [ ] Node.js 20+ instalado (para pruebas locales)

---

## 🔧 FASE 1: Preparación de AWS (Línea de Comandos)

### 1.1 Crear Bucket S3 para Terraform State

```bash
# Variables - PERSONALIZA ESTOS VALORES
REGION="mexico-central-1"
STATE_BUCKET="bryan-terraform-state"  # 👈 Cambia esto a algo único
LOCK_TABLE="terraform-locks"

# Crear bucket S3
aws s3 mb s3://${STATE_BUCKET} --region ${REGION}

# Habilitar versionado
aws s3api put-bucket-versioning \
  --bucket ${STATE_BUCKET} \
  --versioning-configuration Status=Enabled \
  --region ${REGION}

# Habilitar encriptación
aws s3api put-bucket-encryption \
  --bucket ${STATE_BUCKET} \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }'

# Bloquear acceso público
aws s3api put-public-access-block \
  --bucket ${STATE_BUCKET} \
  --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

# Verificar
aws s3 ls s3://${STATE_BUCKET}
echo "✅ Bucket S3 creado: ${STATE_BUCKET}"
```

### 1.2 Crear Tabla DynamoDB para Locks

```bash
# Crear tabla
aws dynamodb create-table \
  --table-name ${LOCK_TABLE} \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region ${REGION}

# Esperar a que esté activa (30-60 segundos)
aws dynamodb wait table-exists --table-name ${LOCK_TABLE} --region ${REGION}

# Verificar
aws dynamodb describe-table --table-name ${LOCK_TABLE} --region ${REGION} --query 'Table.TableStatus'
echo "✅ Tabla DynamoDB creada: ${LOCK_TABLE}"
```

### 1.3 Crear IAM User para Bootstrap

```bash
# Crear usuario
aws iam create-user --user-name github-actions-terraform-bootstrap

# Crear access key y GUARDAR LA SALIDA
aws iam create-access-key --user-name github-actions-terraform-bootstrap

# 📝 GUARDAR ESTOS VALORES (los necesitarás en GitHub):
# AccessKeyId: AKIA...
# SecretAccessKey: wJal...

# Dar permisos de administrador (temporal)
aws iam attach-user-policy \
  --user-name github-actions-terraform-bootstrap \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess

echo "✅ IAM User creado con access keys"
echo "⚠️  IMPORTANTE: Guarda AccessKeyId y SecretAccessKey"
```

---

## 🔐 FASE 2: Configurar GitHub Secrets

Ve a tu repositorio: `https://github.com/bxyznm/me/settings/secrets/actions`

### 2.1 Secrets (Valores Sensibles)

Click en **"New repository secret"** para cada uno:

| Name | Value | Dónde obtenerlo |
|------|-------|-----------------|
| `TF_AWS_ACCESS_KEY_ID` | `AKIA...` | Del comando `create-access-key` en Fase 1.3 |
| `TF_AWS_SECRET_ACCESS_KEY` | `wJal...` | Del comando `create-access-key` en Fase 1.3 |
| `TF_STATE_BUCKET` | `bryan-terraform-state` | El nombre que usaste en Fase 1.1 |
| `TF_STATE_LOCK_TABLE` | `terraform-locks` | El nombre que usaste en Fase 1.2 |
| `TF_DOMAIN_NAME` | `tudominio.com` | Tu dominio real (ej: `bryanportfolio.com`) |
| `TF_ROUTE53_ZONE_ID` | `Z123...` | (Opcional) Solo si usas Route53 |

**NO agregues todavía:**
- ❌ `TF_AWS_ROLE_ARN` (el role se creará después)

### 2.2 Variables (Valores Públicos)

Ve a: `https://github.com/bxyznm/me/settings/variables/actions`

Click en **"New repository variable"** para cada uno:

| Name | Value |
|------|-------|
| `TF_AWS_REGION` | `mexico-central-1` |
| `TF_PROJECT_NAME` | `bryan-portfolio` |
| `TF_ENVIRONMENT` | `production` |
| `TF_CREATE_DNS_RECORDS` | `false` (o `true` si usas Route53) |
| `TF_OWNER` | `Bryan` |
| `TF_PURPOSE` | `Personal Portfolio` |

---

## 🏗️ FASE 3: Primer Deployment (Bootstrap)

### 3.1 Ejecutar Terraform Plan

1. Ve a: `https://github.com/bxyznm/me/actions`
2. Click en **"Terraform Infrastructure"** (en el menú izquierdo)
3. Click en **"Run workflow"** (botón azul a la derecha)
4. Configurar:
   - **Use workflow from**: `main`
   - **Terraform action**: `plan`
   - **Auto-approve**: ❌ (dejar desmarcado)
5. Click **"Run workflow"**

### 3.2 Revisar el Plan

1. Espera ~2 minutos a que termine
2. Click en el workflow que se creó
3. Click en el job "Terraform plan"
4. Revisa que se vayan a crear:
   - ✅ `aws_s3_bucket.website`
   - ✅ `aws_cloudfront_distribution.website`
   - ✅ `aws_acm_certificate.website`
   - ✅ `aws_iam_openid_connect_provider.github_actions`
   - ✅ `aws_iam_role.github_actions` 👈 ¡Importante!
   - ✅ `aws_iam_user.cicd`
   - ✅ Otros recursos

### 3.3 Aplicar Terraform

Si el plan se ve bien:

1. **Actions → Terraform Infrastructure → Run workflow**
2. Configurar:
   - **Terraform action**: `apply`
   - **Auto-approve**: ✅ (marcar para aplicar automáticamente)
3. Click **"Run workflow"**
4. Espera ~10-15 minutos (CloudFront tarda)

### 3.4 Guardar Outputs

Cuando termine el `apply`:

1. Ve al **Summary** del workflow
2. Busca la sección **"Terraform Outputs"**
3. **GUARDA estos valores** (los necesitarás):

```
s3_bucket_name = bryan-portfolio-production-website
cloudfront_distribution_id = E1234567890ABC
github_actions_role_arn = arn:aws:iam::123456789012:role/bryan-portfolio-github-actions
website_url = https://tudominio.com
```

4. O descarga el artifact **"terraform-outputs"**

---

## 🔄 FASE 4: Migrar a OIDC (Más Seguro)

### 4.1 Agregar Role ARN a GitHub

1. Copia el `github_actions_role_arn` de la Fase 3.4
2. Ve a: `https://github.com/bxyznm/me/settings/secrets/actions`
3. Click **"New repository secret"**:
   - **Name**: `TF_AWS_ROLE_ARN`
   - **Secret**: `arn:aws:iam::123456789012:role/bryan-portfolio-github-actions`
4. Click **"Add secret"**

### 4.2 Probar OIDC

1. **Actions → Terraform Infrastructure → Run workflow**
2. Configurar:
   - **Terraform action**: `plan`
   - **Auto-approve**: ❌
3. Click **"Run workflow"**

4. **Verificar en los logs** que diga:
   ```
   Configure AWS credentials (OIDC)
   ✅ Assuming role with OIDC
   ```

Si dice "IAM User - Bootstrap", el `TF_AWS_ROLE_ARN` no está configurado.

### 4.3 Limpiar (Opcional)

Una vez que OIDC funciona, puedes eliminar el IAM User:

```bash
# Listar access keys
aws iam list-access-keys --user-name github-actions-terraform-bootstrap

# Eliminar access key (usar el AccessKeyId de la lista)
aws iam delete-access-key \
  --user-name github-actions-terraform-bootstrap \
  --access-key-id AKIA...

# Quitar política
aws iam detach-user-policy \
  --user-name github-actions-terraform-bootstrap \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess

# Eliminar usuario
aws iam delete-user --user-name github-actions-terraform-bootstrap
```

Y eliminar los secrets de GitHub:
- `TF_AWS_ACCESS_KEY_ID`
- `TF_AWS_SECRET_ACCESS_KEY`

---

## 🌐 FASE 5: Configurar DNS

### Opción A: Usas Route53

Si configuraste `TF_CREATE_DNS_RECORDS = true`, **¡ya está listo!** ✅

Verifica:
```bash
dig tudominio.com
dig www.tudominio.com
```

### Opción B: Otro proveedor DNS (GoDaddy, Cloudflare, etc.)

1. **Obtener el dominio de CloudFront**:
   - Del output: `cloudfront_domain_name = d111111abcdef8.cloudfront.net`

2. **Crear registros CNAME** en tu proveedor DNS:

```
Tipo: CNAME
Nombre: @ (o tudominio.com)
Valor: d111111abcdef8.cloudfront.net
TTL: 3600

Tipo: CNAME
Nombre: www
Valor: d111111abcdef8.cloudfront.net
TTL: 3600
```

3. **Validar certificado SSL** (necesario):
   - En AWS Console → Certificate Manager (us-east-1)
   - Click en el certificado
   - Copia los registros CNAME de validación
   - Agrégalos en tu proveedor DNS

```
Tipo: CNAME
Nombre: _abc123.tudominio.com
Valor: _xyz789.acm-validations.aws
```

4. **Esperar validación** (~5-10 minutos):
```bash
# Ver estado
aws acm describe-certificate \
  --certificate-arn arn:aws:acm:us-east-1:123456789012:certificate/abc-123 \
  --region us-east-1 \
  --query 'Certificate.Status'
```

Cuando diga `"ISSUED"`, está listo ✅

---

## 📦 FASE 6: Configurar Deployment de Next.js

### 6.1 Agregar Secrets para Deploy

Los outputs de Terraform ya incluyen estos valores. Agrégalos a GitHub Secrets:

1. Ve a: `https://github.com/bxyznm/me/settings/secrets/actions`
2. Agregar:

| Name | Value | De dónde |
|------|-------|----------|
| `AWS_ACCESS_KEY_ID` | `AKIA...` | Output: `cicd_access_key_id` |
| `AWS_SECRET_ACCESS_KEY` | `wJal...` | Output: `cicd_secret_access_key` |
| `AWS_S3_BUCKET` | `bryan-portfolio-production-website` | Output: `s3_bucket_name` |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | `E1234567890ABC` | Output: `cloudfront_distribution_id` |

3. Agregar Variable:

| Name | Value |
|------|-------|
| `AWS_REGION` | `mexico-central-1` |
| `DOMAIN_NAME` | `tudominio.com` |

**Obtener las credenciales secretas**:
```bash
# Desde tu máquina local en el directorio terraform/
terraform output -raw cicd_access_key_id
terraform output -raw cicd_secret_access_key
```

### 6.2 Probar Deployment

1. Hacer un cambio en el código:
```bash
# Editar cualquier archivo (ej: src/app/page.tsx)
git add .
git commit -m "test: trigger deployment"
git push origin main
```

2. **Actions → Build and Deploy**
3. Verificar que:
   - ✅ Lint pasa
   - ✅ Build pasa
   - ✅ Deploy sube archivos a S3
   - ✅ CloudFront cache se invalida

4. **Verificar el sitio**:
   - Abrir: `https://tudominio.com`
   - Debe cargar el portfolio ✅

---

## ✅ Checklist de Verificación Final

### Infraestructura
- [ ] Bucket S3 para state creado
- [ ] Tabla DynamoDB creada
- [ ] IAM User de bootstrap creado (o OIDC funcionando)
- [ ] Terraform apply exitoso
- [ ] CloudFront distribution activa
- [ ] Certificado SSL validado

### GitHub Configuration
- [ ] Todos los secrets de Terraform configurados
- [ ] Todos los secrets de Deploy configurados
- [ ] Variables configuradas
- [ ] Workflow de Terraform funciona con OIDC
- [ ] Workflow de Deploy funciona

### DNS
- [ ] Registros CNAME creados
- [ ] Certificado SSL validado
- [ ] Dominio resuelve a CloudFront
- [ ] HTTPS funciona

### Aplicación
- [ ] Sitio carga en https://tudominio.com
- [ ] Todas las páginas funcionan
- [ ] Newsletter form funciona (frontend)
- [ ] No hay errores en consola del navegador

---

## 🎯 Resumen de Secrets Necesarios

### Para Terraform (8 secrets + 6 variables)

**Secrets**:
1. `TF_AWS_ACCESS_KEY_ID` (temporal, se puede eliminar después)
2. `TF_AWS_SECRET_ACCESS_KEY` (temporal, se puede eliminar después)
3. `TF_STATE_BUCKET`
4. `TF_STATE_LOCK_TABLE`
5. `TF_DOMAIN_NAME`
6. `TF_ROUTE53_ZONE_ID` (opcional)
7. `TF_AWS_ROLE_ARN` (se agrega después del primer apply)

**Variables**:
1. `TF_AWS_REGION`
2. `TF_PROJECT_NAME`
3. `TF_ENVIRONMENT`
4. `TF_CREATE_DNS_RECORDS`
5. `TF_OWNER`
6. `TF_PURPOSE`

### Para Deploy (4 secrets + 2 variables)

**Secrets**:
1. `AWS_ACCESS_KEY_ID`
2. `AWS_SECRET_ACCESS_KEY`
3. `AWS_S3_BUCKET`
4. `AWS_CLOUDFRONT_DISTRIBUTION_ID`

**Variables**:
1. `AWS_REGION`
2. `DOMAIN_NAME`

---

## 🐛 Troubleshooting Común

### Error: "Bucket already exists"
```bash
# El nombre del bucket debe ser único globalmente
# Cambia STATE_BUCKET a algo único como: bryan-tf-state-$(date +%s)
```

### Error: "Certificate validation timeout"
```bash
# El certificado necesita validación DNS
# Agrega los registros CNAME de validación en tu DNS
# Espera 5-10 minutos
```

### Error: "Access Denied" en S3
```bash
# Verifica que las credenciales sean correctas
aws sts get-caller-identity

# Verifica permisos del usuario
aws iam list-attached-user-policies --user-name github-actions-terraform-bootstrap
```

### Workflow usa IAM User en vez de OIDC
```bash
# Verifica que TF_AWS_ROLE_ARN esté configurado
# Settings → Secrets → TF_AWS_ROLE_ARN
```

### Sitio muestra "Access Denied"
```bash
# CloudFront aún no tiene permisos al bucket
# Espera 5-10 minutos para que se propague
# O invalida cache: aws cloudfront create-invalidation --distribution-id E123 --paths "/*"
```

---

## 📚 Documentación Adicional

- [terraform/BOOTSTRAP.md](terraform/BOOTSTRAP.md) - Proceso detallado de bootstrap
- [terraform/GITHUB_SETUP.md](terraform/GITHUB_SETUP.md) - Configuración de secrets
- [terraform/README.md](terraform/README.md) - Uso diario de Terraform

---

## 🎉 ¡Listo!

Una vez completados todos los pasos, tendrás:

✅ Infraestructura en AWS (región México)
✅ Deploy automático con GitHub Actions
✅ SSL/TLS con CloudFront
✅ State de Terraform en S3
✅ Autenticación OIDC (segura)
✅ Portfolio online en tu dominio

**Próximos pasos**:
- Agregar contenido a tu blog
- Implementar backend para newsletter
- Configurar monitoreo (CloudWatch)
- Agregar analytics (opcional)
