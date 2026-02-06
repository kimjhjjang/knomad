'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { CityCard } from '@/components/ui/CityCard';
import { MY_REVIEWS, FAVORITE_CITY_SLUGS, RECENT_CITY_SLUGS } from '@/constants/mypage';
import { getCityBySlug } from '@/constants/cities';
import { User as UserIcon, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export default function MyPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const favoriteCities = FAVORITE_CITY_SLUGS.map(getCityBySlug).filter(Boolean);
  const recentCities = RECENT_CITY_SLUGS.map(getCityBySlug).filter(Boolean);

  const displayName = user?.user_metadata?.name || user?.email?.split('@')[0] || '노마드';
  const email = user?.email || 'user@example.com';
  const createdAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('ko-KR')
    : '2025-01-01';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 프로필 요약 카드 */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-nomad-primary/10 flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-nomad-primary" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{displayName}</h1>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" /> {email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> 가입일: {createdAt}
                  </span>
                </div>
              </div>
              <Link href="/profile">
                <Button variant="outline">프로필 수정</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 탭 */}
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="reviews">내 리뷰 ({MY_REVIEWS.length})</TabsTrigger>
            <TabsTrigger value="favorites">관심 도시 ({favoriteCities.length})</TabsTrigger>
            <TabsTrigger value="recent">최근 본 도시 ({recentCities.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews">
            {MY_REVIEWS.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">아직 작성한 리뷰가 없습니다</p>
                <Link href="/reviews/write">
                  <Button className="bg-nomad-primary hover:bg-nomad-primary/90">
                    첫 리뷰 작성하기
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MY_REVIEWS.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites">
            {favoriteCities.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">아직 관심 도시가 없습니다</p>
                <Link href="/cities">
                  <Button variant="outline">도시 탐색하기</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteCities.map((city) => city && (
                  <CityCard key={city.id} city={city} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent">
            {recentCities.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">최근 본 도시가 없습니다</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentCities.map((city) => city && (
                  <CityCard key={city.id} city={city} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
