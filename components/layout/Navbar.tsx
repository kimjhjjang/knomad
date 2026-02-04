'use client';

import { useState } from 'react';
import { Search, Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: '홈', href: '/' },
    { label: '도시탐색', href: '/cities' },
    { label: '비교', href: '/compare' },
    { label: '커뮤니티', href: '/community' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-nomad-primary">
              NOMAD KOREA
            </h1>
          </div>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-nomad-primary transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* 데스크톱 액션 버튼 */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            <Button className="bg-nomad-primary hover:bg-nomad-primary/90">
              <LogIn className="w-4 h-4 mr-2" />
              로그인
            </Button>
          </div>

          {/* 모바일 햄버거 메뉴 */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* 모바일 메뉴 드롭다운 */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-nomad-primary transition-colors font-medium px-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-2 border-t">
                <Button className="w-full bg-nomad-primary hover:bg-nomad-primary/90">
                  <LogIn className="w-4 h-4 mr-2" />
                  로그인
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
