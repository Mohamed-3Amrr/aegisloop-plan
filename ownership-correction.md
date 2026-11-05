# AegisLoop ownership review — 4 November 2026

User-confirmed roles: Amr owns vulnerability/advisory data; Shams owns inventory/asset data.

Source: the existing Site repository, canonical `dist/blueprint.json` at original commit 5e508124890e4596e4d3e37ce5936c55aece2da9. `dist/blueprint-data.js` is the browser copy; `scripts/export-execution.py` generates task guides, team brief, scope baseline, dependency map, CSV, study guide and prototype-week downloads. This is a static planning reference; no ClickUp tasks or team completion states were changed.

## Every primary owner correction

| ID | Task | Before | After | Prerequisites | Unlocks |
|---|---|---|---|---|---|
| D01 | Validate Core Vulnerability Sources & Build the First Ingestion Prototype | Shams | Amr | None | D02 |
| D02 | Define and Validate the Canonical Vulnerability Schema | Shams | Amr | D01 | D03, D05, D07, D08, D11, A06, P02, D17 |
| D03 | Build Bulk CVE Ingestion and Incremental Update Processing | Shams | Amr | D02, P03 | D04, D13, D16, P09 |
| D04 | Add NVD Enrichment Without Blocking CVE Availability | Shams | Amr | D03 | None |
| D05 | Build the Ubuntu Affected-and-Fixed Package Catalog | Shams | Amr | D02, P03 | D06, D08, D09, D14, D15 |
| D06 | Validate Microsoft and Red Hat Data & Add Scoped Vendor Adapters | Shams | Amr | D05 | None |
| D07 | Ingest Package Advisories That May Have No CVE | Shams | Amr | D02 | None |
| D11 | Import Dated KEV and EPSS Signals & Preserve Missing Values | Shams | Amr | D02, P03 | D12 |
| D14 | Build a Versioned Catalog of Vendor Fixes and Mitigations | Shams | Amr | D05, D09 | C09, A11, A17 |
| D16 | Measure CVE Freshness & Rehearse Source Outage Recovery | Shams | Amr | D03, D13 | None |
| C04 | Implement Bounded Network Discovery & Parse Structured Results | Amr | Shams | C01, C02, C03 | C16 |
| C05 | Collect Ubuntu OS and Package Evidence Through Authenticated SSH | Amr | Shams | C02, C03 | D09, C08, C11, C16 |
| C06 | Compare Windows Inventory Options & Implement One Adapter | Amr | Shams | C03 | C14 |
| C07 | Import Offline and Appliance Evidence With Freshness Labels | Amr | Shams | C03 | None |
| C09 | Validate Patch Catalog Candidates Against Execution Prerequisites | Shams | Amr | C08, D14 | C10, C11 |
| D17 | Normalize Fortinet Advisory Revisions for One FortiOS Profile | Shams | Amr | D02, C03 | None |
| D18 | Qualify Tool Trust, Data Rights and Deployment Constraints | Shams | Amr | None | P17 |

## Dependency and unrelated ownership checks

All 71 tasks retain exactly the same prerequisite/reverse edges, gate, release layer and status. C02 lab and C11/C12/C14 execution/recovery remain Amr; C03 observation definition and applicability/policy remain Mahrous; P02 stays Omar; AI/UX stays Hams; platform stays Omar. Shams retains independent user/business research. Historical research and previous-map content have a visible correction notice and retain their original evidence.

## P02 requests

Omar remains accountable. Prerequisites remain P01, C03, D02.

- **Amr**: Supply AdvisoryRevision and source-revision fixtures from D01/D02; review source authority, vendor semantics, rights, missing and conflicting assertions. Retain separate runner/patch-execution contract review for C11/C12/C14. Deliver: reviews/p02-amr.md — Source/provenance corrections and reviewed fixture IDs
- **Shams**: Supply AssetObservation/inventory fixtures from the authorized collector; validate stable identity, OS/package fields, collected_at, stale/failed collection and missing evidence. Coordinate C03 definitions with Mahrous. Deliver: reviews/p02-shams.md — Reproducible observation evidence and failing edge cases
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Publish Shared API Contracts and Validate Producer/Consumer Fixtures. Deliver: reviews/p02-mahrous.md — Reviewed decision outcomes and blocking policy questions
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Publish Shared API Contracts and Validate Producer/Consumer Fixtures. Deliver: reviews/p02-hams.md — Reviewed question/answer or UX-state examples and evaluation notes

## Every changed supporting contribution

### D05

- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Build the Ubuntu Affected-and-Fixed Package Catalog. Deliver: reviews/d05-shams.md — Reproducible observation evidence and failing edge cases
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Build the Ubuntu Affected-and-Fixed Package Catalog. Deliver: reviews/d05-mahrous.md — Reviewed decision outcomes and blocking policy questions

### D06

- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Validate Microsoft and Red Hat Data & Add Scoped Vendor Adapters. Deliver: reviews/d06-shams.md — Reproducible observation evidence and failing edge cases
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Validate Microsoft and Red Hat Data & Add Scoped Vendor Adapters. Deliver: reviews/d06-mahrous.md — Reviewed decision outcomes and blocking policy questions

### D08

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Normalize Asset Product Identities & Generate Matching Candidates. Deliver: reviews/d08-amr.md — Source/provenance corrections and reviewed fixture IDs
- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Normalize Asset Product Identities & Generate Matching Candidates. Deliver: reviews/d08-shams.md — Reproducible observation evidence and failing edge cases

### D09

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Implement Vendor-Aware Applicability Rules & Decision Traces. Deliver: reviews/d09-amr.md — Source/provenance corrections and reviewed fixture IDs

### D10

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Validate SBOM and VEX Evidence Before Using It in Assessments. Deliver: reviews/d10-amr.md — Source/provenance corrections and reviewed fixture IDs
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Validate SBOM and VEX Evidence Before Using It in Assessments. Deliver: reviews/d10-omar.md — Contract compatibility notes and a consumer-side fixture check

### D12

- **Amr**: Co-author threat/risk factors, review vendor/KEV/EPSS semantics and independently grade cases. Deliver: reviews/d12-amr.md — Co-author threat/risk factors, review vendor/KEV/EPSS semantics and independently grade cases.
- **Hams**: Define experiment-compatible input/output and relevance formats; compare candidate ranking against this frozen baseline. Deliver: reviews/d12-hams.md — Define experiment-compatible input/output and relevance formats; compare candidate ranking against this frozen baseline.

### D14

- **Mahrous**: Validate applicability, residual risk and policy constraints. Deliver: reviews/d14-mahrous.md — Validate applicability, residual risk and policy constraints.
- **Shams**: Check real/lab asset evidence and practical preflight inputs; no FortiOS mutation implied. Deliver: reviews/d14-shams.md — Check real/lab asset evidence and practical preflight inputs; no FortiOS mutation implied.
- **Hams**: Define retrieval-ready evidence spans and expected grounded guidance fields for A11. Deliver: reviews/d14-hams.md — Define retrieval-ready evidence spans and expected grounded guidance fields for A11.

### D15

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Create Independent Matching Ground Truth & Measure Errors. Deliver: reviews/d15-amr.md — Source/provenance corrections and reviewed fixture IDs
- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Create Independent Matching Ground Truth & Measure Errors. Deliver: reviews/d15-shams.md — Reproducible observation evidence and failing edge cases
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Create Independent Matching Ground Truth & Measure Errors. Deliver: reviews/d15-hams.md — Reviewed question/answer or UX-state examples and evaluation notes

### C01

- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Define Allowed Lab Targets & Enforce Scan Safety Rules. Deliver: reviews/c01-shams.md — Reproducible observation evidence and failing edge cases

### C03

- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Define Asset Observation Fields & Validate Stable Identity. Deliver: reviews/c03-shams.md — Reproducible observation evidence and failing edge cases
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Define Asset Observation Fields & Validate Stable Identity. Deliver: reviews/c03-omar.md — Contract compatibility notes and a consumer-side fixture check

### C07

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Import Offline and Appliance Evidence With Freshness Labels. Deliver: reviews/c07-amr.md — Source/provenance corrections and reviewed fixture IDs

### C08

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Integrate the Applicability Engine & Review Its Evidence Traces. Deliver: reviews/c08-amr.md — Source/provenance corrections and reviewed fixture IDs

### C13

- **Amr**: Supply or replay the authorized execution fixtures and identify real lab constraints. Focus: Verify Remediation Independently & Rehearse Recovery. Deliver: reviews/c13-amr.md — Reproducible observation/runner evidence and failing edge cases
- **Shams**: Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance. Deliver: reviews/c13-shams.md — Reproducible asset observation evidence

### C16

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Publish Supported-Coverage Results & Reproduce the End-to-End Demo. Supply or replay the authorized execution fixtures and identify real lab constraints. Focus: Publish Supported-Coverage Results & Reproduce the End-to-End Demo. Deliver: reviews/c16-amr.md — Source/provenance corrections and reviewed fixture IDs; reviews/c16-amr.md — Reproducible observation/runner evidence and failing edge cases
- **Shams**: Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance. Deliver: reviews/c16-shams.md — Reproducible asset observation evidence

### A01

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Define AI Tasks, Label Rules and Reviewed Examples. Deliver: reviews/a01-amr.md — Source/provenance corrections and reviewed fixture IDs
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Define AI Tasks, Label Rules and Reviewed Examples. Deliver: reviews/a01-mahrous.md — Reviewed decision outcomes and blocking policy questions
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Define AI Tasks, Label Rules and Reviewed Examples. Deliver: reviews/a01-omar.md — Contract compatibility notes and a consumer-side fixture check

### A02

- **Shams**: Coordinate and assemble vulnerability, asset and contextual inputs; validate joins, timestamps, missingness and data readiness, reusing existing collectors. Deliver: reviews/a02-shams.md — Coordinate and assemble vulnerability, asset and contextual inputs; validate joins, timestamps, missingness and data readiness, reusing existing collectors.
- **Amr**: Supply authoritative advisory/source revisions and review provenance/rights; Amr owns D01–D07, D11, D14, D16–D18 and C09. Deliver: reviews/a02-amr.md — Supply authoritative source revisions and review provenance/rights; no transfer of D01–D05 source ownership.
- **Mahrous**: Supply applicability outcomes and reviewed business/policy scenario constraints from D09/D12. Deliver: reviews/a02-mahrous.md — Supply applicability outcomes and reviewed business/policy scenario constraints from D09/D12.
- **Omar**: Validate P02 identifiers, tenant scope and serialization for the experimental input bundle. Deliver: reviews/a02-omar.md — Validate P02 identifiers, tenant scope and serialization for the experimental input bundle.

### A03

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Clean Advisory Text & Freeze Leakage-Safe Dataset Splits. Deliver: reviews/a03-amr.md — Source/provenance corrections and reviewed fixture IDs

### A05

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Review Label Disagreements & Test a Stronger Classifier Only if Justified. Deliver: reviews/a05-amr.md — Source/provenance corrections and reviewed fixture IDs
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Review Label Disagreements & Test a Stronger Classifier Only if Justified. Deliver: reviews/a05-mahrous.md — Reviewed decision outcomes and blocking policy questions

### A06

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Build Revision-Aware Retrieval Chunks With Source Metadata. Deliver: reviews/a06-amr.md — Source/provenance corrections and reviewed fixture IDs
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Build Revision-Aware Retrieval Chunks With Source Metadata. Deliver: reviews/a06-omar.md — Contract compatibility notes and a consumer-side fixture check
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Build Revision-Aware Retrieval Chunks With Source Metadata. Deliver: reviews/a06-mahrous.md — Reviewed decision outcomes and blocking policy questions

### A11

- **Amr**: Provide D14 source-backed fixes/mitigations and validate every factual guidance claim. Deliver: reviews/a11-amr.md — Provide D14 source-backed fixes/mitigations and validate every factual guidance claim.
- **Mahrous**: Validate applicability, compatibility/policy limits, verification and security usefulness. Deliver: reviews/a11-mahrous.md — Validate applicability, compatibility/policy limits, verification and security usefulness.
- **Shams**: Prepare representative lab/vendor inputs and check prerequisite/verification practicality without executing unapproved actions. Deliver: reviews/a11-shams.md — Prepare representative lab/vendor inputs and check prerequisite/verification practicality without executing unapproved actions.
- **Omar**: Implement typed recommendation envelopes, citations, refusal states and approved-plan handoff using P11/P12. Deliver: reviews/a11-omar.md — Implement typed recommendation envelopes, citations, refusal states and approved-plan handoff using P11/P12.

### A13

- **Amr**: Independently review security relevance and vendor-guidance factual correctness. Deliver: reviews/a13-amr.md — Independently review security relevance and vendor-guidance factual correctness.
- **Mahrous**: Co-define policy/safety rubric and adjudicate disagreements with documented reasons. Deliver: reviews/a13-mahrous.md — Co-define policy/safety rubric and adjudicate disagreements with documented reasons.
- **Shams**: Freeze reproducible scenario inputs and identify unavailable/labelled synthetic evidence. Deliver: reviews/a13-shams.md — Freeze reproducible scenario inputs and identify unavailable/labelled synthetic evidence.
- **Omar**: Instrument comparable latency, runtime failures and user-task timings without logging sensitive content. Deliver: reviews/a13-omar.md — Instrument comparable latency, runtime failures and user-task timings without logging sensitive content.

### A14

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Invalidate AI Caches on Evidence Changes & Track Model Operations. Deliver: reviews/a14-amr.md — Source/provenance corrections and reviewed fixture IDs
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Invalidate AI Caches on Evidence Changes & Track Model Operations. Deliver: reviews/a14-hams.md — Reviewed question/answer or UX-state examples and evaluation notes

### A15

- **Amr**: Review source fidelity and security interpretation of gains. Reproduce datasets and origin-stratified results. Deliver: reviews/a15-amr.md — Review source fidelity and security interpretation of gains.; reviews/a15-amr.md — Reproduce datasets and origin-stratified results.
- **Mahrous**: Challenge policy violations and unsupported novelty/security claims. Deliver: reviews/a15-mahrous.md — Challenge policy violations and unsupported novelty/security claims.
- **Omar**: Verify integrated latency and fallback reflect benchmark conditions. Deliver: reviews/a15-omar.md — Verify integrated latency and fallback reflect benchmark conditions.

### A16

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Package Reproducible AI Experiments and a Faculty Demo. Deliver: reviews/a16-amr.md — Source/provenance corrections and reviewed fixture IDs
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Package Reproducible AI Experiments and a Faculty Demo. Deliver: reviews/a16-omar.md — Contract compatibility notes and a consumer-side fixture check

### P02

- **Amr**: Supply AdvisoryRevision and source-revision fixtures from D01/D02; review source authority, vendor semantics, rights, missing and conflicting assertions. Retain separate runner/patch-execution contract review for C11/C12/C14. Deliver: reviews/p02-amr.md — Source/provenance corrections and reviewed fixture IDs
- **Shams**: Supply AssetObservation/inventory fixtures from the authorized collector; validate stable identity, OS/package fields, collected_at, stale/failed collection and missing evidence. Coordinate C03 definitions with Mahrous. Deliver: reviews/p02-shams.md — Reproducible observation evidence and failing edge cases
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Publish Shared API Contracts and Validate Producer/Consumer Fixtures. Deliver: reviews/p02-mahrous.md — Reviewed decision outcomes and blocking policy questions
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Publish Shared API Contracts and Validate Producer/Consumer Fixtures. Deliver: reviews/p02-hams.md — Reviewed question/answer or UX-state examples and evaluation notes

### P03

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Implement the Relational Schema, Migrations and Revision Links. Deliver: reviews/p03-amr.md — Source/provenance corrections and reviewed fixture IDs
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Implement the Relational Schema, Migrations and Revision Links. Deliver: reviews/p03-mahrous.md — Reviewed decision outcomes and blocking policy questions

### P05

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Build the Dashboard Shell With Real API States and Accessible Navigation. Deliver: reviews/p05-amr.md — Source/provenance corrections and reviewed fixture IDs
- **Hams**: Lead the UX design review against UX02; explain interactions and verify implemented uncertainty, evidence and approval states. Focus: Build the Dashboard Shell With Real API States and Accessible Navigation. Deliver: reviews/p05-hams.md — Design-fidelity review and prioritized usability corrections

### P06

- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Connect One Real Asset From Ingestion to a Traceable Finding Screen. Deliver: reviews/p06-shams.md — Reproducible observation evidence and failing edge cases
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Connect One Real Asset From Ingestion to a Traceable Finding Screen. Deliver: reviews/p06-mahrous.md — Reviewed decision outcomes and blocking policy questions

### P07

- **Amr**: Supply or replay the authorized execution fixtures and identify real lab constraints. Focus: Build the Durable Job Ledger & Test Dispatch Recovery. Deliver: reviews/p07-amr.md — Reproducible observation/runner evidence and failing edge cases
- **Shams**: Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance. Deliver: reviews/p07-shams.md — Reproducible asset observation evidence

### P08

- **Amr**: Supply or replay the authorized execution fixtures and identify real lab constraints. Focus: Authenticate Runners and Enforce Typed, Scoped Execution Envelopes. Deliver: reviews/p08-amr.md — Reproducible observation/runner evidence and failing edge cases
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Authenticate Runners and Enforce Typed, Scoped Execution Envelopes. Deliver: reviews/p08-mahrous.md — Reviewed decision outcomes and blocking policy questions
- **Shams**: Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance. Deliver: reviews/p08-shams.md — Reproducible asset observation evidence

### P09

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Expose Source Health, Freshness and Changed-Knowledge Views. Deliver: reviews/p09-amr.md — Source/provenance corrections and reviewed fixture IDs

### P10

- **Hams**: Supply A17/A11 schemas, qualified method report and uncertainty/evaluation requirements. Deliver: reviews/p10-hams.md — Supply A17/A11 schemas, qualified method report and uncertainty/evaluation requirements.
- **Mahrous**: Validate applicability/policy and approval boundaries in the displayed flow. Deliver: reviews/p10-mahrous.md — Validate applicability/policy and approval boundaries in the displayed flow.
- **Shams**: Provide reproducible input/failure fixtures for integration. Deliver: reviews/p10-shams.md — Provide reproducible input/failure fixtures for integration.

### P11

- **Hams**: Supply A17/A11 schemas, qualified method report and uncertainty/evaluation requirements. Deliver: reviews/p11-hams.md — Supply A17/A11 schemas, qualified method report and uncertainty/evaluation requirements.
- **Mahrous**: Validate applicability/policy and approval boundaries in the displayed flow. Deliver: reviews/p11-mahrous.md — Validate applicability/policy and approval boundaries in the displayed flow.
- **Shams**: Provide reproducible input/failure fixtures for integration. Deliver: reviews/p11-shams.md — Provide reproducible input/failure fixtures for integration.

### P16

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Measure Platform Performance & Package an Accessible Handover. Supply or replay the authorized execution fixtures and identify real lab constraints. Focus: Measure Platform Performance & Package an Accessible Handover. Deliver: reviews/p16-amr.md — Source/provenance corrections and reviewed fixture IDs; reviews/p16-amr.md — Reproducible observation/runner evidence and failing edge cases
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Measure Platform Performance & Package an Accessible Handover. Deliver: reviews/p16-mahrous.md — Reviewed decision outcomes and blocking policy questions
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Measure Platform Performance & Package an Accessible Handover. Deliver: reviews/p16-hams.md — Reviewed question/answer or UX-state examples and evaluation notes
- **Shams**: Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance. Deliver: reviews/p16-shams.md — Reproducible asset observation evidence

### UX01

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Research Analyst Decisions and Define the Narrow User Journey. Deliver: reviews/ux01-amr.md — Source/provenance corrections and reviewed fixture IDs
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Research Analyst Decisions and Define the Narrow User Journey. Deliver: reviews/ux01-mahrous.md — Reviewed decision outcomes and blocking policy questions
- **Omar**: Review implementation feasibility, map screens to actual API fields and accept the design handoff; implementation remains Omar-owned P05. Focus: Research Analyst Decisions and Define the Narrow User Journey. Deliver: reviews/ux01-omar.md — Signed frontend handoff and field/state compatibility notes
- **Shams**: Review analyst workflow, user-research findings and usability questions with Hams; this responsibility is independent of advisory ingestion. Deliver: reviews/ux01-shams.md — Workflow and usability review

### UX02

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Prototype Top-10 Triage, Evidence Review and Assistant States. Deliver: reviews/ux02-amr.md — Source/provenance corrections and reviewed fixture IDs
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Prototype Top-10 Triage, Evidence Review and Assistant States. Deliver: reviews/ux02-mahrous.md — Reviewed decision outcomes and blocking policy questions
- **Omar**: Review implementation feasibility, map screens to actual API fields and accept the design handoff; implementation remains Omar-owned P05. Focus: Prototype Top-10 Triage, Evidence Review and Assistant States. Deliver: reviews/ux02-omar.md — Signed frontend handoff and field/state compatibility notes

### UX03

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Test Analyst Task Completion and Hand Off UX Corrections. Deliver: reviews/ux03-amr.md — Source/provenance corrections and reviewed fixture IDs
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Test Analyst Task Completion and Hand Off UX Corrections. Deliver: reviews/ux03-mahrous.md — Reviewed decision outcomes and blocking policy questions
- **Omar**: Review implementation feasibility, map screens to actual API fields and accept the design handoff; implementation remains Omar-owned P05. Focus: Test Analyst Task Completion and Hand Off UX Corrections. Deliver: reviews/ux03-omar.md — Signed frontend handoff and field/state compatibility notes
- **Shams**: Review analyst workflow, user-research findings and usability questions with Hams; this responsibility is independent of advisory ingestion. Deliver: reviews/ux03-shams.md — Workflow and usability review

### D17

- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Normalize Fortinet Advisory Revisions for One FortiOS Profile. Deliver: reviews/d17-shams.md — Reproducible observation evidence and failing edge cases
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Normalize Fortinet Advisory Revisions for One FortiOS Profile. Deliver: reviews/d17-mahrous.md — Reviewed decision outcomes and blocking policy questions
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Normalize Fortinet Advisory Revisions for One FortiOS Profile. Deliver: reviews/d17-omar.md — Contract compatibility notes and a consumer-side fixture check

### P17

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Validate Disconnected Installation and Versioned Update Bundles. Supply or replay the authorized execution fixtures and identify real lab constraints. Focus: Validate Disconnected Installation and Versioned Update Bundles. Deliver: reviews/p17-amr.md — Source/provenance corrections and reviewed fixture IDs; reviews/p17-amr.md — Reproducible observation/runner evidence and failing edge cases
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Validate Disconnected Installation and Versioned Update Bundles. Deliver: reviews/p17-mahrous.md — Reviewed decision outcomes and blocking policy questions
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Validate Disconnected Installation and Versioned Update Bundles. Deliver: reviews/p17-hams.md — Reviewed question/answer or UX-state examples and evaluation notes
- **Shams**: Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance. Deliver: reviews/p17-shams.md — Reproducible asset observation evidence

### A17

- **Amr**: Research security factors with Mahrous, provide source-backed relevance cases and independently review ranking reasons. Deliver: reviews/a17-amr.md — Research security factors with Mahrous, provide source-backed relevance cases and independently review ranking reasons.
- **Mahrous**: Own D12 policy/hard constraints and applicability validation; adjudicate security ranking disagreements. Deliver: reviews/a17-mahrous.md — Own D12 policy/hard constraints and applicability validation; adjudicate security ranking disagreements.
- **Shams**: Assemble and validate the A02 experiment input bundle from existing feeds, asset evidence and reviewed context; disclose missing/stale/synthetic fields. Deliver: reviews/a17-shams.md — Assemble and validate the A02 experiment input bundle from existing feeds, asset evidence and reviewed context; disclose missing/stale/synthetic fields.
- **Omar**: Review ranking-result API contract, instrument cost/latency and integrate only qualified output with safe baseline fallback. Deliver: reviews/a17-omar.md — Review ranking-result API contract, instrument cost/latency and integrate only qualified output with safe baseline fallback.

## Labels and mirrored surfaces

Updated owner labels and owner/support filters; team cards; P02 review paths; prototype readiness/1 Nov/5 Nov labels and per-person instructions; all 71 coverage owner rows; source and observation handoffs; study-case and connection labels; source/discovery ADRs and risk stewards; scope rights/collection checklist; generated downloads and prepared CSV. Delivery dates remain planned historical dates and are not completion claims.

## Publication

Publish to the existing public Site project appgprj_6ac5d99b07908191a2b48d7a02dde585 using its source helper, save the exact pushed commit and static archive, then deploy that saved version. Preserve the public audience. No replacement Site should be created.