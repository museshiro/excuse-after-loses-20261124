import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const LINE =
  "Boss, I lost reproducibly. " +
  "Run it again and you will get the same disappointment.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error("line must be a single non-empty line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");

const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE + "\n") {
  throw new Error("read-back mismatch");
}
