import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";

const initialSalesItems = [
  /* ... (keep the same as original) ... */
];

export default function HomeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [salesItems, setSalesItems] = useState(initialSalesItems);

  const totalSlides = salesItems.length; // One item per slide

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-slide interval (keep same as original)
  useEffect(() => {
    /* ... */
  }, [nextSlide]);

  // Timer effect (keep same as original)
  useEffect(() => {
    /* ... */
  }, []);

  return (
    <div className="w-full px-[7%] py-4">
      {/* Heading with navigation buttons (keep same as original) */}

      {/* Carousel Container */}
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {salesItems.map((item, i) => (
            <div key={i} className="w-full flex-shrink-0 h-[250px] px-2">
              <div
                className={`h-full w-full p-6 rounded-[20px] ${item.bgColor} flex flex-row items-center text-center parent-div-bg gap-4`}
              >
                <div className="w-2/5 p-4 flex items-center justify-center h-full">
                  <img
                    src={item.image}
                    alt="img"
                    className="max-w-full h-full object-fit rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-2 mt-2 flex-start items-start">
                  <h1 className="text-[24px] font-quick-sand text-large-text font-bold mb-[16px] leading-[1.5] text-center">
                    {item.title}
                  </h1>
                  <div className="flex gap-2">
                    <span className="bg-white px-3 py-1 rounded shadow">
                      {item.days} Days
                    </span>
                    <span className="bg-white px-3 py-1 rounded shadow">
                      {item.hours} Hours
                    </span>
                    <span className="bg-white px-3 py-1 rounded shadow">
                      {item.minutes} Min
                    </span>
                    <span className="bg-white px-3 py-1 rounded shadow">
                      {item.seconds} Sec
                    </span>
                  </div>
                  <button className="text-white flex items-center gap-2 text-[16px] bg-main-green hover:bg-hover-green font-semibold h-[48px] px-[24px] py-[13px] rounded-full mt-[24px] max-w-1/2">
                    Shop Now
                    <FaArrowRightLong size={18} color="white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
