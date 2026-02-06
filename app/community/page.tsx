'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { POSTS } from '@/constants/community';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, PenSquare, MessageCircle, Heart, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

const CATEGORIES = ['전체', '자유', '질문', '정보공유', '모임'] as const;

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    let posts = [...POSTS];

    if (selectedCategory !== '전체') {
      posts = posts.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q)
      );
    }

    return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [selectedCategory, searchQuery]);

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return '오늘';
    if (days === 1) return '어제';
    if (days < 7) return `${days}일 전`;
    if (days < 30) return `${Math.floor(days / 7)}주 전`;
    return `${Math.floor(days / 30)}개월 전`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '자유': return 'bg-blue-100 text-blue-700';
      case '질문': return 'bg-purple-100 text-purple-700';
      case '정보공유': return 'bg-green-100 text-green-700';
      case '모임': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">커뮤니티</h1>
              <p className="text-gray-600">노마드들과 소통하고 정보를 나눠보세요</p>
            </div>
            <Link href="/community/write">
              <Button className="bg-nomad-primary hover:bg-nomad-primary/90">
                <PenSquare className="w-4 h-4 mr-2" />
                글쓰기
              </Button>
            </Link>
          </div>

          {/* 카테고리 탭 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {CATEGORIES.map((cat) => (
              <Badge
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                className={`cursor-pointer px-4 py-1.5 text-sm ${
                  selectedCategory === cat
                    ? 'bg-nomad-primary hover:bg-nomad-primary/90'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>

          {/* 검색바 */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="제목, 내용으로 검색..."
              className="pl-9 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-sm text-gray-500 mb-4">{filteredPosts.length}개의 게시글</p>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-2">게시글이 없습니다</h3>
            <p className="text-gray-500">다른 카테고리나 검색어를 시도해보세요</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/community/${post.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer mb-3">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryColor(post.category)}`}>
                            {post.category}
                          </span>
                          <span className="text-xs text-gray-400">{getTimeAgo(post.createdAt)}</span>
                        </div>
                        <h3 className="font-bold text-base mb-1 truncate">{post.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{post.content}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-gray-400">{post.authorName}</span>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <MessageCircle className="w-3.5 h-3.5" /> {post.commentCount}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Heart className="w-3.5 h-3.5" /> {post.likeCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
