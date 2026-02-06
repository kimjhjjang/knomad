import { Star, MapPin, Clock, Wifi } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CoworkingSpace } from '@/types';

interface CoworkingListProps {
  coworkings: CoworkingSpace[];
  cityName: string;
}

export function CoworkingList({ coworkings, cityName }: CoworkingListProps) {
  if (coworkings.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">아직 등록된 코워킹 스페이스가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        {cityName}에서 이용 가능한 코워킹 스페이스 {coworkings.length}곳
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coworkings.map((space) => (
          <Card key={space.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-lg">{space.name}</h4>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{space.rating}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{space.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{space.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="font-medium text-nomad-primary">{space.price}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {space.facilities.map((facility) => (
                    <Badge key={facility} variant="secondary" className="text-xs">
                      {facility}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
