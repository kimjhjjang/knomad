# kNomad 웹사이트 점진적 개선 계획

> **원칙**: 데이터베이스 미사용, 모든 데이터는 `constants/` 디렉토리의 가짜 데이터로 처리.
> 각 Phase는 독립적으로 실행 가능하며, 이전 Phase의 결과물 위에 점진적으로 쌓인다.

---

## 현재 프로젝트 상태 요약

- [x] 홈페이지 6개 섹션 UI
- [x] 로그인/회원가입 (Supabase Auth)
- [x] Navbar 인증 상태 반영
- [x] 반응형 디자인
- [x] 기술 스택: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, shadcn/ui, Supabase Auth, Lucide Icons
- [x] 데이터: `constants/` 디렉토리에 도시, 리뷰, 카테고리 랭킹, 지역, 플랫폼 통계 하드코딩
- [x] 타입: `types/` 디렉토리에 City, Review, CategoryRanking 인터페이스 정의
- [x] UI 패턴: shadcn/ui (Button, Card, Input, Badge, Tabs), Lucide 아이콘, nomad 브랜드 색상(primary: #3B82F6, secondary: #10B981, accent: #F59E0B)

---

## Phase 1: 도시 데이터 확장 + 도시 상세 페이지

- [x] **완료**

### 오버뷰
홈페이지에서 "자세히 보기" 버튼을 눌렀을 때 이동할 도시 상세 페이지를 만든다. 이를 위해 먼저 도시 더미 데이터를 대폭 확장하여 상세 정보를 포함시킨다. 현재 6개 도시 데이터를 최소 12개 이상으로 늘리고, 각 도시에 상세 정보(코워킹 스페이스, 숙소, 교통, 날씨 등)를 추가한다.

### 수정/생성할 사항

- [x] **`types/city.ts` 수정** — City 인터페이스에 상세 필드 추가: `slug`, `description`(도시 소개글), `coworkingSpaces`(코워킹 목록: 이름/가격/주소/평점), `accommodations`(숙소 가격대), `weather`(월별 기온/강수량), `transportation`(교통 정보), `tips`(노마드 팁 문자열 배열), `images`(이미지 URL 배열), `pros`/`cons`(장단점 배열)
- [x] **`constants/cities.ts` 수정** — 기존 6개 도시에 위 상세 필드 데이터 추가. 추가로 7개 도시 데이터 신규 작성 (대전, 대구, 광주, 여수, 춘천, 세종, 경주). 각 도시에 고유 `slug` 부여 (예: `busan`, `jeju`, `gangneung`)
- [x] **`app/cities/[slug]/page.tsx` 생성** — 도시 상세 페이지 (Client Component)
  - [x] 히어로 이미지 + 도시명 + 평점/리뷰 수
  - [x] 탭 구성: 개요 | 코워킹 | 숙소/생활비 | 리뷰
  - [x] 개요 탭: 도시 소개글, 장단점, 노마드 팁, 기본 정보(인터넷 속도, 생활비, 날씨)
  - [x] 코워킹 탭: 코워킹 스페이스 목록 카드
  - [x] 숙소/생활비 탭: 숙소 가격대, 월별 생활비 breakdown
  - [x] 리뷰 탭: 해당 도시 리뷰 목록 (가짜 데이터)
- [x] **`components/city/CityHero.tsx` 생성** — 도시 상세 페이지 상단 히어로 섹션
- [x] **`components/city/CityOverview.tsx` 생성** — 개요 탭 콘텐츠
- [x] **`components/city/CoworkingList.tsx` 생성** — 코워킹 스페이스 목록
- [x] **`components/city/CityReviews.tsx` 생성** — 도시별 리뷰 목록
- [x] **`components/city/AccommodationInfo.tsx` 생성** — 숙소/생활비 탭 콘텐츠
- [x] **`components/ui/CityCard.tsx` 수정** — "자세히 보기" 버튼에 `/cities/${city.slug}` 링크 연결, 비교 버튼 추가
- [x] **`constants/reviews.ts` 수정** — 리뷰 데이터를 15개로 확장, 각 리뷰에 `citySlug` 필드 추가하여 도시별 필터링 가능하게 함
- [x] **`types/review.ts` 수정** — Review 인터페이스에 `citySlug`, `tags` 필드 추가
- [x] **`types/index.ts` 수정** — 새로운 타입(CoworkingSpace, Accommodation, WeatherInfo) export 추가

### 검증 항목

- [x] 홈페이지의 도시 카드에서 "자세히 보기" 클릭 → `/cities/[slug]` 페이지로 이동 확인
- [x] 도시 상세 페이지에서 모든 탭(개요, 코워킹, 숙소/생활비, 리뷰)이 정상 렌더링되는지 확인
- [x] 존재하지 않는 slug 접근 시 404 처리 확인 (`notFound()` 호출)
- [x] 모바일/태블릿/데스크톱 반응형 레이아웃 정상 작동 확인
- [x] `npm run build` 성공 확인

---

## Phase 2: 도시 탐색 페이지 (/cities) + 검색/필터

- [x] **완료**

### 오버뷰
Navbar의 "도시탐색" 링크를 클릭했을 때 이동할 도시 목록 페이지를 만든다. 모든 도시를 그리드로 표시하고, 검색, 태그 필터, 지역 필터, 정렬 기능을 구현한다. 데이터는 `constants/cities.ts`에서 가져오며, 필터링/정렬은 클라이언트 사이드로 처리한다.

### 수정/생성할 사항

- [x] **`app/cities/page.tsx` 생성** — 도시 목록 페이지
  - [x] 페이지 상단: 제목 + 설명 + 검색바
  - [x] 필터 영역: 지역 필터(수도권/강원/충청/전라/경상/제주), 태그 필터(도심/바다/자연/카페/맛집 등), 정렬 옵션(평점순/생활비순/인터넷속도순/리뷰많은순)
  - [x] 도시 그리드: 기존 `CityCard` 컴포넌트 재사용, 3열 그리드
  - [x] 결과 없을 때 "검색 결과가 없습니다" 빈 상태 UI
- [x] **필터 영역**: 지역 필터 + 태그 필터 + 정렬 드롭다운 UI (사이드바 레이아웃, 모바일 토글)
- [x] **`constants/cities.ts` 수정** — 각 도시에 `regionGroup` 필드 추가 (수도권/강원/충청/전라/경상/제주)
- [x] **`types/city.ts` 수정** — City 인터페이스에 `regionGroup` 필드 추가
- [x] **홈페이지 `SearchBar.tsx` 수정** — 검색바에서 검색 시 `/cities?q=검색어` 형태로 이동하도록 연결
- [x] **홈페이지 `TagFilter.tsx` 수정** — 태그 클릭 시 `/cities?tag=태그명`으로 이동하도록 연결
- [x] **홈페이지 `RegionalMap.tsx` 수정** — 지역 내 도시명 클릭 시 `/cities/[slug]`로, "전체보기" 버튼 클릭 시 `/cities?region=지역명`으로 이동

### 검증 항목

- [x] Navbar "도시탐색" 클릭 → `/cities` 페이지 정상 이동 확인
- [x] 검색바에 도시명 입력 → 실시간 필터링 작동 확인
- [x] 지역 필터 클릭 → 해당 지역 도시만 표시 확인
- [x] 태그 필터 클릭 → 해당 태그 도시만 표시 확인 (복수 태그 선택 가능)
- [x] 정렬 변경 → 도시 목록 순서 변경 확인
- [x] 홈페이지 검색바에서 검색 → `/cities?q=검색어`로 이동 후 결과 표시 확인
- [x] 홈페이지 태그 클릭 → `/cities?tag=태그명`으로 이동 후 필터 적용 확인
- [x] 필터 결과 없을 때 빈 상태 UI 표시 확인
- [x] 모바일 반응형 확인 (필터가 접힘/펼침 토글 가능)
- [x] `npm run build` 성공 확인

---

## Phase 3: 도시 비교 페이지 (/compare)

- [x] **완료**

### 오버뷰
2~3개 도시를 선택하여 생활비, 인터넷 속도, 코워킹, 날씨 등을 나란히 비교하는 페이지를 만든다. 도시 선택은 드롭다운 또는 검색으로 하며, 비교 항목은 테이블/카드 형태로 시각화한다. 홈페이지와 도시 상세 페이지에서 "비교하기" 진입점을 추가한다.

### 수정/생성할 사항

- [x] **`app/compare/page.tsx` 생성** — 도시 비교 페이지 (Client Component)
  - [x] 상단: 도시 선택 영역 (최대 3개 도시 선택 가능한 드롭다운/검색)
  - [x] 비교 테이블: 항목별(평점, 생활비, 인터넷속도, 코워킹 수, 리뷰 수, 태그, 장단점) 나란히 비교
  - [x] 도시 미선택 시 안내 UI ("비교할 도시를 선택해주세요")
  - [x] URL 쿼리 파라미터로 선택 도시 유지 (`/compare?cities=busan,jeju,seoul`)
  - [x] 숫자 항목에 최고값 하이라이트 표시
  - [x] 모바일용 카드형 비교 뷰 (테이블이 좁은 화면에서 불편하므로)
- [x] **`components/ui/CityCard.tsx` 수정** — "비교하기" 버튼 추가, 클릭 시 `/compare?cities=slug` 형태로 이동
- [x] **`app/cities/[slug]/page.tsx` 수정** — 도시 상세 페이지에 "다른 도시와 비교" 버튼 추가

### 검증 항목

- [x] Navbar "비교" 클릭 → `/compare` 페이지 정상 이동 확인
- [x] 도시 1개 선택 → 단일 도시 정보 표시, 추가 선택 유도 UI 확인
- [x] 도시 2~3개 선택 → 비교 테이블 정상 렌더링 확인
- [x] 이미 선택된 도시를 X 버튼으로 제거 가능 확인
- [x] URL 쿼리 파라미터 `/compare?cities=busan,jeju`로 직접 접근 시 해당 도시 비교 표시 확인
- [x] 도시 카드의 "비교하기" → 비교 페이지로 이동 후 해당 도시가 선택되어 있는지 확인
- [x] 모바일에서 카드형 비교 뷰로 전환되는지 확인
- [x] `npm run build` 성공 확인

---

## Phase 4: 리뷰 시스템 (작성 + 목록 + 상세)

- [x] **완료**

### 오버뷰
사용자가 도시에 대한 리뷰를 작성하고 볼 수 있는 시스템을 구현한다. DB 없이 가짜 데이터와 클라이언트 상태(React state)로 리뷰 CRUD를 시뮬레이션한다. 리뷰 목록 페이지, 리뷰 작성 폼, 홈페이지 "전체보기" 연결을 포함한다. 리뷰 작성은 로그인 상태에서만 가능하게 한다.

### 수정/생성할 사항

- [x] **`constants/reviews.ts` 수정** — 리뷰 데이터를 15개로 대폭 확장. 다양한 도시, 다양한 평점, 다양한 날짜 포함. 각 리뷰에 `id`, `citySlug`, `cityName`, `userNickname`, `rating`, `content`, `createdAt`, `tags` 필드 포함
- [x] **`types/review.ts` 수정** — Review 인터페이스에 위 필드 반영
- [x] **`app/reviews/page.tsx` 생성** — 리뷰 목록 페이지
  - [x] 전체 리뷰 목록 (최신순 기본 정렬)
  - [x] 도시별 필터, 평점 필터
  - [x] 리뷰 작성 버튼 (로그인 시에만 활성)
- [x] **`app/reviews/write/page.tsx` 생성** — 리뷰 작성 페이지 (Client Component, 로그인 필수)
  - [x] 도시 선택 드롭다운
  - [x] 별점 입력 (1~5, 별 클릭)
  - [x] 리뷰 내용 textarea
  - [x] 태그 선택 (복수 선택 가능: 인터넷빠름, 카페좋음, 조용함, 자연경관 등)
  - [x] 제출 시 alert로 "리뷰가 등록되었습니다" 표시 (실제 저장 없음)
- [x] **`components/review/ReviewForm.tsx` 생성** — 리뷰 작성 폼 (별점 선택, 내용 입력, 태그 선택)
- [x] **`components/review/StarRating.tsx` 생성** — 인터랙티브 별점 입력 컴포넌트 (hover 효과 포함)
- [x] **`components/home/LatestReviews.tsx` 수정** — "전체보기" 버튼에 `/reviews` 링크 연결
- [x] **`app/cities/[slug]/page.tsx` 수정** — 리뷰 탭에서 해당 도시 리뷰만 필터링하여 표시, "리뷰 작성하기" 버튼 추가
- [x] **`middleware.ts` 수정** — `/reviews/write`를 보호 라우트에 추가

### 검증 항목

- [x] 홈페이지 최신 리뷰 "전체보기" 클릭 → `/reviews` 페이지 이동 확인
- [x] 리뷰 목록 페이지에서 도시별/평점별 필터링 작동 확인
- [x] 비로그인 상태에서 리뷰 작성 → 로그인 페이지로 리다이렉트 확인 (middleware)
- [x] 별점 클릭으로 1~5점 선택 가능 확인
- [x] 리뷰 제출 시 성공 피드백(alert) 표시 확인
- [x] 도시 상세 페이지 리뷰 탭에서 해당 도시 리뷰만 표시 확인
- [x] 모바일 반응형 확인
- [x] `npm run build` 성공 확인

---

## Phase 5: 마이페이지 + 프로필

- [x] **완료**

### 오버뷰
로그인한 사용자의 개인 대시보드(마이페이지)와 프로필 수정 페이지를 만든다. 마이페이지에서는 내가 쓴 리뷰, 관심 도시(찜한 도시), 최근 본 도시를 확인할 수 있다. 프로필에서는 이름, 자기소개 등을 수정할 수 있다. 모든 데이터는 가짜 데이터이며, 수정 결과는 실제로 저장되지 않는다.

### 수정/생성할 사항

- [x] **`app/mypage/page.tsx` 생성** — 마이페이지 (Client Component, 로그인 필수)
  - [x] 유저 프로필 요약 카드 (이름, 이메일, 가입일)
  - [x] 탭 구성: 내 리뷰 | 관심 도시 | 최근 본 도시
  - [x] 내 리뷰 탭: 해당 사용자가 작성한 리뷰 목록 (가짜 데이터 3개)
  - [x] 관심 도시 탭: 찜한 도시 카드 목록 (가짜 데이터 3개)
  - [x] 최근 본 도시 탭: 최근 방문한 도시 목록 (가짜 데이터 4개)
  - [x] 프로필 수정 버튼 → `/profile`로 이동
- [x] **`app/profile/page.tsx` 생성** — 프로필 수정 페이지 (Client Component, 로그인 필수)
  - [x] 이름, 자기소개(bio), 선호 지역, 노마드 경력 입력 폼
  - [x] Supabase auth에서 현재 사용자 이름/이메일을 기본값으로 표시
  - [x] 저장 버튼 클릭 시 "저장되었습니다" alert 표시 (실제 저장 없음)
- [x] **`constants/mypage.ts` 생성** — 마이페이지용 가짜 데이터 (내 리뷰 3개, 관심 도시 slug 3개, 최근 본 도시 slug 4개)
- [x] **`components/layout/Navbar.tsx` 수정** — 로그인 상태에서 사용자 이름 클릭 시 드롭다운 메뉴(마이페이지, 프로필, 로그아웃) 표시. 현재 경로 활성(active) 스타일 추가.

### 검증 항목

- [x] 비로그인 상태에서 `/mypage` 접근 → `/login`으로 리다이렉트 확인 (middleware)
- [x] 로그인 상태에서 `/mypage` 접근 → 마이페이지 정상 표시 확인
- [x] 마이페이지 3개 탭(내 리뷰, 관심 도시, 최근 본 도시) 전환 확인
- [x] 프로필 수정 페이지에서 사용자 정보(이름, 이메일) 기본값 표시 확인
- [x] 프로필 저장 버튼 클릭 → 피드백 메시지 표시 확인
- [x] Navbar 사용자 드롭다운 메뉴 정상 작동 확인 (마이페이지/프로필/로그아웃)
- [x] Navbar 현재 페이지 활성 스타일 확인
- [x] 모바일 반응형 확인
- [x] `npm run build` 성공 확인

---

## Phase 6: 커뮤니티 페이지 (/community)

- [x] **완료**

### 오버뷰
노마드 사용자들이 소통할 수 있는 커뮤니티 게시판 페이지를 만든다. 카테고리별(자유, 질문, 정보공유, 모임) 게시글 목록, 게시글 상세, 글쓰기 폼을 구현한다. 모든 데이터는 가짜 데이터이며, 글 작성은 로그인 상태에서만 가능하다.

### 수정/생성할 사항

- [x] **`types/community.ts` 생성** — Post 인터페이스 정의: `id`, `title`, `content`, `category`(자유/질문/정보공유/모임), `authorName`, `authorEmail`, `createdAt`, `commentCount`, `likeCount`, `tags`. Comment 인터페이스 정의: `id`, `postId`, `authorName`, `content`, `createdAt`
- [x] **`constants/community.ts` 생성** — 게시글 더미 데이터 12개 (다양한 카테고리, 날짜, 작성자), 댓글 5개, helper 함수(getPostById, getCommentsByPostId)
- [x] **`app/community/page.tsx` 생성** — 커뮤니티 메인 페이지
  - [x] 카테고리 탭: 전체 | 자유 | 질문 | 정보공유 | 모임
  - [x] 게시글 목록: 제목, 작성자, 날짜, 댓글 수, 좋아요 수
  - [x] 검색바: 제목/내용 검색
  - [x] 글쓰기 버튼 (로그인 시에만 활성)
- [x] **`app/community/[id]/page.tsx` 생성** — 게시글 상세 페이지
  - [x] 제목, 작성자, 날짜, 내용
  - [x] 좋아요 버튼 (UI만, 클릭 시 카운트 토글)
  - [x] 댓글 영역: 가짜 댓글 표시 + 댓글 입력 폼 (UI만)
- [x] **`app/community/write/page.tsx` 생성** — 글쓰기 페이지 (Client Component, 로그인 필수)
  - [x] 카테고리 선택, 제목, 내용, 태그 입력
  - [x] 제출 시 alert로 "게시글이 등록되었습니다" 표시
- [x] **`middleware.ts` 수정** — `/community/write`를 보호 라우트에 추가

### 검증 항목

- [x] Navbar "커뮤니티" 클릭 → `/community` 페이지 이동 확인
- [x] 카테고리 탭 전환 시 해당 카테고리 게시글만 표시 확인
- [x] 검색 입력 시 제목/내용 필터링 작동 확인
- [x] 게시글 클릭 → `/community/[id]` 상세 페이지 이동 확인
- [x] 상세 페이지에서 좋아요 버튼 토글 확인
- [x] 비로그인 상태에서 글쓰기 → 로그인 페이지로 리다이렉트 확인 (middleware)
- [x] 글 제출 시 피드백 표시 확인
- [x] 모바일 반응형 확인
- [x] `npm run build` 성공 확인

---

## Phase 7: UX 개선 + 마무리 폴리싱

- [x] **완료**

### 오버뷰
전체 페이지에 로딩 상태, 에러 상태, 404 페이지, 이용약관/개인정보처리방침 등 빠진 페이지를 추가하고, 전반적인 UX를 개선한다. 페이지 전환 시 부드러운 경험과 일관된 에러 처리를 제공한다.

### 수정/생성할 사항

- [x] **`app/not-found.tsx` 생성** — 커스텀 404 페이지 (홈으로 돌아가기 + 도시 탐색하기 버튼 포함)
- [x] **`app/cities/[slug]/loading.tsx` 생성** — 도시 상세 페이지 로딩 스켈레톤 UI
- [x] **`app/cities/loading.tsx` 생성** — 도시 목록 페이지 로딩 스켈레톤 UI
- [x] **`app/reviews/loading.tsx` 생성** — 리뷰 목록 로딩 스켈레톤 UI
- [x] **`app/community/loading.tsx` 생성** — 커뮤니티 로딩 스켈레톤 UI
- [x] **`app/terms/page.tsx` 생성** — 이용약관 페이지 (더미 텍스트, 5개 조항)
- [x] **`app/privacy/page.tsx` 생성** — 개인정보처리방침 페이지 (더미 텍스트, 5개 항목)
- [x] **`app/forgot-password/page.tsx` 생성** — 비밀번호 찾기 페이지 (이메일 입력 → "재설정 링크가 발송되었습니다" 안내)
- [x] **`components/layout/Footer.tsx` 수정** — 모든 `href="#"` 링크를 실제 경로로 교체 (/terms, /privacy, /cities, /community, /reviews, /mypage, /profile, /login, /register, /forgot-password 등)
- [x] **`components/layout/Navbar.tsx` 수정** — 현재 경로에 해당하는 메뉴 항목 활성(active) 스타일 추가 (Phase 5에서 같이 구현)
- [x] **페이지 전환 최적화** — 주요 링크에 Next.js `<Link>` 사용

### 검증 항목

- [x] 존재하지 않는 URL 접근 → 커스텀 404 페이지 표시 확인
- [x] 각 주요 페이지 로딩 시 스켈레톤 UI 표시 확인
- [x] `/terms`, `/privacy` 페이지 접근 확인
- [x] `/forgot-password` 페이지 접근 후 이메일 입력 → 안내 메시지 표시 확인
- [x] 푸터의 모든 링크가 실제 페이지로 이동하는지 확인
- [x] Navbar에서 현재 페이지 메뉴 항목이 활성 스타일로 표시되는지 확인
- [x] 모든 페이지에서 모바일/태블릿/데스크톱 반응형 정상 작동 확인
- [x] `npm run build` 성공 확인 (20개 페이지 모두 컴파일)

---

## 최종 빌드 결과

```
Route (app)                                 Size  First Load JS
┌ ƒ /                                    7.76 kB         142 kB
├ ƒ /_not-found                            141 B         102 kB
├ ƒ /auth/callback                         141 B         102 kB
├ ƒ /cities                              3.93 kB         132 kB
├ ƒ /cities/[slug]                        7.7 kB         142 kB
├ ƒ /community                           5.73 kB         121 kB
├ ƒ /community/[id]                      5.53 kB         121 kB
├ ƒ /community/write                     2.65 kB         115 kB
├ ƒ /compare                             3.68 kB         132 kB
├ ƒ /forgot-password                     2.41 kB         118 kB
├ ƒ /login                                3.2 kB         119 kB
├ ƒ /mypage                              4.06 kB         193 kB
├ ƒ /privacy                               141 B         102 kB
├ ƒ /profile                             2.35 kB         168 kB
├ ƒ /register                            3.58 kB         119 kB
├ ƒ /register/confirm                      164 B         106 kB
├ ƒ /reviews                             4.19 kB         127 kB
├ ƒ /reviews/write                       2.08 kB         121 kB
└ ƒ /terms                                 141 B         102 kB
```

---

## 생성/수정된 전체 파일 목록

### 타입 정의 (4개)
- [x] `types/city.ts` — City, CoworkingSpace, Accommodation, WeatherInfo 인터페이스
- [x] `types/review.ts` — Review 인터페이스 (citySlug, tags 추가)
- [x] `types/index.ts` — 모든 타입 re-export
- [x] `types/community.ts` — Post, Comment 인터페이스 (신규)

### 상수 데이터 (5개)
- [x] `constants/cities.ts` — 13개 도시 상세 데이터, POPULAR_CITIES, getCityBySlug, getCitiesByRegion
- [x] `constants/reviews.ts` — 15개 리뷰, LATEST_REVIEWS, getReviewsByCitySlug
- [x] `constants/regions.ts` — 기존 유지
- [x] `constants/mypage.ts` — MY_REVIEWS, FAVORITE_CITY_SLUGS, RECENT_CITY_SLUGS (신규)
- [x] `constants/community.ts` — 12개 게시글, 5개 댓글, getPostById, getCommentsByPostId (신규)

### 페이지 (16개 신규)
- [x] `app/cities/page.tsx` — 도시 탐색 + 검색/필터/정렬
- [x] `app/cities/[slug]/page.tsx` — 도시 상세 (4개 탭)
- [x] `app/cities/loading.tsx` — 도시 목록 로딩 스켈레톤
- [x] `app/cities/[slug]/loading.tsx` — 도시 상세 로딩 스켈레톤
- [x] `app/compare/page.tsx` — 도시 비교 (최대 3개)
- [x] `app/reviews/page.tsx` — 리뷰 목록 + 필터
- [x] `app/reviews/write/page.tsx` — 리뷰 작성
- [x] `app/reviews/loading.tsx` — 리뷰 로딩 스켈레톤
- [x] `app/community/page.tsx` — 커뮤니티 메인 (카테고리 탭)
- [x] `app/community/[id]/page.tsx` — 게시글 상세 + 댓글
- [x] `app/community/write/page.tsx` — 글쓰기
- [x] `app/community/loading.tsx` — 커뮤니티 로딩 스켈레톤
- [x] `app/mypage/page.tsx` — 마이페이지 (3개 탭)
- [x] `app/profile/page.tsx` — 프로필 수정
- [x] `app/terms/page.tsx` — 이용약관
- [x] `app/privacy/page.tsx` — 개인정보처리방침
- [x] `app/forgot-password/page.tsx` — 비밀번호 찾기
- [x] `app/not-found.tsx` — 커스텀 404 페이지

### 컴포넌트 (7개 신규)
- [x] `components/city/CityHero.tsx` — 도시 상세 히어로 섹션
- [x] `components/city/CityOverview.tsx` — 개요 탭 (소개, 장단점, 교통, 팁, 날씨)
- [x] `components/city/CoworkingList.tsx` — 코워킹 스페이스 카드 목록
- [x] `components/city/CityReviews.tsx` — 도시별 리뷰 목록 + 작성 버튼
- [x] `components/city/AccommodationInfo.tsx` — 숙소 가격대 + 월 생활비 breakdown
- [x] `components/review/StarRating.tsx` — 인터랙티브 별점 (hover 효과)
- [x] `components/review/ReviewForm.tsx` — 리뷰 작성 폼 (도시 선택, 별점, 내용, 태그)

### 컴포넌트 수정 (6개)
- [x] `components/ui/CityCard.tsx` — `/cities/${slug}` 링크 + 비교하기 버튼 추가
- [x] `components/ui/SearchBar.tsx` — 검색 시 `/cities?q=` 라우팅
- [x] `components/ui/TagFilter.tsx` — 태그 클릭 시 `/cities?tag=` 라우팅
- [x] `components/home/RegionalMap.tsx` — 도시명 → `/cities/[slug]` 링크, 전체보기 → `/cities?region=` 링크
- [x] `components/home/LatestReviews.tsx` — 전체보기 → `/reviews` 링크
- [x] `components/layout/Navbar.tsx` — 사용자 드롭다운 메뉴(마이페이지/프로필/로그아웃), 현재 경로 활성 스타일, usePathname 추가
- [x] `components/layout/Footer.tsx` — 모든 `href="#"` → 실제 경로로 교체, Link 컴포넌트 사용

### 기타
- [x] `middleware.ts` — 보호 라우트에 `/reviews/write`, `/community/write` 추가
