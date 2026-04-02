import type { Product } from '../../types/catalog';
import { formatCurrency, getLowestPrice, getCompareAtPrice, getCoverImage } from '../../lib/product-helpers';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
  className?: string;
}

export default function ProductCard({ product, featured = false, className = '' }: ProductCardProps) {
  const cover = getCoverImage(product);
  const price = getLowestPrice(product);
  const compareAt = getCompareAtPrice(product);
  const firstTag = product.tags[0];

  return (
    <div className={`group cursor-pointer ${className}`}>
      <div
        className={`relative overflow-hidden rounded-xl bg-surface-container-high transition-transform duration-700 ease-out hover:scale-[1.01] ${
          featured ? 'h-[500px] md:h-[600px]' : 'h-[380px] md:h-[440px]'
        }`}
      >
        {cover ? (
          <img
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            src={cover.url}
            alt={cover.altText}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-container">
            <span className="material-symbols-outlined text-[48px] text-outline-variant">
              image
            </span>
          </div>
        )}

        {/* Tag pill */}
        {firstTag && (
          <span className="absolute top-5 left-5 text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full bg-surface/80 backdrop-blur-sm text-on-surface">
            {firstTag.name}
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </div>

      {/* Info below image */}
      <div className="mt-4 px-1">
        <p className="font-headline text-xl text-on-surface">{product.name}</p>
        <p className="text-on-surface-variant text-sm tracking-wide mt-1 line-clamp-1">
          {product.shortDescription}
        </p>
        <div className="flex items-baseline gap-2 mt-2">
          {price !== null && (
            <span className="text-sm font-medium text-on-surface">
              {compareAt ? 'A partir de ' : ''}{formatCurrency(price)}
            </span>
          )}
          {compareAt && (
            <span className="text-xs text-on-surface-variant line-through">
              {formatCurrency(compareAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
