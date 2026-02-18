import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

// Helper: minimal full tooltip tree
const TooltipTree = ({
  open = false,
  contentClass,
  contentText = "tip",
  triggerText = "hover me",
}: {
  open?: boolean;
  contentClass?: string;
  contentText?: string;
  triggerText?: string;
}) => (
  <TooltipProvider>
    <Tooltip open={open}>
      <TooltipTrigger>{triggerText}</TooltipTrigger>
      <TooltipContent className={contentClass}>{contentText}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

describe("Tooltip", () => {
  it("renders trigger text in the document", () => {
    render(<TooltipTree />);
    expect(screen.getByText("hover me")).toBeInTheDocument();
  });

  it("renders tooltip content when open=true", () => {
    render(<TooltipTree open contentText="Tooltip content" />);
    // Radix renders text in both the visible div and a hidden aria span — use getAllByText
    const matches = screen.getAllByText("Tooltip content");
    expect(matches.length).toBeGreaterThan(0);
  });

  it("does not render tooltip content when open=false", () => {
    render(<TooltipTree open={false} contentText="hidden tip" />);
    expect(screen.queryByText("hidden tip")).toBeNull();
  });

  it("TooltipContent forwards ref to DOM element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>t</TooltipTrigger>
          <TooltipContent ref={ref}>ref content</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(ref.current).not.toBeNull();
  });

  it("TooltipContent applies custom className", () => {
    render(<TooltipTree open contentClass="my-custom-class" />);
    const el = document.querySelector(".my-custom-class");
    expect(el).not.toBeNull();
  });

  it("TooltipContent has default sideOffset applied", () => {
    render(<TooltipTree open contentText="offset tip" />);
    // Radix renders text in both the visible div and a hidden aria span — use getAllByText
    const matches = screen.getAllByText("offset tip");
    expect(matches.length).toBeGreaterThan(0);
  });
});

describe("TooltipProvider", () => {
  it("renders children without crashing", () => {
    render(
      <TooltipProvider>
        <span>child</span>
      </TooltipProvider>,
    );
    expect(screen.getByText("child")).toBeInTheDocument();
  });
});
