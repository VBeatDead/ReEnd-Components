import * as React from "react";
import {
  Panel,
  Group as PanelGroup,
  Separator as PanelResizeHandle,
} from "react-resizable-panels";
import { cn } from "../../lib/utils";

interface ResizeHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical";
}

const ResizeHandle = ({ direction = "horizontal", className, ...props }: ResizeHandleProps) => (
  <PanelResizeHandle
    className={cn(
      "group relative flex items-center justify-center bg-border transition-colors duration-150",
      "hover:bg-primary/40 focus:outline-none focus:bg-primary/40",
      direction === "horizontal" ? "w-1 cursor-col-resize" : "h-1 cursor-row-resize",
      className,
    )}
    {...props}
  >
    <span
      aria-hidden="true"
      className={cn(
        "text-[8px] text-muted-foreground group-hover:text-primary transition-colors",
        direction === "horizontal" ? "rotate-0" : "rotate-90",
      )}
    >
      ◆
    </span>
  </PanelResizeHandle>
);

ResizeHandle.displayName = "ResizeHandle";

export { Panel, PanelGroup, PanelResizeHandle, ResizeHandle };
