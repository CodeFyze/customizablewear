import  { useState, useEffect } from "react";
import PropTypes from "prop-types";
const Modal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("In Stock");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [sideImage, setSideImage] = useState(null);
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (initialData) {
      setProductTitle(initialData.title);
      setProductPrice(initialData.price);
      setProductStock(initialData.stock);
      setFrontImage(initialData.images?.front || null);
      setBackImage(initialData.images?.back || null);
      setSideImage(initialData.images?.side || null);
      setColors(initialData.colors || []);
      setImages(initialData.images?.extra || []);
    } else {
      setProductTitle("");
      setProductPrice("");
      setProductStock("In Stock");
      setFrontImage(null);
      setBackImage(null);
      setSideImage(null);
      setColors([]);
      setImages([]);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "front") setFrontImage(file);
    if (type === "back") setBackImage(file);
    if (type === "side") setSideImage(file);
  };

  const handleExtraImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 10) {
      alert("You can upload up to 10 additional images only.");
      return;
    }
    setImages([...images, ...files]);
  };

  const removeExtraImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addColor = () => {
    setColors([...colors, ""]);
  };

  const removeColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const updateColor = (index, value) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!frontImage || !backImage || !sideImage) {
      alert("Please upload all three main images (front, back, side)!");
      return;
    }
    
    onSubmit({
      title: productTitle,
      price: productPrice,
      stock: productStock,
      front: frontImage,
      back: backImage,
      side: sideImage,
      images: images,
      colors: colors.filter((color) => color.trim() !== ""),
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-scroll">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Update Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Product Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Price</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>

          {/* Stock Status */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Stock Status</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          {/* Main Images */}
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

          {/* Additional Images */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Additional Images (Max 10)
            </label>
            <input type="file" accept="image/*" multiple onChange={handleExtraImagesChange} />
            <div className="flex flex-wrap mt-2">
              {images.map((img, index) => (
                <div key={index} className="relative w-16 h-16 m-1">
                  <img src={URL.createObjectURL(img)} alt="extra" className="w-full h-full object-cover rounded" />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full p-1"
                    onClick={() => removeExtraImage(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Available Colors</label>
            {colors.map((color, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => updateColor(index, e.target.value)}
                  className="w-10 h-10 border rounded"
                />
                <button
                  type="button"
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  onClick={() => removeColor(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="bg-green-500 text-white px-3 py-1 rounded mt-2"
              onClick={addColor}
            >
              Add Color
            </button>
          </div>

          {/* Buttons */}
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded mr-2">
              Cancel
            </button>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
              {initialData ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stock: PropTypes.string,
    images: PropTypes.shape({
      front: PropTypes.any,
      back: PropTypes.any,
      side: PropTypes.any,
      extra: PropTypes.arrayOf(PropTypes.any),
    }),
    colors: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default Modal;
