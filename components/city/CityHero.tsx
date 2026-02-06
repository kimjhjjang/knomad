import Image from 'next/image';
import { Star, MapPin, Wifi, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { City } from '@/types';

interface CityHeroProps {
  city: City;
}

export function CityHero({ city }: CityHeroProps) {
  return (
    <div className="relative">
      <div className="relative h-64 md:h-80 w-full">
        <Image
          src={city.imageUrl}
          alt={city.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="absolute top-4 left-4">
        <Link
          href="/cities"
          className="flex items-center gap-1 text-white/90 hover:text-white transition-colors bg-black/30 rounded-full px-3 py-1.5 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          목록으로
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-white/80" />
                <span className="text-white/80 text-sm">{city.region}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {city.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-semibold text-lg">{city.rating}</span>
                </div>
                <span className="text-white/70 text-sm">
                  ({city.reviewCount}개 리뷰)
                </span>
                <div className="flex items-center gap-1 text-white/70 text-sm">
                  <Wifi className="w-4 h-4" />
                  {city.internetSpeed}Mbps
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {city.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
