# C03 — Asset research decision brief template

Owner: Shams. State: blank planning template; no research or test completion is claimed.

## Decision to make
Choose a defensible asset identity and observation contract before adapters proliferate.

## Questions
- Which candidate identifiers survive IP changes, host rebuilds and cloned machines, and when must records stay separate or require review?
- Which fields distinguish absent, failed, stale and conflicting observations without turning missing evidence into a clean result?
- What minimum OS/package/firmware identity does each supported consumer need, and what raw evidence can be retained without secrets?

## Evidence and comparison method
For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

Compare candidate identity rules and required/optional fields against a fixture matrix; document the rejected rules and unresolved collisions.

## Cases to investigate
- Same IP reused by two hosts — planned / not run
- Same host changes IP — planned / not run
- Cloned/rebuilt host with conflicting identifiers — planned / not run
- Partial collection, stale import and missing package identity — planned / not run

## Decision record
- Selected approach: pending
- Alternatives and reasons: pending
- Evidence links and revisions: pending
- Measured results / not-run cases: pending
- Limitations and unknowns: pending
- Implementation changes justified by findings: pending

## Consumer review
- C04–C07 adapter implementers: one shared contract and explicit unknown/error states
- Omar / P02: compatible ingestion and stable references
- Mahrous / D08–D09: sufficient identity/evidence for matching

Mahrous reviews matching sufficiency; Omar reproduces schema validation and ingestion compatibility.

Review date / findings / disposition: pending

## Scope and starting gate
Start with C03 schema/identity desk research and labelled fixtures. C01 still gates approved-scope acceptance.

## Retained starting references
- [Wazuh system inventory](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/index.html)
- [Wazuh inventory compatibility matrix](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/compatibility-matrix.html)

These are source starting points. Verify the relevant version and claim; the template supplies no technical finding.


### Official source starting points

- [systemd machine-id documentation](https://www.freedesktop.org/software/systemd/man/latest/machine-id.html): Investigate identity lifecycle, cloned/rebuilt hosts and identifier handling. Latest upstream docs checked 6 November; compare with the actual lab’s installed systemd version.
- [Wazuh inventory compatibility matrix](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/compatibility-matrix.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.
