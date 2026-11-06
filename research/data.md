Ownership update · 6 November 2026: Shams owns C03–C07 asset contracts/collection and C13 independent asset verification. Amr retains vulnerability/advisory data and C02/C11/C12/C14 execution/recovery; Mahrous reviews matching/closure. Earlier ownership notes below are retained as dated history.

Ownership correction · 4 November 2026: Amr owns vulnerability/advisory data; Shams owns asset/inventory data. C02 lab and C11/C12/C14 patch execution remain Amr; C03 remains Mahrous; P02 remains Omar. Current task cards and responsibility map supersede historical owner references below.

# Intelligence, applicability and prioritization — research handoff

Research date: 14 October 2026. All selections below are recommendations for this five-person graduation team, not implemented or supervisor-approved decisions. Sources and web refs are in `data_sources.json`; 16 executable packages in `data_tasks.json`.

## Conclusions that change the architecture

1. **Do not wait for NVD enrichment.** NIST's April 2026 policy prioritizes selected CVEs; other records can remain unenriched. June 2026 added CVE `affected` and CISA-ADP SSVC fields. August changed affected data in history to a GitHub reference while current CVE endpoint retains full affected JSON. Therefore ingest the official CVE list, enrich asynchronously, preserve schema versions, and use vendor evidence for real applicability. [DS01, DS02]
2. **A useful Ubuntu adapter can start with official OSV JSON**, not scraped web pages. Ubuntu distinguishes vulnerability records (including unfixed issues) from USN/LSN fix announcements. Binary/source package mapping, distro release, Pro entitlement and Debian versions remain essential. OVAL is a useful independent cross-check, not a substitute for unfixed intelligence. [DS03, DS04]
3. **Do not build a new RHEL adapter around OVAL alone.** Red Hat's current page recommends CSAF/VEX information including fixed/unfixed products; OVAL/DSv2 is in maintenance mode. Red Hat public security data is CC-BY4, requiring attribution/link on redistribution. [DS05]
4. **Neither RAG nor an LLM establishes installed-version applicability.** Recommended design: canonical assertions + deterministic version/product rules + evidence states; retrieval supplies explanations and references. Model-generated product matches remain candidates for review until resolved.
5. **No arbitrary CVSS×EPSS “AI risk score.”** Preserve CVSS severity and dated EPSS forecast separately. EPSS is not local asset risk; confirmed exploitation takes precedence over low forecast. There is no universal EPSS action threshold. Local policy bands should state exposure, consequence and capacity assumptions. [DS12, DS16]

## Decisions and realistic alternatives

| Decision | Recommended project choice | Strong alternatives and when they fit | Hidden cost / early check |
|---|---|---|---|
| Vulnerability backbone | Official CVEListV5 + asynchronous NVD + vendor adapters | NVD-only is simpler but loses timely vendor detail/unenriched records; a commercial unified API may save normalization work if future funding/redistribution terms justify it | Implement revisions before bulk history; use record schema field, not publication date, to choose parser |
| Ubuntu evidence | Official Ubuntu OSV CVE+fix records, selected OVAL cross-check | OVAL execution is good for supported assessment; raw tracker scraping is brittle; OSV aggregate API is convenient but a vendor-direct snapshot gives provenance and offline reproducibility | Confirm binary→source mapping; do not use experimental API as an irreplaceable dependency |
| RHEL | CSAF/VEX vendor data after first Ubuntu slice works | OSV aggregate convenient for RPM advisory queries; OVAL useful existing ecosystem but maintenance status argues against new OVAL-only architecture | Product/repository stream, NEVRA and entitlement have to match |
| Windows | MSRC advisory data + Windows servicing applicability collected from an authorized endpoint | Generic CPE alone is cheaper but cannot reliably handle builds, installed/superseding cumulative updates or feature state | Time-box two-day spike on one Windows build; if blocked provide inventory/manual recommendations until term2 |
| OSS dependencies | OSV query/cache for explicitly selected ecosystems; preserve GHSA and other IDs | GHSA repository gives curated OSV records, attribution and Git history; neither replaces firmware/OS-specific advisories | API/package data sent externally can reveal software inventory; locally cache appropriate public data for sensitive deployments |
| Identity | Internal UUID + external IDs + typed links; purl for packages, CPE/vendor identity for platforms | CVE primary key excludes non-CVE findings; all text names cause collisions; purl-only cannot identify every appliance | `aliases` is equivalence; `related` and `upstream` must not merge identities |
| Applicability | Vendor-aware rules on fresh authenticated inventory; explain evidence + uncertainty | Fuzzy matching increases candidate recall but raises false positives; LLM matching useful proposal only; exploit validation is unnecessary and unsafe as universal proof | False negatives from wrong distro, branch, build, epoch, config; unsupported semantics become unknown |
| Product statements | Trusted scoped VEX assertions plus inventory | Blind VEX suppression is simple but unsafe; ignore VEX and false positives persist | Require publisher/product/version/context matching and reconsider after changes |
| Prioritization | Explainable rule bands with separate CVSS, KEV, EPSS, exposure, criticality, fixability | SSVC decision-tree concepts can guide policy; learned ranker needs reliable local labels; weighted score might be a benchmark but not calibrated risk | Missing signals stay missing; deadlines are internal policy, not copied legal mandates |
| Freshness | Proposed two-hour checks, daily bulk EPSS, continuous changed-record queue; preserve proposal24h goal | Nightly refresh simpler but little recovery margin; 2–3days relaxes original24h goal; retraining everyCVE wastes effort | “Known to assistant” and “reliably assessed on asset” are distinct milestones |
| Storage | Canonical structured records + immutable raw revisions + derived search index | Vector-only loses exact joins/ranges and audit; keeping every upstream byte forever grows storage | Content-addressed compression, bounded retention policy, backup/replay; data must be reconstructible |

The strongest approach is hybrid: official identifier backbone + vendor applicability + threat evidence + local business context. None is a substitute for the others. Start with one supported Ubuntu lab release and prove depth; design adapter interfaces for Windows/RHEL/appliances without pretending those adapters already work.

## Contracts to agree with Omar and Amr in the first week

`InventorySnapshot`: asset_id, observation_id, collected_at, collector_version, method, os/vendor/product/release/build/edition/architecture, packages [{ecosystem,name,binary_name,source_name,version,arch,repository}], services, firmware, evidence_refs, unknown_fields. IP is an observation, not sole identity. Snapshot freshness is explicit.

`AdvisoryAssertion`: internal_advisory_id, external_id, relationship_type, source_document_revision, product identity, range semantics, affected/fixed/unaffected/under-investigation status, authoritative_score_vectors, remediation references, publication/update times. A multi-CVE patch advisory links to multiple vulnerabilities; it is not one equivalence cluster.

`AssessmentResult`: asset_snapshot_id, advisory_revision, engine_version, state, reason_codes, matched_product, rule_id, comparisons, evidence_refs, gaps_to_collect, evaluated_at. Keep an append-only history plus current materialized result. `unknown` cannot silently become `not_affected`.

`KnowledgeChanged`: stable event_id, source_id, previous_revision,new_revision, changed_fields, affected_product_keys, emitted_at. Consumers are idempotent. Changes to raw text are different from changes to affected versions, patch, or exploitation evidence.

`RemediationCandidate`: vendor-authoritative fix/migration/mitigation, target scope, prerequisites, support/entitlement constraints, source revision, validation requirements. Runner preflight checks actual installability. Neither AI text nor an HTTP download success is patch approval.

## Source restrictions and maintenance risks

- CVE redistribution permits reuse with required MITRE copyright/license notices. Preserve them in exports and notices. [DS20]
- Red Hat and GitHub Advisory data are CC-BY4; provide attribution and original links. OSV's program license does not automatically grant rights for all upstream records. [DS05, DS09]
- FIRST API currently documents 1000 requests/minute. Prefer one daily bulk EPSS file for broad coverage, dated storage and low operational load. Handle429 and temporary blocks. [DS13, DS14]
- OSV currently says no API rate limits, but HTTP1.1 responses cap32MiB; use bounded batching/HTTP2 and caching. This is documentation, not an availability or perpetual-free promise. [DS07]
- MSRC client documents no API-key requirement. API version and payload relationships still need a live integration spike. Microsoft client-code license does not itself establish rights to rehost every downloaded document. [DS10, DS11]
- NVD developer page body was unavailable in this research tool. The frequently quoted5/30s and50/30s figures were found only in secondary client material during this pass; **do not mark them freshly verified**. Source register must confirm current direct documentation before configuring production limits. Conservative pacing plus429 handling is valid meanwhile. [DS21]
- For Ubuntu data redistribution and commercial redistribution, record the specific feed terms during D01; an open public endpoint is not enough to infer an unrestricted license. Student local analysis does not require claiming commercial licensing has been cleared.
- CVE upstream refresh interval is approximately seven minutes, not a contractual guarantee of every advisory's prompt publication. Publication may be delayed, incomplete or amended. [DS01]
- No CVE/advisory source can reveal every undisclosed vulnerability. No result means no known supported match, never proof of security.

## Hard cases the team should demonstrate

1. New CVE arrives without score/CPE/fix → show record and evidence gaps; do not invent a verdict.
2. Upstream version appears old but distro backport installed → vendor package comparison resolves fixed, with evidence.
3. Same package name in two ecosystems → distinct identity.
4. Windows patch KB absent but superseding cumulative update installed → no naive false-positive.
5. One vendor advisory fixes five CVEs → one patch candidate, five linked vulnerability identities.
6. GHSA without CVE → still tracked; EPSS unavailable rather than zero.
7. Advisory is withdrawn or CVE rejected → stale retrieval output invalidated and historical finding retained with revised status.
8. Vendor and generic assertions conflict → expose conflict and exact product applicability instead of silent last-write-wins.
9. Offline device imported manually → last-observed timestamp; unknown current state; local collector does not require public Internet exposure.
10.48h source outage followed by bulk changes → visible stale health, replay/catch-up and bounded reassessment queue.
11.Untrusted advisory text contains instructions to the assistant → treat as data; no privileged tool execution.
12.VEX from wrong product or stale SBOM → cannot suppress a finding.

## Academic and product evidence

Proposed research question: Does vendor-aware, change-triggered reassessment reduce false positives and time-to-correct-decision compared with naive version matching and periodic full reassessment, without reducing supported-scope recall?

Use frozen source revisions and independent labels; compare equal cases, not different inventories. Report precision, recall, unknown rate, per-family results, processing cost, new-record freshness and changed-record reassessment lag. Keep hard negatives and missing-evidence cases. The proposal90% detection goal refers to known vulnerabilities intentionally in a controlled supported test environment, not90% of the world's devices/CVEs. Distinguish classification metrics from vulnerability detection metrics.

A fresh CVE must be stored, searchable and linked to affected existing assets when sufficient evidence exists. The original24h requirement should remain visible; percentage meeting24h and p95/max are measurement clarifications, not permission to quietly replace the original target. Alert on misses. A2–3day window may be a measured fallback under failure, not silently the new promise.

Near-term demonstration by23Oct2026 (provisional internal date): Shams explains a sampled CVE+Ubuntu source contract, license/status differences, and normalized fixture; Mahrous explains affected/fixed/unknown decision traces on vulnerable versus backported package; both show dependency handoff to Amr inventory and Omar API. This is achievable evidence of ownership, not a demand to finish16 workpackages in a week.
