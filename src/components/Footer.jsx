const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"]
    },
    {
      title: "Need Help?",
      links: ["Delivery Information", "Return & Refund Policy", "Payment Methods", "Track your Order", "Contact Us"]
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "Facebook", "YouTube"]
    }
  ];

  return (
    <div className="py-16 px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-50">
      
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-300 text-gray-500">
        
        {/* Left Section */}
        <div className="max-w-sm">
          <h2 className="text-3xl font-bold text-indigo-600">
            Grocery App
          </h2>

          <p className="mt-4 text-sm leading-6 text-gray-600">
            Fresh groceries delivered straight to your doorstep.
            Shop from a wide range of fruits, vegetables, dairy
            products, beverages, and daily essentials with
            fast delivery and affordable prices.
          </p>
        </div>

        {/* Right Links */}
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-8">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 mb-4">
                {section.title}
              </h3>

              <ul className="text-sm space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-indigo-500 hover:underline transition duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom */}
      <p className="py-6 text-center text-sm text-gray-500">
        © 2025 Grocery App. All Rights Reserved.
      </p>
      
    </div>
  );
};

export default Footer;