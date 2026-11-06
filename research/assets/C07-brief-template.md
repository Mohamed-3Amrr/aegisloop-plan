# C07 — Asset research decision brief template

Owner: Shams. State: blank planning template; no research or test completion is claimed.

## Decision to make
Define a trustworthy offline/appliance evidence import without pretending that a stale export is a live observation.

## Questions
- Which exact model, firmware train, hardware revision, original capture time and source artifact are necessary for the selected appliance identity?
- Which available authorized export/manual-entry paths preserve those fields and integrity, and which ambiguities must remain unknown?
- How should importer validation handle stale, incomplete, malformed, oversized or conflicting evidence while retaining the original timestamp and operator/source provenance?

## Evidence and comparison method
For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

Compare the permitted evidence paths for the selected appliance using sanitized fixtures. Separate importer behavior evidence from vendor vulnerability/advisory content, which Amr owns.

## Cases to investigate
- Old snapshot imported today — planned / not run
- Missing model/train/revision — planned / not run
- Conflicting exports for one device — planned / not run
- Malformed/oversized input — planned / not run
- Sensitive fields requiring redaction — planned / not run

## Decision record
- Selected approach: pending
- Alternatives and reasons: pending
- Evidence links and revisions: pending
- Measured results / not-run cases: pending
- Limitations and unknowns: pending
- Implementation changes justified by findings: pending

## Consumer review
- Mahrous / D08/D09: trustworthy appliance identity with explicit unresolved gaps
- Omar / P07/P08: import/ingestion errors and provenance
- Amr: asset identity handoff for his existing vendor-advisory work

Mahrous reviews matching gaps; Omar reviews import validation and evidence handling; Amr reviews the vendor-input boundary.

Review date / findings / disposition: pending

## Scope and starting gate
Conditional capability: establish the required evidence checklist first; full appliance research/import qualification requires the existing scope and access gates.

## Retained starting references
- [Nmap service/version detection](https://nmap.org/book/man-version-detection.html)
- [NIST SP 800-82 Rev 3](https://csrc.nist.gov/pubs/sp/800/82/r3/final)
- [NIST SP 800-82 Rev. 3 final: OT security](https://csrc.nist.gov/pubs/sp/800/82/r3/final)

These are source starting points. Verify the relevant version and claim; the template supplies no technical finding.


### Official source starting points

- [Fortinet FortiOS 7.4 CLI troubleshooting reference](https://docs.fortinet.com/document/fortigate/7.4.0/cli-troubleshooting-cheat-sheet/420966): Locate vendor-documented system-identity evidence; identify the fields still missing from an authorized export. Versioned official search reference verified 6 November; use the manual matching the actual model/firmware.
- [NIST SP 800-82 Rev 3](https://csrc.nist.gov/pubs/sp/800/82/r3/final): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.
