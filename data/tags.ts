import type { Chapter, Tag } from "@/lib/types";

export const CHAPTERS: Chapter[] = [
  { id: "ch1", number: 1, titleEn: "Introduction to Multimedia Computing", titleTh: "บทนำสู่มัลติมีเดีย" },
  { id: "ch2", number: 2, titleEn: "Digital Media Representations", titleTh: "การแทนข้อมูลสื่อดิจิทัล" },
  { id: "ch3", number: 3, titleEn: "Bitmapped Images", titleTh: "ภาพบิตแมป" },
  { id: "ch4", number: 4, titleEn: "Color Science", titleTh: "วิทยาศาสตร์ของสี" },
  { id: "ch5", number: 5, titleEn: "Digital Video", titleTh: "วิดีโอดิจิทัล" },
  { id: "ch6", number: 6, titleEn: "2D & 3D Graphics", titleTh: "กราฟิก 2 มิติและ 3 มิติ" },
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
];

export const TAG_LABEL = new Map(TAGS.map((t) => [t.id, t.label]));
export const CHAPTER_BY_ID = new Map(CHAPTERS.map((c) => [c.id, c]));

export function tagLabel(id: string): string {
  return TAG_LABEL.get(id) ?? id;
}
