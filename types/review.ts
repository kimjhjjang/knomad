export interface Review {
  id: string;
  userId: string;
  userNickname: string;
  cityId: string;
  cityName: string;
  rating: number;
  content: string;
  createdAt: Date;
}
