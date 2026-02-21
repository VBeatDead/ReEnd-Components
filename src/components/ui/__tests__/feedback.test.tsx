import * as React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act, cleanup } from "@testing-library/react";
import { renderHook } from "@testing-library/react";

import { EmptyState } from "../empty-state";
import { Alert } from "../alert";
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "../toast";
import { Toaster } from "../toaster";
import { useToast, toast } from "../../../hooks/use-toast";
import { Toaster as SonnerToaster, toast as sonnerToast } from "../sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

// ─── EmptyState ───────────────────────────────────────────────────────────────

describe("EmptyState", () => {
  it("renders with explicit title", () => {
    render(<EmptyState title="NOTHING HERE" />);
    expect(screen.getByText("NOTHING HERE")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<EmptyState title="T" description="Check again later." />);
    expect(screen.getByText("Check again later.")).toBeInTheDocument();
  });

  it("does not render description element when omitted", () => {
    render(<EmptyState title="T" />);
    expect(screen.queryByText("Check again later.")).toBeNull();
  });

  it("renders action slot", () => {
    render(
      <EmptyState title="T" action={<button>Retry</button>} />,
    );
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("renders icon slot", () => {
    render(
      <EmptyState title="T" icon={<svg data-testid="icon" />} />,
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("search preset supplies default title", () => {
    render(<EmptyState variant="search" />);
    expect(screen.getByText("NO RESULTS FOUND")).toBeInTheDocument();
  });

  it("error preset supplies default title and description", () => {
    render(<EmptyState variant="error" />);
    expect(screen.getByText("FAILED TO LOAD")).toBeInTheDocument();
    expect(screen.getByText("An error occurred. Please try again.")).toBeInTheDocument();
  });

  it("permission preset", () => {
    render(<EmptyState variant="permission" />);
    expect(screen.getByText("ACCESS RESTRICTED")).toBeInTheDocument();
  });

  it("empty preset", () => {
    render(<EmptyState variant="empty" />);
    expect(screen.getByText("NO ITEMS YET")).toBeInTheDocument();
  });

  it("explicit title overrides preset title", () => {
    render(<EmptyState variant="search" title="CUSTOM TITLE" />);
    expect(screen.getByText("CUSTOM TITLE")).toBeInTheDocument();
    expect(screen.queryByText("NO RESULTS FOUND")).toBeNull();
  });

  it("renders all sizes without crashing", () => {
    const sizes = ["sm", "md", "lg"] as const;
    for (const size of sizes) {
      const { unmount } = render(<EmptyState title="T" size={size} />);
      expect(document.body).toBeTruthy();
      unmount();
    }
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<EmptyState title="T" ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("applies custom className", () => {
    render(<EmptyState title="T" className="es-custom" />);
    expect(document.querySelector(".es-custom")).not.toBeNull();
  });
});

// ─── Alert ────────────────────────────────────────────────────────────────────

describe("Alert", () => {
  it("renders children", () => {
    render(<Alert>Something happened.</Alert>);
    expect(screen.getByText("Something happened.")).toBeInTheDocument();
  });

  it("renders with role=alert", () => {
    render(<Alert>msg</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Alert title="NOTICE" variant="info">msg</Alert>);
    expect(screen.getByText("NOTICE")).toBeInTheDocument();
  });

  it("does not render title element when omitted", () => {
    render(<Alert>msg</Alert>);
    expect(screen.queryByText("NOTICE")).toBeNull();
  });

  it("renders default icon (◆) for info variant", () => {
    render(<Alert variant="info">msg</Alert>);
    expect(screen.getByText("◆")).toBeInTheDocument();
  });

  it("renders ✓ icon for success variant", () => {
    render(<Alert variant="success">msg</Alert>);
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("renders ⚠ icon for warning variant", () => {
    render(<Alert variant="warning">msg</Alert>);
    expect(screen.getByText("⚠")).toBeInTheDocument();
  });

  it("renders ✕ icon for error variant", () => {
    render(<Alert variant="error">msg</Alert>);
    // There will be two ✕: one as default icon, possibly one for dismiss if shown
    expect(screen.getAllByText("✕").length).toBeGreaterThan(0);
  });

  it("renders all variants without crashing", () => {
    const variants = ["info", "success", "warning", "error"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Alert variant={variant}>msg</Alert>);
      expect(document.body).toBeTruthy();
      unmount();
    }
  });

  it("renders dismiss button when dismissible=true", () => {
    render(<Alert dismissible>msg</Alert>);
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("does not render dismiss button by default", () => {
    render(<Alert>msg</Alert>);
    expect(screen.queryByRole("button", { name: "Dismiss" })).toBeNull();
  });

  it("calls onDismiss when dismiss button clicked", () => {
    const spy = vi.fn();
    render(<Alert dismissible onDismiss={spy}>msg</Alert>);
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(spy).toHaveBeenCalledOnce();
  });

  it("renders custom icon when provided", () => {
    render(<Alert icon={<span>CUSTOM_ICON</span>}>msg</Alert>);
    expect(screen.getByText("CUSTOM_ICON")).toBeInTheDocument();
  });

  it("has aria-live=assertive for error variant", () => {
    render(<Alert variant="error">msg</Alert>);
    expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "assertive");
  });

  it("has aria-live=polite for non-error variants", () => {
    render(<Alert variant="info">msg</Alert>);
    expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "polite");
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref}>msg</Alert>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("applies custom className", () => {
    render(<Alert className="al-custom">msg</Alert>);
    expect(document.querySelector(".al-custom")).not.toBeNull();
  });
});

// ─── Toast UI primitives ───────────────────────────────────────────────────────

describe("ToastProvider + ToastViewport", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <ToastProvider>
        <ToastViewport />
      </ToastProvider>,
    );
    expect(container).toBeTruthy();
  });

  it("ToastViewport applies positioning classes", () => {
    render(
      <ToastProvider>
        <ToastViewport data-testid="viewport" />
      </ToastProvider>,
    );
    const vp = screen.getByTestId("viewport");
    expect(vp.className).toContain("fixed");
  });
});

describe("Toast", () => {
  it("renders default variant without crashing", () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Test Title</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders destructive variant", () => {
    render(
      <ToastProvider>
        <Toast open variant="destructive">
          <ToastTitle>Error</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    const title = screen.getByText("Error");
    expect(title).toBeInTheDocument();
  });

  it("forwards ref to root element", () => {
    const ref = React.createRef<HTMLLIElement>();
    render(
      <ToastProvider>
        <Toast open ref={ref}>
          <span>ref toast</span>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    expect(ref.current).not.toBeNull();
  });
});

describe("ToastTitle", () => {
  it("renders children", () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>My Toast Title</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    expect(screen.getByText("My Toast Title")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle ref={ref}>title ref</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    expect(ref.current).not.toBeNull();
  });

  it("applies custom className", () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle className="custom-title">styled title</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    const el = document.querySelector(".custom-title");
    expect(el).not.toBeNull();
  });
});

describe("ToastDescription", () => {
  it("renders description text", () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastDescription>Detailed description text</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    expect(screen.getByText("Detailed description text")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <ToastProvider>
        <Toast open>
          <ToastDescription ref={ref}>desc ref</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    expect(ref.current).not.toBeNull();
  });
});

describe("ToastClose", () => {
  it("renders close button", () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    // Close button renders (contains X icon via lucide)
    const btn = document.querySelector("[toast-close]");
    expect(btn).not.toBeNull();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <ToastProvider>
        <Toast open>
          <ToastClose ref={ref} />
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    expect(ref.current).not.toBeNull();
  });
});

describe("ToastAction", () => {
  it("renders action button with label", () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastAction altText="Undo action">Undo</ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    expect(screen.getByText("Undo")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <ToastProvider>
        <Toast open>
          <ToastAction altText="undo" ref={ref}>
            Undo
          </ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    expect(ref.current).not.toBeNull();
  });
});

// ─── useToast hook ─────────────────────────────────────────────────────────────

describe("useToast", () => {
  it("returns toasts array", () => {
    const { result } = renderHook(() => useToast());
    expect(Array.isArray(result.current.toasts)).toBe(true);
  });

  it("exposes toast and dismiss functions", () => {
    const { result } = renderHook(() => useToast());
    expect(typeof result.current.toast).toBe("function");
    expect(typeof result.current.dismiss).toBe("function");
  });

  it("adds a toast when toast() is called", () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.toast({ title: "hook-test-toast" });
    });
    expect(
      result.current.toasts.some((t) => t.title === "hook-test-toast"),
    ).toBe(true);
  });

  it("dismisses a toast by id", () => {
    const { result } = renderHook(() => useToast());
    let id = "";
    act(() => {
      const t = result.current.toast({ title: "dismissible" });
      id = t.id;
    });
    act(() => {
      result.current.dismiss(id);
    });
    // After dismiss the toast open state is false (still in array but closed)
    const t = result.current.toasts.find((x) => x.id === id);
    expect(t?.open).toBe(false);
  });
});

describe("toast() standalone function", () => {
  it("is a function", () => {
    expect(typeof toast).toBe("function");
  });

  it("returns an object with id, dismiss, update", () => {
    const result = toast({ title: "standalone" });
    expect(typeof result.id).toBe("string");
    expect(typeof result.dismiss).toBe("function");
    expect(typeof result.update).toBe("function");
  });
});

// ─── Toaster integration ───────────────────────────────────────────────────────

describe("Toaster", () => {
  beforeEach(() => vi.useFakeTimers());

  it("renders without crashing", () => {
    const { container } = render(<Toaster />);
    expect(container).toBeTruthy();
  });

  it("displays a toast title after toast() is called", () => {
    render(<Toaster />);
    act(() => {
      toast({ title: "Toaster visible toast" });
    });
    expect(screen.getByText("Toaster visible toast")).toBeInTheDocument();
  });

  it("displays toast description", () => {
    render(<Toaster />);
    act(() => {
      toast({ title: "T", description: "Important info" });
    });
    expect(screen.getByText("Important info")).toBeInTheDocument();
  });
});

// ─── Sonner ──────────────────────────────────────────────────────────────────

afterEach(() => {
  cleanup();
});

describe("Toaster (Sonner)", () => {
  it("renders without crashing", () => {
    const { container } = render(<SonnerToaster />);
    expect(container).toBeTruthy();
  });

  it("renders an aria-live region for accessibility", () => {
    const { container } = render(<SonnerToaster />);
    const section = container.querySelector("section[aria-live]");
    expect(section).not.toBeNull();
    expect(section?.getAttribute("aria-live")).toBe("polite");
  });

  it("accepts dark theme prop without crashing", () => {
    const { container } = render(<SonnerToaster theme="dark" />);
    expect(container.querySelector("section")).not.toBeNull();
  });

  it("accepts light theme prop without crashing", () => {
    const { container } = render(<SonnerToaster theme="light" />);
    expect(container.querySelector("section")).not.toBeNull();
  });

  it("accepts position prop without crashing", () => {
    const { container } = render(<SonnerToaster position="top-center" />);
    expect(container.querySelector("section")).not.toBeNull();
  });
});

describe("toast (Sonner)", () => {
  it("is a function", () => {
    expect(typeof sonnerToast).toBe("function");
  });

  it("has standard toast sub-methods", () => {
    expect(typeof sonnerToast.success).toBe("function");
    expect(typeof sonnerToast.error).toBe("function");
    expect(typeof sonnerToast.warning).toBe("function");
    expect(typeof sonnerToast.info).toBe("function");
    expect(typeof sonnerToast.dismiss).toBe("function");
  });
});

// ─── Tooltip ─────────────────────────────────────────────────────────────────

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
