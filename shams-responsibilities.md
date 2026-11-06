# Shams — complete responsibility audit

Reviewed: 6 November 2026. Source: current website plan and the 4 November ownership correction.

The original four-owned count was correct for the old allocation, but it left only two current-core packages. C03 asset contracts and C13 independent asset verification now transfer to Shams, completing the asset responsibility boundary. Amr’s advisory/source and execution packages remain unchanged. A16 also restores an existing supporting contribution.

Before: 4 owned + 24 supporting. After the ownership rebalance and A16 correction: **6 owned + 23 supporting = 29 involved packages**, plus **3 research questions**.

Shams now owns four current-core packages: C03, C04, C05 and C13. C06 remains deferred and C07 conditional. This is substantive production ownership; counts are not effort estimates.

## Owned packages

### C03 — Define Asset Observation Fields & Validate Stable Identity

**Goal:** Agree what collectors must report so downstream matching can trust and reproduce an observation.

**Why This Matters:** Allows all collectors to feed one reliable assessment model.

**Owner:** Shams

**Support:** Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Blocked by: C01 (planned; no completion reported).

**Depends on:** C01

**Unlocks:** D08, C04, C05, C06, C07, C08, C15, P02, D17

**Parallel with:** D01, D02, C02, A01

**Critical path:** Yes

**First action:** Define stable asset id, source-specific identity, timestamps, trust level, os release, architecture, package namespace/version, firmware model/train

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details. Asset research mandate: Choose a defensible asset identity and observation contract before adapters proliferate. For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

- Which fields identify an enrolled host beyond IP?
- Which OS/build/package/firmware fields are mandatory for each supported profile?
- How will collection errors, raw hashes and old import timestamps be retained?
- Which candidate identifiers survive IP changes, host rebuilds and cloned machines, and when must records stay separate or require review?
- Which fields distinguish absent, failed, stale and conflicting observations without turning missing evidence into a clean result?
- What minimum OS/package/firmware identity does each supported consumer need, and what raw evidence can be retained without secrets?

Sources: CY-S08, CY-S11

- [systemd machine-id documentation](https://www.freedesktop.org/software/systemd/man/latest/machine-id.html): Investigate identity lifecycle, cloned/rebuilt hosts and identifier handling. Latest upstream docs checked 6 November; compare with the actual lab’s installed systemd version.
- [Wazuh inventory compatibility matrix](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/compatibility-matrix.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.

### Research decision and consumer handoff

Choose a defensible asset identity and observation contract before adapters proliferate.

Compare candidate identity rules and required/optional fields against a fixture matrix; document the rejected rules and unresolved collisions.

Failure cases:
- Same IP reused by two hosts
- Same host changes IP
- Cloned/rebuilt host with conflicting identifiers
- Partial collection, stale import and missing package identity

Who uses the findings:
- C04–C07 adapter implementers: one shared contract and explicit unknown/error states
- Omar / P02: compatible ingestion and stable references
- Mahrous / D08–D09: sufficient identity/evidence for matching

Review: Mahrous reviews matching sufficiency; Omar reproduces schema validation and ingestion compatibility.

Starting gate: Start with C03 schema/identity desk research and labelled fixtures. C01 still gates approved-scope acceptance.

[Blank decision brief](research/assets/C03-brief-template.md) · [Blank evidence matrix](research/assets/C03-evidence-template.csv)

### Support Contributions and Handoff

- **Mahrous**: Review whether the observation fields and identity rules are sufficient for D08/D09 matching and explicit unknown states; Omar reviews ingestion compatibility. Shams owns the contract and its fixture/tests. **When:** At the contract/input review and again before package acceptance after the listed prerequisites are available. **Deliver:** `reviews/c03-mahrous.md — Matching/closure review and disposition`. **Review:** Shams records findings and disposition; unresolved safety, identity or contract blockers prevent acceptance.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Define Asset Observation Fields & Validate Stable Identity. **When:** At the input/fixture review and again before C03 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c03-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- 6 November 2026: primary ownership transferred from Mahrous to Shams at Mahrous’s request to consolidate asset responsibility. Own the asset-observation contract, stable-identity rules, example payloads and validation tests used by all asset adapters. Earlier work retains actual authorship; existing dependencies, deliverables, acceptance and completion state are retained.
- 6 November: strengthen asset research with decision evidence, comparison/failure cases, consumer review and reproducible references. Existing ownership, scope gates and delivery acceptance remain in force.

### Inputs

- three example asset exports

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Define stable asset id, source-specific identity, timestamps, trust level, os release, architecture, package namespace/version, firmware model/train
3. Keep raw evidence reference and collection errors
4. Validate three fixture payloads against the versioned schema and document required versus optional fields
5. Define changed-ip and duplicate handling
6. Research decision gate: Compare candidate identity rules and required/optional fields against a fixture matrix; document the rejected rules and unresolved collisions. Save docs/research/assets/c03-decision-brief.md and docs/research/assets/c03-evidence-matrix.csv. Mahrous reviews matching sufficiency; Omar reproduces schema validation and ingestion compatibility. Start with C03 schema/identity desk research and labelled fixtures. C01 still gates approved-scope acceptance.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous + Omar review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Versioned JSON observation schema coordinated with P02; enrollment identity and evidence references are explicit. This is the domain specification, not a second platform schema engine.

### Expected Deliverables

- `contracts/v1/inventory-snapshot.schema.json`
- `fixtures/inventory/profile-examples.jsonl`
- `docs/asset-identity-rules.md`
- `tests/contracts/test_inventory_snapshot.py`
- `docs/research/assets/c03-decision-brief.md`
- `docs/research/assets/c03-evidence-matrix.csv`

### Testing

1. Validate complete and partial observations for each selected profile
2. Keep two identities at one reused IP separate
3. Reimport old evidence and preserve its original collected_at
4. Reproduce one selected research claim from its cited source or authorized fixture, and verify that missing/contradictory evidence remains explicit.

### Acceptance Criteria

- Incomplete data remains unknown
- Same ip on two identities is not silently merged
- All observations preserve provenance
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- The asset research brief and evidence matrix justify the chosen approach, identify a rejected/unavailable alternative, link tested or not-run cases, and record the named consumer reviewers’ findings and disposition.

### Risks / Failure Modes

- host identity spoofing
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

reconcile against enrolled key/approved identity and flag conflict

### Next Dependent Work

D08, C04, C05, C06, C07, C08, C15, P02, D17

### Related Decisions

ADR06, ADR07

### C04 — Implement Bounded Network Discovery & Parse Structured Results

**Goal:** Discover approved lab endpoints and service hints without treating banners as installed-package proof.

**Why This Matters:** Finds reachable lab assets and services without pretending banners prove vulnerability.

**Owner:** Shams

**Support:** Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: C01, C02, C03 (planned; no completion reported).

**Depends on:** C01, C02, C03

**Unlocks:** C16

**Parallel with:** D01, D02, D03, D04

**Critical path:** Yes

**First action:** Wrap separately installed scanner using fixed argument arrays

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details. Asset research mandate: Select bounded discovery profiles using measured coverage, disruption limits and explicit evidence limitations. For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

- Which conservative Nmap profile fits each approved device class?
- Which probes and ports must be excluded, including fragile printer services?
- Which installation and redistribution constraints apply to Nmap/Npcap?
- Which probe choices and exclusions are justified for each approved lab device class, including fragile or unsupported devices?
- How do candidate bounded profiles compare on observed targets, traffic, duration, timeouts and identification uncertainty?
- Which discovery results can propose an asset and which require authenticated/offline confirmation before asserting its OS or package identity?

Sources: CY-S01, CY-S02

- [Nmap host discovery controls](https://nmap.org/book/host-discovery-controls.html): Compare discovery controls and uncertainty within the approved lab. Official source checked 6 November; qualification must match the installed tool and selected profile.
- [Nmap service/version detection](https://nmap.org/book/man-version-detection.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.

### Research decision and consumer handoff

Select bounded discovery profiles using measured coverage, disruption limits and explicit evidence limitations.

Compare saved-result parsing and approved lab profiles under the same declared target set; record coverage and failure counts separately. Never test unapproved targets.

Failure cases:
- Out-of-scope target rejected before contact
- Fragile-device exclusion
- Timeout/cancel with partial results
- Conflicting banner and authenticated identity

Who uses the findings:
- C05/C07: which assets require authenticated collection or offline evidence
- Mahrous / D08: uncertainty flags rather than banner-derived certainty
- Amr / C02 and Mahrous / C01: evidence that discovery respects the approved lab and safety boundary

Review: Mahrous reviews scope/safety and evidence limits; Amr verifies the approved lab conditions.

Starting gate: Desk research and saved fixtures can start now; live comparisons require C01/C02/C03 and explicit authorized targets.

[Blank decision brief](research/assets/C04-brief-template.md) · [Blank evidence matrix](research/assets/C04-evidence-template.csv)

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Implement Bounded Network Discovery & Parse Structured Results. **When:** At the input/fixture review and again before C04 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c04-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- 6 November: strengthen asset research with decision evidence, comparison/failure cases, consumer review and reproducible references. Existing ownership, scope gates and delivery acceptance remain in force.

### Inputs

- allowlisted lab range/profile

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Wrap separately installed scanner using fixed argument arrays
3. Enforce time/concurrency limits
4. Collect structured output
5. Normalize host/service hints
6. Support cancellation
7. Preserve raw result
8. Research decision gate: Compare saved-result parsing and approved lab profiles under the same declared target set; record coverage and failure counts separately. Never test unapproved targets. Save docs/research/assets/c04-decision-brief.md and docs/research/assets/c04-evidence-matrix.csv. Mahrous reviews scope/safety and evidence limits; Amr verifies the approved lab conditions. Desk research and saved fixtures can start now; live comparisons require C01/C02/C03 and explicit authorized targets.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Separately installed Nmap with fixed argument arrays, exclusions, time and concurrency limits. No blanket aggressive script profile; product redistribution is a separate licensing gate.

### Expected Deliverables

- `runner/adapters/discovery.py`
- `config/discovery-profiles.yaml`
- `fixtures/discovery/structured-results.xml`
- `tests/runner/test_discovery.py`
- `docs/runbooks/discovery.md`
- `docs/research/assets/c04-decision-brief.md`
- `docs/research/assets/c04-evidence-matrix.csv`

### Testing

1. Run against only the allowlisted lab and record contacted targets
2. Cancel or time out a run and retain partial/failed status
3. Parse a saved result without claiming banner data proves remediation
4. Reproduce one selected research claim from its cited source or authorized fixture, and verify that missing/contradictory evidence remains explicit.

### Acceptance Criteria

- Zero out-of-scope connections in lab controls
- Timeout produces partial/failed status
- No blanket aggressive scripts/allports profile
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- The asset research brief and evidence matrix justify the chosen approach, identify a rejected/unavailable alternative, link tested or not-run cases, and record the named consumer reviewers’ findings and disposition.

### Risks / Failure Modes

- banner ambiguity and fragile devices
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

discovery-only or approved inventory import

### Next Dependent Work

C16

### Related Decisions

ADR06, ADR07

### C05 — Collect Ubuntu OS and Package Evidence Through Authenticated SSH

**Goal:** Produce a trustworthy Ubuntu observation containing full package revisions and collection errors.

**Why This Matters:** Supplies precise distro/package evidence needed for applicability.

**Owner:** Shams

**Support:** Mahrous, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: C02, C03 (planned; no completion reported).

**Depends on:** C02, C03

**Unlocks:** D09, C08, C11, C16

**Parallel with:** D01, D02, D03, D04

**Critical path:** Yes

**First action:** Verify the Ubuntu lab host's SSH key against its approved identity before attempting authenticated collection.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details. Asset research mandate: Choose and implement the smallest trustworthy Ubuntu inventory collection method. For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

- Which native output exposes distro release, architecture and binary/source package identity?
- What minimum read permissions are needed?
- How will host-key verification, command failures and redaction be enforced?
- Which measured asset fields can populate A02 without introducing invented business context?
- Which native evidence distinguishes distro/build, architecture, binary/source package identity and installed versus running state for the chosen lab profile?
- What is the least permission needed for each field, and what should the adapter report when a field is denied or unavailable?
- How do candidate read-only collection approaches compare with a preserved native export on field coverage, discrepancies, duration and failure behavior?

Sources: CY-S03, CY-S05

- [Ubuntu 22.04 dpkg-query manual](https://manpages.ubuntu.com/manpages/jammy/man1/dpkg-query.1.html): Investigate explicit inventory output fields and binary/source package identity; build a read-only collection fixture. Pinned Jammy manual checked 6 November; verify the actual target and tool version.
- [Wazuh system inventory](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/index.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.

### Research decision and consumer handoff

Choose and implement the smallest trustworthy Ubuntu inventory collection method.

Use the same authorized Ubuntu snapshot for each available candidate; compare against a preserved native export, record disagreements, and select a method with stated limitations.

Failure cases:
- Denied field or invalid credentials
- Host-key mismatch
- Partial output and command failure
- Missing source-package identity
- Stale observation and installed/running discrepancy

Who uses the findings:
- Mahrous / C08/D09: reproducible asset facts with provenance and missing-field masks
- C13: independent before/after observations with stable asset identity
- Hams / A02: measured asset inputs only; no invented business context

Review: Mahrous reviews matching-input sufficiency; Amr confirms lab access and execution separation; Omar checks ingestion.

Starting gate: After the C03 first pass, prepare collector fixtures. Real collection requires C02/C03 and the approved scope; Shams does not build Amr’s advisory collectors.

[Blank decision brief](research/assets/C05-brief-template.md) · [Blank evidence matrix](research/assets/C05-evidence-template.csv)

### Support Contributions and Handoff

- **Mahrous**: Verify applicability-relevant fields and authorized scope. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/c05-mahrous.md — Verify applicability-relevant fields and authorized scope.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Hams**: Specify ranking experiment fields and distinguish observed facts from scenario assumptions. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/c05-hams.md — Specify ranking experiment fields and distinguish observed facts from scenario assumptions.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- 29 October: explicit cross-functional AI prioritization/remediation handoff; existing domain ownership retained.
- 6 November: strengthen asset research with decision evidence, comparison/failure cases, consumer review and reproducible references. Existing ownership, scope gates and delivery acceptance remain in force.

### Inputs

- pinned lab Ubuntu and read-only credentials

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Verify host key
3. Collect os release/arch/full installed package revisions and selected services
4. Capture errors
5. Avoid user files and broad environment dumps
6. Normalize
7. Research decision gate: Use the same authorized Ubuntu snapshot for each available candidate; compare against a preserved native export, record disagreements, and select a method with stated limitations. Save docs/research/assets/c05-decision-brief.md and docs/research/assets/c05-evidence-matrix.csv. Mahrous reviews matching-input sufficiency; Amr confirms lab access and execution separation; Omar checks ingestion. After the C03 first pass, prepare collector fixtures. Real collection requires C02/C03 and the approved scope; Shams does not build Amr’s advisory collectors.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.
9. Provide Shams’s existing authorized inventory snapshots to the A02 prioritization bundle, including observation age, exposure evidence and explicit unavailable fields; business criticality must come from reviewed context, not port guesses.

### Technical Approach

Existing Design Decision: Authenticated SSH with host-key verification and structured native inventory. Choose parser/dependency versions in the lab spike; avoid broad shell/environment dumps.

### Expected Deliverables

- `runner/adapters/ubuntu_inventory.py`
- `fixtures/inventory/ubuntu-native-export.json`
- `tests/runner/test_ubuntu_inventory.py`
- `docs/runbooks/ubuntu-collection.md`
- `datasets/prioritization/asset-evidence-manifest.json`
- `docs/research/assets/c05-decision-brief.md`
- `docs/research/assets/c05-evidence-matrix.csv`

### Testing

1. Compare collected package versions with a native ground-truth export
2. Use invalid credentials and expect an explicit failed observation
3. Inspect logs and exported fixtures for credentials and unnecessary user data
4. Cross-check observation IDs against A02 scenarios.
5. Reproduce one selected research claim from its cited source or authorized fixture, and verify that missing/contradictory evidence remains explicit.

### Acceptance Criteria

- Installed packages match native ground-truth export
- Expired credentials are an error not empty inventory
- Secrets absent from logs
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Asset-field coverage and observation-age distribution
- The asset research brief and evidence matrix justify the chosen approach, identify a rejected/unavailable alternative, link tested or not-run cases, and record the named consumer reviewers’ findings and disposition.

### Risks / Failure Modes

- permission gaps or command parsing drift
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

signed native JSON/export import

### Next Dependent Work

D09, C08, C11, C16

### Related Decisions

ADR06, ADR07

### C06 — Compare Windows Inventory Options & Implement One Adapter

**Goal:** Select one validated Windows inventory path that provides the fields needed by the matching contract.

**Why This Matters:** Selects one Windows inventory path using measured coverage and resource cost.

**Owner:** Shams

**Support:** Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Deferred extension

**Gate:** G1

**Start condition:** Blocked by: C03 (planned; no completion reported).

**Depends on:** C03

**Unlocks:** C14

**Parallel with:** D01, D02, D03, D04

**Critical path:** No

**First action:** Compare osquery export and wazuh syscollector for os build, packages, update fields, footprint and permissions

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details. Asset research mandate: Qualify one Windows inventory approach only if the deferred extension is approved. For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

- Does osquery or existing Wazuh Syscollector expose the required build, package and update fields?
- What permissions, enrollment and transport work does each option require?
- What are the measured CPU/RAM and collection-time costs on the same target?
- For the exact Windows target, which candidate exposes the required OS/build/package/update fields, and what remains unavailable?
- What enrollment, privileges, transport, maintenance and redistribution constraints would each available candidate introduce?
- On the same authorized target, how do candidates differ in measured field completeness, collection time, CPU/RAM and explicit failures?

Sources: CY-S08, CY-S09, CY-S10, CY-S11

- [Microsoft Win32_QuickFixEngineering reference](https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-quickfixengineering): Investigate documented update-inventory coverage limits before choosing a Windows collection method. Official source checked 6 November; this alone is not a complete inventory or vulnerability verdict.
- [osquery documentation](https://osquery.readthedocs.io/en/stable/): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.
- [Wazuh inventory compatibility matrix](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/compatibility-matrix.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.

### Research decision and consumer handoff

Qualify one Windows inventory approach only if the deferred extension is approved.

Create a decision table for the existing Wazuh/osquery/native options; mark unavailable measurements as not run. Implement one justified option, rather than several competing adapters.

Failure cases:
- Missing build/update field
- Insufficient permission or failed transport
- Duplicate or changed host identity
- Missing or conflicting inventory entry

Who uses the findings:
- Omar / P02: mapped Windows observation contract
- Mahrous / D08/D09: declared identity and applicability gaps
- Team scope review: evidence to enable, defer or reject the extension

Review: Omar reviews integration/operating burden; Mahrous reviews matching coverage; Amr supplies only agreed lab/access help.

Starting gate: Deferred extension: keep to an initial evidence-gap/feasibility note until the scope gate and target access are agreed. Do not let this delay C03/C05.

[Blank decision brief](research/assets/C06-brief-template.md) · [Blank evidence matrix](research/assets/C06-evidence-template.csv)

### Support Contributions and Handoff

- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Compare Windows Inventory Options & Implement One Adapter. **When:** At the input/fixture review and again before C06 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c06-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- 6 November: strengthen asset research with decision evidence, comparison/failure cases, consumer review and reproducible references. Existing ownership, scope gates and delivery acceptance remain in force.

### Inputs

- identical Windows fixture

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Compare osquery export and wazuh syscollector for os build, packages, update fields, footprint and permissions
3. Measure collection time
4. Choose one
5. Implement field mapping and missing-field flags
6. Research decision gate: Create a decision table for the existing Wazuh/osquery/native options; mark unavailable measurements as not run. Implement one justified option, rather than several competing adapters. Save docs/research/assets/c06-decision-brief.md and docs/research/assets/c06-evidence-matrix.csv. Omar reviews integration/operating burden; Mahrous reviews matching coverage; Amr supplies only agreed lab/access help. Deferred extension: keep to an initial evidence-gap/feasibility note until the scope gate and target access are agreed. Do not let this delay C03/C05.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar review the handoff before declaring completion.

### Technical Approach

Needs Validation: Experimental Decision: compare osquery and Wazuh, prefer existing deployment where justified, then implement one primary adapter. A recorded export is not live Windows validation.

### Expected Deliverables

- `experiments/windows_inventory_comparison.py`
- `reports/windows-inventory-choice.md`
- `runner/adapters/windows_inventory.py`
- `fixtures/inventory/windows-export.json`
- `tests/runner/test_windows_inventory.py`
- `docs/research/assets/c06-decision-brief.md`
- `docs/research/assets/c06-evidence-matrix.csv`

### Testing

1. Collect the same target with the candidate methods where available
2. Document missing fields and footprint rather than guessing equivalence
3. Map the selected export into the shared observation schema
4. Reproduce one selected research claim from its cited source or authorized fixture, and verify that missing/contradictory evidence remains explicit.

### Acceptance Criteria

- Documented coverage/missing fields and measured resource cost
- No agent choice based only on popularity
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- The asset research brief and evidence matrix justify the chosen approach, identify a rejected/unavailable alternative, link tested or not-run cases, and record the named consumer reviewers’ findings and disposition.

### Risks / Failure Modes

- image licensing or hardware unavailable
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

schema-tested recorded Windows export while labeling live Windows validation pending

### Next Dependent Work

C14

### Related Decisions

ADR06, ADR07

### C07 — Import Offline and Appliance Evidence With Freshness Labels

**Goal:** Accept a supported vendor export or manual snapshot while clearly showing what cannot be observed live.

**Why This Matters:** Supports assets that cannot safely or directly be scanned.

**Owner:** Shams

**Support:** Amr

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Conditional FortiOS profile

**Gate:** G3

**Start condition:** Blocked by: C03 (planned; no completion reported).

**Depends on:** C03

**Unlocks:** 

**Parallel with:** D01, D02, D03, D04

**Critical path:** No

**First action:** List the exact appliance model, firmware train, hardware revision and original collection timestamp required by the import fixture.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details. Asset research mandate: Define a trustworthy offline/appliance evidence import without pretending that a stale export is a live observation. For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

- Which exact model, firmware train and hardware revision identify the test appliance?
- How can timestamp, operator and integrity hash be preserved?
- Which import fields are needed to resolve a match and which remain unknown?
- Which exact model, firmware train, hardware revision, original capture time and source artifact are necessary for the selected appliance identity?
- Which available authorized export/manual-entry paths preserve those fields and integrity, and which ambiguities must remain unknown?
- How should importer validation handle stale, incomplete, malformed, oversized or conflicting evidence while retaining the original timestamp and operator/source provenance?

Sources: CY-S02, CY-S12, MR05

- [Fortinet FortiOS 7.4 CLI troubleshooting reference](https://docs.fortinet.com/document/fortigate/7.4.0/cli-troubleshooting-cheat-sheet/420966): Locate vendor-documented system-identity evidence; identify the fields still missing from an authorized export. Versioned official search reference verified 6 November; use the manual matching the actual model/firmware.
- [NIST SP 800-82 Rev 3](https://csrc.nist.gov/pubs/sp/800/82/r3/final): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.

### Research decision and consumer handoff

Define a trustworthy offline/appliance evidence import without pretending that a stale export is a live observation.

Compare the permitted evidence paths for the selected appliance using sanitized fixtures. Separate importer behavior evidence from vendor vulnerability/advisory content, which Amr owns.

Failure cases:
- Old snapshot imported today
- Missing model/train/revision
- Conflicting exports for one device
- Malformed/oversized input
- Sensitive fields requiring redaction

Who uses the findings:
- Mahrous / D08/D09: trustworthy appliance identity with explicit unresolved gaps
- Omar / P07/P08: import/ingestion errors and provenance
- Amr: asset identity handoff for his existing vendor-advisory work

Review: Mahrous reviews matching gaps; Omar reviews import validation and evidence handling; Amr reviews the vendor-input boundary.

Starting gate: Conditional capability: establish the required evidence checklist first; full appliance research/import qualification requires the existing scope and access gates.

[Blank decision brief](research/assets/C07-brief-template.md) · [Blank evidence matrix](research/assets/C07-evidence-template.csv)

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Import Offline and Appliance Evidence With Freshness Labels. **When:** At the input/fixture review and again before C07 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c07-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Imports and supported identity evidence address scan restrictions without pretending universal device support.
- 6 November: strengthen asset research with decision evidence, comparison/failure cases, consumer review and reproducible references. Existing ownership, scope gates and delivery acceptance remain in force.

### Inputs

- one vendor export and offline JSON fixture

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Define model/firmware fields
3. Import hash/timestamp/operator
4. Validate schema and size
5. Map only supported product identity
6. Surface stale data and requests for missing evidence
7. Implement a reviewed FortiOS import profile with exact model, train/build, collection time and configuration evidence requirements; no public-internet exposure is needed for a local import.
8. For isolated or fragile devices, show unsupported/manual-evidence/unknown capability honestly. Reachability, credentials, protocol support, vendor terms and OT safety can each prevent active collection.
9. Research decision gate: Compare the permitted evidence paths for the selected appliance using sanitized fixtures. Separate importer behavior evidence from vendor vulnerability/advisory content, which Amr owns. Save docs/research/assets/c07-decision-brief.md and docs/research/assets/c07-evidence-matrix.csv. Mahrous reviews matching gaps; Omar reviews import validation and evidence handling; Amr reviews the vendor-input boundary. Conditional capability: establish the required evidence checklist first; full appliance research/import qualification requires the existing scope and access gates.
10. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Validated JSON/vendor-export adapter with bounded uploads and explicit manual/import labels. General OT active scanning and universal firmware updating remain out of scope.

### Expected Deliverables

- `backend/app/inventory/imports.py`
- `fixtures/imports/offline-appliance.json`
- `contracts/v1/evidence-import.schema.json`
- `tests/inventory/test_imports.py`
- `docs/offline-evidence-guide.md`
- `docs/research/assets/c07-decision-brief.md`
- `docs/research/assets/c07-evidence-matrix.csv`

### Testing

1. Import an old snapshot and verify it remains stale
2. Reject malformed or oversized input
3. Import incomplete firmware identity and show unknown rather than a clean result
4. Reproduce one selected research claim from its cited source or authorized fixture, and verify that missing/contradictory evidence remains explicit.

### Acceptance Criteria

- Unknown firmware remains unresolved
- Expired evidence never becomes fresh through re-import
- Imported labels remain distinct from scanned labels
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- The asset research brief and evidence matrix justify the chosen approach, identify a rejected/unavailable alternative, link tested or not-run cases, and record the named consumer reviewers’ findings and disposition.

### Risks / Failure Modes

- vendor-specific formats
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

reviewed structured manual entry

### Next Dependent Work



### Related Decisions

ADR06, ADR07, ADR21

### C13 — Verify Remediation Independently & Rehearse Recovery

**Goal:** Build independent post-remediation asset verification using fresh inventory and service health. Amr owns patch/recovery execution; Mahrous reviews matching, closure and recurrence decisions.

**Why This Matters:** Proves remediation and service health rather than trusting exit codes.

**Owner:** Shams

**Support:** Amr, Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: C08, C11, C12 (planned; no completion reported).

**Depends on:** C08, C11, C12

**Unlocks:** C14, C16, P15

**Parallel with:** D04, D16, C04, C06

**Critical path:** Yes

**First action:** Collect fresh evidence independent of executor's success flag

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details. Asset research mandate: Choose independent asset and health checks that can challenge a successful patch-executor result. For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

- Which installed versus running version checks matter for the chosen update?
- What independent health check detects a broken service despite exit code zero?
- Which restore, downgrade or forward-fix path is actually supported?
- Which fresh installed/running-state and health checks distinguish a successful update, a broken service, incomplete restart and insufficient evidence?
- How can verification collect evidence independently from the executor success flag and link it to the same asset without rewriting earlier observations?
- After Amr executes the authorized recovery fixture, which observations support closure, continuing uncertainty or a reopened/linked finding episode?

Sources: CY-S03, CY-S06

- [NIST SP 800-40 Rev 4](https://csrc.nist.gov/pubs/sp/800/40/r4/final): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.
- [Ubuntu 22.04 dpkg-query manual](https://manpages.ubuntu.com/manpages/jammy/man1/dpkg-query.1.html): Investigate explicit inventory output fields and binary/source package identity; build a read-only collection fixture. Pinned Jammy manual checked 6 November; verify the actual target and tool version.

### Research decision and consumer handoff

Choose independent asset and health checks that can challenge a successful patch-executor result.

Predeclare expected outcomes, then compare executor-only success with independent fresh asset and service evidence on the same approved fixtures; disclose every disagreement and unresolved case.

Failure cases:
- Exit code zero but failed health check
- Updated package with stale/running state
- Missing or stale post-observation
- Recovery restores an old vulnerable version
- Identity mismatch between pre/post snapshots

Who uses the findings:
- Mahrous: justified reassessment, closure and recurrence decisions
- Amr / C11/C12/C14: verification failures and evidence from his execution/recovery operations
- C16: independently reproducible verification evidence and honest limitations

Review: Mahrous signs off matching/closure expectations; Amr performs and documents authorized patch/recovery operations. Shams owns independent collection and verification code/results.

Starting gate: Draft the check-selection matrix and failure fixtures now. Measured verification waits for C08/C11/C12; do not duplicate Amr’s execution or recovery runner.

[Blank decision brief](research/assets/C13-brief-template.md) · [Blank evidence matrix](research/assets/C13-evidence-template.csv)

### Support Contributions and Handoff

- **Amr**: Execute the authorized patch/recovery rehearsal through C11/C12/C14, supply runner/recovery evidence, and review environmental assumptions. Shams independently recollects and verifies asset state; she does not duplicate the execution runner. **When:** At the input/fixture review and again before C13 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c13-amr.md — Reproducible observation/runner evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review matching/reassessment, closure and recurrence decisions against independent fresh asset evidence. Shams owns the verification component; Amr runs authorized patch/recovery operations through C11/C12/C14. **When:** At the contract/input review and again before package acceptance after the listed prerequisites are available. **Deliver:** `reviews/c13-mahrous.md — Matching/closure review and disposition`. **Review:** Shams records findings and disposition; unresolved safety, identity or contract blockers prevent acceptance.

### Scope Revision

- Verified closure is the boundary needed for credible recurrence and root-cause review.
- 6 November 2026: primary ownership transferred from Mahrous to Shams at Mahrous’s request to consolidate asset responsibility. Own independent post-remediation asset evidence, verification code and tests. Amr retains execution and recovery operations; Mahrous reviews applicability and closure decisions. Earlier work retains actual authorship; existing dependencies, deliverables, acceptance and completion state are retained.
- 6 November: strengthen asset research with decision evidence, comparison/failure cases, consumer review and reproducible references. Existing ownership, scope gates and delivery acceptance remain in force.

### Inputs

- post-execution observation and health checks

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Collect fresh evidence independent of executor's success flag
3. Reevaluate finding
4. Compare running and installed state where needed
5. Perform service checks
6. Close only on sufficient evidence
7. Verify fresh asset and service evidence before and after the chosen recovery fixture; Amr executes authorized rollback/restore through C12/C14 and Shams records the verification outcome
8. Record verified closure with independent inventory and service health. If the finding later recurs, preserve the closed episode and open a linked episode for investigation rather than editing history.
9. Research decision gate: Predeclare expected outcomes, then compare executor-only success with independent fresh asset and service evidence on the same approved fixtures; disclose every disagreement and unresolved case. Save docs/research/assets/c13-decision-brief.md and docs/research/assets/c13-evidence-matrix.csv. Mahrous signs off matching/closure expectations; Amr performs and documents authorized patch/recovery operations. Shams owns independent collection and verification code/results. Draft the check-selection matrix and failure fixtures now. Measured verification waits for C08/C11/C12; do not duplicate Amr’s execution or recovery runner.
10. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Independent collection and deterministic reassessment plus adapter-specific service checks. No universal rollback claim; recovery must be rehearsed for the selected lab target.

### Expected Deliverables

- `backend/app/remediation/verification.py`
- `lab/recovery-matrix.md`
- `fixtures/patch/postcheck-results.jsonl`
- `tests/remediation/test_verification.py`
- `reports/recovery-drill.md`
- `docs/research/assets/c13-decision-brief.md`
- `docs/research/assets/c13-evidence-matrix.csv`

### Testing

1. Return package exit zero with a failed health check and keep the finding open
2. Restore an old vulnerable version and expect the finding to reopen
3. Run a clean post-observation and verify its source/evidence links
4. Reproduce one selected research claim from its cited source or authorized fixture, and verify that missing/contradictory evidence remains explicit.

### Acceptance Criteria

- Successful package exit plus failing health remains unresolved
- No universal rollback promise
- Restored old vulnerable version reopens finding
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- The asset research brief and evidence matrix justify the chosen approach, identify a rejected/unavailable alternative, link tested or not-run cases, and record the named consumer reviewers’ findings and disposition.

### Risks / Failure Modes

- snapshot loses data or package downgrade unsupported
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

tested restore/rebuild or documented forward-fix

### Next Dependent Work

C14, C16, P15

### Related Decisions

ADR06, ADR07

## Starting sequence

- **C03**: Prepare the observation schema, stable-identity rules and three validation fixtures first. Full acceptance requires the C01 approved scope; preserve unknown/error fields rather than inventing missing evidence.
- **C05**: Build the Ubuntu inventory adapter against C03 fixtures, then run authorized collection once Amr’s C02 lab and the C03 contract are ready.
- **C04**: Build bounded discovery after C01/C02/C03; test identity changes and collection errors. Reuse the approved lab and scope.
- **C13**: Draft postcheck/failure fixtures now. Run independent verification only after C08/C11/C12; Amr performs patch/recovery operations and Mahrous reviews closure rules.

## Ownership decisions

- **C03**: Mahrous → Shams. Own the asset-observation contract, stable-identity rules, example payloads and validation tests used by all asset adapters.
- **C13**: Mahrous → Shams. Own independent post-remediation asset evidence, verification code and tests. Amr retains execution and recovery operations; Mahrous reviews applicability and closure decisions.

## Supporting packages

### D05 — Build the Ubuntu Affected-and-Fixed Package Catalog

Primary owner: Amr. Shams: supporting contribution. Stage: G1; Current core.
Prerequisites: D02 / Amr, P03 / Omar.

Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Build the Ubuntu Affected-and-Fixed Package Catalog.

When: At the input/fixture review and again before D05 acceptance; coordinate after its prerequisites are available.

Shams’s review handoff: `reviews/d05-shams.md — Reproducible observation evidence and failing edge cases`.

Review acceptance: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

Package deliverables (primary owner remains accountable):
- `backend/app/intelligence/adapters/ubuntu_osv.py`
- `fixtures/ubuntu/fixed-unfixed-backport.jsonl`
- `docs/ubuntu-field-mapping.md`
- `tests/intelligence/test_ubuntu_catalog.py`

Package acceptance:
- A backported fix is not incorrectly flagged from upstream version alone.
- Wrong distro release never receives another release’s patch.
- Unfixed public CVE remains visible even when absent from fix-only notices.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### D06 — Validate Microsoft and Red Hat Data & Add Scoped Vendor Adapters

Primary owner: Amr. Shams: supporting contribution. Stage: G3; Deferred extension.
Prerequisites: D05 / Amr.

Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Validate Microsoft and Red Hat Data & Add Scoped Vendor Adapters.

When: At the input/fixture review and again before D06 acceptance; coordinate after its prerequisites are available.

Shams’s review handoff: `reviews/d06-shams.md — Reproducible observation evidence and failing edge cases`.

Review acceptance: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

Package deliverables (primary owner remains accountable):
- `backend/app/intelligence/adapters/msrc.py`
- `backend/app/intelligence/adapters/redhat.py`
- `fixtures/vendors/windows-rhel.jsonl`
- `docs/adr/vendor-expansion.md`
- `tests/intelligence/test_vendor_profiles.py`

Package acceptance:
- Missing KB alone is not treated as vulnerability if a superseding update applies.
- Red Hat backports respect product stream and architecture.
- No claim of universal Windows or Linux support.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### D08 — Normalize Asset Product Identities & Generate Matching Candidates

Primary owner: Mahrous. Shams: supporting contribution. Stage: G1; Current core.
Prerequisites: D02 / Amr, D05 / Amr, C03 / Shams.

Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Normalize Asset Product Identities & Generate Matching Candidates.

When: At the input/fixture review and again before D08 acceptance; coordinate after its prerequisites are available.

Shams’s review handoff: `reviews/d08-shams.md — Reproducible observation evidence and failing edge cases`.

Review acceptance: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

Package deliverables (primary owner remains accountable):
- `backend/app/assessment/identity.py`
- `fixtures/identity/product-collisions.jsonl`
- `contracts/v1/product-identity.schema.json`
- `tests/assessment/test_identity.py`

Package acceptance:
- IP reuse does not merge two assets.
- Same package name across ecosystems remains separate.
- Unknown version yields candidate/needs_evidence rather than confirmed vulnerable.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### D14 — Build a Versioned Catalog of Vendor Fixes and Mitigations

Primary owner: Amr. Shams: supporting contribution. Stage: G2; Current core.
Prerequisites: D05 / Amr, D09 / Mahrous.

Check real/lab asset evidence and practical preflight inputs; no FortiOS mutation implied.

When: Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts.

Shams’s review handoff: `reviews/d14-shams.md — Check real/lab asset evidence and practical preflight inputs; no FortiOS mutation implied.`.

Review acceptance: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

Package deliverables (primary owner remains accountable):
- `backend/app/remediation/catalog.py`
- `contracts/v1/remediation-candidate.schema.json`
- `fixtures/remediation/vendor-candidates.jsonl`
- `tests/remediation/test_catalog.py`
- `docs/remediation-source-map.md`
- `datasets/remediation/vendor-guidance-cases.jsonl`

Package acceptance:
- Latest version is not automatically recommended over supported compatible fix.
- No fix yields mitigation/manual escalation, not invented patch.
- Missing prerequisites block execution approval.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Appliance remedies remain reviewed recommendations/import evidence; this release has no automatic FortiOS execution adapter.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Supported factual-field coverage; wrong-version/path count

### D15 — Create Independent Matching Ground Truth & Measure Errors

Primary owner: Mahrous. Shams: supporting contribution. Stage: G1; Current core.
Prerequisites: D05 / Amr, D09 / Mahrous.

Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Create Independent Matching Ground Truth & Measure Errors.

When: At the input/fixture review and again before D15 acceptance; coordinate after its prerequisites are available.

Shams’s review handoff: `reviews/d15-shams.md — Reproducible observation evidence and failing edge cases`.

Review acceptance: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

Package deliverables (primary owner remains accountable):
- `evaluation/matching/gold.jsonl`
- `evaluation/matching/annotation-guide.md`
- `experiments/evaluate_matching.py`
- `evaluation/matching/results.json`
- `reports/matching-benchmark.md`

Package acceptance:
- ≥90% known-vulnerability lab detection remains a target, not claimed result.
- Ground truth reviewer differs from engine author where possible.
- All reported metrics state dataset size, scope and date.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Known ground truth is not generated by the same LLM or rule implementation being evaluated.

### C01 — Define Allowed Lab Targets & Enforce Scan Safety Rules

Primary owner: Mahrous. Shams: supporting contribution. Stage: G0; Current core.
Prerequisites: None.

Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Define Allowed Lab Targets & Enforce Scan Safety Rules.

When: At the input/fixture review and again before C01 acceptance; coordinate after its prerequisites are available.

Shams’s review handoff: `reviews/c01-shams.md — Reproducible observation evidence and failing edge cases`.

Review acceptance: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

Package deliverables (primary owner remains accountable):
- `config/lab-scope.yaml`
- `docs/lab-capability-matrix.md`
- `runner/scope_guard.py`
- `tests/runner/test_scope_guard.py`

Package acceptance:
- Out-of-scope target and excluded device classes are rejected before any connector call
- Unknown class defaults to no active probe
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Every profile has explicit capability gates, allowed collection paths and unsupported actions.

### C16 — Publish Supported-Coverage Results & Reproduce the End-to-End Demo

Primary owner: Mahrous. Shams: supporting contribution. Stage: G4; Current core.
Prerequisites: C04 / Shams, C05 / Shams, C08 / Mahrous, C13 / Shams, C15 / Mahrous, D15 / Mahrous.

Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance.

When: At the input/fixture review and again before C16 acceptance; coordinate after its prerequisites are available.

Shams’s review handoff: `reviews/c16-shams.md — Reproducible asset observation evidence`.

Review acceptance: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

Package deliverables (primary owner remains accountable):
- `experiments/evaluate_lab.py`
- `reports/coverage-benchmark.md`
- `reports/demo-evidence-manifest.json`
- `docs/runbooks/final-demo.md`
- `reports/known-limitations.md`

Package acceptance:
- Proposal ≥90% detection goal reported only on declared known lab vulnerabilities, with denominator and failure cases
- Actual siem event and one verified remediation demonstrated
- No product-wide claims from tiny lab
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### A02 — Create Versioned Training and Evidence Datasets With Provenance

Primary owner: Hams. Shams: supporting contribution. Stage: G0; Current core.
Prerequisites: A01 / Hams.

Coordinate and assemble vulnerability, asset and contextual inputs; validate joins, timestamps, missingness and data readiness, reusing existing collectors.

When: Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts.

Shams’s review handoff: `reviews/a02-shams.md — Coordinate and assemble vulnerability, asset and contextual inputs; validate joins, timestamps, missingness and data readiness, reusing existing collectors.`.

Review acceptance: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

Package deliverables (primary owner remains accountable):
- `datasets/manifests/corpus-v1.json`
- `datasets/raw/advisories.jsonl`
- `datasets/labels/review-queue.jsonl`
- `scripts/ai/build_dataset.py`
- `docs/ai/dataset-card.md`
- `ai/data/origin-and-rights-manifest.csv`
- `datasets/prioritization/input-manifest.json`
- `datasets/prioritization/scenarios.jsonl`
- `datasets/prioritization/readiness-report.md`

Package acceptance:
- Every row links to retrievable source revision.
- Rebuilding from the manifest reproduces row counts/hashes.
- No sensitive inventory is added to public training exports.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Every sample has provenance, rights status and split membership; synthetic-only results are separately reported.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Field coverage and missing/stale/synthetic fractions per origin; reproducible row counts

### A11 — Generate Targeted Evidence Requests & Compare Constrained Fix Options

Primary owner: Hams. Shams: supporting contribution. Stage: G2; Current core.
Prerequisites: A10 / Omar, D14 / Amr, C10 / Mahrous.

Prepare representative lab/vendor inputs and check prerequisite/verification practicality without executing unapproved actions.

When: Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts.

Shams’s review handoff: `reviews/a11-shams.md — Prepare representative lab/vendor inputs and check prerequisite/verification practicality without executing unapproved actions.`.

Review acceptance: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

Package deliverables (primary owner remains accountable):
- `backend/app/ai_gateway/evidence_requests.py`
- `fixtures/assistant/missing-evidence.jsonl`
- `fixtures/assistant/remediation-comparisons.jsonl`
- `reports/ai/evidence-request-evaluation.md`
- `experiments/remediation/compare_guidance.py`
- `reports/remediation/grounding-and-usefulness.md`
- `datasets/remediation/claim-evidence-ledger.jsonl`

Package acceptance:
- No recommended version is invented.
- Missing-data advice identifies the next useful measurement.
- Patch execution remains outside LLM authority.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Recommendations preserve vendor constraints and identify missing prerequisites; a plausible narrative is not recorded as a confirmed cause.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Unsupported claims/total claims; exact fixed-version and path correctness; citation support rate; abstention coverage; unsafe instruction count; analyst task time and usefulness rubric

### A13 — Freeze Human Evaluation Questions, Rubrics and Final Holdout

Primary owner: Hams. Shams: supporting contribution. Stage: G2; Current core.
Prerequisites: A04 / Hams, A10 / Omar, A12 / Mahrous.

Freeze reproducible scenario inputs and identify unavailable/labelled synthetic evidence.

When: Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts.

Shams’s review handoff: `reviews/a13-shams.md — Freeze reproducible scenario inputs and identify unavailable/labelled synthetic evidence.`.

Review acceptance: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

Package deliverables (primary owner remains accountable):
- `evaluation/assistant/protocol.md`
- `evaluation/assistant/questions-frozen.jsonl`
- `evaluation/assistant/rubric.csv`
- `reports/ai/reviewer-agreement.md`
- `experiments/ai/score_human_results.py`
- `evaluation/prioritization/protocol.md`
- `evaluation/remediation/claim-rubric.md`

Package acceptance:
- No LLM-only ground truth.
- Denominators and class/language slices shown.
- Sample-size and convenience-user limitations explicit.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Scores identify denominators, reviewer agreement and critical errors; no universal 90% claim is inferred from a small lab.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: nDCG@10 and precision@10 with graded reference rubric; pairwise agreement; top-k overlap across repeats; constraint violations; timed paired differences and uncertainty

### A16 — Package Reproducible AI Experiments and a Faculty Demo

Primary owner: Hams. Shams: supporting contribution. Stage: G4; Current core.
Prerequisites: A15 / Hams.

Explain the provenance and data lineage of the preserved asset/research inputs during the faculty demo or labelled replay, as already named in the A16 fallback. Coordinate with Hams; Amr retains source-authority and rights review.

When: At final reproduction/demo rehearsal after A15 results and the A16 handover artifacts are available.

Shams’s review handoff: `reviews/a16-shams.md — Data-lineage walkthrough and observed/synthetic/missing-evidence review`.

Review acceptance: Hams records the review disposition. Trace one demo example to its source/observation revision, identify synthetic or missing data, and distinguish a labelled replay from a live result.

Package deliverables (primary owner remains accountable):
- `docs/runbooks/ai-reproduce.md`
- `reports/ai/final-model-card.md`
- `experiments/ai/reproduce_results.py`
- `reports/ai/artifact-manifest.json`
- `docs/ai/faculty-demo.md`

Package acceptance:
- Fresh setup reproduces baseline metrics within documented tolerance.
- Offline replay never presented as live intelligence.
- Another teammate can explain and run the pipeline.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### P02 — Publish Shared API Contracts and Validate Producer/Consumer Fixtures

Primary owner: Omar. Shams: supporting contribution. Stage: G0; Current core.
Prerequisites: P01 / Omar, C03 / Shams, D02 / Amr.

Supply AssetObservation/inventory fixtures from the authorized collector; validate stable identity, OS/package fields, collected_at, stale/failed collection and missing evidence. Coordinate C03 definitions with Mahrous.

When: At the input/fixture review and again before P02 acceptance; coordinate after its prerequisites are available.

Shams’s review handoff: `reviews/p02-shams.md — Reproducible observation evidence and failing edge cases`.

Review acceptance: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

Package deliverables (primary owner remains accountable):
- `contracts/v1/openapi.yaml`
- `contracts/v1/job.schema.json`
- `contracts/v1/errors.schema.json`
- `fixtures/contracts/producer-consumer.jsonl`
- `tests/contracts/test_boundaries.py`
- `contracts/handoff-manifest.json`
- `contracts/organization-context.schema.json`
- `contracts/ranked-remediation-action.schema.json`
- `contracts/deployment-capabilities.schema.json`

Package acceptance:
- Every owner accepts one fixture
- Breaking changes have version policy
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- AI and platform reference the same scope version, schema version and fixture manifest; unresolved profile fields have named owners.

### P06 — Connect One Real Asset From Ingestion to a Traceable Finding Screen

Primary owner: Omar. Shams: supporting contribution. Stage: G1; Current core.
Prerequisites: P03 / Omar, P05 / Omar, C08 / Mahrous, P04 / Omar.

Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Connect One Real Asset From Ingestion to a Traceable Finding Screen.

When: At the input/fixture review and again before P06 acceptance; coordinate after its prerequisites are available.

Shams’s review handoff: `reviews/p06-shams.md — Reproducible observation evidence and failing edge cases`.

Review acceptance: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

Package deliverables (primary owner remains accountable):
- `tests/integration/test_vertical_slice.py`
- `reports/first-slice/trace.json`
- `docs/runbooks/first-slice.md`
- `reports/first-slice/demo-notes.md`

Package acceptance:
- Displayed result traces exact evidence
- No mock represented as live
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### P07 — Build the Durable Job Ledger & Test Dispatch Recovery

Primary owner: Omar. Shams: supporting contribution. Stage: G1; Current core.
Prerequisites: P03 / Omar.

Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance.

When: At the input/fixture review and again before P07 acceptance; coordinate after its prerequisites are available.

Shams’s review handoff: `reviews/p07-shams.md — Reproducible asset observation evidence`.

Review acceptance: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

Package deliverables (primary owner remains accountable):
- `backend/app/jobs/ledger.py`
- `backend/app/jobs/outbox.py`
- `experiments/platform/job_recovery.py`
- `tests/jobs/test_crash_recovery.py`
- `docs/adr/job-transport.md`

Package acceptance:
- No lost business job after restart
- Duplicate requests do not repeat mutation
- Unknown side effect reconciled
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### P08 — Authenticate Runners and Enforce Typed, Scoped Execution Envelopes

Primary owner: Omar. Shams: supporting contribution. Stage: G1; Current core.
Prerequisites: P04 / Omar, P07 / Omar, C01 / Mahrous.

Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance.

When: At the input/fixture review and again before P08 acceptance; coordinate after its prerequisites are available.

Shams’s review handoff: `reviews/p08-shams.md — Reproducible asset observation evidence`.

Review acceptance: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

Package deliverables (primary owner remains accountable):
- `backend/app/jobs/runner_gateway.py`
- `runner/envelope_validator.py`
- `contracts/v1/runner-job.schema.json`
- `tests/security/test_runner_boundary.py`
- `docs/runner-trust-boundary.md`

Package acceptance:
- API cannot invoke arbitrary shell
- Expired runner credentials fail
- Scope enforced on API and runner
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### P10 — Build Finding Triage With Priority Reasons and Evidence History

Primary owner: Omar. Shams: supporting contribution. Stage: G2; Current core.
Prerequisites: P06 / Omar, P09 / Omar, D12 / Mahrous.

Provide reproducible input/failure fixtures for integration.

When: Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts.

Shams’s review handoff: `reviews/p10-shams.md — Provide reproducible input/failure fixtures for integration.`.

Review acceptance: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

Package deliverables (primary owner remains accountable):
- `backend/app/assessment/findings_api.py`
- `frontend/src/routes/findings.tsx`
- `frontend/src/components/EvidenceTimeline.tsx`
- `tests/integration/test_triage.py`
- `reports/triage-review.md`
- `contracts/p10-ai-handoff.md`

Package acceptance:
- Priority change explained
- Export scopes equal UI/API scopes
- Unknown distinct from not affected
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Contract rejection rate; fallback correctness; end-to-end task time and source-link completeness

### P11 — Expose One Permission-Scoped AI Gateway With Safe Fallbacks

Primary owner: Omar. Shams: supporting contribution. Stage: G2; Current core.
Prerequisites: P04 / Omar, P10 / Omar, A07 / Hams, A09 / Hams.

Provide reproducible input/failure fixtures for integration.

When: Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts.

Shams’s review handoff: `reviews/p11-shams.md — Provide reproducible input/failure fixtures for integration.`.

Review acceptance: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

Package deliverables (primary owner remains accountable):
- `backend/app/ai_gateway/api.py`
- `frontend/src/routes/assistant.tsx`
- `tests/integration/test_ai_gateway.py`
- `docs/ai-gateway-contract.md`
- `contracts/p11-ai-handoff.md`

Package acceptance:
- No unauthorized context retrieval
- Answers show provenance or uncertainty
- Model outage does not stop basic workflow
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Contract rejection rate; fallback correctness; end-to-end task time and source-link completeness

### P16 — Measure Platform Performance & Package an Accessible Handover

Primary owner: Omar. Shams: supporting contribution. Stage: G4; Current core.
Prerequisites: P10 / Omar, P11 / Omar, P12 / Omar, P13 / Omar, P14 / Omar, P15 / Omar.

Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance.

When: At the input/fixture review and again before P16 acceptance; coordinate after its prerequisites are available.

Shams’s review handoff: `reviews/p16-shams.md — Reproducible asset observation evidence`.

Review acceptance: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

Package deliverables (primary owner remains accountable):
- `experiments/platform/load_profile.py`
- `reports/platform/performance.csv`
- `reports/platform/accessibility-review.md`
- `docs/runbooks/operator-handover.md`
- `reports/release-manifest.json`

Package acceptance:
- Hardware and dataset reported
- Fresh teammate reproduces workflow
- No unsupported scale claims
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### UX01 — Research Analyst Decisions and Define the Narrow User Journey

Primary owner: Hams. Shams: supporting contribution. Stage: G0; Current core.
Prerequisites: None.

Review analyst workflow, user-research findings and usability questions with Hams; this responsibility is independent of advisory ingestion.

When: At the journey/usability review.

Shams’s review handoff: `reviews/ux01-shams.md — Workflow and usability review`.

Review acceptance: Record review findings and their disposition.

Package deliverables (primary owner remains accountable):
- `design/research/user-jobs.md`
- `design/flows/analyst-journey-v1.md`
- `design/research/review-notes.md`
- `design/README.md`

Package acceptance:
- Three user jobs and all four exception paths are documented.
- Research participants and limitations are stated honestly.
- Hams signs the UX handoff; Omar reviews implementation feasibility.
- The same scope version and fixture IDs are used by AI and platform work.

### UX03 — Test Analyst Task Completion and Hand Off UX Corrections

Primary owner: Hams. Shams: supporting contribution. Stage: G2; Current core.
Prerequisites: UX02 / Hams, P05 / Omar.

Review analyst workflow, user-research findings and usability questions with Hams; this responsibility is independent of advisory ingestion.

When: At the journey/usability review.

Shams’s review handoff: `reviews/ux03-shams.md — Workflow and usability review`.

Review acceptance: Record review findings and their disposition.

Package deliverables (primary owner remains accountable):
- `design/usability/protocol.md`
- `design/usability/results.csv`
- `design/usability/corrections.md`
- `design/usability/report.md`

Package acceptance:
- All planned tasks have recorded outcomes and denominators.
- No unresolved design defect presents unknown as safe or a draft as approval.
- Omar receives reproducible issues and reviewable expected behavior.
- Small-sample and participant limitations are reported.

### D17 — Normalize Fortinet Advisory Revisions for One FortiOS Profile

Primary owner: Amr. Shams: supporting contribution. Stage: G1; Conditional FortiOS profile.
Prerequisites: D02 / Amr, C03 / Shams.

Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Normalize Fortinet Advisory Revisions for One FortiOS Profile.

When: At the input/fixture review and again before D17 acceptance; coordinate after its prerequisites are available.

Shams’s review handoff: `reviews/d17-shams.md — Reproducible observation evidence and failing edge cases`.

Review acceptance: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

Package deliverables (primary owner remains accountable):
- `vulnerability-intelligence/fortinet/source-review.md`
- `vulnerability-intelligence/fortinet/collector.py`
- `fixtures/fortinet/advisory-manifest.json`
- `fixtures/fortinet/normalized.jsonl`
- `vulnerability-intelligence/fortinet/profile-qualification.md`

Package acceptance:
- One profile and all required identity/configuration fields are declared.
- Every normalized assertion links to a preserved reviewed source revision.
- 10 available records or a documented smaller feasibility sample cover the declared edge cases.
- Unavailable terms, access or version rules fail the profile gate rather than being bypassed.
- No firmware image redistribution or automated appliance mutation is included.

### P17 — Validate Disconnected Installation and Versioned Update Bundles

Primary owner: Omar. Shams: supporting contribution. Stage: G3; Product milestone.
Prerequisites: P14 / Omar, A06 / Hams, A09 / Hams, D18 / Amr.

Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance.

When: At the input/fixture review and again before P17 acceptance; coordinate after its prerequisites are available.

Shams’s review handoff: `reviews/p17-shams.md — Reproducible asset observation evidence`.

Review acceptance: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

Package deliverables (primary owner remains accountable):
- `deployment/offline/bundle-manifest.schema.json`
- `deployment/offline/export-bundle.sh`
- `deployment/offline/import-bundle.sh`
- `deployment/offline/runbook.md`
- `deployment/offline/qualification-report.md`

Package acceptance:
- Clean install uses only approved bundle artifacts with no hidden download.
- All enabled core capabilities pass with public egress blocked.
- Bundle authenticity/integrity and compatibility checks reject the negative cases.
- Source freshness and patch-content availability are honestly displayed.
- An operator reproduces installation, update and recovery from the runbook.

### A17 — Compare Rule-Based, AI-Assisted and Hybrid Prioritization on Reviewed Organization Scenarios

Primary owner: Hams. Shams: supporting contribution. Stage: G2; Conditional experiment.
Prerequisites: D12 / Mahrous, A03 / Hams, A04 / Hams, D15 / Mahrous, D14 / Amr, A13 / Hams.

Assemble and validate the A02 experiment input bundle from existing feeds, asset evidence and reviewed context; disclose missing/stale/synthetic fields.

When: Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts.

Shams’s review handoff: `reviews/a17-shams.md — Assemble and validate the A02 experiment input bundle from existing feeds, asset evidence and reviewed context; disclose missing/stale/synthetic fields.`.

Review acceptance: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

Package deliverables (primary owner remains accountable):
- `research/prioritization/approach-comparison.md`
- `experiments/prioritization/run_comparison.py`
- `experiments/prioritization/configs/`
- `reports/prioritization/rule-ai-hybrid-benchmark.md`
- `reports/prioritization/recommended-approach.md`
- `contracts/prioritization/ranking-result.schema.json`
- `experiments/prioritization/README.md`

Package acceptance:
- All three approach families are compared on the declared supported cases; unavailable learned methods have evidence-based exclusion reasons.
- Every input/output and expert judgement has a recorded revision and provenance; holdout is not used for selection.
- Zero observed forbidden eligibility/permission overrides in the declared test suite; this is a test result, not a universal safety guarantee.
- Report quality/stability/time/latency/cost metrics, failures and uncertainty against predeclared A13 gates.
- Recommend AI, hybrid or baseline based on measured evidence; retaining baseline is a valid successful experiment.
- All four supporting reviewers have explicit disposition records.

## Research stewardship outside package counts

### OQ03 — Who has the strongest initial pain and buying reason?

The industrial-support IT profile is a proposed focus, not proven product-market fit.

Questions:
- Who performs triage and patch approval, and who buys the product?
- What volume, delay or repeated manual work can they demonstrate?
- Which existing tools and policies constrain them?
- What measurable outcome would justify adoption or payment?

Expected evidence: Recorded customer discovery with permitted evidence, competing-workflow comparison and explicit assumptions; no demand or superiority claim without evidence.

Timing: Before committing a customer pilot or expanding scope.

### OQ05 — What real organizational data can we legally access?

Public vulnerability records are real data but do not provide a real customer inventory or policies. Synthetic scenarios stay labelled. Amr reviews advisory-source rights; Shams reviews asset-data access and collection feasibility.

Questions:
- Can Iskraemeco or another partner provide written, scoped access to inventories, configurations or reviewed policies?
- What minimization, de-identification, permissions, retention and publication restrictions apply?
- What can the prototype, MVP and pilot honestly demonstrate with their available data?

Expected evidence: A data-access agreement or recorded refusal/unknown, provenance manifest and stage-specific dataset plan; proceed with public records plus declared lab/synthetic fixtures when access is absent.

Timing: Before importing customer material or claiming real-customer evaluation.

### OQ08 — Can a data partnership support a viable commercial package?

A data revenue idea is a business hypothesis; public access or an API subscription does not establish redistribution rights. Shams retains business partnership stewardship; Amr supplies D01/D17/D18 source and rights evidence.

Questions:
- What proprietary enrichment would a partner supply, to whom and under what contract?
- Can we display, cache, redistribute, bundle or resell it in cloud and disconnected installations?
- What costs, attribution, renewal, withdrawal and customer-data restrictions would apply?
- Would a complete-solution package create enough customer value to cover acquisition and support costs?

Expected evidence: A BMC/value hypothesis plus rights/cost/partnership comparison; unresolved rights stay explicitly unknown and unbundled.

Timing: Before selling or bundling third-party data.

## Changes applied

- Restored the existing A16 data-lineage demo contribution to Shams’s supporting list; Hams retains primary ownership and Amr retains source review.
- Personal plan views now show owned, supporting and research responsibilities with explicit counts.
- C03 and C13 transfer from Mahrous to Shams; Amr’s data and execution ownership remain unchanged. Previous owners retain explicit technical-review handoffs. Task IDs, dependency edges, scope layers, deliverables, test criteria and completion states remain unchanged.
- Existing implementation/research credits remain independent of the current primary-owner label.

## Decisions still needed

- Confirm practical reviewer availability and effort estimates with the team; package counts alone do not establish balanced effort.
- Customer/business research remains OQ03/OQ05/OQ08 stewardship. No new commercial deliverable or customer access is assumed.


## Stronger asset research requirements — 6 November 2026

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
