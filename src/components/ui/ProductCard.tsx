import { Link } from 'react-router-dom';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img
          src={product.product_image || '/placeholder-image.jpg'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
        
        {product.category && (
          <p className="text-sm text-gray-600 mb-4">
            Category: {product.category}
          </p>
        )}
        
        <Link
          to={`/products/${product.id}`}
          className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          View Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard; 