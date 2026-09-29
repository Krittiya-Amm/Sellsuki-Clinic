import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'การตลาดคลินิกกับทีม Sellsuki | เพื่อน SME กว่า 10 ปี', description: 'Sellsuki ช่วยคลินิก Wellness & Aesthetic ทำคอนเทนต์ โฆษณา ติดตามคนสนใจ นัดหมาย และดูแลลูกค้าเดิม เริ่มจากปัญหาที่คลินิกอยากแก้' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="th"><body>{children}</body></html>; }
