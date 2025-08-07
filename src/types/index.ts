export interface Category {
  ext?: string;
  id: string;
  image: string;
  name: string;
}

export interface SubCategory {
  category: string | null;
  categoryName: string;
  ext?: string;
  id: string;
  image: string;
  name: string;
}

export interface HeroSlider {
  image: string;
  title: string;
  to: string;
  url: string;
}

export interface Product {
  category?: string;
  description?: string;
  gst?: number;
  hsnCode?: number;
  id: string;
  isFeatured?: boolean;
  material?: string;
  mrp?: number;
  name: string;
  product_gallery?: string[];
  product_image?: string;
  sale_price?: number;
  serialNumber?: number;
  specifications?: string;
  subCategory?: string;
  subsubCategory?: string;
  termsAndConditions?: string;
  product_model?: string;
  videoUrl?: string;
} 