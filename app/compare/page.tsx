'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ALL_CITIES, getCityBySlug } from '@/constants/cities';
import { City } from '@/types';
import { Star, Wifi, DollarSign, MapPin, X, Plus, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

export default function ComparePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialSlugs = searchParams.get('cities')?.split(',').filter(Boolean) || [];

  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(
    initialSlugs.slice(0, 3)
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedCities = useMemo(
    () => selectedSlugs.map(getCityBySlug).filter(Boolean) as City[],
    [selectedSlugs]
  );

  const availableCities = useMemo(
    () =>
      ALL_CITIES.filter(
        (city) =>
          !selectedSlugs.includes(city.slug) &&
          (searchQuery === '' ||
            city.name.includes(searchQuery) ||
            city.region.includes(searchQuery))
      ),
    [selectedSlugs, searchQuery]
  );

  const addCity = (slug: string) => {
    if (selectedSlugs.length < 3) {
      const newSlugs = [...selectedSlugs, slug];
      setSelectedSlugs(newSlugs);
      setSearchQuery('');
      setShowDropdown(false);
      router.replace(`/compare?cities=${newSlugs.join(',')}`);
    }
  };

  const removeCity = (slug: string) => {
    const newSlugs = selectedSlugs.filter((s) => s !== slug);
    setSelectedSlugs(newSlugs);
    router.replace(newSlugs.length ? `/compare?cities=${newSlugs.join(',')}` : '/compare');
  };

  const getBestValue = (values: number[], higher = true) => {
    if (values.length === 0) return -1;
    return higher
      ? values.indexOf(Math.max(...values))
      : values.indexOf(Math.min(...values));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <ArrowLeftRight className="inline w-8 h-8 mr-2 text-nomad-primary" />
            도시 비교
          </h1>
          <p className="text-gray-600">최대 3개 도시를 선택하여 비교해보세요</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 도시 선택 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[0, 1, 2].map((index) => {
            const city = selectedCities[index];
            return city ? (
              <Card key={city.slug} className="relative overflow-hidden">
                <button
                  onClick={() => removeCity(city.slug)}
                  className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="relative h-32">
                  <Image src={city.imageUrl} alt={city.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-bold text-lg">{city.name}</h3>
                    <p className="text-sm text-white/80">{city.region}</p>
                  </div>
                </div>
              </Card>
            ) : (
              <div key={index} className="relative">
                <Card
                  className="border-dashed border-2 cursor-pointer hover:border-nomad-primary transition-colors"
                  onClick={() => setShowDropdown(true)}
                >
                  <CardContent className="flex flex-col items-center justify-center h-32 text-gray-400">
                    <Plus className="w-8 h-8 mb-2" />
                    <p className="text-sm">도시 추가</p>
                  </CardContent>
                </Card>
                {showDropdown && index === selectedSlugs.length && (
                  <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                    <div className="p-2">
                      <input
                        type="text"
                        placeholder="도시 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border rounded px-3 py-2 text-sm mb-2"
                        autoFocus
                      />
                      {availableCities.map((city) => (
                        <button
                          key={city.slug}
                          onClick={() => addCity(city.slug)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center justify-between"
                        >
                          <span className="font-medium">{city.name}</span>
                          <span className="text-gray-400 text-xs">{city.region}</span>
                        </button>
                      ))}
                      {availableCities.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-2">검색 결과 없음</p>
                      )}
                    </div>
                    <div className="border-t p-2">
                      <button
                        onClick={() => { setShowDropdown(false); setSearchQuery(''); }}
                        className="w-full text-sm text-gray-500 hover:text-gray-700 py-1"
                      >
                        닫기
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 비교 내용 */}
        {selectedCities.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">비교할 도시를 선택해주세요</h3>
            <p className="text-gray-500 mb-4">위의 &quot;도시 추가&quot; 버튼을 클릭하여 비교할 도시를 선택하세요</p>
            <Link href="/cities">
              <Button variant="outline">도시 탐색하기</Button>
            </Link>
          </div>
        ) : selectedCities.length === 1 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">비교할 도시를 하나 더 선택해주세요</p>
          </div>
        ) : (
          <>
            {/* 데스크톱 테이블 */}
            <div className="hidden md:block">
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left p-4 text-sm font-semibold text-gray-500 w-40">항목</th>
                        {selectedCities.map((city) => (
                          <th key={city.slug} className="p-4 text-center font-bold">
                            {city.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* 평점 */}
                      <tr className="border-b">
                        <td className="p-4 text-sm text-gray-500 flex items-center gap-2">
                          <Star className="w-4 h-4" /> 평점
                        </td>
                        {selectedCities.map((city, i) => (
                          <td key={city.slug} className={`p-4 text-center font-semibold ${
                            i === getBestValue(selectedCities.map((c) => c.rating)) ? 'text-nomad-primary' : ''
                          }`}>
                            {city.rating} / 5.0
                          </td>
                        ))}
                      </tr>
                      {/* 생활비 */}
                      <tr className="border-b">
                        <td className="p-4 text-sm text-gray-500 flex items-center gap-2">
                          <DollarSign className="w-4 h-4" /> 월 생활비
                        </td>
                        {selectedCities.map((city, i) => (
                          <td key={city.slug} className={`p-4 text-center font-semibold ${
                            i === getBestValue(selectedCities.map((c) => c.monthlyCostMin), false) ? 'text-nomad-secondary' : ''
                          }`}>
                            {city.monthlyCostMin}~{city.monthlyCostMax}만원
                          </td>
                        ))}
                      </tr>
                      {/* 인터넷 속도 */}
                      <tr className="border-b">
                        <td className="p-4 text-sm text-gray-500 flex items-center gap-2">
                          <Wifi className="w-4 h-4" /> 인터넷 속도
                        </td>
                        {selectedCities.map((city, i) => (
                          <td key={city.slug} className={`p-4 text-center font-semibold ${
                            i === getBestValue(selectedCities.map((c) => c.internetSpeed)) ? 'text-nomad-primary' : ''
                          }`}>
                            {city.internetSpeed}Mbps
                          </td>
                        ))}
                      </tr>
                      {/* 코워킹 수 */}
                      <tr className="border-b">
                        <td className="p-4 text-sm text-gray-500 flex items-center gap-2">
                          <MapPin className="w-4 h-4" /> 코워킹 스페이스
                        </td>
                        {selectedCities.map((city, i) => (
                          <td key={city.slug} className={`p-4 text-center font-semibold ${
                            i === getBestValue(selectedCities.map((c) => c.coworkingSpaces.length)) ? 'text-nomad-primary' : ''
                          }`}>
                            {city.coworkingSpaces.length}곳
                          </td>
                        ))}
                      </tr>
                      {/* 리뷰 수 */}
                      <tr className="border-b">
                        <td className="p-4 text-sm text-gray-500">리뷰 수</td>
                        {selectedCities.map((city) => (
                          <td key={city.slug} className="p-4 text-center font-semibold">
                            {city.reviewCount}개
                          </td>
                        ))}
                      </tr>
                      {/* 태그 */}
                      <tr className="border-b">
                        <td className="p-4 text-sm text-gray-500">특징</td>
                        {selectedCities.map((city) => (
                          <td key={city.slug} className="p-4 text-center">
                            <div className="flex flex-wrap gap-1 justify-center">
                              {city.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                      {/* 장점 */}
                      <tr className="border-b">
                        <td className="p-4 text-sm text-gray-500 align-top">장점</td>
                        {selectedCities.map((city) => (
                          <td key={city.slug} className="p-4 text-sm">
                            <ul className="space-y-1">
                              {city.pros.map((pro, i) => (
                                <li key={i} className="flex items-start gap-1">
                                  <span className="text-green-500">+</span> {pro}
                                </li>
                              ))}
                            </ul>
                          </td>
                        ))}
                      </tr>
                      {/* 단점 */}
                      <tr>
                        <td className="p-4 text-sm text-gray-500 align-top">단점</td>
                        {selectedCities.map((city) => (
                          <td key={city.slug} className="p-4 text-sm">
                            <ul className="space-y-1">
                              {city.cons.map((con, i) => (
                                <li key={i} className="flex items-start gap-1">
                                  <span className="text-red-500">-</span> {con}
                                </li>
                              ))}
                            </ul>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>

            {/* 모바일 카드형 */}
            <div className="md:hidden space-y-4">
              {[
                { label: '평점', getValue: (c: City) => `${c.rating} / 5.0`, icon: Star },
                { label: '월 생활비', getValue: (c: City) => `${c.monthlyCostMin}~${c.monthlyCostMax}만원`, icon: DollarSign },
                { label: '인터넷 속도', getValue: (c: City) => `${c.internetSpeed}Mbps`, icon: Wifi },
                { label: '코워킹 스페이스', getValue: (c: City) => `${c.coworkingSpaces.length}곳`, icon: MapPin },
              ].map(({ label, getValue, icon: Icon }) => (
                <Card key={label}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gray-500" />
                      {label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedCities.map((city) => (
                        <div key={city.slug} className="flex justify-between items-center py-1">
                          <span className="text-sm font-medium">{city.name}</span>
                          <span className="font-semibold">{getValue(city)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {selectedCities.map((city) => (
                <Card key={city.slug}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{city.name} 장단점</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {city.pros.map((pro, i) => (
                      <p key={`pro-${i}`} className="text-sm">
                        <span className="text-green-500">+</span> {pro}
                      </p>
                    ))}
                    {city.cons.map((con, i) => (
                      <p key={`con-${i}`} className="text-sm">
                        <span className="text-red-500">-</span> {con}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
