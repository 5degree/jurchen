import type { SubCategory } from '../../types';

interface SubCategoryCardProps {
  subCategory: SubCategory;
  onClick: () => void;
}

const SubCategoryCard = ({ subCategory, onClick }: SubCategoryCardProps) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={subCategory.image || '/placeholder-image.png'}
          alt={subCategory.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-image.png';
          }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{subCategory.name}</h3>
        <p className="text-gray-600 text-sm mb-4">View Products →</p>
        <div className="flex justify-end">
          <span className="text-blue-600 font-medium text-sm group-hover:text-blue-800">
            Explore Products
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCard;
