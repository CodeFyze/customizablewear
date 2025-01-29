import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("In Stock");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [sideImage, setSideImage] = useState(null);

  useEffect(() => {
    if (initialData) {
      setProductTitle(initialData.title);
      setProductPrice(initialData.price);
      setProductStock(initialData.stock);
      setFrontImage(initialData.images?.front || null);
      setBackImage(initialData.images?.back || null);
      setSideImage(initialData.images?.side || null);
    } else {
      setProductTitle("");
      setProductPrice("");
      setProductStock("In Stock");
      setFrontImage(null);
      setBackImage(null);
      setSideImage(null);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleImageChange = (e, position) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (position === "front") setFrontImage(file);
    if (position === "back") setBackImage(file);
    if (position === "side") setSideImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!frontImage || !backImage || !sideImage) {
      alert("Please upload all three product images!");
      return;
    }
    
    onSubmit({
      title: productTitle,
      price: productPrice,
      stock: productStock,
      front: frontImage,
      back: backImage,
      side: sideImage
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
            <label className="block text-gray-700 font-medium mb-2">Product Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Price</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Stock Status</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Front Image</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "front")} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Back Image</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "back")} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Side Image</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "side")} />
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