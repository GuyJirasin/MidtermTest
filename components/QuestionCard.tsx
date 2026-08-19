"use client";

import { useState } from "react";
import { Figure } from "./Figures";
import { CHAPTER_BY_ID, SUBJECT_BY_ID, tagLabel } from "@/data/tags";
import { checkMulti, checkNumeric, decodeMulti, encodeMulti, isMcq, isMulti } from "@/lib/quiz";
import type { Choice, Question, QuestionTable } from "@/lib/types";

interface Props {
  question: Question;
  choices: Choice[];
  /** ตัวเลือกที่เลือก (ปรนัย), รายการที่เลือกคั่นด้วยจุลภาค (หลายคำตอบ) หรือค่าที่กรอก (คำนวณ) */
  answerValue: string | null;
  revealed: boolean;
  bookmarked: boolean;
  onAnswer: (value: string, correct: boolean) => void;
  onToggleBookmark: () => void;
}

/** ตารางประกอบโจทย์ — เลื่อนแนวนอนได้เองเมื่อจอแคบ ไม่ดันหน้าให้ล้น */
function DataTable({ table }: { table: QuestionTable }) {
  return (
    <figure className="mt-4">
      {table.caption ? <figcaption className="meta mb-1">{table.caption}</figcaption> : null}
      <div className="overflow-x-auto rounded-lg border" style={{ borderColor: "var(--border)" }}>
        <table className="w-full border-collapse text-[15px]">
          <thead>
            <tr>
              {table.head.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="whitespace-nowrap px-3 py-2 text-left font-semibold"
                  style={{ background: "var(--bg)", borderBottom: "1px solid var(--border-strong)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="whitespace-nowrap px-3 py-2"
                    style={{ borderTop: i === 0 ? undefined : "1px solid var(--border)" }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

function optionState(revealed: boolean, isAnswer: boolean, isPicked: boolean) {
  if (!revealed) return isPicked ? "picked" : "idle";
  if (isAnswer) return "correct";
  if (isPicked) return "wrong";
  return "idle";
}

/** ป้ายกำกับตอนเฉลยข้อหลายคำตอบ — บอกแยกว่าพลาดเพราะ "ไม่ได้เลือก" หรือ "เลือกเกิน" */
function multiVerdict(isAnswer: boolean, isPicked: boolean): { label: string; tone: "ok" | "bad" | "soft" } {
  if (isAnswer && isPicked) return { label: "ต้องเลือก — เลือกถูกแล้ว — ", tone: "ok" };
  if (isAnswer && !isPicked) return { label: "ต้องเลือก — แต่ไม่ได้เลือก — ", tone: "bad" };
  if (!isAnswer && isPicked) return { label: "ไม่ต้องเลือก — แต่เลือกมา — ", tone: "bad" };
  return { label: "ไม่ต้องเลือก — ", tone: "soft" };
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
  const [picks, setPicks] = useState<string[]>(() => decodeMulti(answerValue));
  const [error, setError] = useState("");

  const mcq = isMcq(question);
  const multi = isMulti(question);
  const chapter = CHAPTER_BY_ID.get(question.chapter);

  const answerSet = multi ? new Set(question.answers) : null;
  const submittedPicks = multi ? decodeMulti(answerValue) : [];
  const correct = mcq
    ? answerValue === question.answer
    : multi
      ? Boolean(answerValue) && checkMulti(submittedPicks, question.answers)
      : Boolean(answerValue) && checkNumeric(answerValue ?? "", question.answer, question.tolerance);

  function togglePick(id: string) {
    setPicks((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
    if (error) setError("");
  }

  function submitMulti() {
    if (!multi) return;
    if (picks.length === 0) {
      setError("เลือกอย่างน้อย 1 ข้อก่อน");
      return;
    }
    setError("");
    onAnswer(encodeMulti(picks), checkMulti(picks, question.answers));
  }

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
    if (!mcq && !multi) onAnswer(numericInput, checkNumeric(numericInput, question.answer, question.tolerance));
  }

  return (
    <article className="panel p-5 sm:p-6">
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="meta">
          {chapter ? `${SUBJECT_BY_ID.get(chapter.subject)?.name} · ` : null}บทที่ {chapter?.number} ·{" "}
          {question.source === "past" ? "ข้อสอบจากควิซ" : "ข้อฝึกเพิ่ม"} ·{" "}
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

      {question.table
        ? (Array.isArray(question.table) ? question.table : [question.table]).map((t, i) => (
            <DataTable key={t.caption ?? i} table={t} />
          ))
        : null}
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
      ) : multi ? (
        <div className="mt-5">
          <p className="mb-3 font-semibold">
            เลือกได้มากกว่า 1 ข้อ — ต้องเลือกให้ครบทุกข้อที่ถูก
          </p>
          <ul className="flex flex-col gap-3">
            {choices.map((c, i) => {
              const isAnswer = answerSet?.has(c.id) ?? false;
              const isPicked = revealed ? submittedPicks.includes(c.id) : picks.includes(c.id);
              const verdict = multiVerdict(isAnswer, isPicked);
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    disabled={revealed}
                    aria-pressed={isPicked}
                    onClick={() => togglePick(c.id)}
                    data-state={optionState(revealed, isAnswer, isPicked)}
                    className="opt disabled:cursor-default"
                  >
                    <span className="mr-2 font-semibold" style={{ color: "var(--text-soft)" }}>
                      {isPicked ? "☑" : "☐"} {String.fromCharCode(97 + i)}.
                    </span>
                    {c.text}
                    {revealed ? (
                      <span className="mt-2 block text-[16px]" style={{ color: "var(--text-soft)" }}>
                        <span
                          className="font-semibold"
                          style={{
                            color:
                              verdict.tone === "ok"
                                ? "var(--ok)"
                                : verdict.tone === "bad"
                                  ? "var(--bad)"
                                  : "var(--text-soft)",
                          }}
                        >
                          {verdict.label}
                        </span>
                        {c.why}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
          {!revealed ? (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button type="button" onClick={submitMulti} className="btn btn-main btn-sm px-6">
                ตรวจคำตอบ
              </button>
              <span className="meta">เลือกไว้ {picks.length} ข้อ</span>
            </div>
          ) : (
            <p className="mt-4">
              เฉลย{" "}
              <span className="font-semibold">
                {question.answers.length} ข้อ ได้แก่{" "}
                {question.answers
                  .map((id) => {
                    const at = choices.findIndex((c) => c.id === id);
                    return at >= 0 ? String.fromCharCode(97 + at) : id;
                  })
                  .sort()
                  .join(", ")}
              </span>
            </p>
          )}
          {error ? (
            <p className="mt-2 font-semibold" style={{ color: "var(--bad)" }}>
              {error}
            </p>
          ) : null}
        </div>
      ) : (
        <div className="mt-5">
          <p className="mb-2 font-semibold">
            กรอกคำตอบเป็นตัวเลข{question.unit ? ` (หน่วย ${question.unit})` : ""}
          </p>
          {question.hint ? <p className="meta mb-2">{question.hint}</p> : null}
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

          {!mcq && !multi ? (
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
