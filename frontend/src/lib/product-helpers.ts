import type { Product, ProductImage } from '../types/catalog';

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function getLowestPrice(product: Product): number | null {
  const prices = product.variants.filter((v) => v.isActive).map((v) => v.price);
  return prices.length > 0 ? Math.min(...prices) : null;
}

export function getCompareAtPrice(product: Product): number | null {
  const variant = product.variants.find((v) => v.isActive && v.compareAtPrice !== null);
  return variant?.compareAtPrice ?? null;
}

export function getCoverImage(product: Product): ProductImage | undefined {
  return product.images.find((img) => img.isCover);
}

export function getActiveProducts(products: Product[]): Product[] {
  return products.filter((p) => p.isActive);
}
