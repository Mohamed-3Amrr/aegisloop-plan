'use strict';

function taskSectionNav(t){
 return `<nav class="task-section-nav" aria-label="${t.id} sections">${[['inputs','Inputs & examples'],['research','Research'],['build','Build'],['test','Test & acceptance'],['output','Output & preview'],['growth','Useful improvement']].map(([section,label])=>`<a href="#task-${section}-${t.id}" data-task-section="task-${section}-${t.id}">${label}</a>`).join('')}</nav>`;
}

function taskInputSection(t){
 const data=window.TASK_DATA?.tasks[t.id];
 return `<div id="task-inputs-${t.id}" class="task-section-anchor">${executionSection('INPUTS '+fieldTag(t,'inputs'),'What do I need, and from whom?',`<p>Use the named producer’s reference to build and test while waiting for their delivered input. References are examples, not proof of completed work.</p><div class="simple-input-list">${t.depends.length?t.depends.map(id=>{const upstream=tasks[id];return `<article><div><span class="simple-code">${id}</span><h3>From ${esc(upstream.owner)}: ${esc(simpleTitle(upstream))}</h3><p>${esc(simpleOutcome(upstream))}</p></div><div class="simple-input-actions"><a download href="handoffs/tasks/${id}.reference.json">Download this input reference ↓</a><a href="#work/${id}">Open upstream task →</a></div></article>`;}).join(''):'<p>No task prerequisite is listed. Start with the external inputs below.</p>'}</div><h4>Other inputs listed in the task guide</h4>${trackedList(t,'inputs')}<details class="simple-details"><summary>Research and example files for this task${data?' · '+data.specimen_count:''}</summary><p>These are additional materials for development and tests. Teammates’ expected inputs are listed above.</p>${simpleDataFiles(t.id)}${data?`<h4>Available to start</h4>${list(data.available)}<h4>Still needed for acceptance</h4>${list(data.missing)}<p>${esc(data.sufficiency_note)}</p>`:''}</details>`,true)}</div>`;
}

function taskOutputContents(t){
 const contract=WF.contracts[t.id];
 return `<p><b>Expected outcome:</b> ${esc(simpleOutcome(t))}</p><p>Deliver these ${t.deliverables.length} files or document equivalent paths. The reference packet names the expected artifacts; it does not contain the finished implementation or measured results.</p><div class="file-list">${t.deliverables.map(file=>`<div><span>${artifactRole(file)}</span><code>${esc(file)}</code> ${changeTag(fieldChange(t,'deliverables',file),true)}</div>`).join('')}</div><h4>Existing handoff definition</h4><p>${esc(t.output)}</p><h4>Who uses this output?</h4><div class="task-consumers">${t.next.length?t.next.map(id=>`<a href="#work/${id}"><b>${id} · ${esc(tasks[id].owner)}</b><span>${esc(simpleTitle(tasks[id]))}</span></a>`).join(''):'<p>The reviewer and final handover; no downstream task is listed.</p>'}</div><h4>How do I start now?</h4><ol class="simple-steps"><li>${t.depends.length?'Download the upstream input reference you need from Inputs.':'Gather the external inputs and examples listed in Inputs.'}</li><li>Read the agreed format and test the boundary with the reference.</li><li>When the delivered input arrives, validate it and switch the provider. Adapt an existing format at the component boundary when needed.</li></ol><p class="tagline">References enable development. Real collection, implementation and measured tests remain the task owner’s work.</p><details class="simple-details" data-task-preview="${t.id}"><summary>Preview or replace the output file for ${t.id}</summary><p>This is the expected output from <b>${esc(t.owner)}</b>. It is separate from the upstream input references above.</p><div data-task-lab="${t.id}"><p>Open this section to load the reference.</p></div></details><details class="simple-details"><summary>Developer details: fields and file format</summary><p>Producer and consumer review these format details together. Extra fields are preserved; breaking changes require a new major version and a migration adapter.</p><div class="wf-fields" dir="ltr">${Object.entries(contract.recordSchema.properties).map(([key,schema])=>`<div><code>${esc(key)}</code><span>${esc([schema.type].flat().join(' / '))}</span></div>`).join('')}</div><div class="actions">${packetLink(t.id,'schema','Download the schema')}<a class="button soft" download href="handoffs/consumer.mjs">Consumer helper</a><a class="button soft" download href="handoff-core.js">Validation helper</a></div></details>`;
}

function taskGrowthSection(t){
 const contract=WF.contracts[t.id],growth=SIMPLE_GROWTH[contract.family]||SIMPLE_GROWTH.platform;
 return `<section id="task-growth-${t.id}" class="simple-growth task-section-anchor"><div><span>After the full core delivery works</span><h2>A useful improvement to consider</h2></div><dl><dt>Core result</dt><dd>${esc(growth[0])}</dd><dt>Possible addition</dt><dd>${esc(growth[1])}</dd><dt>Who benefits, and how?</dt><dd>${esc(growth[2])}</dd></dl><p>Use these examples as a starting point. Choose the improvement with the downstream owner, keep the required acceptance criteria, and test its benefit.</p><details class="simple-details"><summary>Suggested experiment and measure</summary><p>${esc(contract.growth.hypothesis)}</p><p>${esc(contract.growth.measure)}</p></details></section>`;
}

function bindTaskDetails(root=document){
 root.querySelectorAll('[data-task-section]').forEach(anchor=>anchor.addEventListener('click',event=>{
  event.preventDefault();
  const section=document.getElementById(anchor.dataset.taskSection);
  if(!section)return;
  // Section shortcuts also reveal the pilot's enclosing technical reference.
  for(let ancestor=section;ancestor&&ancestor!==root;ancestor=ancestor.parentElement){if(ancestor.tagName==='DETAILS')ancestor.open=true;}
  const disclosure=section.classList.contains('clarity-technical')?null:section.querySelector('details.execution-section');
  if(disclosure)disclosure.open=true;
  section.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
 }));
 root.querySelectorAll('[data-task-preview]').forEach(preview=>preview.addEventListener('toggle',()=>{
  if(!preview.open)return;
  const host=preview.querySelector('[data-task-lab]'),previous=document.getElementById('handoff-lab');
  if(previous===host&&host.querySelector('.simple-import-state'))return;
  if(previous&&previous!==host){previous.removeAttribute('id');previous.innerHTML='<p>Open this section again to load its reference.</p>';}
  host.id='handoff-lab';host.dataset.task=preview.dataset.taskPreview;
  simpleHandoffLab(host.dataset.task);
 }));
}
