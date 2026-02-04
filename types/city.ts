export interface City {
  id: string;
  name: string;
  region: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  monthlyCostMin: number;
  monthlyCostMax: number;
  internetSpeed: number;
  tags: string[];
  rank?: number;
}
