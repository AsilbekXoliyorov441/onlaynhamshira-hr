/*
 * 3D ikonkalarni statik .svg fayllarga chiqaradi.
 *
 * Nega: bu ikonkalar HTML ichida inline SVG sifatida chizilganda sahifa
 * DOM'ining yarmidan koʻpini egallaydi (~1400 element) va React ularning
 * har birini hydrate qilishga majbur boʻladi. Alohida faylga chiqarilgach
 * ular oddiy <img> boʻladi: DOM kichrayadi, HTML yengillashadi va rasm
 * brauzer keshida qoladi.
 *
 * Manba fayllar — `*.source.tsx` (ilova ularni import qilmaydi, faqat shu
 * skript oʻqiydi). Ikonka rasmini oʻzgartirsangiz, manbani tahrirlab
 * `npm run icons:svg` ni qayta ishga tushiring.
 */
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const { transform } = require("sucrase");
const { renderToStaticMarkup } = require("react-dom/server");

/* .tsx fayllarni require orqali yuklash uchun sucrase'ni ulaymiz */
require.extensions[".tsx"] = (mod, filename) => {
  const src = readFileSync(filename, "utf8");
  const { code } = transform(src, {
    transforms: ["typescript", "jsx"],
    jsxRuntime: "automatic",
    production: true,
    filePath: filename,
  });
  mod._compile(code, filename);
};

/** manba fayl → chiqadigan fayl nomi uchun old qoʻshimcha */
const MODULES = [
  ["components/service/ServiceIcons.source.tsx", "service"],
  ["components/howitworks/HowItWorksIcons.source.tsx", "how"],
  ["components/checklist/PrepIcons.source.tsx", "prep"],
  ["components/partner/PartnerIcons.source.tsx", "partner"],
];

const kebab = (name) =>
  name
    /* "3D" qoʻshimchasi bitta boʻlak boʻlib qolsin: Vial3D -> Vial-3d */
    .replace(/(\d)D$/, "$1d")
    .replace(/([a-zA-Z])(\d)/g, "$1-$2")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();

const outDir = join(root, "public/icons");
mkdirSync(outDir, { recursive: true });

const manifest = {};
let total = 0;

for (const [rel, prefix] of MODULES) {
  const mod = require(join(root, rel));
  const entries = Object.entries(mod).filter(([, v]) => typeof v === "function");
  const names = [];

  for (const [name, Component] of entries) {
    let markup = renderToStaticMarkup(Component({}));
    if (!markup.startsWith("<svg")) {
      throw new Error(`${rel}:${name} — <svg> bilan boshlanmadi`);
    }
    /* <img> ichida koʻrsatilishi uchun xmlns majburiy */
    if (!markup.includes("xmlns=")) {
      markup = markup.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    /* viewBox'dan tabiiy oʻlcham — <img> uchun nisbatni saqlaydi */
    const vb = markup.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
    if (vb && !/<svg[^>]*\swidth=/.test(markup)) {
      markup = markup.replace("<svg", `<svg width="${vb[1]}" height="${vb[2]}"`);
    }
    const file = `${prefix}-${kebab(name)}.svg`;
    writeFileSync(join(outDir, file), markup + "\n");
    names.push({ name, file });
    total++;
  }
  manifest[rel] = names;
}

console.log(`${total} ta ikonka public/icons/ ga yozildi`);
for (const [rel, names] of Object.entries(manifest)) {
  console.log(`  ${rel}: ${names.map((n) => n.name).join(", ")}`);
}
writeFileSync(join(outDir, "_manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
