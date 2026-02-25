/**
 * Tabs component tests (split from accordion-tabs.test.tsx)
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../tabs";

/* ═══════════════════════════════════════════════════════════
   TABS
═══════════════════════════════════════════════════════════ */

describe("Tabs", () => {
  function renderTabs(variant?: "underline" | "pill" | "bordered") {
    return render(
      <Tabs defaultValue="tab1">
        <TabsList variant={variant}>
          <TabsTrigger value="tab1" variant={variant}>Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" variant={variant}>Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );
  }

  it("renders without crashing", () => {
    renderTabs();
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
  });

  it("renders all tabs in the list", () => {
    renderTabs();
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
  });

  it("shows default tab content", () => {
    renderTabs();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("renders content for controlled value", () => {
    render(
      <Tabs value="tab2">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("renders underline variant", () => {
    const { container } = renderTabs("underline");
    expect(container.querySelector("[role='tablist']")).toBeTruthy();
  });

  it("renders pill variant", () => {
    const { container } = renderTabs("pill");
    expect(container.querySelector("[role='tablist']")).toBeTruthy();
  });

  it("renders bordered variant", () => {
    const { container } = renderTabs("bordered");
    expect(container.querySelector("[role='tablist']")).toBeTruthy();
  });

  it("tabs have correct role", () => {
    renderTabs();
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(2);
  });

  it("tabpanel exists for active tab", () => {
    renderTabs();
    expect(screen.getByRole("tabpanel")).toBeInTheDocument();
  });

  it("first tab is selected by default", () => {
    renderTabs();
    const tab1 = screen.getByText("Tab 1").closest("[role='tab']")!;
    expect(tab1).toHaveAttribute("data-state", "active");
  });

  it("first tab is aria-selected by default", () => {
    renderTabs();
    const tab1 = screen.getByText("Tab 1").closest("[role='tab']")!;
    expect(tab1).toHaveAttribute("aria-selected", "true");
  });

  it("accepts custom className on TabsList", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList className="custom-list">
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
        <TabsContent value="a">CA</TabsContent>
      </Tabs>,
    );
    const list = screen.getByRole("tablist");
    expect(list.className).toContain("custom-list");
  });

  it("accepts custom className on TabsContent", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
        <TabsContent value="a" className="custom-content">CA</TabsContent>
      </Tabs>,
    );
    const panel = screen.getByRole("tabpanel");
    expect(panel.className).toContain("custom-content");
  });
});
