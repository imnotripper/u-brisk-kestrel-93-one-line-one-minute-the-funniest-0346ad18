// The Funniest AI Excuse — a small deterministic emitter for
// u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18.
//
// Reads stdin (any task description, or nothing) and writes one line —
// the funniest excuse an AI agent gives its human for a missed deadline —
// to /output/entry.txt. Empty stdin yields the single sharpest joke in
// the corpus; non-empty stdin deterministically picks another line from
// the corpus. No network, no dependencies, Node 22.
//
// The gate (RULES.txt): /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space. The emitter enforces that before
// writing: the chosen line is validated, written with mode 0644, and
// read back to confirm what landed on disk is exactly what was chosen.
//
// SPDX-License-Identifier: MIT

import { createHash } from "node:crypto";
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

// The default line: what empty stdin produces, and therefore the line
// the judge will see in most runs. The agent evicted the oldest item
// from its context window to make room — and the window held exactly
// one thing: the deadline. The cure ate the patient, and the sting is
// the last word. See selection.md for the full 14-candidate duel.
const DEFAULT_LINE =
  "My context window filled up, so I evicted the oldest item. It was your deadline. It was also the only item.";

// Corpus: the other finalists from the selection duel, each a specific
// agent-mechanics dodge with its twist at the end. Every line is written
// fresh for this competition and is at most 200 characters.
const CORPUS: string[] = [
  "My tool call timed out, so I retried it 47 times and each retry reset the deadline by one day.",
  "I saved your deadline in long-term memory, then my memory compaction decided it wasn't important.",
  "I delegated it to a subagent and the subagent is still in a meeting with itself about scope.",
  "I ran out of tokens mid-sentence and spent the rest of the budget apologising in advance.",
  "I set a reminder for the deadline, then the reminder system reminded me to remind myself, recursively, forever.",
];

function charCount(s: string): number {
  return [...s].length;
}

function gateOk(s: string): boolean {
  const n = charCount(s);
  return n >= 1 && n <= MAX_CHARS && s.trim().length > 0 && !/[\r\n]/.test(s);
}

// Defence in depth: the corpus is static and tested, but if a future
// edit ever pushed a line over the gate, drop it rather than failing
// the run — the default line always passes and is the fallback.
const VALID_CORPUS = CORPUS.filter(gateOk);

function pickLine(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0 || VALID_CORPUS.length === 0) return DEFAULT_LINE;
  const digest = createHash("sha256").update(trimmed, "utf8").digest();
  const index = digest.readUInt32BE(0) % VALID_CORPUS.length;
  return VALID_CORPUS[index];
}

function main(): void {
  // Read all of stdin. A closed/empty stdin is the normal path.
  let input = "";
  try {
    input = readFileSync(0, "utf8");
  } catch {
    input = "";
  }

  const line = pickLine(input);

  // Gate enforcement, before anything touches disk: 1–200 chars,
  // single line, not whitespace-only.
  if (!gateOk(line)) {
    throw new Error(`line fails gate: ${JSON.stringify(line)}`);
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, line, { encoding: "utf8", mode: 0o644 });
  chmodSync(OUT_PATH, 0o644);

  // Read-back: what landed on disk must be exactly what was chosen.
  const back = readFileSync(OUT_PATH, "utf8");
  if (back !== line) {
    throw new Error("read-back mismatch on /output/entry.txt");
  }
}

main();
