# Infrastructure Documentation

This document describes the AWS infrastructure managed by Terraform for the portfolio website.

## Architecture Overview

```
┌──────────────────────────────────────────────────────────┐
│                     AWS Cloud                            │
│                                                          │
│  ┌────────────┐      ┌─────────────────┐               │
│  │  Route53   │─────→│   CloudFront    │               │
│  │    DNS     │      │  Distribution   │               │
│  └────────────┘      └────────┬────────┘               │
│                               │                          │
│                    ┌──────────┴──────────┐              │
│                    │                     │              │
│              ┌─────▼──────┐    ┌────────▼────────┐     │
│              │     S3     │    │   ACM (SSL)     │     │
│              │   Bucket   │    │  us-east-1      │     │
│              └────────────┘    └─────────────────┘     │
│                                                          │
│  ┌────────────┐      ┌──────────────┐                  │
│  │    IAM     │      │  GitHub      │                  │
│  │ OIDC + User│      │  Actions     │                  │
│  └────────────┘      └──────────────┘                  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

## AWS Resources

### 1. S3 Bucket

**Purpose**: Static website hosting

**Configuration**:
- Name: `${project_name}-${environment}-website`
- Encryption: AES256
- Versioning: Enabled
- Public Access: Blocked (access via CloudFront OAC only)
- Lifecycle: Old versions deleted after 30 days

**Bucket Policy**:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::bucket-name/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::ACCOUNT:distribution/ID"
        }
      }
    }
  ]
}
```

### 2. CloudFront Distribution

**Purpose**: Global CDN with SSL termination

**Configuration**:
- Default Root Object: `index.html`
- Price Class: PriceClass_100 (North America & Europe)
- HTTP Versions: HTTP/2, HTTP/1.1, HTTP/1.0
- IPv6: Enabled
- Aliases: `yourdomain.com`, `www.yourdomain.com`

**Origin**:
- Type: S3 REST endpoint (not website endpoint)
- Domain: `bucket-name.s3.region.amazonaws.com`
- Origin Access: Origin Access Control (OAC)

**Cache Behavior**:
- Default:
  - Policy: CachingOptimized
  - Origin Request Policy: CORS-S3Origin
  - Compress: Yes
  - HTTPS: Redirect to HTTPS
  - URL Rewrite Function: Adds `/index.html` to directory URLs

- Static Assets (`/_next/static/*`):
  - Policy: CachingOptimized
  - Long cache (1 year)

**Custom Error Responses**:
- 404 → Returns `/404.html` (200 status)
- 403 → Returns `/index.html` (200 status) - for SPA routing

**SSL/TLS**:
- Certificate: ACM certificate (us-east-1)
- Protocol: TLSv1.2_2021
- SNI Only: Yes

### 3. CloudFront Function

**Purpose**: URL rewriting for clean URLs

**Code**:
```javascript
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Add index.html to directory requests
  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  }
  // Add /index.html to extensionless paths
  else if (!uri.includes('.')) {
    request.uri += '/index.html';
  }

  return request;
}
```

**Association**: viewer-request (runs before cache lookup)

### 4. ACM Certificate

**Purpose**: SSL/TLS certificate for HTTPS

**Configuration**:
- Region: **us-east-1** (required for CloudFront)
- Domain: `yourdomain.com`
- SANs: `www.yourdomain.com`
- Validation: DNS (CNAME records)
- Renewal: Automatic (via DNS validation)

**Note**: Even if your main region is different, ACM certificates for CloudFront must be in us-east-1.

### 5. Route53 (Optional)

**Purpose**: DNS management

**Resources** (if `create_dns_records = true`):
- A record: `yourdomain.com` → CloudFront (ALIAS)
- AAAA record: `yourdomain.com` → CloudFront (ALIAS, IPv6)
- A record: `www.yourdomain.com` → CloudFront (ALIAS)
- AAAA record: `www.yourdomain.com` → CloudFront (ALIAS, IPv6)
- CNAME records: Certificate validation

### 6. IAM Resources

#### OIDC Provider
- Provider: `token.actions.githubusercontent.com`
- Audience: `sts.amazonaws.com`
- Purpose: Allow GitHub Actions to assume AWS roles

#### GitHub Actions Role
- Name: `${project_name}-github-actions`
- Trust Policy: GitHub repository-specific
- Permissions: S3 upload, CloudFront invalidation
- Max Session: 1 hour

#### CI/CD User
- Name: `${project_name}-cicd`
- Purpose: Deploy static files, invalidate cache
- Permissions:
  - S3: ListBucket, GetObject, PutObject, DeleteObject, PutObjectAcl
  - CloudFront: CreateInvalidation, GetInvalidation, ListInvalidations

## Terraform State Management

**Backend**: S3 with DynamoDB locking

**Configuration**:
```hcl
backend "s3" {
  bucket         = "your-tfstate-bucket"
  key            = "portfolio/terraform.tfstate"
  region         = "us-east-1"
  encrypt        = true
  dynamodb_table = "terraform-locks"
}
```

**State Bucket Setup**:
- Versioning: Enabled
- Encryption: AES256
- Public Access: Blocked
- Lifecycle: Keep all versions

**Lock Table**:
- Name: `terraform-locks`
- Key: `LockID` (String)
- Billing: Pay per request

## Cost Estimate

Monthly costs for typical usage:

| Service | Usage | Cost |
|---------|-------|------|
| S3 | 1GB storage, 10K requests | $0.05 |
| CloudFront | 10GB transfer, 100K requests | $1.00 |
| Route53 | 1 hosted zone | $0.50 |
| ACM | Certificate | FREE |
| **Total** | | **~$1.55/month** |

**Notes**:
- CloudFront free tier: 1TB transfer, 10M requests/month (first year)
- S3 free tier: 5GB storage, 20K GET, 2K PUT (first year)
- Actual costs depend on traffic

## Security

### Network Security
- S3 bucket: Private, no public access
- CloudFront: HTTPS only (redirects HTTP)
- TLS: Minimum version 1.2

### Access Control
- S3: Only CloudFront can access (OAC condition)
- IAM: Least privilege principle
- OIDC: GitHub Actions can only assume role from your repo

### Secrets Management
- Terraform state: Encrypted in S3
- Sensitive outputs: Marked as sensitive
- GitHub secrets: Encrypted, not in logs

## Multi-Region Architecture

**Main Region**: Configurable (e.g., us-east-1, eu-west-1)
- S3 bucket
- IAM resources
- Route53 (global service)

**us-east-1** (always):
- ACM certificate (CloudFront requirement)
- CloudFront distribution (global service)

Terraform uses provider aliasing to manage resources in multiple regions:

```hcl
provider "aws" {
  region = var.aws_region  # Main region
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"     # For ACM
}
```

## Terraform Modules Structure

```
terraform/
├── main.tf              # Provider configuration
├── variables.tf         # Input variables
├── outputs.tf           # Output values
├── s3.tf               # S3 bucket resources
├── cloudfront.tf       # CloudFront distribution
├── acm.tf              # SSL certificate
├── route53.tf          # DNS records (optional)
├── iam.tf              # IAM roles and users
├── terraform.tfvars    # Your values (gitignored)
└── terraform.tfvars.example
```

## Resource Naming Convention

Format: `${project_name}-${resource_type}-${environment}`

Examples:
- S3: `my-portfolio-dev-website`
- IAM Role: `my-portfolio-github-actions`
- CloudFront Function: `my-portfolio-url-rewrite`

## Tags

All resources are tagged with:
```hcl
tags = {
  Project     = var.project_name
  Environment = var.environment
  ManagedBy   = "terraform"
  Owner       = var.tags.Owner
  Purpose     = var.tags.Purpose
}
```

## Disaster Recovery

### Backup Strategy
- S3 versioning: Enabled (30-day retention)
- Terraform state: Versioned in S3
- Code: Version controlled in GitHub

### Recovery Procedures

**Lost S3 Content**:
```bash
# Redeploy from GitHub
git checkout main
npm run build
aws s3 sync out/ s3://bucket-name/
```

**Lost Infrastructure**:
```bash
# Reapply Terraform
cd terraform
terraform apply
```

**Terraform State Corruption**:
```bash
# Restore from S3 version
aws s3api list-object-versions \
  --bucket your-tfstate-bucket \
  --prefix portfolio/terraform.tfstate

# Copy previous version
aws s3api get-object \
  --bucket your-tfstate-bucket \
  --key portfolio/terraform.tfstate \
  --version-id VERSION_ID \
  terraform.tfstate
```

## Monitoring

### CloudWatch Metrics (available)
- CloudFront: Requests, BytesDownloaded, ErrorRate
- S3: BucketSize, NumberOfObjects
- Lambda@Edge: Not used (using CloudFront Functions)

### Recommended Alarms
- CloudFront 4XX rate > 5%
- CloudFront 5XX rate > 1%
- S3 4XX errors
- Certificate expiration (auto-renewed, monitor anyway)

## Performance Optimization

### Current Optimizations
- Static site generation (build-time rendering)
- CloudFront CDN (global edge locations)
- Gzip/Brotli compression enabled
- Long cache for immutable assets (1 year)
- No cache for HTML (instant updates)

### Cache Headers
```bash
# Static assets (/_next/static/*)
Cache-Control: public, max-age=31536000, immutable

# HTML files
Cache-Control: public, max-age=0, must-revalidate
```

### CloudFront Invalidation
- Automatic on deployment (via GitHub Actions)
- Pattern: `/*` (invalidates all)
- Time: 1-3 minutes typically

## Terraform Commands Reference

```bash
# Initialize
terraform init -backend-config=backend.hcl

# Plan changes
terraform plan

# Apply changes
terraform apply

# Show outputs
terraform output

# Get specific output
terraform output -raw s3_bucket_name

# Destroy (careful!)
terraform destroy

# Import existing resource
terraform import aws_route53_record.root ZONE_ID_DOMAIN_TYPE

# Format code
terraform fmt -recursive

# Validate
terraform validate
```

## Further Reading

- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
