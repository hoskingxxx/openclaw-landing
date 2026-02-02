#!/usr/bin/env tsx

/**
 * Build-time validation for blog posts and routes
 *
 * This script verifies:
 * 1. All blog posts have valid canonicalPath
 * 2. All blog posts have corresponding content files
 * 3. All canonicalPaths match expected routes
 * 4. No dead links in hardcoded references
 *
 * Run this during build to catch errors early.
 */

import { validateBlogPosts, getAllSlugs } from "../lib/blog.js";

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

function validateRoutes(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate blog posts
  const blogValidation = validateBlogPosts();
  if (!blogValidation.valid) {
    errors.push(...blogValidation.errors);
  }

  // Check that all slugs are valid URL segments
  const slugs = getAllSlugs();
  for (const slug of slugs) {
    // Check for invalid characters in slug
    if (!/^[a-z0-9-]+$/.test(slug)) {
      errors.push(`Invalid slug "${slug}": must contain only lowercase letters, numbers, and hyphens`);
    }

    // Check for consecutive hyphens
    if (slug.includes("--")) {
      warnings.push(`Slug "${slug}" contains consecutive hyphens. Consider using single hyphens.`);
    }

    // Check for leading/trailing hyphens
    if (slug.startsWith("-") || slug.endsWith("-")) {
      errors.push(`Invalid slug "${slug}": cannot start or end with a hyphen`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

function main() {
  console.log("🔍 Running build-time validation...\n");

  const result = validateRoutes();

  // Print warnings
  if (result.warnings.length > 0) {
    console.log("⚠️  Warnings:");
    result.warnings.forEach((warning) => console.log(`   ${warning}`));
    console.log();
  }

  // Print errors
  if (result.errors.length > 0) {
    console.error("❌ Validation failed:");
    result.errors.forEach((error) => console.error(`   ${error}`));
    console.error("\n🛑 Build failed. Please fix the errors above.");
    process.exit(1);
  }

  console.log("✅ All validations passed!");
  console.log(`   - ${getAllSlugs().length} blog post(s) validated`);
  console.log(`   - All canonical paths are valid`);
  console.log(`   - All content files exist`);
}

main();
