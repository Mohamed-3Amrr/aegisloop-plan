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
      "title": "Freeze the Ubuntu evidence bundle",
      "packages": [
        "C03",
        "C05"
      ],
      "output": "Export the authorized lab snapshot with asset ID, package versions and collection time. Add one fixture with a required field missing.",
      "acceptance": "The team can replay both fixtures by name. The source snapshot and the intentionally incomplete fixture are clearly labeled.",
      "handoff": "Mahrous and Omar"
    },
    {
      "id": "S01-02",
      "owner": "Amr",
      "title": "Pin the advisory and threat-signal bundle",
      "packages": [
        "D05",
        "D11"
      ],
      "output": "Package the reviewed Ubuntu affected and fixed records with source revisions. Add available dated KEV and EPSS inputs.",
      "acceptance": "Each record traces back to a source revision. Missing inputs stay explicit and the same bundle is used on replay.",
      "handoff": "Mahrous, Hams and Omar"
    },
    {
      "id": "S01-03",
      "owner": "Mahrous",
      "title": "Publish the Ubuntu verdict replay report",
      "packages": [
        "D09",
        "C08",
        "D15"
      ],
      "output": "Reuse the existing matcher on the pinned sprint fixtures. Compare its results with independently reviewed expected verdicts.",
      "acceptance": "The report gives expected and observed verdicts, case counts and mismatches. It covers Affected, Not Affected and Unknown, including a case that names the missing evidence.",
      "handoff": "Omar and Hams"
    },
    {
      "id": "S01-04",
      "owner": "Mahrous",
      "title": "Build the explainable Top 10 baseline",
      "packages": [
        "D12",
        "D11"
      ],
      "output": "Rank up to ten eligible affected findings using severity, available threat signals, asset importance and policy. Record the reasons and resolve ties consistently.",
      "acceptance": "The same inputs reproduce the same queue. Each item includes reasons and evidence references. Unknown cases stay visible with evidence gaps outside the ranked queue.",
      "handoff": "Omar and Hams"
    },
    {
      "id": "S01-05",
      "owner": "Mahrous",
      "title": "Hand off ranking fixtures for integration",
      "packages": [
        "D12",
        "P02",
        "P10"
      ],
      "output": "Package one versioned input/output pair for the queue and finding details, including a tied score and an unavailable threat signal.",
      "acceptance": "Omar can replay the fixtures without rebuilding the matcher. Hams can use the same finding IDs and references in answer checks.",
      "handoff": "Omar and Hams"
    },
    {
      "id": "S01-06",
      "owner": "Hams",
      "title": "Test cited answers against sprint findings",
      "packages": [
        "A06",
        "A07",
        "A13"
      ],
      "output": "Pin the local index and write checks for why a finding is ranked and what evidence is missing.",
      "acceptance": "Supported answers cite the source revision. At least one unsupported question produces an explicit abstention.",
      "handoff": "Omar"
    },
    {
      "id": "S01-07",
      "owner": "Omar",
      "title": "Wire up the analyst walkthrough",
      "packages": [
        "P02",
        "P10",
        "A10"
      ],
      "output": "Connect the queue, finding details and read-only assistant using the same finding IDs and evidence references.",
      "acceptance": "A reviewer can open a ranked finding and trace its decision and assistant answer to the displayed evidence.",
      "handoff": "Sprint demo reviewer"
    },
    {
      "id": "S01-08",
      "owner": "Omar",
      "title": "Publish and rehearse the demo replay",
      "packages": [
        "P10",
        "A10"
      ],
      "output": "Document the entry point, pinned input revisions and expected demo output, then hand the walkthrough to a teammate.",
      "acceptance": "A teammate runs the walkthrough from those instructions and records gaps with owners.",
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
    ).join('') + '</div><div class="grid two">' +
    sprintOne.work.map(sprintTaskCard).join('') + '</div><div class="section-head"><h2>Checkpoints</h2></div>' +
    table(['When', 'Review'], [
      ['Day 1', 'Pin the inventory and advisory revisions, agree on the shared fields and review expected verdicts.'],
      ['Days 2–3', 'Build and test verdicts, ranking, retrieval and the analyst view against the same fixtures.'],
      ['Day 4', 'Connect the workflow and replay the fixtures through the analyst view.'],
      ['Day 5', 'Have another teammate run the demo from the written steps and record gaps with owners.']
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
    ? '<div class="grid two">' + found.map(sprintTaskCard).join('') + '</div>'
    : '<div class="empty">No sprint tasks match. Choose another person or try a shorter search.</div>';
}

function sprintWorkRoute(owner) {
  return '#work/' + sprintOne.id + (owner ? '-' + owner : '');
}
