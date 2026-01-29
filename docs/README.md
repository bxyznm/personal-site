# Documentation

Complete documentation for the SRE/DevOps Portfolio Website.

## Guides

### Getting Started

- **[Development Guide](DEVELOPMENT.md)** - Set up local development environment, customize the site, and learn coding standards
- **[Deployment Guide](DEPLOYMENT.md)** - Deploy your site to AWS from scratch

### Reference

- **[Infrastructure Guide](INFRASTRUCTURE.md)** - Deep dive into AWS architecture and Terraform resources
- **[Troubleshooting](TROUBLESHOOTING.md)** - Solutions to common problems

## Quick Links

### Local Development

```bash
npm install
npm run dev
```

See [Development Guide](DEVELOPMENT.md) for details.

### Deployment

```bash
cd terraform
terraform init
terraform apply
```

See [Deployment Guide](DEPLOYMENT.md) for full instructions.

### Common Tasks

- **Add blog post**: Create `content/blog/post-name.mdx` → [Guide](DEVELOPMENT.md#adding-blog-posts)
- **Update theme**: Edit `tailwind.config.js` → [Guide](DEVELOPMENT.md#customizing-the-site)
- **Modify infrastructure**: Edit `terraform/*.tf` → [Guide](INFRASTRUCTURE.md)
- **Fix deployment issues**: Check [Troubleshooting](TROUBLESHOOTING.md)

## Documentation Structure

```
docs/
├── README.md              # This file - Documentation index
├── DEVELOPMENT.md         # Local development guide
├── DEPLOYMENT.md          # AWS deployment guide
├── INFRASTRUCTURE.md      # AWS architecture details
└── TROUBLESHOOTING.md    # Common issues and solutions
```

## Need Help?

1. Check the relevant guide above
2. Search [Troubleshooting Guide](TROUBLESHOOTING.md)
3. Create an issue on GitHub

## External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com/)
