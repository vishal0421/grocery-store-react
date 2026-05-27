import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import { dummyAddress } from "../assets/assets";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import QuantitySelector from "../components/ui/QuantitySelector";
import Badge from "../components/ui/Badge";


const Cart = () => {
  const { products, navigate, cartCount, totalCartAmount, cartItems, removeFromCart, updateCartItem } = useContext(AppContext);


  //state to store products in available in cart
  const [cartArray, setCartArray] = useState([]);

  //state to store products in available in cart
  const [address, setAddress] = useState(dummyAddress);
  const [showAddress, setShowAddress] = useState(false);
  //state for selected address
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
  // state for payment option
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((product) => product._id === key);
      product.quantity = cartItems[key];
      tempArray.push(product);
    }
    setCartArray(tempArray);
  };
  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  const placeOrder = () => {
    navigate("/add-address");
    window.scrollTo(0, 0);
  };

  return products.length > 0 && cartItems ? (
    <div className="pt-24 pb-24 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items */}
          <div className='flex-1'>
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Shopping Cart
              </h1>
              <p className="text-white/85">
                {cartCount()} {cartCount() === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>

            {/* Cart Header */}
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-white/70 text-sm font-medium pb-4 border-b border-white/12">
              <p className="text-left">Product Details</p>
              <p className="text-center">Subtotal</p>
              <p className="text-center">Action</p>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mt-6">
              {cartArray.map((product, index) => {
                const discount = Math.round(((product.price - product.offerPrice) / product.price) * 100);
                return (
                  <Card key={index} className="p-4 md:p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 items-center">
                      <div className="flex items-center gap-4">
                        <div 
                          onClick={() => {
                            navigate(`/product/${product._id}`);
                            window.scrollTo(0, 0);
                          }}
                          className="cursor-pointer w-24 h-24 md:w-32 md:h-32 flex items-center justify-center bg-gradient-to-br from-white/6 to-white/8 rounded-2xl overflow-hidden flex-shrink-0 hover:shadow-md transition-shadow duration-300"
                        >
                          <img className="max-w-full max-h-full object-contain p-3" src={product.image[0]} alt={product.name} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2">
                            <p className="font-bold text-white text-base md:text-lg truncate">{product.name}</p>
                            {discount > 0 && (
                              <Badge variant="accent" className="flex-shrink-0 text-xs">
                                {discount}% OFF
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-white/75 mt-1">{product.category}</p>
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-white/85">Qty:</p>
                              <QuantitySelector
                                value={cartItems[product._id]}
                                onChange={(newValue) => updateCartItem(product._id, newValue)}
                                min={1}
                                max={99}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        {product.price > product.offerPrice && (
                          <p className="text-sm text-white/70 line-through">${product.price}</p>
                        )}
                        <p className="text-lg md:text-xl font-bold text-white">
                          ${product.offerPrice * product.quantity}
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <button 
                          onClick={() => removeFromCart(product._id)}
                          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl hover:bg-red-600/10 hover:shadow-md text-white hover:text-red-300 transition-all duration-200 active:scale-95"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <Button
              onClick={() => {
                navigate('/products');
                window.scrollTo(0, 0)
              }}
              variant="outline"
              className="mt-6"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <Card className="p-6 sticky top-24 shadow-xl border-0 glass">
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-4 mb-6 shadow-lg shadow-primary/30">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Order Summary
                </h2>
              </div>

              {/* Delivery Address */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Delivery Address
                </p>
                <div className="relative">
                  <p className="text-white/85 text-sm bg-white/6 rounded-xl p-3">
                    {selectedAddress
                      ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                      : "No Address Found"
                    }
                  </p>
                  <button 
                    onClick={() => setShowAddress(!showAddress)}
                    className="text-primary font-medium text-sm hover:underline mt-2 flex items-center gap-1"
                  >
                    Change
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showAddress && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/6 border border-white/12 rounded-xl shadow-xl z-10 overflow-hidden">
                      {address.map((addr, index) => (
                        <p
                          key={index}
                          onClick={() => {
                            setSelectedAddress(addr);
                            setShowAddress(false);
                          }}
                          className="text-white/85 p-3 hover:bg-white/8 cursor-pointer text-sm border-b border-white/8 last:border-0"
                        >
                          {addr.street}, {addr.city}, {addr.state}, {addr.country}
                        </p>
                      ))}
                      <p
                        onClick={() => {
                          navigate("/add-address");
                          window.scrollTo(0, 0);
                        }}
                        className="text-primary font-medium text-center p-3 hover:bg-primary/5 cursor-pointer text-sm"
                      >
                        + Add New Address
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Payment Method
                </p>
                <select 
                  onChange={(e) => setPaymentOption(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
                >
                  <option value="COD">Cash On Delivery</option>
                  <option value="Online">Online Payment</option>
                </select>
              </div>

              <hr className="border-gray-200 my-6" />

              {/* Price Breakdown */}
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">${totalCartAmount()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping Fee</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tax (2%)</span>
                  <span className="font-medium text-gray-900">${(totalCartAmount() * 2) / 100}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold text-gray-900 pt-4 border-t-2 border-gray-200 mt-4">
                  <span>Total</span>
                  <span className="text-primary">${totalCartAmount() + ((totalCartAmount() * 2) / 100)}</span>
                </div>
              </div>

              <Button
                onClick={placeOrder}
                variant="primary"
                size="lg"
                className="w-full mt-6 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
              >
                {paymentOption === "COD" ? "Place Order" : "Pay Now"}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 glass-weak border-t border-white/12 p-4 lg:hidden shadow-2xl z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-xl font-bold text-gray-900">
              ${totalCartAmount() + ((totalCartAmount() * 2) / 100)}
            </p>
          </div>
          <Button
            onClick={placeOrder}
            variant="primary"
            size="lg"
            className="flex-1 shadow-lg shadow-primary/30"
          >
            Checkout
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className="pt-24 pb-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-dark/20 rounded-full animate-pulse"></div>
          <div className="absolute inset-2 bg-gradient-to-br from-primary/10 to-primary-dark/10 rounded-full"></div>
          <div className="absolute inset-4 bg-white/6 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Your cart feels lonely</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          Looks like you haven't added any items to your cart yet. Let's change that!
        </p>
        <Button 
          onClick={() => navigate('/products')} 
          variant="primary"
          size="lg"
          className="shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Start Shopping
        </Button>
      </div>
    </div>
  );
};

export default Cart;


