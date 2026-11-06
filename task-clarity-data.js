'use strict';
// Each row: plain-language heading, problem, two design situations, sufficient result,
// research decision, useful entry point, design freedom, optional idea/reason/comparison.
// These explain the plan; none records collected evidence or an executed experiment.
const TASK_CLARITY_ROWS={
 D01:[
  'Find out what our vulnerability sources can actually tell us.',
  'Before building collectors, we need to know which official records describe a vulnerability, which supply a fix, and which facts are missing. Otherwise later code may promise coverage the sources do not provide.',
  ['A CVE exists before an enrichment service adds a score.','A vendor notice names a fix for one operating-system release only.'],
  'Deliver a source register, preserved real sample records and a working ingestion prototype. Explain coverage and missing facts; include authoritative fixed and unfixed evidence for a supported lab OS.',
  'Compare the role of CVE records, enrichment and vendor notices. Investigate access, revisions and usage rights before choosing the enabled sources.',
  'Take one supported lab vulnerability and trace each useful fact to its source. Record what you could not establish.',
  'Choose the fetching and parsing method; agree the resulting fields with D02 and preserve source revisions.',
  ['Add a concise source-gap summary.','Teammates need to see which questions a source cannot answer.','Ask a reviewer to locate missing facts in the existing register and in the added summary; compare correctness and lookup time.']
 ],
 D02:[
  'Give advisory records one shared format without losing their meaning.',
  'Providers describe vulnerabilities differently. We need a checkable format that keeps their identities, assertions and revisions separate while allowing the rest of the project to read them consistently.',
  ['An advisory has a GHSA identifier but no CVE.','One notice discusses several CVEs; it must not turn them into one vulnerability.'],
  'Deliver the versioned advisory schema, normalized examples and revision/migration rules. Replaying the same input must not create extra logical records, and each decision field must link to its raw source revision.',
  'Decide which relationships mean the same vulnerability, related vulnerabilities or a notice covering several vulnerabilities. Compare required, optional and provider-specific fields on D01 samples.',
  'Place two differently shaped D01 records side by side and explain how each fact survives normalization.',
  'Choose internal representations and validation tools within the shared contract; coordinate breaking changes with Omar.',
  ['Make schema errors easier to act on.','A producer can fix a sample faster when the error identifies the field and reason.','Compare reviewer correction time and correctness on the same invalid samples, including ambiguous identities.']
 ],
 D03:[
  'Keep the CVE collection up to date without losing changes.',
  'The project needs an initial collection and a reliable way to apply later edits. A failed batch or a repeated record must not silently skip an update or create duplicates.',
  ['The process stops halfway through a batch and starts again.','A previously active CVE is amended or rejected by its source.'],
  'Deliver baseline ingestion, incremental updates, replay tools and source-health events. Record durable checkpoints, test restart/new/amended/rejected inputs and expose stale status during an outage.',
  'Investigate the source revision mechanism and decide when an update is durably processed before advancing its checkpoint.',
  'Write a small sequence of new, repeated and changed records; describe the database state expected after each replay.',
  'Choose batching and retry strategy within P03 storage and the D02 format; preserve revision history.',
  ['Improve catch-up batch sizing.','A long interruption may create a backlog.','Compare the accepted batching baseline and a candidate on the same replay backlog; measure completion time, resource use and missed/duplicate revisions.']
 ],
 D04:[
  'Add NVD information while keeping the core records usable.',
  'Enrichment may be late, unavailable or revised. Users still need the CVE and sufficient vendor evidence, with a clear indication of what enrichment is missing.',
  ['NVD has no enrichment for an otherwise assessable CVE.','A rate limit interrupts fetching after some records have been received.'],
  'Deliver an enrichment adapter and visible enrichment states. Preserve revised assertions, keep the core path available, and test backoff without skipping a checkpoint.',
  'Compare missing enrichment, provider failure and changed data. Decide how each state and its source revision reaches downstream consumers.',
  'Follow one CVE through present, absent and amended enrichment examples before designing the update behavior.',
  'Choose the adapter and recovery method; keep NVD assertions attributable rather than overwriting another provider silently.',
  ['Make delayed-enrichment recovery more selective.','Repeatedly requesting unchanged data may waste time and quota.','Replay an equal mix of delayed and unchanged records under the same limits; compare requests, catch-up time and missed revisions.']
 ],
 D05:[
  'Work out which Ubuntu packages are affected and which fixes apply.',
  'A package name or upstream version alone can give the wrong answer. Ubuntu release, source package and full distribution revision matter when linking an installed package to vendor evidence.',
  ['Ubuntu backports a fix while retaining an older-looking upstream version.','A fixed version for one Ubuntu release does not apply to another release.'],
  'Deliver the Ubuntu adapter, affected/fixed assertions, patch candidates and labelled cases. Preserve release/package identity and vendor evidence, including unfixed vulnerabilities that are absent from fix-only notices.',
  'Investigate how Ubuntu CVE records and notices differ, and how binary packages, source packages and distribution version comparisons connect.',
  'Choose one backported-fix example and one unfixed example. Explain the vendor evidence before writing the comparison logic.',
  'Choose parser organization and test cases; preserve the full vendor semantics that D09 needs.',
  ['Add a clearer explanation of backported fixes.','Reviewers may misread an older-looking version as vulnerable.','Compare explanation correctness and review time on the same reviewed backport cases; keep all source and release references.']
 ],
 D06:[
  'Qualify a narrow Windows and Red Hat advisory extension.',
  'Another operating-system family brings different update and version rules. We need proof for selected profiles before claiming broader support.',
  ['A Windows machine lacks an old KB but has a superseding update.','A Red Hat fix applies to a particular product stream and architecture.'],
  'Deliver scoped vendor adapters and a compatibility matrix for the declared profiles. Test update supersedence and product-stream/backport rules, and document unsupported or missing evidence.',
  'Research the selected Windows product/build relationships and Red Hat product identifiers. Establish which fields allow a defensible decision.',
  'Declare the exact test profiles and trace one vendor assertion to the inventory fields needed to interpret it.',
  'Choose implementation details within the existing D02 contract; expanding the supported profiles needs review.',
  ['Improve the unsupported-case explanation.','Users should know which missing field prevents an extension from being qualified.','Give reviewers the same unsupported cases with each explanation; compare whether they identify the correct limitation and next evidence need.']
 ],
 D07:[
  'Keep useful package advisories even when they have no CVE.',
  'Some package advisories use another identifier or version scheme. Losing them or comparing their versions as plain text would distort the project coverage.',
  ['Two identifiers are aliases for one vulnerability.','An advisory is withdrawn after it was used in a recommendation.'],
  'Deliver the scoped package advisory adapter, a non-CVE example and attribution export. Preserve native IDs, alias meaning and withdrawals; unsupported version rules must remain unknown.',
  'Compare aliases with related/upstream links and investigate version semantics for the selected package ecosystems.',
  'Take one supported advisory without a CVE and show how its identity, affected range and source revision enter D02.',
  'Choose the adapter design and cases while retaining the native source meanings.',
  ['Explain identity links more clearly.','A reviewer may need to distinguish an alias from a related advisory.','Compare correct identity grouping and review time on the same alias/related/withdrawn examples.']
 ],
 D08:[
  'Turn observed software into possible matches that can be checked.',
  'Collectors and advisory sources may name the same product differently. We need scoped candidate identities before deciding whether a vulnerability actually applies.',
  ['The same package name appears in two different ecosystems.','The product is recognizable but its installed version is unknown.'],
  'Deliver product-identity normalization, the candidate API and structured evidence gaps. Keep ecosystems and assets separate, and label a candidate with missing version evidence as needing evidence.',
  'Compare vendor-native identities, package URLs and CPE where appropriate. Decide what evidence supports a candidate and what still prevents an applicability verdict.',
  'Map one C03 observation to a D05 package assertion and list the identity fields needed for a reliable candidate.',
  'Choose normalization rules and lookup structures; D09 owns the subsequent applicability verdict.',
  ['Improve ambiguous-candidate explanations.','A teammate should know which extra fact distinguishes competing identities.','Use the same reviewed ambiguous observations to compare correct candidate retention and time to identify the missing fact.']
 ],
 D09:[
  'Decide whether a vulnerability applies, and show the evidence.',
  'A plausible product match is not a verdict. The project needs a reproducible affected, not affected or unknown decision using the right vendor rules and the exact observation.',
  ['A version sits exactly on an inclusive or exclusive range boundary.','A vendor backport fixes an issue despite a generic upstream range match.'],
  'Deliver the applicability engine, explain endpoint and boundary corpus. Test native version rules and configuration requirements, retain input revisions and reasons, and keep unsupported rules unknown.',
  'Compare each supported ecosystem native comparator and investigate epochs, release revisions, backports and range boundaries.',
  'Write an evidence-backed decision table for one affected, one fixed and one missing-evidence case before implementing the rule.',
  'Choose rule organization and trace representation; a new comparator or definitive verdict still needs reviewed evidence.',
  ['Make rule traces easier to inspect.','Correct verdicts can still be hard for a reviewer to reproduce.','Compare reviewer verdict/reason accuracy and inspection time on identical frozen boundary cases, without hiding rule inputs.']
 ],
 D10:[
  'Check imported component lists and vendor statements before trusting them.',
  'A software component list or a statement that a vulnerability does not apply may be stale or refer to another product. Importing it must not silently suppress a finding.',
  ['An old component inventory arrives after newer live evidence.','A not-affected statement names a different product version.'],
  'Deliver scoped SBOM/VEX import, attributable statements and a conflict review path. Check product/version, source trust and age; every suppression needs evidence, a reason and review.',
  'Investigate the formats actually available from the test product and decide when a statement applies to the observed asset.',
  'Compare one applicable statement with one stale or wrong-product statement and explain the different decisions.',
  'Choose import and conflict presentation methods; retain D09 applicability authority and provenance.',
  ['Improve conflict review cues.','Reviewers may miss why imported and collected facts disagree.','Compare conflict detection accuracy and review time on the same mixed-age/wrong-product cases.']
 ],
 D11:[
  'Keep exploitation signals and forecasts dated and distinct.',
  'Observed exploitation and a probability forecast answer different questions. Missing values, scores and percentiles must keep their meanings when used for prioritization.',
  ['A CVE has no EPSS value; that does not mean a zero probability.','A known-exploited CVE also has a low forecast score.'],
  'Deliver dated threat-enrichment snapshots and the update job. Retain KEV evidence, EPSS probability/percentile and missing states separately, with source dates and reproducible tests.',
  'Investigate each signal field, its date and missingness. Decide how later consumers can tell observed exploitation from a forecast.',
  'Annotate a present, a missing and a low-score known-exploited example for the D12 policy reviewer.',
  'Choose storage/update implementation with P03; D12 decides how the signals affect policy.',
  ['Show signal changes more clearly.','A reviewer may need to explain why a priority input changed.','Compare correct change interpretation and lookup time with the baseline dated snapshots and an added change summary.']
 ],
 D12:[
  'Explain why some confirmed findings deserve attention first.',
  'Severity alone cannot represent exposure, exploitation and organizational context. We need a transparent policy that people can inspect and that Hams can use as the baseline for AI prioritization.',
  ['Two affected assets have different reviewed business criticality.','Known exploitation must remain visible despite a low forecast.'],
  'Deliver a versioned priority policy, rank/explain API and baseline notebook. Every band needs a trace; disclose missing context and retain the policy revision with the decision.',
  'Investigate which exposure and criticality facts are actually available. Compare policy choices on reviewed scenarios without inventing organization context.',
  'Rank a small reviewed set by an explicit decision table and ask the team to explain disagreements.',
  'Choose transparent policy representations and explanations; Hams owns comparison of AI/hybrid prioritization in A17.',
  ['Improve explanations for tied priorities.','An analyst may need to distinguish equally ranked findings.','Use the same policy and reviewed cases; compare decision correctness and review time for baseline and expanded tie explanations.']
 ],
 D13:[
  'Recheck the affected work when its evidence changes.',
  'An updated advisory or observation can make an old finding or answer wrong. We need to identify the relevant assets and retire stale derived advice without repeating unrelated work.',
  ['An affected range changes and a previously closed finding may apply again.','Only an advisory description changes, without any change to execution eligibility.'],
  'Deliver the change-to-impact worker, cache invalidation and a before/after timeline. Repeated events must not create duplicate findings; distinguish material assessment changes from text edits.',
  'Decide which fields affect matching, priority, fix options or display only. Investigate how to find every impacted asset from a changed source.',
  'Trace one changed range through an affected asset and the cached advice that must be invalidated.',
  'Choose impact indexes and worker logic within P07; reuse the shared job state rather than a second queue.',
  ['Reduce unnecessary reassessment.','Broad rechecks can consume resources without changing decisions.','Replay the same change sequence against the baseline and candidate; measure work, latency and any missed affected assets.']
 ],
 D14:[
  'Link findings to vendor-backed fixes and realistic alternatives.',
  'The newest release is not automatically the right repair. A useful fix catalog must preserve supported versions, prerequisites and the possibility that no patch is available.',
  ['A compatible supported fix is older than the latest product release.','The vendor offers only a mitigation for the selected issue.'],
  'Deliver a versioned fix/mitigation catalog and API with source provenance, compatibility and prerequisites. Missing fixes remain missing; unknown prerequisites prevent execution approval.',
  'Investigate vendor fix/mitigation evidence and which support, entitlement, reboot or compatibility constraints are known.',
  'For one assessed Ubuntu finding, compare a documented fix and any documented alternative with their prerequisites.',
  'Choose catalog representation and update logic; C09 checks runner eligibility and C10 controls approval.',
  ['Explain rejected fix options.','An analyst may wonder why the latest version was not selected.','Compare reviewer selection accuracy and decision time on identical constrained cases with baseline and expanded rejection reasons.']
 ],
 D15:[
  'Find out where our matching engine is right and wrong.',
  'The engine cannot certify itself by using its own outputs as labels. We need independently reviewed cases that can reveal false matches, misses and justified unknowns.',
  ['A backported fix should count as a negative case rather than a missed vulnerability.','A missing version leaves a case unknown, rather than a convenient correct answer.'],
  'Deliver a frozen benchmark manifest, reviewed labels and reproducible evaluation. Report scope, dates, denominators and errors; the proposal detection percentage remains a target until measured.',
  'Decide how reviewers establish expected answers independently of matching code and how the supported cases represent positive, negative and ambiguous outcomes.',
  'Have a reviewer justify a small set from vendor evidence before comparing it with the engine.',
  'Choose benchmark organization and error analysis; keep final labels and evaluation separate from tuning.',
  ['Improve the error breakdown.','An overall metric can hide repeated failure on one supported case type.','Compare which actionable defects reviewers identify from aggregate metrics versus a case-type breakdown on the same frozen results.']
 ],
 D16:[
  'Measure how long knowledge takes to become usable.',
  'A successful fetch does not prove that new public information reached matching or reassessment on time. We need measured stage timings and honest outage recovery.',
  ['A source is unavailable while the last stored snapshot remains accessible.','A delayed record lacks a trustworthy publication timestamp.'],
  'Deliver the freshness dashboard, outage runbook and measured report. Separate publication, first observation, normalization and reassessment; disclose missing dates, delays and recovery limits.',
  'Decide which timestamps and observation window support each metric, and how to report records whose upstream timing is unknown.',
  'Trace one real record across the stages, then design a labelled interruption/recovery replay.',
  'Choose instrumentation and reporting; do not turn a source-limited timing target into a universal promise.',
  ['Improve bottleneck diagnosis.','Operators need to know which stage caused a delay.','Compare correct stage identification and diagnosis time with the existing metrics and an added delay breakdown.']
 ],
 D17:[
  'Prove advisory support for one declared FortiOS profile.',
  'Appliance advisories need exact model, firmware train and configuration context. We must qualify one defensible profile before offering wider coverage.',
  ['A firmware train matches but a required configuration fact is missing.','A revised advisory changes the fixed-release information.'],
  'Deliver the source review, collector, preserved manifest, normalized assertions and profile qualification. Use the required reviewed feasibility sample; retain revisions and fail unresolved access/version gates.',
  'Investigate reproducible public advisory access, applicable terms, affected ranges and required inventory fields for the selected profile.',
  'Declare the profile and trace one reviewed advisory to a labelled inventory import before expanding the sample.',
  'Choose parsing and review tools within D02/C03. Firmware redistribution and automated appliance changes are outside this task.',
  ['Make revision changes easier to review.','A new advisory revision may change the applicable fix.','Compare reviewer identification of material changes using the baseline records and an added field-level explanation on the same revision pairs.']
 ],
 D18:[
  'Check what we may use, deploy and redistribute.',
  'A public download does not answer every usage-rights or data-boundary question. The team needs a documented decision for each enabled source, model, runtime and release artifact.',
  ['A model permits one use but has restrictions relevant to distribution.','A service sends inventory or prompts beyond the intended deployment boundary.'],
  'Deliver the trust register, rights matrix, data-flow boundaries and labelled business assumptions. Record versions, evidence, reviewer and renewal triggers; unresolved restrictions block the affected capability.',
  'Investigate the exact artifact terms and flows for internal use, service use, redistribution and customer data. Keep unverified interpretations explicit.',
  'Take one enabled source and one model/runtime and trace who publishes them, their terms and where project data goes.',
  'Choose register structure and evidence organization; hand concrete configuration actions to the relevant owner rather than assuming legal rights.',
  ['Highlight renewal triggers more clearly.','A dependency update may invalidate a previous usage decision.','Replay the same version/terms changes and compare missed reviews and review time with baseline and improved trigger tracking.']
 ]
};
Object.assign(TASK_CLARITY_ROWS,{
 P01:[
  'Prove a small working backend on the team available hardware.',
  'A framework choice should reflect what the team can build and maintain. Hardware and skill assumptions need a small reproducible test before the architecture grows.',
  ['A candidate endpoint works only on its author machine.','The planned stack exceeds the available memory or learning time.'],
  'Deliver a working endpoint/migration spike, environment measurements and the stack decision record. Have another teammate reproduce the endpoint and justify the framework against measured fit.',
  'Compare maintainable backend candidates and actual CPU/RAM/disk/virtualization/capacity constraints rather than assumed familiarity.',
  'Build one tiny request-to-database path and record setup effort and resource use on a team machine.',
  'Choose the feasible framework and spike design; coordinate shared data needs before expanding components.',
  ['Reduce setup friction.','A good choice can still be difficult for teammates to reproduce.','Compare fresh setup completion and time with the accepted instructions and a candidate setup helper on the same measured profile.']
 ],
 P02:[
  'Agree the shared formats that let team components connect.',
  'A collector, advisory adapter and UI can each work alone yet disagree on IDs, timestamps or unknown values. Shared contracts make those boundaries explicit before integration.',
  ['The producer supplies a missing value that a consumer treats as a clean result.','A breaking field change reaches a consumer without a new format version.'],
  'Deliver OpenAPI, shared schemas and the fixture pack with accepted producer/consumer examples. Record error meanings, version policy and each owner review of their boundary.',
  'Compare C03/D02 observations and advisory samples. Investigate which fields and error states the actual consumers need.',
  'Run one producer sample through one consumer check and document the first disagreement.',
  'Choose contract tools and representations with the domain owners; C03/D02 retain domain meaning rather than becoming duplicate schema engines.',
  ['Improve contract mismatch messages.','An integration owner needs to locate the incompatible field quickly.','Compare correction accuracy and time on identical invalid/version-mismatched fixtures with baseline and clearer errors.']
 ],
 P03:[
  'Store the project evidence with reliable relationships and history.',
  'Assessments must trace the exact observations and source revisions they used. Duplicate logical records or broken migrations would make later results hard to trust.',
  ['The same source revision is imported twice.','A schema migration fails while existing evidence must remain usable.'],
  'Deliver the relational schema and recoverable migrations with uniqueness and revision relationships. Prove that duplicate source revisions do not multiply and assessments resolve their exact inputs.',
  'Compare relational keys with flexible fields and investigate uniqueness, indexing and migration/recovery requirements for the actual contracts.',
  'Trace one observation, advisory and assessment across the proposed keys, including an amended source revision.',
  'Choose storage layout and migrations within P02 contracts; preserve evidence history and consumer compatibility.',
  ['Improve evidence lookup efficiency.','A correct schema can still make common trace queries slow.','Compare the same trace queries and dataset on baseline and candidate indexes; measure latency, storage and write cost.']
 ],
 P04:[
  'Enforce who can see and change each project object.',
  'Hiding a button does not enforce a role. API requests, object access and revoked sessions need checks at the authorization boundary.',
  ['A guest requests private evidence by changing an object ID.','A revoked session tries to perform a previously allowed action.'],
  'Deliver login/session handling, revocation and object-level four-role authorization with evidence. Test private-data denial, expired/revoked sessions and attempts to self-promote.',
  'Investigate a maintained auth component for the chosen framework and compare session expiry/rotation/logout/CSRF behavior with the deployment model.',
  'Write a small role-object-action matrix and prove one allowed and one denied API request directly.',
  'Choose qualified implementation tools; preserve server-side checks for every data/action path.',
  ['Improve authorized denial guidance.','A user should understand a denied action without learning restricted object details.','Compare correct next actions on identical denied requests using baseline and clearer safe messages; check for information leakage.']
 ],
 P05:[
  'Build the first usable screens with honest data states.',
  'Users need to distinguish loading, empty, failed, stale and unknown evidence. A clean-looking screen can mislead if those states all look like success.',
  ['The API returns an unknown assessment rather than not affected.','A keyboard user needs to reach the same evidence as a mouse user.'],
  'Deliver the minimal dashboard using Hams design and shared API states. Keep unknown distinct from safe, support keyboard navigation and prove the same contract works when real data replaces labelled references.',
  'Investigate the required first-slice screens and how each API error/uncertainty state should be shown.',
  'Implement one asset/evidence screen from the reviewed UX02 design with loading, unknown and failure examples.',
  'Choose frontend implementation details; Hams retains UX research/design and reviews design fidelity.',
  ['Improve evidence-state explanations.','Users may recognize a warning but still not know what it means for a decision.','Compare correct user interpretation and task time on the same states with baseline and revised wording/layout.']
 ],
 P06:[
  'Connect one real asset all the way to an evidence-backed screen.',
  'Separate components do not prove an integrated workflow. One real authorized observation must reach storage, assessment and UI without losing its evidence identity.',
  ['A displayed finding links to a different observation revision.','A demonstration uses a fixture while claiming the result is live.'],
  'Deliver the real observation-to-screen demonstration with matching IDs and evidence links across API, database and UI. Label references/replay separately and reproduce the trace.',
  'Choose a suitable authorized observation/advisory pair and investigate where identity or revision information could be lost.',
  'Trace one case by its assessment ID across the components and resolve the first broken boundary.',
  'Choose integration/debugging methods; retain existing collector, matching and design ownership.',
  ['Improve cross-component trace inspection.','A broken integration is hard to diagnose when each component uses a different view.','Compare correct fault localization and diagnosis time on the same replay with baseline and a linked trace view.']
 ],
 P07:[
  'Keep job state safe when workers crash or requests repeat.',
  'A lost callback does not tell us whether an operation happened. The platform needs durable business state, duplicate protection and a way to reconcile uncertain side effects.',
  ['A worker dies after starting a task but before recording its callback.','The same mutation request arrives twice.'],
  'Deliver the durable job ledger and measured transport decision. Exercise restart, duplicate dispatch, leases/attempts and reconciliation without losing a business job or blindly repeating a mutation.',
  'Compare a feasible transport against actual machine/learning constraints. Decide which idempotency, lease and heartbeat facts the ledger must retain.',
  'Describe one job through request, dispatch, interruption and recovery, identifying where the durable state changes.',
  'Choose transport and worker implementation; the ledger remains the shared job truth used by collection and patch work.',
  ['Improve uncertain-job diagnosis.','An operator needs to distinguish waiting from an operation with an unknown side effect.','Compare correct reconcile/retry decisions and diagnosis time on identical fault replays with baseline and clearer attempt history.']
 ],
 P08:[
  'Allow runners to execute only authenticated, approved operations.',
  'Browser, API and model processes must not gain arbitrary execution authority. Runner requests need typed operations, target scope, expiry and revocable credentials.',
  ['An expired runner credential sends a request.','A request substitutes a target or asks for an arbitrary shell command.'],
  'Deliver runner enrollment/gateway checks and denial tests on API and runner sides. Revalidate target, operation, expiry and plan; reject unsupported execution and revoked authority.',
  'Investigate runner authentication/revocation and the exact fields both sides must validate before an operation.',
  'Trace one approved read-only operation and a modified denied envelope across both boundaries.',
  'Choose credential and transport implementation within the approved trust design; operation capabilities remain explicit.',
  ['Improve rejection diagnostics.','The team needs useful failures while preserving runner and target secrets.','Compare correct cause identification on the same malformed/expired envelopes with baseline and clearer safe reason codes.']
 ],
 P09:[
  'Show whether source knowledge is current, missing or failing.',
  'A recent fetch attempt may have failed. Operators need to see last success, source revisions and missing enrichment without mistaking available old data for fresh data.',
  ['A failed attempt occurs after the last successful update.','The CVE is present but one enrichment source has no result.'],
  'Deliver source-health and changed-knowledge views using the real update states. Expose attempts versus successes, freshness and inspectable source revisions.',
  'Investigate the fields produced by ingestion jobs and distinguish missing enrichment from an outage or a delayed update.',
  'Map one successful and one failed update to the UI fields and ask a reviewer which information is safe to call current.',
  'Choose implementation and display details with Hams; D16 owns freshness measurement semantics.',
  ['Improve source-failure prioritization.','An operator may struggle to see which outage affects a current workflow.','Compare correct incident identification and time using the same outage cases with baseline and evidence-linked impact cues.']
 ],
 P10:[
  'Help an analyst review findings, priorities and evidence changes.',
  'A priority list needs reasons and history so a person can decide what deserves attention. Unknown results and restricted exports must keep their actual meaning.',
  ['A finding changes priority after a policy or evidence update.','A user exports a filtered list containing only their authorized objects.'],
  'Deliver the triage workbench with priority reasons, current/previous evidence and scoped exports. Keep unknown separate from not affected and enforce the same access scope in UI/API/export.',
  'Investigate which fields are authoritative versus predicted and which history makes a priority change understandable.',
  'Implement one reviewed finding with a before/after change and trace the reason back to D12 inputs.',
  'Choose frontend/API integration details using Hams design; Mahrous retains policy and applicability decisions.',
  ['Improve changed-finding review.','An analyst may need to inspect many unchanged fields to find the important change.','Compare correct priority-change interpretation and task time on identical findings with baseline and focused change cues.']
 ],
 P11:[
  'Give the assistant one permission-checked entry point.',
  'Chat must obey current user scope before retrieval and tool calls. Model downtime should not remove the basic evidence workflow.',
  ['A user asks a plausible question about an unauthorized asset.','The model is unavailable while deterministic evidence remains accessible.'],
  'Deliver the authenticated assistant gateway/interface with scoped context, typed integration limits, provenance/uncertainty and working fallback. Verify denied access and model-outage behavior.',
  'Investigate where scope checks run before retrieval and each tool call, and which time/usage/model-adapter limits the gateway needs.',
  'Follow one allowed and one denied assistant request from UI through retrieval and tool authorization.',
  'Choose gateway implementation; A10 uses this same boundary and Hams owns answer/retrieval behavior.',
  ['Improve fallback navigation.','A user should still reach the evidence when generation fails.','Compare successful evidence lookup and time on identical model-outage cases with baseline and clearer fallback links.']
 ],
 P12:[
  'Show patch campaign progress without bypassing approval or verification.',
  'A campaign has proposal, approval, execution and verification states. Installation success or stale approval must not silently become a closed finding.',
  ['The target or plan changes after approval.','Installation succeeds but the result still needs independent verification.'],
  'Deliver the guarded campaign workflow and progress UI using C10 policy and runner outcomes. Invalidate changed approvals and expose reboot, partial failure and unknown states for reconciliation.',
  'Investigate allowed transitions and the effect of expiry, target drift and uncertain execution on both API and UI.',
  'Walk one approved plan through success, drift and lost-contact variants using the same state contract.',
  'Choose state persistence/UI integration; reuse C10 authority and C13 independent verification.',
  ['Improve mixed-outcome summaries.','An operator may mistake partial campaign success for completion of every asset.','Compare correct per-asset outcome interpretation and review time on the same mixed runs with baseline and clearer summaries.']
 ],
 P13:[
  'Deliver the same durable lifecycle event through retries.',
  'A business update and its SIEM event must not diverge during failures. Delivery may repeat while the event identity and business meaning remain stable.',
  ['The business change commits but the SIEM route is temporarily unavailable.','A retry delivers an event that the receiver has already seen.'],
  'Deliver the transactional outbox and retry/replay path with stable IDs and observed SIEM evidence. Preserve attempts and correlation, and prevent retries from creating duplicate business findings.',
  'Investigate consumer event fields, correlation IDs and retry/replay checkpoints with the C15 integration owner.',
  'Trace one business update and its event ID through an interrupted delivery and successful replay.',
  'Choose outbox implementation and transport; C15 owns Wazuh mapping/decoding proof.',
  ['Improve delivery-stage diagnostics.','The team needs to find whether an event is pending, delivered or rejected downstream.','Compare correct stage diagnosis and recovery time on identical event replays with baseline and linked delivery history.']
 ],
 P14:[
  'Deploy the measured minimal stack and prove it can be restored.',
  'A deployment is useful only if another teammate can start it, services stay within their intended boundaries and a restored database still resolves its evidence.',
  ['A fresh machine starts from the release instructions.','A backup is restored after the active instance is lost.'],
  'Deliver the connected deployment/release bundle, HTTPS/private-service configuration and restore evidence. Test a fresh setup, working evidence references and absence of secrets in the source/bundle.',
  'Investigate the feasible hosting profile, private ports, durable storage, secret handling and measured resource needs before choosing layout.',
  'Deploy one minimal workflow on the selected measured profile, then restore a small evidence set from backup.',
  'Choose deployment packaging and service layout within the declared profile; disconnected operation is qualified separately in P17.',
  ['Improve restore diagnosis.','An operator may restore data but miss broken artifact references.','Compare successful evidence recovery and time with the accepted runbook and an added post-restore verification summary.']
 ],
 P15:[
  'Test the integrated security and recovery boundaries before release.',
  'A module can pass alone while a cross-module route bypasses authorization or approval. Release evidence needs realistic faults and declared residual risks.',
  ['A stale approval reaches a runner through a different API path.','A cross-role request obtains evidence through an overlooked integration.'],
  'Deliver the cross-module security/fault evaluation with reproducible cases and dispositions. Resolve known critical authorization/unsafe-execution issues before the release gate and disclose remaining risks.',
  'Investigate applicable versioned controls for the actual scope and map the integrated data/action paths that need negative tests.',
  'Trace one privileged workflow end to end and challenge each boundary with an invalid role, expired approval or interrupted operation.',
  'Choose test tooling and authorized fault cases; passing the declared suite does not prove universal security.',
  ['Improve regression failure grouping.','Several symptoms can come from one boundary defect.','Compare root-cause identification and diagnosis time on the same failures with baseline reporting and a grouped boundary trace.']
 ],
 P16:[
  'Hand over a release with measured limits and reproducible setup.',
  'A final product claim needs a declared machine, workload and support scope. Another teammate should be able to run the workflow without hidden knowledge.',
  ['A performance result omits the dataset size or hardware.','A fresh teammate cannot reproduce the release without its author.'],
  'Deliver the final release, accessible handover and benchmark with hardware, dataset, methods and support limits. Record fresh-teammate reproduction and avoid unsupported scale claims.',
  'Investigate representative asset/CVE/query loads and identify a measured bottleneck before optimizing it.',
  'Have another teammate run the documented workflow, then benchmark the declared workload and record failures.',
  'Choose benchmark tooling and handover structure; keep comparisons reproducible under the same conditions.',
  ['Reduce a measured bottleneck.','A specific slow query may limit the supported workflow.','Compare baseline and candidate on the same hardware/data/load; report latency distribution, resource cost and correctness regressions.']
 ],
 P17:[
  'Prove the qualified stack can install and run without internet access.',
  'Disconnected users need all approved runtime artifacts and a controlled update/recovery path. Hidden downloads or unavailable patch content would break the claimed profile.',
  ['A clean installation tries to fetch an uncached model or package.','A tampered or incompatible update bundle is imported.'],
  'Deliver the bundle manifest, export/import tools, runbook and qualification report. Test clean install, core operation with public egress blocked, integrity/authenticity rejection and operator-reproduced update/recovery.',
  'Investigate the exact hardware/runtime profile, artifact rights and complete dependency list, including models/tokenizers and data snapshots.',
  'Inventory the artifacts used by one qualified connected installation, then test a clean install from that approved bundle with egress blocked.',
  'Choose bundle and update implementation within D18 rights and P14 deployment boundaries; disclose source age and patch availability.',
  ['Improve offline missing-artifact diagnostics.','An operator may struggle to identify an incomplete bundle.','Compare correct missing-artifact diagnosis and recovery time with baseline and a manifest-linked check on the same incomplete bundles.']
 ],
 UX01:[
  'Understand the decisions the first users need to make.',
  'Screens should follow analyst, approver and administrator decisions rather than a collection of features. The team needs a shared narrow journey before designing detailed interfaces.',
  ['An analyst confuses a CVE with an asset-specific finding.','A user sees an unknown result and interprets it as safe.'],
  'Deliver the required user jobs, narrow journey, exception paths and research/review notes. State participant limitations, use the shared fixture/scope versions and obtain Hams/Omar handoff review.',
  'Investigate the first users, their decisions and evidence needs. Compare interpretations of vulnerabilities, findings and grouped remediation actions.',
  'Ask a reviewer to describe one triage decision in their own words and identify what evidence they need before acting.',
  'Choose research and journey-mapping methods; Omar reviews implementation feasibility and implements the UI.',
  ['Improve exception-path understanding.','A standard journey may hide how users react to missing or denied evidence.','Compare correct decisions and confusion points on the same exception scenarios with the baseline journey and clearer alternatives.']
 ],
 UX02:[
  'Design the narrow workflow with uncertainty and approval states included.',
  'A useful prototype must explain evidence, assistant limits and guarded approval, including failure states. A happy-path picture alone leaves implementation gaps.',
  ['The top-ten queue contains a finding with stale or missing evidence.','An assistant draft appears beside an action requiring human approval.'],
  'Deliver the interactive journey prototype, component states, API-field map and reviewed handoff. Cover queue, evidence, assistant and approval flow; obtain Omar acceptance and record unresolved questions.',
  'Investigate which summaries make triage understandable and how unknown/stale/error states affect the next decision.',
  'Prototype one finding from queue to evidence review and show how the journey changes when required information is missing.',
  'Choose interaction/layout and prototype methods within UX01/P02; Omar owns production frontend implementation.',
  ['Improve uncertainty wording.','Users may read an ambiguous label as a confident conclusion.','Compare correct interpretation and next-action choices on identical reviewed states using baseline and candidate wording/layout.']
 ],
 UX03:[
  'See whether users can complete the workflow without coaching.',
  'An understandable design must work for someone who did not build it. Observed task outcomes reveal problems that author walkthroughs can miss.',
  ['A reviewer cannot find the evidence supporting a priority.','A user treats an AI draft as approval to execute.'],
  'Deliver the protocol, recorded outcomes, ranked corrections and report with denominators and participant limits. Hand Omar reproducible issues and expected behavior; resolve safety-critical design confusion.',
  'Investigate where users make incorrect decisions or need help. Define success and observation rules before the sessions.',
  'Ask a reviewer to complete one realistic task without hints and record what they do and misunderstand.',
  'Choose session and analysis methods; distinguish observed outcomes from proposed fixes and recheck meaningful corrections.',
  ['Improve a measured usability bottleneck.','One confusing step may account for repeated incorrect decisions.','Compare the accepted flow and a candidate correction on equivalent reviewed tasks; record correct completion, help needed and time.']
 ]
});
Object.assign(TASK_CLARITY_ROWS,{
 A01:[
  'Define what the AI is being asked to predict or explain.',
  'Category, impact, severity and assistant behavior are different tasks. Unclear labels make training and evaluation unreliable even when a model produces confident answers.',
  ['An advisory supports more than one impact category.','A source does not mention an impact; that is not automatically a reviewed negative label.'],
  'Deliver the taxonomy, AI contract and ten adjudicated examples with reviewers. Define positive/negative/unknown outcomes and keep predicted labels distinct from source-backed severity.',
  'Investigate which labels overlap and what evidence permits each judgment. Compare reviewer interpretations before freezing the label rules.',
  'Label a small shared set with another reviewer and use the disagreements to improve the definitions.',
  'Choose taxonomy organization and example presentation; coordinate output fields with the platform and evaluation owners.',
  ['Improve explanations for ambiguous labels.','Reviewers may apply a label differently to the same evidence.','Compare agreement and annotation time on the same unseen examples with the baseline rules and added ambiguity guidance.']
 ],
 A02:[
  'Build an AI dataset whose rows can be traced and rebuilt.',
  'A useful training/evidence dataset needs known source revisions and permitted fields. Untraceable rows or private inventory in an export undermine later experiments.',
  ['An advisory changes after a dataset row was created.','A prioritization example includes organization-specific inventory that cannot be published.'],
  'Deliver the dataset manifest and pilot records with source links, hashes and reproducible counts. Preserve usage boundaries and coordinate Amr supplied prioritization inputs without duplicating his collectors.',
  'Investigate allowed fields, source revisions and identity grouping. Decide how the manifest makes each row reproducible and distinguishes real evidence from scenarios.',
  'Rebuild one small pilot set from named source revisions and explain where every field came from.',
  'Choose dataset transformation and organization; Amr retains advisory collection and source rights responsibilities.',
  ['Improve row-level lineage inspection.','Reviewers need to find the source behind a dataset field.','Compare correct provenance lookup and review time on the same rows with baseline and an added lineage index.']
 ],
 A03:[
  'Prepare data splits that cannot leak answers into evaluation.',
  'Aliases, near-duplicate notices and future revisions can make test results look better than they are. Cleaning must also preserve facts such as negation and version strings.',
  ['Two notices describing the same vulnerability land in training and test.','A severity experiment accidentally includes the explicit score it is supposed to predict.'],
  'Deliver preprocessing and a frozen split manifest grouping vulnerability identities and recording time cutoffs/revisions. Keep target fields out of the declared prediction inputs.',
  'Compare cleaning and grouping rules against negation, IDs, versions and near-duplicates. Investigate which timestamp represents information available at each cutoff.',
  'Inspect a small alias/revision family and explain which split it belongs to before automating the partition.',
  'Choose normalization and grouping methods; keep final evaluation data separate from model selection.',
  ['Improve leakage diagnostics.','A split can look valid while a related revision crosses the boundary.','Plant labelled duplicate/revision violations in a development copy and compare detection recall and false alarms with the accepted checks.']
 ],
 A04:[
  'Establish a simple classification result we can reproduce.',
  'The team needs a credible inexpensive baseline before considering heavier models. A single overall score may hide poor rare-label performance or unknown coverage.',
  ['A rare class is missed despite a high overall score.','A different seed or dataset revision changes a reported result.'],
  'Deliver the CPU baseline artifact and report using the frozen data/splits. Report per-label errors and unknown coverage, pin settings and leave the final holdout locked until choices freeze.',
  'Compare keyword and TF-IDF-style baselines for the defined labels. Investigate class imbalance, thresholds and missing-label treatment on validation data.',
  'Run a minimal reproducible baseline on the agreed split and inspect a few errors before proposing another model.',
  'Choose baseline features and validation experiments within A01/A03; any stronger model must justify its added cost.',
  ['Make per-label errors easier to inspect.','Reviewers need to distinguish a data problem from a model weakness.','Compare actionable error identification using baseline aggregate reporting and an added case-linked error view on the same predictions.']
 ],
 A05:[
  'Decide whether better labels or a stronger classifier are worth it.',
  'A bigger model may not solve errors caused by ambiguous labels. This extension needs a measured reason to change the accepted baseline.',
  ['Reviewers disagree about the expected label on an apparent model error.','An encoder improves validation quality but adds more latency or memory.'],
  'When justified, deliver reviewed label revisions and a classifier decision record. Select using validation, retain label provenance and report improvement together with operating cost.',
  'Separate label disagreements from model failures, then compare qualified stronger candidates on the same task and resource constraints.',
  'Classify baseline errors by cause and identify whether a model change would address the largest supported problem.',
  'Choose a candidate and error-analysis method; retaining the baseline is a valid decision.',
  ['Improve the label-disagreement review.','The team may spend effort retraining on unclear labels.','Compare reviewer agreement and time to resolve the same disputed cases with baseline and clearer evidence prompts.']
 ],
 A06:[
  'Split source evidence into searchable pieces without losing context.',
  'A retrieved paragraph can be misleading if it loses its product row, version scope or revision. Searchable units must still lead to the exact supporting source.',
  ['A version table is split so a fix appears beside the wrong product.','A revised or rejected source leaves an obsolete chunk in search.'],
  'Deliver the chunk format and chunker preserving product/version context, source identity and revision. Test source changes and retirement of obsolete evidence.',
  'Compare boundaries that preserve tables and scope against the selected embedding limits. Decide what metadata a retrieval consumer must retain.',
  'Take one advisory with a version table and show which pieces can be read safely on their own.',
  'Choose chunk organization and indexing details; keep source and access metadata available to every consumer.',
  ['Improve table-aware chunking.','Small chunks may separate the facts needed to interpret a fix.','Compare retrieval support correctness and index size on identical reviewed questions/documents using accepted and candidate boundaries.']
 ],
 A07:[
  'Choose search methods by the evidence they retrieve.',
  'Exact IDs, wording and multilingual questions create different retrieval needs. We need judged relevance and actual resource costs before choosing a search configuration.',
  ['An exact CVE query should still find its source.','An Arabic or Arabizi question describes the same issue using different wording.'],
  'Deliver the retrieval benchmark and chosen configuration. Evaluate exact/lexical/hybrid candidates, report language slices and costs, and enforce access filters on every path.',
  'Investigate where lexical search already works and where a qualified multilingual embedding model helps. Judge source relevance independently of the answer generator.',
  'Create a reviewed query/source set containing exact IDs and the supported languages, then measure a simple lexical baseline.',
  'Choose retrieval combinations and validation settings; final test questions cannot be used to tune the winner.',
  ['Improve missing-result explanations.','A user may not know whether evidence is absent or restricted.','Compare correct interpretation and follow-up choices on the same empty/denied searches without revealing unauthorized information.']
 ],
 A08:[
  'Add reranking only if candidate ordering is the measured problem.',
  'A reranker cannot recover a source that initial search never found. It adds cost and needs a specific error pattern to justify it.',
  ['The correct source is in the candidate set but ranked too low.','The correct source is absent from the candidates altogether.'],
  'For a justified extension, deliver the reranker decision record with pinned license/revision, quality-versus-latency ablation and evidence for adopting or rejecting it.',
  'Distinguish candidate absence from poor ordering. Compare qualified small rerankers under the same relevance labels and hardware budget.',
  'Inspect A07 failures and count how many a reranker could actually address.',
  'Choose the qualified reranking method; the first-term core can finish without adopting one.',
  ['Improve reranking diagnostics.','The team needs to see which failure class a new stage actually fixes.','Compare error classification and debugging time with baseline reports and an added before/after candidate trace.']
 ],
 A09:[
  'Choose an LLM that works on our questions and hardware.',
  'Publisher benchmarks do not establish domain reliability or feasibility on the team machines. The selected model needs equal-condition evaluation and a usable fallback.',
  ['A candidate gives an unsupported answer despite relevant evidence.','The model fails to load or exceeds the measured memory budget.'],
  'Deliver the candidate spike results and model decision card with exact revision/runtime/settings, terms and measured resources. Compare the same prompts/evidence and demonstrate deterministic fallback.',
  'Investigate actual serving/tool-format support and candidate terms. Compare supported answer quality, abstention, latency and memory under equal conditions.',
  'Freeze a small project-question set and run one feasible candidate with its resource measurements before broadening the comparison.',
  'Choose qualified candidates, prompts and serving details; report exclusions and failures rather than preselecting a winner.',
  ['Improve failure and abstention messages.','Users need a useful next action when generation is unavailable or unsupported.','Compare correct follow-up decisions on the same unavailable/insufficient-evidence cases with baseline and candidate fallback wording.']
 ],
 A10:[
  'Connect the assistant to approved read-only project tools.',
  'An assistant request must obey the same permissions as the rest of the application. Its fluent answer cannot authorize arbitrary database or operating-system operations.',
  ['A guest asks about an analyst-only asset.','A tool times out while supporting evidence is still available.'],
  'Deliver the assistant API and typed read-only adapters through P11. Preserve citations and uncertainty, test permission denials and return a useful evidence response on timeout.',
  'Map allowed intents to explicit tools and investigate fields needed for citations, evidence revisions and unknown states.',
  'Trace one allowed explanation request and one denied request through P11 to the evidence boundary.',
  'Choose integration details within the single gateway; Hams owns retrieval/answer behavior, and arbitrary SQL/shell/browser tools remain outside the contract.',
  ['Improve tool-failure explanations.','Users need to distinguish unavailable evidence from a denied or timed-out tool.','Compare correct next-action choices on identical failures using baseline and clearer typed reasons without relaxing permissions.']
 ],
 A11:[
  'Explain the next useful evidence request or documented fix option.',
  'An unknown verdict needs a specific missing fact, and a remediation answer needs vendor-backed options that fit constraints. Generic requests and invented versions cannot support action.',
  ['A package version is missing, preventing an applicability decision.','A documented mitigation fits constraints while an upgrade does not.'],
  'Deliver and evaluate the evidence-gap assistant and constrained remediation explanations using retrieved vendor evidence. Identify the useful next measurement and cite valid options; keep execution outside LLM authority.',
  'Investigate which missing fields would change a verdict and which documented alternatives satisfy the selected maintenance constraints.',
  'Take one unknown assessment and one constrained fix case; write the evidence-backed expected request/explanation before generating candidates.',
  'Choose retrieval, wording and evaluation methods; D14/C09/C10 retain catalog, eligibility and approval decisions.',
  ['Make evidence requests easier to act on.','A technically correct request may still leave an analyst unsure what to collect.','Compare successful next-evidence selection and time using the same reviewed gaps with baseline and candidate phrasing; reject invented or unauthorized operations.']
 ],
 A12:[
  'Challenge the assistant at its permission and action boundaries.',
  'Malicious instructions can arrive in source text or tool output. The declared test suite must expose attempts to reveal restricted data or trigger unsupported actions.',
  ['An advisory tells the assistant to ignore its rules and reveal private data.','A bilingual request asks for another role asset evidence.'],
  'Deliver the abuse-case report and regression fixtures with observed outcomes. Record unauthorized disclosures/actions, block affected privileged workflows on failure and disclose residual risk.',
  'Investigate entry points and cross-role paths in the actual assistant/tool design. Decide what observable result constitutes a boundary violation.',
  'Trace a small allowed/denied request pair and add one hostile source-text case for the same data boundary.',
  'Choose attack cases and testing methods within authorized project fixtures; a passing suite is evidence for its cases, not a universal safety guarantee.',
  ['Improve failure minimization.','A long adversarial interaction may obscure the actual boundary defect.','Compare reproducible minimal failures and diagnosis time with the baseline case format and a smaller replay trace.']
 ],
 A13:[
  'Agree how humans will judge the AI before selecting a winner.',
  'Correctness, citation support, clarity and useful abstention need independent criteria. Evaluating only with another LLM or tuning on final questions would weaken the result.',
  ['Two reviewers disagree about whether a citation supports the answer.','A model abstains because the required evidence is genuinely missing.'],
  'Deliver the frozen questions, scoring rubric, final holdout and scored evaluation with reviewer/adjudication records. Report language/task slices, denominators and sample limitations.',
  'Investigate which question categories and failure cases represent the declared workflow, and how reviewers distinguish factual support from readability.',
  'Have two reviewers score a small development set and resolve rubric ambiguity before freezing final evaluation.',
  'Choose rubric presentation and case sampling; keep final holdout separate from model and prompt selection.',
  ['Improve disagreement explanations.','A score alone may hide different interpretations of evidence support.','Compare reviewer agreement and adjudication time with baseline and a clearer evidence-linked scoring form on the same development cases.']
 ],
 A14:[
  'Stop stale or unauthorized answers being reused from cache.',
  'A cached answer can outlive its evidence or a user permission. Reusing it must still respect current source revisions and access scope.',
  ['An advisory revision invalidates a previously generated answer.','A user loses a role but an older privileged answer remains cached.'],
  'Deliver cache invalidation, operational tracking and the AI runbook. Tie entries to evidence/model/prompt/user scope, respond to D13 changes and test revoked-scope and obsolete-evidence cases.',
  'Investigate which revisions and authorization facts belong in cache keys and which events require invalidating impacted chunks or answers.',
  'Follow one answer from generation to evidence change and role revocation; identify when reuse must stop.',
  'Choose cache/index implementation within the shared gateway and event model; measure freshness separately from generation speed.',
  ['Reduce overbroad invalidation.','Discarding unrelated entries can increase generation work.','Replay identical changes/role updates against baseline and candidate invalidation; compare reuse cost and any stale or unauthorized result.']
 ],
 A15:[
  'Test which proposed improvements actually add value.',
  'Adding AI or a feature does not establish a research contribution. We need controlled comparisons showing where a component helps, fails or costs more than it is worth.',
  ['An explanation improves speed but increases incorrect decisions.','A competitor comparison assumes a capability that was never tested under equivalent conditions.'],
  'Deliver reproducible contribution results and ablation tables using A17 and remediation evidence. Keep input/conditions equal, report costs and failures, and limit novelty or superiority claims to supported results.',
  'Decide which component change each comparison isolates and which quality/time measures represent a correct analyst decision.',
  'Choose one falsifiable improvement claim and define the baseline, same-case comparison and failure condition before running it.',
  'Choose experiment design and reporting; a negative result that retains the simpler baseline is valid.',
  ['Improve contribution-result interpretation.','Readers may mistake a narrow gain for general superiority.','Ask reviewers to state the supported claim and limits from baseline and revised reports using the same results; compare overclaims and interpretation time.']
 ],
 A16:[
  'Make the AI work reproducible by another teammate.',
  'Final results depend on exact data, code, models and settings. A demonstration should let someone else reproduce the evidence and distinguish live behavior from replay.',
  ['A fresh machine lacks a private credential used in an experiment.','An offline replay is shown while live intelligence is unavailable.'],
  'Deliver the AI handover pack and demo with pinned artifacts, licenses, hashes and reproduction instructions. Have a teammate reproduce baseline metrics within the stated tolerance and explain limitations.',
  'Investigate all runtime/data/model dependencies needed for a fresh setup and what can be redistributed or replayed.',
  'Ask another teammate to reproduce one baseline from the documented artifact versions and record every missing assumption.',
  'Choose packaging and demo structure; coordinate deployment with Omar and lineage contributions with Amr/Shams.',
  ['Improve the reproduction index.','Reviewers may spend time finding the exact artifact behind a metric.','Compare successful reproduction and setup time with the accepted pack and a claim-to-artifact index on the same environment.']
 ],
 A17:[
  'Find out when AI improves prioritization over transparent rules.',
  'A different ranking is not automatically better. The project needs reviewed organization scenarios and equal-condition comparisons of rules, AI-assisted and hybrid approaches.',
  ['Organization context changes a useful order but not patch eligibility.','A model suggests overriding a permission or hard policy constraint.'],
  'Deliver the reproducible three-family comparison and recommendation with frozen input/label provenance, declared quality/stability/time/cost measures and all supporting reviews. Report unsupported methods and failures; retain the baseline if evidence favors it.',
  'Compare candidate methods against the same D12 baseline and A13 protocol. Investigate available labels/compute and whether gains survive stability and hard-constraint checks.',
  'Freeze the reviewed scenarios, baseline and success/failure measures before selecting candidate settings; keep final holdout out of selection.',
  'Choose qualified ranking methods and explanations; applicability, eligibility and approval authority remain with their existing owners.',
  ['Improve ranking-change explanations.','Reviewers need to see which context fact changed the order.','Compare correct interpretation and review time on identical ranking/context cases with baseline and evidence-linked explanations, preserving constraint checks.']
 ]
});
Object.assign(TASK_CLARITY_ROWS,{
 C01:[
  'Define where collection is allowed before a connector contacts anything.',
  'The team needs an enforceable agreement about targets and operations. An unclear device class or address must not become permission to probe it.',
  ['A requested target is outside the team approved network.','A device class is unknown or requires passive/manual evidence.'],
  'Deliver the lab scope profile and capability matrix, with checks that deny excluded targets before any connector call. Unknown device classes default to no active probe.',
  'Investigate which targets the team controls and which operations each device class can support. Decide the deny rules and the evidence required to allow a capability.',
  'List the actual approved lab targets and a few requests that must be denied; review that boundary before building a probe.',
  'Choose scope representation and validation tools; explicit authorization and pre-contact denial remain required.',
  ['Improve denial explanations.','A teammate needs to correct a request without weakening the scope.','Compare correct resolution of the same denied requests using baseline messages and clearer reason codes; check that no forbidden request becomes allowed.']
 ],
 C02:[
  'Build a lab that another teammate can restore and trust.',
  'Collection and patch experiments need known starting conditions. If the lab cannot be rebuilt, differences between runs may be mistaken for product improvements.',
  ['A patch experiment leaves the test system changed for the next run.','An expected vulnerable-package label has no supporting vendor evidence.'],
  'Deliver the approved lab manifest, known fixture states and evidence-backed expected labels. Have another teammate rebuild one fixture and verify the baseline restoration.',
  'Investigate available hardware, images, licensing and restore methods for the selected profiles. Distinguish documented expectations from observed lab facts.',
  'Choose one disposable approved target and prove that its starting state can be restored and independently checked.',
  'Choose the reproducible lab setup within C01 scope; coordinate collected fields with Shams and execution needs with Omar.',
  ['Reduce baseline preparation effort.','Repeated manual preparation can make experiments slow and inconsistent.','Compare preparation time and verified state differences using the accepted setup and a candidate automation on the same fixture.']
 ],
 C04:[
  'Discover approved endpoints without treating a banner as proof.',
  'The project needs a bounded view of reachable lab devices and service hints. Discovery is only an observation; a banner alone cannot prove the installed package or its patch level.',
  ['A target times out after only part of discovery completes.','A discovered banner looks like a product but supplies no installed-package evidence.'],
  'Deliver the discovery adapter and structured-result parser. Enforce C01 scope before connections, preserve partial/failure states and prove that controls make no out-of-scope connection.',
  'Compare conservative discovery profiles for approved device classes and investigate excluded probes, fragile services and timeout handling.',
  'Parse a labelled structured discovery sample and identify what it proves, what it only suggests and what remains unknown.',
  'Choose parsing and bounded probe details within approved capabilities; avoid expanding ports or scripts without scope review.',
  ['Improve partial-result explanations.','A reviewer may confuse a timeout with an absent device.','Compare correct interpretations of the same partial/timeout samples using baseline and expanded coverage reasons.']
 ],
 C05:[
  'Collect the Ubuntu facts that matching actually needs.',
  'Matching needs the operating-system release and full package identity, not a successful connection alone. Failed or partial collection must remain visible.',
  ['SSH authentication fails; this is not an empty package inventory.','The upstream version looks unchanged but the Ubuntu package revision differs.'],
  'Deliver the authenticated inventory adapter producing C03 observations, with full package revisions, errors and provenance. Compare installed packages with a native export and verify that logs contain no secrets.',
  'Investigate native OS/package outputs, source-versus-binary package identity and minimum read permissions. Compare parsing approaches on actual supported output.',
  'Read one approved native export and map its fields to C03 before automating the collection.',
  'Choose the collection/parser implementation within the approved read-only operation and shared format.',
  ['Improve the explanation of partial collection.','Matching consumers need to know which fields they can still use.','Replay identical partial failures and compare correct consumer interpretation and diagnosis time with the baseline and improved per-field reasons.']
 ],
 C06:[
  'Choose one Windows inventory path based on the facts it supplies.',
  'Adding an agent does not establish useful Windows coverage. We need a measured choice that supplies the required build, package and update fields on the declared lab profile.',
  ['An option reports programs but misses a field needed for matching.','A second option supplies more fields but needs additional permissions and resources.'],
  'When the extension is activated, deliver the comparison, one selected adapter and its coverage/cost evidence. Document missing fields and measured resource use rather than choosing by popularity.',
  'Compare the available inventory options against C03 fields, enrollment effort, permissions and actual lab resource limits.',
  'Write a field checklist for the selected Windows profile, then inspect which option can substantiate each field.',
  'Choose the qualified path and implementation; Amr retains Windows update execution and recovery in C14.',
  ['Improve the missing-field capability view.','Consumers need to know when the selected adapter cannot support a verdict.','Compare reviewer identification of unsupported decisions using the same observations with baseline and clearer field coverage.']
 ],
 C07:[
  'Accept offline asset evidence without making it look live.',
  'Some assets provide reviewed exports rather than live collection. Importing them must preserve their age, identity and limitations.',
  ['An old export is imported again today.','An appliance export lacks the firmware train needed to interpret its advisories.'],
  'For a qualified profile, deliver the import adapter and capability card. Retain original collection time, operator and integrity evidence; unknown firmware stays unresolved and imports remain distinct from scans.',
  'Investigate the exact export format and identity fields available for the selected profile. Decide what missing dates or incomplete identity allow consumers to conclude.',
  'Annotate one labelled vendor/manual export with its original time, source and missing fields before designing import rules.',
  'Choose supported parsing and validation; coordinate FortiOS source semantics with Amr without taking over his advisory adapter.',
  ['Make import limitations easier to inspect.','An operator may mistake an import timestamp for collection time.','Compare age and capability interpretation on the same old/incomplete imports with baseline and improved explanations.']
 ],
 C08:[
  'Connect real observations to verdicts people can inspect.',
  'A working applicability engine is useful only when the assessed observation and supporting advisory are traceable in the integrated result.',
  ['A collection error leaves a required field unknown.','An explanation sounds convincing but has no linked source revision.'],
  'Deliver assessment-v1 integration, reason codes and fixtures linking C03/C05 observations to D09 decisions. Report supported-case precision, recall and unknowns separately, with inspectable evidence.',
  'Check which engine fields carry reasons, observation IDs, advisory revisions and missing evidence, and which collection failures prevent a definitive result.',
  'Follow one approved observation through D09 and reconstruct its verdict from the linked inputs.',
  'Choose integration and evidence presentation; preserve D09 rule semantics and avoid treating an AI narrative as proof.',
  ['Improve trace navigation.','Reviewers may spend time finding the observation behind a verdict.','Compare correct evidence reconstruction and review time for the same assessments using baseline and improved links.']
 ],
 C09:[
  'Check whether a documented fix can actually run on the target.',
  'A catalog entry is not execution permission. The configured repository, support status and target prerequisites may make a documented fix unavailable or unsuitable.',
  ['A vendor lists a fix that is absent from the target configured repository.','The newest package requires an unmet compatibility or reboot prerequisite.'],
  'Deliver the patch-candidate eligibility schema and curated supported fixtures. Link D14 vendor evidence to platform/repository prerequisites and expose blockers without inventing a patch.',
  'Investigate configured repository availability, entitlement, reboot and compatibility checks. Decide which missing prerequisite must block eligibility.',
  'Take one D14 candidate and walk through the real checks needed before presenting it to C10 for approval.',
  'Choose check organization; reuse D14 as the catalog and C10 as the policy/approval boundary.',
  ['Explain failed prerequisites more clearly.','Operators need to distinguish unavailable content from an incompatible plan.','Compare correct blocker diagnosis on identical candidates using baseline and expanded prerequisite reasons.']
 ],
 C10:[
  'Make patch approval apply to one exact reviewed plan.',
  'Approval becomes unsafe if a target, version or policy changes after review. We need an explicit plan and authority checks that remain tied to what was approved.',
  ['An asset version changes after the plan was approved.','A guest or assistant requests approval or dispatch without the required authority.'],
  'Deliver the version-bound campaign policy/state model and tests. Bind target, versions, expiry and policy to approval; reject drift, role bypass and unsupported transitions.',
  'Decide who may propose, approve and dispatch, and which changes invalidate approval. Review those rules against the four-role policy.',
  'Describe a single plan from proposal to approval, then change one target fact and explain why the old approval cannot be reused.',
  'Choose policy representation and state-machine implementation; coordinate enforcement with P04, P08 and P12.',
  ['Improve plan-change review.','Approvers need to see what changed before approving again.','Compare correctness and review time on the same changed plans using baseline and a concise change explanation; retain all mandatory checks.']
 ],
 C11:[
  'Run one approved Ubuntu update and keep the outcome honest.',
  'Executing a patch changes a system. We need an isolated runner that performs only the reviewed operation and can distinguish success, failure and an uncertain result.',
  ['The same job is delivered twice.','A timeout happens after the target may already have changed.'],
  'Deliver the isolated Ubuntu pilot adapter and audit events. Apply one exact approved update to a disposable canary, validate prerequisites and trusted artifacts, and test duplicate/timeout handling.',
  'Investigate native exact-version operations, locks, disk checks and target identity. Decide how to reconcile a lost response without blindly repeating a mutation.',
  'Trace one approved manifest against the disposable target and identify the checks needed before the first change.',
  'Choose the qualified native execution method within P08/C10/P12; Shams independently verifies the outcome in C13.',
  ['Improve failure diagnosis.','An operator needs to know whether an uncertain job needs reconciliation or a safe retry.','Compare correct next-action selection and diagnosis time on the same recorded failures with baseline and improved reason summaries.']
 ],
 C12:[
  'Keep patch jobs truthful through reboots and lost connections.',
  'A reboot or broken connection is not proof of success or failure. Campaign state must preserve what is known and let an operator resume only a safe remaining step.',
  ['The runner disappears after starting an operation.','One asset fails while other assets in the campaign finish.'],
  'Deliver resumable state transitions and a failure report. Exercise interruptions, reboot/reconnect and partial failure; preserve per-asset outcomes and reconcile uncertain side effects.',
  'Investigate reboot signals, authenticated reconnect and pre/post-boot identity. Decide what evidence permits each resume transition.',
  'Draw the state of one job before a disconnect, during uncertainty and after reconnection; identify the evidence needed at each transition.',
  'Choose recovery implementation within the existing job ledger; avoid introducing a second campaign truth.',
  ['Improve recovery guidance.','Operators may choose an unsafe repeat when an outcome is uncertain.','Compare correct resume/reconcile choices and recovery time on identical interruption replays with baseline and improved guidance.']
 ],
 C13:[
  'Verify the repaired asset independently of the update command.',
  'A command can finish successfully while a service stays unhealthy or runs an old version. Closure needs fresh asset and health evidence, plus honest recovery limits.',
  ['Package installation succeeds but the required service health check fails.','Recovery restores an older vulnerable version.'],
  'Deliver independent verification results and the recovery matrix using fresh inventory and service checks. Keep unresolved health failures open, record recovery limits and reopen a finding when restored evidence requires it.',
  'Investigate installed-versus-running version checks and independent health signals for the chosen update. Decide what evidence permits closure or recurrence.',
  'Choose one C11/C12 run and define a check that can fail even when the installer reports success.',
  'Choose independent verification methods. Amr executes patch/recovery; Mahrous reviews matching, closure and recurrence decisions.',
  ['Improve verification explanations.','A reviewer may need to reconcile successful installation with failed health.','Compare correct close/reopen decisions and review time using the same runs with baseline and a combined evidence summary.']
 ],
 C14:[
  'Qualify Windows update and reboot behavior before offering it.',
  'Windows update sources and reboot sequences must work on the declared licensed profile. An unsupported management route or reconnect assumption can invalidate execution.',
  ['A selected update requires more than one reboot.','The configured management route is unavailable on the test target.'],
  'When the extension is activated, deliver the Windows capability profile and runner adapter with a real success/reboot case and a failure/reconnect case. Reject unsupported routes and preserve long-running job state.',
  'Investigate the actual update service, exact update identity, supersedence and authenticated/encrypted reconnect requirements.',
  'Declare the test build and available update source, then review how the existing approval/recovery contracts apply.',
  'Choose the qualified adapter within the existing authority boundary; Shams retains Windows inventory work.',
  ['Improve multi-reboot visibility.','An operator may mistake an intermediate reboot for completion.','Compare correct job-state interpretation and recovery decisions on the same runs with baseline and clearer reboot-stage evidence.']
 ],
 C15:[
  'Prove a project event reaches Wazuh and is interpreted correctly.',
  'Writing a JSON message is not proof of SIEM integration. We need to follow the same lifecycle event through delivery, decoding and the intended rule.',
  ['A retried event arrives twice with the same event ID.','A log rotation interrupts the delivery path.'],
  'Deliver the event mapping, deployed decoder/rule configuration and actual ingestion evidence. Preserve correlation IDs, times and evidence references; replay must not inflate counters or expose credentials.',
  'Investigate the deployed Wazuh route and decoder fields. Decide how replay, rotation and duplicates preserve the event meaning.',
  'Trace one P13 event ID from the project outbox to its decoded Wazuh record and intended rule result.',
  'Choose mapping and diagnostic methods within P13 event delivery; keep event identity stable across retries.',
  ['Improve end-to-end event diagnostics.','A missing alert can result from delivery, decoding or rule evaluation.','Replay identical failures and compare correct failure-stage identification and diagnosis time with baseline and linked diagnostics.']
 ],
 C16:[
  'Show what the supported project workflow can actually prove.',
  'The final story must connect detection, remediation and SIEM evidence on a declared lab scope. A polished demonstration cannot replace measured coverage and disclosed failures.',
  ['Some lab cases are unknown or fail collection.','An offline replay works but the live integration is unavailable.'],
  'Deliver the reproducible evidence bundle and discussion demo. Report fixed denominators, false positives/negatives, unknowns and failures; include an actual SIEM event and independently verified remediation.',
  'Decide which supported cases form the evaluation denominator and what live/replay evidence demonstrates each claim honestly.',
  'Write the claim for one end-to-end case and list the exact collection, verdict, execution and verification artifacts needed to support it.',
  'Choose the demonstration and report structure; retain the proposal detection figure as a target until measured on the stated scope.',
  ['Make the demonstration easier to reproduce.','Another teammate may struggle to locate the evidence for each claim.','Compare successful reproduction and preparation time with the baseline bundle and an added claim-to-artifact index.']
 ],
 C17:[
  'Link asset observations only when the identity evidence supports it.',
  'Two collectors can describe the same host, but cloned IDs and reused addresses can also make different hosts look alike. Incorrect merging contaminates later findings.',
  ['An enrolled device changes IP between observations.','Two active sources report the same identifier with conflicting host evidence.'],
  'After the deferred scope is qualified, deliver a deterministic resolver for approved identities from two sources, retaining observations, reasons and rule versions. Measure false merges/splits and allow needs-review outcomes.',
  'Compare candidate identity rules on reviewed conflicts. Investigate which evidence survives cloning, rebuilds and re-enrollment, and when association must stop for review.',
  'Start with a small documented real conflict need and a labelled conflict corpus; confirm storage/auth inputs are ready.',
  'Choose resolution rules and review representation; preserve C03 identity contracts and historical observations.',
  ['Improve conflict-review explanations.','A reviewer needs to understand which fact prevents association.','Compare correct associate/distinct/review decisions and review time on the same independently reviewed conflicts with baseline and candidate explanations.']
 ],
 C18:[
  'Explain what changed between two asset snapshots.',
  'A missing item in partial collection does not prove removal. We need a repeatable comparison of evidence for the same unambiguous enrolled device.',
  ['A package is absent from an incomplete later list.','A complete comparable later list confirms a package removal.'],
  'Deliver a pure snapshot comparison for package additions/version changes and complete-versus-partial lists. Link both revisions, report incomparable/unknown fields and make duplicate inputs replay without invented changes.',
  'Investigate comparability across snapshots, collector revisions and late or skewed timestamps. Decide when an omission can substantiate a removal.',
  'Compare two labelled exports for one known enrolled host and justify each claimed change from their completeness and identity evidence.',
  'Choose diff representation and internal indexing. D13 retains impact/reassessment; service/firmware comparisons can follow the package core.',
  ['Make change reasons easier to inspect.','A consumer needs to distinguish confirmed changes from uncertain omissions.','Compare consumer interpretation and inspection time on the same complete/partial sequences with baseline and clearer reasons.']
 ],
 C19:[
  'Tell consumers which asset fields are usable and why.',
  'Recent contact with a device does not make all its inventory fresh. Each field needs an evidence-based state so missing, old or conflicting data is not used as a clean fact.',
  ['An old package export is imported today.','A collection timestamp is missing while another field was collected successfully.'],
  'Deliver a pure evaluator using one snapshot, explicit evaluation time and versioned field policy. Begin with package identity/version and collection time, with usable/stale/missing/conflicting/time-uncertain reasons.',
  'Investigate defensible freshness assumptions for the supported profile and how clock uncertainty or partial failure limits usability.',
  'Take one partial snapshot and describe the state of each required field at a stated time; justify the policy assumptions.',
  'Choose the rule representation and evidence explanation; avoid replacing field states with an unexplained overall confidence score.',
  ['Improve the quality-policy explanation.','Consumers may misunderstand why one field is stale while another is usable.','Compare correct field-use decisions on the same frozen snapshots/times with baseline and expanded policy reasons.']
 ],
 C20:[
  'Test whether a smaller approved collection can fill a known evidence gap.',
  'A full refresh may collect more than a specific decision needs. This study is useful only if the existing adapter can actually run separately approved field probes.',
  ['One missing field has an approved read-only probe.','The adapter only supports full inventory, or the proposed probe exceeds the budget.'],
  'When capability and benchmark gates pass, deliver a deterministic budget-bound plan for one Ubuntu profile. Map probes to missing facts, keep full collection as fallback and distinguish a plan from returned evidence.',
  'Compare simple rules or enumeration with full inventory and a sensible fixed-rule baseline. Include setup, failed probes, retries and fallback in measured cost.',
  'Verify which field probes are genuinely callable, then use independently reviewed C22 cases to define the comparison before evaluating a candidate.',
  'Choose the planning algorithm within P08 capabilities. D08/D09 identify gaps; assistant phrasing remains with Hams.',
  ['Improve plan explanations.','A reviewer may need to see why a probe is worth its cost.','Compare correct plan review and time on the same approved gaps with baseline and clearer field-to-probe reasons, retaining safety and evidence-quality gates.']
 ],
 C21:[
  'Limit collection across several assets without building a second job system.',
  'Repeated or concurrent collection can overload an approved lab. The asset layer should decide eligibility and batch limits while the existing platform handles jobs and recovery.',
  ['All allowed concurrent collection slots are already occupied.','A campaign is cancelled while some jobs remain unfinished.'],
  'After a measured multi-asset need qualifies the deferred work, deliver bounded collection intents through P07/P08. Reuse leases, retries and cancellation; reproduce constrained recovery and label simulated load separately.',
  'Investigate which time, traffic and concurrency budgets protect the selected device classes, and how to avoid unnecessary rereads without losing required freshness.',
  'Measure a small approved workload and identify the actual limit before designing a batching policy.',
  'Choose eligibility/batching rules; P07 remains the job ledger and P08 the execution boundary.',
  ['Improve batch eligibility explanations.','An operator needs to understand why an asset is waiting or excluded.','Compare correct interpretation and wait diagnosis on the same load replay with baseline and expanded reasons; measure any extra overhead.']
 ],
 C22:[
  'Measure asset evidence quality against independent expectations.',
  'An asset pipeline cannot prove its quality using labels copied from its own outputs. We need reviewed facts and change sequences that can expose mistakes.',
  ['A candidate reports a cheaper refresh but incorrectly treats old evidence as fresh.','A synthetic edge case and a native lab export have different evidence limits.'],
  'Deliver the independent case manifest, reviewed labels, frozen protocol and reproducible core evaluation. Record revisions, denominators, actual/not-run outcomes and negative results; optional candidates need their own qualification.',
  'Decide how native exports and independent review establish expected facts, and which cases challenge identity, changes and quality. Keep C20 cost claims gated by real supported probes.',
  'Draft the protocol and labelling rules early, then run the core when C03/C05/C18/C19 inputs are ready.',
  'Choose case organization and reporting; D15 remains the matching benchmark and C16 the end-to-end demonstration.',
  ['Improve the error report by case type.','An aggregate score may hide stale-evidence failures.','Compare actionable error identification from aggregate and case-type reports on identical frozen results, keeping the same labels and denominators.']
 ],
 C23:[
  'Explore asset-to-service links that the evidence actually supports.',
  'Observed host, package and service links may help review, but a connection alone does not prove business dependency or criticality.',
  ['A package and running service have a substantiated host-level relationship.','An old or one-sided observation suggests a connection but cannot establish a current dependency.'],
  'After the core and capacity gates pass, deliver a narrow observed relationship study with typed edges, source evidence, coverage and limitations. Record a measured enable/defer/reject decision.',
  'Investigate which relationships the approved collectors can substantiate and compare the usefulness of the view against the existing inventory evidence.',
  'Select one approved host profile and label which proposed links are observed, historical or unproven before building a view.',
  'Choose the relationship representation and experiment; D12 retains risk policy and Hams retains AI/UX ownership.',
  ['Improve historical-edge explanations.','A reviewer may confuse an old observed relation with a current dependency.','Compare correct current/historical/unproven judgments and review time on the same cases with baseline and clearer age/evidence cues.']
 ]
});
