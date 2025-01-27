import React, { useState } from "react";
import Shirt1 from "../assets/images/shirt1.jpeg";
import Shirt2 from "../assets/images/shirt2.jpeg";
import Shirt3 from "../assets/images/shirt3.jpeg";
import SizeSelection from "./SizeSelection";

const TShirtSelector = () => {
  const [selectedShirt, setSelectedShirt] = useState(Shirt1);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleShirtChange = (shirt) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedShirt(shirt);
      setIsAnimating(false);
    }, 300);
  };

  const shirts = [
    { id: 1, src: Shirt1, alt: "Shirt 1", label: "Blue", dimensions: "Length: 28in, Width: 20in" },
    { id: 2, src: Shirt2, alt: "Shirt 2", label: "Brown", dimensions: "Length: 30in, Width: 22in" },
    { id: 3, src: Shirt3, alt: "Shirt 3", label: "Red", dimensions: "Length: 32in, Width: 24in" },
    { id: 3, src: Shirt3, alt: "Shirt 3", label: "Red", dimensions: "Length: 32in, Width: 24in" },
  ];

  const selectedShirtDetails = shirts.find((shirt) => shirt.src === selectedShirt);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-x-8 md:space-y-0">
      {/* Main Shirt Display */}
      <div className="w-full md:w-[1000px] flex justify-center">
        <img
          src={selectedShirt}
          alt="Selected T-Shirt"
          className={`w-full h-auto md:m-10 max-w-xs md:max-w-2xl p-4 md:p-0 transform transition-transform duration-200 ${
            isAnimating ? "scale-75 opacity-50" : "scale-100 opacity-100"
          }`}
        />
      </div>

      {/* Right-Side Section */}
      <div className="w-full md:w-1/3 md:pr-10">
        {/* Shirt Selector */}
        <div className="mt-4 font-medium text-lg text-center md:text-left">
          Select Your T-Shirt
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 p-2">
          {shirts.map((shirt) => (
            <div
              key={shirt.id}
              onClick={() => handleShirtChange(shirt.src)}
              className={`cursor-pointer w-full h-32 p-2 text-center transform transition-transform duration-300 ${
                selectedShirt === shirt.src
                  ? "scale-105 outline outline-2 outline-orange-500"
                  : ""
              }`}
            >
              <img
                src={shirt.src}
                alt={shirt.alt}
                className="w-full h-24 object-cover rounded-md"
              />
              <div className="mt-2 text-sm text-gray-700">{shirt.label}</div>
            </div>
          ))}
        </div>

        {/* Shirt Details Section */}
        <div className="mt-6 p-4 md:mb-3">
          <h3 className="text-lg font-bold mb-2">Shirt Dimensions</h3>
          <div className="mt-4 flex space-x-4">
            <img
              src={selectedShirtDetails?.src}
              alt={selectedShirtDetails?.alt}
              className="w-16 h-16 object-cover rounded-md border border-gray-300"
            />
            <div className="flex-1">
              <h4 className="text-sm font-medium">{selectedShirtDetails?.label}</h4>
              <p className="text-xs text-gray-500">Perfect fit for any occasion.</p>
            </div>
          </div>
        </div>

        {/* Size Selection Section */}
        <SizeSelection />
      </div>
    </div>
  );
};

export default TShirtSelector;
