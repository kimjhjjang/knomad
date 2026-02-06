import Link from 'next/link';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { Button } from '@/components/ui/button';
import { LATEST_REVIEWS } from '@/constants/reviews';
import { ArrowRight } from 'lucide-react';

export function LatestReviews() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">최신 리뷰</h2>
            <p className="text-gray-600 text-lg">
              노마드들의 생생한 경험을 확인하세요
            </p>
          </div>
          <Link href="/reviews">
            <Button variant="ghost" className="hidden md:flex items-center gap-2">
              전체보기
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LATEST_REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/reviews">
            <Button variant="ghost" className="flex items-center gap-2 mx-auto">
              전체보기
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
