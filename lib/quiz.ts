import type { Choice, McqQuestion, MultiQuestion, Question } from "./types";

export function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * สลับตัวเลือก โดยกันตัวเลือกที่ทำเครื่องหมาย pin ไว้ (เช่น "ถูกทุกข้อ", "ไม่มีข้อถูก")
 * ให้อยู่ท้ายสุดเสมอ เพราะถ้าสลับขึ้นไปกลางโจทย์จะอ่านไม่รู้เรื่อง
 */
export function shuffleChoices(choices: Choice[]): Choice[] {
  const free = choices.filter((c) => !c.pin);
  const pinned = choices.filter((c) => c.pin);
  return [...shuffle(free), ...pinned];
}

export function isMcq(q: Question): q is McqQuestion {
  return q.type === "mcq";
}

export function isMulti(q: Question): q is MultiQuestion {
  return q.type === "multi";
}

/** ข้อที่มีตัวเลือกให้กด ทั้งปรนัยและตอบได้หลายคำตอบ — ใช้ตัดสินว่าต้อง shuffle ตัวเลือกไหม */
export function hasChoices(q: Question): q is McqQuestion | MultiQuestion {
  return q.type === "mcq" || q.type === "multi";
}

/** เก็บคำตอบแบบหลายตัวเลือกเป็นสตริงเดียว เพื่อให้ลงช่อง Answer.value เดิมได้ ไม่ต้องแก้ localStorage */
export function encodeMulti(ids: string[]): string {
  return [...ids].sort().join(",");
}

export function decodeMulti(value: string | null): string[] {
  if (!value) return [];
  return value.split(",").filter(Boolean);
}

/** ถูกก็ต่อเมื่อเลือกครบทุกตัวที่ถูก และไม่เลือกตัวที่ผิดเลย — ไม่มีคะแนนบางส่วน */
export function checkMulti(selected: string[], answers: string[]): boolean {
  if (selected.length !== answers.length) return false;
  const want = new Set(answers);
  return selected.every((id) => want.has(id));
}

/** ตรวจคำตอบของโจทย์คำนวณ: ยอมรับเครื่องหมายจุลภาคและช่องว่าง และเทียบด้วย tolerance */
export function checkNumeric(input: string, answer: number, tolerance: number): boolean {
  const cleaned = input.replace(/,/g, "").replace(/\s/g, "");
  if (!cleaned) return false;
  const value = Number(cleaned);
  if (!Number.isFinite(value)) return false;
  return Math.abs(value - answer) <= tolerance;
}

export function formatClock(seconds: number): string {
  const m = Math.floor(Math.max(0, seconds) / 60);
  const s = Math.max(0, seconds) % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function formatWhen(at: number): string {
  return new Date(at).toLocaleString("th-TH", { dateStyle: "medium", timeStyle: "short" });
}
