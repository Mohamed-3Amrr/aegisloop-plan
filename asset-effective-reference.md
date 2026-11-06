# Asset implementation and creative research reference

Updated: 6 November 2026. Shams coordinates the asset deliverables below. Use each task’s activation and review conditions. All references/templates are planning artifacts, not implemented or measured results.

## What is required, and what remains creative

- Specify the observable boundary and smallest useful result; allow the owner to choose the algorithm and representation.
- Use independently reviewed inputs/expected outcomes, then compare a defensible baseline before claiming improvement.
- Freeze final cases, criteria and configurations before observing holdout outcomes; record failures and negative findings.
- Use one indexed asset research notebook/evidence ledger if it avoids duplicate writing; retain per-task traceability and agreed equivalent paths.
- Use ownership to coordinate a concrete handoff; the team shares implementation, testing and review support.

A smallest reference implementation must meet the declared behavior and safety boundary. The owner chooses the algorithm, representation and justified experiment. Additional independently reviewed cases are needed; do not treat these public examples as final ground truth.

## Start now
Draft the C22 protocol, label/source rules and questions while C03/C05 establish the first real asset. No runtime acceptance bypasses prerequisites.

## Activation route

### Trusted first asset

C03 → C05 → C04

Retain each original prerequisite and authorization gate; establish one real supported slice.

### Small evidence-quality core

C18 → C19 → C22

Draft C22 protocol now; implement the independent C18/C19 pure functions after C03/C05, then run the core benchmark.

### Independent verification branch

C13

Run after its original C08/C11/C12 prerequisites; it does not block C22 asset evidence evaluation.

### One research candidate after qualification

C20

Require real field-level approved probes and a frozen core benchmark; compare against full collection and sensible rules.

### Evidence-triggered extensions

C17 → C21 → C23 → C06 → C07

Activate only a demonstrated identity, load, context or profile need after capacity review. These are not all required simultaneously.

## Research quality and honest conclusions

A decision entry records question → source/assumption → baseline/candidate → frozen cases/criteria → measured/not-run evidence → limitation → chosen/rejected decision → reviewer disposition. Reuse evidence instead of duplicating papers.

For optional C20, include setup/connection, retries, failures and fallback cost. Report actual resource measurements separately from illustrative policy weights. Freeze quality/safety criteria before the comparison. A cheaper method with a critical evidence-quality error cannot support an improvement claim. Negative or tied findings are useful if reproducible and honestly scoped.

## Team handoffs

Coordinate the next small deliverable, its inputs and review through [the shared handoff guide](asset-team-handoff.md).

## Shared research alternatives

[Shared notebook template](research/assets/shared-decision-log-template.md) · [Shared evidence ledger](research/assets/shared-evidence-ledger-template.csv)

## C17 — Reconcile Asset Identities With Reviewable Conflict Decisions

**Owner:** Shams · **Support:** Mahrous, Omar

**Delivery layer:** Deferred extension · **Gate:** G2

**Scope version:** 2026-10-23.r2

**Goal:** One deterministic resolver for approved enrollment identities on two sources, returning associate, distinct or needs_review. Preserve observations and reasons. Begin with a small conflict corpus; cross-source auto-merge is gated.

**Why This Matters:** Implement a deterministic resolver for enrolled host identities across observation sources, IP reuse and rebuilds. Preserve ambiguous identities as separate candidates with reviewable reasons.

**Depends on:** C03, C05, P02, P03, P04

**Inputs:**
- C03 delivered contract/fixture
- C05 delivered contract/fixture
- P02 delivered contract/fixture
- P03 delivered contract/fixture
- P04 delivered contract/fixture

**First action:** Freeze the C03 enrolled-ID baseline and reviewer-labelled conflict cases before changing rules.

### Smallest useful delivery

One deterministic resolver for approved enrollment identities on two sources, returning associate, distinct or needs_review. Preserve observations and reasons. Begin with a small conflict corpus; cross-source auto-merge is gated.

Activation gate: Activate only when at least two observation sources or demonstrated identity conflicts require it. The initial enrolled-asset path in C03/C05 must work without this extension.

Input/output boundary: `resolve_identity(observations, trusted_enrollment_rules, rule_revision) → decision, candidate_ids, evidence_refs, reason_codes. Persist or expose corrections only through delivered P03/P04 contracts.`

### Baseline and useful evidence

Use the existing enrolled-ID rules as the main baseline. IP-only matching is a diagnostic weak comparator, not the only method to beat.

- False merge, false split and needs_review counts with reviewed-case denominators.
- Replay consistency and correction-history preservation; report each unsafe association separately.

### Synthetic design expectations

These cases specify expected behavior. They are not executed lab results or independent benchmark ground truth.

#### Same enrollment, changed address

Input:
```json
{
  "previous": {
    "asset_id": "asset-A",
    "enrollment": "key-A",
    "address": "address-1"
  },
  "current": {
    "enrollment": "key-A",
    "address": "address-2"
  },
  "conflicts": []
}
```

Expected behavior:
```json
{
  "decision": "associate",
  "asset_id": "asset-A"
}
```

An address change alone does not create a different enrolled host.

#### Address reused by a different enrollment

Input:
```json
{
  "previous": {
    "asset_id": "asset-A",
    "enrollment": "key-A",
    "address": "address-1"
  },
  "current": {
    "enrollment": "key-B",
    "address": "address-1"
  }
}
```

Expected behavior:
```json
{
  "decision": "distinct",
  "automatic_merge": false
}
```

An address is not sufficient host identity.

#### Conflicting concurrent claims

Input:
```json
{
  "observations": [
    {
      "enrollment": "key-A",
      "boot_identity": "boot-A"
    },
    {
      "enrollment": "key-A",
      "boot_identity": "boot-B"
    }
  ],
  "conflict_state": "unresolved"
}
```

Expected behavior:
```json
{
  "decision": "needs_review",
  "automatic_merge": false,
  "preserve_both": true
}
```

A copied identifier or conflicting claim must remain visible; exact equality alone cannot erase a known conflict.

[Download behavior cases](research/assets/C17-behavior-examples.json)

### Creative choices to investigate

- Compare rule ordering, conflict explanations or conservative association policies on the same frozen cases.
- Change an association rule only with a recorded counterexample, consumer review and rule revision.

### Research / Questions to Answer

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. Use the existing enrolled-ID rules as the main baseline. IP-only matching is a diagnostic weak comparator, not the only method to beat. Choose and justify a method; the reference examples constrain observable behavior, not the internal algorithm.

- Which identity signals survive IP changes, re-enrollment and host cloning, and which conflicts must block an automatic association?
- How can a resolution be reproduced from immutable observations and a rule revision without deleting earlier identities?
- What evidence would reverse an incorrect association, and how will the consumer see that correction?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Source starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

### Support Contributions and Handoff

- Mahrous: Mahrous reviews identity ambiguity and product-matching separation; Omar checks persistence/auth compatibility. Mahrous reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c17-mahrous.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.
- Omar: Mahrous reviews identity ambiguity and product-matching separation; Omar checks persistence/auth compatibility. Omar reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c17-omar.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.
- 6 November review: narrow the minimum implementation, correct dependency/scope gates, and separate required behavior from creative choices. No implemented or measured result is claimed.

### Implementation Steps

1. Read the versioned input/consumer contracts, minimum deliverable, example expectations and activation gate.
2. Freeze the C03 enrolled-ID baseline and reviewer-labelled conflict cases before changing rules.
3. Implement the pure decision function and explicit ambiguity states.
4. Compare the baseline and proposed rules using fixed cases, counting false associations and unresolved cases separately.
5. Add persistence/authorized correction only through delivered P03/P04; preserve earlier source records.
6. Review counterexamples and rule revisions with Mahrous and Omar.
7. Record input/configuration revisions and the reviewers’ findings. Research documents may be equivalent indexed sections in a shared asset notebook/ledger.

### Technical Approach

resolve_identity(observations, trusted_enrollment_rules, rule_revision) → decision, candidate_ids, evidence_refs, reason_codes. Persist or expose corrections only through delivered P03/P04 contracts. Activate only when at least two observation sources or demonstrated identity conflicts require it. The initial enrolled-asset path in C03/C05 must work without this extension.

### Expected Deliverables

- `backend/app/inventory/identity_resolution.py`
- `contracts/v1/asset-identity-resolution.schema.json`
- `fixtures/assets/identity-conflicts.jsonl`
- `tests/inventory/test_identity_resolution.py`
- `reports/assets/identity-resolution-evaluation.md`
- `docs/research/assets/c17-decision-brief.md`
- `docs/research/assets/c17-evidence-matrix.csv`

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- Replay IP reuse, cloned identity and re-enrollment cases; two distinct hosts must not silently merge.
- Replay the same inputs/rule revision and obtain the same decision and evidence references.
- Correct a false association without deleting the old observation or borrowing another tenant’s identity.
- Verify the design case “Same enrollment, changed address” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “Address reused by a different enrollment” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “Conflicting concurrent claims” against the independently reviewed expectation; preserve its synthetic/design-only label.

### Acceptance Criteria

- The minimum implementation consumes valid named inputs and meets the reviewed behavior cases; examples/templates alone do not establish completion.
- Every mandatory artifact exists or maps to agreed equivalent sections; preserve original evidence and disclose unresolved failures.
- Publish the specified baseline/metric results with denominators, measured/not-run state and limitations. A negative result may satisfy research acceptance if the protocol and artifact requirements are met.
- Activation, authorization and existing platform boundaries remain enforced; no new owner, command or queue authority is introduced.
- Named supporting reviewers reproduce the relevant contract/case check and record findings/disposition.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

Review and qualified follow-up; no mandatory consumer is listed.

## C18 — Build Immutable Asset Snapshot Deltas and Replayable Change Evidence

**Owner:** Shams · **Support:** Mahrous, Omar

**Delivery layer:** Current core · **Gate:** G2

**Scope version:** 2026-10-23.r2

**Goal:** A pure comparison of two validated snapshots for the same unambiguous enrolled asset. Handle package additions/version changes and complete versus partial package lists. Service/firmware comparisons can follow after this works.

**Why This Matters:** Produce field-level asset changes from immutable observations, with explicit collection completeness and ordering, so consumers can distinguish a real removal from failed collection.

**Depends on:** C03, C05

**Inputs:**
- C03 delivered contract/fixture
- C05 delivered contract/fixture

**First action:** Validate both input packets and same-asset/same-scope comparability.

### Smallest useful delivery

A pure comparison of two validated snapshots for the same unambiguous enrolled asset. Handle package additions/version changes and complete versus partial package lists. Service/firmware comparisons can follow after this works.

Activation gate: Start the pure function once C03/C05 inputs are available. Full C17 reconciliation is not required; conflicting identities produce incomparable. Persist/emit through P03/P07 only when those integration contracts are delivered.

Input/output boundary: `diff_snapshot(previous, current, comparison_revision) → changes, per_scope_completeness, comparison_state, source_snapshot_ids. Never modify either input.`

### Baseline and useful evidence

Compare with a simple set difference on complete, same-scope exports, then expose where that baseline fails on partial/failed or reordered collection.

- Added/changed/removed errors on independently reviewed snapshot pairs.
- False removals from incomplete collection; duplicate semantic events on replay.

### Synthetic design expectations

These cases specify expected behavior. They are not executed lab results or independent benchmark ground truth.

#### A partial listing omits a known package

Input:
```json
{
  "previous": {
    "asset_id": "asset-A",
    "packages": [
      "demo-a",
      "demo-b"
    ],
    "complete": true
  },
  "current": {
    "asset_id": "asset-A",
    "packages": [
      "demo-a"
    ],
    "complete": false
  }
}
```

Expected behavior:
```json
{
  "demo_b_state": "unknown",
  "removed": []
}
```

Omission from an incomplete collection is not evidence of an uninstall.

#### A complete comparable listing confirms removal

Input:
```json
{
  "previous": {
    "asset_id": "asset-A",
    "packages": [
      "demo-a",
      "demo-b"
    ],
    "scope": "packages",
    "complete": true
  },
  "current": {
    "asset_id": "asset-A",
    "packages": [
      "demo-a"
    ],
    "scope": "packages",
    "complete": true
  }
}
```

Expected behavior:
```json
{
  "removed": [
    "demo-b"
  ]
}
```

A removal requires complete, comparable scope and stable identity.

#### Different asset identities

Input:
```json
{
  "previous": {
    "asset_id": "asset-A"
  },
  "current": {
    "asset_id": "asset-B"
  }
}
```

Expected behavior:
```json
{
  "comparison_state": "incomparable",
  "changes": []
}
```

Do not manufacture a before/after history between different or unresolved identities.

[Download behavior cases](research/assets/C18-behavior-examples.json)

### Creative choices to investigate

- Choose the normalization and stable event-key strategy; prove deterministic replay and bounded behavior.
- Extend to services only after a declared coverage contract makes absence interpretable.

### Research / Questions to Answer

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. Compare with a simple set difference on complete, same-scope exports, then expose where that baseline fails on partial/failed or reordered collection. Choose and justify a method; the reference examples constrain observable behavior, not the internal algorithm.

- Which package/service/OS changes are comparable across collector versions and incomplete snapshots?
- How should duplicates, late arrivals, time skew and missing fields affect a delta?
- Which inventory events can D13 consume without mistaking a failed collection for an uninstall?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Source starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

### Support Contributions and Handoff

- Mahrous: Mahrous reviews the D13 event boundary; Omar reviews existing event/persistence compatibility. Mahrous reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c18-mahrous.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.
- Omar: Mahrous reviews the D13 event boundary; Omar reviews existing event/persistence compatibility. Omar reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c18-omar.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.
- 6 November review: narrow the minimum implementation, correct dependency/scope gates, and separate required behavior from creative choices. No implemented or measured result is claimed.

### Implementation Steps

1. Read the versioned input/consumer contracts, minimum deliverable, example expectations and activation gate.
2. Validate both input packets and same-asset/same-scope comparability.
3. Implement package-level comparison as a pure function; preserve completeness and failure metadata.
4. Separate removed from unknown/incomparable and keep both source revisions.
5. Use stable event IDs and collection-time ordering; duplicates and late arrivals must remain explainable.
6. Evaluate the three example families plus independent held-out pairs before adding optional fields.
7. Record input/configuration revisions and the reviewers’ findings. Research documents may be equivalent indexed sections in a shared asset notebook/ledger.

### Technical Approach

diff_snapshot(previous, current, comparison_revision) → changes, per_scope_completeness, comparison_state, source_snapshot_ids. Never modify either input. Start the pure function once C03/C05 inputs are available. Full C17 reconciliation is not required; conflicting identities produce incomparable. Persist/emit through P03/P07 only when those integration contracts are delivered.

### Expected Deliverables

- `backend/app/inventory/snapshot_delta.py`
- `contracts/v1/asset-inventory-delta.schema.json`
- `fixtures/assets/snapshot-sequences.jsonl`
- `tests/inventory/test_snapshot_delta.py`
- `docs/assets/inventory-change-handoff.md`
- `docs/research/assets/c18-decision-brief.md`
- `docs/research/assets/c18-evidence-matrix.csv`

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- A partial/failed package listing must not imply all prior packages were removed.
- Reorder and duplicate snapshots; preserve stable event identity and explain chronology conflicts.
- Verify that raw evidence stays unchanged and D13 can consume the delta fixture without a new scheduler.
- Verify the design case “A partial listing omits a known package” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “A complete comparable listing confirms removal” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “Different asset identities” against the independently reviewed expectation; preserve its synthetic/design-only label.

### Acceptance Criteria

- The minimum implementation consumes valid named inputs and meets the reviewed behavior cases; examples/templates alone do not establish completion.
- Every mandatory artifact exists or maps to agreed equivalent sections; preserve original evidence and disclose unresolved failures.
- Publish the specified baseline/metric results with denominators, measured/not-run state and limitations. A negative result may satisfy research acceptance if the protocol and artifact requirements are met.
- Activation, authorization and existing platform boundaries remain enforced; no new owner, command or queue authority is introduced.
- Named supporting reviewers reproduce the relevant contract/case check and record findings/disposition.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

C22, C23

## C19 — Evaluate Asset Evidence Freshness, Completeness and Conflicts Per Field

**Owner:** Shams · **Support:** Mahrous

**Delivery layer:** Current core · **Gate:** G2

**Scope version:** 2026-10-23.r2

**Goal:** Evaluate a single snapshot plus an explicit as_of time and versioned field policy. Begin with package identity/version and collection time; report usable, stale, missing, conflicting or time_uncertain with reasons.

**Why This Matters:** Implement a versioned, explainable asset-evidence policy that reports which fields are usable, stale, missing or conflicting at an explicit evaluation time.

**Depends on:** C03, C05

**Inputs:**
- C03 delivered contract/fixture
- C05 delivered contract/fixture

**First action:** Freeze the field-policy schema and reviewed expected states for stale/missing/partial/conflict cases.

### Smallest useful delivery

Evaluate a single snapshot plus an explicit as_of time and versioned field policy. Begin with package identity/version and collection time; report usable, stale, missing, conflicting or time_uncertain with reasons.

Activation gate: C18 history is not a prerequisite for single-observation freshness. Cross-observation conflict resolution is optional; unavailable or contradictory evidence must remain unresolved.

Input/output boundary: `evaluate_evidence(snapshot, field_policy, as_of) → per_field_states, reason_codes, source_refs, policy_revision. Collection time and receipt time are different inputs.`

### Baseline and useful evidence

Compare latest-received and age-only checks with field-level evaluation on the same reviewed cases. A configured age threshold is an assumption to justify, not a measured universal constant.

- False-usable/false-fresh decisions, missing/conflicting counts and per-profile coverage.
- Deterministic replay at fixed as_of; error slices for imports, partial failures and clock uncertainty.

### Synthetic design expectations

These cases specify expected behavior. They are not executed lab results or independent benchmark ground truth.

#### An old observation arrives recently

Input:
```json
{
  "collected_at": "2026-11-06T08:00:00Z",
  "received_at": "2026-11-06T08:09:00Z",
  "as_of": "2026-11-06T08:10:00Z",
  "example_policy": {
    "max_age_seconds": 300
  }
}
```

Expected behavior:
```json
{
  "state": "stale",
  "age_seconds": 600
}
```

The 300-second value is illustrative only; receipt does not refresh collection time.

#### No reliable collection time

Input:
```json
{
  "collected_at": null,
  "received_at": "2026-11-06T08:09:00Z",
  "as_of": "2026-11-06T08:10:00Z"
}
```

Expected behavior:
```json
{
  "state": "time_uncertain",
  "usable": false
}
```

A receipt timestamp cannot establish the observation age.

#### One collected field does not fill another

Input:
```json
{
  "observed_fields": {
    "package_version": "demo-1.0"
  },
  "required_fields": [
    "package_version",
    "architecture"
  ],
  "collection_state": "partial"
}
```

Expected behavior:
```json
{
  "architecture": "missing",
  "all_required_fields_usable": false
}
```

Field-level completeness remains explicit even when one command succeeds.

[Download behavior cases](research/assets/C19-behavior-examples.json)

### Creative choices to investigate

- Research field/profile-specific thresholds and alternative conflict policies; predeclare them before evaluating the held-out cases.
- Prefer understandable reason codes; a confidence percentage needs separate calibration evidence.

### Research / Questions to Answer

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. Compare latest-received and age-only checks with field-level evaluation on the same reviewed cases. A configured age threshold is an assumption to justify, not a measured universal constant. Choose and justify a method; the reference examples constrain observable behavior, not the internal algorithm.

- Which freshness windows and mandatory fields are defensible for each supported asset/collection profile?
- How will original collection time, clock uncertainty, partial failure and conflicting observations change usability?
- How can consumers inspect the exact reasons instead of relying on an uncalibrated confidence percentage?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Source starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

### Support Contributions and Handoff

- Mahrous: Mahrous checks how evidence usability is consumed by matching/verification without changing their authority. Mahrous reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c19-mahrous.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.
- 6 November review: narrow the minimum implementation, correct dependency/scope gates, and separate required behavior from creative choices. No implemented or measured result is claimed.

### Implementation Steps

1. Read the versioned input/consumer contracts, minimum deliverable, example expectations and activation gate.
2. Freeze the field-policy schema and reviewed expected states for stale/missing/partial/conflict cases.
3. Implement the pure function using explicit evaluation time and source metadata.
4. Evaluate fields separately; do not refresh old imports or fill missing timestamps.
5. Compare against latest-received/age-only baselines on the same cases.
6. Hand reason-coded states to matching/verification consumers without replacing their decisions.
7. Record input/configuration revisions and the reviewers’ findings. Research documents may be equivalent indexed sections in a shared asset notebook/ledger.

### Technical Approach

evaluate_evidence(snapshot, field_policy, as_of) → per_field_states, reason_codes, source_refs, policy_revision. Collection time and receipt time are different inputs. C18 history is not a prerequisite for single-observation freshness. Cross-observation conflict resolution is optional; unavailable or contradictory evidence must remain unresolved.

### Expected Deliverables

- `backend/app/inventory/evidence_quality.py`
- `config/assets/evidence-quality-policy.yaml`
- `contracts/v1/asset-evidence-quality.schema.json`
- `fixtures/assets/evidence-quality-cases.jsonl`
- `tests/inventory/test_evidence_quality.py`
- `reports/assets/evidence-quality-review.md`
- `docs/research/assets/c19-decision-brief.md`
- `docs/research/assets/c19-evidence-matrix.csv`

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- Reimport old data and retain its age; evaluate identically with a fixed as_of time.
- Preserve unknown/conflict/time_uncertain under missing timestamps and skew.
- A successful collection of one field must not mark every other field fresh or complete.
- Verify the design case “An old observation arrives recently” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “No reliable collection time” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “One collected field does not fill another” against the independently reviewed expectation; preserve its synthetic/design-only label.

### Acceptance Criteria

- The minimum implementation consumes valid named inputs and meets the reviewed behavior cases; examples/templates alone do not establish completion.
- Every mandatory artifact exists or maps to agreed equivalent sections; preserve original evidence and disclose unresolved failures.
- Publish the specified baseline/metric results with denominators, measured/not-run state and limitations. A negative result may satisfy research acceptance if the protocol and artifact requirements are met.
- Activation, authorization and existing platform boundaries remain enforced; no new owner, command or queue authority is introduced.
- Named supporting reviewers reproduce the relevant contract/case check and record findings/disposition.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

C20, C21, C22, C23

## C20 — Plan the Smallest Approved Collection Needed to Resolve Asset Evidence Gaps

**Owner:** Shams · **Support:** Mahrous, Omar

**Delivery layer:** Conditional experiment · **Gate:** G2

**Scope version:** 2026-10-23.r2

**Goal:** For one Ubuntu profile and a small approved read-only probe set, map structured missing fields to a deterministic, budget-bound plan. Start with a simple rule or enumeration; keep full collection as a working fallback.

**Why This Matters:** Map structured missing asset-field keys to approved read-only collection probes and choose a bounded plan under a declared cost/budget, with a reason for each requested fact.

**Depends on:** C19, D08, P08, C22

**Inputs:**
- C19 delivered contract/fixture
- D08 delivered contract/fixture
- P08 delivered contract/fixture
- C22 delivered contract/fixture

**First action:** Use C22’s frozen cases and a delivered approved capability map; verify field-level probes really exist.

### Smallest useful delivery

For one Ubuntu profile and a small approved read-only probe set, map structured missing fields to a deterministic, budget-bound plan. Start with a simple rule or enumeration; keep full collection as a working fallback.

Activation gate: Activate after C22 freezes independent cases/core baselines and the approved adapters expose separately callable field probes. If only one full-inventory operation exists, record the limitation rather than inventing selective collection.

Input/output boundary: `plan_probes(asset_revision, gap_keys, approved_capabilities, budget, policy_revision) → selected_probe_ids, covered_gap_keys, estimated_cost, unresolved_gap_keys, reasons. A plan is not a collected result.`

### Baseline and useful evidence

Compare full inventory and a sensible fixed-rule selector with the proposed selector. Pin the same initial snapshots, target scope, case set and available probes for every method.

- Actual elapsed time, attempts, transferred bytes where available, and gaps actually resolved after collection.
- Critical identity/freshness errors and unresolved cases; estimated policy cost is reported separately from measured resource cost.
- Include connection/setup, retries, failed probes and fallbacks in total cost.

### Synthetic design expectations

These cases specify expected behavior. They are not executed lab results or independent benchmark ground truth.

#### A small approved probe covers the gap

Input:
```json
{
  "gap_keys": [
    "installed_version"
  ],
  "capabilities": [
    {
      "id": "package_version",
      "fields": [
        "installed_version"
      ],
      "read_only": true,
      "example_cost_units": 1
    },
    {
      "id": "full_inventory",
      "fields": [
        "installed_version",
        "architecture"
      ],
      "read_only": true,
      "example_cost_units": 3
    }
  ],
  "budget_units": 1
}
```

Expected behavior:
```json
{
  "selected_probe_ids": [
    "package_version"
  ],
  "collection_state": "not_run",
  "gap_resolved": false
}
```

Configured cost units are design examples, not measured seconds or savings; only a validated returned observation can resolve the gap.

#### The requested operation is not approved

Input:
```json
{
  "gap_keys": [
    "installed_version"
  ],
  "candidate": {
    "id": "unlisted_operation",
    "approved": false
  }
}
```

Expected behavior:
```json
{
  "selected_probe_ids": [],
  "plan_state": "denied"
}
```

The planner cannot introduce a command or widen execution authority.

#### No candidate fits the available budget

Input:
```json
{
  "gap_keys": [
    "installed_version"
  ],
  "capabilities": [
    {
      "id": "package_version",
      "approved": true,
      "example_cost_units": 2
    }
  ],
  "budget_units": 1
}
```

Expected behavior:
```json
{
  "selected_probe_ids": [],
  "plan_state": "budget_exhausted",
  "unresolved_gap_keys": [
    "installed_version"
  ]
}
```

Return an honest unresolved case rather than exceeding the bound.

[Download behavior cases](research/assets/C20-behavior-examples.json)

### Creative choices to investigate

- Try a transparent greedy rule, bounded enumeration or another justified selector; freeze the configuration before final comparison.
- Investigate when batching or full inventory is cheaper than selective probes. A negative result can reject the candidate and retain the baseline.

### Research / Questions to Answer

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. Compare full inventory and a sensible fixed-rule selector with the proposed selector. Pin the same initial snapshots, target scope, case set and available probes for every method. Choose and justify a method; the reference examples constrain observable behavior, not the internal algorithm.

- Which approved probe supplies each asset field, and which fields cannot be collected in the current scope?
- Can deterministic coverage/cost rules reduce unnecessary collection versus always running full inventory?
- How should stale evidence, missing permissions, identity conflict and exhausted budgets prevent or limit a plan?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Source starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

### Support Contributions and Handoff

- Mahrous: Mahrous reviews gap semantics and baseline outcomes; Omar reviews typed-envelope compatibility and denied operations. Mahrous reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c20-mahrous.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.
- Omar: Mahrous reviews gap semantics and baseline outcomes; Omar reviews typed-envelope compatibility and denied operations. Omar reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c20-omar.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.
- 6 November review: narrow the minimum implementation, correct dependency/scope gates, and separate required behavior from creative choices. No implemented or measured result is claimed.

### Implementation Steps

1. Read the versioned input/consumer contracts, minimum deliverable, example expectations and activation gate.
2. Use C22’s frozen cases and a delivered approved capability map; verify field-level probes really exist.
3. Define measurable resource budgets separately from estimated selection weights.
4. Implement one simple deterministic selector tied to asset, policy and capability revisions.
5. Send typed plans through P08; recheck identity/scope/expiry before any existing adapter executes.
6. Record validated results, failures and all overhead; unresolved gaps stay unresolved.
7. Run paired baseline/candidate comparisons and publish positive, tied or negative outcomes with uncertainty/limitations.
8. Record input/configuration revisions and the reviewers’ findings. Research documents may be equivalent indexed sections in a shared asset notebook/ledger.

### Technical Approach

plan_probes(asset_revision, gap_keys, approved_capabilities, budget, policy_revision) → selected_probe_ids, covered_gap_keys, estimated_cost, unresolved_gap_keys, reasons. A plan is not a collected result. Activate after C22 freezes independent cases/core baselines and the approved adapters expose separately callable field probes. If only one full-inventory operation exists, record the limitation rather than inventing selective collection.

### Expected Deliverables

- `backend/app/inventory/evidence_probe_planner.py`
- `config/assets/approved-probe-capabilities.yaml`
- `contracts/v1/asset-probe-plan.schema.json`
- `fixtures/assets/probe-budget-cases.jsonl`
- `tests/inventory/test_probe_planner.py`
- `experiments/assets/compare_probe_plans.py`
- `reports/assets/probe-budget-comparison.md`
- `docs/research/assets/c20-decision-brief.md`
- `docs/research/assets/c20-evidence-matrix.csv`

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- Unknown/mutating commands and denied target scopes produce no executable collection plan.
- Enforce the declared budget and prevent duplicate probes for equivalent requirements.
- Measure resolved evidence gaps, unresolved gaps and cost on the same cases for each baseline.
- Verify the design case “A small approved probe covers the gap” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “The requested operation is not approved” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “No candidate fits the available budget” against the independently reviewed expectation; preserve its synthetic/design-only label.

### Acceptance Criteria

- The minimum implementation consumes valid named inputs and meets the reviewed behavior cases; examples/templates alone do not establish completion.
- Every mandatory artifact exists or maps to agreed equivalent sections; preserve original evidence and disclose unresolved failures.
- Publish the specified baseline/metric results with denominators, measured/not-run state and limitations. A negative result may satisfy research acceptance if the protocol and artifact requirements are met.
- Activation, authorization and existing platform boundaries remain enforced; no new owner, command or queue authority is introduced.
- Named supporting reviewers reproduce the relevant contract/case check and record findings/disposition.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

Review and qualified follow-up; no mandatory consumer is listed.

## C21 — Plan Bounded Asset Collection Campaigns With Backpressure and Recovery

**Owner:** Shams · **Support:** Omar, Amr

**Delivery layer:** Deferred extension · **Gate:** G2

**Scope version:** 2026-10-23.r2

**Goal:** Generate a bounded batch of read-only collection intents using P07’s existing job ledger. Implement only asset eligibility and rate/concurrency policy; reuse existing retry, lease, cancellation and recovery state.

**Why This Matters:** Build asset-domain campaign planning for bounded batches, per-target limits, backoff and resumable progress while delegating durable dispatch and authentication to the existing platform.

**Depends on:** C19, C04, C05, P07, P08

**Inputs:**
- C19 delivered contract/fixture
- C04 delivered contract/fixture
- C05 delivered contract/fixture
- P07 delivered contract/fixture
- P08 delivered contract/fixture

**First action:** Measure the existing serial path before defining an optimization target.

### Smallest useful delivery

Generate a bounded batch of read-only collection intents using P07’s existing job ledger. Implement only asset eligibility and rate/concurrency policy; reuse existing retry, lease, cancellation and recovery state.

Activation gate: Activate when a measured multi-asset baseline violates an agreed time/resource/operator-effort target. A small lab that works with existing serial dispatch does not justify a new orchestration subsystem. C20 is optional, not a prerequisite.

Input/output boundary: `prepare_collection_intents(eligible_assets, existing_job_state, limits, campaign_revision) → bounded_intents, deferred_targets, denied_targets, reasons. P07/P08 remain the only durable dispatch/auth boundary.`

### Baseline and useful evidence

Start with the existing bounded serial worker. Compare only after measuring a real bottleneck; keep simulated planning load separate from measured lab collection.

- Actual throughput, per-target delay and failure/unknown states at a declared approved load.
- Maximum observed concurrency and budget violations; no duplicate semantic intents on ledger replay.

### Synthetic design expectations

These cases specify expected behavior. They are not executed lab results or independent benchmark ground truth.

#### One slot remains under the concurrency limit

Input:
```json
{
  "running_targets": 1,
  "max_concurrency": 2,
  "eligible_targets": [
    "asset-A",
    "asset-B",
    "asset-C"
  ]
}
```

Expected behavior:
```json
{
  "new_intents_at_most": 1,
  "deferred_targets": 2
}
```

Existing active work consumes capacity; intent preparation must respect it.

#### The semantic intent already exists

Input:
```json
{
  "proposed_key": "asset-A:snapshot-r1:collect-v1",
  "ledger_keys": [
    "asset-A:snapshot-r1:collect-v1"
  ]
}
```

Expected behavior:
```json
{
  "new_intents": [],
  "reuse_existing": true
}
```

Reuse the existing ledger identity instead of creating another retry/recovery engine.

#### Campaign cancelled before preparation

Input:
```json
{
  "campaign_state": "cancelled",
  "eligible_targets": [
    "asset-A"
  ]
}
```

Expected behavior:
```json
{
  "new_intents": []
}
```

Cancellation blocks new intent generation; ledger/runner owners govern already-running attempts.

[Download behavior cases](research/assets/C21-behavior-examples.json)

### Creative choices to investigate

- Test batching/backoff/eligibility policies through the same ledger; choose the simplest policy that meets the measured target.
- Propose another queue/worker only as a separately reviewed platform decision, never as an implicit part of this asset task.

### Research / Questions to Answer

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. Start with the existing bounded serial worker. Compare only after measuring a real bottleneck; keep simulated planning load separate from measured lab collection. Choose and justify a method; the reference examples constrain observable behavior, not the internal algorithm.

- Which batch/concurrency/time/traffic limits protect the chosen authorized lab/device classes?
- How can incremental collection avoid repeatedly reading unchanged fields while respecting fresh-evidence needs?
- How will offline assets, partial results, duplicate intents, retries and exhausted budgets appear without false success?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Source starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

### Support Contributions and Handoff

- Omar: Omar checks ledger/envelope reuse; Amr reviews authorized lab load assumptions without taking collection ownership. Omar reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c21-omar.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.
- Amr: Omar checks ledger/envelope reuse; Amr reviews authorized lab load assumptions without taking collection ownership. Amr reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c21-amr.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.
- 6 November review: narrow the minimum implementation, correct dependency/scope gates, and separate required behavior from creative choices. No implemented or measured result is claimed.

### Implementation Steps

1. Read the versioned input/consumer contracts, minimum deliverable, example expectations and activation gate.
2. Measure the existing serial path before defining an optimization target.
3. Freeze asset-specific eligibility and limits while reusing delivered P07/P08 contracts.
4. Generate bounded idempotent intents from existing ledger state.
5. Keep target deferrals, denied targets and outcome_unknown visible; do not implement a second retry/lease state machine.
6. Compare the candidate with the serial baseline only at approved lab load; publish the activate/defer decision.
7. Record input/configuration revisions and the reviewers’ findings. Research documents may be equivalent indexed sections in a shared asset notebook/ledger.

### Technical Approach

prepare_collection_intents(eligible_assets, existing_job_state, limits, campaign_revision) → bounded_intents, deferred_targets, denied_targets, reasons. P07/P08 remain the only durable dispatch/auth boundary. Activate when a measured multi-asset baseline violates an agreed time/resource/operator-effort target. A small lab that works with existing serial dispatch does not justify a new orchestration subsystem. C20 is optional, not a prerequisite.

### Expected Deliverables

- `backend/app/inventory/collection_campaigns.py`
- `config/assets/collection-budgets.yaml`
- `contracts/v1/asset-collection-intent.schema.json`
- `tests/inventory/test_collection_campaigns.py`
- `experiments/assets/collection_load_profile.py`
- `reports/assets/collection-scale-and-recovery.md`
- `docs/research/assets/c21-decision-brief.md`
- `docs/research/assets/c21-evidence-matrix.csv`

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- Crash/replay intent preparation and verify no duplicate semantic collection intent.
- Enforce per-target/global limits and stop dispatch intent generation when cancelled or out of budget.
- Unavailable assets retain failed/unknown states and cannot appear freshly collected.
- Verify the design case “One slot remains under the concurrency limit” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “The semantic intent already exists” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “Campaign cancelled before preparation” against the independently reviewed expectation; preserve its synthetic/design-only label.

### Acceptance Criteria

- The minimum implementation consumes valid named inputs and meets the reviewed behavior cases; examples/templates alone do not establish completion.
- Every mandatory artifact exists or maps to agreed equivalent sections; preserve original evidence and disclose unresolved failures.
- Publish the specified baseline/metric results with denominators, measured/not-run state and limitations. A negative result may satisfy research acceptance if the protocol and artifact requirements are met.
- Activation, authorization and existing platform boundaries remain enforced; no new owner, command or queue authority is introduced.
- Named supporting reviewers reproduce the relevant contract/case check and record findings/disposition.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

Review and qualified follow-up; no mandatory consumer is listed.

## C22 — Build Independent Asset Cases & Evaluate Evidence Quality

**Owner:** Shams · **Support:** Mahrous, Omar

**Delivery layer:** Current core · **Gate:** G2

**Scope version:** 2026-10-23.r2

**Goal:** Start with the protocol and reviewed expectations, then run the core asset pipeline on frozen authorized exports and separately labelled synthetic edge cases. C17/C20/C21/C13 are not hard prerequisites for this core benchmark.

**Why This Matters:** Build a reproducible asset-only benchmark testing identity, change fidelity, evidence quality and bounded recollection, including whether their combined workflow earns a measurable benefit.

**Depends on:** C03, C05, C18, C19

**Inputs:**
- C03 delivered contract/fixture
- C05 delivered contract/fixture
- C18 delivered contract/fixture
- C19 delivered contract/fixture

**First action:** Draft and review the protocol, expected-case annotation guide and comparison questions before implementing the candidate methods.

### Smallest useful delivery

Start with the protocol and reviewed expectations, then run the core asset pipeline on frozen authorized exports and separately labelled synthetic edge cases. C17/C20/C21/C13 are not hard prerequisites for this core benchmark.

Activation gate: Protocol, question and case design start now. Core measured acceptance requires delivered C03/C05/C18/C19 inputs. Optional identity/adaptive/campaign comparisons are follow-up slices only after their own activation gates.

Input/output boundary: `evaluate_asset_cases(case_manifest, expected_labels, method_revision, run_config) → per_case_results, metric_denominators, failures, limitations, measured_or_not_run_state. Expected labels must not come solely from the evaluated component.`

### Baseline and useful evidence

Freeze a complete-inventory/straight set-diff baseline and a sensible field-age rule baseline before final comparison. Use identical cases, scope and budgets; disclose when a comparator is unavailable.

- False removals from partial collection, false-usable/fresh states, identity mismatches and unresolved cases per case family.
- Paired cost/quality outcomes for optional C20 only after real field-level collection is qualified.
- Separate real-lab, replay and synthetic denominators; record failures and small-sample uncertainty.

### Synthetic design expectations

These cases specify expected behavior. They are not executed lab results or independent benchmark ground truth.

#### The adaptive candidate has not been qualified

Input:
```json
{
  "core_inputs_ready": true,
  "adaptive_candidate_state": "not_qualified"
}
```

Expected behavior:
```json
{
  "core_benchmark_can_run": true,
  "adaptive_result": "not_run"
}
```

Core evidence evaluation must not wait for every extension or a patch/recovery demonstration.

#### Labels were copied from the component under test

Input:
```json
{
  "expected_label_source": "candidate_output_only"
}
```

Expected behavior:
```json
{
  "ground_truth_accepted": false,
  "review_required": true
}
```

Independent source/export review is necessary to avoid circular evaluation.

#### Lower example cost but a critical quality error

Input:
```json
{
  "hypothetical_comparison": {
    "candidate_cost": 1,
    "baseline_cost": 3,
    "candidate_false_fresh_count": 1
  }
}
```

Expected behavior:
```json
{
  "benefit_claim_accepted": false,
  "quality_gate_failed": true
}
```

A cheaper unsafe decision is not a demonstrated improvement. These are hypothetical numbers, not measured findings.

[Download behavior cases](research/assets/C22-behavior-examples.json)

### Creative choices to investigate

- Propose a useful hypothesis and an ablation that could falsify it; predeclare the baseline, cases and success/safety criteria.
- A reproducible negative result or simpler winning baseline is an acceptable research outcome.

### Research / Questions to Answer

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. Freeze a complete-inventory/straight set-diff baseline and a sensible field-age rule baseline before final comparison. Use identical cases, scope and budgets; disclose when a comparator is unavailable. Choose and justify a method; the reference examples constrain observable behavior, not the internal algorithm.

- Which independently reviewed asset facts and change sequences exercise false merges, missed changes, stale evidence and partial collection?
- Does adaptive recollection resolve comparable evidence gaps with less collection cost than full refresh under identical safety limits?
- Which claimed gain disappears when identity resolution, deltas, freshness or budget selection is removed?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Source starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

### Support Contributions and Handoff

- Mahrous: Mahrous independently checks case expectations and experiment design; Omar reproduces the asset pipeline/consumer contract. Mahrous reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c22-mahrous.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.
- Omar: Mahrous independently checks case expectations and experiment design; Omar reproduces the asset pipeline/consumer contract. Omar reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c22-omar.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.
- 6 November review: narrow the minimum implementation, correct dependency/scope gates, and separate required behavior from creative choices. No implemented or measured result is claimed.

### Implementation Steps

1. Read the versioned input/consumer contracts, minimum deliverable, example expectations and activation gate.
2. Draft and review the protocol, expected-case annotation guide and comparison questions before implementing the candidate methods.
3. Freeze source/export revisions and independent expectations for complete, partial, stale, conflicting and failed cases.
4. Run the core C18/C19 comparisons as soon as their inputs are delivered; do not wait for C13 or optional extensions.
5. Recompute per-case errors and denominators from raw results, keeping all failures visible.
6. For optional studies, freeze added criteria before seeing the results; compare identical cases and count all collection overhead.
7. Publish evidence, limitations and positive/tied/negative conclusions. Mark unavailable comparisons not_run rather than assuming benefit.
8. Record input/configuration revisions and the reviewers’ findings. Research documents may be equivalent indexed sections in a shared asset notebook/ledger.

### Technical Approach

evaluate_asset_cases(case_manifest, expected_labels, method_revision, run_config) → per_case_results, metric_denominators, failures, limitations, measured_or_not_run_state. Expected labels must not come solely from the evaluated component. Protocol, question and case design start now. Core measured acceptance requires delivered C03/C05/C18/C19 inputs. Optional identity/adaptive/campaign comparisons are follow-up slices only after their own activation gates.

### Expected Deliverables

- `evaluation/assets/case-manifest.json`
- `evaluation/assets/annotation-guide.md`
- `experiments/assets/run_evidence_benchmark.py`
- `reports/assets/evidence-benchmark.json`
- `reports/assets/asset-contribution-and-limitations.md`
- `research/assets/competitor-capability-matrix.md`
- `docs/research/assets/c22-decision-brief.md`
- `docs/research/assets/c22-evidence-matrix.csv`

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- A second reviewer checks expected asset facts without copying the new engine’s output as truth.
- Reproduce metrics from frozen cases and raw results, including failed/unavailable runs.
- Hold budget and case set constant across baselines/ablations; never mix synthetic and real-lab denominators silently.
- Verify the design case “The adaptive candidate has not been qualified” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “Labels were copied from the component under test” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “Lower example cost but a critical quality error” against the independently reviewed expectation; preserve its synthetic/design-only label.

### Acceptance Criteria

- The minimum implementation consumes valid named inputs and meets the reviewed behavior cases; examples/templates alone do not establish completion.
- Every mandatory artifact exists or maps to agreed equivalent sections; preserve original evidence and disclose unresolved failures.
- Publish the specified baseline/metric results with denominators, measured/not-run state and limitations. A negative result may satisfy research acceptance if the protocol and artifact requirements are met.
- Activation, authorization and existing platform boundaries remain enforced; no new owner, command or queue authority is introduced.
- Named supporting reviewers reproduce the relevant contract/case check and record findings/disposition.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

C20, C23

## C23 — Qualify Observed Asset–Service Relationships Without Invented Dependencies

**Owner:** Shams · **Support:** Mahrous, Hams

**Delivery layer:** Conditional experiment · **Gate:** G3

**Scope version:** 2026-10-23.r2

**Goal:** One observed host–package–service relationship view for a narrow approved lab profile, with evidence references and explicit coverage. No inferred business-dependency graph is required.

**Why This Matters:** Research and prototype a provenance-backed asset/package/service relationship view using available observations, while exposing missing coverage and separating observed edges from hypotheses.

**Depends on:** C18, C19, C22

**Inputs:**
- C18 delivered contract/fixture
- C19 delivered contract/fixture
- C22 delivered contract/fixture

**First action:** Freeze one asset-context question and the narrow authorized observation profile with reviewers.

### Smallest useful delivery

One observed host–package–service relationship view for a narrow approved lab profile, with evidence references and explicit coverage. No inferred business-dependency graph is required.

Activation gate: Activate only for a concrete reviewed asset-context question that flat inventory does not answer well, after the core benchmark and capacity review. New probes require a separate approved capability.

Input/output boundary: `assemble_observed_relations(validated_observations, as_of, coverage_policy) → typed_edges, evidence_refs, stale_or_unknown_edges, missing_coverage. Observed connection does not establish business dependence.`

### Baseline and useful evidence

Use the same asset-context questions against flat inventory and the proposed relationship view; measure reviewer correctness/effort and source coverage. Disclose convenience-user limitations.

- Evidence-linked versus unsupported edges, missing coverage and stale-edge handling.
- Correct answers/time on the same reviewed questions; graph size/resource cost at the measured scope.

### Synthetic design expectations

These cases specify expected behavior. They are not executed lab results or independent benchmark ground truth.

#### A source explicitly relates a service to a package

Input:
```json
{
  "observation": {
    "asset_id": "asset-A",
    "service": "demo-service",
    "package": "demo-package",
    "relationship": "explicit_source_mapping",
    "fresh": true
  }
}
```

Expected behavior:
```json
{
  "edge_kind": "observed_mapping",
  "business_criticality": "unknown"
}
```

An observed local relationship does not supply business-impact truth.

#### Only a network connection was observed

Input:
```json
{
  "observation": {
    "asset_id": "asset-A",
    "peer": "asset-B",
    "kind": "connection_only"
  }
}
```

Expected behavior:
```json
{
  "business_dependency": "unproven",
  "coverage": "incomplete"
}
```

A connection alone cannot justify a confirmed business dependency.

#### The relationship evidence is stale

Input:
```json
{
  "edge_source_state": "stale",
  "prior_edge": "asset-A→demo-service"
}
```

Expected behavior:
```json
{
  "current_confirmed_edge": false,
  "preserve_historical_edge": true
}
```

Keep history and current evidence status distinct.

[Download behavior cases](research/assets/C23-behavior-examples.json)

### Creative choices to investigate

- Choose a graph/list representation or explanation design with Hams; justify it through the reviewed context questions.
- Record whether the experiment should be enabled, narrowed or rejected rather than assuming a graph is valuable.

### Research / Questions to Answer

For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed. Use the same asset-context questions against flat inventory and the proposed relationship view; measure reviewer correctness/effort and source coverage. Disclose convenience-user limitations. Choose and justify a method; the reference examples constrain observable behavior, not the internal algorithm.

- Which package/service/host relationships can the existing authorized collectors actually substantiate?
- What is lost when observations are stale, one-sided, partial or scoped to one host?
- Does an evidence-linked relationship view help reviewers answer asset-context questions compared with a flat inventory, at an acceptable resource cost?
- Which smallest implementation answers the declared project need, and what evidence would make the extension unnecessary?

Source starting points:
- [Tenable asset deduplication](https://docs.tenable.com/exposure-management/Content/getting-started/asset-deduping.htm): Document existing identity/deduplication capabilities before claiming differentiation.
- [Wazuh system inventory architecture](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/how-it-works.html): Inspect existing collection/inventory behavior and identify the evidence required for a fair comparison.
- [Fleet scheduled reports](https://fleetdm.com/guides/reports): Study existing scheduled collection and its operating costs as prior art, not a feature to relabel as novel.

### Support Contributions and Handoff

- Mahrous: Mahrous reviews context/priority boundaries; Hams reviews interpretation and the handoff to existing UX design. Mahrous reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c23-mahrous.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.
- Hams: Mahrous reviews context/priority boundaries; Hams reviews interpretation and the handoff to existing UX design. Hams reviews only the named boundary; Shams produces the package artifacts. When: At contract/design review and again at acceptance after the named prerequisite artifacts are available. Deliver: `reviews/c23-hams.md — Boundary, fixture and acceptance review`. Review: Shams records findings/disposition and evidence revisions; unresolved safety or contract blockers prevent acceptance.

### Scope Revision

- 6 November 2026: new Shams-owned asset package. Existing team task ownership and requirements are preserved; this work does not introduce retroactive November 1/5 deadlines.
- 6 November review: narrow the minimum implementation, correct dependency/scope gates, and separate required behavior from creative choices. No implemented or measured result is claimed.

### Implementation Steps

1. Read the versioned input/consumer contracts, minimum deliverable, example expectations and activation gate.
2. Freeze one asset-context question and the narrow authorized observation profile with reviewers.
3. Define evidence-backed edge types and missing/stale coverage rules.
4. Assemble only observed or explicitly declared relationships from existing approved observations.
5. Keep hypotheses separate and do not infer business criticality or risk scores.
6. Compare against flat inventory on the same questions and publish enable/narrow/defer/reject findings.
7. Record input/configuration revisions and the reviewers’ findings. Research documents may be equivalent indexed sections in a shared asset notebook/ledger.

### Technical Approach

assemble_observed_relations(validated_observations, as_of, coverage_policy) → typed_edges, evidence_refs, stale_or_unknown_edges, missing_coverage. Observed connection does not establish business dependence. Activate only for a concrete reviewed asset-context question that flat inventory does not answer well, after the core benchmark and capacity review. New probes require a separate approved capability.

### Expected Deliverables

- `research/assets/service-relationship-study.md`
- `backend/app/inventory/service_relationships.py`
- `contracts/v1/asset-service-edge.schema.json`
- `fixtures/assets/service-relationship-cases.jsonl`
- `tests/inventory/test_service_relationships.py`
- `reports/assets/service-context-qualification.md`
- `docs/research/assets/c23-decision-brief.md`
- `docs/research/assets/c23-evidence-matrix.csv`

Research brief/evidence requirements may map to indexed sections in one shared asset notebook and evidence ledger; record the equivalent paths by task ID.

### Testing

- A stale or missing observation cannot create an apparently current confirmed relationship.
- Keep hypothesized edges visibly separate from observed evidence.
- Bound graph size and show incomplete coverage; any new probe requires a separate approved capability.
- Verify the design case “A source explicitly relates a service to a package” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “Only a network connection was observed” against the independently reviewed expectation; preserve its synthetic/design-only label.
- Verify the design case “The relationship evidence is stale” against the independently reviewed expectation; preserve its synthetic/design-only label.

### Acceptance Criteria

- The minimum implementation consumes valid named inputs and meets the reviewed behavior cases; examples/templates alone do not establish completion.
- Every mandatory artifact exists or maps to agreed equivalent sections; preserve original evidence and disclose unresolved failures.
- Publish the specified baseline/metric results with denominators, measured/not-run state and limitations. A negative result may satisfy research acceptance if the protocol and artifact requirements are met.
- Activation, authorization and existing platform boundaries remain enforced; no new owner, command or queue authority is introduced.
- Named supporting reviewers reproduce the relevant contract/case check and record findings/disposition.

### Risks / Failure Modes

- Implicit identity merges, false freshness or treating missing observations as clean can mislead consumers.
- A second queue, matching engine, advisory collector or AI request generator would overlap existing ownership.

### Fallback

Retain immutable evidence and explicit unknowns; use the existing bounded full-collection path until the candidate is qualified.

### Next Dependent Work

Review and qualified follow-up; no mandatory consumer is listed.
