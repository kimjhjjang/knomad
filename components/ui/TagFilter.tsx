'use client';

import { Badge } from './badge';

const POPULAR_TAGS = ['바다', '산', '도심', '저렴', '카페', '조용'];

export function TagFilter() {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {POPULAR_TAGS.map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className="cursor-pointer hover:bg-nomad-primary hover:text-white transition-colors px-4 py-2 text-sm"
        >
          #{tag}
        </Badge>
      ))}
    </div>
  );
}
