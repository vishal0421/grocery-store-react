import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);

  // frontend only
  const [products, setProducts] = useState(dummyProducts || []);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistItems, setWishlistItems] = useState({});
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const fetchProducts = async (overrideProducts) => {
    setIsLoading(true);

    try {
      if (overrideProducts && Array.isArray(overrideProducts)) {
        setProducts(overrideProducts);
      } else {
        const { data } = await axiosInstance.get("/api/products");
        if (data?.success && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts(dummyProducts || []);
        }
      }
    } catch (error) {
      setProducts(overrideProducts || dummyProducts || []);
    } finally {
      setIsLoading(false);
    }
  };



  // add product to cart
  const addToCart = (itemId, quantity = 1) => {
    const cartData = structuredClone(cartItems || {});

    if (cartData[itemId]) {
      cartData[itemId] += quantity;
    } else {
      cartData[itemId] = quantity;
    }

    if (cartData[itemId] <= 0) {
      delete cartData[itemId];
    }

    setCartItems(cartData);
    toast.success("Updated cart");
  };

  // update quantity
  const updateCartItem = (itemId, quantity) => {
    const cartData = structuredClone(cartItems || {});

    if (quantity <= 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }

    setCartItems(cartData);
    toast.success("Cart updated");
  };

  // remove item
  const removeFromCart = (itemId, removeAll = false) => {
    const cartData = structuredClone(cartItems || {});

    if (cartData[itemId]) {
      if (removeAll) {
        delete cartData[itemId];
      } else {
        cartData[itemId] -= 1;
        if (cartData[itemId] <= 0) {
          delete cartData[itemId];
        }
      }
      setCartItems(cartData);
      toast.success("Removed from cart");
    }
  };



  // total items
  const cartCount=()=>{

    let total=0;

    for(
      const item
      in cartItems
    ){

      total+=
      cartItems[item];
    }

    return total;
  };



  // total amount
  const totalCartAmount=()=>{

    let total=0;

    for(
      const item
      in cartItems
    ){

      const itemInfo=
      products.find(
      product=>
      product._id===item
      );

      if(
      itemInfo &&
      cartItems[item]>0
      ){

      total+=
      cartItems[item] *
      itemInfo.offerPrice;

      }
    }

    return total;
  };



  useEffect(()=>{

    fetchProducts();

  },[]);



  const toggleWishlist = (itemId) => {
    const wishlistData = structuredClone(wishlistItems || {});
    if (wishlistData[itemId]) {
      delete wishlistData[itemId];
      toast.success("Removed from wishlist");
    } else {
      wishlistData[itemId] = true;
      toast.success("Added to wishlist");
    }
    setWishlistItems(wishlistData);
  };

  const addRecentlyViewed = (itemId) => {
    setRecentlyViewed((prev) => {
      const next = [itemId, ...prev.filter((id) => id !== itemId)];
      return next.slice(0, 10);
    });
  };

  const value = {
    navigate,
    axios: axiosInstance,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    isLoading,
    cartItems,
    setCartItems,
    wishlistItems,
    setWishlistItems,
    recentlyViewed,
    addToCart,
    updateCartItem,
    removeFromCart,
    toggleWishlist,
    addRecentlyViewed,
    searchQuery,
    setSearchQuery,
    cartCount,
    totalCartAmount,
    fetchProducts,
  };



  return(

  <AppContext.Provider value={value}>

  {children}

  </AppContext.Provider>

  );
};



export const useAppContext=()=>{

return useContext(AppContext);

};