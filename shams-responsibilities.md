# Shams — Current responsibility reference

Updated: 6 November 2026. Use the task responsibilities, input producers and reviewers below to coordinate the shared work.

[Implementation/research route](asset-effective-reference.md) · [Team handoffs](asset-team-handoff.md)

## Owned work

## C03 — Define Asset Observation Fields & Validate Stable Identity

**Owner:** Shams · **Support:** Mahrous, Omar

**Delivery layer:** Current core · **Gate:** G0

**Scope version:** 2026-10-23.r2

**Goal:** Agree what collectors must report so downstream matching can trust and reproduce an observation.

**Why This Matters:** Allows all collectors to feed one reliable assessment model.

**Depends on:** C01

**Inputs:**
- three example asset exports

**First action:** Define stable asset id, source-specific identity, timestamps, trust level, os release, architecture, package namespace/version, firmware model/train


### Research / Questions to Answer

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details. Asset research mandate: Choose a defensible asset identity and observation contract before adapters proliferate. For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

- Which fields identify an enrolled host beyond IP?
- Which OS/build/package/firmware fields are mandatory for each supported profile?
- How will collection errors, raw hashes and old import timestamps be retained?
- Which candidate identifiers survive IP changes, host rebuilds and cloned machines, and when must records stay separate or require review?
- Which fields distinguish absent, failed, stale and conflicting observations without turning missing evidence into a clean result?
- What minimum OS/package/firmware identity does each supported consumer need, and what raw evidence can be retained without secrets?

Source starting points:
- [systemd machine-id documentation](https://www.freedesktop.org/software/systemd/man/latest/machine-id.html): Investigate identity lifecycle, cloned/rebuilt hosts and identifier handling.
- [Wazuh inventory compatibility matrix](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/compatibility-matrix.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps.

### Support Contributions and Handoff

- Mahrous: Review whether the observation fields and identity rules are sufficient for D08/D09 matching and explicit unknown states; Omar reviews ingestion compatibility. Shams owns the contract and its fixture/tests. When: At the contract/input review and again before package acceptance after the listed prerequisites are available. Deliver: `reviews/c03-mahrous.md — Matching/closure review and disposition`. Review: Shams records findings and disposition; unresolved safety, identity or contract blockers prevent acceptance.
- Omar: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Define Asset Observation Fields & Validate Stable Identity. When: At the input/fixture review and again before C03 acceptance; coordinate after its prerequisites are available. Deliver: `reviews/c03-omar.md — Contract compatibility notes and a consumer-side fixture check`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- 6 November 2026: primary ownership transferred from Mahrous to Shams at Mahrous’s request to consolidate asset responsibility. Own the asset-observation contract, stable-identity rules, example payloads and validation tests used by all asset adapters. Earlier work retains actual authorship; existing dependencies, deliverables, acceptance and completion state are retained.
- 6 November: strengthen asset research with decision evidence, comparison/failure cases, consumer review and reproducible references. Existing ownership, scope gates and delivery acceptance remain in force.

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Define stable asset id, source-specific identity, timestamps, trust level, os release, architecture, package namespace/version, firmware model/train
3. Keep raw evidence reference and collection errors
4. Validate three fixture payloads against the versioned schema and document required versus optional fields
5. Define changed-ip and duplicate handling
6. Research decision gate: Compare candidate identity rules and required/optional fields against a fixture matrix; document the rejected rules and unresolved collisions. Save docs/research/assets/c03-decision-brief.md and docs/research/assets/c03-evidence-matrix.csv. Mahrous reviews matching sufficiency; Omar reproduces schema validation and ingestion compatibility. Start with C03 schema/identity desk research and labelled fixtures. C01 still gates approved-scope acceptance.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous + Omar review the handoff before declaring completion.

### Technical Approach

Versioned JSON observation schema coordinated with P02; enrollment identity and evidence references are explicit. This is the domain specification, not a second platform schema engine.

### Expected Deliverables

- `contracts/v1/inventory-snapshot.schema.json`
- `fixtures/inventory/profile-examples.jsonl`
- `docs/asset-identity-rules.md`
- `tests/contracts/test_inventory_snapshot.py`
- `docs/research/assets/c03-decision-brief.md`
- `docs/research/assets/c03-evidence-matrix.csv`

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- Validate complete and partial observations for each selected profile
- Keep two identities at one reused IP separate
- Reimport old evidence and preserve its original collected_at
- Reproduce one selected research claim from its cited source or authorized fixture, and verify that missing/contradictory evidence remains explicit.

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

D08, C04, C05, C06, C07, C08, C15, P02, D17, C17, C18, C19, C22

## C04 — Implement Bounded Network Discovery & Parse Structured Results

**Owner:** Shams · **Support:** Mahrous

**Delivery layer:** Current core · **Gate:** G1

**Scope version:** 2026-10-23.r2

**Goal:** Discover approved lab endpoints and service hints without treating banners as installed-package proof.

**Why This Matters:** Finds reachable lab assets and services without pretending banners prove vulnerability.

**Depends on:** C01, C02, C03

**Inputs:**
- allowlisted lab range/profile

**First action:** Wrap separately installed scanner using fixed argument arrays


### Research / Questions to Answer

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details. Asset research mandate: Select bounded discovery profiles using measured coverage, disruption limits and explicit evidence limitations. For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

- Which conservative Nmap profile fits each approved device class?
- Which probes and ports must be excluded, including fragile printer services?
- Which installation and redistribution constraints apply to Nmap/Npcap?
- Which probe choices and exclusions are justified for each approved lab device class, including fragile or unsupported devices?
- How do candidate bounded profiles compare on observed targets, traffic, duration, timeouts and identification uncertainty?
- Which discovery results can propose an asset and which require authenticated/offline confirmation before asserting its OS or package identity?

Source starting points:
- [Nmap host discovery controls](https://nmap.org/book/host-discovery-controls.html): Compare discovery controls and uncertainty within the approved lab.
- [Nmap service/version detection](https://nmap.org/book/man-version-detection.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps.

### Support Contributions and Handoff

- Mahrous: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Implement Bounded Network Discovery & Parse Structured Results. When: At the input/fixture review and again before C04 acceptance; coordinate after its prerequisites are available. Deliver: `reviews/c04-mahrous.md — Reviewed decision outcomes and blocking policy questions`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- 6 November: strengthen asset research with decision evidence, comparison/failure cases, consumer review and reproducible references. Existing ownership, scope gates and delivery acceptance remain in force.

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

Separately installed Nmap with fixed argument arrays, exclusions, time and concurrency limits. No blanket aggressive script profile; product redistribution is a separate licensing gate.

### Expected Deliverables

- `runner/adapters/discovery.py`
- `config/discovery-profiles.yaml`
- `fixtures/discovery/structured-results.xml`
- `tests/runner/test_discovery.py`
- `docs/runbooks/discovery.md`
- `docs/research/assets/c04-decision-brief.md`
- `docs/research/assets/c04-evidence-matrix.csv`

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- Run against only the allowlisted lab and record contacted targets
- Cancel or time out a run and retain partial/failed status
- Parse a saved result without claiming banner data proves remediation
- Reproduce one selected research claim from its cited source or authorized fixture, and verify that missing/contradictory evidence remains explicit.

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

## C05 — Collect Ubuntu OS and Package Evidence Through Authenticated SSH

**Owner:** Shams · **Support:** Mahrous, Hams

**Delivery layer:** Current core · **Gate:** G1

**Scope version:** 2026-10-23.r2

**Goal:** Produce a trustworthy Ubuntu observation containing full package revisions and collection errors.

**Why This Matters:** Supplies precise distro/package evidence needed for applicability.

**Depends on:** C02, C03

**Inputs:**
- pinned lab Ubuntu and read-only credentials

**First action:** Verify the Ubuntu lab host's SSH key against its approved identity before attempting authenticated collection.


### Research / Questions to Answer

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details. Asset research mandate: Choose and implement the smallest trustworthy Ubuntu inventory collection method. For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

- Which native output exposes distro release, architecture and binary/source package identity?
- What minimum read permissions are needed?
- How will host-key verification, command failures and redaction be enforced?
- Which measured asset fields can populate A02 without introducing invented business context?
- Which native evidence distinguishes distro/build, architecture, binary/source package identity and installed versus running state for the chosen lab profile?
- What is the least permission needed for each field, and what should the adapter report when a field is denied or unavailable?
- How do candidate read-only collection approaches compare with a preserved native export on field coverage, discrepancies, duration and failure behavior?

Source starting points:
- [Ubuntu 22.04 dpkg-query manual](https://manpages.ubuntu.com/manpages/jammy/man1/dpkg-query.1.html): Investigate explicit inventory output fields and binary/source package identity; build a read-only collection fixture.
- [Wazuh system inventory](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/index.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps.

### Support Contributions and Handoff

- Mahrous: Verify applicability-relevant fields and authorized scope. When: Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. Deliver: `reviews/c05-mahrous.md — Verify applicability-relevant fields and authorized scope.`. Review: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- Hams: Specify ranking experiment fields and distinguish observed facts from scenario assumptions. When: Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. Deliver: `reviews/c05-hams.md — Specify ranking experiment fields and distinguish observed facts from scenario assumptions.`. Review: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- 29 October: explicit cross-functional AI prioritization/remediation handoff; existing domain ownership retained.
- 6 November: strengthen asset research with decision evidence, comparison/failure cases, consumer review and reproducible references. Existing ownership, scope gates and delivery acceptance remain in force.

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

Authenticated SSH with host-key verification and structured native inventory. Choose parser/dependency versions in the lab spike; avoid broad shell/environment dumps.

### Expected Deliverables

- `runner/adapters/ubuntu_inventory.py`
- `fixtures/inventory/ubuntu-native-export.json`
- `tests/runner/test_ubuntu_inventory.py`
- `docs/runbooks/ubuntu-collection.md`
- `datasets/prioritization/asset-evidence-manifest.json`
- `docs/research/assets/c05-decision-brief.md`
- `docs/research/assets/c05-evidence-matrix.csv`

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- Compare collected package versions with a native ground-truth export
- Use invalid credentials and expect an explicit failed observation
- Inspect logs and exported fixtures for credentials and unnecessary user data
- Cross-check observation IDs against A02 scenarios.
- Reproduce one selected research claim from its cited source or authorized fixture, and verify that missing/contradictory evidence remains explicit.

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

D09, C08, C11, C16, C17, C18, C19, C21, C22

## C06 — Compare Windows Inventory Options & Implement One Adapter

**Owner:** Shams · **Support:** Omar

**Delivery layer:** Deferred extension · **Gate:** G1

**Scope version:** 2026-10-23.r2

**Goal:** Select one validated Windows inventory path that provides the fields needed by the matching contract.

**Why This Matters:** Selects one Windows inventory path using measured coverage and resource cost.

**Depends on:** C03

**Inputs:**
- identical Windows fixture

**First action:** Compare osquery export and wazuh syscollector for os build, packages, update fields, footprint and permissions


### Research / Questions to Answer

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details. Asset research mandate: Qualify one Windows inventory approach only if the deferred extension is approved. For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

- Does osquery or existing Wazuh Syscollector expose the required build, package and update fields?
- What permissions, enrollment and transport work does each option require?
- What are the measured CPU/RAM and collection-time costs on the same target?
- For the exact Windows target, which candidate exposes the required OS/build/package/update fields, and what remains unavailable?
- What enrollment, privileges, transport, maintenance and redistribution constraints would each available candidate introduce?
- On the same authorized target, how do candidates differ in measured field completeness, collection time, CPU/RAM and explicit failures?

Source starting points:
- [Microsoft Win32_QuickFixEngineering reference](https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-quickfixengineering): Investigate documented update-inventory coverage limits before choosing a Windows collection method.
- [osquery documentation](https://osquery.readthedocs.io/en/stable/): Use as a retained official starting point; extract only the relevant asset claim and record gaps.
- [Wazuh inventory compatibility matrix](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/compatibility-matrix.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps.

### Support Contributions and Handoff

- Omar: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Compare Windows Inventory Options & Implement One Adapter. When: At the input/fixture review and again before C06 acceptance; coordinate after its prerequisites are available. Deliver: `reviews/c06-omar.md — Contract compatibility notes and a consumer-side fixture check`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- 6 November: strengthen asset research with decision evidence, comparison/failure cases, consumer review and reproducible references. Existing ownership, scope gates and delivery acceptance remain in force.

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Compare osquery export and wazuh syscollector for os build, packages, update fields, footprint and permissions
3. Measure collection time
4. Choose one
5. Implement field mapping and missing-field flags
6. Research decision gate: Create a decision table for the existing Wazuh/osquery/native options; mark unavailable measurements as not run. Implement one justified option, rather than several competing adapters. Save docs/research/assets/c06-decision-brief.md and docs/research/assets/c06-evidence-matrix.csv. Omar reviews integration/operating burden; Mahrous reviews matching coverage; Amr supplies only agreed lab/access help. Deferred extension: keep to an initial evidence-gap/feasibility note until the scope gate and target access are agreed. Do not let this delay C03/C05.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar review the handoff before declaring completion.

### Technical Approach

Experimental Decision: compare osquery and Wazuh, prefer existing deployment where justified, then implement one primary adapter. A recorded export is not live Windows validation.

### Expected Deliverables

- `experiments/windows_inventory_comparison.py`
- `reports/windows-inventory-choice.md`
- `runner/adapters/windows_inventory.py`
- `fixtures/inventory/windows-export.json`
- `tests/runner/test_windows_inventory.py`
- `docs/research/assets/c06-decision-brief.md`
- `docs/research/assets/c06-evidence-matrix.csv`

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- Collect the same target with the candidate methods where available
- Document missing fields and footprint rather than guessing equivalence
- Map the selected export into the shared observation schema
- Reproduce one selected research claim from its cited source or authorized fixture, and verify that missing/contradictory evidence remains explicit.

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

## C07 — Import Offline and Appliance Evidence With Freshness Labels

**Owner:** Shams · **Support:** Amr

**Delivery layer:** Conditional FortiOS profile · **Gate:** G3

**Scope version:** 2026-10-23.r2

**Goal:** Accept a supported vendor export or manual snapshot while clearly showing what cannot be observed live.

**Why This Matters:** Supports assets that cannot safely or directly be scanned.

**Depends on:** C03

**Inputs:**
- one vendor export and offline JSON fixture

**First action:** List the exact appliance model, firmware train, hardware revision and original collection timestamp required by the import fixture.


### Research / Questions to Answer

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details. Asset research mandate: Define a trustworthy offline/appliance evidence import without pretending that a stale export is a live observation. For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

- Which exact model, firmware train and hardware revision identify the test appliance?
- How can timestamp, operator and integrity hash be preserved?
- Which import fields are needed to resolve a match and which remain unknown?
- Which exact model, firmware train, hardware revision, original capture time and source artifact are necessary for the selected appliance identity?
- Which available authorized export/manual-entry paths preserve those fields and integrity, and which ambiguities must remain unknown?
- How should importer validation handle stale, incomplete, malformed, oversized or conflicting evidence while retaining the original timestamp and operator/source provenance?

Source starting points:
- [Fortinet FortiOS 7.4 CLI troubleshooting reference](https://docs.fortinet.com/document/fortigate/7.4.0/cli-troubleshooting-cheat-sheet/420966): Locate vendor-documented system-identity evidence; identify the fields still missing from an authorized export.
- [NIST SP 800-82 Rev 3](https://csrc.nist.gov/pubs/sp/800/82/r3/final): Use as a retained official starting point; extract only the relevant asset claim and record gaps.

### Support Contributions and Handoff

- Amr: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Import Offline and Appliance Evidence With Freshness Labels. When: At the input/fixture review and again before C07 acceptance; coordinate after its prerequisites are available. Deliver: `reviews/c07-amr.md — Source/provenance corrections and reviewed fixture IDs`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Imports and supported identity evidence address scan restrictions without pretending universal device support.
- 6 November: strengthen asset research with decision evidence, comparison/failure cases, consumer review and reproducible references. Existing ownership, scope gates and delivery acceptance remain in force.

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

Validated JSON/vendor-export adapter with bounded uploads and explicit manual/import labels. General OT active scanning and universal firmware updating remain out of scope.

### Expected Deliverables

- `backend/app/inventory/imports.py`
- `fixtures/imports/offline-appliance.json`
- `contracts/v1/evidence-import.schema.json`
- `tests/inventory/test_imports.py`
- `docs/offline-evidence-guide.md`
- `docs/research/assets/c07-decision-brief.md`
- `docs/research/assets/c07-evidence-matrix.csv`

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- Import an old snapshot and verify it remains stale
- Reject malformed or oversized input
- Import incomplete firmware identity and show unknown rather than a clean result
- Reproduce one selected research claim from its cited source or authorized fixture, and verify that missing/contradictory evidence remains explicit.

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

Review and qualified follow-up; no mandatory consumer is listed.

## C13 — Verify Remediation Independently & Rehearse Recovery

**Owner:** Shams · **Support:** Amr, Mahrous

**Delivery layer:** Current core · **Gate:** G2

**Scope version:** 2026-10-23.r2

**Goal:** Build independent post-remediation asset verification using fresh inventory and service health. Amr owns patch/recovery execution; Mahrous reviews matching, closure and recurrence decisions.

**Why This Matters:** Proves remediation and service health rather than trusting exit codes.

**Depends on:** C08, C11, C12

**Inputs:**
- post-execution observation and health checks

**First action:** Collect fresh evidence independent of executor's success flag


### Research / Questions to Answer

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details. Asset research mandate: Choose independent asset and health checks that can challenge a successful patch-executor result. For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

- Which installed versus running version checks matter for the chosen update?
- What independent health check detects a broken service despite exit code zero?
- Which restore, downgrade or forward-fix path is actually supported?
- Which fresh installed/running-state and health checks distinguish a successful update, a broken service, incomplete restart and insufficient evidence?
- How can verification collect evidence independently from the executor success flag and link it to the same asset without rewriting earlier observations?
- After Amr executes the authorized recovery fixture, which observations support closure, continuing uncertainty or a reopened/linked finding episode?

Source starting points:
- [NIST SP 800-40 Rev 4](https://csrc.nist.gov/pubs/sp/800/40/r4/final): Use as a retained official starting point; extract only the relevant asset claim and record gaps.
- [Ubuntu 22.04 dpkg-query manual](https://manpages.ubuntu.com/manpages/jammy/man1/dpkg-query.1.html): Investigate explicit inventory output fields and binary/source package identity; build a read-only collection fixture.

### Support Contributions and Handoff

- Amr: Execute the authorized patch/recovery rehearsal through C11/C12/C14, supply runner/recovery evidence, and review environmental assumptions. Shams independently recollects and verifies asset state; she does not duplicate the execution runner. When: At the input/fixture review and again before C13 acceptance; coordinate after its prerequisites are available. Deliver: `reviews/c13-amr.md — Reproducible observation/runner evidence and failing edge cases`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- Mahrous: Review matching/reassessment, closure and recurrence decisions against independent fresh asset evidence. Shams owns the verification component; Amr runs authorized patch/recovery operations through C11/C12/C14. When: At the contract/input review and again before package acceptance after the listed prerequisites are available. Deliver: `reviews/c13-mahrous.md — Matching/closure review and disposition`. Review: Shams records findings and disposition; unresolved safety, identity or contract blockers prevent acceptance.

### Scope Revision

- Verified closure is the boundary needed for credible recurrence and root-cause review.
- 6 November 2026: primary ownership transferred from Mahrous to Shams at Mahrous’s request to consolidate asset responsibility. Own independent post-remediation asset evidence, verification code and tests. Amr retains execution and recovery operations; Mahrous reviews applicability and closure decisions. Earlier work retains actual authorship; existing dependencies, deliverables, acceptance and completion state are retained.
- 6 November: strengthen asset research with decision evidence, comparison/failure cases, consumer review and reproducible references. Existing ownership, scope gates and delivery acceptance remain in force.

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

Independent collection and deterministic reassessment plus adapter-specific service checks. No universal rollback claim; recovery must be rehearsed for the selected lab target.

### Expected Deliverables

- `backend/app/remediation/verification.py`
- `lab/recovery-matrix.md`
- `fixtures/patch/postcheck-results.jsonl`
- `tests/remediation/test_verification.py`
- `reports/recovery-drill.md`
- `docs/research/assets/c13-decision-brief.md`
- `docs/research/assets/c13-evidence-matrix.csv`

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- Return package exit zero with a failed health check and keep the finding open
- Restore an old vulnerable version and expect the finding to reopen
- Run a clean post-observation and verify its source/evidence links
- Reproduce one selected research claim from its cited source or authorized fixture, and verify that missing/contradictory evidence remains explicit.

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

## C17 — Reconcile Asset Identities With Reviewable Conflict Decisions

**Owner:** Shams · **Support:** Mahrous, Omar

**Delivery layer:** Deferred extension · **Gate:** G2

**Scope version:** 2026-10-23.r2

**Goal:** One deterministic resolver for approved enrollment identities on two sources, returning associate, distinct or needs_review. Preserve observations and reasons. Begin with a small conflict corpus; cross-source auto-merge is gated.

**Why This Matters:** Implement a deterministic resolver for enrolled host identities across observation sources, IP reuse and rebuilds. Preserve ambiguous identities as separate candidates with reviewable reasons.

**Depends on:** C03, C05, P02, P03, P04

**Inputs:**
- C03 delivered contract/fixture
- C05 delivered contract/fixture
- P02 delivered contract/fixture
- P03 delivered contract/fixture
- P04 delivered contract/fixture

**First action:** Freeze the C03 enrolled-ID baseline and reviewer-labelled conflict cases before changing rules.

### Smallest useful delivery

One deterministic resolver for approved enrollment identities on two sources, returning associate, distinct or needs_review. Preserve observations and reasons. Begin with a small conflict corpus; cross-source auto-merge is gated.

Activation gate: Activate only when at least two observation sources or demonstrated identity conflicts require it. The initial enrolled-asset path in C03/C05 must work without this extension.

Input/output boundary: `resolve_identity(observations, trusted_enrollment_rules, rule_revision) → decision, candidate_ids, evidence_refs, reason_codes. Persist or expose corrections only through delivered P03/P04 contracts.`

### Baseline and useful evidence

Use the existing enrolled-ID rules as the main baseline. IP-only matching is a diagnostic weak comparator, not the only method to beat.

- False merge, false split and needs_review counts with reviewed-case denominators.
- Replay consistency and correction-history preservation; report each unsafe association separately.

### Synthetic design expectations

These cases specify expected behavior. They are not executed lab results or independent benchmark ground truth.

#### Same enrollment, changed address

Input:
```json
{
  "previous": {
    "asset_id": "asset-A",
    "enrollment": "key-A",
    "address": "address-1"
  },
  "current": {
    "enrollment": "key-A",
    "address": "address-2"
  },
  "conflicts": []
}
```

Expected behavior:
```json
{
  "decision": "associate",
  "asset_id": "asset-A"
}
```

An address change alone does not create a different enrolled host.

#### Address reused by a different enrollment

Input:
```json
{
  "previous": {
    "asset_id": "asset-A",
    "enrollment": "key-A",
    "address": "address-1"
  },
  "current": {
    "enrollment": "key-B",
    "address": "address-1"
  }
}
```

Expected behavior:
```json
{
  "decision": "distinct",
  "automatic_merge": false
}
```

An address is not sufficient host identity.

#### Conflicting concurrent claims

Input:
```json
{
  "observations": [
    {
      "enrollment": "key-A",
      "boot_identity": "boot-A"
    },
    {
      "enrollment": "key-A",
      "boot_identity": "boot-B"
    }
  ],
  "conflict_state": "unresolved"
}
```

Expected behavior:
```json
{
  "decision": "needs_review",
  "automatic_merge": false,
  "preserve_both": true
}
```

A copied identifier or conflicting claim must remain visible; exact equality alone cannot erase a known conflict.

[Download behavior cases](research/assets/C17-behavior-examples.json)

### Creative choices to investigate

- Compare rule ordering, conflict explanations or conservative association policies on the same frozen cases.
- Change an association rule only with a recorded counterexample, consumer review and rule revision.

### Research / Questions to Answer

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. Use the existing enrolled-ID rules as the main baseline. IP-only matching is a diagnostic weak comparator, not the only method to beat. Choose and justify a method; the reference examples constrain observable behavior, not the internal algorithm.

- Which identity signals survive IP changes, re-enrollment and host cloning, and which conflicts must block an automatic association?
- How can a resolution be reproduced from immutable observations and a rule revision without deleting earlier identities?
- What evidence would reverse an incorrect association, and how will the consumer see that correction?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Source starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

### Support Contributions and Handoff

- Mahrous: Mahrous reviews identity ambiguity and product-matching separation; Omar checks persistence/auth compatibility. Mahrous reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c17-mahrous.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.
- Omar: Mahrous reviews identity ambiguity and product-matching separation; Omar checks persistence/auth compatibility. Omar reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c17-omar.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.
- 6 November review: narrow the minimum implementation, correct dependency/scope gates, and separate required behavior from creative choices. No implemented or measured result is claimed.

### Implementation Steps

1. Read the versioned input/consumer contracts, minimum deliverable, example expectations and activation gate.
2. Freeze the C03 enrolled-ID baseline and reviewer-labelled conflict cases before changing rules.
3. Implement the pure decision function and explicit ambiguity states.
4. Compare the baseline and proposed rules using fixed cases, counting false associations and unresolved cases separately.
5. Add persistence/authorized correction only through delivered P03/P04; preserve earlier source records.
6. Review counterexamples and rule revisions with Mahrous and Omar.
7. Record input/configuration revisions and the reviewers’ findings. Research documents may be equivalent indexed sections in a shared asset notebook/ledger.

### Technical Approach

resolve_identity(observations, trusted_enrollment_rules, rule_revision) → decision, candidate_ids, evidence_refs, reason_codes. Persist or expose corrections only through delivered P03/P04 contracts. Activate only when at least two observation sources or demonstrated identity conflicts require it. The initial enrolled-asset path in C03/C05 must work without this extension.

### Expected Deliverables

- `backend/app/inventory/identity_resolution.py`
- `contracts/v1/asset-identity-resolution.schema.json`
- `fixtures/assets/identity-conflicts.jsonl`
- `tests/inventory/test_identity_resolution.py`
- `reports/assets/identity-resolution-evaluation.md`
- `docs/research/assets/c17-decision-brief.md`
- `docs/research/assets/c17-evidence-matrix.csv`

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- Replay IP reuse, cloned identity and re-enrollment cases; two distinct hosts must not silently merge.
- Replay the same inputs/rule revision and obtain the same decision and evidence references.
- Correct a false association without deleting the old observation or borrowing another tenant’s identity.
- Verify the design case “Same enrollment, changed address” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “Address reused by a different enrollment” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “Conflicting concurrent claims” against the independently reviewed expectation; preserve its synthetic/design-only label.

### Acceptance Criteria

- The minimum implementation consumes valid named inputs and meets the reviewed behavior cases; examples/templates alone do not establish completion.
- Every mandatory artifact exists or maps to agreed equivalent sections; preserve original evidence and disclose unresolved failures.
- Publish the specified baseline/metric results with denominators, measured/not-run state and limitations. A negative result may satisfy research acceptance if the protocol and artifact requirements are met.
- Activation, authorization and existing platform boundaries remain enforced; no new owner, command or queue authority is introduced.
- Named supporting reviewers reproduce the relevant contract/case check and record findings/disposition.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

Review and qualified follow-up; no mandatory consumer is listed.

## C18 — Build Immutable Asset Snapshot Deltas and Replayable Change Evidence

**Owner:** Shams · **Support:** Mahrous, Omar

**Delivery layer:** Current core · **Gate:** G2

**Scope version:** 2026-10-23.r2

**Goal:** A pure comparison of two validated snapshots for the same unambiguous enrolled asset. Handle package additions/version changes and complete versus partial package lists. Service/firmware comparisons can follow after this works.

**Why This Matters:** Produce field-level asset changes from immutable observations, with explicit collection completeness and ordering, so consumers can distinguish a real removal from failed collection.

**Depends on:** C03, C05

**Inputs:**
- C03 delivered contract/fixture
- C05 delivered contract/fixture

**First action:** Validate both input packets and same-asset/same-scope comparability.

### Smallest useful delivery

A pure comparison of two validated snapshots for the same unambiguous enrolled asset. Handle package additions/version changes and complete versus partial package lists. Service/firmware comparisons can follow after this works.

Activation gate: Start the pure function once C03/C05 inputs are available. Full C17 reconciliation is not required; conflicting identities produce incomparable. Persist/emit through P03/P07 only when those integration contracts are delivered.

Input/output boundary: `diff_snapshot(previous, current, comparison_revision) → changes, per_scope_completeness, comparison_state, source_snapshot_ids. Never modify either input.`

### Baseline and useful evidence

Compare with a simple set difference on complete, same-scope exports, then expose where that baseline fails on partial/failed or reordered collection.

- Added/changed/removed errors on independently reviewed snapshot pairs.
- False removals from incomplete collection; duplicate semantic events on replay.

### Synthetic design expectations

These cases specify expected behavior. They are not executed lab results or independent benchmark ground truth.

#### A partial listing omits a known package

Input:
```json
{
  "previous": {
    "asset_id": "asset-A",
    "packages": [
      "demo-a",
      "demo-b"
    ],
    "complete": true
  },
  "current": {
    "asset_id": "asset-A",
    "packages": [
      "demo-a"
    ],
    "complete": false
  }
}
```

Expected behavior:
```json
{
  "demo_b_state": "unknown",
  "removed": []
}
```

Omission from an incomplete collection is not evidence of an uninstall.

#### A complete comparable listing confirms removal

Input:
```json
{
  "previous": {
    "asset_id": "asset-A",
    "packages": [
      "demo-a",
      "demo-b"
    ],
    "scope": "packages",
    "complete": true
  },
  "current": {
    "asset_id": "asset-A",
    "packages": [
      "demo-a"
    ],
    "scope": "packages",
    "complete": true
  }
}
```

Expected behavior:
```json
{
  "removed": [
    "demo-b"
  ]
}
```

A removal requires complete, comparable scope and stable identity.

#### Different asset identities

Input:
```json
{
  "previous": {
    "asset_id": "asset-A"
  },
  "current": {
    "asset_id": "asset-B"
  }
}
```

Expected behavior:
```json
{
  "comparison_state": "incomparable",
  "changes": []
}
```

Do not manufacture a before/after history between different or unresolved identities.

[Download behavior cases](research/assets/C18-behavior-examples.json)

### Creative choices to investigate

- Choose the normalization and stable event-key strategy; prove deterministic replay and bounded behavior.
- Extend to services only after a declared coverage contract makes absence interpretable.

### Research / Questions to Answer

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. Compare with a simple set difference on complete, same-scope exports, then expose where that baseline fails on partial/failed or reordered collection. Choose and justify a method; the reference examples constrain observable behavior, not the internal algorithm.

- Which package/service/OS changes are comparable across collector versions and incomplete snapshots?
- How should duplicates, late arrivals, time skew and missing fields affect a delta?
- Which inventory events can D13 consume without mistaking a failed collection for an uninstall?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Source starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

### Support Contributions and Handoff

- Mahrous: Mahrous reviews the D13 event boundary; Omar reviews existing event/persistence compatibility. Mahrous reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c18-mahrous.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.
- Omar: Mahrous reviews the D13 event boundary; Omar reviews existing event/persistence compatibility. Omar reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c18-omar.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.
- 6 November review: narrow the minimum implementation, correct dependency/scope gates, and separate required behavior from creative choices. No implemented or measured result is claimed.

### Implementation Steps

1. Read the versioned input/consumer contracts, minimum deliverable, example expectations and activation gate.
2. Validate both input packets and same-asset/same-scope comparability.
3. Implement package-level comparison as a pure function; preserve completeness and failure metadata.
4. Separate removed from unknown/incomparable and keep both source revisions.
5. Use stable event IDs and collection-time ordering; duplicates and late arrivals must remain explainable.
6. Evaluate the three example families plus independent held-out pairs before adding optional fields.
7. Record input/configuration revisions and the reviewers’ findings. Research documents may be equivalent indexed sections in a shared asset notebook/ledger.

### Technical Approach

diff_snapshot(previous, current, comparison_revision) → changes, per_scope_completeness, comparison_state, source_snapshot_ids. Never modify either input. Start the pure function once C03/C05 inputs are available. Full C17 reconciliation is not required; conflicting identities produce incomparable. Persist/emit through P03/P07 only when those integration contracts are delivered.

### Expected Deliverables

- `backend/app/inventory/snapshot_delta.py`
- `contracts/v1/asset-inventory-delta.schema.json`
- `fixtures/assets/snapshot-sequences.jsonl`
- `tests/inventory/test_snapshot_delta.py`
- `docs/assets/inventory-change-handoff.md`
- `docs/research/assets/c18-decision-brief.md`
- `docs/research/assets/c18-evidence-matrix.csv`

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- A partial/failed package listing must not imply all prior packages were removed.
- Reorder and duplicate snapshots; preserve stable event identity and explain chronology conflicts.
- Verify that raw evidence stays unchanged and D13 can consume the delta fixture without a new scheduler.
- Verify the design case “A partial listing omits a known package” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “A complete comparable listing confirms removal” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “Different asset identities” against the independently reviewed expectation; preserve its synthetic/design-only label.

### Acceptance Criteria

- The minimum implementation consumes valid named inputs and meets the reviewed behavior cases; examples/templates alone do not establish completion.
- Every mandatory artifact exists or maps to agreed equivalent sections; preserve original evidence and disclose unresolved failures.
- Publish the specified baseline/metric results with denominators, measured/not-run state and limitations. A negative result may satisfy research acceptance if the protocol and artifact requirements are met.
- Activation, authorization and existing platform boundaries remain enforced; no new owner, command or queue authority is introduced.
- Named supporting reviewers reproduce the relevant contract/case check and record findings/disposition.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

C22, C23

## C19 — Evaluate Asset Evidence Freshness, Completeness and Conflicts Per Field

**Owner:** Shams · **Support:** Mahrous

**Delivery layer:** Current core · **Gate:** G2

**Scope version:** 2026-10-23.r2

**Goal:** Evaluate a single snapshot plus an explicit as_of time and versioned field policy. Begin with package identity/version and collection time; report usable, stale, missing, conflicting or time_uncertain with reasons.

**Why This Matters:** Implement a versioned, explainable asset-evidence policy that reports which fields are usable, stale, missing or conflicting at an explicit evaluation time.

**Depends on:** C03, C05

**Inputs:**
- C03 delivered contract/fixture
- C05 delivered contract/fixture

**First action:** Freeze the field-policy schema and reviewed expected states for stale/missing/partial/conflict cases.

### Smallest useful delivery

Evaluate a single snapshot plus an explicit as_of time and versioned field policy. Begin with package identity/version and collection time; report usable, stale, missing, conflicting or time_uncertain with reasons.

Activation gate: C18 history is not a prerequisite for single-observation freshness. Cross-observation conflict resolution is optional; unavailable or contradictory evidence must remain unresolved.

Input/output boundary: `evaluate_evidence(snapshot, field_policy, as_of) → per_field_states, reason_codes, source_refs, policy_revision. Collection time and receipt time are different inputs.`

### Baseline and useful evidence

Compare latest-received and age-only checks with field-level evaluation on the same reviewed cases. A configured age threshold is an assumption to justify, not a measured universal constant.

- False-usable/false-fresh decisions, missing/conflicting counts and per-profile coverage.
- Deterministic replay at fixed as_of; error slices for imports, partial failures and clock uncertainty.

### Synthetic design expectations

These cases specify expected behavior. They are not executed lab results or independent benchmark ground truth.

#### An old observation arrives recently

Input:
```json
{
  "collected_at": "2026-11-06T08:00:00Z",
  "received_at": "2026-11-06T08:09:00Z",
  "as_of": "2026-11-06T08:10:00Z",
  "example_policy": {
    "max_age_seconds": 300
  }
}
```

Expected behavior:
```json
{
  "state": "stale",
  "age_seconds": 600
}
```

The 300-second value is illustrative only; receipt does not refresh collection time.

#### No reliable collection time

Input:
```json
{
  "collected_at": null,
  "received_at": "2026-11-06T08:09:00Z",
  "as_of": "2026-11-06T08:10:00Z"
}
```

Expected behavior:
```json
{
  "state": "time_uncertain",
  "usable": false
}
```

A receipt timestamp cannot establish the observation age.

#### One collected field does not fill another

Input:
```json
{
  "observed_fields": {
    "package_version": "demo-1.0"
  },
  "required_fields": [
    "package_version",
    "architecture"
  ],
  "collection_state": "partial"
}
```

Expected behavior:
```json
{
  "architecture": "missing",
  "all_required_fields_usable": false
}
```

Field-level completeness remains explicit even when one command succeeds.

[Download behavior cases](research/assets/C19-behavior-examples.json)

### Creative choices to investigate

- Research field/profile-specific thresholds and alternative conflict policies; predeclare them before evaluating the held-out cases.
- Prefer understandable reason codes; a confidence percentage needs separate calibration evidence.

### Research / Questions to Answer

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. Compare latest-received and age-only checks with field-level evaluation on the same reviewed cases. A configured age threshold is an assumption to justify, not a measured universal constant. Choose and justify a method; the reference examples constrain observable behavior, not the internal algorithm.

- Which freshness windows and mandatory fields are defensible for each supported asset/collection profile?
- How will original collection time, clock uncertainty, partial failure and conflicting observations change usability?
- How can consumers inspect the exact reasons instead of relying on an uncalibrated confidence percentage?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Source starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

### Support Contributions and Handoff

- Mahrous: Mahrous checks how evidence usability is consumed by matching/verification without changing their authority. Mahrous reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c19-mahrous.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.
- 6 November review: narrow the minimum implementation, correct dependency/scope gates, and separate required behavior from creative choices. No implemented or measured result is claimed.

### Implementation Steps

1. Read the versioned input/consumer contracts, minimum deliverable, example expectations and activation gate.
2. Freeze the field-policy schema and reviewed expected states for stale/missing/partial/conflict cases.
3. Implement the pure function using explicit evaluation time and source metadata.
4. Evaluate fields separately; do not refresh old imports or fill missing timestamps.
5. Compare against latest-received/age-only baselines on the same cases.
6. Hand reason-coded states to matching/verification consumers without replacing their decisions.
7. Record input/configuration revisions and the reviewers’ findings. Research documents may be equivalent indexed sections in a shared asset notebook/ledger.

### Technical Approach

evaluate_evidence(snapshot, field_policy, as_of) → per_field_states, reason_codes, source_refs, policy_revision. Collection time and receipt time are different inputs. C18 history is not a prerequisite for single-observation freshness. Cross-observation conflict resolution is optional; unavailable or contradictory evidence must remain unresolved.

### Expected Deliverables

- `backend/app/inventory/evidence_quality.py`
- `config/assets/evidence-quality-policy.yaml`
- `contracts/v1/asset-evidence-quality.schema.json`
- `fixtures/assets/evidence-quality-cases.jsonl`
- `tests/inventory/test_evidence_quality.py`
- `reports/assets/evidence-quality-review.md`
- `docs/research/assets/c19-decision-brief.md`
- `docs/research/assets/c19-evidence-matrix.csv`

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- Reimport old data and retain its age; evaluate identically with a fixed as_of time.
- Preserve unknown/conflict/time_uncertain under missing timestamps and skew.
- A successful collection of one field must not mark every other field fresh or complete.
- Verify the design case “An old observation arrives recently” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “No reliable collection time” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “One collected field does not fill another” against the independently reviewed expectation; preserve its synthetic/design-only label.

### Acceptance Criteria

- The minimum implementation consumes valid named inputs and meets the reviewed behavior cases; examples/templates alone do not establish completion.
- Every mandatory artifact exists or maps to agreed equivalent sections; preserve original evidence and disclose unresolved failures.
- Publish the specified baseline/metric results with denominators, measured/not-run state and limitations. A negative result may satisfy research acceptance if the protocol and artifact requirements are met.
- Activation, authorization and existing platform boundaries remain enforced; no new owner, command or queue authority is introduced.
- Named supporting reviewers reproduce the relevant contract/case check and record findings/disposition.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

C20, C21, C22, C23

## C20 — Plan the Smallest Approved Collection Needed to Resolve Asset Evidence Gaps

**Owner:** Shams · **Support:** Mahrous, Omar

**Delivery layer:** Conditional experiment · **Gate:** G2

**Scope version:** 2026-10-23.r2

**Goal:** For one Ubuntu profile and a small approved read-only probe set, map structured missing fields to a deterministic, budget-bound plan. Start with a simple rule or enumeration; keep full collection as a working fallback.

**Why This Matters:** Map structured missing asset-field keys to approved read-only collection probes and choose a bounded plan under a declared cost/budget, with a reason for each requested fact.

**Depends on:** C19, D08, P08, C22

**Inputs:**
- C19 delivered contract/fixture
- D08 delivered contract/fixture
- P08 delivered contract/fixture
- C22 delivered contract/fixture

**First action:** Use C22’s frozen cases and a delivered approved capability map; verify field-level probes really exist.

### Smallest useful delivery

For one Ubuntu profile and a small approved read-only probe set, map structured missing fields to a deterministic, budget-bound plan. Start with a simple rule or enumeration; keep full collection as a working fallback.

Activation gate: Activate after C22 freezes independent cases/core baselines and the approved adapters expose separately callable field probes. If only one full-inventory operation exists, record the limitation rather than inventing selective collection.

Input/output boundary: `plan_probes(asset_revision, gap_keys, approved_capabilities, budget, policy_revision) → selected_probe_ids, covered_gap_keys, estimated_cost, unresolved_gap_keys, reasons. A plan is not a collected result.`

### Baseline and useful evidence

Compare full inventory and a sensible fixed-rule selector with the proposed selector. Pin the same initial snapshots, target scope, case set and available probes for every method.

- Actual elapsed time, attempts, transferred bytes where available, and gaps actually resolved after collection.
- Critical identity/freshness errors and unresolved cases; estimated policy cost is reported separately from measured resource cost.
- Include connection/setup, retries, failed probes and fallbacks in total cost.

### Synthetic design expectations

These cases specify expected behavior. They are not executed lab results or independent benchmark ground truth.

#### A small approved probe covers the gap

Input:
```json
{
  "gap_keys": [
    "installed_version"
  ],
  "capabilities": [
    {
      "id": "package_version",
      "fields": [
        "installed_version"
      ],
      "read_only": true,
      "example_cost_units": 1
    },
    {
      "id": "full_inventory",
      "fields": [
        "installed_version",
        "architecture"
      ],
      "read_only": true,
      "example_cost_units": 3
    }
  ],
  "budget_units": 1
}
```

Expected behavior:
```json
{
  "selected_probe_ids": [
    "package_version"
  ],
  "collection_state": "not_run",
  "gap_resolved": false
}
```

Configured cost units are design examples, not measured seconds or savings; only a validated returned observation can resolve the gap.

#### The requested operation is not approved

Input:
```json
{
  "gap_keys": [
    "installed_version"
  ],
  "candidate": {
    "id": "unlisted_operation",
    "approved": false
  }
}
```

Expected behavior:
```json
{
  "selected_probe_ids": [],
  "plan_state": "denied"
}
```

The planner cannot introduce a command or widen execution authority.

#### No candidate fits the available budget

Input:
```json
{
  "gap_keys": [
    "installed_version"
  ],
  "capabilities": [
    {
      "id": "package_version",
      "approved": true,
      "example_cost_units": 2
    }
  ],
  "budget_units": 1
}
```

Expected behavior:
```json
{
  "selected_probe_ids": [],
  "plan_state": "budget_exhausted",
  "unresolved_gap_keys": [
    "installed_version"
  ]
}
```

Return an honest unresolved case rather than exceeding the bound.

[Download behavior cases](research/assets/C20-behavior-examples.json)

### Creative choices to investigate

- Try a transparent greedy rule, bounded enumeration or another justified selector; freeze the configuration before final comparison.
- Investigate when batching or full inventory is cheaper than selective probes. A negative result can reject the candidate and retain the baseline.

### Research / Questions to Answer

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. Compare full inventory and a sensible fixed-rule selector with the proposed selector. Pin the same initial snapshots, target scope, case set and available probes for every method. Choose and justify a method; the reference examples constrain observable behavior, not the internal algorithm.

- Which approved probe supplies each asset field, and which fields cannot be collected in the current scope?
- Can deterministic coverage/cost rules reduce unnecessary collection versus always running full inventory?
- How should stale evidence, missing permissions, identity conflict and exhausted budgets prevent or limit a plan?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Source starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

### Support Contributions and Handoff

- Mahrous: Mahrous reviews gap semantics and baseline outcomes; Omar reviews typed-envelope compatibility and denied operations. Mahrous reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c20-mahrous.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.
- Omar: Mahrous reviews gap semantics and baseline outcomes; Omar reviews typed-envelope compatibility and denied operations. Omar reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c20-omar.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.
- 6 November review: narrow the minimum implementation, correct dependency/scope gates, and separate required behavior from creative choices. No implemented or measured result is claimed.

### Implementation Steps

1. Read the versioned input/consumer contracts, minimum deliverable, example expectations and activation gate.
2. Use C22’s frozen cases and a delivered approved capability map; verify field-level probes really exist.
3. Define measurable resource budgets separately from estimated selection weights.
4. Implement one simple deterministic selector tied to asset, policy and capability revisions.
5. Send typed plans through P08; recheck identity/scope/expiry before any existing adapter executes.
6. Record validated results, failures and all overhead; unresolved gaps stay unresolved.
7. Run paired baseline/candidate comparisons and publish positive, tied or negative outcomes with uncertainty/limitations.
8. Record input/configuration revisions and the reviewers’ findings. Research documents may be equivalent indexed sections in a shared asset notebook/ledger.

### Technical Approach

plan_probes(asset_revision, gap_keys, approved_capabilities, budget, policy_revision) → selected_probe_ids, covered_gap_keys, estimated_cost, unresolved_gap_keys, reasons. A plan is not a collected result. Activate after C22 freezes independent cases/core baselines and the approved adapters expose separately callable field probes. If only one full-inventory operation exists, record the limitation rather than inventing selective collection.

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

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- Unknown/mutating commands and denied target scopes produce no executable collection plan.
- Enforce the declared budget and prevent duplicate probes for equivalent requirements.
- Measure resolved evidence gaps, unresolved gaps and cost on the same cases for each baseline.
- Verify the design case “A small approved probe covers the gap” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “The requested operation is not approved” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “No candidate fits the available budget” against the independently reviewed expectation; preserve its synthetic/design-only label.

### Acceptance Criteria

- The minimum implementation consumes valid named inputs and meets the reviewed behavior cases; examples/templates alone do not establish completion.
- Every mandatory artifact exists or maps to agreed equivalent sections; preserve original evidence and disclose unresolved failures.
- Publish the specified baseline/metric results with denominators, measured/not-run state and limitations. A negative result may satisfy research acceptance if the protocol and artifact requirements are met.
- Activation, authorization and existing platform boundaries remain enforced; no new owner, command or queue authority is introduced.
- Named supporting reviewers reproduce the relevant contract/case check and record findings/disposition.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

Review and qualified follow-up; no mandatory consumer is listed.

## C21 — Plan Bounded Asset Collection Campaigns With Backpressure and Recovery

**Owner:** Shams · **Support:** Omar, Amr

**Delivery layer:** Deferred extension · **Gate:** G2

**Scope version:** 2026-10-23.r2

**Goal:** Generate a bounded batch of read-only collection intents using P07’s existing job ledger. Implement only asset eligibility and rate/concurrency policy; reuse existing retry, lease, cancellation and recovery state.

**Why This Matters:** Build asset-domain campaign planning for bounded batches, per-target limits, backoff and resumable progress while delegating durable dispatch and authentication to the existing platform.

**Depends on:** C19, C04, C05, P07, P08

**Inputs:**
- C19 delivered contract/fixture
- C04 delivered contract/fixture
- C05 delivered contract/fixture
- P07 delivered contract/fixture
- P08 delivered contract/fixture

**First action:** Measure the existing serial path before defining an optimization target.

### Smallest useful delivery

Generate a bounded batch of read-only collection intents using P07’s existing job ledger. Implement only asset eligibility and rate/concurrency policy; reuse existing retry, lease, cancellation and recovery state.

Activation gate: Activate when a measured multi-asset baseline violates an agreed time/resource/operator-effort target. A small lab that works with existing serial dispatch does not justify a new orchestration subsystem. C20 is optional, not a prerequisite.

Input/output boundary: `prepare_collection_intents(eligible_assets, existing_job_state, limits, campaign_revision) → bounded_intents, deferred_targets, denied_targets, reasons. P07/P08 remain the only durable dispatch/auth boundary.`

### Baseline and useful evidence

Start with the existing bounded serial worker. Compare only after measuring a real bottleneck; keep simulated planning load separate from measured lab collection.

- Actual throughput, per-target delay and failure/unknown states at a declared approved load.
- Maximum observed concurrency and budget violations; no duplicate semantic intents on ledger replay.

### Synthetic design expectations

These cases specify expected behavior. They are not executed lab results or independent benchmark ground truth.

#### One slot remains under the concurrency limit

Input:
```json
{
  "running_targets": 1,
  "max_concurrency": 2,
  "eligible_targets": [
    "asset-A",
    "asset-B",
    "asset-C"
  ]
}
```

Expected behavior:
```json
{
  "new_intents_at_most": 1,
  "deferred_targets": 2
}
```

Existing active work consumes capacity; intent preparation must respect it.

#### The semantic intent already exists

Input:
```json
{
  "proposed_key": "asset-A:snapshot-r1:collect-v1",
  "ledger_keys": [
    "asset-A:snapshot-r1:collect-v1"
  ]
}
```

Expected behavior:
```json
{
  "new_intents": [],
  "reuse_existing": true
}
```

Reuse the existing ledger identity instead of creating another retry/recovery engine.

#### Campaign cancelled before preparation

Input:
```json
{
  "campaign_state": "cancelled",
  "eligible_targets": [
    "asset-A"
  ]
}
```

Expected behavior:
```json
{
  "new_intents": []
}
```

Cancellation blocks new intent generation; ledger/runner owners govern already-running attempts.

[Download behavior cases](research/assets/C21-behavior-examples.json)

### Creative choices to investigate

- Test batching/backoff/eligibility policies through the same ledger; choose the simplest policy that meets the measured target.
- Propose another queue/worker only as a separately reviewed platform decision, never as an implicit part of this asset task.

### Research / Questions to Answer

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. Start with the existing bounded serial worker. Compare only after measuring a real bottleneck; keep simulated planning load separate from measured lab collection. Choose and justify a method; the reference examples constrain observable behavior, not the internal algorithm.

- Which batch/concurrency/time/traffic limits protect the chosen authorized lab/device classes?
- How can incremental collection avoid repeatedly reading unchanged fields while respecting fresh-evidence needs?
- How will offline assets, partial results, duplicate intents, retries and exhausted budgets appear without false success?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Source starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

### Support Contributions and Handoff

- Omar: Omar checks ledger/envelope reuse; Amr reviews authorized lab load assumptions without taking collection ownership. Omar reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c21-omar.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.
- Amr: Omar checks ledger/envelope reuse; Amr reviews authorized lab load assumptions without taking collection ownership. Amr reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c21-amr.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.
- 6 November review: narrow the minimum implementation, correct dependency/scope gates, and separate required behavior from creative choices. No implemented or measured result is claimed.

### Implementation Steps

1. Read the versioned input/consumer contracts, minimum deliverable, example expectations and activation gate.
2. Measure the existing serial path before defining an optimization target.
3. Freeze asset-specific eligibility and limits while reusing delivered P07/P08 contracts.
4. Generate bounded idempotent intents from existing ledger state.
5. Keep target deferrals, denied targets and outcome_unknown visible; do not implement a second retry/lease state machine.
6. Compare the candidate with the serial baseline only at approved lab load; publish the activate/defer decision.
7. Record input/configuration revisions and the reviewers’ findings. Research documents may be equivalent indexed sections in a shared asset notebook/ledger.

### Technical Approach

prepare_collection_intents(eligible_assets, existing_job_state, limits, campaign_revision) → bounded_intents, deferred_targets, denied_targets, reasons. P07/P08 remain the only durable dispatch/auth boundary. Activate when a measured multi-asset baseline violates an agreed time/resource/operator-effort target. A small lab that works with existing serial dispatch does not justify a new orchestration subsystem. C20 is optional, not a prerequisite.

### Expected Deliverables

- `backend/app/inventory/collection_campaigns.py`
- `config/assets/collection-budgets.yaml`
- `contracts/v1/asset-collection-intent.schema.json`
- `tests/inventory/test_collection_campaigns.py`
- `experiments/assets/collection_load_profile.py`
- `reports/assets/collection-scale-and-recovery.md`
- `docs/research/assets/c21-decision-brief.md`
- `docs/research/assets/c21-evidence-matrix.csv`

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- Crash/replay intent preparation and verify no duplicate semantic collection intent.
- Enforce per-target/global limits and stop dispatch intent generation when cancelled or out of budget.
- Unavailable assets retain failed/unknown states and cannot appear freshly collected.
- Verify the design case “One slot remains under the concurrency limit” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “The semantic intent already exists” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “Campaign cancelled before preparation” against the independently reviewed expectation; preserve its synthetic/design-only label.

### Acceptance Criteria

- The minimum implementation consumes valid named inputs and meets the reviewed behavior cases; examples/templates alone do not establish completion.
- Every mandatory artifact exists or maps to agreed equivalent sections; preserve original evidence and disclose unresolved failures.
- Publish the specified baseline/metric results with denominators, measured/not-run state and limitations. A negative result may satisfy research acceptance if the protocol and artifact requirements are met.
- Activation, authorization and existing platform boundaries remain enforced; no new owner, command or queue authority is introduced.
- Named supporting reviewers reproduce the relevant contract/case check and record findings/disposition.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

Review and qualified follow-up; no mandatory consumer is listed.

## C22 — Build Independent Asset Cases & Evaluate Evidence Quality

**Owner:** Shams · **Support:** Mahrous, Omar

**Delivery layer:** Current core · **Gate:** G2

**Scope version:** 2026-10-23.r2

**Goal:** Start with the protocol and reviewed expectations, then run the core asset pipeline on frozen authorized exports and separately labelled synthetic edge cases. C17/C20/C21/C13 are not hard prerequisites for this core benchmark.

**Why This Matters:** Build a reproducible asset-only benchmark testing identity, change fidelity, evidence quality and bounded recollection, including whether their combined workflow earns a measurable benefit.

**Depends on:** C03, C05, C18, C19

**Inputs:**
- C03 delivered contract/fixture
- C05 delivered contract/fixture
- C18 delivered contract/fixture
- C19 delivered contract/fixture

**First action:** Draft and review the protocol, expected-case annotation guide and comparison questions before implementing the candidate methods.

### Smallest useful delivery

Start with the protocol and reviewed expectations, then run the core asset pipeline on frozen authorized exports and separately labelled synthetic edge cases. C17/C20/C21/C13 are not hard prerequisites for this core benchmark.

Activation gate: Protocol, question and case design start now. Core measured acceptance requires delivered C03/C05/C18/C19 inputs. Optional identity/adaptive/campaign comparisons are follow-up slices only after their own activation gates.

Input/output boundary: `evaluate_asset_cases(case_manifest, expected_labels, method_revision, run_config) → per_case_results, metric_denominators, failures, limitations, measured_or_not_run_state. Expected labels must not come solely from the evaluated component.`

### Baseline and useful evidence

Freeze a complete-inventory/straight set-diff baseline and a sensible field-age rule baseline before final comparison. Use identical cases, scope and budgets; disclose when a comparator is unavailable.

- False removals from partial collection, false-usable/fresh states, identity mismatches and unresolved cases per case family.
- Paired cost/quality outcomes for optional C20 only after real field-level collection is qualified.
- Separate real-lab, replay and synthetic denominators; record failures and small-sample uncertainty.

### Synthetic design expectations

These cases specify expected behavior. They are not executed lab results or independent benchmark ground truth.

#### The adaptive candidate has not been qualified

Input:
```json
{
  "core_inputs_ready": true,
  "adaptive_candidate_state": "not_qualified"
}
```

Expected behavior:
```json
{
  "core_benchmark_can_run": true,
  "adaptive_result": "not_run"
}
```

Core evidence evaluation must not wait for every extension or a patch/recovery demonstration.

#### Labels were copied from the component under test

Input:
```json
{
  "expected_label_source": "candidate_output_only"
}
```

Expected behavior:
```json
{
  "ground_truth_accepted": false,
  "review_required": true
}
```

Independent source/export review is necessary to avoid circular evaluation.

#### Lower example cost but a critical quality error

Input:
```json
{
  "hypothetical_comparison": {
    "candidate_cost": 1,
    "baseline_cost": 3,
    "candidate_false_fresh_count": 1
  }
}
```

Expected behavior:
```json
{
  "benefit_claim_accepted": false,
  "quality_gate_failed": true
}
```

A cheaper unsafe decision is not a demonstrated improvement. These are hypothetical numbers, not measured findings.

[Download behavior cases](research/assets/C22-behavior-examples.json)

### Creative choices to investigate

- Propose a useful hypothesis and an ablation that could falsify it; predeclare the baseline, cases and success/safety criteria.
- A reproducible negative result or simpler winning baseline is an acceptable research outcome.

### Research / Questions to Answer

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. Freeze a complete-inventory/straight set-diff baseline and a sensible field-age rule baseline before final comparison. Use identical cases, scope and budgets; disclose when a comparator is unavailable. Choose and justify a method; the reference examples constrain observable behavior, not the internal algorithm.

- Which independently reviewed asset facts and change sequences exercise false merges, missed changes, stale evidence and partial collection?
- Does adaptive recollection resolve comparable evidence gaps with less collection cost than full refresh under identical safety limits?
- Which claimed gain disappears when identity resolution, deltas, freshness or budget selection is removed?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Source starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

### Support Contributions and Handoff

- Mahrous: Mahrous independently checks case expectations and experiment design; Omar reproduces the asset pipeline/consumer contract. Mahrous reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c22-mahrous.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.
- Omar: Mahrous independently checks case expectations and experiment design; Omar reproduces the asset pipeline/consumer contract. Omar reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c22-omar.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.
- 6 November review: narrow the minimum implementation, correct dependency/scope gates, and separate required behavior from creative choices. No implemented or measured result is claimed.

### Implementation Steps

1. Read the versioned input/consumer contracts, minimum deliverable, example expectations and activation gate.
2. Draft and review the protocol, expected-case annotation guide and comparison questions before implementing the candidate methods.
3. Freeze source/export revisions and independent expectations for complete, partial, stale, conflicting and failed cases.
4. Run the core C18/C19 comparisons as soon as their inputs are delivered; do not wait for C13 or optional extensions.
5. Recompute per-case errors and denominators from raw results, keeping all failures visible.
6. For optional studies, freeze added criteria before seeing the results; compare identical cases and count all collection overhead.
7. Publish evidence, limitations and positive/tied/negative conclusions. Mark unavailable comparisons not_run rather than assuming benefit.
8. Record input/configuration revisions and the reviewers’ findings. Research documents may be equivalent indexed sections in a shared asset notebook/ledger.

### Technical Approach

evaluate_asset_cases(case_manifest, expected_labels, method_revision, run_config) → per_case_results, metric_denominators, failures, limitations, measured_or_not_run_state. Expected labels must not come solely from the evaluated component. Protocol, question and case design start now. Core measured acceptance requires delivered C03/C05/C18/C19 inputs. Optional identity/adaptive/campaign comparisons are follow-up slices only after their own activation gates.

### Expected Deliverables

- `evaluation/assets/case-manifest.json`
- `evaluation/assets/annotation-guide.md`
- `experiments/assets/run_evidence_benchmark.py`
- `reports/assets/evidence-benchmark.json`
- `reports/assets/asset-contribution-and-limitations.md`
- `research/assets/competitor-capability-matrix.md`
- `docs/research/assets/c22-decision-brief.md`
- `docs/research/assets/c22-evidence-matrix.csv`

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- A second reviewer checks expected asset facts without copying the new engine’s output as truth.
- Reproduce metrics from frozen cases and raw results, including failed/unavailable runs.
- Hold budget and case set constant across baselines/ablations; never mix synthetic and real-lab denominators silently.
- Verify the design case “The adaptive candidate has not been qualified” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “Labels were copied from the component under test” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “Lower example cost but a critical quality error” against the independently reviewed expectation; preserve its synthetic/design-only label.

### Acceptance Criteria

- The minimum implementation consumes valid named inputs and meets the reviewed behavior cases; examples/templates alone do not establish completion.
- Every mandatory artifact exists or maps to agreed equivalent sections; preserve original evidence and disclose unresolved failures.
- Publish the specified baseline/metric results with denominators, measured/not-run state and limitations. A negative result may satisfy research acceptance if the protocol and artifact requirements are met.
- Activation, authorization and existing platform boundaries remain enforced; no new owner, command or queue authority is introduced.
- Named supporting reviewers reproduce the relevant contract/case check and record findings/disposition.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

C20, C23

## C23 — Qualify Observed Asset–Service Relationships Without Invented Dependencies

**Owner:** Shams · **Support:** Mahrous, Hams

**Delivery layer:** Conditional experiment · **Gate:** G3

**Scope version:** 2026-10-23.r2

**Goal:** One observed host–package–service relationship view for a narrow approved lab profile, with evidence references and explicit coverage. No inferred business-dependency graph is required.

**Why This Matters:** Research and prototype a provenance-backed asset/package/service relationship view using available observations, while exposing missing coverage and separating observed edges from hypotheses.

**Depends on:** C18, C19, C22

**Inputs:**
- C18 delivered contract/fixture
- C19 delivered contract/fixture
- C22 delivered contract/fixture

**First action:** Freeze one asset-context question and the narrow authorized observation profile with reviewers.

### Smallest useful delivery

One observed host–package–service relationship view for a narrow approved lab profile, with evidence references and explicit coverage. No inferred business-dependency graph is required.

Activation gate: Activate only for a concrete reviewed asset-context question that flat inventory does not answer well, after the core benchmark and capacity review. New probes require a separate approved capability.

Input/output boundary: `assemble_observed_relations(validated_observations, as_of, coverage_policy) → typed_edges, evidence_refs, stale_or_unknown_edges, missing_coverage. Observed connection does not establish business dependence.`

### Baseline and useful evidence

Use the same asset-context questions against flat inventory and the proposed relationship view; measure reviewer correctness/effort and source coverage. Disclose convenience-user limitations.

- Evidence-linked versus unsupported edges, missing coverage and stale-edge handling.
- Correct answers/time on the same reviewed questions; graph size/resource cost at the measured scope.

### Synthetic design expectations

These cases specify expected behavior. They are not executed lab results or independent benchmark ground truth.

#### A source explicitly relates a service to a package

Input:
```json
{
  "observation": {
    "asset_id": "asset-A",
    "service": "demo-service",
    "package": "demo-package",
    "relationship": "explicit_source_mapping",
    "fresh": true
  }
}
```

Expected behavior:
```json
{
  "edge_kind": "observed_mapping",
  "business_criticality": "unknown"
}
```

An observed local relationship does not supply business-impact truth.

#### Only a network connection was observed

Input:
```json
{
  "observation": {
    "asset_id": "asset-A",
    "peer": "asset-B",
    "kind": "connection_only"
  }
}
```

Expected behavior:
```json
{
  "business_dependency": "unproven",
  "coverage": "incomplete"
}
```

A connection alone cannot justify a confirmed business dependency.

#### The relationship evidence is stale

Input:
```json
{
  "edge_source_state": "stale",
  "prior_edge": "asset-A→demo-service"
}
```

Expected behavior:
```json
{
  "current_confirmed_edge": false,
  "preserve_historical_edge": true
}
```

Keep history and current evidence status distinct.

[Download behavior cases](research/assets/C23-behavior-examples.json)

### Creative choices to investigate

- Choose a graph/list representation or explanation design with Hams; justify it through the reviewed context questions.
- Record whether the experiment should be enabled, narrowed or rejected rather than assuming a graph is valuable.

### Research / Questions to Answer

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. Use the same asset-context questions against flat inventory and the proposed relationship view; measure reviewer correctness/effort and source coverage. Disclose convenience-user limitations. Choose and justify a method; the reference examples constrain observable behavior, not the internal algorithm.

- Which package/service/host relationships can the existing authorized collectors actually substantiate?
- What is lost when observations are stale, one-sided, partial or scoped to one host?
- Does an evidence-linked relationship view help reviewers answer asset-context questions compared with a flat inventory, at an acceptable resource cost?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Source starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

### Support Contributions and Handoff

- Mahrous: Mahrous reviews context/priority boundaries; Hams reviews interpretation and the handoff to existing UX design. Mahrous reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c23-mahrous.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.
- Hams: Mahrous reviews context/priority boundaries; Hams reviews interpretation and the handoff to existing UX design. Hams reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c23-hams.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.
- 6 November review: narrow the minimum implementation, correct dependency/scope gates, and separate required behavior from creative choices. No implemented or measured result is claimed.

### Implementation Steps

1. Read the versioned input/consumer contracts, minimum deliverable, example expectations and activation gate.
2. Freeze one asset-context question and the narrow authorized observation profile with reviewers.
3. Define evidence-backed edge types and missing/stale coverage rules.
4. Assemble only observed or explicitly declared relationships from existing approved observations.
5. Keep hypotheses separate and do not infer business criticality or risk scores.
6. Compare against flat inventory on the same questions and publish enable/narrow/defer/reject findings.
7. Record input/configuration revisions and the reviewers’ findings. Research documents may be equivalent indexed sections in a shared asset notebook/ledger.

### Technical Approach

assemble_observed_relations(validated_observations, as_of, coverage_policy) → typed_edges, evidence_refs, stale_or_unknown_edges, missing_coverage. Observed connection does not establish business dependence. Activate only for a concrete reviewed asset-context question that flat inventory does not answer well, after the core benchmark and capacity review. New probes require a separate approved capability.

### Expected Deliverables

- `research/assets/service-relationship-study.md`
- `backend/app/inventory/service_relationships.py`
- `contracts/v1/asset-service-edge.schema.json`
- `fixtures/assets/service-relationship-cases.jsonl`
- `tests/inventory/test_service_relationships.py`
- `reports/assets/service-context-qualification.md`
- `docs/research/assets/c23-decision-brief.md`
- `docs/research/assets/c23-evidence-matrix.csv`

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- A stale or missing observation cannot create an apparently current confirmed relationship.
- Keep hypothesized edges visibly separate from observed evidence.
- Bound graph size and show incomplete coverage; any new probe requires a separate approved capability.
- Verify the design case “A source explicitly relates a service to a package” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “Only a network connection was observed” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “The relationship evidence is stale” against the independently reviewed expectation; preserve its synthetic/design-only label.

### Acceptance Criteria

- The minimum implementation consumes valid named inputs and meets the reviewed behavior cases; examples/templates alone do not establish completion.
- Every mandatory artifact exists or maps to agreed equivalent sections; preserve original evidence and disclose unresolved failures.
- Publish the specified baseline/metric results with denominators, measured/not-run state and limitations. A negative result may satisfy research acceptance if the protocol and artifact requirements are met.
- Activation, authorization and existing platform boundaries remain enforced; no new owner, command or queue authority is introduced.
- Named supporting reviewers reproduce the relevant contract/case check and record findings/disposition.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

Review and qualified follow-up; no mandatory consumer is listed.


## Supporting work

### D05 — Build the Ubuntu Affected-and-Fixed Package Catalog

Owner: Amr. Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Build the Ubuntu Affected-and-Fixed Package Catalog.

Deliver: `reviews/d05-shams.md — Reproducible observation evidence and failing edge cases`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
### D06 — Validate Microsoft and Red Hat Data & Add Scoped Vendor Adapters

Owner: Amr. Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Validate Microsoft and Red Hat Data & Add Scoped Vendor Adapters.

Deliver: `reviews/d06-shams.md — Reproducible observation evidence and failing edge cases`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
### D08 — Normalize Asset Product Identities & Generate Matching Candidates

Owner: Mahrous. Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Normalize Asset Product Identities & Generate Matching Candidates.

Deliver: `reviews/d08-shams.md — Reproducible observation evidence and failing edge cases`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
### D14 — Build a Versioned Catalog of Vendor Fixes and Mitigations

Owner: Amr. Check real/lab asset evidence and practical preflight inputs; no FortiOS mutation implied.

Deliver: `reviews/d14-shams.md — Check real/lab asset evidence and practical preflight inputs; no FortiOS mutation implied.`. Review: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
### D15 — Create Independent Matching Ground Truth & Measure Errors

Owner: Mahrous. Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Create Independent Matching Ground Truth & Measure Errors.

Deliver: `reviews/d15-shams.md — Reproducible observation evidence and failing edge cases`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
### C01 — Define Allowed Lab Targets & Enforce Scan Safety Rules

Owner: Mahrous. Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Define Allowed Lab Targets & Enforce Scan Safety Rules.

Deliver: `reviews/c01-shams.md — Reproducible observation evidence and failing edge cases`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
### C16 — Publish Supported-Coverage Results & Reproduce the End-to-End Demo

Owner: Mahrous. Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance.

Deliver: `reviews/c16-shams.md — Reproducible asset observation evidence`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
### A02 — Create Versioned Training and Evidence Datasets With Provenance

Owner: Hams. Coordinate and assemble vulnerability, asset and contextual inputs; validate joins, timestamps, missingness and data readiness, reusing existing collectors.

Deliver: `reviews/a02-shams.md — Coordinate and assemble vulnerability, asset and contextual inputs; validate joins, timestamps, missingness and data readiness, reusing existing collectors.`. Review: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
### A11 — Generate Targeted Evidence Requests & Compare Constrained Fix Options

Owner: Hams. Prepare representative lab/vendor inputs and check prerequisite/verification practicality without executing unapproved actions.

Deliver: `reviews/a11-shams.md — Prepare representative lab/vendor inputs and check prerequisite/verification practicality without executing unapproved actions.`. Review: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
### A13 — Freeze Human Evaluation Questions, Rubrics and Final Holdout

Owner: Hams. Freeze reproducible scenario inputs and identify unavailable/labelled synthetic evidence.

Deliver: `reviews/a13-shams.md — Freeze reproducible scenario inputs and identify unavailable/labelled synthetic evidence.`. Review: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
### A16 — Package Reproducible AI Experiments and a Faculty Demo

Owner: Hams. Explain the provenance and data lineage of the preserved asset/research inputs during the faculty demo or labelled replay, as already named in the A16 fallback. Coordinate with Hams; Amr retains source-authority and rights review.

Deliver: `reviews/a16-shams.md — Data-lineage walkthrough and observed/synthetic/missing-evidence review`. Review: Hams records the review disposition. Trace one demo example to its source/observation revision, identify synthetic or missing data, and distinguish a labelled replay from a live result.
### P02 — Publish Shared API Contracts and Validate Producer/Consumer Fixtures

Owner: Omar. Supply AssetObservation/inventory fixtures from the authorized collector; validate stable identity, OS/package fields, collected_at, stale/failed collection and missing evidence. Coordinate C03 definitions with Mahrous.

Deliver: `reviews/p02-shams.md — Reproducible observation evidence and failing edge cases`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
### P06 — Connect One Real Asset From Ingestion to a Traceable Finding Screen

Owner: Omar. Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Connect One Real Asset From Ingestion to a Traceable Finding Screen.

Deliver: `reviews/p06-shams.md — Reproducible observation evidence and failing edge cases`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
### P07 — Build the Durable Job Ledger & Test Dispatch Recovery

Owner: Omar. Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance.

Deliver: `reviews/p07-shams.md — Reproducible asset observation evidence`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
### P08 — Authenticate Runners and Enforce Typed, Scoped Execution Envelopes

Owner: Omar. Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance.

Deliver: `reviews/p08-shams.md — Reproducible asset observation evidence`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
### P10 — Build Finding Triage With Priority Reasons and Evidence History

Owner: Omar. Provide reproducible input/failure fixtures for integration.

Deliver: `reviews/p10-shams.md — Provide reproducible input/failure fixtures for integration.`. Review: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
### P11 — Expose One Permission-Scoped AI Gateway With Safe Fallbacks

Owner: Omar. Provide reproducible input/failure fixtures for integration.

Deliver: `reviews/p11-shams.md — Provide reproducible input/failure fixtures for integration.`. Review: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
### P16 — Measure Platform Performance & Package an Accessible Handover

Owner: Omar. Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance.

Deliver: `reviews/p16-shams.md — Reproducible asset observation evidence`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
### UX01 — Research Analyst Decisions and Define the Narrow User Journey

Owner: Hams. Review analyst workflow, user-research findings and usability questions with Hams; this responsibility is independent of advisory ingestion.

Deliver: `reviews/ux01-shams.md — Workflow and usability review`. Review: Record review findings and their disposition.
### UX03 — Test Analyst Task Completion and Hand Off UX Corrections

Owner: Hams. Review analyst workflow, user-research findings and usability questions with Hams; this responsibility is independent of advisory ingestion.

Deliver: `reviews/ux03-shams.md — Workflow and usability review`. Review: Record review findings and their disposition.
### D17 — Normalize Fortinet Advisory Revisions for One FortiOS Profile

Owner: Amr. Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Normalize Fortinet Advisory Revisions for One FortiOS Profile.

Deliver: `reviews/d17-shams.md — Reproducible observation evidence and failing edge cases`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
### P17 — Validate Disconnected Installation and Versioned Update Bundles

Owner: Omar. Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance.

Deliver: `reviews/p17-shams.md — Reproducible asset observation evidence`. Review: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
### A17 — Compare Rule-Based, AI-Assisted and Hybrid Prioritization on Reviewed Organization Scenarios

Owner: Hams. Assemble and validate the A02 experiment input bundle from existing feeds, asset evidence and reviewed context; disclose missing/stale/synthetic fields.

Deliver: `reviews/a17-shams.md — Assemble and validate the A02 experiment input bundle from existing feeds, asset evidence and reviewed context; disclose missing/stale/synthetic fields.`. Review: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

## Research/decision stewardship

- **OQ03 — Who has the strongest initial pain and buying reason?**: Recorded customer discovery with permitted evidence, competing-workflow comparison and explicit assumptions; no demand or superiority claim without evidence.
- **OQ05 — What real organizational data can we legally access?**: A data-access agreement or recorded refusal/unknown, provenance manifest and stage-specific dataset plan; proceed with public records plus declared lab/synthetic fixtures when access is absent.
- **OQ08 — Can a data partnership support a viable commercial package?**: A BMC/value hypothesis plus rights/cost/partnership comparison; unresolved rights stay explicitly unknown and unbundled.
- **OQ09 — What did “CSA Games” refer to?**: Confirmed meaning and a deliberate future-scope or discard decision, without silently adding a workstream.

## Credits and remaining uncertainty

Earlier work retains actual authorship. Reference files and expected examples do not claim research, implementation or measurement has been completed. Agree each next deliverable and review together.
