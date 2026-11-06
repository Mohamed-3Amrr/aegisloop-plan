# Shams — Current responsibility audit

Updated: 6 November 2026. The original count was four owned packages, then six after asset-contract/verification consolidation. This expansion adds seven distinct asset packages without changing any existing owner or required deliverable.

**Current: 13 owned / 23 supporting / 36 involved packages**, plus three separate research/decision stewardship questions. Ten owned packages are current core; C06 is deferred, C07 conditional, C23 experimental.

The workload comparison uses provisional relative effort, not measured hours. [Scope, effort arithmetic and activation stages](asset-workload-and-contribution.md). No implementation, completed research or measured benefit is claimed.

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

**Unlocks:** D08, C04, C05, C06, C07, C08, C15, P02, D17, C17, C19

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

D08, C04, C05, C06, C07, C08, C15, P02, D17, C17, C19

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

**Unlocks:** C16, C21

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

C16, C21

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

**Unlocks:** D09, C08, C11, C16, C17, C18

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

D09, C08, C11, C16, C17, C18

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

**Unlocks:** C14, C16, P15, C22

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

C14, C16, P15, C22

### Related Decisions

ADR06, ADR07

### C17 — Reconcile Asset Identities With Reviewable Conflict Decisions

**Goal:** Implement a deterministic resolver for enrolled host identities across observation sources, IP reuse and rebuilds. Preserve ambiguous identities as separate candidates with reviewable reasons.

**Why This Matters:** Implement a deterministic resolver for enrolled host identities across observation sources, IP reuse and rebuilds. Preserve ambiguous identities as separate candidates with reviewable reasons.

**Owner:** Shams

**Support:** Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: C03, C05, P02 (planned; no completion reported).

**Depends on:** C03, C05, P02

**Unlocks:** C18, C22

**Parallel with:** 

**Critical path:** No

**First action:** Freeze a collision corpus from authorized exports plus labelled synthetic IP-reuse, clone and rebuild cases.

### Research / Questions to Answer

RESEARCH REQUIRED — freeze the decision, boundary and measured/not-run evidence.

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. C03 defines observation fields and identity rules; C17 implements their cross-snapshot resolution. D08 continues to normalize product identities and generate matching candidates. P03/P04 retain storage and authorization.

- Which identity signals survive IP changes, re-enrollment and host cloning, and which conflicts must block an automatic association?
- How can a resolution be reproduced from immutable observations and a rule revision without deleting earlier identities?
- What evidence would reverse an incorrect association, and how will the consumer see that correction?

Sources: CY-S08, CY-S09, CY-S11

- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation. Official documentation checked 6 November 2026; compare documented capability rather than assuming absent features.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison. Official documentation checked 6 November; version-pin the evaluated deployment.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel. Official documentation checked 6 November; inspect the relevant product/version constraints.

### Research decision and consumer handoff

Implement a deterministic resolver for enrolled host identities across observation sources, IP reuse and rebuilds. Preserve ambiguous identities as separate candidates with reviewable reasons.

Compare with a simple IP-only baseline and report false merges, false splits and unresolved cases.

Failure cases:
- Replay IP reuse, cloned identity and re-enrollment cases; two distinct hosts must not silently merge.
- Replay the same inputs/rule revision and obtain the same decision and evidence references.
- Correct a false association without deleting the old observation or borrowing another tenant’s identity.

Who uses the findings:
- C18: resolved host identity for chronological asset deltas.
- C22: reviewed false-merge/false-split outcomes for the asset benchmark.
- D08/P02 reviewers: compatible host references; product matching and persistence stay with their owners.

Review: Mahrous reviews identity ambiguity and product-matching separation; Omar checks persistence/auth compatibility.

Starting gate: Post-first-slice: complete C03, C05, P02 first; draft research/fixtures earlier without claiming measured completion.

[Blank decision brief](research/assets/C17-brief-template.md) · [Blank evidence matrix](research/assets/C17-evidence-template.csv)

### Support Contributions and Handoff

- **Mahrous**: Mahrous reviews identity ambiguity and product-matching separation; Omar checks persistence/auth compatibility. Mahrous reviews only the named boundary; Shams produces the package artifacts. **When:** At contract/design review and again at acceptance after the named prerequisite artifacts are available. **Deliver:** `reviews/c17-mahrous.md — Boundary, fixture and acceptance review`. **Review:** Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.
- **Omar**: Mahrous reviews identity ambiguity and product-matching separation; Omar checks persistence/auth compatibility. Omar reviews only the named boundary; Shams produces the package artifacts. **When:** At contract/design review and again at acceptance after the named prerequisite artifacts are available. **Deliver:** `reviews/c17-omar.md — Boundary, fixture and acceptance review`. **Review:** Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.

### Inputs

- C03 versioned handoff/reference; real acceptance requires its delivered input
- C05 versioned handoff/reference; real acceptance requires its delivered input
- P02 versioned handoff/reference; real acceptance requires its delivered input

### Implementation Steps

1. Read the named prerequisites, retained source references and domain boundary; record the input/configuration revisions.
2. Freeze a collision corpus from authorized exports plus labelled synthetic IP-reuse, clone and rebuild cases.
3. Implement exact enrolled-identity associations first; preserve source IDs and rule revisions.
4. Return associate, distinct or needs_review with evidence references; IP/hostname alone must not silently merge two assets.
5. Record proposed associations and correction history through Omar’s existing persistence/auth contracts; do not write a second asset database.
6. Add a replayable correction path that retains the original observations and audit reasons.
7. Compare with a simple IP-only baseline and report false merges, false splits and unresolved cases.
8. Save the research brief/evidence matrix and review findings with Mahrous + Omar. Do not mark this package complete before the original prerequisite and acceptance gates hold.

### Technical Approach

Research Decision Required: C03 defines observation fields and identity rules; C17 implements their cross-snapshot resolution. D08 continues to normalize product identities and generate matching candidates. P03/P04 retain storage and authorization.

### Expected Deliverables

- `backend/app/inventory/identity_resolution.py`
- `contracts/v1/asset-identity-resolution.schema.json`
- `fixtures/assets/identity-conflicts.jsonl`
- `tests/inventory/test_identity_resolution.py`
- `reports/assets/identity-resolution-evaluation.md`
- `docs/research/assets/c17-decision-brief.md`
- `docs/research/assets/c17-evidence-matrix.csv`

### Testing

1. Replay IP reuse, cloned identity and re-enrollment cases; two distinct hosts must not silently merge.
2. Replay the same inputs/rule revision and obtain the same decision and evidence references.
3. Correct a false association without deleting the old observation or borrowing another tenant’s identity.

### Acceptance Criteria

- Identity resolution is reproducible and reports uncertainty rather than forcing a merge.
- Every association/correction retains source observations and rule revision.
- Report false-merge/false-split counts and denominators on reviewed cases.
- Every listed artifact exists or has an agreed equivalent path, and an independent reviewer can reproduce the documented procedure.
- Record actual tests, input/configuration revisions and unresolved failures; planned/reference examples do not establish completion.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

C18, C22

### Related Decisions

ADR06, ADR07

### C18 — Build Immutable Asset Snapshot Deltas and Replayable Change Evidence

**Goal:** Produce field-level asset changes from immutable observations, with explicit collection completeness and ordering, so consumers can distinguish a real removal from failed collection.

**Why This Matters:** Produce field-level asset changes from immutable observations, with explicit collection completeness and ordering, so consumers can distinguish a real removal from failed collection.

**Owner:** Shams

**Support:** Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: C17, C05 (planned; no completion reported).

**Depends on:** C17, C05

**Unlocks:** C19, C22, C23

**Parallel with:** 

**Critical path:** No

**First action:** Define a delta contract linking two immutable snapshot IDs, asset identity and comparison revision.

### Research / Questions to Answer

RESEARCH REQUIRED — freeze the decision, boundary and measured/not-run evidence.

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. C05/C07 collect or import observations; C18 computes inventory-only deltas. D13 retains impact analysis, reassessment scheduling and cache invalidation. P03 retains persistence.

- Which package/service/OS changes are comparable across collector versions and incomplete snapshots?
- How should duplicates, late arrivals, time skew and missing fields affect a delta?
- Which inventory events can D13 consume without mistaking a failed collection for an uninstall?

Sources: CY-S08, CY-S09, CY-S11

- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation. Official documentation checked 6 November 2026; compare documented capability rather than assuming absent features.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison. Official documentation checked 6 November; version-pin the evaluated deployment.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel. Official documentation checked 6 November; inspect the relevant product/version constraints.

### Research decision and consumer handoff

Produce field-level asset changes from immutable observations, with explicit collection completeness and ordering, so consumers can distinguish a real removal from failed collection.

Define a delta contract linking two immutable snapshot IDs, asset identity and comparison revision.

Failure cases:
- A partial/failed package listing must not imply all prior packages were removed.
- Reorder and duplicate snapshots; preserve stable event identity and explain chronology conflicts.
- Verify that raw evidence stays unchanged and D13 can consume the delta fixture without a new scheduler.

Who uses the findings:
- C19: comparable snapshot history for evidence-quality evaluation.
- C22/C23: replayable changes for contribution tests and observed service relationships.
- D13: optional asset-change event input; Mahrous retains impact analysis and reassessment scheduling.

Review: Mahrous reviews the D13 event boundary; Omar reviews existing event/persistence compatibility.

Starting gate: Post-first-slice: complete C17, C05 first; draft research/fixtures earlier without claiming measured completion.

[Blank decision brief](research/assets/C18-brief-template.md) · [Blank evidence matrix](research/assets/C18-evidence-template.csv)

### Support Contributions and Handoff

- **Mahrous**: Mahrous reviews the D13 event boundary; Omar reviews existing event/persistence compatibility. Mahrous reviews only the named boundary; Shams produces the package artifacts. **When:** At contract/design review and again at acceptance after the named prerequisite artifacts are available. **Deliver:** `reviews/c18-mahrous.md — Boundary, fixture and acceptance review`. **Review:** Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.
- **Omar**: Mahrous reviews the D13 event boundary; Omar reviews existing event/persistence compatibility. Omar reviews only the named boundary; Shams produces the package artifacts. **When:** At contract/design review and again at acceptance after the named prerequisite artifacts are available. **Deliver:** `reviews/c18-omar.md — Boundary, fixture and acceptance review`. **Review:** Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.

### Inputs

- C17 versioned handoff/reference; real acceptance requires its delivered input
- C05 versioned handoff/reference; real acceptance requires its delivered input

### Implementation Steps

1. Read the named prerequisites, retained source references and domain boundary; record the input/configuration revisions.
2. Define a delta contract linking two immutable snapshot IDs, asset identity and comparison revision.
3. Normalize inventory ordering without altering raw snapshots or pretending two unlike collector scopes are complete.
4. Implement added, changed, removed, unknown and incomparable states per field/package/service.
5. Emit stable inventory-change IDs on replay; preserve collection time separately from receipt time.
6. Expose domain events through the existing platform contract; leave reassessment execution to D13/P07.
7. Replay reordered/duplicate/partial snapshots and document consumer behavior.
8. Save the research brief/evidence matrix and review findings with Mahrous + Omar. Do not mark this package complete before the original prerequisite and acceptance gates hold.

### Technical Approach

Research Decision Required: C05/C07 collect or import observations; C18 computes inventory-only deltas. D13 retains impact analysis, reassessment scheduling and cache invalidation. P03 retains persistence.

### Expected Deliverables

- `backend/app/inventory/snapshot_delta.py`
- `contracts/v1/asset-inventory-delta.schema.json`
- `fixtures/assets/snapshot-sequences.jsonl`
- `tests/inventory/test_snapshot_delta.py`
- `docs/assets/inventory-change-handoff.md`
- `docs/research/assets/c18-decision-brief.md`
- `docs/research/assets/c18-evidence-matrix.csv`

### Testing

1. A partial/failed package listing must not imply all prior packages were removed.
2. Reorder and duplicate snapshots; preserve stable event identity and explain chronology conflicts.
3. Verify that raw evidence stays unchanged and D13 can consume the delta fixture without a new scheduler.

### Acceptance Criteria

- Deltas link both source revisions and distinguish absent from unknown/incomparable fields.
- Duplicate input cannot manufacture duplicate semantic changes.
- Consumers can replay the provided sequences and understand each change reason.
- Every listed artifact exists or has an agreed equivalent path, and an independent reviewer can reproduce the documented procedure.
- Record actual tests, input/configuration revisions and unresolved failures; planned/reference examples do not establish completion.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

C19, C22, C23

### Related Decisions

ADR06, ADR07

### C19 — Evaluate Asset Evidence Freshness, Completeness and Conflicts Per Field

**Goal:** Implement a versioned, explainable asset-evidence policy that reports which fields are usable, stale, missing or conflicting at an explicit evaluation time.

**Why This Matters:** Implement a versioned, explainable asset-evidence policy that reports which fields are usable, stale, missing or conflicting at an explicit evaluation time.

**Owner:** Shams

**Support:** Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: C18, C03 (planned; no completion reported).

**Depends on:** C18, C03

**Unlocks:** C20, C22, C23

**Parallel with:** 

**Critical path:** No

**First action:** Predeclare field/profile freshness rules and exceptions with policy revisions.

### Research / Questions to Answer

RESEARCH REQUIRED — freeze the decision, boundary and measured/not-run evidence.

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. Collectors retain timestamps/errors and C07 preserves import age. C19 evaluates those facts across observations; it does not score vulnerabilities, change D09 applicability or replace P09 advisory-source health.

- Which freshness windows and mandatory fields are defensible for each supported asset/collection profile?
- How will original collection time, clock uncertainty, partial failure and conflicting observations change usability?
- How can consumers inspect the exact reasons instead of relying on an uncalibrated confidence percentage?

Sources: CY-S08, CY-S09, CY-S11

- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation. Official documentation checked 6 November 2026; compare documented capability rather than assuming absent features.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison. Official documentation checked 6 November; version-pin the evaluated deployment.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel. Official documentation checked 6 November; inspect the relevant product/version constraints.

### Research decision and consumer handoff

Implement a versioned, explainable asset-evidence policy that reports which fields are usable, stale, missing or conflicting at an explicit evaluation time.

Compare simple latest-snapshot/age-only baselines against reviewed stale/partial/conflict cases.

Failure cases:
- Reimport old data and retain its age; evaluate identically with a fixed as_of time.
- Preserve unknown/conflict/time_uncertain under missing timestamps and skew.
- A successful collection of one field must not mark every other field fresh or complete.

Who uses the findings:
- C20: field-level gaps/staleness that justify bounded collection probes.
- C22/C23: quality states and source coverage for evaluation/relationship qualification.
- C13/D09 reviewers: explicit usability reasons; matching and closure decisions remain with their existing components.

Review: Mahrous checks how evidence usability is consumed by matching/verification without changing their authority.

Starting gate: Post-first-slice: complete C18, C03 first; draft research/fixtures earlier without claiming measured completion.

[Blank decision brief](research/assets/C19-brief-template.md) · [Blank evidence matrix](research/assets/C19-evidence-template.csv)

### Support Contributions and Handoff

- **Mahrous**: Mahrous checks how evidence usability is consumed by matching/verification without changing their authority. Mahrous reviews only the named boundary; Shams produces the package artifacts. **When:** At contract/design review and again at acceptance after the named prerequisite artifacts are available. **Deliver:** `reviews/c19-mahrous.md — Boundary, fixture and acceptance review`. **Review:** Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.

### Inputs

- C18 versioned handoff/reference; real acceptance requires its delivered input
- C03 versioned handoff/reference; real acceptance requires its delivered input

### Implementation Steps

1. Read the named prerequisites, retained source references and domain boundary; record the input/configuration revisions.
2. Predeclare field/profile freshness rules and exceptions with policy revisions.
3. Implement a pure evaluator using snapshot metadata plus explicit as_of time; avoid dependence on the current wall clock in replay tests.
4. Return usable, stale, missing, conflicting or time_uncertain by field with source references and reasons.
5. Keep latest-received distinct from latest-collected; importing old evidence must not refresh it.
6. Publish a consumer contract for D09/C13 and the new probe planner, without overriding their decisions.
7. Compare simple latest-snapshot/age-only baselines against reviewed stale/partial/conflict cases.
8. Save the research brief/evidence matrix and review findings with Mahrous. Do not mark this package complete before the original prerequisite and acceptance gates hold.

### Technical Approach

Research Decision Required: Collectors retain timestamps/errors and C07 preserves import age. C19 evaluates those facts across observations; it does not score vulnerabilities, change D09 applicability or replace P09 advisory-source health.

### Expected Deliverables

- `backend/app/inventory/evidence_quality.py`
- `config/assets/evidence-quality-policy.yaml`
- `contracts/v1/asset-evidence-quality.schema.json`
- `fixtures/assets/evidence-quality-cases.jsonl`
- `tests/inventory/test_evidence_quality.py`
- `reports/assets/evidence-quality-review.md`
- `docs/research/assets/c19-decision-brief.md`
- `docs/research/assets/c19-evidence-matrix.csv`

### Testing

1. Reimport old data and retain its age; evaluate identically with a fixed as_of time.
2. Preserve unknown/conflict/time_uncertain under missing timestamps and skew.
3. A successful collection of one field must not mark every other field fresh or complete.

### Acceptance Criteria

- Every state includes its field, policy revision, evaluation time and evidence reasons.
- No single score silently converts incomplete evidence into a clean observation.
- Reviewed cases justify freshness assumptions and disclose the unsupported profiles.
- Every listed artifact exists or has an agreed equivalent path, and an independent reviewer can reproduce the documented procedure.
- Record actual tests, input/configuration revisions and unresolved failures; planned/reference examples do not establish completion.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

C20, C22, C23

### Related Decisions

ADR06, ADR07

### C20 — Plan the Smallest Approved Collection Needed to Resolve Asset Evidence Gaps

**Goal:** Map structured missing asset-field keys to approved read-only collection probes and choose a bounded plan under a declared cost/budget, with a reason for each requested fact.

**Why This Matters:** Map structured missing asset-field keys to approved read-only collection probes and choose a bounded plan under a declared cost/budget, with a reason for each requested fact.

**Owner:** Shams

**Support:** Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: C19, D08, P08 (planned; no completion reported).

**Depends on:** C19, D08, P08

**Unlocks:** C21, C22

**Parallel with:** 

**Critical path:** No

**First action:** Define a capability map from structured field keys to existing approved read-only adapter operations, prerequisites and cost units.

### Research / Questions to Answer

RESEARCH REQUIRED — freeze the decision, boundary and measured/not-run evidence.

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. D08/D09 own product matching and gap identification. Hams’s A11 owns assistant-generated requests/explanations. C20 owns deterministic gap-to-approved-probe planning; P08 validates execution envelopes and Amr retains advisory collectors and patch runners.

- Which approved probe supplies each asset field, and which fields cannot be collected in the current scope?
- Can deterministic coverage/cost rules reduce unnecessary collection versus always running full inventory?
- How should stale evidence, missing permissions, identity conflict and exhausted budgets prevent or limit a plan?

Sources: CY-S08, CY-S09, CY-S11

- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation. Official documentation checked 6 November 2026; compare documented capability rather than assuming absent features.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison. Official documentation checked 6 November; version-pin the evaluated deployment.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel. Official documentation checked 6 November; inspect the relevant product/version constraints.

### Research decision and consumer handoff

Map structured missing asset-field keys to approved read-only collection probes and choose a bounded plan under a declared cost/budget, with a reason for each requested fact.

Compare full inventory, fixed rules and budget-aware selection on the same reviewed gap fixtures, including negative results.

Failure cases:
- Unknown/mutating commands and denied target scopes produce no executable collection plan.
- Enforce the declared budget and prevent duplicate probes for equivalent requirements.
- Measure resolved evidence gaps, unresolved gaps and cost on the same cases for each baseline.

Who uses the findings:
- C21: version-bound approved probe plans to turn into bounded collection intents.
- C22: selected/rejected probes and costs for baseline/ablation comparison.
- A11/P08 reviewers: optional structured plan consumption and existing typed-envelope validation; no AI or executor ownership transfer.

Review: Mahrous reviews gap semantics and baseline outcomes; Omar reviews typed-envelope compatibility and denied operations.

Starting gate: Post-first-slice: complete C19, D08, P08 first; draft research/fixtures earlier without claiming measured completion.

[Blank decision brief](research/assets/C20-brief-template.md) · [Blank evidence matrix](research/assets/C20-evidence-template.csv)

### Support Contributions and Handoff

- **Mahrous**: Mahrous reviews gap semantics and baseline outcomes; Omar reviews typed-envelope compatibility and denied operations. Mahrous reviews only the named boundary; Shams produces the package artifacts. **When:** At contract/design review and again at acceptance after the named prerequisite artifacts are available. **Deliver:** `reviews/c20-mahrous.md — Boundary, fixture and acceptance review`. **Review:** Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.
- **Omar**: Mahrous reviews gap semantics and baseline outcomes; Omar reviews typed-envelope compatibility and denied operations. Omar reviews only the named boundary; Shams produces the package artifacts. **When:** At contract/design review and again at acceptance after the named prerequisite artifacts are available. **Deliver:** `reviews/c20-omar.md — Boundary, fixture and acceptance review`. **Review:** Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.

### Inputs

- C19 versioned handoff/reference; real acceptance requires its delivered input
- D08 versioned handoff/reference; real acceptance requires its delivered input
- P08 versioned handoff/reference; real acceptance requires its delivered input

### Implementation Steps

1. Read the named prerequisites, retained source references and domain boundary; record the input/configuration revisions.
2. Define a capability map from structured field keys to existing approved read-only adapter operations, prerequisites and cost units.
3. Reject arbitrary commands, unknown fields, out-of-scope identities and mutation operations.
4. Implement a transparent deterministic selector; document tie-breaking and why no plan is possible.
5. Bind plans to asset identity, snapshot/quality revision, capability map and budget.
6. Return the plan through P08 contracts; do not dispatch jobs or replace A11 natural-language generation.
7. Compare full inventory, fixed rules and budget-aware selection on the same reviewed gap fixtures, including negative results.
8. Save the research brief/evidence matrix and review findings with Mahrous + Omar. Do not mark this package complete before the original prerequisite and acceptance gates hold.

### Technical Approach

Research Decision Required: D08/D09 own product matching and gap identification. Hams’s A11 owns assistant-generated requests/explanations. C20 owns deterministic gap-to-approved-probe planning; P08 validates execution envelopes and Amr retains advisory collectors and patch runners.

### Expected Deliverables

- `backend/app/inventory/evidence_probe_planner.py`
- `config/assets/approved-probe-capabilities.yaml`
- `contracts/v1/asset-probe-plan.schema.json`
- `fixtures/assets/probe-budget-cases.jsonl`
- `tests/inventory/test_probe_planner.py`
- `experiments/assets/compare_probe_plans.py`
- `reports/assets/probe-budget-comparison.md`
- `docs/research/assets/c20-decision-brief.md`
- `docs/research/assets/c20-evidence-matrix.csv`

### Testing

1. Unknown/mutating commands and denied target scopes produce no executable collection plan.
2. Enforce the declared budget and prevent duplicate probes for equivalent requirements.
3. Measure resolved evidence gaps, unresolved gaps and cost on the same cases for each baseline.

### Acceptance Criteria

- Each selected probe names the missing fact it supplies and a versioned approved capability.
- The planner does not claim the missing fact was collected or the finding resolved.
- No claim of reduced cost or better decisions precedes measured comparisons with denominators.
- Every listed artifact exists or has an agreed equivalent path, and an independent reviewer can reproduce the documented procedure.
- Record actual tests, input/configuration revisions and unresolved failures; planned/reference examples do not establish completion.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

C21, C22

### Related Decisions

ADR06, ADR07

### C21 — Plan Bounded Asset Collection Campaigns With Backpressure and Recovery

**Goal:** Build asset-domain campaign planning for bounded batches, per-target limits, backoff and resumable progress while delegating durable dispatch and authentication to the existing platform.

**Why This Matters:** Build asset-domain campaign planning for bounded batches, per-target limits, backoff and resumable progress while delegating durable dispatch and authentication to the existing platform.

**Owner:** Shams

**Support:** Omar, Amr

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: C20, P07, P08, C04 (planned; no completion reported).

**Depends on:** C20, P07, P08, C04

**Unlocks:** C22

**Parallel with:** 

**Critical path:** No

**First action:** Define bounded read-only campaign configuration and target eligibility using C01/C19/C20.

### Research / Questions to Answer

RESEARCH REQUIRED — freeze the decision, boundary and measured/not-run evidence.

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. Omar’s P07 owns durable job/attempt state and recovery; P08 owns runner authentication/envelopes. C21 builds collection intents and the asset-specific eligibility/rate policy, not a second queue or executor.

- Which batch/concurrency/time/traffic limits protect the chosen authorized lab/device classes?
- How can incremental collection avoid repeatedly reading unchanged fields while respecting fresh-evidence needs?
- How will offline assets, partial results, duplicate intents, retries and exhausted budgets appear without false success?

Sources: CY-S08, CY-S09, CY-S11

- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation. Official documentation checked 6 November 2026; compare documented capability rather than assuming absent features.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison. Official documentation checked 6 November; version-pin the evaluated deployment.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel. Official documentation checked 6 November; inspect the relevant product/version constraints.

### Research decision and consumer handoff

Build asset-domain campaign planning for bounded batches, per-target limits, backoff and resumable progress while delegating durable dispatch and authentication to the existing platform.

Report campaign throughput, fairness, collected bytes/probe counts and failures separately; state the largest measured scope.

Failure cases:
- Crash/replay intent preparation and verify no duplicate semantic collection intent.
- Enforce per-target/global limits and stop dispatch intent generation when cancelled or out of budget.
- Unavailable assets retain failed/unknown states and cannot appear freshly collected.

Who uses the findings:
- C22: campaign constraints, replay/failure outcomes and measured collection cost.
- P07/P08: collection intents through the existing durable-job and runner trust contracts.
- Shams’s asset operators: pause/resume/unknown-state evidence without a second queue.

Review: Omar checks ledger/envelope reuse; Amr reviews authorized lab load assumptions without taking collection ownership.

Starting gate: Post-first-slice: complete C20, P07, P08, C04 first; draft research/fixtures earlier without claiming measured completion.

[Blank decision brief](research/assets/C21-brief-template.md) · [Blank evidence matrix](research/assets/C21-evidence-template.csv)

### Support Contributions and Handoff

- **Omar**: Omar checks ledger/envelope reuse; Amr reviews authorized lab load assumptions without taking collection ownership. Omar reviews only the named boundary; Shams produces the package artifacts. **When:** At contract/design review and again at acceptance after the named prerequisite artifacts are available. **Deliver:** `reviews/c21-omar.md — Boundary, fixture and acceptance review`. **Review:** Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.
- **Amr**: Omar checks ledger/envelope reuse; Amr reviews authorized lab load assumptions without taking collection ownership. Amr reviews only the named boundary; Shams produces the package artifacts. **When:** At contract/design review and again at acceptance after the named prerequisite artifacts are available. **Deliver:** `reviews/c21-amr.md — Boundary, fixture and acceptance review`. **Review:** Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.

### Inputs

- C20 versioned handoff/reference; real acceptance requires its delivered input
- P07 versioned handoff/reference; real acceptance requires its delivered input
- P08 versioned handoff/reference; real acceptance requires its delivered input
- C04 versioned handoff/reference; real acceptance requires its delivered input

### Implementation Steps

1. Read the named prerequisites, retained source references and domain boundary; record the input/configuration revisions.
2. Define bounded read-only campaign configuration and target eligibility using C01/C19/C20.
3. Generate stable idempotency keys and capped batches for the existing P07 ledger.
4. Implement per-target/concurrency limits, finite backoff, pause/cancel/resume and explicit budget exhaustion.
5. Reconcile ledger outcomes without hiding failed or outcome_unknown attempts; do not implement another broker.
6. Use replay/simulated load to qualify planning behavior first; live scale tests use only approved lab capacity.
7. Report campaign throughput, fairness, collected bytes/probe counts and failures separately; state the largest measured scope.
8. Save the research brief/evidence matrix and review findings with Omar + Amr. Do not mark this package complete before the original prerequisite and acceptance gates hold.

### Technical Approach

Research Decision Required: Omar’s P07 owns durable job/attempt state and recovery; P08 owns runner authentication/envelopes. C21 builds collection intents and the asset-specific eligibility/rate policy, not a second queue or executor.

### Expected Deliverables

- `backend/app/inventory/collection_campaigns.py`
- `config/assets/collection-budgets.yaml`
- `contracts/v1/asset-collection-intent.schema.json`
- `tests/inventory/test_collection_campaigns.py`
- `experiments/assets/collection_load_profile.py`
- `reports/assets/collection-scale-and-recovery.md`
- `docs/research/assets/c21-decision-brief.md`
- `docs/research/assets/c21-evidence-matrix.csv`

### Testing

1. Crash/replay intent preparation and verify no duplicate semantic collection intent.
2. Enforce per-target/global limits and stop dispatch intent generation when cancelled or out of budget.
3. Unavailable assets retain failed/unknown states and cannot appear freshly collected.

### Acceptance Criteria

- All collection dispatch uses P07/P08 contracts and the existing approved read-only operations.
- Measured and simulated load results are labelled separately; no enterprise-scale claim from a tiny lab.
- A reviewer reproduces bounded recovery and observes the same target/cost constraints.
- Every listed artifact exists or has an agreed equivalent path, and an independent reviewer can reproduce the documented procedure.
- Record actual tests, input/configuration revisions and unresolved failures; planned/reference examples do not establish completion.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

C22

### Related Decisions

ADR06, ADR07

### C22 — Benchmark Asset Evidence Quality and Ablate Adaptive Collection Benefits

**Goal:** Build a reproducible asset-only benchmark testing identity, change fidelity, evidence quality and bounded recollection, including whether their combined workflow earns a measurable benefit.

**Why This Matters:** Build a reproducible asset-only benchmark testing identity, change fidelity, evidence quality and bounded recollection, including whether their combined workflow earns a measurable benefit.

**Owner:** Shams

**Support:** Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: C17, C18, C19, C20, C21, C13 (planned; no completion reported).

**Depends on:** C17, C18, C19, C20, C21, C13

**Unlocks:** C23

**Parallel with:** 

**Critical path:** No

**First action:** Freeze an asset case manifest with authorized native exports, separately labelled synthetic edge cases and independent reviewer checks.

### Research / Questions to Answer

RESEARCH REQUIRED — freeze the decision, boundary and measured/not-run evidence.

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. D15 remains Mahrous’s matching/CVE ground-truth benchmark; C16 remains the end-to-end remediation/SIEM demo. C22 labels asset facts and collection outcomes, not vulnerability applicability or AI ranking.

- Which independently reviewed asset facts and change sequences exercise false merges, missed changes, stale evidence and partial collection?
- Does adaptive recollection resolve comparable evidence gaps with less collection cost than full refresh under identical safety limits?
- Which claimed gain disappears when identity resolution, deltas, freshness or budget selection is removed?

Sources: CY-S08, CY-S09, CY-S11

- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation. Official documentation checked 6 November 2026; compare documented capability rather than assuming absent features.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison. Official documentation checked 6 November; version-pin the evaluated deployment.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel. Official documentation checked 6 November; inspect the relevant product/version constraints.

### Research decision and consumer handoff

Build a reproducible asset-only benchmark testing identity, change fidelity, evidence quality and bounded recollection, including whether their combined workflow earns a measurable benefit.

Implement full-refresh/fixed-rule baselines and the proposed combined asset workflow.

Failure cases:
- A second reviewer checks expected asset facts without copying the new engine’s output as truth.
- Reproduce metrics from frozen cases and raw results, including failed/unavailable runs.
- Hold budget and case set constant across baselines/ablations; never mix synthetic and real-lab denominators silently.

Who uses the findings:
- C23: core asset qualification evidence before the optional relationship experiment.
- C16 reviewers: optional asset-specific contribution evidence without replacing the end-to-end demo.
- Faculty/team scope review: measured supported-profile benefit, limitations and negative findings.

Review: Mahrous independently checks case expectations and experiment design; Omar reproduces the asset pipeline/consumer contract.

Starting gate: Post-first-slice: complete C17, C18, C19, C20, C21, C13 first; draft research/fixtures earlier without claiming measured completion.

[Blank decision brief](research/assets/C22-brief-template.md) · [Blank evidence matrix](research/assets/C22-evidence-template.csv)

### Support Contributions and Handoff

- **Mahrous**: Mahrous independently checks case expectations and experiment design; Omar reproduces the asset pipeline/consumer contract. Mahrous reviews only the named boundary; Shams produces the package artifacts. **When:** At contract/design review and again at acceptance after the named prerequisite artifacts are available. **Deliver:** `reviews/c22-mahrous.md — Boundary, fixture and acceptance review`. **Review:** Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.
- **Omar**: Mahrous independently checks case expectations and experiment design; Omar reproduces the asset pipeline/consumer contract. Omar reviews only the named boundary; Shams produces the package artifacts. **When:** At contract/design review and again at acceptance after the named prerequisite artifacts are available. **Deliver:** `reviews/c22-omar.md — Boundary, fixture and acceptance review`. **Review:** Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.

### Inputs

- C17 versioned handoff/reference; real acceptance requires its delivered input
- C18 versioned handoff/reference; real acceptance requires its delivered input
- C19 versioned handoff/reference; real acceptance requires its delivered input
- C20 versioned handoff/reference; real acceptance requires its delivered input
- C21 versioned handoff/reference; real acceptance requires its delivered input
- C13 versioned handoff/reference; real acceptance requires its delivered input

### Implementation Steps

1. Read the named prerequisites, retained source references and domain boundary; record the input/configuration revisions.
2. Freeze an asset case manifest with authorized native exports, separately labelled synthetic edge cases and independent reviewer checks.
3. Predeclare metrics, denominators, resource budget and held-out sequence groups before comparing methods.
4. Implement full-refresh/fixed-rule baselines and the proposed combined asset workflow.
5. Run ablations removing one component at a time; retain failures and unsupported profiles.
6. Report false merges/splits, delta errors, false-fresh states, resolved gaps, bytes/probes/time and replay consistency with uncertainty.
7. Write a capability/evidence matrix against cited official competitor documentation; distinguish existing common features from the measured project contribution.
8. Save the research brief/evidence matrix and review findings with Mahrous + Omar. Do not mark this package complete before the original prerequisite and acceptance gates hold.

### Technical Approach

Research Decision Required: D15 remains Mahrous’s matching/CVE ground-truth benchmark; C16 remains the end-to-end remediation/SIEM demo. C22 labels asset facts and collection outcomes, not vulnerability applicability or AI ranking.

### Expected Deliverables

- `evaluation/assets/case-manifest.json`
- `evaluation/assets/annotation-guide.md`
- `experiments/assets/run_evidence_benchmark.py`
- `reports/assets/evidence-benchmark.json`
- `reports/assets/asset-contribution-and-limitations.md`
- `research/assets/competitor-capability-matrix.md`
- `docs/research/assets/c22-decision-brief.md`
- `docs/research/assets/c22-evidence-matrix.csv`

### Testing

1. A second reviewer checks expected asset facts without copying the new engine’s output as truth.
2. Reproduce metrics from frozen cases and raw results, including failed/unavailable runs.
3. Hold budget and case set constant across baselines/ablations; never mix synthetic and real-lab denominators silently.

### Acceptance Criteria

- Every metric has input revisions, method/configuration, denominators and measured/not-run state.
- The contribution claim is limited to measured supported asset scenarios, including negative results.
- No world-first or universal superiority claim follows from adding inventory, deduplication or scheduling.
- Every listed artifact exists or has an agreed equivalent path, and an independent reviewer can reproduce the documented procedure.
- Record actual tests, input/configuration revisions and unresolved failures; planned/reference examples do not establish completion.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

C23

### Related Decisions

ADR06, ADR07

### C23 — Qualify Observed Asset–Service Relationships Without Invented Dependencies

**Goal:** Research and prototype a provenance-backed asset/package/service relationship view using available observations, while exposing missing coverage and separating observed edges from hypotheses.

**Why This Matters:** Research and prototype a provenance-backed asset/package/service relationship view using available observations, while exposing missing coverage and separating observed edges from hypotheses.

**Owner:** Shams

**Support:** Mahrous, Hams

**Conditional capability gates:** Complete C22 first; approve remaining capacity and the narrow observed-service scope. No new active probe or device class without separate authorization.

**Scope version:** 2026-10-23.r2

**Delivery layer:** Conditional experiment

**Gate:** G3

**Start condition:** Blocked by: C18, C19, C22 (planned; no completion reported).

**Depends on:** C18, C19, C22

**Unlocks:** 

**Parallel with:** 

**Critical path:** No

**First action:** Freeze a narrow approved lab/profile and asset-context questions after the core asset benchmark is complete.

### Research / Questions to Answer

RESEARCH REQUIRED — freeze the decision, boundary and measured/not-run evidence.

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. Shams owns observed asset relationships. D12 retains risk/prioritization and business-impact policy; Hams retains AI interpretation and UX02 design. No automatic network expansion or inferred business criticality is authorized.

- Which package/service/host relationships can the existing authorized collectors actually substantiate?
- What is lost when observations are stale, one-sided, partial or scoped to one host?
- Does an evidence-linked relationship view help reviewers answer asset-context questions compared with a flat inventory, at an acceptable resource cost?

Sources: CY-S08, CY-S09, CY-S11

- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation. Official documentation checked 6 November 2026; compare documented capability rather than assuming absent features.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison. Official documentation checked 6 November; version-pin the evaluated deployment.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel. Official documentation checked 6 November; inspect the relevant product/version constraints.

### Research decision and consumer handoff

Research and prototype a provenance-backed asset/package/service relationship view using available observations, while exposing missing coverage and separating observed edges from hypotheses.

Compare the view with flat inventory on reviewed context questions and resource measurements.

Failure cases:
- A stale or missing observation cannot create an apparently current confirmed relationship.
- Keep hypothesized edges visibly separate from observed evidence.
- Bound graph size and show incomplete coverage; any new probe requires a separate approved capability.

Who uses the findings:
- D12 reviewer: optional observed asset context; Mahrous retains business-impact and prioritization policy.
- Hams/UX02: optional evidence-linked context for interpretation and design; no automatic inferred dependency or risk claim.
- Team scope review: enable/defer/reject decision with coverage and resource evidence.

Review: Mahrous reviews context/priority boundaries; Hams reviews interpretation and the handoff to existing UX design.

Starting gate: Conditional experiment after C22 and capacity/scope review.

[Blank decision brief](research/assets/C23-brief-template.md) · [Blank evidence matrix](research/assets/C23-evidence-template.csv)

### Support Contributions and Handoff

- **Mahrous**: Mahrous reviews context/priority boundaries; Hams reviews interpretation and the handoff to existing UX design. Mahrous reviews only the named boundary; Shams produces the package artifacts. **When:** At contract/design review and again at acceptance after the named prerequisite artifacts are available. **Deliver:** `reviews/c23-mahrous.md — Boundary, fixture and acceptance review`. **Review:** Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.
- **Hams**: Mahrous reviews context/priority boundaries; Hams reviews interpretation and the handoff to existing UX design. Hams reviews only the named boundary; Shams produces the package artifacts. **When:** At contract/design review and again at acceptance after the named prerequisite artifacts are available. **Deliver:** `reviews/c23-hams.md — Boundary, fixture and acceptance review`. **Review:** Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.

### Inputs

- C18 versioned handoff/reference; real acceptance requires its delivered input
- C19 versioned handoff/reference; real acceptance requires its delivered input
- C22 versioned handoff/reference; real acceptance requires its delivered input

### Implementation Steps

1. Read the named prerequisites, retained source references and domain boundary; record the input/configuration revisions.
2. Freeze a narrow approved lab/profile and asset-context questions after the core asset benchmark is complete.
3. Define observed, declared and hypothetical edge kinds with evidence time and source references.
4. Implement a bounded relationship assembler from existing observations without new active probes by default.
5. Return coverage/unknown states; do not equate a socket/process observation with a proven business dependency.
6. Compare the view with flat inventory on reviewed context questions and resource measurements.
7. Publish enable/defer/reject decision and missing capabilities before proposing any wider collection scope.
8. Save the research brief/evidence matrix and review findings with Mahrous + Hams. Do not mark this package complete before the original prerequisite and acceptance gates hold.

### Technical Approach

Research Decision Required: Shams owns observed asset relationships. D12 retains risk/prioritization and business-impact policy; Hams retains AI interpretation and UX02 design. No automatic network expansion or inferred business criticality is authorized.

### Expected Deliverables

- `research/assets/service-relationship-study.md`
- `backend/app/inventory/service_relationships.py`
- `contracts/v1/asset-service-edge.schema.json`
- `fixtures/assets/service-relationship-cases.jsonl`
- `tests/inventory/test_service_relationships.py`
- `reports/assets/service-context-qualification.md`
- `docs/research/assets/c23-decision-brief.md`
- `docs/research/assets/c23-evidence-matrix.csv`

### Testing

1. A stale or missing observation cannot create an apparently current confirmed relationship.
2. Keep hypothesized edges visibly separate from observed evidence.
3. Bound graph size and show incomplete coverage; any new probe requires a separate approved capability.

### Acceptance Criteria

- The experiment starts only after the core asset work and capacity review qualify it.
- Every edge is typed and linked to its evidence/limitations; no automatic risk score or execution action is produced.
- Record the comparative result and enable/defer/reject decision without a predetermined success claim.
- Every listed artifact exists or has an agreed equivalent path, and an independent reviewer can reproduce the documented procedure.
- Record actual tests, input/configuration revisions and unresolved failures; planned/reference examples do not establish completion.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work



### Related Decisions

ADR06, ADR07

## Current activation stages

### Foundation and first real asset

C03 → C05 → C04

Preserve C01/C02/P02 prerequisites; qualify the original first slice before new scaling work.

### Identity, history and evidence quality

C17 → C18 → C19

Implement in dependency order, then review the domain contracts.

### Adaptive collection and independent verification

C20 → C21 → C13

Reuse P07/P08 and the authorized read-only adapters; Amr retains patch/recovery execution.

### Contribution evidence

C22

Freeze independent asset cases and compare baselines/ablations; publish failures.

### Gated extensions

C06 → C07 → C23

Keep Windows deferred, appliance evidence conditional and service relationships experimental until scope/capacity qualifies them.

## Supporting work

### D05 — Build the Ubuntu Affected-and-Fixed Package Catalog

Owner: Amr. Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Build the Ubuntu Affected-and-Fixed Package Catalog.

When: At the input/fixture review and again before D05 acceptance; coordinate after its prerequisites are available.

Deliver: `reviews/d05-shams.md — Reproducible observation evidence and failing edge cases`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### D06 — Validate Microsoft and Red Hat Data & Add Scoped Vendor Adapters

Owner: Amr. Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Validate Microsoft and Red Hat Data & Add Scoped Vendor Adapters.

When: At the input/fixture review and again before D06 acceptance; coordinate after its prerequisites are available.

Deliver: `reviews/d06-shams.md — Reproducible observation evidence and failing edge cases`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### D08 — Normalize Asset Product Identities & Generate Matching Candidates

Owner: Mahrous. Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Normalize Asset Product Identities & Generate Matching Candidates.

When: At the input/fixture review and again before D08 acceptance; coordinate after its prerequisites are available.

Deliver: `reviews/d08-shams.md — Reproducible observation evidence and failing edge cases`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### D14 — Build a Versioned Catalog of Vendor Fixes and Mitigations

Owner: Amr. Check real/lab asset evidence and practical preflight inputs; no FortiOS mutation implied.

When: Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts.

Deliver: `reviews/d14-shams.md — Check real/lab asset evidence and practical preflight inputs; no FortiOS mutation implied.`. Review: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### D15 — Create Independent Matching Ground Truth & Measure Errors

Owner: Mahrous. Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Create Independent Matching Ground Truth & Measure Errors.

When: At the input/fixture review and again before D15 acceptance; coordinate after its prerequisites are available.

Deliver: `reviews/d15-shams.md — Reproducible observation evidence and failing edge cases`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### C01 — Define Allowed Lab Targets & Enforce Scan Safety Rules

Owner: Mahrous. Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Define Allowed Lab Targets & Enforce Scan Safety Rules.

When: At the input/fixture review and again before C01 acceptance; coordinate after its prerequisites are available.

Deliver: `reviews/c01-shams.md — Reproducible observation evidence and failing edge cases`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### C16 — Publish Supported-Coverage Results & Reproduce the End-to-End Demo

Owner: Mahrous. Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance.

When: At the input/fixture review and again before C16 acceptance; coordinate after its prerequisites are available.

Deliver: `reviews/c16-shams.md — Reproducible asset observation evidence`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### A02 — Create Versioned Training and Evidence Datasets With Provenance

Owner: Hams. Coordinate and assemble vulnerability, asset and contextual inputs; validate joins, timestamps, missingness and data readiness, reusing existing collectors.

When: Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts.

Deliver: `reviews/a02-shams.md — Coordinate and assemble vulnerability, asset and contextual inputs; validate joins, timestamps, missingness and data readiness, reusing existing collectors.`. Review: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### A11 — Generate Targeted Evidence Requests & Compare Constrained Fix Options

Owner: Hams. Prepare representative lab/vendor inputs and check prerequisite/verification practicality without executing unapproved actions.

When: Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts.

Deliver: `reviews/a11-shams.md — Prepare representative lab/vendor inputs and check prerequisite/verification practicality without executing unapproved actions.`. Review: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### A13 — Freeze Human Evaluation Questions, Rubrics and Final Holdout

Owner: Hams. Freeze reproducible scenario inputs and identify unavailable/labelled synthetic evidence.

When: Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts.

Deliver: `reviews/a13-shams.md — Freeze reproducible scenario inputs and identify unavailable/labelled synthetic evidence.`. Review: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### A16 — Package Reproducible AI Experiments and a Faculty Demo

Owner: Hams. Explain the provenance and data lineage of the preserved asset/research inputs during the faculty demo or labelled replay, as already named in the A16 fallback. Coordinate with Hams; Amr retains source-authority and rights review.

When: At final reproduction/demo rehearsal after A15 results and the A16 handover artifacts are available.

Deliver: `reviews/a16-shams.md — Data-lineage walkthrough and observed/synthetic/missing-evidence review`. Review: Hams records the review disposition. Trace one demo example to its source/observation revision, identify synthetic or missing data, and distinguish a labelled replay from a live result.

### P02 — Publish Shared API Contracts and Validate Producer/Consumer Fixtures

Owner: Omar. Supply AssetObservation/inventory fixtures from the authorized collector; validate stable identity, OS/package fields, collected_at, stale/failed collection and missing evidence. Coordinate C03 definitions with Mahrous.

When: At the input/fixture review and again before P02 acceptance; coordinate after its prerequisites are available.

Deliver: `reviews/p02-shams.md — Reproducible observation evidence and failing edge cases`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### P06 — Connect One Real Asset From Ingestion to a Traceable Finding Screen

Owner: Omar. Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Connect One Real Asset From Ingestion to a Traceable Finding Screen.

When: At the input/fixture review and again before P06 acceptance; coordinate after its prerequisites are available.

Deliver: `reviews/p06-shams.md — Reproducible observation evidence and failing edge cases`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### P07 — Build the Durable Job Ledger & Test Dispatch Recovery

Owner: Omar. Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance.

When: At the input/fixture review and again before P07 acceptance; coordinate after its prerequisites are available.

Deliver: `reviews/p07-shams.md — Reproducible asset observation evidence`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### P08 — Authenticate Runners and Enforce Typed, Scoped Execution Envelopes

Owner: Omar. Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance.

When: At the input/fixture review and again before P08 acceptance; coordinate after its prerequisites are available.

Deliver: `reviews/p08-shams.md — Reproducible asset observation evidence`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### P10 — Build Finding Triage With Priority Reasons and Evidence History

Owner: Omar. Provide reproducible input/failure fixtures for integration.

When: Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts.

Deliver: `reviews/p10-shams.md — Provide reproducible input/failure fixtures for integration.`. Review: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### P11 — Expose One Permission-Scoped AI Gateway With Safe Fallbacks

Owner: Omar. Provide reproducible input/failure fixtures for integration.

When: Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts.

Deliver: `reviews/p11-shams.md — Provide reproducible input/failure fixtures for integration.`. Review: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### P16 — Measure Platform Performance & Package an Accessible Handover

Owner: Omar. Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance.

When: At the input/fixture review and again before P16 acceptance; coordinate after its prerequisites are available.

Deliver: `reviews/p16-shams.md — Reproducible asset observation evidence`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### UX01 — Research Analyst Decisions and Define the Narrow User Journey

Owner: Hams. Review analyst workflow, user-research findings and usability questions with Hams; this responsibility is independent of advisory ingestion.

When: At the journey/usability review.

Deliver: `reviews/ux01-shams.md — Workflow and usability review`. Review: Record review findings and their disposition.

### UX03 — Test Analyst Task Completion and Hand Off UX Corrections

Owner: Hams. Review analyst workflow, user-research findings and usability questions with Hams; this responsibility is independent of advisory ingestion.

When: At the journey/usability review.

Deliver: `reviews/ux03-shams.md — Workflow and usability review`. Review: Record review findings and their disposition.

### D17 — Normalize Fortinet Advisory Revisions for One FortiOS Profile

Owner: Amr. Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Normalize Fortinet Advisory Revisions for One FortiOS Profile.

When: At the input/fixture review and again before D17 acceptance; coordinate after its prerequisites are available.

Deliver: `reviews/d17-shams.md — Reproducible observation evidence and failing edge cases`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### P17 — Validate Disconnected Installation and Versioned Update Bundles

Owner: Omar. Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance.

When: At the input/fixture review and again before P17 acceptance; coordinate after its prerequisites are available.

Deliver: `reviews/p17-shams.md — Reproducible asset observation evidence`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### A17 — Compare Rule-Based, AI-Assisted and Hybrid Prioritization on Reviewed Organization Scenarios

Owner: Hams. Assemble and validate the A02 experiment input bundle from existing feeds, asset evidence and reviewed context; disclose missing/stale/synthetic fields.

When: Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts.

Deliver: `reviews/a17-shams.md — Assemble and validate the A02 experiment input bundle from existing feeds, asset evidence and reviewed context; disclose missing/stale/synthetic fields.`. Review: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

## Research stewardship outside package counts

### OQ03 — Who has the strongest initial pain and buying reason?

The industrial-support IT profile is a proposed focus, not proven product-market fit.

Expected evidence: Recorded customer discovery with permitted evidence, competing-workflow comparison and explicit assumptions; no demand or superiority claim without evidence.

### OQ05 — What real organizational data can we legally access?

Public vulnerability records are real data but do not provide a real customer inventory or policies. Synthetic scenarios stay labelled. Amr reviews advisory-source rights; Shams reviews asset-data access and collection feasibility.

Expected evidence: A data-access agreement or recorded refusal/unknown, provenance manifest and stage-specific dataset plan; proceed with public records plus declared lab/synthetic fixtures when access is absent.

### OQ08 — Can a data partnership support a viable commercial package?

A data revenue idea is a business hypothesis; public access or an API subscription does not establish redistribution rights. Shams retains business partnership stewardship; Amr supplies D01/D17/D18 source and rights evidence.

Expected evidence: A BMC/value hypothesis plus rights/cost/partnership comparison; unresolved rights stay explicitly unknown and unbundled.

## History, credits and unresolved capacity

The 4 November plan listed four owned packages. C03/C13 transferred to Shams earlier on 6 November with previous authorship preserved. This later expansion adds C17–C23 without moving any existing task. A16 retains the restored supporting data-lineage contribution. No completed ClickUp work or delivered artifact was reassigned by this expansion.

Treat estimates as a broad planning range (roughly ±25%), not a promise of equal hours. Re-estimate after C03/C05 spikes and the first new component; do not activate every package at once.

Omar remains above the provisional team mean. This change brings Shams near the typical/mean owned scope; it does not prove the whole team is balanced or silently transfer Omar’s work.
