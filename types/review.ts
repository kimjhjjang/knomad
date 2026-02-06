export interface Review {
  id: string;
  userId: string;
  userNickname: string;
  cityId: string;
  citySlug: string;
  cityName: string;
  rating: number;
  content: string;
  tags: string[];
  createdAt: Date;
}
