# OpenClaw AI - Landing Page

A high-converting, bilingual (English/Chinese) landing page for OpenClaw AI - a no-code web data extraction tool.

![OpenClaw AI](https://img.shields.io/badge/OpenClaw-AI-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

## Features

- **Bilingual Support**: English and Chinese with instant language switching
- **Linear-style Design**: Dark theme with modern aesthetics
- **Fully Responsive**: Mobile-first design that works on all devices
- **Framer Motion Animations**: Smooth scroll animations and interactions
- **SEO Optimized**: Semantic HTML, structured data (JSON-LD), bilingual metadata
- **Anchor Navigation**: Quick navigation to Why, How to Use, FAQ sections

## Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

   - English: http://localhost:3000/en
   - Chinese: http://localhost:3000/zh

### Build for Production

```bash
npm run build
```

This creates a static export in the `out/` directory that can be deployed to any static hosting service.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with default settings

### Cloudflare Pages

1. Run `npm run build`
2. Upload the `out/` directory to Cloudflare Pages
3. Set build command to `npm run build` and output directory to `out`

### Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `out`

## Customization

### Changing Content

Edit the translation files:

- **English**: `messages/en.json`
- **Chinese**: `messages/zh.json`

### Changing Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  background: "#0a0a0b",  // Main background
  primary: "#6366f1",      // Primary accent color
  // ...
}
```

### Replacing Screenshots

1. Replace `public/og-image.png` with your social sharing image (1200x630 recommended)
2. Update the mock UI in `components/demo.tsx` with actual screenshots

### Updating Logo

Replace `public/logo.svg` with your own logo file.

## Project Structure

```
openclaw-AI.org/
├── app/
│   ├── [locale]/          # Locale-specific pages
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── i18n.ts            # Internationalization config
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── navbar.tsx
│   ├── hero.tsx
│   ├── demo.tsx
│   ├── why.tsx
│   ├── how-to.tsx
│   ├── use-cases.tsx
│   ├── faq.tsx
│   ├── waitlist-form.tsx
│   └── footer.tsx
├── messages/              # Translation files
│   ├── en.json
│   └── zh.json
├── lib/
│   └── utils.ts           # Utility functions
├── public/                # Static assets
│   ├── logo.svg
│   └── og-image.png
├── next.config.js
├── tailwind.config.ts
└── package.json
```

## Phase 2 Roadmap

Future enhancements planned:

- [ ] Supabase integration for waitlist email storage
- [ ] Analytics integration (Umami/Plausible)
- [ ] Actual extraction demo functionality
- [ ] User authentication
- [ ] Payment integration

## License

MIT License - feel free to use this template for your own projects.

## Support

For issues or questions, please open an issue on GitHub or contact support@openclaw-AI.org.
