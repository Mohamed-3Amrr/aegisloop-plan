Ownership correction · 4 November 2026: Amr owns vulnerability/advisory data; Shams owns asset/inventory data. C02 lab and C11/C12/C14 patch execution remain Amr; C03 remains Mahrous; P02 remains Omar. Current task cards and responsibility map supersede historical owner references below.

# Scope revision — evidence, alternatives and execution gates

Revision 2026-10-23.r2 applies the 22 October meeting and the later on-prem correction. The original five research chapters and 97 source entries remain available with their original dates. This chapter adds targeted evidence; it does not claim new experiments or customer interviews have happened.

## What is confirmed, proposed and unknown

**Confirmed team requirements:** Hams leads UI/UX research/design as well as AI; Omar implements the frontend/platform. Each person needs owned work and supporting work separately. On-prem is a required long-term product direction, with enabling foundations now. The current request authorizes editing the planning site, not creating or updating ClickUp tickets.

**Recommended delivery scope:** IT infrastructure supporting industrial operations: one qualified Ubuntu release for real lab remediation, plus a conditional FortiOS advisory/import profile for matching and reviewed recommendations. This is a project recommendation, not proven customer fit, a signed customer contract or permission to access an industrial company. Actual hardware, installation access, budget, model quality and existing work progress remain unknown.

**Unsupported claim:** the meeting's “90% caused by people” is not research evidence. Do not repeat it as a fact, use it as a label, or equate recurring findings with employee fault.

## Scope comparison and restrictions

| Option | Practical advantage | Main implementation burden | Decision |
|---|---|---|---|
| General enterprise IT | Broad need and several public sources | Multiple OS/package/version, collection and update semantics | Preserve extension work; do not commit all profiles now |
| Network appliances only | Clear vendor advisory and upgrade decision problem | Model/train/config evidence, hardware access, entitlement and recovery | Qualify one recommendation-only FortiOS profile |
| IT supporting industrial operations | Can demonstrate a real Ubuntu lifecycle with maintenance/business context | Customer-fit hypothesis and accurate scope wording | Recommended next release |
| Direct OT | Potential specialist value | Safety, reliability, protocols, equipment and vendor qualification | Separate future gate; no generic probing or firmware execution |

NIST SP 800-82 Rev. 3 addresses OT's distinct operational constraints. Its publication page currently points to an initial draft of Revision 4; that draft is not substituted for the final baseline. Our scope recommendation follows from these constraints plus the team's resources; NIST does not endorse our chosen product segment. [MR05]

A device does not need internet exposure to be assessed. A local runner still needs authorized reachability, a supported protocol, sufficient credentials and reliable identity/version/configuration evidence. Fragile or isolated equipment may permit only a vendor-approved export or manual evidence. An import cannot create missing configuration facts: its timestamp, origin and unknown fields must remain visible. Discovery, inventory, assessment, recommendation and execution are separate capabilities. See C01/C03/C07 and the profile matrix.

## Fortinet profile: a feasibility gate, not a new patch engine

Fortinet's official feed guide distinguishes PSIRT advisories and public RSS from support-login bulletins and firmware downloads. The PSIRT interface contains product/version advisories and the vendor provides an upgrade-path tool. Endpoint availability and commercial redistribution rights still need D17/D18 validation. A publicly readable page is not automatically a licensed product feed. [MR06] [MR07] [MR08]

D17 should retrieve a small reproducible sample, retain revisions, and qualify structured CSAF access when available. If retrieval is blocked, preserve a documented manual-review route without bypassing access restrictions. RSS discovery alone cannot prove that every advisory revision was collected. Record advisory ID, product/train, affected ranges, configuration prerequisites, fixed-branch assertions and one-to-many CVE links.

A fixed release listed in an advisory is distinct from a safe end-to-end upgrade path. Hardware support, release notes, prerequisites, maintenance window, backup and tested intermediate steps still matter. Never interpret “fixed in X” as “jump directly to latest.” The current profile produces reviewed recommendations, not automatic FortiOS firmware execution. Do not promote unverified version examples from earlier notes into gold labels. D14 remains the single remediation catalog; D09 remains the single applicability engine.

## Top ten: compare units before ranking

| Unit | Useful for | Failure mode |
|---|---|---|
| Unique CVEs | Source-level awareness and threat trend views | Hides affected asset count and actual work |
| Asset–vulnerability findings | Evidence and per-asset applicability | Many findings may share one compatible fix |
| Grouped remediation actions | Analyst execution queue | Unsafe if grouping crosses incompatible versions, windows or policy |

Use up to ten eligible compatible actions as the primary queue, with per-finding and CVE drill-down. This is a design recommendation. D12 must define grouping keys, eligibility, deterministic tie-breaking and reason codes. Keep unknown applicability, missing context, no-patch and maintenance-blocked states visible. Do not turn a policy score into a calibrated probability of compromise. Existing KEV, EPSS and CVSS research still governs their different meanings.

A15 compares CVSS-only, explained policy and grouped-action views on the same frozen cases. Use independently reviewed ranking judgments, justify relevance labels before using precision@10 or nDCG@10, and report duplicate workload, unsafe actions, missed urgent cases and analyst task time. Do not claim a market-leading result from a small lab or an incomparable competitor trial.

Recurrence must distinguish an unchanged observation, evidence aging, an advisory correction, reopening after verified closure and actual confirmed drift. A root-cause hypothesis requires a reviewer and supporting evidence before becoming confirmed. A repeated CVE alone does not prove the cause, and synthetic histories are not customer incident evidence. L&D or game mechanics remain future intervention hypotheses.

## AI: organization context without a foundation-model project

The retained design combines structured facts, governed retrieval and constrained generation. The database holds source assertions, assets, assessments, ranking policy and live lifecycle state. Derived retrieval indexes contain source text and scoped explanatory documents, with links back to versions. Current object-level facts come through authorized tools. Organization context includes owner, criticality, exposure, policy revision, maintenance restrictions and recorded history. Missing fields stay missing; they are not inferred from CVE prose.

The SecBERT publisher presents a cybersecurity BERT model. It can be evaluated as an encoder/classification candidate with an appropriate task head; it is not a drop-in conversational model. Exact artifact/license and a fair downstream benchmark are A05/D18 gates. [MR10]

“API” describes an interface, not who hosts it. An internal on-prem inference service can expose an API. Some hosted model services support supervised tuning, so the blanket statement “an API model cannot be trained” is incorrect. No hosted provider or tuned model is selected by this correction. Current knowledge is handled through ingestion, retrieval and tools; fine-tuning needs a separate justified task, rights-cleared labels, cost/privacy review and measured benefit. [MR11]

The assistant workflow authorizes scope, reads facts, retrieves permitted evidence, drafts or abstains, validates support and returns a cited answer. Applicability, priority policy, approval and dispatch remain outside model authority. Begin with explicit typed application state and the existing durable job boundary. LangGraph offers persistence and human oversight and can work without LangChain; adopt it only if the required resume/state behavior justifies the extra integration and maintenance burden. No cloud tracing service is implied. [MR09]

Model outage must degrade to cited deterministic cards/templates. Source outage uses a visibly stale trusted snapshot. Neither authorizes silently forwarding organization data to a different provider.

## Data plan and realistic gaps

| Need | Preferred evidence | Honest limitation |
|---|---|---|
| Vulnerability assertions | Official CVE and vendor records, NVD enrichment | No source proves all installed assets are affected |
| Threat signals | Retained KEV/EPSS integrations | Signals are dated and have distinct meanings |
| Asset behavior and repairs | Authorized real lab observations before/after mutation | Lab results are not production reliability statistics |
| Organization context | Consented policies/inventory if available | Public sources do not supply this organization's current context |
| Controlled context scenarios | Explicitly synthetic policies/assets/histories | Useful fixtures, not real-world performance evidence |
| Ranking/answer labels | Reviewed independent judgments with disagreement recorded | No universal public organization-specific ranking ground truth |

A02 records origin, source/rights, revision, hashes and split. A03 groups duplicates/revisions before splitting. D15 uses reviewed expected outcomes independent of the evaluated rules/model. Kaggle may point to a candidate dataset but is not a source guarantee; audit upstream provenance, license, duplication, schema and representativeness. LLM-generated CVEs or fixed versions must never replace authoritative assertions. Report real-record, real-lab and synthetic-scenario denominators separately.

## On-prem: how and when

On-prem is a required product direction, not the fallback if cloud fails. Design for it now and qualify it in stages. Some customers accept cloud; a universal “companies reject cloud/APIs” claim is unsupported. Deployment and procurement requirements must be elicited for the intended customers.

| Approach | Fits | Costs / risks | Project position |
|---|---|---|---|
| Cloud app + approved external inference | Fast shared demos where privacy/terms permit | Recurring cost, egress, retention, network dependence | Optional deployment, no provider chosen |
| Customer-hosted core + approved external inference | Keeps core storage local when policy permits inference egress | Still not disconnected or fully local | Explicit hybrid capability profile only |
| Connected on-prem + local inference | Local data/model boundary with controlled updates | Hardware, operators, backups and model quality | First product qualification milestone |
| Disconnected on-prem | Environments needing no runtime public egress | Bundle supply chain, freshness, packages and lifecycle cost | Required staged direction; qualify after connected profile |

Docker documents single-server Compose deployment with environment-specific overrides. This supports extending the retained deployment approach; it does not establish high availability, secure customer operation or any minimum hardware figure. [MR02]

Ollama provides a local-runtime route with networking/cloud controls. Hams must benchmark the actual model, context, concurrency and hardware, disable cloud features for the local profile, and test outbound behavior. A local model alone does not make the entire application offline: embeddings, tokenizer downloads, identity, telemetry, source sync, package repositories and fonts can still depend on the network. [MR01]

1. **G0–G1 foundations — P01/P02/D18/A06/P11.** Measure available hosts. Version domain/context contracts and provider/update adapters. Keep database/evidence local-capable; separate configuration, credentials and artifact locations from domain logic. Inventory enabled dependencies and egress. Do not introduce Kubernetes or a second control plane simply to anticipate scale.
2. **G2 connected on-prem — P14/A09.** Install the qualified core plus local inference on a measured lab/customer-like host. Use private service networking and an isolated runner. Test local identity, secret rotation, restart, approved update routes and consistent database/evidence restore. Record exact capacity and disabled capabilities.
3. **G3 disconnected — P17.** Stage trusted versioned artifacts on a connected machine. Export images, models/tokenizers, embeddings, source snapshots, config templates, migrations and notices. Supply secrets separately. Import on a clean compatible host with public egress blocked. Test enabled workflows, tampered/incompatible bundles and recovery. A disabled assistant is a labelled degraded mode, not a full-AI offline pass.
4. **After pilot, customer qualification.** Validate required SSO/PKI, retention, update cadence, incident/support process, sizing and availability. Multi-host/HA deployment is a separate measured requirement. No dates or customer approvals are fabricated.

Docker image save/load moves images; data/model volumes need separate handling. Checksums detect alteration relative to a trusted manifest but do not establish who produced it. Before the disconnected release, qualify offline-verifiable publisher authentication or a documented trusted transfer process and key handling. [MR03] [MR04]

A disconnected system cannot guarantee upstream publication-to-usable freshness while no update enters it. Show source as-of/import age and overdue update warnings. Offline patching additionally needs approved available package content, metadata and dependencies; a local CVE snapshot does not provide those packages. Preserve the connected 24-hour proposal target with a clear deployment-mode denominator.

There is no promise of “never change the base.” Stable contracts, adapters, capability flags, fixture compatibility and versioned migrations reduce avoidable rewrites while allowing necessary evolution.

## Team and ticket handoff

Hams sequences UX01/A01, dataset provenance/splits, then the minimum UX02 handoff, CPU baseline and scoped corpus according to weekly capacity. A07/A09 come after their inputs; stronger classifiers and rerankers remain conditional. Omar builds the fixture shell during design research, then implements the reviewed P05 flow. UX03 tests the implementation and produces correction issues.

Before ticket import, reconcile actual existing artifacts against one scope/schema/fixture manifest. Mahrous and Hams agree on applicability outputs, user questions and organization-context fields; Omar validates contract consumption, Shams provenance/rights and Amr collection feasibility. If work is missing or incompatible, record the exact gap and owner. The website does not know Mohamed's completion state. The CSV is prepared guidance with full execution descriptions and links; nothing is synchronized or sent to ClickUp by this update.

## Architecture challenge and early cautions

| Failure scenario | Early experiment / response | Owner / package |
|---|---|---|
| Scope drift makes AI consume different verdicts | Reconcile one case against the shared manifest before model work | Mahrous + Hams / P02 |
| Hams is overloaded by UX and AI | Limit simultaneous work; minimal design handoff and CPU baseline first | Hams / UX01–03, A04 |
| Fortinet feed/terms cannot be qualified | Small sample gate before a broad adapter commitment; retain Ubuntu core | Shams / D17/D18 |
| Grouping hides an incompatible upgrade | Constraint fixtures and reviewed grouping outputs | Mahrous / D12 |
| Root-cause narrative becomes unsupported blame | Separate hypotheses and confirmed causes with evidence | Mahrous / D13; Hams / A11 |
| Local model exceeds hardware | Early measured A09 domain/context/concurrency spike | Hams + Omar / A09/P01 |
| “Offline” startup fetches a hidden dependency | Clean-host blocked-egress install and endpoint log review | Omar / P17 |
| Update breaks database/evidence links | Versioned compatibility gate, backup and replay/restore test | Omar / P14/P17 |
| Public data is treated as commercially redistributable | Tool/data/model rights matrix before relevant release | Shams / D18 |
| UI looks finished but misleads on approval/unknown | Frozen tasks, observed decisions and exception-state review | Hams + Omar / UX02/UX03 |

These risks extend the retained register. They are qualitative planning concerns, not measured incident probabilities. New hard dependency UX02 → P05 gates the finished UI handoff; shell exploration can run earlier. D17 does not block the Ubuntu engine. P17 qualifies a later deployment capability and does not block the first real lab slice. Other existing engine/catalog/gateway ownership boundaries remain intact.
