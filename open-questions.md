# AegisLoop — Open Questions

Keep unresolved questions visible without presenting meeting notes as approved architecture, live blockers or task progress. Discussion stewards coordinate answers; primary package ownership and dependencies are unchanged.

Recorded: 2026-10-24

## Current directions

### Product identity

An integrated vulnerability-to-remediation platform: evidence collection, applicability, categorization, policy-aware prioritization, reviewed remediation, controlled execution and verification. Chat is an assisting interaction within the platform.

### Current AI scope

No fine-tuning in the current implementation. Retain retrieval, reviewed organization context, current structured facts, baseline classification and evaluation. Training a baseline classifier is distinct from fine-tuning pretrained weights.

### Long-term company direction

Build toward a sustainable startup, with staged on-prem capability. Revisit expensive capabilities when evidence, customer requirements and business value justify their full delivery and maintenance costs.

### Future fine-tuning

Not prohibited forever and not scheduled now. OQ01 records the decision gates and preparation needed before any future experiment. Company size alone does not decide suitability.

## OQ01 — When would fine-tuning earn its cost?

**Type:** Needs Research

**Discussion steward:** Hams

Deferred capability, not current execution. Distinguish classifier adaptation from generative-model adaptation.

### Questions

- Which repeated failure remains after fixing labels, retrieval, prompts and tools?
- What exact task, eligible model and legally usable reviewed dataset would be needed?
- How would identical held-out evaluations prove added value, safety and absence of leakage?
- What RAM/GPU, training time, total cost, model-serving capacity and specialist skills are required?
- How would we version data/weights, reproduce runs, evaluate regressions, deploy, roll back and maintain a tuned model on-prem?
- Could a smaller model, frozen encoder or improved workflow meet the same requirement more economically?

**Closure evidence:** A scoped proposal comparing alternatives and measured baseline failures; data/rights review; resource estimate; reproducible experiment and release/rollback/evaluation plan. No training until the proposal is accepted.

**When:** Future capability review only; no new blocker for the current release.

**Existing packages:** A04, A05, A09, A13, D18, P17

## OQ02 — Which product views best support each user action?

**Type:** Needs Decision

**Discussion steward:** Hams

Platform identity is settled. The balance of action queues, asset/evidence pages, approvals and conversational assistance still needs user validation.

### Questions

- Which role needs an asset view, priority queue, evidence drill-down, approval screen or chat at each step?
- Can a user identify a priority, inspect its reason, review a plan and verify the result without relying on a conversation transcript?
- Where does a cited conversational interaction reduce effort compared with structured controls?

**Closure evidence:** A reviewed end-to-end UX prototype and usability findings; Hams leads research/design and Omar implements the accepted states. No assumption that the product is a standalone chatbot.

**When:** Resolve interaction details through UX01/UX02 before P05 implementation.

**Existing packages:** UX01, UX02, UX03, P05, P10, P11, P12

## OQ03 — Who has the strongest initial pain and buying reason?

**Type:** Needs Research

**Discussion steward:** Shams

The industrial-support IT profile is a proposed focus, not proven product-market fit.

### Questions

- Who performs triage and patch approval, and who buys the product?
- What volume, delay or repeated manual work can they demonstrate?
- Which existing tools and policies constrain them?
- What measurable outcome would justify adoption or payment?

**Closure evidence:** Recorded customer discovery with permitted evidence, competing-workflow comparison and explicit assumptions; no demand or superiority claim without evidence.

**When:** Before committing a customer pilot or expanding scope.

**Existing packages:** C01, D12, D18, A15, UX01

## OQ04 — Which exact releases and appliance profiles will we qualify?

**Type:** Needs Decision

**Discussion steward:** Mahrous

Keep the narrowed Ubuntu lab path and conditional FortiOS evidence scope. Broad OT scanning or firmware execution is not implied.

### Questions

- Which exact Ubuntu release and package fixtures can we reproduce?
- Which FortiOS model/train has adequate authorized evidence, advisory semantics and supported upgrade guidance?
- What stays unknown, manual or unsupported?

**Closure evidence:** An explicit supported-profile matrix with capability-specific fixtures and limits, reviewed against the existing qualification gates.

**When:** Before profile-specific claims; Ubuntu qualification does not wait for FortiOS.

**Existing packages:** C01, C03, C07, D09, D17

## OQ05 — What real organizational data can we legally access?

**Type:** Needs Research

**Discussion steward:** Shams

Public vulnerability records are real data but do not provide a real customer inventory or policies. Synthetic scenarios stay labelled. Amr reviews advisory-source rights; Shams reviews asset-data access and collection feasibility.

### Questions

- Can Iskraemeco or another partner provide written, scoped access to inventories, configurations or reviewed policies?
- What minimization, de-identification, permissions, retention and publication restrictions apply?
- What can the prototype, MVP and pilot honestly demonstrate with their available data?

**Closure evidence:** A data-access agreement or recorded refusal/unknown, provenance manifest and stage-specific dataset plan; proceed with public records plus declared lab/synthetic fixtures when access is absent.

**When:** Before importing customer material or claiming real-customer evaluation.

**Existing packages:** A02, A03, D15, D18, P02

## OQ06 — What hardware and GPU access are actually available?

**Type:** Needs Research

**Discussion steward:** Omar

No sponsor, Iskraemeco GPU capacity or hardware commitment is assumed.

### Questions

- What CPU/RAM/storage/GPU can the team use now, at what access limits and cost?
- What concurrency, latency and model context can the measured system support?
- Could partner resources be withdrawn, and what smaller-capability profile remains usable?

**Closure evidence:** Measured resource inventory and capacity/cost report coordinated with Hams; written access terms for any partner hardware.

**When:** Before promising a model size, hosting capacity or training experiment.

**Existing packages:** P01, A09, P14, P17

## OQ07 — Which deployment profile fits the first users?

**Type:** Needs Decision

**Discussion steward:** Omar

On-prem is a required long-term direction. Local deployment, disconnected operation and cloud services require separate qualification.

### Questions

- Which actual customer requirements permit public cloud, private hosting, external inference or no public egress?
- Who operates updates, identity, certificates, source refreshes, backups and recovery?
- What measured cost and operational burden fit the initial release and later on-prem packages?

**Closure evidence:** A customer-policy/deployment matrix and costed staged recommendation using the existing P14/P17 gates; no paid provider or infrastructure purchase selected here.

**When:** Before provider purchase, pilot commitment or offline claims.

**Existing packages:** P01, P14, P17, A09, D18

## OQ08 — Can a data partnership support a viable commercial package?

**Type:** Needs Research

**Discussion steward:** Shams

A data revenue idea is a business hypothesis; public access or an API subscription does not establish redistribution rights. Shams retains business partnership stewardship; Amr supplies D01/D17/D18 source and rights evidence.

### Questions

- What proprietary enrichment would a partner supply, to whom and under what contract?
- Can we display, cache, redistribute, bundle or resell it in cloud and disconnected installations?
- What costs, attribution, renewal, withdrawal and customer-data restrictions would apply?
- Would a complete-solution package create enough customer value to cover acquisition and support costs?

**Closure evidence:** A BMC/value hypothesis plus rights/cost/partnership comparison; unresolved rights stay explicitly unknown and unbundled.

**When:** Before selling or bundling third-party data.

**Existing packages:** D18, D01, D17, P17

## OQ09 — What did “CSA Games” refer to?

**Type:** Needs Clarification

**Discussion steward:** Mahrous

Keep the original meeting phrase without guessing its meaning. Gamification and L&D remain outside the current implementation.

### Questions

- Was this a named product, training approach, example or proposed feature?
- What user problem and evidence would justify considering it later?

**Closure evidence:** Confirmed meaning and a deliberate future-scope or discard decision, without silently adding a workstream.

**When:** Next discussion about this note; no current-release blocker.

**Existing packages:** C01, UX01, D18

## OQ10 — What exactly are the proposed “Classic Actions”?

**Type:** Needs Clarification

**Discussion steward:** Mahrous

The existing reviewed remediation and execution path remains authoritative; this phrase adds no execution permission.

### Questions

- Which concrete action types did the meeting intend?
- Are they explanations, draft plans, evidence requests or approved mutations?
- Which roles, scope, checks and recovery requirements apply to each?

**Closure evidence:** A small action catalogue mapped to existing contracts and permission boundaries; unknown actions remain unsupported.

**When:** Before treating the phrase as a new product capability.

**Existing packages:** C09, C10, C11, A10, P12

## OQ11 — What freshness promise can we actually support?

**Type:** Needs Decision

**Discussion steward:** Amr

The desired two-to-three-day window is a target to validate, not a guaranteed service level.

### Questions

- Does the clock start at source publication, source availability, ingestion or reassessment?
- How do outages, vendor delays, incomplete enrichment and disconnected bundles affect the promise?
- What measurements and stale-evidence indicators must users see?

**Closure evidence:** A defined freshness metric with measured pipeline evidence and separately stated disconnected-snapshot limits, as required by D16.

**When:** Before publishing an SLA or freshness claim.

**Existing packages:** D01, D03, D13, D16, A14

## OQ12 — How will top actions reflect organization policy?

**Type:** Needs Decision

**Discussion steward:** Mahrous

Retain the existing grouped-action approach. Exact policy thresholds and benefit claims still need validation. Hams owns the AI-powered prioritization capability; D12 remains the cybersecurity policy baseline. Candidate selection and promotion depend on A17 comparative evidence.

### Questions

- Which business-critical assets, exploitation signals, exposure and maintenance constraints matter?
- How are missing context, incompatible actions and justified deferrals represented?
- What reviewed baseline and ranking metrics demonstrate useful prioritization?

**Closure evidence:** A versioned reviewed policy configuration and evaluation report; show uncertainty and reasons instead of claiming a universally correct top ten.

**When:** Before presenting a ranking as customer-qualified.

**Existing packages:** D12, A01, A15, P10, A17
