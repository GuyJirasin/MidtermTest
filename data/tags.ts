import type { Chapter, Subject, SubjectId, Tag } from "@/lib/types";

export const SUBJECTS: Subject[] = [
  {
    id: "mm",
    name: "Multimedia",
    fullName: "Multimedia Technology",
    scope: "06016403 · บทที่ 1–6",
  },
  {
    id: "db",
    name: "Database",
    fullName: "Database Systems",
    scope: "Coronel & Rob 10th ed. · บทที่ 1, 3, 4",
  },
  {
    id: "net",
    name: "Network",
    fullName: "Introduction to Computer Networks",
    scope: "Kurose & Ross 8th ed. · บทที่ 1–3",
  },
];

export const DEFAULT_SUBJECT: SubjectId = "mm";

export const CHAPTERS: Chapter[] = [
  { id: "ch1", subject: "mm", number: 1, titleEn: "Introduction to Multimedia Computing", titleTh: "บทนำสู่มัลติมีเดีย" },
  { id: "ch2", subject: "mm", number: 2, titleEn: "Digital Media Representations", titleTh: "การแทนข้อมูลสื่อดิจิทัล" },
  { id: "ch3", subject: "mm", number: 3, titleEn: "Bitmapped Images", titleTh: "ภาพบิตแมป" },
  { id: "ch4", subject: "mm", number: 4, titleEn: "Color Science", titleTh: "วิทยาศาสตร์ของสี" },
  { id: "ch5", subject: "mm", number: 5, titleEn: "Digital Video", titleTh: "วิดีโอดิจิทัล" },
  { id: "ch6", subject: "mm", number: 6, titleEn: "2D & 3D Graphics", titleTh: "กราฟิก 2 มิติและ 3 มิติ" },

  { id: "db-ch1", subject: "db", number: 1, titleEn: "The Database Approach", titleTh: "แนวทางฐานข้อมูล" },
  { id: "db-ch3", subject: "db", number: 3, titleEn: "Data Models", titleTh: "โมเดลข้อมูล" },
  { id: "db-ch4", subject: "db", number: 4, titleEn: "The Relational Model", titleTh: "โมเดลเชิงสัมพันธ์" },

  { id: "net-ch1", subject: "net", number: 1, titleEn: "Computer Networks and the Internet", titleTh: "เครือข่ายคอมพิวเตอร์และอินเทอร์เน็ต" },
  { id: "net-ch2", subject: "net", number: 2, titleEn: "Application Layer", titleTh: "ชั้นแอปพลิเคชัน" },
  { id: "net-ch3", subject: "net", number: 3, titleEn: "Transport Layer", titleTh: "ชั้นทรานสปอร์ต" },
];

export const TAGS: Tag[] = [
  // CH1
  { id: "media-meaning", label: "ความหมายของ media", chapter: "ch1" },
  { id: "multimedia-benefits", label: "ประโยชน์ของ multimedia", chapter: "ch1" },
  { id: "analog-vs-digital-mm", label: "analog vs digital multimedia", chapter: "ch1" },
  { id: "multimodal-perception", label: "multimodal perception", chapter: "ch1" },
  { id: "stimuli-modality", label: "stimuli modalities", chapter: "ch1" },
  { id: "dual-coding", label: "dual coding theory", chapter: "ch1" },
  { id: "split-attention", label: "split-attention effect", chapter: "ch1" },
  { id: "sensory-limit", label: "ขีดจำกัดของประสาทสัมผัส", chapter: "ch1" },
  { id: "attention-limit", label: "selective attention / foveal vision", chapter: "ch1" },
  { id: "media-selection", label: "การเลือกสื่อให้เหมาะกับงาน", chapter: "ch1" },
  { id: "mm-history", label: "ประวัติเทคโนโลยีมัลติมีเดีย", chapter: "ch1" },
  { id: "linear-nonlinear", label: "linear / non-linear interaction", chapter: "ch1" },
  { id: "mm-elements", label: "องค์ประกอบของ multimedia computing", chapter: "ch1" },
  { id: "mm-applications", label: "การประยุกต์ใช้ multimedia", chapter: "ch1" },
  { id: "mm-software", label: "ซอฟต์แวร์มัลติมีเดีย", chapter: "ch1" },
  { id: "mm-computing-scope", label: "ขอบเขต multimedia computing", chapter: "ch1" },

  // CH2
  { id: "analog-signal", label: "analog signal", chapter: "ch2" },
  { id: "digital-signal", label: "digital signal", chapter: "ch2" },
  { id: "signal-properties", label: "คุณสมบัติสัญญาณ", chapter: "ch2" },
  { id: "spectrum-bandwidth", label: "spectrum / bandwidth", chapter: "ch2" },
  { id: "adc", label: "A/D conversion", chapter: "ch2" },
  { id: "sampling", label: "sampling", chapter: "ch2" },
  { id: "nyquist", label: "Nyquist theorem", chapter: "ch2" },
  { id: "aliasing", label: "aliasing", chapter: "ch2" },
  { id: "quantization", label: "quantization", chapter: "ch2" },
  { id: "analog-media", label: "สื่อบันทึกแบบอนาล็อก", chapter: "ch2" },
  { id: "media-types", label: "ประเภทของ media", chapter: "ch2" },
  { id: "typography", label: "typography", chapter: "ch2" },
  { id: "metadata", label: "metadata", chapter: "ch2" },
  { id: "file-format", label: "ฟอร์แมตไฟล์สื่อ", chapter: "ch2" },

  // CH3
  { id: "imaging-sensor", label: "imaging sensor", chapter: "ch3" },
  { id: "display-device", label: "อุปกรณ์แสดงผลภาพ", chapter: "ch3" },
  { id: "image-compression", label: "หลักการบีบอัดภาพ", chapter: "ch3" },
  { id: "resolution", label: "resolution", chapter: "ch3" },
  { id: "ppi-dpi", label: "PPI / DPI", chapter: "ch3" },
  { id: "color-depth-img", label: "bit depth ของภาพ", chapter: "ch3" },
  { id: "pixel-wise", label: "pixel-wise transformation", chapter: "ch3" },
  { id: "geometric-transform", label: "geometric transformation", chapter: "ch3" },
  { id: "interpolation", label: "interpolation", chapter: "ch3" },
  { id: "filtering", label: "filtering / convolution", chapter: "ch3" },
  { id: "hdr", label: "HDR / multi-image", chapter: "ch3" },
  { id: "lossless", label: "lossless compression", chapter: "ch3" },
  { id: "jpeg", label: "JPEG compression", chapter: "ch3" },
  { id: "image-filesize", label: "ขนาดไฟล์ภาพ", chapter: "ch3" },

  // CH4
  { id: "light-spectrum", label: "แสงและ spectrum", chapter: "ch4" },
  { id: "human-vision", label: "การรับรู้สีของตามนุษย์", chapter: "ch4" },
  { id: "tristimulus", label: "tristimulus theory", chapter: "ch4" },
  { id: "xyz-space", label: "XYZ color space", chapter: "ch4" },
  { id: "chromaticity", label: "chromaticity diagram", chapter: "ch4" },
  { id: "color-gamut", label: "color gamut", chapter: "ch4" },
  { id: "color-depth", label: "color depth", chapter: "ch4" },
  { id: "color-model", label: "color model (RGB/CMYK/HSB)", chapter: "ch4" },
  { id: "color-management", label: "color management", chapter: "ch4" },

  // CH5
  { id: "persistence-vision", label: "persistence of vision / flicker", chapter: "ch5" },
  { id: "analog-video", label: "analog video / interlacing", chapter: "ch5" },
  { id: "luma-chroma", label: "luminance / chrominance", chapter: "ch5" },
  { id: "chroma-subsampling", label: "chroma subsampling", chapter: "ch5" },
  { id: "video-compression", label: "หลักการบีบอัดวิดีโอ", chapter: "ch5" },
  { id: "intra-frame", label: "intra-frame compression", chapter: "ch5" },
  { id: "inter-frame", label: "inter-frame compression", chapter: "ch5" },
  { id: "frame-types", label: "I / P / B frame", chapter: "ch5" },
  { id: "video-format", label: "video format / codec", chapter: "ch5" },
  { id: "video-storage", label: "การจัดเก็บ / bit rate วิดีโอ", chapter: "ch5" },
  { id: "post-production", label: "post-production", chapter: "ch5" },
  { id: "advanced-video", label: "วิดีโอ 3 มิติ / 360 องศา", chapter: "ch5" },

  // CH6
  { id: "vector-graphics", label: "vector graphics", chapter: "ch6" },
  { id: "2d-transform", label: "2D transformation", chapter: "ch6" },
  { id: "rasterization", label: "rasterization", chapter: "ch6" },
  { id: "3d-modeling", label: "3D modeling", chapter: "ch6" },
  { id: "rendering", label: "rendering", chapter: "ch6" },

  // DB CH1 — The Database Approach
  { id: "db-data-info", label: "data / information / knowledge", chapter: "db-ch1" },
  { id: "db-metadata", label: "metadata & data dictionary", chapter: "db-ch1" },
  { id: "db-file-limits", label: "ข้อจำกัดของ file system", chapter: "db-ch1" },
  { id: "db-dependence", label: "structural / data dependence", chapter: "db-ch1" },
  { id: "db-redundancy", label: "redundancy → inconsistency → anomaly", chapter: "db-ch1" },
  { id: "db-anomalies", label: "anomalies 3 แบบ", chapter: "db-ch1" },
  { id: "db-dbms-functions", label: "DBMS functions 9 ข้อ", chapter: "db-ch1" },
  { id: "db-system-parts", label: "5 ส่วนประกอบของ database system", chapter: "db-ch1" },
  { id: "db-types", label: "ประเภทของฐานข้อมูล", chapter: "db-ch1" },
  { id: "db-structure-level", label: "structured / semistructured / unstructured", chapter: "db-ch1" },
  { id: "db-cost", label: "ข้อดี–ข้อเสียของ database system", chapter: "db-ch1" },

  // DB CH3 — Data Models
  { id: "db-model-purpose", label: "data model คืออะไร ทำไมต้องมี", chapter: "db-ch3" },
  { id: "db-building-blocks", label: "building blocks 4 ตัว", chapter: "db-ch3" },
  { id: "db-relationship-type", label: "1:M / 1:1 / M:N", chapter: "db-ch3" },
  { id: "db-business-rules", label: "business rules", chapter: "db-ch3" },
  { id: "db-evolution", label: "วิวัฒนาการของ data model", chapter: "db-ch3" },
  { id: "db-hierarchical-network", label: "hierarchical / network model", chapter: "db-ch3" },
  { id: "db-er-oo", label: "ER model / OO model", chapter: "db-ch3" },
  { id: "db-nosql", label: "Big Data & NoSQL", chapter: "db-ch3" },
  { id: "db-terminology", label: "ศัพท์ข้ามโมเดล", chapter: "db-ch3" },
  { id: "db-abstraction", label: "4 ระดับ abstraction", chapter: "db-ch3" },
  { id: "db-independence", label: "logical / physical independence", chapter: "db-ch3" },

  // DB CH4 — The Relational Model
  { id: "db-table-chars", label: "คุณลักษณะของตาราง 8 ข้อ", chapter: "db-ch4" },
  { id: "db-functional-dep", label: "functional dependence", chapter: "db-ch4" },
  { id: "db-keys", label: "ลำดับชั้นของ key", chapter: "db-ch4" },
  { id: "db-integrity", label: "entity / referential integrity", chapter: "db-ch4" },
  { id: "db-nulls", label: "null และ flag", chapter: "db-ch4" },
  { id: "db-controlled-redundancy", label: "controlled redundancy", chapter: "db-ch4" },
  { id: "db-dictionary", label: "data dictionary / system catalog", chapter: "db-ch4" },
  { id: "db-algebra", label: "relational algebra", chapter: "db-ch4" },
  { id: "db-join", label: "join ทุกชนิด", chapter: "db-ch4" },
  { id: "db-cardinality", label: "นับ degree / cardinality ของผลลัพธ์", chapter: "db-ch4" },
  { id: "db-mn-composite", label: "แตก M:N เป็น composite entity", chapter: "db-ch4" },
  { id: "db-index", label: "index", chapter: "db-ch4" },
  { id: "db-codd", label: "Codd's rules", chapter: "db-ch4" },

  // NET CH1 — Computer Networks and the Internet
  { id: "net-what-is", label: "นิยาม Internet / end system / protocol", chapter: "net-ch1" },
  { id: "net-edge-core", label: "network edge / access network / core", chapter: "net-ch1" },
  { id: "net-access-tech", label: "DSL / HFC / FTTH / cellular", chapter: "net-ch1" },
  { id: "net-media", label: "physical media", chapter: "net-ch1" },
  { id: "net-switching", label: "packet vs circuit switching", chapter: "net-ch1" },
  { id: "net-fdm-tdm", label: "FDM / TDM", chapter: "net-ch1" },
  { id: "net-store-forward", label: "store-and-forward", chapter: "net-ch1" },
  { id: "net-delay", label: "delay 4 ชนิด", chapter: "net-ch1" },
  { id: "net-queuing", label: "queuing delay / traffic intensity", chapter: "net-ch1" },
  { id: "net-throughput", label: "throughput / bottleneck", chapter: "net-ch1" },
  { id: "net-probability", label: "ความน่าจะเป็นของ link ล้น", chapter: "net-ch1" },
  { id: "net-isp", label: "network of networks / IXP / peering", chapter: "net-ch1" },
  { id: "net-layering", label: "protocol layering / PDU", chapter: "net-ch1" },
  { id: "net-encapsulation", label: "encapsulation", chapter: "net-ch1" },
  { id: "net-security", label: "ภัยคุกคามเครือข่าย", chapter: "net-ch1" },

  // NET CH2 — Application Layer
  { id: "net-app-arch", label: "client-server vs P2P", chapter: "net-ch2" },
  { id: "net-socket", label: "socket / process addressing", chapter: "net-ch2" },
  { id: "net-app-needs", label: "บริการที่ application ต้องการ", chapter: "net-ch2" },
  { id: "net-http-conn", label: "persistent vs non-persistent HTTP", chapter: "net-ch2" },
  { id: "net-http-msg", label: "HTTP message / method / status code", chapter: "net-ch2" },
  { id: "net-cookie", label: "cookies", chapter: "net-ch2" },
  { id: "net-cache", label: "web cache / conditional GET", chapter: "net-ch2" },
  { id: "net-http2", label: "HTTP/2 และ HTTP/3", chapter: "net-ch2" },
  { id: "net-mail", label: "SMTP / POP3 / IMAP", chapter: "net-ch2" },
  { id: "net-dns", label: "โครงสร้างและการทำงานของ DNS", chapter: "net-ch2" },
  { id: "net-dns-record", label: "DNS resource record", chapter: "net-ch2" },
  { id: "net-p2p", label: "P2P file distribution", chapter: "net-ch2" },
  { id: "net-bittorrent", label: "BitTorrent", chapter: "net-ch2" },
  { id: "net-cdn", label: "video streaming / DASH / CDN", chapter: "net-ch2" },

  // NET CH3 — Transport Layer
  { id: "net-transport-role", label: "หน้าที่ของ transport layer", chapter: "net-ch3" },
  { id: "net-mux", label: "multiplexing / demultiplexing", chapter: "net-ch3" },
  { id: "net-udp", label: "UDP และ checksum", chapter: "net-ch3" },
  { id: "net-rdt", label: "หลักการ reliable data transfer", chapter: "net-ch3" },
  { id: "net-arq", label: "Stop-and-Wait / GBN / SR (ARQ)", chapter: "net-ch3" },
  { id: "net-window-size", label: "maximum window size", chapter: "net-ch3" },
  { id: "net-ack", label: "accumulative ACK / NAK", chapter: "net-ch3" },
  { id: "net-tcp-header", label: "TCP segment structure", chapter: "net-ch3" },
  { id: "net-seq-ack", label: "sequence / acknowledgement number", chapter: "net-ch3" },
  { id: "net-rtt", label: "RTT estimation / timeout", chapter: "net-ch3" },
  { id: "net-retransmit", label: "retransmission / fast retransmit", chapter: "net-ch3" },
  { id: "net-flow-control", label: "flow control (rwnd)", chapter: "net-ch3" },
  { id: "net-handshake", label: "3-way handshake / connection management", chapter: "net-ch3" },
  { id: "net-congestion", label: "หลักการ congestion control", chapter: "net-ch3" },
  { id: "net-tcp-cc", label: "slow start / AIMD / Tahoe / Reno", chapter: "net-ch3" },
  { id: "net-fairness", label: "fairness / ECN / QUIC", chapter: "net-ch3" },
];

export const SUBJECT_BY_ID = new Map(SUBJECTS.map((s) => [s.id, s]));

export const CHAPTERS_BY_SUBJECT = Object.fromEntries(
  SUBJECTS.map((s) => [s.id, CHAPTERS.filter((c) => c.subject === s.id)])
) as Record<SubjectId, Chapter[]>;

export const TAG_LABEL = new Map(TAGS.map((t) => [t.id, t.label]));
export const CHAPTER_BY_ID = new Map(CHAPTERS.map((c) => [c.id, c]));

export function tagLabel(id: string): string {
  return TAG_LABEL.get(id) ?? id;
}
