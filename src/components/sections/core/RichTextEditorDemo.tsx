import { RichTextEditor } from "../../ui/rich-text-editor";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../../docs/ComponentPreview";

const INITIAL_CONTENT = `# Mission Briefing

## Objectives

- Secure the perimeter
- Eliminate hostile operators
- Extract VIP target

> **WARNING**: Sector 7 is under heavy surveillance. Proceed with caution.

All units should maintain **radio silence** until the signal is given. _Confirm receipt._

---

Equipment list:
1. Standard tactical gear
2. Communications array
3. Emergency extraction kit`;

function RichTextEditorDemo() {
  const { t } = useTranslation("core");
  const [value, setValue] = useState(INITIAL_CONTENT);
  const [limitedValue, setLimitedValue] = useState("");

  return (
    <ComponentPreview
      id="rich-text-editor"
      title={t("rich_text_editor.title", { defaultValue: "Rich Text Editor" })}
      description={t("rich_text_editor.description", { defaultValue: "Markdown-powered WYSIWYG editor with Endfield styling. Toolbar buttons insert markdown syntax, PREVIEW mode renders styled HTML. No external dependencies." })}
      props={[
        { name: "value", type: "string", required: false, description: "Controlled markdown content" },
        { name: "onChange", type: "(value: string) => void", required: false, description: "Change handler — receives raw markdown" },
        { name: "placeholder", type: "string", required: false, description: "Empty state placeholder text" },
        { name: "maxLength", type: "number", required: false, description: "Character limit (enforced)" },
        { name: "minHeight", type: "number", required: false, description: "Editor area min-height in px", default: "240" },
        { name: "mode", type: '"markdown" | "preview"', required: false, description: "Controlled mode" },
        { name: "onModeChange", type: "(mode: string) => void", required: false, description: "Mode change handler" },
        { name: "disabled", type: "boolean", required: false, description: "Disables editing" },
      ]}
      code={`import { RichTextEditor } from "reend-components";

<RichTextEditor
  value={content}
  onChange={setContent}
  maxLength={10000}
  placeholder="Write mission briefing..."
/>`}
    >
      <div className="space-y-8 max-w-3xl">
        {/* Main demo */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-3">
            {t("rich_text_editor.label_full", { defaultValue: "◆ FULL EDITOR — MARKDOWN + PREVIEW TOGGLE" })}
          </p>
          <RichTextEditor
            value={value}
            onChange={setValue}
            maxLength={10000}
          />
        </div>

        {/* With character limit */}
        <div className="pt-4 border-t border-border">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-3">
            {t("rich_text_editor.label_char_limit", { defaultValue: "CHARACTER LIMIT (200)" })}
          </p>
          <RichTextEditor
            value={limitedValue}
            onChange={setLimitedValue}
            maxLength={200}
            minHeight={120}
            placeholder="Short field — max 200 characters..."
          />
        </div>

        {/* Disabled */}
        <div className="pt-4 border-t border-border">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-3">
            {t("rich_text_editor.state_disabled", { defaultValue: "DISABLED STATE" })}
          </p>
          <RichTextEditor
            value="## Classified\n\nThis document is **read-only**."
            disabled
            minHeight={100}
          />
        </div>
      </div>
    </ComponentPreview>
  );
}

export default RichTextEditorDemo;
