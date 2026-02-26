import * as React from "react";
import { cn } from "../../lib/utils";

export interface CopyClipboardProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  resetDelay?: number;
  onCopy?: () => void;
}

const CopyClipboard = React.forwardRef<HTMLButtonElement, CopyClipboardProps>(
  ({ text, resetDelay = 2000, onCopy, className, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false);
    const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

    React.useEffect(() => () => clearTimeout(timerRef.current), []);

    const handleClick = async () => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        onCopy?.();
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), resetDelay);
      } catch {
        /* empty */
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 border border-border",
          "font-mono text-xs text-muted-foreground",
          "hover:border-primary/30 hover:text-primary transition-all duration-150",
          className,
        )}
        aria-label={copied ? "Copied!" : "Copy to clipboard"}
        {...props}
      >
        {copied ? (
          <>
            <span className="text-ef-green text-[10px]">✓</span>
            <span className="text-ef-green">Copied!</span>
          </>
        ) : (
          <>
            <span className="text-[10px]">⎘</span>
            <span>Copy</span>
          </>
        )}
      </button>
    );
  },
);
CopyClipboard.displayName = "CopyClipboard";

export { CopyClipboard };
