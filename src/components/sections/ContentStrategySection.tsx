import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../docs/ComponentPreview";

export function ContentStrategySection() {
  const { t } = useTranslation("strategy");

  return (
    <>
      {/* Voice & Tone */}
      <ComponentPreview
        id="voice-tone"
        title={t("voice_tone.title")}
        description={t("voice_tone.description")}
        code={`// Brand voice constants — reference these across all copy
const COPY = {
  hero:    "SYSTEMATIZE YOUR WORKFLOW.",
  error:   "Connection lost. Check your network.",
  success: "Operation complete.",
  warning: "Maintenance scheduled. Save your work.",
  cta:     "INITIALIZE DEPLOYMENT",
};`}
      >
        <div className="space-y-6">
          {/* Brand Voice Attributes table */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("voice_tone.brand_voice_heading")}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    {(
                      [
                        t("voice_tone.brand_voice_headers.attribute"),
                        t("voice_tone.brand_voice_headers.description"),
                        t("voice_tone.brand_voice_headers.avoid"),
                      ] as string[]
                    ).map((h) => (
                      <th
                        key={h}
                        className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left border-b border-border"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      "authoritative",
                      "concise",
                      "technical",
                      "calm",
                      "forward_looking",
                    ] as const
                  ).map((key) => (
                    <tr
                      key={key}
                      className="border-b border-border hover:bg-primary/[0.03]"
                    >
                      <td className="py-2 px-3 text-primary font-semibold text-xs font-display">
                        {t(`voice_tone.brand_voice.${key}.attribute`)}
                      </td>
                      <td className="py-2 px-3 text-card-foreground text-xs">
                        {t(`voice_tone.brand_voice.${key}.description`)}
                      </td>
                      <td className="py-2 px-3 text-ef-red text-xs">
                        {t(`voice_tone.brand_voice.${key}.avoid`)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Context/Tone table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {[
                    t("voice_tone.headers.context"),
                    t("voice_tone.headers.tone"),
                    t("voice_tone.headers.example"),
                  ].map((h) => (
                    <th
                      key={h}
                      className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left border-b border-border"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    "hero",
                    "documentation",
                    "error",
                    "success",
                    "onboarding",
                    "warning",
                  ] as const
                ).map((key) => (
                  <tr
                    key={key}
                    className="border-b border-border hover:bg-primary/[0.03]"
                  >
                    <td className="py-2 px-3 text-card-foreground font-medium">
                      {t(`voice_tone.rows.${key}.context`)}
                    </td>
                    <td className="py-2 px-3 text-muted-foreground">
                      {t(`voice_tone.rows.${key}.tone`)}
                    </td>
                    <td className="py-2 px-3 text-primary font-mono text-xs">
                      {t(`voice_tone.rows.${key}.example`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("voice_tone.terminology")}
            </h4>
            <ul className="space-y-1 text-sm">
              <li className="diamond-marker text-card-foreground">
                User:{" "}
                <span className="text-primary font-semibold">
                  {t("voice_tone.user_label")}
                </span>
              </li>
              <li className="diamond-marker text-card-foreground">
                System:{" "}
                <span className="text-primary font-semibold">
                  {t("voice_tone.system_label")}
                </span>
              </li>
              <li className="diamond-marker text-card-foreground">
                Operations: {t("voice_tone.operations_label")}
              </li>
            </ul>
          </div>
        </div>
      </ComponentPreview>

      {/* Microcopy */}
      <ComponentPreview
        id="microcopy"
        title={t("microcopy.title")}
        description={t("microcopy.description")}
        code={`// ✅ Specific action labels
<Button>DEPLOY PACKAGE</Button>
<Button>DELETE RECORD</Button>
<Button>CREATE PROJECT</Button>
<Button>GO BACK</Button>

// ❌ Generic labels — avoid these
<Button>Submit</Button>
<Button>OK</Button>
<Button>Add</Button>
<Button>No</Button>`}
      >
        <div className="space-y-6">
          {/* Button labels table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {[
                    t("microcopy.headers.action"),
                    t("microcopy.headers.use"),
                    t("microcopy.headers.avoid"),
                  ].map((h) => (
                    <th
                      key={h}
                      className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left border-b border-border"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    "submit",
                    "save",
                    "delete",
                    "cancel",
                    "navigate",
                    "external",
                    "create",
                  ] as const
                ).map((key) => (
                  <tr key={key} className="border-b border-border">
                    <td className="py-2 px-3 text-card-foreground">
                      {t(`microcopy.rows.${key}.action`)}
                    </td>
                    <td className="py-2 px-3 text-ef-green font-mono text-xs">
                      {t(`microcopy.rows.${key}.use`)}
                    </td>
                    <td className="py-2 px-3 text-ef-red font-mono text-xs">
                      {t(`microcopy.rows.${key}.avoid`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Navigation labels */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-1">
              {t("microcopy.nav_heading")}
            </h4>
            <p className="text-xs text-muted-foreground mb-3">
              {t("microcopy.nav_note")}
            </p>
            <div className="flex flex-wrap gap-2">
              {(t("microcopy.nav_items", { returnObjects: true }) as string[]).map(
                (item) => (
                  <span
                    key={item}
                    className="font-display text-xs font-semibold tracking-[0.1em] uppercase border border-border px-3 py-1 text-card-foreground"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Form labels */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-1">
              {t("microcopy.form_heading")}
            </h4>
            <p className="text-xs text-muted-foreground mb-3">
              {t("microcopy.form_note")}
            </p>
            <div className="flex flex-col gap-2 max-w-xs">
              <div className="flex items-center gap-2">
                <label className="font-display text-[11px] tracking-[0.1em] uppercase text-card-foreground">
                  EMAIL
                  <span className="text-ef-red ml-0.5">*</span>
                </label>
                <span className="text-xs text-ef-red">
                  ({t("microcopy.form_required")})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <label className="font-display text-[11px] tracking-[0.1em] uppercase text-card-foreground">
                  WEBSITE
                </label>
                <span className="text-xs text-muted-foreground">
                  ({t("microcopy.form_optional")})
                </span>
              </div>
            </div>
          </div>

          {/* Confirmation dialog pattern */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-1">
              {t("microcopy.dialog_heading")}
            </h4>
            <p className="text-xs text-muted-foreground mb-3">
              {t("microcopy.dialog_note")}
            </p>
            <div className="border border-border bg-surface-1 p-4 max-w-sm">
              <h5 className="font-display text-sm font-semibold uppercase text-card-foreground mb-2">
                {t("microcopy.dialog_example_title")}
              </h5>
              <p className="text-sm text-muted-foreground mb-4">
                {t("microcopy.dialog_example_body")}
              </p>
              <div className="flex justify-end gap-2">
                <button className="font-display text-xs uppercase border border-border px-4 py-2 text-muted-foreground hover:text-card-foreground transition-colors">
                  {t("microcopy.dialog_cancel")}
                </button>
                <button className="font-display text-xs uppercase bg-ef-red/10 border border-ef-red/40 px-4 py-2 text-ef-red hover:bg-ef-red/20 transition-colors">
                  {t("microcopy.dialog_confirm")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Placeholder */}
      <ComponentPreview
        id="placeholder-standards"
        title={t("placeholder.title")}
        description={t("placeholder.description")}
        code={`// ✅ Input with semantic placeholder color
<Input
  type="email"
  placeholder="endministrator@endfield.icu"
/>
// placeholder uses text-muted-foreground (adapts light/dark)

// ✅ Always pair with a visible label
<>
  <Label>EMAIL <span className="text-ef-red">*</span></Label>
  <Input placeholder="endministrator@endfield.icu" />
</>

// ❌ Never use placeholder as label replacement
<Input placeholder="Email address" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
          {(
            [
              "email",
              "username",
              "password",
              "search",
              "url",
              "message",
              "code",
              "file",
              "date",
              "tags",
            ] as const
          ).map((key) => (
            <div key={key} className="flex items-center gap-3">
              <span className="font-display text-[10px] tracking-[0.1em] uppercase text-muted-foreground w-20 shrink-0">
                {t(`placeholder.fields.${key}.label`)}
              </span>
              <input
                className="flex-1 bg-surface-1 border border-border text-card-foreground px-3 py-2 text-sm placeholder:text-muted-foreground outline-none font-mono"
                placeholder={t(`placeholder.fields.${key}.placeholder`)}
              />
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Error Messages */}
      <ComponentPreview
        id="error-message-writing"
        title={t("error_messages.title")}
        description={t("error_messages.description")}
        code={`// Error message with HelperText component
<Input aria-invalid aria-describedby="err-pw" />
<HelperText id="err-pw" variant="error">
  Password must be at least 8 characters.
</HelperText>

// System-level error with Alert
<Alert variant="destructive">
  System malfunction. Our team has been notified.
</Alert>

// In-universe error format
<Alert variant="destructive">
  Access restricted. Insufficient clearance level.
</Alert>`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {[
                  t("error_messages.headers.validation"),
                  t("error_messages.headers.message"),
                ].map((h) => (
                  <th
                    key={h}
                    className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left border-b border-border"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  "required",
                  "invalid_email",
                  "password_short",
                  "rate_limited",
                  "network_error",
                  "server_error",
                  "permission_denied",
                  "file_too_large",
                  "not_found",
                  "mismatch",
                ] as const
              ).map((key) => (
                <tr key={key} className="border-b border-border">
                  <td className="py-2 px-3 text-card-foreground">
                    {t(`error_messages.rows.${key}.validation`)}
                  </td>
                  <td className="py-2 px-3 text-ef-red font-mono text-xs">
                    {t(`error_messages.rows.${key}.message`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentPreview>

      {/* Date/Time/Number */}
      <ComponentPreview
        id="date-time-number"
        title={t("formatting.title")}
        description={t("formatting.description")}
        code={`// Date formatting helpers
const fmt = {
  full:      (d: Date) =>
    d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    // → "15 Feb 2026"
  compact:   (d: Date) =>
    \`\${d.getFullYear()}.\${String(d.getMonth()+1).padStart(2,"0")}.\${String(d.getDate()).padStart(2,"0")}\`,
    // → "2026.02.15"
  timestamp: (d: Date) =>
    \`\${fmt.compact(d)} / \${d.toISOString().slice(11,19)} UTC\`,
    // → "2026.02.15 / 14:32:07 UTC"
};

// Number formatting
const count = new Intl.NumberFormat("en-US").format(1247); // → "1,247"
const pct   = \`\${Math.round(ratio * 100)}%\`;              // → "67%"
const ver   = \`\${major}.\${minor}.\${patch}\`;              // → "2.4.1"`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("formatting.date_formats")}
            </h4>
            <dl className="space-y-2">
              {(
                ["full", "compact", "timestamp", "relative", "blog_meta"] as const
              ).map((key) => (
                <div key={key} className="flex items-center gap-3">
                  <dt className="text-xs text-muted-foreground w-24">
                    {t(`formatting.date.${key}.label`)}
                  </dt>
                  <dd className="font-mono text-sm text-primary">
                    {t(`formatting.date.${key}.value`)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("formatting.number_formats")}
            </h4>
            <dl className="space-y-2">
              {(
                [
                  "count",
                  "percentage",
                  "version",
                  "file_size",
                  "error_code",
                ] as const
              ).map((key) => (
                <div key={key} className="flex items-center gap-3">
                  <dt className="text-xs text-muted-foreground w-24">
                    {t(`formatting.number.${key}.label`)}
                  </dt>
                  <dd className="font-mono text-sm text-primary">
                    {t(`formatting.number.${key}.value`)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </ComponentPreview>

      {/* Truncation */}
      <ComponentPreview
        id="truncation-overflow"
        title={t("truncation.title")}
        description={t("truncation.description")}
        code={`// Single line — ellipsis at overflow
<p className="truncate">Very long text...</p>

// Multi-line clamp — 2 lines max
<p className="line-clamp-2">Multi-line content...</p>

// Multi-line clamp — 3 lines max
<p className="line-clamp-3">Longer multi-line content...</p>

// Break long strings (URLs, hashes, code)
<p className="break-all font-mono text-xs">
  superlongstringwithoutspaces_or_breaks
</p>

// Table cell with tooltip for truncated content
<TableCell className="max-w-[200px] truncate" title={fullText}>
  {fullText}
</TableCell>`}
      >
        <div className="space-y-8">
          {/* CSS utility demos */}
          <div className="max-w-sm space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {t("truncation.single_line")}
              </p>
              <p className="truncate text-sm text-card-foreground border border-border px-3 py-2">
                {t("truncation.sample_single")}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {t("truncation.multi_line")}
              </p>
              <p className="line-clamp-2 text-sm text-card-foreground border border-border px-3 py-2">
                {t("truncation.sample_multi")}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {t("truncation.multi_line_3")}
              </p>
              <p className="line-clamp-3 text-sm text-card-foreground border border-border px-3 py-2">
                {t("truncation.sample_multi_3")}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {t("truncation.break_word")}
              </p>
              <p className="break-all text-sm text-card-foreground border border-border px-3 py-2 font-mono text-xs">
                {t("truncation.sample_break")}
              </p>
            </div>
          </div>

          {/* Element-specific rules table */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("truncation.rules_heading")}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    {(
                      ["element", "max_lines", "overflow"] as const
                    ).map((k) => (
                      <th
                        key={k}
                        className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left border-b border-border"
                      >
                        {t(`truncation.rules_headers.${k}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      "card_title",
                      "card_description",
                      "nav_item",
                      "table_cell",
                      "tag_text",
                      "sidebar_link",
                      "toast_message",
                    ] as const
                  ).map((key) => (
                    <tr key={key} className="border-b border-border hover:bg-primary/[0.03]">
                      <td className="py-2 px-3 text-card-foreground">
                        {t(`truncation.rules.${key}.element`)}
                      </td>
                      <td className="py-2 px-3 text-primary font-mono text-xs">
                        {t(`truncation.rules.${key}.max_lines`)}
                      </td>
                      <td className="py-2 px-3 text-muted-foreground text-xs">
                        {t(`truncation.rules.${key}.overflow`)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ComponentPreview>
    </>
  );
}
