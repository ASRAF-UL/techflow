import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";

const initialSalesItems = [
  {
    image: "1.png",
    title: "Daily Snacks",
    bgColor: "bg-card-100",
    days: 308,
    hours: 7,
    minutes: 47,
    seconds: 31,
  },
  {
    image: "2.png",
    title: "Fresh Vegetables",
    bgColor: "bg-card-200",
    days: 308,
    hours: 7,
    minutes: 47,
    seconds: 31,
  },
  {
    image: "3.png",
    title: "Bakery Items",
    bgColor: "bg-card-300",
    days: 308,
    hours: 7,
    minutes: 47,
    seconds: 31,
  },
  {
    image: "4.png",
    title: "Dairy Products",
    bgColor: "bg-card-400",
    days: 308,
    hours: 7,
    minutes: 47,
    seconds: 31,
  },
  {
    image: "5.png",
    title: "Bakery Items",
    bgColor: "bg-card-100",
    days: 308,
    hours: 7,
    minutes: 47,
    seconds: 31,
  },
  {
    image: "6.png",
    title: "Dairy Products",
    bgColor: "bg-card-200",
    days: 308,
    hours: 7,
    minutes: 47,
    seconds: 31,
  },
  {
    image: "7.png",
    title: "Bakery Items",
    bgColor: "bg-card-300",
    days: 308,
    hours: 7,
    minutes: 47,
    seconds: 31,
  },
  {
    image: "1.png",
    title: "Dairy Products",
    bgColor: "bg-card-400",
    days: 308,
    hours: 7,
    minutes: 47,
    seconds: 31,
  },
];

export default function FlashSalesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [salesItems, setSalesItems] = useState(initialSalesItems);

  const totalSlides = Math.ceil(salesItems.length / 2); // Since we show 2 items per slide

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [nextSlide]); // Add nextSlide as a dependency

  // Timer to decrement time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setSalesItems((prevItems) =>
        prevItems.map((item) => {
          let { days, hours, minutes, seconds } = item;

          if (seconds > 0) seconds--;
          else {
            seconds = 59;
            if (minutes > 0) minutes--;
            else {
              minutes = 59;
              if (hours > 0) hours--;
              else {
                hours = 23;
                if (days > 0) days--;
              }
            }
          }

          return { ...item, days, hours, minutes, seconds };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full px-[7%] py-4">
      {/* Heading with navigation buttons */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Flash Sales Today</h2>
        <div className="flex gap-4 items-center">
          <a className="text-dark-black font-semibold hover:text-main-green hover:underline">
            View All Deals
          </a>
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

      {/* Carousel Container */}
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {/* Grouping items into pairs of 2 */}
          {Array.from({ length: totalSlides }, (_, i) => (
            <div
              key={i}
              className="flex w-full flex-shrink-0 justify-between h-[250px]"
            >
              {salesItems.slice(i * 2, i * 2 + 2).map((item, index) => (
                <div key={index} className="w-1/2 px-2 h-full">
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
          ))}
        </div>
      </div>
    </div>
  );
}
