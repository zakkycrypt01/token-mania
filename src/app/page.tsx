import Header from "@/components/layout/header";
import HeroSection from "@/components/sections/hero";
import PresaleSection from "@/components/sections/presale";
import AboutSection from "@/components/sections/about";
import TokenomicsSection from "@/components/sections/tokenomics";
import RoadmapSection from "@/components/sections/roadmap";
import GamificationSection from "@/components/sections/gamification";
import CommunitySection from "@/components/sections/community";
import FaqSection from "@/components/sections/faq";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PresaleSection />
        <AboutSection />
        <TokenomicsSection />
        <RoadmapSection />
        <GamificationSection />
        <CommunitySection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
