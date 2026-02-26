import * as React from "react";
import { cn } from "../../lib/utils";

/* ── FooterColumn ─────────────────────────────────────────────────────────── */

export interface FooterColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const FooterColumn = React.forwardRef<HTMLDivElement, FooterColumnProps>(
  ({ title, className, children, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-3", className)} {...props}>
      <h3 className="font-display text-[12px] font-bold tracking-[0.15em] uppercase text-muted-foreground">
        {title}
      </h3>
      <ul className="space-y-2">{children}</ul>
    </div>
  ),
);
FooterColumn.displayName = "FooterColumn";

/* ── FooterLink ───────────────────────────────────────────────────────────── */

export interface FooterLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
}

const FooterLink = React.forwardRef<HTMLAnchorElement, FooterLinkProps>(
  ({ external, className, children, ...props }, ref) => (
    <li>
      <a
        ref={ref}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cn(
          "font-body text-sm text-ef-gray-mid hover:text-primary transition-colors duration-150 cursor-pointer",
          className,
        )}
        {...props}
      >
        {children}
      </a>
    </li>
  ),
);
FooterLink.displayName = "FooterLink";

/* ── Footer ───────────────────────────────────────────────────────────────── */

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  brand?: string;
  tagline?: string;
  copyright?: string;
  note?: string;
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ brand, tagline, copyright, note, className, children, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn(
        "bg-background border-t border-border",
        className,
      )}
      {...props}
    >
      {/* Main columns grid */}
      {children && (
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {children}
          </div>
        </div>
      )}

      {/* Bottom bar */}
      {(brand || copyright || note) && (
        <div className="border-t border-border">
          <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            {brand && (
              <div>
                <p className="font-display text-xs font-bold tracking-[0.1em] uppercase text-foreground">
                  {brand}
                </p>
                {tagline && (
                  <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
                    {tagline}
                  </p>
                )}
              </div>
            )}
            {copyright && (
              <p className="font-mono text-xs text-ef-gray-mid">{copyright}</p>
            )}
          </div>
          {note && (
            <div className="max-w-5xl mx-auto px-6 pb-6">
              <p className="font-mono text-[9px] text-muted-foreground/40 text-center leading-relaxed">
                {note}
              </p>
            </div>
          )}
        </div>
      )}
    </footer>
  ),
);
Footer.displayName = "Footer";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { Footer, FooterColumn, FooterLink };
