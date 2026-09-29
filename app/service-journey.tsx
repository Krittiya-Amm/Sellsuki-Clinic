'use client';

import { useState } from 'react';
const steps = [
  {label:'รู้จักคลินิก',team:'Sellsuki',detail:'วิดีโอ รีวิว และโฆษณาช่วยให้ลูกค้าเห็นจุดเด่นของคลินิก',measure:'ดูจำนวนคนที่เข้าถึงและช่องทางที่พาเขามา'},
  {label:'ทักมาสอบถาม',team:'LINE',detail:'แยกกลุ่มตามความสนใจ เพื่อให้ทีมตอบคำถามและติดตามได้ตรงเรื่อง',measure:'ดูจำนวนคนที่ทักและคนที่ยังรอคำตอบ'},
  {label:'ยืนยันนัด',team:'LINE',detail:'ส่งรายละเอียด ยืนยันนัด และเตือนก่อนถึงวัน เพื่อให้ทั้งสองฝ่ายเตรียมตัว',measure:'ดูจำนวนคนที่นัดและสถานะการยืนยัน'},
  {label:'มาใช้บริการ',team:'ทีมคลินิก',detail:'ทีมคลินิกบันทึกการเข้ารับบริการ แล้วนำข้อมูลมาทบทวนกับทีมการตลาด',measure:'ดูจำนวนคนที่มาตามนัด และจุดที่ควรปรับร่วมกัน'},
];
export default function ServiceJourney(){
  const [active,setActive]=useState(0);
  return <section className="service-journey" aria-labelledby="journey-title">
    <div className="journey-heading"><span className="eyebrow">ช่วยกันดูแลทุกขั้นตอน</span><h3 id="journey-title">มีคนทักกี่คน นัดกี่คน<br/>และมาใช้บริการจริงกี่คน?</h3><p>กดแต่ละช่วง เพื่อดูว่าทีมช่วยอะไรและติดตามผลอย่างไร</p></div>
    <img className="journey-mascots" src="/mascot-workflow.png" alt="หมา Sellsuki และกบ LINE ช่วยกันพาลูกค้าจากการรู้จักคลินิกไปถึงวันนัดหมาย" loading="lazy"/>
    <div className="journey-controls" aria-label="ขั้นตอนดูแลผู้สนใจ">{steps.map((s,i)=><button key={s.label} type="button" aria-pressed={active===i} aria-controls="journey-detail" className={active===i?'is-active':''} onClick={()=>setActive(i)}><span className="journey-step-number">0{i+1}</span><strong>{s.label}</strong><small>{s.team}</small></button>)}</div>
    <div className="journey-detail" id="journey-detail" aria-live="polite"><strong>{steps[active].label}</strong><p>{steps[active].detail}</p><span>{steps[active].measure}</span></div>
    <p className="journey-footnote">เริ่มจากข้อมูลที่คลินิกมีและเชื่อมได้ แล้วตกลงตัวเลขที่จะใช้ติดตามผลร่วมกัน</p>
  </section>;
}
