import { FallbackProps } from "react-error-boundary";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { t } = useTranslation("common");
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-12 h-12 bg-destructive/10 flex items-center justify-center clip-corner-sm mb-4">
        <AlertTriangle className="w-6 h-6 text-destructive" />
      </div>
      <h2 className="font-display text-sm font-bold tracking-[0.08em] uppercase text-foreground mb-2">
        {t("errors.section_error")}
      </h2>
      <p className="font-mono text-xs text-muted-foreground max-w-md mb-1">
        {t("errors.section_error_desc")}
      </p>
      <p className="font-mono text-[10px] text-destructive/70 max-w-md mb-6 break-all">
        {error.message}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="flex items-center gap-2 px-4 py-2 bg-surface-1 border border-border text-sm text-foreground hover:border-primary/50 hover:text-primary transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span className="font-ui text-xs tracking-[0.08em] uppercase">
          {t("actions.retry")}
        </span>
      </button>
    </div>
  );
};
