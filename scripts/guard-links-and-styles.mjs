#!/usr/bin/env node

/**
 * CI Guard: CTA Discipline + No Hardcoded Vultr
 *
 * Scans codebase for:
 * - Hardcoded Vultr affiliate URLs (outside lib/offers.ts)
 * - Forbidden style tokens (bg-green-, bg-purple-, bg-blue-, gradient)
 * - Gradient usage in CTA components/pages
 *
 * Exit codes:
 * - 0: All checks passed
 * - 1: Violations found
 */

import { glob } from 'glob'
import { readFile } from 'fs/promises'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// ============================================================================
// Configuration
// ============================================================================

const VULTR_AFFILIATE_PATTERN = /vultr\.com\/\?ref=/gi
const GRADIENT_PATTERN = /gradient/gi
const TAILWIND_GRADIENT_PATTERN = /from-\w+.*to-/gi

// Files/patterns to allowlist
const VULTR_ALLOWLIST = [
  'lib/offers.ts',
  'scripts/guard-links-and-styles.mjs', // This file can contain example URLs
  'components/blog/ImpossibleWallWidget.tsx', // Uses PRIMARY_OFFER.url
  'app/page.tsx', // Uses PRIMARY_OFFER.url
  'components/tools/vram-calculator.tsx', // Uses PRIMARY_OFFER.url
]

// Scan directories
const SCAN_DIRS = [
  'app/**/*.ts',
  'app/**/*.tsx',
  'components/**/*.ts',
  'components/**/*.tsx',
  'content/**/*.mdx',
  'lib/**/*.ts',
]

// Exclude patterns (for UI components, terminal decorations, etc)
const COLOR_EXCLUDE_PATTERNS = [
  // Terminal decorator dots (red/yellow/green in 404 page, calculator, etc)
  /w-3 h-3 rounded-full bg-(red|yellow|green)-500"[^<]*\s*\/>/,
  /w-3 h-3 rounded-full bg-(red|yellow|green)-500\s+class/,
  // Severity labels and status indicators
  /text-green-400"[^<]*\s*font-mono">/,
  /bg-green-500\/10.*border.*bg-green-500\/20/,
  // UI components directories (not monetization)
  /^components\/ui\//,
  /^components\/AnswerCapsule\.tsx$/,
  /^components\/global\/StickyFooter\.tsx$/,
  /^components\/features\/Hero\.tsx$/,
  /^components\/tools\/vram-calculator\.tsx$/,
  // Terminal/code blocks with green text (OK status indicators)
  /<pre[^>]*>[\s\S]*<code[^>]*>[\s\S]*text-green-400[^>]*>/,
]

// Forbidden color patterns - but exclude certain contexts
const FORBIDDEN_COLOR_PATTERNS = [
  /bg-green-/gi,
  /bg-purple-/gi,
  /bg-blue-/gi,
]

// ============================================================================
// Violation tracking
// ============================================================================

const violations = {
  hardcodedVultr: [],
  forbiddenColors: [],
  gradients: [],
}

// ============================================================================
// File scanning
// ============================================================================

async function scanFile(filePath) {
  const relativePath = filePath.replace(ROOT + '/', '')

  // Check if file should be color-exempted (UI components, etc)
  const isColorExcluded = COLOR_EXCLUDE_PATTERNS.some(exclude => exclude.test(relativePath))

  const content = await readFile(filePath, 'utf-8')

  // Check for hardcoded Vultr URLs
  const vultrMatches = content.matchAll(/vultr\.com\/[^\s"'`<>]+/gi)
  for (const match of vultrMatches) {
    const url = match[0]
    if (VULTR_AFFILIATE_PATTERN.test(url)) {
      // Check if file is in allowlist
      const isAllowed = VULTR_ALLOWLIST.some(allowed => relativePath.includes(allowed))
      if (!isAllowed) {
        // Find line number
        const lines = content.split('\n')
        const lineNum = lines.findIndex((line, idx) => {
          const lineContent = lines.slice(0, idx + 1).join('\n')
          return lineContent.includes(match.index) || match.index < lineContent.length
        }) + 1
        violations.hardcodedVultr.push({ file: relativePath, line: lineNum, url })
      }
    }
  }

  // Check for forbidden color tokens (only if not color-excluded)
  if (!isColorExcluded) {
    for (const pattern of FORBIDDEN_COLOR_PATTERNS) {
      const colorMatches = content.matchAll(pattern)
      for (const match of colorMatches) {
        const lines = content.split('\n')
        const lineNum = lines.findIndex((line, idx) => {
          const lineContent = lines.slice(0, idx + 1).join('\n')
          return match.index < lineContent.length
        }) + 1
        violations.forbiddenColors.push({
          file: relativePath,
          line: lineNum,
          match: match[0],
          pattern: pattern.source
        })
      }
    }
  }

  // Check for gradient usage
  if (GRADIENT_PATTERN.test(content)) {
    // Check if it's a Tailwind gradient (from-X to-Y)
    const hasTailwindGradient = TAILWIND_GRADIENT_PATTERN.test(content)

    // For components/monetization and app pages, flag all gradient usage
    if (relativePath.startsWith('components/monetization/') || relativePath.startsWith('app/')) {
      const lines = content.split('\n')
      const lineNum = lines.findIndex(line => GRADIENT_PATTERN.test(line)) + 1
      if (lineNum > 0) {
        violations.gradients.push({
          file: relativePath,
          line: lineNum,
          type: hasTailwindGradient ? 'tailwind' : 'css'
        })
      }
    }
  }
}

// ============================================================================
// Main execution
// ============================================================================

async function main() {
  console.log('🔍 Scanning for CTA violations...\n')

  // Get all files to scan
  const files = await glob(SCAN_DIRS, { cwd: ROOT, absolute: true })

  for (const file of files) {
    await scanFile(file)
  }

  // Report results
  let hasViolations = false

  // Report hardcoded Vultr URLs
  if (violations.hardcodedVultr.length > 0) {
    hasViolations = true
    console.error('❌ FAIL: Hardcoded Vultr affiliate URLs found (outside lib/offers.ts)')
    console.error('')
    for (const v of violations.hardcodedVultr) {
      console.error(`   ${v.file}:${v.line}`)
      console.error(`   Found: ${v.url}`)
      console.error(`   Fix: Move to lib/offers.ts and use PRIMARY_OFFER.url`)
      console.error('')
    }
  }

  // Report forbidden colors
  if (violations.forbiddenColors.length > 0) {
    hasViolations = true
    console.error('❌ FAIL: Forbidden color tokens found (bg-green-, bg-purple-, bg-blue-)')
    console.error('')
    for (const v of violations.forbiddenColors) {
      console.error(`   ${v.file}:${v.line}`)
      console.error(`   Found: "${v.match}" matches pattern /${v.pattern}/`)
      console.error(`   Fix: Use semantic color variables (bg-brand-primary, text-text-primary)`)
      console.error('')
    }
  }

  // Report gradient usage in CTAs
  if (violations.gradients.length > 0) {
    hasViolations = true
    console.error('❌ FAIL: Gradient usage in CTA components/pages')
    console.error('')
    for (const v of violations.gradients) {
      console.error(`   ${v.file}:${v.line}`)
      console.error(`   Found: ${v.type} gradient`)
      console.error(`   Fix: Use bg-brand-primary (no gradients in CTAs)`)
      console.error('')
    }
  }

  if (!hasViolations) {
    console.log('✅ All checks passed!')
    console.log('   - No hardcoded Vultr affiliate URLs')
    console.log('   - No forbidden color tokens')
    console.log('   - No gradient usage in CTA components')
  }

  process.exit(hasViolations ? 1 : 0)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
