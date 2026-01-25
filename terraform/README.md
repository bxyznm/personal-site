# Terraform Infrastructure

Este directorio contiene la infraestructura como código (IaC) para desplegar tu portfolio en AWS usando:

- **S3** → Hosting de archivos estáticos
- **CloudFront** → CDN global con SSL
- **ACM** → Certificado SSL/TLS gratuito
- **Route53** → DNS management (opcional)
- **IAM** → Permisos para CI/CD

## 🚀 Inicio Rápido

### Opción 1: Desplegar con GitHub Actions (Recomendado)

**Primera vez? Lee [BOOTSTRAP.md](./BOOTSTRAP.md)** - Explica cómo resolver el problema del "huevo o gallina" entre OIDC y Terraform.

#### Resumen del Bootstrap (2 Fases):

```
Fase 1 (Bootstrap) → IAM User → Crea infraestructura + OIDC Role
Fase 2 (Producción) → OIDC Role → Más seguro ✅
```

1. **Bootstrap inicial**:
   - Ver [BOOTSTRAP.md](./BOOTSTRAP.md) para instrucciones paso a paso
   - Crear bucket S3 y tabla DynamoDB
   - Crear IAM User temporal
   - Ejecutar primer deploy (crea OIDC Role)

2. **Migrar a OIDC**:
   - Agregar `TF_AWS_ROLE_ARN` secret con el ARN del role creado
   - El workflow cambia automáticamente a OIDC
   - Eliminar IAM User de bootstrap (opcional)

3. **Uso diario**:
   - GitHub → Actions → Terraform Infrastructure → Run workflow
   - Seleccionar action: `plan`, `apply`, o `destroy`

### Opción 2: Desplegar Localmente

1. **Configurar backend**:
   ```bash
   cp backend.hcl.example backend.hcl
   # Editar backend.hcl con tus valores
   ```

2. **Configurar variables**:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   # Editar terraform.tfvars con tu dominio y configuración
   ```

3. **Desplegar**:
   ```bash
   terraform init -backend-config=backend.hcl
   terraform plan
   terraform apply
   ```

## 📁 Estructura de Archivos

```
terraform/
├── main.tf              # Configuración principal y providers
├── variables.tf         # Variables de entrada
├── s3.tf               # Bucket S3 para hosting
├── cloudfront.tf       # Distribución CDN
├── acm.tf              # Certificado SSL
├── route53.tf          # DNS (opcional)
├── iam.tf              # Permisos CI/CD
├── outputs.tf          # Outputs de la infraestructura
├── terraform.tfvars.example   # Ejemplo de variables
├── backend.hcl.example        # Ejemplo de backend
├── README.md                  # Este archivo
└── GITHUB_SETUP.md           # Guía de GitHub Actions
```

## 🔧 Configuración

### Variables Requeridas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `domain_name` | Tu dominio | `example.com` |

### Variables Opcionales

| Variable | Default | Descripción |
|----------|---------|-------------|
| `aws_region` | `us-east-1` | Región principal (cambia a `mexico-central-1`) |
| `project_name` | `sre-portfolio` | Nombre del proyecto |
| `environment` | `production` | Ambiente |
| `create_dns_records` | `false` | Crear registros en Route53 |
| `route53_zone_id` | `""` | ID de hosted zone |

## 📊 Outputs Importantes

Después de `terraform apply`:

```bash
# Ver todos los outputs
terraform output

# Outputs clave
terraform output s3_bucket_name                    # Nombre del bucket
terraform output cloudfront_distribution_id        # ID de CloudFront
terraform output website_url                       # URL del sitio
terraform output github_secrets_summary            # Resumen para GitHub
terraform output dns_configuration                 # Config DNS
```

## 🔐 Seguridad

### Archivos Sensibles (NO hacer commit)

- `terraform.tfvars` → Contiene tu dominio y configuración
- `backend.hcl` → Contiene nombres de bucket/tabla
- `*.tfstate` → Estado de Terraform
- Access keys o secretos

Todos están en `.gitignore` ✅

### Backend Remoto

El state de Terraform se guarda en S3 con:
- ✅ Versionado habilitado
- ✅ Encriptación en reposo
- ✅ Locks con DynamoDB
- ✅ Acceso bloqueado públicamente

## 🛠️ Comandos Útiles

```bash
# Ver el plan sin aplicar
terraform plan

# Aplicar cambios
terraform apply

# Ver recursos actuales
terraform show

# Ver outputs
terraform output

# Formatear código
terraform fmt -recursive

# Validar configuración
terraform validate

# Destruir toda la infraestructura (⚠️ CUIDADO)
terraform destroy

# Actualizar providers
terraform init -upgrade

# Cambiar workspace (para múltiples ambientes)
terraform workspace new staging
terraform workspace select production
```

## 🌍 Región México

Para desplegar en la región de México (`mexico-central-1`):

1. **En terraform.tfvars**:
   ```hcl
   aws_region = "mexico-central-1"
   ```

2. **En backend.hcl**:
   ```hcl
   region = "mexico-central-1"
   ```

3. **En GitHub Variables**:
   ```
   TF_AWS_REGION = mexico-central-1
   ```

**Nota**: El certificado ACM para CloudFront SIEMPRE debe estar en `us-east-1`. Esto es un requisito de AWS y ya está manejado en `main.tf` con el provider alias `us_east_1`.

## 🔄 Workflow de Desarrollo

1. **Desarrollo local**:
   ```bash
   # Hacer cambios en archivos .tf
   terraform fmt
   terraform validate
   terraform plan
   ```

2. **Commit y push**:
   ```bash
   git add terraform/
   git commit -m "feat: update cloudfront cache policy"
   git push
   ```

3. **GitHub Actions ejecuta automáticamente**:
   - ✅ Lint y format check
   - ✅ Plan (muestra cambios)
   - ⏸️ Requiere aprobación manual para apply

4. **Aplicar cambios**:
   - Opción A: Ejecutar workflow manualmente con `action=apply`
   - Opción B: Aplicar localmente con `terraform apply`

## 📚 Recursos

- [GITHUB_SETUP.md](./GITHUB_SETUP.md) - Configuración completa de GitHub Actions
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS S3 Backend](https://developer.hashicorp.com/terraform/language/settings/backends/s3)
- [CloudFront + S3 Best Practices](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistS3AndCustomOrigins.html)

## ❓ Troubleshooting

### Error: "Backend initialization required"
```bash
# Asegúrate de que el bucket y tabla existan
aws s3 ls s3://tu-nombre-terraform-state
aws dynamodb describe-table --table-name terraform-locks

# Inicializa con backend config
terraform init -backend-config=backend.hcl
```

### Error: Certificate pending validation
```bash
# El certificado ACM puede tardar 5-10 minutos
# Si usas Route53, es automático
# Si no, agrega los registros DNS manualmente:
terraform output dns_configuration
```

### Error: Access Denied
```bash
# Verifica credenciales AWS
aws sts get-caller-identity

# Verifica permisos del usuario/role
aws iam get-user
```

## 💡 Tips

- Usa `terraform plan` antes de cada `apply`
- Revisa los cambios cuidadosamente, especialmente en producción
- Usa workspaces para múltiples ambientes (staging, production)
- Mantén las versiones de providers actualizadas
- Documenta cambios significativos en commits

## 📝 To-Do

- [ ] Configurar infraestructura base (bucket S3, DynamoDB)
- [ ] Crear IAM user para GitHub Actions
- [ ] Configurar GitHub Secrets
- [ ] Ejecutar primer `terraform plan`
- [ ] Revisar y aplicar con `terraform apply`
- [ ] Configurar DNS
- [ ] Validar certificado SSL
- [ ] Probar despliegue completo con GitHub Actions
- [ ] Actualizar secrets del workflow de deploy
