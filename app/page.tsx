"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CHAPTER_BY_ID } from "@/data/tags";
import { scoreOf } from "@/lib/session";
import { openSession, unfinishedSession, useVault } from "@/lib/store";
import { ThemeToggle } from "@/components/ui";

export default function HomePage() {
  const router = useRouter();
  const vault = useVault();
  const pending = unfinishedSession(vault);

  function resume() {
    if (!pending) return;
    openSession(pending.id);
    router.push("/quiz");
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 py-8 sm:px-6">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold">Test MM</h1>
          <p className="meta">Made by Guy &amp; Claude</p>
        </div>
        <ThemeToggle />
      </header>

      {/* หัวเรื่องอยู่บนสุดเสมอ ส่วนปุ่มเมนูจัดกึ่งกลางในพื้นที่ที่เหลือ */}
      <div className="flex flex-1 flex-col justify-center py-8">
        {pending ? (
          <section className="panel mb-6 p-5">
            <p className="mb-1 font-semibold">คุณทำค้างไว้</p>
            <p className="meta mb-4">
              {pending.mode === "chapter" && pending.chapters[0]
                ? `บทที่ ${CHAPTER_BY_ID.get(pending.chapters[0])?.number} · `
                : "แบบทดสอบรวม · "}
              ทำไปแล้ว {scoreOf(pending).answered} จาก {scoreOf(pending).total} ข้อ
            </p>
            <button type="button" onClick={resume} className="btn btn-main">
              ทำต่อจากที่ค้างไว้
            </button>
          </section>
        ) : null}

        <nav className="flex flex-col gap-4">
          <Link href="/start" className="btn btn-main">
            ทำแบบทดสอบ
          </Link>
          <Link href="/chapters" className="btn">
            แบบทดสอบรายบท
          </Link>
          <Link href="/history" className="btn">
            ประวัติการทดสอบ
          </Link>
        </nav>
      </div>
    </div>
  );
}
