import * as React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "./toast";
import { Toaster } from "./toaster";
import { useToast, toast } from "../../hooks/use-toast";

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
