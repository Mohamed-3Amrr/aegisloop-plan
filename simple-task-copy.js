'use strict';
const SIMPLE_TASK_COPY=Object.fromEntries(window.BLUEPRINT.tasks.map(t=>[t.id,[t.title,t.goal]]));
const SIMPLE_GROWTH={
inventory:['Stable asset identity and installed package versions.','Add linked services, architecture, collection time and collection errors.','The matching owner can identify stale or incomplete evidence and request exactly what is missing.'],
advisory:['A vulnerability record with its source and revision.','Preserve version boundaries, source disagreements and withdrawn or rejected records.','The matcher can handle changing evidence and difficult lifecycle cases.'],
assessment:['An applicability verdict with a reason.','Add precise missing-evidence requests and reviewed version-boundary/backport cases.','The collector knows what to gather next; the team can test difficult decisions.'],
threat:['A signal value with its date and source.','Preserve history and explicit missing or stale signal states.','Priority decisions can distinguish current evidence from old snapshots.'],
priority:['An explained order under a declared policy.','Test grouping related fixes and compare the result on reviewed cases.','An analyst may review fewer actions while keeping every underlying reason.'],
remediation:['A vendor-backed option for a specific release.','Add alternatives, compatibility constraints and reasons execution is blocked.','The reviewer can choose a suitable option for the actual asset and operating context.'],
execution:['Per-step execution states and outcomes.','Rehearse lost contact, retries and partial failures.','The team can recover without assuming that an uncertain operation succeeded.'],
policy:['Explicit allow and deny rules.','Add stale evidence, expired approval and insufficient-permission examples.','The same boundaries remain testable under failure conditions.'],
retrieval:['A search result linked to its evidence.','Compare methods on English/Arabic questions and missing-evidence cases.','The assistant owner can see where retrieval improves and when it must abstain.'],
dataset:['A dataset with traceable sources.','Add useful diversity and negative/missing cases; review splits for leakage.','Experiments can reveal errors beyond the easy examples.'],
evaluation:['A repeatable experiment with a declared metric.','Compare the addition with the baseline and record time, cost and errors.','The team chooses useful improvements from measured evidence.'],
platform:['Connected data and clear interface states.','Add failure handling and measurements that locate integration problems.','Other owners can connect their components and diagnose failures.'],
ux:['A design that supports the main user task.','Observe representative users doing that task, then address the confusing steps.','Changes follow observed behavior rather than guesses.'],
events:['A traceable event.','Test duplicate delivery and outages, and check interpretation after receipt.','The team knows whether the event arrived and was understood.'],
trust:['Source identity and permitted use.','Resolve a specific uncertainty about rights, maintenance or data leaving the host.','The deployment owner can make a documented choice.']
};
