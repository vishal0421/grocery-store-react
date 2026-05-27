import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Button from "./ui/Button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const {
    user,
    setUser,
    navigate,
    setShowUserLogin,
    cartCount,
    searchQuery,
    setSearchQuery,
    products,
    wishlistItems,
  } = useAppContext();

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return products
      .filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5);
  }, [searchQuery, products]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/10 backdrop-blur-2xl border-b border-white/10 shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-4">

        {/* Logo */}

        <Link to="/" className="flex items-center gap-3 group">

          <div
            className="
            w-11 h-11
            rounded-2xl
            bg-gradient-to-br
            from-green-500
            to-emerald-700
            flex
            items-center
            justify-center
            shadow-xl
            shadow-green-500/30
            group-hover:rotate-6
            group-hover:scale-110
            transition-all duration-500
            "
          >

            🛒

          </div>

          <div>

            <h1 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              FreshGrocer
            </h1>

            <p
              className={`text-[11px] ${
                scrolled
                  ? "text-gray-400"
                  : "text-gray-300"
              }`}
            >
              Fresh Everyday
            </p>

          </div>

        </Link>

        {/* Desktop */}

        <div className="hidden lg:flex items-center gap-6">

          <Link
            to="/"
            className={`font-medium transition duration-300 ${
              scrolled
                ? "text-white hover:text-green-300"
                : "text-white hover:text-green-300"
            }`}
          >
            Home
          </Link>

          <Link
            to="/products"
            className={`font-medium transition duration-300 ${
              scrolled
                ? "text-white hover:text-green-300"
                : "text-white hover:text-green-300"
            }`}
          >
            Products
          </Link>

          {/* Search */}

          <div className="relative">

            <div
              className="
              flex items-center gap-3
              bg-white/10
              backdrop-blur-xl
              border border-white/10
              px-5 py-3
              rounded-full
              w-[320px]
              "
            >

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>

              <input
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                className="
                bg-transparent
                outline-none
                w-full
                text-sm
                text-white
                placeholder:text-gray-300
                "
                type="text"
                placeholder="Search fresh groceries..."
              />

            </div>

            {suggestions.length > 0 && (
              <div className="absolute mt-3 w-full bg-[#12211a]/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">

                {suggestions.map((product) => (

                  <button
                    key={product._id}
                    onClick={() => {
                      navigate(`/product/${product._id}`);
                      setSearchQuery("");
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-white/10 transition"
                  >
                    <p className="font-medium text-white">
                      {product.name}
                    </p>

                    <p className="text-xs text-gray-400">
                      {product.category}
                    </p>

                  </button>

                ))}

              </div>
            )}

          </div>

          {/* Cart */}

          <button
            onClick={() => navigate("/cart")}
            className="relative p-3 rounded-2xl bg-white/10 backdrop-blur-xl hover:scale-110 transition"
          >

            🛒

            {cartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white w-5 h-5 text-[10px] rounded-full flex items-center justify-center">
                {cartCount()}
              </span>
            )}

          </button>

          {/* Wishlist */}

          <button
            onClick={() => navigate("/products")}
            className="relative p-3 rounded-2xl bg-white/10 backdrop-blur-xl hover:scale-110 transition"
          >

            ❤️

            {Object.keys(wishlistItems).length > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white w-5 h-5 text-[10px] rounded-full flex items-center justify-center">
                {Object.keys(wishlistItems).length}
              </span>
            )}

          </button>

          {/* Notification */}

          <button
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
            className="relative p-3 rounded-2xl bg-white/10 backdrop-blur-xl hover:scale-110 transition"
          >
            🔔
          </button>

          {user ? (
            <div className="relative group">

              <button className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center shadow-lg">

                <span className="text-white font-bold">
                  {user?.name?.[0] || "U"}
                </span>

              </button>

              <ul className="hidden group-hover:block absolute top-14 right-0 bg-[#12211a]/95 backdrop-blur-xl rounded-2xl shadow-xl w-48 py-2">

                <li
                  onClick={() =>
                    navigate("/my-orders")
                  }
                  className="px-4 py-3 hover:bg-white/10 cursor-pointer text-white"
                >
                  My Orders
                </li>

                <li
                  onClick={() => setUser(null)}
                  className="px-4 py-3 hover:bg-red-500/10 text-red-400 cursor-pointer"
                >
                  Logout
                </li>

              </ul>

            </div>
          ) : (
            <Button
              onClick={() =>
                setShowUserLogin(true)
              }
              className="
              bg-gradient-to-r
              from-green-500
              to-emerald-700
              "
            >
              Login
            </Button>
          )}
        </div>

        {/* Mobile */}

        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden p-2 ${
            scrolled
              ? "text-white"
              : "text-white"
          }`}
        >
          ☰
        </button>

      </div>
    </nav>
  );
};

export default Navbar;