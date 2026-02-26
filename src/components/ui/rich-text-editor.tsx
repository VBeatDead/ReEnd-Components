import * as React from "react";
import { cn } from "../../lib/utils";

/* ─── Types ──────────────────────────────────────────────────────────────── */
export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  minHeight?: number;
  mode?: "markdown" | "preview";
  onModeChange?: (mode: "markdown" | "preview") => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */
/** Minimal markdown → HTML renderer for the preview pane */
function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^---$/gm, "<hr />")
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/^[-*] (.+)$/gm, "<li class=\"ul\">$1</li>")
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/__(.+?)__/g, "<u>$1</u>")
    .replace(/~~(.+?)~~/g, "<s>$1</s>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\n\n+/g, "</p><p>")
    .replace(/^(?!<[hbloius])(.+)$/gm, (line) => {
      if (line.trim() === "") return "";
      if (line.startsWith("<")) return line;
      return `<p>${line}</p>`;
    });
}

/** Wrap selected text in textarea with markdown syntax */
function wrapSelection(
  textarea: HTMLTextAreaElement,
  before: string,
  after: string = before,
  placeholder = "",
) {
  const { selectionStart: start, selectionEnd: end, value } = textarea;
  const selected = value.slice(start, end) || placeholder;
  const newVal = value.slice(0, start) + before + selected + after + value.slice(end);
  const newCursor = start + before.length + selected.length;
  return { newVal, newCursor };
}

/** Insert at cursor, on a new line if needed */
function insertBlock(
  textarea: HTMLTextAreaElement,
  block: string,
) {
  const { selectionStart: start, value } = textarea;
  const needsNewline = start > 0 && value[start - 1] !== "\n";
  const insertion = (needsNewline ? "\n" : "") + block + "\n";
  const newVal = value.slice(0, start) + insertion + value.slice(start);
  const newCursor = start + insertion.length;
  return { newVal, newCursor };
}

/* ─── Toolbar button ─────────────────────────────────────────────────────── */
interface ToolbarBtnProps {
  label: string;
  title?: string;
  active?: boolean;
  onClick: () => void;
}
const ToolbarBtn = ({ label, title, active, onClick }: ToolbarBtnProps) => (
  <button
    type="button"
    title={title ?? label}
    onClick={onClick}
    className={cn(
      "w-8 h-8 flex items-center justify-center text-[13px] font-['JetBrains_Mono',monospace]",
      "text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-all duration-150 select-none",
      active && "text-primary bg-primary/[0.08]",
    )}
    aria-pressed={active}
  >
    {label}
  </button>
);

const ToolbarSep = () => (
  <div className="w-px h-5 bg-border mx-1.5 shrink-0" aria-hidden="true" />
);

/* ─── Component ──────────────────────────────────────────────────────────── */
const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
  (
    {
      value: controlledValue,
      onChange,
      placeholder = "Type your content here...",
      maxLength,
      minHeight = 240,
      mode: controlledMode,
      onModeChange,
      disabled,
      className,
      id,
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(controlledValue ?? "");
    const [internalMode, setInternalMode] = React.useState<"markdown" | "preview">(
      controlledMode ?? "markdown",
    );
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    const value = controlledValue ?? internalValue;
    const mode = controlledMode ?? internalMode;

    React.useEffect(() => {
      if (controlledValue !== undefined) setInternalValue(controlledValue);
    }, [controlledValue]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const next = e.target.value;
      if (maxLength && next.length > maxLength) return;
      if (controlledValue === undefined) setInternalValue(next);
      onChange?.(next);
    };

    const handleMode = (m: "markdown" | "preview") => {
      if (controlledMode === undefined) setInternalMode(m);
      onModeChange?.(m);
    };

    const applyInline = (before: string, after: string = before, ph = "text") => {
      const ta = textareaRef.current;
      if (!ta || disabled) return;
      const { newVal, newCursor } = wrapSelection(ta, before, after, ph);
      const next = maxLength ? newVal.slice(0, maxLength) : newVal;
      if (controlledValue === undefined) setInternalValue(next);
      onChange?.(next);
      requestAnimationFrame(() => {
        ta.focus();
        ta.setSelectionRange(newCursor, newCursor);
      });
    };

    const applyBlock = (block: string) => {
      const ta = textareaRef.current;
      if (!ta || disabled) return;
      const { newVal, newCursor } = insertBlock(ta, block);
      const next = maxLength ? newVal.slice(0, maxLength) : newVal;
      if (controlledValue === undefined) setInternalValue(next);
      onChange?.(next);
      requestAnimationFrame(() => {
        ta.focus();
        ta.setSelectionRange(newCursor, newCursor);
      });
    };

    const charCount = value.length;

    return (
      <div
        ref={ref}
        id={id}
        className={cn(
          "flex flex-col",
          disabled && "opacity-38 pointer-events-none",
          className,
        )}
      >
        {/* Toolbar */}
        <div className="flex items-center gap-0.5 flex-wrap px-3 py-2 bg-surface-1 border border-border border-b-0">
          {/* Text formatting */}
          <ToolbarBtn label="B" title="Bold (**text**)" onClick={() => applyInline("**", "**", "bold")} />
          <ToolbarBtn label="I" title="Italic (*text*)" onClick={() => applyInline("*", "*", "italic")} />
          <ToolbarBtn label="U" title="Underline (__text__)" onClick={() => applyInline("__", "__", "text")} />
          <ToolbarBtn label="S" title="Strikethrough (~~text~~)" onClick={() => applyInline("~~", "~~", "text")} />

          <ToolbarSep />

          {/* Headings */}
          <ToolbarBtn label="H1" title="Heading 1" onClick={() => applyBlock("# Heading 1")} />
          <ToolbarBtn label="H2" title="Heading 2" onClick={() => applyBlock("## Heading 2")} />
          <ToolbarBtn label="H3" title="Heading 3" onClick={() => applyBlock("### Heading 3")} />

          <ToolbarSep />

          {/* Block elements */}
          <ToolbarBtn label="❝" title="Blockquote" onClick={() => applyBlock("> Quote")} />
          <ToolbarBtn label="≡" title="Unordered list" onClick={() => applyBlock("- Item")} />
          <ToolbarBtn label="≡·" title="Ordered list" onClick={() => applyBlock("1. Item")} />

          <ToolbarSep />

          {/* Insert */}
          <ToolbarBtn label="url" title="Link" onClick={() => applyInline("[", "](https://)", "link text")} />
          <ToolbarBtn label="img" title="Image" onClick={() => applyInline("![", "](https://)", "alt text")} />
          <ToolbarBtn label="⎯" title="Horizontal divider (---)" onClick={() => applyBlock("---")} />
          <ToolbarBtn label="`" title="Inline code" onClick={() => applyInline("`", "`", "code")} />
        </div>

        {/* Content area */}
        {mode === "markdown" ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            spellCheck
            className={cn(
              "w-full resize-y bg-surface-0 border border-border",
              "text-foreground font-['JetBrains_Mono',monospace] text-sm leading-relaxed",
              "px-5 py-4 outline-none transition-colors duration-150",
              "placeholder:text-muted-foreground/40",
              "focus:border-primary",
              "focus:[&]:border-primary",
            )}
            style={{ minHeight: `${minHeight}px` }}
            aria-multiline="true"
            aria-label="Rich text editor content"
          />
        ) : (
          /* Preview pane */
          <div
            className={cn(
              "w-full bg-surface-0 border border-border",
              "px-5 py-4 text-foreground text-base leading-[1.65]",
              "prose-endfield",
              "[&_h1]:font-display [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:uppercase [&_h1]:text-foreground [&_h1]:mt-6 [&_h1]:mb-3",
              "[&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:uppercase [&_h2]:text-foreground [&_h2]:mt-5 [&_h2]:mb-2.5",
              "[&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-4 [&_h3]:mb-2",
              "[&_blockquote]:border-l-[3px] [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:bg-primary/[0.03] [&_blockquote]:text-foreground/70",
              "[&_a]:text-[hsl(var(--ef-blue-light))] [&_a]:underline",
              "[&_code]:font-['JetBrains_Mono',monospace] [&_code]:text-sm [&_code]:bg-surface-2 [&_code]:px-1.5 [&_code]:py-0.5",
              "[&_ul_li]:list-disc [&_ul_li]:ml-5 [&_ul_li]:marker:text-primary",
              "[&_ol_li]:list-decimal [&_ol_li]:ml-5",
              "[&_hr]:border-none [&_hr]:h-px [&_hr]:bg-gradient-to-r [&_hr]:from-transparent [&_hr]:via-primary/30 [&_hr]:to-transparent [&_hr]:my-6",
              "[&_p]:mb-3",
              "[&_strong]:text-foreground [&_strong]:font-bold",
              "[&_em]:italic",
              "[&_u]:underline",
              "[&_s]:line-through [&_s]:text-muted-foreground/70",
            )}
            style={{ minHeight: `${minHeight}px` }}
            dangerouslySetInnerHTML={{
              __html: value ? renderMarkdown(value) : `<p class="text-muted-foreground/40">${placeholder}</p>`,
            }}
            aria-label="Preview"
            aria-live="polite"
          />
        )}

        {/* Footer */}
        <div className="flex items-center justify-between px-3 py-2 bg-surface-1 border border-border border-t-0 text-[12px] text-muted-foreground/70">
          <span>
            {charCount.toLocaleString()}
            {maxLength ? ` / ${maxLength.toLocaleString()}` : ""}{" "}
            <span className="opacity-50">characters</span>
          </span>

          {/* Mode toggle */}
          <div className="flex items-center gap-0">
            <button
              type="button"
              onClick={() => handleMode("markdown")}
              className={cn(
                "font-display text-[11px] uppercase tracking-wider px-3 py-1 transition-colors",
                mode === "markdown"
                  ? "text-primary border-b border-primary"
                  : "text-muted-foreground/70 hover:text-muted-foreground",
              )}
            >
              MARKDOWN
            </button>
            <button
              type="button"
              onClick={() => handleMode("preview")}
              className={cn(
                "font-display text-[11px] uppercase tracking-wider px-3 py-1 transition-colors",
                mode === "preview"
                  ? "text-primary border-b border-primary"
                  : "text-muted-foreground/70 hover:text-muted-foreground",
              )}
            >
              PREVIEW
            </button>
          </div>
        </div>
      </div>
    );
  },
);
RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };
