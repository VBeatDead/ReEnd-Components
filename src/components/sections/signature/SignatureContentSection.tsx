import { ComponentPreview } from "../../docs/ComponentPreview";
import { GlitchText, DataStream, ScanDivider } from "./primitives";
import TopoPatternDemo from "./TopoPatternDemo";
import HUDOverlay from "./HUDOverlay";

const SignatureContentSection = () => (
  <>
    {/* GLITCH TEXT */}
    <ComponentPreview
      id="glitch-text"
      title="Glitch Text"
      description="Efek distorsi teks khas HUD militer. Cyan + Red chromatic aberration overlay dengan animasi stutter."
      code={`.glitch-text { position: relative; }
.glitch-text::before { color: hsl(var(--ef-cyan)); clip-path: inset(20% 0 50% 0); }
.glitch-text::after { color: hsl(var(--ef-red)); clip-path: inset(50% 0 20% 0); }`}
      props={[
        {
          name: "children",
          type: "string",
          required: true,
          description: "Teks yang ditampilkan dengan efek glitch",
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Class tambahan",
        },
      ]}
    >
      <div className="flex flex-col items-center gap-8 py-8">
        <GlitchText className="font-display text-4xl font-bold tracking-[0.08em] uppercase text-foreground">
          ENDFIELD
        </GlitchText>
        <GlitchText className="font-display text-lg font-bold tracking-[0.12em] uppercase text-primary">
          SYSTEM ONLINE
        </GlitchText>
        <GlitchText className="font-mono text-sm text-muted-foreground">
          ERROR::CONNECTION_UNSTABLE
        </GlitchText>
      </div>
    </ComponentPreview>

    {/* DATA STREAM */}
    <ComponentPreview
      id="data-stream"
      title="Data Stream"
      description="Terminal feed real-time dengan auto-scroll. Pesan berwarna berdasarkan kategori [SYS], [NET], [SEC], [DAT]. Cursor blink khas."
      code={`<DataStream /> // Auto-scrolling terminal with categorized color-coded messages`}
      props={[]}
    >
      <DataStream />
    </ComponentPreview>

    {/* SCAN DIVIDER */}
    <ComponentPreview
      id="scan-divider"
      title="Scan Divider"
      description="Pembatas konten dengan gradient garis cahaya dan label diamond. Alternatif elegan dari <hr> biasa."
      code={`<ScanDivider label="SECTION BREAK" />`}
      props={[
        {
          name: "label",
          type: "string",
          required: false,
          description: "Label opsional di tengah divider",
        },
      ]}
    >
      <div className="space-y-8 py-4">
        <ScanDivider />
        <ScanDivider label="CLASSIFIED" />
        <ScanDivider label="END OF TRANSMISSION" />
      </div>
    </ComponentPreview>

    {/* TOPOGRAPHIC PATTERN */}
    <ComponentPreview
      id="topo-pattern"
      title="Topographic Pattern"
      description="Pola garis kontur topografi khas terrain map Endfield. SVG generatif dengan efek hover glow — cocok untuk background dekoratif atau section divider."
      code={`<TopoPattern width={600} height={300} layers={8} />`}
      props={[
        {
          name: "width",
          type: "number",
          default: "600",
          required: false,
          description: "Lebar pattern (px)",
        },
        {
          name: "height",
          type: "number",
          default: "300",
          required: false,
          description: "Tinggi pattern (px)",
        },
        {
          name: "layers",
          type: "number",
          default: "8",
          required: false,
          description: "Jumlah garis kontur",
        },
      ]}
    >
      <TopoPatternDemo />
    </ComponentPreview>

    {/* HUD OVERLAY */}
    <ComponentPreview
      id="hud-overlay"
      title="HUD Overlay"
      description="Heads-Up Display overlay dengan corner brackets, crosshair, status bar, dan koordinat real-time."
      code={`<HUDOverlay><YourContent /></HUDOverlay>`}
      props={[
        {
          name: "children",
          type: "ReactNode",
          required: false,
          description: "Konten utama di dalam HUD frame",
        },
        {
          name: "showCoords",
          type: "boolean",
          default: "true",
          required: false,
          description: "Tampilkan label koordinat",
        },
        {
          name: "showCrosshair",
          type: "boolean",
          default: "true",
          required: false,
          description: "Tampilkan crosshair tengah",
        },
      ]}
    >
      <HUDOverlay>
        <div className="text-center">
          <p className="font-display text-2xl sm:text-3xl font-bold tracking-[0.08em] uppercase text-foreground">
            FIELD <span className="text-primary">OPERATIVE</span>
          </p>
          <p className="font-mono text-xs text-muted-foreground mt-2">
            CLEARANCE LEVEL: ALPHA ◆ STATUS: ACTIVE
          </p>
        </div>
      </HUDOverlay>
    </ComponentPreview>
  </>
);

export default SignatureContentSection;
