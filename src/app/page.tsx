import { HeroSection } from "@/components/home/hero-section";
import { LatestArticles } from "@/components/home/latest-articles";

export default function Home() {
  return (
    <div className="container-anthropic">
      <HeroSection />
      <LatestArticles />
    </div>
  );
}
