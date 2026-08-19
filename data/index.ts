import type { ChapterId, Question } from "@/lib/types";
import { ch1Questions } from "./ch1";
import { ch1Generated } from "./ch1-gen";
import { ch2Questions } from "./ch2";
import { ch2Generated } from "./ch2-gen";
import { ch3Questions } from "./ch3";
import { ch3Generated } from "./ch3-gen";
import { ch4Questions } from "./ch4";
import { ch4Generated } from "./ch4-gen";
import { ch5Questions } from "./ch5";
import { ch5Generated } from "./ch5-gen";
import { ch6Questions } from "./ch6";
import { dbCh1Questions } from "./db-ch1";
import { dbCh3Questions } from "./db-ch3";
import { dbCh4Questions } from "./db-ch4";
import { netCh1Questions } from "./net-ch1";
import { netCh2Questions } from "./net-ch2";
import { netCh3Questions } from "./net-ch3";
import { calcQuestions } from "./calc";
import { CHAPTERS } from "./tags";

export const ALL_QUESTIONS: Question[] = [
  ...ch1Questions,
  ...ch1Generated,
  ...ch2Questions,
  ...ch2Generated,
  ...ch3Questions,
  ...ch3Generated,
  ...ch4Questions,
  ...ch4Generated,
  ...ch5Questions,
  ...ch5Generated,
  ...ch6Questions,
  ...calcQuestions,
  ...dbCh1Questions,
  ...dbCh3Questions,
  ...dbCh4Questions,
  ...netCh1Questions,
  ...netCh2Questions,
  ...netCh3Questions,
];

export const QUESTIONS_BY_CHAPTER = Object.fromEntries(
  CHAPTERS.map((c) => [c.id, ALL_QUESTIONS.filter((q) => q.chapter === c.id)])
) as Record<ChapterId, Question[]>;

export const QUESTION_BY_ID = new Map(ALL_QUESTIONS.map((q) => [q.id, q]));
