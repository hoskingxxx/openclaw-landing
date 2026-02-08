import Link from "next/link";
import { Coffee } from "lucide-react";
import { siteConfig, footerLinks, socialIcons } from "@/lib/site-config";
import { getBMCLink } from "@/lib/bmc";

export function Footer() {
  return (
    <footer className="footer border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">{siteConfig.name}</h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Unofficial community docs.<br />
              Not affiliated with the official project.
            </p>
          </div>

          {/* Docs */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Docs</h4>
            <ul className="space-y-2">
              {footerLinks.documentation.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="block text-sm text-text-secondary hover:text-text-primary transition-colors py-2">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Official */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Official</h4>
            <ul className="space-y-2">
              {footerLinks.official.map((link) => {
                const icon = link.icon === "github" ? socialIcons.github : socialIcons.discord;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox={`0 0 ${icon.viewBox}`}>
                        <path d={icon.path} />
                      </svg>
                      {link.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      {/* Full width divider */}
      <div className="border-t border-white/10"></div>
      {/* Bottom Line - full width container */}
      <div className="max-w-7xl mx-auto px-6 py-8 text-center space-y-2">
        <p className="text-xs text-text-tertiary font-mono">
          {siteConfig.tagline}
        </p>
        <p className="text-sm text-text-tertiary">
          {siteConfig.copyright}
        </p>
        <a
          href={getBMCLink("footer")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-text-tertiary hover:text-brand-primary transition-colors"
          data-cta="bmc-footer"
        >
          <Coffee className="w-3 h-3" />
          Buy me a coffee
        </a>
      </div>
    </footer>
  );
}
