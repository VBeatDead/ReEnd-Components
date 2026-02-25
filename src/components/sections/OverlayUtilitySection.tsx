import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../docs/ComponentPreview";
import { Search, ArrowUp } from "lucide-react";
import { useState } from "react";
import { FilterBar } from "../ui/filter-bar";
import { Rating } from "../ui/rating";
import { BottomSheet } from "../ui/bottom-sheet";
import { Carousel, CarouselItem } from "../ui/carousel";
import { Panel, PanelGroup, ResizeHandle } from "../ui/resizable";
import { SessionTimeoutModal } from "../ui/session-timeout-modal";
import { FileUpload, type FileUploadState } from "../ui/file-upload";
import { CommandPalette } from "../ui/command-palette";
import { CookieConsent } from "../ui/cookie-consent";
import { CopyClipboard } from "../ui/copy-clipboard";
import { Dropdown } from "../ui/dropdown";
import { ContextMenu } from "../ui/context-menu";
import { SortControl } from "../ui/sort-control";
import { PullToRefresh } from "../ui/pull-to-refresh";
import { SwipeableItem } from "../ui/swipeable-item";
import { ThemeSwitcher } from "../ui/theme-switcher";

export function OverlayUtilitySection() {
  const { t } = useTranslation("overlay");
  const [cpOpen, setCpOpen] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(true);

  return (
    <>
      {/* Command Palette */}
      <ComponentPreview
        id="command-palette"
        title={t("command_palette.title")}
        description={t("command_palette.description")}
        props={[
          {
            name: "open",
            type: "boolean",
            required: true,
            description: t("_props.command-palette.open"),
          },
          {
            name: "onOpenChange",
            type: "(open: boolean) => void",
            required: true,
            description: t("_props.command-palette.onOpenChange"),
          },
          {
            name: "onSelect",
            type: "(item: CommandItem) => void",
            required: true,
            description: t("_props.command-palette.onSelect"),
          },
          {
            name: "placeholder",
            type: "string",
            default: '"Type a command..."',
            required: false,
            description: t("_props.command-palette.placeholder"),
          },
          {
            name: "groups",
            type: "{ label: string; items: CommandItem[] }[]",
            required: true,
            description: t("_props.command-palette.groups"),
          },
        ]}
        api={[
          {
            name: "useCommandPalette",
            signature: "() => { open, toggle, close }",
            description: t("_props.command-palette.api.useCommandPalette"),
          },
        ]}
        keyboard={[
          {
            key: "⌘K / Ctrl+K",
            description: t("_props.command-palette.kbd.0"),
          },
          { key: "Escape", description: t("_props.command-palette.kbd.1") },
          { key: "Arrow ↑/↓", description: t("_props.command-palette.kbd.2") },
          { key: "Enter", description: t("_props.command-palette.kbd.3") },
          {
            key: "Tab",
            description: t("_props.command-palette.kbd.4"),
          },
        ]}
        install={{
          importPath:
            'import { CommandPalette } from "@/components/docs/CommandPalette";',
          usage:
            "<CommandPalette\n  open={isOpen}\n  onOpenChange={setIsOpen}\n  onNavigate={(id) => scrollTo(id)}\n/>",
          dependencies: ["fuse.js"],
        }}
        code={`import { CommandPalette, useCommandPalette } from "reend-components";

const { open, toggle, close } = useCommandPalette();

// Bind ⌘K
useEffect(() => {
  const handle = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault(); toggle();
    }
  };
  document.addEventListener("keydown", handle);
  return () => document.removeEventListener("keydown", handle);
}, [toggle]);

<CommandPalette
  open={open}
  onOpenChange={close}
  groups={[
    {
      label: "Navigation",
      items: [
        { id: "dashboard", label: "Dashboard" },
        { id: "docs", label: "Documentation" },
      ],
    },
    {
      label: "Actions",
      items: [
        { id: "new", label: "Create New Project" },
        { id: "theme", label: "Toggle Theme" },
      ],
    },
  ]}
/>`}
      >
        <div className="flex flex-col items-start gap-3">
          <button
            onClick={() => setCpOpen(true)}
            className="bg-surface-2 border border-border px-4 py-2 font-display text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground hover:border-primary/30 hover:text-primary transition-all flex items-center gap-2"
          >
            <Search className="w-3.5 h-3.5" />
            {t("command_palette.placeholder")}
            <kbd className="font-mono text-[10px] bg-surface-3 px-1.5 py-0.5 border border-border">
              ⌘K
            </kbd>
          </button>
          <p className="text-xs text-muted-foreground">
            {t("command_palette.recent")}
          </p>
          <CommandPalette
            open={cpOpen}
            onOpenChange={setCpOpen}
            groups={[
              {
                label: t("command_palette.recent"),
                items: [
                  {
                    id: "dashboard",
                    label: t("command_palette.dashboard"),
                    recent: true,
                  },
                  {
                    id: "components",
                    label: t("command_palette.components"),
                    recent: true,
                  },
                  {
                    id: "settings",
                    label: t("command_palette.settings"),
                    recent: false,
                  },
                ],
              },
              {
                label: t("command_palette.actions_label"),
                items: [
                  { id: "create", label: t("command_palette.create_new") },
                  { id: "theme", label: t("command_palette.toggle_theme") },
                ],
              },
            ]}
          />
        </div>
      </ComponentPreview>

      {/* Cookie Consent */}
      <ComponentPreview
        id="cookie-consent"
        title={t("cookie_consent.title")}
        showViewport
        description={t("cookie_consent.description")}
        props={[
          {
            name: "onAccept",
            type: "() => void",
            required: true,
            description: t("_props.cookie-consent.onAccept"),
          },
          {
            name: "onCustomize",
            type: "() => void",
            required: false,
            description: t("_props.cookie-consent.onCustomize"),
          },
          {
            name: "message",
            type: "string",
            required: false,
            description: t("_props.cookie-consent.message"),
          },
        ]}
        code={`import { CookieConsent } from "reend-components";

const [accepted, setAccepted] = useState(false);

{!accepted && (
  <CookieConsent
    message="We use cookies to enhance your Endfield experience."
    acceptLabel="ACCEPT ALL"
    customizeLabel="CUSTOMIZE"
    onAccept={() => {
      localStorage.setItem("ef-cookies", "accepted");
      setAccepted(true);
    }}
    onCustomize={() => router.push("/settings/privacy")}
  />
)}`}
      >
        {cookieVisible ? (
          <CookieConsent
            message={t("cookie_consent.consent_text")}
            onAccept={() => setCookieVisible(false)}
            onCustomize={() => {}}
            acceptLabel={t("cookie_consent.accept_all")}
            customizeLabel={t("cookie_consent.customize")}
            className="relative bottom-auto left-auto right-auto -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 mt-0"
          />
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-xs text-ef-green">
              ✓ {t("cookie_consent.accept_all")}
            </span>
            <button
              onClick={() => setCookieVisible(true)}
              className="text-xs text-muted-foreground underline hover:text-primary"
            >
              Reset demo
            </button>
          </div>
        )}
      </ComponentPreview>

      {/* Back to Top */}
      <ComponentPreview
        id="back-to-top"
        title={t("back_to_top.title")}
        description={t("back_to_top.description")}
        props={[
          {
            name: "threshold",
            type: "number",
            default: "300",
            required: false,
            description: t("_props.back-to-top.threshold"),
          },
          {
            name: "smooth",
            type: "boolean",
            default: "true",
            required: false,
            description: t("_props.back-to-top.smooth"),
          },
        ]}
        code={`import { BackToTop } from "reend-components";

// Mount anywhere — it auto-detects scroll position
<BackToTop
  threshold={300}
  smooth
  className="fixed bottom-6 right-6 z-50"
/>`}
      >
        <div className="flex items-center gap-4">
          <button
            className="bg-surface-2 border border-border p-3 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <span className="text-xs text-muted-foreground">
            {t("back_to_top.appears_text")}
          </span>
        </div>
      </ComponentPreview>

      {/* Copy to Clipboard */}
      <ComponentPreview
        id="copy-clipboard"
        title={t("clipboard.title")}
        description={t("clipboard.description")}
        props={[
          {
            name: "text",
            type: "string",
            required: true,
            description: t("_props.copy-clipboard.text"),
          },
          {
            name: "resetDelay",
            type: "number",
            default: "2000",
            required: false,
            description: t("_props.copy-clipboard.resetDelay"),
          },
          {
            name: "onCopy",
            type: "() => void",
            required: false,
            description: t("_props.copy-clipboard.onCopy"),
          },
        ]}
        code={`import { CopyClipboard } from "reend-components";

// Standalone button
<CopyClipboard text="npm install reend-components" />

// Inline with code block
<div className="flex items-center bg-surface-1 border border-border">
  <code className="px-4 py-2 font-mono text-sm text-muted-foreground">
    npm install reend-components
  </code>
  <CopyClipboard
    text="npm install reend-components"
    resetDelay={2000}
    onCopy={() => console.log("Copied!")}
    className="border-0 border-l border-border rounded-none"
  />
</div>`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-surface-1 border border-border">
            <span className="px-4 py-2 text-sm font-mono text-muted-foreground">
              npm install reend-components
            </span>
            <CopyClipboard
              text="npm install reend-components"
              className="border-0 border-l border-border rounded-none"
            />
          </div>
        </div>
      </ComponentPreview>

      {/* Dropdown */}
      <ComponentPreview
        id="dropdown"
        title={t("dropdown.title")}
        description={t("dropdown.description")}
        props={[
          {
            name: "trigger",
            type: "ReactNode",
            required: true,
            description: t("_props.dropdown.trigger"),
          },
          {
            name: "items",
            type: '{ label: string; onClick: () => void; variant?: "default" | "danger" }[]',
            required: true,
            description: t("_props.dropdown.items"),
          },
          {
            name: "groups",
            type: "{ label?: string; items: DropdownItem[] }[]",
            required: false,
            description: t("_props.dropdown.groups"),
          },
          {
            name: "align",
            type: '"start" | "end"',
            default: '"start"',
            required: false,
            description: t("_props.dropdown.align"),
          },
        ]}
        code={`import { Dropdown } from "reend-components";

<Dropdown
  trigger={<button>ACTIONS ▾</button>}
  groups={[
    {
      label: "Operations",
      items: [
        { label: "EDIT RECORD", onClick: () => {} },
        { label: "DUPLICATE", onClick: () => {} },
        { label: "ARCHIVE", onClick: () => {} },
      ],
    },
    {
      items: [
        {
          label: "DELETE",
          onClick: handleDelete,
          variant: "danger",
        },
      ],
    },
  ]}
  align="end"
/>`}
      >
        <Dropdown
          trigger={
            <button className="bg-surface-2 border border-border px-4 py-2 font-display text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground hover:border-primary/30 hover:text-primary transition-all flex items-center gap-2">
              {t("dropdown.actions_label")} ▾
            </button>
          }
          groups={[
            {
              label: t("dropdown.actions_label"),
              items: [
                { label: t("dropdown.edit"), onClick: () => {} },
                { label: t("dropdown.duplicate"), onClick: () => {} },
                { label: t("dropdown.archive"), onClick: () => {} },
              ],
            },
            {
              items: [
                {
                  label: t("dropdown.delete"),
                  onClick: () => {},
                  variant: "danger",
                },
              ],
            },
          ]}
        />
      </ComponentPreview>

      {/* Context Menu */}
      <ComponentPreview
        id="context-menu"
        title={t("context_menu.title")}
        description={t("context_menu.description")}
        props={[
          {
            name: "items",
            type: '{ label: string; shortcut?: string; onClick: () => void; variant?: "default" | "danger" }[]',
            required: true,
            description: t("_props.context-menu.items"),
          },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            description: t("_props.context-menu.children"),
          },
        ]}
        code={`import { ContextMenu } from "reend-components";

<ContextMenu
  groups={[
    {
      items: [
        { label: "CUT", shortcut: "⌘X", onClick: handleCut },
        { label: "COPY", shortcut: "⌘C", onClick: handleCopy },
        { label: "PASTE", shortcut: "⌘V", onClick: handlePaste },
      ],
    },
    {
      items: [
        {
          label: "DELETE",
          shortcut: "⌫",
          onClick: handleDelete,
          variant: "danger",
        },
      ],
    },
  ]}
>
  <div className="border border-dashed border-border p-8">
    Right-click here
  </div>
</ContextMenu>`}
      >
        <ContextMenu
          groups={[
            {
              items: [
                {
                  label: t("context_menu.cut"),
                  shortcut: "⌘X",
                  onClick: () => {},
                },
                {
                  label: t("context_menu.copy"),
                  shortcut: "⌘C",
                  onClick: () => {},
                },
                {
                  label: t("context_menu.paste"),
                  shortcut: "⌘V",
                  onClick: () => {},
                },
              ],
            },
            {
              items: [
                {
                  label: t("context_menu.delete"),
                  shortcut: "⌫",
                  onClick: () => {},
                  variant: "danger",
                },
              ],
            },
          ]}
        >
          <div className="border-2 border-dashed border-border p-8 text-center text-sm text-muted-foreground hover:border-primary/30 transition-colors cursor-context-menu">
            Right-click here
          </div>
        </ContextMenu>
      </ComponentPreview>

      {/* Filter Bar */}
      <ComponentPreview
        id="filter-bar"
        title={t("filter_bar.title", { defaultValue: "Filter Bar" })}
        description={t("filter_bar.description", {
          defaultValue:
            "Filter bar with multi-select dropdown filters, active filter chips, and clear-all button. Fully controlled via activeFilters and onFilterChange.",
        })}
        props={[
          {
            name: "filters",
            type: "FilterDef[]",
            required: true,
            description: "Filter definitions with id, label, options",
          },
          {
            name: "activeFilters",
            type: "Record<string, string[]>",
            required: false,
            description: "Controlled active filter values",
          },
          {
            name: "onFilterChange",
            type: "(id, values) => void",
            required: false,
            description: "Called when a filter value changes",
          },
          {
            name: "chips",
            type: "FilterChip[]",
            required: false,
            description: "Active filter chips to display",
          },
          {
            name: "onClearAll",
            type: "() => void",
            required: false,
            description: "Called when Clear All is clicked",
          },
        ]}
        code={`import { FilterBar, FilterChip } from "reend-components";

<FilterBar
  filters={[
    { id: "rarity", label: "Rarity", options: [
      { label: "5\u2605", value: "5" },
      { label: "6\u2605", value: "6" },
    ]},
  ]}
  activeFilters={activeFilters}
  onFilterChange={handleFilter}
  chips={chips}
  onClearAll={clearAll}
/>`}
      >
        <FilterBarDemo />
      </ComponentPreview>

      {/* Sort Control */}
      <ComponentPreview
        id="sort-control"
        title={t("sort_control.title", { defaultValue: "Sort Control" })}
        description={t("sort_control.description", {
          defaultValue:
            "Horizontal row of sort option buttons with tri-state direction cycling (none → asc → desc → none). Active option shows ▲/▼ indicator in Orbitron font.",
        })}
        props={[
          { name: "options", type: "SortOption[]", required: true, description: "Array of { id, label } sort options" },
          { name: "activeId", type: "string", required: false, description: "Currently active sort option ID" },
          { name: "direction", type: '"asc" | "desc" | "none"', required: false, description: "Current sort direction", default: '"none"' },
          { name: "onSortChange", type: "(id: string, direction) => void", required: false, description: "Called when sort option or direction changes" },
        ]}
        code={`import { SortControl } from "reend-components";

const [activeId, setActiveId] = useState<string>();
const [dir, setDir] = useState<"asc" | "desc" | "none">("none");

<SortControl
  options={[
    { id: "name", label: "Name" },
    { id: "rarity", label: "Rarity" },
    { id: "date", label: "Date" },
  ]}
  activeId={activeId}
  direction={dir}
  onSortChange={(id, direction) => {
    setActiveId(direction === "none" ? undefined : id);
    setDir(direction);
  }}
/>`}
      >
        <SortControlDemo />
      </ComponentPreview>

      {/* Rating */}
      <ComponentPreview
        id="rating"
        title={t("rating.title", { defaultValue: "Rating" })}
        description={t("rating.description", {
          defaultValue:
            "Diamond \u25C6/\u25C7 rating component. Supports controlled/uncontrolled mode, hover preview, keyboard navigation (arrow keys), and readOnly display.",
        })}
        props={[
          {
            name: "value",
            type: "number",
            required: false,
            description: "Controlled rating value",
          },
          {
            name: "defaultValue",
            type: "number",
            required: false,
            description: "Initial uncontrolled value",
            default: "0",
          },
          {
            name: "max",
            type: "number",
            required: false,
            description: "Maximum rating",
            default: "5",
          },
          {
            name: "onChange",
            type: "(value: number) => void",
            required: false,
            description: "Change handler",
          },
          {
            name: "readOnly",
            type: "boolean",
            required: false,
            description: "Disable interaction",
          },
          {
            name: "size",
            type: '"sm" | "md" | "lg"',
            required: false,
            description: "Diamond size",
            default: '"md"',
          },
        ]}
        code={`import { Rating } from "reend-components";

<Rating defaultValue={4} onChange={(v) => console.log(v)} />`}
      >
        <RatingDemo />
      </ComponentPreview>

      {/* File Upload */}
      <ComponentPreview
        id="file-upload"
        title={t("file_upload.title", { defaultValue: "File Upload" })}
        description={t("file_upload.description", {
          defaultValue:
            "Drag-and-drop file upload zone with 8 visual states: idle, hover, dragging, drag-invalid, uploading, success, error, and disabled. Per-file progress list with image thumbnails.",
        })}
        props={[
          { name: "accept", type: "string", required: false, description: 'Accepted file types (e.g. "image/*,.pdf")' },
          { name: "multiple", type: "boolean", required: false, description: "Allow multiple file selection" },
          { name: "maxSize", type: "number", required: false, description: "Max file size in bytes" },
          { name: "onFileSelect", type: "(files: File[]) => void", required: false, description: "Called with valid files after drop or input" },
          { name: "state", type: "FileUploadState", required: false, description: "Controlled state override" },
          { name: "progress", type: "number", required: false, description: "Overall upload progress 0–100 (used with state='uploading')" },
          { name: "error", type: "string", required: false, description: "Custom error message" },
        ]}
        code={`import { FileUpload } from "reend-components";

<FileUpload
  accept="image/*,.pdf"
  multiple
  maxSize={10 * 1024 * 1024}
  onFileSelect={(files) => handleUpload(files)}
/>`}
      >
        <FileUploadDemo />
      </ComponentPreview>

      {/* Bottom Sheet */}
      <ComponentPreview
        id="bottom-sheet"
        title={t("bottom_sheet.title", { defaultValue: "Bottom Sheet" })}
        description={t("bottom_sheet.description", {
          defaultValue:
            "Mobile-friendly bottom sheet rendered in a portal. Features slide-up animation, drag handle, backdrop click-to-close, and Escape key support.",
        })}
        props={[
          {
            name: "open",
            type: "boolean",
            required: true,
            description: "Controls visibility",
          },
          {
            name: "onClose",
            type: "() => void",
            required: true,
            description: "Close handler",
          },
          {
            name: "title",
            type: "string",
            required: false,
            description: "Sheet title",
          },
          {
            name: "maxHeight",
            type: "string",
            required: false,
            description: "CSS max-height",
            default: '"85vh"',
          },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            description: "Sheet content",
          },
        ]}
        code={`import { BottomSheet } from "reend-components";

<BottomSheet open={open} onClose={() => setOpen(false)} title="Options">
  <p>Sheet content here</p>
</BottomSheet>`}
      >
        <BottomSheetDemo />
      </ComponentPreview>

      {/* Pull to Refresh */}
      <ComponentPreview
        id="pull-to-refresh"
        title={t("pull_to_refresh.title", { defaultValue: "Pull to Refresh" })}
        description={t("pull_to_refresh.description", {
          defaultValue:
            "Mobile pull-to-refresh container. Drag down from the top to trigger a refresh. Features a diamond spinner, 5-phase state machine (idle → pulling → threshold → refreshing → complete), and haptic feedback via navigator.vibrate.",
        })}
        props={[
          { name: "onRefresh", type: "() => Promise<void>", required: true, description: "Async callback triggered when user pulls past threshold" },
          { name: "threshold", type: "number", required: false, description: "Pull distance in px to trigger refresh", default: "60" },
          { name: "refreshingLabel", type: "string", required: false, description: "Text shown while refreshing", default: '"SYNCING..."' },
          { name: "completeLabel", type: "string", required: false, description: "Text shown on completion", default: '"UPDATED"' },
          { name: "disabled", type: "boolean", required: false, description: "Disables the pull gesture" },
        ]}
        code={`import { PullToRefresh } from "reend-components";

<PullToRefresh
  onRefresh={async () => {
    await fetchData();
  }}
>
  <YourScrollableContent />
</PullToRefresh>`}
      >
        <PullToRefreshDemo />
      </ComponentPreview>

      {/* Swipeable Item */}
      <ComponentPreview
        id="swipeable-item"
        title={t("swipeable_item.title", { defaultValue: "Swipeable Item" })}
        description={t("swipeable_item.description", {
          defaultValue:
            "Touch-swipeable list item with left and/or right action reveal. Swipe 80px to reveal an action, 160px to auto-trigger it. Uses pointer events for cross-device compatibility (mouse, touch, pen). Haptic feedback via navigator.vibrate.",
        })}
        props={[
          { name: "leftSwipeAction", type: "SwipeAction", required: false, description: "Action revealed by swiping left (appears on right side)" },
          { name: "rightSwipeAction", type: "SwipeAction", required: false, description: "Action revealed by swiping right (appears on left side)" },
          { name: "revealThreshold", type: "number", required: false, description: "Swipe distance to reveal action (px)", default: "80" },
          { name: "triggerThreshold", type: "number", required: false, description: "Swipe distance to auto-trigger action (px)", default: "160" },
          { name: "disabled", type: "boolean", required: false, description: "Disables swipe gestures" },
        ]}
        code={`import { SwipeableItem } from "reend-components";

<SwipeableItem
  leftSwipeAction={{ label: "DELETE", variant: "delete", onTrigger: () => remove(id) }}
  rightSwipeAction={{ label: "ARCHIVE", variant: "archive", onTrigger: () => archive(id) }}
>
  <div className="p-4">Swipe me left or right</div>
</SwipeableItem>`}
      >
        <SwipeableItemDemo />
      </ComponentPreview>

      {/* Carousel */}
      <ComponentPreview
        id="carousel"
        title={t("carousel.title", { defaultValue: "Carousel" })}
        description={t("carousel.description", {
          defaultValue:
            "CSS scroll-snap carousel with no external dependencies. Supports \u25C6/\u25C7 dot indicators, prev/next arrows, autoplay, and loop mode.",
        })}
        props={[
          {
            name: "showDots",
            type: "boolean",
            required: false,
            description: "Show dot indicators",
            default: "true",
          },
          {
            name: "showArrows",
            type: "boolean",
            required: false,
            description: "Show prev/next arrows",
            default: "true",
          },
          {
            name: "autoPlay",
            type: "boolean",
            required: false,
            description: "Enable auto-advance",
          },
          {
            name: "autoPlayInterval",
            type: "number",
            required: false,
            description: "Auto-advance interval ms",
            default: "4000",
          },
          {
            name: "loop",
            type: "boolean",
            required: false,
            description: "Loop carousel at ends",
          },
        ]}
        code={`import { Carousel, CarouselItem } from "reend-components";

<Carousel showDots showArrows>
  <CarouselItem>Slide 1</CarouselItem>
  <CarouselItem>Slide 2</CarouselItem>
</Carousel>`}
      >
        <Carousel showDots showArrows loop className="max-w-lg">
          {[
            { label: "VANGUARD", sub: "ADVANCE UNIT", color: "text-ef-orange", bar: "bg-ef-orange", pct: "85" },
            { label: "CASTER", sub: "SUPPORT CLASS", color: "text-ef-blue", bar: "bg-ef-blue", pct: "92" },
            { label: "SNIPER", sub: "PRECISION UNIT", color: "text-ef-green", bar: "bg-ef-green", pct: "78" },
            { label: "GUARD", sub: "FRONTLINE UNIT", color: "text-primary", bar: "bg-primary", pct: "95" },
          ].map((slide) => (
            <CarouselItem key={slide.label}>
              <div className="bg-surface-1 border border-border h-40 px-8 py-6 flex items-center gap-6 overflow-hidden relative">
                {/* Decorative corner */}
                <span className="absolute top-2 right-3 text-[8px] text-primary/10 font-mono select-none">◆◆◆◆◆</span>
                <span className="absolute bottom-2 left-3 text-[8px] text-primary/10 font-mono select-none">◇◇◇◇◇</span>
                {/* Icon */}
                <div className={`text-5xl font-bold ${slide.color} shrink-0 select-none`} aria-hidden="true">
                  ◆
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-display text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {slide.sub}
                  </p>
                  <p className={`font-display text-2xl font-bold tracking-wider ${slide.color} mt-1`}>
                    {slide.label}
                  </p>
                  <div className="mt-3 h-[2px] bg-surface-3 w-full max-w-[120px]">
                    <div className={`h-full ${slide.bar}`} style={{ width: `${slide.pct}%` }} />
                  </div>
                  <p className="font-['Orbitron',monospace] text-[10px] text-muted-foreground mt-1">
                    EFFICIENCY {slide.pct}%
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </Carousel>
      </ComponentPreview>

      {/* Resizable */}
      <ComponentPreview
        id="resizable"
        title={t("resizable.title", { defaultValue: "Resizable Panels" })}
        description={t("resizable.description", {
          defaultValue:
            "Resizable panel layout via react-resizable-panels. ResizeHandle uses Endfield \u25C6 diamond indicator. Supports horizontal and vertical layouts.",
        })}
        props={[
          { name: "direction", type: '"horizontal" | "vertical"', required: true, description: "Panel split direction" },
          { name: "defaultSize", type: "number", required: false, description: "Initial size as percentage (0–100)" },
          { name: "minSize", type: "number", required: false, description: "Minimum size percentage — prevents panel from collapsing below this" },
          { name: "maxSize", type: "number", required: false, description: "Maximum size percentage — prevents panel from expanding beyond this" },
        ]}
        code={`import { Panel, PanelGroup, ResizeHandle } from "reend-components";

// Note: pass sizes as strings (%) not numbers (px) in v4
// Horizontal split with min/max constraints
<PanelGroup direction="horizontal">
  <Panel defaultSize="40%" minSize="20%" maxSize="70%">
    Left panel (20%–70%)
  </Panel>
  <ResizeHandle />
  <Panel defaultSize="60%" minSize="30%">
    Right panel (min 30%)
  </Panel>
</PanelGroup>

// Vertical split
<PanelGroup direction="vertical" style={{ height: "400px" }}>
  <Panel defaultSize="50%" minSize="20%">Top</Panel>
  <ResizeHandle direction="vertical" />
  <Panel defaultSize="50%" minSize="20%">Bottom</Panel>
</PanelGroup>`}
      >
        <ResizableDemo />
      </ComponentPreview>

      {/* Session Timeout */}
      <ComponentPreview
        id="session-timeout"
        title={t("session_timeout.title", {
          defaultValue: "Session Timeout Modal",
        })}
        description={t("session_timeout.description", {
          defaultValue:
            "Session expiry warning modal with embedded CountdownTimer. Shows urgent warning when seconds remaining falls below warningAt threshold.",
        })}
        props={[
          {
            name: "open",
            type: "boolean",
            required: true,
            description: "Controls visibility",
          },
          {
            name: "secondsRemaining",
            type: "number",
            required: true,
            description: "Countdown seconds",
          },
          {
            name: "onExtend",
            type: "() => void",
            required: true,
            description: "Extend session handler",
          },
          {
            name: "onLogout",
            type: "() => void",
            required: true,
            description: "Logout handler",
          },
          {
            name: "warningAt",
            type: "number",
            required: false,
            description: "Threshold for urgent warning",
            default: "60",
          },
        ]}
        code={`import { SessionTimeoutModal } from "reend-components";

<SessionTimeoutModal
  open={open}
  secondsRemaining={45}
  onExtend={() => resetSession()}
  onLogout={() => logout()}
/>`}
      >
        <SessionTimeoutDemo />
      </ComponentPreview>

      {/* Theme Switcher */}
      <ComponentPreview
        id="theme-switcher"
        title={t("theme_switcher.title", { defaultValue: "Theme Switcher" })}
        description={t("theme_switcher.description", { defaultValue: "Diamond toggle button for light/dark theme. Persists to localStorage under key 'ef-theme'." })}
        props={[
          { name: "storageKey", type: "string", required: false, default: '"ef-theme"', description: "localStorage key for theme persistence" },
          { name: "className", type: "string", required: false, description: "Additional CSS classes" },
        ]}
        code={`import { ThemeSwitcher } from "reend-components";

// Basic usage
<ThemeSwitcher />

// Custom storage key
<ThemeSwitcher storageKey="my-app-theme" />

// In header
<header>
  <nav>...</nav>
  <ThemeSwitcher className="ml-auto" />
</header>`}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-surface-1 border border-border flex items-center px-1">
              <ThemeSwitcher />
            </div>
            <p className="text-[13px] text-muted-foreground">Click to toggle light/dark — same design used in the docs navbar</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display text-[11px] uppercase text-muted-foreground">PERSISTENCE:</span>
            <code className="font-mono text-[12px] text-primary bg-surface-2 px-2 py-0.5">{"localStorage[\"ef-theme\"]"}</code>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display text-[11px] uppercase text-muted-foreground">STORAGE KEY:</span>
            <code className="font-mono text-[12px] text-muted-foreground bg-surface-2 px-2 py-0.5">{"storageKey=\"ef-theme\""}</code>
          </div>
        </div>
      </ComponentPreview>
    </>
  );
}

const FilterBarDemo = () => {
  const [active, setActive] = useState<Record<string, string[]>>({});
  const filters = [
    {
      id: "class",
      label: "CLASS",
      options: [
        { label: "VANGUARD", value: "vanguard" },
        { label: "GUARD", value: "guard" },
        { label: "CASTER", value: "caster" },
        { label: "SNIPER", value: "sniper" },
      ],
    },
    {
      id: "rarity",
      label: "RARITY",
      options: [
        { label: "\u25C6\u25C6\u25C6\u25C6\u25C6\u25C6 (6\u2605)", value: "6" },
        { label: "\u25C6\u25C6\u25C6\u25C6\u25C6 (5\u2605)", value: "5" },
        { label: "\u25C6\u25C6\u25C6\u25C6 (4\u2605)", value: "4" },
      ],
    },
    {
      id: "faction",
      label: "FACTION",
      options: [
        { label: "RHODES ISLAND", value: "rhodes" },
        { label: "ENDFIELD", value: "endfield" },
      ],
    },
  ];
  const chips = Object.entries(active).flatMap(([filterId, vals]) =>
    vals.map((v) => ({
      label:
        filters
          .find((f) => f.id === filterId)
          ?.options.find((o) => o.value === v)?.label ?? v,
      value: v,
      filterId,
    })),
  );
  return (
    <FilterBar
      filters={filters}
      activeFilters={active}
      onFilterChange={(id, vals) =>
        setActive((prev) => ({ ...prev, [id]: vals }))
      }
      chips={chips}
      onClearAll={() => setActive({})}
    />
  );
};

const RatingDemo = () => {
  const [val, setVal] = useState(4);
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          INTERACTIVE
        </p>
        <div className="flex items-center gap-4">
          <Rating value={val} onChange={setVal} size="lg" />
          <span className="font-mono text-sm text-primary font-bold">
            {val}
            <span className="text-muted-foreground text-xs"> / 5</span>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size} className="space-y-2">
            <p className="font-mono text-[10px] text-muted-foreground uppercase">
              {size}
            </p>
            <Rating defaultValue={3} size={size} readOnly />
          </div>
        ))}
      </div>
    </div>
  );
};

const BottomSheetDemo = () => {
  const [open, setOpen] = useState(false);
  const actions = [
    "VIEW OPERATOR PROFILE",
    "EDIT COMBAT LOADOUT",
    "ASSIGN TO SQUAD ALPHA",
    "TRANSFER TO RESERVE",
    "REMOVE FROM ROSTER",
  ];
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 font-display text-xs uppercase tracking-[0.1em] border border-border bg-surface-1 hover:border-primary/40 hover:bg-primary/[0.04] transition-all duration-200"
      >
        <span className="text-primary">◆</span>
        OPEN ACTION SHEET
      </button>
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title="OPERATOR ACTIONS"
      >
        <div className="space-y-1">
          {actions.map((action, i) => (
            <button
              key={action}
              onClick={() => setOpen(false)}
              className={`w-full text-left flex items-center gap-3 px-3 py-3 font-display text-[11px] uppercase tracking-[0.08em] transition-colors duration-150
                ${
                  i === actions.length - 1
                    ? "text-destructive hover:bg-destructive/[0.06] mt-2 border-t border-border pt-3"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
                }`}
            >
              <span
                className={
                  i === actions.length - 1
                    ? "text-destructive"
                    : "text-primary/40"
                }
              >
                {i === actions.length - 1 ? "\u2715" : "\u25C7"}
              </span>
              {action}
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
};

const ResizableDemo = () => {
  return (
    <div className="space-y-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        ◆ DRAG THE HANDLE — MIN 20%, MAX 70% FOR EACH PANEL
      </p>
      {/* react-resizable-panels v4: size props as strings = %, as numbers = px */}
      <div className="h-48 border border-border" style={{ overflow: "visible" }}>
        <PanelGroup direction="horizontal" style={{ height: "100%" }}>
          <Panel defaultSize="40%" minSize="20%" maxSize="70%">
            <div className="h-full flex flex-col bg-surface-1 overflow-hidden">
              <div className="px-3 py-2 border-b border-border flex items-center justify-between shrink-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
                  ◆ PANEL A
                </p>
                <p className="font-['Orbitron',monospace] text-[9px] text-muted-foreground/50">
                  20%–70%
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="font-mono text-[10px] text-muted-foreground">
                  OPERATOR LIST
                </p>
              </div>
            </div>
          </Panel>
          <ResizeHandle />
          <Panel defaultSize="60%" minSize="20%" maxSize="70%">
            <div className="h-full flex flex-col bg-surface-2 overflow-hidden">
              <div className="px-3 py-2 border-b border-border flex items-center justify-between shrink-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
                  ◆ PANEL B
                </p>
                <p className="font-['Orbitron',monospace] text-[9px] text-muted-foreground/50">
                  20%–70%
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="font-mono text-[10px] text-muted-foreground">
                  DETAIL VIEW
                </p>
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

const FileUploadDemo = () => {
  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-3">
          ◆ INTERACTIVE — DROP FILES TO SEE PER-FILE PROGRESS
        </p>
        {/* Fully uncontrolled: FileUpload manages its own state & simulates progress */}
        <FileUpload
          multiple
          accept="image/*,.pdf,.zip"
          maxSize={10 * 1024 * 1024}
        />
      </div>

      {/* State previews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">DRAG-INVALID</p>
          <FileUpload state="drag-invalid" />
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">DISABLED</p>
          <FileUpload state="disabled" />
        </div>
      </div>
    </div>
  );
};

const SortControlDemo = () => {
  const [activeId, setActiveId] = useState<string | undefined>();
  const [dir, setDir] = useState<"asc" | "desc" | "none">("none");
  const options = [
    { id: "name", label: "NAME" },
    { id: "rarity", label: "RARITY" },
    { id: "class", label: "CLASS" },
    { id: "date", label: "DATE" },
  ];
  return (
    <div className="space-y-4">
      <SortControl
        options={options}
        activeId={activeId}
        direction={dir}
        onSortChange={(id, direction) => {
          setActiveId(direction === "none" ? undefined : id);
          setDir(direction);
        }}
      />
      {activeId && dir !== "none" && (
        <p className="font-['Orbitron',monospace] text-[10px] uppercase tracking-wider text-muted-foreground">
          SORTING BY: <span className="text-primary">{activeId.toUpperCase()}</span>{" "}
          {dir === "asc" ? "▲ ASCENDING" : "▼ DESCENDING"}
        </p>
      )}
    </div>
  );
};

const PullToRefreshDemo = () => {
  const [items, setItems] = useState(["OPERATOR AMIYA", "OPERATOR KROOS", "OPERATOR EXUSIAI"]);
  const [lastRefresh, setLastRefresh] = useState<string>("—");
  const handleRefresh = async () => {
    await new Promise((r) => setTimeout(r, 1500));
    setLastRefresh(new Date().toLocaleTimeString());
    setItems(["OPERATOR AMIYA", "OPERATOR KROOS", "OPERATOR EXUSIAI", `OPERATOR CHEN (${new Date().toLocaleTimeString()})`]);
  };
  return (
    <div className="space-y-3">
      <p className="font-['Orbitron',monospace] text-[10px] uppercase tracking-wider text-muted-foreground">
        PULL DOWN ON MOBILE TO REFRESH · LAST: <span className="text-primary">{lastRefresh}</span>
      </p>
      <PullToRefresh onRefresh={handleRefresh} className="max-h-48 overflow-y-auto">
        <div className="space-y-px">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-3 px-4 py-3 bg-surface-1 border border-border/40">
              <span className="text-primary text-xs">◆</span>
              <span className="font-display text-[11px] uppercase tracking-wider text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </PullToRefresh>
      <p className="text-[11px] text-muted-foreground/60">On desktop, pull gesture requires a touch-enabled device or DevTools mobile emulation.</p>
    </div>
  );
};

const SwipeableItemDemo = () => {
  const [items, setItems] = useState([
    { id: 1, label: "MISSION ALPHA-01 — RECLAIM THE PERIMETER" },
    { id: 2, label: "MISSION BETA-07 — SECURE SUPPLY ROUTE" },
    { id: 3, label: "MISSION GAMMA-12 — REINFORCE BASE CAMP" },
  ]);
  const remove = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));
  const archive = (id: number) => setItems((prev) => prev.map((i) => i.id === id ? { ...i, label: `[ARCHIVED] ${i.label}` } : i));
  return (
    <div className="space-y-3">
      <p className="font-['Orbitron',monospace] text-[10px] uppercase tracking-wider text-muted-foreground">
        SWIPE LEFT → DELETE · SWIPE RIGHT → ARCHIVE
      </p>
      <div className="space-y-px max-w-md">
        {items.map((item) => (
          <SwipeableItem
            key={item.id}
            leftSwipeAction={{ label: "DELETE", variant: "delete", onTrigger: () => remove(item.id) }}
            rightSwipeAction={{ label: "ARCHIVE", variant: "archive", onTrigger: () => archive(item.id) }}
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-surface-1 border border-border/40">
              <span className="text-primary text-xs">◇</span>
              <span className="font-display text-[11px] uppercase tracking-wider text-foreground truncate">{item.label}</span>
            </div>
          </SwipeableItem>
        ))}
        {items.length === 0 && (
          <div className="flex items-center justify-center py-8 text-muted-foreground/50 font-display text-xs uppercase tracking-wider border border-dashed border-border/30">
            ALL MISSIONS CLEARED
          </div>
        )}
      </div>
    </div>
  );
};

const SessionTimeoutDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 font-display text-xs uppercase tracking-[0.1em] border border-border bg-surface-1 hover:border-primary/40 hover:bg-primary/[0.04] transition-all duration-200"
      >
        <span className="text-primary">◆</span>
        PREVIEW SESSION TIMEOUT
      </button>
      <SessionTimeoutModal
        open={open}
        secondsRemaining={45}
        onExtend={() => setOpen(false)}
        onLogout={() => setOpen(false)}
        warningAt={60}
      />
    </div>
  );
};
