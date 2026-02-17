import { ComponentPreview } from "../../docs/ComponentPreview";
import { Minus } from "lucide-react";

const CardsDemo = () => (
  <ComponentPreview
    id="cards"
    title="Cards"
    showViewport
    description="Corner brackets signature element. Hover: translateY(-4px), yellow border tint, shadow."
    code={`.card {
  background: var(--surface-1);
  border: 1px solid var(--border-subtle);
  position: relative; overflow: hidden;
  transition: all 0.4s var(--ease-default);
}
.card::before { /* corner bracket: 24px, 2px solid yellow 0.3 */ }
.card:hover { border-color: rgba(255,212,41,0.2); transform: translateY(-4px); }`}
    props={[
      {
        name: "variant",
        type: '"content" | "feature" | "stat" | "link" | "interactive"',
        default: '"content"',
        required: false,
        description: "Card layout and purpose variant",
      },
      {
        name: "selected",
        type: "boolean",
        default: "false",
        required: false,
        description: "Shows selected state with primary border highlight",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        required: false,
        description: "Reduces opacity and disables pointer events",
      },
      {
        name: "hoverable",
        type: "boolean",
        default: "true",
        required: false,
        description: "Enables lift and glow hover animation",
      },
      {
        name: "onClick",
        type: "() => void",
        required: false,
        description: "Makes the card clickable with cursor pointer",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Card body content",
      },
    ]}
    api={[
      {
        name: "corner-brackets",
        signature: "className utility",
        description:
          "Adds ::before and ::after pseudo-elements creating the signature Endfield corner bracket decoration (24px, primary color at 0.4 opacity).",
      },
      {
        name: "hover:-translate-y-1",
        signature: "hover state",
        description:
          "Lifts the card 4px on hover for depth effect. Combine with shadow and border color transition.",
      },
    ]}
    playground={{
      componentName: "Card",
      controls: [
        {
          name: "variant",
          type: "select",
          options: ["content", "feature", "stat"],
          default: "content",
        },
        { name: "hoverable", type: "boolean", default: true },
        { name: "selected", type: "boolean", default: false },
        { name: "disabled", type: "boolean", default: false },
        { name: "title", label: "Title", type: "text", default: "CARD TITLE" },
      ],
      render: (v) => (
        <div className="flex justify-center">
          <div
            className={`w-72 border bg-surface-1 transition-all duration-300 ${
              v.disabled ? "opacity-50 cursor-not-allowed" : ""
            } ${v.hoverable && !v.disabled ? "corner-brackets hover:border-primary/20 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]" : ""} ${
              v.selected
                ? "border-2 border-primary/40 bg-primary/[0.06]"
                : "border-border"
            }`}
          >
            {v.variant === "content" && (
              <>
                <div className="aspect-video bg-surface-2 flex items-center justify-center">
                  <span className="font-display text-sm text-muted-foreground">
                    16:9
                  </span>
                </div>
                <div className="p-5">
                  <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-primary mb-2">
                    OVERLINE
                  </p>
                  <h4 className="font-display text-sm font-bold tracking-[0.02em] uppercase text-foreground mb-2">
                    {v.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Description text lorem ipsum dolor sit amet.
                  </p>
                </div>
              </>
            )}
            {v.variant === "feature" && (
              <div className="p-6">
                <div className="w-10 h-10 clip-corner-sm bg-primary/10 flex items-center justify-center mb-4">
                  <Minus className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-display text-sm font-bold tracking-[0.02em] uppercase text-foreground mb-2">
                  {v.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  Feature description text with details.
                </p>
              </div>
            )}
            {v.variant === "stat" && (
              <div className="p-6 text-center">
                <p className="font-display text-3xl font-bold text-primary mb-1">
                  99.9%
                </p>
                <p className="font-display text-xs tracking-[0.1em] uppercase text-muted-foreground">
                  {v.title}
                </p>
              </div>
            )}
          </div>
        </div>
      ),
    }}
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Content Card */}
      <div className="corner-brackets border border-border bg-surface-1 hover:border-primary/20 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer overflow-hidden">
        <div className="aspect-video bg-surface-2 flex items-center justify-center">
          <span className="font-display text-2xl text-muted-foreground">
            16:9
          </span>
        </div>
        <div className="p-5">
          <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-primary mb-2">
            TACTICAL
          </p>
          <h4 className="font-display text-sm font-bold tracking-[0.02em] uppercase text-foreground mb-2">
            CONTENT CARD
          </h4>
          <p className="text-sm text-muted-foreground">
            Standard content layout with media slot, overline, title, and body
            text.
          </p>
        </div>
      </div>

      {/* Feature Card */}
      <div className="corner-brackets border border-border bg-surface-1 hover:border-primary/20 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer p-6">
        <div className="w-10 h-10 clip-corner-sm bg-primary/10 flex items-center justify-center mb-4">
          <Minus className="w-5 h-5 text-primary" />
        </div>
        <h4 className="font-display text-sm font-bold tracking-[0.02em] uppercase text-foreground mb-2">
          FEATURE CARD
        </h4>
        <p className="text-sm text-muted-foreground">
          Icon-first card for features or capabilities. No media block.
        </p>
      </div>

      {/* Stat Card */}
      <div className="corner-brackets border border-border bg-surface-1 hover:border-primary/20 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer p-6 text-center flex flex-col items-center justify-center">
        <p className="font-display text-4xl font-bold text-primary mb-1">
          99.9%
        </p>
        <p className="font-display text-xs tracking-[0.1em] uppercase text-muted-foreground">
          UPTIME
        </p>
        <div className="mt-3 w-full h-1 bg-surface-2">
          <div className="h-full bg-primary w-[99.9%]" />
        </div>
      </div>
    </div>
  </ComponentPreview>
);

export default CardsDemo;
