import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

const ProductList = () => {
  const { products, fetchProducts, axios } = useAppContext();

  const toggleStock = (id, inStock) => {
    const updatedProducts = products.map((product) =>
      product._id === id ? { ...product, inStock } : product
    );
    fetchProducts(updatedProducts);
    toast.success("Stock Updated");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Product List</h1>
        <p className="text-gray-600">Manage your product inventory</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
          <p className="font-bold text-gray-900">Product</p>
          <p className="font-bold text-gray-900">Category</p>
          <p className="font-bold text-gray-900">Price</p>
          <p className="font-bold text-gray-900">Status</p>
        </div>

        {/* Product List */}
        <div className="divide-y divide-gray-100">
          {products.map((product) => (
            <div key={product._id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center">
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <img
                      src={product.image?.[0]}
                      alt={product.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-500 md:hidden">{product.category}</p>
                  </div>
                </div>

                {/* Category */}
                <div className="hidden md:block">
                  <p className="text-gray-600">{product.category}</p>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between md:justify-start">
                  <p className="font-bold text-gray-900">${product.offerPrice}</p>
                  <p className="text-sm text-gray-400 line-through md:hidden">${product.price}</p>
                </div>

                {/* Stock Toggle */}
                <div className="flex items-center justify-between md:justify-start">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      onClick={() => toggleStock(product._id, !product.inStock)}
                      checked={product.inStock}
                      type="checkbox"
                      className="sr-only peer"
                    />
                    <div className="w-12 h-7 bg-gray-200 rounded-full peer peer-checked:bg-primary peer-checked:shadow-lg peer-checked:shadow-primary/30 transition-all duration-300"></div>
                    <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 peer-checked:translate-x-5"></span>
                  </label>
                  <Badge variant={product.inStock ? 'success' : 'danger'} className="ml-3">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProductList;