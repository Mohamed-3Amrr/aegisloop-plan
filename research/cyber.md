Ownership correction · 4 November 2026: Amr owns vulnerability/advisory data; Shams owns asset/inventory data. C02 lab and C11/C12/C14 patch execution remain Amr; C03 remains Mahrous; P02 remains Omar. Current task cards and responsibility map supersede historical owner references below.

# Cybersecurity collection and patch implementation plan
Research date: 2026-10-14. These are researched recommendations and implementation gates, not implemented capabilities. Hardware, exact lab OS versions, licences and authorization for any external environment remain unconfirmed. Sources are in cyber_sources.json. IDs C01–C16 below are local work-package IDs; cross-workstream dependencies are descriptive contracts until integrated into the master DAG.

## Decision: combine bounded discovery and authenticated evidence
Recommended first vertical slice: independent Nmap installation in an isolated Linux lab runner for bounded discovery, plus an allowlisted SSH collector for Ubuntu package/OS evidence. Treat banners as hints. For Windows, compare an osquery export versus Wazuh Syscollector in a small spike; choose one primary inventory adapter, not two simultaneous agent rollouts. If Wazuh is already deployed, reuse Syscollector to avoid another agent; otherwise osquery offers a smaller SQL inventory dependency but the team owns secure transport/enrollment. Normalize all adapters to the same observation schema. No scanner is universal. [CY-S01, CY-S02, CY-S08–CY-S11]

Alternatives:
- Nmap: mature network discovery/service observations; no local installed-package proof; active probes can affect fragile devices. NPSL is not a normal permissive licence; commercial embedding/redistribution needs separate review. Npcap has its own redistribution restrictions. Independent installation in the student lab avoids packaging it into the product but does not settle all future commercial integration questions. [CY-S01]
- Native SSH/WinRM inventory: small scope and controllable fields; strongest fit for the first demonstrator. Cost is platform-specific parsers, identity, privilege management and coverage maintenance. Prefer structured native outputs rather than shell text matching. WinRM has separate Python dependencies and authentication/encryption configuration. [CY-S05]
- osquery: cross-platform SQL querying and Apache-2.0 OR GPL-2.0-only choice; useful inventory, not a universal vulnerability scanner or patch manager. Validate table availability per OS, privileges and packaging; a query interface alone does not provide a secure fleet transport. [CY-S09, CY-S10]
- Wazuh Syscollector: already covers hardware, OS, packages, ports/processes and Windows updates, with a platform compatibility matrix. Strong reuse if SIEM already exists, but deploying manager/indexer/dashboard simply to obtain inventory adds operations and resource burden. Only request fields needed by this project. [CY-S08, CY-S11]
- Greenbone Community: mature vulnerability test coverage and useful independent comparison, but several services, feed synchronization and additional operations. Official container guidance gives minimum 2 cores/4 GB/20 GB and recommended 4 cores/8 GB/60 GB, and says that guide is not intended for production. Make optional lab comparison after measuring available capacity; do not make first-term core depend on it. Inspect component and feed licences separately before distribution. [CY-S07]

## Coverage is a matrix, not an all-devices promise
| Asset class | First evidence path | Limitation / honest output | Execution scope |
|---|---|---|---|
| Ubuntu lab VM, pinned supported release | SSH read-only OS/packages + repository metadata | Package inventory cannot prove all runtime configurations; preserve distro release and full package revision | First automated patch adapter |
| Windows lab VM | Authenticated native or chosen agent inventory; update applicability search | Build, edition, architecture and update history matter; installed KB lists alone are incomplete vulnerability proof | Second adapter after reboot/connection spike |
| Other Linux distributions / macOS | Vendor-native or agent export | Every family needs separate version semantics and advisory mapping | Inventory/import first; no implied patch support |
| Routers, switches, firewalls | Vendor API or read-only SNMPv3/SSH where supported | Need exact model, firmware train, hardware revision and licensed downloads; MIB/API differs | Vendor-specific manual plan unless tested adapter |
| Printers and cameras | Vendor inventory, approved limited probes | Fragile services and hidden firmware. Nmap skips version probes on TCP 9100 because some printers print probe data | Manual/vendor workflow |
| OT, PLC, medical, legacy fragile devices | Owner/vendor-approved passive inventory or offline export | Safety, availability and proprietary protocols constrain scanning; passive visibility can be incomplete | Excluded from generic active scan/patch execution |
| Internal devices without internet | Local runner in reachable segment, agent or import | Internet exposure is unnecessary; route/firewall/auth access still required | Offline repositories or approved update path required |
| Air-gapped/offline assets | Signed/hashed export with collection timestamp and operator | Import is historical evidence, not a live scan; no automatic freshness claim | Offline reviewed package transfer; integrity/compatibility controls |
| Non-IP / powered-off devices | Manual register/vendor export | No network scanner can observe a powered-off or non-IP endpoint | Unknown/unobserved, never automatically safe |
| Cloud managed services | Provider API/configuration evidence | Tenant may not control underlying OS patching; network scan is incomplete | Provider responsibility and supported customer changes |
| Containers/images | Image/package/SBOM evidence tied to digest | Host scanning does not enumerate all images and dependencies | Rebuild/redeploy image, not mutate ephemeral container |

These are proposed support boundaries derived from collection mechanisms and OT safety guidance; add a product family only when a real fixture and evidence/acceptance test exist. [CY-S02, CY-S05, CY-S08, CY-S11, CY-S12]

## Decision: build patch orchestration, reuse OS package engines
Use an isolated runner with allowlisted Ansible modules/playbooks calling native package/update mechanisms. Build campaign policy, approvals, exact target manifests, evidence history, durable execution state, failure recovery and verification ourselves. Never let an LLM construct and run arbitrary shell commands. Direct native execution is a fallback if Ansible setup costs outweigh reuse in the spike; it shifts timeout/error/reboot parsing to the team. Building our own package manager provides no academic advantage and adds risk. Commercial endpoint-management integrations can follow after the basic contract works.

Ubuntu first is a scope recommendation because its package/version workflow gives one demonstrable end-to-end family, not a claim that every Ubuntu case is simple. Choose release and test package only after checking supported repositories, advisories and lab resources. Ansible apt supports explicit versions and check mode, but Python dependencies, locks, package holds, dependency changes and service restarts matter. Do not use force or unauthenticated packages; do not silently replace an approved version with latest. [CY-S03, CY-S13]

Windows second: win_updates automates Windows Update, is in a separate collection, uses the configured update service, requires administrator access and can take hours. Automatic reboot can involve multiple cycles; update availability is constrained by configured services and policy. It does not support SCCM. Treat Windows as a separate execution adapter with its own capability declaration. [CY-S04]

Patch lifecycle: applicable finding → candidate fixes/mitigations → compatibility and provenance → dry-run/preflight → immutable approval → canary → deployment batches → reboot/restart → fresh inventory and health verification → closure or recovery → audit/SIEM. NIST treats enterprise patching as planned preventive maintenance, including prioritization and verification, not a download button. [CY-S06]

Operational rules are our proposed design, not guarantees from Ansible: approvals bind asset identity, expected inventory hash, package/update IDs, target versions, window and reboot policy. Expire approvals on material drift. One mutation lease per asset. Retry reads freely with bounds; after lost execution connection mark outcome unknown and reconcile actual state before repeating. Package-manager success is not closure. Check-mode predicts supported changes; it is not proof of compatibility or a reversible transaction. Snapshot/backup is not a universal rollback: firmware, database migrations and unavailable old packages may prevent reversal. Recovery options must be stated per adapter and rehearsed on the lab fixture. [CY-S03, CY-S04, CY-S14]

## Executable work packages
Suggested effort ranges are planning estimates in focused person-hours, not measured productivity. Owners build; reviewer checks the boundary and evidence. Parallel work starts after the shared contracts exist.

### C01 — Scope and lab safety contract
Owner Mahrous; reviewer Amr. Phase foundation; 4–6h. Depends: agreed project scope.
Input: device list and available laptop specs. Steps: define owned lab IP ranges and exclusions; tag asset classes; write read-only versus mutation permissions; create stop/timeout policy; define evidence retention and secrets boundaries. Output: lab-scope.yaml + capability matrix. Acceptance: out-of-scope target and excluded device classes are rejected before any connector call; unknown class defaults to no active probe. Risk: IP reuse or hostname resolution changes; fallback: revalidate resolved address against scope immediately before connection. Sources CY-S01, CY-S12.

### C02 — Reproducible lab and ground truth
Owner Amr; reviewer Mahrous. Phase foundation; 8–12h. Depends C01.
Input: hardware inventory and authorized OS images. Steps: create isolated VM/network; record image/version/digest; seed a small known affected and fixed package set plus unknown/backport fixtures; snapshot baseline; document restore. Output: lab manifest and expected labels. Acceptance: another teammate rebuilds one fixture; every seeded expected result has vendor evidence. Risk: insufficient RAM/old packages unavailable; fallback: serialized VMs and versioned recorded evidence, clearly distinguish replay from live scans. Sources CY-S06, CY-S13.

### C03 — Observation and identity contract
Owner Mahrous; reviewer Omar and Amr. Phase foundation; 6–10h. Depends C01; platform contract.
Input: three example asset exports. Steps: define stable asset ID, source-specific identity, timestamps, trust level, OS release, architecture, package namespace/version, firmware model/train; keep raw evidence reference and collection errors; define changed-IP and duplicate handling. Output: observation-v1 JSON schema + fixtures. Acceptance: incomplete data remains unknown; same IP on two identities is not silently merged; all observations preserve provenance. Risk: host identity spoofing; fallback: reconcile against enrolled key/approved identity and flag conflict. Sources CY-S08, CY-S11.

### C04 — Bounded discovery adapter
Owner Amr; reviewer Mahrous. Phase first slice; 8–12h. Depends C01–C03.
Input: allowlisted lab range/profile. Steps: wrap separately installed scanner using fixed argument arrays; enforce time/concurrency limits; collect structured output; normalize host/service hints; support cancellation; preserve raw result. Output: discovery adapter and fixture parser. Acceptance: zero out-of-scope connections in lab controls; timeout produces partial/failed status; no blanket aggressive scripts/allports profile. Risk: banner ambiguity and fragile devices; fallback: discovery-only or approved inventory import. Sources CY-S01, CY-S02.

### C05 — Ubuntu authenticated inventory
Owner Amr; reviewer Mahrous. Phase first slice; 10–16h. Depends C02–C03.
Input: pinned lab Ubuntu and read-only credentials. Steps: verify host key; collect OS release/arch/full installed package revisions and selected services; capture errors; avoid user files and broad environment dumps; normalize. Output: SSH inventory adapter. Acceptance: installed packages match native ground-truth export; expired credentials are an error not empty inventory; secrets absent from logs. Risk: permission gaps or command parsing drift; fallback: signed native JSON/export import. Sources CY-S03, CY-S05.

### C06 — Windows inventory selection spike
Owner Amr; reviewer Omar. Phase first-term research/second slice; 8–12h. Depends C03, available licensed VM.
Input: identical Windows fixture. Steps: compare osquery export and Wazuh Syscollector for OS build, packages, update fields, footprint and permissions; measure collection time; choose one; implement field mapping and missing-field flags. Output: decision record + selected adapter. Acceptance: documented coverage/missing fields and measured resource cost; no agent choice based only on popularity. Risk: image licensing or hardware unavailable; fallback: schema-tested recorded Windows export while labeling live Windows validation pending. Sources CY-S08–CY-S11.

### C07 — Appliance and offline intake
Owner Amr; reviewer Shams. Phase extension; 8–12h. Depends C03.
Input: one vendor export and offline JSON fixture. Steps: define model/firmware fields; import hash/timestamp/operator; validate schema and size; map only supported product identity; surface stale data and requests for missing evidence. Output: import adapter + capability card. Acceptance: unknown firmware remains unresolved; expired evidence never becomes fresh through re-import; imported labels remain distinct from scanned labels. Risk: vendor-specific formats; fallback: reviewed structured manual entry. Sources CY-S02, CY-S12.

### C08 — Applicability and evidence review boundary
Owner Mahrous; reviewer Shams. Phase first slice; 12–20h. Depends C03, C05, intelligence/matching workstream.
Input: vendor affected/fixed ranges and normalized observations. Steps: evaluate exact distro/package semantics; distinguish affected/not affected/unknown; attach source revision and evidence; test backported versions and missing configurations; request minimal missing evidence. Output: assessment-v1 with reason codes and fixtures. Acceptance: seeded supported-family recall and precision reported separately; unknowns counted and not hidden; no vulnerability proof from LLM narrative. Risk: aliases and source conflicts; fallback: unknown plus analyst review, never guessed match. Sources CY-S02, CY-S13; use master intelligence-source register for version matching.

### C09 — Patch intelligence catalog
Owner Shams; reviewer Mahrous. Phase first slice; 10–16h. Depends intelligence ingest and C08.
Input: vendor advisories/repositories. Steps: record fix IDs, affected product range, fixed version, support state, advisory links, prerequisites, restart notes and supersedence where supplied; separate mitigation from patch; version each revision. Output: patch-candidate schema and curated Ubuntu fixtures, Windows follow-up. Acceptance: every candidate points to vendor evidence and applicable platform; newest is not automatically best; no fixed version means no invented patch. Risk: advisory incomplete/withdrawn; fallback: pending/manual mitigation with explicit review date. Sources CY-S06, CY-S13, CY-S04.

### C10 — Campaign policy and immutable approval
Owner Mahrous; reviewer Omar. Phase patch planning; 10–16h. Depends C08–C09 and platform RBAC.
Input: applicable findings and candidate fixes. Steps: calculate candidate set under support/compatibility/window constraints; build target manifest; require scoped approver; expire on drift; define canary and stop thresholds. Output: campaign state machine + policy tests. Acceptance: Auditor/Guest cannot approve/execute; changed asset/version invalidates approval; no approval bypass through assistant tools. Risk: overbroad administrator privileges; fallback: explicit small-scope manual approval and no automatic campaign scheduling. Sources CY-S06; policy design is project recommendation.

### C11 — Ubuntu patch runner
Owner Amr; reviewer Mahrous. Phase first real patch; 14–22h. Depends C02, C05, C09–C10 and durable platform jobs.
Input: immutable approved manifest. Steps: verify identity/freshness/window; acquire asset lease; preflight disk/locks/backup/repository; run allowlisted explicit package plan; persist step outcomes; reconcile on reconnect; never interpolate arbitrary shell. Output: isolated runner adapter and audit events. Acceptance: one intended update on canary; duplicate job does not cause duplicate mutation; timeout yields unknown outcome until reconciliation; unsigned/unapproved artifacts rejected. Risk: package drift after approval; fallback: stop and replan. Sources CY-S03, CY-S14.

### C12 — Reboot and partial-failure handling
Owner Amr; reviewer Mahrous. Phase patch reliability; 10–16h. Depends C11.
Input: controlled failure fixtures. Steps: detect restart need; respect window; record pre/post boot identity; wait for authenticated reconnect; run health checks; retain per-asset/per-step outcome; halt next batch on trigger. Output: resumable state transitions and failure report. Acceptance: runner interruption, target disconnection and one failed asset never become whole-campaign success; operator can resume a safe remaining step. Risk: repeated execution after transport loss; fallback: reconcile-only state with manual recovery. Sources CY-S03, CY-S04.

### C13 — Independent verification and recovery
Owner Mahrous; reviewer Amr. Phase closure; 10–16h. Depends C08, C11–C12.
Input: post-execution observation and health checks. Steps: collect fresh evidence independent of executor's success flag; reevaluate finding; compare running and installed state where needed; perform service checks; close only on sufficient evidence; rehearse rollback/restore for the chosen fixture. Output: verification report and recovery matrix. Acceptance: successful package exit plus failing health remains unresolved; no universal rollback promise; restored old vulnerable version reopens finding. Risk: snapshot loses data or package downgrade unsupported; fallback: tested restore/rebuild or documented forward-fix. Sources CY-S06, CY-S03.

### C14 — Windows patch execution spike and adapter
Owner Amr; reviewer Mahrous. Phase second-term expansion; 14–24h. Depends C06, C10, C12–C13.
Input: approved Windows test update manifest. Steps: validate WinRM encryption/identity and admin boundary; enumerate configured update source; search available updates; select exact approved IDs/KBs; install with bounded reboot policy; capture HRESULTs and per-update state; fresh inventory and health. Output: Windows capability profile and runner adapter. Acceptance: real successful patch/reboot and failure/reconnect scenario; unsupported SCCM route is rejected; long-running job remains visible. Risk: hours-long updates, policy/catalog mismatch; fallback: reviewed manual native-update execution with evidence import. Sources CY-S04, CY-S05.

### C15 — Wazuh evidence integration
Owner Mahrous; implementer Amr with Omar API support. Phase first-term integration; 8–14h. Depends assessment schema and durable event outbox.
Input: normalized assessment/patch events. Steps: emit one JSON object per line to restricted rotating log; configure Wazuh agent localfile collection; verify JSON decoding; add custom rules; test decoder/rule with wazuh-logtest; correlate by asset ID, finding ID and campaign ID; verify external dashboard alert. Output: SIEM mapping + actual ingestion proof. Acceptance: event contains source ID, timestamp, evidence reference, CVE/advisory ID and lifecycle state; replay preserves event ID and cannot inflate project counters; no credentials in exported payload. Risk: duplicate delivery and rotation loss; fallback: durable replay cursor and documented at-least-once semantics, no claim of generic REST ingestion. Sources CY-S15, CY-S16.

### C16 — Coverage, benchmark and handover gate
Owner Mahrous; reviewer Shams; Amr maintains fixtures. Phase every discussion; 8–14h per major release. Depends relevant collection/assessment/patch tasks.
Input: declared support matrix and known lab ground truth. Steps: freeze test version; measure recall/precision/unknown rate by asset family; count scan failures separately; time update/assessment and recovery; compare optional independent scanner results without treating them as truth; publish unsupported cases and runbooks. Output: reproducible evidence bundle and discussion demo. Acceptance: proposal ≥90% detection goal reported only on declared known lab vulnerabilities, with denominator and failure cases; actual SIEM event and one verified remediation demonstrated; no product-wide claims from tiny lab. Risk: cherry-picked demo; fallback: holdout fixtures reviewed by teammate and seeded failure demonstration. Sources CY-S06, CY-S07; thresholds are proposal goals, not verified performance.

## Early caution gates
1. Before framework expansion: measure laptop RAM/disk and one VM + runner. Do not deploy full Wazuh, Greenbone, LLM and all VMs on every laptop.
2. Before automated mutation: prove scope rejection, stable identity, credential isolation, immutable approval and recovery on disposable lab asset.
3. Before promising Windows: perform update-source and reboot spike; inventory success does not establish patch capability.
4. Before public product packaging: review Nmap/Npcap, Ansible collections, Greenbone components/feeds, Windows images and any vendor advisory redistribution terms. Open-source labels alone do not resolve distribution obligations.
5. Before closing findings: independently re-collect and verify health. No fresh evidence means pending verification.
6. Before adding OT: require device-owner/vendor procedure and explicit support validation; OT remains passive/manual in this academic plan.
