"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { QUESTIONS_BY_CHAPTER } from "@/data";
import { CHAPTERS } from "@/data/tags";
import { availableCount, createSession, pickEvenly } from "@/lib/session";
import { startSession } from "@/lib/store";
import { PageHeader, Shell, SliderRow } from "@/components/ui";
import type { ChapterId } from "@/lib/types";

const READY_CHAPTERS = CHAPTERS.filter((c) => QUESTIONS_BY_CHAPTER[c.id].length > 0);

const formatMinutes = (m: number) => (m === 0 ? "ไม่จับเวลา" : `${m} นาที`);
const formatCount = (n: number) => `${n} ข้อ`;

export default function StartPage() {
  const router = useRouter();
  const [timeLimitMin, setTimeLimitMin] = useState(0);
  const [selected, setSelected] = useState<ChapterId[]>([]);
  const [count, setCount] = useState(20);

  // ไม่เลือกบทใดเลย = ใช้ทุกบท ผู้ใช้จึงไม่ต้องกดอะไรถ้าอยากได้ทั้งหมด
  const chapters = selected.length ? selected : READY_CHAPTERS.map((c) => c.id);
  const pool = useMemo(() => availableCount(chapters), [chapters]);
  const finalCount = Math.min(count, pool);

  function toggleChapter(id: ChapterId) {
    setSelected((list) => (list.includes(id) ? list.filter((c) => c !== id) : [...list, id]));
  }

  function start() {
    const questions = pickEvenly(chapters, finalCount);
    if (!questions.length) return;
    startSession(
      createSession({
        mode: "mixed",
        chapters,
        questionIds: questions.map((q) => q.id),
        timeLimitMin,
      })
    );
    router.push("/quiz");
  }

  return (
    <Shell>
      <PageHeader title="ทำแบบทดสอบ" />

      <div className="flex flex-col gap-8">
        <SliderRow
          label="จับเวลาหรือไม่"
          value={timeLimitMin}
          min={0}
          max={90}
          step={5}
          format={formatMinutes}
          onChange={setTimeLimitMin}
        />

        <div>
          <p className="mb-1 font-semibold">เลือกบท</p>
          <p className="meta mb-2">ถ้าไม่กดเลือกเลย จะออกข้อสอบจากทุกบท</p>
          <div className="flex flex-wrap gap-2">
            {READY_CHAPTERS.map((c) => {
              const active = selected.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggleChapter(c.id)}
                  aria-pressed={active}
                  className="btn btn-sm"
                  style={
                    active ? { background: "var(--clay)", borderColor: "var(--clay)", color: "var(--on-clay)" } : undefined
                  }
                >
                  บทที่ {c.number}
                </button>
              );
            })}
            {selected.length ? (
              <button type="button" onClick={() => setSelected([])} className="btn btn-sm">
                ล้างที่เลือก
              </button>
            ) : null}
          </div>
        </div>

        <div>
          <SliderRow
            label="จำนวนข้อ"
            value={finalCount}
            min={1}
            max={Math.max(1, pool)}
            format={formatCount}
            onChange={setCount}
          />
          <p className="meta mt-1">แบ่งจำนวนข้อให้เท่า ๆ กันทุกบทที่เลือก</p>
        </div>

        <button type="button" onClick={start} disabled={finalCount === 0} className="btn btn-main">
          เริ่มทำแบบทดสอบ
        </button>
      </div>
    </Shell>
  );
}
