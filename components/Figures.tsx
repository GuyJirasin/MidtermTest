import type { ReactNode } from "react";

const frameClass = "rounded-2xl border-2 p-4";
const frameStyle = { background: "var(--card)", borderColor: "var(--border)" };

function Caption({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 text-center text-xs" style={{ color: "var(--text-soft)" }}>
      {children}
    </p>
  );
}

/** CH2 ข้อ 8 — ภาพต้นฉบับไล่เฉดต่อเนื่อง เทียบกับภาพที่ใช้บิตน้อยจนเกิด banding */
function Posterization() {
  const steps = [235, 200, 165, 130, 95, 60, 25];
  return (
    <div className={frameClass} style={frameStyle}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <svg viewBox="0 0 200 120" className="w-full rounded-lg" role="img" aria-label="ภาพต้นฉบับที่ไล่เฉดสีเทาอย่างต่อเนื่อง">
            <defs>
              <linearGradient id="fig-smooth" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f2f2f2" />
                <stop offset="100%" stopColor="#101010" />
              </linearGradient>
            </defs>
            <rect width="200" height="120" fill="url(#fig-smooth)" />
          </svg>
          <Caption>ภาพต้นฉบับ (ซ้าย)</Caption>
        </div>
        <div>
          <svg viewBox="0 0 200 120" className="w-full rounded-lg" role="img" aria-label="ภาพเดียวกันที่ไล่เฉดเป็นแถบ ๆ แบบ posterization">
            {steps.map((v, i) => (
              <rect
                key={v}
                x={(i * 200) / steps.length}
                y={0}
                width={200 / steps.length + 0.5}
                height={120}
                fill={`rgb(${v},${v},${v})`}
              />
            ))}
          </svg>
          <Caption>ภาพหลังผ่านกระบวนการ (ขวา)</Caption>
        </div>
      </div>
    </div>
  );
}

/** CH3 ข้อ 9 — ตารางพิกเซล 5x5 กับ mean filter 3x3 */
function Convolution() {
  const grid = [
    [70, 72, 75, 78, 80],
    [74, 90, 95, 100, 82],
    [76, 85, 92, 88, 84],
    [79, 95, 90, 93, 86],
    [81, 83, 85, 87, 89],
  ];
  const cell = 38;
  return (
    <div className={frameClass} style={frameStyle}>
      <div className="flex flex-wrap items-center justify-center gap-6">
        <div>
          <svg viewBox="0 0 200 200" className="w-52" role="img" aria-label="ตารางค่าพิกเซลขนาด 5 คูณ 5">
            {grid.map((row, r) =>
              row.map((v, c) => {
                const inWindow = r >= 1 && r <= 3 && c >= 1 && c <= 3;
                return (
                  <g key={`${r}-${c}`}>
                    <rect
                      x={c * cell + 5}
                      y={r * cell + 5}
                      width={cell}
                      height={cell}
                      className={inWindow ? "fill-amber-100 dark:fill-amber-500/20" : "fill-transparent"}
                      stroke="currentColor"
                      strokeWidth="0.7"
                      opacity={inWindow ? 1 : 0.55}
                    />
                    <text
                      x={c * cell + 5 + cell / 2}
                      y={r * cell + 5 + cell / 2 + 4}
                      textAnchor="middle"
                      fontSize="13"
                      fill="currentColor"
                    >
                      {v}
                    </text>
                  </g>
                );
              })
            )}
            <rect
              x={2 * cell + 5}
              y={2 * cell + 5}
              width={cell}
              height={cell}
              fill="none"
              stroke="#dc2626"
              strokeWidth="2.5"
            />
          </svg>
          <Caption>ภาพต้นฉบับ — กรอบแดงคือพิกเซลที่ถาม</Caption>
        </div>
        <div>
          <svg viewBox="0 0 130 130" className="w-32" role="img" aria-label="เคอร์เนลขนาด 3 คูณ 3 ที่ทุกช่องมีค่า 1 ส่วน 9">
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => (
                <g key={`${r}-${c}`}>
                  <rect
                    x={c * 40 + 5}
                    y={r * 40 + 5}
                    width={40}
                    height={40}
                    className="fill-sky-50 dark:fill-sky-500/15"
                    stroke="currentColor"
                    strokeWidth="0.7"
                  />
                  <text x={c * 40 + 25} y={r * 40 + 30} textAnchor="middle" fontSize="13" fill="currentColor">
                    1/9
                  </text>
                </g>
              ))
            )}
          </svg>
          <Caption>filter kernel 3×3</Caption>
        </div>
      </div>
    </div>
  );
}

const LOCUS: [number, number][] = [
  [0.1741, 0.005],
  [0.0913, 0.1327],
  [0.0454, 0.295],
  [0.0082, 0.5384],
  [0.0139, 0.7502],
  [0.0743, 0.8338],
  [0.2296, 0.7543],
  [0.3731, 0.6245],
  [0.5125, 0.4866],
  [0.627, 0.3725],
  [0.6915, 0.3083],
  [0.7347, 0.2653],
];

const px = (x: number) => 18 + x * 250;
const py = (y: number) => 235 - y * 250;
const locusPath = LOCUS.map(([x, y], i) => `${i === 0 ? "M" : "L"}${px(x)},${py(y)}`).join(" ") + " Z";

function GamutPanel({
  label,
  primaries,
  color,
}: {
  label: string;
  primaries: [number, number][];
  color: string;
}) {
  const tri = primaries.map(([x, y], i) => `${i === 0 ? "M" : "L"}${px(x)},${py(y)}`).join(" ") + " Z";
  return (
    <div>
      <svg viewBox="0 0 290 260" className="w-full" role="img" aria-label={`chromaticity diagram พร้อม color gamut ของ ${label}`}>
        <path d={locusPath} className="fill-slate-100 dark:fill-slate-700/50" stroke="currentColor" strokeWidth="1.2" />
        <path d={tri} fill={color} fillOpacity="0.22" stroke={color} strokeWidth="2" />
        {primaries.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={px(x)} cy={py(y)} r="3.5" fill={color} />
        ))}
        <text x={px(0.02)} y={py(0.88)} fontSize="12" fill="currentColor">
          y
        </text>
        <text x={px(0.78)} y={py(0.02)} fontSize="12" fill="currentColor">
          x
        </text>
      </svg>
      <Caption>{label}</Caption>
    </div>
  );
}

/** CH4 ข้อ 9 — เทียบ gamut ของจอ CRT กับ LCD */
function GamutCrtLcd() {
  return (
    <div className={frameClass} style={frameStyle}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <GamutPanel
          label="จอ CRT (ซ้าย)"
          color="#0284c7"
          primaries={[
            [0.63, 0.34],
            [0.31, 0.595],
            [0.155, 0.07],
          ]}
        />
        <GamutPanel
          label="จอ LCD (ขวา)"
          color="#16a34a"
          primaries={[
            [0.68, 0.32],
            [0.21, 0.71],
            [0.15, 0.06],
          ]}
        />
      </div>
    </div>
  );
}

/** CH5 ข้อ 4 — ผังการเก็บตัวอย่าง Y/Cb/Cr ในบล็อก 4x2 */
function Subsampling420() {
  const cell = 62;
  const cells = [];
  for (let r = 0; r < 2; r += 1) {
    for (let c = 0; c < 4; c += 1) {
      const hasChroma = r === 0 && c % 2 === 0;
      cells.push(
        <g key={`${r}-${c}`}>
          <rect
            x={c * cell + 6}
            y={r * cell + 6}
            width={cell}
            height={cell}
            className={hasChroma ? "fill-violet-50 dark:fill-violet-500/15" : "fill-transparent"}
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <text x={c * cell + 6 + cell / 2} y={r * cell + 6 + (hasChroma ? 26 : cell / 2 + 5)} textAnchor="middle" fontSize="15" fill="currentColor">
            Y
          </text>
          {hasChroma && (
            <text x={c * cell + 6 + cell / 2} y={r * cell + 6 + 48} textAnchor="middle" fontSize="14" fill="#7c3aed">
              Cb Cr
            </text>
          )}
        </g>
      );
    }
  }
  return (
    <div className={frameClass} style={frameStyle}>
      <svg viewBox="0 0 260 136" className="mx-auto w-full max-w-md" role="img" aria-label="ผังตัวอย่าง Y, Cb, Cr ในบล็อกขนาด 4 คูณ 2 พิกเซล">
        {cells}
      </svg>
      <Caption>บล็อกขนาด 4 × 2 พิกเซล — ทุกช่องมีค่า Y ส่วนค่าสี Cb, Cr มีเฉพาะบางตำแหน่ง</Caption>
    </div>
  );
}

/** CH5 ข้อ 9 — motion estimation ระหว่างเฟรมอ้างอิงกับเฟรมปัจจุบัน */
function MotionVector() {
  return (
    <div className={frameClass} style={frameStyle}>
      <svg viewBox="0 0 420 190" className="w-full" role="img" aria-label="แผนภาพ motion vector ระหว่างเฟรมอ้างอิงและเฟรมปัจจุบัน">
        <defs>
          <marker id="fig-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#dc2626" />
          </marker>
        </defs>

        <rect x="10" y="20" width="180" height="130" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="80" cy="80" r="26" className="fill-sky-200 dark:fill-sky-500/40" />
        <rect x="54" y="54" width="52" height="52" fill="none" stroke="#dc2626" strokeWidth="2.5" />
        <text x="100" y="168" textAnchor="middle" fontSize="13" fill="currentColor">
          เฟรมอ้างอิง
        </text>

        <rect x="230" y="20" width="180" height="130" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="330" cy="105" r="26" className="fill-sky-200 dark:fill-sky-500/40" />
        <rect x="274" y="54" width="52" height="52" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="5 4" />
        <rect x="304" y="79" width="52" height="52" fill="none" stroke="#dc2626" strokeWidth="2.5" />
        <line x1="300" y1="80" x2="326" y2="102" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#fig-arrow)" />
        <text x="292" y="76" fontSize="15" fontStyle="italic" fill="#dc2626">
          v
        </text>
        <text x="320" y="168" textAnchor="middle" fontSize="13" fill="currentColor">
          เฟรมปัจจุบัน
        </text>
      </svg>
      <Caption>เส้นประคือตำแหน่งเดิมของบล็อก ส่วน v คือการกระจัดที่วัดได้</Caption>
    </div>
  );
}

const FIGURES: Record<string, () => ReactNode> = {
  posterization: Posterization,
  convolution: Convolution,
  "gamut-crt-lcd": GamutCrtLcd,
  "subsampling-420": Subsampling420,
  "motion-vector": MotionVector,
};

export function Figure({ name }: { name: string }) {
  const Component = FIGURES[name];
  if (!Component) return null;
  return (
    <div className="my-4" style={{ color: "var(--text)" }}>
      <Component />
    </div>
  );
}
