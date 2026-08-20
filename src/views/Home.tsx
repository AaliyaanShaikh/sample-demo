"use client";

import Hero from "../components/sections/Hero";
import JewelryEditorial from "../components/sections/JewelryEditorial";
import AppleInspiredScroll from "../components/sections/AppleInspiredScroll";
import FeaturedCollections from "../components/sections/FeaturedCollections";
import ProductShowcase from "../components/sections/ProductShowcase";
import FullCollection from "../components/sections/FullCollection";
import CollectionScroller from "../components/sections/CollectionScroller";
import AtelierStory from "../components/sections/AtelierStory";
import CraftPillars from "../components/sections/CraftPillars";
import VisitAtelier from "../components/sections/VisitAtelier";
import Testimonials from "../components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <JewelryEditorial />
      <AppleInspiredScroll />
      <FeaturedCollections />
      <ProductShowcase />
      <FullCollection />
      <CollectionScroller />
      <AtelierStory />
      <CraftPillars />
      <Testimonials />
      <VisitAtelier />
    </>
  );
}
