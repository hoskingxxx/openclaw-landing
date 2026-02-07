"use client"

import { usePathname } from 'next/navigation';
import { trackAffiliateClick } from "@/lib/tracking";
import { Button } from "@/components/ui/Button";

export function StopDebuggingCTA() {
  const pathname = usePathname();
  const postSlug = pathname?.split("/").filter(Boolean).pop() || "";
  const utmContent = "stop_debugging_box";
  const affLink = `https://www.vultr.com/?ref=9864821-9J&utm_source=openclaw&utm_medium=content&utm_campaign=${postSlug}&utm_content=${utmContent}`;

  return (
    <div className="my-12 p-6 border-l-4 border-brand-primary bg-slate-50 dark:bg-slate-900/50 rounded-r-lg shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            🛑 Still Stuck? Stop Debugging.
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            If you've spent more than 30 minutes on this error, it's likely your local environment battling the model requirements.
            <br />
            <span className="font-mono text-xs opacity-80 block mt-1">
              Reality: Debugging costs hours. Cloud GPUs cost minutes.
            </span>
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <Button
            variant="brand"
            size="md"
            href={affLink}
            external
            onClick={() => trackAffiliateClick({ source: "vultr_stop_debugging_box", postSlug })}
            data-umami-event="affiliate_click"
            data-umami-partner="vultr"
            data-umami-placement="stop_debugging_box"
          >
            Deploy on Vultr (Cloud GPU) →
          </Button>
          <span className="text-[10px] text-slate-400">
            Disclosure: Affiliate link. No extra cost to you.
          </span>
        </div>
      </div>
    </div>
  );
}
