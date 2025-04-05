import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Category } from '../../types';
import { useAppStore } from '../../store';
import LoadingSpinner from './LoadingSpinner';

interface CategoryCardProps {
  category: Category;
  onExpandCategory: () => Promise<any[]>;
  isLoading: boolean;
}

const CategoryCard = ({ category, onExpandCategory, isLoading }: CategoryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { subCategories } = useAppStore();
  const [localSubCategories, setLocalSubCategories] = useState<any[]>([]);
  
  useEffect(() => {
    if (isExpanded) {
      const fetchSubCategories = async () => {
        await onExpandCategory();
        // Now get the subcategories from the store
        const filteredSubCategories = subCategories.filter(
          sub => sub.categoryName === category.name
        );
        setLocalSubCategories(filteredSubCategories);
      };
      
      fetchSubCategories();
    }
  }, [isExpanded, category.name, onExpandCategory, subCategories]);

  const handleCategoryClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSubCategoryClick = (subCategoryName: string) => {
    navigate(`/products?subCategory=${subCategoryName}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div 
        className="cursor-pointer"
        onClick={handleCategoryClick}
      >
        <div className="h-48 overflow-hidden">
          <img
            src={category.image || '/placeholder-image.png'}
            alt={category.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-image.png';
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Click to expand</span>
            <svg 
              className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-2">
          <h4 className="text-md font-medium text-gray-700 mb-1">Sub Categories:</h4>
          {isLoading ? (
            <div className="py-4 flex justify-center">
              <LoadingSpinner size="small" />
            </div>
          ) : localSubCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {localSubCategories.map((subCategory) => (
                <div 
                  key={subCategory.id}
                  className="bg-gray-100 rounded-md p-2 cursor-pointer hover:bg-gray-200 transition flex items-center"
                  onClick={() => handleSubCategoryClick(subCategory.name)}
                >
                  <div className="w-12 h-12 mr-2 overflow-hidden rounded">
                    <img 
                      src={subCategory.image || '/placeholder-image.png'} 
                      alt={subCategory.name}
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-image.png';
                      }}
                    />
                  </div>
                  <span className="text-gray-800">{subCategory.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 py-2">No subcategories available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryCard; 