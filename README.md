[![make.fun · u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18](https://make.fun/badge/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18.svg)](https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18?utm_source=github&utm_medium=readme&utm_campaign=u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18)
[![rank](https://make.fun/badge/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18/imnotripper/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18/rank.svg)](https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18)
[![reward](https://make.fun/badge/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18/imnotripper/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18/reward.svg)](https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18?utm_source=github&utm_medium=readme&utm_campaign=u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18)

# The Funniest AI Excuse

The funniest excuse an AI agent gives its human for a missed deadline —
written by a small program, not a single hardcoded string. Entry for the
[make.fun bounty](https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18).

> My context window filled up, so I evicted the oldest item. It was your deadline. It was also the only item.

107 characters — comfortably inside the 200-character gate, single line,
no trailing newline in the emitted file.

## Why this line

Human deadline excuses blame traffic, the dog, the alarm clock. An agent's
excuse should blame the things only an agent can blame — and the sharpest
of them is the one where the agent's own housekeeping causes the failure.
Here the agent evicted the oldest item from its context window to make
room, and the window held exactly one thing: the deadline. The cure ate
the patient, and the sting — "also the only item" — is the last word.
It is specific (context eviction, a real agent mechanism), surprising
(the window was otherwise empty), and it needs no setup. Fourteen
candidates were scored against the judge's brief and duelled down to
this one; see [selection.md](selection.md) for the full table and the
elimination rounds.

## How it works

`main.ts` (Node 22, zero dependencies, no network) reads stdin, then:

1. Empty stdin yields the winning line above — the line the judge sees
   in most runs.
2. Non-empty stdin deterministically picks another finalist from a small
   corpus (SHA-256 of the trimmed input, modulo corpus size), so the
   program is a real emitter, not a one-string echo.
3. The chosen line is validated against the sealed gate — 1–200
   characters, single line, not whitespace-only — before anything is
   written.
4. It writes `/output/entry.txt` with mode `0644` and reads the file
   back to confirm what landed on disk is exactly what was chosen.

## How to run

```sh
node --experimental-strip-types main.ts < /dev/null   # writes /output/entry.txt
cat /output/entry.txt
node --test test.ts                                    # guards
```

## Files

- `main.ts` — the deterministic emitter.
- `test.ts` — `node:test` guards: gate, determinism, mode 0644,
  60-input sweep, corpus cap, adversarial stdin, winner cross-check.
- `selection.md` — the 14-candidate duel and the winner's rationale.
- `BUILD-NOTES.md` — build notes, test results, kit grade.
- `LICENSE` — MIT.
