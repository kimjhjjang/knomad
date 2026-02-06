import { ThumbsUp, ThumbsDown, Lightbulb, Bus, Thermometer, DollarSign, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { City } from '@/types';

interface CityOverviewProps {
  city: City;
}

export function CityOverview({ city }: CityOverviewProps) {
  return (
    <div className="space-y-8">
      {/* 도시 소개 */}
      <div>
        <h3 className="text-xl font-bold mb-3">도시 소개</h3>
        <p className="text-gray-600 leading-relaxed">{city.description}</p>
      </div>

      {/* 기본 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Wifi className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">인터넷 속도</p>
              <p className="font-bold text-lg">{city.internetSpeed}Mbps</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">월 생활비</p>
              <p className="font-bold text-lg">{city.monthlyCostMin}~{city.monthlyCostMax}만원</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Thermometer className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">연평균 기온</p>
              <p className="font-bold text-lg">
                {Math.round(city.weather.reduce((sum, w) => sum + w.avgTemp, 0) / city.weather.length)}°C
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 장단점 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ThumbsUp className="w-5 h-5 text-green-500" />
              장점
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {city.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-0.5">+</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ThumbsDown className="w-5 h-5 text-red-500" />
              단점
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {city.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-red-500 mt-0.5">-</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* 교통 정보 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bus className="w-5 h-5 text-blue-500" />
            교통 정보
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{city.transportation}</p>
        </CardContent>
      </Card>

      {/* 노마드 팁 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            노마드 팁
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {city.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-yellow-500 font-bold mt-0.5">{i + 1}.</span>
                <span className="text-gray-600">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 날씨 정보 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">월별 날씨</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-12 gap-2 min-w-[600px]">
              {city.weather.map((w) => (
                <div key={w.month} className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">{w.month}</p>
                  <p className="text-sm font-semibold">{w.avgTemp}°</p>
                  <div
                    className="mx-auto mt-1 w-4 rounded-t"
                    style={{
                      height: `${Math.max(w.avgTemp * 2, 4)}px`,
                      backgroundColor: w.avgTemp > 20 ? '#ef4444' : w.avgTemp > 10 ? '#f59e0b' : '#3b82f6',
                    }}
                  />
                  <p className="text-xs text-muted-foreground mt-1">{w.rainfall}mm</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
