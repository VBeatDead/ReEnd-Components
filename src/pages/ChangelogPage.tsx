import { useTranslation } from "react-i18next";

const ChangelogPage = () => {
  const { t } = useTranslation("changelog");
  const v2Items = t("v2.items", { returnObjects: true }) as string[];
  const v1Items = t("v1.items", { returnObjects: true }) as string[];

  return (
    <>
      <div id="changelog" className="mb-8 scroll-mt-20">
        <h1 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">
          {t("title")}
        </h1>
        <div className="h-px bg-border mb-8" />
      </div>

      <div className="space-y-6">
        <div className="border border-border bg-surface-1 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-sm font-bold text-primary">
              {t("v2.version")}
            </span>
            <span className="font-mono text-[10px] bg-ef-green/10 border border-ef-green/20 text-ef-green px-2 py-0.5">
              {t("latest")}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {t("v2.date")}
            </span>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {v2Items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary mt-1">◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-border bg-surface-1 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-sm font-bold text-muted-foreground">
              {t("v1.version")}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {t("v1.date")}
            </span>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {v1Items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-muted-foreground mt-1">◇</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ChangelogPage;
