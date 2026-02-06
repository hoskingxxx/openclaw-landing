#!/usr/bin/env node

/**
 * MDX Issue Detector - Comprehensive check for common MDX problems
 *
 * SCANS: All content/posts/*.mdx files
 * DETECTS:
 * - Unclosed code fences (```)
 * - className usage (should be class in MDX)
 * - Import statements outside frontmatter
 * - Naked <a> tags (with analysis)
 * - Empty FAQ sections
 *
 * Usage: node scripts/check-mdx-issues.js
 * Exit code: 0 = pass, 1 = issues found
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '../content/posts');

function checkCodeFences(content) {
  const issues = [];
  const lines = content.split('\n');
  let inCodeBlock = false;
  let codeBlockStart = -1;

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Check for code fence marker (``` or more)
    if (/^```\w*$/.test(trimmed)) {
      if (!inCodeBlock) {
        // Opening a code block
        inCodeBlock = true;
        codeBlockStart = index + 1;
      } else {
        // Closing a code block
        inCodeBlock = false;
        codeBlockStart = -1;
      }
    }
  });

  // Check for unclosed fence at end of file
  if (inCodeBlock && codeBlockStart !== -1) {
    issues.push({
      type: 'unclosed_fence',
      line: codeBlockStart,
      message: `Unclosed code fence starting at line ${codeBlockStart} (reached EOF without closing)`,
    });
  }

  return issues;
}

function checkClassNameUsage(content) {
  const issues = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Skip frontmatter
    if (line.trim() === '---') return;

    // Check for className (JSX syntax) in MDX
    if (line.includes('className=')) {
      // Check if it's in a code block
      const beforeLines = lines.slice(0, index);
      const inCodeBlock = beforeLines.reverse().some(l => l.trim().startsWith('```') && !l.trim().startsWith('```'));

      if (!inCodeBlock) {
        issues.push({
          type: 'className_usage',
          line: index + 1,
          message: `Found className= (JSX) at line ${index + 1}, use class= (HTML) in MDX`,
          content: line.trim().substring(0, 60),
        });
      }
    }
  });

  return issues;
}

function checkImportStatements(content, fileName) {
  const issues = [];
  const lines = content.split('\n');
  let frontmatterEnd = -1;
  let inCodeBlock = false;

  // Find end of frontmatter
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      frontmatterEnd = i;
      break;
    }
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Track code blocks
    if (/^```\w*$/.test(trimmed)) {
      inCodeBlock = !inCodeBlock;
    }

    // Skip if in code block (Python/TypeScript examples)
    if (inCodeBlock) return;

    // Check for MDX component imports (not code examples)
    // MDX imports use: import Component from "@/components/..."
    // Code examples use: import library_name (no from)
    if (trimmed.startsWith('import ') && trimmed.includes('from "@/')) {
      // Allow imports within 5 lines after frontmatter, or if no frontmatter exists
      const importZone = frontmatterEnd === -1 ? 5 : frontmatterEnd + 5;
      if (frontmatterEnd !== -1 && index > importZone) {
        // Flag imports deep in content (not near the top)
        issues.push({
          type: 'import_after_frontmatter',
          line: index + 1,
          message: `MDX component import at line ${index + 1} should be at top of file (after frontmatter)`,
          content: trimmed.substring(0, 60),
        });
      }
    }
  });

  return issues;
}

function checkNakedATags(content) {
  const issues = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Look for <a href= but exclude component usage
    const regex = /<a\s+href=/g;
    const matches = line.matchAll(regex);

    for (const match of matches) {
      const beforeMatch = line.substring(0, match.index).trim();

      // Skip if inside code block (check previous lines)
      const beforeLines = lines.slice(0, index);
      let inCodeBlock = false;
      for (let i = beforeLines.length - 1; i >= 0; i--) {
        if (beforeLines[i].trim().startsWith('```')) {
          inCodeBlock = true;
          break;
        }
        if (beforeLines[i].includes('```') && !beforeLines[i].includes('```')) {
          break;
        }
      }

      if (!inCodeBlock && !beforeMatch.endsWith('<')) {
        issues.push({
          type: 'naked_a_tag',
          line: index + 1,
          message: `Naked <a href= tag found at line ${index + 1}, use component or markdown link`,
          content: line.trim().substring(0, 80),
        });
      }
    }
  });

  return issues;
}

function checkEmptyFAQ(content) {
  const issues = [];
  const lines = content.split('\n');

  // Look for FAQ section headers
  lines.forEach((line, index) => {
    // Match ## FAQ or ## FAQ with variations
    if (/^##\s+FAQ/i.test(line.trim())) {
      // Check next 100 lines for actual FAQ content
      const nextLines = lines.slice(index + 1, Math.min(index + 101, lines.length));
      const nextLinesText = nextLines.join('\n');

      // Check for various FAQ content patterns
      const hasContent =
        nextLinesText.includes('Q:') ||
        nextLinesText.includes('itemScope') ||
        nextLinesText.includes('itemProp') ||
        nextLinesText.includes('schema.org/FAQ') ||
        nextLinesText.includes('schema.org/Question') ||
        nextLinesText.includes('<div itemScope') ||
        nextLinesText.includes('<div itemscope');

      // Check if we hit another section header (not empty, just short)
      const nextSectionIndex = nextLines.findIndex(l => /^##\s/.test(l));

      if (!hasContent && nextSectionIndex === -1) {
        issues.push({
          type: 'empty_faq',
          line: index + 1,
          message: `FAQ section at line ${index + 1} appears to be empty or missing content`,
        });
      }
    }
  });

  return issues;
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  const allIssues = [];

  allIssues.push(...checkCodeFences(content));
  allIssues.push(...checkClassNameUsage(content));
  allIssues.push(...checkImportStatements(content, fileName));
  allIssues.push(...checkNakedATags(content));
  allIssues.push(...checkEmptyFAQ(content));

  return allIssues;
}

function main() {
  const files = fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => path.join(POSTS_DIR, f));

  let totalIssues = 0;
  const report = [];

  files.forEach(filePath => {
    const fileName = path.basename(filePath);
    const issues = checkFile(filePath);

    if (issues.length > 0) {
      totalIssues += issues.length;
      report.push(`\n${fileName}:`);
      issues.forEach(issue => {
        const icon = {
          unclosed_fence: '🚨',
          className_usage: '⚠️ ',
          import_after_frontmatter: '📦',
          naked_a_tag: '🔗',
          empty_faq: '❓',
        }[issue.type] || '⚠️ ';

        report.push(`  ${icon} [${issue.type}] Line ${issue.line}: ${issue.message}`);
        if (issue.content) {
          report.push(`     ${issue.content}`);
        }
      });
    }
  });

  if (totalIssues > 0) {
    console.error('\n❌ MDX Issues Check Failed\n');
    console.error(`Found ${totalIssues} potential issues:\n`);
    report.forEach(r => console.error(r));
    console.error('\nFix guidelines:');
    console.error('1. Close all code fences with ```');
    console.error('2. Use class= instead of className= in MDX (HTML, not JSX)');
    console.error('3. Keep imports at top of file (after frontmatter)');
    console.error('4. Use components or [markdown](url) instead of <a href=>');
    console.error('5. Ensure FAQ sections have schema.org content or Q&A items\n');
    process.exit(1);
  } else {
    console.log('✅ MDX Issues Check Passed');
    console.log(`Scanned ${files.length} files, no issues found`);
    process.exit(0);
  }
}

main();
