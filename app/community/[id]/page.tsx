'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import { getPostById, getCommentsByPostId } from '@/constants/community';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = use(params);
  const post = getPostById(id);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likeCount || 0);
  const [commentText, setCommentText] = useState('');

  if (!post) {
    notFound();
  }

  const comments = getCommentsByPostId(id);

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      alert('댓글이 등록되었습니다! (데모 버전에서는 실제로 저장되지 않습니다)');
      setCommentText('');
    }
  };

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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/community"
          className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          목록으로
        </Link>

        {/* 게시글 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryColor(post.category)}`}>
                {post.category}
              </span>
            </div>

            <h1 className="text-2xl font-bold mb-3">{post.title}</h1>

            <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
              <span className="font-medium text-gray-700">{post.authorName}</span>
              <span>{getTimeAgo(post.createdAt)}</span>
            </div>

            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 text-sm transition-colors ${
                  liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-red-500' : ''}`} />
                <span>{likeCount}</span>
              </button>
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <MessageCircle className="w-5 h-5" />
                <span>{comments.length}</span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 댓글 영역 */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4">댓글 ({comments.length})</h3>

            {comments.length > 0 && (
              <div className="space-y-4 mb-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b pb-4 last:border-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{comment.authorName}</span>
                      <span className="text-xs text-gray-400">{getTimeAgo(comment.createdAt)}</span>
                    </div>
                    <p className="text-sm text-gray-600">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* 댓글 입력 */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="댓글을 입력하세요..."
                className="flex-1 border rounded-md px-3 py-2 text-sm"
              />
              <Button
                type="submit"
                size="sm"
                className="bg-nomad-primary hover:bg-nomad-primary/90"
                disabled={!commentText.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
