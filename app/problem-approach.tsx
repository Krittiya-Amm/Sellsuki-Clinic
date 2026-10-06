'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Search, MapPin, BadgeCheck, Repeat, LayoutList, Store, LineChart, Stethoscope, FileText, Star, Users, CalendarClock, CalendarCheck, type LucideIcon } from 'lucide-react';

const LineMark = () => (
  <svg viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="10" fill="#06C755" />
    <path fill="#fff" d="M20 9c-6.1 0-11 3.9-11 8.8 0 4.4 3.9 8.1 9.2 8.7.36.08.85.25.97.56.1.28.07.72.03 1l-.16 1c-.05.3-.23 1.16.9.63 1.13-.53 6.1-3.6 8.33-6.16C32.4 20.6 33 19.3 33 17.8 33 12.9 28.1 9 20 9Z" />
    <text x="20" y="18.4" fill="#06C755" fontFamily="Arial,Helvetica,sans-serif" fontSize="6.6" fontWeight="700" letterSpacing="-.3" textAnchor="middle" dominantBaseline="central">LINE</text>
  </svg>
);

const searchUi = (
  <div className="pa-ui">
    <div className="pa-ui-bar"><Search aria-hidden="true" /><span>คลินิกความงาม ใกล้ฉัน</span><em>ผลการค้นหาในพื้นที่</em></div>
    <img src="/local-search-map.png" alt="แผนที่แสดงตำแหน่งคลินิกในผลการค้นหาพื้นที่กรุงเทพฯ" width="1536" height="960" loading="lazy" />
  </div>
);

const trustUi = (
  <figure className="pa-figure">
    <img src="/doctor-hifu-treatment.png" alt="คุณหมอหญิงกำลังทำ HIFU ให้ผู้รับบริการในคลินิก" width="2048" height="1536" loading="lazy" />
    <figcaption><span>เรื่องที่ลูกค้าอยากรู้ก่อนตัดสินใจ</span><strong>ใครดูแลเรา และดูแลอย่างไร?</strong></figcaption>
  </figure>
);

const lineUi = (
  <div className="pa-chat">
    <div className="pa-chat-head">
      <span className="pa-chat-ava"><LineMark /></span>
      <span className="pa-chat-id"><strong>คลินิกของคุณ</strong><em>LINE Official Account</em></span>
      <span className="pa-chat-dot" aria-hidden="true" />
    </div>
    <div className="pa-chat-body">
      <span className="pa-chat-day">วันนี้</span>
      <div className="pa-line in">
        <span className="pa-chat-ava sm"><LineMark /></span>
        <div className="pa-stack">
          <p className="pa-bubble">คุณมินต์คะ ครบ 3 เดือนหลังทำ HIFU แล้วน้า 💛</p>
          <p className="pa-bubble">ช่วงนี้มีโปรดูแลต่อเนื่องสำหรับลูกค้าเก่า ลด 20% ค่ะ</p>
        </div>
      </div>
      <div className="pa-line out">
        <div className="pa-stack">
          <p className="pa-bubble">กำลังอยากทำต่อพอดีเลยค่ะ</p>
          <p className="pa-bubble">ขอคิวเสาร์นี้ได้ไหมคะ</p>
          <span className="pa-chat-meta">อ่านแล้ว · 14:05</span>
        </div>
      </div>
      <div className="pa-line in">
        <span className="pa-chat-ava sm"><LineMark /></span>
        <div className="pa-stack">
          <p className="pa-bubble">ได้เลยค่ะ จองคิวเสาร์ 14:00 น. ให้นะคะ ✅</p>
          <span className="pa-chat-time">14:06</span>
        </div>
      </div>
    </div>
  </div>
);

const rows: { n: string; Icon: LucideIcon; problem: string; headline: string; label: string; paras: string[]; items: { t: string; Icon: LucideIcon }[]; visual: ReactNode }[] = [
  {
    n: '01',
    Icon: MapPin,
    problem: 'คนในพื้นที่ยังไม่รู้จัก',
    headline: 'อยู่ใกล้กัน แต่ลูกค้าหาคลินิกเราเจอหรือยัง?',
    label: 'WE START WITH DISCOVERABILITY',
    paras: [
      'เวลามองหาคลินิก ลูกค้าอาจเริ่มจากชื่อบริการกับย่านที่สะดวก ถ้าข้อมูลของเราหายาก เขาก็อาจไปเจอที่อื่นก่อน',
      'เราช่วยทำเว็บไซต์และปรับข้อมูลเพื่อรองรับการค้นหาในพื้นที่ หรือ Local SEO ให้คนรู้ว่าคลินิกอยู่ที่ไหน มีบริการอะไร และติดต่ออย่างไร',
    ],
    items: [
      { t: 'จัดหน้าบริการและข้อมูลพื้นที่ให้ชัด', Icon: LayoutList },
      { t: 'ดูแลข้อมูลที่อยู่ เวลาเปิด และช่องทางติดต่อ', Icon: Store },
      { t: 'ติดตามการค้นหาและคนที่เข้ามาสอบถาม', Icon: LineChart },
    ],
    visual: searchUi,
  },
  {
    n: '02',
    Icon: BadgeCheck,
    problem: 'ยังไม่รู้จัก หรือยังไม่มั่นใจ',
    headline: 'ก่อนตัดสินใจ ลูกค้าอยากรู้จักคนที่จะดูแลเขา',
    label: 'WE BUILD TRUST',
    paras: [
      'มีราคาและโปรโมชันแล้ว แต่ลูกค้าอาจยังไม่รู้ว่าคุณหมอถนัดอะไร เจ้าของคลินิกให้ความสำคัญกับเรื่องไหน และจะได้รับการดูแลแบบใด',
      'เราช่วยวางเรื่องเล่าของคุณหมอและเจ้าของคลินิก หรือ CEO Branding ควบคู่กับคอนเทนต์และรีวิวจากประสบการณ์จริง ให้คลินิกมีบุคลิกชัดเจนและสื่อสารกับลูกค้าที่ต้องการได้ตรงขึ้น',
    ],
    items: [
      { t: 'เล่าแนวคิดและความเชี่ยวชาญด้วยภาษาที่เข้าใจง่าย', Icon: Stethoscope },
      { t: 'ทำคอนเทนต์ตอบคำถามที่ลูกค้ายังลังเล', Icon: FileText },
      { t: 'ใช้รีวิวที่ได้รับอนุญาตและข้อมูลที่คลินิกตรวจสอบแล้ว', Icon: Star },
    ],
    visual: trustUi,
  },
  {
    n: '03',
    Icon: Repeat,
    problem: 'ลูกค้าเก่าไม่กลับมา',
    headline: 'มีรายชื่อลูกค้าอยู่แล้ว ลองดูแลให้ตรงกับแต่ละคน',
    label: 'WE RETAIN & RE-ENGAGE',
    paras: [
      'คนที่เพิ่งสอบถามกับคนที่เคยใช้บริการ อาจต้องการข้อมูลคนละอย่าง การส่งโปรโมชันเดียวให้ทุกคนจึงอาจไม่ตรงกับสิ่งที่เขาสนใจ',
      'เราช่วยวางระบบ LINE ให้แยกกลุ่มตามความสนใจและประวัติการใช้บริการ เพื่อให้ทีมติดตาม เสนอสิทธิประโยชน์ และชวนกลับมาได้เหมาะสม พร้อมเก็บสถานะไม่ให้รายชื่อคนสนใจตกหล่น',
    ],
    items: [
      { t: 'จัดกลุ่มลูกค้าใหม่และลูกค้าเดิม', Icon: Users },
      { t: 'วางข้อความและช่วงเวลาติดต่อที่เหมาะสม', Icon: CalendarClock },
      { t: 'ติดตามการตอบกลับ นัดหมาย และการกลับมาใช้บริการ', Icon: CalendarCheck },
    ],
    visual: lineUi,
  },
];

export default function ProblemApproach() {
  const list = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(() => rows.map(() => false));

  useEffect(() => {
    const items = Array.from(list.current!.children);
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const i = items.indexOf(e.target);
        setShown(prev => prev[i] ? prev : prev.map((v, k) => k === i ? true : v));
        io.unobserve(e.target);
      }
    }, { threshold: 0.18 });
    items.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="pa-list" ref={list}>
      {rows.map((r, i) => (
        <article key={r.n} className={`pa-row${i === 1 ? ' is-flipped' : ''}${shown[i] ? ' is-in' : ''}`}>
          <div className="pa-copy">
            <span className="pa-num" aria-hidden="true">{r.n}</span>
            <span className="pa-problem">{r.problem}</span>
            <h3>{r.headline}</h3>
            <span className="pa-label"><r.Icon aria-hidden="true" />{r.label}</span>
            {r.paras.map((p, k) => <p key={k} className="pa-lead">{p}</p>)}
            <ul className="pa-items">{r.items.map(it => <li key={it.t}><it.Icon aria-hidden="true" />{it.t}</li>)}</ul>
          </div>
          <div className="pa-visual">{r.visual}</div>
        </article>
      ))}
    </div>
  );
}
