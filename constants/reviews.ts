import { Review } from '@/types';

export const LATEST_REVIEWS: Review[] = [
  {
    id: 'r1',
    userId: 'u1',
    userNickname: '디지털노마드123',
    cityId: 'busan',
    cityName: '부산',
    rating: 5,
    content: '해운대 근처 코워킹 스페이스가 정말 좋았어요. 바다 보면서 일하는 기분이 최고입니다! 생활비도 서울보다 저렴하고, 맛집도 많아서 만족스러운 한 달이었습니다.',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'r2',
    userId: 'u2',
    userNickname: '제주살이',
    cityId: 'jeju',
    cityName: '제주',
    rating: 4,
    content: '자연 속에서 일하고 싶다면 제주가 최고예요. 다만 생활비가 생각보다 높고, 겨울에는 바람이 강해서 조금 힘들었습니다. 그래도 카페 분위기는 정말 좋아요!',
    createdAt: new Date('2024-02-02'),
  },
  {
    id: 'r3',
    userId: 'u3',
    userNickname: '강릉러버',
    cityId: 'gangneung',
    cityName: '강릉',
    rating: 5,
    content: '강릉은 조용하고 집중하기 좋은 도시입니다. 커피 문화가 발달해서 카페 작업하기 완벽해요. 바다와 산이 가까워 주말에 힐링하기도 좋습니다.',
    createdAt: new Date('2024-02-03'),
  },
];
