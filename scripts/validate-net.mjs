// ตรวจความถูกต้องเชิงโครงสร้างของคลังข้อสอบ Network
// อ่านไฟล์ .ts เป็นข้อความ ตัดส่วน import/export ออก แล้ว eval อาร์เรย์ literal ตรง ๆ
// ใช้ได้เพราะไฟล์ข้อมูลเป็น object literal ล้วน ไม่มีไวยากรณ์ TypeScript อยู่ข้างใน
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadArray(file, exportName) {
  const raw = readFileSync(join(root, "data", file), "utf8");
  const start = raw.indexOf(`export const ${exportName}`);
  const open = raw.indexOf("[", start);
  const body = raw.slice(open, raw.lastIndexOf("];") + 1);
  return eval(body);
}

const tagsSrc = readFileSync(join(root, "data", "tags.ts"), "utf8");
const knownTags = new Set([...tagsSrc.matchAll(/\{\s*id:\s*"([^"]+)",\s*label:/g)].map((m) => m[1]));
const figuresSrc = readFileSync(join(root, "components", "Figures.tsx"), "utf8");
const figureBlock = figuresSrc.slice(figuresSrc.indexOf("const FIGURES"));
const knownFigures = new Set(
  [...figureBlock.matchAll(/^\s*"?([a-zA-Z0-9-]+)"?:\s*[A-Z]/gm)].map((m) => m[1])
);

const chapters = [
  ["net-ch1.ts", "netCh1Questions", "net-ch1"],
  ["net-ch2.ts", "netCh2Questions", "net-ch2"],
  ["net-ch3.ts", "netCh3Questions", "net-ch3"],
];

const problems = [];
const seenIds = new Set();
const stats = {};

for (const [file, name, chapterId] of chapters) {
  const list = loadArray(file, name);
  const s = { total: 0, mcq: 0, tf: 0, numeric: 0, multi: 0, s2: 0, s3: 0, past: 0 };

  for (const q of list) {
    const at = `${q.id}`;
    s.total += 1;
    if (seenIds.has(q.id)) problems.push(`${at}: id ซ้ำ`);
    seenIds.add(q.id);
    if (q.chapter !== chapterId) problems.push(`${at}: chapter เป็น ${q.chapter} แต่อยู่ในไฟล์ ${file}`);
    if (![1, 2, 3].includes(q.stars)) problems.push(`${at}: stars ไม่ถูกต้อง`);
    if (q.stars === 1) problems.push(`${at}: มีข้อระดับ ★ ซึ่งไม่ควรมีในชุดนี้`);
    if (q.stars === 2) s.s2 += 1;
    if (q.stars === 3) s.s3 += 1;
    if (q.source === "past") s.past += 1;
    if (!["past", "generated"].includes(q.source)) problems.push(`${at}: source ไม่ถูกต้อง`);
    if (!q.prompt || !q.prompt.trim()) problems.push(`${at}: ไม่มี prompt`);
    if (!q.explanation || !q.explanation.trim()) problems.push(`${at}: ไม่มี explanation`);
    if (!Array.isArray(q.tags) || q.tags.length === 0) problems.push(`${at}: ไม่มี tags`);
    for (const t of q.tags ?? []) if (!knownTags.has(t)) problems.push(`${at}: tag "${t}" ไม่มีใน tags.ts`);
    if (q.figure && !knownFigures.has(q.figure)) problems.push(`${at}: figure "${q.figure}" ไม่มีใน Figures.tsx`);

    if (q.type === "mcq" || q.type === "multi") {
      const ids = (q.choices ?? []).map((c) => c.id);
      if (new Set(ids).size !== ids.length) problems.push(`${at}: id ของตัวเลือกซ้ำกัน`);
      if (ids.length < 2) problems.push(`${at}: ตัวเลือกน้อยกว่า 2`);
      for (const c of q.choices ?? []) {
        if (!c.text?.trim()) problems.push(`${at}: ตัวเลือก ${c.id} ไม่มีข้อความ`);
        if (!c.why?.trim()) problems.push(`${at}: ตัวเลือก ${c.id} ไม่มี why`);
      }
      const isTf = ids.length === 2 && ids.includes("t") && ids.includes("f");
      if (q.type === "mcq") {
        if (isTf) s.tf += 1;
        else s.mcq += 1;
        if (!ids.includes(q.answer)) problems.push(`${at}: answer "${q.answer}" ไม่อยู่ในตัวเลือก`);
        if (isTf && !(q.choices.every((c) => c.pin))) problems.push(`${at}: ข้อถูก/ผิด ต้อง pin ทั้งสองตัวเลือก`);
        if (!isTf && ids.length !== 4) problems.push(`${at}: ข้อปรนัยควรมี 4 ตัวเลือก แต่มี ${ids.length}`);
      } else {
        s.multi += 1;
        if (!Array.isArray(q.answers) || q.answers.length < 2) problems.push(`${at}: multi ต้องมีคำตอบถูกอย่างน้อย 2 ข้อ`);
        if (q.answers?.length >= ids.length) problems.push(`${at}: multi ตอบถูกทุกตัวเลือก ไม่มีตัวลวงเลย`);
        for (const a of q.answers ?? []) if (!ids.includes(a)) problems.push(`${at}: answers มี "${a}" ที่ไม่อยู่ในตัวเลือก`);
        if (new Set(q.answers ?? []).size !== (q.answers ?? []).length) problems.push(`${at}: answers ซ้ำกัน`);
      }
    } else if (q.type === "numeric") {
      s.numeric += 1;
      if (typeof q.answer !== "number" || !Number.isFinite(q.answer)) problems.push(`${at}: answer ไม่ใช่ตัวเลข`);
      if (typeof q.tolerance !== "number" || q.tolerance < 0) problems.push(`${at}: tolerance ไม่ถูกต้อง`);
      if (!q.solution?.trim()) problems.push(`${at}: ไม่มี solution`);
    } else {
      problems.push(`${at}: type "${q.type}" ไม่รู้จัก`);
    }
  }
  stats[chapterId] = s;
}

console.log("บท        รวม  ปรนัย  ถูกผิด  คำนวณ  หลายคำตอบ   ★★  ★★★  จากควิซ");
let grand = { total: 0, mcq: 0, tf: 0, numeric: 0, multi: 0, s2: 0, s3: 0, past: 0 };
for (const [k, s] of Object.entries(stats)) {
  console.log(
    `${k}   ${String(s.total).padStart(3)}  ${String(s.mcq).padStart(5)}  ${String(s.tf).padStart(6)}  ${String(s.numeric).padStart(5)}  ${String(s.multi).padStart(9)}  ${String(s.s2).padStart(4)}  ${String(s.s3).padStart(4)}  ${String(s.past).padStart(6)}`
  );
  for (const key of Object.keys(grand)) grand[key] += s[key];
}
console.log(
  `รวม        ${String(grand.total).padStart(3)}  ${String(grand.mcq).padStart(5)}  ${String(grand.tf).padStart(6)}  ${String(grand.numeric).padStart(5)}  ${String(grand.multi).padStart(9)}  ${String(grand.s2).padStart(4)}  ${String(grand.s3).padStart(4)}  ${String(grand.past).padStart(6)}`
);

if (problems.length) {
  console.log(`\nพบปัญหา ${problems.length} รายการ`);
  for (const p of problems) console.log("  - " + p);
  process.exit(1);
}
console.log("\nตรวจผ่านทั้งหมด");
