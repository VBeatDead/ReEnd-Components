import { ComponentPreview } from "../docs/ComponentPreview";

export const ContentStrategySection = () => {
  return (
    <>
      {/* Voice & Tone */}
      <ComponentPreview
        id="voice-tone"
        title="Voice & Tone"
        description="Authoritative, concise, technical, calm, forward-looking. User = 'Endministrator'."
      >
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {["CONTEXT", "TONE", "EXAMPLE"].map((h) => (
                    <th key={h} className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left border-b border-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Hero/Marketing", "Inspirational, bold", '"BUILD FASTER WEBSITES."'],
                  ["Documentation", "Clear, instructional", '"Install the package using npm."'],
                  ["Error/Feedback", "Calm, helpful", '"Signal lost. Check your connection."'],
                  ["Success", "Affirming, minimal", '"Operation complete."'],
                  ["Onboarding", "Welcoming", '"Welcome back, Endministrator."'],
                ].map(([ctx, tone, ex]) => (
                  <tr key={ctx} className="border-b border-border hover:bg-primary/[0.03]">
                    <td className="py-2 px-3 text-card-foreground font-medium">{ctx}</td>
                    <td className="py-2 px-3 text-muted-foreground">{tone}</td>
                    <td className="py-2 px-3 text-primary font-mono text-xs">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">TERMINOLOGY</h4>
            <ul className="space-y-1 text-sm">
              <li className="diamond-marker text-card-foreground">User: <span className="text-primary font-semibold">"Endministrator"</span></li>
              <li className="diamond-marker text-card-foreground">System: <span className="text-primary font-semibold">"Endfield System" / "EF-SYS"</span></li>
              <li className="diamond-marker text-card-foreground">Operations: "Deploy", "Execute", "Initialize", "Scan"</li>
            </ul>
          </div>
        </div>
      </ComponentPreview>

      {/* Microcopy */}
      <ComponentPreview
        id="microcopy"
        title="Microcopy Guidelines"
        description="Button labels: specific action. Nav: 1-2 words uppercase. No articles."
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {["ACTION", "✅ USE", "❌ AVOID"].map((h) => (
                  <th key={h} className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left border-b border-border">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Submit", "SUBMIT REPORT", '"Submit"'],
                ["Save", "SAVE CHANGES", '"OK"'],
                ["Delete", "DELETE ITEM", '"Remove"'],
                ["Navigate", "VIEW DETAILS", '"Click Here"'],
                ["Create", "CREATE PROJECT", '"Add"'],
              ].map(([action, use, avoid]) => (
                <tr key={action} className="border-b border-border">
                  <td className="py-2 px-3 text-card-foreground">{action}</td>
                  <td className="py-2 px-3 text-ef-green font-mono text-xs">{use}</td>
                  <td className="py-2 px-3 text-ef-red font-mono text-xs">{avoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentPreview>

      {/* Placeholder */}
      <ComponentPreview
        id="placeholder-standards"
        title="Placeholder Text Standards"
        description="Color #666666. Not italic. Never use as label replacement."
      >
        <div className="max-w-sm space-y-3">
          {[
            { label: "EMAIL", ph: "endministrator@endfield.icu" },
            { label: "USERNAME", ph: "Enter your callsign..." },
            { label: "SEARCH", ph: "Search documentation..." },
            { label: "URL", ph: "https://example.com" },
            { label: "DATE", ph: "YYYY.MM.DD" },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <span className="font-display text-[10px] tracking-[0.1em] uppercase text-muted-foreground w-20 shrink-0">{f.label}</span>
              <input className="flex-1 bg-surface-1 border border-border text-card-foreground px-3 py-2 text-sm placeholder:text-ef-gray-mid outline-none" placeholder={f.ph} />
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Error Messages */}
      <ComponentPreview
        id="error-message-writing"
        title="Error Message Writing"
        description="State the problem, explain fix, don't blame user, be specific, stay in-universe."
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {["VALIDATION", "MESSAGE"].map((h) => (
                  <th key={h} className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left border-b border-border">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Required empty", "[FIELD] is required."],
                ["Invalid email", "Enter a valid email address."],
                ["Password short", "Password must be at least 8 characters."],
                ["Rate limited", "Too many requests. Try again in [X] seconds."],
                ["Network error", "Connection lost. Check your network status."],
                ["Server error", "System malfunction. Our team has been notified."],
                ["Permission denied", "Access restricted. Insufficient clearance level."],
              ].map(([val, msg]) => (
                <tr key={val} className="border-b border-border">
                  <td className="py-2 px-3 text-card-foreground">{val}</td>
                  <td className="py-2 px-3 text-ef-red font-mono text-xs">{msg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentPreview>

      {/* Date/Time/Number */}
      <ComponentPreview
        id="date-time-number"
        title="Date, Time & Number Formatting"
        description="Font: Orbitron atau JetBrains Mono. Format konsisten."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">DATE FORMATS</h4>
            <dl className="space-y-2">
              {[
                ["Full", "15 Feb 2026"],
                ["Compact", "2026.02.15"],
                ["Timestamp", "2026.02.15 / 14:32:07 UTC"],
                ["Relative", "3 hours ago"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center gap-3">
                  <dt className="text-xs text-muted-foreground w-20">{k}</dt>
                  <dd className="font-mono text-sm text-primary">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">NUMBER FORMATS</h4>
            <dl className="space-y-2">
              {[
                ["Count", "1,247"],
                ["Percentage", "67%"],
                ["Version", "2.4.1"],
                ["File size", "12.4 MB"],
                ["Error code", "EF-404-3B2C"],
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
        title="Truncation & Overflow"
        description="Single line ellipsis, multi-line clamp, break-word for long strings."
      >
        <div className="max-w-sm space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Single line (truncate)</p>
            <p className="truncate text-sm text-card-foreground border border-border px-3 py-2">This is a very long text that will be truncated with an ellipsis at the end of the line.</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Multi-line (line-clamp-2)</p>
            <p className="line-clamp-2 text-sm text-card-foreground border border-border px-3 py-2">This is a very long text that spans multiple lines. It will be clamped to exactly 2 lines with an ellipsis. Additional content will be hidden from view.</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Break word</p>
            <p className="break-all text-sm text-card-foreground border border-border px-3 py-2 font-mono text-xs">superlongstringwithoutanyspaces_or_breaks_that_needs_to_be_broken_across_lines</p>
          </div>
        </div>
      </ComponentPreview>
    </>
  );
};
