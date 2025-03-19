import React, { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const CarouselProductList = () => {
  const itemsPerSlide = 8; // Exactly 10 items per slide
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalSlides = Math.ceil(products.length / itemsPerSlide);
  // Add this useEffect for fetching products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://adminecommerce.resnova.dev/api/productList"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data); // Assuming the API returns data in a 'data' property
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  // Previous Slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  // Next Slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel Wrapper */}
      <div
        className="flex transition-transform duration-500 ease-in-out items-center"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${totalSlides * 100}%`,
        }}
      >
        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
          <div key={slideIndex} className="flex w-full flex-shrink-0">
            {products
              .slice(
                slideIndex * itemsPerSlide,
                (slideIndex + 1) * itemsPerSlide
              )
              .map((product) => (
                <Link
                  to={{
                    pathname: `/product/${product.productName}`,
                  }}
                  key={product.id}
                  className="w-[203px] h-[222px] p-4 text-center carousel-item group"
                >
                  <div className="h-[153px] w-[153px] flex items-center justify-center rounded-full bg-carousel-green mx-auto overflow-hidden">
                    <img
                      src={`https://adminecommerce.resnova.dev/${product.productImageFront}`}
                      alt={product.productName}
                      className="h-auto transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                  </div>
                  <h2 className="text-sm font-semibold hover:text-hover-green">
                    {product.categoryName}
                  </h2>
                  <span className="text-gray-500 text-xs">300 products</span>
                </Link>
              ))}
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="h-10 w-10 absolute top-1/2 left-2 transform -translate-y-1/2 bg-white hover:bg-hover-green bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-75 group border border-gray-300"
      >
        <IoIosArrowBack
          size={16}
          className="text-black group-hover:text-white"
        />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="h-10 w-10 absolute top-1/2 right-2 transform -translate-y-1/2 bg-white hover:bg-hover-green bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-75 group border border-gray-300"
      >
        <IoIosArrowForward
          size={16}
          className="text-black group-hover:text-white"
        />
      </button>
    </div>
  );
};

export default CarouselProductList;
