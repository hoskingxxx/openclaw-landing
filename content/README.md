# Content Authoring Guidelines

## CRITICAL: Markdown Syntax Rules (MUST FOLLOW)

### Links: NEVER use raw HTML `<a>` tags

**❌ FORBIDDEN:**
```mdx
> <a href="https://www.vultr.com/?ref=9863490" data-link="affiliate">**Deploy on Vultr**</a>
```

**✅ REQUIRED:**
```mdx
> [**Deploy on Vultr**](https://www.vultr.com/?ref=9863490&utm_source=openclaw&utm_medium=content&utm_campaign=slug&utm_content=article_link)
```

### Why?

The MDX rendering pipeline (`remark → remarkRehype → rehypeSanitize → rehypeStringify`) processes content in stages:

1. **remark/remarkRehype**: Converts Markdown to HTML AST. Raw HTML `<a>` tags inside blockquotes get mangled/stripped during AST transformation.
2. **rehypeSanitize**: Security layer that strips unsafe HTML. Missing attributes = stripped tags.
3. **rehype plugins**: Add `data-link="affiliate"` or `data-link="cluster"` attributes automatically.

**Result**: Hand-written `<a>` tags → broken rendering → links disappear or show as plain text.

### How Affiliate Links Work (AUTOMATIC)

You write plain Markdown:
```mdx
[**Deploy on Vultr (Cloud GPU)**](https://www.vultr.com/?ref=9863490&utm_source=openclaw&utm_medium=content&utm_campaign=article_name&utm_content=article_link)
```

The `rehypeVultrEnrich` plugin AUTOMATICALLY adds:
- `data-link="affiliate"` (for CSS blue color)
- `data-umami-event="vultr_click"` (analytics)
- `data-umami-event-ref="9863490"` (tracking)
- `vultr-cta` CSS classes (button styling)

### How Cluster Links Work (AUTOMATIC)

Cluster links are internal guide navigation links that display as blue. Three contexts are automatically marked:

**1. Related Articles sections:**
```mdx
## Related Articles

- [Fix CUDA OOM Errors](/guides/fix-openclaw-cuda-oom-errors) - VRAM guide
- [Fix Slow Inference](/guides/fix-openclaw-slow-inference) - Bandwidth tips
```

**2. Navigation/index tables:**
```mdx
| Error | Fix | Full Guide |
|-------|-----|------------|
| CUDA OOM | Reduce context | [Fix CUDA OOM](/guides/fix-openclaw-cuda-oom-errors) |
```

**3. "Still Stuck?" diagnostic sections (bottom of all guides):**
```mdx
### Still Stuck? Check Your Hardware

Sometimes the code is fine, but the GPU is simply refusing to cooperate.
Compare your specs against the [Hardware Reality Table](/guides/hardware-requirements-reality-check).
```

The rehype plugins AUTOMATICALLY:
1. Wrap Related sections in `<div data-block="related">`
2. Wrap Stuck sections in `<div data-block="stuck">`
3. Detect `<table>` elements (navigation tables)
4. Add `data-link="cluster"` to `/guides/` links in these contexts

### What About Other Links?

**External links (nodejs.org, GitHub, etc.)**:
```mdx
See [Node.js documentation](https://nodejs.org) for details.
```
→ Rendered as default color (no `data-link` attribute)

**Internal links in body text (not tables/Related sections)**:
```mdx
Check the [hardware requirements](/guides/hardware-requirements-reality-check).
```
→ Rendered as default color (no `data-link` attribute)

## Syntax Checklist

| Element | ✅ Use | ❌ Never Use |
|---------|--------|--------------|
| Affiliate links | `[](https://vultr.com/?ref=...)` | `<a href="...">` |
| Internal links | `[](/guides/...` | `<a href="/guides/...">` |
| Blockquotes | `> **text**` | `<blockquote><strong>` |
| Bold | `**text**` | `<strong>text</strong>` |
| Code | `` `code` `` | `<code>code</code>` |

## Why This Matters

Every time someone writes `<a href="...">` in MDX:
1. Link gets stripped by sanitize → **broken UX**
2. Author adds `data-link` manually → **still stripped**
3. We debug for 2 hours → **waste time**

**Rule of thumb**: If you're typing `<` and `>` in MDX, you're probably doing it wrong. Use Markdown syntax.

## Exceptions (NONE)

There are NO exceptions to this rule. If you need special styling:
- Add a rehype plugin (like `rehypeVultrEnrich`)
- Add a CSS class (via sanitize schema)
- DO NOT write raw HTML

## Verification

Before committing:
```bash
# Check for forbidden HTML in MDX
grep -r '<a href=' content/posts/
grep -r '<strong>' content/posts/
grep -r '<blockquote>' content/posts/

# If any results found → REWRITE in Markdown
```

---

**Bottom line**: Write Markdown. Let the plugins handle the rest.
