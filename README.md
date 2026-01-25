# SRE/DevOps Portfolio Website

A personal portfolio website built with Next.js 14, featuring a dark mode terminal-inspired design, MDX blog, and automated deployment to AWS via GitHub Actions.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Blog | MDX |
| Hosting | AWS S3 + CloudFront |
| CI/CD | GitHub Actions |
| IaC | Terraform |

## Features

- Dark mode with cyan/blue terminal-inspired theme
- Responsive design
- MDX-powered blog with syntax highlighting
- Static site generation for optimal performance
- Automated deployment pipeline
- Infrastructure as Code with Terraform

## Project Structure

```
├── .github/workflows/    # GitHub Actions CI/CD
├── content/blog/         # MDX blog posts
├── public/               # Static assets
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # React components
│   └── lib/             # Utilities (MDX helpers)
└── terraform/           # AWS infrastructure
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- AWS CLI (for deployment)
- Terraform 1.5+ (for infrastructure)

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

This generates a static export in the `out/` directory.

## Blog Posts

Blog posts are written in MDX format and stored in `content/blog/`. Each post requires frontmatter:

```mdx
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "Brief description of the post"
tags: ["Tag1", "Tag2"]
---

Your content here...
```

## Deployment

### AWS Infrastructure Setup

1. Navigate to the terraform directory:
   ```bash
   cd terraform
   ```

2. Copy the example variables file:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

3. Edit `terraform.tfvars` with your domain and preferences

4. Initialize Terraform:
   ```bash
   terraform init
   ```

5. Review the plan:
   ```bash
   terraform plan
   ```

6. Apply the infrastructure:
   ```bash
   terraform apply
   ```

7. Get the outputs for GitHub secrets:
   ```bash
   terraform output github_secrets_summary
   terraform output -raw cicd_access_key_id
   terraform output -raw cicd_secret_access_key
   ```

### GitHub Repository Setup

Add the following secrets to your GitHub repository:

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |
| `AWS_S3_BUCKET` | S3 bucket name |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID |

Add the following variables:

| Variable | Description |
|----------|-------------|
| `AWS_REGION` | AWS region (e.g., `us-east-1`) |
| `DOMAIN_NAME` | Your domain name |

### SSL Certificate Validation

If not using Route53, manually add the DNS validation records shown in:
```bash
terraform output dns_configuration
```

### Deploying

Push to the `main` branch to trigger automatic deployment:

```bash
git push origin main
```

## Customization

### Personal Information

Update these files with your information:
- `src/app/page.tsx` - Home page content
- `src/app/about/page.tsx` - About page and skills
- `src/app/projects/page.tsx` - Your projects
- `src/app/contact/page.tsx` - Contact information
- `src/components/Footer.tsx` - Social links

### Theme Colors

Edit the color palette in `tailwind.config.js`:

```javascript
colors: {
  'bg-primary': '#0a0f1a',
  'accent-primary': '#06b6d4',
  // ...
}
```

## License

MIT

---

Built with Next.js and deployed on AWS
