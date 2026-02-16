import { useState, useEffect, useCallback, useRef } from "react";
import { Search } from "lucide-react";
import { sidebarData } from "./sidebarData";
import { HighlightText } from "./HighlightText";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (id: string) => void;
}

const allItems = sidebarData.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.title })),
);

export const CommandPalette = ({
  open,
  onOpenChange,
  onNavigate,
}: CommandPaletteProps) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? allItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.section.toLowerCase().includes(query.toLowerCase()),
      )
    : allItems;

  // Group results by section
  const grouped = filtered.reduce<Record<string, typeof allItems>>(
    (acc, item) => {
      if (!acc[item.section]) acc[item.section] = [];
      acc[item.section].push(item);
      return acc;
    },
    {},
  );

  const flatFiltered = Object.values(grouped).flat();

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Focus trap — keep Tab within dialog
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'input, button, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleFocusTrap);
    return () => document.removeEventListener("keydown", handleFocusTrap);
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(
      `[data-index="${selectedIndex}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const handleSelect = useCallback(
    (id: string) => {
      onNavigate(id);
      onOpenChange(false);
    },
    [onNavigate, onOpenChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, flatFiltered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && flatFiltered[selectedIndex]) {
        e.preventDefault();
        handleSelect(flatFiltered[selectedIndex].id);
      } else if (e.key === "Escape") {
        onOpenChange(false);
      }
    },
    [flatFiltered, selectedIndex, handleSelect, onOpenChange],
  );

  if (!open) return null;

  let itemIndex = -1;

  return (
    <div className="fixed inset-0 z-[100]" onClick={() => onOpenChange(false)}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative flex items-start justify-center pt-[15vh]">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Search components"
          className="w-full max-w-[560px] mx-4 bg-surface-2 border border-border shadow-[0_24px_64px_rgba(0,0,0,0.7)] animate-fade-in"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent text-base text-foreground outline-none flex-1 placeholder:text-muted-foreground font-body"
              placeholder="Search components..."
              autoComplete="off"
            />
            <kbd className="font-mono text-[10px] bg-surface-3 px-1.5 py-0.5 border border-border text-muted-foreground shrink-0">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div ref={listRef} className="max-h-[400px] overflow-y-auto py-2">
            {flatFiltered.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No results found for "{query}"
                </p>
              </div>
            ) : (
              Object.entries(grouped).map(([section, items]) => (
                <div key={section}>
                  <p className="font-ui text-[10px] tracking-[0.12em] uppercase text-muted-foreground px-4 py-2">
                    {section}
                  </p>
                  {items.map((item) => {
                    itemIndex++;
                    const idx = itemIndex;
                    return (
                      <button
                        key={item.id}
                        data-index={idx}
                        onClick={() => handleSelect(item.id)}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${
                          idx === selectedIndex
                            ? "bg-primary/[0.08] text-primary"
                            : "text-muted-foreground hover:bg-primary/[0.06] hover:text-primary"
                        }`}
                      >
                        <span className="text-[8px]">
                          {idx === selectedIndex ? "◆" : "◇"}
                        </span>
                        <HighlightText text={item.label} query={query} />
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border px-4 py-2 flex items-center gap-4 text-[10px] text-muted-foreground font-mono">
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span>esc close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
