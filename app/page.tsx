import { HeroSection } from '@/components/home/HeroSection';
import { StatsBanner } from '@/components/home/StatsBanner';
import { PopularCities } from '@/components/home/PopularCities';
import { RegionalMap } from '@/components/home/RegionalMap';
import { CategoryRankings } from '@/components/home/CategoryRankings';
import { LatestReviews } from '@/components/home/LatestReviews';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBanner />
      <PopularCities />
      <RegionalMap />
      <CategoryRankings />
      <LatestReviews />
    </>
  );
}
