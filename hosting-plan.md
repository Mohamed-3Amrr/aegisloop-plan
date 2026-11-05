# AegisLoop — Hosting Execution Plan

Owner: Omar

Updated: 2026-10-24 (Cairo)

Omar owns hosting selection, configuration, deployment, release operations and recovery. The current Sites page hosts this planning hub; it is not evidence that the vulnerability-management product is deployed.

Execution plan; host/provider and exact capacity still need validation

## Component placement

- **UI + HTTPS entry**: Chosen lab/customer host, or qualified demo VM; Approved user network; public only if that deployment is explicitly intended; DNS, certificate trust/renewal and proxy configuration
- **API + worker**: Private application services on the measured host; API through the reviewed entry; worker has no public job listener; P04 permissions and P07 durable jobs
- **PostgreSQL + evidence**: Persistent local-capable storage; Private service access; no public database port; Consistent backup, permissions and tested restore
- **Inference + embeddings**: Qualified local service; external adapter only when permitted; Private endpoint; local-only rejects external destinations; Hams measures A09; Omar integrates P11
- **Collection / execution runner**: Authorized zone with target reachability; Isolated boundary; approved jobs only; Amr collector/execution work; P08 authorization and reconciliation

## Options to validate

- **Measured team/lab host**: Best first proof when access/resources are available; Power/network uptime, remote access, backups and local capacity must be measured; First qualification candidate; not guaranteed available
- **Single cloud VM**: Shared connected demo and infrastructure control; Recurring compute/disk/egress cost and admin responsibility; private-runner connectivity still needed; Needs Validation against actual resources and permitted data
- **Managed platform / PaaS**: Can reduce some web-serving operations; Durable workers, storage, long jobs, model serving and private networking may constrain fit; Compare one realistic candidate; no provider selected
- **Customer-hosted / disconnected**: Required staged product direction; Customer operations, artifact updates, certificate/identity trust and restore qualification; Extend P14 into P17; no second application architecture

## Implementation order

- **01 — Measure & compare** (P01): Host capabilities, storage, model placement, access and ownership/cost sheet.
- **02 — Freeze the hosting plan** (P14): Placement/network matrix, staging versus demo, DNS/TLS and secrets plan.
- **03 — Deploy a private core** (P14): Pinned artifacts, persistent volumes, isolated runner and approved HTTPS entry.
- **04 — Prove operations & recovery** (P14): Access/health checks, restart, backup/restore, release failure and migration recovery.
- **05 — Qualify disconnected delivery** (P17): Trusted update bundles, local DNS/certificates/identity and blocked-egress tests.

## Deliverables

- `deployment/hosting-plan.md`
- `deployment/network-and-port-matrix.csv`
- `deployment/tls-and-dns-runbook.md`
- `deployment/release-and-recovery-runbook.md`
- `reports/hosting-qualification.md`

## Acceptance and tests

Use the P14 execution guide for the full test/DONE checklist; use P17 for disconnected qualification.

- P01 hosting research can start now; P14 deployment completion retains its P04/P07 prerequisites.
- Do not purchase a service or expose private services merely to complete the plan.
- Exact provider, VM size, proxy and certificate issuer are unresolved choices, not hidden defaults.
- P14 proves connected hosting. P17 separately proves the enabled disconnected capabilities.

## Evidence

- [Docker Compose production deployment](https://docs.docker.com/compose/how-tos/production/)
- [FastAPI deployment: HTTPS and TLS termination](https://fastapi.tiangolo.com/deployment/https/)
- [Docker Compose networking](https://docs.docker.com/compose/how-tos/networking/)
- [Compose secrets](https://docs.docker.com/compose/how-tos/use-secrets/)
- [PostgreSQL backup](https://www.postgresql.org/docs/current/backup.html)