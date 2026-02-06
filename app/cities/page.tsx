'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { CityCard } from '@/components/ui/CityCard';
import { ALL_CITIES } from '@/constants/cities';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const REGION_GROUPS = ['전체', '수도권', '강원', '충청', '전라', '경상', '제주'] as const;
const ALL_TAGS = ['도심', '바다', '산', '자연', '카페', '맛집', '조용', '저렴', '힐링', '전통', '네트워킹', '예술', '편의시설', '교통편리', '깨끗함'];
const SORT_OPTIONS = [
  { value: 'rating', label: '평점 높은순' },
  { value: 'cost-asc', label: '생활비 낮은순' },
  { value: 'cost-desc', label: '생활비 높은순' },
  { value: 'internet', label: '인터넷 빠른순' },
  { value: 'reviews', label: '리뷰 많은순' },
] as const;

export default function CitiesPage() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || '전체');
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tag') ? [searchParams.get('tag')!] : []
  );
  const [sortBy, setSortBy] = useState<string>('rating');
  const [showFilters, setShowFilters] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredCities = useMemo(() => {
    let cities = [...ALL_CITIES];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      cities = cities.filter(
        (city) =>
          city.name.toLowerCase().includes(q) ||
          city.region.toLowerCase().includes(q) ||
          city.tags.some((tag) => tag.includes(q)) ||
          city.description.toLowerCase().includes(q)
      );
    }

    if (selectedRegion !== '전체') {
      cities = cities.filter((city) => city.regionGroup === selectedRegion);
    }

    if (selectedTags.length > 0) {
      cities = cities.filter((city) =>
        selectedTags.some((tag) => city.tags.includes(tag))
      );
    }

    switch (sortBy) {
      case 'rating':
        cities.sort((a, b) => b.rating - a.rating);
        break;
      case 'cost-asc':
        cities.sort((a, b) => a.monthlyCostMin - b.monthlyCostMin);
        break;
      case 'cost-desc':
        cities.sort((a, b) => b.monthlyCostMax - a.monthlyCostMax);
        break;
      case 'internet':
        cities.sort((a, b) => b.internetSpeed - a.internetSpeed);
        break;
      case 'reviews':
        cities.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return cities;
  }, [searchQuery, selectedRegion, selectedTags, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedRegion('전체');
    setSelectedTags([]);
    setSortBy('rating');
  };

  const hasActiveFilters = searchQuery || selectedRegion !== '전체' || selectedTags.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">도시 탐색</h1>
          <p className="text-gray-600 mb-6">대한민국 {ALL_CITIES.length}개 도시의 노마드 정보를 확인하세요</p>

          {/* 검색바 */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="도시명, 지역, 태그로 검색..."
                className="pl-10 h-11"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              className="md:hidden h-11"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 필터 사이드바 */}
          <div className={`lg:w-64 flex-shrink-0 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* 지역 필터 */}
            <div>
              <h3 className="font-semibold mb-3 text-sm text-gray-500 uppercase">지역</h3>
              <div className="flex flex-wrap gap-2">
                {REGION_GROUPS.map((region) => (
                  <Badge
                    key={region}
                    variant={selectedRegion === region ? 'default' : 'outline'}
                    className={`cursor-pointer transition-colors ${
                      selectedRegion === region
                        ? 'bg-nomad-primary hover:bg-nomad-primary/90'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedRegion(region)}
                  >
                    {region}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 태그 필터 */}
            <div>
              <h3 className="font-semibold mb-3 text-sm text-gray-500 uppercase">태그</h3>
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                    className={`cursor-pointer transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-nomad-secondary hover:bg-nomad-secondary/90 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 정렬 */}
            <div>
              <h3 className="font-semibold mb-3 text-sm text-gray-500 uppercase">정렬</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border rounded-md p-2 text-sm bg-white"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full">
                <X className="w-4 h-4 mr-1" />
                필터 초기화
              </Button>
            )}
          </div>

          {/* 도시 그리드 */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                {filteredCities.length}개 도시
                {hasActiveFilters && ' (필터 적용됨)'}
              </p>
            </div>

            {filteredCities.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2">검색 결과가 없습니다</h3>
                <p className="text-gray-500 mb-4">다른 검색어나 필터를 시도해보세요</p>
                <Button variant="outline" onClick={clearFilters}>
                  필터 초기화
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCities.map((city) => (
                  <CityCard key={city.id} city={city} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
