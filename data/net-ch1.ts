import type { Question } from "@/lib/types";

/**
 * ข้อสอบบทที่ 1 — Computer Networks and the Internet
 * อ้างอิง Kurose & Ross, Computer Networking: A Top-Down Approach 8th ed. Chapter 1
 * ระดับปานกลางถึงยาก ตัวลวงสร้างจากคู่ศัพท์ที่นักศึกษาสับสนกันจริง
 * เช่น transmission กับ propagation, bandwidth กับ throughput, DSL กับ HFC
 */
export const netCh1Questions: Question[] = [
  {
    id: "net-ch1-1",
    chapter: "net-ch1",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["net-what-is"],
    prompt: "นิยามของ protocol ในหนังสือระบุว่าต้องกำหนดสามสิ่ง ข้อใดคือสามสิ่งนั้น",
    choices: [
      {
        id: "a",
        text: "รูปแบบของข้อความ, ลำดับของข้อความที่รับส่ง และการกระทำเมื่อได้รับข้อความ",
        why: "ถูกต้อง protocol กำหนด format และ order ของ message ที่แลกเปลี่ยนกันระหว่าง entity รวมถึง action ที่ต้องทำเมื่อส่ง เมื่อรับ หรือเมื่อเกิดเหตุการณ์อื่น",
      },
      {
        id: "b",
        text: "ความเร็วในการส่ง, ระยะทางสูงสุด และจำนวนอุปกรณ์ที่รองรับ",
        why: "เป็นคุณสมบัติเชิงกายภาพของ link ไม่ใช่สิ่งที่นิยามของ protocol พูดถึง",
      },
      {
        id: "c",
        text: "ชนิดของสายสัญญาณ, ชนิดของหัวต่อ และแรงดันไฟฟ้าที่ใช้",
        why: "เป็นข้อกำหนดระดับ physical layer ซึ่งเป็นเพียงส่วนย่อยหนึ่ง ไม่ครอบคลุมนิยามของ protocol โดยรวม",
      },
      {
        id: "d",
        text: "ที่อยู่ต้นทาง, ที่อยู่ปลายทาง และเส้นทางที่ต้องเดินทางผ่าน",
        why: "เป็นข้อมูลใน header ของ packet ไม่ใช่องค์ประกอบของนิยาม protocol",
      },
    ],
    answer: "a",
    explanation:
      "จำสามคำ format, order, action นิยามนี้ใช้ได้กับทั้ง protocol ของมนุษย์และของเครื่อง เช่นการทักทายกันก็มีรูปแบบคำพูด ลำดับว่าใครพูดก่อน และการตอบสนองเมื่อได้ยิน",
  },
  {
    id: "net-ch1-2",
    chapter: "net-ch1",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["net-delay"],
    figure: "net-nodal-delay",
    prompt:
      "ถ้าเพิ่มขนาดของแพ็กเก็ตเป็นสองเท่าโดยที่ทุกอย่างเหมือนเดิม ความหน่วงชนิดใดจะเพิ่มขึ้นเป็นสองเท่าตามไปด้วย",
    choices: [
      {
        id: "a",
        text: "transmission delay",
        why: "ถูกต้อง transmission delay เท่ากับ L หารด้วย R เมื่อ L เพิ่มเป็นสองเท่าและ R เท่าเดิม ค่านี้จึงเพิ่มเป็นสองเท่าพอดี",
      },
      {
        id: "b",
        text: "propagation delay",
        why: "เท่ากับ d หารด้วย s ซึ่งเป็นระยะทางหารความเร็วสัญญาณ ไม่มี L อยู่ในสูตรเลย ขนาดแพ็กเก็ตจึงไม่มีผล",
      },
      {
        id: "c",
        text: "processing delay",
        why: "เป็นเวลาที่ router ใช้อ่าน header และตรวจ bit error ซึ่งขึ้นกับความเร็วของอุปกรณ์ ไม่ได้แปรผันตรงกับขนาดแพ็กเก็ต",
      },
      {
        id: "d",
        text: "ทั้ง propagation และ processing delay",
        why: "ผิดทั้งคู่ด้วยเหตุผลข้างต้น",
      },
    ],
    answer: "a",
    explanation:
      "นี่คือกับดักที่ออกสอบบ่อยที่สุดของบทนี้ transmission delay ขึ้นกับขนาดแพ็กเก็ตและอัตราส่งของ link ส่วน propagation delay ขึ้นกับระยะทางและตัวกลางเท่านั้น สองตัวนี้เป็นคนละเรื่องกันโดยสิ้นเชิง",
  },
  {
    id: "net-ch1-3",
    chapter: "net-ch1",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["net-switching", "net-fdm-tdm"],
    prompt: "ข้อความใดเกี่ยวกับ circuit switching และ packet switching ที่ถูกต้อง",
    choices: [
      {
        id: "a",
        text: "circuit switching รับประกันอัตราส่งคงที่ให้แต่ละการเชื่อมต่อ แต่ช่องสัญญาณที่จองไว้และไม่ได้ใช้จะสูญเปล่า",
        why: "ถูกต้อง เพราะจองทรัพยากรไว้ตลอดช่วงการเชื่อมต่อ จึงได้ประสิทธิภาพแบบรับประกัน แต่ช่วงที่ผู้ใช้เงียบก็ยังกินช่องสัญญาณอยู่",
      },
      {
        id: "b",
        text: "packet switching รับประกันอัตราส่งคงที่ให้แต่ละการเชื่อมต่อเช่นกัน แต่ประหยัดกว่า",
        why: "ผิด packet switching ไม่รับประกันอะไรเลย แพ็กเก็ตอาจต้องรอในคิวหรือถูกทิ้งเมื่อ buffer เต็ม",
      },
      {
        id: "c",
        text: "circuit switching ใช้กลไก store-and-forward เหมือนกับ packet switching",
        why: "ผิด store-and-forward เป็นกลไกของ packet switching ที่ต้องรับแพ็กเก็ตให้ครบก่อนจึงส่งต่อ ส่วนวงจรที่จองไว้แล้วส่งข้อมูลได้ต่อเนื่อง",
      },
      {
        id: "d",
        text: "packet switching ต้องทำ call setup ก่อนเริ่มส่งข้อมูลเสมอ",
        why: "ผิด การไม่ต้องมี call setup คือข้อได้เปรียบข้อหนึ่งของ packet switching",
      },
    ],
    answer: "a",
    explanation:
      "แกนของการเปรียบเทียบคือ จองไว้ก่อน กับ แบ่งกันใช้ตามต้องการ circuit switching จ่ายด้วยความสูญเปล่าเพื่อแลกกับการรับประกัน ส่วน packet switching แลกความไม่แน่นอนกับการรองรับผู้ใช้ได้มากกว่าหลายเท่า",
  },
  {
    id: "net-ch1-4",
    chapter: "net-ch1",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["net-store-forward"],
    prompt:
      "ส่งแพ็กเก็ตขนาด L บิตหนึ่งแพ็กเก็ตจากต้นทางไปปลายทางผ่าน router หนึ่งตัว ทุก link มีอัตราส่ง R เท่ากัน และไม่คิดความหน่วงชนิดอื่น เวลารวมที่ใช้คือเท่าใด และเพราะอะไร",
    choices: [
      {
        id: "a",
        text: "2L/R เพราะ router ต้องรับแพ็กเก็ตให้ครบทั้งแพ็กเก็ตก่อน จึงเริ่มส่งออกไปยัง link ถัดไปได้",
        why: "ถูกต้อง นี่คือหัวใจของ store-and-forward แพ็กเก็ตถูกดันออกไปสองครั้ง ครั้งละ L/R วินาที",
      },
      {
        id: "b",
        text: "L/R เพราะบิตแรกที่ถึง router จะถูกส่งต่อทันทีโดยไม่ต้องรอบิตที่เหลือ",
        why: "ผิด นั่นคือพฤติกรรมของ cut-through switching ซึ่งไม่ใช่แบบจำลอง packet switching ที่หนังสือใช้",
      },
      {
        id: "c",
        text: "L/2R เพราะภาระถูกแบ่งกันระหว่างสอง link",
        why: "ผิด การมี link เพิ่มไม่ได้ทำให้แต่ละ link ส่งเร็วขึ้น แต่ละ link ยังต้องดันครบ L บิตด้วยอัตรา R เท่าเดิม",
      },
      {
        id: "d",
        text: "3L/R เพราะต้องนับทั้งขาเข้า router ขาออก router และขาเข้าปลายทาง",
        why: "ผิด นับซ้ำ จำนวนครั้งที่ต้องดันบิตออกเท่ากับจำนวน link ซึ่งในกรณีนี้คือสอง",
      },
    ],
    answer: "a",
    explanation:
      "สูตรทั่วไปคือ N คูณ L/R เมื่อ N คือจำนวน link ที่ต้องผ่าน ถ้าส่งหลายแพ็กเก็ตต่อเนื่องแบบ pipeline สูตรจะกลายเป็น (N + P − 1) คูณ L/R เมื่อ P คือจำนวนแพ็กเก็ต",
  },
  {
    id: "net-ch1-5",
    chapter: "net-ch1",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["net-queuing"],
    prompt: "traffic intensity มีค่าเท่ากับ La/R ข้อความใดอธิบายความหมายของค่านี้ได้ถูกต้อง",
    choices: [
      {
        id: "a",
        text: "ถ้าค่ามากกว่า 1 อัตราบิตที่ไหลเข้าคิวจะสูงกว่าอัตราที่ระบายออกได้ คิวจะยาวขึ้นเรื่อย ๆ ไม่มีที่สิ้นสุด",
        why: "ถูกต้อง เมื่อ La มากกว่า R งานเข้าเร็วกว่างานออก คิวจึงโตไม่หยุดจนกระทั่ง buffer เต็มและเริ่มเกิด packet loss",
      },
      {
        id: "b",
        text: "ถ้าค่าน้อยกว่า 1 จะไม่เกิด queuing delay เลย",
        why: "ผิด แม้ค่าจะน้อยกว่า 1 ก็ยังเกิดคิวได้ เพราะแพ็กเก็ตอาจมาถึงพร้อมกันเป็นกลุ่ม ค่าเฉลี่ยต่ำไม่ได้แปลว่าไม่มีคิวเลย",
      },
      {
        id: "c",
        text: "ค่านี้บอกจำนวนแพ็กเก็ตที่รออยู่ในคิว ณ ขณะนั้น",
        why: "ผิด เป็นอัตราส่วนไร้หน่วยระหว่างอัตราบิตขาเข้ากับอัตราส่งของ link ไม่ใช่จำนวนแพ็กเก็ต",
      },
      {
        id: "d",
        text: "ค่านี้เพิ่มขึ้นเมื่อ R เพิ่มขึ้น",
        why: "ผิด R อยู่ที่ตัวส่วน การเพิ่มอัตราส่งของ link จะทำให้ traffic intensity ลดลง",
      },
    ],
    answer: "a",
    explanation:
      "จำสามช่วง ค่าใกล้ 0 คือหน่วงน้อย ค่าเข้าใกล้ 1 คือหน่วงพุ่งขึ้นแบบไม่เป็นเส้นตรง และค่ามากกว่า 1 คือระบบล้ม กฎทองในการออกแบบเครือข่ายคืออย่าปล่อยให้ traffic intensity เข้าใกล้ 1",
  },
  {
    id: "net-ch1-6",
    chapter: "net-ch1",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["net-throughput"],
    prompt:
      "ส่งไฟล์จาก server ไปยัง client ผ่านเส้นทางที่มีสาม link อัตราส่ง 100 Mbps, 5 Mbps และ 50 Mbps ตามลำดับ ถ้าไม่มี traffic อื่นแย่งใช้ throughput ที่ได้เท่ากับเท่าใด",
    choices: [
      {
        id: "a",
        text: "5 Mbps เพราะ throughput ถูกกำหนดโดย link ที่ช้าที่สุดบนเส้นทาง",
        why: "ถูกต้อง link ที่ช้าที่สุดคือคอขวด ข้อมูลไหลผ่านทั้งเส้นทางได้เร็วที่สุดเท่ากับจุดที่แคบที่สุด",
      },
      {
        id: "b",
        text: "155 Mbps เพราะนำอัตราของทุก link มารวมกัน",
        why: "ผิด link เรียงต่อกันแบบอนุกรม ไม่ใช่ขนานกัน จึงบวกกันไม่ได้",
      },
      {
        id: "c",
        text: "100 Mbps เพราะ link แรกเป็นตัวกำหนดว่าข้อมูลออกจาก server ได้เร็วเท่าใด",
        why: "ผิด ต่อให้ออกจาก server เร็ว ข้อมูลก็จะไปกองรอที่ link 5 Mbps อยู่ดี",
      },
      {
        id: "d",
        text: "ประมาณ 51.7 Mbps ซึ่งเป็นค่าเฉลี่ยของทั้งสาม link",
        why: "ผิด throughput ไม่ใช่ค่าเฉลี่ย แต่เป็นค่าต่ำสุด เหมือนน้ำที่ไหลผ่านท่อที่มีจุดคอด",
      },
    ],
    answer: "a",
    explanation:
      "สูตรคือ throughput เท่ากับค่าน้อยที่สุดของอัตราส่งทุก link บนเส้นทาง เปรียบเทียบกับท่อน้ำที่มีช่วงหนึ่งแคบ ปริมาณน้ำที่ออกปลายท่อถูกกำหนดโดยช่วงที่แคบที่สุดเสมอ",
  },
  {
    id: "net-ch1-7",
    chapter: "net-ch1",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["net-isp"],
    prompt:
      "จุดที่ ISP หลายรายมาเชื่อมต่อแลกเปลี่ยน traffic กันโดยตรง ณ สถานที่รวมแห่งเดียว เรียกว่าอะไร",
    choices: [
      {
        id: "a",
        text: "IXP (Internet Exchange Point)",
        why: "ถูกต้อง IXP เป็นอาคารที่รวมสวิตช์ไว้ให้ ISP หลายรายมา peer กันในที่เดียว ลดทั้งค่าใช้จ่ายและจำนวน hop",
      },
      {
        id: "b",
        text: "PoP (Point of Presence)",
        why: "PoP คือกลุ่มของ router ในเครือข่ายของ ISP รายหนึ่ง ที่เปิดให้ ISP ลูกค้าเข้ามาเชื่อมต่อ เป็นเรื่องของผู้ให้บริการรายเดียว ไม่ใช่จุดรวมหลายราย",
      },
      {
        id: "c",
        text: "Multi-homing",
        why: "เป็นการที่ ISP หรือองค์กรหนึ่งเชื่อมต่อกับผู้ให้บริการมากกว่าหนึ่งรายเพื่อความทนทาน ไม่ใช่ชื่อของสถานที่",
      },
      {
        id: "d",
        text: "Content provider network",
        why: "เป็นเครือข่ายส่วนตัวของผู้ให้บริการเนื้อหาอย่าง Google ที่เชื่อม data center ของตัวเองเข้าด้วยกัน",
      },
    ],
    answer: "a",
    explanation:
      "แยกให้ออกสี่คำ PoP คือจุดที่ลูกค้าเข้ามาต่อกับ ISP หนึ่งราย peering คือข้อตกลงแลก traffic กันตรงโดยไม่จ่ายเงิน IXP คือสถานที่ที่ทำ peering กันหลายราย และ multi-homing คือการต่อกับผู้ให้บริการหลายรายเพื่อไม่ให้ล่มพร้อมกัน",
  },
  {
    id: "net-ch1-8",
    chapter: "net-ch1",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["net-encapsulation", "net-layering"],
    prompt: "router ที่อยู่ระหว่างทางทำการ encapsulate และ de-encapsulate ที่ชั้นใดบ้าง",
    choices: [
      {
        id: "a",
        text: "ถึงชั้น network เท่านั้น จึงถอดและห่อใหม่แค่ส่วนของ link layer และอ่าน network header เพื่อหาเส้นทาง",
        why: "ถูกต้อง router ทำงานถึง layer 3 มันแกะ frame ออกเพื่ออ่าน IP header แล้วห่อเป็น frame ใหม่ตาม link ขาออก โดยไม่แตะ transport header",
      },
      {
        id: "b",
        text: "ทุกชั้นเหมือนกับ host ต้นทางและปลายทาง",
        why: "ผิด ถ้า router ต้องแกะถึง application layer ทุกแพ็กเก็ต เครือข่ายจะช้ามากและขัดกับหลักการ end-to-end",
      },
      {
        id: "c",
        text: "ถึงชั้น transport เพื่อตรวจสอบ port number ว่าส่งไปยัง service ใด",
        why: "ผิด การดู port เป็นหน้าที่ของ transport layer ที่ปลายทาง ไม่ใช่ของ router ระหว่างทาง ยกเว้นอุปกรณ์พิเศษอย่าง NAT หรือ firewall",
      },
      {
        id: "d",
        text: "ถึงชั้น physical เท่านั้น เพราะหน้าที่ของมันคือทวนสัญญาณ",
        why: "ผิด อุปกรณ์ที่ทำงานแค่ชั้น physical คือ repeater และ hub ส่วน router ต้องอ่าน IP address จึงจะเลือกเส้นทางได้",
      },
    ],
    answer: "a",
    explanation:
      "จำลำดับชั้นของอุปกรณ์ hub อยู่ชั้น 1 switch อยู่ชั้น 2 router อยู่ชั้น 3 และ host ทำครบทั้งห้าชั้น ผลที่ตามมาคือ IP address ต้นทางปลายทางไม่เปลี่ยนตลอดเส้นทาง แต่ MAC address เปลี่ยนทุก hop",
  },
  {
    id: "net-ch1-9",
    chapter: "net-ch1",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["net-layering"],
    prompt: "หน่วยข้อมูล (PDU) ของชั้น transport, network และ link เรียกว่าอะไรตามลำดับ",
    choices: [
      {
        id: "a",
        text: "segment, datagram, frame",
        why: "ถูกต้องตามศัพท์ที่หนังสือ Kurose ใช้ ส่วนชั้น application เรียก message และชั้น physical ทำงานระดับ bit",
      },
      {
        id: "b",
        text: "datagram, segment, frame",
        why: "สลับสองตัวแรก datagram เป็นของชั้น network ไม่ใช่ transport",
      },
      {
        id: "c",
        text: "packet, frame, bit",
        why: "packet เป็นคำกลาง ๆ ที่ใช้เรียกได้หลายชั้น และคำตอบนี้เลื่อนชั้นผิดไปหนึ่งขั้น",
      },
      {
        id: "d",
        text: "message, segment, datagram",
        why: "เลื่อนขึ้นไปหนึ่งชั้นทั้งชุด message เป็นของ application layer",
      },
    ],
    answer: "a",
    explanation:
      "ท่องจากบนลงล่าง message ที่ application, segment ที่ transport, datagram ที่ network, frame ที่ link และ bit ที่ physical แต่ละชั้นมองข้อมูลของชั้นบนเป็น payload แล้วเติม header ของตัวเองเข้าไป",
  },
  {
    id: "net-ch1-10",
    chapter: "net-ch1",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["net-security"],
    prompt:
      "ผู้โจมตีส่ง datagram โดยใส่ IP address ต้นทางที่ไม่ใช่ของตัวเองลงไปใน header การกระทำนี้เรียกว่าอะไร",
    choices: [
      {
        id: "a",
        text: "IP spoofing",
        why: "ถูกต้อง คือการปลอมแปลง address ต้นทาง เพื่อซ่อนตัวหรือหลอกให้ปลายทางเชื่อว่าข้อมูลมาจากแหล่งที่เชื่อถือได้",
      },
      {
        id: "b",
        text: "packet sniffing",
        why: "เป็นการดักอ่านแพ็กเก็ตที่ผ่านไปมาแบบเงียบ ๆ เป็นการโจมตีแบบ passive ไม่ได้ส่งอะไรออกไป",
      },
      {
        id: "c",
        text: "DoS attack",
        why: "เป็นการทำให้บริการใช้งานไม่ได้ ซึ่งอาจใช้ IP spoofing เป็นเครื่องมือ แต่ตัวการกระทำที่โจทย์อธิบายคือการปลอม address",
      },
      {
        id: "d",
        text: "man-in-the-middle attack",
        why: "คือการแทรกตัวอยู่กลางการสื่อสารเพื่ออ่านหรือแก้ข้อมูลระหว่างสองฝ่าย ไม่ใช่แค่การปลอม address ต้นทาง",
      },
    ],
    answer: "a",
    explanation:
      "แยก active กับ passive ให้ออก sniffing เป็น passive แค่ฟังเฉย ๆ ส่วน spoofing กับ DoS เป็น active ที่ต้องส่งข้อมูลออกไป วิธีแก้ IP spoofing ในระดับเครือข่ายคือการทำ end-point authentication",
  },

  {
    id: "net-ch1-11",
    chapter: "net-ch1",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["net-delay"],
    prompt: "ถูกหรือผิด — propagation delay ขึ้นอยู่กับขนาดของแพ็กเก็ตที่ส่ง",
    choices: [
      {
        id: "t",
        text: "ถูก",
        why: "ไม่ใช่ สูตรของ propagation delay คือ d หารด้วย s ซึ่งมีแต่ระยะทางและความเร็วสัญญาณ ไม่มีขนาดแพ็กเก็ตอยู่ในสูตรเลย",
        pin: true,
      },
      {
        id: "f",
        text: "ผิด",
        why: "ถูกต้อง propagation delay ขึ้นกับระยะทางระหว่างสอง router และความเร็วการแพร่ของสัญญาณในตัวกลางเท่านั้น ตัวที่ขึ้นกับขนาดแพ็กเก็ตคือ transmission delay",
        pin: true,
      },
    ],
    answer: "f",
    explanation:
      "ใช้ตัวอย่างขบวนรถช่วยจำ ความยาวของขบวนรถซึ่งเทียบได้กับขนาดแพ็กเก็ตมีผลกับเวลาที่ใช้ผ่านด่านซึ่งคือ transmission ส่วนระยะทางระหว่างด่านซึ่งคือ propagation ไม่สนใจว่าขบวนยาวแค่ไหน",
  },
  {
    id: "net-ch1-12",
    chapter: "net-ch1",
    source: "generated",
    type: "mcq",
    stars: 3,
    tags: ["net-access-tech"],
    prompt:
      "ถูกหรือผิด — ในเทคโนโลยี access network นั้น DSL เป็นตัวกลางที่ผู้ใช้ต้องแชร์แบนด์วิดท์กับเพื่อนบ้าน ส่วน HFC ให้สายเฉพาะของแต่ละบ้านแยกกัน",
    choices: [
      {
        id: "t",
        text: "ถูก",
        why: "ไม่ใช่ ข้อความนี้สลับกันพอดี",
        pin: true,
      },
      {
        id: "f",
        text: "ผิด",
        why: "ถูกต้อง ความจริงกลับกัน DSL ใช้สายโทรศัพท์ที่เป็น dedicated ระหว่างบ้านกับ central office ส่วน HFC เป็นตัวกลางแบบ shared ที่บ้านในละแวกเดียวกันแชร์แบนด์วิดท์ขาลงร่วมกัน",
        pin: true,
      },
    ],
    answer: "f",
    explanation:
      "ผลในทางปฏิบัติคือผู้ใช้ HFC จะรู้สึกว่าเน็ตช้าลงในช่วงเย็นที่เพื่อนบ้านใช้งานพร้อมกัน แต่ผู้ใช้ DSL จะได้ความเร็วค่อนข้างคงที่ ถึงแม้ค่าสูงสุดจะขึ้นกับระยะทางถึงชุมสาย",
  },
  {
    id: "net-ch1-13",
    chapter: "net-ch1",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["net-queuing"],
    prompt:
      "ถูกหรือผิด — ถ้าแพ็กเก็ตมาถึง router แล้วพบว่า link ขาออกว่างและไม่มีแพ็กเก็ตอื่นรออยู่ queuing delay ของแพ็กเก็ตนั้นเท่ากับศูนย์",
    choices: [
      {
        id: "t",
        text: "ถูก",
        why: "ถูกต้อง queuing delay คือเวลาที่ใช้รอให้แพ็กเก็ตข้างหน้าถูกส่งออกไปก่อน ถ้าไม่มีใครรออยู่เลยก็ไม่ต้องรอ",
        pin: true,
      },
      {
        id: "f",
        text: "ผิด",
        why: "ไม่ใช่ แม้ queuing delay จะเป็นศูนย์ แต่แพ็กเก็ตก็ยังต้องเสียเวลากับ processing, transmission และ propagation ซึ่งเป็นคนละตัวกัน",
        pin: true,
      },
    ],
    answer: "t",
    explanation:
      "ระวังอย่าสับสน queuing delay เป็นศูนย์ไม่ได้แปลว่า nodal delay รวมเป็นศูนย์ queuing เป็นตัวเดียวในสี่ตัวที่ผันผวนตามปริมาณ traffic ส่วนอีกสามตัวค่อนข้างคงที่",
  },
  {
    id: "net-ch1-14",
    chapter: "net-ch1",
    source: "generated",
    type: "mcq",
    stars: 2,
    tags: ["net-delay", "net-throughput"],
    prompt:
      "ถูกหรือผิด — การอัปเกรด link ให้มีแบนด์วิดท์สูงขึ้นจะช่วยลด propagation delay ระหว่างต้นทางกับปลายทางได้",
    choices: [
      {
        id: "t",
        text: "ถูก",
        why: "ไม่ใช่ แบนด์วิดท์คือจำนวนบิตต่อวินาทีที่ดันเข้า link ได้ ไม่เกี่ยวกับความเร็วที่สัญญาณเดินทางในตัวกลาง",
        pin: true,
      },
      {
        id: "f",
        text: "ผิด",
        why: "ถูกต้อง การเพิ่มแบนด์วิดท์ลดได้แค่ transmission delay และช่วยลด queuing ทางอ้อม แต่ propagation delay ถูกกำหนดโดยระยะทางและความเร็วสัญญาณในตัวกลาง ซึ่งเงินซื้อไม่ได้",
        pin: true,
      },
    ],
    answer: "f",
    explanation:
      "นี่คือเหตุผลที่การเชื่อมต่อผ่านดาวเทียมค้างฟ้ายังหน่วงราว 280 มิลลิวินาที ไม่ว่าจะซื้อแบนด์วิดท์เพิ่มเท่าใด และเป็นเหตุผลที่ CDN ต้องเอาเนื้อหาไปวางใกล้ผู้ใช้แทนการเพิ่มความเร็ว link",
  },

  {
    id: "net-ch1-15",
    chapter: "net-ch1",
    source: "generated",
    type: "numeric",
    stars: 2,
    tags: ["net-delay", "net-store-forward"],
    prompt:
      "ส่งแพ็กเก็ตขนาด 1,500 ไบต์ จากต้นทางไปปลายทางผ่าน router 2 ตัว ทุก link มีอัตราส่ง 2 Mbps ถ้าไม่คิด processing, queuing และ propagation delay เวลารวมที่ใช้เท่ากับกี่มิลลิวินาที",
    answer: 18,
    tolerance: 0.01,
    unit: "ms",
    hint: "อย่าลืมแปลงไบต์เป็นบิตก่อน และนับจำนวน link ให้ถูก",
    solution:
      "แปลงหน่วย L = 1,500 ไบต์ × 8 = 12,000 บิต\ntransmission delay ต่อ 1 link = L / R = 12,000 / (2 × 10⁶) = 0.006 วินาที = 6 ms\nrouter 2 ตัวคั่นกลาง แปลว่ามี link ทั้งหมด 3 เส้น\nแบบ store-and-forward ต้องดันบิตออกครบทุก link\nเวลารวม = 3 × 6 = 18 ms",
    explanation:
      "จุดที่พลาดบ่อยมีสองจุด จุดแรกคือลืมคูณ 8 แปลงไบต์เป็นบิต จุดที่สองคือนับ link ผิดเป็น 2 เพราะไปนับจำนวน router แทน จำไว้ว่า router 2 ตัวคั่นกลางแปลว่ามี 3 link",
  },
  {
    id: "net-ch1-16",
    chapter: "net-ch1",
    source: "past",
    type: "numeric",
    stars: 2,
    tags: ["net-switching", "net-probability"],
    prompt:
      "link หนึ่งมีความจุ 10 Mbps ผู้ใช้แต่ละคนต้องการแบนด์วิดท์ 500 kbps ตอนที่ใช้งานอยู่ ถ้าใช้ circuit switching จะรองรับผู้ใช้ได้พร้อมกันกี่คน",
    answer: 20,
    tolerance: 0,
    unit: "คน",
    hint: "ตอบเป็นจำนวนเต็ม",
    solution:
      "circuit switching จองแบนด์วิดท์ไว้ตายตัวให้แต่ละผู้ใช้ ไม่ว่าจะใช้งานจริงหรือไม่\nจำนวนผู้ใช้ = ความจุรวม ÷ แบนด์วิดท์ต่อคน\n= 10 Mbps ÷ 500 kbps\n= (10 × 10⁶) ÷ (500 × 10³)\n= 20 คน",
    explanation:
      "เลขนี้คือเพดานตายตัวของ circuit switching ผู้ใช้คนที่ 21 จะถูกปฏิเสธทันที ถึงแม้ 20 คนแรกจะนั่งเงียบไม่ได้ส่งข้อมูลเลยก็ตาม ส่วน packet switching รับได้มากกว่านี้หลายเท่าโดยแลกกับความเสี่ยงที่ link จะล้นเป็นบางช่วง",
  },
  {
    id: "net-ch1-17",
    chapter: "net-ch1",
    source: "generated",
    type: "numeric",
    stars: 3,
    tags: ["net-throughput"],
    prompt:
      "มีการดาวน์โหลด 10 รายการวิ่งพร้อมกันผ่าน link แกนกลางร่วมกันที่มีอัตราส่ง 500 kbps แต่ละรายการมี access link ฝั่งต้นทางและปลายทางเร็ว 2 Mbps ถ้าแบ่งแบนด์วิดท์ของ link แกนกลางเท่ากันทุกราย throughput ของการดาวน์โหลดหนึ่งรายการเท่ากับกี่ kbps",
    answer: 50,
    tolerance: 0,
    unit: "kbps",
    hint: "เทียบสามค่าบนเส้นทางแล้วเลือกค่าที่น้อยที่สุด",
    solution:
      "ส่วนแบ่งของ link แกนกลาง = 500 kbps ÷ 10 = 50 kbps\nเทียบสามค่าบนเส้นทาง access ต้นทาง = 2,000 kbps, ส่วนแบ่งแกนกลาง = 50 kbps, access ปลายทาง = 2,000 kbps\nthroughput = ค่าน้อยที่สุด = 50 kbps",
    explanation:
      "คอขวดในกรณีนี้อยู่ที่ link ร่วม ไม่ใช่ที่ access link การอัปเกรด access link เป็น 10 Mbps ก็ไม่ช่วยอะไรเลย ตราบใดที่ยังมี 10 รายการแย่งกันใช้ 500 kbps เดิม",
  },
  {
    id: "net-ch1-18",
    chapter: "net-ch1",
    source: "generated",
    type: "numeric",
    stars: 3,
    tags: ["net-delay"],
    figure: "net-nodal-delay",
    prompt:
      "ที่ router หนึ่งตัวมี processing delay 2 ms และ queuing delay 6 ms แพ็กเก็ตมีขนาด 8,000 บิต link ขาออกมีอัตราส่ง 1 Mbps ยาว 1,000 กิโลเมตร และสัญญาณเดินทางด้วยความเร็ว 2.5 × 10⁸ เมตรต่อวินาที ความหน่วงรวมที่ node นี้เท่ากับกี่มิลลิวินาที",
    answer: 20,
    tolerance: 0.01,
    unit: "ms",
    hint: "บวกให้ครบทั้งสี่ตัว และระวังการแปลงกิโลเมตรเป็นเมตร",
    solution:
      "d(proc) = 2 ms\nd(queue) = 6 ms\nd(trans) = L / R = 8,000 / (1 × 10⁶) = 0.008 วินาที = 8 ms\nd(prop) = d / s = (1,000 × 1,000) / (2.5 × 10⁸) = 10⁶ / (2.5 × 10⁸) = 0.004 วินาที = 4 ms\nรวม = 2 + 6 + 8 + 4 = 20 ms",
    explanation:
      "สังเกตว่า transmission กับ propagation ในข้อนี้บังเอิญมีขนาดใกล้เคียงกัน แต่ถูกควบคุมด้วยตัวแปรคนละชุด ถ้าเพิ่มอัตราส่ง link เป็น 2 Mbps จะเหลือ d(trans) = 4 ms แต่ d(prop) ยังคงเป็น 4 ms เท่าเดิมไม่ขยับ",
  },

  {
    id: "net-ch1-19",
    chapter: "net-ch1",
    source: "generated",
    type: "multi",
    stars: 3,
    tags: ["net-switching", "net-fdm-tdm"],
    prompt: "ข้อใดบ้างเป็นลักษณะของ circuit switching",
    choices: [
      {
        id: "a",
        text: "จองทรัพยากรบนเส้นทางไว้ล่วงหน้าตลอดช่วงเวลาการเชื่อมต่อ",
        why: "ถูก นี่คือนิยามหลักของ circuit switching ทรัพยากรที่จองประกอบด้วยแบนด์วิดท์และ buffer",
      },
      {
        id: "b",
        text: "ต้องทำ call setup ก่อนจึงจะเริ่มส่งข้อมูลได้",
        why: "ถูก การเชื่อมต่อต้องถูกสถาปนาให้เรียบร้อยก่อน จึงมีความหน่วงเริ่มต้นที่ packet switching ไม่มี",
      },
      {
        id: "c",
        text: "ใช้เทคนิค FDM หรือ TDM ในการแบ่งช่องสัญญาณให้แต่ละการเชื่อมต่อ",
        why: "ถูก FDM แบ่งตามย่านความถี่ ส่วน TDM แบ่งตาม time slot ทั้งคู่เป็นวิธีสร้างวงจรหลายวงจรบน link เดียวกัน",
      },
      {
        id: "d",
        text: "แบ่งข้อมูลออกเป็นชิ้นเล็ก ๆ แล้วส่งด้วยกลไก store-and-forward",
        why: "ผิด นี่คือลักษณะของ packet switching วงจรที่จองไว้แล้วส่งข้อมูลได้ต่อเนื่องโดยไม่ต้องพักเป็นชิ้น",
      },
      {
        id: "e",
        text: "ถ้าผู้ใช้เงียบไม่ส่งข้อมูล ช่องสัญญาณจะถูกยกให้การเชื่อมต่ออื่นใช้ทันที",
        why: "ผิด ตรงกันข้ามเลย ช่องที่จองไว้แล้วไม่ได้ใช้จะสูญเปล่า นี่คือข้อเสียหลักของ circuit switching",
      },
    ],
    answers: ["a", "b", "c"],
    explanation:
      "สามข้อที่ถูกล้วนสืบเนื่องจากแนวคิดเดียวกันคือจองก่อนใช้ ส่วนสองข้อที่ผิดเป็นลักษณะของ packet switching ที่แบ่งกันใช้ตามต้องการ ถ้าจำได้ว่าอะไรคือจอง อะไรคือแบ่ง จะตอบข้อสอบแนวนี้ได้หมด",
  },
  {
    id: "net-ch1-20",
    chapter: "net-ch1",
    source: "generated",
    type: "multi",
    stars: 3,
    tags: ["net-delay"],
    prompt: "ความหน่วงชนิดใดบ้างที่ค่าของมันไม่ขึ้นกับขนาดของแพ็กเก็ต L",
    choices: [
      {
        id: "a",
        text: "propagation delay",
        why: "ถูก สูตรคือ d หารด้วย s มีแต่ระยะทางกับความเร็วสัญญาณ ไม่มี L อยู่เลย",
      },
      {
        id: "b",
        text: "processing delay",
        why: "ถูก เป็นเวลาที่ router ใช้อ่าน header และตรวจ bit error ซึ่งขึ้นกับความเร็วของอุปกรณ์เป็นหลัก header มีขนาดคงที่ไม่ว่า payload จะยาวแค่ไหน",
      },
      {
        id: "c",
        text: "transmission delay",
        why: "ผิด สูตรคือ L หารด้วย R มี L อยู่ที่ตัวตั้งโดยตรง แพ็กเก็ตใหญ่ขึ้นเท่าใดก็ใช้เวลาดันออกนานขึ้นเท่านั้น",
      },
      {
        id: "d",
        text: "queuing delay",
        why: "ผิด traffic intensity เท่ากับ La/R ซึ่งมี L อยู่ด้วย แพ็กเก็ตใหญ่ขึ้นทำให้ traffic intensity สูงขึ้นและคิวยาวขึ้นตาม",
      },
    ],
    answers: ["a", "b"],
    explanation:
      "จัดกลุ่มให้จำง่าย สองตัวที่เกี่ยวกับ L คือ transmission โดยตรง และ queuing โดยอ้อมผ่าน traffic intensity ส่วนอีกสองตัวที่ไม่เกี่ยวคือ propagation ซึ่งเป็นเรื่องของระยะทาง และ processing ซึ่งเป็นเรื่องของความเร็วอุปกรณ์",
  },
];
