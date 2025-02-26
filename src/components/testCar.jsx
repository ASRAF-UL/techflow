import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { FaStar } from "react-icons/fa";

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

export default function TestCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [salesItems, setSalesItems] = useState(initialSalesItems);

  const products = [
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
    {
      name: "P 1"
    },
  ]

  // Calculate total slides based on number of items
  const totalSlides = salesItems.length;


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
    }, 3000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [nextSlide]);

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
    <div className="w-1/4 px-[7%] py-4">
      {/* Heading with navigation buttons */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Organic Food</h2>
        <div className="flex gap-4 items-center">
          <a className="text-dark-black font-semibold hover:text-main-green hover:underline">
            All Categories
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
        <div className="w-full overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {salesItems.map((item, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0"
              >
                <div className={`${item.bgColor} p-6 rounded-lg`}>
                  <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-lg" />
                  <h3 className="text-xl font-bold mt-4">{item.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-400" />
                      <span>4.5</span>
                    </div>
                    <button className="p-2 rounded-full bg-main-green hover:bg-hover-green text-white">
                      <LuShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm">Time Left:</p>
                    <div className="flex gap-2">
                      <span>{item.days}d</span>
                      <span>{item.hours}h</span>
                      <span>{item.minutes}m</span>
                      <span>{item.seconds}s</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}