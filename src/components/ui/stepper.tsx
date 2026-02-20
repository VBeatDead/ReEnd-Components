import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Types ───────────────────────────────────────────────────────────────── */

export interface StepItem {
  label: string;
  description?: string;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepItem[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function getStepState(
  index: number,
  currentStep: number,
): "complete" | "current" | "upcoming" {
  if (index < currentStep) return "complete";
  if (index === currentStep) return "current";
  return "upcoming";
}

/* ── Component ───────────────────────────────────────────────────────────── */

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    { steps, currentStep, orientation = "horizontal", className, ...props },
    ref,
  ) => {
    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          className={cn("flex flex-col gap-0", className)}
          {...props}
        >
          {steps.map((step, i) => {
            const state = getStepState(i, currentStep);
            const isComplete = state === "complete";
            const isCurrent = state === "current";
            const isLast = i === steps.length - 1;
            const marker = isComplete || isCurrent ? "◆" : "◇";

            return (
              <div key={i} className="flex items-start gap-3 relative">
                {/* Node column */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <span
                    className={cn(
                      "font-mono text-[13px] leading-none",
                      isComplete && "text-primary",
                      isCurrent &&
                        "text-primary drop-shadow-[0_0_6px_rgba(255,212,41,0.6)]",
                      !isComplete && !isCurrent && "text-white/20",
                    )}
                    aria-hidden="true"
                  >
                    {marker}
                  </span>
                  {!isLast && (
                    <div
                      className={cn(
                        "flex-1 w-px min-h-6 mt-1",
                        isComplete ? "bg-primary" : "bg-white/10",
                      )}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pb-6 last:pb-0">
                  <p
                    className={cn(
                      "font-display text-[11px] uppercase tracking-wider mt-1",
                      isCurrent && "text-foreground font-semibold",
                      isComplete && "text-primary",
                      !isComplete && !isCurrent && "text-muted-foreground/60",
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-[12px] text-muted-foreground/60 mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Horizontal (default)
    return (
      <div
        ref={ref}
        className={cn("flex items-start w-full min-w-max", className)}
        {...props}
      >
        {steps.map((step, i) => {
          const state = getStepState(i, currentStep);
          const isComplete = state === "complete";
          const isCurrent = state === "current";
          const isLast = i === steps.length - 1;
          const marker = isComplete || isCurrent ? "◆" : "◇";

          return (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center flex-shrink-0">
                <span
                  className={cn(
                    "font-mono text-[13px] leading-none mb-1.5",
                    isComplete && "text-primary",
                    isCurrent &&
                      "text-primary drop-shadow-[0_0_6px_rgba(255,212,41,0.6)]",
                    !isComplete && !isCurrent && "text-white/20",
                  )}
                  aria-hidden="true"
                >
                  {marker}
                </span>
                <p
                  className={cn(
                    "font-display text-[11px] uppercase tracking-wider mt-1",
                    isCurrent && "text-foreground font-semibold",
                    isComplete && "text-primary",
                    !isComplete && !isCurrent && "text-muted-foreground/60",
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-[12px] text-muted-foreground/60 mt-0.5 text-center">
                    {step.description}
                  </p>
                )}
              </div>

              {/* Connector between steps */}
              {!isLast && (
                <div
                  className={cn(
                    "flex-1 h-px self-start mt-[0.45em] mx-2",
                    isComplete ? "bg-primary" : "bg-white/10",
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  },
);
Stepper.displayName = "Stepper";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { Stepper };
