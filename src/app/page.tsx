import { HeroSection } from "@/components/home/hero-section";
import { ExploreSection } from "@/components/home/explore-section";
import { FeaturedWorkSection } from "@/components/home/featured-work-section";
import { LatestArticles } from "@/components/home/latest-articles";

export default function Home() {
  return (
    <div className="container-anthropic">
      <HeroSection />
      <ExploreSection />
      <FeaturedWorkSection />
      <LatestArticles />
    </div>
  );
}
