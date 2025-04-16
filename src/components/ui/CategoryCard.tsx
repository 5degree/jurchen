import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Category } from '../../types';
import { useAppStore } from '../../store';

interface CategoryCardProps {
  category: Category;
  onExpandCategory: () => Promise<any[]>;
  isLoading: boolean;
}

const CategoryCard = ({ category, onExpandCategory }: CategoryCardProps) => {
  const [isExpanded] = useState(false);
  const navigate = useNavigate();
  const { subCategories } = useAppStore();
  const [localSubCategories, setLocalSubCategories] = useState<any[]>([]);
  
  useEffect(() => {
    if (isExpanded) {
      const fetchSubCategories = async () => {
        await onExpandCategory();
        const filteredSubCategories = subCategories.filter(
          sub => sub.categoryName === category.name
        );
        setLocalSubCategories(filteredSubCategories);
      };
      
      fetchSubCategories();
    }
  }, [isExpanded, category.name, onExpandCategory, subCategories]);

  const handleCategoryClick = () => {
    navigate(`/products?category=${category.name}`);
  };

  const handleSubCategoryClick = (subCategoryName: string) => {
    navigate(`/products?subCategory=${subCategoryName}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Main category section */}
      <div 
        className="relative cursor-pointer group"
        onClick={handleCategoryClick}
      >
        <div className="h-64 overflow-hidden">
          <img
            src={category.image || '/placeholder-image.png'}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-image.png';
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
          <p className="text-white/90 text-sm">View Products →</p>
        </div>
      </div>

      {/* Subcategories grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {localSubCategories.map((subCategory) => (
            <div 
              key={subCategory.id}
              onClick={() => handleSubCategoryClick(subCategory.name)}
              className="cursor-pointer group"
            >
              <div className="relative h-32 overflow-hidden rounded-lg">
                <img 
                  src={subCategory.image || '/placeholder-image.png'} 
                  alt={subCategory.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.png';
                  }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-sm font-medium text-center px-2">
                    {subCategory.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;