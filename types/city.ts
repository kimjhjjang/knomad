export interface CoworkingSpace {
  id: string;
  name: string;
  price: string;
  address: string;
  rating: number;
  facilities: string[];
  hours: string;
}

export interface Accommodation {
  type: string;
  minPrice: number;
  maxPrice: number;
  description: string;
}

export interface WeatherInfo {
  month: string;
  avgTemp: number;
  rainfall: number;
}

export interface City {
  id: string;
  slug: string;
  name: string;
  region: string;
  regionGroup: '수도권' | '강원' | '충청' | '전라' | '경상' | '제주';
  imageUrl: string;
  rating: number;
  reviewCount: number;
  monthlyCostMin: number;
  monthlyCostMax: number;
  internetSpeed: number;
  tags: string[];
  rank?: number;
  description: string;
  pros: string[];
  cons: string[];
  tips: string[];
  images: string[];
  accommodations: Accommodation[];
  weather: WeatherInfo[];
  transportation: string;
  coworkingSpaces: CoworkingSpace[];
}
