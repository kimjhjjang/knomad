'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StarRating } from './StarRating';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ALL_CITIES } from '@/constants/cities';

const REVIEW_TAGS = [
  '인터넷빠름', '카페좋음', '조용함', '자연경관', '맛집많음',
  '저렴함', '교통편리', '네트워킹', '힐링', '깨끗함', '예술문화',
];

interface ReviewFormProps {
  defaultCitySlug?: string;
}

export function ReviewForm({ defaultCitySlug }: ReviewFormProps) {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState(defaultCitySlug || '');
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCity) {
      alert('도시를 선택해주세요.');
      return;
    }
    if (rating === 0) {
      alert('별점을 선택해주세요.');
      return;
    }
    if (content.trim().length < 10) {
      alert('리뷰 내용을 10자 이상 작성해주세요.');
      return;
    }

    alert('리뷰가 등록되었습니다! (데모 버전에서는 실제로 저장되지 않습니다)');
    router.push('/reviews');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>리뷰 작성</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 도시 선택 */}
          <div>
            <label className="block text-sm font-medium mb-2">도시 선택</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full border rounded-md p-2.5 bg-white"
            >
              <option value="">도시를 선택하세요</option>
              {ALL_CITIES.map((city) => (
                <option key={city.slug} value={city.slug}>
                  {city.name} ({city.region})
                </option>
              ))}
            </select>
          </div>

          {/* 별점 */}
          <div>
            <label className="block text-sm font-medium mb-2">별점</label>
            <StarRating rating={rating} onRatingChange={setRating} size="lg" />
          </div>

          {/* 리뷰 내용 */}
          <div>
            <label className="block text-sm font-medium mb-2">리뷰 내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="이 도시에서의 노마드 경험을 공유해주세요... (최소 10자)"
              className="w-full border rounded-md p-3 min-h-[150px] resize-y"
              rows={5}
            />
            <p className="text-xs text-gray-400 mt-1">{content.length}자</p>
          </div>

          {/* 태그 선택 */}
          <div>
            <label className="block text-sm font-medium mb-2">좋았던 점 (태그 선택)</label>
            <div className="flex flex-wrap gap-2">
              {REVIEW_TAGS.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  className={`cursor-pointer transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-nomad-primary hover:bg-nomad-primary/90'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-nomad-primary hover:bg-nomad-primary/90 h-11"
          >
            리뷰 등록하기
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
