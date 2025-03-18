import React from "react";
import { ShoppingCart } from "lucide-react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";

function ProductCard({ product, onClick }) {
  console.log("Product==>:", product)
  return (
    <Link
      to={{
        pathname: `/product/${product.id}`
      }}
      className="w-full bg-white h-[520px] border border-border-gray rounded-2xl hover:border-main-orange transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md"
    >
      <span className="absolute z-10 top-4 left-4 text-white text-sm font-semibold bg-red-500 rounded-tl-full rounded-br-full h-8 px-4 flex items-center justify-center">
        Sale 50%
      </span>
      <div className="w-full h-[232px] flex justify-center items-center overflow-hidden bg-border-gray rounded-xl">
        <img
          src={`https://adminecommerce.resnova.dev/${product.productImageFront}`}
          alt="Product Image"
          className="w-full h-auto object-fit rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>
      <div className="w-full mt-4">
        <h3 className="text-lg font-semibold text-large-text mb-2">
          {product.productName}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center text-yellow-400">
            <FaStar size={16} />
          </div>
          <span className="text-sm font-medium text-gray-700">4.8</span>
          <span className="text-sm text-gray-400">(17k)</span>
        </div>
        <div className="w-full mb-2">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div className="bg-main-green h-1 rounded-full w-3/4"></div>
          </div>
          <div className="flex justify-between text-sm text-large-text mb-1">
            <span>Sold: 30/40</span>
          </div>
        </div>
        <div className="flex items-end gap-2 m-2">
          <span className="text-2xl font-bold text-large-text">$14.99</span>
          <span className="text-sm text-gray-500">/Qty</span>
          <span className="ml-2 text-base text-gray-400 line-through">
            $28.99
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
        <button className="group text-large-text font-quick-sand text-[16px] flex items-center justify-center gap-2 text-[16px] bg-border-gray hover:bg-main-orange hover:text-white font-semibold h-[43px] w-full px-[24px] py-[13px] rounded-lg">
          Add To Cart
          <LuShoppingCart
            size={20}
            className="text-current group-hover:text-white"
          />
        </button>
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    isNew: PropTypes.bool,
    isSale: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ProductCard;