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
      "handoff": "Mahrous and Omar"
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
      "handoff": "Mahrous and Omar"
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
      "handoff": "Omar"
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
      "handoff": "Mahrous and Hams"
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
      "handoff": "Mahrous"
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
      "handoff": "Mahrous and Hams"
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
      "handoff": "Omar and Hams"
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
      "handoff": "Omar and Hams"
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
      "handoff": "Omar and Hams"
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
      "handoff": "Omar"
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
      "handoff": "Omar"
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
      "handoff": "Omar"
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
      "handoff": "Mahrous and Hams"
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
      "handoff": "Whole team"
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
      "handoff": "Whole team"
    }
  ]
};

const workPhaseOptions = [['', 'All tasks'], ['week', 'Prototype week'], [sprintOne.id, sprintOne.title]];
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
    return '<div class="section-head"><h2>Day ' + day + ' · ' + title + '</h2></div>' +
      '<div class="grid two">' + due.map(sprintTaskCard).join('') + '</div>';
  }).join('');
}

function sprintTaskCard(item) {
  return '<article class="card" id="task-' + esc(item.id) + '"><span class="label">' +
    esc(item.id + ' · ' + item.owner) + '</span><h3>' + esc(item.title) + '</h3><p>' +
    esc(item.output) + '</p><p><strong>Done when</strong> · ' + esc(item.acceptance) +
    '</p><p><strong>Handoff</strong> · ' + esc(item.handoff) +
    '</p><p class="tagline">Related work packages</p>' + chips(item.packages) + '</article>';
}

function sprintWorkResults() {
  const query = filter.q.trim().toLowerCase();
  const found = sprintOne.work.filter(item => (!filter.owner || item.owner === filter.owner) &&
    (!query || [item.id, item.title, item.output, ...item.packages].join(' ').toLowerCase().includes(query)));
  $('#work-count').textContent = found.length + ' of ' + sprintOne.work.length + ' sprint tasks';
  $('#work-responsibilities').innerHTML = '';
  $('#work-results').innerHTML = found.length
    ? sprintTaskGroups(found)
    : '<div class="empty">No sprint tasks match. Choose another person or try a shorter search.</div>';
}

function sprintWorkRoute(owner) {
  return '#work/' + sprintOne.id + (owner ? '-' + owner : '');
}
