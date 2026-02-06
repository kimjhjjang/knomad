'use client';

import { notFound } from 'next/navigation';
import { use, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CityHero } from '@/components/city/CityHero';
import { CityOverview } from '@/components/city/CityOverview';
import { CoworkingList } from '@/components/city/CoworkingList';
import { AccommodationInfo } from '@/components/city/AccommodationInfo';
import { CityReviews } from '@/components/city/CityReviews';
import { getCityBySlug } from '@/constants/cities';
import { getReviewsByCitySlug } from '@/constants/reviews';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight } from 'lucide-react';

interface CityDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function CityDetailPage({ params }: CityDetailPageProps) {
  const { slug } = use(params);
  const city = getCityBySlug(slug);

  if (!city) {
    notFound();
  }

  const reviews = getReviewsByCitySlug(slug);

  return (
    <div className="min-h-screen bg-gray-50">
      <CityHero city={city} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-end mb-4">
          <Link href={`/compare?cities=${city.slug}`}>
            <Button variant="outline" size="sm">
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              다른 도시와 비교
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="coworking">코워킹</TabsTrigger>
            <TabsTrigger value="accommodation">숙소/생활비</TabsTrigger>
            <TabsTrigger value="reviews">리뷰 ({reviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <CityOverview city={city} />
          </TabsContent>

          <TabsContent value="coworking">
            <CoworkingList coworkings={city.coworkingSpaces} cityName={city.name} />
          </TabsContent>

          <TabsContent value="accommodation">
            <AccommodationInfo city={city} />
          </TabsContent>

          <TabsContent value="reviews">
            <CityReviews reviews={reviews} citySlug={city.slug} cityName={city.name} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
