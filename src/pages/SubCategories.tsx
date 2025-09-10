import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import Layout from '../components/layout/Layout';
import SubCategoryCard from '../components/ui/SubCategoryCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const SubCategories = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryParam = searchParams.get('category');
  
  const { 
    subCategories, 
    loadSubCategories,
    isSubCategoriesLoading,
    subCategoriesError
  } = useAppStore();

  useEffect(() => {
    if (categoryParam) {
      loadSubCategories(categoryParam);
    } else {
      // If no category parameter, redirect to categories page
      navigate('/categories');
    }
  }, [categoryParam, loadSubCategories, navigate]);

  const handleSubCategoryClick = (subCategoryName: string) => {
    navigate(`/products?subCategory=${subCategoryName}`);
  };

  const handleBackClick = () => {
    navigate('/categories');
  };

  return (
    <Layout>
      <div className="w-full bg-gray-50 py-12">
        <div className="max-w-[1100px] mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <p
              onClick={handleBackClick}
              className="text-blue-600 hover:text-blue-800 font-medium mb-2 cursor-pointer"
            >
              ← Back to Categories
            </p>
            <h1 className="text-3xl font-bold mt-10">
              {categoryParam ? `${categoryParam} - Sub Categories` : 'Sub Categories'}
            </h1>
          </div>

          {isSubCategoriesLoading ? (
            <div className="h-64 flex items-center justify-center">
              <LoadingSpinner size="large" />
            </div>
          ) : subCategoriesError ? (
            <div className="h-64 flex flex-col items-center justify-center">
              <p className="text-red-500 mb-2">{subCategoriesError}</p>
              <button 
                onClick={() => categoryParam && loadSubCategories(categoryParam)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : subCategories.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow">
              <p className="text-gray-500 text-lg mb-2">No sub-categories available</p>
              <p className="text-gray-400 mb-4">
                This category doesn't have any sub-categories yet
              </p>
              <button
                onClick={handleBackClick}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Back to Categories
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subCategories.map((subCategory) => (
                <SubCategoryCard 
                  key={subCategory.id} 
                  subCategory={subCategory} 
                  onClick={() => handleSubCategoryClick(subCategory.name)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SubCategories;
