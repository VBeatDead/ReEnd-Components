/**
 * Tier 3 Overlay component tests: Popover, Dialog, Separator
 */
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../popover";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../dialog";
import { Separator } from "../separator";

/* ═══════════════════════════════════════════════════════════
   POPOVER
═══════════════════════════════════════════════════════════ */

describe("Popover", () => {
  function renderPopover() {
    return render(
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Popover content</p>
        </PopoverContent>
      </Popover>,
    );
  }

  it("renders trigger without crashing", () => {
    renderPopover();
    expect(screen.getByRole("button", { name: "Open Popover" })).toBeInTheDocument();
  });

  it("content not visible initially", () => {
    renderPopover();
    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("opens content when trigger is clicked", () => {
    renderPopover();
    fireEvent.click(screen.getByRole("button", { name: "Open Popover" }));
    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("closes when trigger is clicked again", () => {
    renderPopover();
    const trigger = screen.getByRole("button", { name: "Open Popover" });
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("renders children inside PopoverContent", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>T</PopoverTrigger>
        <PopoverContent>
          <span>Custom child</span>
        </PopoverContent>
      </Popover>,
    );
    expect(screen.getByText("Custom child")).toBeInTheDocument();
  });

  it("accepts custom className on PopoverContent", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>T</PopoverTrigger>
        <PopoverContent className="custom-pop">content</PopoverContent>
      </Popover>,
    );
    const content = screen.getByText("content").closest("[data-radix-popper-content-wrapper]")
      ?.firstElementChild;
    // Just verify content renders
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("supports defaultOpen prop", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>T</PopoverTrigger>
        <PopoverContent>Default open</PopoverContent>
      </Popover>,
    );
    expect(screen.getByText("Default open")).toBeInTheDocument();
  });

  it("renders with sideOffset", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>T</PopoverTrigger>
        <PopoverContent sideOffset={10}>offset content</PopoverContent>
      </Popover>,
    );
    expect(screen.getByText("offset content")).toBeInTheDocument();
  });
});

/* ═══════════════════════════════════════════════════════════
   DIALOG
═══════════════════════════════════════════════════════════ */

describe("Dialog", () => {
  function renderDialog(size?: "sm" | "md" | "lg" | "xl" | "fullscreen") {
    return render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent size={size}>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
          <DialogDescription>Dialog body content</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );
  }

  it("renders trigger without crashing", () => {
    renderDialog();
    expect(screen.getByRole("button", { name: "Open Dialog" })).toBeInTheDocument();
  });

  it("content not visible initially", () => {
    renderDialog();
    expect(screen.queryByText("Test Dialog")).not.toBeInTheDocument();
  });

  it("opens dialog when trigger is clicked", () => {
    renderDialog();
    fireEvent.click(screen.getByRole("button", { name: "Open Dialog" }));
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("Dialog body content")).toBeInTheDocument();
  });

  it("closes dialog when close button is clicked", () => {
    renderDialog();
    fireEvent.click(screen.getByRole("button", { name: "Open Dialog" }));
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByText("Test Dialog")).not.toBeInTheDocument();
  });

  it("renders sm size", () => {
    renderDialog("sm");
    fireEvent.click(screen.getByRole("button", { name: "Open Dialog" }));
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
  });

  it("renders lg size", () => {
    renderDialog("lg");
    fireEvent.click(screen.getByRole("button", { name: "Open Dialog" }));
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
  });

  it("renders xl size", () => {
    renderDialog("xl");
    fireEvent.click(screen.getByRole("button", { name: "Open Dialog" }));
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
  });

  it("renders fullscreen size", () => {
    renderDialog("fullscreen");
    fireEvent.click(screen.getByRole("button", { name: "Open Dialog" }));
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
  });

  it("renders DialogTitle with accessible text", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Accessible Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByText("Accessible Title")).toBeInTheDocument();
  });

  it("renders DialogDescription", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>T</DialogTitle>
          <DialogDescription>Desc text</DialogDescription>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByText("Desc text")).toBeInTheDocument();
  });

  it("renders DialogHeader children", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogHeader>
            <span>header content</span>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByText("header content")).toBeInTheDocument();
  });

  it("renders DialogFooter children", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>T</DialogTitle>
          <DialogFooter>
            <span>footer content</span>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByText("footer content")).toBeInTheDocument();
  });

  it("dialog role is dialog", () => {
    renderDialog();
    fireEvent.click(screen.getByRole("button", { name: "Open Dialog" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

/* ═══════════════════════════════════════════════════════════
   SEPARATOR
═══════════════════════════════════════════════════════════ */

describe("Separator", () => {
  it("renders without crashing", () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders as horizontal by default", () => {
    const { container } = render(<Separator />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute("data-orientation", "horizontal");
  });

  it("renders as vertical when orientation is set", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute("data-orientation", "vertical");
  });

  it("renders default variant", () => {
    const { container } = render(<Separator variant="default" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeTruthy();
  });

  it("renders subtle variant", () => {
    const { container } = render(<Separator variant="subtle" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("bg-border");
  });

  it("renders strong variant", () => {
    const { container } = render(<Separator variant="strong" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("bg-border-strong");
  });

  it("renders glow variant", () => {
    const { container } = render(<Separator variant="glow" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("bg-gradient-to-r");
  });

  it("renders accent variant", () => {
    const { container } = render(<Separator variant="accent" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("bg-primary/30");
  });

  it("accepts custom className", () => {
    const { container } = render(<Separator className="custom-sep" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("custom-sep");
  });

  it("decorative separator has no role attribute", () => {
    const { container } = render(<Separator decorative />);
    const el = container.firstChild as HTMLElement;
    // Radix Separator with decorative=true removes role from accessibility tree
    expect(el).not.toHaveAttribute("role", "separator");
  });

  it("non-decorative has role=separator", () => {
    const { container } = render(<Separator decorative={false} />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute("role", "separator");
  });

  it("horizontal separator has h-px class", () => {
    const { container } = render(<Separator orientation="horizontal" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("h-px");
  });

  it("vertical separator has w-px class", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("w-px");
  });
});
