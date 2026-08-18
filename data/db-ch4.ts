import type { Question, QuestionTable } from "@/lib/types";

/** ตาราง P — PRODUCT ใช้ซ้ำหลายข้อ ให้คุ้นตาเหมือนตอนทำแบบฝึกหัด */
const TABLE_P: QuestionTable = {
  caption: "ตาราง P — PRODUCT",
  head: ["P_CODE", "P_DESCRIPT", "PRICE"],
  rows: [
    ["123456", "Flashlight", "5.26"],
    ["123457", "Lamp", "25.15"],
    ["123458", "Box Fan", "10.99"],
    ["213345", "9v battery", "1.92"],
    ["254467", "100W bulb", "1.47"],
    ["311452", "Powerdrill", "34.99"],
  ],
};

/** ตาราง C — CUSTOMER สังเกต AGENT_CODE 421 ที่ไม่มีตัวแทนรองรับ */
const TABLE_C: QuestionTable = {
  caption: "ตาราง C — CUSTOMER",
  head: ["CUS_CODE", "CUS_LNAME", "CUS_ZIP", "AGENT_CODE"],
  rows: [
    ["1132445", "Walker", "32145", "231"],
    ["1217782", "Adares", "32145", "125"],
    ["1312243", "Rakowski", "34129", "167"],
    ["1321242", "Rodriguez", "37134", "125"],
    ["1542311", "Smithson", "37134", "421"],
    ["1657399", "Vanloo", "32145", "231"],
  ],
};

/** ตาราง A — AGENT สังเกต 333 ที่ไม่มีลูกค้าเลย */
const TABLE_A: QuestionTable = {
  caption: "ตาราง A — AGENT",
  head: ["AGENT_CODE", "AGENT_PHONE"],
  rows: [
    ["125", "6152439887"],
    ["167", "6153426778"],
    ["231", "6152431124"],
    ["333", "9041234445"],
  ],
};

const TABLE_STUDENT: QuestionTable = {
  caption: "ตาราง STUDENT (ตัดมาบางคอลัมน์)",
  head: ["STU_NUM", "STU_LNAME", "STU_FNAME", "STU_HRS", "STU_CLASS", "DEPT_CODE"],
  rows: [
    ["321452", "Bowser", "William", "42", "So", "BIOL"],
    ["324257", "Smithson", "Anne", "81", "Jr", "CIS"],
    ["324269", "Oblonski", "Walter", "66", "Jr", "CIS"],
    ["324273", "Smith", "John", "102", "Sr", "ENGL"],
    ["324291", "Robertson", "Gerald", "120", "Sr", "EDU"],
    ["324299", "Smith", "John", "15", "Fr", "ACCT"],
  ],
};

/**
 * ข้อสอบบทที่ 4 — The Relational Model
 * อ้างอิง Coronel & Rob, Database Principles 10th ed. Chapter 4
 * บทที่หนักที่สุด มีทั้งข้อที่ต้องอ่านตารางและข้อคำนวณจำนวนแถว/คอลัมน์
 */
export const dbCh4Questions: Question[] = [
  {
    id: "db-ch4-1",
    chapter: "db-ch4",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-table-chars"],
    prompt: "ข้อใด “ไม่ใช่” คุณลักษณะของตารางเชิงสัมพันธ์ตาม Table 4.1",
    choices: [
      {
        id: "a",
        text: "แถวในตารางต้องถูกเก็บเรียงตามค่าของ primary key เสมอ เพื่อให้อ้างถึงแถวที่หนึ่งหรือแถวที่สามได้",
        why: "ถูกต้องว่าไม่ใช่ ตาราง 4.1 ระบุตรงข้ามว่าลำดับของแถวและคอลัมน์ไม่มีความสำคัญต่อ DBMS และไม่มีแนวคิดเรื่องแถวแรกหรือแถวที่สาม",
      },
      {
        id: "b",
        text: "จุดตัดของแถวกับคอลัมน์แทนค่าข้อมูลเพียงค่าเดียว",
        why: "ผิด เป็นคุณลักษณะข้อที่ 4",
      },
      {
        id: "c",
        text: "แต่ละคอลัมน์มีช่วงของค่าที่กำหนดไว้ เรียกว่า attribute domain",
        why: "ผิด เป็นคุณลักษณะข้อที่ 6",
      },
      {
        id: "d",
        text: "ทุกตารางต้องมี attribute หรือชุดของ attribute ที่ระบุแต่ละแถวได้ไม่ซ้ำ",
        why: "ผิด เป็นคุณลักษณะข้อที่ 8 และเป็นรากของเรื่อง key",
      },
    ],
    answer: "a",
    explanation:
      "ตาราง 4.1 มี 8 ข้อ กับดักคลาสสิกคือข้อ 7 ที่บอกว่าลำดับของแถวและคอลัมน์ immaterial ตารางเชิงสัมพันธ์เป็นเซตของ tuple ไม่ใช่รายการที่มีลำดับ ถ้าข้อสอบพูดถึงแถวแรกหรือการเรียงบังคับ ให้สงสัยไว้ก่อนว่าผิด",
  },
  {
    id: "db-ch4-2",
    chapter: "db-ch4",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-functional-dep"],
    table: TABLE_STUDENT,
    prompt:
      "จากตาราง STUDENT ด้านล่าง ข้อความเกี่ยวกับ functional dependence ข้อใดถูกต้อง",
    choices: [
      {
        id: "a",
        text: "STU_NUM → STU_LNAME เป็นจริง แต่ STU_LNAME → STU_NUM ไม่เป็นจริง",
        why: "ถูกต้อง รหัสนักศึกษาไม่ซ้ำจึงกำหนดนามสกุลได้ แต่นามสกุล Smith ปรากฏสองแถวที่มีรหัสต่างกัน จึงกำหนดรหัสกลับไม่ได้",
      },
      {
        id: "b",
        text: "STU_LNAME → STU_NUM เป็นจริง เพราะทุกคนมีนามสกุลของตัวเอง",
        why: "ผิด ในตารางมี Smith สองแถวคือ 324273 กับ 324299 รู้ว่านามสกุล Smith แล้วบอกรหัสไม่ได้",
      },
      {
        id: "c",
        text: "DEPT_CODE → STU_NUM เป็นจริง เพราะภาควิชาเป็นตัวจัดกลุ่มนักศึกษา",
        why: "ผิด CIS ปรากฏสองแถวที่มีรหัสต่างกัน จึงไม่กำหนดค่าเดียว",
      },
      {
        id: "d",
        text: "ไม่มี functional dependence ใดเกิดขึ้นได้เลยถ้าตารางมีข้อมูลไม่ครบทุกแถวของมหาวิทยาลัย",
        why: "ผิด functional dependence เป็นสมบัติของความหมายของข้อมูล และตรวจได้จากการหาสองแถวที่ค่าฝั่งซ้ายซ้ำแต่ฝั่งขวาต่าง",
      },
    ],
    answer: "a",
    explanation:
      "B เป็น functionally dependent บน A ก็ต่อเมื่อทุกแถวที่มีค่า A เท่ากันต้องมีค่า B เท่ากันด้วย วิธีตรวจที่เร็วที่สุดคือมองหาสองแถวที่ฝั่งซ้ายซ้ำกัน ถ้าเจอแล้วฝั่งขวาต่างกันแปลว่าไม่เป็นจริง หลักการนี้คือรากของทุกเรื่องเกี่ยวกับ key",
  },
  {
    id: "db-ch4-3",
    chapter: "db-ch4",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-keys"],
    table: TABLE_STUDENT,
    prompt:
      "กำหนดให้ STU_NUM ไม่ซ้ำกัน พิจารณาชุด attribute { STU_NUM, STU_LNAME } ข้อใดถูกต้อง",
    choices: [
      {
        id: "a",
        text: "เป็น superkey แต่ไม่ใช่ candidate key เพราะมี STU_NUM ซึ่งเป็น superkey อยู่ข้างในแล้ว จึงยังลดทอนได้อีก",
        why: "ถูกต้อง candidate key ต้องเป็น superkey ที่ minimal คือไม่มี subset ใดของมันที่เป็น superkey ด้วยตัวเอง",
      },
      {
        id: "b",
        text: "เป็นทั้ง superkey และ candidate key เพราะระบุแถวได้ไม่ซ้ำ",
        why: "ผิด การระบุได้ไม่ซ้ำทำให้เป็น superkey เท่านั้น ยังต้องผ่านเงื่อนไข minimal จึงจะเป็น candidate key",
      },
      {
        id: "c",
        text: "ไม่ใช่ superkey เพราะมี attribute เกินความจำเป็น",
        why: "ผิด การมี attribute เกินไม่ได้ทำให้ระบุแถวไม่ได้ มันยังเป็น superkey อยู่",
      },
      {
        id: "d",
        text: "เป็น primary key ได้ทันทีเพราะประกอบด้วย attribute มากกว่าหนึ่งตัว",
        why: "ผิด primary key ต้องเป็น candidate key ที่ถูกเลือก และการมีหลาย attribute เรียกว่า composite key ไม่ได้ทำให้เป็น PK เอง",
      },
    ],
    answer: "a",
    explanation:
      "ลำดับชั้นคือ primary key ทุกตัวเป็น candidate key และ candidate key ทุกตัวเป็น superkey แต่ย้อนกลับไม่จริง จุดตัดสินคือคำว่า minimal หรือ irreducible ถ้ายังตัด attribute ออกได้แล้วยังระบุแถวได้ไม่ซ้ำ แปลว่ายังไม่ใช่ candidate key",
  },
  {
    id: "db-ch4-4",
    chapter: "db-ch4",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-keys"],
    prompt:
      "ฝ่ายทะเบียนสร้างดัชนีให้ค้นหานักศึกษาด้วยนามสกุลได้ ผลการค้นหาคำว่า Smith ได้ 2 แถว ข้อใดอธิบายสถานะของ STU_LNAME ได้ถูกต้อง",
    choices: [
      {
        id: "a",
        text: "เป็น secondary key ได้ เพราะ secondary key มีไว้เพื่อการดึงข้อมูลโดยเฉพาะ ไม่จำเป็นต้องระบุแถวได้ไม่ซ้ำ",
        why: "ถูกต้องตามนิยามใน Table 4.3 และเป็นจุดพลาดยอดฮิต",
      },
      {
        id: "b",
        text: "ใช้เป็น key ชนิดใดไม่ได้เลย เพราะค่าซ้ำได้",
        why: "ผิด secondary key ยอมให้ค่าซ้ำได้ ตราบใดที่ใช้ค้นหาได้ตามวัตถุประสงค์",
      },
      {
        id: "c",
        text: "เป็น candidate key เพราะสามารถใช้ค้นหาแถวได้",
        why: "ผิด candidate key ต้องระบุแถวได้ไม่ซ้ำ ซึ่ง Smith ทำไม่ได้",
      },
      {
        id: "d",
        text: "เป็น foreign key เพราะเชื่อมไปยังดัชนีอีกตารางหนึ่ง",
        why: "ผิด foreign key คือ attribute ที่ค่าต้องตรงกับ primary key ของอีกตารางหรือเป็น null",
      },
    ],
    answer: "a",
    explanation:
      "Table 4.3 นิยาม secondary key ว่าเป็น attribute หรือชุด attribute ที่ใช้เพื่อการดึงข้อมูลโดยเฉพาะ ต่างจาก superkey candidate key และ primary key ที่ทั้งหมดต้องระบุตัวตนได้ไม่ซ้ำ ส่วน composite key คือ key ที่มีมากกว่าหนึ่ง attribute และ key attribute คือ attribute ใดก็ตามที่เป็นส่วนหนึ่งของ key",
  },
  {
    id: "db-ch4-5",
    chapter: "db-ch4",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-integrity"],
    table: [TABLE_C, TABLE_A],
    prompt:
      "ตาราง C มี CUS_CODE เป็น primary key และ AGENT_CODE เป็น foreign key อ้างถึงตาราง A พิจารณาสองการกระทำ\n(1) เพิ่มลูกค้าใหม่โดยปล่อย CUS_CODE ว่างไว้\n(2) เพิ่มลูกค้าใหม่โดยใส่ AGENT_CODE = 999 ทั้งที่ไม่มีตัวแทนรหัสนี้\nแต่ละการกระทำละเมิดกฎใด",
    choices: [
      {
        id: "a",
        text: "(1) ละเมิด entity integrity และ (2) ละเมิด referential integrity",
        why: "ถูกต้อง PK ห้ามซ้ำห้ามว่างคือ entity integrity ส่วน FK ที่ไม่ใช่ null ต้องอ้างถึง PK ที่มีอยู่จริงคือ referential integrity",
      },
      {
        id: "b",
        text: "(1) ละเมิด referential integrity และ (2) ละเมิด entity integrity",
        why: "ผิด สลับกัน entity integrity ดูแล PK ส่วน referential integrity ดูแล FK",
      },
      {
        id: "c",
        text: "ทั้งสองละเมิด entity integrity เพราะทั้งคู่ทำให้แถวใหม่ระบุตัวตนไม่ได้",
        why: "ผิด การใส่ FK ผิดไม่ได้ทำให้ระบุตัวตนของแถวไม่ได้ แต่ทำให้อ้างอิงไปยังสิ่งที่ไม่มีอยู่",
      },
      {
        id: "d",
        text: "การกระทำที่ 2 ไม่ละเมิดกฎใด เพราะ foreign key มีค่าเป็น null ได้",
        why: "ผิด FK เป็น null ได้ก็จริง แต่ถ้าไม่ใช่ null ต้องมีค่า PK รองรับ 999 ไม่มีจริงจึงละเมิด",
      },
    ],
    answer: "a",
    explanation:
      "จำสั้น ๆ ว่า entity integrity ดูแล PK คือห้ามซ้ำห้ามว่าง ส่วน referential integrity ดูแล FK คือว่างได้แต่ถ้าไม่ว่างต้องมีจริง ผลพลอยได้ของ referential integrity คือลบแถวที่ PK ของมันถูกอ้างถึงอยู่ไม่ได้",
  },
  {
    id: "db-ch4-6",
    chapter: "db-ch4",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-nulls"],
    prompt: "ข้อใดถูกต้องเกี่ยวกับ null และการใช้ flag แทน null",
    choices: [
      {
        id: "a",
        text: "null แทนได้ทั้งค่าที่ไม่รู้ ค่าที่รู้แต่หายไป และเงื่อนไขที่ใช้ไม่ได้ และมันสร้างปัญหากับ COUNT, AVERAGE, SUM รวมถึงตรรกะตอนเชื่อมตาราง นักออกแบบจึงอาจใช้ flag เช่นรหัสตัวแทนสมมติ -99 แทน",
        why: "ถูกต้องครบทั้งความหมายสามแบบ ปัญหาที่ก่อ และวิธีเลี่ยงด้วย flag",
      },
      {
        id: "b",
        text: "null มีความหมายเดียวคือเลขศูนย์ จึงคำนวณร่วมกับค่าอื่นได้ตามปกติ",
        why: "ผิด null คือการไม่มีการป้อนข้อมูล ไม่ใช่ศูนย์ และเป็นต้นเหตุของปัญหาในฟังก์ชันรวมค่า",
      },
      {
        id: "c",
        text: "null อนุญาตให้ใช้ใน primary key ได้ถ้าเป็นเพียงบางส่วนของ composite key",
        why: "ผิด ห้ามส่วนใดส่วนหนึ่งของ PK เป็น null เด็ดขาด",
      },
      {
        id: "d",
        text: "การใช้ flag ทำให้เสีย referential integrity เพราะสร้างข้อมูลปลอมขึ้นมา",
        why: "ผิด ตรงกันข้าม การชี้ไปยังแถวสมมติที่มีอยู่จริงในตารางทำให้ยังรักษา referential integrity ได้โดยไม่ต้องมี null",
      },
    ],
    answer: "a",
    explanation:
      "RDBMS หลายตัวบังคับกฎ integrity ให้อัตโนมัติ แต่หนังสือบอกว่าปลอดภัยกว่าถ้าออกแบบแอปพลิเคชันให้สอดคล้องกับกฎทั้งสองด้วยตัวเอง และ flag คือเทคนิคที่นักออกแบบใช้บ่งชี้ว่าค่าบางอย่างขาดหายโดยไม่ต้องปล่อยเป็น null",
  },
  {
    id: "db-ch4-7",
    chapter: "db-ch4",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-controlled-redundancy"],
    prompt:
      "ในฐานข้อมูลหนึ่ง ตาราง PRODUCT มีคอลัมน์ VEND_CODE ซึ่งค่า 232 ปรากฏซ้ำหลายแถว และมีผู้เสนอให้ย้าย VEND_CONTACT กับ VEND_PHONE จากตาราง VENDOR มาใส่ในตาราง PRODUCT ด้วยเพื่อจะได้ไม่ต้อง join ข้อใดถูกต้อง",
    choices: [
      {
        id: "a",
        text: "ค่า 232 ที่ซ้ำคือ controlled redundancy ซึ่งจำเป็นต่อการเชื่อมตาราง แต่การย้ายชื่อผู้ติดต่อกับเบอร์โทรมาใส่ด้วยคือ redundancy จริงที่จะทำให้เกิด anomalies",
        why: "ถูกต้อง หนังสือแยกสองกรณีนี้ไว้ชัดเจนด้วยเกณฑ์ว่าจำเป็นต่อความสัมพันธ์หรือไม่",
      },
      {
        id: "b",
        text: "ทั้งสองกรณีเป็น redundancy ที่ต้องกำจัด เพราะบทที่ 1 บอกว่า redundancy คือสิ่งไม่ดีเสมอ",
        why: "ผิด บทที่ 4 กลับหัวประเด็นนี้ ค่าที่ซ้ำเพื่อให้ความสัมพันธ์ทำงานได้ไม่ถือว่า redundant",
      },
      {
        id: "c",
        text: "ทั้งสองกรณีเป็น controlled redundancy เพราะข้อมูลยังตรงกันอยู่ในตอนแรก",
        why: "ผิด การซ้ำโดยไม่จำเป็นยังเป็น redundancy แม้ในตอนแรกค่าจะยังตรงกัน ปัญหาจะโผล่ตอนแก้ไข",
      },
      {
        id: "d",
        text: "การย้ายคอลัมน์มาไม่มีผลใด ๆ เพราะ DBMS จะซิงก์ค่าให้อัตโนมัติ",
        why: "ผิด DBMS ไม่ซิงก์ค่าที่ถูกทำซ้ำโดยการออกแบบผิดให้เอง",
      },
    ],
    answer: "a",
    explanation:
      "เกณฑ์เดียวที่ใช้ตัดสินคือความจำเป็น ค่าที่ปรากฏหลายครั้งเพราะเป็น attribute ร่วมที่ใช้เชื่อมตารางไม่ถือว่า redundant แต่การทำซ้ำค่า attribute โดยไม่จำเป็นคือ redundancy จริงและจะพา update, insertion กับ deletion anomalies จากบทที่ 1 กลับมาทันที",
  },
  {
    id: "db-ch4-8",
    chapter: "db-ch4",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-dictionary"],
    prompt:
      "ตาราง STUDENT มีคอลัมน์ C_NAME หมายถึงชื่อวิชา ส่วนตาราง VENDOR มี C_NAME หมายถึงชื่อผู้ติดต่อ ขณะเดียวกันแผนกหนึ่งเรียก CUS_CODE แต่อีกแผนกเรียก CUSTOMER_NUMBER ทั้งที่หมายถึงสิ่งเดียวกัน สองปัญหานี้เรียกว่าอะไรตามลำดับ",
    choices: [
      {
        id: "a",
        text: "homonym และ synonym",
        why: "ถูกต้อง homonym คือชื่อเหมือนแต่เป็นคนละสิ่ง ส่วน synonym คือสิ่งเดียวกันแต่เรียกคนละชื่อ",
      },
      {
        id: "b",
        text: "synonym และ homonym",
        why: "ผิด สลับกัน จำว่า homo แปลว่าเหมือน จึงหมายถึงชื่อที่เหมือนกัน",
      },
      {
        id: "c",
        text: "data dictionary และ system catalog",
        why: "ผิด สองคำนั้นคือที่เก็บ metadata ไม่ใช่ชื่อของปัญหาการตั้งชื่อ",
      },
      {
        id: "d",
        text: "entity integrity violation และ referential integrity violation",
        why: "ผิด ทั้งสองปัญหาเป็นเรื่องการตั้งชื่อ ไม่ใช่การละเมิดกฎความถูกต้องของค่า",
      },
    ],
    answer: "a",
    explanation:
      "ทั้งสองปัญหาถูกจัดการด้วย data dictionary ซึ่งให้รายละเอียดของทุกตารางที่ผู้ใช้และผู้ออกแบบสร้าง ส่วน system catalog คือ data dictionary ระดับระบบที่อธิบาย object ทั้งหมดในฐานข้อมูล กว้างและละเอียดกว่า แต่ทั้งคู่เก็บ metadata เหมือนกัน",
  },
  {
    id: "db-ch4-9",
    chapter: "db-ch4",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-algebra"],
    table: TABLE_P,
    prompt:
      "จากตาราง P ถ้าทำ SELECT แถวที่ PRICE < 5.00 แล้วตามด้วย PROJECT P_DESCRIPT ผลลัพธ์คือข้อใด",
    choices: [
      {
        id: "a",
        text: "ได้ 2 แถว 1 คอลัมน์ คือ 9v battery กับ 100W bulb",
        why: "ถูกต้อง SELECT ตัดเหลือสองแถวที่ราคาต่ำกว่า 5.00 แล้ว PROJECT ตัดเหลือคอลัมน์คำอธิบายสินค้า",
      },
      {
        id: "b",
        text: "ได้ 6 แถว 1 คอลัมน์ เพราะ PROJECT คืนทุกแถวเสมอ",
        why: "ผิด PROJECT คืนทุกแถวที่ได้รับมาก็จริง แต่มันรับมาจาก SELECT ซึ่งตัดเหลือ 2 แถวไปแล้ว",
      },
      {
        id: "c",
        text: "ได้ 2 แถว 3 คอลัมน์ เพราะ PROJECT ไม่ลดจำนวนคอลัมน์",
        why: "ผิด PROJECT คือการเลือกคอลัมน์โดยตรง จึงเหลือเฉพาะ P_DESCRIPT",
      },
      {
        id: "d",
        text: "ได้ 3 แถว เพราะ Flashlight ราคา 5.26 เข้าเงื่อนไขด้วย",
        why: "ผิด 5.26 ไม่น้อยกว่า 5.00",
      },
    ],
    answer: "a",
    explanation:
      "จำภาพว่า SELECT ตัดแนวนอนคือเอาบางแถวทุกคอลัมน์ ส่วน PROJECT ตัดแนวตั้งคือเอาทุกแถวบางคอลัมน์ การซ้อน operator ต้องไล่ทีละขั้นเสมอ และในวิชานี้ PROJECT ไม่ได้กำจัดค่าซ้ำแบบ UNION",
  },
  {
    id: "db-ch4-10",
    chapter: "db-ch4",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-algebra"],
    prompt:
      "ข้อใดถูกต้องเกี่ยวกับ UNION, INTERSECT และ DIFFERENCE",
    choices: [
      {
        id: "a",
        text: "ทั้งสามต้องการตารางที่ union-compatible คือมีจำนวนคอลัมน์เท่ากันและ domain สอดคล้องกัน โดย UNION กำจัดแถวที่ซ้ำกันทั้งแถวออก",
        why: "ถูกต้อง เงื่อนไข union-compatible ใช้กับทั้งสามตัว และการตัดซ้ำของ UNION คือกับดักที่พบบ่อยที่สุด",
      },
      {
        id: "b",
        text: "UNION ให้จำนวนแถวเท่ากับผลบวกของทั้งสองตารางเสมอ",
        why: "ผิด ถ้ามีแถวซ้ำกันทั้งแถวจะถูกตัดออก ผลจึงน้อยกว่าหรือเท่ากับผลบวก",
      },
      {
        id: "c",
        text: "DIFFERENCE ให้ผลเหมือนกันไม่ว่าจะเขียน A ลบ B หรือ B ลบ A",
        why: "ผิด DIFFERENCE ไม่มีสมบัติสลับที่ A ลบ B คือแถวของ A ที่ไม่อยู่ใน B เท่านั้น",
      },
      {
        id: "d",
        text: "INTERSECT ใช้กับตารางที่มีจำนวนคอลัมน์ต่างกันได้ ตราบใดที่มีคอลัมน์ร่วมอย่างน้อยหนึ่งคอลัมน์",
        why: "ผิด นั่นคือเงื่อนไขของ JOIN ส่วน INTERSECT ต้อง union-compatible",
      },
    ],
    answer: "a",
    explanation:
      "ตารางสรุป operator บอกขอบเขตผลลัพธ์ไว้ว่า UNION ไม่เกิน A บวก B, INTERSECT ไม่เกินค่าน้อยสุดของสองตาราง และ DIFFERENCE ไม่เกินจำนวนแถวของตารางตั้งต้น การจำขอบเขตเหล่านี้ช่วยตรวจคำตอบตัวเองได้เร็ว",
  },
  {
    id: "db-ch4-11",
    chapter: "db-ch4",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-algebra", "db-join"],
    prompt: "ข้อใดอธิบายความต่างระหว่าง PRODUCT กับ JOIN ได้ถูกต้อง",
    choices: [
      {
        id: "a",
        text: "PRODUCT จับคู่ทุกแถวของตารางหนึ่งกับทุกแถวของอีกตารางโดยไม่สนใจเงื่อนไข จำนวนแถวจึงเท่ากับผลคูณพอดี ส่วน JOIN เลือกเฉพาะคู่ที่ค่าในคอลัมน์ร่วมสอดคล้องกัน",
        why: "ถูกต้อง PRODUCT เป็นการคูณคาร์ทีเซียนล้วน ส่วน JOIN มีเงื่อนไขคัดคู่",
      },
      {
        id: "b",
        text: "PRODUCT และ JOIN ให้ผลเหมือนกันเสมอ ต่างกันแค่ชื่อเรียก",
        why: "ผิด JOIN คือ PRODUCT ที่ผ่านการคัดกรองด้วยเงื่อนไขแล้ว ผลลัพธ์จึงมักน้อยกว่ามาก",
      },
      {
        id: "c",
        text: "JOIN ให้จำนวนแถวเท่ากับผลคูณของทั้งสองตารางเสมอ ส่วน PRODUCT ขึ้นกับข้อมูล",
        why: "ผิด สลับกัน PRODUCT ต่างหากที่เท่ากับผลคูณพอดี",
      },
      {
        id: "d",
        text: "PRODUCT ต้องการให้ทั้งสองตาราง union-compatible ก่อนจึงจะทำได้",
        why: "ผิด union-compatible เป็นเงื่อนไขของ UNION, INTERSECT และ DIFFERENCE ไม่ใช่ PRODUCT",
      },
    ],
    answer: "a",
    explanation:
      "ในตารางสรุป PRODUCT เป็น operator เดียวที่จำนวนแถวคำนวณได้แน่นอนคือ A คูณ B ส่วน JOIN ขึ้นกับข้อมูลจริง วิธีคิดที่ปลอดภัยคือมอง JOIN เป็น PRODUCT แล้วตามด้วย SELECT ด้วยเงื่อนไขการเชื่อม",
  },
  {
    id: "db-ch4-12",
    chapter: "db-ch4",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-join"],
    prompt: "ข้อใดจับคู่ชนิดของ JOIN กับนิยามได้ถูกต้องทั้งหมด",
    choices: [
      {
        id: "a",
        text: "natural join เชื่อมโดยเลือกแถวที่มีค่าเหมือนกันในคอลัมน์ร่วมและคอลัมน์ร่วมปรากฏเพียงคอลัมน์เดียวในผลลัพธ์, equijoin เชื่อมด้วยเงื่อนไขความเท่ากันที่ระบุคอลัมน์, theta join ใช้ตัวเปรียบเทียบอื่นเช่นมากกว่าหรือน้อยกว่า",
        why: "ถูกต้องครบทั้งสามนิยาม รวมถึงรายละเอียดว่า natural join ไม่ทิ้งคอลัมน์ร่วมซ้ำสองครั้ง",
      },
      {
        id: "b",
        text: "theta join คือ join ที่ใช้เงื่อนไขความเท่ากันเท่านั้น ส่วน equijoin ใช้ตัวเปรียบเทียบอื่นได้",
        why: "ผิด สลับกัน equijoin คือเงื่อนไขความเท่ากัน ส่วน theta join เปิดให้ใช้ตัวเปรียบเทียบอื่น",
      },
      {
        id: "c",
        text: "inner join คืนทุกแถวของทั้งสองตารางแม้จับคู่ไม่ได้ ส่วน outer join คืนเฉพาะแถวที่จับคู่ได้",
        why: "ผิด สลับกัน inner join คืนเฉพาะที่จับคู่ได้ ส่วน outer join เก็บแถวที่จับคู่ไม่ได้ไว้แล้วเติม null",
      },
      {
        id: "d",
        text: "natural join กับ INTERSECT ให้ผลเหมือนกันเสมอ เพราะทั้งคู่หาสิ่งที่ตรงกัน",
        why: "ผิด INTERSECT ต้องการตารางที่ union-compatible และเทียบทั้งแถว ส่วน natural join เทียบเฉพาะคอลัมน์ร่วมแล้วนำคอลัมน์ของทั้งสองตารางมาต่อกัน",
      },
    ],
    answer: "a",
    explanation:
      "ศัพท์ย่อยของ JOIN มี 6 ตัวคือ natural, equi, theta, inner, left outer และ right outer วิธีจำ outer join คือฝั่งไหนที่ระบุ ฝั่งนั้นได้ครบทุกแถว อีกฝั่งเติม null ถ้าไม่มีคู่",
  },
  {
    id: "db-ch4-13",
    chapter: "db-ch4",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-join"],
    table: [TABLE_C, TABLE_A],
    prompt:
      "จากตาราง C และตาราง A ด้านล่าง ถ้าทำ C LEFT OUTER JOIN A และ C RIGHT OUTER JOIN A ข้อใดถูกต้อง",
    choices: [
      {
        id: "a",
        text: "left outer join ได้ 6 แถว โดย Smithson ยังอยู่และ AGENT_PHONE เป็น null ส่วน right outer join ได้ 6 แถว โดย Smithson หายไปแต่มีแถวของ agent 333 ที่ฝั่งลูกค้าเป็น null",
        why: "ถูกต้อง ฝั่งที่ระบุจะได้ครบทุกแถวเสมอ ส่วนอีกฝั่งเติม null",
      },
      {
        id: "b",
        text: "ทั้งสองแบบได้ 5 แถวเท่ากับ inner join เพราะ outer join ไม่เพิ่มแถว",
        why: "ผิด outer join เก็บแถวที่จับคู่ไม่ได้ไว้ จึงมากกว่า inner join",
      },
      {
        id: "c",
        text: "left outer join ได้ 6 แถวโดยมีแถวของ agent 333 อยู่ด้วย",
        why: "ผิด agent 333 อยู่ฝั่งขวา จึงได้รับการรับประกันเฉพาะใน right outer join",
      },
      {
        id: "d",
        text: "right outer join ได้ 7 แถว เพราะเก็บทั้ง Smithson และ agent 333 ไว้",
        why: "ผิด การเก็บทั้งสองฝั่งคือ full outer join ไม่ใช่ right outer join",
      },
    ],
    answer: "a",
    explanation:
      "Smithson มี AGENT_CODE เท่ากับ 421 ซึ่งไม่มีในตาราง A ส่วน agent 333 ไม่มีลูกค้าเลย ทั้งคู่จึงหายไปใน inner join ที่ได้ 5 แถว แต่จะถูกเก็บไว้ในฝั่งที่ outer join ระบุ",
  },
  {
    id: "db-ch4-14",
    chapter: "db-ch4",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-algebra"],
    table: {
      caption: "ตารางตัวตั้ง",
      head: ["CODE", "LOC"],
      rows: [
        ["A", "5"],
        ["A", "9"],
        ["A", "4"],
        ["B", "5"],
        ["B", "3"],
        ["C", "6"],
      ],
    },
    prompt:
      "นำตารางตัวตั้งด้านล่างมา DIVIDE ด้วยตารางที่มีคอลัมน์ CODE บรรจุค่า A และ B ผลลัพธ์คือข้อใด",
    choices: [
      {
        id: "a",
        text: "ได้ LOC = 5 เพียงค่าเดียว",
        why: "ถูกต้อง 5 เป็นค่าเดียวที่จับคู่ได้ครบกับทั้ง A และ B",
      },
      {
        id: "b",
        text: "ได้ LOC = 5, 9, 4 และ 3 เพราะทุกค่าที่เกี่ยวข้องกับ A หรือ B",
        why: "ผิด DIVIDE ต้องการค่าที่จับคู่ได้กับทุกค่าในตัวหาร ไม่ใช่อย่างใดอย่างหนึ่ง",
      },
      {
        id: "c",
        text: "ได้ LOC = 6 เพราะเป็นค่าเดียวที่ไม่เกี่ยวข้องกับ A และ B",
        why: "ผิด นั่นเป็นตรรกะกลับด้าน DIVIDE หาค่าที่ครอบคลุมครบ ไม่ใช่ค่าที่ไม่เกี่ยว",
      },
      {
        id: "d",
        text: "ได้ CODE = A และ B เพราะผลลัพธ์คืนคอลัมน์ของตัวหาร",
        why: "ผิด ผลลัพธ์ของ DIVIDE คือคอลัมน์ที่เหลือจากตัวตั้ง ไม่ใช่คอลัมน์ที่ใช้หาร",
      },
    ],
    answer: "a",
    explanation:
      "แปล DIVIDE เป็นภาษาคนได้ว่าหาสถานที่ที่มีทั้ง code A และ code B ค่า 9 กับ 4 มีแต่ A ค่า 3 มีแต่ B และ 6 มีแต่ C จึงตกรอบหมด เหลือ 5 เพียงค่าเดียว ตารางสรุปยังบอกว่าผลลัพธ์ของ DIVIDE มักน้อยมาก",
  },
  {
    id: "db-ch4-15",
    chapter: "db-ch4",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["db-mn-composite"],
    prompt:
      "ความสัมพันธ์ STUDENT กับ CLASS เป็น M:N เมื่อแตกออกเพื่อ implement จริงจะได้อะไร",
    choices: [
      {
        id: "a",
        text: "ได้ 3 ตาราง โดยเพิ่ม composite entity ชื่อ ENROLL ที่มี PK เป็น CLASS_CODE รวมกับ STU_NUM และทั้งสอง attribute นี้เป็น FK ชี้กลับไปยังตารางต้นทาง ทำให้ M:N กลายเป็น 1:M สองความสัมพันธ์",
        why: "ถูกต้องตรงตามวิธีที่หนังสือแสดงใน Figure 4.25 composite entity รับ PK ของสองตารางมาเป็น FK",
      },
      {
        id: "b",
        text: "ได้ 2 ตารางเหมือนเดิม เพียงแต่ใส่ FK ไขว้กันทั้งสองฝั่ง",
        why: "ผิด การใส่ FK ไขว้กันไม่สามารถแทน M:N ได้ และจะทำให้เกิดค่าซ้ำจำนวนมาก",
      },
      {
        id: "c",
        text: "ได้ 3 ตาราง แต่ตารางกลางต้องมี PK ของตัวเองที่ไม่เกี่ยวกับสองตารางเดิม และห้ามมี FK",
        why: "ผิด นิยามของ composite entity คือรับ PK ของตารางที่จะเชื่อมมาเป็น FK",
      },
      {
        id: "d",
        text: "ไม่ต้องแตก เพราะ RDBMS สมัยใหม่รองรับ M:N ได้โดยตรง",
        why: "ผิด หนังสือระบุว่า M:N ต้องถูกแตกเป็นชุดของความสัมพันธ์ 1:M เสมอ",
      },
    ],
    answer: "a",
    explanation:
      "วิธีจัดการ M:N คือแตกออกเป็นความสัมพันธ์ 1:M หลายอันโดยสร้าง composite entity คั่นกลาง หลังแตกแล้ว STUDENT จะเป็น 1:M กับ ENROLL และ CLASS ก็เป็น 1:M กับ ENROLL เช่นกัน นี่เป็นหัวข้อที่หนังสือบอกว่าออกสอบแน่นอนและต้องทำเป็น ไม่ใช่แค่จำ",
  },
  {
    id: "db-ch4-16",
    chapter: "db-ch4",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["db-index", "db-codd"],
    prompt: "ข้อใดถูกต้องเกี่ยวกับ index และกฎของ Codd",
    choices: [
      {
        id: "a",
        text: "index key ชี้ไปยังตำแหน่งของแถว โดย unique index จะชี้ได้เพียงแถวเดียวต่อหนึ่งค่า และแต่ละ index ผูกกับตารางเดียวเท่านั้น ส่วน Codd เผยแพร่กฎ 12 ข้อในปี 1985 เพื่อนิยามว่าอะไรคือระบบเชิงสัมพันธ์จริง",
        why: "ถูกต้องครบทั้งเรื่อง index และรายละเอียดของกฎ Codd",
      },
      {
        id: "b",
        text: "index หนึ่งตัวสามารถครอบคลุมได้หลายตารางพร้อมกัน เพื่อเร่งการ join",
        why: "ผิด หนังสือระบุกฎชัดว่าแต่ละ index ผูกกับตารางเพียงตารางเดียว",
      },
      {
        id: "c",
        text: "Codd เผยแพร่กฎ 12 ข้อในปี 1970 พร้อมกับการเสนอ relational model ครั้งแรก",
        why: "ผิด ปี 1970 คือปีที่เสนอ relational model ส่วนกฎ 12 ข้อออกในปี 1985",
      },
      {
        id: "d",
        text: "ผู้ผลิตฐานข้อมูลรายใหญ่ทุกรายรองรับกฎทั้ง 12 ข้อครบถ้วนแล้ว",
        why: "ผิด หนังสือระบุว่าแม้แต่ผู้ผลิตรายใหญ่ก็ยังรองรับไม่ครบ",
      },
    ],
    answer: "a",
    explanation:
      "Index คือการจัดเรียงอย่างมีระเบียบเพื่อเข้าถึงแถวในเชิงตรรกะ ความเชื่อมโยงที่ควรจำคือ unique index สัมพันธ์กับแนวคิด candidate key เพราะทั้งคู่การันตีค่าที่ไม่ซ้ำ ส่วนกฎของ Codd ปี 1985 เกิดขึ้นเพราะมีผลิตภัณฑ์ที่อ้างว่าเป็น relational ทั้งที่ไม่ผ่านมาตรฐานขั้นต่ำ",
  },
  {
    id: "db-ch4-17",
    chapter: "db-ch4",
    source: "generated",
    type: "numeric",
    stars: 2,
    tags: ["db-cardinality", "db-algebra"],
    table: [TABLE_C, TABLE_A],
    prompt:
      "จากตาราง C และตาราง A ด้านล่าง ถ้าทำ PRODUCT ระหว่าง C กับ A ผลลัพธ์จะมีกี่แถว",
    answer: 24,
    tolerance: 0,
    unit: "แถว",
    hint: "ตอบเป็นจำนวนเต็ม",
    solution: "PRODUCT คือผลคูณคาร์ทีเซียน จับคู่ทุกแถวกับทุกแถว\nจำนวนแถว = 6 × 4 = 24",
    explanation:
      "PRODUCT เป็น operator เดียวในตารางสรุปที่บอกจำนวนแถวได้แน่นอนว่าเท่ากับ A คูณ B พอดี ไม่ขึ้นกับค่าในข้อมูลเลย ต่างจาก JOIN ที่ผลลัพธ์ขึ้นกับว่าค่าในคอลัมน์ร่วมจับคู่กันได้กี่คู่",
  },
  {
    id: "db-ch4-18",
    chapter: "db-ch4",
    source: "generated",
    type: "numeric",
    stars: 3,
    tags: ["db-cardinality", "db-join"],
    table: [TABLE_C, TABLE_A],
    prompt:
      "จากตาราง C และตาราง A ด้านล่าง ถ้าทำ NATURAL JOIN ระหว่าง C กับ A ผลลัพธ์จะมีกี่คอลัมน์",
    answer: 5,
    tolerance: 0,
    unit: "คอลัมน์",
    hint: "ตอบเป็นจำนวนเต็ม ระวังคอลัมน์ที่ใช้เชื่อม",
    solution:
      "natural join นำคอลัมน์ของทั้งสองตารางมาต่อกัน แต่คอลัมน์ร่วมปรากฏเพียงครั้งเดียว\nจำนวนคอลัมน์ = 4 + 2 − 1 = 5\nได้แก่ CUS_CODE, CUS_LNAME, CUS_ZIP, AGENT_CODE, AGENT_PHONE",
    explanation:
      "จุดที่พลาดบ่อยคือนับ AGENT_CODE สองครั้งแล้วตอบ 6 ซึ่งจะถูกก็ต่อเมื่อเป็น PRODUCT หรือ equijoin ที่ระบุคอลัมน์ทั้งสองฝั่ง แต่ natural join จะยุบคอลัมน์ร่วมให้เหลือคอลัมน์เดียวเสมอ",
  },
  {
    id: "db-ch4-19",
    chapter: "db-ch4",
    source: "generated",
    type: "numeric",
    stars: 2,
    tags: ["db-cardinality", "db-join"],
    table: [TABLE_C, TABLE_A],
    prompt:
      "จากตาราง C และตาราง A ด้านล่าง ถ้าทำ NATURAL JOIN บน AGENT_CODE จะได้ผลลัพธ์กี่แถว",
    answer: 5,
    tolerance: 0,
    unit: "แถว",
    hint: "ตอบเป็นจำนวนเต็ม ไล่ดูทีละแถวว่าจับคู่ได้หรือไม่",
    solution:
      "ไล่ทีละแถวของ C\nWalker 231 จับคู่ได้\nAdares 125 จับคู่ได้\nRakowski 167 จับคู่ได้\nRodriguez 125 จับคู่ได้\nSmithson 421 ไม่มีตัวแทนรหัสนี้ จึงตกไป\nVanloo 231 จับคู่ได้\nรวม = 5 แถว",
    explanation:
      "natural join คือ inner join จึงคืนเฉพาะแถวที่จับคู่ได้ ผลคือ Smithson หายเพราะรหัส 421 ไม่มีอยู่จริง และ agent 333 หายเพราะไม่มีลูกค้าเลย ถ้าเปลี่ยนเป็น left outer join จะได้ 6 แถวเพราะเก็บ Smithson ไว้พร้อมเติม null",
  },
  {
    id: "db-ch4-20",
    chapter: "db-ch4",
    source: "generated",
    type: "numeric",
    stars: 3,
    tags: ["db-cardinality", "db-algebra"],
    table: TABLE_P,
    prompt:
      "กำหนดตาราง Q ที่ union-compatible กับตาราง P และมี 3 แถวคือ (346678, Microwave, 160.00), (123457, Lamp, 25.15) และ (311452, Powerdrill, 34.99) ถ้าทำ UNION ระหว่าง P กับ Q จะได้ผลลัพธ์กี่แถว",
    answer: 7,
    tolerance: 0,
    unit: "แถว",
    hint: "ตอบเป็นจำนวนเต็ม ระวังแถวที่ซ้ำกันทั้งแถว",
    solution:
      "P มี 6 แถว บวก Q มี 3 แถว เท่ากับ 9\nแต่ Lamp (123457) และ Powerdrill (311452) ซ้ำกันทั้งแถวกับที่มีอยู่ใน P\nUNION ตัดแถวที่ซ้ำออก จึงลบ 2\nผลลัพธ์ = 9 − 2 = 7 แถว",
    explanation:
      "UNION กำจัดแถวที่ซ้ำกันทั้งแถวเสมอ ถ้าตอบ 9 แปลว่าติดกับดักที่พบบ่อยที่สุดของ operator ตัวนี้ ขอบเขตที่ควรจำคือผลของ UNION ไม่เกินผลบวกของสองตาราง และเงื่อนไขบังคับคือทั้งสองตารางต้อง union-compatible",
  },
];
