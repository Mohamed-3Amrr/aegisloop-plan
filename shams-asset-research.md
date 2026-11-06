# Shams — Current asset research workplan

Thirteen owned asset packages: ten current core and three gated. Research informs implementation decisions; these requirements/templates are not finished research.

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

Start with C03 and C05; sequence new asset components after the retained first slice. Preserve the exam pause and scope gates. [Effort, ownership boundaries and contribution test](asset-workload-and-contribution.md).

## C03 — Define Asset Observation Fields & Validate Stable Identity

Layer: Current core. Prerequisites: C01.

Choose a defensible asset identity and observation contract before adapters proliferate.

Start with C03 schema/identity desk research and labelled fixtures. C01 still gates approved-scope acceptance.

Questions:
- Which candidate identifiers survive IP changes, host rebuilds and cloned machines, and when must records stay separate or require review?
- Which fields distinguish absent, failed, stale and conflicting observations without turning missing evidence into a clean result?
- What minimum OS/package/firmware identity does each supported consumer need, and what raw evidence can be retained without secrets?

Comparison:
Compare candidate identity rules and required/optional fields against a fixture matrix; document the rejected rules and unresolved collisions.

Cases:
- Same IP reused by two hosts
- Same host changes IP
- Cloned/rebuilt host with conflicting identifiers
- Partial collection, stale import and missing package identity

Outputs:
- `docs/research/assets/c03-decision-brief.md`
- `docs/research/assets/c03-evidence-matrix.csv`

Review: Mahrous reviews matching sufficiency; Omar reproduces schema validation and ingestion compatibility.

Who uses this:
- C04–C07 adapter implementers: one shared contract and explicit unknown/error states
- Omar / P02: compatible ingestion and stable references
- Mahrous / D08–D09: sufficient identity/evidence for matching

[Blank decision brief](research/assets/C03-brief-template.md) · [Blank evidence matrix](research/assets/C03-evidence-template.csv)

Official starting references:
- [systemd machine-id documentation](https://www.freedesktop.org/software/systemd/man/latest/machine-id.html): Investigate identity lifecycle, cloned/rebuilt hosts and identifier handling. Latest upstream docs checked 6 November; compare with the actual lab’s installed systemd version.
- [Wazuh inventory compatibility matrix](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/compatibility-matrix.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.

## C04 — Implement Bounded Network Discovery & Parse Structured Results

Layer: Current core. Prerequisites: C01, C02, C03.

Select bounded discovery profiles using measured coverage, disruption limits and explicit evidence limitations.

Desk research and saved fixtures can start now; live comparisons require C01/C02/C03 and explicit authorized targets.

Questions:
- Which probe choices and exclusions are justified for each approved lab device class, including fragile or unsupported devices?
- How do candidate bounded profiles compare on observed targets, traffic, duration, timeouts and identification uncertainty?
- Which discovery results can propose an asset and which require authenticated/offline confirmation before asserting its OS or package identity?

Comparison:
Compare saved-result parsing and approved lab profiles under the same declared target set; record coverage and failure counts separately. Never test unapproved targets.

Cases:
- Out-of-scope target rejected before contact
- Fragile-device exclusion
- Timeout/cancel with partial results
- Conflicting banner and authenticated identity

Outputs:
- `docs/research/assets/c04-decision-brief.md`
- `docs/research/assets/c04-evidence-matrix.csv`

Review: Mahrous reviews scope/safety and evidence limits; Amr verifies the approved lab conditions.

Who uses this:
- C05/C07: which assets require authenticated collection or offline evidence
- Mahrous / D08: uncertainty flags rather than banner-derived certainty
- Amr / C02 and Mahrous / C01: evidence that discovery respects the approved lab and safety boundary

[Blank decision brief](research/assets/C04-brief-template.md) · [Blank evidence matrix](research/assets/C04-evidence-template.csv)

Official starting references:
- [Nmap host discovery controls](https://nmap.org/book/host-discovery-controls.html): Compare discovery controls and uncertainty within the approved lab. Official source checked 6 November; qualification must match the installed tool and selected profile.
- [Nmap service/version detection](https://nmap.org/book/man-version-detection.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.

## C05 — Collect Ubuntu OS and Package Evidence Through Authenticated SSH

Layer: Current core. Prerequisites: C02, C03.

Choose and implement the smallest trustworthy Ubuntu inventory collection method.

After the C03 first pass, prepare collector fixtures. Real collection requires C02/C03 and the approved scope; Shams does not build Amr’s advisory collectors.

Questions:
- Which native evidence distinguishes distro/build, architecture, binary/source package identity and installed versus running state for the chosen lab profile?
- What is the least permission needed for each field, and what should the adapter report when a field is denied or unavailable?
- How do candidate read-only collection approaches compare with a preserved native export on field coverage, discrepancies, duration and failure behavior?

Comparison:
Use the same authorized Ubuntu snapshot for each available candidate; compare against a preserved native export, record disagreements, and select a method with stated limitations.

Cases:
- Denied field or invalid credentials
- Host-key mismatch
- Partial output and command failure
- Missing source-package identity
- Stale observation and installed/running discrepancy

Outputs:
- `docs/research/assets/c05-decision-brief.md`
- `docs/research/assets/c05-evidence-matrix.csv`

Review: Mahrous reviews matching-input sufficiency; Amr confirms lab access and execution separation; Omar checks ingestion.

Who uses this:
- Mahrous / C08/D09: reproducible asset facts with provenance and missing-field masks
- C13: independent before/after observations with stable asset identity
- Hams / A02: measured asset inputs only; no invented business context

[Blank decision brief](research/assets/C05-brief-template.md) · [Blank evidence matrix](research/assets/C05-evidence-template.csv)

Official starting references:
- [Ubuntu 22.04 dpkg-query manual](https://manpages.ubuntu.com/manpages/jammy/man1/dpkg-query.1.html): Investigate explicit inventory output fields and binary/source package identity; build a read-only collection fixture. Pinned Jammy manual checked 6 November; verify the actual target and tool version.
- [Wazuh system inventory](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/index.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.

## C06 — Compare Windows Inventory Options & Implement One Adapter

Layer: Deferred extension. Prerequisites: C03.

Qualify one Windows inventory approach only if the deferred extension is approved.

Deferred extension: keep to an initial evidence-gap/feasibility note until the scope gate and target access are agreed. Do not let this delay C03/C05.

Questions:
- For the exact Windows target, which candidate exposes the required OS/build/package/update fields, and what remains unavailable?
- What enrollment, privileges, transport, maintenance and redistribution constraints would each available candidate introduce?
- On the same authorized target, how do candidates differ in measured field completeness, collection time, CPU/RAM and explicit failures?

Comparison:
Create a decision table for the existing Wazuh/osquery/native options; mark unavailable measurements as not run. Implement one justified option, rather than several competing adapters.

Cases:
- Missing build/update field
- Insufficient permission or failed transport
- Duplicate or changed host identity
- Missing or conflicting inventory entry

Outputs:
- `docs/research/assets/c06-decision-brief.md`
- `docs/research/assets/c06-evidence-matrix.csv`

Review: Omar reviews integration/operating burden; Mahrous reviews matching coverage; Amr supplies only agreed lab/access help.

Who uses this:
- Omar / P02: mapped Windows observation contract
- Mahrous / D08/D09: declared identity and applicability gaps
- Team scope review: evidence to enable, defer or reject the extension

[Blank decision brief](research/assets/C06-brief-template.md) · [Blank evidence matrix](research/assets/C06-evidence-template.csv)

Official starting references:
- [Microsoft Win32_QuickFixEngineering reference](https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-quickfixengineering): Investigate documented update-inventory coverage limits before choosing a Windows collection method. Official source checked 6 November; this alone is not a complete inventory or vulnerability verdict.
- [osquery documentation](https://osquery.readthedocs.io/en/stable/): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.
- [Wazuh inventory compatibility matrix](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/compatibility-matrix.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.

## C07 — Import Offline and Appliance Evidence With Freshness Labels

Layer: Conditional FortiOS profile. Prerequisites: C03.

Define a trustworthy offline/appliance evidence import without pretending that a stale export is a live observation.

Conditional capability: establish the required evidence checklist first; full appliance research/import qualification requires the existing scope and access gates.

Questions:
- Which exact model, firmware train, hardware revision, original capture time and source artifact are necessary for the selected appliance identity?
- Which available authorized export/manual-entry paths preserve those fields and integrity, and which ambiguities must remain unknown?
- How should importer validation handle stale, incomplete, malformed, oversized or conflicting evidence while retaining the original timestamp and operator/source provenance?

Comparison:
Compare the permitted evidence paths for the selected appliance using sanitized fixtures. Separate importer behavior evidence from vendor vulnerability/advisory content, which Amr owns.

Cases:
- Old snapshot imported today
- Missing model/train/revision
- Conflicting exports for one device
- Malformed/oversized input
- Sensitive fields requiring redaction

Outputs:
- `docs/research/assets/c07-decision-brief.md`
- `docs/research/assets/c07-evidence-matrix.csv`

Review: Mahrous reviews matching gaps; Omar reviews import validation and evidence handling; Amr reviews the vendor-input boundary.

Who uses this:
- Mahrous / D08/D09: trustworthy appliance identity with explicit unresolved gaps
- Omar / P07/P08: import/ingestion errors and provenance
- Amr: asset identity handoff for his existing vendor-advisory work

[Blank decision brief](research/assets/C07-brief-template.md) · [Blank evidence matrix](research/assets/C07-evidence-template.csv)

Official starting references:
- [Fortinet FortiOS 7.4 CLI troubleshooting reference](https://docs.fortinet.com/document/fortigate/7.4.0/cli-troubleshooting-cheat-sheet/420966): Locate vendor-documented system-identity evidence; identify the fields still missing from an authorized export. Versioned official search reference verified 6 November; use the manual matching the actual model/firmware.
- [NIST SP 800-82 Rev 3](https://csrc.nist.gov/pubs/sp/800/82/r3/final): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.

## C13 — Verify Remediation Independently & Rehearse Recovery

Layer: Current core. Prerequisites: C08, C11, C12.

Choose independent asset and health checks that can challenge a successful patch-executor result.

Draft the check-selection matrix and failure fixtures now. Measured verification waits for C08/C11/C12; do not duplicate Amr’s execution or recovery runner.

Questions:
- Which fresh installed/running-state and health checks distinguish a successful update, a broken service, incomplete restart and insufficient evidence?
- How can verification collect evidence independently from the executor success flag and link it to the same asset without rewriting earlier observations?
- After Amr executes the authorized recovery fixture, which observations support closure, continuing uncertainty or a reopened/linked finding episode?

Comparison:
Predeclare expected outcomes, then compare executor-only success with independent fresh asset and service evidence on the same approved fixtures; disclose every disagreement and unresolved case.

Cases:
- Exit code zero but failed health check
- Updated package with stale/running state
- Missing or stale post-observation
- Recovery restores an old vulnerable version
- Identity mismatch between pre/post snapshots

Outputs:
- `docs/research/assets/c13-decision-brief.md`
- `docs/research/assets/c13-evidence-matrix.csv`

Review: Mahrous signs off matching/closure expectations; Amr performs and documents authorized patch/recovery operations. Shams owns independent collection and verification code/results.

Who uses this:
- Mahrous: justified reassessment, closure and recurrence decisions
- Amr / C11/C12/C14: verification failures and evidence from his execution/recovery operations
- C16: independently reproducible verification evidence and honest limitations

[Blank decision brief](research/assets/C13-brief-template.md) · [Blank evidence matrix](research/assets/C13-evidence-template.csv)

Official starting references:
- [NIST SP 800-40 Rev 4](https://csrc.nist.gov/pubs/sp/800/40/r4/final): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.
- [Ubuntu 22.04 dpkg-query manual](https://manpages.ubuntu.com/manpages/jammy/man1/dpkg-query.1.html): Investigate explicit inventory output fields and binary/source package identity; build a read-only collection fixture. Pinned Jammy manual checked 6 November; verify the actual target and tool version.

## C17 — Reconcile Asset Identities With Reviewable Conflict Decisions

Layer: Current core. Prerequisites: C03, C05, P02.

Implement a deterministic resolver for enrolled host identities across observation sources, IP reuse and rebuilds. Preserve ambiguous identities as separate candidates with reviewable reasons.

Post-first-slice: complete C03, C05, P02 first; draft research/fixtures earlier without claiming measured completion.

Questions:
- Which identity signals survive IP changes, re-enrollment and host cloning, and which conflicts must block an automatic association?
- How can a resolution be reproduced from immutable observations and a rule revision without deleting earlier identities?
- What evidence would reverse an incorrect association, and how will the consumer see that correction?

Comparison:
Compare with a simple IP-only baseline and report false merges, false splits and unresolved cases.

Cases:
- Replay IP reuse, cloned identity and re-enrollment cases; two distinct hosts must not silently merge.
- Replay the same inputs/rule revision and obtain the same decision and evidence references.
- Correct a false association without deleting the old observation or borrowing another tenant’s identity.

Outputs:
- `docs/research/assets/c17-decision-brief.md`
- `docs/research/assets/c17-evidence-matrix.csv`

Review: Mahrous reviews identity ambiguity and product-matching separation; Omar checks persistence/auth compatibility.

Who uses this:
- C18: resolved host identity for chronological asset deltas.
- C22: reviewed false-merge/false-split outcomes for the asset benchmark.
- D08/P02 reviewers: compatible host references; product matching and persistence stay with their owners.

[Blank decision brief](research/assets/C17-brief-template.md) · [Blank evidence matrix](research/assets/C17-evidence-template.csv)

Official starting references:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation. Official documentation checked 6 November 2026; compare documented capability rather than assuming absent features.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison. Official documentation checked 6 November; version-pin the evaluated deployment.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel. Official documentation checked 6 November; inspect the relevant product/version constraints.

## C18 — Build Immutable Asset Snapshot Deltas and Replayable Change Evidence

Layer: Current core. Prerequisites: C17, C05.

Produce field-level asset changes from immutable observations, with explicit collection completeness and ordering, so consumers can distinguish a real removal from failed collection.

Post-first-slice: complete C17, C05 first; draft research/fixtures earlier without claiming measured completion.

Questions:
- Which package/service/OS changes are comparable across collector versions and incomplete snapshots?
- How should duplicates, late arrivals, time skew and missing fields affect a delta?
- Which inventory events can D13 consume without mistaking a failed collection for an uninstall?

Comparison:
Define a delta contract linking two immutable snapshot IDs, asset identity and comparison revision.

Cases:
- A partial/failed package listing must not imply all prior packages were removed.
- Reorder and duplicate snapshots; preserve stable event identity and explain chronology conflicts.
- Verify that raw evidence stays unchanged and D13 can consume the delta fixture without a new scheduler.

Outputs:
- `docs/research/assets/c18-decision-brief.md`
- `docs/research/assets/c18-evidence-matrix.csv`

Review: Mahrous reviews the D13 event boundary; Omar reviews existing event/persistence compatibility.

Who uses this:
- C19: comparable snapshot history for evidence-quality evaluation.
- C22/C23: replayable changes for contribution tests and observed service relationships.
- D13: optional asset-change event input; Mahrous retains impact analysis and reassessment scheduling.

[Blank decision brief](research/assets/C18-brief-template.md) · [Blank evidence matrix](research/assets/C18-evidence-template.csv)

Official starting references:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation. Official documentation checked 6 November 2026; compare documented capability rather than assuming absent features.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison. Official documentation checked 6 November; version-pin the evaluated deployment.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel. Official documentation checked 6 November; inspect the relevant product/version constraints.

## C19 — Evaluate Asset Evidence Freshness, Completeness and Conflicts Per Field

Layer: Current core. Prerequisites: C18, C03.

Implement a versioned, explainable asset-evidence policy that reports which fields are usable, stale, missing or conflicting at an explicit evaluation time.

Post-first-slice: complete C18, C03 first; draft research/fixtures earlier without claiming measured completion.

Questions:
- Which freshness windows and mandatory fields are defensible for each supported asset/collection profile?
- How will original collection time, clock uncertainty, partial failure and conflicting observations change usability?
- How can consumers inspect the exact reasons instead of relying on an uncalibrated confidence percentage?

Comparison:
Compare simple latest-snapshot/age-only baselines against reviewed stale/partial/conflict cases.

Cases:
- Reimport old data and retain its age; evaluate identically with a fixed as_of time.
- Preserve unknown/conflict/time_uncertain under missing timestamps and skew.
- A successful collection of one field must not mark every other field fresh or complete.

Outputs:
- `docs/research/assets/c19-decision-brief.md`
- `docs/research/assets/c19-evidence-matrix.csv`

Review: Mahrous checks how evidence usability is consumed by matching/verification without changing their authority.

Who uses this:
- C20: field-level gaps/staleness that justify bounded collection probes.
- C22/C23: quality states and source coverage for evaluation/relationship qualification.
- C13/D09 reviewers: explicit usability reasons; matching and closure decisions remain with their existing components.

[Blank decision brief](research/assets/C19-brief-template.md) · [Blank evidence matrix](research/assets/C19-evidence-template.csv)

Official starting references:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation. Official documentation checked 6 November 2026; compare documented capability rather than assuming absent features.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison. Official documentation checked 6 November; version-pin the evaluated deployment.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel. Official documentation checked 6 November; inspect the relevant product/version constraints.

## C20 — Plan the Smallest Approved Collection Needed to Resolve Asset Evidence Gaps

Layer: Current core. Prerequisites: C19, D08, P08.

Map structured missing asset-field keys to approved read-only collection probes and choose a bounded plan under a declared cost/budget, with a reason for each requested fact.

Post-first-slice: complete C19, D08, P08 first; draft research/fixtures earlier without claiming measured completion.

Questions:
- Which approved probe supplies each asset field, and which fields cannot be collected in the current scope?
- Can deterministic coverage/cost rules reduce unnecessary collection versus always running full inventory?
- How should stale evidence, missing permissions, identity conflict and exhausted budgets prevent or limit a plan?

Comparison:
Compare full inventory, fixed rules and budget-aware selection on the same reviewed gap fixtures, including negative results.

Cases:
- Unknown/mutating commands and denied target scopes produce no executable collection plan.
- Enforce the declared budget and prevent duplicate probes for equivalent requirements.
- Measure resolved evidence gaps, unresolved gaps and cost on the same cases for each baseline.

Outputs:
- `docs/research/assets/c20-decision-brief.md`
- `docs/research/assets/c20-evidence-matrix.csv`

Review: Mahrous reviews gap semantics and baseline outcomes; Omar reviews typed-envelope compatibility and denied operations.

Who uses this:
- C21: version-bound approved probe plans to turn into bounded collection intents.
- C22: selected/rejected probes and costs for baseline/ablation comparison.
- A11/P08 reviewers: optional structured plan consumption and existing typed-envelope validation; no AI or executor ownership transfer.

[Blank decision brief](research/assets/C20-brief-template.md) · [Blank evidence matrix](research/assets/C20-evidence-template.csv)

Official starting references:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation. Official documentation checked 6 November 2026; compare documented capability rather than assuming absent features.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison. Official documentation checked 6 November; version-pin the evaluated deployment.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel. Official documentation checked 6 November; inspect the relevant product/version constraints.

## C21 — Plan Bounded Asset Collection Campaigns With Backpressure and Recovery

Layer: Current core. Prerequisites: C20, P07, P08, C04.

Build asset-domain campaign planning for bounded batches, per-target limits, backoff and resumable progress while delegating durable dispatch and authentication to the existing platform.

Post-first-slice: complete C20, P07, P08, C04 first; draft research/fixtures earlier without claiming measured completion.

Questions:
- Which batch/concurrency/time/traffic limits protect the chosen authorized lab/device classes?
- How can incremental collection avoid repeatedly reading unchanged fields while respecting fresh-evidence needs?
- How will offline assets, partial results, duplicate intents, retries and exhausted budgets appear without false success?

Comparison:
Report campaign throughput, fairness, collected bytes/probe counts and failures separately; state the largest measured scope.

Cases:
- Crash/replay intent preparation and verify no duplicate semantic collection intent.
- Enforce per-target/global limits and stop dispatch intent generation when cancelled or out of budget.
- Unavailable assets retain failed/unknown states and cannot appear freshly collected.

Outputs:
- `docs/research/assets/c21-decision-brief.md`
- `docs/research/assets/c21-evidence-matrix.csv`

Review: Omar checks ledger/envelope reuse; Amr reviews authorized lab load assumptions without taking collection ownership.

Who uses this:
- C22: campaign constraints, replay/failure outcomes and measured collection cost.
- P07/P08: collection intents through the existing durable-job and runner trust contracts.
- Shams’s asset operators: pause/resume/unknown-state evidence without a second queue.

[Blank decision brief](research/assets/C21-brief-template.md) · [Blank evidence matrix](research/assets/C21-evidence-template.csv)

Official starting references:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation. Official documentation checked 6 November 2026; compare documented capability rather than assuming absent features.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison. Official documentation checked 6 November; version-pin the evaluated deployment.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel. Official documentation checked 6 November; inspect the relevant product/version constraints.

## C22 — Benchmark Asset Evidence Quality and Ablate Adaptive Collection Benefits

Layer: Current core. Prerequisites: C17, C18, C19, C20, C21, C13.

Build a reproducible asset-only benchmark testing identity, change fidelity, evidence quality and bounded recollection, including whether their combined workflow earns a measurable benefit.

Post-first-slice: complete C17, C18, C19, C20, C21, C13 first; draft research/fixtures earlier without claiming measured completion.

Questions:
- Which independently reviewed asset facts and change sequences exercise false merges, missed changes, stale evidence and partial collection?
- Does adaptive recollection resolve comparable evidence gaps with less collection cost than full refresh under identical safety limits?
- Which claimed gain disappears when identity resolution, deltas, freshness or budget selection is removed?

Comparison:
Implement full-refresh/fixed-rule baselines and the proposed combined asset workflow.

Cases:
- A second reviewer checks expected asset facts without copying the new engine’s output as truth.
- Reproduce metrics from frozen cases and raw results, including failed/unavailable runs.
- Hold budget and case set constant across baselines/ablations; never mix synthetic and real-lab denominators silently.

Outputs:
- `docs/research/assets/c22-decision-brief.md`
- `docs/research/assets/c22-evidence-matrix.csv`

Review: Mahrous independently checks case expectations and experiment design; Omar reproduces the asset pipeline/consumer contract.

Who uses this:
- C23: core asset qualification evidence before the optional relationship experiment.
- C16 reviewers: optional asset-specific contribution evidence without replacing the end-to-end demo.
- Faculty/team scope review: measured supported-profile benefit, limitations and negative findings.

[Blank decision brief](research/assets/C22-brief-template.md) · [Blank evidence matrix](research/assets/C22-evidence-template.csv)

Official starting references:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation. Official documentation checked 6 November 2026; compare documented capability rather than assuming absent features.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison. Official documentation checked 6 November; version-pin the evaluated deployment.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel. Official documentation checked 6 November; inspect the relevant product/version constraints.

## C23 — Qualify Observed Asset–Service Relationships Without Invented Dependencies

Layer: Conditional experiment. Prerequisites: C18, C19, C22.

Research and prototype a provenance-backed asset/package/service relationship view using available observations, while exposing missing coverage and separating observed edges from hypotheses.

Conditional experiment after C22 and capacity/scope review.

Questions:
- Which package/service/host relationships can the existing authorized collectors actually substantiate?
- What is lost when observations are stale, one-sided, partial or scoped to one host?
- Does an evidence-linked relationship view help reviewers answer asset-context questions compared with a flat inventory, at an acceptable resource cost?

Comparison:
Compare the view with flat inventory on reviewed context questions and resource measurements.

Cases:
- A stale or missing observation cannot create an apparently current confirmed relationship.
- Keep hypothesized edges visibly separate from observed evidence.
- Bound graph size and show incomplete coverage; any new probe requires a separate approved capability.

Outputs:
- `docs/research/assets/c23-decision-brief.md`
- `docs/research/assets/c23-evidence-matrix.csv`

Review: Mahrous reviews context/priority boundaries; Hams reviews interpretation and the handoff to existing UX design.

Who uses this:
- D12 reviewer: optional observed asset context; Mahrous retains business-impact and prioritization policy.
- Hams/UX02: optional evidence-linked context for interpretation and design; no automatic inferred dependency or risk claim.
- Team scope review: enable/defer/reject decision with coverage and resource evidence.

[Blank decision brief](research/assets/C23-brief-template.md) · [Blank evidence matrix](research/assets/C23-evidence-template.csv)

Official starting references:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation. Official documentation checked 6 November 2026; compare documented capability rather than assuming absent features.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison. Official documentation checked 6 November; version-pin the evaluated deployment.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel. Official documentation checked 6 November; inspect the relevant product/version constraints.
