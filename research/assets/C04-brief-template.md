# C04 — Asset research decision brief template

Owner: Shams. State: blank planning template; no research or test completion is claimed.

## Decision to make
Select bounded discovery profiles using measured coverage, disruption limits and explicit evidence limitations.

## Questions
- Which probe choices and exclusions are justified for each approved lab device class, including fragile or unsupported devices?
- How do candidate bounded profiles compare on observed targets, traffic, duration, timeouts and identification uncertainty?
- Which discovery results can propose an asset and which require authenticated/offline confirmation before asserting its OS or package identity?

## Evidence and comparison method
For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

Compare saved-result parsing and approved lab profiles under the same declared target set; record coverage and failure counts separately. Never test unapproved targets.

## Cases to investigate
- Out-of-scope target rejected before contact — planned / not run
- Fragile-device exclusion — planned / not run
- Timeout/cancel with partial results — planned / not run
- Conflicting banner and authenticated identity — planned / not run

## Decision record
- Selected approach: pending
- Alternatives and reasons: pending
- Evidence links and revisions: pending
- Measured results / not-run cases: pending
- Limitations and unknowns: pending
- Implementation changes justified by findings: pending

## Consumer review
- C05/C07: which assets require authenticated collection or offline evidence
- Mahrous / D08: uncertainty flags rather than banner-derived certainty
- Amr / C02 and Mahrous / C01: evidence that discovery respects the approved lab and safety boundary

Mahrous reviews scope/safety and evidence limits; Amr verifies the approved lab conditions.

Review date / findings / disposition: pending

## Scope and starting gate
Desk research and saved fixtures can start now; live comparisons require C01/C02/C03 and explicit authorized targets.

## Retained starting references
- [Nmap legal notices](https://nmap.org/book/man-legal.html)
- [Nmap service/version detection](https://nmap.org/book/man-version-detection.html)

These are source starting points. Verify the relevant version and claim; the template supplies no technical finding.


### Official source starting points

- [Nmap host discovery controls](https://nmap.org/book/host-discovery-controls.html): Compare discovery controls and uncertainty within the approved lab. Official source checked 6 November; qualification must match the installed tool and selected profile.
- [Nmap service/version detection](https://nmap.org/book/man-version-detection.html): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.
