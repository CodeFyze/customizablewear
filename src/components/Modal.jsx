import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("In Stock");
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    if (initialData) {
      setProductTitle(initialData.title);
      setProductPrice(initialData.price);
      setProductStock(initialData.stock);
      setProductImages(initialData.images || []);
    } else {
      setProductTitle("");
      setProductPrice("");
      setProductStock("In Stock");
      setProductImages([]);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (productImages.length + files.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }
    setProductImages(files);
  };

  const removeImage = (index) => {
    setProductImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productImages.length === 0) {
      alert("Please upload at least one product image!");
      return;
    }
    onSubmit({
      title: productTitle,
      price: productPrice,
      stock: productStock,
      images: productImages,
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
            <label className="block text-gray-700 font-medium mb-2">Product Images (Max 5)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
            <div className="grid grid-cols-3 gap-2">
              {productImages.map((image, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img src={image} alt={`Product ${index}`} className="w-full h-full object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                  >
                    x
                  </button>
                </div>
              ))}
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