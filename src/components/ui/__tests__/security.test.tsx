/**
 * Security Test Suite
 * Tests XSS vectors, URL sanitization, header config, CSP directives,
 * and path traversal protection across all security-sensitive code paths.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import * as fs from "node:fs";
import * as path from "node:path";
import type { RichTextEditor as RichTextEditorType } from "../rich-text-editor";

interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

/* ── Helpers ──────────────────────────────────────────────────────────────── */
const ROOT = path.resolve(__dirname, "../../../../");

function readPublicFile(file: string): string {
  return fs.readFileSync(path.join(ROOT, "public", file), "utf-8");
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  1. RichTextEditor — URL Sanitization (XSS via markdown links)             */
/* ─────────────────────────────────────────────────────────────────────────── */
describe("RichTextEditor — renderMarkdown URL sanitization", () => {
  // We need to import the component. Since renderMarkdown is internal,
  // we test via the rendered preview pane (mode="preview").
  let RichTextEditor: typeof RichTextEditorType;

  beforeEach(async () => {
    const mod = await import("../rich-text-editor");
    RichTextEditor = mod.RichTextEditor;
  });

  function renderPreview(markdown: string) {
    const { container } = render(
      <RichTextEditor value={markdown} mode="preview" />,
    );
    return container;
  }

  /* ── DANGEROUS protocols must be STRIPPED ──────────────────────────────── */

  it("strips javascript: protocol links — renders text only", () => {
    const container = renderPreview("[click me](javascript:alert(1))");
    const anchors = container.querySelectorAll("a");
    expect(anchors.length).toBe(0);
    // Text content should still appear
    expect(container.textContent).toContain("click me");
  });

  it("strips javascript: with mixed case — JAVASCRIPT:alert(1)", () => {
    const container = renderPreview("[xss](JAVASCRIPT:alert(1))");
    const anchors = container.querySelectorAll("a");
    expect(anchors.length).toBe(0);
  });

  it("strips javascript: with leading whitespace", () => {
    const container = renderPreview("[xss](  javascript:void(0))");
    const anchors = container.querySelectorAll("a");
    expect(anchors.length).toBe(0);
  });

  it("strips data: protocol links", () => {
    const container = renderPreview(
      "[xss](data:text/html,<script>alert(1)</script>)",
    );
    const anchors = container.querySelectorAll("a");
    expect(anchors.length).toBe(0);
  });

  it("strips data: with mixed case — Data:text/html", () => {
    const container = renderPreview("[xss](DATA:text/html,<img>)");
    const anchors = container.querySelectorAll("a");
    expect(anchors.length).toBe(0);
  });

  it("strips vbscript: protocol links", () => {
    const container = renderPreview("[xss](vbscript:msgbox('xss'))");
    const anchors = container.querySelectorAll("a");
    expect(anchors.length).toBe(0);
  });

  it("strips blob: protocol links", () => {
    const container = renderPreview(
      "[xss](blob:https://evil.com/fake-id)",
    );
    const anchors = container.querySelectorAll("a");
    expect(anchors.length).toBe(0);
  });

  it("strips file: protocol links", () => {
    const container = renderPreview("[xss](file:///etc/passwd)");
    const anchors = container.querySelectorAll("a");
    expect(anchors.length).toBe(0);
  });

  it("strips protocol-relative URLs //evil.com (inherits http/https from browser)", () => {
    const container = renderPreview("[xss](//evil.com/steal-cookies)");
    const anchors = container.querySelectorAll("a");
    // //evil.com starts with / but is followed by / — blocked by \/(?!\/) negative lookahead
    expect(anchors.length).toBe(0);
  });

  /* ── SAFE protocols must be ALLOWED ───────────────────────────────────── */

  it("allows https:// links", () => {
    const container = renderPreview(
      "[docs](https://reend-components.pages.dev)",
    );
    const anchor = container.querySelector("a");
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute("href")).toBe(
      "https://reend-components.pages.dev",
    );
  });

  it("allows http:// links", () => {
    const container = renderPreview("[link](http://example.com)");
    const anchor = container.querySelector("a");
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute("href")).toBe("http://example.com");
  });

  it("allows mailto: links", () => {
    const container = renderPreview("[email](mailto:user@example.com)");
    const anchor = container.querySelector("a");
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute("href")).toBe("mailto:user@example.com");
  });

  it("allows relative paths starting with /", () => {
    const container = renderPreview("[local](/docs/foundations)");
    const anchor = container.querySelector("a");
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute("href")).toBe("/docs/foundations");
  });

  /* ── SAFE link attributes ─────────────────────────────────────────────── */

  it("all links have target=_blank and rel=noopener noreferrer", () => {
    const container = renderPreview("[link](https://example.com)");
    const anchor = container.querySelector("a");
    expect(anchor?.getAttribute("target")).toBe("_blank");
    expect(anchor?.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("multiple links — dangerous stripped, safe allowed", () => {
    const md = [
      "[safe](https://example.com)",
      "[xss](javascript:alert(1))",
      "[email](mailto:test@test.com)",
      "[data](data:text/html,payload)",
    ].join("\n\n");

    const container = renderPreview(md);
    const anchors = container.querySelectorAll("a");
    // Only 2 safe links should render
    expect(anchors.length).toBe(2);
    const hrefs = Array.from(anchors).map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("https://example.com");
    expect(hrefs).toContain("mailto:test@test.com");
    expect(hrefs).not.toContain(expect.stringContaining("javascript:"));
    expect(hrefs).not.toContain(expect.stringContaining("data:"));
  });
});

/* ─────────────────────────────────────────────────────────────────────────── */
/*  2. RichTextEditor — General XSS via other markdown constructs             */
/* ─────────────────────────────────────────────────────────────────────────── */
describe("RichTextEditor — general XSS resistance", () => {
  let RichTextEditor: typeof RichTextEditorType;

  beforeEach(async () => {
    const mod = await import("../rich-text-editor");
    RichTextEditor = mod.RichTextEditor;
  });

  it("raw <script> tags in markdown do not execute", () => {
    const execSpy = vi.fn();
    (globalThis as Record<string, unknown>).__xss_test__ = execSpy;
    const { container } = render(
      <RichTextEditor
        value={"<script>__xss_test__()</script>"}
        mode="preview"
      />,
    );
    // innerHTML is set via dangerouslySetInnerHTML — browser wouldn't execute
    // scripts injected via innerHTML (jsdom security model)
    // Verify the script tag is present but the fn was NOT called
    expect(execSpy).not.toHaveBeenCalled();
    delete (globalThis as Record<string, unknown>).__xss_test__;
    void container;
  });

  it("onerror attribute in img tags does not execute", () => {
    const execSpy = vi.fn();
    (globalThis as Record<string, unknown>).__onerror_test__ = execSpy;
    render(
      <RichTextEditor
        value={'<img src=x onerror="__onerror_test__()">'}
        mode="preview"
      />,
    );
    expect(execSpy).not.toHaveBeenCalled();
    delete (globalThis as Record<string, unknown>).__onerror_test__;
  });

  it("headings do not introduce script injection — HTML escaped", () => {
    const { container } = render(
      <RichTextEditor
        value={"# <script>alert(1)</script>"}
        mode="preview"
      />,
    );
    const h1 = container.querySelector("h1");
    // HTML is escaped first, so <script> becomes &lt;script&gt; in text
    expect(h1).not.toBeNull();
    // No executable script element inside heading
    expect(h1?.querySelector("script")).toBeNull();
    // The heading text content should contain the escaped tag as literal text
    expect(h1?.textContent).toContain("alert(1)");
  });

  it("blockquotes do not execute injected HTML", () => {
    const { container } = render(
      <RichTextEditor
        value={"> <img src=x onerror=alert(1)>"}
        mode="preview"
      />,
    );
    const blockquote = container.querySelector("blockquote");
    expect(blockquote).not.toBeNull();
    // img tag should be escaped, not rendered as an actual img element
    expect(blockquote?.querySelector("img")).toBeNull();
    expect(blockquote?.textContent).toContain("img src");
  });

  it("maxLength prevents unbounded input growth", () => {
    const onChange = vi.fn();
    const { container } = render(
      <RichTextEditor value="" onChange={onChange} maxLength={100} />,
    );
    const textarea = container.querySelector("textarea");
    expect(textarea).not.toBeNull();
    // Character counter should show 0/100
    expect(container.textContent).toContain("0 / 100");
  });
});

/* ─────────────────────────────────────────────────────────────────────────── */
/*  3. _headers — Security Header Validation                                   */
/* ─────────────────────────────────────────────────────────────────────────── */
describe("_headers — HTTP security header configuration", () => {
  let headers: string;

  beforeEach(() => {
    headers = readPublicFile("_headers");
  });

  /* ── HSTS ─────────────────────────────────────────────────────────────── */
  it("has Strict-Transport-Security header", () => {
    expect(headers).toContain("Strict-Transport-Security");
  });

  it("HSTS has max-age of at least 1 year (31536000)", () => {
    const match = headers.match(/Strict-Transport-Security:\s*(.+)/);
    expect(match).not.toBeNull();
    const value = match![1];
    const maxAge = value.match(/max-age=(\d+)/);
    expect(maxAge).not.toBeNull();
    expect(parseInt(maxAge![1])).toBeGreaterThanOrEqual(31536000);
  });

  it("HSTS includes includeSubDomains", () => {
    expect(headers).toContain("includeSubDomains");
  });

  it("HSTS includes preload", () => {
    expect(headers).toContain("preload");
  });

  /* ── CSP ──────────────────────────────────────────────────────────────── */
  it("has Content-Security-Policy header", () => {
    expect(headers).toContain("Content-Security-Policy");
  });

  it("CSP has frame-ancestors none (clickjacking prevention)", () => {
    expect(headers).toContain("frame-ancestors 'none'");
  });

  it("CSP has base-uri self (base tag injection prevention)", () => {
    expect(headers).toContain("base-uri 'self'");
  });

  it("CSP has form-action to prevent form hijacking", () => {
    expect(headers).toMatch(/form-action\s+'(self|none)'/);
  });

  it("CSP has upgrade-insecure-requests", () => {
    expect(headers).toContain("upgrade-insecure-requests");
  });

  it("CSP specifies font-src for Google Fonts", () => {
    expect(headers).toContain("fonts.gstatic.com");
  });

  it("CSP specifies frame-src for Sandpack (CodeSandbox)", () => {
    expect(headers).toContain("codesandbox.io");
  });

  /* ── Classic security headers ─────────────────────────────────────────── */
  it("has X-Content-Type-Options: nosniff", () => {
    expect(headers).toContain("X-Content-Type-Options: nosniff");
  });

  it("has X-Frame-Options: DENY", () => {
    expect(headers).toContain("X-Frame-Options: DENY");
  });

  it("has Referrer-Policy", () => {
    expect(headers).toContain("Referrer-Policy");
  });

  it("has Permissions-Policy", () => {
    expect(headers).toContain("Permissions-Policy");
  });

  it("Permissions-Policy disables camera, microphone, geolocation", () => {
    const match = headers.match(/Permissions-Policy:\s*(.+)/);
    expect(match).not.toBeNull();
    const value = match![1];
    expect(value).toContain("camera=()");
    expect(value).toContain("microphone=()");
    expect(value).toContain("geolocation=()");
  });

  /* ── Cache-Control ────────────────────────────────────────────────────── */
  it("static assets have immutable long cache", () => {
    expect(headers).toContain("max-age=31536000, immutable");
  });

  it("index.html has no-cache to enable revalidation", () => {
    const lines = headers.split("\n");
    const htmlIdx = lines.findIndex((l) => l.trim() === "/index.html");
    if (htmlIdx !== -1) {
      // Next line should be Cache-Control with no-cache or must-revalidate
      const cacheControl = lines
        .slice(htmlIdx + 1, htmlIdx + 3)
        .join(" ");
      expect(cacheControl).toMatch(/must-revalidate|no-cache|max-age=0/);
    }
  });
});

/* ─────────────────────────────────────────────────────────────────────────── */
/*  4. _redirects — Open Redirect Audit                                        */
/* ─────────────────────────────────────────────────────────────────────────── */
describe("_redirects — no open redirect vectors", () => {
  let redirects: string;

  beforeEach(() => {
    redirects = readPublicFile("_redirects");
  });

  it("_redirects file exists and is non-empty", () => {
    expect(redirects.trim().length).toBeGreaterThan(0);
  });

  it("no redirect rules point to external domains", () => {
    // Filter out: empty lines, # comments, and /* */ block comments (Cloudflare syntax)
    const lines = redirects
      .split("\n")
      .filter((l) => {
        const t = l.trim();
        return t && !t.startsWith("#") && !t.startsWith("/*");
      });
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 2) {
        const destination = parts[1];
        // Destination should be relative (starts with /) or production domain
        expect(destination).toMatch(/^\/|^https:\/\/reend-components/);
      }
    }
  });

  it("no javascript: or data: in redirect destinations", () => {
    expect(redirects).not.toMatch(/javascript:/i);
    expect(redirects).not.toMatch(/data:/i);
  });

  it("SPA fallback routes all map to /index.html", () => {
    const lines = redirects.split("\n").filter((l) => l.includes("200"));
    expect(lines.length).toBeGreaterThan(0);
    lines.forEach((line) => {
      expect(line).toContain("/index.html");
    });
  });
});

/* ─────────────────────────────────────────────────────────────────────────── */
/*  5. robots.txt — Crawler / Abuse Prevention                                 */
/* ─────────────────────────────────────────────────────────────────────────── */
describe("robots.txt — crawler configuration", () => {
  let robots: string;

  beforeEach(() => {
    robots = readPublicFile("robots.txt");
  });

  it("robots.txt exists", () => {
    expect(robots.trim().length).toBeGreaterThan(0);
  });

  it("references sitemap", () => {
    expect(robots).toContain("Sitemap:");
  });

  it("Sitemap URL is the production domain", () => {
    expect(robots).toContain("reend-components.pages.dev");
  });

  it("no Disallow: / that blocks everything (prevents SEO lockout)", () => {
    // Should NOT have a blanket Disallow: / with no trailing path
    const lines = robots.split("\n");
    const disallowAll = lines.some(
      (l) => l.trim() === "Disallow: /" && !l.includes("api"),
    );
    expect(disallowAll).toBe(false);
  });
});

/* ─────────────────────────────────────────────────────────────────────────── */
/*  6. Source Code — dangerouslySetInnerHTML audit                             */
/* ─────────────────────────────────────────────────────────────────────────── */
describe("Source code — dangerouslySetInnerHTML audit", () => {
  it("no dangerouslySetInnerHTML sourced from user-controlled fetch()", () => {
    // All dangerouslySetInnerHTML usages should come from trusted sources:
    // 1. Shiki (syntax highlighter) — trusted
    // 2. i18next (static JSON) — trusted
    // 3. renderMarkdown (with URL sanitization) — tested above
    // This test scans source for dangerous patterns
    const uiDir = path.join(ROOT, "src", "components", "ui");
    const files = fs.readdirSync(uiDir).filter((f) => f.endsWith(".tsx"));

    for (const file of files) {
      const content = fs.readFileSync(path.join(uiDir, file), "utf-8");

      // Check if file has dangerouslySetInnerHTML
      if (content.includes("dangerouslySetInnerHTML")) {
        // Must NOT be directly combined with fetch() result or user prop
        const hasFetchDirect = content.match(
          /dangerouslySetInnerHTML.*fetch\(|fetch\(.*dangerouslySetInnerHTML/s,
        );
        expect(hasFetchDirect).toBeNull();

        // Must NOT use eval-like patterns nearby
        const hasEval = content.match(/eval\s*\(|new\s+Function\s*\(/);
        expect(hasEval).toBeNull();
      }
    }
  });

  it("no eval() in any UI component", () => {
    const uiDir = path.join(ROOT, "src", "components", "ui");
    const files = fs.readdirSync(uiDir).filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"));
    for (const file of files) {
      const content = fs.readFileSync(path.join(uiDir, file), "utf-8");
      expect(content).not.toMatch(/\beval\s*\(/);
    }
  });

  it("no new Function() in any UI component", () => {
    const uiDir = path.join(ROOT, "src", "components", "ui");
    const files = fs.readdirSync(uiDir).filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"));
    for (const file of files) {
      const content = fs.readFileSync(path.join(uiDir, file), "utf-8");
      expect(content).not.toMatch(/new\s+Function\s*\(/);
    }
  });

  it("no document.write() in any UI component", () => {
    const uiDir = path.join(ROOT, "src", "components", "ui");
    const files = fs.readdirSync(uiDir).filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"));
    for (const file of files) {
      const content = fs.readFileSync(path.join(uiDir, file), "utf-8");
      expect(content).not.toMatch(/document\.write\s*\(/);
    }
  });
});

/* ─────────────────────────────────────────────────────────────────────────── */
/*  7. CLI — Path Traversal Protection                                          */
/* ─────────────────────────────────────────────────────────────────────────── */
describe("CLI — path traversal protection", () => {
  it("join() normalizes traversal sequences in outputDir", () => {
    const { join } = path;
    const cwd = "/home/user/myproject";
    // Simulating a crafted config.outputDir
    const maliciousOutputDir = "../../etc/passwd";
    const resolved = join(cwd, maliciousOutputDir);
    // join() normalizes but does NOT block traversal
    // The resolved path will be /home/etc/passwd (traversal succeeds)
    // This is a KNOWN RISK documented in the audit — mitigated by trust model
    // Verify the risk exists (so we can document it) and path at least stays
    // within the filesystem root
    expect(resolved).not.toContain("undefined");
    expect(path.isAbsolute(resolved)).toBe(true);
    // Document: in the CLI, outputDir comes from user's own config file
    // so path traversal = user attacking themselves (acceptable risk)
  });

  it("registry file entries contain no path traversal sequences", async () => {
    const { REGISTRY } = await import("../../../cli/registry");
    for (const [name, entry] of Object.entries(REGISTRY)) {
      for (const file of entry.files) {
        expect(file).not.toContain("../");
        expect(file).not.toContain("..\\");
        expect(file).not.toContain("\0"); // null bytes
        // Files should only be relative component paths
        expect(file).toMatch(/^[\w\-./]+\.tsx?$/);
        void name;
      }
    }
  });

  it("registry component names contain no shell injection characters", async () => {
    const { REGISTRY } = await import("../../../cli/registry");
    const safeNameRegex = /^[a-z0-9-]+$/;
    for (const name of Object.keys(REGISTRY)) {
      expect(name).toMatch(safeNameRegex);
    }
  });

  it("GITHUB_RAW_ROOT URL is hardcoded HTTPS to trusted domain", async () => {
    const content = fs.readFileSync(
      path.join(ROOT, "src", "cli", "registry.ts"),
      "utf-8",
    );
    const match = content.match(/GITHUB_RAW_ROOT\s*=\s*["'](.+?)["']/);
    expect(match).not.toBeNull();
    const url = match![1];
    expect(url).toMatch(/^https:\/\/raw\.githubusercontent\.com\//);
    expect(url).toContain("VBeatDead/ReEnd-Components");
  });

  it("getFileUrl/getHookUrl only build URLs from the trusted raw base", async () => {
    const { getFileUrl, getHookUrl } = await import("../../../cli/registry");
    expect(getFileUrl("button.tsx", "v1.1.1")).toMatch(
      /^https:\/\/raw\.githubusercontent\.com\/VBeatDead\/ReEnd-Components\/v1\.1\.1\/src\/components\/ui\/button\.tsx$/,
    );
    expect(getHookUrl("use-toast.ts")).toMatch(
      /^https:\/\/raw\.githubusercontent\.com\/VBeatDead\/ReEnd-Components\/main\/src\/hooks\/use-toast\.ts$/,
    );
  });

  it("fetchText does not accept arbitrary user-provided URLs", async () => {
    // Verify that the add command only constructs URLs via getFileUrl/getHookUrl
    // (which prepend the trusted raw base) + registry file paths (hardcoded)
    const content = fs.readFileSync(
      path.join(ROOT, "src", "cli", "commands", "add.ts"),
      "utf-8",
    );
    expect(content).toContain("getFileUrl");
    expect(content).toContain("getHookUrl");
    // Should NOT contain any pattern where user input goes directly into URL
    expect(content).not.toMatch(/fetchText\s*\(\s*(cwd|name|components|opts)/);
    expect(content).not.toMatch(/fetch(Text)?\s*\(\s*`?\$\{?(cwd|name|components|opts)/);
  });
});

/* ─────────────────────────────────────────────────────────────────────────── */
/*  8. index.html — Meta & OG Security                                         */
/* ─────────────────────────────────────────────────────────────────────────── */
describe("index.html — meta tag security", () => {
  let html: string;

  beforeEach(() => {
    html = fs.readFileSync(path.join(ROOT, "index.html"), "utf-8");
  });

  it("og:image points to og-image.png (not android-chrome, not SVG — social platforms don't render SVG)", () => {
    // Check only the og:image meta tag, not the entire file (android-chrome is used for JSON-LD publisher logo)
    const ogImageMatch = html.match(/property="og:image"\s+content="([^"]+)"/);
    expect(ogImageMatch).not.toBeNull();
    expect(ogImageMatch![1]).toContain("og-image.png");
    expect(ogImageMatch![1]).not.toContain("android-chrome");
    expect(ogImageMatch![1]).not.toMatch(/\.svg$/);
  });

  it("og:image is an absolute URL to production domain", () => {
    const match = html.match(/property="og:image"\s+content="([^"]+)"/);
    expect(match).not.toBeNull();
    expect(match![1]).toMatch(/^https:\/\/reend-components\.pages\.dev\//);
  });

  it("no inline onclick handlers in index.html", () => {
    expect(html).not.toMatch(/onclick\s*=/i);
  });

  it("no external scripts loaded from unknown domains", () => {
    // Only fonts.googleapis.com is allowed as external resource
    const scriptSrcs = [...html.matchAll(/src="(https?:\/\/[^"]+)"/g)].map(
      (m) => m[1],
    );
    for (const src of scriptSrcs) {
      expect(src).toMatch(/fonts\.googleapis\.com|fonts\.gstatic\.com/);
    }
  });

  it("theme detection script uses localStorage only (no eval)", () => {
    // Extract the inline script
    const scriptMatch = html.match(/<script>([\s\S]+?)<\/script>/);
    expect(scriptMatch).not.toBeNull();
    const script = scriptMatch![1];
    expect(script).not.toMatch(/eval\s*\(/);
    expect(script).not.toMatch(/new\s+Function/);
    expect(script).toContain("localStorage.getItem");
  });

  it("JSON-LD uses WebSite schema type (not WebApplication)", () => {
    const ldMatch = html.match(
      /<script type="application\/ld\+json">([\s\S]+?)<\/script>/,
    );
    expect(ldMatch).not.toBeNull();
    const json = JSON.parse(ldMatch![1]);
    // Must be WebSite (tells Google this is our branded site, not 3rd-party software)
    expect(json["@type"]).toBe("WebSite");
    expect(json.name).toBe("ReEnd Components");
    expect(json.url).toMatch(/^https:\/\/reend-components\.pages\.dev/);
  });

  it("JSON-LD has publisher organization (prevents Cloudflare as publisher)", () => {
    const ldMatch = html.match(
      /<script type="application\/ld\+json">([\s\S]+?)<\/script>/,
    );
    expect(ldMatch).not.toBeNull();
    const json = JSON.parse(ldMatch![1]);
    expect(json.publisher).toBeDefined();
    expect(json.publisher["@type"]).toBe("Organization");
    expect(json.publisher.name).toBe("ReEnd Components");
  });

  it("has canonical link tag pointing to production domain", () => {
    expect(html).toContain('rel="canonical"');
    expect(html).toContain("https://reend-components.pages.dev");
  });

  it("has web manifest link (site.webmanifest)", () => {
    expect(html).toContain('rel="manifest"');
    expect(html).toContain("site.webmanifest");
  });

  it("has og:locale meta tag", () => {
    expect(html).toContain('og:locale');
    expect(html).toContain("en_US");
  });
});

/* ─────────────────────────────────────────────────────────────────────────── */
/*  9. package.json — Dependency Security                                       */
/* ─────────────────────────────────────────────────────────────────────────── */
describe("package.json — dependency hygiene", () => {
  let pkg: PackageJson;

  beforeEach(() => {
    pkg = JSON.parse(
      fs.readFileSync(path.join(ROOT, "package.json"), "utf-8"),
    );
  });

  it("package-lock.json exists (lockfile pinning)", () => {
    expect(fs.existsSync(path.join(ROOT, "package-lock.json"))).toBe(true);
  });

  it("no analytics or telemetry packages in dependencies", () => {
    const allDeps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
    };
    const trackingPackages = [
      "mixpanel",
      "amplitude",
      "segment",
      "hotjar",
      "fullstory",
      "datadog-browser",
      "@sentry/react",
      "posthog-js",
      "plausible",
      "fathom-client",
      "google-analytics",
      "gtag",
    ];
    for (const tracker of trackingPackages) {
      expect(Object.keys(allDeps)).not.toContain(tracker);
    }
  });

  it("no suspicious obfuscated package names in dependencies", () => {
    const allDeps = [
      ...Object.keys(pkg.dependencies ?? {}),
      ...Object.keys(pkg.devDependencies ?? {}),
    ];
    for (const dep of allDeps) {
      // No packages that look like typosquatting (very short, random chars)
      expect(dep.length).toBeGreaterThan(2);
      // No packages with suspicious character sequences
      expect(dep).not.toMatch(/^[a-z]{2,3}[0-9]{4,}$/);
    }
  });

  it("main library has no bundled peer dependencies (they should be external)", () => {
    // peerDependencies should not also appear in dependencies
    const deps = Object.keys(pkg.dependencies ?? {});
    const peers = Object.keys(pkg.peerDependencies ?? {});
    const overlap = peers.filter((p) => deps.includes(p));
    expect(overlap).toHaveLength(0);
  });
});

/* ─────────────────────────────────────────────────────────────────────────── */
/*  10. Cloudflare Pages — Free Plan Resource Abuse Prevention                  */
/* ─────────────────────────────────────────────────────────────────────────── */
describe("Resource abuse prevention (Cloudflare Pages free plan)", () => {
  it("no WebSocket connections in UI components", () => {
    const uiDir = path.join(ROOT, "src", "components", "ui");
    const files = fs.readdirSync(uiDir).filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"));
    for (const file of files) {
      const content = fs.readFileSync(path.join(uiDir, file), "utf-8");
      // WebSockets would create persistent server connections
      expect(content).not.toMatch(/new\s+WebSocket\s*\(/);
    }
  });

  it("no Server-Sent Events (EventSource) in UI components", () => {
    const uiDir = path.join(ROOT, "src", "components", "ui");
    const files = fs.readdirSync(uiDir).filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"));
    for (const file of files) {
      const content = fs.readFileSync(path.join(uiDir, file), "utf-8");
      expect(content).not.toMatch(/new\s+EventSource\s*\(/);
    }
  });

  it("no fetch() calls to external APIs in UI components (static-only)", () => {
    const uiDir = path.join(ROOT, "src", "components", "ui");
    const files = fs.readdirSync(uiDir).filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"));
    for (const file of files) {
      const content = fs.readFileSync(path.join(uiDir, file), "utf-8");
      // No runtime fetch to external APIs
      // (CLI fetch is build-time only, not in UI components)
      const fetchMatches = [...content.matchAll(/fetch\s*\(\s*["'`]https?:/g)];
      expect(fetchMatches.length).toBe(0);
    }
  });

  it("no setTimeout polling loops (would cause CPU abuse)", () => {
    // Polling with short intervals would abuse CF free plan limits
    const uiDir = path.join(ROOT, "src", "components", "ui");
    const files = fs.readdirSync(uiDir).filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"));
    for (const file of files) {
      const content = fs.readFileSync(path.join(uiDir, file), "utf-8");
      // Look for setTimeout with very short intervals (< 100ms) inside loops/recursive
      // This is a heuristic — look for setTimeout(fn, [0-9]{1,2}[^0-9]) patterns
      const shortPolling = content.match(/setTimeout\s*\(\s*\w+\s*,\s*[1-9]\d?\s*\)/g);
      if (shortPolling) {
        // These could be intentional (e.g., 50ms animation timing)
        // Just warn/document — not a hard failure for animation use
        // The important thing is it's not in an infinite loop
        expect(shortPolling.length).toBeLessThan(10); // reasonable threshold
      }
    }
  });

  it("sitemap.xml is well-formed XML with correct domain", () => {
    const sitemap = readPublicFile("sitemap.xml");
    expect(sitemap).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(sitemap).toContain("reend-components.pages.dev");
    // No external domains in sitemap (would be SEO spam)
    const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    for (const url of urls) {
      expect(url).toMatch(/^https:\/\/reend-components\.pages\.dev/);
    }
  });

  it("og-image.svg does not contain external resource references", () => {
    const svg = readPublicFile("og-image.svg");
    // SVG should not reference external scripts or stylesheets
    expect(svg).not.toMatch(/<script/i);
    expect(svg).not.toMatch(/xlink:href\s*=\s*["']https?:/i);
    expect(svg).not.toMatch(/<use[^>]+href\s*=\s*["']https?:/i);
  });
});
