import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-20">
      
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={assets.main_banner_bg}
          alt=""
          className="hidden lg:block h-full w-full object-cover scale-105"
        />
        <img
          src={assets.main_banner_bg_sm}
          alt=""
          className="lg:hidden h-full w-full object-cover"
        />

        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2e14]/90 via-[#14532d]/75 to-[#1f2937]/70" />

        {/* Blur circles */}
        <div className="absolute top-20 left-10 h-52 w-52 rounded-full bg-green-400/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[650px] flex items-center px-5 sm:px-8 lg:px-20 xl:px-32">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="mb-6">
            <Badge
              className="
              bg-white/10 
              text-white 
              border border-white/20
              backdrop-blur-xl
              px-5 py-2
              rounded-full
              shadow-lg
              text-sm
              font-medium
              "
            >
              🥬 Fresh & Organic
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight text-white">
            Freshness You Can
            <span className="block bg-gradient-to-r from-yellow-300 via-orange-200 to-white bg-clip-text text-transparent">
              Trust & Enjoy
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-white/85 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
            Get fresh fruits, vegetables, dairy products and daily essentials
            delivered to your doorstep with lightning-fast delivery and
            unbeatable prices.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">

            <Link to="/products">
              <Button
                variant="accent"
                size="lg"
                className="
                w-full sm:w-auto
                px-8
                shadow-2xl
                hover:scale-105
                transition-all
                duration-300
                "
              >
                Shop Now
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Button>
            </Link>

            <Link to="/products">
              <Button
                variant="secondary"
                size="lg"
                className="
                w-full sm:w-auto
                backdrop-blur-xl
                bg-white/10
                border border-white/20
                text-white
                hover:bg-white/20
                transition-all
                duration-300
                "
              >
                Explore Deals
              </Button>
            </Link>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-5 shadow-xl">
              <h2 className="text-3xl font-bold text-white">10K+</h2>
              <p className="text-white/75 text-sm mt-1">
                Happy Customers
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-5 shadow-xl">
              <h2 className="text-3xl font-bold text-white">500+</h2>
              <p className="text-white/75 text-sm mt-1">
                Premium Products
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-5 shadow-xl">
              <h2 className="text-3xl font-bold text-white">30 Min</h2>
              <p className="text-white/75 text-sm mt-1">
                Fast Delivery
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;