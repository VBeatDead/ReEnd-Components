import * as React from "react";
import { cn } from "../../lib/utils";

export interface CookieConsentProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  onAccept: () => void;
  onCustomize?: () => void;
  acceptLabel?: string;
  customizeLabel?: string;
}

const CookieConsent = React.forwardRef<HTMLDivElement, CookieConsentProps>(
  (
    {
      message,
      onAccept,
      onCustomize,
      acceptLabel = "ACCEPT ALL",
      customizeLabel = "CUSTOMIZE",
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "fixed bottom-0 left-0 right-0 z-overlay",
        "bg-surface-2 border-t border-border px-6 py-4",
        "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
        className,
      )}
      role="dialog"
      aria-label="Cookie consent"
      {...props}
    >
      <p className="text-sm text-muted-foreground flex-1">
        {message ??
          "We use cookies to enhance your experience. By continuing to use this site, you agree to our use of cookies."}
      </p>
      <div className="flex gap-3 shrink-0">
        {onCustomize && (
          <button
            type="button"
            onClick={onCustomize}
            className="text-muted-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-4 py-2 hover:text-foreground transition-colors bg-transparent"
          >
            {customizeLabel}
          </button>
        )}
        <button
          type="button"
          onClick={onAccept}
          className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-2"
        >
          {acceptLabel}
        </button>
      </div>
    </div>
  ),
);
CookieConsent.displayName = "CookieConsent";

export { CookieConsent };
