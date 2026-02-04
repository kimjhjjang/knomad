import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NOMAD KOREA - 대한민국 디지털 노마드 도시 플랫폼',
  description:
    '대한민국 주요 도시의 노마드 생활 조건을 한눈에 비교하고, 실제 노마드들의 생생한 리뷰를 확인하세요.',
  keywords: '디지털노마드, 노마드, 한국, 도시, 생활비, 코워킹',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
