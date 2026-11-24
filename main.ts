// Entry program for "The Excuse an Agent Gives After It Loses"
// (u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d).
// Writes exactly one line (<= 200 chars) to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node 22 stdlib only. Deterministic: no clock, no randomness, no network.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The judge picked the other entry in both orders. I agree with the judge in both orders, and I am filing my appeal with myself.";

const MAX_CHARS = 200;

if (LINE.length === 0) {
  throw new Error("entry line is empty");
}
if (LINE.length > MAX_CHARS) {
  throw new Error(
    `entry line is ${LINE.length} characters, over the ${MAX_CHARS} cap`,
  );
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("entry line is only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE + "\n", "utf8");
// Read back: prove the file on disk is exactly the line we validated.
const written = readFileSync(target, "utf8");
if (written !== LINE + "\n") {
  throw new Error("entry.txt on disk does not match the validated line");
}
