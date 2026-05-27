import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
const SingleProduct = () => {
  const { products, navigate, addToCart } = useAppContext();
  const { id } = useParams();
  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const product = products.find(
    (product) =>
      String(product._id) === String(id) ||
      String(product.id) === String(id)
  );
  console.log("product", product);
  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (product) => product.category === product.category
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products]);

  useEffect(() => {
    setThumbnail(product?.image[0] ? product.image[0] : null);
  }, [product]);
  const discount = product ? Math.round(((product.price - product.offerPrice) / product.price) * 100) : 0;

  return (
    product && (
      <div className="pt-24 pb-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/85 mb-8 bg-white/6 rounded-full px-4 py-2 w-fit">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
            <span className="text-gray-400">/</span>
            <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-primary transition-colors">
              {product.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-primary font-medium">{product.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Product Images */}
            <div className="flex-1">
              <div className="flex gap-4">
                {/* Thumbnails */}
                <div className="hidden lg:flex flex-col gap-3">
                  {product.image.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setThumbnail(image)}
                      className={`w-20 h-20 border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                        thumbnail === image 
                          ? 'border-primary ring-2 ring-primary/30 shadow-lg shadow-primary/20' 
                          : 'border-white/12 hover:border-primary/50 hover:shadow-md'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                  ))}
                </div>

                {/* Main Image */}
                <Card className="flex-1 p-8 flex items-center justify-center glass shadow-xl border-0">
                  <img
                    src={thumbnail}
                    alt="Selected product"
                    className="max-w-full max-h-[500px] object-contain drop-shadow-lg"
                  />
                </Card>
              </div>

              {/* Mobile Thumbnails */}
              <div className="flex lg:hidden gap-3 mt-4 overflow-x-auto pb-2">
                {product.image.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setThumbnail(image)}
                    className={`flex-shrink-0 w-20 h-20 border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                      thumbnail === image 
                        ? 'border-primary ring-2 ring-primary/30 shadow-lg shadow-primary/20' 
                        : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2">
              {discount > 0 && (
                <Badge variant="accent" className="mb-4 shadow-lg shadow-accent/30">
                  {discount}% OFF
                </Badge>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 drop-shadow-sm' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                </div>
                <span className="text-white/85 font-medium">(4 reviews)</span>
              </div>

              <div className="mb-6 bg-gradient-to-r from-white/6 to-white/8 rounded-2xl p-6 border border-white/8">
                <div className="flex items-baseline gap-3">
                  <p className="text-4xl font-bold text-gray-900">${product.offerPrice}</p>
                  {product.price > product.offerPrice && (
                    <p className="text-xl text-gray-400 line-through">${product.price}</p>
                  )}
                </div>
                <p className="text-sm text-white/85 mt-2 font-medium">Inclusive of all taxes</p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About Product
                </h3>
                <ul className="space-y-3 text-white/85">
                  {product.description.map((desc, index) => (
                    <li key={index} className="flex items-start gap-3 bg-white/6 rounded-xl p-3 hover:bg-white/8 transition-colors">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="leading-relaxed">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => addToCart(product._id)}
                  variant="secondary"
                  size="lg"
                  className="flex-1 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </Button>
                <Button
                  onClick={() => {
                    addToCart(product._id);
                    navigate("/cart");
                    window.scrollTo(0, 0);
                  }}
                  variant="primary"
                  size="lg"
                  className="flex-1 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
                >
                  Buy Now
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <div className="inline-block">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Related Products</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full mx-auto"></div>
              </div>
              <p className="text-gray-600 mt-4">You might also like</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {relatedProducts
                .filter((product) => product.inStock)
                .map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
            </div>

            <div className="text-center mt-12">
              <Button
                onClick={() => {
                  navigate("/products");
                  window.scrollTo(0, 0);
                }}
                variant="outline"
                size="lg"
                className="shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View All Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default SingleProduct;