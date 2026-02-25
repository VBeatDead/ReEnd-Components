import * as React from "react";
import { cn } from "../../lib/utils";

/* ── Types ─────────────────────────────────────────────────────────────────── */

export interface CommandItem {
  id: string;
  label: string;
  recent?: boolean;
  onSelect?: () => void;
}

export interface CommandGroup {
  label: string;
  items: CommandItem[];
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: CommandGroup[];
  onSelect?: (item: CommandItem) => void;
  placeholder?: string;
}

/* ── Hook ──────────────────────────────────────────────────────────────────── */

export function useCommandPalette() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return {
    open,
    toggle: () => setOpen((p) => !p),
    close: () => setOpen(false),
  };
}

/* ── Helpers ───────────────────────────────────────────────────────────────── */

function filterGroups(groups: CommandGroup[], query: string): CommandGroup[] {
  if (!query.trim()) return groups;
  const q = query.toLowerCase();
  return groups
    .map((g) => ({
      ...g,
      items: g.items.filter((i) => i.label.toLowerCase().includes(q)),
    }))
    .filter((g) => g.items.length > 0);
}

/* ── CommandPalette ────────────────────────────────────────────────────────── */

const CommandPalette = ({
  open,
  onOpenChange,
  groups,
  onSelect,
  placeholder = "Type a command or search...",
}: CommandPaletteProps) => {
  const [query, setQuery] = React.useState("");
  const [activeIdx, setActiveIdx] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filtered = filterGroups(groups, query);
  const allItems = filtered.flatMap((g) => g.items);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIdx(0);
      const t = setTimeout(() => inputRef.current?.focus(), 10);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, allItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = allItems[activeIdx];
      if (item) {
        item.onSelect?.();
        onSelect?.(item);
        onOpenChange(false);
      }
    } else if (e.key === "Escape") {
      onOpenChange(false);
    }
  };

  if (!open) return null;

  let itemCounter = 0;

  return (
    <div className="fixed inset-0 z-modal flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-[600px] mx-4 bg-surface-2 border border-border shadow-[0_24px_64px_rgba(0,0,0,0.6)] animate-in fade-in-0 zoom-in-95 duration-150"
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <span className="text-muted-foreground select-none" aria-hidden="true">
            ⌕
          </span>
          <input
            ref={inputRef}
            className="bg-transparent text-base text-card-foreground outline-none flex-1 placeholder:text-muted-foreground/50"
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
            aria-label="Search"
            aria-autocomplete="list"
          />
          <kbd className="font-mono text-[10px] bg-surface-3 px-1.5 py-0.5 border border-border text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="py-2 max-h-[320px] overflow-y-auto" role="listbox">
          {filtered.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              No results found.
            </p>
          ) : (
            filtered.map((group) => (
              <div key={group.label}>
                <p className="font-display text-[10px] tracking-[0.12em] uppercase text-muted-foreground px-4 py-2">
                  {group.label}
                </p>
                {group.items.map((item) => {
                  const idx = itemCounter++;
                  const isActive = idx === activeIdx;
                  return (
                    <button
                      key={item.id}
                      role="option"
                      aria-selected={isActive}
                      className={cn(
                        "w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors",
                        isActive
                          ? "bg-primary/[0.08] text-primary"
                          : "text-muted-foreground hover:bg-primary/[0.06] hover:text-primary",
                      )}
                      onClick={() => {
                        item.onSelect?.();
                        onSelect?.(item);
                        onOpenChange(false);
                      }}
                      onMouseEnter={() => setActiveIdx(idx)}
                    >
                      <span className="text-[8px] text-primary" aria-hidden="true">
                        {item.recent ? "◆" : "◇"}
                      </span>
                      {item.label}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
CommandPalette.displayName = "CommandPalette";

export { CommandPalette };
