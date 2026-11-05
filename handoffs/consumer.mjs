// Same consumer for source-backed reference packets and reviewed delivered packets.
// Use JSON Schema in CI as well; interface validation is not operational acceptance.
import '../handoff-core.js';
export const {loadHandoff,validatePacket,diff}=globalThis.HandoffCore;
// const {records,warnings}=await loadHandoff('C05',{base:'https://our-dream-project-map.kolslow.chatgpt.site/handoffs/'});
// const next=await loadHandoff('C05',{base:'/handoffs/',packet:reviewedTeamPacket});
// Additional fields and extensions remain present in next.packet and next.records.
