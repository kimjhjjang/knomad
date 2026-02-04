import { Card, CardContent, CardHeader, CardTitle } from './card';
import { CategoryRanking } from '@/types';

interface CategoryCardProps {
  category: CategoryRanking;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="text-2xl">{category.icon}</span>
          {category.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {category.cities.map((city) => (
            <div key={city.rank} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-nomad-primary w-6">
                  {city.rank}
                </span>
                <span>{city.cityName}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {city.score}점
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
