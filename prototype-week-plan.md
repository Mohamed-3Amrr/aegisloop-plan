# AegisLoop — Prototype week: 29 October–5 November 2026

Internal planning targets; actual completion and available hours are unverified.

By 5 November, run one authorized Ubuntu observation through a vendor-backed applicability check into a minimal read-only screen; demonstrate Hams’s evidence-retrieval component separately if model/gateway integration is not qualified.

This is Prototype Build 0.1 / a G1 slice, not the finished product, full G1 acceptance or completion of every linked package. No 10 November or 15 November final-prototype commitment is adopted. Final prototype/discussion date remains unconfirmed after midterm.

Timezone: Africa/Cairo

## Calendar

### 29–30 Oct — Readiness + shared sample

Confirm existing artifacts, authorized target, one Ubuntu release, run commands and sample IDs. Freeze a usable draft contract on 30 October before building against it.

### 30 Oct–1 Nov — Delivery 1 · runnable components

Sunday 1 November: every owner demonstrates their assigned code/output and exchanges the fixed samples; docs alone do not meet this checkpoint.

### 2–5 Nov — Delivery 2 · integrated slice

Thursday 5 November: one real host → normalized evidence → reviewed assessment → persisted API/UI result; retrieval evidence demo and honest limitations alongside it.

### 6 Nov — No additional assigned delivery

No new work is scheduled. Use the frozen bundle for reference; do not move missed work into exam leave.

### 7–12 Nov — Exam pause

No delivery deadlines, required meetings, reminders or prototype tasks scheduled.

### 13 Nov — Planning review · proposed

Inspect what actually exists, reconfirm capacity and official discussion dates, then set the next prototype milestone. This is a planning review, not a new implementation deadline.

## Readiness and capacity

Foundation is expected to have produced reusable artifacts; the site does not establish that it is done. On 30 October, run each listed artifact once. Existing valid work is reused. A missing prerequisite becomes the first repair for that owner, not an invented DONE state.

Working estimate only: 12–16 focused hours per member across 30 October–5 November, with roughly one quarter protected for review/integration inside that total. Available hours and existing code must be checked on 30 October. This is an ambitious narrow target, not a productivity claim or a promise of completion.

## Amr

### Your objective

Make a small set of real vulnerability records that the matcher, AI work and website all use.

المطلوب تجمع سجلات الثغرات وتحفظ أصلها ومصدرها وتحوّلها للحقول المتفق عليها. وتجهيز اللاب C02 يفضل مسؤوليتك.

### Inputs that should already be ready (verify; not marked DONE)

- A short source list: source name, link and how to obtain its records.
- A first saved raw response and draft field list agreed with Mahrous/Omar.
- Known source-access or usage restrictions written down.

### Sunday 1 November — simple steps

1. Choose five representative CVE IDs. Retrieve and save their original records from the existing CVE.org/NVD prototype.

Example: Use the same CVE ID across sources so the team can compare their fields. If a request fails, keep the error and label any old sample as cached.

Show that it works: Show the raw files and run the collector command; five records are this delivery’s subset, not all D01 acceptance.

Related tasks: D01

2. Convert the saved records into the agreed small object. Keep the ID, description, source link/date and available product/version information.

Example: Two different source formats become the same field names; absent fixed-version information stays absent.

Show that it works: Omar and Mahrous can read your sample without renaming fields manually.

Related tasks: D02

3. Give Mahrous one reviewed Ubuntu vendor example with the package, release and affected/fixed information the source actually states.

Example: The source assertion is about the chosen Ubuntu release and package revision; a generic version number is not enough.

Show that it works: Mahrous can explain what the example proves and which fields are still missing.

Related tasks: D02, D05

4. Prepare the approved lab target and baseline restore point for Shams’s C05 collector.

Example: Share the approved target identity and host key; keep credentials outside committed files.

Show that it works: Shams can collect from the authorized lab; Amr demonstrates baseline restoration.

Related tasks: C02

### Thursday 5 November — simple steps

1. Prepare at least five reviewed Ubuntu package/advisory examples for the chosen lab release. Preserve each original source.

Example: Include source-backed affected/fixed examples and a case where the source cannot settle the answer.

Show that it works: Mahrous independently checks the expected meaning of the examples.

Related tasks: D05

2. Use Omar’s agreed import/persistence path to store the examples. Send their IDs to Mahrous and Hams.

Example: The same advisory ID appears in the saved source, database, matcher input and retrieval corpus.

Show that it works: One stored record can be followed back to its raw source; both teammates use the same revision.

Related tasks: D05

### Early warnings

- Do not turn missing fix information into a guessed version.
- If NVD is unavailable, distinguish a dated cached example from a live successful query.
- Review the source evidence; collecting more vendors is optional after the required Ubuntu handoff.

### Technical reference

Existing source register, reproducible collector invocation, preserved sample responses and schema draft; declared source-use restrictions.

### Sunday 1 November — Retrieve and normalize real advisory samples.

Packages (slices only): D01, D02, C02

Build:

1. Reuse the approved CVE.org/NVD collector prototype; preserve raw responses for at least five selected representative IDs and compare available fields. This is a five-case checkpoint slice, not the full D01 acceptance sample.
2. Add a reviewed Ubuntu vendor evidence sample with package/release/affected/fixed-or-missing fields. Agree draft schema field names with Mahrous and Omar on 30 October.
3. Retain C02: prepare and verify the authorized isolated lab/baseline for Shams; this lab task does not transfer with inventory ownership.

Outputs:

- `intelligence/raw/`
- `intelligence/normalized/samples.jsonl`
- `intelligence/source-register.csv`
- `contracts/vulnerability-v0.1.json`
- `lab/baseline-manifest.json`

Proof:

- One documented command reproduces samples; raw/source/revision timestamps survive normalization.
- Show source disagreements and missing remediation fields explicitly; if a live source fails, record the failure and label the preserved snapshot instead of claiming fresh data.

Needs:

- Existing D01 prototype; canonical draft is reviewed with C03/P02.

### Thursday 5 November — Supply the small vendor catalog used by the integrated matcher.

Packages (slices only): D05, D02

Build:

1. Normalize at least five reviewed Ubuntu package/advisory cases tied to the chosen lab release; use vendor-native version assertions, not generic CPE or upstream-number guesses.
2. Load these records through Omar’s agreed persistence path once the P03 slice is usable; supply source IDs/revisions and an evidence manifest to Mahrous and Hams.

Outputs:

- `intelligence/vendor-catalog-slice.jsonl`
- `intelligence/catalog-load-results.md`

Proof:

- All five records validate against the shared contract; one can be traced from raw source to persisted record.
- Mahrous independently reviews affected/fixed/unknown fixture expectations; a real host is not forced to appear vulnerable.

Needs:

- D02 draft + usable P03 slice for persistence; vendor semantics reviewed before matcher use.

### Supporting contributions

- Review Hams’s five evidence answers and corpus provenance; provide the same source revisions used by the matcher.
- Co-review Mahrous’s three reference cases; no second independently collected dataset.

### Stretch only

- D11: dated KEV/EPSS sample enrichment only after the catalog-to-matcher handoff works.

No bulk ingestion/backfill, multi-vendor expansion or new source scraping this week.

## Shams

### Your objective

Collect the actual OS and installed packages from one authorized Ubuntu lab machine, then hand the same data to matching, AI and the platform.

المطلوب كود يقرأ بيانات جهاز اللاب الحقيقي ويحفظها بصيغة متفق عليها، مش سكان واسع ولا تحديثات على الجهاز.

### Inputs that should already be ready (verify; not marked DONE)

- One allowed Ubuntu lab target confirmed with Mahrous.
- Working access, a verified target identity and a lab restore point.
- The agreed fields for the observation file.

### Sunday 1 November — simple steps

1. Use the approved lab machine and baseline prepared by Amr (C02). Verify the target identity before collecting; lab restoration ownership remains Amr.

Example: Keep a record linking the lab asset name to its approved target and SSH host key.

Show that it works: You can access the correct machine; failed or out-of-scope targets are rejected.

Related tasks: C05

2. Run a script that reads the OS/release and full installed package versions. Save the original output and collection time.

Example: Input: the allowed lab target. Output: OS + packages + timestamp, or an explicit collection error.

Show that it works: Show the actual command run and its saved output, without credentials in committed files.

Related tasks: C05

3. Write the collected fields to the object agreed with Mahrous and Omar.

Example: One observation ID identifies the same collected snapshot for all three people.

Show that it works: They can read your file without manual column fixes.

Related tasks: C05

### Thursday 5 November — simple steps

1. Run the collector again. Send the resulting snapshot to Mahrous’s matcher and Omar’s ingestion endpoint.

Example: A collection error is a failure state; it must not look like an empty successful inventory.

Show that it works: The same observation ID reaches the engine and is displayed in the platform.

Related tasks: C05

2. Help Hams assemble the input list: Amr’s advisory records + your real snapshot + any reviewed context. Mark anything missing or synthetic.

Example: Observed OS version = real lab evidence. Example business importance invented for a test = labelled synthetic context.

Show that it works: Hams can identify the origin and date of every supplied field; she still owns the dataset design.

Related tasks: A02

### Early warnings

- Do not infer business criticality from a port or an IP address.
- Never collect outside the authorized target to make the demo look larger.
- Do not add a patch runner or firmware updates to this week’s collector.

### Technical reference

Authorized lab scope and C03 fields from Mahrous; working C02 lab/baseline supplied by Amr. Shams owns C05 collection.

### Sunday 1 November — Produce one real, authorized Ubuntu inventory snapshot.

Packages (slices only): C05

Build:

1. Verify the approved lab identity and SSH host key; use the baseline restore point supplied by Amr in C02.
2. Run the existing or minimal scoped collector for OS/release and full installed package versions; preserve original output, timestamp and collection errors. Serialize the result to the agreed observation sample.

Outputs:

- `collection/raw/`
- `collection/observations/ubuntu-lab-01.json`
- `collection/README.md`

Proof:

- A repeat run yields a traceable snapshot for the same target.
- A wrong/out-of-scope target or failed connection yields an explicit failure, never an empty successful inventory.

Needs:

- C01 allowed target and C03 fields from Mahrous; working C02 target.

### Thursday 5 November — Make the inventory usable by matching and UI.

Packages (slices only): C05

Build:

1. Re-run collection, validate the schema and pass the same snapshot ID to Mahrous/Omar. Review package-name/source-package fields needed by the qualified Ubuntu matcher.
2. Assemble the minimal experiment/input manifest for Hams from Amr’s records, lab evidence and reviewed context; missing business context stays missing or labelled synthetic.

Outputs:

- `collection/observations/repeat-snapshot.json`
- `datasets/prototype/input-manifest.json`

Proof:

- Omar’s endpoint accepts the observation; Mahrous consumes it without manual column edits.
- Document observed versus synthetic context; confirm evidence age and no credentials in committed artifacts.

Needs:

- C03/P02 draft, D02 source identifiers, Amr’s catalog; Omar’s usable ingestion interface.

### Supporting contributions

- Prepare the A02 input manifest with Hams; she retains dataset design and Shams coordinates the actual input assembly.
- Provide one repeat/failure fixture for Omar and Mahrous; help a teammate reproduce the collector.

### Stretch only

- C04: bounded discovery for the single authorized subnet/host only after authenticated collection and integration work.

No broad network scanning, Windows adapter, FortiOS firmware operations or patch runner this week.

## Mahrous

### Your objective

Write the function that checks the lab package against reviewed vendor evidence and explains affected, not_affected or unknown.

المطلوب كود يقارن بيانات الجهاز بدليل الـvendor ويقول متأثر ولا لأ ولا المعلومات ناقصة، ويشرح السبب.

### Inputs that should already be ready (verify; not marked DONE)

- A written allowed-target boundary.
- A small list of required asset fields and what “missing” means.
- One vendor example agreed with Amr.

### Sunday 1 November — simple steps

1. Write which lab target is allowed and which fields Shams must collect. Send the fields to Omar too.

Example: OS release, full package revision, stable asset ID and collection time; request extra configuration only when the rule needs it.

Show that it works: Shams and Omar agree on the same sample field names.

Related tasks: C01, C03

2. With Amr prepare three reviewed inputs with expected answers: affected, vendor-fixed/not_affected, and missing-evidence/unknown.

Example: Use preserved vendor evidence. The three examples are controlled test cases, not claims about the real machine.

Show that it works: Each expected answer has a source and reviewer; disagreements are recorded.

Related tasks: D08, D09

3. Write a small function that takes one observation plus the vendor record and returns the answer and reason.

Example: If a required full package revision is absent, return unknown with that missing field.

Show that it works: The three test cases pass. Unsupported product/release semantics do not produce a confident safe/affected verdict.

Related tasks: D09

### Thursday 5 November — simple steps

1. Connect Shams’s actual snapshot to Amr’s reviewed catalog. Run the function and save the real result.

Example: The real host may be not_affected or unknown. Do not alter its result to manufacture an affected demonstration.

Show that it works: A result includes asset/advisory IDs, source revision, verdict and reason.

Related tasks: D08, D09, C08

2. Re-run the three controlled tests and compare the real result with what Omar’s screen shows.

Example: The engine and UI must show the same verdict and evidence IDs.

Show that it works: Hand over the result file and test output; separate controlled tests from the real-host observation.

Related tasks: D15, C08

### Early warnings

- Use vendor-native version meaning; an old-looking upstream number may already have a vendor fix.
- Unknown is not the same as safe.
- Full prioritization policy and patch approval are later work, not a reason to skip this matcher proof.

### Technical reference

One authorized target/profile and a small observation/evidence contract specifying required fields and missing-value meaning.

### Sunday 1 November — Code a testable matcher slice using reviewed vendor fixtures.

Packages (slices only): C01, C03, D08, D09

Build:

1. Publish the allowed target/profile and observation fields on 30 October; identify full release/package/source-package/configuration requirements.
2. With Amr review three expected cases: affected, vendor-fixed/not_affected and insufficient-evidence/unknown. Implement a pure matching function with reason codes against these fixed inputs; keep incomplete semantics unknown.

Outputs:

- `policy/lab-scope.json`
- `contracts/asset-observation-v0.1.json`
- `matching/assess_fixture.py`
- `matching/tests/reference-cases.json`

Proof:

- All three expected outcomes have independent vendor evidence and pass the small test runner.
- Wrong release/product and missing full revision cannot produce an affected/not_affected claim without supported evidence.

Needs:

- Amr’s reviewed vendor sample and D02 draft; C03 contract. Standalone fixture code does not qualify the full D09 engine.

### Thursday 5 November — Run and verify the assessment on Shams’s actual snapshot.

Packages (slices only): D08, D09, C08, D15

Build:

1. Connect the observation/catalog adapters to the matcher and emit a typed finding with asset/advisory IDs, evidence revision, verdict, reason and missing fields.
2. Record actual-host results separately from the three controlled reference fixtures; pass the result JSON to Omar and compare his displayed result.

Outputs:

- `matching/results/real-host.json`
- `matching/reports/prototype-reference-results.md`

Proof:

- One real snapshot reaches a traceable supported verdict or honest unknown; controlled affected/not_affected/unknown tests still pass.
- The UI verdict and source IDs match the engine output; no manual rewriting or invented positive finding.

Needs:

- Usable C05 observation + D05 vendor evidence + agreed identities; C08 integration only after supported D09 slice works.

### Supporting contributions

- Review Amr’s catalog semantics and Hams’s citation/uncertainty examples.
- With Amr draft a small ranking relevance/policy example only after the real assessment path works.

### Stretch only

- D12: a separate offline priority example using dated D11 inputs; disclose missing context. Do not label it AI ranking.

No full policy engine, A17 evaluation, automated approval/patch execution or SIEM pipeline this week.

## Hams

### Your objective

Make a small program that finds the correct saved security document and shows its source. Give Omar a simple screen drawing to implement.

المطلوب برنامج صغير يلاقي المعلومة من المستندات اللي عندك ويورّي مصدرها، ومعاه رسمة بسيطة للشاشة. مش مطلوب موديل كامل الأسبوع ده.

### Inputs that should already be ready (verify; not marked DONE)

- A list of five questions the user may ask.
- A folder location for original documents and a simple list showing where each came from.
- A sketch of the user opening an asset and seeing its result.

### Sunday 1 November — simple steps

1. Write five questions this first version should handle. Ask Amr and Mahrous which saved document answers each question.

Example: Example: “Show the advisory for this CVE ID.” For a question the documents cannot answer, write “No evidence available”.

Show that it works: You have five questions, their expected documents, and at least one question with no supported answer.

Related tasks: A01, UX01

2. Get about ten original records/documents from Amr. Save each one with its source link, record ID and date.

Example: Document 01 → original text + source URL + date. Do not invent a CVE or fill missing vendor instructions.

Show that it works: Another person can trace each saved record back to its original source.

Related tasks: A02

3. Write a script that reads the saved documents and searches them by CVE ID or words. Return the matching text and its source.

Example: Input: an actual CVE ID supplied by Amr. Output: its saved advisory text and source link. If absent, output “No supported evidence”.

Show that it works: Run the script live on a known record and on a missing record. This is evidence retrieval; no LLM training is required.

Related tasks: A06

4. Draw one screen for Omar: asset name, assessment result and a button/link to the source. Include unknown and error examples.

Example: One small wireframe is enough. Omar writes the frontend code.

Show that it works: Omar can describe what he needs to implement without asking you to redesign the flow.

Related tasks: UX02

### Thursday 5 November — simple steps

1. Test the same program on the five reviewed questions. Save the returned document IDs and note any wrong or missing result.

Example: Question → expected document → returned document → match or problem. Five cases are a small functional check, not an accuracy benchmark.

Show that it works: A teammate runs your instructions and gets the same recorded results.

Related tasks: A03, A06, A07

2. Return a predictable result that Omar can read: text, source link, source ID and source date. Handle “nothing found”.

Example: A result object contains the original passage and where it came from; no guessed fixed version or command.

Show that it works: Known questions show source-backed text; the missing-evidence question says the information is unavailable.

Related tasks: A06, A07

3. Check Omar’s screen against your drawing. Write the exact corrections needed for the result, unknown and error states.

Example: “Unknown must show the missing package version, not a green safe label.”

Show that it works: Hand Omar the callable script/CLI instructions, saved examples and the UI corrections.

Related tasks: UX02

### Early warnings

- If a source or field is missing, say so; do not complete it from model memory.
- If Omar’s gateway is not ready, demonstrate the script separately and label it as a retrieval component.
- Keep the five-question check separate from any claim that AI prioritization or a full RAG system is finished.

### Technical reference

Five concrete analyst questions, reviewed label/unknown rules, provenance manifest template and one narrow user journey. Hams remains AI prioritization capability owner.

### Sunday 1 November — Build a small evidence corpus and a runnable retrieval slice.

Packages (slices only): A01, A02, A06, UX01, UX02

Build:

1. Choose five concrete questions from the supported advisory/asset workflow and freeze expected evidence with Amr/Mahrous. Assemble roughly ten preserved advisory/document records, deduplicate by source/revision and label fixture context.
2. Implement corpus preparation and exact-ID/lexical evidence retrieval using the agreed stack; produce source/revision-tagged results. Hand Omar a one-page wireframe for asset → verdict → evidence, including unknown/error states.

Outputs:

- `ai/corpus/manifest.json`
- `ai/prepare_corpus.py`
- `ai/retrieve_evidence.py`
- `ux/prototype-slice-wireframe.pdf`

Proof:

- One command builds the corpus and another returns the expected source for the five questions.
- One unsupported question yields an explicit no-supported-evidence result; the UI handoff is reviewed by Omar.

Needs:

- Amr’s source samples + D02 metadata draft; UX02 contract review with P02. Retrieval work does not imply all A06/UX02 acceptance is complete.

### Thursday 5 November — Deliver reproducible evidence retrieval and a usable UI handoff.

Packages (slices only): A03, A06, A07, UX02

Build:

1. Run the five reviewed questions plus missing-evidence cases; record retrieved evidence and failures rather than claiming RAG/LLM accuracy. Produce typed result examples with citation, revision and unavailable-field indicators.
2. Review Omar’s implemented three-state screen. Hand over a callable retrieval component or documented CLI; integrate only if the relevant gateway/access prerequisites are qualified. Otherwise keep the retrieval demo separate and labelled.

Outputs:

- `ai/results/retrieval-smoke.jsonl`
- `ai/README.md`
- `contracts/retrieval-result-slice.json`
- `ux/implementation-review.md`

Proof:

- A second member rebuilds the corpus and reproduces the five-question results.
- No fabricated fixed version, command or compatibility statement is generated; unsupported questions expose missing evidence.
- Report the small sample denominator; this is a smoke test, not a held-out benchmark, full RAG qualification or proof of AI-ranking benefit.

Needs:

- Stable A02/A03 corpus provenance, A06 chunks/metadata, Amr/Mahrous review and Omar’s P02/P05 slice.

### Supporting contributions

- Own the UX wireframe/design; Omar writes frontend code. Review unknown and source-link states before his Thursday demo.
- Work with Shams on data readiness; with Amr/Mahrous capture future ranking rubric questions without starting the full A17 study.

### Stretch only

- A04: one reproducible CPU classification baseline only if independently reviewed labels and valid splits are sufficient; otherwise record the missing data.
- A09: existing qualified local-model smoke only if resources and core retrieval work are already ready; no new serving setup on the critical path.

No full A17 comparison, A11 guidance generation, fine-tuning, reranker or broad model search this week. Retrieval is a real component but is not presented as a completed AI recommendation system.

## Omar

### Your objective

Save the team’s data through a small backend and display the actual asset assessment on one protected screen.

المطلوب endpoint يحفظ ويعرض الداتا وشاشة واحدة تبين نتيجة جهاز اللاب وأسبابها، مش Dashboard كاملة.

### Inputs that should already be ready (verify; not marked DONE)

- A backend/database candidate that runs on the available machine.
- One sample object agreed with Amr and Mahrous.
- The minimum user/result/error flow agreed with Hams.

### Sunday 1 November — simple steps

1. Run the already researched backend/database candidate and document the exact local startup steps.

Example: Use the P01 check to confirm the available runtime; do not change frameworks just to start a new stack.

Show that it works: Another teammate can start the small backend from your instructions.

Related tasks: P01

2. Agree the field names and sample IDs with Amr/Mahrous. Reject malformed objects instead of guessing their meaning.

Example: The advisory ID and observation ID must be the same identifiers their scripts produce.

Show that it works: The shared sample validates; an invalid sample is rejected.

Related tasks: P02

3. Implement the minimum save-and-read path for observations and advisory records.

Example: Send a reviewed sample, store it, then read it back through the API.

Show that it works: The returned data preserves IDs, source revisions and timestamps.

Related tasks: P03

### Thursday 5 November — simple steps

1. Use Hams’s reviewed sketch to build one screen. Connect it to the actual persisted result from Shams/Mahrous.

Example: Show asset name/release, verdict, collection time, reason and source links. Do not type in a result by hand.

Show that it works: A new actual snapshot/result can be read through the backend and appears on the screen.

Related tasks: P03, P05, P06

2. Protect the read view with the auth approach qualified in P01/P04. Test a denied read, an unknown verdict and a collection error.

Example: Unknown must look different from not_affected. No patch/mutation controls are added.

Show that it works: An unauthorized request is denied and the different result/error states are visible.

Related tasks: P04, P06

3. Give a teammate the setup and demo instructions and have them reproduce the flow.

Example: One observation → stored assessment → displayed result with the same IDs.

Show that it works: Save the run instructions and observed test output; list any integration/auth gap honestly.

Related tasks: P06

### Early warnings

- If a contract field is unclear, resolve it with its producer before implementing a different meaning.
- Do not expose an unauthenticated customer-like service to compensate for missing auth.
- Keep one screen and the minimum read path; full hosting, jobs and assistant gateways are later work.

### Technical reference

Working backend candidate and measured local runtime; a shared minimal payload agreed with Amr/Mahrous, plus Hams’s reviewed UI state sketch. No new framework selection implied.

### Sunday 1 November — Build the contract-to-persistence path.

Packages (slices only): P01, P02, P03

Build:

1. Confirm the usable backend/database candidates in P01 before building; reuse existing decisions and migrations. Freeze a small v0.1 contract with sample IDs, nullable fields and source revisions on 30 October.
2. Implement the minimum observation/catalog persistence and read endpoint using agreed fixtures. Add schema validation and a clean-setup README; do not build the full dashboard.

Outputs:

- `platform/contracts/prototype-v0.1.json`
- `platform/migrations/`
- `platform/tests/contract_smoke`
- `platform/README.md`

Proof:

- One documented command starts the local slice; sample input persists and can be read back with source/revision IDs.
- Malformed payload is rejected; secrets stay outside source and setup requires no unexplained private dependency.

Needs:

- Usable P01 candidate, C03/D02 samples for P02; P03 begins only on the reviewed contract.

### Thursday 5 November — Display the actual lab assessment in a minimal protected screen.

Packages (slices only): P03, P04, P05, P06

Build:

1. Connect Shams’s observation and Mahrous’s assessment; show asset/release, verdict, collection age, reason, source IDs and links. Preserve unknown and collection-failure states.
2. Use the maintained auth approach validated through existing P01/P04 gates for a scoped analyst read view; prove unauthorized read denial. Keep mutation/patch controls disabled or absent.
3. Re-run the full slice from setup instructions on a second team member’s machine/environment; provide demo steps and known limitations.

Outputs:

- `platform/ui/asset-evidence-view`
- `platform/tests/prototype-flow`
- `platform/demo-runbook.md`

Proof:

- A real lab observation → persisted assessment → screen uses consistent IDs with no hand-edited result.
- Unauthorized reads fail; unknown/error states are visibly different from safe/not_affected.
- Hams signs off the minimal UI states; Shams/Mahrous can reproduce the demo.

Needs:

- P02/P03 slice, Hams’s reviewed UX02 slice, real C05 + supported D09/C08 outputs; P04 read authorization before access is exposed.

### Supporting contributions

- Resolve schema questions with source/observation owners on 30 October; send Hams typed result envelopes, not screenshots only.
- Provide minimal local run commands; this is not the full P14 hosting qualification.

### Stretch only

- Show a retrieval result in the screen only if the existing scoped gateway prerequisites and integration tests pass; a separate Hams CLI demo is acceptable.

No full dashboard, cloud deployment, new identity infrastructure, durable job system, patch controls or P11/A10 end-to-end gateway this week.

## Thursday acceptance

- One authorized Ubuntu lab profile/release with traceable target identity; no universal device coverage claim.
- At least five preserved source examples and a reviewed small vendor catalog; live and cached samples explicitly distinguished.
- One real inventory → normalized observation → supported applicability result or honest unknown → persisted read API → minimal protected screen.
- Three independently reviewed reference cases: affected, not_affected and unknown. Real host verdict is not forced to match a staged positive fixture.
- Hams’s corpus/retrieval component runs independently and shows source/revision links on five reviewed questions plus missing-evidence cases; no completed AI ranking/generative recommendation claim.
- A second team member follows clean setup/demo commands; malformed input, collection failure and unauthorized read are demonstrated.
- A frozen evidence bundle includes code revision, source/observation fixture IDs, run commands, test outputs and known gaps. No private credentials or misleading fixture/live labels.

## If something slips

- If capacity is lower than the working estimate, keep the real collection + supported assessment + read screen and reduce sample quantity/visual polish; disclose the smaller denominator.
- If Friday contracts fail, repair the bounded payload first. Work on independent pure functions/fixtures; do not independently change schema names and discover divergence on Thursday.
- If source access fails, preserve the error and use a dated trusted sample for coding. Mark cached/not-live; never claim D01 live-source acceptance passed.
- If live collection fails, demonstrate the labelled replay path and record the real-collection gap. This is a partial checkpoint, not a successful real-host slice.
- If the UI or auth slice fails, provide the read-only local/API evidence safely and record UI/auth as unfinished; do not publish an unauthenticated customer-like service.
- Drop stretch work first. Do not sacrifice evidence correctness, authorization, secret handling or uncertainty display. Unfinished work stays unfinished; never silently move it into 7–12 November.

## Dated handoffs

- 2026-10-30 | Mahrous → Shams, Omar | Allowed lab target/profile + observation field sample | Unblocks authorized collection and the draft contract.
- 2026-10-30 | Amr → Mahrous, Hams, Omar | Preserved advisory/vendor sample + vulnerability schema draft | Use identical source IDs/revisions across matching, retrieval and persistence.
- 2026-10-30 | Omar → Amr, Mahrous, Shams, Hams | Reviewed v0.1 payload and run commands | Freeze a bounded contract; fixture coding can proceed independently without claiming prerequisite completion.
- 2026-11-01 | Hams → Omar | Reviewed one-page UI wireframe + typed evidence-result example | P05 implementation follows reviewed UI states; no complete UX02 claim.
- 2026-11-01 | Shams → Mahrous, Omar, Hams | One real observation + provenance manifest | Real data integration can start without inventing organization context.
- 2026-11-02 | Omar → Amr, Mahrous | Working persistence/read path from Sunday delivery | Load the reviewed D05 catalog slice; finish the supported match adapter before UI binding.
- 2026-11-04 | Mahrous → Omar | Typed real-host assessment and three reference outcomes | Leave Thursday for end-to-end checks rather than first integration.
- 2026-11-05 | Omar → Hams, Shams, Mahrous, Amr | Reproducible local demo and known limitations | All owners can follow the same observation and evidence into the screen.

## All package dispositions

- D01 | Amr | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- D02 | Amr | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- D03 | Amr | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- D04 | Amr | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- D05 | Amr | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- D06 | Amr | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- D07 | Amr | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- D08 | Mahrous | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- D09 | Mahrous | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- D10 | Mahrous | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- D11 | Amr | Stretch only; no required deadline | Begin only after the required owner slice and supporting prerequisites pass.
- D12 | Mahrous | Stretch only; no required deadline | Begin only after the required owner slice and supporting prerequisites pass.
- D13 | Mahrous | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- D14 | Amr | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- D15 | Mahrous | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- D16 | Amr | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- C01 | Mahrous | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- C02 | Amr | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- C03 | Mahrous | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- C04 | Shams | Stretch only; no required deadline | Begin only after the required owner slice and supporting prerequisites pass.
- C05 | Shams | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- C06 | Shams | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- C07 | Shams | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- C08 | Mahrous | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- C09 | Amr | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- C10 | Mahrous | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- C11 | Amr | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- C12 | Amr | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- C13 | Mahrous | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- C14 | Amr | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- C15 | Mahrous | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- C16 | Mahrous | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- A01 | Hams | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- A02 | Hams | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- A03 | Hams | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- A04 | Hams | Stretch only; no required deadline | Begin only after the required owner slice and supporting prerequisites pass.
- A05 | Hams | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- A06 | Hams | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- A07 | Hams | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- A08 | Hams | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- A09 | Hams | Stretch only; no required deadline | Begin only after the required owner slice and supporting prerequisites pass.
- A10 | Omar | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- A11 | Hams | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- A12 | Mahrous | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- A13 | Hams | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- A14 | Omar | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- A15 | Hams | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- A16 | Hams | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- P01 | Omar | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- P02 | Omar | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- P03 | Omar | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- P04 | Omar | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- P05 | Omar | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- P06 | Omar | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- P07 | Omar | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- P08 | Omar | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- P09 | Omar | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- P10 | Omar | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- P11 | Omar | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- P12 | Omar | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- P13 | Omar | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- P14 | Omar | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- P15 | Omar | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- P16 | Omar | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- UX01 | Hams | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- UX02 | Hams | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- UX03 | Hams | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- D17 | Amr | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- D18 | Amr | Checkpoint slice / readiness | Only the owner-specific subset above is targeted; full package acceptance remains unchanged.
- P17 | Omar | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.
- A17 | Hams | Outside this week — retain existing delivery layer | Not scheduled for 1 or 5 November; original dependencies, delivery scope and owner remain in force.