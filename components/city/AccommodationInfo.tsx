import { Home, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { City } from '@/types';

interface AccommodationInfoProps {
  city: City;
}

export function AccommodationInfo({ city }: AccommodationInfoProps) {
  return (
    <div className="space-y-6">
      {/* 숙소 가격대 */}
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Home className="w-5 h-5 text-nomad-primary" />
          숙소 가격대
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {city.accommodations.map((acc) => (
            <Card key={acc.type}>
              <CardContent className="p-5">
                <h4 className="font-bold text-lg mb-2">{acc.type}</h4>
                <p className="text-2xl font-bold text-nomad-primary mb-1">
                  {acc.minPrice}~{acc.maxPrice}만원
                  <span className="text-sm text-gray-500 font-normal">/월</span>
                </p>
                <p className="text-sm text-gray-500">{acc.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 월별 생활비 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="w-5 h-5 text-green-500" />
            예상 월 생활비 (1인 기준)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { label: '숙소 (원룸 기준)', min: city.accommodations[0]?.minPrice || 30, max: city.accommodations[0]?.maxPrice || 60 },
              { label: '식비', min: Math.round(city.monthlyCostMin * 0.25), max: Math.round(city.monthlyCostMax * 0.25) },
              { label: '교통비', min: 5, max: 15 },
              { label: '코워킹/카페', min: 10, max: 30 },
              { label: '기타 (통신, 여가 등)', min: 10, max: 25 },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b last:border-0">
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className="font-semibold text-sm">{item.min}~{item.max}만원</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 font-bold">
              <span>합계</span>
              <span className="text-nomad-primary text-lg">{city.monthlyCostMin}~{city.monthlyCostMax}만원</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
