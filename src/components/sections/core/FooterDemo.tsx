import { ComponentPreview } from "../../docs/ComponentPreview";
import { useTranslation } from "react-i18next";

function FooterDemo() {
  const { t } = useTranslation("core");
  return (
    <ComponentPreview
      id="footer"
      title={t("footer.title")}
      showViewport
      description={t("footer.description")}
      props={[
        {
          name: "columns",
          type: "{ title: string; links: { label: string; href: string }[] }[]",
          required: true,
          description: t("footer.props.columns"),
        },
        {
          name: "copyright",
          type: "string",
          required: false,
          description: t("footer.props.copyright"),
        },
        {
          name: "version",
          type: "string",
          required: false,
          description: t("footer.props.version"),
        },
      ]}
    >
      <div className="bg-background border-t border-border -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-8">
          {[
            {
              title: t("footer.product"),
              links: [
                t("footer.features"),
                t("footer.documentation"),
                t("footer.changelog"),
                t("footer.roadmap"),
              ],
            },
            {
              title: t("footer.community"),
              links: [
                t("footer.discord"),
                t("footer.github"),
                t("footer.twitter"),
                t("footer.blog"),
              ],
            },
            {
              title: t("footer.legal"),
              links: [
                t("footer.privacy"),
                t("footer.terms"),
                t("footer.license"),
              ],
            },
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
        <div className="border-t border-border pt-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-ef-gray-mid">
            {t("footer.copyright_text")}
          </p>
          <p className="font-mono text-[10px] text-ef-gray-mid">
            {t("footer.version_text")}
          </p>
        </div>
      </div>
    </ComponentPreview>
  );
}

export default FooterDemo;
