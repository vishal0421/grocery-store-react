import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductCategory = () => {
  const { products, navigate } = useContext(AppContext);
  const { category } = useParams();
  const searchCategory = categories.find((item) => item.path.toLowerCase() === category);
  const filterProducts = products.filter((product) => product.category.toLowerCase() === category);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
      <div className="max-w-7xl mx-auto">
        {searchCategory && (
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {searchCategory.text}
            </h1>
            <p className="text-gray-600">
              {filterProducts.length} {filterProducts.length === 1 ? 'product' : 'products'} available
            </p>
          </div>
        )}

        {filterProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filterProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any products in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategory;
