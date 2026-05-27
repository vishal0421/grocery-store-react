import { assets, categories } from "../../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const AddProduct = () => {
  const { axios } = useContext(AppContext);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);

      for (let i = 0; i < files.length; i++) {
        formData.append("image", files[i]);
      }

      const { data } = await axios.post("/api/product/add-product", formData);
      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
        <p className="text-gray-600">Fill in the details to add a new product to your store</p>
      </div>

      <Card className="p-6 md:p-8 border-0 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Images */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              Product Images
              <span className="text-gray-400 font-normal ml-1">(Max 4)</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array(4)
                .fill("")
                .map((_, index) => (
                  <label key={index} htmlFor={`image${index}`} className="cursor-pointer group">
                    <input
                      onChange={(e) => {
                        const updatedFiles = [...files];
                        updatedFiles[index] = e.target.files[0];
                        setFiles(updatedFiles);
                      }}
                      accept="image/*"
                      type="file"
                      id={`image${index}`}
                      hidden
                    />
                    <div className="aspect-square border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center bg-gray-50 group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300 overflow-hidden">
                      {files[index] ? (
                        <img
                          src={URL.createObjectURL(files[index])}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <svg className="w-8 h-8 mx-auto text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <p className="text-xs text-gray-500 mt-1">Upload</p>
                        </div>
                      )}
                    </div>
                  </label>
                ))}
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="product-name">
              Product Name
            </label>
            <Input
              id="product-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="product-description">
              Product Description
            </label>
            <textarea
              id="product-description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              placeholder="Enter product description"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option value={category.path} key={index}>
                  {category.path}
                </option>
              ))}
            </select>
          </div>

          {/* Price Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="product-price">
                Product Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                <input
                  id="product-price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="offer-price">
                Offer Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                <input
                  id="offer-price"
                  type="number"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-4 pt-4">
            <Button type="submit" variant="primary" size="lg" className="flex-1 shadow-lg shadow-primary/30">
              Add Product
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default AddProduct;