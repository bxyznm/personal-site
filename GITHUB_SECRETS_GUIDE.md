# 🔐 Guía Completa de GitHub Secrets y Variables

Este documento lista **TODOS** los secrets y variables necesarios para los 2 workflows de GitHub Actions.

---

## 📊 Resumen Rápido

| Workflow | Secrets | Variables |
|----------|---------|-----------|
| **Terraform Infrastructure** | 7 secrets | 6 variables |
| **Build and Deploy (Next.js)** | 4 secrets | 2 variables |
| **TOTAL** | 11 secrets únicos | 8 variables únicas |

---

## 🏗️ Workflow 1: Terraform Infrastructure

**Archivo**: `.github/workflows/terraform.yml`

**Propósito**: Crear y gestionar infraestructura AWS (S3, CloudFront, ACM, IAM, etc.)

### Secrets Necesarios

Ve a: `Settings → Secrets and variables → Actions → Secrets → New repository secret`

| # | Name | Descripción | Ejemplo | Cuándo agregarlo |
|---|------|-------------|---------|------------------|
| 1 | `TF_AWS_ACCESS_KEY_ID` | Access Key del IAM User bootstrap | `AKIAIOSFODNN7EXAMPLE` | **Fase 1** (Bootstrap) |
| 2 | `TF_AWS_SECRET_ACCESS_KEY` | Secret Key del IAM User bootstrap | `wJalrXUtnFEMI/K7MDENG...` | **Fase 1** (Bootstrap) |
| 3 | `TF_STATE_BUCKET` | Bucket S3 para Terraform state | `bryan-terraform-state` | **Fase 1** (Bootstrap) |
| 4 | `TF_STATE_LOCK_TABLE` | Tabla DynamoDB para locks | `terraform-locks` | **Fase 1** (Bootstrap) |
| 5 | `TF_DOMAIN_NAME` | Tu dominio principal | `bryanportfolio.com` | **Fase 1** (Bootstrap) |
| 6 | `TF_ROUTE53_ZONE_ID` | ID de hosted zone Route53 | `Z1234567890ABC` | **Fase 1** (Opcional - solo si usas Route53) |
| 7 | `TF_AWS_ROLE_ARN` | ARN del OIDC Role para GitHub | `arn:aws:iam::123456789012:role/...` | **Fase 2** (Después del primer apply) |

### Variables Necesarias

Ve a: `Settings → Secrets and variables → Actions → Variables → New repository variable`

| # | Name | Valor | Descripción |
|---|------|-------|-------------|
| 1 | `TF_AWS_REGION` | `mexico-central-1` | Región AWS principal |
| 2 | `TF_PROJECT_NAME` | `bryan-portfolio` | Nombre del proyecto |
| 3 | `TF_ENVIRONMENT` | `production` | Ambiente (production/staging) |
| 4 | `TF_STATE_KEY` | `portfolio/terraform.tfstate` | Path del state en S3 |
| 5 | `TF_CREATE_DNS_RECORDS` | `false` | Crear DNS en Route53 (true/false) |
| 6 | `TF_OWNER` | `Bryan` | Dueño del proyecto (para tags) |
| 7 | `TF_PURPOSE` | `Personal Portfolio` | Propósito (para tags) |

### Dónde se usan en el código

```yaml
# .github/workflows/terraform.yml

# Secrets
aws-access-key-id: ${{ secrets.TF_AWS_ACCESS_KEY_ID }}          # Línea 55
aws-secret-access-key: ${{ secrets.TF_AWS_SECRET_ACCESS_KEY }}  # Línea 56
role-to-assume: ${{ secrets.TF_AWS_ROLE_ARN }}                  # Línea 64
bucket = "${{ secrets.TF_STATE_BUCKET }}"                       # Línea 75
dynamodb_table = "${{ secrets.TF_STATE_LOCK_TABLE }}"          # Línea 79
domain_name = "${{ secrets.TF_DOMAIN_NAME }}"                   # Línea 85
route53_zone_id = "${{ secrets.TF_ROUTE53_ZONE_ID }}"          # Línea 94

# Variables
aws-region: ${{ env.AWS_REGION }}                               # Línea 57, 65
project_name = "${{ vars.TF_PROJECT_NAME }}"                    # Línea 88
aws_region = "${{ env.AWS_REGION }}"                            # Línea 89
environment = "${{ vars.TF_ENVIRONMENT }}"                      # Línea 90
create_dns_records = ${{ vars.TF_CREATE_DNS_RECORDS }}         # Línea 93
Owner = "${{ vars.TF_OWNER }}"                                  # Línea 98
```

---

## 🚀 Workflow 2: Build and Deploy (Next.js)

**Archivo**: `.github/workflows/deploy.yml`

**Propósito**: Compilar Next.js y desplegar a S3/CloudFront

### Secrets Necesarios

Ve a: `Settings → Secrets and variables → Actions → Secrets → New repository secret`

| # | Name | Descripción | Ejemplo | De dónde obtenerlo |
|---|------|-------------|---------|-------------------|
| 1 | `AWS_ACCESS_KEY_ID` | Access Key para CI/CD deploy | `AKIAIOSFODNN7EXAMPLE` | Output de Terraform: `cicd_access_key_id` |
| 2 | `AWS_SECRET_ACCESS_KEY` | Secret Key para CI/CD deploy | `wJalrXUtnFEMI/K7MDENG...` | Output de Terraform: `cicd_secret_access_key` |
| 3 | `AWS_S3_BUCKET` | Nombre del bucket S3 del sitio | `bryan-portfolio-production-website` | Output de Terraform: `s3_bucket_name` |
| 4 | `AWS_CLOUDFRONT_DISTRIBUTION_ID` | ID de distribución CloudFront | `E1234567890ABC` | Output de Terraform: `cloudfront_distribution_id` |

### Variables Necesarias

Ve a: `Settings → Secrets and variables → Actions → Variables → New repository variable`

| # | Name | Valor | Descripción |
|---|------|-------|-------------|
| 1 | `AWS_REGION` | `mexico-central-1` | Región AWS (debe coincidir con Terraform) |
| 2 | `DOMAIN_NAME` | `bryanportfolio.com` | Tu dominio (para environment URL) |

### Dónde se usan en el código

```yaml
# .github/workflows/deploy.yml

# Secrets
aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}                    # Línea 85
aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}            # Línea 86
s3://${{ secrets.AWS_S3_BUCKET }}                                      # Línea 91, 98
--distribution-id ${{ secrets.AWS_CLOUDFRONT_DISTRIBUTION_ID }}        # Línea 107

# Variables
aws-region: ${{ vars.AWS_REGION || 'us-east-1' }}                     # Línea 87
url: https://${{ vars.DOMAIN_NAME }}                                   # Línea 69
```

---

## 🔄 Cómo Obtener los Valores para Deploy

Los secrets del workflow de **Deploy** se obtienen de los **outputs de Terraform**:

### Método 1: Desde GitHub Actions Summary

Después de ejecutar `terraform apply`:
1. Ve a **Actions → Terraform Infrastructure → Última ejecución**
2. Scroll hasta **"Terraform Outputs"**
3. Copia los valores

### Método 2: Desde la Línea de Comandos

```bash
cd terraform

# Ver todos los outputs
terraform output

# Obtener valores específicos
terraform output s3_bucket_name
terraform output cloudfront_distribution_id

# Obtener secrets (sensibles)
terraform output -raw cicd_access_key_id
terraform output -raw cicd_secret_access_key
```

### Método 3: Desde Artifacts

1. **Actions → Terraform Infrastructure → Última ejecución**
2. Scroll hasta **"Artifacts"**
3. Descargar **terraform-outputs**
4. Leer archivos:
   - `s3-bucket-name.txt`
   - `cloudfront-distribution-id.txt`
   - `terraform-outputs.json`

---

## 📝 Orden de Configuración Recomendado

### Fase 1: Bootstrap (Antes del primer Terraform apply)

1. **Terraform Secrets**:
   ```
   ✅ TF_AWS_ACCESS_KEY_ID
   ✅ TF_AWS_SECRET_ACCESS_KEY
   ✅ TF_STATE_BUCKET
   ✅ TF_STATE_LOCK_TABLE
   ✅ TF_DOMAIN_NAME
   ⚠️ TF_ROUTE53_ZONE_ID (solo si usas Route53)
   ```

2. **Terraform Variables**:
   ```
   ✅ TF_AWS_REGION = mexico-central-1
   ✅ TF_PROJECT_NAME = bryan-portfolio
   ✅ TF_ENVIRONMENT = production
   ✅ TF_CREATE_DNS_RECORDS = false
   ✅ TF_OWNER = Bryan
   ✅ TF_PURPOSE = Personal Portfolio
   ```

### Fase 2: Después del Terraform apply

3. **Agregar OIDC Role**:
   ```
   ✅ TF_AWS_ROLE_ARN (del output de Terraform)
   ```

4. **Deploy Secrets** (del output de Terraform):
   ```
   ✅ AWS_ACCESS_KEY_ID
   ✅ AWS_SECRET_ACCESS_KEY
   ✅ AWS_S3_BUCKET
   ✅ AWS_CLOUDFRONT_DISTRIBUTION_ID
   ```

5. **Deploy Variables**:
   ```
   ✅ AWS_REGION = mexico-central-1
   ✅ DOMAIN_NAME = tudominio.com
   ```

---

## ✅ Checklist de Verificación

### Terraform Workflow
- [ ] Los 7 secrets están configurados
- [ ] Las 6 variables están configuradas
- [ ] `TF_AWS_REGION` está en `mexico-central-1`
- [ ] `TF_DOMAIN_NAME` es tu dominio real

### Deploy Workflow
- [ ] Los 4 secrets están configurados
- [ ] Las 2 variables están configuradas
- [ ] `AWS_REGION` coincide con `TF_AWS_REGION`
- [ ] Los valores vienen de los outputs de Terraform

---

## 🎯 Comandos Rápidos de Verificación

### Ver secrets configurados (no muestra valores)
```bash
# Usando GitHub CLI
gh secret list

# Output esperado:
# TF_AWS_ACCESS_KEY_ID          Updated 2024-01-24
# TF_AWS_SECRET_ACCESS_KEY      Updated 2024-01-24
# TF_STATE_BUCKET               Updated 2024-01-24
# ... etc
```

### Ver variables configuradas
```bash
# Usando GitHub CLI
gh variable list

# Output esperado:
# TF_AWS_REGION       mexico-central-1
# TF_PROJECT_NAME     bryan-portfolio
# AWS_REGION          mexico-central-1
# ... etc
```

---

## 🐛 Troubleshooting

### Error: "Required secret not found"
```
Causa: Falta un secret o está mal escrito el nombre
Solución: Verifica que el nombre sea EXACTAMENTE como está en la tabla
```

### Error: "Invalid credentials"
```
Causa: Access key incorrecta o sin permisos
Solución: Verifica que copiaste todo el valor sin espacios
```

### Deploy falla con "Access Denied"
```
Causa: Las credenciales del deploy no tienen permisos en S3/CloudFront
Solución: Usa los valores del output de Terraform, no los del bootstrap
```

### Terraform usa IAM User en vez de OIDC
```
Causa: TF_AWS_ROLE_ARN no está configurado o está vacío
Solución: Copia el ARN completo del output después del apply
```

---

## 📚 Referencias

- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Proceso completo paso a paso
- [terraform/BOOTSTRAP.md](./terraform/BOOTSTRAP.md) - Detalles del bootstrap
- [GitHub Secrets Docs](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

## 💡 Tips Importantes

1. **Nombres exactos**: Los nombres de secrets/variables deben ser EXACTAMENTE como están en las tablas (case-sensitive)

2. **No espacios**: Al copiar valores, asegúrate de no incluir espacios al inicio o final

3. **Secrets vs Variables**:
   - **Secrets**: Valores sensibles (credenciales, keys) - nunca se muestran
   - **Variables**: Valores públicos (region, nombres) - visibles en logs

4. **Rotación de credenciales**:
   - Las credenciales de bootstrap (TF_AWS_*) se pueden eliminar después de migrar a OIDC
   - Las credenciales de deploy (AWS_*) son permanentes

5. **Región consistente**:
   - `TF_AWS_REGION` y `AWS_REGION` deben tener el mismo valor: `mexico-central-1`

---

## 🎓 Resumen Visual

```
┌─────────────────────────────────────────────┐
│  TERRAFORM WORKFLOW                         │
├─────────────────────────────────────────────┤
│  Secrets (7):                               │
│  ├─ TF_AWS_ACCESS_KEY_ID      (Bootstrap)   │
│  ├─ TF_AWS_SECRET_ACCESS_KEY  (Bootstrap)   │
│  ├─ TF_STATE_BUCKET                         │
│  ├─ TF_STATE_LOCK_TABLE                     │
│  ├─ TF_DOMAIN_NAME                          │
│  ├─ TF_ROUTE53_ZONE_ID        (Opcional)    │
│  └─ TF_AWS_ROLE_ARN           (Post-apply)  │
│                                             │
│  Variables (6):                             │
│  ├─ TF_AWS_REGION = mexico-central-1        │
│  ├─ TF_PROJECT_NAME = bryan-portfolio       │
│  ├─ TF_ENVIRONMENT = production             │
│  ├─ TF_CREATE_DNS_RECORDS = false           │
│  ├─ TF_OWNER = Bryan                        │
│  └─ TF_PURPOSE = Personal Portfolio         │
└─────────────────────────────────────────────┘

                    ↓
              terraform apply
                    ↓
              Outputs generados
                    ↓

┌─────────────────────────────────────────────┐
│  DEPLOY WORKFLOW                            │
├─────────────────────────────────────────────┤
│  Secrets (4):                               │
│  ├─ AWS_ACCESS_KEY_ID         (De output)   │
│  ├─ AWS_SECRET_ACCESS_KEY     (De output)   │
│  ├─ AWS_S3_BUCKET             (De output)   │
│  └─ AWS_CLOUDFRONT_DIST_ID    (De output)   │
│                                             │
│  Variables (2):                             │
│  ├─ AWS_REGION = mexico-central-1           │
│  └─ DOMAIN_NAME = tudominio.com             │
└─────────────────────────────────────────────┘
```

---

**Total de configuraciones**:
- ✅ 11 Secrets
- ✅ 8 Variables  (6 únicas si consideras que TF_AWS_REGION y AWS_REGION son iguales)

¡Todo listo para configurar! 🚀
