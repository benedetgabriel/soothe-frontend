import HeroSection from '../components/home/HeroSection';
import CategoryBento from '../components/home/CategoryBento';
import ProductGrid from '../components/home/ProductGrid';
import Testimonial from '../components/home/Testimonial';
import Newsletter from '../components/home/Newsletter';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoryBento />
      <ProductGrid />
      <Testimonial />
      <Newsletter />
    </>
  );
}
