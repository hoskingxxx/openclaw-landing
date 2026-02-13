import { redirect } from 'next/navigation';

/**
 * /tools/preflight → /preflight (Permanent Redirect)
 *
 * This route exists for backward compatibility with any external links
 * that may have pointed to /tools/preflight.
 *
 * The primary canonical URL is /preflight, so this redirects (301/308).
 */
export async function generateMetadata() {
  return {
    title: 'Redirecting...',
  };
}

export default function PreflightRedirectPage() {
  // Permanent redirect to /preflight
  // Next.js redirect() returns 'never', so we don't need return statement
  redirect('/preflight');
}
