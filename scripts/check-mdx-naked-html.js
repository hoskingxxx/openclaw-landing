#!/usr/bin/env node

/**
 * MDX Naked HTML Detector
 *
 * SCANS: All content/posts/*.mdx files for naked HTML patterns
 * VIOLATIONS: <div>, <span>, <a>, <p>, <h1>-<h6> without component imports
 * EXEMPTIONS: MDX components (RealityCheck, SecondaryExitButton, etc.)
 *
 * Usage: node scripts/check-mdx-naked-html.js
 * Exit code: 0 = pass, 1 = violations found
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '../content/posts');

// Allowed MDX component imports (whitelist)
const ALLOWED_COMPONENTS = new Set([
  'RealityCheck',
  'SecondaryExitButton',
  'HashScrollFix',
  'Navigation',
  'Footer',
  // Add more as needed
]);

// Patterns that indicate naked HTML
const NAKED_HTML_PATTERNS = [
  // Opening tags without imports (with exemptions)
  /<div\s+(?!itemScope|itemscope|className)/g,  // Allow schema.org and JSX className
  /<span\s+(?!itemScope|itemscope|className)/g,
  /<a\s+href/g,  // markdown links are [text](url), raw HTML is <a href=
  /<p\s+>/g,
  /<h[1-6]\s+/g,
  // Self-closing tags
  /<br\s*\/>/g,
  /<hr\s*\/>/g,
];

// Exemptions: These are acceptable in MDX
const EXEMPT_PATTERNS = [
  /itemScope|itemscope/,  // Schema.org structured data (SEO)
  /itemType|itemtype/,    // Schema.org structured data (SEO)
  /itemProp|itemprop/,    // Schema.org structured data (SEO)
  /className=/,           // JSX className (component usage)
  /glass-card/,           // Styled content divs (pass through rehype-sanitize)
  /border-l-4/,           // Border utility classes (styled divs)
  /overflow-x-auto/,      // Table overflow containers (valid MDX HTML)
  /rounded-lg/,           // Border radius utilities (valid MDX HTML)
  /min-w-full/,           // Table width utilities (valid MDX HTML)
];

// Skip patterns that are actually MDX components
const COMPONENT_USAGE_PATTERN = /<([A-Z][a-zA-Z0-9]*)\s+/g;

function extractImports(content) {
  const imports = [];
  const importRegex = /import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const names = match[1].split(',').map(s => s.trim());
    names.forEach(name => imports.push(name));
  }

  // Also check for default imports
  const defaultImportRegex = /import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g;
  while ((match = defaultImportRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }

  return new Set(imports);
}

function extractComponentUsages(content) {
  const usages = new Set();
  let match;

  while ((match = COMPONENT_USAGE_PATTERN.exec(content)) !== null) {
    usages.add(match[1]);
  }

  return usages;
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const imports = extractImports(content);
  const usages = extractComponentUsages(content);
  const violations = [];
  const lines = content.split('\n');

  // Check for uppercase component usage without import
  for (const component of usages) {
    if (!ALLOWED_COMPONENTS.has(component) && !imports.has(component)) {
      violations.push({
        type: 'component_without_import',
        component,
      });
    }
  }

  // Check for naked HTML patterns
  lines.forEach((line, index) => {
    // Skip frontmatter (between ---)
    if (line.trim() === '---') return;

    // Skip exempted patterns (schema.org, JSX className)
    const isExempt = EXEMPT_PATTERNS.some(pattern => pattern.test(line));
    if (isExempt) return;

    // Skip lines within schema.org FAQ blocks (they contain <strong>, <code>, <a>)
    const prevLine = index > 0 ? lines[index - 1].trim() : '';
    const nextLine = index < lines.length - 1 ? lines[index + 1].trim() : '';
    if (prevLine.includes('itemScope') || prevLine.includes('itemProp') ||
        nextLine.includes('itemScope') || nextLine.includes('itemProp')) {
      return; // Inside structured data block
    }

    NAKED_HTML_PATTERNS.forEach(pattern => {
      if (pattern.test(line)) {
        // Check if this might be a component usage
        const componentMatch = line.match(/<([A-Z][a-zA-Z0-9]*)/);
        if (componentMatch) {
          const componentName = componentMatch[1];
          if (imports.has(componentName) || ALLOWED_COMPONENTS.has(componentName)) {
            return; // This is a component, skip
          }
        }

        violations.push({
          type: 'naked_html',
          line: index + 1,
          content: line.trim().substring(0, 80),
          pattern: pattern.toString(),
        });
      }
    });
  });

  return violations;
}

function main() {
  const files = fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => path.join(POSTS_DIR, f));

  let totalViolations = 0;
  const report = [];

  files.forEach(filePath => {
    const fileName = path.basename(filePath);
    const violations = checkFile(filePath);

    if (violations.length > 0) {
      totalViolations += violations.length;
      report.push(`\n${fileName}:`);
      violations.forEach(v => {
        if (v.type === 'component_without_import') {
          report.push(`  ⚠️  Component <${v.component}> used without import`);
        } else {
          report.push(`  ⚠️  Line ${v.line}: ${v.content}`);
        }
      });
    }
  });

  if (totalViolations > 0) {
    console.error('\n❌ MDX Naked HTML Check Failed\n');
    console.error('Found', totalViolations, 'potential violations:\n');
    report.forEach(r => console.error(r));
    console.error('\nFix guidelines:');
    console.error('1. Convert <div class="glass-card"> to React components');
    console.error('2. Use markdown syntax [text](url) instead of <a href>');
    console.error('3. Import and use MDX components instead of raw HTML\n');
    process.exit(1);
  } else {
    console.log('✅ MDX Naked HTML Check Passed');
    console.log(`Scanned ${files.length} files, no violations found`);
    process.exit(0);
  }
}

main();
