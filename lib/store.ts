"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_SUBJECT, SUBJECTS } from "@/data/tags";
import type { QuizSession } from "./session";
import type { SubjectId } from "./types";

const KEY = "mm-quiz-sessions-v2";
const MAX_SESSIONS = 60;

interface Vault {
  /** เรียงจากใหม่ไปเก่า */
  sessions: QuizSession[];
  /** ชุดที่กำลังเปิดอยู่ในหน้าทำข้อสอบ */
  activeId: string | null;
}

const EMPTY: Vault = { sessions: [], activeId: null };

let cache: Vault | null = null;
const listeners = new Set<() => void>();

function read(): Vault {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Vault;
    return { sessions: parsed.sessions ?? [], activeId: parsed.activeId ?? null };
  } catch {
    return EMPTY;
  }
}

function write(vault: Vault) {
  cache = vault;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(vault));
    } catch {
      // เต็มหรือถูกปิดไว้ — ข้ามไปโดยไม่ทำให้แอปพัง
    }
  }
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Vault {
  if (!cache) cache = read();
  return cache;
}

function getServerSnapshot(): Vault {
  return EMPTY;
}

export function useVault(): Vault {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function saveSession(session: QuizSession) {
  const vault = getSnapshot();
  const rest = vault.sessions.filter((s) => s.id !== session.id);
  write({ sessions: [session, ...rest].slice(0, MAX_SESSIONS), activeId: vault.activeId });
}

export function startSession(session: QuizSession) {
  const vault = getSnapshot();
  const rest = vault.sessions.filter((s) => s.id !== session.id);
  write({ sessions: [session, ...rest].slice(0, MAX_SESSIONS), activeId: session.id });
}

export function openSession(id: string) {
  write({ ...getSnapshot(), activeId: id });
}

export function getSession(id: string | null): QuizSession | null {
  if (!id) return null;
  return getSnapshot().sessions.find((s) => s.id === id) ?? null;
}

export function deleteSession(id: string) {
  const vault = getSnapshot();
  write({
    sessions: vault.sessions.filter((s) => s.id !== id),
    activeId: vault.activeId === id ? null : vault.activeId,
  });
}

export function clearAll() {
  write(EMPTY);
}

/** ชุดล่าสุดที่ยังทำไม่จบ ใช้แสดงปุ่ม "ทำต่อ" บนหน้าแรก */
export function unfinishedSession(vault: Vault): QuizSession | null {
  return vault.sessions.find((s) => s.finishedAt === null) ?? null;
}

/** วิชาที่เลือกไว้ล่าสุด เก็บแยกจาก vault เพราะเป็นแค่ค่าตั้งของหน้าจอ */
const SUBJECT_KEY = "quiz-subject";

let subjectCache: SubjectId | null = null;
const subjectListeners = new Set<() => void>();

function subscribeSubject(listener: () => void) {
  subjectListeners.add(listener);
  return () => {
    subjectListeners.delete(listener);
  };
}

function readSubject(): SubjectId {
  if (typeof window === "undefined") return DEFAULT_SUBJECT;
  try {
    const raw = window.localStorage.getItem(SUBJECT_KEY);
    // เทียบกับรายชื่อวิชาจริง ไม่ hardcode ไว้ตรงนี้ เพิ่มวิชาใหม่แล้วจะได้ไม่ลืมแก้
    return SUBJECTS.some((s) => s.id === raw) ? (raw as SubjectId) : DEFAULT_SUBJECT;
  } catch {
    return DEFAULT_SUBJECT;
  }
}

export function useSubject(): SubjectId {
  return useSyncExternalStore(
    subscribeSubject,
    () => {
      if (!subjectCache) subjectCache = readSubject();
      return subjectCache;
    },
    () => DEFAULT_SUBJECT
  );
}

export function setSubject(subject: SubjectId) {
  subjectCache = subject;
  try {
    window.localStorage.setItem(SUBJECT_KEY, subject);
  } catch {
    // ปิด localStorage ไว้ — ยังใช้งานต่อได้ในรอบนี้
  }
  for (const listener of subjectListeners) listener();
}

/** โหมดสว่าง/มืด อยู่บน class ของ <html> ซึ่งเป็น external store เช่นกัน */
const themeListeners = new Set<() => void>();

function subscribeTheme(listener: () => void) {
  themeListeners.add(listener);
  return () => {
    themeListeners.delete(listener);
  };
}

export function useIsDark(): boolean {
  return useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.classList.contains("dark"),
    () => false
  );
}

export function setDarkMode(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.setItem("mm-quiz-theme", dark ? "dark" : "light");
  } catch {
    // ignore
  }
  for (const listener of themeListeners) listener();
}
