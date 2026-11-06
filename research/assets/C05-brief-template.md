# C05 — Asset research decision brief template

Owner: Shams. State: blank planning template; no research or test completion is claimed.

## Decision to make
Choose and implement the smallest trustworthy Ubuntu inventory collection method.

## Questions
- Which native evidence distinguishes distro/build, architecture, binary/source package identity and installed versus running state for the chosen lab profile?
- What is the least permission needed for each field, and what should the adapter report when a field is denied or unavailable?
- How do candidate read-only collection approaches compare with a preserved native export on field coverage, discrepancies, duration and failure behavior?

## Evidence and comparison method
For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

Use the same authorized Ubuntu snapshot for each available candidate; compare against a preserved native export, record disagreements, and select a method with stated limitations.

## Cases to investigate
- Denied field or invalid credentials — planned / not run
- Host-key mismatch — planned / not run
- Partial output and command failure — planned / not run
- Missing source-package identity — planned / not run
- Stale observation and installed/running discrepancy — planned / not run

## Decision record
- Selected approach: pending
- Alternatives and reasons: pending
- Evidence links and revisions: pending
- Measured results / not-run cases: pending
- Limitations and unknowns: pending
- Implementation changes justified by findings: pending

## Consumer review
- Mahrous / C08/D09: reproducible asset facts with provenance and missing-field masks
- C13: independent before/after observations with stable asset identity
- Hams / A02: measured asset inputs only; no invented business context

Mahrous reviews matching-input sufficiency; Amr confirms lab access and execution separation; Omar checks ingestion.

Review date / findings / disposition: pending

## Scope and starting gate
After the C03 first pass, prepare collector fixtures. Real collection requires C02/C03 and the approved scope; Shams does not build Amr’s advisory collectors.

## Retained starting references
- [Ansible apt module](https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/apt_module.html)
- [Ansible Windows Remote Management](https://docs.ansible.com/projects/ansible/latest/os_guide/windows_winrm.html)

These are source starting points. Verify the relevant version and claim; the template supplies no technical finding.


### Official source starting points

- [Ubuntu 22.04 dpkg-query manual](https://manpages.ubuntu.com/manpages/jammy/man1/dpkg-query.1.html): Investigate explicit inventory output fields and binary/source package identity; build a read-only collection fixture. Pinned Jammy manual checked 6 November; verify the actual target and tool version.
- [Wazuh system inventory](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/index.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.
