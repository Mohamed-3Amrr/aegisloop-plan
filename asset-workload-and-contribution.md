# Asset workload and contribution plan

Updated: 6 November 2026. Owner: Shams. New work is planned; no implementation or measured benefit is claimed.

## Workload comparison
Provisional relative scope units, not measured hours or velocity. 3=bounded research/contract; 4=adapter/component; 5=cross-module component with failures; 6=complex qualification/integration; 7=multiple failure/replay paths and experiments; 8=algorithm/cost study with safety gates. Research, implementation, own testing and handoff are included once. Supporting work is not counted as full owned packages; reviewer availability remains unmeasured.

Treat estimates as a broad planning range (roughly ±25%), not a promise of equal hours. Re-estimate after C03/C05 spikes and the first new component; do not activate every package at once.

| Owner | Owned packages | Current-core packages | Core effort units | All-scope units |
|---|---:|---:|---:|---:|
| Hams | 17 | 14 | 65 | 81 |
| Omar | 19 | 18 | 91 | 97 |
| Shams | 13 | 10 | 61 | 76 |
| Amr | 17 | 13 | 63 | 81 |
| Mahrous | 12 | 11 | 60 | 65 |

Mean: 68.0 current-core units; 80.0 all-scope units. Shams: 61 current-core units (-10.3% from mean); 76 all-scope units (-5.0% from mean).

Omar remains above the provisional team mean. This change brings Shams near the typical/mean owned scope; it does not prove the whole team is balanced or silently transfer Omar’s work.

These are coarse scope estimates. Actual hours, individual availability, skills and supporting-review time are unmeasured. Count research, implementation and testing once; recalibrate from delivered work rather than claiming equal hours.

## Staged activation

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

## Ownership boundaries

### C17 — Reconcile Asset Identities With Reviewable Conflict Decisions
Implement a deterministic resolver for enrolled host identities across observation sources, IP reuse and rebuilds. Preserve ambiguous identities as separate candidates with reviewable reasons.

C03 defines observation fields and identity rules; C17 implements their cross-snapshot resolution. D08 continues to normalize product identities and generate matching candidates. P03/P04 retain storage and authorization.

Relative effort: 7/8. Prerequisites: C03, C05, P02. Layer: Current core.

### C18 — Build Immutable Asset Snapshot Deltas and Replayable Change Evidence
Produce field-level asset changes from immutable observations, with explicit collection completeness and ordering, so consumers can distinguish a real removal from failed collection.

C05/C07 collect or import observations; C18 computes inventory-only deltas. D13 retains impact analysis, reassessment scheduling and cache invalidation. P03 retains persistence.

Relative effort: 6/8. Prerequisites: C17, C05. Layer: Current core.

### C19 — Evaluate Asset Evidence Freshness, Completeness and Conflicts Per Field
Implement a versioned, explainable asset-evidence policy that reports which fields are usable, stale, missing or conflicting at an explicit evaluation time.

Collectors retain timestamps/errors and C07 preserves import age. C19 evaluates those facts across observations; it does not score vulnerabilities, change D09 applicability or replace P09 advisory-source health.

Relative effort: 6/8. Prerequisites: C18, C03. Layer: Current core.

### C20 — Plan the Smallest Approved Collection Needed to Resolve Asset Evidence Gaps
Map structured missing asset-field keys to approved read-only collection probes and choose a bounded plan under a declared cost/budget, with a reason for each requested fact.

D08/D09 own product matching and gap identification. Hams’s A11 owns assistant-generated requests/explanations. C20 owns deterministic gap-to-approved-probe planning; P08 validates execution envelopes and Amr retains advisory collectors and patch runners.

Relative effort: 8/8. Prerequisites: C19, D08, P08. Layer: Current core.

### C21 — Plan Bounded Asset Collection Campaigns With Backpressure and Recovery
Build asset-domain campaign planning for bounded batches, per-target limits, backoff and resumable progress while delegating durable dispatch and authentication to the existing platform.

Omar’s P07 owns durable job/attempt state and recovery; P08 owns runner authentication/envelopes. C21 builds collection intents and the asset-specific eligibility/rate policy, not a second queue or executor.

Relative effort: 7/8. Prerequisites: C20, P07, P08, C04. Layer: Current core.

### C22 — Benchmark Asset Evidence Quality and Ablate Adaptive Collection Benefits
Build a reproducible asset-only benchmark testing identity, change fidelity, evidence quality and bounded recollection, including whether their combined workflow earns a measurable benefit.

D15 remains Mahrous’s matching/CVE ground-truth benchmark; C16 remains the end-to-end remediation/SIEM demo. C22 labels asset facts and collection outcomes, not vulnerability applicability or AI ranking.

Relative effort: 7/8. Prerequisites: C17, C18, C19, C20, C21, C13. Layer: Current core.

### C23 — Qualify Observed Asset–Service Relationships Without Invented Dependencies
Research and prototype a provenance-backed asset/package/service relationship view using available observations, while exposing missing coverage and separating observed edges from hypotheses.

Shams owns observed asset relationships. D12 retains risk/prioritization and business-impact policy; Hams retains AI interpretation and UX02 design. No automatic network expansion or inferred business criticality is authorized.

Relative effort: 7/8. Prerequisites: C18, C19, C22. Layer: Conditional experiment.

## Differentiation hypothesis
Combining reviewable identity, partial-aware deltas and field-level freshness with bounded evidence-gap collection may reduce collection cost while preserving reviewed asset decision quality.

C22 compares full refresh, fixed rules and the combined method with ablations under the same cases/budgets; publish unsupported and negative findings.

- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

## Task-by-task provisional effort
- **D01 / Amr**: 6 units — Validate Core Vulnerability Sources & Build the First Ingestion Prototype (Current core).
- **D02 / Amr**: 4 units — Define and Validate the Canonical Vulnerability Schema (Current core).
- **D03 / Amr**: 5 units — Build Bulk CVE Ingestion and Incremental Update Processing (Current core).
- **D04 / Amr**: 4 units — Add NVD Enrichment Without Blocking CVE Availability (Current core).
- **D05 / Amr**: 5 units — Build the Ubuntu Affected-and-Fixed Package Catalog (Current core).
- **D06 / Amr**: 4 units — Validate Microsoft and Red Hat Data & Add Scoped Vendor Adapters (Deferred extension).
- **D07 / Amr**: 4 units — Ingest Package Advisories That May Have No CVE (Deferred extension).
- **D08 / Mahrous**: 6 units — Normalize Asset Product Identities & Generate Matching Candidates (Current core).
- **D09 / Mahrous**: 7 units — Implement Vendor-Aware Applicability Rules & Decision Traces (Current core).
- **D10 / Mahrous**: 5 units — Validate SBOM and VEX Evidence Before Using It in Assessments (Deferred extension).
- **D11 / Amr**: 4 units — Import Dated KEV and EPSS Signals & Preserve Missing Values (Current core).
- **D12 / Mahrous**: 6 units — Implement Explainable Priority Bands Using Asset Context (Current core).
- **D13 / Mahrous**: 6 units — Trigger Targeted Reassessment and Invalidate Stale Answers (Current core).
- **D14 / Amr**: 5 units — Build a Versioned Catalog of Vendor Fixes and Mitigations (Current core).
- **D15 / Mahrous**: 6 units — Create Independent Matching Ground Truth & Measure Errors (Current core).
- **D16 / Amr**: 5 units — Measure CVE Freshness & Rehearse Source Outage Recovery (Current core).
- **C01 / Mahrous**: 3 units — Define Allowed Lab Targets & Enforce Scan Safety Rules (Current core).
- **C02 / Amr**: 4 units — Build a Reproducible Lab & Verify Baseline Restoration (Current core).
- **C03 / Shams**: 5 units — Define Asset Observation Fields & Validate Stable Identity (Current core).
- **C04 / Shams**: 4 units — Implement Bounded Network Discovery & Parse Structured Results (Current core).
- **C05 / Shams**: 5 units — Collect Ubuntu OS and Package Evidence Through Authenticated SSH (Current core).
- **C06 / Shams**: 4 units — Compare Windows Inventory Options & Implement One Adapter (Deferred extension).
- **C07 / Shams**: 4 units — Import Offline and Appliance Evidence With Freshness Labels (Conditional FortiOS profile).
- **C08 / Mahrous**: 5 units — Integrate the Applicability Engine & Review Its Evidence Traces (Current core).
- **C09 / Amr**: 5 units — Validate Patch Catalog Candidates Against Execution Prerequisites (Current core).
- **C10 / Mahrous**: 5 units — Build Version-Bound Patch Plans & Enforce Approval Policy (Current core).
- **C11 / Amr**: 6 units — Implement an Approved Ubuntu Patch Pilot Runner (Current core).
- **C12 / Amr**: 5 units — Handle Reboots, Reconnects and Partial Patch Failures (Current core).
- **C13 / Shams**: 6 units — Verify Remediation Independently & Rehearse Recovery (Current core).
- **C14 / Amr**: 5 units — Validate Windows Updates and Reboot Recovery Before Adding Execution (Deferred extension).
- **C15 / Mahrous**: 4 units — Send Lifecycle Events to Wazuh & Verify Decoding and Correlation (Current core).
- **C16 / Mahrous**: 6 units — Publish Supported-Coverage Results & Reproduce the End-to-End Demo (Current core).
- **A01 / Hams**: 3 units — Define AI Tasks, Label Rules and Reviewed Examples (Current core).
- **A02 / Hams**: 5 units — Create Versioned Training and Evidence Datasets With Provenance (Current core).
- **A03 / Hams**: 4 units — Clean Advisory Text & Freeze Leakage-Safe Dataset Splits (Current core).
- **A04 / Hams**: 5 units — Train CPU Classification Baselines & Report Per-Label Errors (Current core).
- **A05 / Hams**: 4 units — Review Label Disagreements & Test a Stronger Classifier Only if Justified (Conditional experiment).
- **A06 / Hams**: 5 units — Build Revision-Aware Retrieval Chunks With Source Metadata (Current core).
- **A07 / Hams**: 5 units — Benchmark Exact, Lexical and Multilingual Hybrid Retrieval (Current core).
- **A08 / Hams**: 4 units — Test Reranking Against Measured Retrieval Errors (Conditional experiment).
- **A09 / Hams**: 5 units — Benchmark Candidate LLMs on Project Questions and Available Hardware (Current core).
- **A10 / Omar**: 6 units — Integrate the Assistant With Typed Read-Only Tools and Citations (Current core).
- **A11 / Hams**: 6 units — Generate Targeted Evidence Requests & Compare Constrained Fix Options (Current core).
- **A12 / Mahrous**: 6 units — Test Prompt Injection, Permissions and Unsupported Assistant Actions (Current core).
- **A13 / Hams**: 6 units — Freeze Human Evaluation Questions, Rubrics and Final Holdout (Current core).
- **A14 / Omar**: 5 units — Invalidate AI Caches on Evidence Changes & Track Model Operations (Current core).
- **A15 / Hams**: 6 units — Run Contribution Ablations & Compare Competitor Capabilities Fairly (Current core).
- **A16 / Hams**: 4 units — Package Reproducible AI Experiments and a Faculty Demo (Current core).
- **P01 / Omar**: 4 units — Validate Team Skills and Hardware & Prove the Backend Candidate (Current core).
- **P02 / Omar**: 5 units — Publish Shared API Contracts and Validate Producer/Consumer Fixtures (Current core).
- **P03 / Omar**: 5 units — Implement the Relational Schema, Migrations and Revision Links (Current core).
- **P04 / Omar**: 6 units — Implement Login, Revocation and Object-Level Role Permissions (Current core).
- **P05 / Omar**: 4 units — Build the Dashboard Shell With Real API States and Accessible Navigation (Current core).
- **P06 / Omar**: 5 units — Connect One Real Asset From Ingestion to a Traceable Finding Screen (Current core).
- **P07 / Omar**: 6 units — Build the Durable Job Ledger & Test Dispatch Recovery (Current core).
- **P08 / Omar**: 6 units — Authenticate Runners and Enforce Typed, Scoped Execution Envelopes (Current core).
- **P09 / Omar**: 3 units — Expose Source Health, Freshness and Changed-Knowledge Views (Current core).
- **P10 / Omar**: 5 units — Build Finding Triage With Priority Reasons and Evidence History (Current core).
- **P11 / Omar**: 5 units — Expose One Permission-Scoped AI Gateway With Safe Fallbacks (Current core).
- **P12 / Omar**: 5 units — Implement Patch Campaign States, Approval Binding and Progress Views (Current core).
- **P13 / Omar**: 4 units — Deliver Versioned SIEM Events Through a Retryable Outbox (Current core).
- **P14 / Omar**: 6 units — Plan Hosting, Deploy the Minimal Stack & Prove Recovery (Current core).
- **P15 / Omar**: 6 units — Run Cross-Module Security and Failure-Mode Release Tests (Current core).
- **P16 / Omar**: 5 units — Measure Platform Performance & Package an Accessible Handover (Current core).
- **UX01 / Hams**: 3 units — Research Analyst Decisions and Define the Narrow User Journey (Current core).
- **UX02 / Hams**: 4 units — Prototype Top-10 Triage, Evidence Review and Assistant States (Current core).
- **UX03 / Hams**: 4 units — Test Analyst Task Completion and Hand Off UX Corrections (Current core).
- **D17 / Amr**: 5 units — Normalize Fortinet Advisory Revisions for One FortiOS Profile (Conditional FortiOS profile).
- **D18 / Amr**: 5 units — Qualify Tool Trust, Data Rights and Deployment Constraints (Current core).
- **P17 / Omar**: 6 units — Validate Disconnected Installation and Versioned Update Bundles (Product milestone).
- **A17 / Hams**: 8 units — Compare Rule-Based, AI-Assisted and Hybrid Prioritization on Reviewed Organization Scenarios (Conditional experiment).
- **C17 / Shams**: 7 units — Reconcile Asset Identities With Reviewable Conflict Decisions (Current core).
- **C18 / Shams**: 6 units — Build Immutable Asset Snapshot Deltas and Replayable Change Evidence (Current core).
- **C19 / Shams**: 6 units — Evaluate Asset Evidence Freshness, Completeness and Conflicts Per Field (Current core).
- **C20 / Shams**: 8 units — Plan the Smallest Approved Collection Needed to Resolve Asset Evidence Gaps (Current core).
- **C21 / Shams**: 7 units — Plan Bounded Asset Collection Campaigns With Backpressure and Recovery (Current core).
- **C22 / Shams**: 7 units — Benchmark Asset Evidence Quality and Ablate Adaptive Collection Benefits (Current core).
- **C23 / Shams**: 7 units — Qualify Observed Asset–Service Relationships Without Invented Dependencies (Conditional experiment).
