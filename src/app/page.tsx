
import BlogHighlights from "../components/home/BlogHighlights";
import CTABanner from "../components/home/CTABanner";
import Hero from "../components/home/Hero";
import Newsletter from "../components/home/Newsletter";
import PopularDestinations from "../components/home/PopularDestinations";
import StatsSection from "../components/home/StatsSection";
import Testimonials from "../components/home/Testimonials";
import TourCategories from "../components/home/TourCategories";
import WhyChooseTravelGo from "../components/home/WhyChooseTravelGo";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PopularDestinations />
      <WhyChooseTravelGo />
      <TourCategories />
      <StatsSection />
      <Testimonials />
      <BlogHighlights />
      <Newsletter />
      <CTABanner />
    </main>
  );
}
