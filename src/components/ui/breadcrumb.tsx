import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Types ───────────────────────────────────────────────────────────────── */

export interface BreadcrumbItemData {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItemData[];
  separator?: React.ReactNode;
}

/* ── Component ───────────────────────────────────────────────────────────── */

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator, className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(className)}
        {...props}
      >
        <ol className="flex items-center gap-2 flex-wrap font-display text-[12px] uppercase tracking-wider">
          {items.map((item, i) => {
            const isCurrent = i === items.length - 1;
            return (
              <React.Fragment key={i}>
                <li>
                  {isCurrent || !item.href ? (
                    <span
                      aria-current={isCurrent ? "page" : undefined}
                      className={
                        isCurrent
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground"
                      }
                    >
                      {item.label}
                    </span>
                  ) : (
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
                {!isCurrent && (
                  <li
                    aria-hidden="true"
                    className="text-[10px] text-white/20 select-none"
                  >
                    {separator ?? "›"}
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  },
);
Breadcrumb.displayName = "Breadcrumb";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { Breadcrumb };
