import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";
import { dummyProducts } from "../assets/assets";

const BestSeller = () => {
    const { product } = useContext(AppContext);

    return (
        <div className="py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                            Best Sellers
                        </h2>
                        <p className="text-white/75 max-w-xl">
                            Our most popular products loved by thousands of customers
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {dummyProducts
                        .filter((product) => product.inStock)
                        .slice(0, 10)
                        .map((product, index) => (
                            <ProductCard
                                key={index}
                                product={product}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default BestSeller;