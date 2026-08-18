import type { Question } from "@/lib/types";

/**
 * ข้อสอบบทที่ 3 — Data Models
 * อ้างอิง Coronel & Rob, Database Principles 10th ed. Chapter 3
 * ระดับปานกลาง–ยาก เน้นวิวัฒนาการของโมเดล การแปลง business rules และ 4 ระดับ abstraction
 */
export const dbCh3Questions: Question[] = [
  {
    id: "db-ch3-1",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-model-purpose"],
    prompt:
      "ทีมออกแบบเถียงกันว่าควรเริ่มลงมือสร้างตารางในฐานข้อมูลเลยหรือควรวาดโมเดลก่อน ข้อใดคือเหตุผลที่ตรงกับที่หนังสือให้ไว้มากที่สุดว่าทำไมต้องมี data model",
    choices: [
      {
        id: "a",
        text: "data model เป็นภาพนามธรรมอย่างง่ายของโครงสร้างข้อมูลที่ซับซ้อนในโลกจริง ใช้เป็นเครื่องมือสื่อสารให้ทุกฝ่ายเห็นตรงกันก่อนลงมือ",
        why: "ถูกต้อง หน้าที่หลักของโมเดลคือลดความซับซ้อนให้เข้าใจตรงกันระหว่างผู้ใช้ ผู้ออกแบบ และโปรแกรมเมอร์",
      },
      {
        id: "b",
        text: "data model คือซอฟต์แวร์ที่ใช้สร้างฐานข้อมูลโดยอัตโนมัติ จึงข้ามขั้นตอนการเขียน SQL ได้",
        why: "ผิด โมเดลคือภาพแทนเชิงแนวคิด ไม่ใช่ซอฟต์แวร์",
      },
      {
        id: "c",
        text: "data model มีไว้เพื่อกำหนดวิธีจัดเก็บข้อมูลลงดิสก์ให้ละเอียดที่สุด",
        why: "ผิด นั่นเป็นเรื่องของ physical model ซึ่งอยู่ระดับ abstraction ต่ำสุด ไม่ใช่จุดประสงค์ของการทำโมเดลโดยรวม",
      },
      {
        id: "d",
        text: "data model จำเป็นเฉพาะกับฐานข้อมูลขนาดใหญ่ระดับองค์กรเท่านั้น",
        why: "ผิด หนังสือไม่ได้จำกัดขนาด และย้ำว่ามุมมองที่ต่างกันของแต่ละคนคือเหตุผลที่ต้องมีโมเดลเสมอ",
      },
    ],
    answer: "a",
    explanation:
      "โมเดลข้อมูลคือภาพแทนอย่างง่ายของโครงสร้างข้อมูลในโลกจริง จุดสำคัญคือคนแต่ละคนมองข้อมูลชุดเดียวกันไม่เหมือนกัน โมเดลจึงเป็นตัวกลางบังคับให้ทุกฝ่ายตกลงความหมายให้ตรงกันก่อนสร้างจริง",
  },
  {
    id: "db-ch3-2",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-building-blocks"],
    prompt:
      "ในการออกแบบระบบทะเบียน มีข้อความว่า “นักศึกษาแต่ละคนมีรหัส ชื่อ และเกรดเฉลี่ยที่ต้องอยู่ระหว่าง 0.00 ถึง 4.00 และนักศึกษาลงทะเบียนเรียนได้หลายวิชา” ข้อใดจับคู่ส่วนประกอบกับ building block ได้ถูกต้อง",
    choices: [
      {
        id: "a",
        text: "STUDENT เป็น entity, รหัสกับชื่อกับเกรดเฉลี่ยเป็น attribute, ช่วง 0.00–4.00 เป็น constraint, และการลงทะเบียนเรียนเป็น relationship",
        why: "ถูกต้องครบทั้งสี่ building block ตามนิยามของหนังสือ",
      },
      {
        id: "b",
        text: "เกรดเฉลี่ยเป็น entity เพราะมีค่าของตัวเอง ส่วนช่วง 0.00–4.00 เป็น attribute ของมัน",
        why: "ผิด เกรดเฉลี่ยเป็นคุณลักษณะของนักศึกษา จึงเป็น attribute ไม่ใช่ entity",
      },
      {
        id: "c",
        text: "การลงทะเบียนเรียนเป็น constraint เพราะเป็นกฎที่บังคับให้นักศึกษาต้องเรียน",
        why: "ผิด นั่นคือความเชื่อมโยงระหว่าง entity สองตัว จึงเป็น relationship",
      },
      {
        id: "d",
        text: "ช่วง 0.00–4.00 เป็น relationship ระหว่างนักศึกษากับระบบเกรด",
        why: "ผิด ข้อจำกัดค่าที่ยอมรับได้คือ constraint ตามนิยามตรง ๆ",
      },
    ],
    answer: "a",
    explanation:
      "Building blocks 4 ตัวคือ entity สิ่งที่เราเก็บข้อมูลของมัน, attribute คุณลักษณะของ entity, relationship ความเชื่อมโยงระหว่าง entity และ constraint ข้อจำกัดที่วางบนข้อมูล ทั้งสี่ตัวนี้เป็นรากของทั้งบทที่ 3 และบทที่ 4",
  },
  {
    id: "db-ch3-3",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-business-rules", "db-relationship-type"],
    prompt:
      "business rule เขียนว่า “พนักงานหนึ่งคนเรียนรู้ทักษะได้หลายทักษะ และทักษะหนึ่งอย่างถูกเรียนรู้โดยพนักงานได้หลายคน” เมื่อแปลงเป็นโมเดลจะได้อะไร",
    choices: [
      {
        id: "a",
        text: "entity คือ EMPLOYEE กับ SKILL, relationship คือ learns และ connectivity เป็น M:N",
        why: "ถูกต้อง คำนามกลายเป็น entity คำกริยากลายเป็น relationship และคำตอบของคำถามสองทิศทางล้วนเป็น “หลาย” จึงเป็น M:N",
      },
      {
        id: "b",
        text: "entity คือ EMPLOYEE กับ SKILL และ connectivity เป็น 1:M เพราะพนักงานเป็นฝ่ายเริ่มเรียน",
        why: "ผิด ต้องถามสองทิศทางเสมอ ทิศทางจาก SKILL กลับไป EMPLOYEE ก็เป็นหลายคน จึงไม่ใช่ 1:M",
      },
      {
        id: "c",
        text: "learns เป็น entity เพราะเป็นสิ่งที่ต้องเก็บข้อมูล ส่วน EMPLOYEE กับ SKILL เป็น attribute ของมัน",
        why: "ผิด สลับกฎการแปลง คำกริยาแปลงเป็น relationship ไม่ใช่ entity",
      },
      {
        id: "d",
        text: "เป็น 1:1 เพราะประโยคกล่าวถึงพนักงานหนึ่งคนและทักษะหนึ่งอย่าง",
        why: "ผิด คำว่าหนึ่งในประโยคเป็นเพียงจุดตั้งต้นของคำถาม ไม่ใช่คำตอบของ connectivity",
      },
    ],
    answer: "a",
    explanation:
      "กฎแปลงคือคำนามเป็น entity คำกริยาเป็น relationship และความสัมพันธ์เป็นสองทิศทางเสมอ ต้องถามสองคำถามคือ B กี่ instance ต่อ A หนึ่ง instance และ A กี่ instance ต่อ B หนึ่ง instance คำตอบทั้งคู่ว่าหลายจึงได้ M:N",
  },
  {
    id: "db-ch3-4",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-relationship-type"],
    prompt:
      "จากประโยคทั้งสาม\n(1) จิตรกรหนึ่งคนวาดภาพได้หลายภาพ และภาพหนึ่งภาพวาดโดยจิตรกรคนเดียว\n(2) พนักงานหนึ่งคนบริหารร้านได้หนึ่งร้าน และร้านหนึ่งร้านมีผู้บริหารคนเดียว\n(3) นักศึกษาหนึ่งคนลงเรียนได้หลายวิชา และวิชาหนึ่งวิชามีนักศึกษาลงเรียนหลายคน\nชนิดความสัมพันธ์ตามลำดับคือข้อใด",
    choices: [
      { id: "a", text: "1:M, 1:1, M:N", why: "ถูกต้องทั้งสามข้อตามการถามสองทิศทาง" },
      {
        id: "b",
        text: "M:N, 1:M, 1:1",
        why: "ผิด ข้อ 1 มีทิศกลับเป็นหนึ่งจึงไม่ใช่ M:N และข้อ 3 มีทั้งสองทิศเป็นหลายจึงไม่ใช่ 1:1",
      },
      {
        id: "c",
        text: "1:M, M:N, 1:1",
        why: "ผิด ข้อ 2 ทั้งสองทิศทางเป็นหนึ่ง จึงเป็น 1:1 ไม่ใช่ M:N",
      },
      {
        id: "d",
        text: "1:1, 1:M, M:N",
        why: "ผิด ข้อ 1 ทิศจากจิตรกรไปภาพเป็นหลาย จึงเป็น 1:M ไม่ใช่ 1:1",
      },
    ],
    answer: "a",
    explanation:
      "หนังสือใช้ตัวอย่างมาตรฐานคือ PAINTER paints many PAINTINGs เป็น 1:M, EMPLOYEE manages one STORE เป็น 1:1 และ EMPLOYEE learns many SKILLs เป็น M:N หลักการเดียวที่ต้องใช้คือถามทั้งสองทิศทางทุกครั้ง",
  },
  {
    id: "db-ch3-5",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-business-rules"],
    prompt: "ข้อใด “ไม่ใช่” แหล่งที่มาของ business rules หรือคุณสมบัติของ business rules ที่ดีตามที่หนังสือระบุ",
    choices: [
      {
        id: "a",
        text: "ค่าเริ่มต้นที่ผู้ผลิต DBMS ตั้งมาให้ในซอฟต์แวร์",
        why: "ถูกต้องว่าไม่ใช่ business rule เกิดจากนโยบายและการดำเนินงานขององค์กร ไม่ได้มาจากค่าตั้งต้นของซอฟต์แวร์",
      },
      {
        id: "b",
        text: "การสัมภาษณ์ผู้ใช้ปลายทางโดยตรง",
        why: "ผิด เป็นแหล่งที่มาที่หนังสือระบุไว้",
      },
      {
        id: "c",
        text: "เอกสารที่เขียนไว้ เช่น procedures, standards และ operations manuals",
        why: "ผิด เป็นแหล่งที่มาที่หนังสือระบุไว้",
      },
      {
        id: "d",
        text: "ต้องเขียนเป็นลายลักษณ์อักษร อัปเดตให้ทันสมัย เข้าใจง่าย และเผยแพร่ให้ทั่วถึง",
        why: "ผิด เป็นคุณสมบัติของ business rule ที่ดีตามที่หนังสือระบุ",
      },
    ],
    answer: "a",
    explanation:
      "Business rules คือคำอธิบายนโยบาย ขั้นตอน หรือหลักการภายในองค์กรหนึ่ง ๆ มาจากผู้บริหาร ผู้กำหนดนโยบาย หัวหน้าแผนก เอกสาร และผู้ใช้ ประโยชน์คือทำให้มุมมองต่อข้อมูลเป็นมาตรฐาน เป็นเครื่องมือสื่อสาร และช่วยให้ผู้ออกแบบกำหนด participation rules กับ constraints ได้ถูกต้อง",
  },
  {
    id: "db-ch3-6",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-business-rules"],
    prompt:
      "หนังสือระบุว่าการตั้งชื่อ object เกิดขึ้นระหว่างการแปลง business rules เป็นองค์ประกอบของ data model ข้อใดคือผลลัพธ์ของการตั้งชื่อที่ดี",
    choices: [
      {
        id: "a",
        text: "ช่วยการสื่อสารระหว่างฝ่ายต่าง ๆ และส่งเสริม self-documentation คือโมเดลอธิบายตัวเองได้โดยไม่ต้องพึ่งคู่มือแยก",
        why: "ถูกต้องตรงตามผลลัพธ์ 2 ข้อที่หนังสือระบุ",
      },
      {
        id: "b",
        text: "ทำให้ฐานข้อมูลทำงานเร็วขึ้นเพราะ DBMS ค้นหาชื่อสั้นได้ไวกว่า",
        why: "ผิด หนังสือไม่ได้พูดถึงประสิทธิภาพในหัวข้อนี้ และชื่อควรสื่อความหมายมากกว่าสั้น",
      },
      {
        id: "c",
        text: "ลดจำนวน entity ที่ต้องสร้างในโมเดลลง",
        why: "ผิด การตั้งชื่อไม่ได้เปลี่ยนจำนวน entity",
      },
      {
        id: "d",
        text: "ทำให้ไม่ต้องเขียน business rules เป็นลายลักษณ์อักษรอีกต่อไป",
        why: "ผิด หนังสือย้ำว่า business rules ต้องเป็นลายลักษณ์อักษรและอัปเดตเสมอ",
      },
    ],
    answer: "a",
    explanation:
      "ชื่อที่ดีต้องทำให้ object แยกแยะจากตัวอื่นได้ สื่อความหมายถึงสิ่งนั้นในโลกจริง และคุ้นเคยสำหรับผู้ใช้ ผลที่ได้คือการสื่อสารดีขึ้นและโมเดลอธิบายตัวเองได้",
  },
  {
    id: "db-ch3-7",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-evolution"],
    prompt: "เรียงลำดับการถือกำเนิดของโมเดลต่อไปนี้จากเก่าไปใหม่ตามไทม์ไลน์ใน Figure 3.6",
    choices: [
      {
        id: "a",
        text: "Hierarchical (1960) → Network (1969) → Relational (1970) → Entity Relationship (1976) → Object-Oriented (1985) → NoSQL (2009)",
        why: "ถูกต้องตรงตามไทม์ไลน์ในหนังสือ",
      },
      {
        id: "b",
        text: "Network (1960) → Hierarchical (1969) → Relational (1970) → Object-Oriented (1976) → Entity Relationship (1985) → NoSQL (2009)",
        why: "ผิด สลับคู่แรกและสลับ ER กับ OO ER มาก่อน OO",
      },
      {
        id: "c",
        text: "Relational (1960) → Hierarchical (1969) → Network (1970) → Entity Relationship (1976) → NoSQL (1985) → Object-Oriented (2009)",
        why: "ผิด relational เกิดปี 1970 ไม่ใช่ 1960 และ NoSQL เป็นตัวใหม่ที่สุด",
      },
      {
        id: "d",
        text: "Hierarchical (1960) → Relational (1969) → Network (1970) → Object-Oriented (1976) → Entity Relationship (1985) → NoSQL (2009)",
        why: "ผิด network มาก่อน relational และ ER ปี 1976 มาก่อน OO ปี 1985",
      },
    ],
    answer: "a",
    explanation:
      "ไทม์ไลน์ที่ต้องจำคือ 1960 hierarchical, 1969 network, 1970 relational โดย Codd, 1976 ER โดย Chen, 1978 semantic, 1985 object-oriented, 1990 extended relational และ 2009 NoSQL ระวังอย่าสับสนกับปี 1985 ที่ Codd ออกกฎ 12 ข้อ",
  },
  {
    id: "db-ch3-8",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-hierarchical-network"],
    prompt: "ข้อใด “ไม่ใช่” ข้อจำกัดของ hierarchical model",
    choices: [
      {
        id: "a",
        text: "ไม่สามารถปรับปรุงประสิทธิภาพของการเข้าถึงข้อมูลได้เลยเมื่อเทียบกับ file system",
        why: "ถูกต้องว่าไม่ใช่ข้อจำกัด hierarchical เป็นระบบฐานข้อมูลยุคแรกที่ให้ประสิทธิภาพดีขึ้นจาก file system ข้อจำกัดของมันอยู่ที่ความยืดหยุ่นและความสัมพันธ์",
      },
      {
        id: "b",
        text: "แทนความสัมพันธ์แบบ M:N ไม่ได้",
        why: "ผิด นี่คือข้อจำกัดหลักข้อหนึ่งของ hierarchical",
      },
      {
        id: "c",
        text: "มี structural level dependency คือผูกกับโครงสร้างแบบต้นไม้อย่างแน่นหนา",
        why: "ผิด นี่คือข้อจำกัดที่หนังสือระบุไว้",
      },
      {
        id: "d",
        text: "ไม่มี ad hoc query ต้องเข้าถึงแบบ record-at-a-time ตาม access path ที่กำหนดไว้ล่วงหน้า",
        why: "ผิด นี่คือลักษณะ navigational ซึ่งเป็นข้อจำกัดของทั้ง hierarchical และ network",
      },
    ],
    answer: "a",
    explanation:
      "Hierarchical และ network เป็น navigational model คือผู้เขียนโปรแกรมต้องเดินตามเส้นทางที่กำหนดไว้ ทำได้ทีละ record ไม่มี ad hoc query แบบ set-oriented และ hierarchical ยังแทน M:N ไม่ได้เลย นี่คือช่องว่างที่ relational มาปิด",
  },
  {
    id: "db-ch3-9",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-hierarchical-network", "db-abstraction"],
    prompt:
      "คำว่า schema และ subschema เป็นมรดกจาก network model ข้อใดจับคู่กับระดับ abstraction ในภายหลังได้ถูกต้อง",
    choices: [
      {
        id: "a",
        text: "schema คือมุมมองรวมของฐานข้อมูลทั้งหมดตามที่ DBA เห็น เทียบได้กับ conceptual model ส่วน subschema คือส่วนที่โปรแกรมประยุกต์มองเห็น เทียบได้กับ external model",
        why: "ถูกต้องตามที่หนังสือเชื่อมโยงไว้",
      },
      {
        id: "b",
        text: "schema เทียบได้กับ internal model เพราะเป็นสิ่งที่ DBMS เห็น ส่วน subschema เทียบได้กับ physical model",
        why: "ผิด สิ่งที่ DBMS เห็นคือ internal model ส่วน schema เป็นมุมมองรวมเชิงแนวคิดของ DBA",
      },
      {
        id: "c",
        text: "schema กับ subschema เป็นคำของ relational model ไม่เกี่ยวกับ network model",
        why: "ผิด ทั้งสองคำเกิดในยุค network model แล้วตกทอดมาใช้ต่อ",
      },
      {
        id: "d",
        text: "subschema คือมุมมองรวมทั้งฐานข้อมูล ส่วน schema คือมุมมองของโปรแกรมแต่ละตัว",
        why: "ผิด สลับนิยามกัน schema คือทั้งหมด subschema คือส่วนย่อย",
      },
    ],
    answer: "a",
    explanation:
      "Network model ยังทิ้งคำว่า DML ซึ่งนิยามสภาพแวดล้อมที่ข้อมูลถูกจัดการ และ DDL ซึ่งให้ผู้ดูแลนิยามองค์ประกอบของ schema ไว้ให้ด้วย สี่คำนี้คือคำที่ยังใช้อยู่ในฐานข้อมูลปัจจุบัน",
  },
  {
    id: "db-ch3-10",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-hierarchical-network"],
    prompt: "ในโครงสร้าง set ของ network model ข้อใดถูกต้อง",
    choices: [
      {
        id: "a",
        text: "set คือคอลเลกชันของ record ที่อยู่ในความสัมพันธ์ 1:M โดยมี owner เป็นฝั่ง 1 และ member เป็นฝั่ง M และ record หนึ่งมีพ่อได้มากกว่าหนึ่งตัว",
        why: "ถูกต้องทั้งนิยาม set และจุดต่างสำคัญจาก hierarchical",
      },
      {
        id: "b",
        text: "set คือความสัมพันธ์ M:N โดยตรง จึงไม่ต้องแตกเป็น 1:M อีก",
        why: "ผิด set เป็นความสัมพันธ์ 1:M ระหว่าง owner กับ member",
      },
      {
        id: "c",
        text: "record ใน network model มีพ่อได้เพียงตัวเดียวเหมือน hierarchical",
        why: "ผิด นี่คือจุดที่ network ต่างจาก hierarchical โดยตรง",
      },
      {
        id: "d",
        text: "network model ไม่ได้พยายามกำหนดมาตรฐานฐานข้อมูลใด ๆ",
        why: "ผิด หนังสือระบุว่า network model กำหนดมาตรฐานฐานข้อมูลไว้ด้วย",
      },
    ],
    answer: "a",
    explanation:
      "Network model ถูกสร้างขึ้นเพื่อแทนความสัมพันธ์ที่ซับซ้อนกว่าที่ hierarchical ทำได้ ปรับปรุงประสิทธิภาพ และกำหนดมาตรฐาน จุดต่างที่ต้องจำคือ record หนึ่งมีพ่อได้หลายตัว",
  },
  {
    id: "db-ch3-11",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-evolution"],
    prompt:
      "เหตุใดโมเดลเชิงสัมพันธ์จึงถูกมองว่าใช้งานจริงไม่ได้ในช่วงที่เพิ่งถูกเสนอเมื่อปี 1970",
    choices: [
      {
        id: "a",
        text: "เพราะมัน conceptually simple แต่แลกมาด้วย computer overhead ที่ฮาร์ดแวร์สมัยนั้นรับไม่ไหว",
        why: "ถูกต้อง เป็นประโยคที่หนังสือย้ำและออกสอบบ่อย",
      },
      {
        id: "b",
        text: "เพราะยังไม่มีใครคิดวิธีแทนความสัมพันธ์ M:N ในตารางได้",
        why: "ผิด การแตก M:N ด้วย composite entity เป็นเรื่องที่ทำได้ในโมเดลเชิงสัมพันธ์อยู่แล้ว",
      },
      {
        id: "c",
        text: "เพราะมันซับซ้อนกว่า network model มากจนผู้ใช้เรียนรู้ไม่ไหว",
        why: "ผิด ตรงกันข้าม จุดขายของมันคือความเรียบง่ายเชิงแนวคิด",
      },
      {
        id: "d",
        text: "เพราะยังไม่มีการคิดค้นแนวคิดเรื่อง key และ integrity",
        why: "ผิด Codd เสนอโมเดลพร้อมรากฐานทางคณิตศาสตร์ตั้งแต่แรก",
      },
    ],
    answer: "a",
    explanation:
      "Codd จาก IBM เสนอ relational model ในปี 1970 จุดแข็งคือ conceptual simplicity ที่ให้ structural independence ทำ ad hoc query ผ่าน SQL ได้ และเข้าถึงแบบ set-oriented แต่ต้นทุนคือภาระการประมวลผลที่สูง จึงต้องรอฮาร์ดแวร์ตามทัน",
  },
  {
    id: "db-ch3-12",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-er-oo"],
    prompt: "ข้อใดถูกต้องเกี่ยวกับ Entity Relationship model",
    choices: [
      {
        id: "a",
        text: "เสนอโดย Chen ในปี 1976 เป็นภาพกราฟิกที่เข้าใจง่ายและมี semantics มากขึ้น แต่จำกัดอยู่ที่การทำ conceptual modeling ไม่มีส่วนของการ implement",
        why: "ถูกต้องทั้งชื่อ ปี จุดแข็ง และข้อจำกัด",
      },
      {
        id: "b",
        text: "เสนอโดย Codd ในปี 1976 และใช้แทน relational model โดยสมบูรณ์",
        why: "ผิด Codd คือเจ้าของ relational model ปี 1970 และ ER ไม่ได้มาแทน relational แต่ใช้ออกแบบก่อนแปลงเป็นตาราง",
      },
      {
        id: "c",
        text: "ใช้ Chen notation เป็นมาตรฐานเดียว หนังสือเล่มนี้จึงไม่กล่าวถึง Crow's Foot",
        why: "ผิด หนังสือระบุว่า Chen ใช้สี่เหลี่ยมข้าวหลามตัด แต่เล่มนี้ใช้ Crow's Foot เป็นมาตรฐานการออกแบบ",
      },
      {
        id: "d",
        text: "entity ใน ER map เป็น row ในตาราง ส่วน entity instance map เป็นทั้งตาราง",
        why: "ผิด สลับกัน entity map เป็นทั้งตาราง ส่วน entity instance คือหนึ่ง row",
      },
    ],
    answer: "a",
    explanation:
      "ต้องแยกให้ชัดว่า entity เทียบเท่าตาราง entity instance หรือ occurrence เทียบเท่าหนึ่งแถว และ entity set คือคอลเลกชันของ entity ประเภทเดียวกัน ส่วน connectivity คือป้ายบอกชนิดความสัมพันธ์ 1:M, M:N หรือ 1:1",
  },
  {
    id: "db-ch3-13",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-evolution", "db-nosql"],
    prompt:
      "Figure 3.6 มีแกนบอกปริมาณ semantics ในโมเดล ข้อสรุปใดถูกต้องตามภาพนั้น",
    choices: [
      {
        id: "a",
        text: "semantics เพิ่มขึ้นเรื่อย ๆ ตั้งแต่ hierarchical จนถึง object-oriented แต่ NoSQL ซึ่งใหม่กว่ากลับมี semantics น้อยลง",
        why: "ถูกต้อง นี่คือกับดักที่หนังสือเตือนไว้ว่าใหม่กว่าไม่ได้แปลว่า semantics เยอะกว่าเสมอ",
      },
      {
        id: "b",
        text: "semantics เพิ่มขึ้นตลอดตามเวลา โมเดลที่ใหม่ที่สุดจึงมี semantics มากที่สุดเสมอ",
        why: "ผิด NoSQL เป็นข้อยกเว้นที่ชัดเจนในภาพนั้น",
      },
      {
        id: "c",
        text: "NoSQL มี semantics มากที่สุดเพราะรองรับข้อมูลได้หลากหลายรูปแบบที่สุด",
        why: "ผิด ความยืดหยุ่นแบบ schema-less ทำให้โมเดลบรรจุความหมายไว้น้อยลง ไม่ใช่มากขึ้น",
      },
      {
        id: "d",
        text: "hierarchical มี semantics มากที่สุดเพราะโครงสร้างต้นไม้บังคับความสัมพันธ์ไว้ชัดเจน",
        why: "ผิด hierarchical อยู่ปลายด้าน semantics น้อยที่สุดในภาพ",
      },
    ],
    answer: "a",
    explanation:
      "หนังสือยังสรุปลักษณะร่วมของทุกโมเดลไว้ว่าต้องมี conceptual simplicity ควบคู่กับ semantic completeness แทนโลกจริงให้ใกล้เคียงที่สุด และรักษา consistency กับ integrity พร้อมย้ำสองประโยคว่าแต่ละโมเดลใหม่ต่อยอดจากจุดอ่อนของโมเดลก่อนหน้า และบางโมเดลเหมาะกับบางงานมากกว่า",
  },
  {
    id: "db-ch3-14",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-nosql"],
    prompt:
      "ระบบหนึ่งเก็บโปรไฟล์ผู้ใช้ที่มีคอลัมน์ที่เป็นไปได้นับพัน แต่ผู้ใช้แต่ละคนกรอกจริงเพียงไม่กี่ช่อง และเมื่ออัปเดตข้อมูลที่หนึ่ง ผู้ใช้ที่อ่านจากอีกศูนย์ข้อมูลอาจยังเห็นค่าเก่าอยู่ครู่หนึ่ง ข้อใดอธิบายสองลักษณะนี้ได้ถูกต้อง",
    choices: [
      {
        id: "a",
        text: "ลักษณะแรกคือ sparse data และลักษณะที่สองคือ eventual consistency",
        why: "ถูกต้อง sparse data คือ attribute เยอะแต่ instance จริงน้อย และ eventual consistency คือสำเนาทุกชุดจะตรงกันในที่สุดแต่ไม่ใช่ทันที",
      },
      {
        id: "b",
        text: "ลักษณะแรกคือ key-value data model และลักษณะที่สองคือ data inconsistency ที่เกิดจากการออกแบบผิด",
        why: "ผิด การอ่านค่าเก่าชั่วคราวเป็นพฤติกรรมที่ NoSQL ตั้งใจยอมแลก ไม่ใช่ความผิดพลาดของการออกแบบ",
      },
      {
        id: "c",
        text: "ลักษณะแรกคือ eventual consistency และลักษณะที่สองคือ sparse data",
        why: "ผิด สลับกัน",
      },
      {
        id: "d",
        text: "ทั้งสองลักษณะเป็นข้อบกพร่องที่ทำให้ NoSQL ใช้กับงานจริงไม่ได้",
        why: "ผิด ทั้งสองเป็นคุณลักษณะที่ตั้งใจออกแบบเพื่อแลกกับ scalability และ performance",
      },
    ],
    answer: "a",
    explanation:
      "NoSQL ไม่ได้อิงโมเดลเชิงสัมพันธ์ รองรับสถาปัตยกรรมแบบกระจาย มี scalability และ availability สูง ทนความล้มเหลว รองรับ sparse data มหาศาล และเน้น performance มากกว่า transaction consistency จุดที่มักพลาดคือ eventual consistency ไม่ได้แปลว่าไม่มี consistency",
  },
  {
    id: "db-ch3-15",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-terminology"],
    prompt:
      "ตาม Table 3.3 คำที่หมายถึง “กลุ่มของ vendor ทั้งหมด” ในแต่ละโมเดลคือข้อใด เรียงตามลำดับ file processing, hierarchical, network, relational, ER, OO",
    choices: [
      {
        id: "a",
        text: "File, segment type, record type, table, entity set, class",
        why: "ถูกต้องตรงตามแถวบนสุดของตาราง 3.3",
      },
      {
        id: "b",
        text: "Record, segment occurrence, current record, row, entity occurrence, object instance",
        why: "ผิด นี่คือแถวของ vendor หนึ่งราย ไม่ใช่กลุ่มทั้งหมด",
      },
      {
        id: "c",
        text: "Field, segment field, record field, table attribute, entity attribute, object attribute",
        why: "ผิด นี่คือแถวของชื่อผู้ติดต่อ ซึ่งเป็นระดับ attribute",
      },
      {
        id: "d",
        text: "Index, sequence field, record key, key, entity identifier, object identifier",
        why: "ผิด นี่คือแถวของรหัส vendor ซึ่งเป็นระดับตัวระบุ",
      },
    ],
    answer: "a",
    explanation:
      "อ่านตาราง 3.3 ตามแนวนอน สิ่งเดียวกันในโลกจริงถูกเรียกต่างกันในแต่ละโมเดล ระดับที่ต้องแยกให้ออกมีสี่ระดับคือ ทั้งกลุ่ม หนึ่งรายการ หนึ่งคุณลักษณะ และตัวระบุ",
  },
  {
    id: "db-ch3-16",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-abstraction"],
    prompt: "ข้อใดจับคู่ระดับ abstraction กับมุมมองของผู้เกี่ยวข้องได้ถูกต้อง",
    choices: [
      {
        id: "a",
        text: "external คือมุมมองของ end user, conceptual คือมุมมองรวมของนักออกแบบ, internal คือมุมมองที่ DBMS เห็น และ physical คือวิธีบันทึกลงสื่อจริง",
        why: "ถูกต้องครบทั้งสี่ระดับตาม Figure 3.7",
      },
      {
        id: "b",
        text: "conceptual คือมุมมองของ end user ส่วน external คือมุมมองรวมของทั้งองค์กร",
        why: "ผิด สลับกัน external คือมุมมองย่อยของผู้ใช้แต่ละกลุ่ม ส่วน conceptual คือมุมมองรวม",
      },
      {
        id: "c",
        text: "internal คือมุมมองของ end user เพราะเป็นระดับที่ผู้ใช้ทำงานจริง",
        why: "ผิด internal คือมุมมองของ DBMS ที่ map conceptual model เข้ากับซอฟต์แวร์ฐานข้อมูล",
      },
      {
        id: "d",
        text: "physical คือระดับ abstraction สูงสุดเพราะเป็นภาพรวมของฮาร์ดแวร์ทั้งหมด",
        why: "ผิด physical คือระดับต่ำสุด",
      },
    ],
    answer: "a",
    explanation:
      "ANSI/SPARC นิยามไว้ 3 ระดับในทศวรรษ 1970 คือ external, conceptual และ internal ส่วนหนังสือเพิ่ม physical เข้ามาเป็นระดับที่ 4 ที่ระดับ conceptual นิยมใช้ ER model และ ERD คือภาพกราฟิกของ conceptual schema",
  },
  {
    id: "db-ch3-17",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-abstraction"],
    prompt: "ตาม Table 3.4 ข้อใดระบุความเป็นอิสระจากฮาร์ดแวร์และซอฟต์แวร์ของแต่ละระดับได้ถูกต้อง",
    choices: [
      {
        id: "a",
        text: "external และ conceptual เป็นอิสระจากทั้งฮาร์ดแวร์และซอฟต์แวร์, internal เป็นอิสระจากฮาร์ดแวร์อย่างเดียว, physical ไม่เป็นอิสระจากทั้งสองอย่าง",
        why: "ถูกต้องตรงตามตาราง 3.4 ทั้งสี่แถว",
      },
      {
        id: "b",
        text: "ทุกระดับเป็นอิสระจากทั้งฮาร์ดแวร์และซอฟต์แวร์ เพราะเป็นโมเดลเชิงแนวคิดทั้งหมด",
        why: "ผิด internal ผูกกับซอฟต์แวร์ฐานข้อมูลที่ใช้ และ physical ผูกกับทั้งสองอย่าง",
      },
      {
        id: "c",
        text: "internal เป็นอิสระจากซอฟต์แวร์อย่างเดียว ส่วน physical เป็นอิสระจากฮาร์ดแวร์อย่างเดียว",
        why: "ผิด สลับกัน internal ผูกกับ DBMS จึงเป็นอิสระจากฮาร์ดแวร์เท่านั้น และ physical ไม่เป็นอิสระจากอะไรเลย",
      },
      {
        id: "d",
        text: "conceptual ผูกกับ DBMS ที่เลือกใช้ จึงต้องออกแบบใหม่ทุกครั้งที่เปลี่ยนผลิตภัณฑ์",
        why: "ผิด จุดเด่นของ conceptual คือเปลี่ยนฮาร์ดแวร์หรือซอฟต์แวร์แล้วการออกแบบระดับนี้ไม่กระทบ",
      },
    ],
    answer: "a",
    explanation:
      "ไล่จากบนลงล่างคือ อิสระจากทั้งคู่ อิสระจากทั้งคู่ อิสระจากฮาร์ดแวร์อย่างเดียว และไม่อิสระจากอะไรเลย ตารางเสริมใน Figure 3.7 ยังบอกอีกว่า OO กับ ER อยู่ระดับสูง relational อยู่ระดับกลางคือ hardware-independent แต่ software-dependent และ network กับ hierarchical อยู่ระดับต่ำ",
  },
  {
    id: "db-ch3-18",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-independence"],
    prompt:
      "พิจารณาสองเหตุการณ์\n(1) องค์กรย้ายฐานข้อมูลจาก MySQL ไป Oracle โดยแบบจำลอง ERD ระดับ conceptual ไม่ต้องแก้เลย\n(2) ผู้ดูแลย้ายไฟล์ข้อมูลจากจานแม่เหล็กไป SSD และเปลี่ยนวิธีจัดสรรพื้นที่ โดยนิยามตารางใน DBMS ไม่ต้องแก้\nแต่ละเหตุการณ์อาศัย independence ชนิดใด",
    choices: [
      {
        id: "a",
        text: "(1) logical independence และ (2) physical independence",
        why: "ถูกต้อง logical independence อยู่ระหว่าง conceptual กับ internal ส่วน physical independence อยู่ระหว่าง internal กับ physical",
      },
      {
        id: "b",
        text: "(1) physical independence และ (2) logical independence",
        why: "ผิด สลับกัน การเปลี่ยน DBMS กระทบ internal model จึงเป็นเรื่องของ logical independence",
      },
      {
        id: "c",
        text: "ทั้งสองเหตุการณ์คือ physical independence เพราะเป็นการเปลี่ยนสิ่งที่จับต้องได้",
        why: "ผิด การเปลี่ยนผลิตภัณฑ์ DBMS ไม่ใช่การเปลี่ยนระดับ physical",
      },
      {
        id: "d",
        text: "ทั้งสองเหตุการณ์คือ structural independence ซึ่งเป็นศัพท์ที่ใช้แทนกันได้",
        why: "ผิด structural independence เป็นศัพท์ของบทที่ 1 ที่เทียบ file system กับฐานข้อมูล ไม่ใช่ชื่อของสองระดับนี้",
      },
    ],
    answer: "a",
    explanation:
      "วิธีจำคือไล่จากบนลงล่างเป็น Conceptual แล้ว logical แล้ว Internal แล้ว physical แล้ว Physical ได้ตัวอักษร C-I-P และ L มาก่อน P ตำแหน่งของ independence สองตัวนี้เป็นจุดที่ออกสอบแทบทุกครั้ง",
  },
  {
    id: "db-ch3-19",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-abstraction"],
    prompt: "ข้อใด “ไม่ใช่” องค์ประกอบของ external schema หรือประโยชน์ของ external model ตามที่หนังสือระบุ",
    choices: [
      {
        id: "a",
        text: "กำหนดวิธีจัดเก็บข้อมูลลงดิสก์และวิธีเข้าถึงข้อมูลทางกายภาพ",
        why: "ถูกต้องว่าไม่ใช่ นั่นเป็นหน้าที่ของ physical model ซึ่งอยู่คนละปลายของสเกล abstraction",
      },
      {
        id: "b",
        text: "ประกอบด้วย entities, relationships, processes และ constraints",
        why: "ผิด นี่คือองค์ประกอบของ external schema ที่หนังสือระบุไว้",
      },
      {
        id: "c",
        text: "ช่วยรับประกัน security constraint ในการออกแบบฐานข้อมูล",
        why: "ผิด เป็นหนึ่งในประโยชน์ 4 ข้อของ external model",
      },
      {
        id: "d",
        text: "ทำให้ระบุข้อมูลเฉพาะที่แต่ละหน่วยธุรกิจต้องการได้ง่าย และทำให้พัฒนาโปรแกรมประยุกต์ง่ายขึ้น",
        why: "ผิด เป็นประโยชน์ที่หนังสือระบุไว้เช่นกัน",
      },
    ],
    answer: "a",
    explanation:
      "External model คือมุมมองของผู้ใช้ปลายทางและใช้ ER diagram แทน external view ประโยชน์ 4 ข้อคือระบุความต้องการของแต่ละหน่วยธุรกิจได้ง่าย ให้ feedback ว่าโมเดลเพียงพอหรือไม่ รับประกัน security constraint และทำให้พัฒนาโปรแกรมง่ายขึ้น",
  },
  {
    id: "db-ch3-20",
    chapter: "db-ch3",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-abstraction", "db-independence"],
    prompt:
      "ทีมงานแปลง ERD ของ Tiny College ให้เป็นคำสั่ง CREATE TABLE พร้อมระบุชนิดข้อมูลและ REFERENCES การกระทำนี้คือการแปลงจากระดับใดไประดับใด และผลลัพธ์มีคุณสมบัติอย่างไร",
    choices: [
      {
        id: "a",
        text: "จาก conceptual ไป internal และผลลัพธ์ขึ้นกับซอฟต์แวร์ฐานข้อมูลที่ใช้ ถ้าเปลี่ยน DBMS ก็ต้องเปลี่ยน internal model",
        why: "ถูกต้อง internal model คือฐานข้อมูลตามที่ DBMS มองเห็นและผูกกับผลิตภัณฑ์ที่เลือก",
      },
      {
        id: "b",
        text: "จาก external ไป conceptual และผลลัพธ์เป็นอิสระจากทั้งฮาร์ดแวร์และซอฟต์แวร์",
        why: "ผิด การรวม external view หลายอันเข้าเป็นภาพเดียวต่างหากที่เป็นการไปสู่ conceptual คำสั่ง CREATE TABLE เป็นระดับ internal แล้ว",
      },
      {
        id: "c",
        text: "จาก internal ไป physical และผลลัพธ์กำหนดตำแหน่งของข้อมูลบนดิสก์โดยตรง",
        why: "ผิด คำสั่งสร้างตารางไม่ได้ระบุตำแหน่งกายภาพบนสื่อเก็บข้อมูล",
      },
      {
        id: "d",
        text: "จาก conceptual ไป physical โดยข้ามระดับ internal เพราะ relational model ไม่มีระดับ internal",
        why: "ผิด relational model มุ่งที่ระดับ logical และมี internal model เป็นการ map เข้ากับ DBMS เสมอ",
      },
    ],
    answer: "a",
    explanation:
      "Internal schema คือตัวแทนเฉพาะของ internal model หนึ่ง ๆ ขึ้นกับซอฟต์แวร์ฐานข้อมูลที่เลือก การที่เปลี่ยน internal model ได้โดยไม่กระทบ conceptual model คือสิ่งที่เรียกว่า logical independence",
  },
];
