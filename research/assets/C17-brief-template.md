# C17 — Asset research decision brief template

Owner: Shams. State: blank planning template; no completed research or measured test is supplied.

Implement a deterministic resolver for enrolled host identities across observation sources, IP reuse and rebuilds. Preserve ambiguous identities as separate candidates with reviewable reasons.

## Questions
- Which identity signals survive IP changes, re-enrollment and host cloning, and which conflicts must block an automatic association?
- How can a resolution be reproduced from immutable observations and a rule revision without deleting earlier identities?
- What evidence would reverse an incorrect association, and how will the consumer see that correction?

## Comparison
Compare with a simple IP-only baseline and report false merges, false splits and unresolved cases.

## Cases
- Replay IP reuse, cloned identity and re-enrollment cases; two distinct hosts must not silently merge. — planned / not run
- Replay the same inputs/rule revision and obtain the same decision and evidence references. — planned / not run
- Correct a false association without deleting the old observation or borrowing another tenant’s identity. — planned / not run

## Evidence method
For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

## Decision
Selected/rejected options, input revisions, measured/not-run results and limitations: pending.

## Review
Mahrous reviews identity ambiguity and product-matching separation; Omar checks persistence/auth compatibility.

Review findings/disposition: pending.

Post-first-slice: complete C03, C05, P02 first; draft research/fixtures earlier without claiming measured completion.

## Official starting references
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.
