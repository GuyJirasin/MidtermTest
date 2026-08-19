/** วิชาที่มีคลังข้อสอบอยู่ในแอป */
export type SubjectId = "mm" | "db" | "net";

/**
 * id ของบท — ตั้งชื่อแยกตามวิชา
 * บทของ Multimedia คงชื่อเดิม ch1…ch6 ไว้ เพื่อให้ประวัติเก่าใน localStorage ยังเปิดได้
 */
export type ChapterId =
  | "ch1"
  | "ch2"
  | "ch3"
  | "ch4"
  | "ch5"
  | "ch6"
  | "db-ch1"
  | "db-ch3"
  | "db-ch4"
  | "net-ch1"
  | "net-ch2"
  | "net-ch3";

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

/** ตารางข้อมูลประกอบโจทย์ เช่น relation ที่ใช้ทำ relational algebra */
export interface QuestionTable {
  /** ชื่อตาราง เช่น "CUSTOMER (C)" */
  caption?: string;
  head: string[];
  rows: string[][];
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
  /**
   * ตารางประกอบโจทย์ วาดเป็น <table> จริง เพราะฟอนต์เนื้อหาไม่ใช่ monospace
   * ใส่เป็นอาร์เรย์ได้สำหรับโจทย์ที่ต้องดูสองตารางพร้อมกัน เช่น JOIN
   */
  table?: QuestionTable | QuestionTable[];
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

/**
 * ข้อที่ตอบได้หลายคำตอบ — ต้องเลือกให้ครบทุกตัวที่ถูกและห้ามเลือกตัวที่ผิด
 * ตรวจแบบเซต ไม่ให้คะแนนบางส่วน เพราะข้อสอบจริงก็ไม่ให้
 */
export interface MultiQuestion extends BaseQuestion {
  type: "multi";
  choices: Choice[];
  /** id ของตัวเลือกที่ถูกทั้งหมด */
  answers: string[];
  explanation: string;
}

export type Question = McqQuestion | NumericQuestion | MultiQuestion;

export interface Chapter {
  id: ChapterId;
  subject: SubjectId;
  /** เลขบทตามที่ใช้เรียกในวิชานั้น — ของ Database ใช้เลขบทตามหนังสือ (1, 3, 4) */
  number: number;
  titleEn: string;
  titleTh: string;
}

export interface Subject {
  id: SubjectId;
  /** ชื่อสั้นที่ใช้บนปุ่มสลับวิชา */
  name: string;
  /** ชื่อเต็มของวิชา ใช้เป็นหัวเรื่อง */
  fullName: string;
  /** ขอบเขตเนื้อหา แสดงใต้ชื่อวิชา */
  scope: string;
}

export interface Tag {
  id: string;
  label: string;
  chapter: ChapterId;
}
