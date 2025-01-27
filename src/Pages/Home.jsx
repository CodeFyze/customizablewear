import React from "react";
import header from "../assets/images/header.webp";
import Category from "../components/Category";
import Products from "./Products";

const Home = () => {
  return (
    <div className="container mx-auto pb-24 py-4 px-4 lg:px-16">
      <div className="hero py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-10">
          <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h6 className="text-2xl text-gray-700">Well Come To .........</h6>
            <h3 className="text-3xl md:text-6xl font-bold text-gray-900 mt-4">
              Professor Store
            </h3>
            <button className="px-6 py-3 rounded-full text-white font-bold mt-8 bg-yellow-500 hover:bg-yellow-600 transition duration-300">
              Order Now
            </button>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src={header}
              className="w-3/4 md:w-4/5 lg:w-3/5 rounded-lg transition-transform duration-500 hover:rotate-3 hover:scale-110"
              alt="header"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-10 pt-8">
        <Category />
      </div>

      <div className="container mx-auto px-6 md:px-10 pt-8">
        <Products />
      </div>
    </div>
  );
};

export default Home;
