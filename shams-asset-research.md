# Shams — Current asset research workplan

Each asset task has a named responsibility and activation gate. Research should support a decision and useful implementation; volume of documents is not the acceptance metric.

[Smallest implementations, baseline/metric choices and 21 design examples](asset-effective-reference.md)

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

One indexed notebook/evidence ledger may supply equivalent per-task research sections. Do not copy public examples as independent benchmark labels.

## C03 — Define Asset Observation Fields & Validate Stable Identity

Layer: Current core. Prerequisites: C01.

Choose a defensible asset identity and observation contract before adapters proliferate.

Start with C03 schema/identity desk research and labelled fixtures. C01 still gates approved-scope acceptance.

Questions:
- Which fields identify an enrolled host beyond IP?
- Which OS/build/package/firmware fields are mandatory for each supported profile?
- How will collection errors, raw hashes and old import timestamps be retained?
- Which candidate identifiers survive IP changes, host rebuilds and cloned machines, and when must records stay separate or require review?
- Which fields distinguish absent, failed, stale and conflicting observations without turning missing evidence into a clean result?
- What minimum OS/package/firmware identity does each supported consumer need, and what raw evidence can be retained without secrets?

Comparison: Compare candidate identity rules and required/optional fields against a fixture matrix; document the rejected rules and unresolved collisions.

Review: Mahrous reviews matching sufficiency; Omar reproduces schema validation and ingestion compatibility.

Who uses this:
- C04–C07 adapter implementers: one shared contract and explicit unknown/error states
- Omar / P02: compatible ingestion and stable references
- Mahrous / D08–D09: sufficient identity/evidence for matching

[Task decision template](research/assets/C03-brief-template.md)

Official starting points:
- [systemd machine-id documentation](https://www.freedesktop.org/software/systemd/man/latest/machine-id.html): Investigate identity lifecycle, cloned/rebuilt hosts and identifier handling.
- [Wazuh inventory compatibility matrix](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/compatibility-matrix.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps.

## C04 — Implement Bounded Network Discovery & Parse Structured Results

Layer: Current core. Prerequisites: C01, C02, C03.

Select bounded discovery profiles using measured coverage, disruption limits and explicit evidence limitations.

Desk research and saved fixtures can start now; live comparisons require C01/C02/C03 and explicit authorized targets.

Questions:
- Which conservative Nmap profile fits each approved device class?
- Which probes and ports must be excluded, including fragile printer services?
- Which installation and redistribution constraints apply to Nmap/Npcap?
- Which probe choices and exclusions are justified for each approved lab device class, including fragile or unsupported devices?
- How do candidate bounded profiles compare on observed targets, traffic, duration, timeouts and identification uncertainty?
- Which discovery results can propose an asset and which require authenticated/offline confirmation before asserting its OS or package identity?

Comparison: Compare saved-result parsing and approved lab profiles under the same declared target set; record coverage and failure counts separately. Never test unapproved targets.

Review: Mahrous reviews scope/safety and evidence limits; Amr verifies the approved lab conditions.

Who uses this:
- C05/C07: which assets require authenticated collection or offline evidence
- Mahrous / D08: uncertainty flags rather than banner-derived certainty
- Amr / C02 and Mahrous / C01: evidence that discovery respects the approved lab and safety boundary

[Task decision template](research/assets/C04-brief-template.md)

Official starting points:
- [Nmap host discovery controls](https://nmap.org/book/host-discovery-controls.html): Compare discovery controls and uncertainty within the approved lab.
- [Nmap service/version detection](https://nmap.org/book/man-version-detection.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps.

## C05 — Collect Ubuntu OS and Package Evidence Through Authenticated SSH

Layer: Current core. Prerequisites: C02, C03.

Choose and implement the smallest trustworthy Ubuntu inventory collection method.

After the C03 first pass, prepare collector fixtures. Real collection requires C02/C03 and the approved scope; Shams does not build Amr’s advisory collectors.

Questions:
- Which native output exposes distro release, architecture and binary/source package identity?
- What minimum read permissions are needed?
- How will host-key verification, command failures and redaction be enforced?
- Which measured asset fields can populate A02 without introducing invented business context?
- Which native evidence distinguishes distro/build, architecture, binary/source package identity and installed versus running state for the chosen lab profile?
- What is the least permission needed for each field, and what should the adapter report when a field is denied or unavailable?
- How do candidate read-only collection approaches compare with a preserved native export on field coverage, discrepancies, duration and failure behavior?

Comparison: Use the same authorized Ubuntu snapshot for each available candidate; compare against a preserved native export, record disagreements, and select a method with stated limitations.

Review: Mahrous reviews matching-input sufficiency; Amr confirms lab access and execution separation; Omar checks ingestion.

Who uses this:
- Mahrous / C08/D09: reproducible asset facts with provenance and missing-field masks
- C13: independent before/after observations with stable asset identity
- Hams / A02: measured asset inputs only; no invented business context

[Task decision template](research/assets/C05-brief-template.md)

Official starting points:
- [Ubuntu 22.04 dpkg-query manual](https://manpages.ubuntu.com/manpages/jammy/man1/dpkg-query.1.html): Investigate explicit inventory output fields and binary/source package identity; build a read-only collection fixture.
- [Wazuh system inventory](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/index.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps.

## C06 — Compare Windows Inventory Options & Implement One Adapter

Layer: Deferred extension. Prerequisites: C03.

Qualify one Windows inventory approach only if the deferred extension is approved.

Deferred extension: keep to an initial evidence-gap/feasibility note until the scope gate and target access are agreed. Do not let this delay C03/C05.

Questions:
- Does osquery or existing Wazuh Syscollector expose the required build, package and update fields?
- What permissions, enrollment and transport work does each option require?
- What are the measured CPU/RAM and collection-time costs on the same target?
- For the exact Windows target, which candidate exposes the required OS/build/package/update fields, and what remains unavailable?
- What enrollment, privileges, transport, maintenance and redistribution constraints would each available candidate introduce?
- On the same authorized target, how do candidates differ in measured field completeness, collection time, CPU/RAM and explicit failures?

Comparison: Create a decision table for the existing Wazuh/osquery/native options; mark unavailable measurements as not run. Implement one justified option, rather than several competing adapters.

Review: Omar reviews integration/operating burden; Mahrous reviews matching coverage; Amr supplies only agreed lab/access help.

Who uses this:
- Omar / P02: mapped Windows observation contract
- Mahrous / D08/D09: declared identity and applicability gaps
- Team scope review: evidence to enable, defer or reject the extension

[Task decision template](research/assets/C06-brief-template.md)

Official starting points:
- [Microsoft Win32_QuickFixEngineering reference](https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-quickfixengineering): Investigate documented update-inventory coverage limits before choosing a Windows collection method.
- [osquery documentation](https://osquery.readthedocs.io/en/stable/): Use as a retained official starting point; extract only the relevant asset claim and record gaps.
- [Wazuh inventory compatibility matrix](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/compatibility-matrix.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps.

## C07 — Import Offline and Appliance Evidence With Freshness Labels

Layer: Conditional FortiOS profile. Prerequisites: C03.

Define a trustworthy offline/appliance evidence import without pretending that a stale export is a live observation.

Conditional capability: establish the required evidence checklist first; full appliance research/import qualification requires the existing scope and access gates.

Questions:
- Which exact model, firmware train and hardware revision identify the test appliance?
- How can timestamp, operator and integrity hash be preserved?
- Which import fields are needed to resolve a match and which remain unknown?
- Which exact model, firmware train, hardware revision, original capture time and source artifact are necessary for the selected appliance identity?
- Which available authorized export/manual-entry paths preserve those fields and integrity, and which ambiguities must remain unknown?
- How should importer validation handle stale, incomplete, malformed, oversized or conflicting evidence while retaining the original timestamp and operator/source provenance?

Comparison: Compare the permitted evidence paths for the selected appliance using sanitized fixtures. Separate importer behavior evidence from vendor vulnerability/advisory content, which Amr owns.

Review: Mahrous reviews matching gaps; Omar reviews import validation and evidence handling; Amr reviews the vendor-input boundary.

Who uses this:
- Mahrous / D08/D09: trustworthy appliance identity with explicit unresolved gaps
- Omar / P07/P08: import/ingestion errors and provenance
- Amr: asset identity handoff for his existing vendor-advisory work

[Task decision template](research/assets/C07-brief-template.md)

Official starting points:
- [Fortinet FortiOS 7.4 CLI troubleshooting reference](https://docs.fortinet.com/document/fortigate/7.4.0/cli-troubleshooting-cheat-sheet/420966): Locate vendor-documented system-identity evidence; identify the fields still missing from an authorized export.
- [NIST SP 800-82 Rev 3](https://csrc.nist.gov/pubs/sp/800/82/r3/final): Use as a retained official starting point; extract only the relevant asset claim and record gaps.

## C13 — Verify Remediation Independently & Rehearse Recovery

Layer: Current core. Prerequisites: C08, C11, C12.

Choose independent asset and health checks that can challenge a successful patch-executor result.

Draft the check-selection matrix and failure fixtures now. Measured verification waits for C08/C11/C12; do not duplicate Amr’s execution or recovery runner.

Questions:
- Which installed versus running version checks matter for the chosen update?
- What independent health check detects a broken service despite exit code zero?
- Which restore, downgrade or forward-fix path is actually supported?
- Which fresh installed/running-state and health checks distinguish a successful update, a broken service, incomplete restart and insufficient evidence?
- How can verification collect evidence independently from the executor success flag and link it to the same asset without rewriting earlier observations?
- After Amr executes the authorized recovery fixture, which observations support closure, continuing uncertainty or a reopened/linked finding episode?

Comparison: Predeclare expected outcomes, then compare executor-only success with independent fresh asset and service evidence on the same approved fixtures; disclose every disagreement and unresolved case.

Review: Mahrous signs off matching/closure expectations; Amr performs and documents authorized patch/recovery operations. Shams owns independent collection and verification code/results.

Who uses this:
- Mahrous: justified reassessment, closure and recurrence decisions
- Amr / C11/C12/C14: verification failures and evidence from his execution/recovery operations
- C16: independently reproducible verification evidence and honest limitations

[Task decision template](research/assets/C13-brief-template.md)

Official starting points:
- [NIST SP 800-40 Rev 4](https://csrc.nist.gov/pubs/sp/800/40/r4/final): Use as a retained official starting point; extract only the relevant asset claim and record gaps.
- [Ubuntu 22.04 dpkg-query manual](https://manpages.ubuntu.com/manpages/jammy/man1/dpkg-query.1.html): Investigate explicit inventory output fields and binary/source package identity; build a read-only collection fixture.

## C17 — Reconcile Asset Identities With Reviewable Conflict Decisions

Layer: Deferred extension. Prerequisites: C03, C05, P02, P03, P04.

One deterministic resolver for approved enrollment identities on two sources, returning associate, distinct or needs_review. Preserve observations and reasons. Begin with a small conflict corpus; cross-source auto-merge is gated.

Activate only when at least two observation sources or demonstrated identity conflicts require it. The initial enrolled-asset path in C03/C05 must work without this extension.

Questions:
- Which identity signals survive IP changes, re-enrollment and host cloning, and which conflicts must block an automatic association?
- How can a resolution be reproduced from immutable observations and a rule revision without deleting earlier identities?
- What evidence would reverse an incorrect association, and how will the consumer see that correction?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Comparison: Use the existing enrolled-ID rules as the main baseline. IP-only matching is a diagnostic weak comparator, not the only method to beat.

Review: Mahrous reviews identity ambiguity and product-matching separation; Omar checks persistence/auth compatibility.

Who uses this:
- C18: resolved host identity for chronological asset deltas.
- C22: reviewed false-merge/false-split outcomes for the asset benchmark.
- D08/P02 reviewers: compatible host references; product matching and persistence stay with their owners.

[Three synthetic behavior cases](research/assets/C17-behavior-examples.json)

Official starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

## C18 — Build Immutable Asset Snapshot Deltas and Replayable Change Evidence

Layer: Current core. Prerequisites: C03, C05.

A pure comparison of two validated snapshots for the same unambiguous enrolled asset. Handle package additions/version changes and complete versus partial package lists. Service/firmware comparisons can follow after this works.

Start the pure function once C03/C05 inputs are available. Full C17 reconciliation is not required; conflicting identities produce incomparable. Persist/emit through P03/P07 only when those integration contracts are delivered.

Questions:
- Which package/service/OS changes are comparable across collector versions and incomplete snapshots?
- How should duplicates, late arrivals, time skew and missing fields affect a delta?
- Which inventory events can D13 consume without mistaking a failed collection for an uninstall?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Comparison: Compare with a simple set difference on complete, same-scope exports, then expose where that baseline fails on partial/failed or reordered collection.

Review: Mahrous reviews the D13 event boundary; Omar reviews existing event/persistence compatibility.

Who uses this:
- C19: comparable snapshot history for evidence-quality evaluation.
- C22/C23: replayable changes for contribution tests and observed service relationships.
- D13: optional asset-change event input; Mahrous retains impact analysis and reassessment scheduling.

[Three synthetic behavior cases](research/assets/C18-behavior-examples.json)

Official starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

## C19 — Evaluate Asset Evidence Freshness, Completeness and Conflicts Per Field

Layer: Current core. Prerequisites: C03, C05.

Evaluate a single snapshot plus an explicit as_of time and versioned field policy. Begin with package identity/version and collection time; report usable, stale, missing, conflicting or time_uncertain with reasons.

C18 history is not a prerequisite for single-observation freshness. Cross-observation conflict resolution is optional; unavailable or contradictory evidence must remain unresolved.

Questions:
- Which freshness windows and mandatory fields are defensible for each supported asset/collection profile?
- How will original collection time, clock uncertainty, partial failure and conflicting observations change usability?
- How can consumers inspect the exact reasons instead of relying on an uncalibrated confidence percentage?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Comparison: Compare latest-received and age-only checks with field-level evaluation on the same reviewed cases. A configured age threshold is an assumption to justify, not a measured universal constant.

Review: Mahrous checks how evidence usability is consumed by matching/verification without changing their authority.

Who uses this:
- C20: field-level gaps/staleness that justify bounded collection probes.
- C22/C23: quality states and source coverage for evaluation/relationship qualification.
- C13/D09 reviewers: explicit usability reasons; matching and closure decisions remain with their existing components.

[Three synthetic behavior cases](research/assets/C19-behavior-examples.json)

Official starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

## C20 — Plan the Smallest Approved Collection Needed to Resolve Asset Evidence Gaps

Layer: Conditional experiment. Prerequisites: C19, D08, P08, C22.

For one Ubuntu profile and a small approved read-only probe set, map structured missing fields to a deterministic, budget-bound plan. Start with a simple rule or enumeration; keep full collection as a working fallback.

Activate after C22 freezes independent cases/core baselines and the approved adapters expose separately callable field probes. If only one full-inventory operation exists, record the limitation rather than inventing selective collection.

Questions:
- Which approved probe supplies each asset field, and which fields cannot be collected in the current scope?
- Can deterministic coverage/cost rules reduce unnecessary collection versus always running full inventory?
- How should stale evidence, missing permissions, identity conflict and exhausted budgets prevent or limit a plan?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Comparison: Compare full inventory and a sensible fixed-rule selector with the proposed selector. Pin the same initial snapshots, target scope, case set and available probes for every method.

Review: Mahrous reviews gap semantics and baseline outcomes; Omar reviews typed-envelope compatibility and denied operations.

Who uses this:
- C21: version-bound approved probe plans to turn into bounded collection intents.
- C22: selected/rejected probes and costs for baseline/ablation comparison.
- A11/P08 reviewers: optional structured plan consumption and existing typed-envelope validation; no AI or executor ownership transfer.

[Three synthetic behavior cases](research/assets/C20-behavior-examples.json)

Official starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

## C21 — Plan Bounded Asset Collection Campaigns With Backpressure and Recovery

Layer: Deferred extension. Prerequisites: C19, C04, C05, P07, P08.

Generate a bounded batch of read-only collection intents using P07’s existing job ledger. Implement only asset eligibility and rate/concurrency policy; reuse existing retry, lease, cancellation and recovery state.

Activate when a measured multi-asset baseline violates an agreed time/resource/operator-effort target. A small lab that works with existing serial dispatch does not justify a new orchestration subsystem. C20 is optional, not a prerequisite.

Questions:
- Which batch/concurrency/time/traffic limits protect the chosen authorized lab/device classes?
- How can incremental collection avoid repeatedly reading unchanged fields while respecting fresh-evidence needs?
- How will offline assets, partial results, duplicate intents, retries and exhausted budgets appear without false success?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Comparison: Start with the existing bounded serial worker. Compare only after measuring a real bottleneck; keep simulated planning load separate from measured lab collection.

Review: Omar checks ledger/envelope reuse; Amr reviews authorized lab load assumptions without taking collection ownership.

Who uses this:
- C22: campaign constraints, replay/failure outcomes and measured collection cost.
- P07/P08: collection intents through the existing durable-job and runner trust contracts.
- Shams’s asset operators: pause/resume/unknown-state evidence without a second queue.

[Three synthetic behavior cases](research/assets/C21-behavior-examples.json)

Official starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

## C22 — Build Independent Asset Cases & Evaluate Evidence Quality

Layer: Current core. Prerequisites: C03, C05, C18, C19.

Start with the protocol and reviewed expectations, then run the core asset pipeline on frozen authorized exports and separately labelled synthetic edge cases. C17/C20/C21/C13 are not hard prerequisites for this core benchmark.

Protocol, question and case design start now. Core measured acceptance requires delivered C03/C05/C18/C19 inputs. Optional identity/adaptive/campaign comparisons are follow-up slices only after their own activation gates.

Questions:
- Which independently reviewed asset facts and change sequences exercise false merges, missed changes, stale evidence and partial collection?
- Does adaptive recollection resolve comparable evidence gaps with less collection cost than full refresh under identical safety limits?
- Which claimed gain disappears when identity resolution, deltas, freshness or budget selection is removed?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Comparison: Freeze a complete-inventory/straight set-diff baseline and a sensible field-age rule baseline before final comparison. Use identical cases, scope and budgets; disclose when a comparator is unavailable.

Review: Mahrous independently checks case expectations and experiment design; Omar reproduces the asset pipeline/consumer contract.

Who uses this:
- C23: core asset qualification evidence before the optional relationship experiment.
- C16 reviewers: optional asset-specific contribution evidence without replacing the end-to-end demo.
- Faculty/team scope review: measured supported-profile benefit, limitations and negative findings.

[Three synthetic behavior cases](research/assets/C22-behavior-examples.json)

Official starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

## C23 — Qualify Observed Asset–Service Relationships Without Invented Dependencies

Layer: Conditional experiment. Prerequisites: C18, C19, C22.

One observed host–package–service relationship view for a narrow approved lab profile, with evidence references and explicit coverage. No inferred business-dependency graph is required.

Activate only for a concrete reviewed asset-context question that flat inventory does not answer well, after the core benchmark and capacity review. New probes require a separate approved capability.

Questions:
- Which package/service/host relationships can the existing authorized collectors actually substantiate?
- What is lost when observations are stale, one-sided, partial or scoped to one host?
- Does an evidence-linked relationship view help reviewers answer asset-context questions compared with a flat inventory, at an acceptable resource cost?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Comparison: Use the same asset-context questions against flat inventory and the proposed relationship view; measure reviewer correctness/effort and source coverage. Disclose convenience-user limitations.

Review: Mahrous reviews context/priority boundaries; Hams reviews interpretation and the handoff to existing UX design.

Who uses this:
- D12 reviewer: optional observed asset context; Mahrous retains business-impact and prioritization policy.
- Hams/UX02: optional evidence-linked context for interpretation and design; no automatic inferred dependency or risk claim.
- Team scope review: enable/defer/reject decision with coverage and resource evidence.

[Three synthetic behavior cases](research/assets/C23-behavior-examples.json)

Official starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.
