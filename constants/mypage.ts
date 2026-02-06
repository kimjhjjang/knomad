import { Review } from '@/types';

export const MY_REVIEWS: Review[] = [
  {
    id: 'my-r1',
    userId: 'current-user',
    userNickname: '나',
    cityId: 'busan',
    citySlug: 'busan',
    cityName: '부산',
    rating: 5,
    content: '해운대 코워킹 스페이스에서 한 달 동안 일했는데 최고였습니다. 바다 보며 일하는 경험은 잊지 못할 거예요.',
    tags: ['카페좋음', '인터넷빠름'],
    createdAt: new Date('2025-01-10'),
  },
  {
    id: 'my-r2',
    userId: 'current-user',
    userNickname: '나',
    cityId: 'jeju',
    citySlug: 'jeju',
    cityName: '제주',
    rating: 4,
    content: '제주에서 2주간 머물렀는데, 자연 속에서 작업하는 느낌이 정말 좋았어요. 렌터카는 필수!',
    tags: ['자연경관', '힐링'],
    createdAt: new Date('2025-01-05'),
  },
  {
    id: 'my-r3',
    userId: 'current-user',
    userNickname: '나',
    cityId: 'gangneung',
    citySlug: 'gangneung',
    cityName: '강릉',
    rating: 5,
    content: '강릉 카페 문화가 정말 좋아요. 커피 한 잔과 바다 풍경이 작업 효율을 높여줍니다.',
    tags: ['카페좋음', '조용함'],
    createdAt: new Date('2024-12-20'),
  },
];

export const FAVORITE_CITY_SLUGS = ['busan', 'jeju', 'gangneung'];

export const RECENT_CITY_SLUGS = ['seoul', 'busan', 'jeju', 'jeonju'];
