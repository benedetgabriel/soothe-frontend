import { Button } from '../ui';
import ProductShowcase from './ProductShowcase';
import type { HomePageConfig } from '../../types/home-config';

interface HomeContentProps {
  config: HomePageConfig;
}

export default function HomeContent({ config }: HomeContentProps) {
  const g = config.gallery;

  return (
    <>
      {/* Header */}
      <header className="mb-16 md:mb-24 text-center">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-on-background leading-tight mb-6">
          {config.headerTitle}
        </h1>
        <p className="max-w-2xl mx-auto text-on-surface-variant text-lg md:text-xl font-light tracking-wide leading-relaxed">
          {config.headerSubtitle}
        </p>
      </header>

      {/* Asymmetric Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Large Focus Piece — Slot 0 */}
        <div className="md:col-span-8 group cursor-pointer">
          <div className="relative overflow-hidden rounded-xl bg-surface-container-high h-[500px] md:h-[700px] transition-transform duration-700 ease-out hover:scale-[1.01]">
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              src={g[0].imageUrl}
              alt={g[0].imageAlt}
            />
            {(g[0].label || g[0].title) && (
              <div className="absolute bottom-10 left-10 text-on-surface">
                {g[0].label && (
                  <span className="text-xs uppercase tracking-widest font-semibold mb-2 block opacity-60">
                    {g[0].label}
                  </span>
                )}
                {g[0].title && (
                  <h3 className="font-headline text-3xl md:text-4xl italic">{g[0].title}</h3>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tall Secondary Column — Slots 1 & 2 */}
        <div className="md:col-span-4 flex flex-col gap-8 lg:gap-12">
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl bg-surface-container-highest h-[400px] transition-transform duration-700 ease-out hover:scale-[1.01]">
              <img
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                src={g[1].imageUrl}
                alt={g[1].imageAlt}
              />
            </div>
            {(g[1].label || g[1].title) && (
              <div className="mt-4 px-2">
                {g[1].title && <p className="font-headline text-xl">{g[1].title}</p>}
                {g[1].label && (
                  <p className="text-on-surface-variant text-sm tracking-wide">{g[1].label}</p>
                )}
              </div>
            )}
          </div>
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl bg-surface-container h-[260px] transition-transform duration-700 ease-out hover:scale-[1.01]">
              <img
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                src={g[2].imageUrl}
                alt={g[2].imageAlt}
              />
            </div>
          </div>
        </div>

        {/* Third Row — Slots 3 & 4 */}
        <div className="md:col-span-4 group cursor-pointer">
          <div className="relative overflow-hidden rounded-xl bg-surface-container-low h-[500px] transition-transform duration-700 ease-out hover:scale-[1.01]">
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              src={g[3].imageUrl}
              alt={g[3].imageAlt}
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
        <div className="md:col-span-8 group cursor-pointer">
          <div className="relative overflow-hidden rounded-xl bg-surface-container-high h-[500px] transition-transform duration-700 ease-out hover:scale-[1.01]">
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              src={g[4].imageUrl}
              alt={g[4].imageAlt}
            />
            {(g[4].label || g[4].title) && (
              <div className="absolute top-10 right-10 text-right">
                {g[4].label && (
                  <span className="text-xs uppercase tracking-widest font-semibold mb-2 block opacity-60">
                    {g[4].label}
                  </span>
                )}
                {g[4].title && <h3 className="font-headline text-3xl">{g[4].title}</h3>}
              </div>
            )}
          </div>
        </div>

        {/* Floating Quote Block */}
        <div className="md:col-span-5 md:col-start-2 py-12 md:py-24">
          <p className="font-headline text-4xl lg:text-5xl leading-tight text-on-surface italic">
            "{config.quoteText}"
          </p>
          <div className="w-20 h-px bg-primary mt-8" />
        </div>

        {/* Final Gallery Piece — Slot 5 */}
        <div className="md:col-span-6 group cursor-pointer md:mt-12">
          <div className="relative overflow-hidden rounded-xl bg-surface-container h-[400px] transition-transform duration-700 ease-out hover:scale-[1.01]">
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              src={g[5].imageUrl}
              alt={g[5].imageAlt}
            />
          </div>
        </div>
      </div>

      {/* Product Showcase */}
      <ProductShowcase
        productIds={config.showcaseProductIds}
        title={config.showcaseTitle}
        subtitle={config.showcaseSubtitle}
      />

      {/* CTA Section */}
      <section className="mt-32 text-center">
        <h2 className="font-headline text-4xl mb-10">{config.ctaHeading}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" size="lg">{config.ctaButton1Label}</Button>
          <Button variant="secondary" size="lg">{config.ctaButton2Label}</Button>
        </div>
      </section>
    </>
  );
}
