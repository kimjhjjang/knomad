'use client';

import { useState, useMemo } from 'react';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { ALL_REVIEWS } from '@/constants/reviews';
import { ALL_CITIES } from '@/constants/cities';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PenSquare, Star } from 'lucide-react';
import Link from 'next/link';

export default function ReviewsPage() {
  const [filterCity, setFilterCity] = useState('');
  const [filterRating, setFilterRating] = useState(0);

  const filteredReviews = useMemo(() => {
    let reviews = [...ALL_REVIEWS];

    if (filterCity) {
      reviews = reviews.filter((r) => r.citySlug === filterCity);
    }

    if (filterRating > 0) {
      reviews = reviews.filter((r) => r.rating >= filterRating);
    }

    return reviews.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }, [filterCity, filterRating]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">리뷰</h1>
              <p className="text-gray-600">노마드들의 생생한 도시 경험을 확인하세요</p>
            </div>
            <Link href="/reviews/write">
              <Button className="bg-nomad-primary hover:bg-nomad-primary/90">
                <PenSquare className="w-4 h-4 mr-2" />
                리뷰 작성
              </Button>
            </Link>
          </div>

          {/* 필터 */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div>
              <label className="block text-xs text-gray-500 mb-1">도시</label>
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="border rounded-md px-3 py-1.5 text-sm bg-white"
              >
                <option value="">전체 도시</option>
                {ALL_CITIES.map((city) => (
                  <option key={city.slug} value={city.slug}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">최소 평점</label>
              <div className="flex gap-1">
                {[0, 3, 4, 5].map((r) => (
                  <Badge
                    key={r}
                    variant={filterRating === r ? 'default' : 'outline'}
                    className={`cursor-pointer ${
                      filterRating === r ? 'bg-nomad-primary' : ''
                    }`}
                    onClick={() => setFilterRating(r)}
                  >
                    {r === 0 ? '전체' : (
                      <span className="flex items-center gap-0.5">
                        {r}
                        <Star className="w-3 h-3 fill-current" />
                        이상
                      </span>
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-gray-500 mb-6">{filteredReviews.length}개의 리뷰</p>

        {filteredReviews.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">리뷰가 없습니다</h3>
            <p className="text-gray-500 mb-4">해당 조건에 맞는 리뷰가 없습니다</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
