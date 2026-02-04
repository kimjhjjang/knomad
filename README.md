# NOMAD KOREA 홈페이지

대한민국 디지털 노마드를 위한 도시 정보 플랫폼 "NOMAD KOREA"의 홈페이지입니다.

## 프로젝트 개요

- **범위**: 홈페이지 UI만 구현 (도시 상세, 비교, 커뮤니티 페이지는 제외)
- **구현 내용**: UI만 구현, 기능(API 연동, 인증 등)은 구현하지 않음
- **데이터**: Placeholder 이미지 + 더미 데이터 (하드코딩)

## 기술 스택

- **프레임워크**: Next.js 15+ (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: Shadcn UI
- **아이콘**: Lucide React
- **애니메이션**: react-countup

## 시작하기

### 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
npm run start
```

## 구현된 섹션

### P0 (필수 기능)
- ✅ HP-01: 글로벌 네비게이션 바 (GNB) - sticky, 모바일 햄버거 메뉴
- ✅ HP-02: 히어로 섹션 - 슬로건, 검색바, 인기 태그 퀵필터
- ✅ HP-04: 인기 도시 TOP 6 - 3x2 그리드, 도시 카드
- ✅ HP-11: 푸터 - 4열 링크 그룹, SNS 아이콘

### P1 (중요 기능)
- ✅ HP-03: 실시간 현황 배너 - 4개 통계 카드 + 카운트업 애니메이션
- ✅ HP-05: 지역별 탐색 지도 - 지역 탭, placeholder 지도
- ✅ HP-07: 카테고리별 TOP 3 랭킹 - 6개 카테고리
- ✅ HP-08: 최신 리뷰 피드 - 3건 미리보기

## 프로젝트 구조

```
kNomad/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root Layout (GNB, Footer)
│   ├── page.tsx           # 홈페이지
│   └── globals.css        # Tailwind CSS
│
├── components/
│   ├── layout/            # 레이아웃 컴포넌트
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/              # 홈페이지 섹션
│   │   ├── HeroSection.tsx
│   │   ├── StatsBanner.tsx
│   │   ├── PopularCities.tsx
│   │   ├── RegionalMap.tsx
│   │   ├── CategoryRankings.tsx
│   │   └── LatestReviews.tsx
│   └── ui/                # 재사용 UI 컴포넌트
│       ├── CityCard.tsx
│       ├── SearchBar.tsx
│       ├── TagFilter.tsx
│       ├── StatCard.tsx
│       ├── CategoryCard.tsx
│       ├── ReviewCard.tsx
│       └── ... (shadcn 컴포넌트)
│
├── types/                 # TypeScript 타입
│   ├── city.ts
│   ├── review.ts
│   ├── ranking.ts
│   └── index.ts
│
├── constants/             # 더미 데이터
│   ├── cities.ts
│   ├── reviews.ts
│   ├── rankings.ts
│   ├── regions.ts
│   └── stats.ts
│
└── lib/                   # 유틸리티
    └── utils.ts
```

## 반응형 디자인

- 모바일: `~640px` (1열 그리드)
- 태블릿: `md:` (641px~1024px, 2열 그리드)
- 데스크톱: `lg:` (1025px~, 3열 그리드)

## 라이센스

MIT
