# 🍵 Mega Matcha

A premium Next.js application for matcha enthusiasts, built with modern web technologies and production-ready features.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fmega-matcha)
[![CI/CD Pipeline](https://github.com/your-username/mega-matcha/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/mega-matcha/actions/workflows/ci.yml)

## ✨ Features

### 🚀 Core Technologies

- **Next.js 15** - Latest version with App Router and React Server Components
- **TypeScript** - Full type safety throughout the application
- **Node.js 24** - Latest LTS version for optimal performance
- **Tailwind CSS v4** - Latest version with modern styling approach
- **shadcn/ui** - Beautiful and accessible component library

### 🎨 UI/UX

- **Dark Mode Support** - System preference detection with manual toggle
- **Responsive Design** - Mobile-first approach with modern layouts
- **Custom Matcha Theme** - Green color palette inspired by matcha
- **Smooth Animations** - CSS transitions and custom keyframes
- **Accessibility** - WCAG compliant components and semantic HTML

### 🧪 Quality Assurance

- **ESLint + Prettier** - Code formatting and linting
- **Husky + lint-staged** - Pre-commit hooks for code quality
- **Conventional Commits** - Standardized commit messages with commitlint
- **Jest + React Testing Library** - Unit and integration testing
- **Playwright** - End-to-end testing across browsers
- **TypeScript strict mode** - Enhanced type checking

### 🚀 Performance & SEO

- **next-seo** - Comprehensive SEO optimization
- **Automatic sitemap** - Generated with next-sitemap
- **robots.txt** - Search engine crawling configuration
- **Image optimization** - Next.js Image component with WebP/AVIF
- **Bundle optimization** - Webpack configuration for production
- **PWA ready** - Web App Manifest for mobile installation

### 🔧 Development Experience

- **VSCode configuration** - Optimized settings and extensions
- **Debug configurations** - Ready-to-use debugging setups
- **Hot reload** - Fast development with Turbopack
- **Absolute imports** - Clean import paths with @/\* aliases
- **Environment variables** - Secure configuration management

### 🐳 Deployment & DevOps

- **Docker support** - Multi-stage builds for production
- **GitHub Actions** - Automated CI/CD pipeline
- **Vercel deployment** - Optimized for Vercel platform
- **Cloudflare integration** - CDN and edge functions support
- **Health checks** - Application monitoring and status

## 📋 Prerequisites

- **Node.js 24+** (LTS recommended)
- **npm 10+** or **yarn 1.22+**
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mega-matcha.git
cd mega-matcha
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

| Script                  | Description                             |
| ----------------------- | --------------------------------------- |
| `npm run dev`           | Start development server with Turbopack |
| `npm run build`         | Build production application            |
| `npm run start`         | Start production server                 |
| `npm run lint`          | Run ESLint with auto-fix                |
| `npm run lint:check`    | Check linting without fixing            |
| `npm run format`        | Format code with Prettier               |
| `npm run format:check`  | Check code formatting                   |
| `npm run type-check`    | Run TypeScript type checking            |
| `npm run test`          | Run Jest unit tests                     |
| `npm run test:watch`    | Run tests in watch mode                 |
| `npm run test:coverage` | Run tests with coverage report          |
| `npm run test:e2e`      | Run Playwright e2e tests                |
| `npm run test:e2e:ui`   | Run e2e tests with UI                   |

## 🏗️ Project Structure

```
mega-matcha/
├── .github/workflows/     # GitHub Actions CI/CD
├── .husky/               # Git hooks configuration
├── .vscode/              # VSCode settings and extensions
├── public/               # Static assets
├── src/                  # Source code
│   ├── app/             # Next.js App Router pages
│   ├── components/      # React components
│   │   └── ui/         # shadcn/ui components
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utility functions
├── tests/               # Test files
│   ├── e2e/            # Playwright tests
│   └── unit/           # Jest unit tests
├── .env.example         # Environment variables template
├── .eslintrc.js        # ESLint configuration
├── .prettierrc         # Prettier configuration
├── commitlint.config.js # Commit linting rules
├── components.json     # shadcn/ui configuration
├── docker-compose.yml  # Docker Compose setup
├── Dockerfile          # Production Docker image
├── jest.config.js      # Jest testing configuration
├── next.config.ts      # Next.js configuration
├── package.json        # Dependencies and scripts
├── playwright.config.ts # Playwright configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## 🎨 Styling

### Tailwind CSS v4

This project uses Tailwind CSS v4 with:

- Custom matcha-inspired color palette
- Dark mode support with class-based toggling
- Custom animations and keyframes
- Responsive design utilities

### Design Tokens

```css
/* Primary matcha colors */
--matcha-primary: 142 76% 36%;
--matcha-secondary: 142 30% 85%;
--matcha-accent: 45 93% 47%;
```

### Custom Components

- Built with shadcn/ui for consistency
- Customized with matcha theme
- Fully accessible and responsive

## 🧪 Testing

### Unit Testing with Jest

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### E2E Testing with Playwright

```bash
# Run e2e tests
npm run test:e2e

# Run tests with UI mode
npm run test:e2e:ui

# Install browsers (first time)
npx playwright install
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fmega-matcha)

### Docker

```bash
# Build production image
docker build -t mega-matcha .

# Run container
docker run -p 3000:3000 mega-matcha

# Or use docker-compose
docker-compose up --build
```

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
# Site configuration
SITE_URL="https://your-domain.com"
SITE_NAME="Mega Matcha"

# Database (if needed)
DATABASE_URL="postgresql://..."

# External services
STRIPE_PUBLIC_KEY="pk_..."
GOOGLE_ANALYTICS_ID="G-..."
```

### Cloudflare Integration

For optimal performance with Cloudflare:

1. Set up Cloudflare for your domain
2. Configure caching rules for static assets
3. Enable edge functions for dynamic content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run test`
5. Commit changes: `git commit -m 'feat: add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation updates
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test updates
- `chore:` - Maintenance tasks

## 📊 Performance

### Lighthouse Scores

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Optimizations

- Image optimization with Next.js Image
- Bundle splitting and code splitting
- CSS optimization with Tailwind CSS
- Font optimization with next/font
- Caching strategies for static assets

## 🛠️ Development Tools

### VSCode Extensions (Recommended)

The project includes VSCode configuration with recommended extensions:

- ESLint & Prettier for code quality
- Tailwind CSS IntelliSense
- TypeScript support
- Git integration tools
- Testing extensions

### Debugging

Pre-configured debug setups for:

- Next.js server-side debugging
- Client-side debugging in Chrome
- Jest test debugging
- Full-stack debugging

## 📱 Progressive Web App

The application is PWA-ready with:

- Web App Manifest (`/public/manifest.json`)
- Service Worker support (configurable)
- Mobile-optimized experience
- Offline capabilities (when configured)

## 🔒 Security

### Security Headers

- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security
- Referrer-Policy

### Best Practices

- Environment variable protection
- Input validation and sanitization
- Secure authentication patterns
- HTTPS enforcement

## 📈 Analytics & Monitoring

### Built-in Support

- Vercel Analytics integration
- Google Analytics 4 support
- Performance monitoring
- Error tracking capabilities

## 🆘 Troubleshooting

### Common Issues

**Node version errors**

```bash
# Use the correct Node.js version
nvm use 24
# or
nvm install 24
```

**Package installation issues**

```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build errors**

```bash
# Type check
npm run type-check

# Lint check
npm run lint:check
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Vercel](https://vercel.com/) for deployment platform
- [Playwright](https://playwright.dev/) for e2e testing

## 📞 Support

- 📧 Email: support@mega-matcha.com
- 💬 GitHub Issues: [Create an issue](https://github.com/your-username/mega-matcha/issues)
- 📖 Documentation: [Project Wiki](https://github.com/your-username/mega-matcha/wiki)

---

<div align="center">
  <p>Built with 💚 for matcha lovers worldwide</p>
  <p>© 2024 Mega Matcha. Crafted with love and premium matcha.</p>
</div>
