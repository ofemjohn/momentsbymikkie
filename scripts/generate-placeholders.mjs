// Dev utility: regenerates the warm-toned placeholder SVGs used across the
// site until Mikkie's real photography/film assets are supplied.
// Run with: node scripts/generate-placeholders.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const publicDir = join(root, "..", "public");

const palette = ["#11110F", "#191917", "#887668", "#A99D8D"];

function placeholderSvg({ width, height, label, sub }) {
  const id = `g-${Math.random().toString(36).slice(2, 8)}`;
  const c1 = palette[0];
  const c2 = palette[(label.length + width) % palette.length];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}" />
      <stop offset="100%" stop-color="${c2}" />
    </linearGradient>
    <pattern id="${id}-lines" width="28" height="28" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="28" stroke="#F4F0E9" stroke-opacity="0.05" stroke-width="1" />
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#${id})" />
  <rect width="${width}" height="${height}" fill="url(#${id}-lines)" />
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" fill="none" stroke="#F4F0E9" stroke-opacity="0.14" />
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Manrope, Arial, sans-serif" font-size="${Math.max(14, Math.round(width * 0.028))}" letter-spacing="${Math.round(width * 0.004)}" fill="#FAF8F4" fill-opacity="0.82" font-weight="600">${label.toUpperCase()}</text>
  <text x="50%" y="${height / 2 + Math.round(width * 0.045)}" text-anchor="middle" dominant-baseline="middle" font-family="Manrope, Arial, sans-serif" font-size="${Math.max(10, Math.round(width * 0.016))}" letter-spacing="${Math.round(width * 0.003)}" fill="#FAF8F4" fill-opacity="0.5">${sub}</text>
</svg>`;
}

function write(relativePath, opts) {
  const full = join(publicDir, relativePath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, placeholderSvg(opts));
  console.log("wrote", relativePath);
}

// Hero
write("images/hero/hero.svg", { width: 1920, height: 1281, label: "Hero Photograph", sub: "PLACEHOLDER — REPLACE WITH REAL PHOTOGRAPHY" });

// About
write("images/about/mikkie.svg", { width: 1200, height: 1500, label: "Mikkie", sub: "PLACEHOLDER — REPLACE WITH REAL PORTRAIT" });

// Featured categories (landscape)
const featured = [
  ["weddings", "Weddings"],
  ["portraits", "Portraits"],
  ["events", "Events"],
  ["brands", "Brands"],
  ["lifestyle", "Lifestyle"],
];
for (const [file, label] of featured) {
  write(`images/featured/${file}.svg`, { width: 900, height: 1125, label, sub: "PLACEHOLDER" });
}

// Portfolio grid — varied orientations to match data/portfolio.ts dimensions
const portfolio = [
  ["portfolio-01", 1200, 1500, "Weddings"],
  ["portfolio-02", 1500, 1200, "Weddings"],
  ["portfolio-03", 1200, 1500, "Portraits"],
  ["portfolio-04", 1500, 1000, "Events"],
  ["portfolio-05", 1600, 1067, "Weddings"],
  ["portfolio-06", 1200, 1200, "Weddings"],
  ["portfolio-07", 1200, 1500, "Portraits"],
  ["portfolio-08", 1600, 1067, "Brands"],
  ["portfolio-09", 1200, 1500, "Lifestyle"],
  ["portfolio-10", 1500, 1000, "Events"],
];
for (const [file, width, height, label] of portfolio) {
  write(`images/portfolio/${file}.svg`, { width, height, label, sub: "PLACEHOLDER" });
}

// Film thumbnails (16:9)
for (const file of ["film-01", "film-02", "film-03"]) {
  write(`images/films/${file}.svg`, { width: 1600, height: 900, label: "Film Still", sub: "PLACEHOLDER — REPLACE WITH REAL FRAME" });
}

console.log("Done.");
