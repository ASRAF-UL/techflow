import React from "react";
import { X, Star, ShoppingCart } from "lucide-react";
import PropTypes from "prop-types";

function ProductDetails({ product, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
            {product.isNew && (
              <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                New
              </span>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>

            {product.rating && (
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < product.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-500 ml-2">
                  ({product.rating} stars)
                </span>
              </div>
            )}

            <p className="text-gray-600">{product.description}</p>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-blue-600">
                ${product.price}
              </span>
              {product.isSale && (
                <span className="text-xl text-gray-400 line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
              )}
            </div>

            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string,
    rating: PropTypes.number,
    isNew: PropTypes.bool,
    isSale: PropTypes.bool,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProductDetails;
