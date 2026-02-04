import { CityCard } from '@/components/ui/CityCard';
import { POPULAR_CITIES } from '@/constants/cities';

export function PopularCities() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            인기 도시 TOP 6
          </h2>
          <p className="text-gray-600 text-lg">
            가장 많은 노마드들이 선택한 도시를 확인하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_CITIES.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </div>
    </section>
  );
}
