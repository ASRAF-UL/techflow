import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle the previous slide
  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  // Handle the next slide
  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="relative w-full mx-auto flex items-center justify-center h-full">
      <div className="w-[calc(84%)] rounded-lg flex flex-row justify-between">
        <div>
          <h1 className="text-[72px] font-quick-sand text-large-text font-semibold pb-[60px] leading-[1]">
            Daily product Order and get express delivery
          </h1>
          <button className="text-white flex items-center gap-2 text-[16px] bg-main-green hover:bg-hover-green font-semibold h-[48px] px-[24px] py-[13px] rounded-full">
            Explore Shop
            <LuShoppingCart size={18} color="white" />
          </button>
        </div>
        <img
          src={images[currentIndex]}
          alt="carousel"
          className="max-w-[560px] h-auto transition-transform duration-500 ease-in-out"
        />
      </div>

      <button
        onClick={prevSlide}
        className="h-12 w-12 absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl bg-white hover:bg-main-green bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-75 group"
      >
        <IoIosArrowBack
          size={18}
          className="text-black group-hover:text-white"
        />
      </button>

      <button
        onClick={nextSlide}
        className="h-12 w-12 absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl bg-white hover:bg-main-green bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-75 group"
      >
        <IoIosArrowForward
          size={18}
          className="text-black group-hover:text-white"
        />
      </button>
    </div>
  );
};

export default Carousel;
