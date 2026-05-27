import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext"
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";

const ProductDetails = () => {
    
    const {products, navigate, addToCart}= useContext(AppContext);
    const {id}=useParams();
    const [thumbnail, setThumbnail] = useState(null);
    const product = products.find((product) => product._id === id);
   

    useEffect(()=>{
      setThumbnail(product?.image[0]?product.image[0] : null);
    },[product]);

    return product && (
        <div className="mt-16">
            <p>
                <Link to={"/"}>Home</Link> /
                <Link to={"/products"}> Products</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
                <span className="text-indigo-500"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border border-white/20 bg-white/10 max-w-24 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-white/20 bg-white/10 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                  <div>
                    {Array(5)
                    .fill("")
                    .map(
                      (_,i)=>
                        product.rating >
                      (
                        <img
                          src={i<4 ? assets.star_icon : assets.star_dull_icon}
                          alt = "star"
                          key={i}
                          className="w-3.5 md:w-4"
                          />

                      )
                    )}
                    <p className="text-base ml-2">(4)</p>
                  </div>

                    <div className="mt-6 space-y-2">
                        <p className="text-white/70 line-through">MRP: ${product.price}</p>
                        <p className="text-2xl font-medium text-white">MRP: ${product.offerPrice}</p>
                        <span className="text-white/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6 text-white">About Product</p>
                    <ul className="list-disc ml-4 text-white/70 space-y-2">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row items-center mt-10 gap-4 text-base">
                        <button onClick={()=>addToCart(product._id)} className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white rounded-2xl hover:bg-primary-dark transition" >
                            Add to Cart
                        </button>
                        <button onClick={()=>{
                          addToCart(product._id);
                          navigate("/cart");
                        }

                        } className="w-full py-3.5 cursor-pointer font-medium bg-white/10 text-white rounded-2xl hover:bg-white/20 transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;