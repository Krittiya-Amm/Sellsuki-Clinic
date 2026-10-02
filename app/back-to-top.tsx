'use client';
import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

// Floating button that appears once the lead-form section (#talk) scrolls into view.
export default function BackToTop() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const talk = document.getElementById('talk');
    if (!talk) return;
    const onScroll = () => setOn(talk.getBoundingClientRect().top < innerHeight * 0.75);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a className={`to-top${on ? ' is-on' : ''}`} href="#main" aria-label="กลับด้านบน" tabIndex={on ? 0 : -1}>
      <ChevronUp size={26} strokeWidth={2.4} aria-hidden="true" />
    </a>
  );
}
