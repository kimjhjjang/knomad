import { ReviewCard } from '@/components/ui/ReviewCard';
import { Review } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';

interface CityReviewsProps {
  reviews: Review[];
  citySlug: string;
  cityName: string;
}

export function CityReviews({ reviews, citySlug, cityName }: CityReviewsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {cityName}에 대한 리뷰 {reviews.length}개
        </p>
        <Link href={`/reviews/write?city=${citySlug}`}>
          <Button size="sm" className="bg-nomad-primary hover:bg-nomad-primary/90">
            <PenSquare className="w-4 h-4 mr-2" />
            리뷰 작성하기
          </Button>
        </Link>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">아직 리뷰가 없습니다.</p>
          <p className="text-sm">첫 번째 리뷰를 작성해보세요!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
