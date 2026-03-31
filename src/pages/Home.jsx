import Hero from '../components/home/Hero';
import CategoryShowcase from '../components/home/CategoryShowcase';
import LatestDesigns from '../components/home/LatestDesigns';
import FeaturedSection from '../components/home/FeaturedSection';
import AboutSection from '../components/home/AboutSection';
import ContactSection from '../components/home/ContactSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <CategoryShowcase />
      <LatestDesigns />
      <FeaturedSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
