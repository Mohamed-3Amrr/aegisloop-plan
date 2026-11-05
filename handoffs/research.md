# Workflow / output evidence · checked 4 November 2026

Research question: how can the existing 71-task AegisLoop team work in parallel, preserve ambitious deliverables and replace reference data with real handoffs without widespread rewrites?

## Design conclusion

Use the existing prerequisite DAG for navigation. Expose direct prerequisite/consumer paths and owner views. Separate implementation ordering from whether a specific input file exists; a fixture enables development, not operational acceptance.

Keep each task’s original deliverables and acceptance as the full target. Introduce a proposed, versioned handoff packet around a typed minimum record. Preserve extra fields. A consumer reads the same boundary from reference or delivered providers. This limits changes to producer adapters and the shared integration boundary; it cannot guarantee that existing producer code already uses the proposed format.

Use evidence-led growth: one hypothesis, a bounded experiment, a measurable consumer benefit and an explicit adoption review. Extra fields alone do not prove added value. Keep breaking semantic changes separate from optional additive evolution.

These are project design decisions, not empirical claims that this workflow improves team velocity by a measured percentage.

## Verified primary sources

| Source | Why it matters | Limits |
|---|---|---|
| [JSON Schema object reference](https://json-schema.org/understanding-json-schema/reference/object) | Required fields and additional properties can be modeled separately. | Schema validity does not prove domain truth, authorization or task completion. |
| [Ubuntu CVE-2024-6387](https://ubuntu.com/security/CVE-2024-6387) | Real vendor release/package status for the integration case. | No inference about an uncollected team host. |
| [USN-6859-1](https://ubuntu.com/security/notices/USN-6859-1) | Release-specific OpenSSH fixed versions. | Preserve source-package/release identity and native version semantics; do not compare lexically. |
| [Ubuntu OSV documentation](https://documentation.ubuntu.com/security/security-updates/osv/) | Authoritative machine-readable vendor evidence and scope. | This edition does not claim to have implemented or validated the team’s OSV adapter. |
| [CVEProject record](https://github.com/CVEProject/cvelistV5/blob/main/cves/2024/6xxx/CVE-2024-6387.json) | Real CNA/ADP vulnerability record with revisions. | Raw record retains its upstream metadata; review CVE terms for redistribution. |
| [FIRST EPSS API](https://api.first.org/data/v1/epss?cve=CVE-2024-6387&date=2024-07-02) | Exact historic score returned by FIRST. | Historical 2 July 2024; never label this as today’s score. Attribute EPSS to FIRST.org. |
| [CISA official KEV repository](https://github.com/cisagov/kev-data) | Captured catalog membership and revision. | Absence in the snapshot is not proof of non-exploitation. The snapshot and EPSS dates differ. |

Exact retrieval timestamps, URLs, SHA-256 values and captured files are in sources/manifest.json. Source-facts.json records the three release-specific fixes. The original task source lists and historical research dates remain accessible on each output page. They were not all reverified by this pass.

## Search coverage and unavailable evidence

Reviewed standards/schema guidance, official vendor documentation, official vulnerability records and public threat datasets. Search terms covered JSON Schema additionalProperties/evolution, CISA KEV JSON and FIRST EPSS API; exact primary pages were then fetched and inspected. Pact’s introductory documentation was attempted but unavailable to the direct capture; this implementation makes no verified claim based on that page. Patents are not material to this integration design.

## Expanded task data library

The initial single-CVE seed was expanded into 71 task-specific input packs, including every owner and later delivery layer. The linked data-readiness.json reports exact dynamic counts: 45 real CVEs (43 published and 2 rejected), 39 Canonical OSV records with 1,065 package/release rows, 56 Ubuntu notices, 86 dated EPSS rows, the captured 1,767-entry KEV catalog, Fortinet/Microsoft/Red Hat supplements and a genuine GHSA-only record. Rejected CVEs are lifecycle fixtures, excluded from active-finding scenarios.

Engineering adds 26 captured profiles with Nmap XML, osquery schema columns, real upstream SBOM components, SPDX packages, VEX examples, Wazuh, Ansible, OpenAPI, PostgreSQL and accessibility examples. AI adds 17 method profiles from 21 primary captures, 60 explicitly derived English/Arabic evidence questions and eight inert authored safety cases. Source record labels and provider metrics are kept separate from project labels and predictions. Generated questions are not independent ground truth.

Each pack names captured inputs, field mappings, original deliverables, gaps and proposed development versus evaluation coverage gates. All task IDs have mapped input specimens. A mapped source or a high record count does not prove a benchmark is statistically sufficient; label balance, independent review, supported vendor profiles and task-specific acceptance still require evidence. Complete corpora are linked once rather than duplicated into every packet.

## What remains unknown

Actual team delivery/completion state; the team’s current implementation APIs; real lab observations; valid credentials; independent labels; measured classification/ranking/retrieval/latency/UX results; and producer/consumer approval of the new contracts. Every missing observation remains null/not_collected and every unrun result remains not_run. Public records support development; measured sufficiency requires a declared evaluation design.

## Next evidence to collect

1. Authorized C05 native package export with stable asset identity and collection timestamp.
2. Producer/consumer review of C03, D02 and P02 mappings against actual code.
3. Independent D15 boundary and backport cases; frozen A13 evaluation protocol before A17 comparison.
4. Real measured import/consumer tests and review dispositions before calling a task complete.
