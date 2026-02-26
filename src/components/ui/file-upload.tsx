import * as React from "react";
import { cn } from "../../lib/utils";

export type FileUploadState =
  | "idle"
  | "hover"
  | "dragging"
  | "drag-invalid"
  | "uploading"
  | "success"
  | "error"
  | "disabled";

export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  accept?: string;
  multiple?: boolean;
  /** Max file size in bytes */
  maxSize?: number;
  onFileSelect?: (files: File[]) => void;
  state?: FileUploadState;
  /** Overall upload progress 0–100 (used when state=uploading) */
  progress?: number;
  error?: string;
}

/* Per-file item type for the file list */
interface FileItem {
  file: File;
  previewUrl?: string;
  progress: number;
  status: "uploading" | "done" | "error";
  error?: string;
}

const ZONE_CONFIG: Record<
  FileUploadState,
  { label: string; icon: string; border: string; bg?: string; iconColor: string }
> = {
  idle: {
    label: "Drag files here or click to upload",
    icon: "↑",
    border: "border-2 border-dashed border-border",
    iconColor: "text-muted-foreground/70",
  },
  hover: {
    label: "Release to upload",
    icon: "↑",
    border: "border-2 border-dashed border-border/70",
    iconColor: "text-muted-foreground",
  },
  dragging: {
    label: "Drop to upload",
    icon: "↑",
    border: "border-2 border-dashed border-primary",
    bg: "bg-primary/[0.03]",
    iconColor: "text-primary",
  },
  "drag-invalid": {
    label: "File type not supported",
    icon: "✕",
    border: "border-2 border-dashed border-destructive",
    bg: "bg-destructive/[0.03]",
    iconColor: "text-destructive",
  },
  uploading: {
    label: "Uploading...",
    icon: "◆",
    border: "border-2 border-solid border-border",
    iconColor: "text-primary/40",
  },
  success: {
    label: "Upload complete",
    icon: "✓",
    border: "border-2 border-solid border-ef-green/40",
    bg: "bg-ef-green/[0.03]",
    iconColor: "text-ef-green",
  },
  error: {
    label: "Upload failed",
    icon: "✕",
    border: "border-2 border-solid border-destructive/40",
    bg: "bg-destructive/[0.03]",
    iconColor: "text-destructive",
  },
  disabled: {
    label: "Upload disabled",
    icon: "↑",
    border: "border-2 border-dashed border-border/50",
    bg: "bg-surface-canvas",
    iconColor: "text-muted-foreground/40",
  },
};

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      accept,
      multiple,
      maxSize,
      onFileSelect,
      state: controlledState,
      progress = 0,
      error,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalState, setInternalState] = React.useState<FileUploadState>("idle");
    const [files, setFiles] = React.useState<FileItem[]>([]);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const instructionsId = React.useId();

    const state = controlledState ?? internalState;
    const config = ZONE_CONFIG[state];
    const isDisabled = state === "disabled";

    const isValidType = (file: File): boolean => {
      if (!accept) return true;
      const accepted = accept.split(",").map((a) => a.trim());
      return accepted.some((a) => {
        if (a.startsWith(".")) return file.name.toLowerCase().endsWith(a.toLowerCase());
        if (a.endsWith("/*")) return file.type.startsWith(a.replace("/*", "/"));
        return file.type === a;
      });
    };

    const processFiles = (rawFiles: File[]) => {
      if (!rawFiles.length) return;

      const valid: File[] = [];
      const items: FileItem[] = rawFiles.map((file) => {
        const sizeOk = !maxSize || file.size <= maxSize;
        const typeOk = isValidType(file);
        const hasError = !sizeOk
          ? `File exceeds ${maxSize ? (maxSize / 1024 / 1024).toFixed(0) : "?"} MB limit`
          : !typeOk
            ? "File type not supported"
            : undefined;
        if (!hasError) valid.push(file);
        return {
          file,
          previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
          progress: 0,
          status: hasError ? "error" : "uploading",
          error: hasError,
        };
      });

      setFiles(items);
      if (valid.length) onFileSelect?.(valid);
      if (!controlledState) setInternalState(valid.length ? "uploading" : "error");
    };

    const hasUploadingFiles = files.some((f) => f.status === "uploading");
    React.useEffect(() => {
      if (!hasUploadingFiles) return;
      const interval = setInterval(() => {
        setFiles((prev) => {
          const updated = prev.map((item) => {
            if (item.status !== "uploading") return item;
            const newProgress = Math.min(item.progress + 15, 100);
            return {
              ...item,
              progress: newProgress,
              status: newProgress >= 100 ? ("done" as const) : ("uploading" as const),
            };
          });
          const allDone = updated.every((i) => i.status !== "uploading");
          if (allDone && !controlledState) {
            const hasErrors = updated.some((i) => i.status === "error");
            setInternalState(hasErrors ? "error" : "success");
          }
          return updated;
        });
      }, 250);
      return () => clearInterval(interval);
    }, [hasUploadingFiles, controlledState]);

    React.useEffect(() => {
      if (controlledState === "success") {
        setFiles((prev) =>
          prev.map((item) =>
            item.status === "uploading" ? { ...item, progress: 100, status: "done" } : item,
          ),
        );
      } else if (controlledState === "error") {
        setFiles((prev) =>
          prev.map((item) =>
            item.status === "uploading" ? { ...item, status: "error" } : item,
          ),
        );
      }
    }, [controlledState]);

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      if (isDisabled || controlledState) return;
      const hasInvalid = accept && Array.from(e.dataTransfer.items).some(
        (item) => !accept.split(",").some((a) => {
          const t = a.trim();
          if (t.endsWith("/*")) return item.type.startsWith(t.replace("/*", "/"));
          return item.type === t;
        }),
      );
      setInternalState(hasInvalid ? "drag-invalid" : "dragging");
    };

    const handleDragLeave = () => {
      if (!controlledState) setInternalState("idle");
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      if (isDisabled) return;
      processFiles(Array.from(e.dataTransfer.files));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(Array.from(e.target.files ?? []));
      e.target.value = "";
    };

    const removeFile = (index: number) => {
      setFiles((prev) => {
        const next = prev.filter((_, i) => i !== index);
        if (next.length === 0 && !controlledState) setInternalState("idle");
        return next;
      });
    };

    return (
      <div className={cn("flex flex-col gap-2", className)} ref={ref} {...props}>
        {/* Drop zone */}
        <div
          className={cn(
            "relative flex flex-col items-center justify-center py-12 px-6 text-center",
            "transition-all duration-200 cursor-pointer bg-surface-0",
            config.border,
            config.bg,
            isDisabled && "opacity-50 cursor-not-allowed",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isDisabled && inputRef.current?.click()}
          role="button"
          tabIndex={isDisabled ? -1 : 0}
          aria-label="File upload zone"
          aria-describedby={state === "idle" ? instructionsId : undefined}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={isDisabled}
            onChange={handleChange}
            className="sr-only"
            aria-label="File input"
          />

          {/* Icon 48px */}
          <div
            className={cn("text-5xl mb-4 transition-colors", config.iconColor)}
            aria-hidden="true"
          >
            {config.icon}
          </div>

          <p className={cn("text-sm mb-1 transition-colors", config.iconColor === "text-muted-foreground/70" ? "text-foreground/80" : config.iconColor)}>
            {config.label}
          </p>

          {state === "idle" && (
            <p id={instructionsId} className="text-xs text-muted-foreground/70 mt-1">
              {accept ? `${accept.split(",").map(a => a.trim()).join(", ")} ` : ""}
              {maxSize ? `up to ${(maxSize / 1024 / 1024).toFixed(0)} MB` : ""}
            </p>
          )}

          {state === "idle" && (
            <button
              type="button"
              tabIndex={-1}
              className="mt-4 font-display text-[11px] uppercase tracking-wider border border-border px-4 py-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              [SELECT FILES]
            </button>
          )}

          {state === "uploading" && files.length === 0 && (
            /* Only show zone progress when there's no per-file list (controlled mode without files) */
            <div className="mt-3 w-full max-w-[200px]">
              <div className="h-[3px] bg-surface-2 w-full">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1 font-['Orbitron',monospace] text-[11px] text-muted-foreground text-center">
                {progress}%
              </p>
            </div>
          )}

          {error && (
            <p className="mt-2 text-[11px] font-mono text-destructive">{error}</p>
          )}
        </div>

        {/* Per-file list */}
        {files.length > 0 && (
          <div className="flex flex-col gap-2">
            {files.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 border border-border px-4 py-3 bg-surface-1"
              >
                {/* Thumbnail or icon */}
                {item.previewUrl ? (
                  <img
                    src={item.previewUrl}
                    alt={item.file.name}
                    className="w-20 h-20 object-cover border border-border bg-surface-1 shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center bg-surface-2 shrink-0 text-muted-foreground text-lg">
                    ◆
                  </div>
                )}

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{item.file.name}</p>
                  <p className="font-['Orbitron',monospace] text-[11px] text-muted-foreground/70">
                    {(item.file.size / 1024 / 1024).toFixed(1)} MB
                  </p>

                  {/* Per-file progress bar */}
                  {item.status === "uploading" && (
                    <div className="mt-2 h-[3px] bg-surface-2 w-full">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  )}
                  {item.status === "done" && (
                    <div className="mt-2 h-[3px] bg-ef-green w-full" />
                  )}
                  {item.status === "error" && (
                    <>
                      <div className="mt-2 h-[3px] bg-destructive w-full" />
                      {item.error && (
                        <p className="mt-1 text-[11px] text-destructive font-mono">{item.error}</p>
                      )}
                    </>
                  )}
                </div>

                {/* Percentage or status */}
                <div className="shrink-0 text-right">
                  {item.status === "uploading" && (
                    <span className="font-['Orbitron',monospace] text-[11px] text-muted-foreground min-w-[36px] block text-right">
                      {item.progress}%
                    </span>
                  )}
                  {item.status === "done" && (
                    <span className="text-ef-green text-sm">✓</span>
                  )}
                  {item.status === "error" && (
                    <span className="text-destructive text-sm">✕</span>
                  )}
                </div>

                {/* Remove button — always shows ✕ so users can remove after upload */}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="w-6 h-6 flex items-center justify-center shrink-0 text-muted-foreground/70 hover:text-destructive transition-colors cursor-pointer"
                  aria-label={`Remove ${item.file.name}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);
FileUpload.displayName = "FileUpload";

export { FileUpload };
