# Shams — Asset research workplan

Owner: Shams. Updated: 6 November 2026. These are assigned research requirements and blank templates, not completed research.

## What makes this valuable
For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

Start with C03, then C05. Use findings to change a contract, adapter choice, error state or verification decision. Supporting another owner is not a substitute for delivering these research artifacts. Amr retains all vulnerability/advisory data collectors and execution/recovery responsibilities.

## C03 — Define Asset Observation Fields & Validate Stable Identity

Choose a defensible asset identity and observation contract before adapters proliferate.

Start with C03 schema/identity desk research and labelled fixtures. C01 still gates approved-scope acceptance.

Questions:
- Which candidate identifiers survive IP changes, host rebuilds and cloned machines, and when must records stay separate or require review?
- Which fields distinguish absent, failed, stale and conflicting observations without turning missing evidence into a clean result?
- What minimum OS/package/firmware identity does each supported consumer need, and what raw evidence can be retained without secrets?

Comparison:
Compare candidate identity rules and required/optional fields against a fixture matrix; document the rejected rules and unresolved collisions.

Failure/edge cases:
- Same IP reused by two hosts
- Same host changes IP
- Cloned/rebuilt host with conflicting identifiers
- Partial collection, stale import and missing package identity

Outputs:
- `docs/research/assets/c03-decision-brief.md`
- `docs/research/assets/c03-evidence-matrix.csv`

Who uses the finding:
- C04–C07 adapter implementers: one shared contract and explicit unknown/error states
- Omar / P02: compatible ingestion and stable references
- Mahrous / D08–D09: sufficient identity/evidence for matching

Review: Mahrous reviews matching sufficiency; Omar reproduces schema validation and ingestion compatibility.

[Blank decision brief](research/assets/C03-brief-template.md) · [Blank evidence matrix](research/assets/C03-evidence-template.csv)

## C04 — Implement Bounded Network Discovery & Parse Structured Results

Select bounded discovery profiles using measured coverage, disruption limits and explicit evidence limitations.

Desk research and saved fixtures can start now; live comparisons require C01/C02/C03 and explicit authorized targets.

Questions:
- Which probe choices and exclusions are justified for each approved lab device class, including fragile or unsupported devices?
- How do candidate bounded profiles compare on observed targets, traffic, duration, timeouts and identification uncertainty?
- Which discovery results can propose an asset and which require authenticated/offline confirmation before asserting its OS or package identity?

Comparison:
Compare saved-result parsing and approved lab profiles under the same declared target set; record coverage and failure counts separately. Never test unapproved targets.

Failure/edge cases:
- Out-of-scope target rejected before contact
- Fragile-device exclusion
- Timeout/cancel with partial results
- Conflicting banner and authenticated identity

Outputs:
- `docs/research/assets/c04-decision-brief.md`
- `docs/research/assets/c04-evidence-matrix.csv`

Who uses the finding:
- C05/C07: which assets require authenticated collection or offline evidence
- Mahrous / D08: uncertainty flags rather than banner-derived certainty
- Amr / C02 and Mahrous / C01: evidence that discovery respects the approved lab and safety boundary

Review: Mahrous reviews scope/safety and evidence limits; Amr verifies the approved lab conditions.

[Blank decision brief](research/assets/C04-brief-template.md) · [Blank evidence matrix](research/assets/C04-evidence-template.csv)

## C05 — Collect Ubuntu OS and Package Evidence Through Authenticated SSH

Choose and implement the smallest trustworthy Ubuntu inventory collection method.

After the C03 first pass, prepare collector fixtures. Real collection requires C02/C03 and the approved scope; Shams does not build Amr’s advisory collectors.

Questions:
- Which native evidence distinguishes distro/build, architecture, binary/source package identity and installed versus running state for the chosen lab profile?
- What is the least permission needed for each field, and what should the adapter report when a field is denied or unavailable?
- How do candidate read-only collection approaches compare with a preserved native export on field coverage, discrepancies, duration and failure behavior?

Comparison:
Use the same authorized Ubuntu snapshot for each available candidate; compare against a preserved native export, record disagreements, and select a method with stated limitations.

Failure/edge cases:
- Denied field or invalid credentials
- Host-key mismatch
- Partial output and command failure
- Missing source-package identity
- Stale observation and installed/running discrepancy

Outputs:
- `docs/research/assets/c05-decision-brief.md`
- `docs/research/assets/c05-evidence-matrix.csv`

Who uses the finding:
- Mahrous / C08/D09: reproducible asset facts with provenance and missing-field masks
- C13: independent before/after observations with stable asset identity
- Hams / A02: measured asset inputs only; no invented business context

Review: Mahrous reviews matching-input sufficiency; Amr confirms lab access and execution separation; Omar checks ingestion.

[Blank decision brief](research/assets/C05-brief-template.md) · [Blank evidence matrix](research/assets/C05-evidence-template.csv)

## C06 — Compare Windows Inventory Options & Implement One Adapter

Qualify one Windows inventory approach only if the deferred extension is approved.

Deferred extension: keep to an initial evidence-gap/feasibility note until the scope gate and target access are agreed. Do not let this delay C03/C05.

Questions:
- For the exact Windows target, which candidate exposes the required OS/build/package/update fields, and what remains unavailable?
- What enrollment, privileges, transport, maintenance and redistribution constraints would each available candidate introduce?
- On the same authorized target, how do candidates differ in measured field completeness, collection time, CPU/RAM and explicit failures?

Comparison:
Create a decision table for the existing Wazuh/osquery/native options; mark unavailable measurements as not run. Implement one justified option, rather than several competing adapters.

Failure/edge cases:
- Missing build/update field
- Insufficient permission or failed transport
- Duplicate or changed host identity
- Missing or conflicting inventory entry

Outputs:
- `docs/research/assets/c06-decision-brief.md`
- `docs/research/assets/c06-evidence-matrix.csv`

Who uses the finding:
- Omar / P02: mapped Windows observation contract
- Mahrous / D08/D09: declared identity and applicability gaps
- Team scope review: evidence to enable, defer or reject the extension

Review: Omar reviews integration/operating burden; Mahrous reviews matching coverage; Amr supplies only agreed lab/access help.

[Blank decision brief](research/assets/C06-brief-template.md) · [Blank evidence matrix](research/assets/C06-evidence-template.csv)

## C07 — Import Offline and Appliance Evidence With Freshness Labels

Define a trustworthy offline/appliance evidence import without pretending that a stale export is a live observation.

Conditional capability: establish the required evidence checklist first; full appliance research/import qualification requires the existing scope and access gates.

Questions:
- Which exact model, firmware train, hardware revision, original capture time and source artifact are necessary for the selected appliance identity?
- Which available authorized export/manual-entry paths preserve those fields and integrity, and which ambiguities must remain unknown?
- How should importer validation handle stale, incomplete, malformed, oversized or conflicting evidence while retaining the original timestamp and operator/source provenance?

Comparison:
Compare the permitted evidence paths for the selected appliance using sanitized fixtures. Separate importer behavior evidence from vendor vulnerability/advisory content, which Amr owns.

Failure/edge cases:
- Old snapshot imported today
- Missing model/train/revision
- Conflicting exports for one device
- Malformed/oversized input
- Sensitive fields requiring redaction

Outputs:
- `docs/research/assets/c07-decision-brief.md`
- `docs/research/assets/c07-evidence-matrix.csv`

Who uses the finding:
- Mahrous / D08/D09: trustworthy appliance identity with explicit unresolved gaps
- Omar / P07/P08: import/ingestion errors and provenance
- Amr: asset identity handoff for his existing vendor-advisory work

Review: Mahrous reviews matching gaps; Omar reviews import validation and evidence handling; Amr reviews the vendor-input boundary.

[Blank decision brief](research/assets/C07-brief-template.md) · [Blank evidence matrix](research/assets/C07-evidence-template.csv)

## C13 — Verify Remediation Independently & Rehearse Recovery

Choose independent asset and health checks that can challenge a successful patch-executor result.

Draft the check-selection matrix and failure fixtures now. Measured verification waits for C08/C11/C12; do not duplicate Amr’s execution or recovery runner.

Questions:
- Which fresh installed/running-state and health checks distinguish a successful update, a broken service, incomplete restart and insufficient evidence?
- How can verification collect evidence independently from the executor success flag and link it to the same asset without rewriting earlier observations?
- After Amr executes the authorized recovery fixture, which observations support closure, continuing uncertainty or a reopened/linked finding episode?

Comparison:
Predeclare expected outcomes, then compare executor-only success with independent fresh asset and service evidence on the same approved fixtures; disclose every disagreement and unresolved case.

Failure/edge cases:
- Exit code zero but failed health check
- Updated package with stale/running state
- Missing or stale post-observation
- Recovery restores an old vulnerable version
- Identity mismatch between pre/post snapshots

Outputs:
- `docs/research/assets/c13-decision-brief.md`
- `docs/research/assets/c13-evidence-matrix.csv`

Who uses the finding:
- Mahrous: justified reassessment, closure and recurrence decisions
- Amr / C11/C12/C14: verification failures and evidence from his execution/recovery operations
- C16: independently reproducible verification evidence and honest limitations

Review: Mahrous signs off matching/closure expectations; Amr performs and documents authorized patch/recovery operations. Shams owns independent collection and verification code/results.

[Blank decision brief](research/assets/C13-brief-template.md) · [Blank evidence matrix](research/assets/C13-evidence-template.csv)


## Source shortlist by asset decision

### C03


### Official source starting points

- [systemd machine-id documentation](https://www.freedesktop.org/software/systemd/man/latest/machine-id.html): Investigate identity lifecycle, cloned/rebuilt hosts and identifier handling. Latest upstream docs checked 6 November; compare with the actual lab’s installed systemd version.
- [Wazuh inventory compatibility matrix](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/compatibility-matrix.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.

### C04


### Official source starting points

- [Nmap host discovery controls](https://nmap.org/book/host-discovery-controls.html): Compare discovery controls and uncertainty within the approved lab. Official source checked 6 November; qualification must match the installed tool and selected profile.
- [Nmap service/version detection](https://nmap.org/book/man-version-detection.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.

### C05


### Official source starting points

- [Ubuntu 22.04 dpkg-query manual](https://manpages.ubuntu.com/manpages/jammy/man1/dpkg-query.1.html): Investigate explicit inventory output fields and binary/source package identity; build a read-only collection fixture. Pinned Jammy manual checked 6 November; verify the actual target and tool version.
- [Wazuh system inventory](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/index.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.

### C06


### Official source starting points

- [Microsoft Win32_QuickFixEngineering reference](https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-quickfixengineering): Investigate documented update-inventory coverage limits before choosing a Windows collection method. Official source checked 6 November; this alone is not a complete inventory or vulnerability verdict.
- [osquery documentation](https://osquery.readthedocs.io/en/stable/): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.
- [Wazuh inventory compatibility matrix](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/compatibility-matrix.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.

### C07


### Official source starting points

- [Fortinet FortiOS 7.4 CLI troubleshooting reference](https://docs.fortinet.com/document/fortigate/7.4.0/cli-troubleshooting-cheat-sheet/420966): Locate vendor-documented system-identity evidence; identify the fields still missing from an authorized export. Versioned official search reference verified 6 November; use the manual matching the actual model/firmware.
- [NIST SP 800-82 Rev 3](https://csrc.nist.gov/pubs/sp/800/82/r3/final): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.

### C13


### Official source starting points

- [NIST SP 800-40 Rev 4](https://csrc.nist.gov/pubs/sp/800/40/r4/final): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.
- [Ubuntu 22.04 dpkg-query manual](https://manpages.ubuntu.com/manpages/jammy/man1/dpkg-query.1.html): Investigate explicit inventory output fields and binary/source package identity; build a read-only collection fixture. Pinned Jammy manual checked 6 November; verify the actual target and tool version.
