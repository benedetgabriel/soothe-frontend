export interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  description: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  brand: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  variants: ProductVariant[];
  images: ProductImage[];
  categories: Category[];
  tags: Tag[];
}

export interface ProductVariant {
  id: number;
  productId: number;
  sku: string;
  name: string;
  price: number;
  compareAtPrice: number | null;
  costPrice: number;
  stockQuantity: number;
  weight: number;
  width: number;
  height: number;
  depth: number;
  isActive: boolean;
}

export interface ProductImage {
  id: number;
  productId: number;
  variantId: number | null;
  url: string;
  altText: string;
  sortOrder: number;
  isCover: boolean;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}
