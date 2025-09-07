import { useNavigate } from 'react-router-dom';
import type { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
  onExpandCategory: () => Promise<any[]>;
  isLoading: boolean;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate(`/subcategories?category=${category.name}`);
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
          <p className="text-white/90 text-sm">View Sub Categories →</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;