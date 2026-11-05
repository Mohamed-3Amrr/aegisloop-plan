(function(root){
 'use strict';
 const isObject=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
 function validate(schema,value,path='$',errors=[]){
  if('const'in schema&&JSON.stringify(schema.const)!==JSON.stringify(value))errors.push(path+': expected '+JSON.stringify(schema.const));
  if(schema.enum&&!schema.enum.some(v=>JSON.stringify(v)===JSON.stringify(value)))errors.push(path+': unsupported value');
  if(schema.type){const types=[schema.type].flat(),ok=types.some(t=>t==='null'?value===null:t==='array'?Array.isArray(value):t==='object'?isObject(value):t==='integer'?Number.isInteger(value):t==='number'?typeof value==='number'&&Number.isFinite(value):typeof value===t);if(!ok){errors.push(path+': expected '+types.join(' / '));return errors;}}
  if(typeof value==='string'){if(schema.minLength&&value.length<schema.minLength)errors.push(path+': empty value');if(schema.pattern&&!new RegExp(schema.pattern).test(value))errors.push(path+': incompatible version or format');if(schema.format==='date-time'&&(!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:Z|[+-]\d\d:\d\d)$/.test(value)||!Number.isFinite(Date.parse(value))))errors.push(path+': expected ISO date-time with timezone');}
  if(Array.isArray(value)){if(schema.minItems&&value.length<schema.minItems)errors.push(path+': too few items');if(schema.items)value.forEach((v,i)=>validate(schema.items,v,path+'['+i+']',errors));}
  if(isObject(value)){for(const k of schema.required||[])if(!Object.hasOwn(value,k))errors.push(path+'.'+k+': required field missing');for(const[k,s]of Object.entries(schema.properties||{}))if(Object.hasOwn(value,k))validate(s,value[k],path+'.'+k,errors);if(schema.additionalProperties===false)for(const k of Object.keys(value))if(!Object.hasOwn(schema.properties||{},k))errors.push(path+'.'+k+': unexpected field');}
  return errors;
 }
 function validatePacket(schema,packet){const errors=validate(schema,packet),warnings=[];if(errors.length)return {errors,warnings};
  const ids=new Set();for(const r of packet.records){if(ids.has(r.record_id))errors.push('Duplicate record_id: '+r.record_id);ids.add(r.record_id);}
  for(const a of packet.artifacts){if(!a.path||/^(?:[a-z]+:|[\\/])|(?:^|[\\/])\.\.(?:[\\/]|$)/i.test(a.path))errors.push('Artifact paths must be relative without traversal');if(a.sha256!==null&&!/^[a-f0-9]{64}$/i.test(a.sha256))errors.push('Invalid artifact SHA-256: '+a.path);if(a.state==='provided'&&!a.sha256)errors.push('Provided artifact requires its SHA-256: '+a.path);if(a.state==='equivalent_documented'&&!a.equivalent_path)errors.push('Document the equivalent path: '+a.path);}
  if(packet.mode==='reference')warnings.push('Reference only. No task completion or real-host result.');
  if(packet.data_kind==='source_backed_scenario')warnings.push('Scenario context. Public vulnerability facts do not prove a host observation.');
  if(packet.mode==='delivered'&&packet.provenance.source_ids.length===0)warnings.push('No source IDs supplied; review provenance before using evidence.');
  if(packet.artifacts.some(a=>a.state==='not_produced'))warnings.push('Some declared deliverables have not been produced. Interface validation does not prove task acceptance.');
  return {errors,warnings};
 }
 function diff(before,after){const changes=[];function walk(a,b,p){if(JSON.stringify(a)===JSON.stringify(b))return;if(isObject(a)&&isObject(b)){for(const k of new Set([...Object.keys(a),...Object.keys(b)]))walk(a[k],b[k],p+'.'+k);}else changes.push({path:p,kind:a===undefined?'added':b===undefined?'removed':'changed',before:a===undefined?null:a,after:b===undefined?null:b});}walk(before,after,'$');return changes;}
 async function loadHandoff(taskId,{base='./handoffs/',packet=null,fetcher=fetch}={}){const read=async url=>{const r=await fetcher(url);if(!r.ok)throw Error('Cannot load '+url);return r.json();};const schema=await read(base+'tasks/'+taskId+'.schema.json');const data=packet||await read(base+'tasks/'+taskId+'.reference.json');const result=validatePacket(schema,data);if(result.errors.length)throw Error(result.errors.join('\n'));return {packet:data,records:data.records,warnings:result.warnings};}
 const api={validate,validatePacket,diff,loadHandoff};root.HandoffCore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
