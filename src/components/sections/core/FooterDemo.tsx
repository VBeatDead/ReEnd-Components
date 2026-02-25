import { ComponentPreview } from "../../docs/ComponentPreview";
import { Footer, FooterColumn, FooterLink } from "../../ui/footer";
import { useTranslation } from "react-i18next";

function FooterDemo() {
  const { t } = useTranslation("core");
  return (
    <ComponentPreview
      id="footer"
      title={t("footer.title")}
      showViewport
      description={t("footer.description")}
      code={`import { Footer, FooterColumn, FooterLink } from "reend-components";

<Footer
  brand="REEND COMPONENTS"
  tagline="v1.1.0 · MIT License"
  copyright="© 2025 VBeatDead. All rights reserved."
  note="Not affiliated with HyperGryph or Yostar. Arknights: Endfield is a trademark of HyperGryph."
>
  <FooterColumn title="Product">
    <FooterLink href="#">Features</FooterLink>
    <FooterLink href="#">Documentation</FooterLink>
    <FooterLink href="#">Changelog</FooterLink>
    <FooterLink href="#">Roadmap</FooterLink>
  </FooterColumn>
  <FooterColumn title="Community">
    <FooterLink href="#" external>Discord</FooterLink>
    <FooterLink href="#" external>GitHub</FooterLink>
    <FooterLink href="#" external>Twitter</FooterLink>
  </FooterColumn>
  <FooterColumn title="Legal">
    <FooterLink href="#">Privacy Policy</FooterLink>
    <FooterLink href="#">Terms of Service</FooterLink>
    <FooterLink href="#">MIT License</FooterLink>
  </FooterColumn>
</Footer>`}
      install={{
        importPath: `import { Footer, FooterColumn, FooterLink } from "reend-components";`,
        usage: `<Footer brand="BRAND NAME" copyright="© 2025">
  <FooterColumn title="Product">
    <FooterLink href="#">Link</FooterLink>
  </FooterColumn>
</Footer>`,
      }}
      props={[
        {
          name: "brand",
          type: "string",
          required: false,
          description: t("footer.props.brand"),
        },
        {
          name: "tagline",
          type: "string",
          required: false,
          description: t("footer.props.tagline"),
        },
        {
          name: "copyright",
          type: "string",
          required: false,
          description: t("footer.props.copyright"),
        },
        {
          name: "note",
          type: "string",
          required: false,
          description: t("footer.props.note"),
        },
      ]}
    >
      <div className="-mx-6 sm:-mx-8 -mb-6 sm:-mb-8 mt-0">
        <Footer
          brand={t("footer.brand_text")}
          tagline={t("footer.version_text")}
          copyright={t("footer.copyright_text")}
          note={t("footer.note_text")}
        >
          <FooterColumn title={t("footer.product")}>
            <FooterLink href="#">{t("footer.features")}</FooterLink>
            <FooterLink href="#">{t("footer.documentation")}</FooterLink>
            <FooterLink href="#">{t("footer.changelog")}</FooterLink>
            <FooterLink href="#">{t("footer.roadmap")}</FooterLink>
          </FooterColumn>
          <FooterColumn title={t("footer.community")}>
            <FooterLink href="#" external>{t("footer.discord")}</FooterLink>
            <FooterLink href="#" external>{t("footer.github")}</FooterLink>
            <FooterLink href="#" external>{t("footer.twitter")}</FooterLink>
            <FooterLink href="#">{t("footer.blog")}</FooterLink>
          </FooterColumn>
          <FooterColumn title={t("footer.legal")}>
            <FooterLink href="#">{t("footer.privacy")}</FooterLink>
            <FooterLink href="#">{t("footer.terms")}</FooterLink>
            <FooterLink href="#">{t("footer.license")}</FooterLink>
          </FooterColumn>
        </Footer>
      </div>
    </ComponentPreview>
  );
}

export default FooterDemo;
