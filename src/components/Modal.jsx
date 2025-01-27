import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("In Stock");
  const [productImage, setProductImage] = useState(null);
  const [imageLabel, setImageLabel] = useState("Choose File");

  useEffect(() => {
    if (initialData) {
      setProductName(initialData.name);
      setProductPrice(initialData.price);
      setProductStock(initialData.stock);
      setProductImage(initialData.image);
      setImageLabel("Product Image Added");
    } else {
      setProductName("");
      setProductPrice("");
      setProductStock("In Stock");
      setProductImage(null);
      setImageLabel("Choose File");
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(URL.createObjectURL(file)); // Convert the file to a URL
      setImageLabel("Product Image Added");
    } else {
      setProductImage(null);
      setImageLabel("Choose File");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productImage) {
      alert("Please upload a product image!");
      return;
    }
    onSubmit({
      name: productName,
      price: productPrice,
      stock: productStock,
      image: productImage, // Pass the image URL
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Update Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="text"
              id="price"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="stock">
              Stock Status
            </label>
            <select
              id="stock"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="image">
              Product Image
            </label>
            <div className="flex items-center">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                {imageLabel}
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              {initialData ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
