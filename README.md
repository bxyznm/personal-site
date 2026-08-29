# SRE/DevOps Portfolio Website

A personal portfolio website showcasing SRE/DevOps expertise, built with Next.js 15 and deployed to AWS with full infrastructure as code.

**Live Demo**: [https://bxyzn.com](https://bxyzn.com)

## Features

- **Static Site Generation** - Lightning-fast performance with Next.js App Router
- **MDX Blog** - Write blog posts in Markdown with React components
- **Structured Edge Design** - Dark plum palette with coral accents, Cabinet Grotesk typography
- **AWS Infrastructure** - S3 + CloudFront CDN with SSL/TLS
- **CI/CD Pipeline** - Automated deployment with GitHub Actions
- **Infrastructure as Code** - Complete Terraform configuration

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router, Static Export) |
| **Styling** | Tailwind CSS |
| **Motion** | Motion (`motion/react`) |
| **Icons** | Phosphor Icons |
| **Fonts** | Cabinet Grotesk (self-hosted), Inter Tight, JetBrains Mono |
| **Blog** | MDX with frontmatter |
| **Hosting** | AWS S3 + CloudFront |
| **SSL/TLS** | AWS Certificate Manager |
| **DNS** | AWS Route53 (optional) |
| **CI/CD** | GitHub Actions |
| **IaC** | Terraform |

## Quick Start

### Local Development

```bash
# Install dependencies
cd frontend
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Deployment

```bash
# Deploy infrastructure
cd terraform
terraform init
terraform apply

# Configure GitHub secrets (see Deployment Guide)
# Push to main branch for automatic deployment
git push origin main
```

## Documentation

- **[Development Guide](docs/DEVELOPMENT.md)** - Local development, customization, coding standards
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Step-by-step deployment to AWS
- **[Infrastructure Guide](docs/INFRASTRUCTURE.md)** - AWS architecture, Terraform details
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Common issues and solutions

## Project Structure

```
├── .github/workflows/    # CI/CD pipelines
│   ├── deploy.yml       # Build and deploy to AWS
│   └── terraform.yml    # Infrastructure management
├── backend/             # Serverless contact form (AWS Lambda)
├── docs/                # Documentation
├── frontend/            # Next.js application
│   ├── content/blog/    # MDX blog posts
│   ├── public/          # Static assets (font licenses)
│   └── src/
│       ├── app/         # Next.js App Router pages
│       ├── components/  # React components
│       ├── fonts/       # Self-hosted fonts (Cabinet Grotesk)
│       └── lib/         # Utilities (MDX processing, data)
├── terraform/           # Infrastructure as Code
└── CLAUDE.md            # AI assistant instructions
```

## Key Commands

```bash
# Development (from frontend/)
cd frontend
npm run dev              # Start dev server
npm run build            # Build static site
npm run lint             # Lint code

# Versioning (used in CI/CD)
npm run version:patch    # 1.0.0 → 1.0.1
npm run version:minor    # 1.0.0 → 1.1.0
npm run version:major    # 1.0.0 → 2.0.0

# Terraform
cd terraform
terraform init          # Initialize
terraform plan          # Preview changes
terraform apply         # Apply infrastructure
terraform output        # View outputs
```

## Blog System

Write blog posts in MDX format in `frontend/content/blog/`:

```mdx
---
title: "Post Title"
date: "2024-01-28"
excerpt: "Brief description"
tags: ["tag1", "tag2"]
---

## Your Content

Write in **Markdown** with React components!
```

See [Development Guide](docs/DEVELOPMENT.md#adding-blog-posts) for details.

## Customization

Update personal information in:
- [frontend/src/app/page.tsx](frontend/src/app/page.tsx) - Home page
- [frontend/src/app/about/page.tsx](frontend/src/app/about/page.tsx) - About and skills
- [frontend/src/app/projects/page.tsx](frontend/src/app/projects/page.tsx) - Projects
- [frontend/src/app/contact/page.tsx](frontend/src/app/contact/page.tsx) - Contact info
- [frontend/src/components/Footer.tsx](frontend/src/components/Footer.tsx) - Social links

Edit theme in [frontend/tailwind.config.js](frontend/tailwind.config.js):

```javascript
colors: {
  'bg-primary': '#141217',       // Main background (plum)
  'accent': '#E8724C',           // Accent color (coral)
  'fg-primary': '#F6F4F1',       // Text color
}
```

## Architecture

```
┌──────────┐     ┌──────────────┐     ┌─────────┐
│  GitHub  │────→│   GitHub     │────→│   S3    │
│  (Code)  │     │   Actions    │     │ (Static)│
└──────────┘     └──────────────┘     └────┬────┘
                                            │
                                            ↓
                                     ┌─────────────┐
                                     │ CloudFront  │
                                     │    (CDN)    │
                                     └──────┬──────┘
                                            │
                                            ↓
                                      ┌──────────┐
                                      │ Route53  │
                                      │  (DNS)   │
                                      └──────────┘
```

**Deployment Flow**:
1. Push to `main` → GitHub Actions triggered
2. Build static site → Upload to S3
3. Invalidate CloudFront cache
4. Site updates globally within minutes

See [Infrastructure Guide](docs/INFRASTRUCTURE.md) for AWS resource details.

## Costs

Estimated monthly AWS costs (after free tier):

| Service | Usage | Cost |
|---------|-------|------|
| S3 | 1GB storage, 10K requests | $0.05 |
| CloudFront | 10GB transfer, 100K requests | $1.00 |
| Route53 | 1 hosted zone | $0.50 |
| ACM | SSL certificate | **FREE** |
| **Total** | | **~$1.55/month** |

## License

MIT

## Author

**Bryan Mendoza**
- Portfolio: [https://bxyzn.com](https://bxyzn.com)
- GitHub: [@bxyznm](https://github.com/bxyznm)

## Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/bxyznm/personal-site/issues)

---

**Built with Next.js • Deployed on AWS • Infrastructure as Code with Terraform**
