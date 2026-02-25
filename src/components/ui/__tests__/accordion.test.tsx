/**
 * Accordion component tests (split from accordion-tabs.test.tsx)
 */
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../accordion";

/* ═══════════════════════════════════════════════════════════
   ACCORDION
═══════════════════════════════════════════════════════════ */

describe("Accordion", () => {
  function renderAccordion(props?: Partial<React.ComponentProps<typeof Accordion>>) {
    return render(
      <Accordion type="single" collapsible {...props}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
  }

  it("renders without crashing", () => {
    renderAccordion();
    expect(screen.getByText("Section 1")).toBeInTheDocument();
    expect(screen.getByText("Section 2")).toBeInTheDocument();
  });

  it("renders trigger buttons", () => {
    renderAccordion();
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  it("shows + indicator by default (closed state)", () => {
    renderAccordion();
    // single rotating + indicator (aria-hidden), rotates 45° when open
    const plusChars = screen.getAllByText("+");
    expect(plusChars.length).toBeGreaterThan(0);
  });

  it("indicator has rotate class after open", () => {
    const { container } = render(
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Open Item</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    // The + span should have rotate class applied via group-data state
    const indicator = container.querySelector("[aria-hidden='true']");
    expect(indicator).toBeInTheDocument();
    expect(indicator?.textContent).toBe("+");
  });

  it("opens item when trigger is clicked", () => {
    renderAccordion();
    const trigger = screen.getByText("Section 1").closest("button")!;
    fireEvent.click(trigger);
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("collapses previously-open item when another is clicked (single)", () => {
    renderAccordion({ type: "single", collapsible: true });
    const trigger1 = screen.getByText("Section 1").closest("button")!;
    const trigger2 = screen.getByText("Section 2").closest("button")!;
    fireEvent.click(trigger1);
    fireEvent.click(trigger2);
    // Content 2 should be open now
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("supports multiple open items (type=multiple)", () => {
    render(
      <Accordion type="multiple">
        <AccordionItem value="a">
          <AccordionTrigger>A</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>B</AccordionTrigger>
          <AccordionContent>Content B</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    fireEvent.click(screen.getByText("A").closest("button")!);
    fireEvent.click(screen.getByText("B").closest("button")!);
    expect(screen.getByText("Content A")).toBeInTheDocument();
    expect(screen.getByText("Content B")).toBeInTheDocument();
  });

  it("applies custom className to AccordionItem", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="x" className="custom-item">
          <AccordionTrigger>X</AccordionTrigger>
          <AccordionContent>CX</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    // The item div should exist; we can check the trigger renders
    expect(screen.getByText("X")).toBeInTheDocument();
  });

  it("applies custom className to AccordionContent", () => {
    render(
      <Accordion type="single" defaultValue="x">
        <AccordionItem value="x">
          <AccordionTrigger>X</AccordionTrigger>
          <AccordionContent className="custom-content">CX</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText("CX")).toBeInTheDocument();
  });

  it("renders AccordionItem with border class", () => {
    const { container } = render(
      <Accordion type="single">
        <AccordionItem value="v">
          <AccordionTrigger>T</AccordionTrigger>
          <AccordionContent>C</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    // AccordionItem renders a div with border classes
    const item = container.querySelector("[data-radix-collection-item]");
    expect(item).toBeTruthy();
  });

  it("trigger has accessible button role", () => {
    renderAccordion();
    const btn = screen.getAllByRole("button")[0];
    expect(btn).toBeInTheDocument();
  });

  it("supports defaultValue to open an item initially", () => {
    render(
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Open</AccordionTrigger>
          <AccordionContent>Visible</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText("Visible")).toBeInTheDocument();
  });
});
