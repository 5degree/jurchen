import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppStore } from "../store";
import Layout from "../components/layout/Layout";
import ProductCard from "../components/ui/ProductCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import type { Product } from "../types";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const subCategoryParam = searchParams.get("subCategory");

  const {
    products,
    categories,
    loadProducts,
    loadProductsByCategory,
    loadProductsBySubCategory,
    loadCategories,
    isProductsLoading,
    productsError,
  } = useAppStore();

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Pagination state
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const productsPerPage = 20;
  const observer = useRef<IntersectionObserver | null>(null);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

  // Load products and categories when component mounts
  useEffect(() => {
    loadCategories();

    if (categoryParam) {
      loadProductsByCategory(categoryParam);
      setSelectedCategory(categoryParam);
    } else if (subCategoryParam) {
      loadProductsBySubCategory(subCategoryParam);
    } else {
      loadProducts();
    }
  }, [
    categoryParam,
    subCategoryParam,
    loadProducts,
    loadProductsByCategory,
    loadProductsBySubCategory,
    loadCategories,
  ]);

  // Filter products based on search query, price range, and category
  useEffect(() => {
    if (products.length === 0) return;

    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.specifications?.toLowerCase().includes(query) ||
          product.hsnCode?.toString().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory && !categoryParam) {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(result);
    setPage(1);
    setHasMore(result.length > productsPerPage);
  }, [products, searchQuery, selectedCategory, categoryParam]);

  // Update displayed products when filtered products or page changes
  useEffect(() => {
    setDisplayedProducts(filteredProducts.slice(0, page * productsPerPage));
    setHasMore(page * productsPerPage < filteredProducts.length);
  }, [filteredProducts, page]);

  // Handle infinite scroll
  const lastProductRef = useCallback(
    (node: HTMLDivElement) => {
      if (isProductsLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isProductsLoading, hasMore]
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);

    // Update URL params
    if (category) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("category", category);
      newParams.delete("subCategory");
      setSearchParams(newParams);
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("category");
      newParams.delete("subCategory");
      setSearchParams(newParams);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSearchParams(new URLSearchParams());
  };

  // Page title based on parameters
  const getPageTitle = () => {
    if (categoryParam) {
      return `${categoryParam} Products`;
    } else if (subCategoryParam) {
      return `${subCategoryParam} Products`;
    } else if (selectedCategory) {
      return `${selectedCategory} Products`;
    }
    return "All Products";
  };

  return (
    <Layout>
      <div className="w-full bg-gray-50 py-12">
        <div className="max-w-[1100px] mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">{getPageTitle()}</h1>

          {/* Filters and Search Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            {/* Search Input - Full Width */}
            <div className="mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by Product, Category, HSN Code"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {/* Category Filter */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Filter by Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="text-white-600 text-sm font-medium"
              >
                CLEAR FILTERS
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {displayedProducts.length} of {filteredProducts.length}{" "}
              products
            </p>
          </div>

          {/* Product List */}
          {isProductsLoading && displayedProducts.length === 0 ? (
            <div className="h-64 flex items-center justify-center">
              <LoadingSpinner size="large" />
            </div>
          ) : productsError ? (
            <div className="h-64 flex flex-col items-center justify-center">
              <p className="text-red-500 mb-2">{productsError}</p>
              <button
                onClick={() => {
                  if (categoryParam) {
                    loadProductsByCategory(categoryParam);
                  } else if (subCategoryParam) {
                    loadProductsBySubCategory(subCategoryParam);
                  } else {
                    loadProducts();
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow">
              <p className="text-gray-500 text-lg mb-2">No products found</p>
              <p className="text-gray-400 mb-4">
                Try adjusting your filters or search term
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product, index) => {
                if (displayedProducts.length === index + 1) {
                  return (
                    <div key={product.id} ref={lastProductRef}>
                      <ProductCard product={product} />
                    </div>
                  );
                } else {
                  return (
                    <div key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  );
                }
              })}
            </div>
          )}

          {/* Loading indicator for infinite scroll */}
          {isProductsLoading && displayedProducts.length > 0 && (
            <div className="flex justify-center mt-8 py-4">
              <LoadingSpinner size="medium" />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
