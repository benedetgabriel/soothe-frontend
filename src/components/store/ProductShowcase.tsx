import { mockProducts } from '../../mocks/catalog';
import { getActiveProducts } from '../../lib/product-helpers';
import ProductCard from './ProductCard';

interface ProductShowcaseProps {
  productIds?: number[];
  title?: string;
  subtitle?: string;
}

export default function ProductShowcase({
  productIds,
  title = 'Peças Selecionadas',
  subtitle = 'Cada peça é escolhida pelo toque, pela fibra e pela intenção de transformar o cotidiano em ritual.',
}: ProductShowcaseProps) {
  const products = productIds
    ? productIds
        .map((id) => mockProducts.find((p) => p.id === id))
        .filter((p): p is (typeof mockProducts)[number] => p != null && p.isActive)
    : getActiveProducts(mockProducts);

  return (
    <section className="mt-32">
      {/* Section header */}
      <div className="mb-12 md:mb-16">
        <h2 className="font-headline text-4xl lg:text-5xl text-on-surface mb-4">
          {title}
        </h2>
        <p className="text-on-surface-variant text-lg font-light tracking-wide max-w-xl">
          {subtitle}
        </p>
      </div>

      {/* Asymmetric product grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
        {/* Featured — first product */}
        {products[0] && (
          <div className="md:col-span-7">
            <ProductCard product={products[0]} featured />
          </div>
        )}

        {/* Second product */}
        {products[1] && (
          <div className="md:col-span-5">
            <ProductCard product={products[1]} featured />
          </div>
        )}

        {/* Remaining products — 3 columns */}
        {products.slice(2).map((product) => (
          <div key={product.id} className="md:col-span-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
