# C18 — Asset research decision brief template

Owner: Shams. State: blank planning template; no completed research or measured test is supplied.

Produce field-level asset changes from immutable observations, with explicit collection completeness and ordering, so consumers can distinguish a real removal from failed collection.

## Questions
- Which package/service/OS changes are comparable across collector versions and incomplete snapshots?
- How should duplicates, late arrivals, time skew and missing fields affect a delta?
- Which inventory events can D13 consume without mistaking a failed collection for an uninstall?

## Comparison
Define a delta contract linking two immutable snapshot IDs, asset identity and comparison revision.

## Cases
- A partial/failed package listing must not imply all prior packages were removed. — planned / not run
- Reorder and duplicate snapshots; preserve stable event identity and explain chronology conflicts. — planned / not run
- Verify that raw evidence stays unchanged and D13 can consume the delta fixture without a new scheduler. — planned / not run

## Evidence method
For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

## Decision
Selected/rejected options, input revisions, measured/not-run results and limitations: pending.

## Review
Mahrous reviews the D13 event boundary; Omar reviews existing event/persistence compatibility.

Review findings/disposition: pending.

Post-first-slice: complete C17, C05 first; draft research/fixtures earlier without claiming measured completion.

## Official starting references
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.
