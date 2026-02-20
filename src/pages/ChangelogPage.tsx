import { useTranslation } from "react-i18next";

interface VersionEntry {
  version: string;
  date: string;
  items: string[];
}

const ChangelogPage = () => {
  const { t } = useTranslation("changelog");
  const versions = t("versions", { returnObjects: true }) as VersionEntry[];

  return (
    <>
      <div id="changelog" className="mb-8 scroll-mt-20">
        <h1 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">
          {t("title")}
        </h1>
        <div className="h-px bg-border mb-8" />
      </div>

      <div className="space-y-6">
        {versions.map((entry, index) => {
          const isLatest = index === 0;
          return (
            <div
              key={entry.version}
              className="border border-border bg-surface-1 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`font-mono text-sm font-bold ${
                    isLatest ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {entry.version}
                </span>
                {isLatest && (
                  <span className="font-mono text-[10px] bg-ef-green/10 border border-ef-green/20 text-ef-green px-2 py-0.5">
                    {t("latest")}
                  </span>
                )}
                <span className="font-mono text-[10px] text-muted-foreground">
                  {entry.date}
                </span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {entry.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      className={`${
                        isLatest ? "text-primary" : "text-muted-foreground"
                      } mt-1`}
                    >
                      {isLatest ? "◆" : "◇"}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ChangelogPage;
