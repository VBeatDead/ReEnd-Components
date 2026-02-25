import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../../lib/utils";

/* ── Types ─────────────────────────────────────────────────────────────────── */

export interface DropdownItemDef {
  label: string;
  onClick?: () => void;
  variant?: "default" | "danger";
  disabled?: boolean;
}

export interface DropdownGroupDef {
  label?: string;
  items: DropdownItemDef[];
}

export interface DropdownProps {
  trigger: React.ReactNode;
  groups?: DropdownGroupDef[];
  items?: DropdownItemDef[];
  align?: "start" | "end" | "center";
  sideOffset?: number;
}

/* ── Dropdown ──────────────────────────────────────────────────────────────── */

const Dropdown = ({
  trigger,
  groups,
  items,
  align = "start",
  sideOffset = 4,
}: DropdownProps) => {
  const normalizedGroups: DropdownGroupDef[] =
    groups ?? (items ? [{ items }] : []);

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        {React.isValidElement(trigger) ? (
          trigger
        ) : (
          <button type="button">{trigger as React.ReactNode}</button>
        )}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "z-dropdown min-w-[180px] bg-surface-2 border border-border",
            "shadow-[0_16px_48px_rgba(0,0,0,0.5)] py-1",
            "animate-in fade-in-0 zoom-in-95 duration-150",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-100",
            "outline-none",
          )}
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
                <PopoverPrimitive.Close asChild key={ii}>
                  <button
                    type="button"
                    disabled={item.disabled}
                    onClick={item.onClick}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm transition-colors",
                      item.variant === "danger"
                        ? "text-muted-foreground hover:bg-ef-red/[0.06] hover:text-ef-red"
                        : "text-muted-foreground hover:bg-primary/[0.06] hover:text-primary",
                      item.disabled && "opacity-40 pointer-events-none",
                    )}
                  >
                    {item.label}
                  </button>
                </PopoverPrimitive.Close>
              ))}
            </React.Fragment>
          ))}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
Dropdown.displayName = "Dropdown";

export { Dropdown };
export type { DropdownItemDef as DropdownItem, DropdownGroupDef as DropdownGroup };
