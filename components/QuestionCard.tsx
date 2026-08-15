"use client";

import { useState } from "react";
import { Figure } from "./Figures";
import { CHAPTER_BY_ID, tagLabel } from "@/data/tags";
import { checkNumeric, isMcq } from "@/lib/quiz";
import type { Choice, Question } from "@/lib/types";

interface Props {
  question: Question;
  choices: Choice[];
  /** ตัวเลือกที่เลือกไว้ (ปรนัย) หรือค่าที่กรอก (คำนวณ) */
  answerValue: string | null;
  revealed: boolean;
  bookmarked: boolean;
  onAnswer: (value: string, correct: boolean) => void;
  onToggleBookmark: () => void;
}

function optionState(revealed: boolean, isAnswer: boolean, isPicked: boolean) {
  if (!revealed) return isPicked ? "picked" : "idle";
  if (isAnswer) return "correct";
  if (isPicked) return "wrong";
  return "idle";
}

export function QuestionCard({
  question,
  choices,
  answerValue,
  revealed,
  bookmarked,
  onAnswer,
  onToggleBookmark,
}: Props) {
  // การ์ดถูกสร้างใหม่ทุกครั้งที่เปลี่ยนข้อ (parent ใส่ key) จึงตั้งค่าเริ่มต้นจาก prop ได้เลย
  const [numericInput, setNumericInput] = useState(answerValue ?? "");
  const [error, setError] = useState("");

  const mcq = isMcq(question);
  const chapter = CHAPTER_BY_ID.get(question.chapter);
  const correct = mcq
    ? answerValue === question.answer
    : Boolean(answerValue) && checkNumeric(answerValue ?? "", question.answer, question.tolerance);

  function submitNumeric() {
    if (!numericInput.trim()) {
      setError("กรอกคำตอบเป็นตัวเลขก่อน");
      return;
    }
    if (!Number.isFinite(Number(numericInput.replace(/,/g, "").trim()))) {
      setError("กรอกได้เฉพาะตัวเลขเท่านั้น");
      return;
    }
    setError("");
    if (!mcq) onAnswer(numericInput, checkNumeric(numericInput, question.answer, question.tolerance));
  }

  return (
    <article className="panel p-5 sm:p-6">
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="meta">
          บทที่ {chapter?.number} · {question.source === "past" ? "ข้อสอบจากควิซ" : "ข้อฝึกเพิ่ม"} ·{" "}
          <span title={`ระดับความยาก ${question.stars} ดาว`}>{"★".repeat(question.stars)}</span>
        </p>
        <button
          type="button"
          onClick={onToggleBookmark}
          aria-pressed={bookmarked}
          aria-label={bookmarked ? "เอาเครื่องหมายสงสัยออก" : "ทำเครื่องหมายว่าสงสัยข้อนี้"}
          className="shrink-0 text-2xl leading-none"
          style={{ color: bookmarked ? "var(--text)" : "var(--text-soft)" }}
        >
          {bookmarked ? "★" : "☆"}
        </button>
      </div>

      <p className="whitespace-pre-line text-[20px] leading-relaxed">{question.prompt}</p>

      {question.figure ? <Figure name={question.figure} /> : null}
      {question.note ? <p className="meta mt-2">หมายเหตุ: {question.note}</p> : null}

      {mcq ? (
        <ul className="mt-5 flex flex-col gap-3">
          {choices.map((c, i) => {
            const isAnswer = c.id === question.answer;
            const isPicked = c.id === answerValue;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  disabled={revealed}
                  onClick={() => onAnswer(c.id, isAnswer)}
                  data-state={optionState(revealed, isAnswer, isPicked)}
                  className="opt disabled:cursor-default"
                >
                  <span className="mr-2 font-semibold" style={{ color: "var(--text-soft)" }}>
                    {String.fromCharCode(97 + i)}.
                  </span>
                  {c.text}
                  {revealed ? (
                    <span className="mt-2 block text-[16px]" style={{ color: "var(--text-soft)" }}>
                      <span className="font-semibold" style={{ color: isAnswer ? "var(--ok)" : "var(--text-soft)" }}>
                        {isAnswer ? "นี่คือคำตอบ — " : "ไม่ใช่คำตอบ — "}
                      </span>
                      {c.why}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-5">
          <p className="mb-2 font-semibold">
            กรอกคำตอบเป็นตัวเลข{question.unit ? ` (หน่วย ${question.unit})` : ""}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <input
              inputMode="decimal"
              value={numericInput}
              disabled={revealed}
              onChange={(e) => {
                setNumericInput(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !revealed) submitNumeric();
              }}
              placeholder="เช่น 25"
              aria-label="ช่องกรอกคำตอบ"
              className="field w-44 disabled:opacity-70"
            />
            {!revealed ? (
              <button type="button" onClick={submitNumeric} className="btn btn-main btn-sm px-6">
                ตรวจคำตอบ
              </button>
            ) : null}
          </div>
          {error ? (
            <p className="mt-2 font-semibold" style={{ color: "var(--bad)" }}>
              {error}
            </p>
          ) : null}
          {revealed ? (
            <p className="mt-4">
              เฉลย{" "}
              <span className="font-semibold">
                {question.answer.toLocaleString()} {question.unit ?? ""}
              </span>
              {question.tolerance > 0 ? <span className="meta"> (ยอมรับ ± {question.tolerance})</span> : null}
            </p>
          ) : null}
        </div>
      )}

      {revealed ? (
        <div className="mt-5 flex flex-col gap-4">
          {answerValue ? (
            <p
              className="rounded-xl px-4 py-3 font-semibold"
              style={
                correct
                  ? { background: "var(--ok-bg)", color: "var(--ok)" }
                  : { background: "var(--bad-bg)", color: "var(--bad)" }
              }
            >
              {correct ? "ตอบถูก" : "ตอบผิด"}
            </p>
          ) : null}

          {!mcq ? (
            <div>
              <p className="mb-1 font-semibold">วิธีทำ</p>
              <p className="whitespace-pre-line text-[17px]">{question.solution}</p>
            </div>
          ) : null}

          <div>
            <p className="mb-1 font-semibold">คำอธิบาย</p>
            <p className="whitespace-pre-line text-[17px]">{question.explanation}</p>
          </div>

          <p className="meta">หัวข้อ: {question.tags.map((t) => tagLabel(t)).join(" · ")}</p>
        </div>
      ) : null}
    </article>
  );
}
