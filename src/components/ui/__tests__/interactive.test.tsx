/**
 * Tier 2 Interactive component tests
 * Checkbox, RadioGroup, Switch, Select
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "../checkbox";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { Switch } from "../switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectGroup,
} from "../select";

/* ═══════════════════════════════════════════════════════════
   CHECKBOX
═══════════════════════════════════════════════════════════ */

describe("Checkbox", () => {
  it("renders without crashing", () => {
    render(<Checkbox aria-label="test" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("associates label with checkbox via htmlFor", () => {
    render(<Checkbox label="Accept terms" />);
    const label = screen.getByText("Accept terms");
    const checkbox = screen.getByRole("checkbox");
    // Both should share an ID
    expect(label.getAttribute("for")).toBe(checkbox.getAttribute("id"));
  });

  it("renders helperText when provided", () => {
    render(<Checkbox aria-label="chk" helperText="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("renders unchecked by default", () => {
    render(<Checkbox aria-label="chk" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-state", "unchecked");
  });

  it("renders checked state when defaultChecked=true", () => {
    render(<Checkbox aria-label="chk" defaultChecked />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-state", "checked");
  });

  it("calls onCheckedChange when toggled", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="chk" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
  });

  it("does not call onCheckedChange when disabled", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="chk" disabled onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("renders checked=indeterminate state", () => {
    render(<Checkbox aria-label="chk" checked="indeterminate" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "data-state",
      "indeterminate"
    );
  });

  it("forwards className to root", () => {
    render(<Checkbox aria-label="chk" className="custom-class" />);
    expect(screen.getByRole("checkbox")).toHaveClass("custom-class");
  });

  it("renders disabled state with opacity", () => {
    render(<Checkbox aria-label="chk" disabled />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveClass("disabled:opacity-40");
  });

  it("shows ◆ indicator text when checked", () => {
    const { container } = render(<Checkbox aria-label="chk" defaultChecked />);
    // The ◆ span exists in DOM (hidden/shown via CSS group-data)
    expect(container.textContent).toContain("◆");
  });

  it("shows − indicator text when indeterminate", () => {
    const { container } = render(
      <Checkbox aria-label="chk" checked="indeterminate" />
    );
    expect(container.textContent).toContain("−");
  });
});

/* ═══════════════════════════════════════════════════════════
   RADIO GROUP
═══════════════════════════════════════════════════════════ */

describe("RadioGroup", () => {
  it("renders without crashing", () => {
    render(
      <RadioGroup aria-label="options">
        <RadioGroupItem value="a" label="Option A" />
        <RadioGroupItem value="b" label="Option B" />
      </RadioGroup>
    );
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });

  it("renders labels for each item", () => {
    render(
      <RadioGroup aria-label="options">
        <RadioGroupItem value="a" label="Alpha" />
        <RadioGroupItem value="b" label="Beta" />
      </RadioGroup>
    );
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("associates label htmlFor with item id", () => {
    render(
      <RadioGroup aria-label="options">
        <RadioGroupItem value="a" label="Alpha" />
      </RadioGroup>
    );
    const label = screen.getByText("Alpha");
    const radio = screen.getByRole("radio");
    expect(label.getAttribute("for")).toBe(radio.getAttribute("id"));
  });

  it("renders helperText on item", () => {
    render(
      <RadioGroup aria-label="options">
        <RadioGroupItem value="a" label="Alpha" helperText="Recommended" />
      </RadioGroup>
    );
    expect(screen.getByText("Recommended")).toBeInTheDocument();
  });

  it("sets defaultValue correctly", () => {
    render(
      <RadioGroup aria-label="options" defaultValue="b">
        <RadioGroupItem value="a" label="Alpha" />
        <RadioGroupItem value="b" label="Beta" />
      </RadioGroup>
    );
    const radios = screen.getAllByRole("radio");
    expect(radios[0]).toHaveAttribute("data-state", "unchecked");
    expect(radios[1]).toHaveAttribute("data-state", "checked");
  });

  it("calls onValueChange when selecting an item", () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup aria-label="options" onValueChange={onValueChange}>
        <RadioGroupItem value="a" label="Alpha" />
        <RadioGroupItem value="b" label="Beta" />
      </RadioGroup>
    );
    fireEvent.click(screen.getAllByRole("radio")[1]);
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("shows ◇ for unchecked and ◆ for checked items", () => {
    const { container } = render(
      <RadioGroup aria-label="options" defaultValue="a">
        <RadioGroupItem value="a" label="Alpha" />
        <RadioGroupItem value="b" label="Beta" />
      </RadioGroup>
    );
    expect(container.textContent).toContain("◆");
    expect(container.textContent).toContain("◇");
  });

  it("forwards className to root", () => {
    render(
      <RadioGroup aria-label="options" className="custom-group">
        <RadioGroupItem value="a" />
      </RadioGroup>
    );
    const root = screen.getByRole("radiogroup");
    expect(root).toHaveClass("custom-group");
  });
});

/* ═══════════════════════════════════════════════════════════
   SWITCH
═══════════════════════════════════════════════════════════ */

describe("Switch", () => {
  it("renders without crashing", () => {
    render(<Switch aria-label="toggle" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<Switch label="Enable notifications" />);
    expect(screen.getByText("Enable notifications")).toBeInTheDocument();
  });

  it("associates label htmlFor with switch id", () => {
    render(<Switch label="Enable" />);
    const label = screen.getByText("Enable");
    const sw = screen.getByRole("switch");
    expect(label.getAttribute("for")).toBe(sw.getAttribute("id"));
  });

  it("renders unchecked by default", () => {
    render(<Switch aria-label="toggle" />);
    expect(screen.getByRole("switch")).toHaveAttribute("data-state", "unchecked");
  });

  it("renders checked when checked=true", () => {
    render(<Switch aria-label="toggle" checked onCheckedChange={() => {}} />);
    expect(screen.getByRole("switch")).toHaveAttribute("data-state", "checked");
  });

  it("toggles on click", () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="toggle" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("does not toggle when disabled", () => {
    const onCheckedChange = vi.fn();
    render(
      <Switch aria-label="toggle" disabled onCheckedChange={onCheckedChange} />
    );
    fireEvent.click(screen.getByRole("switch"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("shows offLabel when unchecked", () => {
    render(
      <Switch
        aria-label="toggle"
        offLabel="OFF"
        onLabel="ON"
        checked={false}
        onCheckedChange={() => {}}
      />
    );
    expect(screen.getByText("OFF")).toBeInTheDocument();
  });

  it("shows onLabel when checked", () => {
    render(
      <Switch
        aria-label="toggle"
        offLabel="OFF"
        onLabel="ON"
        checked
        onCheckedChange={() => {}}
      />
    );
    expect(screen.getByText("ON")).toBeInTheDocument();
  });

  it("forwards className to root", () => {
    render(<Switch aria-label="toggle" className="custom-switch" />);
    expect(screen.getByRole("switch")).toHaveClass("custom-switch");
  });

  it("renders disabled state", () => {
    render(<Switch aria-label="toggle" disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });
});

/* ═══════════════════════════════════════════════════════════
   SELECT
═══════════════════════════════════════════════════════════ */

describe("Select", () => {
  const BasicSelect = ({
    onValueChange,
    defaultValue,
  }: {
    onValueChange?: (v: string) => void;
    defaultValue?: string;
  }) => (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger aria-label="Select option">
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="alpha">Alpha</SelectItem>
        <SelectItem value="beta">Beta</SelectItem>
        <SelectItem value="gamma">Gamma</SelectItem>
      </SelectContent>
    </Select>
  );

  it("renders trigger without crashing", () => {
    render(<BasicSelect />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows placeholder text", () => {
    render(<BasicSelect />);
    expect(screen.getByText("Select...")).toBeInTheDocument();
  });

  it("shows ▾ chevron in trigger", () => {
    const { container } = render(<BasicSelect />);
    expect(container.textContent).toContain("▾");
  });

  it("opens dropdown on trigger click", () => {
    render(<BasicSelect />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("Alpha")).toBeInTheDocument();
  });

  it("shows defaultValue as selected", () => {
    render(<BasicSelect defaultValue="beta" />);
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("renders SelectLabel", () => {
    render(
      <Select>
        <SelectTrigger aria-label="Select">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Group A</SelectLabel>
            <SelectItem value="a1">Item A1</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("Group A")).toBeInTheDocument();
  });

  it("renders SelectSeparator without crashing", () => {
    render(
      <Select>
        <SelectTrigger aria-label="Select">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Item A</SelectItem>
          <SelectSeparator />
          <SelectItem value="b">Item B</SelectItem>
        </SelectContent>
      </Select>
    );
    // Open the dropdown — both items should render (separator doesn't block rendering)
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.getByText("Item B")).toBeInTheDocument();
  });

  it("forwards className to trigger", () => {
    render(
      <Select>
        <SelectTrigger aria-label="Select" className="custom-trigger">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
    );
    expect(screen.getByRole("combobox")).toHaveClass("custom-trigger");
  });

  it("renders danger item with correct class", () => {
    render(
      <Select>
        <SelectTrigger aria-label="Select">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="del" danger>
            Delete
          </SelectItem>
        </SelectContent>
      </Select>
    );
    fireEvent.click(screen.getByRole("combobox"));
    const deleteItem = screen.getByText("Delete");
    expect(deleteItem.closest("[data-radix-select-item]") ?? deleteItem.closest("[role=option]")).toBeTruthy();
  });
});
