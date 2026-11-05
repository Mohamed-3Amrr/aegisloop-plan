Ownership correction · 4 November 2026: Amr owns vulnerability/advisory data; Shams owns asset/inventory data. C02 lab and C11/C12/C14 patch execution remain Amr; C03 remains Mahrous; P02 remains Omar. Current task cards and responsibility map supersede historical owner references below.

# عقود التكامل وتصميم التنفيذ المشترك

Status: DESIGN DECISION / proposed v0. These are project contracts to implement and review in P02, not claims that the product already exists. Related decisions: ADR04, ADR08, ADR11, ADR12, ADR13, ADR18, ADR19. Public-source research informs mechanisms; payload names and enum choices below are our design.

## 1. One product, explicit boundaries

Browser → authenticated API → domain modules → PostgreSQL. A background worker consumes durable job IDs. A separately authenticated runner inside an authorized network executes allowlisted collection/patch operations. An inference process receives only authorized evidence and typed read-tool results. SIEM receives sanitized lifecycle events through the supported ingest route. The public planning website is only documentation; it is not a suitable host for privileged network scanning or the full product runtime.

Do not expose PostgreSQL, broker management ports, model server, or runner command endpoint to the public Internet. The exact reverse proxy/TLS/certificate implementation remains a deployment spike, because lab-only versus external pilot is not confirmed. No external pilot before that spike and authorization tests pass. Domain logic does not trust the browser or assistant. Authentication identifies the actor; authorization checks object, action and scope each time.

## 2. Repository and modules

Proposed product repository layout: backend/app/{inventory,intelligence,assessment,remediation,identity,ai_gateway,integrations}; runner/adapters/{ubuntu,windows}; frontend; contracts/v1; fixtures/{sources,inventory,matching,patch,assistant}; experiments; migrations; deploy; docs/{adr,runbooks,evaluation}. This layout is a recommendation, not an existing repository. Keep dependencies pinned with lockfiles. Choose exact supported stable versions after compatibility spike; do not pin an untested latest/nightly release from a website snippet.

Each module owns its model/service interface. API route handlers validate/authenticate then invoke domain logic. Shared contracts are versioned. Breaking schema change requires new version and migration. Fixture producers and consumers run contract tests before integration. Every PR states changed contract, expected behavior and relevant evidence; a reviewer from the consuming module checks it.

## 3. Canonical entities and initial constraints

| Entity | Required data / relationship | Integrity and query rule |
|---|---|---|
| Asset | UUID, organization/scope, owner, criticality, identity evidence, support profile | IP address is an observation; never the only stable identifier |
| Observation | asset, collected_at, method, collector version, raw evidence hash, OS/build/arch/package identities, errors, unknown fields | Immutable snapshot; freshness separate from import time |
| Source / source_revision | source URL, source ID, schema, external revision, fetched_at, source_modified_at, hash, terms link | Unique source+external ID+content hash; old revisions retained per policy |
| Vulnerability | internal UUID plus external IDs | Relationship types aliases/upstream/related are different; non-CVE is valid |
| Advisory assertion | source revision, product/range semantics, affected status, fixed/mitigation references | Multiple providers can disagree; retain both and conflict state |
| Assessment | asset snapshot, advisory revision, engine version, verdict, reason/evidence/gaps | Unique evaluation key; history append-only; current view derived |
| Priority | assessment, policy version, dated CVSS/KEV/EPSS, exposure and business reasons | Missing is not zero; internal priority separate from official severity |
| Patch plan | version, target manifest/hash, source fixes, expected observations, window, prechecks, recovery, reboot policy | One approved plan version; material change invalidates approval |
| Approval | plan hash, approver, scoped permission, time, expiry | API checks actor/action; runner independently checks executable plan validity |
| Job / attempt | logical job ID, idempotency key, operation, state, lease, heartbeat, attempts, result refs | Unique idempotency key; one mutation lease per asset; uncertain outcome reconciled |
| Outbox / audit | event ID, schema, actor, correlation, state change, evidence refs, delivery state | Outbox in transaction with business change; dedup at consumer; no secrets |
| Retrieval chunk | source revision, section/table identity, text hash, scope, embedding model/dimension | Derived and replaceable; stale chunk excluded from current answers |

Start indexes on exact external IDs, asset scope/last_seen, source modified/revision, assessment asset+state, and pending job dispatch. Add text/vector/JSON indexes only for measured queries. Use pagination and bounded exports. Preserve data on migration failure; a down migration cannot recreate dropped evidence.

## 4. API seams (proposed)

| Endpoint / operation | Actor and contract | Result |
|---|---|---|
| POST /v1/observations | Authorized collector/importer; InventorySnapshot | accepted observation ID or field-level validation error |
| GET /v1/assets/{id}/assessments | Scoped user | verdict, reason, evidence refs, freshness, unknown gaps |
| POST /v1/scan-jobs | Analyst within authorized scope; profile ID, target IDs, Idempotency-Key | 202 job ID; never accepts arbitrary command arguments |
| GET /v1/jobs/{id} | Scoped user | logical state + attempt timeline; partial failure visible |
| POST /v1/patch-plans | Remediation proposer; finding IDs + constraints | draft plan with unresolved prerequisites |
| POST /v1/patch-plans/{id}/approvals | Separate approval permission | version/hash-bound approval, expiry and actor |
| POST /v1/campaigns/{id}/dispatch | Authorized dispatcher after fresh policy check | queued execution; no direct browser→runner access |
| POST /v1/assistant/questions | Scoped user; question + selected asset IDs | answer, cited source spans, evidence version, uncertainty, suggested next evidence |
| GET /v1/source-health | Permitted analyst/admin; sanitized subset for others | last success, age, missing fields, failures and next retry |

Use consistent error envelope: code, message, correlation_id, retriable, field_errors. A timeout is distinct from denied, unsupported, source_stale and outcome_unknown. Return safe errors; internal stack traces never become user-facing evidence.

## 5. Worked payload — illustrative, not a real CVE or scan

```json
{
  "schema_version": "assessment.v1",
  "asset_id": "lab-example-01",
  "observation_id": "obs-example-07",
  "advisory_revision": "advisory-example-r2",
  "engine_version": "matching-example-v0",
  "verdict": "unknown",
  "reason_codes": ["MISSING_SOURCE_PACKAGE_VERSION"],
  "evidence_refs": ["evidence-example-03"],
  "gaps_to_collect": ["distribution_release", "source_package_version"],
  "evaluated_at": "2026-10-14T18:00:00Z"
}
```

C01/C03 and D02 define producer fields; P02 publishes schema; C05 and D05 produce independent evidence; D09 consumes both; C08 verifies the handoff; P06 displays the trace. Those are linked tasks, not duplicate matching implementations. C09 validates D14's catalog at the runner boundary rather than building another catalog. A10 and P11 share one assistant gateway implementation.

## 6. State machines and failure semantics

Assessment verdict: affected / not_affected / unknown / unsupported. Evidence freshness: current / stale / unavailable. Finding lifecycle: open / planned / execution_pending / verification_pending / resolved / risk_accepted / reopened. These are separate dimensions: a stale assessment is not “not affected”; a risk-accepted finding is not fixed.

Execution: queued → preflight → running → reboot_pending → verifying → succeeded. Any stage can become failed, canceled-before-mutation, or outcome_unknown. A canceled request does not magically undo a package change. outcome_unknown → reconcile → verified result or manual intervention. Campaign success requires every targeted asset's explicit result; partial outcomes remain partial.

Approval binds plan, target identity, evidence revision, time window and policy revision. Immediately before dispatch, compare current snapshot/target fingerprint. Expired or materially changed plan returns to draft/review. No tool or API path may jump from an assistant draft to execution.

## 7. Authorization matrix to agree before coding

| Action | Administrator | Analyst | Auditor | Guest |
|---|---|---|---|---|
| Manage users / scopes | Yes | No | No | No |
| Run authorized read-only scans | Permission + scope | Permission + scope | No | No |
| Review evidence / triage | Scoped | Scoped | Allowed read-only reports | Sanitized allowed subset |
| Propose remediation | If assigned | If assigned | No | No |
| Approve / execute patch | Explicit additional permission; no implicit LLM delegation | Only if separately assigned by policy | No | No |
| Export sensitive inventory | Explicit scope/permission | Explicit scope/permission | Restricted report export | No |
| Ask assistant | Same underlying data/action permissions | Same underlying data/action permissions | Read-only permitted reports | Sanitized information only |

Two-person approval is a proposed default for mutation in the demonstrator; a documented single-operator lab exception must remain visibly distinct from production policy. Tests should include cross-asset access, revoked session, direct API access despite hidden UI, guessed object IDs and stale plan hash.

## 8. Observability, retention and release gates

Track ingestion lag, enrichment missingness, reassessment age, queue age, failed attempts, runner heartbeat, disk/RAM, unknown assessments, patch recovery, retrieval support and response latency. Each source has an owner and alert rule. Proposed first threshold: warn after two missed intended source polls; the 24h proposal requirement is separately measured and any miss reported.

Retention is a policy gate: no fixed legal retention claim is made. For lab planning, keep a compact immutable evaluation snapshot and all evidence needed to reproduce final reported results; limit noisy raw scans/LLM traces and remove secrets immediately. Record what was deleted, when and why. Before an external pilot decide inventory retention, user consent, access, export and deletion. Back up DB + evidence + keys/configuration as a consistent set; demonstrate restore. Proposed RPO24h/RTO2h must be measured, not assumed.

Release gate at each discussion: tagged commit; package/model/source version manifest; no secrets; known limitations; supported profile matrix; owner and independent reviewer; reproducible benchmark; backup restore; source outage and runner interruption demo. Security review uses selected versioned OWASP ASVS controls and NIST SSDF practices as guides, not a certification claim.

## 9. Future template readiness

Maintain requirements.csv mapping proposal IDs and later additions to tasks, owner, metric and proof artifact. Keep an assumptions log, ADRs, risk register, source licenses and research protocol. For the faculty template, fill the approved formal roster only after the Shams/Shahd discrepancy is resolved. Keep original proposal untouched; a new requirement is marked addition, and a changed target requires supervisor agreement.

Primary references: [OWASP ASVS](https://owasp.org/projects/asvs), [NIST SSDF](https://csrc.nist.gov/pubs/sp/800/218/final), [SEI architecture risk](https://www.sei.cmu.edu/library/managing-architectural-risk-during-agile-development/). Specific framework/queue/security mechanism references are in the platform source register; contracts above are our proposed implementation design.
