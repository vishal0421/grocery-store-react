import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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



  // frontend product load only
  const fetchProducts = () => {

    setProducts(dummyProducts || []);

  };



  // add product to cart
  const addToCart = (itemId) => {

    let cartData =
    structuredClone(
      cartItems || {}
    );

    if(cartData[itemId]){

      cartData[itemId] += 1;

    }else{

      cartData[itemId]=1;
    }

    setCartItems(cartData);

    toast.success(
      "Added to cart"
    );
  };



  // update quantity
  const updateCartItem =
  (itemId,quantity)=>{

    let cartData=
    structuredClone(
      cartItems || {}
    );

    cartData[itemId]=quantity;

    setCartItems(
      cartData
    );

    toast.success(
      "Cart Updated"
    );
  };



  // remove item
  const removeFromCart=
  (itemId)=>{

    let cartData=
    structuredClone(
      cartItems || {}
    );

    if(cartData[itemId]){

      cartData[itemId]--;

      if(
      cartData[itemId]<=0
      ){

      delete cartData[itemId];

      }

      setCartItems(
      cartData
      );

      toast.success(
      "Removed"
      );
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



  const value={

    navigate,

    user,
    setUser,

    isSeller,
    setIsSeller,

    showUserLogin,
    setShowUserLogin,

    products,

    cartItems,
    setCartItems,

    addToCart,

    updateCartItem,

    removeFromCart,

    searchQuery,
    setSearchQuery,

    cartCount,

    totalCartAmount,

    fetchProducts

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