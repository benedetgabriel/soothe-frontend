export interface GallerySlot {
  productId: number | null;
  imageUrl: string;
  imageAlt: string;
  label: string;
  title: string;
}

export interface HomePageConfig {
  headerTitle: string;
  headerSubtitle: string;
  gallery: [GallerySlot, GallerySlot, GallerySlot, GallerySlot, GallerySlot, GallerySlot];
  showcaseTitle: string;
  showcaseSubtitle: string;
  showcaseProductIds: number[];
  quoteText: string;
  ctaHeading: string;
  ctaButton1Label: string;
  ctaButton2Label: string;
}
