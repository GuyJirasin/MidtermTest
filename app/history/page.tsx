"use client";

import { useRouter } from "next/navigation";
import { CHAPTER_BY_ID, SUBJECT_BY_ID } from "@/data/tags";
import { formatWhen } from "@/lib/quiz";
import { scoreOf, subjectOf, type QuizSession } from "@/lib/session";
import { clearAll, deleteSession, openSession, useVault } from "@/lib/store";
import { PageHeader, Shell } from "@/components/ui";

function describe(session: QuizSession): string {
  const subject = SUBJECT_BY_ID.get(subjectOf(session))?.name ?? "";
  if (session.mode === "chapter" && session.chapters[0]) {
    return `${subject} · รายบท บทที่ ${CHAPTER_BY_ID.get(session.chapters[0])?.number}`;
  }
  if (session.chapters.length === 1) {
    return `${subject} · บทที่ ${CHAPTER_BY_ID.get(session.chapters[0])?.number}`;
  }
  return `${subject} · รวมหลายบท`;
}

export default function HistoryPage() {
  const router = useRouter();
  const vault = useVault();

  function open(session: QuizSession) {
    openSession(session.id);
    router.push("/quiz");
  }

  return (
    <Shell>
      <PageHeader title="ประวัติการทดสอบ" />

      {vault.sessions.length === 0 ? (
        <p className="meta">ยังไม่มีประวัติ ลองทำแบบทดสอบสักชุดก่อน</p>
      ) : (
        <div className="flex flex-col gap-3">
          {vault.sessions.map((s) => {
            const score = scoreOf(s);
            const done = s.finishedAt !== null;
            return (
              <div key={s.id} className="panel p-5">
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold">{describe(s)}</p>
                  <p className="meta">{formatWhen(s.startedAt)}</p>
                </div>

                <p className="mb-4">
                  {done ? (
                    <>
                      เสร็จแล้ว · ได้{" "}
                      <span className="font-semibold">
                        {score.correct} จาก {score.total}
                      </span>{" "}
                      ข้อ
                    </>
                  ) : (
                    <>
                      ยังทำไม่จบ · ทำไปแล้ว {score.answered} จาก {score.total} ข้อ
                    </>
                  )}
                  {s.timeLimitMin ? <span className="meta"> · จับเวลา {s.timeLimitMin} นาที</span> : null}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => open(s)} className="btn btn-sm btn-main px-5">
                    {done ? "ดูสถิติและเฉลย" : "ทำต่อ"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm("ลบประวัติชุดนี้?")) deleteSession(s.id);
                    }}
                    className="btn btn-sm"
                  >
                    ลบ
                  </button>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => {
              if (window.confirm("ลบประวัติทั้งหมด? ย้อนกลับไม่ได้")) clearAll();
            }}
            className="btn"
            style={{ color: "var(--bad)" }}
          >
            ลบประวัติทั้งหมด
          </button>
        </div>
      )}
    </Shell>
  );
}
