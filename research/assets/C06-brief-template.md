# C06 — Asset research decision brief template

Owner: Shams. State: blank planning template; no research or test completion is claimed.

## Decision to make
Qualify one Windows inventory approach only if the deferred extension is approved.

## Questions
- For the exact Windows target, which candidate exposes the required OS/build/package/update fields, and what remains unavailable?
- What enrollment, privileges, transport, maintenance and redistribution constraints would each available candidate introduce?
- On the same authorized target, how do candidates differ in measured field completeness, collection time, CPU/RAM and explicit failures?

## Evidence and comparison method
For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

Create a decision table for the existing Wazuh/osquery/native options; mark unavailable measurements as not run. Implement one justified option, rather than several competing adapters.

## Cases to investigate
- Missing build/update field — planned / not run
- Insufficient permission or failed transport — planned / not run
- Duplicate or changed host identity — planned / not run
- Missing or conflicting inventory entry — planned / not run

## Decision record
- Selected approach: pending
- Alternatives and reasons: pending
- Evidence links and revisions: pending
- Measured results / not-run cases: pending
- Limitations and unknowns: pending
- Implementation changes justified by findings: pending

## Consumer review
- Omar / P02: mapped Windows observation contract
- Mahrous / D08/D09: declared identity and applicability gaps
- Team scope review: evidence to enable, defer or reject the extension

Omar reviews integration/operating burden; Mahrous reviews matching coverage; Amr supplies only agreed lab/access help.

Review date / findings / disposition: pending

## Scope and starting gate
Deferred extension: keep to an initial evidence-gap/feasibility note until the scope gate and target access are agreed. Do not let this delay C03/C05.

## Retained starting references
- [Wazuh system inventory](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/index.html)
- [osquery documentation](https://osquery.readthedocs.io/en/stable/)
- [osquery licence](https://github.com/osquery/osquery/blob/master/LICENSE)
- [Wazuh inventory compatibility matrix](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/compatibility-matrix.html)

These are source starting points. Verify the relevant version and claim; the template supplies no technical finding.


### Official source starting points

- [Microsoft Win32_QuickFixEngineering reference](https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-quickfixengineering): Investigate documented update-inventory coverage limits before choosing a Windows collection method. Official source checked 6 November; this alone is not a complete inventory or vulnerability verdict.
- [osquery documentation](https://osquery.readthedocs.io/en/stable/): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.
- [Wazuh inventory compatibility matrix](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/compatibility-matrix.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.
