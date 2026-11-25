'use strict';

const sprintOne = {
  id: 'sprint-01',
  phase: 'MVP Integration & Validation',
  title: 'Sprint 01 · Analyst Triage MVP',
  goal: 'Turn one connected Ubuntu assessment into an analyst workflow: review the highest-priority findings, inspect their evidence, and see what changes when the evidence is refreshed.',
  packages: [
    ['Amr', ['D03', 'D11', 'D14'], 'Versioned CVE updates, dated threat signals and traceable vendor fixes.'],
    ['Shams', ['C18', 'C19', 'C22'], 'Replayable asset changes, explicit evidence gaps and independently reviewed quality cases.'],
    ['Mahrous', ['D12', 'D13', 'D15'], 'Explainable ranking, targeted reassessment and closure of the remaining applicability benchmark gaps.'],
    ['Hams', ['A09', 'UX03'], 'A measured local model recommendation and observed analyst usability results.'],
    ['Omar', ['P07', 'P09', 'P10'], 'A recoverable job queue plus source freshness and analyst triage views.']
  ]
};

const sprintOneTaskIds = new Set(sprintOne.packages.flatMap(([, ids]) => ids));
const workPhaseOptions = [['', 'All tasks'], ['week', 'Prototype week · Sprint 00'], [sprintOne.id, sprintOne.title]];
const prototypeCheckpointLabels = {first: '1 November delivery', second: '5 November delivery'};

function sprintView() {
  const laneCards = sprintOne.packages.map(([owner, ids, outcome]) =>
    '<article class="card"><h3>' + esc(owner) + '</h3><p>' + esc(outcome) + '</p>' + chips(ids) +
    '<p><a href="' + sprintWorkRoute(owner) + '">Open ' + esc(owner) + '’s Sprint 01 in Execution →</a></p></article>'
  ).join('');
  return heading('ERA / POST-PROTOTYPE', sprintOne.title, sprintOne.goal) +
    '<p><a class="button teal" href="' + sprintWorkRoute() + '">Open Sprint 01 in Execution →</a> ' +
    '<a class="button soft" href="#delivery/week">Prototype week · Sprint 00 →</a></p>' +
    '<div class="section-head"><h2>Selected work packages</h2></div><div class="grid two">' + laneCards + '</div>' +
    '<div class="section-head"><h2>Checkpoints</h2></div>' +
    table(['Checkpoint', 'Review'], [
      ['Kickoff', 'Verify the accepted Ubuntu assessment and triage prerequisites, including P06 for P10 and the A07 retrieval baseline for A09. Record gaps and agree on capacity and delivery dates.'],
      ['Component handoffs', 'Review sample asset changes, advisory revisions and threat signals. Confirm the replay and freshness contracts before integrating the queue.'],
      ['Integrated demo', 'Open the ranked Ubuntu queue and inspect a priority reason, supporting evidence and an Unknown case. Replay an evidence change and show which findings and freshness indicators changed.']
    ]) +
    '<article class="card"><h2>Sprint acceptance</h2>' + list([
      'A teammate can replay the Ubuntu triage flow with pinned inputs and trace a priority reason and vendor fix to evidence.',
      'A replay exposes a stale or missing input and records the relevant reassessment outcome.',
      'The evidence-quality and matching reviews disclose failed or unverified cases. Analyst usability and local model results are recorded separately.',
      'Carry-forward prototype work is checked against its published acceptance. Only remaining gaps need work.'
    ]) + '</article>';
}

const sprintOneProfiles = {
  "Amr": {
    "heading": "Give triage current vulnerability data and traceable fixes.",
    "role": "Own CVE revision ingestion, dated threat signals and versioned vendor fix records.",
    "team": "Omar uses source checkpoints and freshness data in P09. Mahrous uses D11 for D12 and advisory revisions for D13.",
    "handoff": "Provide a reproducible ingest checkpoint, a timestamped KEV/EPSS snapshot with explicit missing values, and a fix catalog with source citations.",
    "start": [
      [
        "D03",
        "prove a repeatable update"
      ],
      [
        "D11",
        "capture threat signals with dates"
      ]
    ],
    "route": "Run D03 and D11 against reviewed inputs. Build D14 from the qualified Ubuntu advisories and applicability rules, then review the fix links with Omar.",
    "boundary": "Use the existing Ubuntu scope. Describe available fixes and their prerequisites in this sprint.",
    "waiting": "Prepare a replay with a duplicate revision and a CVE with no score.",
    "skills": "Incremental ingestion, missing-value semantics and vendor revision tracing.",
    "acceptance": "Replaying the same update preserves a stable revision history and the UI can trace a fix to the advisory."
  },
  "Shams": {
    "heading": "Make changes and gaps in asset evidence visible.",
    "role": "Own immutable inventory differences, evidence-quality states and independent asset test cases.",
    "team": "Use the C03/C05 inventory contract. Give Mahrous change and quality inputs for reassessment and Omar examples for triage states.",
    "handoff": "Provide replayable before/after snapshots, field-level evidence flags and reviewed comparison cases.",
    "start": [
      [
        "C18",
        "replay two inventory snapshots"
      ],
      [
        "C19",
        "define field-level evidence states"
      ]
    ],
    "route": "Build C18 and C19 against the same pinned inventory, then use C22 to test that stale, missing and contradictory facts are represented correctly.",
    "boundary": "Keep the first evaluation on the approved Ubuntu profile. Distinguish observation timestamps from source update timestamps.",
    "waiting": "Draft expected results for a stale observation, a partial collection and conflicting records.",
    "skills": "Snapshot provenance, field-level freshness and independent evaluation.",
    "acceptance": "A teammate can replay a snapshot pair and explain the resulting evidence changes and gaps."
  },
  "Mahrous": {
    "heading": "Make Ubuntu triage priorities and reassessment explainable.",
    "role": "Own the ranking policy, evidence-driven reassessment and the remaining applicability benchmark gaps.",
    "team": "Use Amr’s dated threat signals and advisory revisions and Shams’s inventory changes. Agree reason codes and reassessment events with Omar.",
    "handoff": "Provide ordered findings with policy reasons, a before/after reassessment trace and a CSV of reviewed expected vs observed verdicts.",
    "start": [
      [
        "D12",
        "define the priority policy"
      ],
      [
        "D15",
        "close gaps in reviewed applicability cases"
      ]
    ],
    "route": "Use reviewed D09 and D11 inputs to exercise D12. When the P07 job contract and D03 revision feed are ready, use D13 to replay one change and explain which findings moved.",
    "boundary": "Rank eligible findings in the Ubuntu MVP. Surface Unknown with its evidence gap. Approval policy and patch execution are later work.",
    "waiting": "Prepare labelled tie, missing-signal and stale-evidence examples with the expected results.",
    "skills": "Reason-coded ranking, evidence invalidation and benchmark error analysis.",
    "acceptance": "Two runs on the same evidence and policy agree. One controlled update shows why a finding is or is not reassessed."
  },
  "Hams": {
    "heading": "Measure whether analysts and local models can use the evidence.",
    "role": "Own candidate local-model measurements and the triage usability review.",
    "team": "Use the A07 retrieval baseline and Mahrous’s priority rationale. Ask Omar for the triage flow and agree which usability findings need a correction.",
    "handoff": "Provide comparable model results, a recommendation with measured limitations and UX observations tied to specific user decisions.",
    "start": [
      [
        "A09",
        "measure local candidates on project questions"
      ],
      [
        "UX03",
        "test the evidence and triage flow"
      ]
    ],
    "route": "Freeze the evaluation questions and hardware before A09 runs. Use UX03 to check priority explanations and evidence navigation with the existing UX02 design and P05 shell.",
    "boundary": "Use the sprint to qualify the model and triage flow. Production assistant integration has separate acceptance.",
    "waiting": "Prepare a small task script for finding a source and identifying missing evidence.",
    "skills": "Local-model measurement, citation checks and task-based usability testing.",
    "acceptance": "Publish candidate measurements and an observed walkthrough with concrete UI corrections."
  },
  "Omar": {
    "heading": "Connect recoverable jobs to a usable analyst triage workflow.",
    "role": "Own the durable job ledger, source-health UI and prioritized findings view.",
    "team": "Confirm job and revision contracts with Amr and Mahrous. Connect Shams’s evidence states and apply Hams’s UX findings.",
    "handoff": "Deliver an inspectable job replay, a source-health view and a prioritized findings view linked to the latest evidence and reasons.",
    "start": [
      [
        "P07",
        "prove job recovery and replay"
      ],
      [
        "P09",
        "expose source freshness and changed knowledge"
      ]
    ],
    "route": "Establish the P07 ledger, connect D03 revision and freshness data in P09, then use verified P06 and D12 outputs to integrate P10.",
    "boundary": "Use the approved Ubuntu assessment in the demo. Show old or missing inputs explicitly in the UI.",
    "waiting": "Prepare labelled response fixtures for a fresh source, stale metadata and a retrying job.",
    "skills": "Durable jobs, revision-aware APIs and analyst-facing status design.",
    "acceptance": "A teammate can reopen the priority queue after a retry and trace the displayed reason and evidence revision."
  }
};
const sprintOneResearch = {
  "Amr": [
    [
      "OQ11",
      "Freshness promise",
      "Which timestamps support a freshness claim when updates arrive late?",
      "Compare publication, observation and ingestion times during normal sync and a replay.",
      "Evidence table and a proposed stale-state threshold for Omar to review in P09.",
      "D03/D11 handoff"
    ],
    [
      null,
      "Source review",
      "When is a vendor fix usable for this Ubuntu release?",
      "Compare two revision records with different fixed-version or release details.",
      "A cited release-specific fix rule and one unresolved example for D14.",
      "D14 review",
      "D14"
    ]
  ],
  "Shams": [
    [
      null,
      "Evidence quality",
      "What separates stale, missing and conflicting asset evidence?",
      "Compare an old snapshot, a partial collection and contradictory observations.",
      "A case table with expected field flags and the decision effect for C19/C22.",
      "Before the C22 evaluation",
      "C19"
    ],
    [
      null,
      "Replay",
      "Which changes need to reach reassessment?",
      "Compare a package version change with collection metadata changing on its own.",
      "A before/after pair showing which fields consumers should review.",
      "C18 handoff",
      "C18"
    ]
  ],
  "Mahrous": [
    [
      "OQ12",
      "Needs Decision",
      "How should asset criticality, policy and missing signals affect ranking?",
      "Compare findings with the same CVSS and different asset importance. Add a missing-EPSS case and a tie.",
      "A priority rule and tie-break with an expected order and reasons for D12.",
      "Before P10 integration"
    ],
    [
      null,
      "Evidence review",
      "Which evidence changes should trigger reassessment?",
      "Compare a package revision update, an advisory update and a metadata-only change.",
      "A labelled replay matrix with expected impacted findings for D13 and benchmark gaps for D15.",
      "Before the integrated demo",
      "D13"
    ]
  ],
  "Hams": [
    [
      "OQ02",
      "Usability review",
      "Can an analyst understand a priority and open the original evidence without help?",
      "Observe a triage walkthrough on an affected finding and an Unknown case.",
      "Observed errors, where the analyst hesitated and concrete UX03 corrections for Omar.",
      "At the P10 walkthrough"
    ],
    [
      null,
      "Model evaluation",
      "Which local candidate meets the supported-answer and latency needs?",
      "Compare candidates using the same reviewed questions and device configuration.",
      "A09 results with latency, citation support and failure examples.",
      "Before recommending a local model",
      "A09"
    ]
  ],
  "Omar": [
    [
      "OQ07",
      "Needs Decision",
      "How should the UI describe stale data and retrying jobs?",
      "Compare the same finding before an update, while a source is stale and after a retry.",
      "Agreed labels and user actions for P09/P10, checked with Hams.",
      "Before triage integration"
    ],
    [
      null,
      "Recovery review",
      "What should the analyst see after job recovery?",
      "Replay an interrupted job and check the visible state and revision links.",
      "An observed transition log and evidence that replay does not double-apply the published result.",
      "P07 handoff",
      "P07"
    ]
  ]
};

function sprintQuestions(owner) {
  return sprintOneResearch[owner].map(([id,kind,title,context,closeWith,timing,task]) => ({
    id,kind,title,context,closeWith,timing,
    href:task?'#work/'+task:undefined,
    linkLabel:task?'Open '+task+' · task research':undefined
  }));
}

function sprintResponsibilityOverview(owner) {
  const profile=sprintOneProfiles[owner];
  const rows=responsibilityRows(owner);
  rows.owned=rows.owned.filter(task=>sprintOneTaskIds.has(task.id));
  rows.supporting=rows.supporting.filter(task=>sprintOneTaskIds.has(task.id));
  rows.questions=sprintQuestions(owner);
  return responsibilityOverview(owner,rows,{
    profile,
    intro:'Your role in Analyst Triage MVP. Open a task for its delivery, design questions and technical reference.',
    prerequisites:'Verify existing prototype outputs before relying on them. Use labelled examples for preparation while awaiting reviewed inputs.',
    map:rows.owned.map(task=>task.id+' · '+task.title).join(' / '),
    skills:profile.skills,
    acceptance:profile.acceptance,
    researchIntro:owner+' records the evidence and decisions for these sprint questions. Use the result to agree what changes in the implementation.'
  });
}

function sprintWorkRoute(owner,role='both') {
  return '#work/'+[sprintOne.id,owner,owner&&role!=='both'?role:''].filter(Boolean).join('-');
}

function parseSprintWorkRoute(sub) {
  if(sub===sprintOne.id)return {owner:'',role:'both'};
  if(!sub.startsWith(sprintOne.id+'-'))return null;
  const [owner, role='both', extra]=sub.slice(sprintOne.id.length+1).split('-');
  return !extra&&sprintOneProfiles[owner]&&['owned','support','both'].includes(role)?{owner,role}:null;
}
