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
      >
        <div className="space-y-6">
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
                {[
                  [
                    t("voice_tone.rows.hero.context"),
                    t("voice_tone.rows.hero.tone"),
                    t("voice_tone.rows.hero.example"),
                  ],
                  [
                    t("voice_tone.rows.documentation.context"),
                    t("voice_tone.rows.documentation.tone"),
                    t("voice_tone.rows.documentation.example"),
                  ],
                  [
                    t("voice_tone.rows.error.context"),
                    t("voice_tone.rows.error.tone"),
                    t("voice_tone.rows.error.example"),
                  ],
                  [
                    t("voice_tone.rows.success.context"),
                    t("voice_tone.rows.success.tone"),
                    t("voice_tone.rows.success.example"),
                  ],
                  [
                    t("voice_tone.rows.onboarding.context"),
                    t("voice_tone.rows.onboarding.tone"),
                    t("voice_tone.rows.onboarding.example"),
                  ],
                ].map(([ctx, tone, ex]) => (
                  <tr
                    key={ctx}
                    className="border-b border-border hover:bg-primary/[0.03]"
                  >
                    <td className="py-2 px-3 text-card-foreground font-medium">
                      {ctx}
                    </td>
                    <td className="py-2 px-3 text-muted-foreground">{tone}</td>
                    <td className="py-2 px-3 text-primary font-mono text-xs">
                      {ex}
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
      >
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
              {[
                [
                  t("microcopy.rows.submit.action"),
                  t("microcopy.rows.submit.use"),
                  t("microcopy.rows.submit.avoid"),
                ],
                [
                  t("microcopy.rows.save.action"),
                  t("microcopy.rows.save.use"),
                  t("microcopy.rows.save.avoid"),
                ],
                [
                  t("microcopy.rows.delete.action"),
                  t("microcopy.rows.delete.use"),
                  t("microcopy.rows.delete.avoid"),
                ],
                [
                  t("microcopy.rows.navigate.action"),
                  t("microcopy.rows.navigate.use"),
                  t("microcopy.rows.navigate.avoid"),
                ],
                [
                  t("microcopy.rows.create.action"),
                  t("microcopy.rows.create.use"),
                  t("microcopy.rows.create.avoid"),
                ],
              ].map(([action, use, avoid]) => (
                <tr key={action} className="border-b border-border">
                  <td className="py-2 px-3 text-card-foreground">{action}</td>
                  <td className="py-2 px-3 text-ef-green font-mono text-xs">
                    {use}
                  </td>
                  <td className="py-2 px-3 text-ef-red font-mono text-xs">
                    {avoid}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentPreview>

      {/* Placeholder */}
      <ComponentPreview
        id="placeholder-standards"
        title={t("placeholder.title")}
        description={t("placeholder.description")}
      >
        <div className="max-w-sm space-y-3">
          {[
            {
              label: t("placeholder.fields.email.label"),
              ph: t("placeholder.fields.email.placeholder"),
            },
            {
              label: t("placeholder.fields.username.label"),
              ph: t("placeholder.fields.username.placeholder"),
            },
            {
              label: t("placeholder.fields.search.label"),
              ph: t("placeholder.fields.search.placeholder"),
            },
            {
              label: t("placeholder.fields.url.label"),
              ph: t("placeholder.fields.url.placeholder"),
            },
            {
              label: t("placeholder.fields.date.label"),
              ph: t("placeholder.fields.date.placeholder"),
            },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <span className="font-display text-[10px] tracking-[0.1em] uppercase text-muted-foreground w-20 shrink-0">
                {f.label}
              </span>
              <input
                className="flex-1 bg-surface-1 border border-border text-card-foreground px-3 py-2 text-sm placeholder:text-ef-gray-mid outline-none"
                placeholder={f.ph}
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
              {[
                [
                  t("error_messages.rows.required.validation"),
                  t("error_messages.rows.required.message"),
                ],
                [
                  t("error_messages.rows.invalid_email.validation"),
                  t("error_messages.rows.invalid_email.message"),
                ],
                [
                  t("error_messages.rows.password_short.validation"),
                  t("error_messages.rows.password_short.message"),
                ],
                [
                  t("error_messages.rows.rate_limited.validation"),
                  t("error_messages.rows.rate_limited.message"),
                ],
                [
                  t("error_messages.rows.network_error.validation"),
                  t("error_messages.rows.network_error.message"),
                ],
                [
                  t("error_messages.rows.server_error.validation"),
                  t("error_messages.rows.server_error.message"),
                ],
                [
                  t("error_messages.rows.permission_denied.validation"),
                  t("error_messages.rows.permission_denied.message"),
                ],
              ].map(([val, msg]) => (
                <tr key={val} className="border-b border-border">
                  <td className="py-2 px-3 text-card-foreground">{val}</td>
                  <td className="py-2 px-3 text-ef-red font-mono text-xs">
                    {msg}
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
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("formatting.date_formats")}
            </h4>
            <dl className="space-y-2">
              {[
                [
                  t("formatting.date.full.label"),
                  t("formatting.date.full.value"),
                ],
                [
                  t("formatting.date.compact.label"),
                  t("formatting.date.compact.value"),
                ],
                [
                  t("formatting.date.timestamp.label"),
                  t("formatting.date.timestamp.value"),
                ],
                [
                  t("formatting.date.relative.label"),
                  t("formatting.date.relative.value"),
                ],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center gap-3">
                  <dt className="text-xs text-muted-foreground w-20">{k}</dt>
                  <dd className="font-mono text-sm text-primary">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("formatting.number_formats")}
            </h4>
            <dl className="space-y-2">
              {[
                [
                  t("formatting.number.count.label"),
                  t("formatting.number.count.value"),
                ],
                [
                  t("formatting.number.percentage.label"),
                  t("formatting.number.percentage.value"),
                ],
                [
                  t("formatting.number.version.label"),
                  t("formatting.number.version.value"),
                ],
                [
                  t("formatting.number.file_size.label"),
                  t("formatting.number.file_size.value"),
                ],
                [
                  t("formatting.number.error_code.label"),
                  t("formatting.number.error_code.value"),
                ],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center gap-3">
                  <dt className="text-xs text-muted-foreground w-20">{k}</dt>
                  <dd className="font-mono text-sm text-primary">{v}</dd>
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
      >
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
              {t("truncation.break_word")}
            </p>
            <p className="break-all text-sm text-card-foreground border border-border px-3 py-2 font-mono text-xs">
              {t("truncation.sample_break")}
            </p>
          </div>
        </div>
      </ComponentPreview>
    </>
  );
}
