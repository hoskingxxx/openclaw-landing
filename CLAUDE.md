# OpenClaw Project Rules

## 1. UI & Styling
- Framework: Next.js 14 (App Router), Tailwind CSS, Shadcn UI.
- Colors: Use ONLY semantic variables (bg-background, text-primary). NO arbitrary hex values.
- Icons: Use Lucide React (`import { IconName } from 'lucide-react'`).
- Theme: Dark mode first. "Survivor/Hacker" aesthetic.

## 2. Component Structure
- Atomic Design:
  - `components/ui/`: Dumb components (Button, Input). DO NOT EDIT these unless necessary.
  - `components/`: Feature-specific components (e.g., `Hero.tsx`, `HardwareTable.tsx`).
- Naming: PascalCase for components (`HardwareTable`), camelCase for functions (`formatDate`).
- Props: Use TypeScript interfaces defined within the component file.

## 3. Coding Standards
- No "any" types in TypeScript.
- Use `const` over `let`.
- Prefer Server Components (RSC) by default. Use "use client" only when interactivity (useState, useEffect) is needed.

## 4. Content
- All documentation/blog content lives in `app/guides/` or `content/`.
- Do not hardcode long text blocks in TSX; extract to constants or markdown.

## 5. Behavior
- Be concise.
- When fixing a bug, explain the root cause first.
- If deleting code, double-check dependencies.