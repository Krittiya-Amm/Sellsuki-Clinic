'use client';
import { useEffect, useRef, useState } from 'react';

const stages = [
  { n: '01', img: '/mascot-service-01.png', alt: 'หมา Sellsuki ถ่ายวิดีโอ พร้อมสื่อโฆษณาและรีวิว', title: 'ช่วยให้คนรู้จักคลินิก', desc: 'ถ่ายวิดีโอเล่าจุดเด่นของคลินิก ทำรีวิวจากประสบการณ์จริง และยิงโฆษณาให้เข้าถึงคนที่สนใจบริการของคุณ', services: 'VIDEO · CONTENT · ADS' },
  { n: '02', img: '/mascot-service-02.png', alt: 'หมา Sellsuki เป็น Influencer แนะนำคลินิก พร้อมเว็บไซต์และหมุดแผนที่', title: 'โดดเด่นกว่าคู่แข่ง', desc: 'เลือก Influencer ที่เหมาะกับคลินิก เล่าความเชี่ยวชาญของคุณหมอ พร้อมปรับเว็บไซต์และข้อมูลบน Google Maps ให้ลูกค้าหาเจอและเห็นเหตุผลที่จะเลือกคุณ', services: 'INFLUENCER · GOOGLE MAPS · WEBSITE' },
  { n: '03', img: '/mascot-service-03.png', alt: 'กบ LINE จัดข้อความที่เข้ามาเป็นกลุ่มตามความสนใจ', title: 'ช่วยติดตามคนที่ทักมา', desc: 'แยกกลุ่มคนที่ทัก LINE ตามบริการที่สนใจและสถานะการนัดหมาย ให้ทีมรู้ว่าใครรอข้อมูล ใครพร้อมนัด และควรคุยกับแต่ละคนต่ออย่างไร', services: 'LINE · CRM · FOLLOW-UP' },
  { n: '04', img: '/mascot-service-04.png', alt: 'กบ LINE ช่วยส่งข้อความแจ้งเตือนนัดหมายบนโทรศัพท์', title: 'ช่วยให้การนัดหมายง่ายขึ้น', desc: 'ส่งรายละเอียดและข้อความเตือนนัดผ่าน LINE ให้ลูกค้ายืนยันหรือขอเลื่อนนัดได้สะดวก และให้ทีมคลินิกเตรียมดูแลได้ทัน', services: 'LINE · APPOINTMENT · REMINDER' },
];

export default function CustomerJourney() {
  const rail = useRef<HTMLOListElement>(null);
  const [shown, setShown] = useState(() => stages.map(() => false));
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const items = Array.from(rail.current!.children);
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const i = items.indexOf(e.target);
        setShown(prev => prev[i] ? prev : prev.map((v, k) => k === i ? true : v));
        io.unobserve(e.target);
      }
    }, { threshold: 0.3 });
    items.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // On stacked layouts the stage nearest the reading line becomes the active step.
  useEffect(() => {
    if (!matchMedia('(max-width:760px)').matches) return;
    const items = Array.from(rail.current!.children);
    const onScroll = () => {
      const line = innerHeight * 0.45;
      let best = -1, bestDist = Infinity;
      items.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const d = Math.abs(r.top + r.height / 2 - line);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActive(best);
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <ol className="journey-steps" ref={rail}>
      {stages.map((s, i) => (
        <li key={s.n} className={`journey-step${shown[i] ? ' is-in' : ''}${active === i ? ' is-active' : ''}`}>
          <div className="journey-step-head">
            <span className="journey-circle"><img src={s.img} alt={s.alt} width={200} height={200} loading="lazy" /></span>
            <span className="journey-step-no" aria-hidden="true">{s.n}</span>
          </div>
          <span className="journey-services">{s.services.split(' · ').map(w => <em key={w}>{w}</em>)}</span>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
        </li>
      ))}
    </ol>
  );
}
