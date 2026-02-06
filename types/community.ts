export interface Post {
  id: string;
  title: string;
  content: string;
  category: '자유' | '질문' | '정보공유' | '모임';
  authorName: string;
  authorEmail: string;
  createdAt: Date;
  commentCount: number;
  likeCount: number;
  tags: string[];
}

export interface Comment {
  id: string;
  postId: string;
  authorName: string;
  content: string;
  createdAt: Date;
}
