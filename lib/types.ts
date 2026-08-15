export type ChapterId = "ch1" | "ch2" | "ch3" | "ch4" | "ch5" | "ch6";

/** 1 = ง่าย, 2 = ปานกลาง, 3 = ยาก */
export type Stars = 1 | 2 | 3;

/** past = ข้อสอบจากควิซที่อาจารย์เคยให้ทำ, generated = ข้อที่สร้างเพิ่มจากสไลด์ */
export type QuestionSource = "past" | "generated";

export interface Choice {
  id: string;
  text: string;
  /** เหตุผลว่าทำไมตัวเลือกนี้ถูก/ผิด */
  why: string;
  /**
   * ตัวเลือกประเภท "ถูกทุกข้อ" / "ไม่มีข้อถูก" ที่ต้องอยู่ท้ายเสมอ
   * จะถูกกันไว้ไม่ให้สลับตำแหน่งตอน shuffle
   */
  pin?: boolean;
}

interface BaseQuestion {
  id: string;
  chapter: ChapterId;
  source: QuestionSource;
  stars: Stars;
  tags: string[];
  prompt: string;
  /** key ของรูปประกอบใน components/Figures.tsx */
  figure?: string;
  /** หมายเหตุ เช่น รูปที่วาดขึ้นใหม่แทนรูปในข้อสอบต้นฉบับ */
  note?: string;
}

export interface McqQuestion extends BaseQuestion {
  type: "mcq";
  choices: Choice[];
  /** id ของตัวเลือกที่ถูก */
  answer: string;
  explanation: string;
}

export interface NumericQuestion extends BaseQuestion {
  type: "numeric";
  answer: number;
  /** ค่าความคลาดเคลื่อนสัมบูรณ์ที่ยอมรับได้ */
  tolerance: number;
  unit?: string;
  /** ตัวช่วยบอกรูปแบบคำตอบ เช่น "ตอบเป็นตัวเลขจำนวนเต็ม" */
  hint?: string;
  /** วิธีทำแบบทีละขั้น */
  solution: string;
  explanation: string;
}

export type Question = McqQuestion | NumericQuestion;

export interface Chapter {
  id: ChapterId;
  number: number;
  titleEn: string;
  titleTh: string;
}

export interface Tag {
  id: string;
  label: string;
  chapter: ChapterId;
}
