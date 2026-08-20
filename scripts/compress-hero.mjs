#!/usr/bin/env node
/**
 * Re-encode the kept source clip into `public/hero.mp4` plus `public/hero-poster.jpg`.
 * Requires: npm install (devDependency ffmpeg-static).
 *
 * Usage: npm run compress:hero
 */
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const require = createRequire(import.meta.url);

function resolveFfmpeg() {
  try {
    const fromPkg = require("ffmpeg-static");
    if (fromPkg && fs.existsSync(fromPkg)) return fromPkg;
  } catch {
    /* fall through */
  }
  const fromPath = spawnSync("which", ["ffmpeg"], { encoding: "utf8" }).stdout.trim();
  return fromPath || null;
}

const ffmpeg = resolveFfmpeg();
if (!ffmpeg) {
  console.error("ffmpeg not found. Run: npm install (needs ffmpeg-static)");
  process.exit(1);
}

const input = path.join(
  root,
  "public",
  "From Main Klickpin CF- APART | Biżuteria srebrna pozłacana - 1yR0hFE26.mp4",
);
const output = path.join(root, "public", "hero.mp4");
const tempOutput = path.join(root, "public", "hero.tmp.mp4");
const poster = path.join(root, "public", "hero-poster.jpg");

if (!fs.existsSync(input)) {
  console.error(`Source video missing:\n  ${input}`);
  process.exit(1);
}

function run(label, args) {
  console.log(`\n[compress:hero] ${label}`);
  const r = spawnSync(ffmpeg, args, { stdio: "inherit" });
  if (r.status !== 0) {
    console.error(`[compress:hero] ${label} failed`);
    process.exit(r.status ?? 1);
  }
}

run("encode mp4 (720p, no audio, faststart)", [
  "-y",
  "-hide_banner",
  "-loglevel",
  "warning",
  "-i",
  input,
  "-an",
  "-vf",
  "scale=-2:720,fps=24,format=yuv420p",
  "-c:v",
  "libx264",
  "-profile:v",
  "high",
  "-level",
  "4.0",
  "-preset",
  "medium",
  "-crf",
  "29",
  "-movflags",
  "+faststart",
  tempOutput,
]);

run("extract poster", [
  "-y",
  "-hide_banner",
  "-loglevel",
  "warning",
  "-ss",
  "0.4",
  "-i",
  tempOutput,
  "-frames:v",
  "1",
  "-update",
  "1",
  "-q:v",
  "5",
  poster,
]);

fs.renameSync(tempOutput, output);

const mp4Kb = Math.round(fs.statSync(output).size / 1024);
const posterKb = Math.round(fs.statSync(poster).size / 1024);
console.log(`\n[compress:hero] wrote ${output} (${mp4Kb} KB)`);
console.log(`[compress:hero] wrote ${poster} (${posterKb} KB)`);
