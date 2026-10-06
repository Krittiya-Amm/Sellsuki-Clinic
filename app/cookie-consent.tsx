'use client';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Cookie, X } from 'lucide-react';

// Cookie consent banner + settings dialog modelled on sellsuki.co.th.
// The choice is kept in localStorage; optional categories default to off.
const STORAGE_KEY = 'sellsuki-cookie-consent';
const OPEN_EVENT = 'sellsuki:open-cookie-settings';

type Prefs = { performance: boolean; functional: boolean; advertising: boolean };
const NONE: Prefs = { performance: false, functional: false, advertising: false };
const ALL: Prefs = { performance: true, functional: true, advertising: true };

const groups: { key: 'necessary' | keyof Prefs; title: string; desc: string }[] = [
  { key: 'necessary', title: 'คุกกี้ที่จำเป็น', desc: 'คุกกี้ที่มีความจำเป็นต่อการทำงานของเว็บไซต์ เพื่อให้เว็บไซต์ทำงานได้เป็นปกติและมีความปลอดภัย ท่านไม่สามารถปิดการใช้งานคุกกี้ประเภทนี้ผ่านระบบของเว็บไซต์ได้' },
  { key: 'performance', title: 'คุกกี้ประสิทธิภาพการทำงานของเว็บไซต์', desc: 'ช่วยให้เราเข้าใจว่าผู้เข้าชมใช้งานเว็บไซต์อย่างไร เช่น หน้าที่เข้าชมบ่อย เพื่อนำไปปรับปรุงประสิทธิภาพของเว็บไซต์' },
  { key: 'functional', title: 'คุกกี้เพื่อการใช้งาน', desc: 'ช่วยจดจำตัวเลือกที่ท่านตั้งไว้ เพื่อให้การใช้งานเว็บไซต์สะดวกและตรงกับความต้องการของท่านมากขึ้น' },
  { key: 'advertising', title: 'คุกกี้เพื่อการโฆษณา', desc: 'ใช้เพื่อนำเสนอโฆษณาและเนื้อหาที่เหมาะสมกับความสนใจของท่าน รวมถึงวัดผลการแสดงโฆษณา' },
];

function save(prefs: Prefs) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ necessary: true, ...prefs, savedAt: new Date().toISOString() })); } catch {}
}

export function CookieSettingsButton() {
  return <button type="button" className="cookie-settings-link" onClick={() => dispatchEvent(new Event(OPEN_EVENT))}>Cookies Settings</button>;
}

export default function CookieConsent() {
  const [banner, setBanner] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(NONE);
  const [openRow, setOpenRow] = useState<string | null>('necessary');
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let stored: Partial<Prefs> | null = null;
    try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch {}
    if (stored) setPrefs({ ...NONE, ...stored });
    else setBanner(true);
    const open = () => { returnFocus.current = document.activeElement as HTMLElement; setDialog(true); };
    addEventListener(OPEN_EVENT, open);
    return () => removeEventListener(OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    if (!dialog) return;
    dialogRef.current?.querySelector<HTMLElement>('button')?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [dialog]);

  const close = () => { setDialog(false); returnFocus.current?.focus(); };
  const commit = (p: Prefs) => { setPrefs(p); save(p); setBanner(false); close(); };
  const openSettings = () => { returnFocus.current = document.activeElement as HTMLElement; setDialog(true); };

  return (
    <>
      {banner && !dialog && (
        <div className="cookie-banner" role="region" aria-label="การใช้คุกกี้">
          <div className="cookie-banner-copy">
            <strong><Cookie size={22} aria-hidden="true" />เว็บไซต์นี้ใช้คุกกี้</strong>
            <p>เพื่อปรับปรุงประสบการณ์การใช้งานเว็บไซต์ของคุณให้ดียิ่งขึ้น เราใช้คุกกี้ในการนำเสนอบริการโฆษณาและเนื้อหาที่เหมาะสม รวมถึงการวิเคราะห์ข้อมูล การคลิกที่ &lsquo;ยอมรับทั้งหมด&rsquo; หมายความว่าคุณยินยอมให้เราใช้คุกกี้เพื่อวัตถุประสงค์เหล่านี้ หรือคุณสามารถดูข้อมูลเพิ่มเติมได้ที่ <a href="https://www.sellsuki.co.th/policy" target="_blank" rel="noopener noreferrer">นโยบายความเป็นส่วนตัว</a></p>
          </div>
          <div className="cookie-actions">
            <button type="button" className="cookie-btn ghost" onClick={openSettings}>การตั้งค่าคุกกี้</button>
            <button type="button" className="cookie-btn primary" onClick={() => commit(ALL)}>ยอมรับทั้งหมด</button>
          </div>
        </div>
      )}
      {dialog && (
        <div className="cookie-overlay" onMouseDown={e => { if (e.target === e.currentTarget) close(); }}>
          <div className="cookie-dialog" role="dialog" aria-modal="true" aria-labelledby="cookie-dialog-title" ref={dialogRef}>
            <div className="cookie-dialog-head">
              <h2 id="cookie-dialog-title">การตั้งค่าคุกกี้</h2>
              <button type="button" className="cookie-close" onClick={close} aria-label="ปิด"><X size={22} /></button>
            </div>
            <div className="cookie-groups">
              {groups.map(g => {
                const on = g.key === 'necessary' || prefs[g.key];
                const expanded = openRow === g.key;
                return (
                  <section key={g.key} className={`cookie-group${expanded ? ' is-open' : ''}`}>
                    <div className="cookie-group-head">
                      <button type="button" className="cookie-toggle-row" aria-expanded={expanded} aria-controls={`cookie-${g.key}`} onClick={() => setOpenRow(expanded ? null : g.key)}>
                        <ChevronDown size={18} aria-hidden="true" />{g.title}
                      </button>
                      {g.key === 'necessary'
                        ? <span className="cookie-always">เปิดใช้งานตลอดเวลา</span>
                        : <button type="button" role="switch" aria-checked={on} aria-label={g.title} className="cookie-switch" onClick={() => setPrefs(p => ({ ...p, [g.key]: !p[g.key as keyof Prefs] }))}><span /></button>}
                    </div>
                    <p id={`cookie-${g.key}`} hidden={!expanded}>{g.desc}</p>
                  </section>
                );
              })}
            </div>
            <div className="cookie-dialog-actions">
              <button type="button" className="cookie-btn ghost" onClick={() => commit(prefs)}>ยืนยันตัวเลือกของฉัน</button>
              <button type="button" className="cookie-btn primary" onClick={() => commit(ALL)}>ยอมรับทั้งหมด</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
