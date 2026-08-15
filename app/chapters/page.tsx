"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { QUESTIONS_BY_CHAPTER } from "@/data";
import { CHAPTERS } from "@/data/tags";
import { createSession, pickEvenly } from "@/lib/session";
import { startSession } from "@/lib/store";
import { PageHeader, Shell, SliderRow } from "@/components/ui";
import type { ChapterId } from "@/lib/types";

const formatMinutes = (m: number) => (m === 0 ? "ไม่จับเวลา" : `${m} นาที`);

export default function ChaptersPage() {
  const router = useRouter();
  const [timeLimitMin, setTimeLimitMin] = useState(0);

  function start(chapter: ChapterId) {
    const questions = pickEvenly([chapter], QUESTIONS_BY_CHAPTER[chapter].length);
    if (!questions.length) return;
    startSession(
      createSession({
        mode: "chapter",
        chapters: [chapter],
        questionIds: questions.map((q) => q.id),
        timeLimitMin,
      })
    );
    router.push("/quiz");
  }

  return (
    <Shell>
      <PageHeader title="แบบทดสอบรายบท" />

      <div className="mb-8">
        <SliderRow
          label="จับเวลาหรือไม่"
          value={timeLimitMin}
          min={0}
          max={90}
          step={5}
          format={formatMinutes}
          onChange={setTimeLimitMin}
        />
      </div>

      <p className="mb-1 font-semibold">กดชื่อบทเพื่อเริ่มได้เลย</p>
      <p className="meta mb-3">จะได้ข้อสอบทั้งหมดของบทนั้น</p>

      <div className="flex flex-col gap-3">
        {CHAPTERS.map((c) => {
          const total = QUESTIONS_BY_CHAPTER[c.id].length;
          return (
            <button
              key={c.id}
              type="button"
              disabled={total === 0}
              onClick={() => start(c.id)}
              className="btn justify-between text-left"
            >
              <span>
                <span className="font-semibold">บทที่ {c.number}</span>
                <span className="meta block">{c.titleEn}</span>
              </span>
              <span className="meta shrink-0">{total === 0 ? "ยังไม่มีข้อสอบ" : `${total} ข้อ`}</span>
            </button>
          );
        })}
      </div>
    </Shell>
  );
}
