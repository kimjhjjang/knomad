'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, LogIn, LogOut, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/app/login/actions';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface NavbarProps {
  user: SupabaseUser | null;
}

export function Navbar({ user }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const menuItems = [
    { label: '홈', href: '/' },
    { label: '도시탐색', href: '/cities' },
    { label: '비교', href: '/compare' },
    { label: '커뮤니티', href: '/community' },
  ];

  const displayName = user?.user_metadata?.name || user?.email?.split('@')[0] || '사용자';

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-2xl font-bold text-nomad-primary">
                NOMAD KOREA
              </h1>
            </Link>
          </div>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`transition-colors font-medium ${
                  isActive(item.href)
                    ? 'text-nomad-primary border-b-2 border-nomad-primary pb-1'
                    : 'text-gray-700 hover:text-nomad-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* 데스크톱 액션 버튼 */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/cities">
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
            </Link>
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-sm text-gray-700 font-medium hover:text-nomad-primary transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
                >
                  <div className="w-7 h-7 rounded-full bg-nomad-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-nomad-primary" />
                  </div>
                  {displayName}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-1 z-50">
                    <Link
                      href="/mypage"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      마이페이지
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      프로필 수정
                    </Link>
                    <div className="border-t my-1" />
                    <form action={logout}>
                      <button
                        type="submit"
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <LogOut className="w-4 h-4 inline mr-2" />
                        로그아웃
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button className="bg-nomad-primary hover:bg-nomad-primary/90">
                  <LogIn className="w-4 h-4 mr-2" />
                  로그인
                </Button>
              </Link>
            )}
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
                <Link
                  key={item.label}
                  href={item.href}
                  className={`transition-colors font-medium px-4 ${
                    isActive(item.href)
                      ? 'text-nomad-primary'
                      : 'text-gray-700 hover:text-nomad-primary'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 pt-2 border-t">
                {user ? (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700 font-medium flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {displayName}
                    </p>
                    <Link
                      href="/mypage"
                      className="block text-sm text-gray-600 hover:text-nomad-primary py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      마이페이지
                    </Link>
                    <Link
                      href="/profile"
                      className="block text-sm text-gray-600 hover:text-nomad-primary py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      프로필 수정
                    </Link>
                    <form action={logout}>
                      <Button
                        type="submit"
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        로그아웃
                      </Button>
                    </form>
                  </div>
                ) : (
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-nomad-primary hover:bg-nomad-primary/90">
                      <LogIn className="w-4 h-4 mr-2" />
                      로그인
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
