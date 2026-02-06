'use client';

import { useSearchParams } from 'next/navigation';
import { ReviewForm } from '@/components/review/ReviewForm';

export default function WriteReviewPage() {
  const searchParams = useSearchParams();
  const defaultCity = searchParams.get('city') || undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ReviewForm defaultCitySlug={defaultCity} />
      </div>
    </div>
  );
}
