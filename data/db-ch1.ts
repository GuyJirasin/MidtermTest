import type { Question } from "@/lib/types";

/**
 * ข้อสอบบทที่ 1 — The Database Approach
 * อ้างอิง Coronel & Rob, Database Principles 10th ed. Chapter 1
 * ระดับปานกลาง–ยาก เน้นให้สถานการณ์แล้วจำแนก ไม่ถามนิยามตรง ๆ
 */
export const dbCh1Questions: Question[] = [
  {
    id: "db-ch1-1",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-data-info"],
    prompt:
      'ระบบพิมพ์ค่าออกมา 3 บรรทัด\n(1) "36123"\n(2) "ลูกค้า 3 คนอยู่ในรหัสไปรษณีย์ 36123 ซึ่งเป็นเขตที่ยอดขายเติบโตสูงสุดในไตรมาสนี้"\n(3) "บริษัทควรเปิดสาขาใหม่ในเขต 36123"\nข้อใดจำแนกทั้งสามบรรทัดได้ถูกต้องตามลำดับ',
    choices: [
      {
        id: "a",
        text: "data → information → knowledge",
        why: "ถูกต้อง ตัวเลขลอย ๆ คือ raw fact เมื่อประมวลผลจนมี context ก็กลายเป็น information และเมื่อสั่งสมจนนำไปตัดสินใจได้จึงเป็น knowledge",
      },
      {
        id: "b",
        text: "information → data → knowledge",
        why: "ผิด ตัวเลขดิบที่ยังไม่มี context ไม่ใช่ information เพราะยังไม่ถูกประมวลผลให้เผยความหมาย",
      },
      {
        id: "c",
        text: "data → knowledge → information",
        why: "ผิด สลับลำดับ knowledge เป็นชั้นบนสุดที่เกิดหลัง information ไม่ใช่ก่อน",
      },
      {
        id: "d",
        text: "เป็น data ทั้งสามบรรทัด เพราะทุกบรรทัดมาจากฐานข้อมูลเดียวกัน",
        why: "ผิด แหล่งที่มาไม่ใช่เกณฑ์จำแนก เกณฑ์คือระดับการประมวลผลและ context ที่ติดมากับค่านั้น",
      },
    ],
    answer: "a",
    explanation:
      "Data คือข้อเท็จจริงดิบที่ยังไม่มีความหมายในตัวเอง ต้องผ่าน processing จึงกลายเป็น information ที่มี context และ information คือรากฐานของ knowledge ซึ่งนำไปสู่การตัดสินใจ หนังสือย้ำโซ่นี้ว่า data → processing → information → decision → องค์กรอยู่รอด และ information ที่ดีต้อง accurate, relevant, timely",
  },
  {
    id: "db-ch1-2",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-metadata"],
    prompt:
      "ผู้ใช้ถาม DBA ว่า “ฟิลด์ CUS_BALANCE เก็บชนิดข้อมูลอะไร ยาวกี่หลัก และมีตารางไหนอ้างถึงมันบ้าง” DBA เปิดดูจากที่ใดในระบบ และสิ่งนั้นเก็บข้อมูลชนิดใด",
    choices: [
      {
        id: "a",
        text: "data dictionary ซึ่งเก็บ metadata คือข้อมูลที่อธิบายตัวข้อมูลอีกที",
        why: "ถูกต้อง หนึ่งในหน้าที่ของ DBMS คือ data dictionary management ซึ่งเก็บนิยามของ data element และความสัมพันธ์ของมัน",
      },
      {
        id: "b",
        text: "ตารางข้อมูลจริง เพราะค่าที่เก็บอยู่บอกชนิดข้อมูลได้เอง",
        why: "ผิด ค่าข้อมูลไม่ได้บอกนิยามโครงสร้าง เช่น ความยาวสูงสุดหรือความสัมพันธ์กับตารางอื่น",
      },
      {
        id: "c",
        text: "แฟ้ม transaction log เพราะบันทึกทุกการเปลี่ยนแปลงของข้อมูล",
        why: "ผิด log ใช้เพื่อ backup and recovery ไม่ใช่เก็บนิยามโครงสร้าง",
      },
      {
        id: "d",
        text: "โค้ดของโปรแกรมประยุกต์ เพราะโปรแกรมเป็นผู้กำหนดโครงสร้างข้อมูล",
        why: "ผิด นั่นคือลักษณะของ file system ที่โครงสร้างฝังอยู่ในโปรแกรม ซึ่งเป็นปัญหาที่ DBMS มาแก้",
      },
    ],
    answer: "a",
    explanation:
      "Metadata คือข้อมูลที่อธิบายข้อมูล DBMS เก็บ metadata ไว้ใน data dictionary และให้ผู้ใช้เข้าถึงผ่านฟังก์ชัน data dictionary management ข้อดีสำคัญคือเมื่อโครงสร้างเปลี่ยน DBMS แก้ที่นิยามกลางแห่งเดียว ไม่ต้องไล่แก้ทุกโปรแกรมแบบ file system",
  },
  {
    id: "db-ch1-3",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-file-limits"],
    prompt:
      "ผู้จัดการขอรายงาน “ลูกค้าที่ยอดค้างชำระเกิน 50,000 บาท และอยู่ในเขตที่ตัวแทนขายคนเดิมเพิ่งลาออก” ทีมไอทีที่ใช้ file system ตอบว่าต้องใช้เวลาเขียนโปรแกรมใหม่ประมาณ 3 วัน สถานการณ์นี้ตรงกับข้อจำกัดข้อใดของ file system มากที่สุด",
    choices: [
      {
        id: "a",
        text: "ทำ ad hoc query ไม่ได้ ทุกคำถามเฉพาะกิจต้องเขียนโปรแกรมใหม่",
        why: "ถูกต้อง คำถามที่ไม่ได้เตรียมโปรแกรมไว้ล่วงหน้าคือนิยามของ ad hoc query พอดี",
      },
      {
        id: "b",
        text: "security features ไม่เพียงพอ",
        why: "ผิด โจทย์ไม่ได้พูดถึงสิทธิ์การเข้าถึงหรือการรั่วไหลของข้อมูล",
      },
      {
        id: "c",
        text: "แก้โครงสร้างไฟล์ที่มีอยู่ได้ยาก",
        why: "ผิด งานนี้ไม่ได้เปลี่ยนโครงสร้างไฟล์ แค่ต้องการดึงข้อมูลรูปแบบใหม่",
      },
      {
        id: "d",
        text: "การดูแลระบบซับซ้อนและยาก",
        why: "ผิด ปัญหาไม่ได้อยู่ที่การบริหารจัดการระบบ แต่อยู่ที่การตอบคำถามใหม่",
      },
      { id: "e", text: "ถูกทุกข้อ", why: "ผิด มีเพียงข้อเดียวที่ตรงกับอาการที่โจทย์บรรยาย", pin: true },
    ],
    answer: "a",
    explanation:
      "ข้อจำกัด 5 ข้อของ file system คือ ต้องเขียนโปรแกรมมาก ทำ ad hoc query ไม่ได้ ดูแลระบบยาก แก้โครงสร้างเดิมยาก และความปลอดภัยไม่พอ เคสนี้คือข้อ 2 โดยตรง และเป็นเหตุผลหลักที่ DBMS ต้องมีภาษาสอบถามอย่าง SQL ให้ผู้ใช้ถามได้เองทันที",
  },
  {
    id: "db-ch1-4",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-file-limits", "db-cost"],
    prompt: "ข้อความใดต่อไปนี้ที่หนังสือ “ไม่” ได้กล่าวไว้เกี่ยวกับ file system",
    choices: [
      {
        id: "a",
        text: "ปัญหาที่พบใน file system เป็นปัญหาเฉพาะของ file system เท่านั้น ระบบฐานข้อมูลจะไม่มีวันเจอ",
        why: "ถูกต้องว่าเป็นข้อที่หนังสือไม่ได้กล่าว หนังสือระบุตรงข้ามว่าปัญหาหลายอย่างไม่ได้มีเฉพาะใน file system ฐานข้อมูลที่ออกแบบแย่ก็เจอได้เช่นกัน",
      },
      {
        id: "b",
        text: "file system เป็นพัฒนาการที่ดีขึ้นจากระบบที่ทำด้วยมือ",
        why: "ผิด ข้อนี้หนังสือกล่าวไว้จริง",
      },
      {
        id: "c",
        text: "file system ถูกใช้งานจริงมานานกว่าสองทศวรรษ",
        why: "ผิด ข้อนี้หนังสือกล่าวไว้จริง จึงเป็นเหตุผลที่ยังต้องเรียนแม้มันจะเลิกใช้แล้ว",
      },
      {
        id: "d",
        text: "ไฟล์ที่แยกกันอยู่อย่างอิสระมักมีข้อมูลซ้ำซ้อนกัน",
        why: "ผิด ข้อนี้หนังสือกล่าวไว้จริง และเป็นจุดตั้งต้นของห่วงโซ่ redundancy",
      },
    ],
    answer: "a",
    explanation:
      "จุดที่มักพลาดคือคิดว่าย้ายมาใช้ DBMS แล้วปัญหาจะหายไปเอง หนังสือเตือนชัดว่าปัญหาหลายอย่างไม่ได้ผูกกับเทคโนโลยี แต่ผูกกับการออกแบบ ฐานข้อมูลที่ออกแบบไม่ดีก็ยังเกิด redundancy และ anomalies ได้ นี่คือเหตุผลที่บทถัดไปต้องพูดเรื่อง data model และการออกแบบ",
  },
  {
    id: "db-ch1-5",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-dependence"],
    prompt:
      "ทีมงานเพิ่มฟิลด์ CUS_EMAIL เข้าไปในไฟล์ CUSTOMER ผลคือโปรแกรมทั้ง 12 ตัวที่อ่านไฟล์นี้ต้องถูกแก้และคอมไพล์ใหม่ทั้งหมด แม้โปรแกรมส่วนใหญ่จะไม่ได้ใช้ฟิลด์ใหม่นี้เลย อาการนี้เรียกว่าอะไร",
    choices: [
      {
        id: "a",
        text: "structural dependence",
        why: "ถูกต้อง การเข้าถึงไฟล์ขึ้นกับโครงสร้างของไฟล์เอง เปลี่ยนโครงสร้างจึงต้องแก้ทุกโปรแกรมที่ใช้ไฟล์นั้น",
      },
      {
        id: "b",
        text: "data dependence",
        why: "ผิด data dependence คือการเข้าถึงเปลี่ยนไปเมื่อคุณลักษณะการจัดเก็บข้อมูลเปลี่ยน เช่น เปลี่ยนจากเก็บเป็นจำนวนเต็มไปเป็นข้อความ ไม่ใช่การเพิ่มฟิลด์ใหม่เข้าโครงสร้าง",
      },
      {
        id: "c",
        text: "structural independence",
        why: "ผิด นี่คือสภาพที่ดี คือเปลี่ยนโครงสร้างได้โดยไม่กระทบการเข้าถึง ตรงข้ามกับที่โจทย์บรรยาย",
      },
      {
        id: "d",
        text: "data inconsistency",
        why: "ผิด โจทย์ไม่ได้บอกว่าข้อมูลชุดเดียวกันมีค่าขัดแย้งกัน แต่พูดถึงผลกระทบต่อโปรแกรม",
      },
    ],
    answer: "a",
    explanation:
      "แยกให้ขาด structural dependence ผูกกับ “โครงสร้างไฟล์” ส่วน data dependence ผูกกับ “คุณลักษณะการจัดเก็บของตัวข้อมูล” ทั้งคู่เป็นสภาพที่ไม่ดีและเป็นสิ่งที่ DBMS มาแก้ด้วยการให้ structural independence และ data independence",
  },
  {
    id: "db-ch1-6",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-dependence"],
    prompt:
      "เดิมโปรแกรมอ่านวันเกิดที่เก็บเป็นข้อความ 8 ตัวอักษรรูปแบบ YYYYMMDD ต่อมาผู้ดูแลเปลี่ยนไปเก็บเป็นชนิด DATE ของระบบ ทำให้โค้ดทุกจุดที่ตัดสตริงต้องเขียนใหม่ ปรากฏการณ์นี้คือข้อใด และเกี่ยวข้องกับรูปแบบข้อมูลระดับใด",
    choices: [
      {
        id: "a",
        text: "data dependence และเป็นการเปลี่ยนที่ physical data format",
        why: "ถูกต้อง วิธีจัดเก็บจริงบนสื่อเปลี่ยน จึงกระทบวิธีเข้าถึงข้อมูล นั่นคือ data dependence",
      },
      {
        id: "b",
        text: "structural dependence และเป็นการเปลี่ยนที่ logical data format",
        why: "ผิด ไม่ได้เพิ่มหรือลบฟิลด์ในโครงสร้างไฟล์ และมุมมองเชิงตรรกะของผู้ใช้ยังเป็น “วันเกิด” เหมือนเดิม",
      },
      {
        id: "c",
        text: "data independence เพราะระบบเปลี่ยนวิธีเก็บได้อิสระ",
        why: "ผิด ถ้าเป็น independence จริง โปรแกรมจะไม่ต้องแก้เลย แต่โจทย์บอกว่าต้องเขียนใหม่",
      },
      {
        id: "d",
        text: "data anomaly เพราะข้อมูลวันเกิดจะเพี้ยนหลังเปลี่ยนรูปแบบ",
        why: "ผิด anomaly เกิดจากการแก้ข้อมูลซ้ำซ้อนไม่ครบทุกจุด ไม่ใช่การเปลี่ยนรูปแบบจัดเก็บ",
      },
    ],
    answer: "a",
    explanation:
      "Logical data format คือมุมมองที่มนุษย์เห็นข้อมูล ส่วน physical data format คือวิธีที่คอมพิวเตอร์เก็บจริง เมื่อ physical เปลี่ยนแล้วโปรแกรมพัง แปลว่าระบบมี data dependence ซึ่ง DBMS แก้ให้ด้วยการคั่นกลางไม่ให้โปรแกรมต้องรู้วิธีเก็บจริง",
  },
  {
    id: "db-ch1-7",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-redundancy"],
    prompt:
      "ไฟล์ AGENT และไฟล์ CUSTOMER ต่างเก็บเบอร์โทรของตัวแทนขายไว้คนละที่ ต่อมาพบว่าเบอร์ของตัวแทนคนหนึ่งในสองไฟล์ไม่ตรงกัน และเมื่อพนักงานลบลูกค้ารายสุดท้ายออกไป ข้อมูลตัวแทนคนนั้นก็หายไปด้วย ข้อใดจับคู่ศัพท์กับอาการทั้งสามได้ถูกต้อง",
    choices: [
      {
        id: "a",
        text: "เก็บซ้ำ = data redundancy, ค่าไม่ตรงกัน = data inconsistency, ข้อมูลหายตอนลบ = deletion anomaly",
        why: "ถูกต้อง ทั้งสามเป็นคนละขั้นของห่วงโซ่เดียวกัน คือสาเหตุ อาการ และความผิดปกติตอนดำเนินการ",
      },
      {
        id: "b",
        text: "ทั้งสามอาการเรียกรวมว่า data redundancy เพราะมีต้นเหตุเดียวกัน",
        why: "ผิด แม้ต้นเหตุเดียวกันแต่หนังสือแยกศัพท์ชัดเจน และข้อสอบชอบถามแยก",
      },
      {
        id: "c",
        text: "เก็บซ้ำ = data inconsistency, ค่าไม่ตรงกัน = data anomaly, ข้อมูลหายตอนลบ = data redundancy",
        why: "ผิด สลับกันหมด redundancy คือการเก็บซ้ำโดยไม่จำเป็น ไม่ใช่ผลลัพธ์ตอนลบ",
      },
      {
        id: "d",
        text: "เก็บซ้ำ = islands of information, ค่าไม่ตรงกัน = update anomaly, ข้อมูลหายตอนลบ = insertion anomaly",
        why: "ผิด islands of information เป็นสภาพองค์กรที่นำไปสู่ redundancy ไม่ใช่ตัว redundancy และการลบแล้วข้อมูลหายคือ deletion ไม่ใช่ insertion",
      },
    ],
    answer: "a",
    explanation:
      "ห่วงโซ่คือ islands of information → data redundancy → อัปเดตไม่พร้อมกัน → data inconsistency → data anomalies และคำว่าซ้ำซ้อนต้องเป็นการซ้ำ “โดยไม่จำเป็น” เท่านั้น เพราะในบทที่ 4 จะเจอ controlled redundancy ซึ่งเป็นการซ้ำที่จำเป็นและถูกต้อง",
  },
  {
    id: "db-ch1-8",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-anomalies"],
    prompt:
      "บริษัทเก็บข้อมูลเป็นไฟล์เดียวโดยหนึ่งแถวคือลูกค้าหนึ่งราย และมีคอลัมน์ของตัวแทนขายอยู่ในแถวเดียวกัน วันนี้บริษัทจ้างตัวแทนขายคนใหม่ที่ยังไม่ได้รับมอบหมายลูกค้าเลย จึงบันทึกข้อมูลเธอเข้าระบบไม่ได้ นี่คือ anomaly ชนิดใด",
    choices: [
      {
        id: "a",
        text: "insertion anomaly",
        why: "ถูกต้อง เพิ่มข้อมูลที่ควรเพิ่มได้กลับเพิ่มไม่ได้ เพราะโครงสร้างบังคับให้ต้องมีลูกค้าก่อน",
      },
      {
        id: "b",
        text: "update anomaly",
        why: "ผิด update anomaly เกิดตอนแก้ไขค่าที่ซ้ำอยู่หลายแถวแล้วแก้ไม่ครบ",
      },
      {
        id: "c",
        text: "deletion anomaly",
        why: "ผิด deletion anomaly คือลบบางอย่างแล้วข้อมูลอื่นที่ยังจำเป็นหายตามไปด้วย",
      },
      {
        id: "d",
        text: "referential integrity violation",
        why: "ผิด นั่นเป็นศัพท์ของโมเดลเชิงสัมพันธ์ในบทที่ 4 และหมายถึงค่า foreign key ที่ไม่มี primary key รองรับ",
      },
    ],
    answer: "a",
    explanation:
      "จำจากคำกริยา update = แก้ / insertion = เพิ่ม / deletion = ลบ ทั้งสามเกิดจากรากเดียวกันคือข้อมูลสองเรื่องถูกยัดรวมไว้ในไฟล์เดียว วิธีแก้จริงคือแยกเป็นสองตาราง ซึ่งคือสิ่งที่โมเดลเชิงสัมพันธ์ทำ",
  },
  {
    id: "db-ch1-9",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-anomalies"],
    prompt:
      "Leah Hahn มีชื่ออยู่ 3 แถวในไฟล์เดียวกัน เมื่อเธอย้ายบ้านและเปลี่ยนเบอร์โทร พนักงานแก้ให้เพียง 2 แถว ผลที่เกิดขึ้นทันทีคือข้อใด และเรียกความผิดปกติที่เกิดตอนแก้ไขนี้ว่าอะไร",
    choices: [
      {
        id: "a",
        text: "เกิด data inconsistency ในไฟล์ และความผิดปกติที่เกิดตอนแก้ไขเรียกว่า update anomaly",
        why: "ถูกต้อง ผลคือค่าเดียวกันมีสองเวอร์ชันขัดแย้งกัน และเหตุที่ทำให้เกิดคือความผิดปกติตอนแก้ไข",
      },
      {
        id: "b",
        text: "เกิด data redundancy เป็นครั้งแรก และเรียกว่า insertion anomaly",
        why: "ผิด redundancy มีอยู่ก่อนแล้วตั้งแต่เก็บชื่อเธอซ้ำ 3 แถว และไม่ได้เพิ่มข้อมูลใหม่",
      },
      {
        id: "c",
        text: "เกิด deletion anomaly เพราะข้อมูลเก่าถูกทับหายไป",
        why: "ผิด ไม่มีการลบแถวใด และการทับค่าเดิมไม่ใช่ deletion anomaly",
      },
      {
        id: "d",
        text: "ไม่เกิดปัญหาใด เพราะระบบจะเลือกใช้ค่าที่ใหม่ที่สุดเอง",
        why: "ผิด file system ไม่มีกลไกรู้ว่าค่าไหนถูกต้อง นั่นคือสาเหตุที่ต้องมี DBMS มาบังคับ integrity",
      },
    ],
    answer: "a",
    explanation:
      "ลำดับเหตุการณ์คือ redundancy มีอยู่ก่อน → แก้ไม่ครบทุกจุด → เกิด inconsistency → เรียกความผิดปกติชนิดนี้ว่า update anomaly ต้องแยกให้ออกว่า redundancy คือสาเหตุ inconsistency คืออาการ และ anomaly คือชื่อของความผิดปกติตอนดำเนินการ",
  },
  {
    id: "db-ch1-10",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-dbms-functions"],
    prompt:
      "พนักงานสองคนกดแก้ยอดคงเหลือของลูกค้ารายเดียวกันในเวลาไล่เลี่ยกัน DBMS จัดคิวให้การแก้ทั้งสองไม่ทับกันจนข้อมูลยังคงถูกต้อง นี่คือฟังก์ชันใดของ DBMS",
    choices: [
      {
        id: "a",
        text: "multiuser access control",
        why: "ถูกต้อง เป็นฟังก์ชันที่ทำให้ผู้ใช้หลายคนเข้าถึงพร้อมกันได้โดยข้อมูลยังคงสอดคล้อง",
      },
      {
        id: "b",
        text: "data integrity management",
        why: "ผิด ฟังก์ชันนี้ดูแลกฎความถูกต้องของข้อมูลอย่างการลด redundancy และรักษา consistency ไม่ใช่การจัดคิวผู้ใช้พร้อมกัน",
      },
      {
        id: "c",
        text: "backup and recovery management",
        why: "ผิด ฟังก์ชันนี้ทำงานตอนระบบล่มหรือข้อมูลเสียหาย ไม่ใช่ตอนใช้งานปกติพร้อมกัน",
      },
      {
        id: "d",
        text: "security management",
        why: "ผิด security ตัดสินว่าใครมีสิทธิ์ทำอะไร ไม่ได้จัดลำดับการทำงานพร้อมกัน",
      },
      { id: "e", text: "ถูกทุกข้อ", why: "ผิด มีเพียงข้อเดียวที่ตรงกับอาการที่โจทย์บรรยาย", pin: true },
    ],
    answer: "a",
    explanation:
      "DBMS functions มี 9 ข้อ ได้แก่ data dictionary management, data storage management, data transformation and presentation, security management, multiuser access control, backup and recovery management, data integrity management, database access languages and APIs และ database communication interfaces การจัดการเข้าถึงพร้อมกันคือข้อ 5",
  },
  {
    id: "db-ch1-11",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-dbms-functions"],
    prompt:
      "ผู้ใช้เห็นวันที่เป็น “18 สิงหาคม 2569” บนหน้าจอ ทั้งที่ในดิสก์เก็บเป็นตัวเลขรูปแบบภายในของระบบ การที่ DBMS แปลงระหว่างสองรูปแบบนี้ให้อัตโนมัติ ตรงกับฟังก์ชันใด",
    choices: [
      {
        id: "a",
        text: "data transformation and presentation",
        why: "ถูกต้อง ฟังก์ชันนี้แปลงข้อมูลที่ป้อนเข้าให้เป็นโครงสร้างที่จัดเก็บได้ และแปลงกลับให้ตรงกับที่ผู้ใช้คาดหวัง",
      },
      {
        id: "b",
        text: "data storage management",
        why: "ผิด ฟังก์ชันนี้ดูแลโครงสร้างการจัดเก็บจริง เช่น พื้นที่ index และ buffer ไม่ได้จัดการรูปแบบที่ผู้ใช้เห็น",
      },
      {
        id: "c",
        text: "data dictionary management",
        why: "ผิด ฟังก์ชันนี้เก็บนิยามของ data element ไม่ได้ทำหน้าที่แปลงค่าตอนแสดงผล",
      },
      {
        id: "d",
        text: "database access languages and APIs",
        why: "ผิด ฟังก์ชันนี้คือการเปิดช่องให้สั่งงานผ่านภาษาสอบถามหรือส่วนต่อประสานโปรแกรม",
      },
    ],
    answer: "a",
    explanation:
      "ฟังก์ชันนี้คือเหตุผลที่ผู้ใช้ไม่ต้องรู้ว่าข้อมูลถูกเก็บจริงอย่างไร มันคือรูปธรรมของ data independence ที่บทนี้พูดถึง โปรแกรมและผู้ใช้ทำงานกับ logical format ส่วน DBMS รับผิดชอบ physical format แทน",
  },
  {
    id: "db-ch1-12",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-dbms-functions"],
    prompt:
      "ไฟดับกลางคันขณะระบบกำลังบันทึกใบสั่งซื้อ เมื่อเปิดเครื่องใหม่ DBMS ย้อนรายการที่ค้างกลางทางออกจนฐานข้อมูลกลับสู่สภาพสอดคล้อง ฟังก์ชันที่ทำงานคือข้อใด",
    choices: [
      {
        id: "a",
        text: "backup and recovery management",
        why: "ถูกต้อง การกู้คืนหลังระบบล้มเหลวเป็นหน้าที่ของฟังก์ชันนี้โดยตรง",
      },
      {
        id: "b",
        text: "data integrity management",
        why: "ผิด แม้ผลลัพธ์คือข้อมูลถูกต้อง แต่กลไกที่ทำงานคือการกู้คืนจากความล้มเหลว ไม่ใช่การบังคับกฎความถูกต้องตอนป้อนข้อมูล",
      },
      {
        id: "c",
        text: "multiuser access control",
        why: "ผิด เหตุการณ์นี้ไม่ได้เกี่ยวกับผู้ใช้หลายคนพร้อมกัน",
      },
      {
        id: "d",
        text: "database communication interfaces",
        why: "ผิด ฟังก์ชันนี้เกี่ยวกับการรับคำร้องขอผ่านเครือข่าย เช่น จากเว็บเบราว์เซอร์",
      },
    ],
    answer: "a",
    explanation:
      "ข้อนี้ต้องแยกให้ออกระหว่างการรักษาความถูกต้องตอนทำงานปกติ ซึ่งคือ data integrity management กับการซ่อมความเสียหายหลังระบบล้ม ซึ่งคือ backup and recovery management ทั้งสองข้อผลลัพธ์คล้ายกันแต่ทำงานคนละจังหวะ",
  },
  {
    id: "db-ch1-13",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-dbms-functions", "db-cost"],
    prompt: "ข้อใด “ไม่ใช่” ข้อดีของการใช้ DBMS ตามที่หนังสือระบุไว้ 7 ข้อ",
    choices: [
      {
        id: "a",
        text: "ลดต้นทุนรวมของระบบสารสนเทศลงอย่างชัดเจน",
        why: "ถูกต้องว่าไม่ใช่ข้อดี ตรงข้าม increased costs เป็นหนึ่งใน 5 ข้อเสียของระบบฐานข้อมูล",
      },
      {
        id: "b",
        text: "แชร์ข้อมูลระหว่างหน่วยงานได้ดีขึ้น",
        why: "ผิด improved data sharing เป็นข้อดีข้อที่ 1",
      },
      {
        id: "c",
        text: "ลดความขัดแย้งของข้อมูลให้เหลือน้อยที่สุด",
        why: "ผิด minimized data inconsistency เป็นข้อดีข้อที่ 4",
      },
      {
        id: "d",
        text: "ผู้ใช้ปลายทางทำงานได้ผลผลิตมากขึ้น",
        why: "ผิด increased end-user productivity เป็นข้อดีข้อที่ 7",
      },
    ],
    answer: "a",
    explanation:
      "ข้อดี 7 ข้อคือ sharing, security, integration, ลด inconsistency, access, decision making และ productivity ส่วนข้อเสีย 5 ข้อคือ increased costs, management complexity, maintaining currency, vendor dependence และ upgrade cycle ที่ถี่ ข้อสอบชอบเอาข้อเสียมาแอบในตัวเลือกข้อดี",
  },
  {
    id: "db-ch1-14",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-system-parts"],
    prompt:
      "ระบบฐานข้อมูลประกอบด้วย 5 ส่วน ได้แก่ hardware, software, people, procedures และ data ข้อใดจัดหมวดได้ถูกต้อง",
    choices: [
      {
        id: "a",
        text: "ระบบปฏิบัติการ ตัว DBMS และโปรแกรมประยุกต์ ล้วนนับอยู่ในส่วน software",
        why: "ถูกต้อง หนังสือระบุว่า software ของระบบฐานข้อมูลมี 3 ชนิดคือ OS, DBMS และ application กับ utility",
      },
      {
        id: "b",
        text: "ผู้ใช้ปลายทางไม่นับเป็นส่วนหนึ่งของระบบ เพราะอยู่นอกระบบ",
        why: "ผิด end users ถูกนับอยู่ในส่วน people ร่วมกับ DBA นักออกแบบ และโปรแกรมเมอร์",
      },
      {
        id: "c",
        text: "procedures หมายถึงกระบวนงานที่เขียนไว้ในโค้ดของ DBMS เท่านั้น",
        why: "ผิด procedures คือคำสั่งและกฎที่กำกับการออกแบบและการใช้งานระบบ เป็นเอกสารและมาตรฐาน ไม่ใช่โค้ด",
      },
      {
        id: "d",
        text: "data dictionary นับเป็นส่วนที่ 6 แยกออกจากทั้ง 5 ส่วน",
        why: "ผิด หนังสือระบุ 5 ส่วนเท่านั้น และ data dictionary เป็นสิ่งที่ DBMS จัดการ",
      },
    ],
    answer: "a",
    explanation:
      "จำเป็น H-S-P-P-D ได้แก่ hardware, software, people, procedures, data โดยส่วน software แตกได้อีก 3 ชนิด และส่วน people แตกได้เป็น system กับ database administrators, database designers, systems analysts กับ programmers และ end users",
  },
  {
    id: "db-ch1-15",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-system-parts"],
    prompt: "ตาม Figure 1.9 ความสัมพันธ์ของบทบาทคนในระบบฐานข้อมูลเป็นอย่างไร",
    choices: [
      {
        id: "a",
        text: "system administrator กำกับดูแล database administrator และ DBA เป็นผู้เขียนกับบังคับใช้ procedures และ standards",
        why: "ถูกต้องตามแผนภาพ DBA อยู่ใต้การกำกับของ system administrator และรับผิดชอบมาตรฐานการใช้งาน",
      },
      {
        id: "b",
        text: "end users เข้าถึงข้อมูลในดิสก์ได้โดยตรงโดยไม่ผ่านโปรแกรมประยุกต์หรือ DBMS",
        why: "ผิด ผู้ใช้เข้าถึงผ่าน application programs และ DBMS เสมอ นี่คือบทบาทตัวกลางของ DBMS",
      },
      {
        id: "c",
        text: "database designer เป็นผู้เขียนโปรแกรมประยุกต์ให้ผู้ใช้ใช้งาน",
        why: "ผิด ผู้เขียนโปรแกรมคือ programmers และ systems analysts ส่วน designer ออกแบบโครงสร้างฐานข้อมูล",
      },
      {
        id: "d",
        text: "DBA เป็นผู้ป้อนข้อมูลประจำวันทั้งหมดเข้าระบบแทนผู้ใช้",
        why: "ผิด งานป้อนข้อมูลประจำวันเป็นของผู้ใช้ปลายทาง ไม่ใช่ DBA",
      },
    ],
    answer: "a",
    explanation:
      "บทนี้ยังชี้ว่าเมื่อองค์กรย้ายมาใช้ระบบฐานข้อมูล บทบาทของคนจะเปลี่ยนจากการเขียนโปรแกรมไปเป็นการจัดการทรัพยากรข้อมูลขององค์กร และระบบจะให้กรอบที่บังคับใช้ procedure กับ standard ได้เข้มงวดขึ้น",
  },
  {
    id: "db-ch1-16",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-types"],
    prompt:
      "ฐานข้อมูลของระบบขายหน้าร้านที่บันทึกทุกใบเสร็จตลอดวัน กับฐานข้อมูลที่ผู้บริหารใช้ดูแนวโน้มยอดขายย้อนหลัง 5 ปีเพื่อวางกลยุทธ์ เรียกว่าอะไรตามลำดับ",
    choices: [
      {
        id: "a",
        text: "operational database และ data warehouse",
        why: "ถูกต้อง operational รองรับงานประจำวันจึงเรียกว่า transactional หรือ production ส่วน data warehouse เก็บข้อมูลเพื่อการตัดสินใจเชิงกลยุทธ์และยุทธวิธี",
      },
      {
        id: "b",
        text: "centralized database และ distributed database",
        why: "ผิด นั่นเป็นการแบ่งตามตำแหน่งที่ตั้งของข้อมูล ไม่ใช่ลักษณะการใช้งาน",
      },
      {
        id: "c",
        text: "desktop database และ enterprise database",
        why: "ผิด นั่นเป็นการแบ่งตามจำนวนผู้ใช้ที่รองรับ",
      },
      {
        id: "d",
        text: "workgroup database และ single-user database",
        why: "ผิด และยังสลับทิศด้วย ระบบที่ผู้บริหารทั้งองค์กรใช้ย่อมไม่ใช่ single-user",
      },
    ],
    answer: "a",
    explanation:
      "หนังสือแบ่งประเภทฐานข้อมูลด้วย 3 เกณฑ์คือ จำนวนผู้ใช้ ได้แก่ single-user กับ multiuser ที่แตกเป็น workgroup และ enterprise, ตำแหน่งที่ตั้ง ได้แก่ centralized กับ distributed และลักษณะการใช้งาน ได้แก่ operational กับ data warehouse",
  },
  {
    id: "db-ch1-17",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-structure-level"],
    prompt: "ข้อใดอธิบายระดับความมีโครงสร้างของข้อมูลได้ถูกต้อง",
    choices: [
      {
        id: "a",
        text: "unstructured data อยู่ในสภาพดั้งเดิมที่ยังไม่ถูกจัดรูปแบบ ส่วน semistructured data คือข้อมูลที่ผ่านการประมวลผลมาแล้วบางส่วน และ XML คือรูปแบบเชิงข้อความที่ใช้แทน data element",
        why: "ถูกต้องครบทั้งสามประเด็นตามที่หนังสือนิยาม",
      },
      {
        id: "b",
        text: "structured data คือข้อมูลที่ยังไม่ถูกจัดรูปแบบ จึงยืดหยุ่นที่สุด",
        why: "ผิด สลับนิยาม structured คือข้อมูลที่ผ่านการ format แล้ว",
      },
      {
        id: "c",
        text: "โครงสร้างที่ใส่ให้ข้อมูลถูกกำหนดตายตัวโดย DBMS ไม่ขึ้นกับงานที่จะทำ",
        why: "ผิด หนังสือระบุว่าโครงสร้างที่ใส่ให้ขึ้นกับประเภทการประมวลผลที่ตั้งใจจะทำ",
      },
      {
        id: "d",
        text: "XML database คือฐานข้อมูลที่รองรับเฉพาะ unstructured data เท่านั้น",
        why: "ผิด XML database รองรับ semistructured XML data",
      },
    ],
    answer: "a",
    explanation:
      "ลำดับคือ unstructured ยังดิบทั้งหมด semistructured ผ่านมาบ้าง และ structured จัดรูปแบบแล้ว จุดที่ต้องระวังคือ XML ไม่ใช่ unstructured แต่เป็นตัวแทนของ semistructured และ MS Access เป็นผลิตภัณฑ์เดียวในตาราง 1.1 ที่ไม่รองรับ XML",
  },
  {
    id: "db-ch1-18",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-file-limits", "db-redundancy"],
    prompt:
      "หน่วยงานหนึ่งเลิกใช้ file system แล้วย้ายมาใช้สเปรดชีตที่แต่ละแผนกเก็บไฟล์ของตัวเองไว้บนเครื่องตัวเอง หนังสือเรียกสถานการณ์แบบนี้ว่าอะไร และให้ข้อสรุปว่าอย่างไร",
    choices: [
      {
        id: "a",
        text: "เรียกว่า file system redux คือปัญหาเดิมกลับมาในร่างใหม่ เพราะยังเกิด islands of information และ redundancy เหมือนเดิม",
        why: "ถูกต้อง หนังสือเตือนว่าการเปลี่ยนเครื่องมือโดยไม่เปลี่ยนวิธีจัดการข้อมูลไม่ได้แก้ปัญหาเชิงโครงสร้าง",
      },
      {
        id: "b",
        text: "ถือว่าแก้ปัญหาแล้ว เพราะสเปรดชีตมีฟังก์ชันคำนวณและกรองข้อมูลในตัว",
        why: "ผิด ความสามารถในการคำนวณไม่ได้แก้ปัญหาข้อมูลกระจายและซ้ำซ้อน",
      },
      {
        id: "c",
        text: "เรียกว่า data warehouse เพราะรวบรวมข้อมูลจากหลายแผนก",
        why: "ผิด data warehouse คือฐานข้อมูลที่ออกแบบมาเพื่อการตัดสินใจ ไม่ใช่ไฟล์ที่กระจายอยู่ตามเครื่องแต่ละแผนก",
      },
      {
        id: "d",
        text: "เรียกว่า distributed database เพราะข้อมูลกระจายอยู่หลายที่",
        why: "ผิด distributed database ถูกจัดการโดย DBMS เดียวที่มองเห็นข้อมูลทั้งหมดเป็นระบบเดียว ต่างจากไฟล์ที่ต่างคนต่างเก็บ",
      },
    ],
    answer: "a",
    explanation:
      "ประเด็นของหัวข้อ file system redux คือปัญหาไม่ได้อยู่ที่เทคโนโลยีเก่า แต่อยู่ที่การปล่อยให้ข้อมูลเดียวกันถูกเก็บแยกกันหลายที่โดยไม่มีตัวกลางควบคุม ซึ่งทำให้ redundancy inconsistency และ anomalies กลับมาครบชุด",
  },
  {
    id: "db-ch1-19",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-metadata", "db-dbms-functions"],
    prompt: "ข้อใดอธิบายบทบาท “ตัวกลาง” ของ DBMS ระหว่างผู้ใช้กับฐานข้อมูลได้ถูกต้องที่สุด",
    choices: [
      {
        id: "a",
        text: "โปรแกรมประยุกต์ส่งคำร้องขอไปที่ DBMS แล้ว DBMS เป็นผู้ไปหยิบข้อมูลจริงให้ ทำให้โปรแกรมไม่ต้องรู้ว่าข้อมูลถูกเก็บอย่างไร",
        why: "ถูกต้อง นี่คือหัวใจของการเป็นตัวกลาง และเป็นที่มาของ data abstraction กับ structural independence",
      },
      {
        id: "b",
        text: "DBMS ทำสำเนาฐานข้อมูลให้โปรแกรมแต่ละตัวถือไว้เอง เพื่อให้เข้าถึงได้เร็ว",
        why: "ผิด นั่นจะสร้าง redundancy และ inconsistency ซึ่งตรงข้ามกับเป้าหมายของ DBMS",
      },
      {
        id: "c",
        text: "DBMS แปลงฐานข้อมูลให้เป็นชุดไฟล์แยกตามแผนก เพื่อให้แต่ละแผนกดูแลเอง",
        why: "ผิด นั่นคือการย้อนกลับไปสู่ islands of information",
      },
      {
        id: "d",
        text: "DBMS ทำหน้าที่เพียงตรวจสิทธิ์ผู้ใช้ ส่วนการอ่านเขียนข้อมูลยังเป็นหน้าที่ของโปรแกรมโดยตรง",
        why: "ผิด การตรวจสิทธิ์เป็นเพียงหนึ่งในเก้าฟังก์ชัน DBMS ยังรับผิดชอบการอ่านเขียนจริงด้วย",
      },
    ],
    answer: "a",
    explanation:
      "การเป็นตัวกลางคือสิ่งที่ทำให้ได้ทั้ง data abstraction, structural independence และ data independence เพราะโปรแกรมคุยกับ DBMS ด้วยมุมมองเชิงตรรกะ ส่วนรายละเอียดการจัดเก็บจริงเป็นภาระของ DBMS ฝ่ายเดียว",
  },
  {
    id: "db-ch1-20",
    chapter: "db-ch1",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-cost"],
    prompt:
      "องค์กรหนึ่งประเมินว่าถ้าย้ายมาใช้ระบบฐานข้อมูลจะต้องซื้อฮาร์ดแวร์ใหม่ จ้าง DBA เพิ่ม อบรมพนักงาน และผูกกับผลิตภัณฑ์ของผู้ขายรายเดียวไปอีกหลายปี ข้อสรุปใดตรงกับที่หนังสือกล่าวไว้มากที่สุด",
    choices: [
      {
        id: "a",
        text: "สิ่งเหล่านี้คือข้อเสียของระบบฐานข้อมูลที่หนังสือระบุไว้จริง แต่ไม่ได้แปลว่าไม่ควรย้าย ทางออกที่เลือกต้อง cost-effective และมีประสิทธิผลทั้งเชิงยุทธวิธีและกลยุทธ์",
        why: "ถูกต้อง หนังสือทั้งยอมรับข้อเสียและวางเกณฑ์ตัดสินใจไว้พร้อมกัน",
      },
      {
        id: "b",
        text: "ข้อเสียเหล่านี้ไม่มีอยู่จริง หนังสือระบุว่าระบบฐานข้อมูลดีกว่าทุกด้าน",
        why: "ผิด หนังสือระบุข้อเสียไว้ชัดเจน 5 ข้อ",
      },
      {
        id: "c",
        text: "เนื่องจากมีข้อเสีย 5 ข้อ องค์กรจึงควรใช้ file system ต่อไป",
        why: "ผิด หนังสือไม่ได้สรุปเช่นนั้น และข้อจำกัดของ file system ร้ายแรงกว่ามาก",
      },
      {
        id: "d",
        text: "เทคโนโลยีฐานข้อมูลที่องค์กรใช้อยู่เดิมไม่มีผลต่อการเลือกระบบใหม่เลย",
        why: "ผิด หนังสือระบุตรงข้ามว่าเทคโนโลยีเดิมที่ใช้อยู่มีผลต่อการเลือกระบบใหม่",
      },
    ],
    answer: "a",
    explanation:
      "ข้อเสีย 5 ข้อคือ increased costs, management complexity, maintaining currency, vendor dependence และวงรอบการอัปเกรดหรือเปลี่ยนระบบที่ถี่ หนังสือวางกรอบว่าการตัดสินใจต้องดูความคุ้มค่าและผลเชิงกลยุทธ์ประกอบ ไม่ใช่ดูข้อดีข้อเสียลอย ๆ",
  },
];
