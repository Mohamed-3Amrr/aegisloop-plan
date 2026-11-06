# C13 — Asset research decision brief template

Owner: Shams. State: blank planning template; no research or test completion is claimed.

## Decision to make
Choose independent asset and health checks that can challenge a successful patch-executor result.

## Questions
- Which fresh installed/running-state and health checks distinguish a successful update, a broken service, incomplete restart and insufficient evidence?
- How can verification collect evidence independently from the executor success flag and link it to the same asset without rewriting earlier observations?
- After Amr executes the authorized recovery fixture, which observations support closure, continuing uncertainty or a reopened/linked finding episode?

## Evidence and comparison method
For every decision, record the official source URL, publisher/version or revision, access date, relevant section, claim, applicable asset/profile, evidence kind (documentation, measured lab result or labelled fixture), limitation and downstream decision. Compare viable alternatives or document why a second option is unavailable. Do not count links as evidence of correctness; keep unknowns, conflicting evidence and negative results visible. Never label a proposed test as executed.

Predeclare expected outcomes, then compare executor-only success with independent fresh asset and service evidence on the same approved fixtures; disclose every disagreement and unresolved case.

## Cases to investigate
- Exit code zero but failed health check — planned / not run
- Updated package with stale/running state — planned / not run
- Missing or stale post-observation — planned / not run
- Recovery restores an old vulnerable version — planned / not run
- Identity mismatch between pre/post snapshots — planned / not run

## Decision record
- Selected approach: pending
- Alternatives and reasons: pending
- Evidence links and revisions: pending
- Measured results / not-run cases: pending
- Limitations and unknowns: pending
- Implementation changes justified by findings: pending

## Consumer review
- Mahrous: justified reassessment, closure and recurrence decisions
- Amr / C11/C12/C14: verification failures and evidence from his execution/recovery operations
- C16: independently reproducible verification evidence and honest limitations

Mahrous signs off matching/closure expectations; Amr performs and documents authorized patch/recovery operations. Shams owns independent collection and verification code/results.

Review date / findings / disposition: pending

## Scope and starting gate
Draft the check-selection matrix and failure fixtures now. Measured verification waits for C08/C11/C12; do not duplicate Amr’s execution or recovery runner.

## Retained starting references
- [Ansible apt module](https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/apt_module.html)
- [NIST SP 800-40 Rev 4](https://csrc.nist.gov/pubs/sp/800/40/r4/final)

These are source starting points. Verify the relevant version and claim; the template supplies no technical finding.


### Official source starting points

- [NIST SP 800-40 Rev 4](https://csrc.nist.gov/pubs/sp/800/40/r4/final): Use as a retained official starting point; extract only the relevant asset claim and record gaps. Existing plan reference; verify the applicable section/version during research.
- [Ubuntu 22.04 dpkg-query manual](https://manpages.ubuntu.com/manpages/jammy/man1/dpkg-query.1.html): Investigate explicit inventory output fields and binary/source package identity; build a read-only collection fixture. Pinned Jammy manual checked 6 November; verify the actual target and tool version.
