# Development Guide

Guide for local development of the portfolio website.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
open http://localhost:3000
```

## Prerequisites

### Required

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **npm** 10+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Optional

- **VS Code** ([Download](https://code.visualstudio.com/)) - Recommended editor
- **AWS CLI** - For manual deployments
- **Terraform** - For infrastructure changes

## Initial Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/personal-site.git
   cd personal-site
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   ```
   http://localhost:3000
   ```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build static site to `out/` directory |
| `npm run lint` | Run ESLint to check code quality |
| `npm run version:patch` | Bump patch version (1.0.0 → 1.0.1) |
| `npm run version:minor` | Bump minor version (1.0.0 → 1.1.0) |
| `npm run version:major` | Bump major version (1.0.0 → 2.0.0) |

## Project Structure

```
personal-site/
├── .github/
│   └── workflows/        # GitHub Actions CI/CD
│       ├── deploy.yml    # Build and deploy to AWS
│       └── terraform.yml # Infrastructure management
├── content/
│   └── blog/            # MDX blog posts
│       └── *.mdx
├── public/              # Static assets (images, fonts)
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── layout.tsx  # Root layout
│   │   ├── page.tsx    # Home page
│   │   ├── about/
│   │   ├── blog/
│   │   ├── contact/
│   │   └── projects/
│   ├── components/     # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   └── lib/           # Utility functions
│       └── mdx.ts     # MDX processing
├── terraform/         # Infrastructure as Code
│   ├── *.tf
│   └── terraform.tfvars
├── docs/              # Documentation
├── CLAUDE.md          # AI assistant instructions
├── next.config.js     # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
└── package.json       # Dependencies and scripts
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

Edit files in `src/` or `content/`:

```bash
# Example: Edit home page
code src/app/page.tsx

# Example: Add blog post
code content/blog/my-new-post.mdx
```

### 3. Test Locally

```bash
# Run dev server
npm run dev

# In another terminal, check for errors
npm run lint

# Build to verify static export works
npm run build
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
```

Use [conventional commits](https://www.conventionalcommits.org/):
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style (formatting, no logic change)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance (dependencies, config)

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

### 6. Deploy

Merge to `main` to trigger automatic deployment:
```bash
git checkout main
git merge feature/your-feature-name
git push origin main
```

## Adding Blog Posts

### Create a New Post

1. Create file in `content/blog/`:
   ```bash
   touch content/blog/my-awesome-post.mdx
   ```

2. Add frontmatter and content:
   ```mdx
   ---
   title: "My Awesome Post"
   date: "2024-01-28"
   excerpt: "A brief description of the post"
   tags: ["nextjs", "react", "aws"]
   ---

   ## Introduction

   Your content here using **Markdown** and MDX features.

   ### Code Examples

   ```javascript
   const greeting = "Hello, World!";
   console.log(greeting);
   ```

   You can use all Markdown features plus React components!
   ```

3. View in dev server:
   ```
   http://localhost:3000/blog/my-awesome-post
   ```

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title |
| `date` | string (YYYY-MM-DD) | Yes | Publication date |
| `excerpt` | string | Yes | Short description (appears in post list) |
| `tags` | array | Yes | Post categories/tags |

### MDX Features

MDX allows you to use React components in Markdown:

```mdx
## Regular Markdown

This is **bold** and this is *italic*.

## With React Components

<MyCustomComponent prop="value" />

## Code Blocks with Syntax Highlighting

```javascript
function example() {
  return "Syntax highlighted!";
}
```
```

## Customizing the Site

### Personal Information

Update these files:

1. **Home Page** (`src/app/page.tsx`):
   ```typescript
   export default function Home() {
     return (
       <div>
         <h1>Your Name</h1>
         <p>Your tagline</p>
       </div>
     )
   }
   ```

2. **About Page** (`src/app/about/page.tsx`):
   - Update bio
   - Modify skills list
   - Change experience

3. **Projects** (`src/app/projects/page.tsx`):
   - Add your projects
   - Update descriptions
   - Add project links

4. **Contact** (`src/app/contact/page.tsx`):
   - Update email
   - Modify contact form

5. **Footer** (`src/components/Footer.tsx`):
   - Update social media links
   - Change copyright text

### Theme Customization

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Background colors
        'bg-primary': '#0a0f1a',     // Main background
        'bg-secondary': '#111827',   // Card backgrounds
        'bg-card': '#1e293b',        // Elevated cards

        // Accent colors
        'accent-primary': '#06b6d4',   // Main accent (cyan)
        'accent-secondary': '#22d3ee', // Hover states
        'accent-glow': '#67e8f9',      // Glow effects

        // Text colors
        'text-primary': '#f1f5f9',     // Main text
        'text-secondary': '#94a3b8',   // Muted text
        'text-muted': '#64748b',       // Even more muted
      },
      // Add custom fonts, spacing, etc.
    }
  }
}
```

### Adding Components

1. Create component in `src/components/`:
   ```typescript
   // src/components/MyComponent.tsx
   export default function MyComponent({ text }: { text: string }) {
     return <div className="text-accent-primary">{text}</div>
   }
   ```

2. Use in pages:
   ```typescript
   import MyComponent from '@/components/MyComponent'

   export default function Page() {
     return <MyComponent text="Hello!" />
   }
   ```

### Path Aliases

The project uses `@/*` alias for imports:

```typescript
// Instead of:
import Header from '../../../components/Header'

// Use:
import Header from '@/components/Header'
import { getAllPosts } from '@/lib/mdx'
```

Configured in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Styling Guide

### Tailwind CSS

Use Tailwind utility classes:

```tsx
<div className="bg-bg-card p-6 rounded-lg border border-accent-primary/20 hover:border-accent-primary transition-colors">
  <h2 className="text-2xl font-bold text-text-primary mb-4">
    Card Title
  </h2>
  <p className="text-text-secondary">
    Card content
  </p>
</div>
```

### Responsive Design

Use Tailwind responsive prefixes:

```tsx
<div className="
  text-sm md:text-base lg:text-lg
  p-4 md:p-6 lg:p-8
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
  Responsive content
</div>
```

Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Animations

Custom animations in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #06b6d4' },
          '100%': { boxShadow: '0 0 20px #06b6d4, 0 0 30px #06b6d4' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
}
```

Use in components:
```tsx
<div className="animate-glow">Glowing element</div>
<div className="animate-float">Floating element</div>
```

## Testing

### Manual Testing

Before committing:

1. **Build test**:
   ```bash
   npm run build
   ```
   Verify no errors and check `out/` directory

2. **Lint test**:
   ```bash
   npm run lint
   ```
   Fix any errors or warnings

3. **Visual test**:
   - Check all pages in dev server
   - Test responsive design (DevTools → Toggle device toolbar)
   - Verify links work
   - Check blog posts render correctly

### Browser Testing

Test in multiple browsers:
- Chrome (primary)
- Firefox
- Safari (if on macOS)
- Edge

## Environment Variables

This project uses static export, so environment variables are **baked into the build** at build time.

### Adding Environment Variables

1. Create `.env.local`:
   ```bash
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

2. Use in code:
   ```typescript
   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
   ```

3. Add to `next.config.js`:
   ```javascript
   module.exports = {
     env: {
       SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
     },
   }
   ```

**Important**:
- Prefix with `NEXT_PUBLIC_` to expose to browser
- Never commit `.env.local` (already in `.gitignore`)
- Add to GitHub secrets for CI/CD if needed

## TypeScript

### Type Safety

The project uses TypeScript for type safety. Define types for your data:

```typescript
// types/blog.ts
export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  content: string
  readTime: number
}
```

Use in components:
```typescript
import { BlogPost } from '@/types/blog'

export default function PostCard({ post }: { post: BlogPost }) {
  return <div>{post.title}</div>
}
```

### Type Checking

```bash
# Check types without building
npx tsc --noEmit

# Fix common issues
npx tsc --noEmit --watch
```

## Performance Tips

### Image Optimization

Since we use static export, Next.js image optimization is disabled. Use optimized images:

```bash
# Optimize images before adding to public/
# Use tools like: https://tinypng.com/ or imagemagick
convert input.png -quality 85 output.png
```

### Code Splitting

Next.js automatically code-splits by page. For large components, use dynamic imports:

```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
})
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
# Check output in terminal and .next/ directory
```

## Git Workflow

### Branch Strategy

- `main` - Production (auto-deploys)
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add dark mode toggle"
git commit -m "fix: correct navigation link"
git commit -m "docs: update deployment guide"
git commit -m "style: format code with prettier"
git commit -m "refactor: simplify blog post component"
git commit -m "chore: update dependencies"
```

### Pre-commit Checklist

- [ ] Code builds successfully (`npm run build`)
- [ ] No lint errors (`npm run lint`)
- [ ] All pages load in dev server
- [ ] Changes tested in browser
- [ ] Commit message follows conventions

## IDE Setup (VS Code)

### Recommended Extensions

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Tailwind class autocomplete
- **MDX** - MDX syntax highlighting
- **GitLens** - Git integration

### Settings

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## Debugging

### Next.js Dev Server

```bash
# Enable debug mode
NODE_OPTIONS='--inspect' npm run dev
```

Then open Chrome DevTools → Node icon

### Common Issues

1. **Port 3000 already in use**:
   ```bash
   # Use different port
   PORT=3001 npm run dev
   ```

2. **Module not found**:
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run dev
   ```

3. **Type errors after npm install**:
   ```bash
   # Restart TS server in VS Code
   # Cmd+Shift+P → "TypeScript: Restart TS Server"
   ```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Getting Help

- Check [Troubleshooting Guide](./TROUBLESHOOTING.md)
- Search [GitHub Issues](https://github.com/yourusername/personal-site/issues)
- Create new issue with:
  - Steps to reproduce
  - Expected vs actual behavior
  - Error messages/screenshots
  - Environment info (Node version, OS, etc.)
