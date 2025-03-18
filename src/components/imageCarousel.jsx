import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ImageSlider = ({ product }) => {
  const images = [
    `https://adminecommerce.resnova.dev/${product.productImageFront}`,
    `https://adminecommerce.resnova.dev/${product.productImageFBack}`,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full mx-auto">
      <div className="w-full h-auto aspect-square overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-gray-400">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-fit"
        />
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

export default ImageSlider;
