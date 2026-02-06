'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PenSquare } from 'lucide-react';

const CATEGORIES = ['자유', '질문', '정보공유', '모임'] as const;
const POPULAR_TAGS = ['부산', '서울', '제주', '코워킹', '생활비', '모임', '추천', '후기', '질문', '정보'];

export default function CommunityWritePage() {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!category) {
      alert('카테고리를 선택해주세요.');
      return;
    }
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (content.trim().length < 10) {
      alert('내용을 10자 이상 작성해주세요.');
      return;
    }

    alert('게시글이 등록되었습니다! (데모 버전에서는 실제로 저장되지 않습니다)');
    router.push('/community');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenSquare className="w-5 h-5 text-nomad-primary" />
              글쓰기
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 카테고리 */}
              <div>
                <label className="block text-sm font-medium mb-2">카테고리</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <Badge
                      key={cat}
                      variant={category === cat ? 'default' : 'outline'}
                      className={`cursor-pointer px-4 py-1.5 ${
                        category === cat ? 'bg-nomad-primary' : ''
                      }`}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 제목 */}
              <div>
                <label className="block text-sm font-medium mb-2">제목</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력하세요"
                />
              </div>

              {/* 내용 */}
              <div>
                <label className="block text-sm font-medium mb-2">내용</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="내용을 입력하세요... (최소 10자)"
                  className="w-full border rounded-md p-3 min-h-[200px] resize-y"
                  rows={8}
                />
                <p className="text-xs text-gray-400 mt-1">{content.length}자</p>
              </div>

              {/* 태그 */}
              <div>
                <label className="block text-sm font-medium mb-2">태그 (선택)</label>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TAGS.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                      className={`cursor-pointer ${
                        selectedTags.includes(tag)
                          ? 'bg-nomad-secondary hover:bg-nomad-secondary/90 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => toggleTag(tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-nomad-primary hover:bg-nomad-primary/90 h-11"
              >
                게시글 등록하기
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
