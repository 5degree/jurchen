import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppStore } from "../store";
import Layout from "../components/layout/Layout";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ModelViewer from "../components/ui/ModelViewer";
import BrochureFlipbook from "../components/ui/BrochureFlipbook";

const ProductDetail = () => {
  const { productId } = useParams();
  const {
    currentProduct,
    loadProductById,
    isCurrentProductLoading,
    currentProductError,
  } = useAppStore();

  const [selectedImage, setSelectedImage] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (productId) {
      loadProductById(productId);
    }
  }, [productId, loadProductById]);

  useEffect(() => {
    if (currentProduct?.product_image) {
      setSelectedImage(currentProduct.product_image);
    }
  }, [currentProduct]);

  // Handle image selection
  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  // Format description with line breaks
  const formatDescription = (text: string | undefined) => {
    if (!text) return "";
    return text.replace(/\n/g, "<br />");
  };

  // Format video url so it supports in iframe
  function transformYouTubeUrl(url: string): string {
    try {
      const parsedUrl = new URL(url);
      let videoId = '';
  
      // Handle youtu.be short links
      if (parsedUrl.hostname === 'youtu.be') {
        videoId = parsedUrl.pathname.slice(1);
      }
  
      // Handle youtube.com/watch?v= links
      if (
        parsedUrl.hostname.includes('youtube.com') &&
        parsedUrl.pathname === '/watch' &&
        parsedUrl.searchParams.has('v')
      ) {
        videoId = parsedUrl.searchParams.get('v') || '';
      }
  
      // If no valid video ID found, return original URL
      if (!videoId) return url;
  
      // Preserve query parameters (e.g., si)
      const queryParams = parsedUrl.searchParams.toString();
      return `https://www.youtube.com/embed/${videoId}${queryParams ? `?${queryParams}` : ''}`;
    } catch (error) {
      console.error('Invalid YouTube URL:', url);
      return url; // fallback to original if parsing fails
    }
  }

  if (isCurrentProductLoading) {
    return (
      <Layout>
        <div className="w-full bg-gray-50 py-12">
          <div className="max-w-[1100px] mx-auto px-4">
            <div className="h-96 flex items-center justify-center">
              <LoadingSpinner size="large" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (currentProductError || !currentProduct) {
    return (
      <Layout>
        <div className="w-full bg-gray-50 py-12">
          <div className="max-w-[1100px] mx-auto px-4">
            <div className="h-96 flex flex-col items-center justify-center">
              <p className="text-red-500 mb-2">
                {currentProductError || "Product not found"}
              </p>
              <Link
                to="/products"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full bg-gray-50 py-12">
        <div className="max-w-[1100px] mx-auto px-4 text-black">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <ol className="flex flex-wrap items-center">
              <li className="flex items-center">
                <Link to="/" className="text-blue-600 hover:text-blue-800">
                  Home
                </Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <Link
                  to="/products"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Products
                </Link>
                <span className="mx-2">/</span>
              </li>
              {currentProduct.category && (
                <li className="flex items-center">
                  <Link
                    to={`/products?category=${currentProduct.category}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {currentProduct.category}
                  </Link>
                  <span className="mx-2">/</span>
                </li>
              )}
              <li className="text-gray-600">{currentProduct.name}</li>
            </ol>
          </nav>

          {/* Product content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-6 rounded-lg shadow-sm mb-8">
            {/* Left column - Images */}
            <div>
              {/* Main image */}
              <div className="mb-4 border rounded-lg overflow-hidden h-96">
                <img
                  src={
                    selectedImage ||
                    currentProduct.product_image ||
                    "/placeholder-image.png"
                  }
                  alt={currentProduct.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Thumbnail gallery */}
              {currentProduct.product_gallery &&
                currentProduct.product_gallery.length > 0 && (
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      currentProduct.product_image,
                      ...currentProduct.product_gallery,
                    ]
                      .filter(Boolean)
                      .map((image, idx) => (
                        <div
                          key={idx}
                          className={`cursor-pointer border-2 rounded overflow-hidden h-20 ${
                            selectedImage === image
                              ? "border-blue-500"
                              : "border-gray-200"
                          }`}
                          onClick={() => handleImageSelect(image as string)}
                        >
                          <img
                            src={image as string}
                            alt={`${currentProduct.name} - ${idx}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                  </div>
                )}
            </div>

            {/* Right column - Details */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{currentProduct.name}</h1>

              {currentProduct.category && (
                <p className="mb-4 text-gray-600">
                  Category:{" "}
                  <Link
                    to={`/products?category=${currentProduct.category}`}
                    className="text-blue-600 hover:underline"
                  >
                    {currentProduct.category}
                  </Link>
                  {currentProduct.subCategory && (
                    <>
                      {" "}
                      | Subcategory:{" "}
                      <Link
                        to={`/products?subCategory=${currentProduct.subCategory}`}
                        className="text-blue-600 hover:underline"
                      >
                        {currentProduct.subCategory}
                      </Link>
                    </>
                  )}
                </p>
              )}

              {/* Short description */}
              {currentProduct.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <div
                    className={`text-gray-700 ${
                      !showFullDescription && "line-clamp-6"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: formatDescription(currentProduct.description),
                    }}
                  />
                  {currentProduct.description.length > 300 && (
                    <button
                      className="text-blue-600 hover:underline mt-2"
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                    >
                      {showFullDescription ? "Show Less" : "Read More"}
                    </button>
                  )}
                </div>
              )}

              {/* Material info */}
              {currentProduct.material && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Material</h2>
                  <p className="text-gray-700">{currentProduct.material}</p>
                </div>
              )}
            </div>
          </div>

          {/* Specifications */}
          {currentProduct.specifications && (
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4">Specifications</h2>
              <div className="border rounded-lg overflow-hidden">
                <div
                  className="prose max-w-none p-6"
                  dangerouslySetInnerHTML={{
                    __html: formatDescription(currentProduct.specifications),
                  }}
                />
              </div>
            </div>
          )}

          {/* 3D Model and YouTube Video side by side */}
          {(currentProduct.product_model || currentProduct.videoUrl) && (
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 3D Model */}
                {currentProduct.product_model && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">3D Model</h2>
                    <ModelViewer
                      modelUrl={currentProduct.product_model}
                      className="w-full h-80"
                    />
                  </div>
                )}

                {/* YouTube Video */}
                {currentProduct.videoUrl && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Product Video</h2>
                    <div className="aspect-w-9 aspect-h-7">
                      <iframe
                        className="w-full h-80"
                        src={transformYouTubeUrl(currentProduct.videoUrl)}
                        title={`${currentProduct.name} Video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Brochure 3D Flipbook */}
          {currentProduct.product_brochure && (
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <BrochureFlipbook pdfUrl={currentProduct.product_brochure} />
            </div>
          )}

          {/* Terms and Conditions */}
          {currentProduct.termsAndConditions && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
              <div className="border rounded-lg p-6 bg-gray-50">
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: formatDescription(
                      currentProduct.termsAndConditions
                    ),
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
