import { notFound } from "next/navigation";
import { packageDetails } from "@/src/data/packageDetails";
import PackageHero from "@/src/components/package-details/PackageHero";
import ImageGallery from "@/src/components/package-details/ImageGallery";
import Overview from "@/src/components/package-details/Overview";
import TourInfoGrid from "@/src/components/package-details/TourInfoGrid";
import IncludedExcluded from "@/src/components/package-details/IncludedExcluded";
import Itinerary from "@/src/components/package-details/Itinerary";
import MapSection from "@/src/components/package-details/MapSection";
import Reviews from "@/src/components/package-details/Reviews";
import RelatedPackages from "@/src/components/package-details/RelatedPackages";
import FAQSection from "@/src/components/package-details/FAQSection";
import BookingCTA from "@/src/components/package-details/BookingCTA";

interface PackagePageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return packageDetails.map((pkg) => ({ id: pkg.id }));
}

export default async function PackagePage({ params }: PackagePageProps) {
  const { id } = await params;
  const pkg = packageDetails.find((p) => p.id === id);
  if (!pkg) notFound();

  return (
    <main>
      <PackageHero pkg={pkg} />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ImageGallery images={[pkg.coverImage, ...pkg.galleryImages]} title={pkg.title} />
        <Overview description={pkg.description} />
        <TourInfoGrid pkg={pkg} />
        <IncludedExcluded included={pkg.included} excluded={pkg.excluded} />
        <Itinerary itinerary={pkg.itinerary} />
        <MapSection location={pkg.location} country={pkg.country} />
        <Reviews rating={pkg.rating} reviewCount={pkg.reviewCount} reviews={pkg.reviews} />
      </div>
      <RelatedPackages currentId={pkg.id} category={pkg.category} />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <FAQSection faqs={pkg.faqs} />
      </div>
      <BookingCTA title={pkg.title} price={pkg.price} currency={pkg.currency} />
    </main>
  )}