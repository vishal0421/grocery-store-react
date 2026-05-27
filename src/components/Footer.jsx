import { footerLinks, features } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#07140d] pt-20 pb-8 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">

      {/* Background Effects */}

      <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400/10 rounded-full blur-[150px]"></div>

      <div className="relative max-w-7xl mx-auto">

        {/* TOP */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* BRAND */}

          <div className="lg:col-span-1">

            <div className="flex items-center gap-3 mb-5">

              <div
                className="
                w-12 h-12
                bg-gradient-to-br
                from-green-500
                to-emerald-700
                rounded-2xl
                flex items-center justify-center
                shadow-xl shadow-green-500/30
                "
              >
                🛒
              </div>

              <div>

                <h2 className="text-2xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  FreshGrocer
                </h2>

                <p className="text-xs text-gray-400">
                  Fresh Everyday
                </p>

              </div>

            </div>

            <p className="text-gray-400 text-sm leading-7 mb-6">
              Fresh groceries delivered straight to your doorstep.
              Shop fruits, vegetables, dairy products and daily
              essentials with fast delivery and affordable pricing.
            </p>

            {/* SOCIAL */}

            <div className="flex gap-3">

              {["Instagram","Twitter","Facebook","YouTube"].map((social)=>(

                <a
                  key={social}
                  href="#"
                  className="
                  w-11 h-11
                  rounded-2xl
                  bg-white/5
                  backdrop-blur-xl
                  border border-white/10
                  flex items-center justify-center
                  hover:scale-110
                  hover:bg-green-500
                  transition-all
                  duration-300
                  "
                >

                  <span className="text-gray-300 text-sm">
                    {social[0]}
                  </span>

                </a>

              ))}

            </div>

          </div>

          {/* LINKS */}

          {footerLinks.map((section, index) => (

            <div key={index}>

              <h3 className="font-bold text-white mb-5 text-lg">
                {section.title}
              </h3>

              <ul className="space-y-4">

                {section.links.map((link, i) => (

                  <li key={i}>

                    <a
                      href={link.url}
                      className="
                      text-gray-400
                      text-sm
                      hover:text-green-400
                      hover:translate-x-1
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

        {/* FEATURES */}

        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-5
          mb-14
          p-6
          rounded-[30px]
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          "
        >

          {features.map((feature,index)=>(

            <div
              key={index}
              className="
              flex
              flex-col
              items-center
              text-center
              "
            >

              <div
                className="
                w-14 h-14
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

              <h4 className="font-semibold text-white text-sm mb-1">
                {feature.title}
              </h4>

              <p className="text-gray-400 text-xs">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

        {/* BOTTOM */}

        <div className="pt-8 border-t border-white/10">

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-gray-500 text-sm">
              © 2026 FreshGrocer. All Rights Reserved.
            </p>

            <div className="flex gap-6 text-sm">

              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition"
              >
                Terms of Service
              </a>

              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition"
              >
                Cookie Policy
              </a>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;