import Image from 'next/image';
import Link from 'next/link';
import { Star, Wifi } from 'lucide-react';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { City } from '@/types';

interface CityCardProps {
  city: City;
}

export function CityCard({ city }: CityCardProps) {
  return (
    <Card className="overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
      <Link href={`/cities/${city.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={city.imageUrl}
            alt={city.name}
            fill
            className="object-cover"
          />
          {city.rank && (
            <div className="absolute top-4 left-4 bg-nomad-primary text-white px-3 py-1 rounded-full font-bold text-sm">
              #{city.rank}
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-bold">{city.name}</h3>
            <p className="text-sm text-muted-foreground">{city.region}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{city.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({city.reviewCount}개 리뷰)
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">생활비</span>
              <span className="font-semibold">
                {city.monthlyCostMin}~{city.monthlyCostMax}만원/월
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">인터넷</span>
              <span className="font-semibold flex items-center gap-1">
                <Wifi className="w-3 h-3" />
                {city.internetSpeed}Mbps
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {city.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Link href={`/cities/${city.slug}`} className="flex-1">
              <Button className="w-full bg-nomad-primary hover:bg-nomad-primary/90">
                자세히 보기
              </Button>
            </Link>
            <Link href={`/compare?cities=${city.slug}`}>
              <Button variant="outline" size="icon" title="비교하기">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3l4 4-4 4"/><path d="M20 7H4"/><path d="M8 21l-4-4 4-4"/><path d="M4 17h16"/></svg>
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
