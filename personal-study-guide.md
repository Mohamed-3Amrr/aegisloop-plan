# AegisLoop — Personal Study Reference

Explanatory edition: 2026-10-24 (Cairo)

A personal reference for understanding, explaining and discussing AegisLoop. This is a static learning layer, not a team progress tracker.

## Suggested reading route

### 1. Know what the sources actually tell us

How does a published advisory become evidence we can use?

المصدر بيقول إيه؟ وإيه اللي لسه مش نعرفه عن الجهاز؟

- Preserve raw source records before normalization; CVE, NVD and vendor assertions may add different facts.
- The internal schema preserves identities, revisions, conflicts and missing fields.
- A vendor fix statement is evidence for a product branch, not permission to update every device.

**Common misunderstanding:** A CVE appearing in the database does not establish that one of our assets is affected.

**Start with:** D01, D02, D05, D14

**All chapter packages:** D01, D02, D03, D04, D05, D06, D07, D11, D14, D16, D17, D18, C09

**Discuss:** Explain why D03 does not have to wait for all NVD enrichment in D04.

### 2. Know the asset before judging it

What facts must we collect from an authorized device?

الجهاز عنده إيه فعلًا، والمعلومة اتجمعت إمتى ومنين؟

- Approved scope and stable identity come before collection. An IP alone is insufficient.
- Ubuntu inventory needs the distribution and full package revision, not just an old-looking banner.
- An import is a valid evidence path when its origin, age and limitations are disclosed.

**Common misunderstanding:** Network discovery, authenticated inventory and vulnerability assessment are different capabilities.

**Start with:** C01, C03, C05, D08

**All chapter packages:** C01, C02, C03, C04, C05, C06, C07, D08

**Discuss:** If a firmware export lacks model/configuration evidence, what can we safely conclude?

### 3. Understand applicability and priority

Is this asset affected, and which action matters first?

متأثر فعلًا؟ وبعد كده نبدأ بإيه وليه؟

- D09 applies vendor-aware rules and returns affected, not_affected or unknown with a trace.
- D12 uses distinct threat/context signals; severity alone is not the work queue.
- Revisions and new observations can change an earlier result; D13 preserves reassessment and history.
- A17 tests AI/hybrid ordering against D12 policy; models cannot change applicability or permission constraints.

**Common misunderstanding:** Unknown is not safe. EPSS, CVSS and KEV do not mean the same thing.

**Start with:** D09, D12, D13, D15

**All chapter packages:** D09, D10, D12, D13, D15, C08

**Discuss:** Explain why a fixed backport can defeat a simple comparison of upstream version numbers.

### 4. Separate what AI learns, retrieves and explains

Where does the assistant add value without becoming a security authority?

التصنيف غير البحث، والبحث غير الحكم على الجهاز، والشرح غير التنفيذ.

- Classification needs defined labels, real provenance and leakage-safe evaluation.
- RAG retrieves governed source/policy text; typed tools obtain current authorized system facts.
- Hams leads AI and UX design. Omar implements the product UI and the shared API gateway.

**Common misunderstanding:** An embedding match or fluent answer is not an applicability verdict or an approval.

**Start with:** A01, A04, A06, A07, A09, A10, UX01, UX02, A17

**All chapter packages:** A01, A02, A03, A04, A05, A06, A07, A08, A09, A10, A11, A12, A13, A14, A15, A16, UX01, UX02, UX03, A17

**Discuss:** How can new CVE knowledge become usable without retraining the generative model?

### 5. Follow a repair through to verified closure

What makes a patch action controlled and its result credible?

مش مجرد أمر اشتغل؛ لازم نعرف اتصلّح إيه وحالة الخدمة إيه.

- A reviewed plan binds the targets, source/observation revisions, permissions and recovery constraints.
- The runner is isolated from the web API and LLM; lost contact can mean outcome_unknown.
- Fresh independent collection and service checks establish closure; a command exit code does not.

**Common misunderstanding:** A newer release is not always a compatible upgrade, and reconnecting is not permission to repeat a mutation.

**Start with:** C10, C11, C12, C13

**All chapter packages:** C10, C11, C12, C13, C14, C15, C16

**Discuss:** What must happen if the network disappears after package installation starts?

### 6. Understand the platform and hosting boundaries

How do the pieces work together without competing sources of truth?

الـplatform بيربط الأجزاء؛ مش بيعمل حكم تاني يناقضهم.

- P02 combines the domain contracts; P03 stores structured facts, revisions and relationships.
- P04/P08 separate user permissions from runner authority; P07 makes jobs durable.
- P14 qualifies connected hosting. P17 separately qualifies disconnected installation and updates.

**Common misunderstanding:** An internal API is compatible with on-prem. This public planning site is not the deployed vulnerability-management product.

**Start with:** P02, P03, P04, P07, P11, P14, P17

**All chapter packages:** P01, P02, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12, P13, P14, P15, P16, P17

**Discuss:** Why does putting Ollama on localhost not prove that the entire application works offline?

## One fictional case

DEMO-ADV-A and LAB-A are illustrative labels, not real CVE/version facts or live product results.

### 1. Read the advisory

**Owner:** Amr

**In:** A fictional advisory DEMO-ADV-A, its original source and revision.

**Do:** Preserve raw evidence and normalize provider assertions without inventing a missing fixed version.

**Out:** A versioned advisory object linked to its raw record.

**Why:** We need to know exactly which source assertion later reasoning used.

**Question:** Does this advisory alone prove that asset LAB-A is affected?

**Answer:** No. We still need asset identity, installed versions and any required configuration evidence.

Related guides: D01, D02, D03, D05

### 2. Observe the asset

**Owner:** Shams; Mahrous defines the observation fields

**In:** Authorized fictional Ubuntu asset LAB-A and an approved collection profile.

**Do:** Collect distribution/release, package identity/full revision and timestamp with errors stated explicitly.

**Out:** A stable asset observation; missing required configuration remains missing.

**Why:** A banner or IP cannot substitute for installed package and platform identity.

**Question:** What if the observation contains a package name but not its complete revision?

**Answer:** Request the missing evidence; do not treat an incomplete observation as a clean assessment.

Related guides: C01, C03, C05, D08

### 3. Decide applicability

**Owner:** Mahrous

**In:** The source revision, asset observation and supported native-version rules.

**Do:** Apply deterministic vendor-aware comparisons and configuration conditions. Follow the unknown branch: request the exact missing field, obtain authorized fresh evidence and rerun D09. Continue the repair path only if affected is established.

**Out:** In this teaching case, unknown until the required missing evidence arrives; affected only if the qualified rules then establish it.

**Why:** Unknown and not_affected must stay distinct. The assistant cannot fill a missing configuration fact.

**Question:** Could semantic similarity between the advisory and OS name establish the verdict?

**Answer:** No. It can propose a candidate; D09 needs version/configuration semantics and traceable evidence.

Related guides: D09, C08, D15

### 4. Choose the action to discuss first

**Owner:** Mahrous; Omar displays the policy output

**In:** For this branch, targeted collection has supplied the missing field and D09 has established affected. Use that qualified finding, dated threat signals and declared organization context; unresolved cases remain outside the confirmed repair path.

**Do:** Produce explained policy bands and compatible grouped remediation actions.

**Out:** A reasoned action queue with asset/CVE drill-down and separate unknown, no-patch and constrained cases.

**Why:** Ten CVEs are not necessarily ten different repair actions. Grouping must respect compatibility and policy.

**Question:** Why not simply choose the largest CVSS score?

**Answer:** Severity is one input. Exploitation evidence, exposure, criticality, freshness and fix constraints have different meanings.

Related guides: D11, D12, D14, P10

### 5. Explain the evidence

**Owner:** Hams leads behavior/retrieval; Omar integrates the API

**In:** An authorized question, current structured assessment and permitted source/policy text.

**Do:** Use read-only tools and retrieval, then return citations, limits and precise missing-evidence requests.

**Out:** An explanation or constrained draft, never a patch approval or command.

**Why:** The model adds an understandable explanation without owning the security verdict.

**Question:** Where is live asset state obtained: model memory, RAG text or authorized tools?

**Answer:** Current structured facts come from authorized tools; retrieval supplies governed explanatory evidence.

Related guides: A06, A07, A09, A10, A11, P11

### 6. Bind a plan to approval

**Owner:** Mahrous defines policy; Omar implements platform states

**In:** Exact targets, validated fix evidence, current revisions, permitted window and recovery constraints.

**Do:** Build the immutable plan and require a scoped, expiring approval checked again before dispatch.

**Out:** An approved plan only when every required policy condition holds.

**Why:** Changing targets, evidence or the plan can invalidate an earlier approval.

**Question:** Can a persuasive assistant recommendation authorize the runner?

**Answer:** No. C10 policy and P12 platform states enforce the separate approval boundary.

Related guides: C09, C10, P08, P12

### 7. Run the approved pilot

**Owner:** Amr

**In:** A typed approved job, authenticated runner and qualified disposable lab target.

**Do:** Recheck identity/preflight and use the selected native-update adapter within its allowlist.

**Out:** Execution evidence and explicit success, failure, reboot-pending or uncertain outcome.

**Why:** The web API and LLM must not acquire arbitrary shell authority.

**Question:** The connection is lost after mutation starts. Retry immediately?

**Answer:** No. Reconcile the target first; transport retry does not establish whether the update already happened.

Related guides: C11, C12, P08

### 8. Verify the actual result

**Owner:** Mahrous; Shams supports independent collection and Amr recovery

**In:** Fresh independent inventory, running/service evidence and execution history.

**Do:** Reassess and check the adapter-specific service state; rehearse recovery when necessary.

**Out:** Verified closure, remaining exposure or a linked reopened episode with history preserved.

**Why:** A successful command is not the same as a fixed and healthy system.

**Question:** The finding returns later. Have we proved human error?

**Answer:** No. Separate repeated observation, changed advisory evidence and recurrence after verified closure. A cause needs supporting evidence.

Related guides: C13, D13, C16

### 9. Follow the evidence across the platform

**Owner:** Omar; Mahrous defines the security event meaning

**In:** Versioned source, observation, assessment, plan and execution event identities.

**Do:** Keep traceable history, update derived answers on revisions and qualify deployment separately from application behavior.

**Out:** Reproducible evidence links; qualified SIEM decoding/correlation when that integration passes its gate.

**Why:** A screenshot of a page or a delivered event is not proof that every downstream interpretation worked.

**Question:** Does this walkthrough claim that the product or these experiments are implemented?

**Answer:** No. This is a static teaching case explaining the retained plan and its validation requirements.

Related guides: P03, P09, A14, P13, C15, P14, P17

## People and connections

### Amr — Vulnerability intelligence, vendor evidence and tool trust

تخلّي المعلومة موثوقة ومفهومة قبل ما نستخدمها.

**Understand:** CVE versus vendor enrichment; schema/revisions; fixed versus merely newer versions; source/model/data rights.

**Methods and limits:** Python/HTTP, raw JSON and versioned schemas; official CVE/vendor/NVD adapters. Exact source quotas, rights and profile coverage remain execution checks.

**Connects to:** D02 feeds P02/A06. D05 and D14 support applicability and remediation. D17 is conditional FortiOS qualification; D18 governs permitted tool/data use.

**Avoid confusing:** Calling public availability permission to redistribute, or calling a fixed-version floor a complete upgrade path.

### Shams — Asset inventory and collection

تجمع بيانات الجهاز الفعلية وتحافظ على هوية الدليل وتاريخه.

**Understand:** Discovery versus authenticated inventory; stable host identity; native package evidence; stale, incomplete and failed collection.

**Methods and limits:** Scoped Nmap, authenticated SSH/native inventory, qualified Windows inventory and offline imports. Amr supplies the lab and retains patch execution.

**Connects to:** C04–C07 supply asset observations to D08/D09/P02; Mahrous owns C03. Amr retains C02 and C11/C12/C14.

**Avoid confusing:** Treating an unreachable or stale asset as a clean successful inventory.

### Mahrous — Applicability, priority and approval policy

يحوّل الدليل لقرار مبرَّر، من غير ما يخمّن الناقص.

**Understand:** Product identity, native version comparisons, unknown states, policy reason codes, approval binding and independent verification.

**Methods and limits:** Deterministic rules, vendor-native version comparators and reviewed fixtures. KEV/EPSS/CVSS retain their different meanings; no fabricated risk probability.

**Connects to:** C03 joins source/asset contracts in P02. D09 is the one applicability engine reused by C08. D12 feeds P10; C10 feeds P12; C13 establishes verified closure.

**Avoid confusing:** Reimplementing matching in C08 or letting an AI answer approve a change.

### Hams — AI and UI/UX research/design

تختبر قيمة الذكاء الاصطناعي وتخلّي الرحلة مفهومة للمستخدم.

**Understand:** Labels and splits; baseline versus stronger model; retrieval versus live tools; citation/evaluation; user flows and uncertainty states.

**Methods and limits:** TF-IDF/linear CPU baseline; exact and lexical retrieval before optional dense search/reranking. Local model/runtime selected through A09. UX design tool is not selected by this study guide.

**Connects to:** A06 uses D02 source metadata. A07/A09 inform P11/A10; Omar owns API integration. UX02 provides the reviewed design for Omar’s P05; optional models wait for evidence and capacity.

**Avoid confusing:** Calling SecBERT a generative assistant, adding current CVEs through routine retraining, or taking UI implementation ownership away from Omar.

### Omar — Contracts, platform integration and hosting

يربط الأجزاء بنفس المعاني ويجهّز تشغيلها واستعادتها.

**Understand:** Shared contracts, revisions, object permissions, durable jobs, gateway boundaries and connected/disconnected deployment.

**Methods and limits:** FastAPI conditional default; React/TypeScript/Vite candidate for the product; PostgreSQL/JSONB core; conditional broker/vector choices. Linux Compose hosting is qualified on measured hardware. This planning site remains buildless.

**Connects to:** P02 integrates C03/D02; P05 implements Hams’s UX02; P10 consumes D12. P11/A10 share one gateway; P14 and P17 cover separate hosting qualifications.

**Avoid confusing:** A second matching or approval engine in the frontend, public database/model/runner ports, or assuming a local LLM makes the whole system offline.

## Project terms

### CVE

A shared identifier for a disclosed vulnerability.

It is not a finding on a specific installed asset.

D01, D02

### Vendor advisory

The publisher’s affected/fixed-branch and prerequisite assertions.

An advisory can relate to multiple products or CVEs; preserve the relationships.

D05, D17

### NVD enrichment

Additional provider assertions such as scoring/product metadata.

The core CVE/vendor pipeline does not wait for every enrichment field.

D03, D04

### Asset observation

A dated statement of what was collected from one identified device.

Missing or old fields must not silently become current facts.

C03, C05

### Applicability

Whether the recorded evidence establishes that this asset is affected.

D09 returns affected, not_affected or unknown; an LLM is not the judge.

D09

### Backport

A vendor fix applied within a package branch without simply adopting the newest upstream number.

A banner that looks old is insufficient to establish exposure.

D05, D09

### CPE / purl

Typed identifiers/aliases used where they fit the product or package ecosystem.

They do not replace full inventory or guarantee every vendor range is supported.

D08, D10

### CVSS / KEV / EPSS

Severity, an exploitation-catalog signal and a dated exploitation forecast, respectively.

Keep their meanings distinct; none supplies all organization context.

D11, D12

### Grouped remediation action

A compatible action that can cover several asset findings.

Do not group incompatible product trains, target fixes or policy constraints.

D12, P10

### Canonical database

The structured source of truth for records, observations, assessments and revisions.

A retrieval index is derived evidence, not a replacement for these facts.

D02, P03

### Classification

Assigning the defined category/impact labels to text.

It is a separately evaluated task, not installed-version detection.

A01, A04

### RAG

Retrieving governed evidence to ground an answer.

It does not determine whether an installed package satisfies a vendor version rule.

A06, A07, A10

### Embedding

A model-derived representation that can help retrieve related text.

Similarity is not a security verdict; exact IDs and lexical search still matter.

A07

### Fine-tuning

An optional training adaptation justified by a defined task and dataset.

It is not our default way to learn each newly published CVE.

A05, A09

### Ground truth / holdout

Reviewed expected outcomes and a protected evaluation set.

Generated labels or the evaluated engine’s own answers are not independent proof.

D15, A03, A13

### Contract / fixture

An agreed data shape and a reproducible example of it.

A mock fixture enables development, not a claim that real integration passed.

P02, P06

### RBAC / object authorization

Role permissions plus checks on the particular requested resource.

Hiding a frontend button is not an API permission check.

P04, A12

### Durable job / outbox

Recorded intent and delivery history that can survive process failure.

A broker acknowledgement does not guarantee exactly-once mutation.

P07, P13

### Runner

A separately authorized component that performs allowed collection or execution.

It is not an unrestricted shell behind the web API or chat.

P08, C11

### Approval binding

An approval attached to the exact plan, targets, scope and revisions.

A materially changed plan needs its approval validity checked again.

C10, P12

### Verified closure

A repair conclusion supported by fresh independent evidence and relevant health checks.

An update exit code alone does not establish closure.

C13

### On-prem / internal API

Application/data/model services deployed within the permitted local boundary, often communicating through APIs.

API does not mean external cloud. Connected on-prem and disconnected operation are different capabilities.

P11, P14, P17

### Snapshot age

How old the intelligence imported into a disconnected profile is.

No incoming update means no promise of current upstream publication freshness.

D16, P17

### Decision Log / ADR

The rationale, alternatives and validation conditions behind a technical choice.

A recommendation or research comparison is not an implemented benchmark result.

P01, A09

### Risk / issue / dependency

A possible failure, an observed problem, and a planned prerequisite are three different ideas.

This guide documents planned risks and relationships; it does not report live issues or team completion.

P02, P14

## Questions and trade-offs

### Why is the AI not simply checking whether an OS has a CVE?

The OS name generates possible matches, but D09 needs exact vendor/product, package revision and relevant configuration evidence. Retrieval helps explain evidence; it cannot substitute for the qualified version rules.

Guides: D08, D09, A06; decision: ADR04

### If the CVEs are in RAG, why do we also need PostgreSQL?

We need explicit records, relationships, revisions, permissions and current state. Source/policy text may be indexed for retrieval, while the database and authorized tools answer current structured questions.

Guides: D02, P03, A06, P11; decision: ADR11

### Do new CVEs require training the LLM again?

No routine retraining or fine-tuning is planned. The intelligence pipeline ingests evidence and refreshes retrieval/assessments. A05 may compare frozen encoders plus a classifier. Any future fine-tuning needs the separate OQ01 review. D16 measures freshness.

Guides: D03, D13, D16, A05, A14; decision: ADR23

### What makes the top ten useful?

The chosen primary unit is up to ten compatible remediation actions, not ten repeated CVE rows. The queue retains reasons, asset/finding drill-down and constrained/unknown cases. Its benefit remains a measured hypothesis, not a proven superiority claim.

Guides: D12, P10, A15; decision: ADR24

### Can we scan every non-Windows device?

No. Authorization, reachability, credentials, protocol support, identity/version semantics and device safety each constrain capability. The narrow profile uses Ubuntu lab execution and conditional FortiOS evidence imports/recommendations. Direct OT probing is excluded.

Guides: C01, C05, C07, D17; decision: ADR21

### Does on-prem mean we must buy an expensive server now?

Actual available hardware and cost are unknown until P01/A09 measurement. The plan prepares local-capable contracts and storage now, qualifies connected hosting in P14, and separately qualifies disconnected bundles in P17.

Guides: P01, A09, P14, P17; decision: ADR22

### Is a local LLM enough to call the system offline?

No. Embeddings, models/tokenizers, identity, DNS/certificate trust, telemetry, feeds and package content can still require network access. P17 tests the enabled profile with public egress blocked.

Guides: A06, A09, P17; decision: ADR22

### Who owns UI/UX, and who writes the UI?

Hams leads user research, flows, state design and usability. Omar implements the frontend. UX02 is the reviewed design input to P05; the same fields and uncertainty states must make sense in both.

Guides: UX01, UX02, UX03, P05; decision: ADR10

### Why not just use the latest available firmware?

A vendor fixed-version floor does not establish model compatibility, allowed train, intermediate upgrade steps, support entitlement or recovery. D14/D17 retain those constraints; automatic FortiOS firmware execution is not in the release.

Guides: D14, D17, C09; decision: ADR21

### How are repeated problems handled without blaming people?

Separate repeated observations from reopening after verified closure and source changes. A cause remains a hypothesis until reviewed evidence supports it. The meeting’s 90%-people statement is not a verified statistic.

Guides: D13, C13, A11; decision: ADR24

### Are the New/Updated markers proof that experiments or tasks are complete?

No. They identify edits to the plan. Source-review dates, proposed validation gates and the date of explanatory content are separate. This edition adds no live task reporting or completion dashboard.

Guides: D15, A13, P14; decision: ADR20

### Will the website now sync our ClickUp workspace?

No. The personal study features do not need task synchronization. No ClickUp connection, workspace access or task write is introduced. The existing prepared CSV remains a separate artifact; opening a workspace link is navigation, not live synchronization.

Guides: P02; decision: ADR08

## Explain the project

### The problem

Teams face many advisories but need to know which installed assets are actually affected and which compatible repair matters first. We focus on supported industrial IT, not a universal OT scanner.

C01, D17

### The evidence

Amr makes advisory/source assertions traceable. Shams collects authorized asset facts. Mahrous joins both through vendor-aware rules with an explicit unknown state.

D02, C05, D09

### The decision

Policy adds threat and organization context. The queue groups compatible actions and explains reasons; no invented compromise probability is presented.

D11, D12, P10

### The AI value

Hams defines and evaluates classification, retrieval and grounded explanations. Current facts remain in typed tools; Omar integrates the shared gateway and implements Hams’s UX design.

A04, A06, A10, UX02, P11

### The controlled repair

Approval is bound to the exact plan. Amr executes a qualified lab pilot through an isolated runner. Independent evidence and health checks establish closure.

C10, C11, C13

### The product direction

Omar connects the contracts, permissions, durable jobs and hosting. Connected on-prem and disconnected delivery have separate proof gates. This describes our plan; experiments and customer fit are not claimed complete.

P02, P04, P07, P14, P17

## Which tab should I use?

### overview

The product workflow, the current implementation slice and links to each person’s full task scope.

**Use when:** You need to explain what AegisLoop does, distinguish the whole product from this week’s prototype, or open a team workspace.

**Example:** See evidence → applicability → prioritization → approved remediation → verification, then open the 1/5 November prototype plan.

**Caution:** Static project explanation. No team completion or delivery reporting is inferred.

### study

Your personal route through concepts, examples, people and discussion questions.

**Use when:** When you understand an individual term but cannot explain how it connects to the rest of AegisLoop.

**Example:** Compare an asset observation, an applicability verdict and an assistant explanation using the same teaching case.

**Caution:** Nothing here records team progress or a personal learning score.

### revision

The agreed boundaries and the reasons recent scope, AI, UX and on-prem details changed.

**Use when:** When someone asks whether FortiOS firmware execution, generic OT scanning or external inference belongs in this release.

**Example:** Compare the supported-profile matrix with Omar’s P14 connected-hosting plan and P17 disconnected qualification.

**Caution:** New/Updated is a plan-edit label. Exact profiles, hardware and customer fit still have explicit validation gates.

### system

How source knowledge, asset evidence, rules, assistant and runner are connected.

**Use when:** When you need to explain who produces a security verdict or why chat cannot directly patch a device.

**Example:** Select Assess applicability, then Version-bound approval and Isolated execution; notice their different owners and inputs.

**Caution:** Arrows show planned evidence/data flow, not observed production traffic.

### work

The complete execution plan with visible search, filters, delivery labels and separate owned/supporting task groups.

**Use when:** You want to find a task, review all of someone’s work, or filter the plan to a prototype checkpoint.

**Example:** Open Hams for all her tasks. From her 5 November prototype page, Same tasks in Execution opens that delivery only; All Hams tasks restores the complete scope.

**Caution:** Prerequisites describe the plan. No local completion or actual blocked status is shown.

### delivery

The planned implementation order, interfaces and possible parallel branches.

**Use when:** When you want to understand why P05 follows UX02 or how different people can prepare compatible fixtures.

**Example:** Inspect P05: P02 supplies the contract and UX02 the reviewed design. A shell can be explored earlier; completed flows need the design input.

**Caution:** This is dependency logic, not a live schedule. Core-chain flags are not a duration-calculated critical path.

### team

Each person’s engineering domain, owned guides and supporting connections.

**Use when:** When preparing to explain the work of a teammate or identify whose technical judgment a question needs.

**Example:** Amr owns vulnerability/advisory data; Shams owns asset inventory. Amr retains lab/patch execution; Hams owns UX design and Omar implements the UI.

**Caution:** Assignments are the plan; this page does not say who has delivered anything.

### decisions

Decision Log means why a technical approach was recommended and what evidence could change it.

**Use when:** When you ask why deterministic rules, why PostgreSQL, or why on-prem is staged instead of a fallback.

**Example:** ADR04 explains applicability rules; ADR11 separates structured truth and retrieval; ADR22 explains the on-prem stages.

**Caution:** Original research and later clarifications are retained. A recommendation is not a completed experiment.

### risks

Risk Radar collects possible failure modes, early clues and response options.

**Use when:** When a design choice looks easy but you want to understand what could invalidate it.

**Example:** R23: incompatible Hams/Mahrous fields. R24: hidden online dependencies. R26: UX and AI competing for Hams’s capacity.

**Caution:** 27 qualitative planned risks are retained; additions R23–R27 are visible. None is claimed observed or mitigated by a change badge.

### validation

The experiments and expected evidence that could support a project claim.

**Use when:** When you need to understand what detection quality, retrieval quality or a successful patch demonstration actually means.

**Example:** D15 requires declared cases/denominators; A07 separates retrieval evidence; C13 requires fresh inventory and health checks.

**Caution:** These are protocols and targets. No accuracy, pass result or experiment completion is asserted.

### evidence

The retained technical reasoning and primary-source starting points behind the plan.

**Use when:** When an explanation depends on a vendor rule, a license, an API limit or a tool capability that you want to verify.

**Example:** Use D17’s source links to separate Fortinet affected/fixed assertions from the reviewed full upgrade path.

**Caution:** Each source retains its own review date. A newer page edit does not mean every source was reverified that day.

### open

Unresolved discussion and research questions, kept separate from adopted directions and approved ADRs.

**Use when:** A meeting phrase is ambiguous, evidence is missing, or you need to see what still needs a decision.

**Example:** Open OQ01 to see what a future fine-tuning proposal must establish; OQ02 covers product interaction design.

**Caution:** These are static planning questions, not task completion states. They do not add dependency edges or change primary owners.

### reference

Optional technical reference for questions that go beyond this week’s instructions.

**Use when:** You need architecture, research evidence, a decision rationale or the full risk/test register.

**Example:** Open a package’s tests and risks first; use the complete reference only if that context is not enough.

**Caution:** The original deep links and research remain available. Reference content does not report actual work completion.

## Package understanding index

### D01 — Validate Core Vulnerability Sources & Build the First Ingestion Prototype

**Owner:** Amr

**Question to understand:** What does CVE.org provide versus NVD enrichment?

**Method:** Python collector prototype, official CVE records plus independent NVD enrichment, raw JSON and a draft schema. This is a local-file spike; D02 owns the validated shared schema, and D03 owns the production intake pipeline.

**Example output:** `vulnerability-intelligence/research/source-comparison.md`

**Prerequisites:** None planned

**Consumers:** D02

### D02 — Define and Validate the Canonical Vulnerability Schema

**Owner:** Amr

**Question to understand:** Which fields are required, nullable or provider-specific in the D01 samples?

**Method:** Versioned JSON Schema and immutable source revisions; relational integration in P03 follows P02. Draft prototypes remain file-based until the persistence contract is agreed.

**Example output:** `contracts/v1/advisory.schema.json`

**Prerequisites:** D01

**Consumers:** D03, D05, D07, D08, D11, A06, P02, D17

### D03 — Build Bulk CVE Ingestion and Incremental Update Processing

**Owner:** Amr

**Question to understand:** Which official snapshot and revision mechanism will the selected CVE adapter use?

**Method:** Official CVEListV5 baseline plus incremental changes, checksums, idempotent upserts and durable checkpoints. Choose exact download mechanics from D01 evidence; no scraping dependency.

**Example output:** `backend/app/intelligence/cve_sync.py`

**Prerequisites:** D02, P03

**Consumers:** D04, D13, D16, P09

### D04 — Add NVD Enrichment Without Blocking CVE Availability

**Owner:** Amr

**Question to understand:** Which fields and schema revisions are exposed by the current endpoint?

**Method:** Independent NVD adapter with conservative pacing, backoff and provenance. Current numeric NVD quotas remain RESEARCH REQUIRED until primary documentation is available; they are not hard-coded from memory.

**Example output:** `backend/app/intelligence/adapters/nvd.py`

**Prerequisites:** D03

**Consumers:** Final capability/evidence handover

### D05 — Build the Ubuntu Affected-and-Fixed Package Catalog

**Owner:** Amr

**Question to understand:** How do Ubuntu CVE, USN and LSN records differ?

**Method:** Official Ubuntu OSV JSON first, selected OVAL cross-check. Preserve distro/architecture/source-package identity; selected release and data-usage terms need execution-time validation.

**Example output:** `backend/app/intelligence/adapters/ubuntu_osv.py`

**Prerequisites:** D02, P03

**Consumers:** D06, D08, D09, D14, D15

### D06 — Validate Microsoft and Red Hat Data & Add Scoped Vendor Adapters

**Owner:** Amr

**Question to understand:** How do MSRC product trees, build identities and superseding updates relate?

**Method:** Microsoft advisory data plus endpoint servicing evidence; Red Hat CSAF/VEX. New OVAL-only RHEL investment is not the chosen default; full Windows execution stays in C14.

**Example output:** `backend/app/intelligence/adapters/msrc.py`

**Prerequisites:** D05

**Consumers:** Final capability/evidence handover

### D07 — Ingest Package Advisories That May Have No CVE

**Owner:** Amr

**Question to understand:** Which selected ecosystems and purl forms are in scope?

**Method:** OSV query/cache for chosen ecosystems and native advisory IDs. A public API is not universal vulnerability coverage or blanket permission to redistribute all upstream content.

**Example output:** `backend/app/intelligence/adapters/osv.py`

**Prerequisites:** D02

**Consumers:** Final capability/evidence handover

### D08 — Normalize Asset Product Identities & Generate Matching Candidates

**Owner:** Mahrous

**Question to understand:** Which inventory fields identify vendor, distro, package ecosystem, product branch and architecture?

**Method:** Internal asset IDs plus typed vendor/CPE/purl identities. Fuzzy matches can propose candidates; they cannot establish an affected verdict.

**Example output:** `backend/app/assessment/identity.py`

**Prerequisites:** D02, D05, C03

**Consumers:** D09

### D09 — Implement Vendor-Aware Applicability Rules & Decision Traces

**Owner:** Mahrous

**Question to understand:** Which native version comparator matches each supported ecosystem?

**Method:** Deterministic vendor-aware rules, source revisions and explicit reason codes. Reuse this engine in C08; neither embeddings nor the LLM decides version applicability.

**Example output:** `backend/app/assessment/applicability.py`

**Prerequisites:** D08, D05, C05

**Consumers:** D10, D12, D13, D14, D15, C08

### D10 — Validate SBOM and VEX Evidence Before Using It in Assessments

**Owner:** Mahrous

**Question to understand:** Which supported SBOM/VEX formats are actually available from the test product?

**Method:** Selected CycloneDX/CSAF/VEX input profiles behind a validated adapter. Do not implement every standard at once; exact supported versions remain Needs Validation.

**Example output:** `backend/app/assessment/sbom_vex.py`

**Prerequisites:** D09

**Consumers:** Final capability/evidence handover

### D11 — Import Dated KEV and EPSS Signals & Preserve Missing Values

**Owner:** Amr

**Question to understand:** Which KEV fields and update timestamps should be retained?

**Method:** Official KEV data plus daily bulk EPSS where appropriate; separate signals, bounded API access and dated provenance. FIRST quotas and API behavior follow the retained source register.

**Example output:** `backend/app/intelligence/threat_signals.py`

**Prerequisites:** D02, P03

**Consumers:** D12

### D12 — Implement Explainable Priority Bands Using Asset Context

**Owner:** Mahrous

**Question to understand:** Which exposure and business criticality values can the lab actually provide?

**Method:** Rule-based bands retaining CVSS, KEV, EPSS and local context separately. Policy weights and deadlines are project decisions requiring review; no arbitrary score is marketed as calibrated risk.

**Example output:** `backend/app/assessment/prioritization.py`

**Prerequisites:** D09, D11

**Consumers:** D13, P10, A17

### D13 — Trigger Targeted Reassessment and Invalidate Stale Answers

**Owner:** Mahrous

**Question to understand:** Which changed fields affect applicability, priority, patch options or only display text?

**Method:** Versioned change events, idempotent consumers and current-result views. NVD enrichment is optional and must not block CVE/vendor reassessment; A14 adds AI-specific operations on this path.

**Example output:** `backend/app/assessment/reassessment.py`

**Prerequisites:** D03, D09, D12, P07

**Consumers:** D16, A14

### D14 — Build a Versioned Catalog of Vendor Fixes and Mitigations

**Owner:** Amr

**Question to understand:** Where does each vendor publish fixed versions and alternative mitigations?

**Method:** Vendor-authoritative remediation assertions; C09 validates their execution readiness. Newest release is not automatically the compatible target, and missing fixed versions must not be invented.

**Example output:** `backend/app/remediation/catalog.py`

**Prerequisites:** D05, D09

**Consumers:** C09, A11, A17

### D15 — Create Independent Matching Ground Truth & Measure Errors

**Owner:** Mahrous

**Question to understand:** Who labels each case independently of the matching code?

**Method:** Frozen source/observation revisions and independent labels, not another scanner treated as ground truth. The proposal detection target applies only to declared known vulnerabilities in the controlled lab.

**Example output:** `evaluation/matching/gold.jsonl`

**Prerequisites:** D05, D09

**Consumers:** C16, A17

### D16 — Measure CVE Freshness & Rehearse Source Outage Recovery

**Owner:** Amr

**Question to understand:** Which timestamps measure publication, first observed, normalized, indexed and reassessed?

**Method:** Keep the proposal 24-hour target; polling and recovery scheduling are configurable. Unknown public disclosure times and incomplete upstream data remain visible limitations.

**Example output:** `backend/app/intelligence/freshness_metrics.py`

**Prerequisites:** D03, D13

**Consumers:** Final capability/evidence handover

### C01 — Define Allowed Lab Targets & Enforce Scan Safety Rules

**Owner:** Mahrous

**Question to understand:** Which exact networks and devices does the team control?

**Method:** Allowlisted scopes, resolved-address revalidation, device-specific profiles and bounded operations. This defines lab authorization, not permission to scan an external organization.

**Example output:** `config/lab-scope.yaml`

**Prerequisites:** None planned

**Consumers:** C02, C03, C04, P08

### C02 — Build a Reproducible Lab & Verify Baseline Restoration

**Owner:** Amr

**Question to understand:** Which available hardware supports the chosen VM and network layout?

**Method:** Isolated VM/network with pinned images and known package fixtures. Exact hypervisor and target release remain Needs Validation against available hardware; serialized VMs are an allowed fallback.

**Example output:** `lab/manifest.yaml`

**Prerequisites:** C01

**Consumers:** C04, C05, C11

### C03 — Define Asset Observation Fields & Validate Stable Identity

**Owner:** Mahrous

**Question to understand:** Which fields identify an enrolled host beyond IP?

**Method:** Versioned JSON observation schema coordinated with P02; enrollment identity and evidence references are explicit. This is the domain specification, not a second platform schema engine.

**Example output:** `contracts/v1/inventory-snapshot.schema.json`

**Prerequisites:** C01

**Consumers:** D08, C04, C05, C06, C07, C08, C15, P02, D17

### C04 — Implement Bounded Network Discovery & Parse Structured Results

**Owner:** Shams

**Question to understand:** Which conservative Nmap profile fits each approved device class?

**Method:** Separately installed Nmap with fixed argument arrays, exclusions, time and concurrency limits. No blanket aggressive script profile; product redistribution is a separate licensing gate.

**Example output:** `runner/adapters/discovery.py`

**Prerequisites:** C01, C02, C03

**Consumers:** C16

### C05 — Collect Ubuntu OS and Package Evidence Through Authenticated SSH

**Owner:** Shams

**Question to understand:** Which native output exposes distro release, architecture and binary/source package identity?

**Method:** Authenticated SSH with host-key verification and structured native inventory. Choose parser/dependency versions in the lab spike; avoid broad shell/environment dumps.

**Example output:** `runner/adapters/ubuntu_inventory.py`

**Prerequisites:** C02, C03

**Consumers:** D09, C08, C11, C16

### C06 — Compare Windows Inventory Options & Implement One Adapter

**Owner:** Shams

**Question to understand:** Does osquery or existing Wazuh Syscollector expose the required build, package and update fields?

**Method:** Experimental Decision: compare osquery and Wazuh, prefer existing deployment where justified, then implement one primary adapter. A recorded export is not live Windows validation.

**Example output:** `experiments/windows_inventory_comparison.py`

**Prerequisites:** C03

**Consumers:** C14

### C07 — Import Offline and Appliance Evidence With Freshness Labels

**Owner:** Shams

**Question to understand:** Which exact model, firmware train and hardware revision identify the test appliance?

**Method:** Validated JSON/vendor-export adapter with bounded uploads and explicit manual/import labels. General OT active scanning and universal firmware updating remain out of scope.

**Example output:** `backend/app/inventory/imports.py`

**Prerequisites:** C03

**Consumers:** Final capability/evidence handover

### C08 — Integrate the Applicability Engine & Review Its Evidence Traces

**Owner:** Mahrous

**Question to understand:** Does the D09 contract carry source revision, observation ID, reason codes and missing evidence?

**Method:** Reuse D09 as the only matching engine. C08 owns integration and evidence review, while P06 displays the result; no parallel matching implementation is needed.

**Example output:** `backend/app/assessment/service.py`

**Prerequisites:** C03, C05, D09

**Consumers:** C09, C10, C13, C15, C16, P06

### C09 — Validate Patch Catalog Candidates Against Execution Prerequisites

**Owner:** Amr

**Question to understand:** Is the documented fix actually available from the target's configured repository?

**Method:** Reuse the versioned D14 catalog; add applicability, availability and execution precondition checks. A download URL or AI recommendation is not approval.

**Example output:** `backend/app/remediation/eligibility.py`

**Prerequisites:** C08, D14

**Consumers:** C10, C11

### C10 — Build Version-Bound Patch Plans & Enforce Approval Policy

**Owner:** Mahrous

**Question to understand:** Who may propose, approve and dispatch in the four-role policy?

**Method:** Immutable version/hash-bound plans with explicit scope and permission checks, coordinated with P12. Human approval is checked again immediately before mutation.

**Example output:** `backend/app/remediation/policy.py`

**Prerequisites:** C08, C09, P04

**Consumers:** C11, C14, A11, P12

### C11 — Implement an Approved Ubuntu Patch Pilot Runner

**Owner:** Amr

**Question to understand:** Which native package or Ansible operation can enforce exact versions and trusted repositories?

**Method:** Isolated allowlisted runner using native package mechanisms, with Ansible as the first adapter candidate. No arbitrary shell from the user or assistant; exact runner choice is validated in the lab.

**Example output:** `runner/adapters/ubuntu_patch.py`

**Prerequisites:** C02, C05, C09, C10, P08, P12

**Consumers:** C12, C13

### C12 — Handle Reboots, Reconnects and Partial Patch Failures

**Owner:** Amr

**Question to understand:** How is reboot need detected for each supported adapter?

**Method:** Durable attempt records, bounded reconnect and explicit reboot_pending/outcome_unknown states. Transport retry is not permission to repeat a non-idempotent update.

**Example output:** `runner/recovery.py`

**Prerequisites:** C11

**Consumers:** C13, C14

### C13 — Verify Remediation Independently & Rehearse Recovery

**Owner:** Mahrous

**Question to understand:** Which installed versus running version checks matter for the chosen update?

**Method:** Independent collection and deterministic reassessment plus adapter-specific service checks. No universal rollback claim; recovery must be rehearsed for the selected lab target.

**Example output:** `backend/app/remediation/verification.py`

**Prerequisites:** C08, C11, C12

**Consumers:** C14, C16, P15

### C14 — Validate Windows Updates and Reboot Recovery Before Adding Execution

**Owner:** Amr

**Question to understand:** Which configured update service supplies applicable updates on the licensed test build?

**Method:** Experimental Decision: native Windows servicing through the selected supported adapter, including ansible.windows.win_updates candidate. Jobs may run for hours; C06 inventory alone does not prove patch capability.

**Example output:** `experiments/windows_patch_spike.py`

**Prerequisites:** C06, C10, C12, C13

**Consumers:** Final capability/evidence handover

### C15 — Send Lifecycle Events to Wazuh & Verify Decoding and Correlation

**Owner:** Mahrous

**Question to understand:** Which Wazuh agent/localfile and JSON decoder configuration is deployed in the lab?

**Method:** P13 outbox delivers JSON lines to the supported Wazuh collection route. The management REST API is not assumed to be a generic event ingestion endpoint.

**Example output:** `integrations/wazuh/localfile-example.conf`

**Prerequisites:** C03, C08, P13

**Consumers:** C16

### C16 — Publish Supported-Coverage Results & Reproduce the End-to-End Demo

**Owner:** Mahrous

**Question to understand:** Which fixtures and supported profiles form the fixed denominator?

**Method:** Controlled-lab metrics and reproducible evidence; optional scanner comparisons are secondary, not ground truth. Repeat the relevant subset at each discussion and freeze final results at G4.

**Example output:** `experiments/evaluate_lab.py`

**Prerequisites:** C04, C05, C08, C13, C15, D15

**Consumers:** Final capability/evidence handover

### A01 — Define AI Tasks, Label Rules and Reviewed Examples

**Owner:** Hams

**Question to understand:** Which category and impact labels can overlap?

**Method:** Multilabel category/impact taxonomy with explicit unknowns; official CVSS remains primary. Labels are project definitions, not an official universal CVE taxonomy.

**Example output:** `docs/ai/taxonomy.md`

**Prerequisites:** None planned

**Consumers:** A02

### A02 — Create Versioned Training and Evidence Datasets With Provenance

**Owner:** Hams

**Question to understand:** Which source revisions and fields are allowed in each AI task?

**Method:** Versioned JSONL and dataset manifests from preserved evidence, with human-reviewed labels. User feedback and LLM-generated labels are not automatic ground truth.

**Example output:** `datasets/manifests/corpus-v1.json`

**Prerequisites:** A01

**Consumers:** A03, A06

### A03 — Clean Advisory Text & Freeze Leakage-Safe Dataset Splits

**Owner:** Hams

**Question to understand:** Which HTML/Unicode normalization preserves negation, IDs and version strings?

**Method:** Group-aware chronological split with a locked final holdout; explicit severity leakage controls. TimeSeriesSplit alone does not solve advisory alias leakage.

**Example output:** `scripts/ai/prepare_splits.py`

**Prerequisites:** A02

**Consumers:** A04, A17

### A04 — Train CPU Classification Baselines & Report Per-Label Errors

**Owner:** Hams

**Question to understand:** Which keyword and TF-IDF baselines answer the defined tasks?

**Method:** Word/character TF-IDF with OneVsRest logistic regression or linear SVM candidates. Choose thresholds on validation only; no fixed final F1 promise before label audit.

**Example output:** `experiments/ai/train_baselines.py`

**Prerequisites:** A03

**Consumers:** A05, A13, A17

### A05 — Review Label Disagreements & Test a Stronger Classifier Only if Justified

**Owner:** Hams

**Question to understand:** Which error categories are label problems rather than model failures?

**Method:** Review disagreements and compare frozen encoder features plus a classifier against the baseline. Fine-tuning is excluded from current implementation; OQ01 holds the future capability review.

**Example output:** `datasets/labels/adjudication-log.jsonl`

**Prerequisites:** A04

**Consumers:** Final capability/evidence handover

### A06 — Build Revision-Aware Retrieval Chunks With Source Metadata

**Owner:** Hams

**Question to understand:** Which advisory sections should be kept together to avoid mixing product rows?

**Method:** Structured chunks and metadata in the existing PostgreSQL design; embeddings are derived. Corpus fixtures allow development before the full live intake is ready.

**Example output:** `backend/app/ai_gateway/corpus.py`

**Prerequisites:** A02, D02

**Consumers:** A07, A14, P17

### A07 — Benchmark Exact, Lexical and Multilingual Hybrid Retrieval

**Owner:** Hams

**Question to understand:** Does lexical-only search already answer exact IDs and product questions?

**Method:** Exact IDs plus PostgreSQL text search, with pgvector dense retrieval only if measured useful. E5-small and BGE-M3 are candidates; use documented prefixes and model revisions.

**Example output:** `experiments/ai/evaluate_retrieval.py`

**Prerequisites:** A06

**Consumers:** A08, A09, P11

### A08 — Test Reranking Against Measured Retrieval Errors

**Owner:** Hams

**Question to understand:** Are missed answers caused by candidate absence or poor ranking?

**Method:** Experimental Decision, optional G3 enhancement. Do not add a new inference dependency unless its measured gain exceeds the added cost.

**Example output:** `experiments/ai/compare_rerankers.py`

**Prerequisites:** A07

**Consumers:** Final capability/evidence handover

### A09 — Benchmark Candidate LLMs on Project Questions and Available Hardware

**Owner:** Hams

**Question to understand:** Can the exact model revision, runtime and quantization support the required chat/tool schema?

**Method:** Needs Validation: researched Qwen3.5-4B/Qwen3 Instruct/Gemma3 shortlist. Local serving and exact runtime remain experimental; hosted services need a separate budget/privacy gate.

**Example output:** `experiments/ai/benchmark_llms.py`

**Prerequisites:** A07

**Consumers:** A10, P11, P17

### A10 — Integrate the Assistant With Typed Read-Only Tools and Citations

**Owner:** Omar

**Question to understand:** Which allowed intents map to get_asset_summary, explain_applicability and advisory retrieval?

**Method:** One shared A10/P11 gateway: Hams owns behavior/retrieval, Omar owns API and authorization. Read-only tools; drafting is separate from approval or execution.

**Example output:** `backend/app/ai_gateway/assistant.py`

**Prerequisites:** A09, P11

**Consumers:** A11, A12, A13, A14

### A11 — Generate Targeted Evidence Requests & Compare Constrained Fix Options

**Owner:** Hams

**Question to understand:** Which missing fields would change a specific unknown verdict?

**Method:** Use deterministic assessment gaps and D14/C10 facts through bounded tools. The LLM phrases supported options; it does not invent a patch plan or decide applicability.

**Example output:** `backend/app/ai_gateway/evidence_requests.py`

**Prerequisites:** A10, D14, C10

**Consumers:** A12

### A12 — Test Prompt Injection, Permissions and Unsupported Assistant Actions

**Owner:** Mahrous

**Question to understand:** Which malicious instructions can enter through advisory text or tool outputs?

**Method:** Authorization and allowlisted tools are enforced by code; prompts and RAG are not security boundaries. No credentials enter the model context.

**Example output:** `evaluation/assistant/adversarial-cases.jsonl`

**Prerequisites:** A10, A11, P04

**Consumers:** A13, P15

### A13 — Freeze Human Evaluation Questions, Rubrics and Final Holdout

**Owner:** Hams

**Question to understand:** Which question categories cover the declared user tasks and failure cases?

**Method:** Human-reviewed source-grounded questions, with LLM judging only as optional assistance. Pilot sample sizes are planning targets, not evidence of statistical sufficiency.

**Example output:** `evaluation/assistant/protocol.md`

**Prerequisites:** A04, A10, A12

**Consumers:** A15, A17

### A14 — Invalidate AI Caches on Evidence Changes & Track Model Operations

**Owner:** Omar

**Question to understand:** Which evidence, prompt, model and user-scope fields belong in cache keys?

**Method:** Reuse D13 change events and P09 health, adding AI-specific cache/model metadata. No duplicate scheduler and no automatic self-training from votes.

**Example output:** `backend/app/ai_gateway/cache_policy.py`

**Prerequisites:** A06, A10, D13

**Consumers:** A15

### A15 — Run Contribution Ablations & Compare Competitor Capabilities Fairly

**Owner:** Hams

**Question to understand:** Do change-aware explanations reduce time-to-correct-decision versus the frozen baseline?

**Method:** Evaluate narrow hypotheses: revision-aware decisions, targeted evidence requests and constrained remediation. Tenable already documents agents/approvals/workflows; no blanket superiority claim.

**Example output:** `experiments/ai/contribution_ablations.py`

**Prerequisites:** A13, A14, A17

**Consumers:** A16

### A16 — Package Reproducible AI Experiments and a Faculty Demo

**Owner:** Hams

**Question to understand:** Which licenses and hashes must accompany the selected model and dataset?

**Method:** Versioned experiment manifests, source attribution, deterministic seeds where applicable and honest limits. No unvalidated candidate is presented as the final chosen model.

**Example output:** `docs/runbooks/ai-reproduce.md`

**Prerequisites:** A15

**Consumers:** Final capability/evidence handover

### P01 — Validate Team Skills and Hardware & Prove the Backend Candidate

**Owner:** Omar

**Question to understand:** Which backend/frontend frameworks can Omar actually build and maintain today?

**Method:** FastAPI conditional default with Django/NestJS alternatives already researched. Needs Validation against skills and authentication integration; preserve contracts if the framework changes.

**Example output:** `research/platform-skills-and-hardware.md`

**Prerequisites:** None planned

**Consumers:** P02

### P02 — Publish Shared API Contracts and Validate Producer/Consumer Fixtures

**Owner:** Omar

**Question to understand:** Do C03 and D02 samples agree on IDs, timestamps, revisions and unknown states?

**Method:** OpenAPI/JSON Schema with versioned fixtures. C03/D02 provide domain definitions; P02 integrates them rather than inventing competing schemas.

**Example output:** `contracts/v1/openapi.yaml`

**Prerequisites:** P01, C03, D02

**Consumers:** P03, P05, UX02

### P03 — Implement the Relational Schema, Migrations and Revision Links

**Owner:** Omar

**Question to understand:** Which entities need relational keys versus flexible JSONB?

**Method:** PostgreSQL relational core plus JSONB; SQLAlchemy/Alembic if FastAPI wins. ORM choice follows P01; retrieval is a separate derived concern.

**Example output:** `backend/app/db/models.py`

**Prerequisites:** P02

**Consumers:** D03, D05, D11, P04, P06, P07, P09

### P04 — Implement Login, Revocation and Object-Level Role Permissions

**Owner:** Omar

**Question to understand:** Which maintained auth/session component fits the chosen framework?

**Method:** Revocable cookie sessions with server-side scope checks, plus separate scoped runner credentials. Exact component Needs Validation; Keycloak/OIDC remains the researched fallback.

**Example output:** `backend/app/identity/auth.py`

**Prerequisites:** P03

**Consumers:** C10, A12, P06, P08, P11, P14

### P05 — Build the Dashboard Shell With Real API States and Accessible Navigation

**Owner:** Omar

**Question to understand:** Which screens are required for the first real slice?

**Method:** React/TypeScript/Vite candidate for the product dashboard, subject to P01. This planning website stays buildless; do not confuse its UI implementation with the product stack.

**Example output:** `frontend/src/routes/assets.tsx`

**Prerequisites:** P02, UX02

**Consumers:** P06, P09, UX03

### P06 — Connect One Real Asset From Ingestion to a Traceable Finding Screen

**Owner:** Omar

**Question to understand:** Which authorized observation and advisory are suitable for the first slice?

**Method:** Shared contracts and D09/C08 engine through the existing API. A mock-only interface is preparation, not proof of the real integration gate.

**Example output:** `tests/integration/test_vertical_slice.py`

**Prerequisites:** P03, P05, C08, P04

**Consumers:** P10

### P07 — Build the Durable Job Ledger & Test Dispatch Recovery

**Owner:** Omar

**Question to understand:** Can Celery/RabbitMQ fit the actual laptop and learning budget?

**Method:** PostgreSQL ledger/outbox with conditional Celery/RabbitMQ broker spike. A bounded serial durable worker is the fallback; in-process request background tasks are not the reliability mechanism.

**Example output:** `backend/app/jobs/ledger.py`

**Prerequisites:** P03

**Consumers:** D13, P08, P09, P13, P14

### P08 — Authenticate Runners and Enforce Typed, Scoped Execution Envelopes

**Owner:** Omar

**Question to understand:** How is runner enrollment authenticated and revoked?

**Method:** Authenticated typed job channel, allowlisted adapters and secret references. No Docker socket or arbitrary shell authority in the web API; exact enrollment transport is validated before use.

**Example output:** `backend/app/jobs/runner_gateway.py`

**Prerequisites:** P04, P07, C01

**Consumers:** C11, P12, P15

### P09 — Expose Source Health, Freshness and Changed-Knowledge Views

**Owner:** Omar

**Question to understand:** Which source-health fields distinguish last attempt from last success?

**Method:** P03/P07 state plus D03 ingestion metadata; no second ingestion scheduler. D13 and A14 consume the same current source revision facts.

**Example output:** `backend/app/intelligence/health_api.py`

**Prerequisites:** P03, P05, P07, D03

**Consumers:** P10

### P10 — Build Finding Triage With Priority Reasons and Evidence History

**Owner:** Omar

**Question to understand:** Which assessment and priority fields are authoritative versus predicted?

**Method:** Consume D09/D12 outputs and history through server-side authorization. The UI does not recalculate version applicability or turn unknown into a clean result.

**Example output:** `backend/app/assessment/findings_api.py`

**Prerequisites:** P06, P09, D12

**Consumers:** P11, P12, P13, P16

### P11 — Expose One Permission-Scoped AI Gateway With Safe Fallbacks

**Owner:** Omar

**Question to understand:** How is current user scope applied before retrieval and every tool call?

**Method:** Single gateway shared with A10; Omar owns API/auth integration and Hams owns retrieval/answer behavior. Exact LLM choice follows A09 rather than being embedded in UI code.

**Example output:** `backend/app/ai_gateway/api.py`

**Prerequisites:** P04, P10, A07, A09

**Consumers:** A10, P15, P16

### P12 — Implement Patch Campaign States, Approval Binding and Progress Views

**Owner:** Omar

**Question to understand:** Which transitions are allowed before/after approval and mutation?

**Method:** C10 policy and P08 runner boundary, version-bound plans and durable attempts. Reuse native patch adapters; do not implement a second approval engine in the frontend.

**Example output:** `backend/app/remediation/campaigns_api.py`

**Prerequisites:** P08, P10, C10

**Consumers:** C11, P15, P16

### P13 — Deliver Versioned SIEM Events Through a Retryable Outbox

**Owner:** Omar

**Question to understand:** Which event schema and correlation IDs does the consumer need?

**Method:** Transactional PostgreSQL outbox and supported JSON-lines Wazuh route. At-least-once delivery is explicit; duplicate delivery must not create duplicate business findings.

**Example output:** `backend/app/integrations/siem_outbox.py`

**Prerequisites:** P07, P10

**Consumers:** C15, P16

### P14 — Plan Hosting, Deploy the Minimal Stack & Prove Recovery

**Owner:** Omar

**Question to understand:** Which services can share a host and which need separate profiles?

**Method:** Linux Compose profiles and private filesystem evidence adapter initially. Exact versions/TLS setup need validation; proposed RPO/RTO are test targets, not guarantees. No new legacy MinIO dependency. Hosting detail: retain the measured Linux/Compose deployment. Host/provider, domain, TLS proxy/issuer, sizes and availability targets are Needs Validation; this plan does not provision or purchase infrastructure.

**Example output:** `deploy/compose.yaml`

**Prerequisites:** P04, P07

**Consumers:** P16, P17

### P15 — Run Cross-Module Security and Failure-Mode Release Tests

**Owner:** Omar

**Question to understand:** Which versioned ASVS controls apply to the actual product scope?

**Method:** Use existing module tests plus cross-boundary scenarios and selected ASVS/SSDF guidance. This is release evidence, not a claim of security certification or a complete penetration test.

**Example output:** `tests/security/test_release_gates.py`

**Prerequisites:** P08, P11, P12, A12, C13

**Consumers:** P16

### P16 — Measure Platform Performance & Package an Accessible Handover

**Owner:** Omar

**Question to understand:** Which declared asset/CVE/query volumes represent the final benchmark?

**Method:** Measure pagination, indexes and concurrency before adding infrastructure. Preserve pinned dependencies, source/model licenses and clean restore; no enterprise-scale claim from the student lab.

**Example output:** `experiments/platform/load_profile.py`

**Prerequisites:** P10, P11, P12, P13, P14, P15

**Consumers:** Final capability/evidence handover

### UX01 — Research Analyst Decisions and Define the Narrow User Journey

**Owner:** Hams

**Question to understand:** Who is the first user: analyst, approver or administrator, and what must each decide?

**Method:** Low-fidelity user flows and task scenarios; design tool remains the team choice. Hams leads research/design; Omar implements.

**Example output:** `design/research/user-jobs.md`

**Prerequisites:** None planned

**Consumers:** UX02

### UX02 — Prototype Top-10 Triage, Evidence Review and Assistant States

**Owner:** Hams

**Question to understand:** Which summary fields make the top ten actions understandable without hiding affected assets?

**Method:** Contract-driven prototype, progressive disclosure and evidence-first wording. Hams owns design; P05 remains Omar-owned implementation.

**Example output:** `design/prototypes/triage-flow.html`

**Prerequisites:** UX01, P02

**Consumers:** P05, UX03

### UX03 — Test Analyst Task Completion and Hand Off UX Corrections

**Owner:** Hams

**Question to understand:** Which tasks can reviewers complete correctly without coaching?

**Method:** Task-based usability study; no invented participant count or target success percentage. Hams leads; Omar implements corrections.

**Example output:** `design/usability/protocol.md`

**Prerequisites:** UX02, P05

**Consumers:** Final capability/evidence handover

### D17 — Normalize Fortinet Advisory Revisions for One FortiOS Profile

**Owner:** Amr

**Question to understand:** Can the public PSIRT/RSS and per-advisory CSAF mechanism be fetched reproducibly under current terms?

**Method:** Vendor assertions and typed revision links; public RSS is discovery, not proof that all revisions are captured. This profile is conditional and does not block the Ubuntu core.

**Example output:** `vulnerability-intelligence/fortinet/source-review.md`

**Prerequisites:** D02, C03

**Consumers:** Final capability/evidence handover

### D18 — Qualify Tool Trust, Data Rights and Deployment Constraints

**Owner:** Amr

**Question to understand:** Which exact artifact/version/license and owner apply to each enabled dependency?

**Method:** Evidence-based trust/rights register with release-specific scope; legal or procurement confirmation remains required where the terms are unclear.

**Example output:** `governance/tool-trust-register.csv`

**Prerequisites:** None planned

**Consumers:** P17

### P17 — Validate Disconnected Installation and Versioned Update Bundles

**Owner:** Omar

**Question to understand:** Which exact CPU/GPU architecture, RAM, disk and container runtime pass the measured profile?

**Method:** Extend retained Compose deployment and local PostgreSQL/evidence paths; no Kubernetes requirement. Offline qualification is a planned product milestone, not a claim that the current planning website runs the product.

**Example output:** `deployment/offline/bundle-manifest.schema.json`

**Prerequisites:** P14, A06, A09, D18

**Consumers:** Final capability/evidence handover

### A17 — Compare Rule-Based, AI-Assisted and Hybrid Prioritization on Reviewed Organization Scenarios

**Owner:** Hams

**Question to understand:** Does AI or hybrid ranking improve the same reviewed action queue?

**Method:** RESEARCH REQUIRED: reuse D12 rules and A02/A03 data. First build a Python offline comparison harness; choose one low-resource AI candidate after evidence review, then test rules-first hybrid constrained ordering. No fine-tuning in current execution. LLM text is not an authoritative risk probability.

**Example output:** `reports/prioritization/recommended-approach.md`

**Prerequisites:** D12, A03, A04, D15, D14, A13

**Consumers:** A15
