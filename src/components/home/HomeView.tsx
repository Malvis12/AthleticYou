import React from 'react';
import { HeroSection } from './HeroSection';
import { MarqueeTicker } from '../common/MarqueeTicker';
import { BentoGrid } from './BentoGrid';
import { ProductGrid } from './ProductGrid';
import { BrandStory } from './BrandStory';

export const HomeView: React.FC = () => {
  return (
    <main className="w-full">
      <HeroSection />
      <MarqueeTicker />
      <BentoGrid />
      <ProductGrid />
      <BrandStory />
    </main>
  );
};
