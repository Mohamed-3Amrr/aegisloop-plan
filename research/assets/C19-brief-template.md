# C19 — Asset research decision brief template

Owner: Shams. State: blank planning template; no completed research or measured test is supplied.

Implement a versioned, explainable asset-evidence policy that reports which fields are usable, stale, missing or conflicting at an explicit evaluation time.

## Questions
- Which freshness windows and mandatory fields are defensible for each supported asset/collection profile?
- How will original collection time, clock uncertainty, partial failure and conflicting observations change usability?
- How can consumers inspect the exact reasons instead of relying on an uncalibrated confidence percentage?

## Comparison
Compare simple latest-snapshot/age-only baselines against reviewed stale/partial/conflict cases.

## Cases
- Reimport old data and retain its age; evaluate identically with a fixed as_of time. — planned / not run
- Preserve unknown/conflict/time_uncertain under missing timestamps and skew. — planned / not run
- A successful collection of one field must not mark every other field fresh or complete. — planned / not run

## Evidence method
For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

## Decision
Selected/rejected options, input revisions, measured/not-run results and limitations: pending.

## Review
Mahrous checks how evidence usability is consumed by matching/verification without changing their authority.

Review findings/disposition: pending.

Post-first-slice: complete C18, C03 first; draft research/fixtures earlier without claiming measured completion.

## Official starting references
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.
