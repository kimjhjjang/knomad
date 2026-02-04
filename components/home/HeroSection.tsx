'use client';

import { SearchBar } from '@/components/ui/SearchBar';
import { TagFilter } from '@/components/ui/TagFilter';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* 슬로건 */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              대한민국에서
              <br />
              나만의 노마드 도시를 찾아보세요
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              전국 42개 도시의 생활비, 인터넷 속도, 코워킹 정보를 한눈에 비교하고
              <br className="hidden md:block" />
              실제 노마드들의 생생한 리뷰를 확인하세요
            </p>
          </div>

          {/* 검색바 */}
          <div className="pt-4">
            <SearchBar />
          </div>

          {/* 인기 태그 */}
          <div className="pt-4">
            <p className="text-sm text-gray-500 mb-3">인기 검색어</p>
            <TagFilter />
          </div>
        </div>
      </div>
    </section>
  );
}
