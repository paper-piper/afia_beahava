import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { GallerySection } from "@/components/gallery-section"
import { OrderSection } from "@/components/order-section"
import { AboutSection } from "@/components/about-section"
import { ReviewsSection } from "@/components/reviews-section"
import { DeliverySection } from "@/components/delivery-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <GallerySection />
      <OrderSection />
      <AboutSection />
      <ReviewsSection />
      <DeliverySection />
      <Footer />
    </main>
  )
}
