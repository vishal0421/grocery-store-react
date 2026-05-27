import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Card from "./ui/Card";

const ProductCard = ({ product }) => {
  const {
    navigate,
    addToCart,
    cartItems,
    removeFromCart
  } = useContext(AppContext);

  const discount = Math.round(
    ((product.price - product.offerPrice) /
      product.price) *
      100
  );

  return (
    product && (
      <Card
        hover={true}
        className="group cursor-pointer overflow-hidden min-w-[220px] max-w-[280px] w-full rounded-[30px] glass hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
        onClick={() =>
          navigate(
            `/product/${product._id || product.id}`
          )
        }
      >

        {/* IMAGE */}

        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-green-50 via-white to-orange-50">

          {/* DISCOUNT */}

          {discount > 0 && (
            <div
              className="
              absolute
              top-4
              left-4
              z-20
              bg-gradient-to-r
              from-orange-500
              to-red-500
              text-white
              text-xs
              font-bold
              px-4
              py-2
              rounded-full
              shadow-xl
              shadow-orange-300/40
              backdrop-blur-xl
              "
            >
              🔥 {discount}% OFF
            </div>
          )}

          {/* QUICK BUTTON */}

         {/* QUICK BUTTON */}

<div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500">

  <button
    onClick={(e) => {
      e.stopPropagation();
      addToCart(product._id);
    }}
    className="
    h-11
    w-11
    rounded-2xl
    bg-gradient-to-r
    from-green-500
    to-emerald-700
    text-white
    flex
    items-center
    justify-center
    shadow-xl
    shadow-green-500/30
    hover:scale-110
    hover:rotate-12
    transition-all
    duration-300
    "
  >
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 5v14M5 12h14"
      />
    </svg>
  </button>

</div>

          <div className="h-full w-full p-5 flex items-center justify-center">

            <img
              src={product.image[0]}
              alt={product.name}
              className="
              object-contain
              max-w-full
              max-h-full
              transition-all
              duration-700
              group-hover:scale-125
              group-hover:rotate-3
              "
            />

          </div>

        </div>

        {/* CONTENT */}

        <div className="p-5">

          <p
            className="
            text-xs
            uppercase
            tracking-widest
            text-green-600
            font-semibold
            mb-2
          "
          >
            {product.category}
          </p>

          <h3
            className="
            text-gray-800
            font-bold
            text-base
            line-clamp-2
            mb-3
            group-hover:text-green-600
            transition
          "
          >
            {product.name}
          </h3>

          {/* RATING */}

          <div className="flex items-center gap-2 mb-4">

            <div className="flex">

              {Array(5)
                .fill("")
                .map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < 4
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
            </div>

            <span className="text-xs text-gray-400">
              (4.8)
            </span>

          </div>

          {/* PRICE */}

          <div className="flex items-end justify-between">

            <div>

              <p className="text-2xl font-bold text-gray-900">
                ${product.offerPrice}
              </p>

              {product.price >
                product.offerPrice && (
                <p className="text-sm text-gray-400 line-through">
                  ${product.price}
                </p>
              )}

            </div>

            <div
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              {!cartItems[product._id] ? (

                <button
                  onClick={() =>
                    addToCart(product._id)
                  }
                  className="
                  bg-gradient-to-r
                  from-green-500
                  to-emerald-700
                  text-white
                  rounded-2xl
                  px-5
                  py-2.5
                  font-medium
                  shadow-lg
                  shadow-green-300/40
                  hover:scale-105
                  transition-all
                  "
                >
                  Add
                </button>

              ) : (

                <div className="flex items-center gap-2 bg-green-50 rounded-2xl px-2 py-1">

                  <button
                    onClick={() =>
                      removeFromCart(product._id)
                    }
                    className="
                    w-8 h-8
                    rounded-xl
                    bg-gradient-to-r
                    from-red-400
                    to-red-500
                    text-white
                    "
                  >
                    −
                  </button>

                  <span className="font-bold w-6 text-center text-green-700">
                    {cartItems[product._id]}
                  </span>

                  <button
                    onClick={() =>
                      addToCart(product._id)
                    }
                    className="
                    w-8 h-8
                    rounded-xl
                    bg-gradient-to-r
                    from-green-500
                    to-emerald-700
                    text-white
                    "
                  >
                    +
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </Card>
    )
  );
};

export default ProductCard;