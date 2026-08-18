"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { QUESTION_BY_ID } from "@/data";
import { CHAPTER_BY_ID, tagLabel } from "@/data/tags";
import { QuestionCard } from "@/components/QuestionCard";
import { Shell } from "@/components/ui";
import { formatClock, isMcq, shuffleChoices } from "@/lib/quiz";
import { createSession, scoreOf, subjectOf, type QuizSession } from "@/lib/session";
import { saveSession, startSession, useVault } from "@/lib/store";
import type { ChapterId, Choice, Question } from "@/lib/types";

export default function QuizPage() {
  const router = useRouter();
  const vault = useVault();
  const session = vault.sessions.find((s) => s.id === vault.activeId) ?? null;

  const [view, setView] = useState<"result" | "review" | null>(null);
  /** วินาทีที่เดินไปแล้วนับจากครั้งล่าสุดที่บันทึกลงเครื่อง */
  const [extraSec, setExtraSec] = useState(0);

  const questionIds = session?.questionIds;
  const questions: Question[] = useMemo(() => {
    if (!questionIds) return [];
    return questionIds.map((id) => QUESTION_BY_ID.get(id)).filter((q): q is Question => Boolean(q));
  }, [questionIds]);

  // สลับตัวเลือกครั้งเดียวต่อชุด ไม่ให้ตัวเลือกขยับไปมาระหว่างเลื่อนดูข้อ
  const choiceMap = useMemo(() => {
    const map: Record<string, Choice[]> = {};
    for (const q of questions) if (isMcq(q)) map[q.id] = shuffleChoices(q.choices);
    return map;
  }, [questions]);

  const baseElapsed = session?.elapsedSec ?? 0;
  const limitSec = (session?.timeLimitMin ?? 0) * 60;
  const timed = limitSec > 0;
  const finished = Boolean(session?.finishedAt);
  const remaining = timed ? Math.max(0, limitSec - (baseElapsed + extraSec)) : 0;

  /** บันทึกลง localStorage พร้อมเก็บเวลาที่เดินไปแล้ว */
  const commit = useCallback(
    (patch: Partial<QuizSession>, extra: number) => {
      if (!session) return;
      saveSession({ ...session, elapsedSec: baseElapsed + extra, ...patch });
      setExtraSec(0);
    },
    [session, baseElapsed]
  );

  useEffect(() => {
    if (!timed || finished || view) return;
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const extra = Math.floor((Date.now() - startedAt) / 1000);
      if (baseElapsed + extra >= limitSec) {
        window.clearInterval(timer);
        commit({ finishedAt: Date.now() }, extra);
        setView("result");
      } else if (extra >= 15) {
        // จดเวลาลงเครื่องทุก 15 วินาที ถ้าปิดหน้าไปกลางคันจะเสียเวลาไม่เกินเท่านี้
        window.clearInterval(timer);
        commit({}, extra);
      } else {
        setExtraSec(extra);
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [timed, finished, view, baseElapsed, limitSec, commit]);

  const persist = useCallback((patch: Partial<QuizSession>) => commit(patch, extraSec), [commit, extraSec]);

  const finish = useCallback(() => {
    if (!session || session.finishedAt) return;
    persist({ finishedAt: Date.now() });
    setView("result");
  }, [persist, session]);

  if (!session || questions.length === 0) {
    return (
      <Shell>
        <p className="mb-5">ยังไม่ได้เลือกแบบทดสอบ</p>
        <Link href="/" className="btn btn-main">
          กลับหน้าแรก
        </Link>
      </Shell>
    );
  }

  const showing = view ?? (session.finishedAt ? "result" : "quiz");
  const score = scoreOf(session);

  if (showing === "result") {
    const pct = score.total ? Math.round((score.correct / score.total) * 100) : 0;
    const byChapter = new Map<ChapterId, { total: number; correct: number }>();
    const byTag = new Map<string, { total: number; correct: number }>();
    for (const q of questions) {
      const ok = session.answers[q.id]?.correct ? 1 : 0;
      const c = byChapter.get(q.chapter) ?? { total: 0, correct: 0 };
      byChapter.set(q.chapter, { total: c.total + 1, correct: c.correct + ok });
      for (const t of q.tags) {
        const e = byTag.get(t) ?? { total: 0, correct: 0 };
        byTag.set(t, { total: e.total + 1, correct: e.correct + ok });
      }
    }
    const weak = [...byTag.entries()]
      .filter(([, v]) => v.correct < v.total)
      .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
      .slice(0, 6);
    const wrongIds = questions.filter((q) => session.answers[q.id] && !session.answers[q.id].correct).map((q) => q.id);

    function retryWrong() {
      if (!session || !wrongIds.length) return;
      startSession(
        createSession({
          subject: subjectOf(session),
          mode: session.mode,
          chapters: session.chapters,
          questionIds: wrongIds,
          timeLimitMin: 0,
        })
      );
      setView(null);
      router.push("/quiz");
    }

    return (
      <Shell>
        <section className="panel mb-5 p-6 text-center">
          <p className="meta">คะแนนที่ได้</p>
          <p className="my-1 text-4xl font-semibold">
            {score.correct} จาก {score.total}
          </p>
          <p className="meta">
            คิดเป็น {pct}% · ตอบไปแล้ว {score.answered} ข้อ
          </p>
        </section>

        <section className="panel mb-5 p-5">
          <p className="mb-3 font-semibold">แยกตามบท</p>
          <ul className="flex flex-col gap-2">
            {[...byChapter.entries()].map(([ch, v]) => (
              <li key={ch} className="flex justify-between gap-3">
                <span>บทที่ {CHAPTER_BY_ID.get(ch)?.number}</span>
                <span className="meta">
                  {v.correct} / {v.total}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {weak.length ? (
          <section className="panel mb-5 p-5">
            <p className="mb-3 font-semibold">หัวข้อที่ควรกลับไปอ่าน</p>
            <ul className="flex flex-col gap-2">
              {weak.map(([tag, v]) => (
                <li key={tag} className="flex justify-between gap-3">
                  <span>{tagLabel(tag)}</span>
                  <span className="meta">
                    {v.correct} / {v.total}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              persist({ index: 0 });
              setView("review");
            }}
            className="btn btn-main"
          >
            ดูเฉลยทีละข้อ
          </button>
          {wrongIds.length ? (
            <button type="button" onClick={retryWrong} className="btn">
              ทำเฉพาะข้อที่ผิดอีกครั้ง ({wrongIds.length} ข้อ)
            </button>
          ) : null}
          <Link href="/" className="btn">
            กลับหน้าแรก
          </Link>
        </div>
      </Shell>
    );
  }

  const reviewing = showing === "review";
  const index = Math.min(session.index, questions.length - 1);
  const current = questions[index];
  const answered = session.answers[current.id];
  const revealed = reviewing || Boolean(answered);
  const isLast = index === questions.length - 1;

  function goTo(next: number) {
    persist({ index: Math.max(0, Math.min(questions.length - 1, next)) });
  }

  function handleAnswer(value: string, correct: boolean) {
    if (!session) return;
    persist({ answers: { ...session.answers, [current.id]: { value, correct } } });
  }

  function handleBookmark() {
    if (!session) return;
    const has = session.bookmarks.includes(current.id);
    persist({
      bookmarks: has ? session.bookmarks.filter((b) => b !== current.id) : [...session.bookmarks, current.id],
    });
  }

  return (
    <Shell>
      <div className="dock-space">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link href="/" className="btn btn-sm">
            ← ออก
          </Link>
          <p className="font-semibold">
            ข้อ {index + 1} / {questions.length}
            {reviewing ? " · ดูเฉลย" : ""}
          </p>
          {timed && !reviewing ? (
            <p className="font-semibold tabular-nums" style={{ color: remaining <= 60 ? "var(--bad)" : "var(--text)" }}>
              เหลือ {formatClock(remaining)}
            </p>
          ) : (
            <span className="w-16" />
          )}
        </div>

        <div className="mb-5 h-2 w-full overflow-hidden rounded-full" style={{ background: "var(--border)" }}>
          <div
            className="h-full rounded-full transition-[width] duration-200"
            style={{ width: `${((index + 1) / questions.length) * 100}%`, background: "var(--text)" }}
          />
        </div>

        <QuestionCard
          key={current.id}
          question={current}
          choices={choiceMap[current.id] ?? []}
          answerValue={answered?.value ?? null}
          revealed={revealed}
          bookmarked={session.bookmarks.includes(current.id)}
          onAnswer={handleAnswer}
          onToggleBookmark={handleBookmark}
        />

        {reviewing ? (
          <div className="mt-5">
            <button type="button" onClick={() => setView("result")} className="btn">
              กลับไปหน้าคะแนน
            </button>
          </div>
        ) : null}
      </div>

      <div className="dock">
        <div className="dock-inner">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => goTo(index - 1)}
            className="btn flex-1"
          >
            ข้อก่อนหน้า
          </button>
          {isLast && !reviewing ? (
            <button type="button" onClick={finish} className="btn btn-main flex-1">
              ส่งคำตอบ
            </button>
          ) : (
            <button
              type="button"
              disabled={isLast}
              onClick={() => goTo(index + 1)}
              className="btn btn-main flex-1"
            >
              ข้อถัดไป
            </button>
          )}
        </div>
      </div>
    </Shell>
  );
}
