# Applied execution brief — 2026-10-23.r2

This brief was used for the existing AegisLoop planning-site update. It is not a request for a new site or new broad research.

## Latest amendments — take precedence over older wording below

- Execute the entire attached meeting-update brief, not only rewrite a prompt.
- On-prem is a required long-term product capability, NOT Plan B if cloud fails. Prepare contracts/adapters/local data/configuration now; qualify connected on-prem, disconnected bundles and later enterprise controls in separate stages.
- Distinguish application, inference, identity/data, collection and update locations. Internal APIs are compatible with on-prem. Do not assume all buyers reject cloud or promise no future migrations.
- Publish one scope/schema/fixture handoff version before preparing ClickUp import. Reconcile actual artifacts; do not infer Mohamed's completion or send tickets to ClickUp.
- Keep primary cybersecurity/AI/platform ownership; Hams additionally leads UI/UX research/design while Omar implements. Every person sees owned work first and supporting work separately, with contribution, timing and deliverable.
- Narrow the next release explicitly and label profile/customer-fit uncertainty. Preserve deferred research and guides. Real public records plus authorized real lab behavior are distinct from synthetic organization-context fixtures.
- Update execution instructions, source evidence, dependency visibility, downloadable guides and validation, then publish the existing site with its current audience.

## Full brief, amended and applied

Continue working on the EXISTING published AegisLoop / Our Dream project planning website:

[https://our-dream-project-map.kolslow.chatgpt.site/](https://our-dream-project-map.kolslow.chatgpt.site/)

Treat this as an evidence-based update to our existing graduation-project execution plan.

Reuse the completed research, source register, architecture, 64 execution guides, ownership assignments, dependencies, decisions, risks and experiments. Inspect the current saved/published version before editing; do not rely on conversation memory when the actual project data is available.

Do not restart the project, recreate completed research agents, or rebuild the website. Change existing decisions only when our new requirements or specific research evidence justify a change.

Our objective is a working, credible cybersecurity product that five students can implement and defend academically, with a realistic path toward commercial use.

## 1. Confirmed team and website changes

### Show primary responsibilities and support responsibilities separately

When a team member is selected, show two distinct sections:

1. **Owned Work** — packages where this person is the primary owner.
2. **Supporting Work** — packages where this person supports or reviews another owner.

Both sections must show package ID, action-oriented title, primary owner, the selected person’s specific contribution, prerequisites, status and expected handoff.

Do not merely list names under “Support.” Explain what each supporting person must actually contribute and when their input is needed.

Normalize support membership into canonical team names so filters do not miss entries such as “Mahrous + Omar.” Avoid displaying the same package in both sections when someone is its primary owner.

Keep all existing IDs and deep links working.

### Add Hams as the UI/UX lead

Hams will lead UI/UX research and design because of her research ability and visual judgment. Omar remains responsible for frontend implementation, backend/API and platform integration.

Translate this into concrete responsibilities:

- User and workflow research.
- Information architecture.
- Chat, recommendation and prioritization flows.
- Wireframes and interactive prototypes.
- Evidence, uncertainty and approval presentation.
- Usability evaluation.
- Design specifications and implementation handoff.

Review existing packages before adding new ones. Separate design ownership from implementation ownership where necessary. Make the Hams→Omar handoff explicit.

Preserve Hams’s AI leadership, but assess her total workload. Recommend a feasible sequence and supporting contributors rather than assigning her an unrealistic second full-time role.

Do not delay backend contracts or data engineering while waiting for finished interface designs.

### Preserve the responsibility model

- Shams: asset discovery and collection, observation provenance, and independent research/business work.
- Amr: vulnerability/advisory data, source and tool trust, vendor catalogs, lab and remediation execution adapters.
- Mahrous: applicability, prioritization policy and technical coordination.
- Hams: AI research, data preparation, classification, retrieval, model evaluation and UI/UX leadership.
- Omar: schema integration, backend/API, RBAC, frontend implementation and platform integration.

Supporting assignments may improve, but primary ownership changes must have a stated reason.

## 2. Interpret meeting notes before turning them into tasks

Create a meeting-to-plan traceability table:

**Comment → interpretation → evidence needed → recommendation → affected packages → owner → acceptance evidence**

Classify each item as:

- Confirmed requirement.
- Hypothesis to test.
- Ambiguous reference.
- Future option.
- Unsupported claim.
- Existing capability needing clearer execution instructions.

Do not convert every meeting suggestion into a mandatory feature.

Examples requiring careful interpretation:

- “Google BERT as an API.”
- “SecBERT.”
- “RAG, not fine-tuning.”
- “Agentic workflow.”
- “Everything goes into RAG.”
- “Top ten.”
- “Find recurring problems and solve their root causes.”
- “90% of problems are caused by people.”
- “Add a game.”
- “Cloud versus on-premises.”
- “Selling data.”

Identify uncertain terminology rather than silently guessing which model, product or technique was intended. Treat the quoted 90% statement as unverified unless credible evidence supports the exact claim and context.

## 3. Research rules

Conduct focused, current research for genuinely new or unresolved decisions.

Reuse reliable existing evidence. Recheck it only where it is outdated, contradictory, incomplete or materially affected by this update.

Prefer official documentation, standards, primary vendor sources and relevant research papers.

For every major new recommendation, provide:

- The problem it solves.
- Strong realistic alternatives.
- Why it fits our team, resources and graduation timeline.
- Implementation and integration difficulty.
- Security, privacy and operational implications.
- Licensing, commercial-use and API restrictions.
- Resource and recurring-cost implications.
- Failure modes and maintenance burden.
- A fallback and a small validation experiment.
- Sources and review date.

Clearly distinguish:

**VERIFIED FACT / ASSUMPTION / DESIGN RECOMMENDATION / NEEDS VALIDATION**

Research depth should follow decision impact. Avoid repeating broad searches just to reconfirm completed work.

## 4. Narrow the project and define its practical value

Investigate what specialization best fits our intended industrial context and available evidence.

The meeting indicates an IT/OT context associated with Iskraemeco/Elsewedy. Verify relevant public context, but do not assume access to company systems, internal data, production equipment or deployment permission.

Compare realistic scopes such as:

- Enterprise IT vulnerability management.
- Network infrastructure and security appliances.
- IT assets supporting or connecting to OT environments.
- Direct OT-device assessment.

Recommend a narrow, implementable first scope and explain what is deferred.

Define supported asset profiles precisely: product family, version evidence, collection method, advisory source, applicability capability and remediation capability.

Do not imply that discovery, authenticated inventory, vulnerability assessment and automated patching have identical coverage.

Review whether prioritization and recommendations should become the primary user experience, supported by essential asset/evidence views. Do not interpret “chat, not dashboard” as removing necessary visibility, permissions or auditability.

## 5. Make “Top 10” a measurable workflow

Clarify what users should receive:

- Ten CVEs?
- Ten asset–vulnerability findings?
- Ten remediation actions that may address many findings?

Compare these units and recommend the most useful approach for our selected scope.

Explain how the workflow handles:

- The same CVE on many assets.
- One patch addressing multiple CVEs.
- Vendor backports and already-fixed systems.
- Unknown applicability or stale inventory.
- No available patch.
- Support and compatibility constraints.
- Maintenance windows and reboot restrictions.
- Existing compensating controls.
- Previously attempted or verified remediation.

Preserve the existing separation between deterministic applicability, prioritization policy and AI explanation.

Assess the role of CVSS, KEV, dated EPSS, exposure, asset criticality and operational consequence. Do not invent a calibrated risk probability from arbitrary weights.

Define evaluation against transparent baselines. Include ranking quality, correctness, analyst effort and time-to-correct-decision. Define what “fast” means through a declared workload and measured latency rather than an unsupported promise.

## 6. Investigate recurrence and root-cause analysis

Determine what evidence is required to identify repeated problems, including:

- Reopened findings.
- Patch drift or failed deployment.
- Unsupported software.
- Repeated configuration failures.
- Missing ownership.
- Policy exceptions.
- Recurring workflow or training gaps.

Distinguish a repeated observation from an independently recurring incident.

Do not infer human fault from a CVE record or scanner finding. Separate observed facts, analyst-confirmed causes and model-generated hypotheses.

Recommend a small first implementation using finding history, reason codes and reviewed categories. Identify which historical data is currently missing.

Evaluate whether learning-and-development guidance or gamification adds measurable value. Keep it optional unless it supports a specific user need and fits the core delivery plan. Avoid rewarding superficial closures or creating misleading security scores.

## 7. Define a bounded agentic workflow

Explain the proposed workflow step by step:

**Request → authorized context → evidence retrieval → applicability → prioritization → supported recommendations → human review → permitted execution, where supported → independent verification → history/feedback**

For each step specify:

- Input and output.
- Deterministic code versus model responsibility.
- Allowed tools and permissions.
- Evidence and freshness requirements.
- Human approval requirements.
- Failure, abstention and fallback behavior.
- Existing implementation packages.

Compare direct orchestration, a simple state machine and frameworks such as LangChain only where they solve a concrete need. Do not adopt a framework because it appeared in the meeting.

Keep model-generated text outside the authorization boundary. Preserve scoped tools, version-bound approvals, execution isolation and reconciliation of uncertain side effects.

## 8. Resolve RAG, organization context and model responsibilities

Specify what belongs in:

1. Structured operational storage.
2. Retrieved documents and knowledge indexes.
3. Current authorized tool results.
4. Model prompts.
5. Optional training datasets.

Evaluate how organization context should be represented:

- Asset criticality and ownership.
- Approved software/support constraints.
- Maintenance windows.
- Security policies and exceptions.
- Remediation history.
- Relevant network or IT/OT boundary context.

Do not assume that every operational record should become a RAG document.

Compare external hosted inference and locally hosted models. Investigate BERT/SecBERT references against the actual tasks: classification, embeddings, retrieval, reranking and generated recommendations. Verify exact model identities and licenses before recommending them.

Evaluate RAG, prompting, supervised classification and fine-tuning separately. Do not assume that an API automatically prevents all customization or that fine-tuning is required for current CVE knowledge.

Recommend a working baseline and explicit criteria for considering heavier training later.

## 9. Research real data before synthetic data

Build a data-needs matrix covering:

- Public vulnerability/advisory records.
- Product identity and affected/fixed-version evidence.
- Asset inventories and software versions.
- Organization policies and constraints.
- Remediation outcomes and recurrence history.
- Classification labels.
- Prioritization judgments.
- UI/UX test scenarios.

For each data type specify source, format, scope, rights, freshness, quality limits and intended use.

Reuse existing research on CVE, NVD, OSV, KEV, EPSS and vendor sources. Extend it only where the selected specialization requires missing evidence.

Consider Microsoft, Red Hat, Fortinet and Cisco sources where relevant; availability does not mean we should implement every vendor immediately.

Compare public real records, our controlled-lab observations, reviewed fixtures and synthetic data.

Synthetic examples must be labelled, separated from real evaluation data and used for stated purposes. Do not treat AI-generated CVEs, policies or outcomes as authoritative evidence or inflate real-world performance with synthetic-only tests.

Do not choose a Kaggle dataset without checking its original source, dates, labels, license, coverage and suitability.

Produce a small representative sample and reproducible collection instructions where access permits. Clearly distinguish public vulnerability knowledge from private organization context.

## 10. Separate application deployment from model hosting

Analyze these as independent decisions:

- Where the platform runs.
- Where collection/execution runners run.
- Where inference runs.
- Where organization data is stored.
- How public intelligence updates arrive.

Compare feasible combinations:

- Local development and demonstration.
- Cloud-hosted application with an internal runner.
- Cloud application using an external model API.
- Customer-hosted application using permitted external inference.
- Fully customer-hosted application and model.
- Offline or disconnected operation.

Investigate the assumptions that cloud is necessarily cheaper, on-premises is necessarily unaffordable, or commercial customers necessarily require on-premises. Explain which requirements would make each option suitable.

Use actual resource measurements and dated cost assumptions; do not invent hardware availability or a sponsor.

Define:

- **Foundations now:** versioned domain/context contracts, internal provider/update adapters, local data/model paths, capability flags and dependency/rights inventory.
- **Connected on-prem milestone:** reproducible install on a measured host; local inference, controlled updates and tested restore.
- **Disconnected milestone:** trusted versioned bundles, clean install with egress blocked, snapshot-age display and update/recovery tests.
- **Enterprise qualification:** customer-specific identity, retention, support, capacity and availability gates.
- **Operational fallbacks:** model/source failures use disclosed deterministic or stale-snapshot behavior. On-prem is not one of these fallbacks.

For offline operation, explain cached knowledge, imported evidence, model availability, update transfer and visible freshness limitations. Offline must not imply current intelligence.

## 11. Expand Shams’s tool-trust and business work

Add the new work to the relevant existing packages where possible.

Assess tools across:

- Publisher and provenance.
- License and commercial use.
- Data retention and model-training use.
- Confidential-data handling.
- Hosting location and organization restrictions.
- Required privileges and secret access.
- Maintenance and security history.
- Output reliability and evaluation.
- Availability, quotas and cost.
- Replacement and exit strategy.

Keep vendor claims separate from independently tested behavior.

Produce a tool-trust register, adoption conditions and fallbacks. Avoid unsupported “trusted/untrusted” labels.

For the business model, investigate product licensing, services, permitted derived analytics and data-related opportunities separately. Do not assume public advisory feeds can be resold without restrictions or that customer inventory can be monetized.

## 12. Apply changes to the execution plan

Create a concise change log showing:

**Keep / Clarify / Modify / Add / Defer / Reject**

For every changed package, record what changed, why, supporting evidence, primary owner, support contributions, dependencies and acceptance criteria.

Preserve IDs. Add new IDs only when the work is a distinct deliverable that cannot reasonably fit an existing package.

Every affected guide must still answer:

1. What exactly am I doing?
2. Why does it matter?
3. Which questions remain?
4. What do I build?
5. What must exist first?
6. Which concrete artifacts do I produce?
7. How do I test it?
8. When is it DONE?
9. What work does it unlock?

Recalculate dependency visibility and parallel opportunities where justified. Check Hams’s combined AI/UI/UX workload and all critical handoffs.

Review existing freshness and evaluation targets against the proposal. Surface inconsistencies; do not silently replace a prior target.

## 13. Update and validate the existing website

Keep the site primarily English and preserve its visual identity, maps and progressive disclosure.

Add:

- Separate Owned Work and Supporting Work sections.
- Specific supporting contributions.
- Hams’s UI/UX ownership and Omar’s implementation handoff.
- Updated specialization, value proposition and prioritization workflow.
- Organization-context and data-source explanations.
- Required staged on-prem roadmap, enabling work now, separate disconnected qualification and operational fallbacks.
- Tool-trust, research and business deliverables.
- Meeting-to-package traceability and change history.

Keep research, build, test and output sections practical and scannable.

Validate IDs, links, ownership, support membership, dependencies, cycles, readiness rules and downloadable exports. Check that local progress remains compatible with retained IDs and is not misrepresented as synchronized team state.

Open representative updated guides from Cybersecurity, AI, UI/UX and Platform and apply the nine-question review.

Use browser verification if available. Clearly disclose verification limits or infrastructure blockers; do not claim edits or publication that did not succeed.

## 14. Execution order and final deliverables

Proceed in this order:

1. Inspect the existing project and identify only the required changes.
2. Research unresolved high-impact questions.
3. Synthesize recommendations, alternatives and experiments.
4. Build the meeting traceability and change-impact tables.
5. Update affected packages, ownership/support and dependencies.
6. Update the existing website and downloads.
7. Validate and publish within the existing authorized scope.

Do not stop after a generic brainstorm. Carry the work through to a reviewable, usable update.

Finish with:

- The recommended narrowed product scope and practical value.
- Answers to the cloud/API/on-premises/RAG/model questions.
- The real-data strategy and synthetic-data limits.
- The proposed prioritization and bounded agent workflow.
- Changed/new/deferred package summary.
- Ownership and support changes.
- Outstanding experiments and the exact evidence needed to resolve them.
- The published website link, or a precise blocker if publication could not complete.

Aim for a coherent working product with defensible evidence. Keep ambition, but make every added feature earn its place in the team’s implementation plan.