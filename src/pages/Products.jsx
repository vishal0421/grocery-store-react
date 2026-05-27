import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Popular" },
];

const Products = () => {
  const { products, searchQuery, isLoading } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedSort, setSelectedSort] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let list = products || [];

    if (searchQuery.trim()) {
      list = list.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      list = list.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedRating > 0) {
      list = list.filter((product) => (product.rating || 4) >= selectedRating);
    }

    list = list.filter(
      (product) =>
        product.offerPrice >= priceRange[0] && product.offerPrice <= priceRange[1]
    );

    if (selectedSort === "price-low") {
      return list.slice().sort((a, b) => a.offerPrice - b.offerPrice);
    }

    if (selectedSort === "price-high") {
      return list.slice().sort((a, b) => b.offerPrice - a.offerPrice);
    }

    if (selectedSort === "popular") {
      return list.slice().sort((a, b) => (b.rating || 4) - (a.rating || 4));
    }

    return list.slice().sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [products, searchQuery, selectedCategory, selectedRating, selectedSort, priceRange]);

  const pageSize = 12;
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedRating, selectedSort, priceRange]);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
              </h1>
              <p className="text-white/85">
                {filteredProducts.filter((product) => product.inStock).length} products available
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="rounded-full glass-weak px-4 py-2 text-sm text-white">
                {filteredProducts.length} results
              </div>
              <select
                className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm outline-none text-white focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-6">
            <aside className="rounded-3xl border border-white/12 glass p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-white mb-4">Filters</h2>
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-medium text-white/85 mb-3">Category</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className={`rounded-2xl px-3 py-2 text-sm font-medium transition ${
                        selectedCategory === "All"
                          ? "bg-primary text-white"
                          : "glass text-white/85 hover:bg-white/10"
                      }`}
                      onClick={() => setSelectedCategory("All")}
                    >
                      All
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.path}
                        className={`rounded-2xl px-3 py-2 text-sm font-medium transition ${
                          selectedCategory === category.path
                            ? "bg-primary text-white"
                            : "glass text-white/85 hover:bg-white/10"
                        }`}
                        onClick={() => setSelectedCategory(category.path)}
                      >
                        {category.text}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-white/85 mb-3">Price range</p>
                  <div className="grid grid-cols-2 gap-3 text-sm text-white/85">
                    <input
                      type="number"
                      value={priceRange[0]}
                      min={0}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full rounded-2xl border border-white/12 bg-white/6 px-3 py-2 text-white outline-none"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      min={0}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full rounded-2xl border border-white/12 bg-white/6 px-3 py-2 text-white outline-none"
                      placeholder="Max"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-white/85 mb-3">Minimum rating</p>
                  <div className="flex flex-wrap gap-2">
                    {[0, 3, 4, 5].map((ratingOption) => (
                      <button
                        key={ratingOption}
                        className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                          selectedRating === ratingOption
                            ? "bg-primary text-white"
                            : "glass text-white/85 hover:bg-white/10"
                        }`}
                        onClick={() => setSelectedRating(ratingOption)}
                      >
                        {ratingOption === 0 ? "Any" : `${ratingOption}+`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <section>
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, index) => (
                      <div key={index} className="h-80 rounded-3xl border border-white/12 glass p-6 shadow-sm animate-pulse" />
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {visibleProducts.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/12 glass px-5 py-4 shadow-sm">
                    <p className="text-sm text-white/85">
                      Showing {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredProducts.length)} of {filteredProducts.length} products
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="rounded-2xl border border-white/12 bg-white/6 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
                        disabled={currentPage === pageCount}
                        className="rounded-2xl border border-white/12 bg-white/6 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-24 rounded-3xl border border-white/12 glass shadow-sm">
                  <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl">
                    ✨
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">No products found</h2>
                  <p className="text-white/85 max-w-xl mx-auto">
                    We could not find any products matching your filters. Try broadening your search.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
