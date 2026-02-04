'use client';

import { MapPin, Users, MessageSquare, Star } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { PLATFORM_STATS } from '@/constants/stats';

export function StatsBanner() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={MapPin}
            value={PLATFORM_STATS.totalCities}
            label="등록된 도시"
            suffix="개"
          />
          <StatCard
            icon={Users}
            value={PLATFORM_STATS.activeNomads}
            label="활동 중인 노마드"
            suffix="명"
          />
          <StatCard
            icon={MessageSquare}
            value={PLATFORM_STATS.totalReviews}
            label="누적 리뷰"
            suffix="개"
          />
          <StatCard
            icon={Star}
            value={PLATFORM_STATS.averageRating}
            label="평균 평점"
            decimals={1}
          />
        </div>
      </div>
    </section>
  );
}
