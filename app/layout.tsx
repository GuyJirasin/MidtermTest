import type { Metadata } from "next";
import { Noto_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import "./globals.css";

/** ตัวอักษรของส่วนควบคุม (ปุ่ม ป้าย เมนู) */
const notoThai = Noto_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600"],
});

/** ตัวอักษรของเนื้อหาที่ต้องอ่าน (โจทย์ ตัวเลือก คำอธิบาย) แบบเดียวกับที่ Claude ใช้ */
const notoSerifThai = Noto_Serif_Thai({
  variable: "--font-thai-serif",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Test MM",
  description: "แอปทดสอบตัวเองสำหรับสอบกลางภาควิชา Multimedia Technology",
};

const themeScript = `(function(){try{var t=localStorage.getItem('mm-quiz-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${notoThai.variable} ${notoSerifThai.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full bg-slate-50 font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
