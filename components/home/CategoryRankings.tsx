import { CategoryCard } from '@/components/ui/CategoryCard';
import { CATEGORY_RANKINGS } from '@/constants/rankings';

export function CategoryRankings() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            카테고리별 TOP 3 랭킹
          </h2>
          <p className="text-gray-600 text-lg">
            각 분야별 최고의 노마드 도시를 확인하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORY_RANKINGS.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
