import { categories } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import Card from "./ui/Card";

const Category = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 relative overflow-hidden">

      {/* background blur */}
      <div className="absolute top-0 left-0 h-72 w-72 bg-green-200/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 h-80 w-80 bg-orange-200/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="text-center mb-14">

          <span className="px-5 py-2 rounded-full glass text-sm font-medium">
            🛒 Explore Categories
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
            Shop by Category
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Browse through premium fresh groceries and daily essentials.
          </p>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">

          {categories.map((category, index) => (

            <Card
              key={index}
              hover={true}
              onClick={() => {
                navigate(
                  `/products/${category.path.toLowerCase()}`
                );
                window.scrollTo(0,0);
              }}
              className={`group cursor-pointer rounded-3xl glass p-6 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center`}
            >

              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-5">

                <img
                  src={category.image}
                  alt={category.text}
                  className="
                  max-w-full
                  max-h-full
                  object-contain
                  transition-all
                  duration-500
                  group-hover:scale-125
                  group-hover:rotate-6
                  "
                />

              </div>

              <p className="font-semibold text-gray-800 group-hover:text-green-600 transition">
                {category.text}
              </p>

            </Card>

          ))}
        </div>

      </div>
    </section>
  );
};

export default Category;