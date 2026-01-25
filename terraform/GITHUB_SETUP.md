# GitHub Actions - Configuración de Terraform

Esta guía explica cómo configurar GitHub Secrets y Variables para desplegar tu infraestructura de Terraform usando GitHub Actions.

## 📋 Prerequisitos

Antes de usar el workflow, necesitas crear manualmente:

1. **Bucket S3 para Terraform State** (una sola vez)
2. **Tabla DynamoDB para locks** (una sola vez)
3. **Credenciales IAM** con permisos de administrador para Terraform

---

## 🔧 Paso 1: Crear Infraestructura Base para Terraform State

Ejecuta estos comandos en tu terminal local (con AWS CLI configurado):

```bash
# Variables
REGION="mexico-central-1"
STATE_BUCKET="tu-nombre-terraform-state"
LOCK_TABLE="terraform-locks"

# 1. Crear bucket S3 para state
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

echo "✅ Terraform backend infrastructure created!"
echo "State Bucket: ${STATE_BUCKET}"
echo "Lock Table: ${LOCK_TABLE}"
```

---

## 🔐 Paso 2: Crear IAM User para GitHub Actions

```bash
# Crear usuario IAM
aws iam create-user --user-name github-actions-terraform

# Crear access key
aws iam create-access-key --user-name github-actions-terraform

# Guardar el Access Key ID y Secret Access Key que se muestran
```

**Asignar permisos** (opción simple - AdministratorAccess):

```bash
aws iam attach-user-policy \
  --user-name github-actions-terraform \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
```

**O crear una política más restrictiva** (recomendado para producción):

```bash
# Crear archivo policy.json
cat > terraform-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:*",
        "cloudfront:*",
        "acm:*",
        "route53:*",
        "iam:*",
        "dynamodb:*"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::tu-nombre-terraform-state/*"
    }
  ]
}
EOF

# Crear y asignar política
aws iam create-policy \
  --policy-name GitHubActionsTerraformPolicy \
  --policy-document file://terraform-policy.json

aws iam attach-user-policy \
  --user-name github-actions-terraform \
  --policy-arn arn:aws:iam::YOUR_ACCOUNT_ID:policy/GitHubActionsTerraformPolicy
```

---

## 🎯 Paso 3: Configurar GitHub Secrets

Ve a tu repositorio en GitHub:

**Settings → Secrets and variables → Actions → Secrets**

### **SECRETS** (valores sensibles - nunca se muestran)

| Secret Name | Descripción | Ejemplo | Requerido |
|------------|-------------|---------|-----------|
| `TF_AWS_ACCESS_KEY_ID` | AWS Access Key ID del usuario IAM | `AKIAIOSFODNN7EXAMPLE` | ✅ |
| `TF_AWS_SECRET_ACCESS_KEY` | AWS Secret Access Key del usuario IAM | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` | ✅ |
| `TF_STATE_BUCKET` | Nombre del bucket S3 para Terraform state | `tu-nombre-terraform-state` | ✅ |
| `TF_STATE_LOCK_TABLE` | Nombre de la tabla DynamoDB para locks | `terraform-locks` | ✅ |
| `TF_DOMAIN_NAME` | Tu dominio (ej: example.com) | `miportfolio.com` | ✅ |
| `TF_ROUTE53_ZONE_ID` | ID de la hosted zone de Route53 | `Z1234567890ABC` | ⚠️ Solo si usas Route53 |

### **VARIABLES** (valores no sensibles - se pueden ver)

**Settings → Secrets and variables → Actions → Variables**

| Variable Name | Descripción | Valor por defecto | Ejemplo |
|--------------|-------------|-------------------|---------|
| `TF_AWS_REGION` | Región de AWS | `mexico-central-1` | `mexico-central-1` |
| `TF_PROJECT_NAME` | Nombre del proyecto | `sre-portfolio` | `my-portfolio` |
| `TF_ENVIRONMENT` | Ambiente | `production` | `production` |
| `TF_STATE_KEY` | Key del state en S3 | `portfolio/terraform.tfstate` | `prod/terraform.tfstate` |
| `TF_CREATE_DNS_RECORDS` | Crear registros DNS en Route53 | `false` | `true` o `false` |
| `TF_OWNER` | Dueño del proyecto | `DevOps Team` | `Bryan` |
| `TF_PURPOSE` | Propósito del proyecto | `Personal Portfolio` | `Personal Website` |

---

## 🚀 Paso 4: Usar el Workflow

### **Opción A: Ejecución Manual**

1. Ve a tu repositorio en GitHub
2. Click en **Actions**
3. Selecciona **Terraform Infrastructure**
4. Click en **Run workflow**
5. Selecciona la acción:
   - **plan** → Ver cambios sin aplicar
   - **apply** → Desplegar infraestructura
   - **destroy** → Destruir infraestructura
6. Marca **auto_approve** si no quieres aprobación manual
7. Click en **Run workflow**

### **Opción B: Automático en Push**

El workflow se ejecuta automáticamente (solo `plan`) cuando:
- Haces push a `main`
- Modificas archivos en `terraform/`
- Modificas `.github/workflows/terraform.yml`

---

## 📊 Outputs del Workflow

Después de un `apply` exitoso, el workflow genera:

### **GitHub Actions Summary**
- Outputs de Terraform (S3 bucket, CloudFront ID, etc.)
- Instrucciones para configurar GitHub Secrets del deploy
- Resultados de cada paso

### **Artifacts**
- `terraform-plan` → Plan de Terraform (7 días)
- `terraform-outputs` → Outputs en JSON y archivos de texto (90 días)

Para usar estos outputs en el workflow de deploy:

```bash
# Descargar artifact manualmente
gh run download RUN_ID -n terraform-outputs

# O desde otro workflow
- uses: actions/download-artifact@v4
  with:
    name: terraform-outputs
```

---

## 🔒 Seguridad

### **Buenas Prácticas**

1. **Nunca hagas commit de**:
   - `terraform.tfvars` (en `.gitignore`)
   - `backend.hcl` (creado dinámicamente)
   - Access keys o secrets

2. **Usa auto_approve con cuidado**:
   - Solo en ambientes de desarrollo
   - Siempre revisa el plan primero
   - En producción, requiere aprobación manual

3. **Rotación de credenciales**:
   ```bash
   # Rotar access key del usuario
   aws iam create-access-key --user-name github-actions-terraform
   # Actualizar secrets en GitHub
   # Eliminar key antigua
   aws iam delete-access-key --user-name github-actions-terraform --access-key-id OLD_KEY_ID
   ```

4. **Considera usar OIDC** (más seguro, sin access keys de larga duración):
   - Ver [GitHub OIDC con AWS](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)

---

## 🐛 Troubleshooting

### Error: "Backend initialization required"
```bash
# El workflow ejecuta 'terraform init' automáticamente
# Si falla, revisa que TF_STATE_BUCKET y TF_STATE_LOCK_TABLE existan
```

### Error: "Access Denied" en S3
```bash
# Verifica que el IAM user tenga permisos en el bucket
aws s3 ls s3://tu-nombre-terraform-state --profile github-actions
```

### Error: "Certificate validation timeout"
```bash
# El certificado ACM tarda ~5-10 min en validarse
# Si usas Route53, es automático
# Si no, agrega los registros DNS manualmente
```

### Ver logs detallados
```bash
# Los logs completos están en GitHub Actions
# También puedes habilitar TF_LOG en el workflow:
# env:
#   TF_LOG: DEBUG
```

---

## 📝 Ejemplo Completo de Configuración

```bash
# GitHub Secrets
TF_AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
TF_AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
TF_STATE_BUCKET=bryan-terraform-state
TF_STATE_LOCK_TABLE=terraform-locks
TF_DOMAIN_NAME=bryanportfolio.com
TF_ROUTE53_ZONE_ID=Z1234567890ABC

# GitHub Variables
TF_AWS_REGION=mexico-central-1
TF_PROJECT_NAME=bryan-portfolio
TF_ENVIRONMENT=production
TF_STATE_KEY=portfolio/terraform.tfstate
TF_CREATE_DNS_RECORDS=true
TF_OWNER=Bryan
TF_PURPOSE=Personal Portfolio
```

---

## 🎓 Recursos Adicionales

- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [GitHub Actions - Terraform](https://developer.hashicorp.com/terraform/tutorials/automation/github-actions)
- [AWS S3 Backend](https://developer.hashicorp.com/terraform/language/settings/backends/s3)
- [Terraform Best Practices](https://www.terraform-best-practices.com/)

---

## ✅ Checklist

- [ ] Crear bucket S3 para Terraform state
- [ ] Crear tabla DynamoDB para locks
- [ ] Crear IAM user con access key
- [ ] Configurar todos los GitHub Secrets requeridos
- [ ] Configurar GitHub Variables opcionales
- [ ] Ejecutar workflow con action=plan
- [ ] Revisar el plan
- [ ] Ejecutar workflow con action=apply
- [ ] Verificar outputs en GitHub Actions
- [ ] Configurar DNS si no usas Route53
- [ ] Actualizar secrets del workflow de deploy con los outputs
