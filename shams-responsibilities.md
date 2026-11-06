# Shams — complete responsibility audit

Reviewed: 6 November 2026. Source: current website plan and the 4 November ownership correction.

The original four-owned count was correct for the old allocation, but it left only two current-core packages. C03 asset contracts and C13 independent asset verification now transfer to Shams, completing the asset responsibility boundary. Amr’s advisory/source and execution packages remain unchanged. A16 also restores an existing supporting contribution.

Before: 4 owned + 24 supporting. After the ownership rebalance and A16 correction: **6 owned + 23 supporting = 29 involved packages**, plus **3 research questions**.

Shams now owns four current-core packages: C03, C04, C05 and C13. C06 remains deferred and C07 conditional. This is substantive production ownership; counts are not effort estimates.

## Owned packages

### C03 — Define Asset Observation Fields & Validate Stable Identity

Primary owner: Shams. Stage: G0. Delivery layer: Current core.
Prerequisites: C01 / Mahrous.

Inputs:
- three example asset exports

Deliverables:
- `contracts/v1/inventory-snapshot.schema.json`
- `fixtures/inventory/profile-examples.jsonl`
- `docs/asset-identity-rules.md`
- `tests/contracts/test_inventory_snapshot.py`

Tests:
- Validate complete and partial observations for each selected profile
- Keep two identities at one reused IP separate
- Reimport old evidence and preserve its original collected_at

Acceptance:
- Incomplete data remains unknown
- Same ip on two identities is not silently merged
- All observations preserve provenance
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

Review handoffs:
- Mahrous: reviews/c03-mahrous.md — Matching/closure review and disposition. At the contract/input review and again before package acceptance after the listed prerequisites are available. Acceptance: Shams records findings and disposition; unresolved safety, identity or contract blockers prevent acceptance.
- Omar: reviews/c03-omar.md — Contract compatibility notes and a consumer-side fixture check. At the input/fixture review and again before C03 acceptance; coordinate after its prerequisites are available. Acceptance: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### C04 — Implement Bounded Network Discovery & Parse Structured Results

Primary owner: Shams. Stage: G1. Delivery layer: Current core.
Prerequisites: C01 / Mahrous, C02 / Amr, C03 / Shams.

Inputs:
- allowlisted lab range/profile

Deliverables:
- `runner/adapters/discovery.py`
- `config/discovery-profiles.yaml`
- `fixtures/discovery/structured-results.xml`
- `tests/runner/test_discovery.py`
- `docs/runbooks/discovery.md`

Tests:
- Run against only the allowlisted lab and record contacted targets
- Cancel or time out a run and retain partial/failed status
- Parse a saved result without claiming banner data proves remediation

Acceptance:
- Zero out-of-scope connections in lab controls
- Timeout produces partial/failed status
- No blanket aggressive scripts/allports profile
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

Review handoffs:
- Mahrous: reviews/c04-mahrous.md — Reviewed decision outcomes and blocking policy questions. At the input/fixture review and again before C04 acceptance; coordinate after its prerequisites are available. Acceptance: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### C05 — Collect Ubuntu OS and Package Evidence Through Authenticated SSH

Primary owner: Shams. Stage: G1. Delivery layer: Current core.
Prerequisites: C02 / Amr, C03 / Shams.

Inputs:
- pinned lab Ubuntu and read-only credentials

Deliverables:
- `runner/adapters/ubuntu_inventory.py`
- `fixtures/inventory/ubuntu-native-export.json`
- `tests/runner/test_ubuntu_inventory.py`
- `docs/runbooks/ubuntu-collection.md`
- `datasets/prioritization/asset-evidence-manifest.json`

Tests:
- Compare collected package versions with a native ground-truth export
- Use invalid credentials and expect an explicit failed observation
- Inspect logs and exported fixtures for credentials and unnecessary user data
- Cross-check observation IDs against A02 scenarios.

Acceptance:
- Installed packages match native ground-truth export
- Expired credentials are an error not empty inventory
- Secrets absent from logs
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Asset-field coverage and observation-age distribution

Review handoffs:
- Mahrous: reviews/c05-mahrous.md — Verify applicability-relevant fields and authorized scope.. Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. Acceptance: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- Hams: reviews/c05-hams.md — Specify ranking experiment fields and distinguish observed facts from scenario assumptions.. Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. Acceptance: Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### C06 — Compare Windows Inventory Options & Implement One Adapter

Primary owner: Shams. Stage: G1. Delivery layer: Deferred extension.
Prerequisites: C03 / Shams.

Inputs:
- identical Windows fixture

Deliverables:
- `experiments/windows_inventory_comparison.py`
- `reports/windows-inventory-choice.md`
- `runner/adapters/windows_inventory.py`
- `fixtures/inventory/windows-export.json`
- `tests/runner/test_windows_inventory.py`

Tests:
- Collect the same target with the candidate methods where available
- Document missing fields and footprint rather than guessing equivalence
- Map the selected export into the shared observation schema

Acceptance:
- Documented coverage/missing fields and measured resource cost
- No agent choice based only on popularity
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

Review handoffs:
- Omar: reviews/c06-omar.md — Contract compatibility notes and a consumer-side fixture check. At the input/fixture review and again before C06 acceptance; coordinate after its prerequisites are available. Acceptance: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### C07 — Import Offline and Appliance Evidence With Freshness Labels

Primary owner: Shams. Stage: G3. Delivery layer: Conditional FortiOS profile.
Prerequisites: C03 / Shams.

Inputs:
- one vendor export and offline JSON fixture

Deliverables:
- `backend/app/inventory/imports.py`
- `fixtures/imports/offline-appliance.json`
- `contracts/v1/evidence-import.schema.json`
- `tests/inventory/test_imports.py`
- `docs/offline-evidence-guide.md`

Tests:
- Import an old snapshot and verify it remains stale
- Reject malformed or oversized input
- Import incomplete firmware identity and show unknown rather than a clean result

Acceptance:
- Unknown firmware remains unresolved
- Expired evidence never becomes fresh through re-import
- Imported labels remain distinct from scanned labels
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

Review handoffs:
- Amr: reviews/c07-amr.md — Source/provenance corrections and reviewed fixture IDs. At the input/fixture review and again before C07 acceptance; coordinate after its prerequisites are available. Acceptance: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### C13 — Verify Remediation Independently & Rehearse Recovery

Primary owner: Shams. Stage: G2. Delivery layer: Current core.
Prerequisites: C08 / Mahrous, C11 / Amr, C12 / Amr.

Inputs:
- post-execution observation and health checks

Deliverables:
- `backend/app/remediation/verification.py`
- `lab/recovery-matrix.md`
- `fixtures/patch/postcheck-results.jsonl`
- `tests/remediation/test_verification.py`
- `reports/recovery-drill.md`

Tests:
- Return package exit zero with a failed health check and keep the finding open
- Restore an old vulnerable version and expect the finding to reopen
- Run a clean post-observation and verify its source/evidence links

Acceptance:
- Successful package exit plus failing health remains unresolved
- No universal rollback promise
- Restored old vulnerable version reopens finding
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

Review handoffs:
- Amr: reviews/c13-amr.md — Reproducible observation/runner evidence and failing edge cases. At the input/fixture review and again before C13 acceptance; coordinate after its prerequisites are available. Acceptance: Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- Mahrous: reviews/c13-mahrous.md — Matching/closure review and disposition. At the contract/input review and again before package acceptance after the listed prerequisites are available. Acceptance: Shams records findings and disposition; unresolved safety, identity or contract blockers prevent acceptance.

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
