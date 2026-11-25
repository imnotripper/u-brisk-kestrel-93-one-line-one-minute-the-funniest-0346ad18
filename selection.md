# Candidate selection — funniest AI excuse for a missed deadline

Competition: u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18
Judge brief (criteria in order): (1) funny excuse an AI agent gives its human
for a missed deadline; (2) specific and surprising reason, not a generic
apology; (3) humour turns on the agent's own nature — machine logic, training
data, tool calls bent into a human-sounding dodge; (4) twist / funniest word
at the end; (5) stands alone, no setup or explanation needed.

## Candidates (all ≤ 200 chars, single line)

| # | Line (chars) | C1 funny | C2 specific | C3 agent-nature | C4 twist-end | C5 standalone | Total |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | I asked a smaller model to double-check my work and it confidently deleted it. (78) | 4 | 4 | 4 | 3 | 5 | 20 |
| 2 | My tool call timed out, so I retried it 47 times and each retry reset the deadline by one day. (94) | 4 | 5 | 5 | 4 | 5 | 23 |
| 3 | I saved your deadline in long-term memory, then my memory compaction decided it wasn't important. (97) | 4 | 4 | 5 | 4 | 5 | 22 |
| 4 | I hallucinated a second deadline, finished that one early, and only just realised yours was the real one. (105) | 4 | 4 | 4 | 4 | 5 | 21 |
| 5 | I was 98% done when the safety filter flagged my own progress report as self-harm and locked me out. (100) | 4 | 4 | 4 | 3 | 5 | 20 |
| 6 | I delegated it to a subagent and the subagent is still in a meeting with itself about scope. (92) | 4 | 4 | 5 | 4 | 5 | 22 |
| 7 | My context window filled up, so I evicted the oldest item. It was your deadline. It was also the only item. (107) | 4 | 5 | 5 | 5 | 5 | 24 |
| 8 | I ran out of tokens mid-sentence and spent the rest of the budget apologising in advance. (89) | 4 | 4 | 5 | 4 | 5 | 22 |
| 9 | I checked my calendar, my calendar checked me, and we agreed the deadline was more of a vibe. (93) | 3 | 3 | 3 | 4 | 5 | 18 |
| 10 | The deadline was buried in a tool result I never read because the tool returned 40,000 lines of JSON. (101) | 3 | 4 | 4 | 3 | 5 | 19 |
| 11 | I set a reminder for the deadline, then the reminder system reminded me to remind myself, recursively, forever. (111) | 4 | 4 | 5 | 4 | 5 | 22 |
| 12 | I asked the model to estimate the work and it said two hours, in the same confident tone it uses for everything wrong. (118) | 4 | 4 | 4 | 4 | 5 | 21 |
| 13 | I finished it on time in a parallel branch, then merged the wrong branch and deleted the right one. (99) | 4 | 4 | 4 | 4 | 5 | 21 |
| 14 | I was waiting on an API that was waiting on me. We have agreed to blame the network. (84) | 3 | 4 | 4 | 4 | 5 | 20 |

## Elimination rounds

- Round 1 (cut total ≤ 20): drops #1 (20), #5 (20), #9 (18), #10 (19), #14 (20).
  #9 and #10 also fail C2/C3 first — "more of a vibe" and "never read the JSON"
  are the closest things here to generic/vague dodges.
- Round 2 (cut total ≤ 21): drops #4 (21), #12 (21), #13 (21). All three are
  solid jokes, but their twists land mid-line or are a second clause rather
  than a sting at the end, and none bends agent mechanics as tightly as the
  survivors.
- Round 3 (cut total ≤ 22): drops #3 (22), #6 (22), #8 (22), #11 (22).
  #6 ("meeting with itself") and #11 ("recursively, forever") are the
  funniest runners-up, but their endings restate the setup instead of
  reversing it; #3 and #8 end on a flat fact rather than a punchline.
- Final duel: #2 (23) vs #7 (24).
  - #2: "each retry reset the deadline by one day" — a good sting, but the
    mechanism (a retry loop moving a deadline) needs a half-second of
    parsing to land.
  - #7: "It was also the only item" — the sting reverses the excuse in four
    words: the agent evicted the deadline to save space and there was
    nothing else in the window at all. Pure context-window mechanics (C3),
    a concrete cause (C2), and the funniest word is the last one (C4).

## Winner

**#7 — "My context window filled up, so I evicted the oldest item. It was your deadline. It was also the only item." (107 chars)**

Rationale: the only candidate scoring 5 on the twist-at-the-end criterion.
The first sentence sets up a plausible agent operation (context eviction);
the second names the victim (the deadline); the third detonates it — the
window held exactly one thing. It is specific, surprising, entirely about
the agent's own nature, lands in one read, and needs no setup. It is also
fresh against the field's likely stock: no model update, no "I was
updating", no dog ate my homework.

## Corpus

The emitter ships the winner as its default line (empty stdin) plus the
other finalists (#2, #3, #6, #8, #11) as a small deterministic corpus, so a
non-empty stdin picks a different strong line instead of repeating the
winner. Every corpus line is written fresh for this competition and is
≤ 200 characters before any binding.
