import * as React from "react";
import * as ReactDOM from "react-dom";
import { cn } from "../../lib/utils";

/* ── Types ─────────────────────────────────────────────────────────────────── */

export interface ContextMenuItemDef {
  label: string;
  shortcut?: string;
  onClick?: () => void;
  variant?: "default" | "danger";
  disabled?: boolean;
}

export interface ContextMenuGroupDef {
  label?: string;
  items: ContextMenuItemDef[];
}

export interface ContextMenuProps {
  children: React.ReactNode;
  groups?: ContextMenuGroupDef[];
  items?: ContextMenuItemDef[];
  className?: string;
}

/* ── ContextMenu ───────────────────────────────────────────────────────────── */

const ContextMenu = ({
  children,
  groups,
  items,
  className,
}: ContextMenuProps) => {
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const normalizedGroups: ContextMenuGroupDef[] =
    groups ?? (items ? [{ items }] : []);

  React.useEffect(() => {
    if (!pos) return;

    const onMouseDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setPos(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPos(null);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [pos]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const menuW = 220;
    const menuH = normalizedGroups.reduce(
      (acc, g) => acc + g.items.length * 36 + (g.label ? 32 : 0) + 8,
      8,
    );
    const x = Math.min(e.clientX, window.innerWidth - menuW - 8);
    const y = Math.min(e.clientY, window.innerHeight - menuH - 8);
    setPos({ x, y });
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      className={cn("select-none", className)}
    >
      {children}
      {pos &&
        ReactDOM.createPortal(
          <div
            ref={menuRef}
            role="menu"
            className="fixed z-dropdown bg-surface-2 border border-border shadow-[0_16px_48px_rgba(0,0,0,0.5)] py-1 min-w-[200px] animate-in fade-in-0 zoom-in-95 duration-150"
            style={{ left: pos.x, top: pos.y }}
          >
            {normalizedGroups.map((group, gi) => (
              <React.Fragment key={gi}>
                {gi > 0 && <div className="border-t border-border my-1" />}
                {group.label && (
                  <p className="font-display text-[10px] tracking-[0.12em] uppercase text-muted-foreground px-4 py-2">
                    {group.label}
                  </p>
                )}
                {group.items.map((item, ii) => (
                  <button
                    key={ii}
                    role="menuitem"
                    type="button"
                    disabled={item.disabled}
                    onClick={() => {
                      item.onClick?.();
                      setPos(null);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm flex items-center justify-between gap-8 transition-colors",
                      item.variant === "danger"
                        ? "text-muted-foreground hover:bg-ef-red/[0.06] hover:text-ef-red"
                        : "text-muted-foreground hover:bg-primary/[0.06] hover:text-primary",
                      item.disabled && "opacity-40 pointer-events-none",
                    )}
                  >
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <span className="font-mono text-[11px] text-ef-gray-mid shrink-0">
                        {item.shortcut}
                      </span>
                    )}
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
};
ContextMenu.displayName = "ContextMenu";

export { ContextMenu };
export type {
  ContextMenuItemDef as ContextMenuItem,
  ContextMenuGroupDef as ContextMenuGroup,
};
