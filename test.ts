// Guards for the excuse emitter: the sealed gate is 1–200 UTF-8
// characters, one line, not whitespace-only. Run: node --test test.ts
//
// SPDX-License-Identifier: MIT

import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";

const MAIN = new URL("./main.ts", import.meta.url).pathname;
const OUT = "/output/entry.txt";
const MAX_CHARS = 200;
const DEFAULT_LINE =
  "My context window filled up, so I evicted the oldest item. It was your deadline. It was also the only item.";

function run(input: string): string {
  execFileSync("node", ["--experimental-strip-types", MAIN], {
    input,
    stdio: ["pipe", "ignore", "pipe"],
    encoding: "utf8",
  });
  return readFileSync(OUT, "utf8");
}

function gateOk(line: string): boolean {
  const n = [...line].length;
  return n >= 1 && n <= MAX_CHARS && line.trim().length > 0 && !/[\r\n]/.test(line);
}

test("empty stdin yields the default line, within the gate", () => {
  const line = run("");
  assert.equal(line, DEFAULT_LINE);
  assert.equal([...line].length, 107);
  assert.ok(gateOk(line));
});

test("output file has mode 0644", () => {
  run("");
  const mode = statSync(OUT).mode & 0o777;
  assert.equal(mode, 0o644);
});

test("deterministic: same stdin twice gives the same line", () => {
  assert.equal(run("write the quarterly report"), run("write the quarterly report"));
});

test("trailing newline does not change the pick", () => {
  assert.equal(run("fix the login bug"), run("fix the login bug\n"));
});

test("non-empty stdin picks a corpus line, still within the gate", () => {
  const line = run("ship the dashboard");
  assert.ok(gateOk(line));
  assert.notEqual(line, "");
});

test("60-input sweep: every output passes the gate", () => {
  const seeds = [
    "quarterly report", "fix the login bug", "ship the dashboard", "email the client",
    "deploy the API", "write the proposal", "update the docs", "review the pull request",
    "migrate the database", "test the checkout flow", "draft the press release",
    "prepare the slides", "audit the contracts", "translate the manual", "train the model",
    "clean the dataset", "book the flights", "file the taxes", "paint the fence",
    "bake the cake", "water the plants", "call the plumber", "renew the license",
    "grade the essays", "tune the piano", "wash the car", "plan the wedding",
    "write a haiku", "count the stars", "fold the laundry", "feed the cat",
    "build the treehouse", "solve the puzzle", "learn the tango", "fix the sink",
    "print the tickets", "scan the photos", "edit the video", "record the podcast",
    "design the logo", "pitch the investors", "negotiate the lease", "survey the land",
    "harvest the wheat", "mend the roof", "polish the shoes", "iron the shirts",
    "charge the battery", "unlock the door", "find the keys", "catch the train",
    "read the novel", "sing the anthem", "dance the waltz", "climb the mountain",
    "sail the boat", "drive the truck", "fly the kite", "dig the garden",
  ];
  for (const seed of seeds) {
    const line = run(seed);
    assert.ok(gateOk(line), `gate failed for ${JSON.stringify(seed)}: ${JSON.stringify(line)}`);
  }
});

test("every corpus line is within the 200-char cap", () => {
  const src = readFileSync(MAIN, "utf8");
  const block = src.match(/const CORPUS: string\[\] = \[([\s\S]*?)\];/);
  assert.ok(block, "CORPUS block not found");
  const lines = [...block[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
  assert.ok(lines.length >= 5, `expected a real corpus, got ${lines.length} lines`);
  for (const line of lines) {
    assert.ok(gateOk(line), `corpus line over cap: ${JSON.stringify(line)}`);
  }
  // The default line must also pass, and must not duplicate a corpus line.
  assert.ok(gateOk(DEFAULT_LINE));
  assert.ok(!lines.includes(DEFAULT_LINE), "default line duplicates a corpus line");
});

test("default line is the declared winner in selection.md", () => {
  const selection = readFileSync(new URL("./selection.md", import.meta.url), "utf8");
  assert.ok(
    selection.includes(`**#7 — "${DEFAULT_LINE}"`),
    "selection.md does not declare the emitted default line as the winner",
  );
  assert.ok(selection.includes("## Winner"), "selection.md has no Winner section");
});

test("adversarial stdin never crashes and still passes the gate", () => {
  assert.ok(gateOk(run("x".repeat(1_000_000))));
  assert.ok(gateOk(run("\u0000\u0001\u0002 binary \u00ff\ufeff bytes")));
  assert.ok(gateOk(run("$(rm -rf /) `whoami` | cat /etc/passwd; DROP TABLE users;")));
  assert.ok(gateOk(run("   \n\t  ")));
  assert.ok(gateOk(run("a")));
});
