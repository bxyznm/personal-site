# Deployment Guide

Complete guide to deploying your portfolio website to AWS using Terraform and GitHub Actions.

## Prerequisites

- AWS Account with admin access
- GitHub repository
- Domain name (optional, can use CloudFront URL)
- AWS CLI installed and configured locally
- Terraform 1.5+ installed locally

## Quick Start

If you want to deploy quickly:

```bash
# 1. Set up infrastructure
cd terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values
terraform init
terraform apply

# 2. Configure GitHub secrets (see below)
# 3. Push to main branch
git push origin main
```

## Detailed Deployment Steps

### Step 1: Configure Terraform Variables

1. Navigate to terraform directory:
   ```bash
   cd terraform
   ```

2. Copy example variables:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

3. Edit `terraform.tfvars`:
   ```hcl
   domain_name        = "yourdomain.com"
   project_name       = "my-portfolio"
   aws_region         = "us-east-1"
   environment        = "production"
   create_dns_records = true  # Set to false if not using Route53
   route53_zone_id    = "Z123..."  # Only if using Route53

   tags = {
     Owner   = "Your Name"
     Purpose = "Personal Portfolio"
   }
   ```

### Step 2: Deploy Infrastructure

1. Initialize Terraform:
   ```bash
   terraform init
   ```

2. Review the plan:
   ```bash
   terraform plan
   ```

3. Apply the configuration:
   ```bash
   terraform apply
   ```

4. Save the outputs:
   ```bash
   terraform output > ../deployment-info.txt
   terraform output -raw cicd_access_key_id > ../cicd-key.txt
   terraform output -raw cicd_secret_access_key > ../cicd-secret.txt
   ```

   **Important:** Keep these files secure and never commit them to git!

### Step 3: Configure GitHub Secrets

Navigate to your repository: `Settings → Secrets and variables → Actions`

#### Required Secrets

| Secret Name | Value | Where to Get It |
|-------------|-------|-----------------|
| `AWS_ACCESS_KEY_ID` | From `cicd-key.txt` | Terraform output |
| `AWS_SECRET_ACCESS_KEY` | From `cicd-secret.txt` | Terraform output |
| `AWS_S3_BUCKET` | Your S3 bucket name | Terraform output: `s3_bucket_name` |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | Your CloudFront ID | Terraform output: `cloudfront_distribution_id` |

#### Required Variables

| Variable Name | Value |
|--------------|-------|
| `AWS_REGION` | Same as in terraform.tfvars (e.g., `us-east-1`) |
| `DOMAIN_NAME` | Your domain name |

### Step 4: DNS Configuration

#### Option A: Using Route53 (Recommended)

If you set `create_dns_records = true` in terraform.tfvars, DNS is already configured! ✅

Verify:
```bash
dig yourdomain.com
dig www.yourdomain.com
```

#### Option B: External DNS Provider

If using another DNS provider (GoDaddy, Namecheap, Cloudflare, etc.):

1. Get your CloudFront domain:
   ```bash
   terraform output cloudfront_domain_name
   # Example: d1jirzkcmyrlwp.cloudfront.net
   ```

2. Create DNS records in your provider:

   **For Cloudflare/Route53 (supports ALIAS)**:
   ```
   Type: ALIAS or CNAME
   Name: @
   Value: d1jirzkcmyrlwp.cloudfront.net
   TTL: Auto or 300

   Type: ALIAS or CNAME
   Name: www
   Value: d1jirzkcmyrlwp.cloudfront.net
   TTL: Auto or 300
   ```

   **For GoDaddy/Namecheap (CNAME only)**:
   ```
   Type: CNAME
   Name: www
   Value: d1jirzkcmyrlwp.cloudfront.net
   TTL: 600

   # For apex domain, use domain forwarding:
   Forward yourdomain.com → www.yourdomain.com
   ```

3. Add SSL certificate validation records (from Terraform output):
   ```bash
   terraform output dns_configuration
   ```

   Copy the CNAME records shown and add them to your DNS provider.

4. Wait for SSL validation (5-30 minutes):
   ```bash
   aws acm describe-certificate \
     --certificate-arn $(terraform output -raw acm_certificate_arn) \
     --region us-east-1 \
     --query 'Certificate.Status'
   ```

   Wait until status is `"ISSUED"`.

### Step 5: Deploy Your Site

1. Make a change and push to main:
   ```bash
   git add .
   git commit -m "feat: initial deployment"
   git push origin main
   ```

2. GitHub Actions will automatically:
   - Lint your code
   - Build the Next.js site
   - Upload to S3
   - Invalidate CloudFront cache

3. Monitor the deployment:
   - Go to `Actions` tab in GitHub
   - Watch the "Build and Deploy" workflow

4. Access your site:
   ```
   https://yourdomain.com
   ```

## Deployment Architecture

```
┌─────────────┐
│   GitHub    │
│  (Source)   │
└──────┬──────┘
       │
       │ Push to main
       ↓
┌─────────────┐
│   GitHub    │
│   Actions   │
└──────┬──────┘
       │
       │ Build & Deploy
       ↓
┌─────────────┐       ┌──────────────┐
│     S3      │←──────│  CloudFront  │
│  (Static)   │       │    (CDN)     │
└─────────────┘       └──────┬───────┘
                              │
                              │ HTTPS
                              ↓
                       ┌──────────────┐
                       │  Route53 or  │
                       │ External DNS │
                       └──────────────┘
                              │
                              ↓
                         Your Domain
```

## Continuous Deployment

Every push to `main` triggers automatic deployment:

1. **Lint**: ESLint checks code quality
2. **Build**: Next.js static export to `out/`
3. **Deploy**:
   - Upload static files to S3
   - Set cache headers (1 year for assets, no cache for HTML)
   - Invalidate CloudFront cache
4. **Version**: Automatically bumps minor version

## Manual Deployment

To deploy manually without pushing:

1. Build locally:
   ```bash
   npm run build
   ```

2. Upload to S3:
   ```bash
   aws s3 sync out/ s3://your-bucket-name/ \
     --delete \
     --cache-control "public,max-age=31536000,immutable" \
     --exclude "*.html" \
     --exclude "*.json"

   aws s3 sync out/ s3://your-bucket-name/ \
     --delete \
     --cache-control "public,max-age=0,must-revalidate" \
     --exclude "*" \
     --include "*.html" \
     --include "*.json"
   ```

3. Invalidate CloudFront:
   ```bash
   aws cloudfront create-invalidation \
     --distribution-id YOUR_DISTRIBUTION_ID \
     --paths "/*"
   ```

## Rollback

To rollback to a previous version:

1. Find the version tag:
   ```bash
   git tag -l "v*"
   ```

2. Checkout and deploy:
   ```bash
   git checkout v1.2.3
   npm run build
   # Then manual deploy steps above
   ```

## Troubleshooting

See [docs/TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues and solutions.

## Next Steps

- [Infrastructure Details](./INFRASTRUCTURE.md) - Learn about AWS resources
- [Development Guide](./DEVELOPMENT.md) - Local development setup
- [Troubleshooting](./TROUBLESHOOTING.md) - Common issues

