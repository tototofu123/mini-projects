import { Hero } from "@/components/sections/Hero";
import { ComparisonSlider } from "@/components/sections/ComparisonSlider";
import { FlavorLab } from "@/components/sections/FlavorLab";
import { BiomeSchematic } from "@/components/sections/BiomeSchematic";
import { GutCheck } from "@/components/sections/GutCheck";
import { SocialProof } from "@/components/sections/SocialProof";
import { Footer } from "@/components/sections/Footer";

import { DynamicCarbonation } from "@/components/sections/DynamicCarbonation";

export default function Home() {
  return (
    <main className="relative w-full">
      <DynamicCarbonation />
      <div id="hero">
        <Hero />
      </div>
      <div id="os-update">
        <ComparisonSlider />
      </div>
      <div id="flavor-lab">
        <FlavorLab />
      </div>
      <div id="biome-dash">
        <BiomeSchematic />
      </div>
      <div id="network">
        <SocialProof />
      </div>
      <div id="detox-swipe">
        <GutCheck />
      </div>
      <Footer />
    </main>
  );
}
