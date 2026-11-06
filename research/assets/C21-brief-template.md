# C21 — Asset research decision brief template

Owner: Shams. State: blank planning template; no completed research or measured test is supplied.

Build asset-domain campaign planning for bounded batches, per-target limits, backoff and resumable progress while delegating durable dispatch and authentication to the existing platform.

## Questions
- Which batch/concurrency/time/traffic limits protect the chosen authorized lab/device classes?
- How can incremental collection avoid repeatedly reading unchanged fields while respecting fresh-evidence needs?
- How will offline assets, partial results, duplicate intents, retries and exhausted budgets appear without false success?

## Comparison
Report campaign throughput, fairness, collected bytes/probe counts and failures separately; state the largest measured scope.

## Cases
- Crash/replay intent preparation and verify no duplicate semantic collection intent. — planned / not run
- Enforce per-target/global limits and stop dispatch intent generation when cancelled or out of budget. — planned / not run
- Unavailable assets retain failed/unknown states and cannot appear freshly collected. — planned / not run

## Evidence method
For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

## Decision
Selected/rejected options, input revisions, measured/not-run results and limitations: pending.

## Review
Omar checks ledger/envelope reuse; Amr reviews authorized lab load assumptions without taking collection ownership.

Review findings/disposition: pending.

Post-first-slice: complete C20, P07, P08, C04 first; draft research/fixtures earlier without claiming measured completion.

## Official starting references
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.
