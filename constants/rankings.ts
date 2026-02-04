import { CategoryRanking } from '@/types';

export const CATEGORY_RANKINGS: CategoryRanking[] = [
  {
    id: 'internet',
    name: '인터넷 최강',
    icon: '🚀',
    cities: [
      { rank: 1, cityName: '서울', score: 342 },
      { rank: 2, cityName: '부산', score: 312 },
      { rank: 3, cityName: '제주', score: 298 },
    ],
  },
  {
    id: 'cost',
    name: '가성비 최고',
    icon: '💰',
    cities: [
      { rank: 1, cityName: '속초', score: 95 },
      { rank: 2, cityName: '전주', score: 100 },
      { rank: 3, cityName: '강릉', score: 110 },
    ],
  },
  {
    id: 'cafe',
    name: '카페 천국',
    icon: '☕',
    cities: [
      { rank: 1, cityName: '제주', score: 98 },
      { rank: 2, cityName: '강릉', score: 95 },
      { rank: 3, cityName: '부산', score: 92 },
    ],
  },
  {
    id: 'nature',
    name: '자연 힐링',
    icon: '🌲',
    cities: [
      { rank: 1, cityName: '제주', score: 99 },
      { rank: 2, cityName: '속초', score: 94 },
      { rank: 3, cityName: '강릉', score: 91 },
    ],
  },
  {
    id: 'food',
    name: '맛집 투어',
    icon: '🍜',
    cities: [
      { rank: 1, cityName: '전주', score: 97 },
      { rank: 2, cityName: '부산', score: 95 },
      { rank: 3, cityName: '서울', score: 93 },
    ],
  },
  {
    id: 'networking',
    name: '네트워킹',
    icon: '👥',
    cities: [
      { rank: 1, cityName: '서울', score: 96 },
      { rank: 2, cityName: '부산', score: 88 },
      { rank: 3, cityName: '제주', score: 82 },
    ],
  },
];
