'use strict';

const sprintOne = {
  id: 'sprint-01',
  phase: 'MVP Integration & Validation',
  title: 'Sprint 01 · Evidence to Priority',
  goal: 'Use one authorized Ubuntu lab profile to show what is affected, which findings deserve attention first, and which evidence supports the result.',
  work: [
    ['Shams', 'Freeze the Ubuntu inventory', ['C03', 'C05'], 'Hand off a pinned asset snapshot with stable identity, package versions and collection time. Include a case with missing evidence.'],
    ['Amr', 'Pin Ubuntu advisories and threat signals', ['D05', 'D11'], 'Hand off reviewed affected and fixed package records, source revisions and available dated KEV and EPSS values. Preserve missing signals explicitly.'],
    ['Mahrous', 'Validate applicability and build the priority baseline', ['D09', 'C08', 'D15', 'D12'], 'Replay reviewed Affected, Not Affected and Unknown cases. Rank up to ten eligible findings with documented severity, threat, asset and policy reasons. Show what evidence is missing on Unknown findings.'],
    ['Hams', 'Explain findings from cited local evidence', ['A06', 'A07', 'A13'], 'Prepare retrieval and review questions for why a finding ranks where it does. Verify citations and record an example where the assistant says the evidence is insufficient.'],
    ['Omar', 'Connect the analyst demo', ['P02', 'P10', 'A10'], 'Agree on shared fields at kickoff. Connect the queue, finding details and read-only assistant to the same finding ID. Publish the replay steps.']
  ]
};

const sprintOneTasks = new Set(sprintOne.work.flatMap(([, , ids]) => ids));
const workPhaseOptions = [['', 'All tasks'], ['week', 'Prototype week'], [sprintOne.id, sprintOne.title]];
const prototypeCheckpointLabels = {first: '1 November delivery', second: '5 November delivery'};

function sprintView() {
  return heading('ERA / POST-PROTOTYPE', sprintOne.phase, sprintOne.title) +
    '<article class="card week-goal"><h2>Sprint goal</h2><p>' + esc(sprintOne.goal) + '</p>' +
    '<p class="tagline">Suggested duration · Five working days from kickoff</p>' +
    '<div class="actions"><a class="button teal" href="#work/sprint-01">Open Sprint 01 tasks →</a>' +
    '<a class="button soft" href="#delivery/week">Prototype week →</a></div></article>' +
    '<div class="section-head"><h2>Owners and handoffs</h2></div><div class="grid two">' +
    sprintOne.work.map(([owner, title, ids, output]) =>
      '<article class="card"><span class="label">' + esc(owner) + '</span><h3>' + esc(title) +
      '</h3><p>' + esc(output) + '</p>' + chips(ids) + '</article>'
    ).join('') + '</div><div class="section-head"><h2>Checkpoints</h2></div>' +
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
