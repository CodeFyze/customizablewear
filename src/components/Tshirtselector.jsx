import { useEffect, useState } from "react";
import SizeSelection from "./SizeSelection";

const TShirtSelector = () => {
  const [selectedShirt, setSelectedShirt] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [product, setProduct] = useState(null);

  const handleShirtChange = (shirt) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedShirt(shirt);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/name/T-Shirt", {
          credentials: 'include',
          method: "GET",
        });
        const data = await response.json();
        setProduct(data.product);
        setSelectedShirt(data.product?.frontImage);
        console.log(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-x-8 md:space-y-0">
      {/* Main Shirt Display */}
      <div className="w-full flex justify-center">
        {selectedShirt && (
          <img
            src={selectedShirt}
            alt="Selected T-Shirt"
            className={`w-full h-auto sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[500px] lg:w-[672px] lg:h-[672px] p-4 md:p-0 transform transition-transform duration-200 ${isAnimating ? "scale-75 opacity-50" : "scale-100 opacity-100"} object-cover`}
          />
        )}
      </div>

      {/* Right-Side Section */}
      <div className="w-full md:w-1/3 md:pr-10">
        {/* Shirt Image Scroller */}
        <div className="mt-4 font-medium text-lg text-center md:text-left">Shirt Images</div>
        <div className="overflow-x-auto flex space-x-2 mt-4 p-2">
          {product?.images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`T-Shirt View ${index + 1}`}
              className="w-24 h-24 object-cover rounded-md cursor-pointer border border-gray-300 hover:border-orange-500"
              onClick={() => handleShirtChange(image)}
            />
          ))}
        </div>

        {/* Shirt Selector */}
        <div className="mt-4 font-medium text-lg text-center md:text-left">
          Select Your T-Shirt View
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 p-2">
          {product && (
            [product.frontImage, product.sideImage, product.backImage].map((image, index) => (
              <div
                key={index}
                onClick={() => handleShirtChange(image)}
                className={`cursor-pointer w-full h-32 p-2 text-center transform transition-transform duration-300 ${selectedShirt === image ? "scale-105 outline outline-2 outline-orange-500" : ""}`}
              >
                <img
                  src={image}
                  alt={`T-Shirt View ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md"
                />
              </div>
            ))
          )}
        </div>

        {/* Color Picker */}
        <div className="mt-6 font-medium text-lg text-center md:text-left">Select Color</div>
        <div className="flex space-x-2 mt-4">
          {product?.colors?.map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer hover:border-orange-500"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>

        {/* Shirt Details Section */}
        <div className="mt-6 p-4 md:mb-3">
          <h3 className="text-lg font-bold mb-2">Shirt Details</h3>
          <p className="text-sm text-gray-700">{product?.description || "No description available."}</p>
          <p className="text-sm font-bold mt-2">Price: Rs. {product?.price}</p>
        </div>

        {/* Size Selection Section */}
        <SizeSelection />
      </div>
    </div>
  );
};

export default TShirtSelector;
