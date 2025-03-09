import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaStar,
} from "react-icons/fa";

const initialSalesItems = [
  {
    image: "Slider.png",
    title: "Daily Snacks",
    color: "main-purple",
  },
  {
    image: "Slider.png",
    title: "Fresh Vegetables",
    color: "bg-card-200",
  },
  {
    image: "4.png",
    title: "Bakery Items",
    color: "bg-card-300",
  },
];

export default function HomeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [salesItems, setSalesItems] = useState(initialSalesItems);

  const totalSlides = salesItems.length; // One item per slide

  const nextSlide = useCallback(() => {
    console.log("Carousel is clicked!");
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="min-h-[calc(100vh-150px)] max-h-full w-full bg-[#EFF2F7]">
      {/* Carousel Container */}
      <div className="overflow-hidden w-full relative">
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between z-20 items-center">
          <button
            onClick={prevSlide}
            className="group h-[160px] w-12 p-2 group flex items-center justify-center bg-white"
          >
            <FaLongArrowAltLeft className="w-20 h-9 text-icon-gray group-hover:text-large-text cursor-pointer transform translate-x-5" />
          </button>
          <button
            onClick={nextSlide}
            className="group h-[160px] w-12 p-2 flex items-center justify-center bg-white"
          >
            <FaLongArrowAltRight className="w-20 h-9 text-icon-gray group-hover:text-large-text cursor-pointer transform -translate-x-5" />
          </button>
        </div>
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-center items-center z-5 pointer-events-none">
          <h1 className="nike-shoes">NIKE SHOES</h1>
        </div>
        <div className="relative z-10 w-full min-h-[calc(100vh-150px)]">
          {salesItems.map((item, i) => (
            <div
              key={i}
              className="transition-opacity duration-100 ease-in-out absolute inset-0"
              style={{
                opacity: i === currentIndex ? 1 : 0,
                pointerEvents: i === currentIndex ? "auto" : "none",
              }}
            >
              <div
                className={`min-h-[calc(100vh-150px)] w-full flex flex-col items-center gap-4 px-[7%]`}
              >
                <div className="w-full flex flex-col pt-[2%]">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <h1 className={`text-[30px] text-main-purple font-[700]`}>
                        Suggestion Product
                      </h1>
                      <h2 className={`text-[20px] text-large-text font-[600]`}>
                        Our Collection
                      </h2>
                      <div className="bg-white w-[300px] h-[93px] p-[10px] mt-[25px] flex flex-row gap-2 items-center">
                        <div className="w-2/5 h-full flex items-center p-2">
                          <img
                            src="Slider.png"
                            alt="slider"
                            className="w-full h-auto object-fit rounded"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-main-purple text-[16px] font-[500] font-quick-sand">
                            $49.00
                          </h3>
                          <h3 className="text-large-text text-[20px] font-[600] font-quick-sand">
                            Nike Shoes
                          </h3>
                          <div className="flex flex-row items-center gap-1">
                            <FaStar size={16} color="orange" />
                            <FaStar size={16} color="orange" />
                            <FaStar size={16} color="orange" />
                            <FaStar size={16} color="gray" />
                            <FaStar size={16} color="gray" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex flex-row gap-8">
                        <a
                          href="#"
                          className="flex flex-row gap-2 items-center"
                        >
                          <img src="fb.png" alt="fb" />
                          <span className="text-large-text text-[18px] font-[400] font-quick-sand">
                            Facebook
                          </span>
                        </a>
                        <a
                          href="#"
                          className="flex flex-row gap-2 items-center"
                        >
                          <img src="twt.png" alt="fb" />
                          <span className="text-large-text text-[18px] font-[400] font-quick-sand">
                            Facebook
                          </span>
                        </a>
                        <a
                          href="#"
                          className="flex flex-row gap-2 items-center"
                        >
                          <img src="insta.png" alt="fb" />
                          <span className="text-large-text text-[18px] font-[400] font-quick-sand">
                            Facebook
                          </span>
                        </a>
                      </div>
                      <h4 className="text-large-text text-[25px] font-[700] font-quick-sand mt-[25px]">
                        New Festival Offer
                      </h4>
                      <span className="rounded bg-main-purple text-[14px] font-[500] font-quick-sand text-white text-center px-5 py-2 cursor-pointer max-w-[100px]">
                        90% Off
                      </span>
                    </div>
                  </div>
                </div>
                <div className="main-circle"></div>
                <img
                  src={item.image}
                  alt="slider image"
                  className="main-slider-image"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
