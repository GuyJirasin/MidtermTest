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

/* ────────── Network ────────── */

/** ตัวช่วยวาดเส้นเวลาของ sender/receiver ใช้ร่วมกันระหว่างรูป ARQ */
function Lifelines({ top, bottom }: { top: number; bottom: number }) {
  return (
    <>
      <text x="46" y={top - 8} textAnchor="middle" fontSize="12" fontWeight="600" fill="currentColor">
        Sender
      </text>
      <text x="274" y={top - 8} textAnchor="middle" fontSize="12" fontWeight="600" fill="currentColor">
        Receiver
      </text>
      <line x1="46" y1={top} x2="46" y2={bottom} stroke="currentColor" strokeWidth="1.5" />
      <line x1="274" y1={top} x2="274" y2={bottom} stroke="currentColor" strokeWidth="1.5" />
    </>
  );
}

/** ลูกศรส่ง segment จาก sender ไป receiver — lost = หายกลางทาง */
function Seg({ y, label, lost, dashed }: { y: number; label: string; lost?: boolean; dashed?: boolean }) {
  const endX = lost ? 180 : 268;
  return (
    <>
      <line
        x1="48"
        y1={y}
        x2={endX}
        y2={y + 10}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeDasharray={dashed ? "4 3" : undefined}
        markerEnd={lost ? undefined : "url(#net-arrow)"}
      />
      <text x="104" y={y - 2} fontSize="11" fill="currentColor">
        {label}
      </text>
      {lost ? (
        <text x="186" y={y + 15} fontSize="14" fontWeight="700" fill="var(--bad)">
          ✕
        </text>
      ) : null}
    </>
  );
}

/** ลูกศรตอบกลับจาก receiver มา sender */
function Ack({ y, label }: { y: number; label: string }) {
  return (
    <>
      <line x1="272" y1={y} x2="52" y2={y + 10} stroke="currentColor" strokeWidth="1.4" markerEnd="url(#net-arrow)" />
      <text x="204" y={y + 20} fontSize="11" fill="currentColor">
        {label}
      </text>
    </>
  );
}

function ArrowDefs() {
  return (
    <defs>
      <marker id="net-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
      </marker>
    </defs>
  );
}

/** องค์ประกอบของ delay ทั้ง 4 ตัวที่ node เดียว */
function NodalDelay() {
  return (
    <div className={frameClass} style={frameStyle}>
      <svg viewBox="0 0 460 196" className="w-full" role="img" aria-label="แผนภาพองค์ประกอบของความหน่วงทั้งสี่ชนิดที่เราเตอร์หนึ่งตัว">
        <ArrowDefs />
        <line x1="8" y1="56" x2="60" y2="56" stroke="currentColor" strokeWidth="1.4" markerEnd="url(#net-arrow)" />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={66 + i * 14}
            y="46"
            width="11"
            height="20"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        ))}
        <circle cx="132" cy="56" r="24" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <text x="132" y="60" textAnchor="middle" fontSize="12" fontWeight="600" fill="currentColor">
          A
        </text>
        <line x1="156" y1="56" x2="340" y2="56" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="366" cy="56" r="24" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <text x="366" y="60" textAnchor="middle" fontSize="12" fontWeight="600" fill="currentColor">
          B
        </text>

        {/* ป้ายกำกับสลับสองแถว เพราะชื่อยาวกว่าช่วงที่มันกำกับ ถ้าวางแถวเดียวจะทับกัน */}
        <line x1="66" y1="82" x2="106" y2="82" stroke="currentColor" strokeWidth="1" />
        <line x1="86" y1="82" x2="86" y2="94" stroke="currentColor" strokeWidth="1" />
        <text x="86" y="106" textAnchor="middle" fontSize="10.5" fill="currentColor">
          queuing
        </text>

        <line x1="158" y1="82" x2="230" y2="82" stroke="currentColor" strokeWidth="1" />
        <line x1="194" y1="82" x2="194" y2="94" stroke="currentColor" strokeWidth="1" />
        <text x="194" y="106" textAnchor="middle" fontSize="10.5" fill="currentColor">
          transmission = L / R
        </text>

        <line x1="110" y1="82" x2="154" y2="82" stroke="currentColor" strokeWidth="1" />
        <line x1="132" y1="82" x2="132" y2="118" stroke="currentColor" strokeWidth="1" />
        <text x="132" y="130" textAnchor="middle" fontSize="10.5" fill="currentColor">
          processing
        </text>

        <line x1="234" y1="82" x2="340" y2="82" stroke="currentColor" strokeWidth="1" />
        <line x1="287" y1="82" x2="287" y2="118" stroke="currentColor" strokeWidth="1" />
        <text x="287" y="130" textAnchor="middle" fontSize="10.5" fill="currentColor">
          propagation = d / s
        </text>

        <text x="230" y="168" textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor">
          d(nodal) = d(proc) + d(queue) + d(trans) + d(prop)
        </text>
      </svg>
      <Caption>ความหน่วงที่ node เดียว — transmission ขึ้นกับขนาดแพ็กเก็ต ส่วน propagation ขึ้นกับระยะทาง</Caption>
    </div>
  );
}

/** Go-Back-N: segment 1 หาย ทำให้ 2 กับ 3 ที่มาถึงถูกทิ้ง แล้วส่งใหม่ทั้งชุด */
function GbnTimeline() {
  return (
    <div className={frameClass} style={frameStyle}>
      <svg viewBox="-46 0 366 300" className="w-full" role="img" aria-label="แผนภาพเวลาของ Go-Back-N เมื่อ segment ที่ 1 สูญหาย">
        <ArrowDefs />
        <Lifelines top={26} bottom={286} />
        <Seg y={36} label="send 0" />
        <Seg y={60} label="send 1" lost />
        <Seg y={84} label="send 2" />
        <Seg y={108} label="send 3" />
        <Ack y={62} label="ACK 1" />
        <text x="286" y="104" fontSize="10" fill="var(--bad)">
          ทิ้ง
        </text>
        <text x="286" y="128" fontSize="10" fill="var(--bad)">
          ทิ้ง
        </text>
        <line x1="20" y1="70" x2="20" y2="176" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <text x="16" y="128" textAnchor="end" fontSize="10" fill="currentColor">
          timeout
        </text>
        <Seg y={186} label="resend 1" dashed />
        <Seg y={214} label="resend 2" dashed />
        <Seg y={242} label="resend 3" dashed />
        <Ack y={252} label="ACK 4" />
      </svg>
      <Caption>ผู้รับมี window เท่ากับ 1 เสมอ — segment 2 และ 3 ถึงแม้ไม่มี error ก็ถูกทิ้งเพราะผิดลำดับ</Caption>
    </div>
  );
}

/** Selective Repeat: segment 1 หาย ผู้รับ buffer 2,3 ไว้ แล้วส่งใหม่เฉพาะตัวที่หาย */
function SrTimeline() {
  return (
    <div className={frameClass} style={frameStyle}>
      <svg viewBox="0 0 320 260" className="w-full" role="img" aria-label="แผนภาพเวลาของ Selective Repeat เมื่อ segment ที่ 1 สูญหาย">
        <ArrowDefs />
        <Lifelines top={26} bottom={246} />
        <Seg y={36} label="send 0" />
        <Seg y={60} label="send 1" lost />
        <Seg y={84} label="send 2" />
        <Seg y={108} label="send 3" />
        <Ack y={62} label="ACK 0" />
        <text x="282" y="104" fontSize="10" fill="var(--ok)">
          buffer
        </text>
        <text x="282" y="128" fontSize="10" fill="var(--ok)">
          buffer
        </text>
        <Ack y={140} label="NAK 1" />
        <Seg y={186} label="resend 1 เท่านั้น" dashed />
        <Ack y={206} label="ACK 4" />
      </svg>
      <Caption>ผู้รับเก็บ segment ที่ถูกต้องแต่ผิดลำดับไว้ใน buffer จึงส่งซ้ำเฉพาะตัวที่หาย</Caption>
    </div>
  );
}

/** กราฟ cwnd — slow start, congestion avoidance และการตอบสนองต่อ loss ของ Tahoe กับ Reno */
function TcpSawtooth() {
  return (
    <div className={frameClass} style={frameStyle}>
      <svg viewBox="0 0 420 230" className="w-full" role="img" aria-label="กราฟขนาดหน้าต่างความแออัดเทียบกับเวลา แสดงความต่างระหว่าง TCP Tahoe และ Reno">
        <ArrowDefs />
        <line x1="46" y1="196" x2="404" y2="196" stroke="currentColor" strokeWidth="1.4" markerEnd="url(#net-arrow)" />
        <line x1="46" y1="196" x2="46" y2="18" stroke="currentColor" strokeWidth="1.4" markerEnd="url(#net-arrow)" />
        <text x="404" y="214" textAnchor="end" fontSize="11" fill="currentColor">
          เวลา (RTT)
        </text>
        <text x="40" y="20" textAnchor="end" fontSize="11" fill="currentColor">
          cwnd
        </text>

        <line x1="46" y1="86" x2="404" y2="86" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
        <text x="400" y="80" textAnchor="end" fontSize="10" fill="var(--text-soft)">
          ssthresh เริ่มต้น
        </text>

        {/* slow start: เพิ่มเท่าตัวทุก RTT */}
        <polyline points="46,196 70,186 94,166 118,126 142,86" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <text x="86" y="150" fontSize="10.5" fill="currentColor">
          slow start
        </text>
        {/* congestion avoidance: เพิ่มทีละ 1 MSS */}
        <polyline points="142,86 170,78 198,70 226,62 254,54" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <text x="140" y="44" fontSize="10.5" fill="currentColor">
          congestion avoidance
        </text>
        <circle cx="254" cy="54" r="4" fill="var(--bad)" />
        <text x="262" y="44" fontSize="10.5" fill="var(--bad)">
          3 dup ACK
        </text>

        {/* Reno: ลดครึ่ง */}
        <polyline points="254,54 268,125 300,117 332,109 364,101" fill="none" stroke="var(--ok)" strokeWidth="2.2" />
        <text x="306" y="136" fontSize="10.5" fontWeight="600" fill="var(--ok)">
          Reno → ครึ่งหนึ่ง
        </text>
        {/* Tahoe: กลับไป 1 */}
        <polyline
          points="254,54 268,196 292,186 316,166 340,126 364,86"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="5 4"
          opacity="0.75"
        />
        <text x="286" y="182" fontSize="10.5" fontWeight="600" fill="currentColor" opacity="0.85">
          Tahoe → 1 MSS
        </text>
      </svg>
      <Caption>เมื่อเจอ 3 dup ACK — Reno เข้า fast recovery ลด cwnd ครึ่งเดียว ส่วน Tahoe ตัดกลับไปเริ่ม slow start ใหม่</Caption>
    </div>
  );
}

/** การเปิดการเชื่อมต่อ TCP สามทาง พร้อมค่า seq และ ack ในแต่ละขั้น */
function ThreeWayHandshake() {
  return (
    <div className={frameClass} style={frameStyle}>
      <svg viewBox="0 0 320 210" className="w-full" role="img" aria-label="แผนภาพการจับมือสามทางของ TCP">
        <ArrowDefs />
        <text x="46" y="18" textAnchor="middle" fontSize="12" fontWeight="600" fill="currentColor">
          Client
        </text>
        <text x="274" y="18" textAnchor="middle" fontSize="12" fontWeight="600" fill="currentColor">
          Server
        </text>
        <line x1="46" y1="26" x2="46" y2="196" stroke="currentColor" strokeWidth="1.5" />
        <line x1="274" y1="26" x2="274" y2="196" stroke="currentColor" strokeWidth="1.5" />

        <line x1="48" y1="46" x2="268" y2="58" stroke="currentColor" strokeWidth="1.6" markerEnd="url(#net-arrow)" />
        <text x="100" y="42" fontSize="11" fontWeight="600" fill="currentColor">
          SYN = 1, seq = x
        </text>

        <line x1="272" y1="94" x2="52" y2="106" stroke="currentColor" strokeWidth="1.6" markerEnd="url(#net-arrow)" />
        <text x="86" y="122" fontSize="11" fontWeight="600" fill="currentColor">
          SYN = 1, ACK = 1, seq = y, ack = x+1
        </text>

        <line x1="48" y1="146" x2="268" y2="158" stroke="currentColor" strokeWidth="1.6" markerEnd="url(#net-arrow)" />
        <text x="86" y="142" fontSize="11" fontWeight="600" fill="currentColor">
          ACK = 1, seq = x+1, ack = y+1
        </text>
        <text x="120" y="186" fontSize="10" fill="var(--text-soft)">
          ขั้นที่สามแนบข้อมูลไปด้วยได้
        </text>
      </svg>
      <Caption>ขั้นที่หนึ่งและสองยังห้ามแนบข้อมูล — ฝั่ง server จองทรัพยากรจริงหลังได้รับ ACK ขั้นที่สาม</Caption>
    </div>
  );
}

const FIGURES: Record<string, () => ReactNode> = {
  posterization: Posterization,
  convolution: Convolution,
  "gamut-crt-lcd": GamutCrtLcd,
  "subsampling-420": Subsampling420,
  "motion-vector": MotionVector,
  "net-nodal-delay": NodalDelay,
  "net-gbn-timeline": GbnTimeline,
  "net-sr-timeline": SrTimeline,
  "net-tcp-sawtooth": TcpSawtooth,
  "net-3way-handshake": ThreeWayHandshake,
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
