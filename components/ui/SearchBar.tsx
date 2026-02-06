'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from './input';
import { Button } from './button';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/cities?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/cities');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2 max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          placeholder="도시, 지역, 태그로 검색하세요..."
          className="pl-10 h-12 text-base"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <Button
        className="h-12 px-6 bg-nomad-primary hover:bg-nomad-primary/90"
        onClick={handleSearch}
      >
        검색
      </Button>
    </div>
  );
}
