'use strict';

const sprintOne = {
  id: 'sprint-01',
  phase: 'MVP Integration & Validation',
  title: 'Sprint 01 · Evidence to Priority',
  goal: 'Use one authorized Ubuntu lab profile to show what is affected, which findings deserve attention first, and which evidence supports the result.',
  work: [
    {
      "id": "S01-01",
      "owner": "Shams",
      "day": 3,
      "title": "Export a replayable Ubuntu inventory",
      "packages": [
        "C03",
        "C05"
      ],
      "output": "Export the Ubuntu lab inventory as JSON and add a manifest with asset ID, capture time and snapshot hash.",
      "acceptance": "A teammate can load the snapshot using the runbook and recover the same asset ID and package count.",
      "handoff": "Mahrous and Omar",
      "needs": [],
      "types": [
        "Build"
      ],
      "support": [
        "Mahrous",
        "Omar"
      ],
      "question": "Which asset ID and timestamps stay stable across a fresh collection?",
      "investigate": "Compare the lab snapshot with the C03 observation contract and record which identity fields are required."
    },
    {
      "id": "S01-09",
      "owner": "Shams",
      "day": 3,
      "title": "Build the inventory failure fixtures",
      "packages": [
        "C03",
        "C05"
      ],
      "output": "Produce two labeled copies of the inventory: one missing a package version and one with a stale capture timestamp.",
      "acceptance": "Each fixture includes its expected validation outcome and can be fed into the Python/API replay alongside the full snapshot.",
      "handoff": "Mahrous and Omar",
      "needs": [
        "S01-01"
      ],
      "types": [
        "Build",
        "Testing"
      ],
      "support": [
        "Mahrous",
        "Omar"
      ],
      "question": "How should the pipeline distinguish a missing package version from stale data?",
      "investigate": "Write down the expected validation or evidence gap for each fixture before running it."
    },
    {
      "id": "S01-10",
      "owner": "Shams",
      "day": 5,
      "title": "Verify the demo’s asset evidence against the lab snapshot",
      "packages": [
        "C03",
        "C08"
      ],
      "output": "Compare the asset ID, package version and capture time shown in the demo with the frozen inventory. Record the mismatches with affected finding IDs.",
      "acceptance": "The review records which fields matched and captures a reproducible example for any mismatch.",
      "handoff": "Omar",
      "needs": [
        "S01-07",
        "S01-01"
      ],
      "types": [
        "Testing"
      ],
      "support": [
        "Omar"
      ],
      "question": "Can you trace every displayed asset field back to the pinned snapshot?",
      "investigate": "Compare asset ID, package version and capture time in the UI and the original evidence."
    },
    {
      "id": "S01-02",
      "owner": "Amr",
      "day": 3,
      "title": "Ship the pinned Ubuntu advisory bundle",
      "packages": [
        "D05"
      ],
      "output": "Export a JSON bundle of the Ubuntu records used in the demo with affected and fixed versions, vendor URLs, revision IDs and a manifest hash.",
      "acceptance": "Every selected advisory has a vendor reference. The exact snapshot can be loaded again from the manifest.",
      "handoff": "Mahrous and Hams",
      "needs": [],
      "types": [
        "Research",
        "Build"
      ],
      "support": [
        "Mahrous",
        "Hams"
      ],
      "question": "Which Ubuntu record controls the affected or fixed status for the selected release?",
      "investigate": "Compare vendor revisions for one package and document which record goes into the demo."
    },
    {
      "id": "S01-11",
      "owner": "Amr",
      "day": 3,
      "title": "Ship dated threat-signal fixtures",
      "packages": [
        "D11"
      ],
      "output": "Join available KEV and EPSS records to the selected CVEs. Include a dated EPSS value, a known KEV state and an example with an unavailable signal.",
      "acceptance": "The fixtures distinguish an unavailable signal from a zero score and carry their source dates.",
      "handoff": "Mahrous",
      "needs": [
        "S01-02"
      ],
      "types": [
        "Build"
      ],
      "support": [
        "Mahrous"
      ],
      "question": "How do you represent an unavailable EPSS value or an unknown KEV state?",
      "investigate": "Confirm the source date and missing-value meaning before producing the fixtures."
    },
    {
      "id": "S01-12",
      "owner": "Amr",
      "day": 5,
      "title": "Validate the Ubuntu fixed-version evidence",
      "packages": [
        "D05",
        "D14"
      ],
      "output": "Produce a CVE/package review table with affected and fixed example versions, the relevant Ubuntu release and a vendor link for each demo case.",
      "acceptance": "The release, package and fixed version are verified against the pinned vendor record. Unresolved assertions are listed with the evidence needed.",
      "handoff": "Mahrous and Hams",
      "needs": [
        "S01-02"
      ],
      "types": [
        "Research",
        "Testing"
      ],
      "support": [
        "Mahrous",
        "Hams"
      ],
      "question": "What proves a fixed version applies to this Ubuntu release and package?",
      "investigate": "Review the package identity, release and affected/fixed versions against the original advisory."
    },
    {
      "id": "S01-03",
      "owner": "Mahrous",
      "day": 3,
      "title": "Measure verdicts on the frozen Ubuntu fixtures",
      "packages": [
        "D09",
        "C08",
        "D15"
      ],
      "output": "Run the existing matcher on reviewed Affected, Not Affected and Unknown cases. Export a CSV with case ID, expected verdict, observed verdict, evidence and mismatch reason.",
      "acceptance": "The report includes case counts and mismatch reasons. The Unknown case identifies the missing evidence.",
      "handoff": "Omar and Hams",
      "needs": [
        "S01-01",
        "S01-09",
        "S01-02"
      ],
      "types": [
        "Research",
        "Testing"
      ],
      "support": [
        "Shams",
        "Amr",
        "Omar",
        "Hams"
      ],
      "question": "How will the expected verdicts be reviewed independently of the matcher output?",
      "investigate": "Freeze the expected verdict and evidence for each case. Separate incorrect verdicts from evidence gaps when writing the report."
    },
    {
      "id": "S01-04",
      "owner": "Mahrous",
      "day": 3,
      "title": "Implement the explainable Top 10 baseline",
      "packages": [
        "D12",
        "D11"
      ],
      "output": "Build the policy-based ranking for up to ten eligible affected findings and emit an ordered JSON queue with reason codes and evidence references.",
      "acceptance": "The same input produces the same queue. A tie resolves consistently, missing threat evidence stays explicit and Unknown findings remain visible outside the queue.",
      "handoff": "Omar and Hams",
      "needs": [
        "S01-11"
      ],
      "types": [
        "Research",
        "Build"
      ],
      "support": [
        "Amr",
        "Omar",
        "Hams"
      ],
      "question": "Which factors change priority, and what happens when a signal is missing or tied?",
      "investigate": "Review the policy and compare a tied case and a missing-signal case. Record the chosen ordering and reasons."
    },
    {
      "id": "S01-05",
      "owner": "Mahrous",
      "day": 5,
      "title": "Validate the queue and API against the same fixtures",
      "packages": [
        "D12",
        "P02",
        "P10"
      ],
      "output": "Package a versioned queue fixture and run it through Omar’s integration. Compare IDs, order and reason codes between the ranking output and API response.",
      "acceptance": "The test covers a tie and a missing threat signal. The ranking and API agree on order, reasons and evidence IDs, or the mismatch is recorded with an owner.",
      "handoff": "Omar and Hams",
      "needs": [
        "S01-04",
        "S01-15"
      ],
      "types": [
        "Integration",
        "Testing"
      ],
      "support": [
        "Omar",
        "Hams"
      ],
      "question": "Which fields are contractual between the ranking output and the API?",
      "investigate": "Agree on exact comparisons for finding ID, order, reason codes and evidence references."
    },
    {
      "id": "S01-13",
      "owner": "Hams",
      "day": 3,
      "title": "Build the local source index for the sprint dataset",
      "packages": [
        "A06",
        "A07"
      ],
      "output": "Index the pinned Ubuntu advisory bundle and produce a manifest mapping chunk IDs to source revisions and URLs.",
      "acceptance": "Given a demo CVE and package, retrieval returns the matching advisory and exact source revision on replay.",
      "handoff": "Omar",
      "needs": [
        "S01-02"
      ],
      "types": [
        "Research",
        "Build"
      ],
      "support": [
        "Amr",
        "Omar"
      ],
      "question": "How can a retrieved chunk be traced to the exact vendor revision?",
      "investigate": "Try a lookup by CVE and package, then verify the returned advisory against the pinned manifest."
    },
    {
      "id": "S01-06",
      "owner": "Hams",
      "day": 3,
      "title": "Create and run a cited-answer evaluation set",
      "packages": [
        "A07",
        "A13"
      ],
      "output": "Write a small JSONL set covering a supported priority explanation, a missing-evidence explanation and a question the sources cannot answer. Record the observed answers and citations.",
      "acceptance": "Each case has expected evidence or an abstention expectation. The run records citation and abstention results per case.",
      "handoff": "Omar",
      "needs": [
        "S01-13"
      ],
      "types": [
        "Research",
        "Testing"
      ],
      "support": [
        "Omar"
      ],
      "question": "What makes a citation sufficient to support an answer about priority or missing evidence?",
      "investigate": "Write expected evidence and abstention checks before evaluating the assistant."
    },
    {
      "id": "S01-14",
      "owner": "Hams",
      "day": 5,
      "title": "Verify the assistant inside the analyst workflow",
      "packages": [
        "A10",
        "A13"
      ],
      "output": "Run the same answer checks against Omar’s read-only assistant and report the finding ID, cited revision and any differences from the local run.",
      "acceptance": "The UI answer references the same finding and source revision. The unsupported question produces an explicit abstention.",
      "handoff": "Omar",
      "needs": [
        "S01-06",
        "S01-07"
      ],
      "types": [
        "Integration",
        "Testing"
      ],
      "support": [
        "Omar"
      ],
      "question": "Does the application preserve the same finding context as the local evaluation?",
      "investigate": "Compare the finding ID, source revision and unsupported-answer behavior in both runs."
    },
    {
      "id": "S01-15",
      "owner": "Omar",
      "day": 3,
      "title": "Implement the sprint queue and detail API contracts",
      "packages": [
        "P02",
        "P10"
      ],
      "output": "Add the queue response and finding detail response to the prototype API with IDs, verdicts, rank reasons and evidence references. Add a contract check with the frozen fixtures.",
      "acceptance": "The queue and detail payloads expose consistent finding IDs. The Unknown fixture returns an explicit evidence gap.",
      "handoff": "Mahrous and Hams",
      "needs": [],
      "types": [
        "Build",
        "Integration"
      ],
      "support": [
        "Mahrous",
        "Hams"
      ],
      "question": "Which fields must the queue and finding detail share?",
      "investigate": "Agree on the response contract at kickoff and test it with pinned fixture examples as they arrive."
    },
    {
      "id": "S01-07",
      "owner": "Omar",
      "day": 5,
      "title": "Wire the analyst view to the queue and cited assistant",
      "packages": [
        "P10",
        "A10"
      ],
      "output": "Connect the existing UI to the sprint API. Make a ranked finding open its details and let the user ask a read-only question in that finding’s context.",
      "acceptance": "A teammate can open an affected finding, see why it ranks, inspect the cited source, and open an Unknown finding to see the evidence gap.",
      "handoff": "Whole team",
      "needs": [
        "S01-15",
        "S01-04",
        "S01-13"
      ],
      "types": [
        "Build",
        "Integration"
      ],
      "support": [
        "Mahrous",
        "Hams"
      ],
      "question": "How will the UI display the evidence gap and keep the assistant tied to the selected finding?",
      "investigate": "Walk through an affected finding and an Unknown case using the agreed API fields before integrating."
    },
    {
      "id": "S01-08",
      "owner": "Omar",
      "day": 5,
      "title": "Ship a clean replay of the integrated demo",
      "packages": [
        "P10",
        "A10"
      ],
      "output": "Provide a replay command and a short runbook with input revisions and expected outputs. Have a teammate run it from a fresh application session.",
      "acceptance": "The teammate produces the ranked queue, evidence trail and cited answer from the written steps and records any blocker.",
      "handoff": "Whole team",
      "needs": [
        "S01-07"
      ],
      "types": [
        "Integration",
        "Testing"
      ],
      "support": [
        "Shams",
        "Amr",
        "Mahrous",
        "Hams"
      ],
      "question": "Can another teammate reproduce the demo using only the written steps and pinned inputs?",
      "investigate": "Have them record the input revisions and resulting queue, evidence trail and cited answer."
    }
  ]
};

const workPhaseOptions = [['', 'All tasks'], ['week', 'Prototype week · Sprint 00'], [sprintOne.id, sprintOne.title]];
const prototypeCheckpointLabels = {first: '1 November delivery', second: '5 November delivery'};

function sprintView() {
  return heading('ERA / POST-PROTOTYPE', sprintOne.phase, sprintOne.title) +
    '<article class="card week-goal"><h2>Sprint goal</h2><p>' + esc(sprintOne.goal) + '</p>' +
    '<p class="tagline">Suggested duration · Five working days from kickoff</p>' +
    '<div class="actions"><a class="button teal" href="#work/sprint-01">Open Sprint 01 tasks →</a>' +
    '<a class="button soft" href="#delivery/week">Prototype week →</a></div></article>' +
    '<div class="section-head"><h2>Sprint tasks</h2></div><div class="actions">' +
    [...new Set(sprintOne.work.map(item => item.owner))].map(owner =>
      '<a class="button soft" href="' + sprintWorkRoute(owner) + '">' + esc(owner) + '’s sprint tasks</a>'
    ).join('') + '</div>' + sprintTaskGroups(sprintOne.work) +
    '<div class="section-head"><h2>Checkpoints</h2></div>' +
    table(['When', 'Review'], [
      ['Day 1', 'Pin the inventory and advisory revisions, agree on the shared fields and review expected verdicts.'],
      ['Day 3', 'Demo working components and hand off frozen fixtures, API responses and evaluation results.'],
      ['Day 4', 'Connect the workflow and replay the fixtures through the analyst view.'],
      ['Day 5', 'Deliver the integrated run and ask another teammate to replay it from the written steps.']
    ]) +
    '<article class="card"><h2>Definition of done</h2>' + list([
      'The same snapshot and source revisions produce the same ordered results on replay.',
      'The demo covers Affected, Not Affected and Unknown. Evaluation records expected and observed verdicts plus case counts.',
      'Each ranked finding shows priority reasons and evidence. Unknown findings identify the evidence needed for a verdict.',
      'The assistant cites evidence for a supported answer and abstains when the sources cannot support an answer.'
    ]) + '</article><article class="card"><h2>After Sprint 01</h2>' +
    '<p>Use the measured rule-based ranking to evaluate AI and hybrid ranking. Schedule the FortiOS profile after evidence qualification and the Ubuntu patch pilot after approval and verification are ready.</p>' +
    chips(['A17', 'D17', 'C10', 'C11', 'C13']) + '</article>';
}

function sprintTaskGroups(items) {
  return [[3, 'Working components'], [5, 'Integrated demo']].map(([day, title]) => {
    const due = items.filter(item => item.day === day);
    if (!due.length) return '';
    return '<div class="phase-heading">Day ' + day + ' · ' + title + '</div>' +
      due.map(sprintTaskCard).join('');
  }).join('');
}

function sprintTaskAnchor(id) {
  return '#work/' + id;
}

function sprintTaskCard(item) {
  const target = (section, label) => {
    const id = 'task-' + section + '-' + item.id;
    return '<a href="#' + id + '" data-task-section="' + id + '">' + label + '</a>';
  };
  const section = (id, title, subtitle, content) =>
    '<div id="task-' + id + '-' + item.id + '" class="task-section-anchor">' +
    executionSection(title, subtitle, content) + '</div>';
  const upstream = item.needs.map(id => {
    const task = sprintOne.work.find(entry => entry.id === id);
    return '<a href="' + sprintTaskAnchor(id) + '" data-task-section="task-' + id + '">' +
      esc(id + ' · ' + task.owner) + '</a>';
  });
  const references = [...new Set(item.packages.flatMap(id => tasks[id].sources))];

  return '<details class="task" id="task-' + item.id + '"><summary>' +
    '<span class="task-id">' + item.id + '</span><div class="task-title">' + esc(item.title) +
    '<small>' + esc(item.owner + ' · ' + item.types.join(' / ')) + '</small>' +
    '<span class="schedule-tags"><span class="schedule-tag ' + (item.day===3?'first':'second') + '">Day ' + item.day +
    '</span></span><span class="task-outside-brief"><span><b>To deliver:</b> ' + esc(item.output) +
    '</span><span><b>Needs first:</b> ' + (item.needs.join(' / ') || 'Sprint kickoff inputs') +
    '</span></span></div><div class="summary-status"><span class="label">Sprint 01' +
    '</span></div></summary><div class="task-body">' +
    '<nav class="task-section-nav" aria-label="' + item.id + ' sections">' +
    target('inputs', 'Inputs & examples') + target('research', 'Research & clarification') +
    target('build', 'Build') + target('test', 'Test & acceptance') +
    target('output', 'Output & handoff') + '</nav>' +
    section('inputs', 'Inputs & examples', 'What do I need to start?',
      '<p>' + (upstream.length ? upstream.join(' · ') : 'Start with the inputs agreed at sprint kickoff.') +
      '</p><p>Related project packages and input examples</p>' + chips(item.packages)) +
    section('research', 'Research & clarification', 'What should we investigate or decide?',
      '<p><b>' + esc(item.question) + '</b></p><p>' + esc(item.investigate) + '</p>' +
      '<p>Source starting points</p>' + refs(references)) +
    section('build', 'Build', 'What work belongs in this sprint?', '<p>' + esc(item.output) + '</p>') +
    section('test', 'Test & acceptance', 'How do we know it works?', '<p>' + esc(item.acceptance) + '</p>') +
    section('output', 'Output & handoff', 'Who receives and reviews the result?',
      '<p><b>Handoff:</b> ' + esc(item.handoff) + '</p><p><b>Supporting reviewers:</b> ' +
      esc(item.support.join(', ')) + '</p>') + '</div></details>';
}

function sprintResponsibilities(owner, owned, supporting) {
  const links = rows => rows.map(item =>
    '<a href="' + sprintTaskAnchor(item.id) + '" data-task-section="task-' + item.id + '">' +
    esc(item.id + ' · ' + item.title) + '</a>').join(' · ');
  return '<section class="responsibility-overview clarity-person" aria-label="' + esc(owner) +
    ' sprint responsibilities"><span class="kicker">SPRINT 01 · ' + esc(owner) +
    '</span><h3>Your responsibilities this sprint</h3><p><b>Owned work:</b> ' + owned.length +
    ' deliveries across Day 3 and Day 5.</p><p><b>Supporting work:</b> Review inputs and handoffs for ' +
    supporting.length + ' teammate deliveries.</p>' +
    '<details class="simple-details"><summary>Research & clarification</summary>' +
    owned.map(item => '<p><b>' + esc(item.question) + '</b> ' + esc(item.investigate) + '</p>').join('') +
    '</details><p class="tagline">Use Responsibility to switch between your deliveries and the work you review.</p>' +
    (filter.role !== 'support' ? '<p class="tagline">Your deliveries: ' + links(owned.filter(matchesSprintTask)) + '</p>' : '') +
    '</section>';
}

function matchesSprintTask(item) {
  const {q, stream, gate, type, layer, readiness} = filter;
  const query = q.trim().toLowerCase();
  const related = item.packages.map(id => tasks[id]);
  return (!query || [item.id, item.title, item.output, item.question, ...item.packages].join(' ').toLowerCase().includes(query)) &&
    (!stream || related.some(t => t.stream === stream || (stream === 'cyber' && t.stream === 'data'))) &&
    (!gate || related.some(t => t.gate === gate)) &&
    (!layer || related.some(t => t.releaseLayer === layer)) &&
    (!type || type === 'All' || item.types.includes(type)) &&
    (!readiness || {
      foundation: item.needs.length === 0,
      dependent: item.needs.length > 0,
      critical: related.some(t => t.criticalPath),
      noncritical: related.every(t => !t.criticalPath)
    }[readiness]);
}

function sprintWorkResults() {
  const owner = filter.owner;
  const owned = owner ? sprintOne.work.filter(item => item.owner === owner) : sprintOne.work;
  const supporting = owner ? sprintOne.work.filter(item => item.support.includes(owner)) : [];
  const primary = filter.role === 'support' && owner ? [] : owned.filter(matchesSprintTask);
  const reviews = filter.role === 'owned' ? [] : supporting.filter(matchesSprintTask);
  const count = primary.length + reviews.length;
  const results = $('#work-results');
  $('#work-count').textContent = count + ' of ' + sprintOne.work.length + ' sprint tasks';
  $('#work-responsibilities').innerHTML = owner ? sprintResponsibilities(owner, owned, supporting) : '';

  const group = (label, rows, supporting = false) => rows.length ?
    '<section class="responsibility-group' + (supporting ? ' supporting' : '') +
    '"><h2>' + esc(label) + '</h2>' + sprintTaskGroups(rows) + '</section>' : '';
  results.innerHTML = count ?
    group(owner ? owner + ' / Owned Work' : 'Sprint 01 / Team Work', primary) +
    group(owner + ' / Supporting Work', reviews, true) :
    '<div class="empty">No sprint tasks match. Try changing a filter.</div>';
  bindTaskDetails(results);
  bindTaskDetails($('#work-responsibilities'));
}

function sprintWorkRoute(owner) {
  return '#work/' + sprintOne.id + (owner ? '-' + owner : '');
}
