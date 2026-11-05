Ownership correction · 4 November 2026: Amr owns vulnerability/advisory data; Shams owns asset/inventory data. C02 lab and C11/C12/C14 patch execution remain Amr; C03 remains Mahrous; P02 remains Omar. Current task cards and responsibility map supersede historical owner references below.

# AI prioritization and remediation handoff — 29 October 2026

Hams Khaled is the confirmed primary owner of AI-Powered Prioritization. This document updates planning, not product implementation or task completion.

## Inspection findings

Existing D12 covered transparent policy ordering; D14/C09 vendor fix qualification; A11 constrained explanations; A13 evaluation; A15 final ablations; P10/P11 integration. Missing: a distinct, executable AI-ranking comparison with exact four-member handoffs. A17 fills that gap; no duplicate collectors, catalog or gateway.

## Responsibilities

| Package | Primary owner | Specific supporting contribution |
|---|---|---|
| D12 | Mahrous | Shams: Co-author threat/risk factors, review vendor/KEV/EPSS semantics and independently grade cases.; Hams: Define experiment-compatible input/output and relevance formats; compare candidate ranking against this frozen baseline. |
| A02 | Hams | Amr: Coordinate and assemble vulnerability, asset and contextual inputs; validate joins, timestamps, missingness and data readiness, reusing existing collectors.; Shams: Supply authoritative source revisions and review provenance/rights; no transfer of D01–D05 source ownership.; Mahrous: Supply applicability outcomes and reviewed business/policy scenario constraints from D09/D12.; Omar: Validate P02 identifiers, tenant scope and serialization for the experimental input bundle. |
| C05 | Amr | Mahrous: Verify applicability-relevant fields and authorized scope.; Hams: Specify ranking experiment fields and distinguish observed facts from scenario assumptions. |
| D14 | Shams | Mahrous: Validate applicability, residual risk and policy constraints.; Amr: Check real/lab asset evidence and practical preflight inputs; no FortiOS mutation implied.; Hams: Define retrieval-ready evidence spans and expected grounded guidance fields for A11. |
| A17 | Hams | Shams: Research security factors with Mahrous, provide source-backed relevance cases and independently review ranking reasons.; Mahrous: Own D12 policy/hard constraints and applicability validation; adjudicate security ranking disagreements.; Amr: Assemble and validate the A02 experiment input bundle from existing feeds, asset evidence and reviewed context; disclose missing/stale/synthetic fields.; Omar: Review ranking-result API contract, instrument cost/latency and integrate only qualified output with safe baseline fallback. |
| A11 | Hams | Shams: Provide D14 source-backed fixes/mitigations and validate every factual guidance claim.; Mahrous: Validate applicability, compatibility/policy limits, verification and security usefulness.; Amr: Prepare representative lab/vendor inputs and check prerequisite/verification practicality without executing unapproved actions.; Omar: Implement typed recommendation envelopes, citations, refusal states and approved-plan handoff using P11/P12. |
| A13 | Hams | Shams: Independently review security relevance and vendor-guidance factual correctness.; Mahrous: Co-define policy/safety rubric and adjudicate disagreements with documented reasons.; Amr: Freeze reproducible scenario inputs and identify unavailable/labelled synthetic evidence.; Omar: Instrument comparable latency, runtime failures and user-task timings without logging sensitive content. |
| A15 | Hams | Shams: Review source fidelity and security interpretation of gains.; Mahrous: Challenge policy violations and unsupported novelty/security claims.; Amr: Reproduce datasets and origin-stratified results.; Omar: Verify integrated latency and fallback reflect benchmark conditions. |
| P10 | Omar | Hams: Supply A17/A11 schemas, qualified method report and uncertainty/evaluation requirements.; Mahrous: Validate applicability/policy and approval boundaries in the displayed flow.; Amr: Provide reproducible input/failure fixtures for integration. |
| P11 | Omar | Hams: Supply A17/A11 schemas, qualified method report and uncertainty/evaluation requirements.; Mahrous: Validate applicability/policy and approval boundaries in the displayed flow.; Amr: Provide reproducible input/failure fixtures for integration. |

## Outputs and acceptance

A17: research comparison; immutable input/output schema; offline rule/AI/hybrid harness; rank-quality/stability/safety/resource/time benchmark; evidence-based recommended approach and reproduction README. A11: RAG/template comparison, claim-to-source ledger, unsupported-version/command rejection and usefulness report. A13 freezes the rubric, safety gates and thresholds before final comparison. No numerical gain is claimed before results.

## Dependency order

Data manifests and existing source/asset collection, D12 policy and D14 catalog preparation can overlap. A17 experiment runs require D12, A03, A04, D15, D14 and A13. A13 itself waits for existing evaluation prerequisites; drafting literature comparisons is allowed before experimental inputs are ready. A11 reuses A10/D14/C10; P10/P11 prototype typed interfaces in parallel. A15 consolidates A17 and A11 results; A16 is final evidence handoff.

## Scope

MVP: qualified Ubuntu lab execution and conditional FortiOS evidence/guidance, transparent baseline, one low-resource AI candidate and hybrid comparison. Preserve baseline fallback if AI fails evaluation. Future: broader vendor/customer profiles, more data-dependent ranking, scaling; no current fine-tuning or automatic FortiOS firmware execution.

## Unresolved

Exact AI ranker/model; adequate reviewed ranking data; agreed relevance grades and success margins; representative scenario count; actual hardware/latency/cost; vendor upgrade-path evidence; customer-context access. Package research questions retain these explicitly.

## Evidence boundaries

Reused existing FIRST/CISA/vendor and AI research. FIRST EPSS FAQ rechecked 29 October: EPSS omits organization-specific context. Fortinet official pages returned 403 on the targeted recheck; retained MR06/MR08 references are not represented as newly verified advisories. Each real advisory and fixed/upgrade claim must be preserved and validated in D14/A11. No real CVE/version assertion is fabricated in this update.

## Plan changes

Original IDs/owners and prerequisite edges retained. New A17; A15 adds A17 dependency; reverse links and incompatible parallel candidates refreshed. Modified existing package records: D12, D14, D15, C05, A02, A03, A04, A11, A13, A15, P10, P11. Only nine existing guides have new execution content; remaining changes are graph reverse-link bookkeeping.
