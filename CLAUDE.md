# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SRE/DevOps portfolio site built with Next.js 14 (App Router) configured for **static site generation**. The site is deployed to AWS S3+CloudFront with infrastructure managed via Terraform and CI/CD through GitHub Actions.

## Development Commands

```bash
# Development
npm install              # Install dependencies
npm run dev             # Start dev server (localhost:3000)
npm run build           # Build static site to out/ directory
npm run lint            # Run ESLint

# Versioning (used in CI/CD)
npm run version:patch   # Bump patch version (1.0.0 → 1.0.1)
npm run version:minor   # Bump minor version (1.0.0 → 1.1.0)
npm run version:major   # Bump major version (1.0.0 → 2.0.0)

# Terraform (from terraform/ directory)
terraform init -backend-config=backend.hcl
terraform plan
terraform apply
terraform output        # View infrastructure outputs
```

## Architecture

### Static Site Generation

The site uses Next.js static export mode (`output: 'export'` in next.config.js). This means:

- **No server-side runtime** - all pages are pre-rendered at build time
- **Image optimization is disabled** (`images.unoptimized: true`)
- **Trailing slashes enabled** for S3 compatibility
- **Build output**: `out/` directory contains static files ready for S3

### MDX Blog System

The blog uses a file-based approach with MDX posts in `content/blog/`:

**Post Processing Flow:**
1. Posts stored as `content/blog/slug.mdx` with frontmatter:
   ```yaml
   ---
   title: "Post Title"
   date: "YYYY-MM-DD"
   excerpt: "Brief description"
   tags: ["tag1", "tag2"]
   ---
   ```

2. `src/lib/mdx.ts` provides utilities:
   - `getAllPosts()` - Returns sorted array of post metadata
   - `getPostBySlug(slug)` - Fetches single post with content
   - `getAllSlugs()` - Used by `generateStaticParams()` for static generation
   - Automatic read time calculation (200 words/min)

3. Blog post pages (`src/app/blog/[slug]/page.tsx`):
   - Use `generateStaticParams()` to pre-render all posts at build time
   - Render MDX with `next-mdx-remote/rsc` (React Server Components)
   - Custom component mapping for styled MDX elements (headings, code blocks, links, etc.)

**Key Detail**: The blog system is entirely build-time. Posts are read from filesystem during `next build` and baked into static HTML. No runtime MDX compilation.

### Path Aliases

TypeScript is configured with `@/*` alias mapping to `src/*`:
```typescript
import { getAllPosts } from '@/lib/mdx'
import Header from '@/components/Header'
```

### Theming

Custom Tailwind theme with terminal-inspired colors defined in `tailwind.config.js`:
- Background: `bg-primary` (#0a0f1a), `bg-secondary` (#111827), `bg-card` (#1e293b)
- Accents: `accent-primary` (#06b6d4 cyan), `accent-secondary` (#22d3ee), `accent-glow` (#67e8f9)
- Text: `text-primary` (#f1f5f9), `text-secondary` (#94a3b8), `text-muted` (#64748b)
- Custom animations: `glow` and `float`

The site has a single dark theme - no light/dark mode toggle.

## Deployment Architecture

### GitHub Actions Workflows

**deploy.yml** (Automatic on push to main):
1. **Lint** - Run ESLint
2. **Build** - Version bump (minor), build static site, upload artifact
3. **Deploy** - Download artifact, sync to S3, invalidate CloudFront
   - Uses OIDC authentication with AWS IAM role
   - Two-step S3 sync: long cache for assets (CSS/JS), no cache for HTML/JSON
   - Full CloudFront invalidation after deployment

**terraform.yml** (Manual workflow_dispatch or on terraform/ changes):
- Actions: `plan`, `apply`, or `destroy`
- Supports two auth methods:
  - **OIDC** (preferred): Uses `TF_AWS_ROLE_ARN` secret
  - **IAM User** (bootstrap): Uses `TF_AWS_ACCESS_KEY_ID` and `TF_AWS_SECRET_ACCESS_KEY`
- Creates `backend.hcl` and `terraform.tfvars` dynamically from secrets/vars
- Idempotent OIDC provider import to handle existing resources
- Pre-creates ACM certificate when `create_dns_records=true` to populate validation options

### Terraform Infrastructure

Located in `terraform/` directory:

**Key Resources:**
- **S3 Bucket** - Hosts static site with public-read access
- **CloudFront Distribution** - CDN with SSL certificate
- **ACM Certificate** - SSL/TLS cert (always in us-east-1 for CloudFront)
- **Route53** (optional) - DNS records if `create_dns_records=true`
- **IAM** - OIDC provider + role for GitHub Actions, deployment user

**State Management:**
- Remote state in S3 bucket (configured via `backend.hcl`)
- DynamoDB table for state locking
- Backend config is created dynamically in CI/CD from secrets

**Multi-Region Notes:**
- Main region can be configured (e.g., `mx-central-1`)
- ACM certificate is always created in `us-east-1` (CloudFront requirement)
- Uses provider alias `us_east_1` in `main.tf` for ACM resources

### Required GitHub Secrets

**For Deployment (deploy.yml):**
- `AWS_S3_BUCKET` - S3 bucket name
- `AWS_CLOUDFRONT_DISTRIBUTION_ID` - CloudFront distribution ID

**For Terraform (terraform.yml):**
- `TF_AWS_ROLE_ARN` - IAM role ARN for OIDC (preferred)
  - OR `TF_AWS_ACCESS_KEY_ID` + `TF_AWS_SECRET_ACCESS_KEY` (bootstrap)
- `TF_STATE_BUCKET` - S3 bucket for Terraform state
- `TF_STATE_LOCK_TABLE` - DynamoDB table for state locking
- `TF_DOMAIN_NAME` - Your domain name
- `TF_ROUTE53_ZONE_ID` - (optional) Route53 hosted zone ID

**GitHub Variables:**
- `TF_AWS_REGION` - AWS region (default: mx-central-1)
- `TF_PROJECT_NAME` - Project name (default: sre-portfolio)
- `TF_ENVIRONMENT` - Environment (default: production)
- `TF_CREATE_DNS_RECORDS` - Whether to create Route53 records (default: false)

## Important Constraints

### Static Export Limitations

Because the site uses `output: 'export'`:
- **No server-side APIs** - can't use API routes or server actions that require runtime
- **No dynamic routes without generateStaticParams** - all dynamic routes must use `generateStaticParams()`
- **No revalidation** - no ISR, on-demand revalidation, or server-side props
- **Images** - Next.js Image optimization is disabled (must use unoptimized images)

### Build-Time Data

All data must be available at build time:
- Blog posts are read from filesystem during build
- No external API calls during rendering (unless fetched at build time)
- Environment variables are baked into the build (use `env` in next.config.js)

### CloudFront Caching

The deployment uses two different cache strategies:
- **Static assets** (CSS, JS, images): `max-age=31536000, immutable` (1 year)
- **HTML/JSON**: `max-age=0, must-revalidate` (no cache)

After deployment, CloudFront cache is fully invalidated (`/*`).

## Development Patterns

### Adding Blog Posts

1. Create `content/blog/your-slug.mdx` with required frontmatter
2. Run `npm run dev` to test locally
3. Build will automatically include new post via `generateStaticParams()`

### Component Development

- Default to **Server Components** (no 'use client' directive)
- Only add `'use client'` for interactivity (state, events, browser APIs)
- Use TypeScript with strict mode enabled
- Tailwind CSS only - no CSS modules or styled-components

### Infrastructure Changes

1. Modify `.tf` files in `terraform/`
2. Test locally: `terraform plan -var-file=terraform.tfvars`
3. Push changes - workflow runs `terraform plan` automatically
4. Manually trigger workflow with `action: apply` to deploy infrastructure changes

## Commit Conventions

Use conventional commits format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation
- `style:` - Code style/formatting
- `refactor:` - Code refactoring
- `infra:` - Infrastructure/Terraform changes
- `chore:` - Maintenance (dependencies, config)
