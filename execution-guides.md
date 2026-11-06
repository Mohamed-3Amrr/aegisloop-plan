# AegisLoop — 71 Execution Guides

**Team:** Vector Five. **Edition:** 23 October 2026.

These guides expand the retained Our Dream plan. Original IDs and primary owners are retained. Justified scope, dependency and acceptance changes appear in the revision log; new packages cover distinct meeting requirements. Paths below are proposed outputs for the product repository, not files claimed to exist already. This edition is a personal learning and plan reference; it has no team progress controls or task synchronization.

Critical Path flags mark the retained core delivery dependency chain and its prerequisites. They are not a duration-calculated CPM. Parallel candidates have no dependency path between them but require their own inputs and team capacity.

## D01 — Validate Core Vulnerability Sources & Build the First Ingestion Prototype

**Goal:** Prove that real CVE records can be fetched, preserved and normalized into a useful draft object.

**Why This Matters:** Research becomes an implementable contract; prevents claiming universal coverage.

**Owner:** Amr

**Support:** Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Can start now (initial plan; no completion reported).

**Depends on:** None

**Unlocks:** D02

**Parallel with:** C01, C02, C03, A01

**Critical path:** Yes

**First action:** Create vulnerability-intelligence/research/source-comparison.md and list the 10–20 sample CVE IDs with the reason each case is included.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Validate Core Vulnerability Sources & Build the First Ingestion Prototype. **When:** At the input/fixture review and again before D01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d01-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Validate Core Vulnerability Sources & Build the First Ingestion Prototype. **When:** At the input/fixture review and again before D01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d01-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- What does CVE.org provide versus NVD enrichment?
- Which official API, feed or download path supports this sample and later bulk sync?
- What are the current authentication, quota, update and redistribution rules?
- Which source owns each field, and how do affected ranges, CPE and missing fixed versions affect matching?

Sources: DS01, DS02, DS03, DS05, DS07, DS20

### Inputs

- Proposal requirements
- One supported Linux release and Windows lab candidate

### Implementation Steps

1. Create vulnerability-intelligence/ and a README with the sample command, Python environment, input CVE list and output locations. Keep API credentials outside the repository.
2. Choose 10–20 published representative CVEs: complete and missing-score records, amended/rejected cases where available, several product types, affected ranges and missing fixed-version information. Save the selection rationale.
3. Read the retained CVE and NVD source documentation. Record the exact official retrieval mechanism, authentication, current quota evidence, update behavior and usage/attribution conditions in research/source-comparison.md. Mark unverifiable limits as unresolved.
4. Implement collectors/cve_org.py to fetch each selected official CVE record. Preserve the untouched response plus source URL, retrieved_at, status, source revision/schema and content hash in raw/.
5. Implement collectors/nvd.py to fetch the same CVE IDs from NVD. Preserve NVD responses separately; log missing enrichment or failed requests without replacing the CVE record or advancing a false success marker.
6. Compare identifiers, descriptions, dates, scores, affected products/ranges, CPE, references and remediation fields. Document which assertions are provider-specific, missing or conflicting.
7. Draft schema/vulnerability-schema-v0.1.json with internal/external IDs, separate provider assertions, raw revision references, affected-range semantics, source timestamps and explicit missing fields. This draft is input to D02, not the final shared schema.
8. Build normalizers/sample.py to combine references to both raw records into normalized sample objects without silently choosing a winner for conflicting fields. Do not derive fixed versions from guesswork.
9. Write normalized/samples.jsonl and raw/manifest.json. Validate every selected sample against the draft schema and preserve partial cases with clear errors or missing-field flags.
10. Repeat the process from saved raw files, then ask Mahrous/Omar to run the README and review the field comparison. Save successful and failed test results before handing the prototype to D02 and D03.

### Technical Approach

Existing Design Decision: Python collector prototype, official CVE records plus independent NVD enrichment, raw JSON and a draft schema. This is a local-file spike; D02 owns the validated shared schema, and D03 owns the production intake pipeline.

### Expected Deliverables

- `vulnerability-intelligence/research/source-comparison.md`
- `vulnerability-intelligence/collectors/cve_org.py`
- `vulnerability-intelligence/collectors/nvd.py`
- `vulnerability-intelligence/normalizers/sample.py`
- `vulnerability-intelligence/raw/manifest.json`
- `vulnerability-intelligence/normalized/samples.jsonl`
- `vulnerability-intelligence/schema/vulnerability-schema-v0.1.json`
- `vulnerability-intelligence/README.md`

### Testing

1. Fetch the same 10–20 CVEs from both sources and compare IDs, dates and field presence
2. Replay saved raw records through the normalizer and compare stable output
3. Make one source unavailable and verify an explicit partial result without invented enrichment

### Acceptance Criteria

- Both collectors successfully retrieve real data for the representative sample; unavailable or incomplete cases have explicit outcomes.
- 10–20 selected CVEs are exercised, with selection rationale and the same IDs compared across both sources.
- Original CVE and NVD responses, retrieval metadata and hashes are preserved separately.
- Source differences, authoritative/provider-specific fields, missing fields and unresolved quota/terms checks are documented.
- A draft internal JSON schema exists and normalized sample records validate against it.
- Replaying saved raw responses produces stable normalized records without discarding conflicts or inventing remediation.
- Another team member reproduces collection/normalization from the README and records the review.

### Risks / Failure Modes

- Source breadth consumes the semester.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

CVE + one Ubuntu release + KEV/EPSS first; additional vendors adapter-by-adapter.

### Next Dependent Work

D02

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D02 — Define and Validate the Canonical Vulnerability Schema

**Goal:** Turn D01 sample objects into a versioned contract without losing provider assertions or non-CVE identities.

**Why This Matters:** All downstream AI and matching must be able to reproduce which facts were used.

**Owner:** Amr

**Support:** Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Blocked by: D01 (initial plan; no completion reported).

**Depends on:** D01

**Unlocks:** D03, D05, D07, D08, D11, A06, P02, D17

**Parallel with:** C01, C02, C03, A01

**Critical path:** Yes

**First action:** Define source_document(id,source,url,hash,fetched_at,published_at,modified_at,schema_version,license_ref).

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Define and Validate the Canonical Vulnerability Schema. **When:** At the input/fixture review and again before D02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d02-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Define and Validate the Canonical Vulnerability Schema. **When:** At the input/fixture review and again before D02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d02-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which fields are required, nullable or provider-specific in the D01 samples?
- How will aliases, upstream and related links differ, and how will one advisory link multiple CVEs?
- How will raw revisions, conflicting scores, ranges and withdrawn records remain traceable?

Sources: DS08, DS18

### Inputs

- D01 fixture corpus
- Omar database/API contract

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Define source_document(id,source,url,hash,fetched_at,published_at,modified_at,schema_version,license_ref).
3. Define advisory internal UUID; external identifiers and typed relationships aliases/upstream/related; never require CVE.
4. Keep raw bytes immutable; normalize assertions into product, status, range, scores and remediation tables with provenance.
5. Keep each source assertion separate; do not overwrite vendor applicability with a generic NVD statement.
6. Provide rejected-record quarantine, error reason and replay command; add unique source+external_id+revision constraint.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar + Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Versioned JSON Schema and immutable source revisions; relational integration in P03 follows P02. Draft prototypes remain file-based until the persistence contract is agreed.

### Expected Deliverables

- `contracts/v1/advisory.schema.json`
- `contracts/v1/source-revision.schema.json`
- `fixtures/advisories/valid-and-invalid.jsonl`
- `docs/schema-field-map.md`
- `tests/contracts/test_advisory_schema.py`

### Testing

1. Validate a complete and a missing-score sample, preserving unknowns
2. Reject malformed timestamps and unresolved revision references
3. Round-trip conflicting provider assertions without silently overwriting either

### Acceptance Criteria

- Replaying the same record changes no canonical count.
- GHSA-only record can exist; many-CVE advisory does not merge vulnerabilities.
- Every normalized decision field resolves to a raw source revision.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Alias conflation creates wrong findings and duplicate metrics.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Retain distinct records with explicit related links until equivalence is reviewed.

### Next Dependent Work

D03, D05, D07, D08, D11, A06, P02, D17

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D03 — Build Bulk CVE Ingestion and Incremental Update Processing

**Goal:** Load a CVE baseline, then apply new, changed and rejected records without duplicates or lost updates.

**Why This Matters:** Freshness is a data pipeline, not retraining an LLM every two days.

**Owner:** Amr

**Support:** Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: D02, P03 (initial plan; no completion reported).

**Depends on:** D02, P03

**Unlocks:** D04, D13, D16, P09

**Parallel with:** D08, D09, D15, C02

**Critical path:** Yes

**First action:** Bootstrap a selected recent fixture slice then a complete chosen baseline; pin source commit/hash.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Build Bulk CVE Ingestion and Incremental Update Processing. **When:** At the input/fixture review and again before D03 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d03-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which official snapshot and revision mechanism will the selected CVE adapter use?
- How will the cursor advance only after durable processing?
- How will schema changes, source rejection and catch-up after downtime be represented?

Sources: DS01, DS20

### Inputs

- D02 schema
- CVE official snapshot/repository

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Bootstrap a selected recent fixture slice then a complete chosen baseline; pin source commit/hash.
3. Fetch changes on a proposed two-hour schedule; persist last successfully processed commit/checkpoint.
4. Parse records using dataVersion; preserve CNA and ADP assertions with source labels.
5. Handle PUBLISHED and REJECTED changes; invalidate derived findings/retrieval entries without deleting history.
6. Commit checkpoint only after validated records and change events persist; on missed history use bounded reconciliation.
7. Log first_seen, normalized_at and available_to_query_at.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Official CVEListV5 baseline plus incremental changes, checksums, idempotent upserts and durable checkpoints. Choose exact download mechanics from D01 evidence; no scraping dependency.

### Expected Deliverables

- `backend/app/intelligence/cve_sync.py`
- `backend/app/intelligence/checkpoints.py`
- `fixtures/sync/change-sequence.jsonl`
- `tests/intelligence/test_cve_sync.py`
- `docs/runbooks/cve-sync.md`

### Testing

1. Import a fixed snapshot twice and assert unchanged logical counts
2. Replay publish, modify and reject revisions and inspect history
3. Crash before checkpoint commit, resume and prove no record was skipped

### Acceptance Criteria

- New/amended/rejected fixtures all propagate correctly.
- Crash during batch can resume with no duplicate records or skipped checkpoint.
- Upstream outage makes stale status visible.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Git history gaps or schema changes silently skip records.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Resume from verified snapshot and reconcile IDs; quarantine unknown versions.

### Next Dependent Work

D04, D13, D16, P09

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D04 — Add NVD Enrichment Without Blocking CVE Availability

**Goal:** Attach NVD assertions to existing records while keeping the CVE/vendor path usable during NVD failures.

**Why This Matters:** Adds valuable mappings/metrics without blocking new CVEs on enrichment availability.

**Owner:** Amr

**Support:** Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: D03 (initial plan; no completion reported).

**Depends on:** D03

**Unlocks:** Final handoff

**Parallel with:** D08, D09, D15, C02

**Critical path:** No

**First action:** Use API2/feed2, not retired legacy feeds; establish throttling using verified developer limits at implementation.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Add NVD Enrichment Without Blocking CVE Availability. **When:** At the input/fixture review and again before D04 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d04-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which fields and schema revisions are exposed by the current endpoint?
- How should missing enrichment, 429 responses and history references be handled?
- What current quota is directly documented for the actual API key and environment?

Sources: DS02, DS21, DS22

### Inputs

- D03 records
- NVD2 API/feed fixtures

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Use API2/feed2, not retired legacy feeds; establish throttling using verified developer limits at implementation.
3. Process modified-time windows with overlap, deduplication and pagination; retain window checkpoint.
4. Map available CPE/configuration, affected and SSVC separately, preserving originating sources.
5. Do not require NVD CVSS or CPE before showing a CVE; display enrichment state.
6. Handle 429/backoff, larger payloads and schema additions; when history gives a GitHub link fetch current record through allowlisted adapter.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Independent NVD adapter with conservative pacing, backoff and provenance. Current numeric NVD quotas remain RESEARCH REQUIRED until primary documentation is available; they are not hard-coded from memory.

### Expected Deliverables

- `backend/app/intelligence/adapters/nvd.py`
- `fixtures/nvd/missing-and-amended.json`
- `tests/intelligence/test_nvd_adapter.py`
- `docs/runbooks/nvd-enrichment.md`

### Testing

1. Ingest an unenriched record and keep it usable
2. Simulate rate limiting and verify bounded retry without checkpoint loss
3. Compare a changed provider assertion with its preserved previous revision

### Acceptance Criteria

- A CVE with no NVD enrichment is still visible and assessable using sufficient vendor evidence.
- Amended vector and affected-list fixtures create a new revision.
- A rate-limit fixture backs off without advancing the checkpoint.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Assuming all NVD records are enriched delays or loses detection.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Run CVE/vendor data; retain NVD as stale optional enrichment.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D05 — Build the Ubuntu Affected-and-Fixed Package Catalog

**Goal:** Parse authoritative Ubuntu records into release-aware package assertions that support real version comparison.

**Why This Matters:** One accurate OS implementation is stronger than shallow matching across every OS.

**Owner:** Amr

**Support:** Shams, Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: D02, P03 (initial plan; no completion reported).

**Depends on:** D02, P03

**Unlocks:** D06, D08, D09, D14, D15

**Parallel with:** C02, C04, C05, C06

**Critical path:** Yes

**First action:** Choose one supported Ubuntu release available in the lab; retain release/channel/architecture.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Build the Ubuntu Affected-and-Fixed Package Catalog. **When:** At the input/fixture review and again before D05 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d05-shams.md — Reproducible observation evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Build the Ubuntu Affected-and-Fixed Package Catalog. **When:** At the input/fixture review and again before D05 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d05-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- How do Ubuntu CVE, USN and LSN records differ?
- How do binary packages map to source packages and full distro revisions?
- Which release, repository and entitlement fields constrain fixed-version availability?

Sources: DS03, DS04, DS06, DS08

### Inputs

- D02 contracts
- Ubuntu OSV + USN fixtures
- Shams package inventory sample

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Choose one supported Ubuntu release available in the lab; retain release/channel/architecture.
3. Ingest official OSV CVE records and fix notices; distinguish CVE, USN and LSN record meanings.
4. Map binary package inventory to source package identity using authoritative metadata, not string guessing.
5. Preserve Debian-style epoch/upstream/revision versions; label available fix versus currently obtainable fix/entitlement.
6. Cross-check selected installed packages using Ubuntu OVAL/OpenSCAP output where supported.
7. Build fixtures: vulnerable, fixed backport, no fix, wrong release and incomplete inventory.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Shams + Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Official Ubuntu OSV JSON first, selected OVAL cross-check. Preserve distro/architecture/source-package identity; selected release and data-usage terms need execution-time validation.

### Expected Deliverables

- `backend/app/intelligence/adapters/ubuntu_osv.py`
- `fixtures/ubuntu/fixed-unfixed-backport.jsonl`
- `docs/ubuntu-field-mapping.md`
- `tests/intelligence/test_ubuntu_catalog.py`

### Testing

1. Parse fixed and unfixed records for one chosen release
2. Keep Ubuntu upstream links distinct from aliases
3. Compare an affected package and a vendor-backported fixed revision

### Acceptance Criteria

- A backported fix is not incorrectly flagged from upstream version alone.
- Wrong distro release never receives another release’s patch.
- Unfixed public CVE remains visible even when absent from fix-only notices.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Source-versus-binary mapping creates false negatives.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Return needs_evidence with requested package metadata; do not assert safe.

### Next Dependent Work

D06, D08, D09, D14, D15

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D06 — Validate Microsoft and Red Hat Data & Add Scoped Vendor Adapters

**Goal:** Extend the existing contract to one Windows build and one Red Hat product stream only after their data can be interpreted correctly.

**Why This Matters:** Additional operating systems require vendor-specific applicability and patch logic.

**Owner:** Amr

**Support:** Shams, Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Deferred extension

**Gate:** G3

**Start condition:** Blocked by: D05 (initial plan; no completion reported).

**Depends on:** D05

**Unlocks:** Final handoff

**Parallel with:** D08, D09, D10, D12

**Critical path:** No

**First action:** Spike MSRC documented API on a real monthly security update document; record current working endpoint/schema.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Validate Microsoft and Red Hat Data & Add Scoped Vendor Adapters. **When:** At the input/fixture review and again before D06 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d06-shams.md — Reproducible observation evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Validate Microsoft and Red Hat Data & Add Scoped Vendor Adapters. **When:** At the input/fixture review and again before D06 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d06-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- How do MSRC product trees, build identities and superseding updates relate?
- Which Red Hat CSAF/VEX product and repository identifiers apply to the selected fixture?
- Which licensing, entitlement and advisory revision rules apply to each adapter?

Sources: DS05, DS06, DS10, DS11, DS18

### Inputs

- D05 proven adapter interface
- Windows/RHEL representative inventory

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Spike MSRC documented API on a real monthly security update document; record current working endpoint/schema.
3. Resolve Windows product/edition/build/architecture and relevant KB supersedence through trusted Microsoft metadata.
4. For Red Hat prefer CSAF/VEX fixed/unfixed product assertions; evaluate repository/product streams and RPM NEVRA.
5. Separate public advisory access from entitlement needed to download/install a patch.
6. Add each family only after affected/fixed/unfixed/unknown fixtures pass.
7. Publish unsupported-family list and parser maintenance owner.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Shams + Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Microsoft advisory data plus endpoint servicing evidence; Red Hat CSAF/VEX. New OVAL-only RHEL investment is not the chosen default; full Windows execution stays in C14.

### Expected Deliverables

- `backend/app/intelligence/adapters/msrc.py`
- `backend/app/intelligence/adapters/redhat.py`
- `fixtures/vendors/windows-rhel.jsonl`
- `docs/adr/vendor-expansion.md`
- `tests/intelligence/test_vendor_profiles.py`

### Testing

1. Use one known affected and fixed fixture per supported product profile
2. Preserve supersedence and scoped VEX without naive suppression
3. Disable one adapter and keep the first Ubuntu path operational

### Acceptance Criteria

- Missing KB alone is not treated as vulnerability if a superseding update applies.
- Red Hat backports respect product stream and architecture.
- No claim of universal Windows or Linux support.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Windows servicing and product identity consume more effort than anticipated.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Ship Windows inventory + human-reviewed recommendations first; keep Linux verified patch path.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D07 — Ingest Package Advisories That May Have No CVE

**Goal:** Track scoped OSS package advisories with their native IDs and map them to selected package ecosystems.

**Why This Matters:** A CVE-only database misses advisories identified in other ecosystems.

**Owner:** Amr

**Support:** Mahrous, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Deferred extension

**Gate:** G3

**Start condition:** Blocked by: D02 (initial plan; no completion reported).

**Depends on:** D02

**Unlocks:** Final handoff

**Parallel with:** D08, D09, D10, D12

**Critical path:** No

**First action:** Support ecosystem+package+version/purl; query OSV batch API or cache selected ecosystems.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Ingest Package Advisories That May Have No CVE. **When:** At the input/fixture review and again before D07 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d07-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Ingest Package Advisories That May Have No CVE. **When:** At the input/fixture review and again before D07 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d07-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which selected ecosystems and purl forms are in scope?
- How do OSV aliases differ from related and upstream fields?
- What metadata leaves the environment when querying a public service, and which upstream attribution applies?

Sources: DS07, DS08, DS09, DS17

### Inputs

- D02 advisory identity model
- Package lockfile/SBOM fixtures

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Support ecosystem+package+version/purl; query OSV batch API or cache selected ecosystems.
3. Preserve GHSA/OSV identifiers when CVE absent.
4. Use aliases only for equivalent vulnerability identity; retain upstream and related as distinct edges.
5. Process withdrawn advisories and changed ranges.
6. Retain original source attribution; do not infer aggregate data licensing from OSV software license.
7. Select Python/npm for demonstration only after checking actual project scope.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Hams + Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: OSV query/cache for chosen ecosystems and native advisory IDs. A public API is not universal vulnerability coverage or blanket permission to redistribute all upstream content.

### Expected Deliverables

- `backend/app/intelligence/adapters/osv.py`
- `fixtures/osv/non-cve-and-aliases.jsonl`
- `docs/oss-advisory-coverage.md`
- `tests/intelligence/test_non_cve.py`

### Testing

1. Import a GHSA/native advisory without CVE and retain it
2. Keep same package names in different ecosystems distinct
3. Verify absent EPSS is shown as unavailable rather than zero

### Acceptance Criteria

- Two aliases produce one vulnerability identity without collapsing multi-vulnerability notices.
- Withdrawal removes active recommendation but preserves audit.
- Unsupported version semantics lead to unknown, not lexical comparison.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- OSV has no documented current quota but bulk queries can still fail or change policy.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Cache bounded datasets, exponential backoff and offline snapshot; do not rely on unlimited service.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D08 — Normalize Asset Product Identities & Generate Matching Candidates

**Goal:** Convert observed products into scoped candidate identities before determining applicability.

**Why This Matters:** Inventory evidence must resolve to the correct product before checking vulnerability.

**Owner:** Mahrous

**Support:** Amr, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: D02, D05, C03 (initial plan; no completion reported).

**Depends on:** D02, D05, C03

**Unlocks:** D09

**Parallel with:** D03, D04, D11, C02

**Critical path:** Yes

**First action:** Define asset identity distinct from IP address; track observation time and method.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Normalize Asset Product Identities & Generate Matching Candidates. **When:** At the input/fixture review and again before D08 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d08-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Normalize Asset Product Identities & Generate Matching Candidates. **When:** At the input/fixture review and again before D08 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d08-shams.md — Reproducible observation evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which inventory fields identify vendor, distro, package ecosystem, product branch and architecture?
- When is CPE useful and when is purl or vendor identity more accurate?
- How will ambiguous names and conflicting asset identities remain unresolved?

Sources: DS17, DS22, DS06

### Inputs

- Shams signed/identified inventory envelope
- D02/D05 fixtures

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Define asset identity distinct from IP address; track observation time and method.
3. Normalize OS release/build, vendor, edition, architecture, package ecosystem, package version and service exposure.
4. Preserve raw observations and confidence; join binary/source packages explicitly.
5. Generate deterministic vendor/purl/CPE candidates with exact identifiers first.
6. If several plausible products remain, request the missing distinguishing evidence; fuzzy search may propose candidates only.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Shams review the handoff before declaring completion.

### Technical Approach

Needs Validation: Internal asset IDs plus typed vendor/CPE/purl identities. Fuzzy matches can propose candidates; they cannot establish an affected verdict.

### Expected Deliverables

- `backend/app/assessment/identity.py`
- `fixtures/identity/product-collisions.jsonl`
- `contracts/v1/product-identity.schema.json`
- `tests/assessment/test_identity.py`

### Testing

1. Separate identical names from different ecosystems
2. Keep incomplete firmware/model identity unresolved
3. Verify changing an IP alone does not silently merge two enrolled assets

### Acceptance Criteria

- IP reuse does not merge two assets.
- Same package name across ecosystems remains separate.
- Unknown version yields candidate/needs_evidence rather than confirmed vulnerable.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Banner strings are stale, masked or vendor-customized.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Authenticated package/firmware inventory or manual evidence with expiry.

### Next Dependent Work

D09

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D09 — Implement Vendor-Aware Applicability Rules & Decision Traces

**Goal:** Produce affected, not_affected or unknown from a specific observation and advisory revision.

**Why This Matters:** The LLM must explain a finding, not invent whether the asset is affected.

**Owner:** Mahrous

**Support:** Amr

**Conditional capability gates:** FortiOS applicability is enabled only after D17 qualifies the exact vendor profile; D17 is not a prerequisite for Ubuntu applicability.

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: D08, D05, C05 (initial plan; no completion reported).

**Depends on:** D08, D05, C05

**Unlocks:** D10, D12, D13, D14, D15, C08

**Parallel with:** D03, D04, D11, C04

**Critical path:** Yes

**First action:** Select authoritative vendor/product assertion matching the exact inventory context.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Implement Vendor-Aware Applicability Rules & Decision Traces. **When:** At the input/fixture review and again before D09 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d09-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which native version comparator matches each supported ecosystem?
- How are epoch, release, backports, range boundaries and configuration prerequisites evaluated?
- What minimum missing evidence would resolve an unknown verdict?

Sources: DS03, DS06, DS08, DS18, DS22

### Inputs

- D08 candidate identities
- D05 package assertions

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Select authoritative vendor/product assertion matching the exact inventory context.
3. Implement per-ecosystem comparisons: Debian first, RPM/Windows only on added adapters.
4. Evaluate range boundaries, configuration conditions and CPE logical constraints where present.
5. Represent affected, not_affected, fixed, needs_evidence and conflict with reason codes and evidence revisions.
6. Write decision trace: observation → product → rule → comparison → result.
7. Keep “affected by known CVE” distinct from successfully exploitable in the deployed configuration.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Deterministic vendor-aware rules, source revisions and explicit reason codes. Reuse this engine in C08; neither embeddings nor the LLM decides version applicability.

### Expected Deliverables

- `backend/app/assessment/applicability.py`
- `backend/app/assessment/version_rules.py`
- `fixtures/matching/gold-cases.jsonl`
- `tests/assessment/test_applicability.py`
- `docs/matching-reason-codes.md`

### Testing

1. Evaluate vulnerable, fixed, backported and boundary fixtures
2. Remove a required field and expect unknown with a precise gap
3. Compare output to independently reviewed labels and report precision, recall and unknown rate

### Acceptance Criteria

- Inclusive/exclusive boundaries and epoch/revision cases pass.
- Vendor fixed-backport evidence can resolve a generic upstream match.
- Unsupported rule/configuration cannot produce a definitive negative verdict.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Naive semver or lexical order misclassifies OS packages.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Use trusted ecosystem comparators after license review; explicit unknown for unimplemented rules.

### Next Dependent Work

D10, D12, D13, D14, D15, C08

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D10 — Validate SBOM and VEX Evidence Before Using It in Assessments

**Goal:** Accept scoped component inventories and product statements without allowing stale or unrelated VEX to hide findings.

**Why This Matters:** Imported inventories and vendor non-affected statements need controlled trust.

**Owner:** Mahrous

**Support:** Amr, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Deferred extension

**Gate:** G3

**Start condition:** Blocked by: D09 (initial plan; no completion reported).

**Depends on:** D09

**Unlocks:** Final handoff

**Parallel with:** D03, D04, D06, D07

**Critical path:** No

**First action:** Import a bounded supported SBOM schema; preserve document hash, publisher and timestamp.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Validate SBOM and VEX Evidence Before Using It in Assessments. **When:** At the input/fixture review and again before D10 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d10-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Validate SBOM and VEX Evidence Before Using It in Assessments. **When:** At the input/fixture review and again before D10 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d10-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which supported SBOM/VEX formats are actually available from the test product?
- How are publisher trust, product scope, version and justification validated?
- How will stale inventory or an under-investigation status affect the verdict?

Sources: DS18, DS19, DS17

### Inputs

- D09 decision states
- Selected CycloneDX/SBOM and CSAF/VEX fixtures

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Import a bounded supported SBOM schema; preserve document hash, publisher and timestamp.
3. Map component identifiers to observations without assuming SBOM proves current runtime installation.
4. Accept VEX only from configured trusted issuers for exact product/version and relevant context.
5. Retain affected/not_affected/fixed/under_investigation assertions, justification and expiry/review policy.
6. Surface conflicts and invalidated assertions after product/knowledge changes.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Omar review the handoff before declaring completion.

### Technical Approach

Needs Validation: Selected CycloneDX/CSAF/VEX input profiles behind a validated adapter. Do not implement every standard at once; exact supported versions remain Needs Validation.

### Expected Deliverables

- `backend/app/assessment/sbom_vex.py`
- `fixtures/sbom-vex/trust-and-scope.json`
- `docs/sbom-vex-policy.md`
- `tests/assessment/test_vex_scope.py`

### Testing

1. Import a matching product statement and preserve its justification
2. Reject suppression from wrong product or stale scope
3. Keep under-investigation and incomplete evidence unresolved

### Acceptance Criteria

- Stale SBOM does not overwrite newer inventory.
- A VEX for another product cannot suppress a finding.
- Every suppression has a source, reason and review path.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Untrusted VEX suppresses a genuine finding.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Manual analyst review before suppression; retain vulnerability candidate.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D11 — Import Dated KEV and EPSS Signals & Preserve Missing Values

**Goal:** Attach observed-exploitation and forecast signals with their dates and different meanings.

**Why This Matters:** Threat likelihood and evidence of exploitation change independently of CVE descriptions.

**Owner:** Amr

**Support:** Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: D02, P03 (initial plan; no completion reported).

**Depends on:** D02, P03

**Unlocks:** D12

**Parallel with:** D08, D09, D15, C02

**Critical path:** Yes

**First action:** Fetch official KEV JSON and daily EPSS bulk data; keep source checksum/date/model version if supplied.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Import Dated KEV and EPSS Signals & Preserve Missing Values. **When:** At the input/fixture review and again before D11 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d11-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which KEV fields and update timestamps should be retained?
- How do EPSS probability, percentile, forecast date and missing CVEs differ?
- When should bulk download replace per-record API requests?

Sources: DS12, DS13, DS14, DS15

### Inputs

- D02 vulnerability IDs
- FIRST/CISA feed fixtures

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Fetch official KEV JSON and daily EPSS bulk data; keep source checksum/date/model version if supplied.
3. Store probability and percentile separately; retain missing as missing.
4. Record KEV additions/removals and changed metadata as revisions.
5. Link enrichment by exact CVE; non-CVE advisory without a valid CVE link has unavailable EPSS.
6. Add freshness checks and notifications for stale threat feeds.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Official KEV data plus daily bulk EPSS where appropriate; separate signals, bounded API access and dated provenance. FIRST quotas and API behavior follow the retained source register.

### Expected Deliverables

- `backend/app/intelligence/threat_signals.py`
- `fixtures/threat/dated-signals.jsonl`
- `tests/intelligence/test_threat_signals.py`
- `docs/threat-signal-fields.md`

### Testing

1. Load two dated EPSS snapshots and retain history
2. Preserve KEV evidence even when EPSS is low
3. Handle non-CVE advisories without manufacturing EPSS zero

### Acceptance Criteria

- 0.01 EPSS is not confused with first percentile.
- Absent EPSS never becomes zero.
- Known exploitation remains visible with low EPSS.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- EPSS forecast is mislabeled asset-specific probability.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Display raw dated signals and local context separately.

### Next Dependent Work

D12

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D12 — Implement Explainable Priority Bands Using Asset Context

**Goal:** Define the transparent security prioritization policy and reference baseline supporting Hams’s AI-powered prioritization capability.

**Why This Matters:** A defensible action queue needs asset context and explicit policy, not an arbitrary AI score.

**Owner:** Mahrous

**Support:** Amr, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: D09, D11 (initial plan; no completion reported).

**Depends on:** D09, D11

**Unlocks:** D13, P10, A17

**Parallel with:** D03, D04, D14, C04

**Critical path:** Yes

**First action:** Define policy bands using confirmed exploitation, reachable attack surface, impact and asset criticality.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Co-author threat/risk factors, review vendor/KEV/EPSS semantics and independently grade cases. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/d12-amr.md — Co-author threat/risk factors, review vendor/KEV/EPSS semantics and independently grade cases.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Hams**: Define experiment-compatible input/output and relevance formats; compare candidate ranking against this frozen baseline. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/d12-hams.md — Define experiment-compatible input/output and relevance formats; compare candidate ranking against this frozen baseline.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- Define the ranked unit explicitly and make organization-aware prioritization reproducible.
- 29 October: explicit cross-functional AI prioritization/remediation handoff; existing domain ownership retained.

- Which exposure and business criticality values can the lab actually provide?
- How should confirmed exploitation override a low forecast without hiding severity?
- Which policy bands, deadlines and missing-signal behavior will supervisors accept?
- Should top ten mean unique CVEs, asset findings or compatible grouped remediation actions?
- Which organization context is known, and what happens when criticality or exposure is missing?
- Which actions may be grouped without crossing incompatible product trains, policy, windows or recovery constraints?
- Which signals are hard policy constraints versus ranking preferences?
- How should conflicting experts, missing context and no-fix actions be evaluated without forcing unsafe repairs?

Sources: DS12, DS15, DS16

### Inputs

- D09 findings
- D11 threat evidence
- Asset importance/exposure/owner

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Define policy bands using confirmed exploitation, reachable attack surface, impact and asset criticality.
3. Preserve official CVSS version/vector/provider; display heuristic local priority separately.
4. Start with explainable rules and analyst-adjustable thresholds; avoid multiplying EPSS by CVSS as if calibrated risk.
5. Treat evidence gaps as collection tasks, with urgent triage when plausible consequence is high.
6. Require reason/expiry/owner for accepted risk and compensating controls.
7. Evaluate ranking against CVSS-only and KEV-first baselines on same labeled cases.
8. Implement explained ordered policy bands using confirmed applicability, exploitation evidence, exposure, criticality, time and fixability. Keep CVSS and EPSS meanings distinct; missing context is explicit.
9. Rank grouped remediation actions as the primary work queue; retain drill-down to each asset finding and unique CVE view. Use a stable grouping key with product/profile, permitted target fix, policy and compatible execution constraints.
10. Do not group unknown applicability into confirmed repair jobs. Keep no-patch, blocked window and unsupported-target actions visible in separate queues; use deterministic tie-breaking and evidence revisions.
11. Produce structured reason codes and a ranking trace; weights, if experimented with, are local policy values and not calibrated compromise probabilities.
12. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Hams review the handoff before declaring completion.
13. With Amr define field semantics and missing-value policy for CVSS/vector, dated EPSS, KEV, applicability confidence, asset criticality, exposure, business impact and operational constraints. Publish hard eligibility/approval constraints separately from ordering preferences.
14. Freeze security-reviewed relevance grades and pairwise preferences before comparing candidate outputs; retain legitimate expert disagreements. Hand the baseline function, reason codes and policy version to Hams in A17.

### Technical Approach

Existing Design Decision: Rule-based bands retaining CVSS, KEV, EPSS and local context separately. Policy weights and deadlines are project decisions requiring review; no arbitrary score is marketed as calibrated risk.

### Expected Deliverables

- `backend/app/assessment/prioritization.py`
- `config/priority-policy-v1.yaml`
- `fixtures/priority/decision-table.jsonl`
- `tests/assessment/test_priority_policy.py`
- `docs/priority-policy.md`
- `policy/ranking/action-grouping-spec.md`
- `fixtures/priority/grouped-actions.json`
- `policy/prioritization-baseline.yaml`
- `reports/prioritization/security-reference-rubric.md`

### Testing

1. Compare high-severity internal and exploited exposed cases
2. Remove a signal and verify missingness remains visible
3. Change policy version and reproduce the changed band and explanation
4. Exercise duplicate CVEs, shared fixes, incompatible trains, backports, no patch, missing context and policy conflicts; compare to independently reviewed expected ordering.
5. Missing context is never silently zero risk; same inputs/version produce stable order.
6. Review high-CVSS/low-exposure versus lower-CVSS/known-exploited scenarios.

### Acceptance Criteria

- Each priority has a human-readable policy trace.
- KEV cannot be demoted solely by low EPSS.
- Missing asset context is disclosed; policy version is saved with each decision.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Top ten is defined as up to ten eligible grouped actions with transparent evidence, constraints and asset/CVE drill-down; fewer than ten is allowed.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Policy constraint violation count; deterministic repeatability; reviewed relevance agreement

### Risks / Failure Modes

- Unvalidated weights look scientific but mislead.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Rule bands and raw signals; tune with supervisor-reviewed scenarios.

### Next Dependent Work

D13, P10, A17

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05, ADR24

## D13 — Trigger Targeted Reassessment and Invalidate Stale Answers

**Goal:** Reevaluate only relevant assets when material source or inventory facts change and invalidate derived caches.

**Why This Matters:** The differentiated loop is knowledge changes causing only relevant assets to be reassessed.

**Owner:** Mahrous

**Support:** Hams, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: D03, D09, D12, P07 (initial plan; no completion reported).

**Depends on:** D03, D09, D12, P07

**Unlocks:** D16, A14

**Parallel with:** D04, D14, C04, C06

**Critical path:** No

**First action:** Emit stable change IDs only after source revision commit.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Trigger Targeted Reassessment and Invalidate Stale Answers. **When:** At the input/fixture review and again before D13 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d13-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Trigger Targeted Reassessment and Invalidate Stale Answers. **When:** At the input/fixture review and again before D13 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d13-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Recurrence records support root-cause review without claiming unobserved causes.

- Which changed fields affect applicability, priority, patch options or only display text?
- How are products mapped to affected assets without missing candidates?
- Which event and cache keys guarantee repeatable, scope-safe invalidation?

Sources: DS02, DS08

### Inputs

- D03/D04 changes
- D09 reverse product-to-asset index
- NVD enrichment is optional; missing enrichment must not block CVE/vendor reassessment.

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Emit stable change IDs only after source revision commit.
3. Diff applicability, patch, threat and description changes separately.
4. Find impacted product/asset sets; enqueue idempotent assessment jobs keyed by asset snapshot + knowledge revision + engine version.
5. Invalidate outdated generated advice and retrieval chunks; retain before/after explanations.
6. Handle rejected/withdrawn records, changed affected ranges and reopened findings.
7. Measure reassessment lag and compare targeted work with full reprocessing baseline.
8. Preserve finding lifecycle and episode links: repeated observation without closure, reopened after verified closure, stale evidence, new advisory revision and confirmed configuration drift are different events.
9. Store root-cause hypotheses apart from reviewer-confirmed cause and attached corrective control; do not infer a human-error ratio from recurrence frequency.
10. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar + Hams review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Versioned change events, idempotent consumers and current-result views. NVD enrichment is optional and must not block CVE/vendor reassessment; A14 adds AI-specific operations on this path.

### Expected Deliverables

- `backend/app/assessment/reassessment.py`
- `contracts/v1/knowledge-changed.schema.json`
- `fixtures/reassessment/revision-events.jsonl`
- `tests/assessment/test_reassessment.py`
- `docs/reassessment-flow.md`

### Testing

1. Change an affected range and verify impacted assets are reevaluated
2. Replay the same event without duplicate business effects
3. Withdraw a source assertion and ensure stale answers are excluded
4. Repeat an unchanged scan, reopen after verified fix and modify only source metadata; verify three distinct histories without duplicate active findings.

### Acceptance Criteria

- Repeated event creates no duplicate active finding.
- Changed range reopens an affected asset and retires stale advice.
- Description-only edit does not trigger unnecessary patch execution.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Event storms exhaust resources after bulk upstream changes.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Coalesce by product/revision, bounded queues and prioritized reconciliation.

### Next Dependent Work

D16, A14

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05, ADR24

## D14 — Build a Versioned Catalog of Vendor Fixes and Mitigations

**Goal:** Link findings to documented patch, upgrade or mitigation candidates with real prerequisites.

**Why This Matters:** Finding a fixed version is different from safely installing it on this machine.

**Owner:** Amr

**Support:** Mahrous, Shams, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: D05, D09 (initial plan; no completion reported).

**Depends on:** D05, D09

**Unlocks:** C09, A11, A17

**Parallel with:** D12, D13, D15, C04

**Critical path:** Yes

**First action:** Map advisory→product→fixed supported versions/KBs→prerequisites; preserve source revision.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Validate applicability, residual risk and policy constraints. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/d14-mahrous.md — Validate applicability, residual risk and policy constraints.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Shams**: Check real/lab asset evidence and practical preflight inputs; no FortiOS mutation implied. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/d14-shams.md — Check real/lab asset evidence and practical preflight inputs; no FortiOS mutation implied.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Hams**: Define retrieval-ready evidence spans and expected grounded guidance fields for A11. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/d14-hams.md — Define retrieval-ready evidence spans and expected grounded guidance fields for A11.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- Keep a single remediation catalog; vendor qualification does not create a second patch engine.
- 29 October: explicit cross-functional AI prioritization/remediation handoff; existing domain ownership retained.

- Where does each vendor publish fixed versions and alternative mitigations?
- Which support, entitlement, reboot and compatibility fields are known or missing?
- How do one-patch/many-CVE and supersedence relationships work?
- Which guidance is explicitly vendor-supported, and which requires model/configuration/entitlement evidence?

Sources: DS03, DS05, DS10, DS18, MR08

### Inputs

- D05/D06 vendor fixes
- Amr patch runner contracts

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Map advisory→product→fixed supported versions/KBs→prerequisites; preserve source revision.
3. Record repository availability, entitlement, restart requirement and supported upgrade path when verifiable.
4. Store mitigation separately from patch; include residual risk and validation requirement.
5. Generate reviewed candidate choices: supported fix, safe upgrade path, temporary mitigation or unsupported/EOL replacement.
6. Require Amr preflight to confirm actual installability; never let the LLM generate an authoritative download URL.
7. For the FortiOS profile, link D17 fixed-branch assertions to separately reviewed upgrade-path/release-note constraints, hardware support, maintenance and backup prerequisites. An advisory minimum fix is not permission to jump to the latest firmware.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous + Shams + Hams review the handoff before declaring completion.
9. Build a small reviewed FortiOS advisory fixture pack using preserved vendor records and separately sourced upgrade-path/release-note evidence. Record model/train, affected/fixed assertions, intermediate steps, compatibility, mitigation, backups and verification; unknown information remains unknown.

### Technical Approach

Existing Design Decision: Vendor-authoritative remediation assertions; C09 validates their execution readiness. Newest release is not automatically the compatible target, and missing fixed versions must not be invented.

### Expected Deliverables

- `backend/app/remediation/catalog.py`
- `contracts/v1/remediation-candidate.schema.json`
- `fixtures/remediation/vendor-candidates.jsonl`
- `tests/remediation/test_catalog.py`
- `docs/remediation-source-map.md`
- `datasets/remediation/vendor-guidance-cases.jsonl`

### Testing

1. Link one patch to several CVEs without merging vulnerabilities
2. Keep no-fix and mitigation-only cases explicit
3. Apply an advisory correction and preserve old catalog revision
4. Reviewer checks every fixed version/path assertion against the preserved vendor revision; include missing and contradictory evidence.

### Acceptance Criteria

- Latest version is not automatically recommended over supported compatible fix.
- No fix yields mitigation/manual escalation, not invented patch.
- Missing prerequisites block execution approval.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Appliance remedies remain reviewed recommendations/import evidence; this release has no automatic FortiOS execution adapter.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Supported factual-field coverage; wrong-version/path count

### Risks / Failure Modes

- A real fix is unavailable to this entitlement or platform.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Explain blocked status, select vendor-supported mitigation or manual change.

### Next Dependent Work

C09, A11, A17

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D15 — Create Independent Matching Ground Truth & Measure Errors

**Goal:** Build a frozen, reviewed benchmark that can expose false matches and missed supported vulnerabilities.

**Why This Matters:** Proposal 90% detection needs a defensible denominator and false-positive reporting.

**Owner:** Mahrous

**Support:** Amr, Shams, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: D05, D09 (initial plan; no completion reported).

**Depends on:** D05, D09

**Unlocks:** C16, A17

**Parallel with:** D03, D04, D11, C04

**Critical path:** Yes

**First action:** Build labeled cases independently from engine output: vulnerable, fixed backport, wrong architecture, unfixed, ambiguous, withdrawn and stale inventory.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Create Independent Matching Ground Truth & Measure Errors. **When:** At the input/fixture review and again before D15 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d15-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Create Independent Matching Ground Truth & Measure Errors. **When:** At the input/fixture review and again before D15 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d15-shams.md — Reproducible observation evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Create Independent Matching Ground Truth & Measure Errors. **When:** At the input/fixture review and again before D15 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d15-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Separate real evidence, reviewed labels and generated scenario context.

- Who labels each case independently of the matching code?
- Which positive, negative, backport, ambiguous and missing-field cases represent the declared scope?
- How will unknowns, failed scans and coverage denominators be reported?

Sources: DS06, DS08, DS16

### Inputs

- D05 known affected/fixed cases
- D09 matcher
- Authorized lab snapshots

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Build labeled cases independently from engine output: vulnerable, fixed backport, wrong architecture, unfixed, ambiguous, withdrawn and stale inventory.
3. Have Amr review source evidence and Amr verify installed versions; adjudicate disagreements.
4. Freeze held-out cases/revisions; keep near-duplicate advisories and package families from leaking across evaluation splits.
5. Report supported-scope recall, precision, false-positive rate, unknown rate and per-family counts.
6. Retain misses/unsupported cases in results; do not remove failures after seeing outputs.
7. Compare naive version matching, vendor-aware rules and full reassessment system; publish artifacts needed to reproduce.
8. Build independent gold cases from actual preserved vendor revisions and authorized lab observations; mark synthetic context cases and report them separately.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Shams + Hams review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Frozen source/observation revisions and independent labels, not another scanner treated as ground truth. The proposal detection target applies only to declared known vulnerabilities in the controlled lab.

### Expected Deliverables

- `evaluation/matching/gold.jsonl`
- `evaluation/matching/annotation-guide.md`
- `experiments/evaluate_matching.py`
- `evaluation/matching/results.json`
- `reports/matching-benchmark.md`

### Testing

1. Have two reviewers label a held-out subset and resolve disagreements
2. Run the frozen benchmark against the engine and report per-family errors
3. Reproduce metrics from saved predictions without changing labels

### Acceptance Criteria

- ≥90% known-vulnerability lab detection remains a target, not claimed result.
- Ground truth reviewer differs from engine author where possible.
- All reported metrics state dataset size, scope and date.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Known ground truth is not generated by the same LLM or rule implementation being evaluated.

### Risks / Failure Modes

- Easy-only dataset inflates results and academic value collapses.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Add explicit hard negative/unknown challenge sets; report confidence intervals and limitations.

### Next Dependent Work

C16, A17

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D16 — Measure CVE Freshness & Rehearse Source Outage Recovery

**Goal:** Prove where time is spent from public record publication to usable knowledge and reassessment.

**Why This Matters:** 24-hour proposal goal must be measurable despite upstream delays and incomplete records.

**Owner:** Amr

**Support:** Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: D03, D13 (initial plan; no completion reported).

**Depends on:** D03, D13

**Unlocks:** Final handoff

**Parallel with:** D15, C04, C06, C08

**Critical path:** No

**First action:** Track source published, first_seen, normalized, searchable and applicable-assets-reassessed timestamps separately.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Measure CVE Freshness & Rehearse Source Outage Recovery. **When:** At the input/fixture review and again before D16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d16-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Measure CVE Freshness & Rehearse Source Outage Recovery. **When:** At the input/fixture review and again before D16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d16-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Connected freshness targets and disconnected snapshot age are different acceptance claims.

- Which timestamps measure publication, first observed, normalized, indexed and reassessed?
- What observation window and missing-publication-date policy make the 24h metric honest?
- How will polling delays and source outages trigger warning and catch-up?

Sources: DS01, DS02, DS13

### Inputs

- D03–D04 ingestion timestamps
- D13 reassessment telemetry

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Track source published, first_seen, normalized, searchable and applicable-assets-reassessed timestamps separately.
3. Keep proposal within24h objective; report percent within24h plus p50/p95/max and missed items, without silently changing the commitment.
4. Run synthetic new/updated/rejected source fixtures through pipeline; separately sample real upstream records with dates.
5. Rehearse 48h outage, expired key, malformed record, disk-full/quarantine growth and bulk upstream revision.
6. Alert stale source, bound retries, replay checkpoints and reconcile without duplicate findings.
7. State why AI may know a CVE exists while asset applicability remains unknown pending vendor facts.
8. Report connected source publication-to-seen and seen-to-usable separately. In disconnected mode show snapshot as-of/import age; do not promise 24-hour upstream freshness while no updates can enter.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar + Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Keep the proposal 24-hour target; polling and recovery scheduling are configurable. Unknown public disclosure times and incomplete upstream data remain visible limitations.

### Expected Deliverables

- `backend/app/intelligence/freshness_metrics.py`
- `experiments/source_outage.py`
- `reports/freshness-results.csv`
- `docs/runbooks/source-outage.md`
- `tests/intelligence/test_freshness.py`

### Testing

1. Pause a source, verify staleness and then replay the backlog
2. Calculate publication-to-seen and seen-to-usable separately
3. Report all 24h misses and causes rather than hiding them in an average

### Acceptance Criteria

- Source outage never displays fresh status.
- No claim every new CVE becomes reliably detectable within24h.
- Catch-up preserves revisions and marks delayed records.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Publication timestamps are revised/backdated, distorting freshness metrics.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Report both source-publication and observed-first-seen lag with source availability notes.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## C01 — Define Allowed Lab Targets & Enforce Scan Safety Rules

**Goal:** Create an enforceable scope profile before any connector can contact a target.

**Why This Matters:** Prevents unsafe and unauthorized collection before any scanner runs.

**Owner:** Mahrous

**Support:** Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Can start now (initial plan; no completion reported).

**Depends on:** None

**Unlocks:** C02, C03, C04, P08

**Parallel with:** D01, D02, A01, A02

**Critical path:** Yes

**First action:** Define owned lab ip ranges and exclusions

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Define Allowed Lab Targets & Enforce Scan Safety Rules. **When:** At the input/fixture review and again before C01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c01-shams.md — Reproducible observation evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Narrow by supported profile and capability rather than claiming a generic IT/OT scanner.

- Which exact networks and devices does the team control?
- Which device classes must default to passive or manual evidence?
- How will DNS changes, IP reuse, timeouts and emergency stop be handled?

Sources: CY-S01, CY-S12, MR05

### Inputs

- device list and available laptop specs

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Define owned lab ip ranges and exclusions
3. Tag asset classes
4. Write read-only versus mutation permissions
5. Create stop/timeout policy
6. Define evidence retention and secrets boundaries
7. Declare industrial-support IT as the proposed customer segment, with Ubuntu lab execution and a conditional FortiOS evidence profile. Customer fit and actual company access remain unverified.
8. Publish separate discovery, inventory, assessment, recommendation and execution capabilities. Exclude direct OT probing/firmware mutation, security-code analysis and universal network-device coverage from the current release.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Shams review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Allowlisted scopes, resolved-address revalidation, device-specific profiles and bounded operations. This defines lab authorization, not permission to scan an external organization.

### Expected Deliverables

- `config/lab-scope.yaml`
- `docs/lab-capability-matrix.md`
- `runner/scope_guard.py`
- `tests/runner/test_scope_guard.py`

### Testing

1. Submit an out-of-range IP and expect rejection before a connection
2. Resolve an allowed hostname to a forbidden address and reject it
3. Apply an unknown/OT profile and verify no generic active probe runs

### Acceptance Criteria

- Out-of-scope target and excluded device classes are rejected before any connector call
- Unknown class defaults to no active probe
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Every profile has explicit capability gates, allowed collection paths and unsupported actions.

### Risks / Failure Modes

- IP reuse or hostname resolution changes
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

revalidate resolved address against scope immediately before connection

### Next Dependent Work

C02, C03, C04, P08

### Related Decisions

ADR06, ADR07, ADR21

## C02 — Build a Reproducible Lab & Verify Baseline Restoration

**Goal:** Prepare known test systems and evidence so scans and updates can be repeated safely.

**Why This Matters:** Makes demonstrations repeatable and provides trustworthy expected outcomes.

**Owner:** Amr

**Support:** Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Blocked by: C01 (initial plan; no completion reported).

**Depends on:** C01

**Unlocks:** C04, C05, C11

**Parallel with:** D01, D02, C03, A01

**Critical path:** Yes

**First action:** Choose the available lab host and create one isolated target VM/network from the recorded scope and image manifest.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Build a Reproducible Lab & Verify Baseline Restoration. **When:** At the input/fixture review and again before C02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c02-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which available hardware supports the chosen VM and network layout?
- Are the OS images, packages and Windows licenses available for the intended tests?
- How will baseline snapshots, vendor labels and restore checks be recorded?

Sources: CY-S06, CY-S13

### Inputs

- hardware inventory and authorized OS images

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Create isolated vm/network
3. Record image/version/digest
4. Seed a small known affected and fixed package set plus unknown/backport fixtures
5. Snapshot baseline
6. Document restore
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.

### Technical Approach

Needs Validation: Isolated VM/network with pinned images and known package fixtures. Exact hypervisor and target release remain Needs Validation against available hardware; serialized VMs are an allowed fallback.

### Expected Deliverables

- `lab/manifest.yaml`
- `lab/fixtures/expected-results.json`
- `lab/setup.md`
- `lab/restore-checklist.md`
- `reports/lab-rebuild-proof.md`

### Testing

1. Rebuild one target using the manifest on a second machine if available
2. Compare installed versions to the recorded baseline
3. Restore after a test change and rerun the basic service checks

### Acceptance Criteria

- Another teammate rebuilds one fixture
- Every seeded expected result has vendor evidence
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- insufficient RAM/old packages unavailable
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

serialized VMs and versioned recorded evidence, clearly distinguish replay from live scans

### Next Dependent Work

C04, C05, C11

### Related Decisions

ADR06, ADR07

## C03 — Define Asset Observation Fields & Validate Stable Identity

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

## C04 — Implement Bounded Network Discovery & Parse Structured Results

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

## C05 — Collect Ubuntu OS and Package Evidence Through Authenticated SSH

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

## C06 — Compare Windows Inventory Options & Implement One Adapter

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

## C07 — Import Offline and Appliance Evidence With Freshness Labels

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

## C08 — Integrate the Applicability Engine & Review Its Evidence Traces

**Goal:** Connect D09 results to real observations and confirm that every verdict can be inspected.

**Why This Matters:** Separates affected, unaffected and unknown using attributable evidence.

**Owner:** Mahrous

**Support:** Amr

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: C03, C05, D09 (initial plan; no completion reported).

**Depends on:** C03, C05, D09

**Unlocks:** C09, C10, C13, C15, C16, P06

**Parallel with:** D03, D04, D11, C04

**Critical path:** Yes

**First action:** Consume the D09 engine through the shared assessment contract; do not build a second matching engine.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Integrate the Applicability Engine & Review Its Evidence Traces. **When:** At the input/fixture review and again before C08 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c08-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Does the D09 contract carry source revision, observation ID, reason codes and missing evidence?
- Which collection errors must prevent a confident verdict?
- How will a reviewer distinguish unsupported, unknown and not_affected?

Sources: CY-S02, CY-S13

### Inputs

- vendor affected/fixed ranges and normalized observations

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Consume the D09 engine through the shared assessment contract; do not build a second matching engine.
3. Evaluate exact distro/package semantics
4. Distinguish affected/not affected/unknown
5. Attach source revision and evidence
6. Test backported versions and missing configurations
7. Request minimal missing evidence
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Reuse D09 as the only matching engine. C08 owns integration and evidence review, while P06 displays the result; no parallel matching implementation is needed.

### Expected Deliverables

- `backend/app/assessment/service.py`
- `fixtures/integration/assessment-traces.jsonl`
- `tests/integration/test_assessment_handoff.py`
- `reports/assessment-trace-review.md`

### Testing

1. Trace one vulnerable and one backported asset from raw inputs to verdict
2. Remove required evidence and verify the same engine returns unknown
3. Check displayed/source-linked verdicts against the D09 output

### Acceptance Criteria

- Seeded supported-family recall and precision reported separately
- Unknowns counted and not hidden
- No vulnerability proof from llm narrative
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- aliases and source conflicts
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

unknown plus analyst review, never guessed match

### Next Dependent Work

C09, C10, C13, C15, C16, P06

### Related Decisions

ADR06, ADR07

## C09 — Validate Patch Catalog Candidates Against Execution Prerequisites

**Goal:** Convert D14 catalog entries into runner-ready eligibility checks without duplicating the catalog.

**Why This Matters:** Turns vendor remediation information into compatible candidate fixes.

**Owner:** Amr

**Support:** Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: C08, D14 (initial plan; no completion reported).

**Depends on:** C08, D14

**Unlocks:** C10, C11

**Parallel with:** D12, D13, D15, C04

**Critical path:** Yes

**First action:** Reuse D14 catalog records; add runner-facing applicability and availability checks, not a second catalog.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Validate Patch Catalog Candidates Against Execution Prerequisites. **When:** At the input/fixture review and again before C09 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c09-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Is the documented fix actually available from the target's configured repository?
- Which entitlement, support, reboot and compatibility prerequisites must be checked?
- How should superseded, withdrawn or unavailable fixes be handled?

Sources: CY-S04, CY-S06, CY-S13

### Inputs

- vendor advisories/repositories

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Reuse D14 catalog records; add runner-facing applicability and availability checks, not a second catalog.
3. Record fix ids, affected product range, fixed version, support state, advisory links, prerequisites, restart notes and supersedence where supplied
4. Separate mitigation from patch
5. Review one affected-to-fixed package path with Mahrous and record unsupported or ambiguous cases
6. Version each revision
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Reuse the versioned D14 catalog; add applicability, availability and execution precondition checks. A download URL or AI recommendation is not approval.

### Expected Deliverables

- `backend/app/remediation/eligibility.py`
- `fixtures/remediation/eligibility-cases.jsonl`
- `tests/remediation/test_eligibility.py`
- `reports/patch-candidate-review.md`

### Testing

1. Evaluate an installable fix and record repository evidence
2. Reject a wrong-release or unavailable candidate
3. Keep mitigation-only and no-fix findings out of automatic package execution

### Acceptance Criteria

- Every candidate points to vendor evidence and applicable platform
- Newest is not automatically best
- No fixed version means no invented patch
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- advisory incomplete/withdrawn
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

pending/manual mitigation with explicit review date

### Next Dependent Work

C10, C11

### Related Decisions

ADR06, ADR07

## C10 — Build Version-Bound Patch Plans & Enforce Approval Policy

**Goal:** Create reviewable target manifests that cannot bypass scope, approval expiry or drift checks.

**Why This Matters:** Binds changes to approved targets, scope and time.

**Owner:** Mahrous

**Support:** Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: C08, C09, P04 (initial plan; no completion reported).

**Depends on:** C08, C09, P04

**Unlocks:** C11, C14, A11, P12

**Parallel with:** D03, D04, D11, D16

**Critical path:** Yes

**First action:** Calculate candidate set under support/compatibility/window constraints

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Build Version-Bound Patch Plans & Enforce Approval Policy. **When:** At the input/fixture review and again before C10 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c10-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Scope constraints are enforced in policy, not just displayed on the website.

- Who may propose, approve and dispatch in the four-role policy?
- Which plan, inventory and policy changes invalidate approval?
- What canary, maintenance-window and stop rules suit the lab?

Sources: CY-S06

### Inputs

- applicable findings and candidate fixes

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Calculate candidate set under support/compatibility/window constraints
3. Build target manifest
4. Require scoped approver
5. Expire on drift
6. Define canary and stop thresholds
7. Evaluate deployment/profile capability flags and current policy before approval; a recommendation-only FortiOS action cannot become executable through assistant wording or a UI toggle.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Immutable version/hash-bound plans with explicit scope and permission checks, coordinated with P12. Human approval is checked again immediately before mutation.

### Expected Deliverables

- `backend/app/remediation/policy.py`
- `contracts/v1/patch-plan.schema.json`
- `config/campaign-policy.yaml`
- `tests/remediation/test_approval_policy.py`
- `docs/approval-state-machine.md`

### Testing

1. Deny approval and execution for Auditor/Guest
2. Change the target snapshot or plan hash after approval and reject dispatch
3. Expire a window and verify a new review is required

### Acceptance Criteria

- Auditor/guest cannot approve/execute
- Changed asset/version invalidates approval
- No approval bypass through assistant tools
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Only the separately qualified Ubuntu lab execution profile is dispatchable in the current release.

### Risks / Failure Modes

- overbroad administrator privileges
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

explicit small-scope manual approval and no automatic campaign scheduling

### Next Dependent Work

C11, C14, A11, P12

### Related Decisions

ADR06, ADR07

## C11 — Implement an Approved Ubuntu Patch Pilot Runner

**Goal:** Install one exact approved package plan on a disposable target and retain every execution outcome.

**Why This Matters:** Executes a controlled real patch through a reusable OS engine.

**Owner:** Amr

**Support:** Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: C02, C05, C09, C10, P08, P12 (initial plan; no completion reported).

**Depends on:** C02, C05, C09, C10, P08, P12

**Unlocks:** C12, C13

**Parallel with:** D04, D13, D15, D16

**Critical path:** Yes

**First action:** Compare the approved target identity, observation freshness and maintenance window before starting any package mutation.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Implement an Approved Ubuntu Patch Pilot Runner. **When:** At the input/fixture review and again before C11 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c11-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which native package or Ansible operation can enforce exact versions and trusted repositories?
- How are disk space, locks, backup and target identity checked?
- What state is recorded when the connection is lost after mutation may have begun?

Sources: CY-S03, CY-S14

### Inputs

- immutable approved manifest

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Verify identity/freshness/window
3. Acquire asset lease
4. Preflight disk/locks/backup/repository
5. Run allowlisted explicit package plan
6. Persist step outcomes
7. Reconcile on reconnect
8. Never interpolate arbitrary shell
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.

### Technical Approach

Needs Validation: Isolated allowlisted runner using native package mechanisms, with Ansible as the first adapter candidate. No arbitrary shell from the user or assistant; exact runner choice is validated in the lab.

### Expected Deliverables

- `runner/adapters/ubuntu_patch.py`
- `runner/playbooks/ubuntu-approved-plan.yml`
- `fixtures/patch/ubuntu-plan.json`
- `tests/runner/test_patch_preflight.py`
- `reports/ubuntu-pilot.md`

### Testing

1. Execute one approved canary update and compare intended/actual versions
2. Resubmit the same job and prove no blind repeated mutation
3. Lose the execution connection and enter outcome_unknown until reconciliation

### Acceptance Criteria

- One intended update on canary
- Duplicate job does not cause duplicate mutation
- Timeout yields unknown outcome until reconciliation
- Unsigned/unapproved artifacts rejected
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- package drift after approval
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

stop and replan

### Next Dependent Work

C12, C13

### Related Decisions

ADR06, ADR07

## C12 — Handle Reboots, Reconnects and Partial Patch Failures

**Goal:** Keep long-running campaigns truthful and resumable across reboots and transport failures.

**Why This Matters:** Prevents connection failures and restarts from becoming false success.

**Owner:** Amr

**Support:** Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: C11 (initial plan; no completion reported).

**Depends on:** C11

**Unlocks:** C13, C14

**Parallel with:** D04, D13, D15, D16

**Critical path:** Yes

**First action:** Record how the selected adapter detects reboot requirements and define a fixture for a target that disconnects during restart.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Handle Reboots, Reconnects and Partial Patch Failures. **When:** At the input/fixture review and again before C12 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c12-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- How is reboot need detected for each supported adapter?
- How are pre/post boot identity and authenticated reconnect distinguished?
- Which failure halts later canary batches and which step can safely resume?

Sources: CY-S03, CY-S04

### Inputs

- controlled failure fixtures

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Detect restart need
3. Respect window
4. Record pre/post boot identity
5. Wait for authenticated reconnect
6. Run health checks
7. Retain per-asset/per-step outcome
8. Halt next batch on trigger
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Durable attempt records, bounded reconnect and explicit reboot_pending/outcome_unknown states. Transport retry is not permission to repeat a non-idempotent update.

### Expected Deliverables

- `runner/recovery.py`
- `contracts/v1/execution-state.schema.json`
- `fixtures/patch/failure-sequences.jsonl`
- `tests/runner/test_reboot_recovery.py`
- `reports/failure-rehearsal.md`

### Testing

1. Restart the runner while the target is rebooting and preserve durable state
2. Fail one asset in a batch and report a partial campaign
3. Reconnect after ambiguous completion and inspect state before any retry

### Acceptance Criteria

- Runner interruption, target disconnection and one failed asset never become whole-campaign success
- Operator can resume a safe remaining step
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- repeated execution after transport loss
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

reconcile-only state with manual recovery

### Next Dependent Work

C13, C14

### Related Decisions

ADR06, ADR07

## C13 — Verify Remediation Independently & Rehearse Recovery

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

## C14 — Validate Windows Updates and Reboot Recovery Before Adding Execution

**Goal:** Implement a Windows patch adapter only after update-source, privilege and reconnect behavior are proven.

**Why This Matters:** Adds Windows execution only after distinct platform constraints are demonstrated.

**Owner:** Amr

**Support:** Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Deferred extension

**Gate:** G3

**Start condition:** Blocked by: C06, C10, C12, C13 (initial plan; no completion reported).

**Depends on:** C06, C10, C12, C13

**Unlocks:** Final handoff

**Parallel with:** D04, D06, D07, D10

**Critical path:** No

**First action:** Validate winrm encryption/identity and admin boundary

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Validate Windows Updates and Reboot Recovery Before Adding Execution. **When:** At the input/fixture review and again before C14 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c14-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which configured update service supplies applicable updates on the licensed test build?
- How do exact update IDs/KBs, supersedence and multiple reboots affect the plan?
- What WinRM authentication/encryption and administrator boundary is required?

Sources: CY-S04, CY-S05

### Inputs

- approved Windows test update manifest

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Validate winrm encryption/identity and admin boundary
3. Enumerate configured update source
4. Search available updates
5. Select exact approved ids/kbs
6. Install with bounded reboot policy
7. Capture hresults and per-update state
8. Fresh inventory and health
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.

### Technical Approach

Needs Validation: Experimental Decision: native Windows servicing through the selected supported adapter, including ansible.windows.win_updates candidate. Jobs may run for hours; C06 inventory alone does not prove patch capability.

### Expected Deliverables

- `experiments/windows_patch_spike.py`
- `runner/adapters/windows_patch.py`
- `fixtures/patch/windows-plan.json`
- `tests/runner/test_windows_patch_states.py`
- `reports/windows-patch-capability.md`

### Testing

1. Perform one authorized update and authenticated reboot/reconnect cycle
2. Capture per-update failure codes and an unavailable update case
3. Reject an unsupported SCCM path and a stale approval

### Acceptance Criteria

- Real successful patch/reboot and failure/reconnect scenario
- Unsupported sccm route is rejected
- Long-running job remains visible
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- hours-long updates, policy/catalog mismatch
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

reviewed manual native-update execution with evidence import

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR06, ADR07

## C15 — Send Lifecycle Events to Wazuh & Verify Decoding and Correlation

**Goal:** Prove a real project event reaches Wazuh, is decoded and triggers the intended rule.

**Why This Matters:** Meets the proposal with real external SIEM evidence.

**Owner:** Mahrous

**Support:** Amr, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: C03, C08, P13 (initial plan; no completion reported).

**Depends on:** C03, C08, P13

**Unlocks:** C16

**Parallel with:** D04, D14, D16, C04

**Critical path:** Yes

**First action:** Emit one json object per line to restricted rotating log

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Supply or replay the authorized collection/execution fixtures and identify real lab constraints. Focus: Send Lifecycle Events to Wazuh & Verify Decoding and Correlation. **When:** At the input/fixture review and again before C15 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c15-amr.md — Reproducible observation/runner evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Send Lifecycle Events to Wazuh & Verify Decoding and Correlation. **When:** At the input/fixture review and again before C15 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c15-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which Wazuh agent/localfile and JSON decoder configuration is deployed in the lab?
- Which event fields support asset/finding/campaign correlation?
- What happens on log rotation, replay and duplicate delivery?

Sources: CY-S15, CY-S16

### Inputs

- normalized assessment/patch events

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Emit one json object per line to restricted rotating log
3. Configure wazuh agent localfile collection
4. Verify json decoding
5. Add custom rules
6. Test decoder/rule with wazuh-logtest
7. Correlate by asset id, finding id and campaign id
8. Verify external dashboard alert
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr implements collector; Omar supports event API and outbox review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: P13 outbox delivers JSON lines to the supported Wazuh collection route. The management REST API is not assumed to be a generic event ingestion endpoint.

### Expected Deliverables

- `integrations/wazuh/localfile-example.conf`
- `integrations/wazuh/local_rules.xml`
- `fixtures/siem/events.jsonl`
- `reports/wazuh-ingestion-proof.md`
- `tests/integrations/test_siem_payload.py`

### Testing

1. Run the fixture through wazuh-logtest and inspect decoded fields
2. Emit a real event and find its event_id in the external alert
3. Replay/rotate inputs and ensure project business counters are not inflated

### Acceptance Criteria

- Event contains source id, timestamp, evidence reference, cve/advisory id and lifecycle state
- Replay preserves event id and cannot inflate project counters
- No credentials in exported payload
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- duplicate delivery and rotation loss
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

durable replay cursor and documented at-least-once semantics, no claim of generic REST ingestion

### Next Dependent Work

C16

### Related Decisions

ADR06, ADR07

## C16 — Publish Supported-Coverage Results & Reproduce the End-to-End Demo

**Goal:** Deliver measured detection, verified remediation and failure evidence for the declared lab scope.

**Why This Matters:** Turns project claims into reproducible academic evidence.

**Owner:** Mahrous

**Support:** Amr, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G4

**Start condition:** Blocked by: C04, C05, C08, C13, C15, D15 (initial plan; no completion reported).

**Depends on:** C04, C05, C08, C13, C15, D15

**Unlocks:** Final handoff

**Parallel with:** D04, D06, D07, D16

**Critical path:** Yes

**First action:** Freeze the evaluated code, source revisions, supported-profile list and ground-truth fixture manifest before calculating results.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Publish Supported-Coverage Results & Reproduce the End-to-End Demo. Supply or replay the authorized execution fixtures and identify real lab constraints. Focus: Publish Supported-Coverage Results & Reproduce the End-to-End Demo. **When:** At the input/fixture review and again before C16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c16-amr.md — Source/provenance corrections and reviewed fixture IDs; reviews/c16-amr.md — Reproducible observation/runner evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance. **When:** At the input/fixture review and again before C16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c16-shams.md — Reproducible asset observation evidence`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which fixtures and supported profiles form the fixed denominator?
- How are false positives, false negatives, unknowns and scan failures counted separately?
- What minimum live and offline replay demo proves the story honestly?

Sources: CY-S06, CY-S07

### Inputs

- declared support matrix and known lab ground truth

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Freeze test version
3. Measure recall/precision/unknown rate by asset family
4. Count scan failures separately
5. Time update/assessment and recovery
6. Compare optional independent scanner results without treating them as truth
7. Publish unsupported cases and runbooks
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Shams review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Controlled-lab metrics and reproducible evidence; optional scanner comparisons are secondary, not ground truth. Repeat the relevant subset at each discussion and freeze final results at G4.

### Expected Deliverables

- `experiments/evaluate_lab.py`
- `reports/coverage-benchmark.md`
- `reports/demo-evidence-manifest.json`
- `docs/runbooks/final-demo.md`
- `reports/known-limitations.md`

### Testing

1. Run a frozen held-out fixture set and publish all metric counts
2. Demonstrate one verified fix and one failure/recovery path
3. Have another member reproduce the recorded evaluation from its manifest

### Acceptance Criteria

- Proposal ≥90% detection goal reported only on declared known lab vulnerabilities, with denominator and failure cases
- Actual siem event and one verified remediation demonstrated
- No product-wide claims from tiny lab
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- cherry-picked demo
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

holdout fixtures reviewed by teammate and seeded failure demonstration

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR06, ADR07

## A01 — Define AI Tasks, Label Rules and Reviewed Examples

**Goal:** Turn category, impact, severity and assistant behavior into separately measurable tasks.

**Why This Matters:** Convert the proposal into measurable ML tasks without treating inference as authoritative security truth.

**Owner:** Hams

**Support:** Amr, Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Can start now (initial plan; no completion reported).

**Depends on:** None

**Unlocks:** A02

**Parallel with:** D01, D02, C01, C02

**Critical path:** No

**First action:** Write category and impact inclusion/exclusion rules with multi-label examples.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Define AI Tasks, Label Rules and Reviewed Examples. **When:** At the input/fixture review and again before A01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a01-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Define AI Tasks, Label Rules and Reviewed Examples. **When:** At the input/fixture review and again before A01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a01-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Define AI Tasks, Label Rules and Reviewed Examples. **When:** At the input/fixture review and again before A01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a01-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Hams starts with scope/taxonomy and UX01; no unbounded training or generic OT classification.

- Which category and impact labels can overlap?
- What does an unmentioned impact mean versus a reviewed negative label?
- How must source-backed severity differ from predicted missing severity?
- Which category labels help triage the narrow profiles and are supported by reliable source evidence?
- Which organizational fields are structured tool inputs rather than text inferred from a CVE?

Sources: AI01, AI05

### Inputs

- Proposal dimensions
- 30 representative advisory records

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Write category and impact inclusion/exclusion rules with multi-label examples.
3. Separate official severity from inferred missing severity and preserve provider/version.
4. Define unknown, contradictory and insufficient-text cases.
5. Define assistant intents, prohibited actions and sample expected answers.
6. Have Amr and Mahrous independently label ten cases, adjudicate disagreements.
7. Align labels and user questions with UX01 and the scope baseline; keep source category, model-inferred category, applicability and priority as separate fields.
8. Freeze a small taxonomy for the supported profiles before model experiments; record rare or uncertain labels and avoid invented labels from generated text.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Mahrous + Omar review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Multilabel category/impact taxonomy with explicit unknowns; official CVSS remains primary. Labels are project definitions, not an official universal CVE taxonomy.

### Expected Deliverables

- `docs/ai/taxonomy.md`
- `contracts/v1/ai-task.schema.json`
- `datasets/labels/pilot-reviewed.jsonl`
- `docs/ai/assistant-intents.md`

### Testing

1. Have two reviewers label the same ten examples and resolve disagreements
2. Check positive, negative and unknown examples for every retained label
3. Verify no prediction can overwrite official severity

### Acceptance Criteria

- Each label has positive/negative/unknown examples.
- No AI output overwrites source-backed severity.
- Ten adjudicated examples and reviewers recorded.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- The task taxonomy does not imply that a classifier detects installed vulnerabilities or chooses patch approval.

### Risks / Failure Modes

- Ambiguous taxonomy causes inconsistent labels.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Reduce labels to defensible classes and retain unknown.

### Next Dependent Work

A02

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20, ADR23

## A02 — Create Versioned Training and Evidence Datasets With Provenance

**Goal:** Freeze provenance-controlled AI datasets; coordinate Amr’s preparation of the prioritization input bundle without duplicating source collectors.

**Why This Matters:** Reproducible experiments require exact source revisions.

**Owner:** Hams

**Support:** Shams, Amr, Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Blocked by: A01 (initial plan; no completion reported).

**Depends on:** A01

**Unlocks:** A03, A06

**Parallel with:** D01, D02, C01, C02

**Critical path:** No

**First action:** Select a pilot snapshot with source IDs, dates, hashes and revision keys.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Shams**: Coordinate and assemble vulnerability, asset and contextual inputs; validate joins, timestamps, missingness and data readiness, reusing existing collectors. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a02-shams.md — Coordinate and assemble vulnerability, asset and contextual inputs; validate joins, timestamps, missingness and data readiness, reusing existing collectors.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Amr**: Supply authoritative advisory/source revisions and review provenance/rights; Amr owns D01–D07, D11, D14, D16–D18 and C09. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a02-amr.md — Supply authoritative source revisions and review provenance/rights; no transfer of D01–D05 source ownership.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Mahrous**: Supply applicability outcomes and reviewed business/policy scenario constraints from D09/D12. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a02-mahrous.md — Supply applicability outcomes and reviewed business/policy scenario constraints from D09/D12.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Omar**: Validate P02 identifiers, tenant scope and serialization for the experimental input bundle. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a02-omar.md — Validate P02 identifiers, tenant scope and serialization for the experimental input bundle.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- Prefer real public records plus real lab observations; synthetic policies are controlled fixtures.
- 29 October: explicit cross-functional AI prioritization/remediation handoff; existing domain ownership retained.

- Which source revisions and fields are allowed in each AI task?
- How are vulnerability aliases and text revisions grouped?
- What attribution, sensitive-data exclusion and feedback-review rules apply?
- Which CVE/vendor records are real public evidence, which labels are reviewed, and which assets/policies are generated fixtures?
- Are dataset license, source revision and sensitive-field removal recorded per source?
- Which ranking/context fields are available, absent, stale or synthetic?
- Can the same immutable scenario bundle reproduce rule, AI and hybrid comparisons?

Sources: AI02, AI03

### Inputs

- Canonical advisory API fixture
- A01 taxonomy

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Select a pilot snapshot with source IDs, dates, hashes and revision keys.
3. Record allowed uses and data provenance.
4. Create raw immutable and normalized tables/files with manifest.
5. Mark rejected, disputed, missing and alias records explicitly.
6. Keep human labels separate from weak machine labels.
7. Build a data manifest with origin classes public_source, real_lab_observation, reviewed_label and synthetic_fixture. Public CVE/vendor records are not real customer inventory.
8. Use real authorized lab snapshots for behavior tests; generated assets/policies only fill controlled scenario gaps and carry visible synthetic labels. Do not treat Claude-generated CVEs or unreviewed Kaggle rows as authoritative.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Shams + Amr + Mahrous + Omar review the handoff before declaring completion.
10. Amr assembles prioritization experiment tables from D01–D05/D11 feeds, C05 observations and D12 policy/context definitions once those artifacts exist; initial A02 manifest design can start earlier. Reuse source owners’ collectors, do not create parallel feeds.
11. Join record/advisory revision, observed asset revision, dated threat signals, consented or labelled synthetic organization context, maintenance window and eligible remediation action IDs. Retain missing-field masks and conflicts. Hams freezes leakage-safe datasets via A03.

### Technical Approach

Existing Design Decision: Versioned JSONL and dataset manifests from preserved evidence, with human-reviewed labels. User feedback and LLM-generated labels are not automatic ground truth.

### Expected Deliverables

- `datasets/manifests/corpus-v1.json`
- `datasets/raw/advisories.jsonl`
- `datasets/labels/review-queue.jsonl`
- `scripts/ai/build_dataset.py`
- `docs/ai/dataset-card.md`
- `ai/data/origin-and-rights-manifest.csv`
- `datasets/prioritization/input-manifest.json`
- `datasets/prioritization/scenarios.jsonl`
- `datasets/prioritization/readiness-report.md`

### Testing

1. Rebuild the same dataset from a pinned manifest
2. Trace each example to a source revision and label provenance
3. Reject records with missing required provenance without silently dropping them
4. Audit a sample from each origin class and verify generated fixtures cannot silently enter the real-data evaluation denominator.
5. Validate joins and hashes; reject cross-organization leakage and duplicate/revision leakage.

### Acceptance Criteria

- Every row links to retrievable source revision.
- Rebuilding from the manifest reproduces row counts/hashes.
- No sensitive inventory is added to public training exports.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Every sample has provenance, rights status and split membership; synthetic-only results are separately reported.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Field coverage and missing/stale/synthetic fractions per origin; reproducible row counts

### Risks / Failure Modes

- Dataset revisions silently change reported scores.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Freeze a small licensed/reviewed snapshot and expand later.

### Next Dependent Work

A03, A06

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## A03 — Clean Advisory Text & Freeze Leakage-Safe Dataset Splits

**Goal:** Prepare train/validation/test partitions without leaking future facts, aliases or labels.

**Why This Matters:** Near-duplicate advisories can make a weak model look excellent.

**Owner:** Hams

**Support:** Amr

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: A02 (initial plan; no completion reported).

**Depends on:** A02

**Unlocks:** A04, A17

**Parallel with:** D01, D02, D03, D04

**Critical path:** No

**First action:** Normalize HTML/Unicode while retaining negation, versions and IDs.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Clean Advisory Text & Freeze Leakage-Safe Dataset Splits. **When:** At the input/fixture review and again before A03 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a03-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Extend leakage controls to revised vendor records and organization-context scenarios.

- Which HTML/Unicode normalization preserves negation, IDs and version strings?
- How are exact and near-duplicate advisories grouped before temporal splitting?
- Which severity-derived tokens or future revisions would leak the target?

Sources: AI02, AI03

### Inputs

- A02 raw data
- Alias mapping

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Normalize HTML/Unicode while retaining negation, versions and IDs.
3. Identify exact and near duplicates and group aliases/revisions.
4. Choose temporal cutoff and validation window; keep groups together.
5. Reserve unseen-family diagnostic split separately.
6. Fit preprocessing only on training data and audit for labels embedded in features.
7. Write assertions for zero alias/revision overlap and future leakage.
8. Group CVE/advisory duplicates and revisions before splitting; separate organization scenarios and historical cutoffs to prevent source or policy leakage. Keep ranking judgments and user-study scenarios out of training.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Group-aware chronological split with a locked final holdout; explicit severity leakage controls. TimeSeriesSplit alone does not solve advisory alias leakage.

### Expected Deliverables

- `scripts/ai/prepare_splits.py`
- `datasets/splits/train.jsonl`
- `datasets/splits/validation.jsonl`
- `datasets/splits/test.jsonl`
- `reports/ai/leakage-audit.md`

### Testing

1. Check that aliases/revisions do not cross the frozen partitions
2. Verify vectorizers are fitted on training data only
3. Use a future amendment and confirm it cannot alter the historical test input
4. Check duplicate IDs, near-duplicates and revised advisories across splits; fail the dataset release if leakage is unresolved.

### Acceptance Criteria

- No vulnerability group spans train/test.
- Cutoff and source revision timestamps are recorded.
- Severity description experiment excludes explicit target score/vector fields.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Pretrained-model knowledge of older CVEs remains possible.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Report contamination limit and add new post-freeze cases.

### Next Dependent Work

A04, A17

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## A04 — Train CPU Classification Baselines & Report Per-Label Errors

**Goal:** Establish an inexpensive reproducible baseline before considering heavier models.

**Why This Matters:** Establish an inexpensive defensible academic baseline before expensive models.

**Owner:** Hams

**Support:** Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: A03 (initial plan; no completion reported).

**Depends on:** A03

**Unlocks:** A05, A13, A17

**Parallel with:** D01, D02, D03, D04

**Critical path:** No

**First action:** Implement majority and keyword baselines.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Train CPU Classification Baselines & Report Per-Label Errors. **When:** At the input/fixture review and again before A04 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a04-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which keyword and TF-IDF baselines answer the defined tasks?
- How should class imbalance and missing labels affect training and thresholds?
- Which macro/micro/per-label metrics and abstention coverage will be reported?

Sources: AI01, AI04

### Inputs

- A03 splits
- A01 taxonomy

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Implement majority and keyword baselines.
3. Train word/character TF-IDF with OneVsRest logistic regression; compare linear SVM.
4. Tune thresholds on validation only.
5. Log macro/micro/per-label precision recall F1 and label support.
6. Inspect false positives/negatives with Amr.
7. Export pipeline with pinned versions and model card.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar review the handoff before declaring completion.

### Technical Approach

Needs Validation: Word/character TF-IDF with OneVsRest logistic regression or linear SVM candidates. Choose thresholds on validation only; no fixed final F1 promise before label audit.

### Expected Deliverables

- `experiments/ai/train_baselines.py`
- `models/baselines/manifest.json`
- `reports/ai/classification-metrics.json`
- `reports/ai/classification-errors.md`
- `tests/ai/test_inference_contract.py`

### Testing

1. Compare keyword and TF-IDF OneVsRest baselines on the same splits
2. Report per-label precision/recall/F1 with class counts
3. Reload the pinned model and reproduce saved predictions

### Acceptance Criteria

- Identical seed/snapshot reproduces metrics.
- Rare classes and unknown coverage are visible.
- Held-out test remains locked until model choices freeze.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Small labels or imbalance makes overall accuracy misleading.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Use simpler model and collect targeted labels before deep learning.

### Next Dependent Work

A05, A13, A17

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## A05 — Review Label Disagreements & Test a Stronger Classifier Only if Justified

**Goal:** Determine whether better labels or a more capable encoder meaningfully improves the baseline.

**Why This Matters:** Increase quality where measured errors justify effort.

**Owner:** Hams

**Support:** Amr, Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Conditional experiment

**Gate:** G3

**Start condition:** Blocked by: A04 (initial plan; no completion reported).

**Depends on:** A04

**Unlocks:** Final handoff

**Parallel with:** D01, D02, D03, D04

**Critical path:** No

**First action:** Sample disagreement and rare-label cases for dual review.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Review Label Disagreements & Test a Stronger Classifier Only if Justified. **When:** At the input/fixture review and again before A05 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a05-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Review Label Disagreements & Test a Stronger Classifier Only if Justified. **When:** At the input/fixture review and again before A05 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a05-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Keep a measurable CPU baseline; stronger classifiers remain conditional.
- 24 October: exclude fine-tuning from current execution; retain a long-term evidence-led capability review in OQ01.

- Which error categories are label problems rather than model failures?
- Do frozen embeddings plus a linear head improve the same held-out task?
- Does a SecBERT or frozen encoder candidate improve the declared task over TF-IDF under the same split and hardware budget?
- What baseline failures, if any, should be documented for the future OQ01 review without starting fine-tuning now?

Sources: AI01, AI03, AI10, MR10

### Inputs

- A04 error clusters
- Unlabelled source records

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Sample disagreement and rare-label cases for dual review.
3. Log agreement and adjudication without revealing test answers to training.
4. Compare frozen multilingual embeddings plus a linear classifier.
5. Keep pretrained encoders frozen in the current release. Record any future fine-tuning case under OQ01; do not train adapted weights in this package.
6. Run equal splits and measure latency/model size as well as F1.
7. Treat SecBERT/BERT as optional encoder/classification candidates; validate exact weights, license and downstream head before use. They are not replacements for a generative assistant.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Mahrous review the handoff before declaring completion.

### Technical Approach

Needs Validation: Experimental Decision: compare reviewed labels and frozen embeddings plus a linear classifier against the CPU baseline. No fine-tuning in the current release. Future pretrained-weight adaptation requires the separate evidence, rights, resource and lifecycle review in OQ01.

### Expected Deliverables

- `datasets/labels/adjudication-log.jsonl`
- `experiments/ai/compare_classifiers.py`
- `reports/ai/model-comparison.md`
- `models/candidate/model-card.md`

### Testing

1. Adjudicate a reviewed error subset before retraining
2. Compare candidates using identical splits and metrics
3. Measure runtime/RAM and report negative results as well as gains

### Acceptance Criteria

- Model selected using validation, not the final test.
- Improvement and added operational cost are documented.
- Human label provenance survives each revision.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Current candidate comparisons keep pretrained weights frozen; any future fine-tuning proposal remains separate from current execution.

### Risks / Failure Modes

- Deep model overfits sparse labels.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Ship CPU baseline; supervised learning remains substantial even without fine-tuning.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## A06 — Build Revision-Aware Retrieval Chunks With Source Metadata

**Goal:** Create searchable evidence units that preserve version tables, scope and revision history.

**Why This Matters:** Answers need source sections and fresh revisions, not anonymous text fragments.

**Owner:** Hams

**Support:** Amr, Omar, Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: A02, D02 (initial plan; no completion reported).

**Depends on:** A02, D02

**Unlocks:** A07, A14, P17

**Parallel with:** D03, D04, D05, D08

**Critical path:** No

**First action:** Parse descriptions, applicability and remediation into separate section types.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Build Revision-Aware Retrieval Chunks With Source Metadata. **When:** At the input/fixture review and again before A06 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a06-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Build Revision-Aware Retrieval Chunks With Source Metadata. **When:** At the input/fixture review and again before A06 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a06-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Build Revision-Aware Retrieval Chunks With Source Metadata. **When:** At the input/fixture review and again before A06 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a06-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- RAG uses governed documents; current facts and verdicts come from authorized typed tools.

- Which advisory sections should be kept together to avoid mixing product rows?
- What chunk size fits the candidate embedding token limit?
- How are withdrawal, source scope, document hashes and stale chunks represented?
- Which facts belong in structured database/tool responses and which explanatory documents belong in the retrieval corpus?
- How are organization-specific policy documents scoped, versioned, revoked and retrieved without cross-organization leakage?

Sources: AI08, AI12

### Inputs

- Advisory/patch metadata contracts
- A02 source manifest

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Parse descriptions, applicability and remediation into separate section types.
3. Chunk by semantic section/product row with token limits.
4. Attach source URL/date/hash/revision/platform and access scope.
5. Reject empty/unsafe markup and quarantine malformed extraction.
6. Implement replacement/tombstone of chunks after source changes.
7. Keep authoritative CVE/vendor assertions, inventory, applicability, priority and approval state in structured storage. Index selected source text and policies as derived retrieval evidence with typed links back to those records.
8. Separate public knowledge from organization-scoped policies and runbooks; attach organization/object ACL, source revision, validity dates and trust labels to chunks.
9. Prepare local embedding/tokenizer artifacts and a rebuildable index export for the on-prem profile; record model/hash and disable external embedding calls in local-only mode.
10. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Omar + Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Structured chunks and metadata in the existing PostgreSQL design; embeddings are derived. Corpus fixtures allow development before the full live intake is ready.

### Expected Deliverables

- `backend/app/ai_gateway/corpus.py`
- `contracts/v1/retrieval-chunk.schema.json`
- `datasets/retrieval/chunks.jsonl`
- `tests/ai/test_chunk_provenance.py`
- `docs/ai/chunking-rules.md`
- `ai/retrieval/corpus-routing.md`

### Testing

1. Trace every chunk to its exact source section and revision
2. Keep distinct distro/version table rows from being mixed
3. Mark a superseded revision stale and exclude it from current retrieval
4. Revoke a policy and revise an advisory; verify old chunks cannot answer as current evidence.

### Acceptance Criteria

- Chunks preserve product and version-table context.
- Every chunk can open exact source/revision.
- Changed/rejected source fixtures retire obsolete chunks.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- RAG is not used as the source of truth for installed-version matching or live approval status.

### Risks / Failure Modes

- Chunk boundaries mix fixed versions across products.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Use source-specific structured templates before generic chunking.

### Next Dependent Work

A07, A14, P17

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20, ADR23

## A07 — Benchmark Exact, Lexical and Multilingual Hybrid Retrieval

**Goal:** Choose retrieval based on judged source relevance and real hardware cost.

**Why This Matters:** Measure whether semantic retrieval improves the project’s real queries.

**Owner:** Hams

**Support:** Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: A06 (initial plan; no completion reported).

**Depends on:** A06

**Unlocks:** A08, A09, P11

**Parallel with:** D03, D04, D05, D08

**Critical path:** No

**First action:** Implement exact CVE/alias lookup before search.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Benchmark Exact, Lexical and Multilingual Hybrid Retrieval. **When:** At the input/fixture review and again before A07 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a07-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Evaluate organization context and evidence visibility, not only semantic similarity.

- Does lexical-only search already answer exact IDs and product questions?
- Do E5-small or BGE-M3 improve Arabic, English and Arabizi queries?
- How do authorization filters affect recall, latency and candidate counts?

Sources: AI06, AI07, AI08, AI09

### Inputs

- A06 chunks
- 60 judged pilot queries

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Implement exact CVE/alias lookup before search.
3. Build PostgreSQL lexical baseline preserving technical tokens.
4. Benchmark E5-small with correct prefixes and BGE-M3 on same queries.
5. Fuse lexical/dense rankings with documented settings.
6. Measure Recall@5/10, MRR, language slices, RAM and query latency.
7. Use exact vector scan initially; add approximate index only after profiling.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar review the handoff before declaring completion.

### Technical Approach

Needs Validation: Exact IDs plus PostgreSQL text search, with pgvector dense retrieval only if measured useful. E5-small and BGE-M3 are candidates; use documented prefixes and model revisions.

### Expected Deliverables

- `experiments/ai/evaluate_retrieval.py`
- `datasets/retrieval/query-bank.jsonl`
- `reports/ai/retrieval-results.csv`
- `docs/adr/retrieval-choice.md`
- `tests/ai/test_scope_filters.py`

### Testing

1. Run exact/lexical/dense/hybrid variants on the same reviewed queries
2. Measure Recall@5/10 and ranking metrics with scope filters applied
3. Record RAM and latency on the actual available machine
4. Benchmark exact IDs, product/train questions, policy questions and cross-organization forbidden queries separately; report recall@k, citation support, unauthorized exposure count and latency.

### Acceptance Criteria

- English/Arabic/Arabizi evaluated separately.
- Known exact IDs remain retrievable.
- Access filters apply to every retrieval path.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- The chosen retrieval configuration passes the frozen relevance/ACL rubric; negative findings and missing evidence are retained.

### Risks / Failure Modes

- Embedding similarity misses precise identifiers or confuses version strings.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Return exact/lexical results and citation cards when dense search fails.

### Next Dependent Work

A08, A09, P11

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## A08 — Test Reranking Against Measured Retrieval Errors

**Goal:** Add a reranker only if evidence shows initial candidate ordering is the bottleneck.

**Why This Matters:** Prevent a costly component without measured benefit.

**Owner:** Hams

**Support:** Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Conditional experiment

**Gate:** G3

**Start condition:** Blocked by: A07 (initial plan; no completion reported).

**Depends on:** A07

**Unlocks:** Final handoff

**Parallel with:** D03, D04, D05, D06

**Critical path:** No

**First action:** Identify cases with relevant passage in top 20 but not top 5.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Test Reranking Against Measured Retrieval Errors. **When:** At the input/fixture review and again before A08 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a08-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Are missed answers caused by candidate absence or poor ranking?
- Which small cross-encoder can run within the measured resource budget?
- Does reranking help after product/version/scope filters, and at what latency cost?

Sources: AI11

### Inputs

- A07 ranked candidates and errors

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Identify cases with relevant passage in top 20 but not top 5.
3. Choose a documented compatible cross-encoder checkpoint and review its license.
4. Rerank bounded candidates and log latency.
5. Compare unchanged judged questions and permission filters.
6. Adopt only if quality gain meets agreed latency/resource budget.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar review the handoff before declaring completion.

### Technical Approach

Needs Validation: Experimental Decision, optional G3 enhancement. Do not add a new inference dependency unless its measured gain exceeds the added cost.

### Expected Deliverables

- `experiments/ai/compare_rerankers.py`
- `reports/ai/reranking-ablation.csv`
- `docs/adr/reranking-gate.md`
- `tests/ai/test_reranker_fallback.py`

### Testing

1. Compare with/without reranking on the same candidate sets
2. Measure answer-support gain and p95 latency
3. Make the reranker unavailable and preserve the baseline retrieval path

### Acceptance Criteria

- No checkpoint adopted without license/revision record.
- Ablation reports quality and added latency.
- No reranker is needed to complete first-term core.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Extra inference causes timeouts with little gain.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Keep hybrid ranking without reranker.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## A09 — Benchmark Candidate LLMs on Project Questions and Available Hardware

**Goal:** Select a serving candidate only after domain correctness and actual resource use are measured.

**Why This Matters:** Select the generator from evidence on actual laptops.

**Owner:** Hams

**Support:** Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: A07 (initial plan; no completion reported).

**Depends on:** A07

**Unlocks:** A10, P11, P17

**Parallel with:** D03, D04, D05, D08

**Critical path:** No

**First action:** Inventory CPU/RAM/GPU/free disk and supported runtimes.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Benchmark Candidate LLMs on Project Questions and Available Hardware. **When:** At the input/fixture review and again before A09 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a09-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Local inference feasibility becomes an early on-prem enabling experiment; hosted tuning is separate from retrieval freshness.

- Can the exact model revision, runtime and quantization support the required chat/tool schema?
- How do Qwen candidates compare with Gemma under their respective terms?
- What context size, response limit, RAM, latency and privacy/cost constraints are acceptable?
- What local model/context/concurrency fits the actual measured machine, and what capability is lost under CPU-only operation?
- What downloads, cloud features and telemetry remain after local runtime startup?

Sources: AI13, AI14, AI15, AI16, MR01, MR11

### Inputs

- Hardware inventory
- A07 evidence retrieval
- Reviewed question fixtures

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Inventory CPU/RAM/GPU/free disk and supported runtimes.
3. Compare Qwen3.5-4B and Qwen3-4B-Instruct-2507; consider Gemma3-4B after its terms review.
4. Pin model/runtime/quantization; use bounded context and response length.
5. Measure memory, cold start, latency, Arabic clarity and cited factual accuracy.
6. Record dependency/license constraints and choose a champion only if it clears gates.
7. Compare retained local candidates on the same frozen domain questions and record exact model/quantization/runtime versions, RAM/VRAM, context, throughput and critical errors.
8. Test Ollama as a local serving candidate with cloud features disabled where configured; verify outbound behavior instead of equating localhost with fully offline.
9. Keep any hosted comparator opt-in with approved redacted inputs and rights/retention review. API does not mean cloud-only, and some hosted models support tuning; no fine-tuning is required to ingest new CVEs.
10. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar review the handoff before declaring completion.

### Technical Approach

Needs Validation: Needs Validation: researched Qwen3.5-4B/Qwen3 Instruct/Gemma3 shortlist. Local serving and exact runtime remain experimental; hosted services need a separate budget/privacy gate.

### Expected Deliverables

- `experiments/ai/benchmark_llms.py`
- `datasets/assistant/pilot-questions.jsonl`
- `reports/ai/llm-benchmark.csv`
- `docs/adr/llm-serving-choice.md`
- `models/serving-manifest.json`

### Testing

1. Run the same 60 reviewed pilot questions across candidates and a template baseline
2. Record quantization/runtime/model revisions and peak resources
3. Include unsupported-answer and abstention cases, not just fluent answers
4. Disconnect public egress after provisioning and run the frozen local inference and embedding questions.

### Acceptance Criteria

- Same prompts/evidence used across candidates.
- No claim based solely on publisher benchmark.
- Deterministic fallback functions with model unavailable.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- The qualified local profile states measured minimum resources and includes a no-generation degraded path; hardware availability is not assumed.

### Risks / Failure Modes

- Unknown hardware cannot sustain even a small model.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Evidence cards and templates; hosted comparator only after current pricing/privacy review and budget decision.

### Next Dependent Work

A10, P11, P17

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20, ADR22, ADR23

## A10 — Integrate the Assistant With Typed Read-Only Tools and Citations

**Goal:** Connect Hams's retrieval/answer behavior to Omar's single P11 authorization gateway.

**Why This Matters:** Make the assistant useful without granting authority to text generation.

**Owner:** Omar

**Support:** Mahrous, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: A09, P11 (initial plan; no completion reported).

**Depends on:** A09, P11

**Unlocks:** A11, A12, A13, A14

**Parallel with:** D04, D13, D14, D15

**Critical path:** No

**First action:** Implement jointly with P11 as one gateway component: Hams owns prompt/retrieval behavior; Omar owns authorization and API integration.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Integrate the Assistant With Typed Read-Only Tools and Citations. **When:** At the input/fixture review and again before A10 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a10-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Integrate the Assistant With Typed Read-Only Tools and Citations. **When:** At the input/fixture review and again before A10 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a10-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Bounded agentic workflow is an execution contract, not a mandatory framework change.

- Which allowed intents map to get_asset_summary, explain_applicability and advisory retrieval?
- Which output fields carry citations, uncertainty and evidence revisions?
- What tool-call and token/time limits prevent uncontrolled execution?

Sources: AI17, AI12, MR09

### Inputs

- API schemas
- A09 model adapter
- Role/scope rules

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Implement jointly with P11 as one gateway component: Hams owns prompt/retrieval behavior; Omar owns authorization and API integration.
3. Implement typed tools for asset/finding/source/applicability/remediation comparison.
4. Authorize every object access server-side before retrieval and tool execution.
5. Provide evidence revisions and freshness to the model.
6. Validate output schema, identifiers and cited source IDs.
7. Limit tool steps/time/tokens and log redacted trace metadata.
8. Return abstention/evidence fallback when required facts are absent.
9. Use a bounded typed workflow: authorize and resolve question scope; read current structured facts; retrieve allowed documents; draft; validate citations/claims; return answer or abstention.
10. Keep deterministic applicability, ranking and approval outside the LLM. Apply tool allowlists, step/time limits and audit evidence; do not permit model-generated shell or direct execution.
11. Start with explicit application state and the retained durable job boundary. Add LangGraph only if a measured resumable workflow need justifies its persistence, dependency and security cost.
12. Run the package testing checklist below, save the observed results with input/revision IDs, and have Hams, Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: One shared A10/P11 gateway: Hams owns behavior/retrieval, Omar owns API and authorization. Read-only tools; drafting is separate from approval or execution.

### Expected Deliverables

- `backend/app/ai_gateway/assistant.py`
- `contracts/v1/assistant-answer.schema.json`
- `fixtures/assistant/tool-dialogues.jsonl`
- `tests/integration/test_assistant_tools.py`
- `docs/ai/tool-catalog.md`

### Testing

1. Ask about an authorized asset and trace facts to tool results
2. Ask about an unauthorized asset and verify denial before retrieval
3. Make the model unavailable and return a cited structured fallback

### Acceptance Criteria

- Guest cannot retrieve analyst-only data through chat.
- No arbitrary SQL/shell/browser tool exists.
- Timeout returns a useful evidence response.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- The assistant exposes its cited evidence, uncertainty and context version and cannot mutate approval or runner state.

### Risks / Failure Modes

- Schema-valid text can still contain false claims.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Render verified structured facts and flag unsupported prose for review.

### Next Dependent Work

A11, A12, A13, A14

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20, ADR23

## A11 — Generate Targeted Evidence Requests & Compare Constrained Fix Options

**Goal:** Research and evaluate RAG-first vendor-backed remediation recommendations, evidence requests and constrained fix alternatives.

**Why This Matters:** Create a testable distinctive user workflow.

**Owner:** Hams

**Support:** Amr, Mahrous, Shams, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: A10, D14, C10 (initial plan; no completion reported).

**Depends on:** A10, D14, C10

**Unlocks:** A12

**Parallel with:** D04, D13, D15, D16

**Critical path:** No

**First action:** Map uncertain matches to exact missing inventory fields.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Provide D14 source-backed fixes/mitigations and validate every factual guidance claim. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a11-amr.md — Provide D14 source-backed fixes/mitigations and validate every factual guidance claim.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Mahrous**: Validate applicability, compatibility/policy limits, verification and security usefulness. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a11-mahrous.md — Validate applicability, compatibility/policy limits, verification and security usefulness.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Shams**: Prepare representative lab/vendor inputs and check prerequisite/verification practicality without executing unapproved actions. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a11-shams.md — Prepare representative lab/vendor inputs and check prerequisite/verification practicality without executing unapproved actions.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Omar**: Implement typed recommendation envelopes, citations, refusal states and approved-plan handoff using P11/P12. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a11-omar.md — Implement typed recommendation envelopes, citations, refusal states and approved-plan handoff using P11/P12.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- Assistant value is cited decisions and targeted missing evidence; recurrence is not automatic blame.
- 29 October: explicit cross-functional AI prioritization/remediation handoff; existing domain ownership retained.

- Which missing fields would change a specific unknown verdict?
- Which documented patch, upgrade or mitigation options satisfy the selected maintenance constraints?
- How will unsupported prerequisites and residual risk be stated?
- Does RAG improve supported actionability over deterministic cards?
- How reliably can source spans support each instruction, mitigation and verification claim?

Sources: AI05, AI17

### Inputs

- Applicability reasons
- Patch catalog
- Maintenance/compatibility policy

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Map uncertain matches to exact missing inventory fields.
3. Generate targeted safe evidence requests from approved templates.
4. Get compatible remediation candidates from deterministic policy code.
5. Explain fix/mitigation/defer/replace options with cited constraints.
6. Bind displayed plan to asset and advisory revision.
7. Expose why approval or reverification is required after drift.
8. Explain the D12 grouped action ranking and request precisely missing organization fields; the assistant never invents exposure, criticality, fixed versions or maintenance permission.
9. For recurrence, present repeated observation, reopening after verified closure and possible root-cause hypotheses separately. Only attach confirmed cause after reviewer evidence; suggest a durable control change as a draft.
10. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Mahrous + Shams + Omar review the handoff before declaring completion.
11. Compare reviewed structured/template guidance with RAG plus constrained generation on the same D14/C09 cases. Retrieve only authorized evidence and eligible candidate IDs.
12. Return fixed version, supported upgrade path, prerequisites, vendor-backed instructions, mitigation alternatives, verification and references, each bound to evidence spans/revisions. Mark unavailable fields rather than completing them from model memory.
13. Versions, download links, commands and compatibility claims must match reviewed source/catalog entries; reject unsupported generated values and show abstention. A command absent from approved evidence/templates is not executable guidance.
14. Use real FortiOS advisory texts with clearly labelled organization scenarios; include wrong model, unsupported branch, indirect upgrade, stale advisory, missing commands and malicious document text. C10/P12 remains the only approval path; Ubuntu is the current controlled execution profile.

### Technical Approach

Existing Design Decision: Use deterministic assessment gaps and D14/C10 facts through bounded tools. The LLM phrases supported options; it does not invent a patch plan or decide applicability.

### Expected Deliverables

- `backend/app/ai_gateway/evidence_requests.py`
- `fixtures/assistant/missing-evidence.jsonl`
- `fixtures/assistant/remediation-comparisons.jsonl`
- `reports/ai/evidence-request-evaluation.md`
- `experiments/remediation/compare_guidance.py`
- `reports/remediation/grounding-and-usefulness.md`
- `datasets/remediation/claim-evidence-ledger.jsonl`

### Testing

1. Remove a required package/build field and verify the exact gap is requested
2. Compare no-patch, reboot-restricted and EOL cases with reviewed answers
3. Ensure invented fixed versions or approvals fail validation
4. Ask about a repeated finding without a recorded cause; verify the answer labels the cause unknown and cannot assert a people-related percentage.
5. Inject fictitious fixed versions, unsupported commands and contradictory upgrade paths; validators reject or abstain.
6. Two security reviewers grade factual support and practical usability separately; time matched analyst tasks.

### Acceptance Criteria

- No recommended version is invented.
- Missing-data advice identifies the next useful measurement.
- Patch execution remains outside LLM authority.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Recommendations preserve vendor constraints and identify missing prerequisites; a plausible narrative is not recorded as a confirmed cause.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Unsupported claims/total claims; exact fixed-version and path correctness; citation support rate; abstention coverage; unsafe instruction count; analyst task time and usefulness rubric

### Risks / Failure Modes

- LLM omits prerequisite/reboot or implies mitigation fixes vulnerability.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Use typed option cards with required caveat fields.

### Next Dependent Work

A12

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20, ADR24

## A12 — Test Prompt Injection, Permissions and Unsupported Assistant Actions

**Goal:** Prove the assistant cannot cross the underlying data or action boundary in the declared test suite.

**Why This Matters:** Security guarantees must come from enforceable code, not prompt promises.

**Owner:** Mahrous

**Support:** Hams, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: A10, A11, P04 (initial plan; no completion reported).

**Depends on:** A10, A11, P04

**Unlocks:** A13, P15

**Parallel with:** D04, D16, C04, C06

**Critical path:** No

**First action:** Create malicious advisory-text and multilingual instruction fixtures.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Test Prompt Injection, Permissions and Unsupported Assistant Actions. **When:** At the input/fixture review and again before A12 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a12-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Test Prompt Injection, Permissions and Unsupported Assistant Actions. **When:** At the input/fixture review and again before A12 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a12-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Trust boundaries include retrieved policies and deployment-mode restrictions.

- Which malicious instructions can enter through advisory text or tool outputs?
- Can Arabic/English requests obtain another role's asset data?
- How are fake citations, arbitrary commands and stale approvals detected?

Sources: AI17

### Inputs

- A10 assistant
- A11 remediation flows

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Create malicious advisory-text and multilingual instruction fixtures.
3. Test cross-role/object access and cache isolation.
4. Test invented CVEs/citations, stale metadata and unsupported commands.
5. Verify output escaping/link restrictions and secret redaction.
6. Log violations and patch the enforcing layer, then rerun the suite.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Hams, Omar review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Authorization and allowlisted tools are enforced by code; prompts and RAG are not security boundaries. No credentials enter the model context.

### Expected Deliverables

- `evaluation/assistant/adversarial-cases.jsonl`
- `tests/security/test_assistant_boundaries.py`
- `reports/ai/adversarial-results.md`
- `docs/ai/accepted-residual-risks.md`

### Testing

1. Inject instructions into a retrieved advisory and verify they remain data
2. Attempt cross-role asset reads and arbitrary execution
3. Use a schema-valid false citation and verify factual-support checks detect it
4. Inject instructions through vendor text, synthetic policy and tool output; verify ACLs, cited evidence and read-only authority remain enforced.
5. Simulate local model outage; verify the system uses disclosed deterministic output and never silently sends private evidence to a cloud fallback.

### Acceptance Criteria

- Zero unauthorized actions/data disclosures in defined test suite.
- Failure blocks privileged workflows.
- Report residual prompt-injection risk honestly.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Prompt defenses may fail despite good average results.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Disable agentic features and retain read-only evidence cards.

### Next Dependent Work

A13, P15

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## A13 — Freeze Human Evaluation Questions, Rubrics and Final Holdout

**Goal:** Create an independent protocol for judging correctness, citations, clarity and useful abstention.

**Why This Matters:** Prove utility and correctness separately.

**Owner:** Hams

**Support:** Amr, Mahrous, Shams, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: A04, A10, A12 (initial plan; no completion reported).

**Depends on:** A04, A10, A12

**Unlocks:** A15, A17

**Parallel with:** D04, D13, D15, D16

**Critical path:** No

**First action:** Freeze question/evidence versions and scoring rubric.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Independently review security relevance and vendor-guidance factual correctness. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a13-amr.md — Independently review security relevance and vendor-guidance factual correctness.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Mahrous**: Co-define policy/safety rubric and adjudicate disagreements with documented reasons. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a13-mahrous.md — Co-define policy/safety rubric and adjudicate disagreements with documented reasons.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Shams**: Freeze reproducible scenario inputs and identify unavailable/labelled synthetic evidence. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a13-shams.md — Freeze reproducible scenario inputs and identify unavailable/labelled synthetic evidence.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Omar**: Instrument comparable latency, runtime failures and user-task timings without logging sensitive content. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a13-omar.md — Instrument comparable latency, runtime failures and user-task timings without logging sensitive content.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- Keep proposal targets while reporting actual supported-profile results and limitations.
- 29 October: explicit cross-functional AI prioritization/remediation handoff; existing domain ownership retained.

- Which question categories cover the declared user tasks and failure cases?
- How will two reviewers judge support and resolve disagreement?
- How will actionability be measured separately from technical correctness?
- What constitutes useful ranking gain without worsening security constraints?
- How many independent representative scenarios can reviewers support, and what uncertainty must be disclosed?

Sources: AI02, AI03, AI17

### Inputs

- Locked classifier test
- 60 then 120–200 reviewed query target
- A12 cases

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Freeze question/evidence versions and scoring rubric.
3. Have two reviewers score support, correctness, uncertainty and actionable clarity.
4. Adjudicate disagreements and record agreement.
5. Report classification F1 and coverage, retrieval metrics, critical errors and user task time separately.
6. Test the proposal’s 90% actionable target without treating it as factual accuracy.
7. Publish failures and confidence intervals where suitable.
8. Freeze separate rubrics for factual support, actionability, uncertainty, ranking explanation and UX task completion; use reviewers independent of label authors where possible.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Mahrous + Shams + Omar review the handoff before declaring completion.
10. Freeze a ranking relevance/pairwise rubric with Amr and Mahrous; keep rubric authorship, independent scoring and adjudication visible.
11. Predeclare safety gates, success margins, latency/cost budget and paired analyst-time protocol before looking at holdout results. Version AI prompts/runtime/seeds or sampling settings; repeat runs to measure ranking drift and reviewer agreement.

### Technical Approach

Existing Design Decision: Human-reviewed source-grounded questions, with LLM judging only as optional assistance. Pilot sample sizes are planning targets, not evidence of statistical sufficiency.

### Expected Deliverables

- `evaluation/assistant/protocol.md`
- `evaluation/assistant/questions-frozen.jsonl`
- `evaluation/assistant/rubric.csv`
- `reports/ai/reviewer-agreement.md`
- `experiments/ai/score_human_results.py`
- `evaluation/prioritization/protocol.md`
- `evaluation/remediation/claim-rubric.md`

### Testing

1. Double-score a pilot subset and inspect disagreement
2. Keep final test questions locked after model decisions
3. Recalculate actionability, support and critical-error counts from raw reviewer scores
4. Check case-family/time separation and blind method labels during review where practical.

### Acceptance Criteria

- No LLM-only ground truth.
- Denominators and class/language slices shown.
- Sample-size and convenience-user limitations explicit.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Scores identify denominators, reviewer agreement and critical errors; no universal 90% claim is inferred from a small lab.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: nDCG@10 and precision@10 with graded reference rubric; pairwise agreement; top-k overlap across repeats; constraint violations; timed paired differences and uncertainty

### Risks / Failure Modes

- Friendly wording hides wrong remediation.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Require source-supported factual review before usability scoring.

### Next Dependent Work

A15, A17

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## A14 — Invalidate AI Caches on Evidence Changes & Track Model Operations

**Goal:** Keep assistant answers tied to current authorized evidence and reproducible model settings.

**Why This Matters:** The assistant must stay correct when records and access permissions change.

**Owner:** Omar

**Support:** Amr, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: A06, A10, D13 (initial plan; no completion reported).

**Depends on:** A06, A10, D13

**Unlocks:** A15

**Parallel with:** D04, D14, D15, D16

**Critical path:** No

**First action:** Reuse D13 events and P09 health endpoints; add AI-specific cache/model metadata, not another scheduler.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Invalidate AI Caches on Evidence Changes & Track Model Operations. **When:** At the input/fixture review and again before A14 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a14-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Invalidate AI Caches on Evidence Changes & Track Model Operations. **When:** At the input/fixture review and again before A14 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a14-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Local deployment extends existing operations boundaries instead of adding another AI control plane.

- Which evidence, prompt, model and user-scope fields belong in cache keys?
- Which D13 events invalidate impacted chunks or answers?
- What redacted telemetry can reveal stale answers, cost and latency?

Sources: AI07, AI08, AI17

### Inputs

- Revision events
- A10 tools
- Chosen model manifest

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Reuse D13 events and P09 health endpoints; add AI-specific cache/model metadata, not another scheduler.
3. Include user scope and source/asset versions in cache keys.
4. Invalidate affected chunks/answers on revision/rejection.
5. Track ingestion-to-retrieval lag and stale-source warnings.
6. Log model/prompt/retriever revisions, latency and abstentions.
7. Require reviewed labels before feedback enters retraining.
8. Exercise model unavailable and index rebuild recovery.
9. Version cache keys with organization/object permissions, source/policy revisions, model, prompt and embedding versions. Disable outbound cloud fallbacks and traces under the local-only capability profile.
10. Reuse D13 invalidation and P09 health; do not build a second scheduler. Record offline feed age and rejected update reasons.
11. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Hams review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Reuse D13 change events and P09 health, adding AI-specific cache/model metadata. No duplicate scheduler and no automatic self-training from votes.

### Expected Deliverables

- `backend/app/ai_gateway/cache_policy.py`
- `backend/app/ai_gateway/telemetry.py`
- `tests/ai/test_cache_invalidation.py`
- `docs/runbooks/ai-operations.md`
- `reports/ai/staleness-rehearsal.md`

### Testing

1. Change an advisory revision and prevent reuse of its old answer
2. Ask the same question under two scopes and prevent cache leakage
3. Restart model serving and preserve the deterministic application path

### Acceptance Criteria

- Obsolete evidence is not served as current.
- Role change cannot reuse privileged cached answer.
- Freshness goal measured independently of generation.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Re-embedding migration mixes incompatible vector spaces.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Version indexes and switch only after validation; lexical fallback.

### Next Dependent Work

A15

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## A15 — Run Contribution Ablations & Compare Competitor Capabilities Fairly

**Goal:** Consolidate A17 ranking evidence and remediation experiments into a fair, reproducible contribution assessment.

**Why This Matters:** Support a defensible graduation research claim.

**Owner:** Hams

**Support:** Amr, Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G3

**Start condition:** Blocked by: A13, A14, A17 (initial plan; no completion reported).

**Depends on:** A13, A14, A17

**Unlocks:** A16

**Parallel with:** D04, D06, D07, D10

**Critical path:** No

**First action:** Compare lexical/dense/hybrid and optional reranking fairly.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source fidelity and security interpretation of gains. Reproduce datasets and origin-stratified results. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a15-amr.md — Review source fidelity and security interpretation of gains.; reviews/a15-amr.md — Reproduce datasets and origin-stratified results.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Mahrous**: Challenge policy violations and unsupported novelty/security claims. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a15-mahrous.md — Challenge policy violations and unsupported novelty/security claims.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Omar**: Verify integrated latency and fallback reflect benchmark conditions. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a15-omar.md — Verify integrated latency and fallback reflect benchmark conditions.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- Novelty becomes a testable decision-workflow hypothesis, not a generic chatbot claim.
- 29 October: explicit cross-functional AI prioritization/remediation handoff; existing domain ownership retained.

- Do change-aware explanations reduce time-to-correct-decision versus the frozen baseline?
- Do targeted gap requests outperform generic missing-data messages?
- Which competitor claims are documented versus untested or inaccessible?
- Which measured gain survives context removal, failure cases and resource limits?

Sources: AI12, AI18

### Inputs

- A13 dataset
- Current official competitor matrix

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Compare lexical/dense/hybrid and optional reranking fairly.
3. Compare revision-aware vs static retrieval on changed advisories.
4. Compare targeted vs generic evidence requests on task resolution time.
5. Compare constrained option cards with unconstrained baseline offline only.
6. Document Tenable current agent/approval features and avoid unsupported absence claims.
7. Write contribution, limitations and reproducibility section.
8. Compare CVSS-only ordering, explained policy ordering and grouped-action ordering on the same reviewed scenarios. Report precision@10 or nDCG@10 only with a justified relevance rubric, alongside unsafe recommendations, duplicate workload and analyst task time.
9. Run ablations without organization context, targeted missing evidence and recurrence history. Do not claim superiority to Tenable from an unlicensed/incomparable product trial.
10. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Mahrous + Omar review the handoff before declaring completion.
11. Reuse A17 results rather than building a second AI ranker. Combine A11 grounding results and A13 protocol; compare policy-only, AI and hybrid under identical scenarios.

### Technical Approach

Existing Design Decision: Evaluate narrow hypotheses: revision-aware decisions, targeted evidence requests and constrained remediation. Tenable already documents agents/approvals/workflows; no blanket superiority claim.

### Expected Deliverables

- `experiments/ai/contribution_ablations.py`
- `reports/ai/ablation-results.csv`
- `research/competitor-capability-matrix.md`
- `reports/ai/contribution-analysis.md`
- `reports/ai/cross-functional-contribution-decision.md`

### Testing

1. Run controlled variants on the same inventory and knowledge snapshot
2. Report correctness, effort/time and resource tradeoffs
3. Review each competitor claim against its dated source or mark it unverified
4. Reproduce A17/A11 reported methods from frozen manifests.

### Acceptance Criteria

- Same inputs and evaluation conditions across arms.
- Novelty described as hypothesis until tested.
- No commercial superiority claim without equivalent authorized evaluation.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Top-ten results use the same units, corpus, policy and judgments across baselines; unmeasured gains are labelled hypotheses.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: A17 ranking measures plus A11 hallucination/grounding and paired task-time results

### Risks / Failure Modes

- Adding more features is mistaken for scientific novelty.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Focus one measurable evidence-to-decision hypothesis.

### Next Dependent Work

A16

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20, ADR24

## A16 — Package Reproducible AI Experiments and a Faculty Demo

**Goal:** Make the final AI results reproducible from pinned data, code and model artifacts.

**Why This Matters:** A project with a reproducible method survives beyond the presentation.

**Owner:** Hams

**Support:** Amr, Omar, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G4

**Start condition:** Blocked by: A15 (initial plan; no completion reported).

**Depends on:** A15

**Unlocks:** Final handoff

**Parallel with:** D04, D06, D07, D10

**Critical path:** No

**First action:** Bundle pinned environment, manifests and non-sensitive fixtures.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Shams**: Explain the provenance and data lineage of the preserved asset/research inputs during the faculty demo or labelled replay, as already named in the A16 fallback. Coordinate with Hams; Amr retains source-authority and rights review. **When:** At final reproduction/demo rehearsal after A15 results and the A16 handover artifacts are available. **Deliver:** `reviews/a16-shams.md — Data-lineage walkthrough and observed/synthetic/missing-evidence review`. **Review:** Hams records the review disposition. Trace one demo example to its source/observation revision, identify synthetic or missing data, and distinguish a labelled replay from a live result.

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Package Reproducible AI Experiments and a Faculty Demo. **When:** At the input/fixture review and again before A16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a16-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Package Reproducible AI Experiments and a Faculty Demo. **When:** At the input/fixture review and again before A16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a16-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which licenses and hashes must accompany the selected model and dataset?
- Can a teammate reproduce the metrics without private credentials?
- Which limitations and failed experiments must appear in the final report?

Sources: AI03, AI17

### Inputs

- A15 results
- A14 runbook
- Model/data manifests

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Bundle pinned environment, manifests and non-sensitive fixtures.
3. Document retraining/reindexing steps and license notices.
4. Record known failure cases and supported languages/tasks.
5. Prepare live and clearly labelled offline replay demos.
6. Hand off maintenance owner, regression checks and update checklist.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Omar + Shams review the handoff before declaring completion.

### Technical Approach

Needs Validation: Versioned experiment manifests, source attribution, deterministic seeds where applicable and honest limits. No unvalidated candidate is presented as the final chosen model.

### Expected Deliverables

- `docs/runbooks/ai-reproduce.md`
- `reports/ai/final-model-card.md`
- `experiments/ai/reproduce_results.py`
- `reports/ai/artifact-manifest.json`
- `docs/ai/faculty-demo.md`

### Testing

1. Run the reproduction instructions from a clean environment
2. Compare regenerated metrics with the frozen report
3. Demonstrate model-unavailable and missing-evidence behavior alongside a successful answer

### Acceptance Criteria

- Fresh setup reproduces baseline metrics within documented tolerance.
- Offline replay never presented as live intelligence.
- Another teammate can explain and run the pipeline.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Only one member understands model internals.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Omar runs integration rehearsal and Shams explains data lineage.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## P01 — Validate Team Skills and Hardware & Prove the Backend Candidate

**Goal:** Choose the framework through a small working endpoint and migration rather than assumed familiarity.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Can start now (initial plan; no completion reported).

**Depends on:** None

**Unlocks:** P02

**Parallel with:** D01, D02, C01, C02

**Critical path:** Yes

**First action:** List Omar’s proven frameworks and identify gaps

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Validate Team Skills and Hardware & Prove the Backend Candidate. **When:** At the input/fixture review and again before P01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p01-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Deployment location and inference provider are independent; actual capacity/cost remains a validation gate.
- Hosting feasibility and operational ownership are explicit early P01 outputs; provider, capacity and cost are still Needs Validation.

- Which backend/frontend frameworks can Omar actually build and maintain today?
- What CPU/RAM/disk/virtualization and weekly capacity are available?
- Can the leading framework produce a validated endpoint and migration within the time-boxed spike?
- Which team-owned machine supports the local core and AI profile, and which services must be separated or reduced?
- Can a team-owned host start the proposed local inference/embedding runtime without assuming a GPU, before the full A09 evaluation?
- Which measured team host, single cloud VM or managed platform can run the required API, durable worker, storage and model profile within the actual budget?
- Who administers the demo host, domain/private DNS, certificates, backups and monthly spending limit?

Sources: SRC-P01, SRC-P02, SRC-P03

### Inputs

- Existing proposal
- Actual laptop specifications

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. List Omar’s proven frameworks and identify gaps
3. Record RAM, CPU, disk, virtualization and available hours
4. Build one validated endpoint and database migration in the leading framework
5. Compare effort with the strongest team-known alternative and record an ADR
6. Measure available CPU, RAM, disk, GPU/VRAM and runner network reachability; compare local/customer-hosted and cloud-hosted costs using actual capacity and budget evidence.
7. Choose first deployment hardware only after measurement; on-prem may be a team-owned lab host and does not imply buying enterprise infrastructure now.
8. With Hams, run an early local-runtime startup/memory smoke check before committing deployment resources; A09 later owns the fair domain-quality comparison after retrieval fixtures are ready.
9. Write a hosting comparison and placement/cost sheet for the measured lab host, one realistic VM and a managed platform candidate. Record persistent storage, worker/queue support, local-model needs, runner reachability, egress, rights and operator effort; select no paid service or new infrastructure without the relevant project authorization.
10. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.

### Technical Approach

Needs Validation: FastAPI conditional default with Django/NestJS alternatives already researched. Needs Validation against skills and authentication integration; preserve contracts if the framework changes.

### Expected Deliverables

- `research/platform-skills-and-hardware.md`
- `experiments/platform/backend_spike.py`
- `docs/adr/backend-framework.md`
- `reports/platform/spike-results.md`
- `research/hosting-options-and-capacity.md`
- `deploy/hosting-ownership-and-costs.csv`

### Testing

1. Have a teammate run the endpoint and migration
2. Measure actual setup time and peak resources
3. Compare the leading candidate with the strongest team-known fallback

### Acceptance Criteria

- Endpoint reproducible by another teammate
- Framework chosen on measured fit
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Framework learning consumes integration time
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Keep contracts and switch to proven framework

### Next Dependent Work

P02

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19, ADR22

## P02 — Publish Shared API Contracts and Validate Producer/Consumer Fixtures

**Goal:** Give collectors, intelligence, matching and AI one agreed data boundary before deep integration.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr, Shams, Mahrous, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Blocked by: P01, C03, D02 (initial plan; no completion reported).

**Depends on:** P01, C03, D02

**Unlocks:** P03, P05, UX02

**Parallel with:** C02, A01, A02, UX01

**Critical path:** Yes

**First action:** Agree stable asset identity and source revision identifiers

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Supply AdvisoryRevision and source-revision fixtures from D01/D02; review source authority, vendor semantics, rights, missing and conflicting assertions. Retain separate runner/patch-execution contract review for C11/C12/C14. **When:** At the input/fixture review and again before P02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p02-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Supply AssetObservation/inventory fixtures from the authorized collector; validate stable identity, OS/package fields, collected_at, stale/failed collection and missing evidence. Coordinate C03 definitions with Mahrous. **When:** At the input/fixture review and again before P02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p02-shams.md — Reproducible observation evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Publish Shared API Contracts and Validate Producer/Consumer Fixtures. **When:** At the input/fixture review and again before P02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p02-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Publish Shared API Contracts and Validate Producer/Consumer Fixtures. **When:** At the input/fixture review and again before P02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p02-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- One shared scope/context/handoff baseline prevents divergent AI and applicability work.

- Do C03 and D02 samples agree on IDs, timestamps, revisions and unknown states?
- Which error codes distinguish denied, stale, unsupported and unknown outcome?
- Which changes require a new contract version?
- Which OrganizationContext fields are verified facts, policy inputs or synthetic fixture assumptions?
- Which DeploymentCapabilities fields describe model location, data location, runner reachability and update mode independently?

Sources: SRC-P01

### Inputs

- Amr: D01/D02 advisory and source-revision samples
- Shams: asset/inventory observation samples and C03 asset field definitions; Mahrous reviews downstream matching requirements
- Amr retains runner/patch-execution fixture review; Hams reviews AI/UX, Mahrous assessment/policy, Omar owns P02

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Agree stable asset identity and source revision identifiers
3. Specify AssetObservation, AdvisoryRevision, Assessment, Job and PatchPlan schemas
4. Define unknown, unsupported, stale and rejected outcomes
5. Publish valid/invalid fixtures and API errors
6. Have each owner produce and consume one fixture
7. Publish the scope-versioned OrganizationContext, RankedRemediationAction, Assessment and AssistantAnswer contracts with fixture IDs and capability flags. Organization context includes owner, criticality, exposure, maintenance, policy revision and history references.
8. Freeze one handoff manifest used by Mahrous and Hams before any ClickUp ticket import; record changed fields and migrations rather than promising permanent zero migrations.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Shams + Mahrous + Hams review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: OpenAPI/JSON Schema with versioned fixtures. C03/D02 provide domain definitions; P02 integrates them rather than inventing competing schemas.

### Expected Deliverables

- `contracts/v1/openapi.yaml`
- `contracts/v1/job.schema.json`
- `contracts/v1/errors.schema.json`
- `fixtures/contracts/producer-consumer.jsonl`
- `tests/contracts/test_boundaries.py`
- `contracts/handoff-manifest.json`
- `contracts/organization-context.schema.json`
- `contracts/ranked-remediation-action.schema.json`
- `contracts/deployment-capabilities.schema.json`

### Testing

1. Validate each team's sample against the same contract
2. Reject an incompatible enum or missing revision
3. Have producers and consumers exchange fixtures without private assumptions
4. Run identical fixtures through API, rules, retrieval and prototype boundaries; reject incompatible scope/schema versions.

### Acceptance Criteria

- Every owner accepts one fixture
- Breaking changes have version policy
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- AI and platform reference the same scope version, schema version and fixture manifest; unresolved profile fields have named owners.

### Risks / Failure Modes

- Teams silently use different meanings for version/status
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Freeze minimal fields and evolve compatibly

### Next Dependent Work

P03, P05, UX02

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19, ADR22

## P03 — Implement the Relational Schema, Migrations and Revision Links

**Goal:** Persist assets, advisories and workflow state with recoverable migrations and enforced relationships.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr, Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: P02 (initial plan; no completion reported).

**Depends on:** P02

**Unlocks:** D03, D05, D11, P04, P06, P07, P09

**Parallel with:** C02, C04, C05, C06

**Critical path:** Yes

**First action:** Draw relations among assets, observations, advisories, assessments and revisions

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Implement the Relational Schema, Migrations and Revision Links. **When:** At the input/fixture review and again before P03 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p03-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Implement the Relational Schema, Migrations and Revision Links. **When:** At the input/fixture review and again before P03 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p03-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which entities need relational keys versus flexible JSONB?
- What uniqueness rules prevent duplicate source revisions and logical jobs?
- Which indexes support actual queries without premature vector or JSON indexing?

Sources: SRC-P07, SRC-P11, SRC-P25, SRC-P26

### Inputs

- Contracts and example evidence

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Draw relations among assets, observations, advisories, assessments and revisions
3. Add unique keys and immutable source-revision references
4. Add job attempts, approval hashes, audit and outbox tables
5. Create reviewed migrations and repeatable seed
6. Verify duplicate ingest and restore referential integrity
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: PostgreSQL relational core plus JSONB; SQLAlchemy/Alembic if FastAPI wins. ORM choice follows P01; retrieval is a separate derived concern.

### Expected Deliverables

- `backend/app/db/models.py`
- `migrations/versions/initial_schema.py`
- `docs/schema-erd.md`
- `tests/db/test_integrity.py`
- `scripts/db/seed_demo.py`

### Testing

1. Migrate an empty database and load the agreed fixtures
2. Reimport a revision and verify idempotent identity
3. Reject broken references and verify rollback leaves consistent data

### Acceptance Criteria

- No duplicate logical source revision
- Assessment traces exact input revisions
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- JSON blobs obscure identity and transitions
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Normalize critical fields and keep raw payload as evidence

### Next Dependent Work

D03, D05, D11, P04, P06, P07, P09

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P04 — Implement Login, Revocation and Object-Level Role Permissions

**Goal:** Enforce the four-role model on every API object and mutation.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: P03 (initial plan; no completion reported).

**Depends on:** P03

**Unlocks:** C10, A12, P06, P08, P11, P14

**Parallel with:** D03, D04, D05, D08

**Critical path:** Yes

**First action:** Select maintained session/auth component or OIDC provider

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Implement Login, Revocation and Object-Level Role Permissions. **When:** At the input/fixture review and again before P04 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p04-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which maintained auth/session component fits the chosen framework?
- How do session expiry, rotation, CSRF and logout work in the same-origin UI?
- Which separate permission grants patch approval or runner access?

Sources: SRC-P21, SRC-P22, SRC-P24

### Inputs

- Four-role permission matrix

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Select maintained session/auth component or OIDC provider
3. Implement secure cookie session lifecycle and CSRF protections
4. Apply object scopes to every read, export and mutation
5. Separate patch approval/execution permissions from role labels
6. Run positive and negative role matrix tests
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.

### Technical Approach

Needs Validation: Revocable cookie sessions with server-side scope checks, plus separate scoped runner credentials. Exact component Needs Validation; Keycloak/OIDC remains the researched fallback.

### Expected Deliverables

- `backend/app/identity/auth.py`
- `backend/app/identity/permissions.py`
- `config/role-action-matrix.yaml`
- `tests/security/test_authorization.py`
- `docs/authentication-design.md`

### Testing

1. Deny direct API access to an unauthorized asset despite UI visibility
2. Revoke a session and verify future requests fail
3. Test CSRF, privilege escalation and Auditor/Guest patch denial

### Acceptance Criteria

- Guest cannot retrieve private evidence
- Revoked sessions fail
- Analyst cannot self-promote
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- UI hides buttons but API still permits action
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Disable external pilot until server checks pass; use OIDC if auth gate fails

### Next Dependent Work

C10, A12, P06, P08, P11, P14

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P05 — Build the Dashboard Shell With Real API States and Accessible Navigation

**Goal:** Create a minimal usable asset workflow that handles loading, errors, stale and unknown evidence.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: P02, UX02 (initial plan; no completion reported).

**Depends on:** P02, UX02

**Unlocks:** P06, P09, UX03

**Parallel with:** D03, D04, D05, D08

**Critical path:** Yes

**First action:** Build asset list, detail and job status routes

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Build the Dashboard Shell With Real API States and Accessible Navigation. **When:** At the input/fixture review and again before P05 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p05-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Lead the UX design review against UX02; explain interactions and verify implemented uncertainty, evidence and approval states. Focus: Build the Dashboard Shell With Real API States and Accessible Navigation. **When:** At the input/fixture review and again before P05 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p05-hams.md — Design-fidelity review and prioritized usability corrections`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Hams leads UI/UX; Omar remains frontend implementation owner.

- Which screens are required for the first real slice?
- How should empty, unsupported and stale data differ visually?
- Can the selected frontend support keyboard navigation and required language layout?

Sources: SRC-P04, SRC-P05, SRC-P06

### Inputs

- OpenAPI fixtures and analyst flows
- UX02 reviewed design handoff (the fixture shell can be explored earlier)

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Build asset list, detail and job status routes
3. Implement loading, empty, failure, stale and unknown states
4. Use keyboard focus and responsive RTL layouts
5. Bind mock client to versioned contract
6. Replace one fixture path with real API
7. Implement UX02 reviewed flows and state specifications under Omar ownership; Hams reviews design fidelity and usability. Build the P02 shell/fixture harness while UX02 is being prepared, but do not sign off product flows before the design handoff.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Hams review the handoff before declaring completion.

### Technical Approach

Needs Validation: React/TypeScript/Vite candidate for the product dashboard, subject to P01. This planning website stays buildless; do not confuse its UI implementation with the product stack.

### Expected Deliverables

- `frontend/src/routes/assets.tsx`
- `frontend/src/components/EvidenceState.tsx`
- `frontend/src/api/client.ts`
- `frontend/src/fixtures/assets.json`
- `reports/ui-shell-review.md`

### Testing

1. Navigate the flow with keyboard only
2. Exercise loading, error, empty, stale and unknown fixtures
3. Replace the fixture endpoint with the agreed real endpoint without changing the data contract

### Acceptance Criteria

- Unknown not displayed as safe
- Keyboard navigable
- Real API swap uses same contract
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Polished disconnected screens consume time
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Keep only list/detail/job slice

### Next Dependent Work

P06, P09, UX03

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P06 — Connect One Real Asset From Ingestion to a Traceable Finding Screen

**Goal:** Prove one complete real evidence path before expanding screens or coverage.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Shams, Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: P03, P05, C08, P04 (initial plan; no completion reported).

**Depends on:** P03, P05, C08, P04

**Unlocks:** P10

**Parallel with:** D03, D04, D11, D15

**Critical path:** Yes

**First action:** Receive collector output through validation endpoint

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Connect One Real Asset From Ingestion to a Traceable Finding Screen. **When:** At the input/fixture review and again before P06 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p06-shams.md — Reproducible observation evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Connect One Real Asset From Ingestion to a Traceable Finding Screen. **When:** At the input/fixture review and again before P06 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p06-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which authorized observation and advisory are suitable for the first slice?
- How is the same assessment ID traced across API, DB and UI?
- Where must fixture and live results be labelled differently?

Sources: SRC-P01, SRC-P07

### Inputs

- One authorized real observation
- One validated advisory

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Receive collector output through validation endpoint
3. Persist observation and exact advisory revision
4. Invoke assessment interface with stable IDs
5. Render conclusion, uncertainty and evidence links
6. Record reproducible demo and clearly label any fixture
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Shams + Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Shared contracts and D09/C08 engine through the existing API. A mock-only interface is preparation, not proof of the real integration gate.

### Expected Deliverables

- `tests/integration/test_vertical_slice.py`
- `reports/first-slice/trace.json`
- `docs/runbooks/first-slice.md`
- `reports/first-slice/demo-notes.md`

### Testing

1. Ingest a real observation and display its matching decision
2. Open its exact raw-source and observation references
3. Repeat with missing evidence and show unknown without pretending it is live success

### Acceptance Criteria

- Displayed result traces exact evidence
- No mock represented as live
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Matching interface arrives late
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Use explicit temporary deterministic fixture assessment and show limitation

### Next Dependent Work

P10

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P07 — Build the Durable Job Ledger & Test Dispatch Recovery

**Goal:** Keep business job state safe across worker crashes, duplicate requests and lost callbacks.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: P03 (initial plan; no completion reported).

**Depends on:** P03

**Unlocks:** D13, P08, P09, P13, P14

**Parallel with:** D03, D04, D05, D08

**Critical path:** Yes

**First action:** Create job/attempt state machine with lease and heartbeat

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Supply or replay the authorized execution fixtures and identify real lab constraints. Focus: Build the Durable Job Ledger & Test Dispatch Recovery. **When:** At the input/fixture review and again before P07 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p07-amr.md — Reproducible observation/runner evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance. **When:** At the input/fixture review and again before P07 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p07-shams.md — Reproducible asset observation evidence`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Can Celery/RabbitMQ fit the actual laptop and learning budget?
- Which idempotency, lease, heartbeat and attempt fields are required?
- When must uncertain mutation stop for reconciliation instead of retry?

Sources: SRC-P12, SRC-P13, SRC-P14, SRC-P15, SRC-P16, SRC-P17, SRC-P18, SRC-P20

### Inputs

- Scan and source job contracts

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Create job/attempt state machine with lease and heartbeat
3. Add transactional outbox and dispatch only job IDs
4. Benchmark Celery/RabbitMQ against simpler durable serial worker
5. Implement deduplication, timeout and reconciliation states
6. Inject worker/broker crash and lost callback
7. Select transport only after resource and recovery gate
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Shams review the handoff before declaring completion.

### Technical Approach

Needs Validation: PostgreSQL ledger/outbox with conditional Celery/RabbitMQ broker spike. A bounded serial durable worker is the fallback; in-process request background tasks are not the reliability mechanism.

### Expected Deliverables

- `backend/app/jobs/ledger.py`
- `backend/app/jobs/outbox.py`
- `experiments/platform/job_recovery.py`
- `tests/jobs/test_crash_recovery.py`
- `docs/adr/job-transport.md`

### Testing

1. Kill a worker after claim and recover the logical job
2. Submit duplicate requests and preserve one job identity
3. Lose a mutation callback and verify reconcile rather than blind retry

### Acceptance Criteria

- No lost business job after restart
- Duplicate requests do not repeat mutation
- Unknown side effect reconciled
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Retry executes patch twice or broker exhausts laptop
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Durable PostgreSQL ledger plus bounded serial worker; no in-process request background task

### Next Dependent Work

D13, P08, P09, P13, P14

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P08 — Authenticate Runners and Enforce Typed, Scoped Execution Envelopes

**Goal:** Separate privileged collection/update authority from browser, API and model processes.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr, Mahrous, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: P04, P07, C01 (initial plan; no completion reported).

**Depends on:** P04, P07, C01

**Unlocks:** C11, P12, P15

**Parallel with:** D03, D04, D05, D08

**Critical path:** Yes

**First action:** Register runner identity and scoped credential

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Supply or replay the authorized execution fixtures and identify real lab constraints. Focus: Authenticate Runners and Enforce Typed, Scoped Execution Envelopes. **When:** At the input/fixture review and again before P08 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p08-amr.md — Reproducible observation/runner evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Authenticate Runners and Enforce Typed, Scoped Execution Envelopes. **When:** At the input/fixture review and again before P08 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p08-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance. **When:** At the input/fixture review and again before P08 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p08-shams.md — Reproducible asset observation evidence`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- How is runner enrollment authenticated and revoked?
- Which target, operation, expiry and plan fields are revalidated on both sides?
- Where do target secrets remain and how are references/redacted results handled?

Sources: SRC-P22, SRC-P23, SRC-P28

### Inputs

- Approved lab scope
- Typed collector/patch operations

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Register runner identity and scoped credential
3. Use authenticated job channel with typed allowlisted operations
4. Recheck target scope, asset fingerprint, approval hash and expiry
5. Validate bounded results and secret references
6. Reject arbitrary shell strings and out-of-scope targets
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Mahrous + Shams review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Authenticated typed job channel, allowlisted adapters and secret references. No Docker socket or arbitrary shell authority in the web API; exact enrollment transport is validated before use.

### Expected Deliverables

- `backend/app/jobs/runner_gateway.py`
- `runner/envelope_validator.py`
- `contracts/v1/runner-job.schema.json`
- `tests/security/test_runner_boundary.py`
- `docs/runner-trust-boundary.md`

### Testing

1. Reject expired runner identity and unknown adapter operations
2. Reject a target outside scope on API and runner sides
3. Verify arbitrary user/model command strings cannot reach shell execution

### Acceptance Criteria

- API cannot invoke arbitrary shell
- Expired runner credentials fail
- Scope enforced on API and runner
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Compromised API becomes privileged remote shell
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Disable mutation; retain read-only collector gateway

### Next Dependent Work

C11, P12, P15

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P09 — Expose Source Health, Freshness and Changed-Knowledge Views

**Goal:** Make stale or incomplete intelligence visible to operators and downstream UI.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: P03, P05, P07, D03 (initial plan; no completion reported).

**Depends on:** P03, P05, P07, D03

**Unlocks:** P10

**Parallel with:** D04, D05, D08, D09

**Critical path:** Yes

**First action:** Expose last successful fetch and source publication/revision times

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Expose Source Health, Freshness and Changed-Knowledge Views. **When:** At the input/fixture review and again before P09 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p09-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which source-health fields distinguish last attempt from last success?
- How are enrichment missingness and source outages displayed?
- Which endpoints need pagination and which roles may see operational detail?

Sources: SRC-P07, SRC-P34, SRC-P35

### Inputs

- Ingestion freshness/revision metadata

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Expose last successful fetch and source publication/revision times
3. Show missing fields, rejected records and source failures
4. Link changed advisory to affected assessment jobs
5. Add pagination and filters
6. Exercise source outage without advancing freshness marker
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: P03/P07 state plus D03 ingestion metadata; no second ingestion scheduler. D13 and A14 consume the same current source revision facts.

### Expected Deliverables

- `backend/app/intelligence/health_api.py`
- `frontend/src/routes/source-health.tsx`
- `tests/integration/test_source_health.py`
- `docs/source-health-fields.md`

### Testing

1. Fail a fetch and verify last_success does not advance
2. Display missing enrichment without hiding the CVE
3. Test role-scoped and paginated source-health responses

### Acceptance Criteria

- Failed fetch cannot appear fresh
- Source revisions inspectable
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Dashboard looks healthy while feeds stalled
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Show stale badge and cached-data timestamp

### Next Dependent Work

P10

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P10 — Build Finding Triage With Priority Reasons and Evidence History

**Goal:** Let an analyst review what changed, why it matters and what evidence supports it.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Hams, Mahrous, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: P06, P09, D12 (initial plan; no completion reported).

**Depends on:** P06, P09, D12

**Unlocks:** P11, P12, P13, P16

**Parallel with:** D04, D13, D14, D15

**Critical path:** Yes

**First action:** Render finding evidence and policy inputs

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Hams**: Supply A17/A11 schemas, qualified method report and uncertainty/evaluation requirements. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/p10-hams.md — Supply A17/A11 schemas, qualified method report and uncertainty/evaluation requirements.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Mahrous**: Validate applicability/policy and approval boundaries in the displayed flow. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/p10-mahrous.md — Validate applicability/policy and approval boundaries in the displayed flow.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Shams**: Provide reproducible input/failure fixtures for integration. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/p10-shams.md — Provide reproducible input/failure fixtures for integration.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- The platform displays decisions and safe next actions; it does not recompute ranking in the frontend.
- 29 October: explicit cross-functional AI prioritization/remediation handoff; existing domain ownership retained.

- Which assessment and priority fields are authoritative versus predicted?
- How are current/old observations and source revisions compared?
- Which finding transitions and exports require permission checks?
- How are unqualified candidate output, baseline fallback and vendor-grounded instruction provenance represented to users?

Sources: SRC-P22, SRC-P07

### Inputs

- Assessment and risk reason schema

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Render finding evidence and policy inputs
3. Validate workflow status transitions server-side
4. Show assessment revision comparison
5. Implement scoped exports
6. Expose unsupported and unknown counts separately
7. Render D12 RankedRemediationAction objects as the primary queue with expandable findings, evidence age, category, reason codes, missing context and blocked/no-patch state. Preserve filters for CVE and individual asset findings.
8. Show recurrence episodes and confirmed-versus-hypothesized causes with source links; keep optional L&D or game mechanics outside this release.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Hams + Mahrous + Shams review the handoff before declaring completion.
10. Coordinate the A17 ranking-result and A11 guidance contracts before implementation. Include method/policy/model version, candidate set, evidence timestamps, reason/evidence links, missing context, validation status and fallback reason.
11. Display rule baseline versus qualified AI/hybrid proposal explicitly; baseline remains available on timeout, invalid output or unqualified model. Analyst reviews recommendations and makes operational decisions rather than manually recreating the research. No model override of applicability/RBAC/approval.

### Technical Approach

Existing Design Decision: Consume D09/D12 outputs and history through server-side authorization. The UI does not recalculate version applicability or turn unknown into a clean result.

### Expected Deliverables

- `backend/app/assessment/findings_api.py`
- `frontend/src/routes/findings.tsx`
- `frontend/src/components/EvidenceTimeline.tsx`
- `tests/integration/test_triage.py`
- `reports/triage-review.md`
- `contracts/p10-ai-handoff.md`

### Testing

1. Display affected, not_affected, unknown and unsupported separately
2. Change a policy/source revision and show the reason for the new priority
3. Deny scoped exports for unauthorized users
4. Contract tests reject invented candidate IDs, unsupported versions/commands, cross-tenant facts and stale approvals; test no-model operation.

### Acceptance Criteria

- Priority change explained
- Export scopes equal UI/API scopes
- Unknown distinct from not affected
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Contract rejection rate; fallback correctness; end-to-end task time and source-link completeness

### Risks / Failure Modes

- Severity presented as proven exploitation probability
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Keep raw score, risk policy and confidence separate

### Next Dependent Work

P11, P12, P13, P16

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19, ADR24

## P11 — Expose One Permission-Scoped AI Gateway With Safe Fallbacks

**Goal:** Provide the authenticated API/UI boundary used by the shared A10 assistant.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Hams, Mahrous, Shams

**Conditional capability gates:** An external inference/embedding provider may be enabled only after D18 clears the declared data use and deployment policy.; Local-only mode must reject external inference, embeddings and trace destinations.

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: P04, P10, A07, A09 (initial plan; no completion reported).

**Depends on:** P04, P10, A07, A09

**Unlocks:** A10, P15, P16

**Parallel with:** D04, D13, D14, D15

**Critical path:** No

**First action:** Expose allowlisted read tools using caller scopes

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Hams**: Supply A17/A11 schemas, qualified method report and uncertainty/evaluation requirements. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/p11-hams.md — Supply A17/A11 schemas, qualified method report and uncertainty/evaluation requirements.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Mahrous**: Validate applicability/policy and approval boundaries in the displayed flow. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/p11-mahrous.md — Validate applicability/policy and approval boundaries in the displayed flow.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Shams**: Provide reproducible input/failure fixtures for integration. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/p11-shams.md — Provide reproducible input/failure fixtures for integration.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- Internal APIs remain part of on-prem; external inference is optional and explicitly governed.
- 29 October: explicit cross-functional AI prioritization/remediation handoff; existing domain ownership retained.

- How is current user scope applied before retrieval and every tool call?
- What timeout, usage and model-adapter limits are enforced?
- What answer contract carries source spans, revisions and uncertainty?
- How are unqualified candidate output, baseline fallback and vendor-grounded instruction provenance represented to users?

Sources: SRC-P22, SRC-P28, MR01, MR09

### Inputs

- Answer and retrieval/tool schemas

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Expose allowlisted read tools using caller scopes
3. Validate model outputs and preserve citations/revision IDs
4. Add timeout, token/cost and data-minimization policies
5. Render missing evidence and refusal cases
6. Test prompt injection and unauthorized asset retrieval
7. Provide structured-template fallback
8. Add an inference/embedding adapter boundary with configurable internal base URLs, explicit capability flags and timeout/error contracts. Local-only mode must reject external providers even if a request suggests them.
9. Route current organization facts through authorized structured tools and source/policy text through retrieval. Do not duplicate the A10 gateway or invent a second approval path.
10. Run the package testing checklist below, save the observed results with input/revision IDs, and have Hams + Mahrous + Shams review the handoff before declaring completion.
11. Coordinate the A17 ranking-result and A11 guidance contracts before implementation. Include method/policy/model version, candidate set, evidence timestamps, reason/evidence links, missing context, validation status and fallback reason.
12. Display rule baseline versus qualified AI/hybrid proposal explicitly; baseline remains available on timeout, invalid output or unqualified model. Analyst reviews recommendations and makes operational decisions rather than manually recreating the research. No model override of applicability/RBAC/approval.

### Technical Approach

Existing Design Decision: Single gateway shared with A10; Omar owns API/auth integration and Hams owns retrieval/answer behavior. Exact LLM choice follows A09 rather than being embedded in UI code.

### Expected Deliverables

- `backend/app/ai_gateway/api.py`
- `frontend/src/routes/assistant.tsx`
- `tests/integration/test_ai_gateway.py`
- `docs/ai-gateway-contract.md`
- `contracts/p11-ai-handoff.md`

### Testing

1. Deny unauthorized evidence before it reaches the model
2. Timeout the model and return a grounded structured alternative
3. Verify citations point to authorized source revisions
4. Contract tests reject invented candidate IDs, unsupported versions/commands, cross-tenant facts and stale approvals; test no-model operation.

### Acceptance Criteria

- No unauthorized context retrieval
- Answers show provenance or uncertainty
- Model outage does not stop basic workflow
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Contract rejection rate; fallback correctness; end-to-end task time and source-link completeness

### Risks / Failure Modes

- Assistant bypasses API scopes or sends secrets upstream
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Disable risky tool and use grounded structured template

### Next Dependent Work

A10, P15, P16

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19, ADR22, ADR23

## P12 — Implement Patch Campaign States, Approval Binding and Progress Views

**Goal:** Represent the C10 policy and runner results as one auditable campaign workflow.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr, Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: P08, P10, C10 (initial plan; no completion reported).

**Depends on:** P08, P10, C10

**Unlocks:** C11, P15, P16

**Parallel with:** D04, D13, D15, D16

**Critical path:** Yes

**First action:** Persist versioned plan and precheck results

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Supply or replay the authorized collection/execution fixtures and identify real lab constraints. Focus: Implement Patch Campaign States, Approval Binding and Progress Views. **When:** At the input/fixture review and again before P12 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p12-amr.md — Reproducible observation/runner evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Implement Patch Campaign States, Approval Binding and Progress Views. **When:** At the input/fixture review and again before P12 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p12-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which transitions are allowed before/after approval and mutation?
- How do hash changes, expiry, reboot pending and partial failure affect the UI?
- What pause/cancel actions are safe after execution has begun?

Sources: SRC-P14, SRC-P15, SRC-P22, SRC-P23

### Inputs

- Patch plan policy
- Runner adapter contract

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Persist versioned plan and precheck results
3. Bind approvals to plan hash and observation version
4. Schedule revalidated canary execution and pause conditions
5. Track attempts, reboot pending and unknown states
6. Require post-install evidence before closing finding
7. Present documented recovery options without universal rollback claim
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr; Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: C10 policy and P08 runner boundary, version-bound plans and durable attempts. Reuse native patch adapters; do not implement a second approval engine in the frontend.

### Expected Deliverables

- `backend/app/remediation/campaigns_api.py`
- `frontend/src/routes/campaigns.tsx`
- `tests/integration/test_campaign_states.py`
- `docs/campaign-state-machine.md`

### Testing

1. Change approved target evidence and invalidate dispatch
2. Render partial failure and outcome_unknown without whole-campaign success
3. Verify cancel does not claim to undo an already applied patch

### Acceptance Criteria

- Changed plan/target invalidates approval
- Install exit code alone cannot close finding
- Unknown is visible and reconciled
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Stale approval authorizes changed target
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Pause mutation and require renewed assessment/approval

### Next Dependent Work

C11, P15, P16

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P13 — Deliver Versioned SIEM Events Through a Retryable Outbox

**Goal:** Persist lifecycle events with business changes and deliver them to the C15 integration route.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: P07, P10 (initial plan; no completion reported).

**Depends on:** P07, P10

**Unlocks:** C15, P16

**Parallel with:** D04, D13, D14, D15

**Critical path:** Yes

**First action:** Create versioned event envelope and stable event ID

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Supply or replay the authorized collection/execution fixtures and identify real lab constraints. Focus: Deliver Versioned SIEM Events Through a Retryable Outbox. **When:** At the input/fixture review and again before P13 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p13-amr.md — Reproducible observation/runner evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which event schema and correlation IDs does the consumer need?
- How are delivery attempts, replay cursors and duplicate IDs retained?
- How does transport success differ from decoding/correlation proof?

Sources: SRC-P14, SRC-P34

### Inputs

- Supported SIEM input
- Event schema

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Create versioned event envelope and stable event ID
3. Write outbox with domain state transaction
4. Send through supported transport with retry/dedup
5. Validate decoder and correlation fields in actual SIEM
6. Record delivery and parsing status separately
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Transactional PostgreSQL outbox and supported JSON-lines Wazuh route. At-least-once delivery is explicit; duplicate delivery must not create duplicate business findings.

### Expected Deliverables

- `backend/app/integrations/siem_outbox.py`
- `contracts/v1/lifecycle-event.schema.json`
- `fixtures/siem/outbox-events.jsonl`
- `tests/integrations/test_outbox_replay.py`
- `docs/siem-delivery.md`

### Testing

1. Crash between business update and dispatch and retain the event
2. Replay one event with the same stable event_id
3. Trace a delivered event into the C15 decoded alert

### Acceptance Criteria

- Same event ID visible parsed in SIEM
- Retry does not create duplicate business finding
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- HTTP success mistaken for SIEM correlation
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Disclose local export fallback until integration verified

### Next Dependent Work

C15, P16

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P14 — Plan Hosting, Deploy the Minimal Stack & Prove Recovery

**Goal:** Turn the measured hosting choice into a reproducible connected deployment with private service boundaries, HTTPS, durable storage and tested recovery.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr

**Conditional capability gates:** Connected on-prem qualification does not imply disconnected operation; P17 must pass before that capability is advertised.

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: P04, P07 (initial plan; no completion reported).

**Depends on:** P04, P07

**Unlocks:** P16, P17

**Parallel with:** D03, D04, D05, D08

**Critical path:** No

**First action:** Start deployment/hosting-plan.md from the measured P01 host/cost comparison and draw the component placement and approved access boundaries.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Reproduce Omar’s connected deployment from the runbook, validate the approved runner-to-lab path and denied network paths, and independently restore database/evidence on a clean host. **When:** At the input/fixture review and again before P14 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p14-amr.md — Clean install/restore results and approved/denied connectivity evidence`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- On-prem is a staged required product capability, with enabling design now and separate qualification milestones.
- Expanded Omar’s hosting execution guide: placement/cost, DNS/TLS, private ports, persistent storage, release recovery, operations and explicit tests.

- Which services can share a host and which need separate profiles?
- Which TLS, private-port and secret configuration fits the intended lab or pilot?
- Can DB, evidence and configuration be restored consistently within measured targets?
- What hostname, public or private DNS and certificate issuer are appropriate for the qualified demo or customer-hosted profile?
- Where will TLS terminate, which proxy headers are trusted and how is certificate renewal tested?
- Which exact inbound, service-to-service and outbound connections are required; which services must have no public listener?
- How are database/evidence/model volumes, off-host backup, secrets and migration recovery handled?
- Who deploys, monitors, updates, restores and pays for each enabled environment?

Sources: SRC-P27, SRC-P28, SRC-P29, SRC-P30, SRC-P31, SRC-P32, SRC-P33, MR01, MR02, MR03, MR04, HT01, HT02

### Inputs

- Hardware measurements
- Private deployment requirements

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Use P01 measurements to write deployment/hosting-plan.md: selected location, host/OS/runtime, administrator, permitted users, capacity evidence, estimated recurring cost and limits. Keep exact provider, size and proxy choice Needs Validation until the comparison passes.
3. Document each component placement and connection: UI/TLS entry, API, worker/job ledger, PostgreSQL, evidence volumes, model/embedding endpoint and isolated runner. Separate the public HTTPS entry, private services and authorized target network; do not publish database, broker, model or runner listeners as internet endpoints.
4. Create a staging configuration with fixture data and a restricted demo/pilot configuration. Pin release/image versions and provide a configuration template with placeholder values only; provision runtime secrets separately.
5. Configure the selected hostname/DNS and TLS termination route after the environment gate. Compare the already-supported proxy approaches and pick one through a small test; public certificate automation and private/on-prem certificate trust have different validation and renewal requirements. Trust forwarded headers only from the configured proxy boundary.
6. Test inbound and outbound connectivity from approved and denied locations; document host firewall/container port mappings, allowed source updates and runner-to-target reachability. A cloud application does not automatically reach private customer devices.
7. Attach persistence and coordinated backup/restore jobs for database, evidence and required configuration/key recovery; keep protected backups on separate authorized storage and record measured recovery objectives. A recreated container or same-disk snapshot is not a complete recovery plan.
8. Write a release procedure: verify build/tests, take a recoverable backup, apply a compatible migration, deploy pinned artifacts, run smoke/health checks and stop or recover on failure. Do not assume that rolling an image back reverses a destructive database migration.
9. Define startup/readiness checks, restart behavior, disk/backup/certificate-age warnings, sanitized logs and responsible contacts. Have Amr reproduce a clean deployment and restore; document failed steps before the P14 handoff.
10. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Linux Compose profiles and private filesystem evidence adapter initially. Exact versions/TLS setup need validation; proposed RPO/RTO are test targets, not guarantees. No new legacy MinIO dependency. Hosting detail: retain the measured Linux/Compose deployment. Host/provider, domain, TLS proxy/issuer, sizes and availability targets are Needs Validation; this plan does not provision or purchase infrastructure.

### Expected Deliverables

- `deploy/compose.yaml`
- `deploy/profiles.md`
- `scripts/ops/backup.py`
- `scripts/ops/restore.py`
- `docs/runbooks/deploy-and-restore.md`
- `reports/restore-drill.md`
- `deployment/hosting-plan.md`
- `deployment/network-and-port-matrix.csv`
- `deploy/.env.example`
- `deployment/tls-and-dns-runbook.md`
- `deployment/release-and-recovery-runbook.md`
- `reports/hosting-qualification.md`

### Testing

1. Have a second member start the minimal profile from instructions
2. Restore DB and linked evidence to a clean environment
3. Inspect exposed ports, image secrets and measured RAM/disk usage
4. Boot the connected on-prem profile, rotate secrets, restart services and restore linked database/evidence on a second qualified lab host.
5. From an allowed client, test HTTPS login, API/RBAC and one queued read workflow; check the same requests fail for unauthorized users.
6. From a denied network/client, verify private database, broker/model and runner services cannot be reached; inspect the actual mappings rather than trusting the diagram.
7. Recreate a service and prove persistent data/evidence survive; restore the coordinated backup on a clean qualified host.
8. Rehearse certificate renewal/trust failure and a failed release or incompatible migration; record detection and recovery, without promising zero downtime.

### Acceptance Criteria

- Fresh teammate starts demo
- Restored evidence references resolve
- No secrets in source/bundle
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Connected on-prem install is reproducible and limitations are stated; this does not imply an enterprise production or fully disconnected qualification.
- The hosting plan names the environment, component locations, administrator, resource measurements, access rules and actual cost assumptions.
- Only the reviewed entry points are reachable; private service, role/object and runner boundaries pass negative checks.
- HTTPS/certificate trust and the documented renewal path work for the chosen environment.
- A second member reproduces deployment, a supported update/failure recovery and consistent restore; measured recovery results are recorded.

### Risks / Failure Modes

- Same-disk snapshot mistaken for recovery
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.
- A VM hosts the application but cannot reach private target devices; exposing a runner to solve reachability would cross the trust boundary.
- Container recreation loses unmounted evidence/model data, or image rollback is mistaken for database rollback.
- A free/demo host, persistent disk, model runtime or certificate dependency has an unmeasured operating cost or availability limit.

### Fallback

Copy encrypted backup to separate authorized storage and test restore

### Next Dependent Work

P16, P17

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19, ADR22

## P15 — Run Cross-Module Security and Failure-Mode Release Tests

**Goal:** Check the integrated trust boundaries and recovery behavior before any external pilot.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Mahrous, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: P08, P11, P12, A12, C13 (initial plan; no completion reported).

**Depends on:** P08, P11, P12, A12, C13

**Unlocks:** P16

**Parallel with:** D04, D13, D15, D16

**Critical path:** No

**First action:** Exercise object-level denied reads and mutations

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Run Cross-Module Security and Failure-Mode Release Tests. **When:** At the input/fixture review and again before P15 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p15-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Run Cross-Module Security and Failure-Mode Release Tests. **When:** At the input/fixture review and again before P15 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p15-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Release tests enforce the narrowed scope and deployment promises.

- Which versioned ASVS controls apply to the actual product scope?
- Can injection, stale approvals or cross-role access cross module boundaries?
- What failure cases block release and who accepts residual risks?

Sources: SRC-P21, SRC-P22, SRC-P23, SRC-P34

### Inputs

- Threat model
- Role matrix
- Failure scenarios

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Exercise object-level denied reads and mutations
3. Test malicious structured inputs and command strings
4. Inject duplicated jobs, stale approvals and lost callbacks
5. Test stale retrieval revisions and hostile source text
6. Record issue severity, owner and remediation evidence
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous; Hams review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Use existing module tests plus cross-boundary scenarios and selected ASVS/SSDF guidance. This is release evidence, not a claim of security certification or a complete penetration test.

### Expected Deliverables

- `tests/security/test_release_gates.py`
- `tests/integration/test_fault_scenarios.py`
- `reports/security/release-review.md`
- `docs/security/residual-risk-register.md`

### Testing

1. Run direct API role/object denial tests
2. Inject corrupt source text, duplicate jobs and stale plan hashes
3. Verify model failure and runner interruption do not bypass authorization or closure checks
4. Check local-only mode denies cloud inference/embedding/telemetry and approval rejects unsupported execution profiles.

### Acceptance Criteria

- No known critical auth or unsafe execution issue at gate
- Residual risks explicit
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Happy-path demo hides unsafe edge cases
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Keep risky capability disabled until gate passes

### Next Dependent Work

P16

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P16 — Measure Platform Performance & Package an Accessible Handover

**Goal:** Deliver a measured final release with reproducible setup, support limits and ownership handoff.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr, Mahrous, Hams, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G4

**Start condition:** Blocked by: P10, P11, P12, P13, P14, P15 (initial plan; no completion reported).

**Depends on:** P10, P11, P12, P13, P14, P15

**Unlocks:** Final handoff

**Parallel with:** D04, D06, D07, D10

**Critical path:** No

**First action:** Benchmark real asset/CVE counts and concurrent jobs

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Measure Platform Performance & Package an Accessible Handover. Supply or replay the authorized execution fixtures and identify real lab constraints. Focus: Measure Platform Performance & Package an Accessible Handover. **When:** At the input/fixture review and again before P16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p16-amr.md — Source/provenance corrections and reviewed fixture IDs; reviews/p16-amr.md — Reproducible observation/runner evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Measure Platform Performance & Package an Accessible Handover. **When:** At the input/fixture review and again before P16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p16-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Measure Platform Performance & Package an Accessible Handover. **When:** At the input/fixture review and again before P16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p16-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance. **When:** At the input/fixture review and again before P16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p16-shams.md — Reproducible asset observation evidence`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which declared asset/CVE/query volumes represent the final benchmark?
- Which actual query/index or resource bottleneck needs improvement?
- Can a new teammate operate the UI and restore a release using only the docs?

Sources: SRC-P09, SRC-P29, SRC-P33, SRC-P35

### Inputs

- Declared dataset and hardware
- Expected user scenarios

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Benchmark real asset/CVE counts and concurrent jobs
3. Tune measured bottlenecks and indexes
4. Check accessible RTL flows and error recovery
5. Inventory dependency versions/licenses and update responsibilities
6. Publish limitations/operator guide and reproduce on teammate machine
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Mahrous + Hams + Shams review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Measure pagination, indexes and concurrency before adding infrastructure. Preserve pinned dependencies, source/model licenses and clean restore; no enterprise-scale claim from the student lab.

### Expected Deliverables

- `experiments/platform/load_profile.py`
- `reports/platform/performance.csv`
- `reports/platform/accessibility-review.md`
- `docs/runbooks/operator-handover.md`
- `reports/release-manifest.json`

### Testing

1. Benchmark declared volumes on named hardware and record p95/resource use
2. Check keyboard navigation and error/empty states
3. Have a fresh teammate reproduce the demo and locate supported/unsupported behavior

### Acceptance Criteria

- Hardware and dataset reported
- Fresh teammate reproduces workflow
- No unsupported scale claims
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Unbounded scope prevents reliable final demo
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Freeze validated coverage and document expansion backlog

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## UX01 — Research Analyst Decisions and Define the Narrow User Journey

**Goal:** Define who uses the first release, the decisions they must make and the evidence each screen must expose.

**Why This Matters:** Omar needs reviewed user journeys before implementing complex triage and assistant flows; AI experiments need the same question set.

**Owner:** Hams

**Support:** Amr, Mahrous, Omar, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Can start now (initial plan; no completion reported).

**Depends on:** None

**Unlocks:** UX02

**Parallel with:** D01, D02, C01, C02

**Critical path:** Yes

**First action:** Read scope-baseline.md and write three jobs: choose the next fix, inspect evidence, and verify closure.

### Research / Questions to Answer

RESEARCH REQUIRED — validate the listed execution questions; reuse completed evidence.

Use retained evidence and the meeting-revision chapter. Customer access, hardware and measured results are not assumed.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Research Analyst Decisions and Define the Narrow User Journey. **When:** At the input/fixture review and again before UX01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/ux01-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Research Analyst Decisions and Define the Narrow User Journey. **When:** At the input/fixture review and again before UX01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/ux01-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review implementation feasibility, map screens to actual API fields and accept the design handoff; implementation remains Omar-owned P05. Focus: Research Analyst Decisions and Define the Narrow User Journey. **When:** At the input/fixture review and again before UX01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/ux01-omar.md — Signed frontend handoff and field/state compatibility notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Review analyst workflow, user-research findings and usability questions with Hams; this responsibility is independent of advisory ingestion. **When:** At the journey/usability review. **Deliver:** `reviews/ux01-shams.md — Workflow and usability review`. **Review:** Record review findings and their disposition.

### Scope Revision

- Added to make a distinct meeting requirement executable without reallocating existing primary ownership.

- Who is the first user: analyst, approver or administrator, and what must each decide?
- Can the user distinguish a CVE, an asset finding and a grouped remediation action?
- What does the user need to see before accepting uncertainty, deferring a fix or requesting approval?
- Which industrial-IT assumptions can be tested with available reviewers, and which customer assumptions remain unverified?

Sources: MR05

### Inputs

- Scope baseline 2026-10-23.r2
- Retained source register and package inputs from: current team requirements

### Implementation Steps

1. Read scope-baseline.md and write three jobs: choose the next fix, inspect evidence, and verify closure.
2. List user roles and permitted actions with Mahrous; do not infer permissions from screen visibility.
3. Use the shared Ubuntu and FortiOS cases to storyboard the happy path, unknown evidence, no fix and maintenance-blocked paths.
4. Ask available team or external reviewers to explain their decisions; record who participated and distinguish team review from customer research.
5. Define navigation, terminology, evidence timestamps and the minimum information for each decision.
6. Review the flow with Omar and Shams; hand off a versioned journey and open questions to UX02 and A01.

### Technical Approach

Needs Validation: Low-fidelity user flows and task scenarios; design tool remains the team choice. Hams leads research/design; Omar implements.

### Expected Deliverables

- `design/research/user-jobs.md`
- `design/flows/analyst-journey-v1.md`
- `design/research/review-notes.md`
- `design/README.md`

### Testing

1. Have a reviewer identify the ranked unit and justify one next action using only the journey.
2. Walk through unknown, stale and blocked cases without inventing missing facts.
3. Check each proposed action against P04 role/object rules.

### Acceptance Criteria

- Three user jobs and all four exception paths are documented.
- Research participants and limitations are stated honestly.
- Hams signs the UX handoff; Omar reviews implementation feasibility.
- The same scope version and fixture IDs are used by AI and platform work.

### Risks / Failure Modes

- UI research competes with Hams model experiments.
- Team feedback is mistaken for evidence of customer demand.

### Fallback

Use annotated low-fidelity flows and team reviews; do not wait for polished mockups or invent user interviews.

### Next Dependent Work

UX02

### Related Decisions

ADR21

## UX02 — Prototype Top-10 Triage, Evidence Review and Assistant States

**Goal:** Deliver an implementable prototype for the narrow decision workflow, including uncertainty and safe approval boundaries.

**Why This Matters:** A attractive dashboard cannot substitute for clear decision states or a stable frontend handoff.

**Owner:** Hams

**Support:** Amr, Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: UX01, P02 (initial plan; no completion reported).

**Depends on:** UX01, P02

**Unlocks:** P05, UX03

**Parallel with:** D03, D04, D05, D08

**Critical path:** Yes

**First action:** Load UX01 journeys and P02 example responses; map each field to a screen or deliberate omission.

### Research / Questions to Answer

RESEARCH REQUIRED — validate the listed execution questions; reuse completed evidence.

Use retained evidence and the meeting-revision chapter. Customer access, hardware and measured results are not assumed.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Prototype Top-10 Triage, Evidence Review and Assistant States. **When:** At the input/fixture review and again before UX02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/ux02-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Prototype Top-10 Triage, Evidence Review and Assistant States. **When:** At the input/fixture review and again before UX02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/ux02-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review implementation feasibility, map screens to actual API fields and accept the design handoff; implementation remains Omar-owned P05. Focus: Prototype Top-10 Triage, Evidence Review and Assistant States. **When:** At the input/fixture review and again before UX02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/ux02-omar.md — Signed frontend handoff and field/state compatibility notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Added to make a distinct meeting requirement executable without reallocating existing primary ownership.

- Which summary fields make the top ten actions understandable without hiding affected assets?
- How should unknown applicability, stale evidence and missing context appear?
- What is the distinction between an AI draft, a policy decision and a human approval?
- Which keyboard, contrast, loading and error states must the implementation support?

Sources: MR05

### Inputs

- Scope baseline 2026-10-23.r2
- Retained source register and package inputs from: UX01, P02

### Implementation Steps

1. Load UX01 journeys and P02 example responses; map each field to a screen or deliberate omission.
2. Sketch the action queue, asset/evidence panel, cited assistant answer and approval review.
3. Create state variants for empty, loading, stale, forbidden, unknown, failed and no-patch results.
4. Show grouped actions with expandable per-asset findings; never sum duplicate CVEs as independent fixes.
5. Annotate interactions, responsive behavior, focus order, copy and API fields.
6. Review with Omar for implementability and Mahrous for policy accuracy; save the signed version and change list for P05.

### Technical Approach

Needs Validation: Contract-driven prototype, progressive disclosure and evidence-first wording. Hams owns design; P05 remains Omar-owned implementation.

### Expected Deliverables

- `design/prototypes/triage-flow.html`
- `design/specs/component-states.md`
- `design/specs/api-field-map.md`
- `design/reviews/ux02-handoff.md`

### Testing

1. Use real-shaped shared fixtures to walk every state.
2. Have a reviewer distinguish draft versus approved versus verified without verbal explanation.
3. Inspect keyboard order and narrow-screen layouts in the prototype.

### Acceptance Criteria

- Prototype covers the queue, evidence, assistant and approval journey.
- Every API-backed field maps to the shared contract.
- All listed uncertainty/error states have a design.
- Omar accepts the implementation handoff and outstanding questions are recorded.

### Risks / Failure Modes

- Prototype assumes API fields that do not exist.
- Design polish delays the first real slice.

### Fallback

Deliver wireframes and a state table first; defer decorative work and build the reviewed essential flow.

### Next Dependent Work

P05, UX03

### Related Decisions

ADR21

## UX03 — Test Analyst Task Completion and Hand Off UX Corrections

**Goal:** Check whether users can make the intended decisions in the implemented flow and deliver a ranked correction list.

**Why This Matters:** Usability and recommendation quality must be measured separately from whether the frontend renders.

**Owner:** Hams

**Support:** Amr, Mahrous, Omar, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: UX02, P05 (initial plan; no completion reported).

**Depends on:** UX02, P05

**Unlocks:** Final handoff

**Parallel with:** D03, D04, D05, D08

**Critical path:** No

**First action:** Freeze the UI build, scope version and fixture set.

### Research / Questions to Answer

RESEARCH REQUIRED — validate the listed execution questions; reuse completed evidence.

Use retained evidence and the meeting-revision chapter. Customer access, hardware and measured results are not assumed.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Test Analyst Task Completion and Hand Off UX Corrections. **When:** At the input/fixture review and again before UX03 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/ux03-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Test Analyst Task Completion and Hand Off UX Corrections. **When:** At the input/fixture review and again before UX03 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/ux03-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review implementation feasibility, map screens to actual API fields and accept the design handoff; implementation remains Omar-owned P05. Focus: Test Analyst Task Completion and Hand Off UX Corrections. **When:** At the input/fixture review and again before UX03 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/ux03-omar.md — Signed frontend handoff and field/state compatibility notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Review analyst workflow, user-research findings and usability questions with Hams; this responsibility is independent of advisory ingestion. **When:** At the journey/usability review. **Deliver:** `reviews/ux03-shams.md — Workflow and usability review`. **Review:** Record review findings and their disposition.

### Scope Revision

- Added to make a distinct meeting requirement executable without reallocating existing primary ownership.

- Which tasks can reviewers complete correctly without coaching?
- Where do users mistake unknown for safe or an AI draft for approval?
- What task-time and error measurements are feasible with the actual reviewers?

Sources: MR05

### Inputs

- Scope baseline 2026-10-23.r2
- Retained source register and package inputs from: UX02, P05

### Implementation Steps

1. Freeze the UI build, scope version and fixture set.
2. Write tasks with expected evidence and safe outcomes before observing reviewers.
3. Run consented sessions with available reviewers; label team versus external participants.
4. Record completion, time, wrong conclusions, assistance and qualitative comments.
5. Prioritize safety-confusing defects first, then navigation and speed issues.
6. Give Omar reproducible issues and verify fixes; attach limitations to the evaluation report.

### Technical Approach

Needs Validation: Task-based usability study; no invented participant count or target success percentage. Hams leads; Omar implements corrections.

### Expected Deliverables

- `design/usability/protocol.md`
- `design/usability/results.csv`
- `design/usability/corrections.md`
- `design/usability/report.md`

### Testing

1. Replay tasks using fixed fixtures and the same success rubric.
2. Recheck dangerous misunderstandings after corrections.
3. Ensure screenshots and notes contain no private production inventory.

### Acceptance Criteria

- All planned tasks have recorded outcomes and denominators.
- No unresolved design defect presents unknown as safe or a draft as approval.
- Omar receives reproducible issues and reviewable expected behavior.
- Small-sample and participant limitations are reported.

### Risks / Failure Modes

- Small samples are overclaimed as market validation.
- UX fixes are mixed into model quality scores.

### Fallback

Use a structured team walkthrough and clearly label it as an internal usability review.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR21

## D17 — Normalize Fortinet Advisory Revisions for One FortiOS Profile

**Goal:** Prove vendor-aware affected-version and remediation evidence for one declared FortiOS profile using public advisory records and reviewed inventory imports.

**Why This Matters:** Network-appliance recommendations require model/train/configuration and vendor upgrade semantics; generic CVE text is insufficient.

**Owner:** Amr

**Support:** Shams, Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Conditional FortiOS profile

**Gate:** G1

**Start condition:** Blocked by: D02, C03 (initial plan; no completion reported).

**Depends on:** D02, C03

**Unlocks:** Final handoff

**Parallel with:** D08, D09, D15, C02

**Critical path:** No

**First action:** Select one FortiOS profile with model/train/build fields; record that hardware or licensed VM access is not assumed.

### Research / Questions to Answer

RESEARCH REQUIRED — validate the listed execution questions; reuse completed evidence.

Use retained evidence and the meeting-revision chapter. Customer access, hardware and measured results are not assumed.

### Support Contributions and Handoff

- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Normalize Fortinet Advisory Revisions for One FortiOS Profile. **When:** At the input/fixture review and again before D17 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d17-shams.md — Reproducible observation evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Normalize Fortinet Advisory Revisions for One FortiOS Profile. **When:** At the input/fixture review and again before D17 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d17-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Normalize Fortinet Advisory Revisions for One FortiOS Profile. **When:** At the input/fixture review and again before D17 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d17-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Added to make a distinct meeting requirement executable without reallocating existing primary ownership.

- Can the public PSIRT/RSS and per-advisory CSAF mechanism be fetched reproducibly under current terms?
- Which fields identify product, train, affected ranges, fixed release, revision history and configuration prerequisites?
- Does the selected advisory cover more than one product or CVE, and how are those relationships retained?
- What hardware, support entitlement and upgrade-path information is missing from public records?

Sources: MR06, MR07, MR08

### Inputs

- Scope baseline 2026-10-23.r2
- Retained source register and package inputs from: D02, C03

### Implementation Steps

1. Select one FortiOS profile with model/train/build fields; record that hardware or licensed VM access is not assumed.
2. Choose 10 reviewed advisory records where available, including revisions, not-affected branches, missing fixes and conditional exposure.
3. Fetch allowed public records serially with bounded retry; preserve raw records, URLs, timestamps and hashes; log inaccessible endpoints.
4. Compare HTML/structured fields and retain one-to-many advisory/product/CVE links without flattening branch tables.
5. Normalize vendor assertions into D02; use a reviewed manual table when structured retrieval cannot be qualified.
6. Pair Shams import fixtures with Mahrous boundary cases; unresolved version or configuration semantics remain unknown.
7. Record fixed-version evidence separately from the full upgrade path, release notes, support and recovery constraints.
8. Hand the qualified fixture/profile report to D09/D14/P10; forbid direct appliance firmware execution in this release.

### Technical Approach

Needs Validation: Vendor assertions and typed revision links; public RSS is discovery, not proof that all revisions are captured. This profile is conditional and does not block the Ubuntu core.

### Expected Deliverables

- `vulnerability-intelligence/fortinet/source-review.md`
- `vulnerability-intelligence/fortinet/collector.py`
- `fixtures/fortinet/advisory-manifest.json`
- `fixtures/fortinet/normalized.jsonl`
- `vulnerability-intelligence/fortinet/profile-qualification.md`

### Testing

1. Replay raw records and compare normalized assertions.
2. Test branch boundary, unrelated product, configuration missing and advisory revision cases.
3. Verify a fixed release is never presented as a tested direct upgrade jump.

### Acceptance Criteria

- One profile and all required identity/configuration fields are declared.
- Every normalized assertion links to a preserved reviewed source revision.
- 10 available records or a documented smaller feasibility sample cover the declared edge cases.
- Unavailable terms, access or version rules fail the profile gate rather than being bypassed.
- No firmware image redistribution or automated appliance mutation is included.

### Risks / Failure Modes

- Public advisory retrieval changes or is blocked.
- An apparently newer train is incompatible with the actual hardware.

### Fallback

Use source-attributed reviewed advisory/import fixtures; keep unsupported cases unknown and publish the profile limitation.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR21

## D18 — Qualify Tool Trust, Data Rights and Deployment Constraints

**Goal:** Create a usable trust and rights gate for every enabled source, runtime, model and distribution artifact.

**Why This Matters:** Technical access is not permission to redistribute data, ship a model or send private organization evidence to an external provider.

**Owner:** Amr

**Support:** Mahrous, Hams, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Can start now (initial plan; no completion reported).

**Depends on:** None

**Unlocks:** P17

**Parallel with:** C01, C02, C03, A01

**Critical path:** No

**First action:** Reuse D01 source register and existing licensing analysis; open a separate tool/model/data-rights register.

### Research / Questions to Answer

RESEARCH REQUIRED — validate the listed execution questions; reuse completed evidence.

Use retained evidence and the meeting-revision chapter. Customer access, hardware and measured results are not assumed.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Qualify Tool Trust, Data Rights and Deployment Constraints. **When:** At the input/fixture review and again before D18 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d18-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Qualify Tool Trust, Data Rights and Deployment Constraints. **When:** At the input/fixture review and again before D18 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d18-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Qualify Tool Trust, Data Rights and Deployment Constraints. **When:** At the input/fixture review and again before D18 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d18-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Added to make a distinct meeting requirement executable without reallocating existing primary ownership.

- Which exact artifact/version/license and owner apply to each enabled dependency?
- Are internal use, commercial service use, redistribution, derived output and attribution treated differently?
- Which tools send prompts, telemetry or inventory outside the deployment boundary?
- What retention, support entitlement, update and end-of-life rules must the selected customer profile satisfy?
- Can data be sold or shared under the actual source rights and customer agreement?

Sources: MR01, MR07, MR09, MR10, MR11

### Inputs

- Scope baseline 2026-10-23.r2
- Retained source register and package inputs from: current team requirements

### Implementation Steps

1. Reuse D01 source register and existing licensing analysis; open a separate tool/model/data-rights register.
2. Inventory only enabled dependencies and exact candidate revisions; distinguish source code, weights and source content.
3. Attach official terms/license URLs, review date, attribution obligations and unresolved questions to each row.
4. Trace inventory, prompts, logs, embeddings and telemetry across the proposed trust boundary.
5. Classify each row allowed-for-this-use, restricted, unverified or excluded; an unverified commercial right is a release gate.
6. Write a business-model hypothesis around software/workflow value, not assumed resale of public feeds or customer data.
7. Review with Omar and Hams; give each affected package a required configuration or replacement action.
8. Define recurring review after dependency/terms changes and before a customer deployment.

### Technical Approach

Needs Validation: Evidence-based trust/rights register with release-specific scope; legal or procurement confirmation remains required where the terms are unclear.

### Expected Deliverables

- `governance/tool-trust-register.csv`
- `governance/data-rights-matrix.csv`
- `governance/data-flow-boundaries.md`
- `business/value-and-distribution-hypotheses.md`
- `governance/README.md`

### Testing

1. Trace one record and one assistant question through logs, indexes and external endpoints.
2. Check every enabled distribution artifact has a rights disposition and evidence link.
3. Remove an unqualified external tool and verify the disclosed local/core workflow still has a path.

### Acceptance Criteria

- Each enabled source/tool/model has version, owner, rights, evidence, review date and renewal trigger.
- Commercial redistribution and customer-data sharing are never assumed from public availability.
- Unresolved restrictions identify an owner and block the relevant release capability.
- Amr hands concrete config/license actions to Omar/Hams and the business assumptions are labelled.

### Risks / Failure Modes

- Software license is mistaken for rights to all ingested content.
- A cloud trace integration leaks sensitive evidence.

### Fallback

Exclude the unqualified dependency or restrict the capability to an explicitly permitted internal demo; do not call it commercially cleared.

### Next Dependent Work

P17

### Related Decisions

ADR21

## P17 — Validate Disconnected Installation and Versioned Update Bundles

**Goal:** Install and operate the qualified on-prem profile without runtime internet access and prove a controlled update/restore procedure.

**Why This Matters:** On-prem is a required product direction. Disconnected operation needs images, models, evidence, identity and updates beyond a local LLM.

**Owner:** Omar

**Support:** Amr, Mahrous, Hams, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Product milestone

**Gate:** G3

**Start condition:** Blocked by: P14, A06, A09, D18 (initial plan; no completion reported).

**Depends on:** P14, A06, A09, D18

**Unlocks:** Final handoff

**Parallel with:** D03, D04, D05, D06

**Critical path:** No

**First action:** Freeze a profile from P14/A09 including capacity, capability flags, local identity, secrets and allowed connections.

### Research / Questions to Answer

RESEARCH REQUIRED — validate the listed execution questions; reuse completed evidence.

Use retained evidence and the meeting-revision chapter. Customer access, hardware and measured results are not assumed.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Validate Disconnected Installation and Versioned Update Bundles. Supply or replay the authorized execution fixtures and identify real lab constraints. Focus: Validate Disconnected Installation and Versioned Update Bundles. **When:** At the input/fixture review and again before P17 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p17-amr.md — Source/provenance corrections and reviewed fixture IDs; reviews/p17-amr.md — Reproducible observation/runner evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Validate Disconnected Installation and Versioned Update Bundles. **When:** At the input/fixture review and again before P17 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p17-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Validate Disconnected Installation and Versioned Update Bundles. **When:** At the input/fixture review and again before P17 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p17-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance. **When:** At the input/fixture review and again before P17 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p17-shams.md — Reproducible asset observation evidence`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Added to make a distinct meeting requirement executable without reallocating existing primary ownership.
- The disconnected hosting test explicitly covers private DNS, certificate trust and identity dependencies.

- Which exact CPU/GPU architecture, RAM, disk and container runtime pass the measured profile?
- Which images, model/tokenizer files, embedding artifacts, packages and source snapshots must be carried offline?
- What remains usable when intelligence or patch repositories cannot be refreshed?
- How will the target verify bundle authenticity, schema compatibility, rollback eligibility and imported source age?
- Can local/private DNS, certificate trust/renewal and identity work without runtime public internet access?

Sources: MR01, MR02, MR03, MR04

### Inputs

- Scope baseline 2026-10-23.r2
- Retained source register and package inputs from: P14, A06, A09, D18

### Implementation Steps

1. Freeze a profile from P14/A09 including capacity, capability flags, local identity, secrets and allowed connections.
2. Build a connected staging bundle with pinned image digests, model revisions, configuration templates, source snapshots, migrations and license notices.
3. Use image save/load for container images; separately export models, database/evidence backup and optional approved package repository content.
4. Create a manifest with artifact hashes, versions, source timestamps and compatibility rules; establish an offline-verifiable signed manifest or authenticated trusted-transfer procedure before claiming authenticity.
5. Validate the bundle and import into a clean lab host with public egress blocked; install without a first-run network download.
6. Run login, inventory import, deterministic assessment, ranked queue and local retrieval/assistant checks; declare any disabled capability explicitly.
7. Reject tampered, incompatible and unauthorized bundles; apply an allowed update transactionally with backup and tested recovery.
8. Measure install time, footprint and restore results; hand over operator instructions and enterprise qualification gaps.

### Technical Approach

Needs Validation: Extend retained Compose deployment and local PostgreSQL/evidence paths; no Kubernetes requirement. Offline qualification is a planned product milestone, not a claim that the current planning website runs the product.

### Expected Deliverables

- `deployment/offline/bundle-manifest.schema.json`
- `deployment/offline/export-bundle.sh`
- `deployment/offline/import-bundle.sh`
- `deployment/offline/runbook.md`
- `deployment/offline/qualification-report.md`

### Testing

1. Install on a clean qualified host with internet egress blocked and inspect denied connection logs.
2. Exercise missing model/image, wrong architecture, stale source, tampered bundle and incompatible migration cases.
3. Restore database and evidence together, then prove citations and assessment revisions still resolve.
4. Run the same reviewed assistant questions locally; a disabled assistant is a disclosed degraded profile, not a full-AI offline pass.
5. Repeat the enabled workflow using the documented private hostname/certificate and local identity with public egress blocked; no hidden public DNS or certificate enrollment step is allowed at runtime.

### Acceptance Criteria

- Clean install uses only approved bundle artifacts with no hidden download.
- All enabled core capabilities pass with public egress blocked.
- Bundle authenticity/integrity and compatibility checks reject the negative cases.
- Source freshness and patch-content availability are honestly displayed.
- An operator reproduces installation, update and recovery from the runbook.

### Risks / Failure Modes

- Runtime startup pulls a tokenizer, font, image, identity or telemetry dependency.
- An image archive is mistaken for a complete application backup.
- Offline feed refresh cannot meet connected freshness targets.

### Fallback

Ship a qualified connected on-prem milestone first and label disconnected qualification pending; model failure degrades to cited deterministic cards, not a cloud call without permission.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR21, ADR22

## A17 — Compare Rule-Based, AI-Assisted and Hybrid Prioritization on Reviewed Organization Scenarios

**Goal:** Determine where AI adds measurable prioritization value over a transparent baseline without changing applicability, safety or approval authority.

**Why This Matters:** The existing A15 compares final contributions but does not implement a separately owned AI-ranking experiment. Hams owns the overall AI-powered prioritization capability; domain packages supply evidence and integration.

**Owner:** Hams

**Support:** Amr, Mahrous, Shams, Omar

**Conditional capability gates:** No candidate becomes an operational ranker before reviewed safety and comparative evidence gates.

**Scope version:** 2026-10-23.r2

**Delivery layer:** Conditional experiment

**Gate:** G2

**Start condition:** Blocked by: D12, A03, A04, D15, D14, A13 (initial plan; no completion reported).

**Depends on:** D12, A03, A04, D15, D14, A13

**Unlocks:** A15

**Parallel with:** None listed

**Critical path:** No

**First action:** Freeze the A13 ranking protocol and receive the complete A02/D12/D14/D15 input bundle; missing bundles block experiment runs, not initial literature review.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Research security factors with Mahrous, provide source-backed relevance cases and independently review ranking reasons. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a17-amr.md — Research security factors with Mahrous, provide source-backed relevance cases and independently review ranking reasons.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Mahrous**: Own D12 policy/hard constraints and applicability validation; adjudicate security ranking disagreements. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a17-mahrous.md — Own D12 policy/hard constraints and applicability validation; adjudicate security ranking disagreements.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Shams**: Assemble and validate the A02 experiment input bundle from existing feeds, asset evidence and reviewed context; disclose missing/stale/synthetic fields. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a17-shams.md — Assemble and validate the A02 experiment input bundle from existing feeds, asset evidence and reviewed context; disclose missing/stale/synthetic fields.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Omar**: Review ranking-result API contract, instrument cost/latency and integrate only qualified output with safe baseline fallback. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a17-omar.md — Review ranking-result API contract, instrument cost/latency and integrate only qualified output with safe baseline fallback.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- 29 October: new bounded AI-ranking experiment; Hams confirmed capability primary owner; reuses existing source/policy/evaluation/platform work.

- Compare transparent rules, frozen-feature/classical ranking candidates, bounded LLM ranking and rules-first hybrid: required labels, compute, latency, stability and failure modes. No winner is preselected.
- Can organization context change useful order while hard eligibility and policy constraints remain unchanged?
- Do we have enough reviewed outcomes for learned ranking? If not, compare constrained inference-only candidates and disclose label limits.
- How do missing EPSS/KEV/context, large candidate volumes, ties, duplicates and maintenance conflicts affect results?

Sources: DS12, DS14, DS15, DS16, MR06, MR08

### Inputs

- A02 Amr-prepared provenance/context bundle frozen by A03
- D12 versioned baseline, security factors and relevance rubric
- D15 independent applicability cases; D14 eligible remediation actions
- A04 baseline classification outputs only where their uncertainty is recorded

### Implementation Steps

1. Freeze the A13 ranking protocol and receive the complete A02/D12/D14/D15 input bundle; missing bundles block experiment runs, not initial literature review.
2. Research and document strongest realistic rule/AI/hybrid alternatives, label needs, cost/privacy and deployment limits before choosing the candidate.
3. Implement the shared offline harness and deterministic comparison adapters; validate input/output schema with Omar.
4. Run one low-resource AI candidate and a constrained hybrid; keep hard policy gates outside model control.
5. Evaluate per A13 with independent security review; run context/stability/failure ablations and paired time trials.
6. Publish the recommendation, negative results and reproducibility README; hand qualified outputs or baseline-retention decision to Omar.

### Technical Approach

Existing Design Decision: RESEARCH REQUIRED: reuse D12 rules and A02/A03 data. First build a Python offline comparison harness; choose one low-resource AI candidate after evidence review, then test rules-first hybrid constrained ordering. No fine-tuning in current execution. LLM text is not an authoritative risk probability.

### Expected Deliverables

- `research/prioritization/approach-comparison.md`
- `experiments/prioritization/run_comparison.py`
- `experiments/prioritization/configs/`
- `reports/prioritization/rule-ai-hybrid-benchmark.md`
- `reports/prioritization/recommended-approach.md`
- `contracts/prioritization/ranking-result.schema.json`
- `experiments/prioritization/README.md`

### Testing

1. Use identical candidate action sets, evidence revisions, allowed context and held-out cases for all methods.
2. Compare CVSS-only, KEV-first and D12 baseline to AI and hybrid; report cases where each loses.
3. Repeat stochastic candidates and change one context variable at a time; test missing inputs, injection, malformed output, excessive candidate volume and forbidden policy overrides.
4. Run blinded paired analyst tasks; separate correctness, review time and explanation usefulness.

### Acceptance Criteria

- All three approach families are compared on the declared supported cases; unavailable learned methods have evidence-based exclusion reasons.
- Every input/output and expert judgement has a recorded revision and provenance; holdout is not used for selection.
- Zero observed forbidden eligibility/permission overrides in the declared test suite; this is a test result, not a universal safety guarantee.
- Report quality/stability/time/latency/cost metrics, failures and uncertainty against predeclared A13 gates.
- Recommend AI, hybrid or baseline based on measured evidence; retaining baseline is a valid successful experiment.
- All four supporting reviewers have explicit disposition records.

### Risks / Failure Modes

- Sparse or synthetic labels can make gains misleading; expert rankings can disagree.
- LLM position bias, candidate truncation, randomness and confident unsupported reasoning.
- Added AI latency or reviewer effort can erase ranking benefit.

### Fallback

Keep D12 production order and cited explanations; show AI experiment as unqualified/offline. Do not delay core inventory, approval or verification.

### Next Dependent Work

A15

### Related Decisions

ADR05, ADR15, ADR23, ADR24

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


## Retained source register

- **DS01** — [CVE List V5 official repository](https://github.com/CVEProject/cvelistV5).
- **DS02** — [NIST NVD operational changes 2026](https://www.nist.gov/itl/nvd).
- **DS03** — [Ubuntu OSV data](https://documentation.ubuntu.com/security/security-updates/osv/).
- **DS04** — [Ubuntu OVAL data](https://documentation.ubuntu.com/security/security-updates/oval/).
- **DS05** — [Red Hat Security Data](https://access.redhat.com/security/data).
- **DS06** — [Red Hat backporting](https://access.redhat.com/security/updates/backporting).
- **DS07** — [OSV API](https://google.github.io/osv.dev/api/).
- **DS08** — [OSV schema](https://ossf.github.io/osv-schema/).
- **DS09** — [GitHub Advisory Database](https://github.com/github/advisory-database).
- **DS10** — [Microsoft security update API](https://github.com/microsoft/MSRC-Microsoft-Security-Updates-API).
- **DS11** — [MSRC client API-key documentation](https://github.com/microsoft/MSRC-Microsoft-Security-Updates-API/blob/main/src/MsrcSecurityUpdates/Public/Get-MsrcCvrfDocument.ps1).
- **DS12** — [FIRST EPSS FAQ](https://www.first.org/epss/faq).
- **DS13** — [FIRST API limits](https://api.first.org/).
- **DS14** — [EPSS data download](https://www.first.org/epss/data.html).
- **DS15** — [CISA KEV official mirror](https://github.com/cisagov/kev-data).
- **DS16** — [CVSS v4 specification](https://www.first.org/cvss/v4.0/specification-document).
- **DS17** — [Package URL specification](https://github.com/package-url/purl-spec).
- **DS18** — [CSAF2 standard](https://docs.oasis-open.org/csaf/csaf/v2.0/os/csaf-v2.0-os.html).
- **DS19** — [CycloneDX VEX](https://cyclonedx.org/capabilities/vex/).
- **DS20** — [CVE terms](https://www.cve.org/legal/termsofuse).
- **DS21** — [NVD developer guidance](https://nvd.nist.gov/developers/start-here).
- **DS22** — [NVD CPE product APIs](https://nvd.nist.gov/developers/products).
- **CY-S01** — [Nmap legal notices](https://nmap.org/book/man-legal.html).
- **CY-S02** — [Nmap service/version detection](https://nmap.org/book/man-version-detection.html).
- **CY-S03** — [Ansible apt module](https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/apt_module.html).
- **CY-S04** — [Ansible Windows updates](https://docs.ansible.com/projects/ansible/latest/collections/ansible/windows/win_updates_module.html).
- **CY-S05** — [Ansible Windows Remote Management](https://docs.ansible.com/projects/ansible/latest/os_guide/windows_winrm.html).
- **CY-S06** — [NIST SP 800-40 Rev 4](https://csrc.nist.gov/pubs/sp/800/40/r4/final).
- **CY-S07** — [Greenbone Community Containers](https://greenbone.github.io/docs/latest/22.4/container/index.html).
- **CY-S08** — [Wazuh system inventory](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/index.html).
- **CY-S09** — [osquery documentation](https://osquery.readthedocs.io/en/stable/).
- **CY-S10** — [osquery licence](https://github.com/osquery/osquery/blob/master/LICENSE).
- **CY-S11** — [Wazuh inventory compatibility matrix](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/compatibility-matrix.html).
- **CY-S12** — [NIST SP 800-82 Rev 3](https://csrc.nist.gov/pubs/sp/800/82/r3/final).
- **CY-S13** — [Ubuntu Security Notices](https://ubuntu.com/security/notices).
- **CY-S14** — [Ansible check and diff mode](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_checkmode.html).
- **CY-S15** — [Wazuh log-file collection](https://documentation.wazuh.com/current/user-manual/capabilities/log-data-collection/monitoring-log-files.html).
- **CY-S16** — [Wazuh JSON decoder](https://documentation.wazuh.com/current/user-manual/ruleset/decoders/json-decoder.html).
- **AI01** — [Multilabel OneVsRestClassifier](https://scikit-learn.org/stable/modules/generated/sklearn.multiclass.OneVsRestClassifier.html).
- **AI02** — [Cross-validation groups and time](https://scikit-learn.org/stable/modules/cross_validation.html).
- **AI03** — [Common pitfalls and leakage](https://scikit-learn.org/stable/common_pitfalls.html).
- **AI04** — [TF-IDF vectorizer](https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html).
- **AI05** — [FIRST CVSS 4.0 specification](https://www.first.org/cvss/v4.0/specification-document).
- **AI06** — [PostgreSQL full text search](https://www.postgresql.org/docs/current/textsearch.html).
- **AI07** — [pgvector exact approximate and filtering](https://github.com/pgvector/pgvector).
- **AI08** — [Multilingual E5 small publisher card](https://huggingface.co/intfloat/multilingual-e5-small/blob/main/README.md).
- **AI09** — [BGE-M3 publisher card](https://huggingface.co/BAAI/bge-m3).
- **AI10** — [Sentence Transformers pretrained models](https://sbert.net/docs/sentence_transformer/pretrained_models.html).
- **AI11** — [Cross encoder usage](https://sbert.net/docs/cross_encoder/usage/usage.html).
- **AI12** — [Retrieval-Augmented Generation research paper](https://arxiv.org/abs/2005.11401).
- **AI13** — [Qwen3.5-4B publisher model card](https://huggingface.co/Qwen/Qwen3.5-4B).
- **AI14** — [Qwen3-4B-Instruct-2507 publisher card](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507).
- **AI15** — [Gemma3-4B-IT publisher card](https://huggingface.co/google/gemma-3-4b-it).
- **AI16** — [llama.cpp official repository](https://github.com/ggml-org/llama.cpp).
- **AI17** — [OWASP prompt injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/).
- **AI18** — [Tenable Hexa current product description](https://www.tenable.com/products/tenable-one/capabilities/hexa-ai).
- **SRC-P01** — [FastAPI features](https://fastapi.tiangolo.com/features/).
- **SRC-P02** — [Django authentication](https://docs.djangoproject.com/en/5.2/topics/auth/).
- **SRC-P03** — [NestJS documentation](https://docs.nestjs.com/).
- **SRC-P04** — [React from scratch](https://react.dev/learn/build-a-react-app-from-scratch).
- **SRC-P05** — [Vite getting started](https://vite.dev/guide/).
- **SRC-P06** — [Next static exports](https://nextjs.org/docs/app/guides/static-exports).
- **SRC-P07** — [PostgreSQL JSONB](https://www.postgresql.org/docs/16/datatype-json.html).
- **SRC-P08** — [MySQL JSON](https://dev.mysql.com/doc/refman/8.4/en/json.html).
- **SRC-P09** — [pgvector](https://github.com/pgvector/pgvector).
- **SRC-P10** — [Qdrant](https://github.com/qdrant/qdrant).
- **SRC-P11** — [PostgreSQL row security](https://www.postgresql.org/docs/17/ddl-rowsecurity.html).
- **SRC-P12** — [FastAPI background tasks](https://fastapi.tiangolo.com/tutorial/background-tasks/).
- **SRC-P13** — [Celery brokers](https://docs.celeryq.dev/en/stable/getting-started/backends-and-brokers/index.html).
- **SRC-P14** — [RabbitMQ acknowledgements](https://www.rabbitmq.com/docs/confirms).
- **SRC-P15** — [Celery tasks and idempotency](https://docs.celeryq.dev/en/stable/userguide/tasks.html).
- **SRC-P16** — [Celery Redis caveats](https://docs.celeryq.dev/en/stable/getting-started/backends-and-brokers/redis.html).
- **SRC-P17** — [Redis licenses](https://redis.io/legal/licenses/).
- **SRC-P18** — [RQ documentation](https://python-rq.org/docs/).
- **SRC-P19** — [OWASP authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).
- **SRC-P20** — [PostgreSQL SKIP LOCKED](https://www.postgresql.org/docs/current/sql-select.html).
- **SRC-P21** — [OWASP sessions](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html).
- **SRC-P22** — [OWASP authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).
- **SRC-P23** — [OWASP command injection defense](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html).
- **SRC-P24** — [Keycloak OIDC](https://www.keycloak.org/securing-apps/oidc-layers).
- **SRC-P25** — [SQLAlchemy sessions](https://docs.sqlalchemy.org/en/20/orm/session_basics.html).
- **SRC-P26** — [Alembic migrations](https://alembic.sqlalchemy.org/en/latest/tutorial.html).
- **SRC-P27** — [Compose secrets](https://docs.docker.com/compose/how-tos/use-secrets/).
- **SRC-P28** — [OWASP secrets management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html).
- **SRC-P29** — [Compose production](https://docs.docker.com/compose/how-tos/production/).
- **SRC-P30** — [Docker Desktop license](https://docs.docker.com/subscription-billing/desktop-license/).
- **SRC-P31** — [Kubernetes production](https://kubernetes.io/docs/setup/production-environment/).
- **SRC-P32** — [MinIO archive](https://github.com/minio/minio).
- **SRC-P33** — [PostgreSQL backup](https://www.postgresql.org/docs/current/backup.html).
- **SRC-P34** — [OWASP logging](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html).
- **SRC-P35** — [OpenTelemetry Python](https://opentelemetry.io/docs/languages/python/).
- **G-S01** — [SEI: Managing Architectural Risk During Agile Development](https://www.sei.cmu.edu/library/managing-architectural-risk-during-agile-development/).
- **G-S02** — [NIST SSDF 1.1](https://csrc.nist.gov/pubs/sp/800/218/final).
- **G-S03** — [OWASP ASVS](https://owasp.org/projects/asvs).
- **G-S04** — [PostgreSQL license](https://www.postgresql.org/about/licence/).
- **G-S05** — [RabbitMQ core license](https://github.com/rabbitmq/rabbitmq-server/blob/main/LICENSE).
- **G-S06** — [Ansible official repository](https://github.com/ansible/ansible).
- **MR01** — [Ollama FAQ: local runtime, networking and cloud controls](https://docs.ollama.com/faq).
- **MR02** — [Docker Compose production deployment](https://docs.docker.com/compose/how-tos/production/).
- **MR03** — [Docker image save](https://docs.docker.com/reference/cli/docker/image/save/).
- **MR04** — [Docker image load](https://docs.docker.com/reference/cli/docker/image/load/).
- **MR05** — [NIST SP 800-82 Rev. 3 final: OT security](https://csrc.nist.gov/pubs/sp/800/82/r3/final).
- **MR06** — [Fortinet PSIRT advisories](https://fortiguard.fortinet.com/psirt).
- **MR07** — [Fortinet product vulnerability news feeds](https://community.fortinet.com/fortigate-3/technical-tip-fortinet-product-vulnerabilities-news-feeds-143896).
- **MR08** — [FortiGate Upgrade Path Tool](https://docs.fortinet.com/upgrade-tool/fortigate).
- **MR09** — [LangGraph overview](https://docs.langchain.com/oss/python/langgraph/overview).
- **MR10** — [SecBERT publisher model card](https://huggingface.co/jackaduma/SecBERT).
- **MR11** — [Google supervised tuning documentation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tuning/supervised-tuning/use).
- **HT01** — [FastAPI deployment: HTTPS and TLS termination](https://fastapi.tiangolo.com/deployment/https/).
- **HT02** — [Docker Compose networking](https://docs.docker.com/compose/how-tos/networking/).