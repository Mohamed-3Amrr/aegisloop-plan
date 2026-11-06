# Open research and clarification questions

Each steward coordinates clarification/evidence; this is separate from creating an implementation feature.

## OQ01 — When would fine-tuning earn its cost?

Steward: Hams · Needs Research

Deferred capability, not current execution. Distinguish classifier adaptation from generative-model adaptation.

- Which repeated failure remains after fixing labels, retrieval, prompts and tools?
- What exact task, eligible model and legally usable reviewed dataset would be needed?
- How would identical held-out evaluations prove added value, safety and absence of leakage?
- What RAM/GPU, training time, total cost, model-serving capacity and specialist skills are required?
- How would we version data/weights, reproduce runs, evaluate regressions, deploy, roll back and maintain a tuned model on-prem?
- Could a smaller model, frozen encoder or improved workflow meet the same requirement more economically?

Expected evidence/decision: A scoped proposal comparing alternatives and measured baseline failures; data/rights review; resource estimate; reproducible experiment and release/rollback/evaluation plan. No training until the proposal is accepted.

When: Future capability review only; no new blocker for the current release.

## OQ02 — Which product views best support each user action?

Steward: Hams · Needs Decision

Platform identity is settled. The balance of action queues, asset/evidence pages, approvals and conversational assistance still needs user validation.

- Which role needs an asset view, priority queue, evidence drill-down, approval screen or chat at each step?
- Can a user identify a priority, inspect its reason, review a plan and verify the result without relying on a conversation transcript?
- Where does a cited conversational interaction reduce effort compared with structured controls?

Expected evidence/decision: A reviewed end-to-end UX prototype and usability findings; Hams leads research/design and Omar implements the accepted states. No assumption that the product is a standalone chatbot.

When: Resolve interaction details through UX01/UX02 before P05 implementation.

## OQ03 — Who has the strongest initial pain and buying reason?

Steward: Shams · Needs Research

The industrial-support IT profile is a proposed focus, not proven product-market fit.

- Who performs triage and patch approval, and who buys the product?
- What volume, delay or repeated manual work can they demonstrate?
- Which existing tools and policies constrain them?
- What measurable outcome would justify adoption or payment?

Expected evidence/decision: Recorded customer discovery with permitted evidence, competing-workflow comparison and explicit assumptions; no demand or superiority claim without evidence.

When: Before committing a customer pilot or expanding scope.

## OQ04 — Which exact releases and appliance profiles will we qualify?

Steward: Mahrous · Needs Decision

Keep the narrowed Ubuntu lab path and conditional FortiOS evidence scope. Broad OT scanning or firmware execution is not implied.

- Which exact Ubuntu release and package fixtures can we reproduce?
- Which FortiOS model/train has adequate authorized evidence, advisory semantics and supported upgrade guidance?
- What stays unknown, manual or unsupported?

Expected evidence/decision: An explicit supported-profile matrix with capability-specific fixtures and limits, reviewed against the existing qualification gates.

When: Before profile-specific claims; Ubuntu qualification does not wait for FortiOS.

## OQ05 — What real organizational data can we legally access?

Steward: Shams · Needs Research

Public vulnerability records are real data but do not provide a real customer inventory or policies. Synthetic scenarios stay labelled. Amr reviews advisory-source rights; Shams reviews asset-data access and collection feasibility.

- Can Iskraemeco or another partner provide written, scoped access to inventories, configurations or reviewed policies?
- What minimization, de-identification, permissions, retention and publication restrictions apply?
- What can the prototype, MVP and pilot honestly demonstrate with their available data?

Expected evidence/decision: A data-access agreement or recorded refusal/unknown, provenance manifest and stage-specific dataset plan; proceed with public records plus declared lab/synthetic fixtures when access is absent.

When: Before importing customer material or claiming real-customer evaluation.

## OQ06 — What hardware and GPU access are actually available?

Steward: Omar · Needs Research

No sponsor, Iskraemeco GPU capacity or hardware commitment is assumed.

- What CPU/RAM/storage/GPU can the team use now, at what access limits and cost?
- What concurrency, latency and model context can the measured system support?
- Could partner resources be withdrawn, and what smaller-capability profile remains usable?

Expected evidence/decision: Measured resource inventory and capacity/cost report coordinated with Hams; written access terms for any partner hardware.

When: Before promising a model size, hosting capacity or training experiment.

## OQ07 — Which deployment profile fits the first users?

Steward: Omar · Needs Decision

On-prem is a required long-term direction. Local deployment, disconnected operation and cloud services require separate qualification.

- Which actual customer requirements permit public cloud, private hosting, external inference or no public egress?
- Who operates updates, identity, certificates, source refreshes, backups and recovery?
- What measured cost and operational burden fit the initial release and later on-prem packages?

Expected evidence/decision: A customer-policy/deployment matrix and costed staged recommendation using the existing P14/P17 gates; no paid provider or infrastructure purchase selected here.

When: Before provider purchase, pilot commitment or offline claims.

## OQ08 — Can a data partnership support a viable commercial package?

Steward: Shams · Needs Research

A data revenue idea is a business hypothesis; public access or an API subscription does not establish redistribution rights. Shams retains business partnership stewardship; Amr supplies D01/D17/D18 source and rights evidence.

- What proprietary enrichment would a partner supply, to whom and under what contract?
- Can we display, cache, redistribute, bundle or resell it in cloud and disconnected installations?
- What costs, attribution, renewal, withdrawal and customer-data restrictions would apply?
- Would a complete-solution package create enough customer value to cover acquisition and support costs?

Expected evidence/decision: A BMC/value hypothesis plus rights/cost/partnership comparison; unresolved rights stay explicitly unknown and unbundled.

When: Before selling or bundling third-party data.

## OQ09 — What did “CSA Games” refer to?

Steward: Shams · Needs Clarification

Keep the original meeting phrase without guessing its meaning. Gamification and L&D remain outside the current implementation.

- Was this a named product, training approach, example or proposed feature?
- What user problem and evidence would justify considering it later?

Expected evidence/decision: Confirmed meaning and a deliberate future-scope or discard decision, without silently adding a workstream.

When: Next discussion about this note; no current-release blocker.

## OQ10 — What exactly are the proposed “Classic Actions”?

Steward: Mahrous · Needs Clarification

The existing reviewed remediation and execution path remains authoritative; this phrase adds no execution permission.

- Which concrete action types did the meeting intend?
- Are they explanations, draft plans, evidence requests or approved mutations?
- Which roles, scope, checks and recovery requirements apply to each?

Expected evidence/decision: A small action catalogue mapped to existing contracts and permission boundaries; unknown actions remain unsupported.

When: Before treating the phrase as a new product capability.

## OQ11 — What freshness promise can we actually support?

Steward: Amr · Needs Decision

The desired two-to-three-day window is a target to validate, not a guaranteed service level.

- Does the clock start at source publication, source availability, ingestion or reassessment?
- How do outages, vendor delays, incomplete enrichment and disconnected bundles affect the promise?
- What measurements and stale-evidence indicators must users see?

Expected evidence/decision: A defined freshness metric with measured pipeline evidence and separately stated disconnected-snapshot limits, as required by D16.

When: Before publishing an SLA or freshness claim.

## OQ12 — How will top actions reflect organization policy?

Steward: Mahrous · Needs Decision

Retain the existing grouped-action approach. Exact policy thresholds and benefit claims still need validation. Hams owns the AI-powered prioritization capability; D12 remains the cybersecurity policy baseline. Candidate selection and promotion depend on A17 comparative evidence.

- Which business-critical assets, exploitation signals, exposure and maintenance constraints matter?
- How are missing context, incompatible actions and justified deferrals represented?
- What reviewed baseline and ranking metrics demonstrate useful prioritization?

Expected evidence/decision: A versioned reviewed policy configuration and evaluation report; show uncertainty and reasons instead of claiming a universally correct top ten.

When: Before presenting a ranking as customer-qualified.
