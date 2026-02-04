export interface CategoryRanking {
  id: string;
  name: string;
  icon: string;
  cities: {
    rank: number;
    cityName: string;
    score: number;
  }[];
}
