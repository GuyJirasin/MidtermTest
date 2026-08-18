"use client";

import Link from "next/link";
import { SUBJECTS } from "@/data/tags";
import { setDarkMode, setSubject, useIsDark, useSubject } from "@/lib/store";

export function ThemeToggle() {
  const dark = useIsDark();
  return (
    <button
      type="button"
      onClick={() => setDarkMode(!dark)}
      aria-label={dark ? "เปลี่ยนเป็นพื้นหลังสว่าง" : "เปลี่ยนเป็นพื้นหลังมืด"}
      className="btn btn-sm"
    >
      {dark ? "☀ สว่าง" : "☾ มืด"}
    </button>
  );
}

/** ปุ่มสลับวิชา — ใช้ทั้งหน้าแรกและหน้าตั้งค่าชุดข้อสอบ */
export function SubjectPicker() {
  const current = useSubject();
  return (
    <div>
      <p className="mb-1 font-semibold">เลือกวิชา</p>
      <p className="meta mb-2">เลือกก่อนเริ่มทำ ระบบจะออกข้อสอบเฉพาะวิชานี้</p>
      <div className="flex flex-wrap gap-2">
        {SUBJECTS.map((s) => {
          const active = s.id === current;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSubject(s.id)}
              aria-pressed={active}
              className="btn flex-1 justify-start text-left"
              style={
                active
                  ? { background: "var(--clay)", borderColor: "var(--clay)", color: "var(--on-clay)" }
                  : undefined
              }
            >
              <span>
                <span className="font-semibold">{s.name}</span>
                <span className="block text-[13px] opacity-80">{s.scope}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-8">{children}</div>;
}

/** หัวหน้าจอย่อย — มีปุ่มย้อนกลับใหญ่ ๆ เสมอ */
export function PageHeader({ title, backHref = "/" }: { title: string; backHref?: string }) {
  return (
    <header className="mb-6 flex items-center gap-3">
      <Link href={backHref} className="btn btn-sm shrink-0" aria-label="ย้อนกลับ">
        ← ย้อนกลับ
      </Link>
      <h1 className="text-xl font-semibold">{title}</h1>
    </header>
  );
}

/** แถบเลื่อนพร้อมค่าปัจจุบันตัวใหญ่ ใช้แทนช่องกรอกตัวเลข */
export function SliderRow({
  label,
  value,
  min,
  max,
  step = 1,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <p className="font-semibold">{label}</p>
        <p className="text-xl font-semibold">{format(value)}</p>
      </div>
      <input
        type="range"
        className="slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        aria-valuetext={format(value)}
      />
      <div className="meta flex justify-between">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}
