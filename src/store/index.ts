import { create } from 'zustand';
import type { Category, SubCategory, HeroSlider, Product } from '../types';
import {
  fetchCategories,
  fetchSubCategoriesByCategory,
  fetchHeroSliders,
  fetchFeaturedProducts,
  fetchProducts,
  fetchProductById,
  fetchProductsByCategory,
  fetchProductsBySubCategory
} from '../services/firebase';

interface AppState {
  // Data
  categories: Category[];
  subCategories: SubCategory[];
  heroSliders: HeroSlider[];
  featuredProducts: Product[];
  products: Product[];
  currentProduct: Product | null;
  
  // Loading states
  isCategoriesLoading: boolean;
  isSubCategoriesLoading: boolean;
  isHeroSlidersLoading: boolean;
  isFeaturedProductsLoading: boolean;
  isProductsLoading: boolean;
  isCurrentProductLoading: boolean;
  
  // Error states
  categoriesError: string | null;
  subCategoriesError: string | null;
  heroSlidersError: string | null;
  featuredProductsError: string | null;
  productsError: string | null;
  currentProductError: string | null;
  
  // Actions
  loadCategories: () => Promise<void>;
  loadSubCategories: (categoryName: string) => Promise<void>;
  loadHeroSliders: () => Promise<void>;
  loadFeaturedProducts: () => Promise<void>;
  loadProducts: () => Promise<void>;
  loadProductById: (productId: string) => Promise<void>;
  loadProductsByCategory: (categoryName: string) => Promise<void>;
  loadProductsBySubCategory: (subCategoryName: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial data
  categories: [],
  subCategories: [],
  heroSliders: [],
  featuredProducts: [],
  products: [],
  currentProduct: null,
  
  // Initial loading states
  isCategoriesLoading: false,
  isSubCategoriesLoading: false,
  isHeroSlidersLoading: false,
  isFeaturedProductsLoading: false,
  isProductsLoading: false,
  isCurrentProductLoading: false,
  
  // Initial error states
  categoriesError: null,
  subCategoriesError: null,
  heroSlidersError: null,
  featuredProductsError: null,
  productsError: null,
  currentProductError: null,
  
  // Actions
  loadCategories: async () => {
    set({ isCategoriesLoading: true, categoriesError: null });
    try {
      const categories = await fetchCategories();
      set({ categories, isCategoriesLoading: false });
    } catch (error) {
      set({ 
        categoriesError: error instanceof Error ? error.message : 'Failed to load categories', 
        isCategoriesLoading: false 
      });
    }
  },
  
  loadSubCategories: async (categoryName: string) => {
    set({ isSubCategoriesLoading: true, subCategoriesError: null });
    try {
      const subCategories = await fetchSubCategoriesByCategory(categoryName);
      console.log(subCategories);
      set({ subCategories, isSubCategoriesLoading: false });
    } catch (error) {
      set({ 
        subCategoriesError: error instanceof Error ? error.message : 'Failed to load sub-categories', 
        isSubCategoriesLoading: false 
      });
    }
  },
  
  loadHeroSliders: async () => {
    set({ isHeroSlidersLoading: true, heroSlidersError: null });
    try {
      const heroSliders = await fetchHeroSliders();
      set({ heroSliders, isHeroSlidersLoading: false });
    } catch (error) {
      set({ 
        heroSlidersError: error instanceof Error ? error.message : 'Failed to load hero sliders', 
        isHeroSlidersLoading: false 
      });
    }
  },
  
  loadFeaturedProducts: async () => {
    set({ isFeaturedProductsLoading: true, featuredProductsError: null });
    try {
      const featuredProducts = await fetchFeaturedProducts();
      set({ featuredProducts, isFeaturedProductsLoading: false });
    } catch (error) {
      set({ 
        featuredProductsError: error instanceof Error ? error.message : 'Failed to load featured products', 
        isFeaturedProductsLoading: false 
      });
    }
  },
  
  loadProducts: async () => {
    set({ isProductsLoading: true, productsError: null });
    try {
      const products = await fetchProducts();
      set({ products, isProductsLoading: false });
    } catch (error) {
      set({ 
        productsError: error instanceof Error ? error.message : 'Failed to load products', 
        isProductsLoading: false 
      });
    }
  },
  
  loadProductById: async (productId: string) => {
    set({ isCurrentProductLoading: true, currentProductError: null });
    try {
      const product = await fetchProductById(productId);
      set({ currentProduct: product, isCurrentProductLoading: false });
    } catch (error) {
      set({ 
        currentProductError: error instanceof Error ? error.message : 'Failed to load product', 
        isCurrentProductLoading: false 
      });
    }
  },
  
  loadProductsByCategory: async (categoryName: string) => {
    set({ isProductsLoading: true, productsError: null });
    try {
      const products = await fetchProductsByCategory(categoryName);
      set({ products, isProductsLoading: false });
    } catch (error) {
      set({ 
        productsError: error instanceof Error ? error.message : 'Failed to load products by category', 
        isProductsLoading: false 
      });
    }
  },
  
  loadProductsBySubCategory: async (subCategoryName: string) => {
    set({ isProductsLoading: true, productsError: null });
    try {
      const products = await fetchProductsBySubCategory(subCategoryName);
      set({ products, isProductsLoading: false });
    } catch (error) {
      set({ 
        productsError: error instanceof Error ? error.message : 'Failed to load products by sub-category', 
        isProductsLoading: false 
      });
    }
  }
})); 