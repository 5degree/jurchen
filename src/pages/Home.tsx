import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import Layout from '../components/layout/Layout';
import HeroSlider from '../components/ui/HeroSlider';
import ProductCard from '../components/ui/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import SplitOverlaySection from '../components/ui/SplitOverlaySection';
import aboutBg from './../assets/about-bg.jpg';
import missionVisionBg from './../assets/mission-vision-bg.jpg';
import projectBg from './../assets/project-bg.png';

const Home = () => {
  const { 
    heroSliders, 
    featuredProducts, 
    loadHeroSliders, 
    loadFeaturedProducts,
    isHeroSlidersLoading,
    isFeaturedProductsLoading,
    heroSlidersError,
    featuredProductsError 
  } = useAppStore();

  useEffect(() => {
    loadHeroSliders();
    loadFeaturedProducts();
  }, [loadHeroSliders, loadFeaturedProducts]);

  return (
    <Layout>
      {/* Hero Slider Section - Full Width */}
      <section className="w-full">
        {isHeroSlidersLoading ? (
          <div className="h-[500px] flex items-center justify-center bg-gray-100">
            <LoadingSpinner size="large" />
          </div>
        ) : heroSlidersError ? (
          <div className="h-[500px] flex flex-col items-center justify-center bg-gray-100">
            <p className="text-red-500 mb-2">{heroSlidersError}</p>
            <button 
              onClick={() => loadHeroSliders()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <HeroSlider sliders={heroSliders} />
        )}
      </section>

      {/* Featured Products Section */}
      <section className="w-full py-16 bg-gray-50">
        <div className="max-w-[1100px] mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          
          {isFeaturedProductsLoading ? (
            <div className="h-64 flex items-center justify-center">
              <LoadingSpinner size="large" />
            </div>
          ) : featuredProductsError ? (
            <div className="h-64 flex flex-col items-center justify-center">
              <p className="text-red-500 mb-2">{featuredProductsError}</p>
              <button 
                onClick={() => loadFeaturedProducts()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : featuredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No featured products available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link 
              to="/products" 
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* Split overlay promotional section */}
      <SplitOverlaySection
        left={{
          imageUrl: aboutBg,
          title: 'Company',
          subtitle: 'About us',
          buttonHref: '/about',
          ariaLabel: 'Read more about the company',
        }}
        right={{
          imageUrl: missionVisionBg,
          title: 'Values & Visions',
          subtitle: 'Mission Statement',
          buttonHref: 'https://www.jurchen-technology.com/company/jurchen-technology/values-and-visions/',
          ariaLabel: 'Read more about our values and visions',
        }}
      />
      
      <SplitOverlaySection
        left={{
          imageUrl: projectBg,
          title: 'Projects',
          subtitle: 'A selection of realized projects',
          buttonHref: 'https://www.jurchen-technology.com/peg-solar-mounting/',
          ariaLabel: 'Read more about the company',
        }}
      />

      {/* CTA Section */}
      <section className="w-full py-20 bg-blue-700 text-white">
        <div className="max-w-[1100px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore Solar Solutions?</h2>
          <p className="max-w-2xl mx-auto mb-10 text-lg">
            Discover our wide range of high-quality solar products designed to meet your energy needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/categories" 
              className="px-6 py-3 bg-white text-blue-700 rounded-md hover:bg-gray-100 transition"
            >
              Browse Categories
            </Link>
            <Link 
              to="/contact" 
              className="px-6 py-3 border-2 border-white text-white rounded-md hover:bg-blue-800 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home; 