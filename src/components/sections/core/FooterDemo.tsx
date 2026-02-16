import { ComponentPreview } from "../../docs/ComponentPreview";

const FooterDemo = () => (
  <ComponentPreview
    id="footer"
    title="16. Footer"
    description="Background canvas, border-top. 3-column grid. Column title: Orbitron 12px uppercase."
    props={[
      {
        name: "columns",
        type: "{ title: string; links: { label: string; href: string }[] }[]",
        required: true,
        description: "Footer link columns",
      },
      {
        name: "copyright",
        type: "string",
        required: false,
        description: "Copyright text displayed at bottom",
      },
      {
        name: "version",
        type: "string",
        required: false,
        description: "System version displayed bottom-right",
      },
    ]}
  >
    <div className="bg-background border-t border-border -m-8 p-8 mt-0">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-8">
        {[
          {
            title: "PRODUCT",
            links: ["Features", "Documentation", "Changelog", "Roadmap"],
          },
          {
            title: "COMMUNITY",
            links: ["Discord", "GitHub", "Twitter", "Blog"],
          },
          { title: "LEGAL", links: ["Privacy", "Terms", "License"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground mb-4">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <button className="text-sm text-ef-gray-mid hover:text-primary transition-colors bg-transparent">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-4 flex items-center justify-between">
        <p className="text-xs text-ef-gray-mid">
          © 2026 Endfield Industries. All rights reserved.
        </p>
        <p className="font-mono text-[10px] text-ef-gray-mid">EF-SYS v2.0.0</p>
      </div>
    </div>
  </ComponentPreview>
);

export default FooterDemo;
