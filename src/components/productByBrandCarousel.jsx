import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductsByBrandCarousel = () => {
  const itemsPerSlide = 8;
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

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full mx-auto rounded-xl bg-light-green my-10 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products By Brand</h2>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="h-12 w-12 p-2 rounded-full shadow hover:bg-hover-green group border border-gray-300 flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 group-hover:text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="h-12 w-12 p-2 rounded-full shadow hover:bg-hover-green group border border-gray-300 flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            width: `${totalSlides * 100}%`,
            transform: `translateX(-${(currentIndex * 100) / totalSlides}%)`,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className="flex w-full"
              style={{ flex: `0 0 ${100 / totalSlides}%` }}
            >
              {products
                .slice(index * itemsPerSlide, (index + 1) * itemsPerSlide)
                .map((product) => (
                  <div
                    key={product.id}
                    className="w-1/8 p-2 text-center group" // w-1/8 = 12.5% width (8 items)
                  >
                    <div className="relative pb-[100%]">
                      {" "}
                      {/* Square container */}
                      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-green-100 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.category}
                          className="w-3/4 h-3/4 object-contain transition-transform group-hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsByBrandCarousel;
