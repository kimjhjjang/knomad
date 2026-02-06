'use client';

import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { REGIONS } from '@/constants/regions';
import { ALL_CITIES } from '@/constants/cities';

export function RegionalMap() {
  const getCitySlug = (cityName: string) => {
    const city = ALL_CITIES.find((c) => c.name === cityName);
    return city?.slug;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            지역별 도시 탐색
          </h2>
          <p className="text-gray-600 text-lg">
            원하는 지역의 노마드 도시를 찾아보세요
          </p>
        </div>

        <Tabs defaultValue="capital" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8">
            {REGIONS.map((region) => (
              <TabsTrigger key={region.id} value={region.id}>
                {region.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {REGIONS.map((region) => (
            <TabsContent key={region.id} value={region.id}>
              <div className="bg-white rounded-lg border p-8">
                <div className="flex items-center justify-center min-h-[16rem] bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6">
                  <div className="text-center space-y-4">
                    <p className="text-6xl">🗺️</p>
                    <p className="text-xl font-semibold">{region.name} 지역</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {region.cities.map((city) => {
                        const slug = getCitySlug(city);
                        return slug ? (
                          <Link
                            key={city}
                            href={`/cities/${slug}`}
                            className="px-3 py-1 bg-white rounded-full text-sm font-medium shadow-sm hover:bg-nomad-primary hover:text-white transition-colors"
                          >
                            {city}
                          </Link>
                        ) : (
                          <span
                            key={city}
                            className="px-3 py-1 bg-white rounded-full text-sm font-medium shadow-sm text-gray-400"
                          >
                            {city}
                          </span>
                        );
                      })}
                    </div>
                    <Link href={`/cities?region=${encodeURIComponent(region.name)}`}>
                      <Button variant="outline" size="sm" className="mt-2">
                        {region.name} 전체보기
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
