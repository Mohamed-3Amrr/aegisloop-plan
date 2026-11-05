# AegisLoop — Scope and Handoff Baseline

Version: 2026-10-23.r2

Recommended next-release scope — validate C01/D17 profile gates; not a proven customer contract.

Help an analyst choose the next defensible remediation action for supported industrial IT, explain the evidence and verify the result.

## Supported capabilities

- **Ubuntu lab**: Scoped SSH inventory; Vendor-native tri-state; Reviewed native package plan; Controlled pilot + independent verification; Core; exact supported release selected in C01/P01
- **FortiOS evidence profile**: Reviewed identity/configuration import; Vendor-advisory rules after D17 qualification; Vendor fixed-branch + upgrade-path review; No automatic firmware execution; Conditional; licensed hardware/VM access not assumed
- **Windows / other vendors**: Existing research retained; Separate profile gates; Deferred execution scope; Not in narrow release; Deferred guides remain available
- **Direct OT / meters / PLCs**: No generic active probing; Inventory/advisory feasibility only later; Vendor/safety-qualified future work; Excluded from current mutation scope; Requires authorization, equipment and safety qualification

## On-prem milestones

### 01 / Foundation now

**When:** G0–G1

**Owner:** Omar + Hams + Amr

**Build:** Contracts, configuration, local data/evidence paths, provider adapters and allowed-egress policy.

**Exit proof:** One schema/fixture manifest; no cloud URLs inside domain logic; exact dependency and rights inventory.

Packages: P01, P02, D18, A06

### 02 / Connected on-prem lab

**When:** G2, after first real slice

**Owner:** Omar; Amr and Hams support

**Build:** Install API, DB, worker, local evidence and qualified local inference on a measured host. Permit only approved intelligence/package update paths.

**Exit proof:** Reproduce install, local inference, secret rotation and coordinated restore. Record actual capacity and latency.

Packages: P14, A09, P11

### 03 / Disconnected qualification

**When:** G3, after connected profile passes

**Owner:** Omar; all domain owners review

**Build:** Versioned trusted bundles for images, models, source snapshots and migrations; no hidden startup downloads.

**Exit proof:** Clean install and same enabled workflows with internet blocked; tamper/incompatibility rejection and recovery. Snapshot age stays visible.

Packages: P17

### 04 / Enterprise qualification

**When:** After qualified pilot; dates uncommitted

**Owner:** Mahrous coordinates requirements; Omar implements

**Build:** Customer-specific SSO/PKI, retention, support/update process, sizing and availability requirements. HA/Kubernetes only if a measured requirement justifies them.

**Exit proof:** Customer acceptance and procurement requirements; no universal claim that all companies reject cloud.

Packages: P15, P16, D18

## Hams sequencing

- **Now**: UX01 + A01, then A02/A03; Narrow questions, taxonomy, real/source versus synthetic manifests; Do not start broad model training or generic OT labels
- **Next**: UX02 alongside A04 and A06, sequenced by weekly capacity; Hand Omar a reviewed prototype; deliver CPU baseline and scoped corpus; No parallel promise for all tasks owned by one person
- **Then**: A07 → A09 → A10/P11; UX03 after P05; Measured retrieval/local model and implemented-flow usability; A05/A08 only if baseline error evidence justifies them
- **Before ClickUp transfer**: P02 shared manifest + scope export; Mohamed/Mahrous and Hams use the same contract, fixtures, inputs and expected outcomes; Existing work progress is unknown; reconcile artifacts, never invent completion
- **AI prioritization experiment**: A02/A03 + D12/D14/D15 → A17 → A15; Hams capability owner; four named contributions in A17/A11; No presumed AI superiority; D12 baseline fallback and analyst approval retained

## Before importing tickets

1. Read the same scope version and release-layer tags.
2. Reconcile existing files and decisions; actual work completion is not known from this site.
3. Mahrous and Hams compare expected applicability outputs, question taxonomy, context fields and fixtures.
4. Omar checks schema/API compatibility; Amr checks advisory source/rights; Shams checks asset collection feasibility.
5. Record unresolved fields and the owner before importing the prepared CSV.
6. Import only after the handoff baseline is accepted by the team; this website does not write to ClickUp.
7. Map CSV owners and custom fields to the actual ClickUp workspace, then verify dependencies manually; the prepared file does not guarantee automatic user/dependency mapping.

Actual progress is unknown. This site does not track team progress. No ClickUp tasks were created by this export.
