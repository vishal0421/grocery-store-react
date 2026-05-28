import { footerLinks, features } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden mt-28 bg-transparent px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 pb-8">

      {/* Background Blur Effects */}

      <div className="absolute top-0 left-0 w-80 h-80 bg-green-500/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-emerald-600/10 rounded-full blur-[180px]" />

      <div
        className="
        relative
        max-w-7xl
        mx-auto
        bg-white/5
        backdrop-blur-2xl
        border
        border-white/10
        rounded-[40px]
        p-8
        md:p-12
        shadow-2xl
        shadow-green-900/10
        "
      >

        {/* TOP SECTION */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* BRAND */}

          <div>

            <div className="flex items-center gap-3 mb-5">

              <div
                className="
                w-12
                h-12
                rounded-2xl
                bg-gradient-to-br
                from-green-500
                to-emerald-700
                flex
                items-center
                justify-center
                shadow-xl
                shadow-green-500/30
                hover:scale-110
                transition
                "
              >
                🛒
              </div>

              <div>

                <h2 className="text-2xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                  FreshGrocer
                </h2>

                <p className="text-xs text-gray-400">
                  Fresh Everyday
                </p>

              </div>

            </div>

            <p className="text-sm text-gray-400 leading-7 mb-6">
              Fresh groceries delivered directly to your doorstep.
              Fast delivery, quality products and affordable prices.
            </p>

            {/* SOCIALS */}

            <div className="flex gap-3">

              {["📷", "🐦", "📘", "▶️"].map(
                (icon, index) => (

                  <button
                    key={index}
                    className="
                    w-11
                    h-11
                    rounded-2xl
                    bg-white/10
                    border
                    border-white/10
                    backdrop-blur-xl
                    hover:bg-green-500
                    hover:scale-110
                    transition-all
                    "
                  >
                    {icon}
                  </button>

                )
              )}

            </div>

          </div>

          {/* LINKS */}

          {footerLinks.map((section, index) => (

            <div key={index}>

              <h3 className="text-white font-bold text-lg mb-5">
                {section.title}
              </h3>

              <ul className="space-y-4">

                {section.links.map((link, i) => (

                  <li key={i}>

                    <a
                      href={link.url}
                      className="
                      text-sm
                      text-gray-400
                      hover:text-green-400
                      hover:translate-x-2
                      inline-block
                      transition-all
                      duration-300
                      "
                    >
                      {link.text}
                    </a>

                  </li>

                ))}

              </ul>

            </div>

          ))}

        </div>

        {/* FEATURE BOXES */}

        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-5
          mb-14
          "
        >

          {features.map((feature, index) => (

            <div
              key={index}
              className="
              bg-white/5
              backdrop-blur-xl
              border
              border-white/10
              rounded-3xl
              p-5
              text-center
              hover:-translate-y-2
              hover:border-green-500/40
              transition-all
              duration-500
              "
            >

              <div
                className="
                w-14
                h-14
                mx-auto
                rounded-2xl
                bg-gradient-to-r
                from-green-500
                to-emerald-700
                flex
                items-center
                justify-center
                shadow-lg
                mb-4
                "
              >

                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-6 h-6"
                />

              </div>

              <h4 className="text-white text-sm font-semibold mb-2">
                {feature.title}
              </h4>

              <p className="text-xs text-gray-400">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

        {/* BOTTOM */}

        <div className="border-t border-white/10 pt-8">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-sm text-gray-500">
              © 2026 FreshGrocer. All Rights Reserved.
            </p>

            <div className="flex gap-6">

              {[
                "Privacy Policy",
                "Terms",
                "Cookies"
              ].map((item, i) => (

                <a
                  key={i}
                  href="#"
                  className="
                  text-sm
                  text-gray-400
                  hover:text-green-400
                  transition
                  "
                >
                  {item}
                </a>

              ))}

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;