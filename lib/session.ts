import { QUESTIONS_BY_CHAPTER } from "@/data";
import { shuffle } from "./quiz";
import type { ChapterId, Question, SubjectId } from "./types";

/** mixed = คละหลายบทในชุดเดียว, chapter = ชุดของบทเดียว */
export type QuizMode = "mixed" | "chapter";

export interface Answer {
  value: string;
  correct: boolean;
}

export interface QuizSession {
  id: string;
  /** วิชาของชุดนี้ — ชุดเก่าที่บันทึกไว้ก่อนมีหลายวิชาจะไม่มีฟิลด์นี้ ให้ถือเป็น "mm" */
  subject?: SubjectId;
  mode: QuizMode;
  chapters: ChapterId[];
  questionIds: string[];
  answers: Record<string, Answer>;
  /** ข้อที่ค้างอยู่ ใช้ตอนกดทำต่อ */
  index: number;
  /** 0 = ไม่จับเวลา */
  timeLimitMin: number;
  /** เวลาที่ใช้ไปแล้วสะสมเป็นวินาที นับต่อได้แม้ปิดแล้วกลับมาทำใหม่ */
  elapsedSec: number;
  bookmarks: string[];
  startedAt: number;
  finishedAt: number | null;
}

export function createSession(opts: {
  subject: SubjectId;
  mode: QuizMode;
  chapters: ChapterId[];
  questionIds: string[];
  timeLimitMin: number;
}): QuizSession {
  const now = Date.now();
  return {
    id: `s${now.toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    subject: opts.subject,
    mode: opts.mode,
    chapters: opts.chapters,
    questionIds: opts.questionIds,
    answers: {},
    index: 0,
    timeLimitMin: opts.timeLimitMin,
    elapsedSec: 0,
    bookmarks: [],
    startedAt: now,
    finishedAt: null,
  };
}

/**
 * เลือกข้อสอบให้กระจายเท่า ๆ กันทุกบทที่เลือก
 * บทไหนมีข้อไม่พอโควตา ส่วนที่ขาดจะถูกเกลี่ยไปให้บทอื่นแทน
 */
export function pickEvenly(chapters: ChapterId[], total: number): Question[] {
  const pools = new Map(chapters.map((c) => [c, shuffle(QUESTIONS_BY_CHAPTER[c])]));
  const taken = new Map<ChapterId, number>(chapters.map((c) => [c, 0]));
  const picked: Question[] = [];

  let remaining = total;
  let progressed = true;

  // แจกทีละรอบ รอบละ 1 ข้อต่อบท จนครบจำนวนหรือของหมด
  while (remaining > 0 && progressed) {
    progressed = false;
    for (const c of chapters) {
      if (remaining === 0) break;
      const pool = pools.get(c) ?? [];
      const used = taken.get(c) ?? 0;
      if (used >= pool.length) continue;
      picked.push(pool[used]);
      taken.set(c, used + 1);
      remaining -= 1;
      progressed = true;
    }
  }

  return shuffle(picked);
}

export function availableCount(chapters: ChapterId[]): number {
  return chapters.reduce((sum, c) => sum + QUESTIONS_BY_CHAPTER[c].length, 0);
}

export function scoreOf(session: QuizSession): { correct: number; answered: number; total: number } {
  const values = Object.values(session.answers);
  return {
    correct: values.filter((a) => a.correct).length,
    answered: values.length,
    total: session.questionIds.length,
  };
}

/** ชุดเก่าที่ยังไม่มีฟิลด์ subject ล้วนเป็นข้อสอบ Multimedia */
export function subjectOf(session: QuizSession): SubjectId {
  return session.subject ?? "mm";
}

export function isFinished(session: QuizSession): boolean {
  return session.finishedAt !== null;
}

export function remainingSec(session: QuizSession): number {
  if (!session.timeLimitMin) return 0;
  return Math.max(0, session.timeLimitMin * 60 - session.elapsedSec);
}
