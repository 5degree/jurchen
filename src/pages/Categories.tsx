import { useEffect } from 'react';
import { useAppStore } from '../store';
import Layout from '../components/layout/Layout';
import CategoryCard from '../components/ui/CategoryCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Categories = () => {
  const { 
    categories, 
    loadCategories,
    isCategoriesLoading,
    categoriesError
  } = useAppStore();

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <Layout>
      <div className="w-full bg-gray-50 py-12">
        <div className="max-w-[1100px] mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Product Categories</h1>

          {isCategoriesLoading ? (
            <div className="h-64 flex items-center justify-center">
              <LoadingSpinner size="large" />
            </div>
          ) : categoriesError ? (
            <div className="h-64 flex flex-col items-center justify-center">
              <p className="text-red-500 mb-2">{categoriesError}</p>
              <button 
                onClick={() => loadCategories()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : categories.length === 0 ? (
            <p className="text-center text-gray-500">No categories available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {categories.map((category) => (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                  onExpandCategory={() => Promise.resolve([])}
                  isLoading={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categories; 