import * as React from "react";
import { cn } from "../../lib/utils";

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  /** Show success state on all boxes */
  success?: boolean;
  error?: boolean;
  disabled?: boolean;
  /** Show resend link — pass initial countdown seconds (e.g. 45) */
  resendCooldown?: number;
  /** Called when user clicks RESEND */
  onResend?: () => void;
  resendLabel?: string;
  className?: string;
}

const OTPInput = ({
  length = 6,
  value = "",
  onChange,
  onComplete,
  success,
  error,
  disabled,
  resendCooldown,
  onResend,
  resendLabel = "RESEND",
  className,
}: OTPInputProps) => {
  const [shaking, setShaking] = React.useState(false);
  const [countdown, setCountdown] = React.useState(resendCooldown ?? 0);
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    if (error) {
      setShaking(true);
      const t = setTimeout(() => setShaking(false), 500);
      return () => clearTimeout(t);
    }
  }, [error]);

  React.useEffect(() => {
    if (!resendCooldown) return;
    setCountdown(resendCooldown);
  }, [resendCooldown]);

  React.useEffect(() => {
    if (countdown <= 0) return;
    const id = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(id); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [countdown]);

  const digits = Array.from({ length }, (_, i) => value[i] ?? "");
  const midpoint = Math.ceil(length / 2);

  const handleChange = (index: number, char: string) => {
    const digit = char.replace(/\D/g, "").slice(-1);
    const next = digits.map((d, i) => (i === index ? digit : d)).join("");
    onChange?.(next);
    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
    if (next.replace(/\s/g, "").length === length && !next.includes("")) {
      onComplete?.(next);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
        const next = digits.map((d, i) => (i === index - 1 ? "" : d)).join("");
        onChange?.(next);
      } else {
        const next = digits.map((d, i) => (i === index ? "" : d)).join("");
        onChange?.(next);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const next = Array.from({ length }, (_, i) => pasted[i] ?? "").join("");
    onChange?.(next);
    const focusIndex = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
    if (pasted.length === length) onComplete?.(next);
  };

  const handleResend = () => {
    if (countdown > 0 || !onResend) return;
    onResend();
    if (resendCooldown) setCountdown(resendCooldown);
  };

  const renderInput = (digit: string, index: number) => (
    <input
      key={index}
      ref={(el) => { inputsRef.current[index] = el; }}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={digit}
      disabled={disabled}
      aria-label={`Digit ${index + 1} of ${length}`}
      onChange={(e) => handleChange(index, e.target.value)}
      onKeyDown={(e) => handleKeyDown(index, e)}
      onPaste={handlePaste}
      onFocus={(e) => e.target.select()}
      className={cn(
        /* Base — matches spec: 48px × 56px, Orbitron 24px bold */
        "w-12 h-14 font-['Orbitron',monospace] text-2xl font-bold text-center",
        "bg-surface-1 border border-border caret-primary",
        "focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/[0.10]",
        "focus:bg-surface-hover transition-all duration-200",
        /* Filled: yellow text, white/20 border */
        digit && !success && !error && "border-white/20 text-primary",
        /* Error */
        error && "border-destructive ring-[3px] ring-destructive/[0.10]",
        /* Success */
        success && "border-ef-green text-ef-green",
        /* Disabled */
        disabled && "bg-surface-canvas text-disabled cursor-not-allowed opacity-100",
      )}
    />
  );

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      {/* Input row */}
      <div
        className={cn("flex items-center", shaking && "animate-shake")}
        aria-label="One-time password input"
        role="group"
      >
        {/* First group */}
        <div className="flex items-center gap-2">
          {digits.slice(0, midpoint).map((digit, index) => renderInput(digit, index))}
        </div>

        {/* Group separator — 16px gap as spec */}
        {length >= 4 && (
          <div className="w-4 flex justify-center" aria-hidden="true">
            <div className="w-2 h-px bg-border" />
          </div>
        )}

        {/* Second group */}
        <div className="flex items-center gap-2">
          {digits.slice(midpoint).map((digit, index) => renderInput(digit, index + midpoint))}
        </div>
      </div>

      {/* Resend section */}
      {onResend !== undefined && (
        <div className="text-center text-[13px] text-muted-foreground">
          {countdown > 0 ? (
            <span>
              {resendLabel} available in{" "}
              <span className="font-['Orbitron',monospace] text-xs text-muted-foreground">
                {countdown}s
              </span>
            </span>
          ) : (
            <span>
              Didn't receive code?{" "}
              <button
                type="button"
                onClick={handleResend}
                className="font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
              >
                [{resendLabel}]
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

OTPInput.displayName = "OTPInput";

export { OTPInput };
