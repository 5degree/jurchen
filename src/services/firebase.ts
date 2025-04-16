import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, doc, query, where, limit } from 'firebase/firestore';
import type { Category, SubCategory, HeroSlider, Product } from '../types';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection references
const categoriesRef = collection(db, 'category');
const subCategoriesRef = collection(db, 'subCategory');
const heroSlidersRef = collection(db, 'hero_slider');
const productsRef = collection(db, 'products');

// Fetch all categories
export const fetchCategories = async (): Promise<Category[]> => {
  const snapshot = await getDocs(categoriesRef);
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Category);
};

// Fetch sub-categories by category name
export const fetchSubCategoriesByCategory = async (categoryName: string): Promise<SubCategory[]> => {
  const q = query(subCategoriesRef, where('categoryName', '==', categoryName));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as SubCategory);
};

// Fetch all hero sliders
export const fetchHeroSliders = async (): Promise<HeroSlider[]> => {
  const snapshot = await getDocs(heroSlidersRef);
  return snapshot.docs.map(doc => ({ ...doc.data() }) as HeroSlider);
};

// Fetch featured products
export const fetchFeaturedProducts = async (limitCount = 8): Promise<Product[]> => {
  const q = query(productsRef, where('isFeatured', '==', true), limit(limitCount));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Product);
};

// Fetch all products with pagination
export const fetchProducts = async (): Promise<Product[]> => {
  // For now, we'll just fetch all products since we don't have startAfter implemented
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Product);
};

// Fetch product by ID
export const fetchProductById = async (productId: string): Promise<Product | null> => {
  const productDoc = doc(db, 'products', productId);
  const productSnapshot = await getDoc(productDoc);
  
  if (productSnapshot.exists()) {
    return { ...productSnapshot.data(), id: productSnapshot.id } as Product;
  }
  
  return null;
};

// Fetch products by category
export const fetchProductsByCategory = async (categoryName: string): Promise<Product[]> => {
  const q = query(productsRef, where('category', '==', categoryName));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Product);
};

// Fetch products by subcategory
export const fetchProductsBySubCategory = async (subCategoryName: string): Promise<Product[]> => {
  const q = query(productsRef, where('subCategory', '==', subCategoryName));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Product);
}; 