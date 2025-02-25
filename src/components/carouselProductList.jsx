import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const CarouselProductList = () => {
  const itemsPerSlide = 8; // Exactly 10 items per slide
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    { id: 1, image: "1.png", category: "Category 01", quantity: 125 },
    { id: 2, image: "2.png", category: "Category 02", quantity: 125 },
    { id: 3, image: "3.png", category: "Category 03", quantity: 125 },
    { id: 4, image: "4.png", category: "Category 04", quantity: 125 },
    { id: 5, image: "5.png", category: "Category 05", quantity: 125 },
    { id: 6, image: "6.png", category: "Category 06", quantity: 125 },
    { id: 7, image: "7.png", category: "Category 07", quantity: 125 },
    { id: 8, image: "1.png", category: "Category 08", quantity: 125 },
    { id: 9, image: "2.png", category: "Category 09", quantity: 125 },
    { id: 10, image: "3.png", category: "Category 10", quantity: 125 },
    { id: 11, image: "4.png", category: "Category 11", quantity: 125 },
    { id: 12, image: "5.png", category: "Category 12", quantity: 125 },
    { id: 13, image: "6.png", category: "Category 13", quantity: 125 },
    { id: 14, image: "1.png", category: "Category 14", quantity: 125 },
    { id: 15, image: "3.png", category: "Category 15", quantity: 125 },
    { id: 16, image: "5.png", category: "Category 16", quantity: 125 },
    { id: 17, image: "1.png", category: "Category 17", quantity: 125 },
    { id: 18, image: "2.png", category: "Category 18", quantity: 125 },
    { id: 19, image: "3.png", category: "Category 19", quantity: 125 },
    { id: 20, image: "4.png", category: "Category 20", quantity: 125 },
    { id: 21, image: "5.png", category: "Category 21", quantity: 125 },
    { id: 22, image: "6.png", category: "Category 22", quantity: 125 },
    { id: 23, image: "7.png", category: "Category 23", quantity: 125 },
    { id: 24, image: "1.png", category: "Category 24", quantity: 125 },
  ];

  const totalSlides = Math.ceil(products.length / itemsPerSlide);

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
                <div
                  key={product.id}
                  className="w-[203px] h-[222px] p-4 text-center carousel-item group"
                >
                  <div className="h-[153px] w-[153px] flex items-center justify-center rounded-full bg-carousel-green mx-auto overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.category}
                      className="h-auto transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                  </div>
                  <h2 className="text-sm font-semibold hover:text-hover-green">
                    {product.category}
                  </h2>
                  <span className="text-gray-500 text-xs">
                    {product.quantity}+ products
                  </span>
                </div>
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
