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

  // Calculate total slides based on number of items minus 5 (show 6 at a time)
  const totalSlides = Math.max(salesItems.length - 6, 0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % (totalSlides + 1));
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + (totalSlides + 1)) % (totalSlides + 1)
    );
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [nextSlide]); // Add nextSlide as a dependency

  //   Timer to decrement time every second
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
      <div className="overflow-hidden w-full flex gap-2">
        <div className="w-full overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 6)}%)` }}
          >
            <div
              className="w-1/6 min-w-[16.666%] px-2" // Each item takes 25% width
            >
              <div className="relative h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
                <a
                  href="#"
                  className="w-full h-2/3 py-8 px-4 flex justify-center items-center overflow-hidden"
                >
                  <img
                    src="11.png"
                    alt="Product Image"
                    className="max-w-[160px] h-auto object-fit rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </a>
                <div className="w-full mt-4">
                  {/* Pricing Section */}

                  {/* Rating Section */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center text-yellow-400">
                      <FaStar size={16} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      4.8
                    </span>
                    <span className="text-sm text-gray-400">(17k)</span>
                  </div>

                  {/* Product Details */}
                  <h3 className="text-lg font-semibold text-large-text mb-2">
                    Taylor Farms Broccoli
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Florets Vegetables
                  </p>
                  <div className="flex flex-row gap-2 items-center justify-between">
                    <div className="flex items-start mb-2 flex-col">
                      <span className="ml-2 text-base text-gray-400 line-through">
                        $28.99
                      </span>
                      <div className="flex flex-row items-end gap-2">
                        <span className="text-xl font-bold text-large-text">
                          $14.99
                        </span>
                        <span className="text-sm text-gray-500">/Qty</span>
                      </div>
                    </div>
                    <button className="group text-main-green font-quick-sand flex items-center justify-center gap-2 text-[18px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] px-[15px] py-[10px] rounded-full">
                      Add
                      <LuShoppingCart
                        size={20}
                        className="text-current group-hover:text-white"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/6 min-w-[16.666%] px-2" // Each item takes 25% width
            >
              <div className="relative h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
                <a
                  href="#"
                  className="w-full h-2/3 py-8 px-4 flex justify-center items-center overflow-hidden"
                >
                  <img
                    src="22.png"
                    alt="Product Image"
                    className="max-w-[160px] h-auto object-fit rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </a>
                <div className="w-full mt-4">
                  {/* Pricing Section */}

                  {/* Rating Section */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center text-yellow-400">
                      <FaStar size={16} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      4.8
                    </span>
                    <span className="text-sm text-gray-400">(17k)</span>
                  </div>

                  {/* Product Details */}
                  <h3 className="text-lg font-semibold text-large-text mb-2">
                    Taylor Farms Broccoli
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Florets Vegetables
                  </p>
                  <div className="flex flex-row gap-2 items-center justify-between">
                    <div className="flex items-start mb-2 flex-col">
                      <span className="ml-2 text-base text-gray-400 line-through">
                        $28.99
                      </span>
                      <div className="flex flex-row items-end gap-2">
                        <span className="text-xl font-bold text-large-text">
                          $14.99
                        </span>
                        <span className="text-sm text-gray-500">/Qty</span>
                      </div>
                    </div>
                    <button className="group text-main-green font-quick-sand flex items-center justify-center gap-2 text-[18px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] px-[15px] py-[10px] rounded-full">
                      Add
                      <LuShoppingCart
                        size={20}
                        className="text-current group-hover:text-white"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/6 min-w-[16.666%] px-2" // Each item takes 25% width
            >
              <div className="relative h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
                <a
                  href="#"
                  className="w-full h-2/3 py-8 px-4 flex justify-center items-center overflow-hidden"
                >
                  <img
                    src="33.png"
                    alt="Product Image"
                    className="max-w-[160px] h-auto object-fit rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </a>
                <div className="w-full mt-4">
                  {/* Pricing Section */}

                  {/* Rating Section */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center text-yellow-400">
                      <FaStar size={16} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      4.8
                    </span>
                    <span className="text-sm text-gray-400">(17k)</span>
                  </div>

                  {/* Product Details */}
                  <h3 className="text-lg font-semibold text-large-text mb-2">
                    Taylor Farms Broccoli
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Florets Vegetables
                  </p>
                  <div className="flex flex-row gap-2 items-center justify-between">
                    <div className="flex items-start mb-2 flex-col">
                      <span className="ml-2 text-base text-gray-400 line-through">
                        $28.99
                      </span>
                      <div className="flex flex-row items-end gap-2">
                        <span className="text-xl font-bold text-large-text">
                          $14.99
                        </span>
                        <span className="text-sm text-gray-500">/Qty</span>
                      </div>
                    </div>
                    <button className="group text-main-green font-quick-sand flex items-center justify-center gap-2 text-[18px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] px-[15px] py-[10px] rounded-full">
                      Add
                      <LuShoppingCart
                        size={20}
                        className="text-current group-hover:text-white"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/6 min-w-[16.666%] px-2" // Each item takes 25% width
            >
              <div className="relative h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
                <a
                  href="#"
                  className="w-full h-2/3 py-8 px-4 flex justify-center items-center overflow-hidden"
                >
                  <img
                    src="44.png"
                    alt="Product Image"
                    className="max-w-[160px] h-auto object-fit rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </a>
                <div className="w-full mt-4">
                  {/* Pricing Section */}

                  {/* Rating Section */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center text-yellow-400">
                      <FaStar size={16} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      4.8
                    </span>
                    <span className="text-sm text-gray-400">(17k)</span>
                  </div>

                  {/* Product Details */}
                  <h3 className="text-lg font-semibold text-large-text mb-2">
                    Taylor Farms Broccoli
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Florets Vegetables
                  </p>
                  <div className="flex flex-row gap-2 items-center justify-between">
                    <div className="flex items-start mb-2 flex-col">
                      <span className="ml-2 text-base text-gray-400 line-through">
                        $28.99
                      </span>
                      <div className="flex flex-row items-end gap-2">
                        <span className="text-xl font-bold text-large-text">
                          $14.99
                        </span>
                        <span className="text-sm text-gray-500">/Qty</span>
                      </div>
                    </div>
                    <button className="group text-main-green font-quick-sand flex items-center justify-center gap-2 text-[18px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] px-[15px] py-[10px] rounded-full">
                      Add
                      <LuShoppingCart
                        size={20}
                        className="text-current group-hover:text-white"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/6 min-w-[16.666%] px-2" // Each item takes 25% width
            >
              <div className="relative h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
                <a
                  href="#"
                  className="w-full h-2/3 py-8 px-4 flex justify-center items-center overflow-hidden"
                >
                  <img
                    src="55.png"
                    alt="Product Image"
                    className="max-w-[160px] h-auto object-fit rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </a>
                <div className="w-full mt-4">
                  {/* Pricing Section */}

                  {/* Rating Section */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center text-yellow-400">
                      <FaStar size={16} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      4.8
                    </span>
                    <span className="text-sm text-gray-400">(17k)</span>
                  </div>

                  {/* Product Details */}
                  <h3 className="text-lg font-semibold text-large-text mb-2">
                    Taylor Farms Broccoli
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Florets Vegetables
                  </p>
                  <div className="flex flex-row gap-2 items-center justify-between">
                    <div className="flex items-start mb-2 flex-col">
                      <span className="ml-2 text-base text-gray-400 line-through">
                        $28.99
                      </span>
                      <div className="flex flex-row items-end gap-2">
                        <span className="text-xl font-bold text-large-text">
                          $14.99
                        </span>
                        <span className="text-sm text-gray-500">/Qty</span>
                      </div>
                    </div>
                    <button className="group text-main-green font-quick-sand flex items-center justify-center gap-2 text-[18px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] px-[15px] py-[10px] rounded-full">
                      Add
                      <LuShoppingCart
                        size={20}
                        className="text-current group-hover:text-white"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/6 min-w-[16.666%] px-2" // Each item takes 25% width
            >
              <div className="relative h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
                <a
                  href="#"
                  className="w-full h-2/3 py-8 px-4 flex justify-center items-center overflow-hidden"
                >
                  <img
                    src="6.png"
                    alt="Product Image"
                    className="max-w-[160px] h-auto object-fit rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </a>
                <div className="w-full mt-4">
                  {/* Pricing Section */}

                  {/* Rating Section */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center text-yellow-400">
                      <FaStar size={16} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      4.8
                    </span>
                    <span className="text-sm text-gray-400">(17k)</span>
                  </div>

                  {/* Product Details */}
                  <h3 className="text-lg font-semibold text-large-text mb-2">
                    Taylor Farms Broccoli
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Florets Vegetables
                  </p>
                  <div className="flex flex-row gap-2 items-center justify-between">
                    <div className="flex items-start mb-2 flex-col">
                      <span className="ml-2 text-base text-gray-400 line-through">
                        $28.99
                      </span>
                      <div className="flex flex-row items-end gap-2">
                        <span className="text-xl font-bold text-large-text">
                          $14.99
                        </span>
                        <span className="text-sm text-gray-500">/Qty</span>
                      </div>
                    </div>
                    <button className="group text-main-green font-quick-sand flex items-center justify-center gap-2 text-[18px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] px-[15px] py-[10px] rounded-full">
                      Add
                      <LuShoppingCart
                        size={20}
                        className="text-current group-hover:text-white"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/6 min-w-[16.666%] px-2" // Each item takes 25% width
            >
              <div className="relative h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
                <a
                  href="#"
                  className="w-full h-2/3 py-8 px-4 flex justify-center items-center overflow-hidden"
                >
                  <img
                    src="7.png"
                    alt="Product Image"
                    className="max-w-[160px] h-auto object-fit rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </a>
                <div className="w-full mt-4">
                  {/* Pricing Section */}

                  {/* Rating Section */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center text-yellow-400">
                      <FaStar size={16} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      4.8
                    </span>
                    <span className="text-sm text-gray-400">(17k)</span>
                  </div>

                  {/* Product Details */}
                  <h3 className="text-lg font-semibold text-large-text mb-2">
                    Taylor Farms Broccoli
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Florets Vegetables
                  </p>
                  <div className="flex flex-row gap-2 items-center justify-between">
                    <div className="flex items-start mb-2 flex-col">
                      <span className="ml-2 text-base text-gray-400 line-through">
                        $28.99
                      </span>
                      <div className="flex flex-row items-end gap-2">
                        <span className="text-xl font-bold text-large-text">
                          $14.99
                        </span>
                        <span className="text-sm text-gray-500">/Qty</span>
                      </div>
                    </div>
                    <button className="group text-main-green font-quick-sand flex items-center justify-center gap-2 text-[18px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] px-[15px] py-[10px] rounded-full">
                      Add
                      <LuShoppingCart
                        size={20}
                        className="text-current group-hover:text-white"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/6 min-w-[16.666%] px-2" // Each item takes 25% width
            >
              <div className="relative h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
                <a
                  href="#"
                  className="w-full h-2/3 py-8 px-4 flex justify-center items-center overflow-hidden"
                >
                  <img
                    src="3.png"
                    alt="Product Image"
                    className="max-w-[160px] h-auto object-fit rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </a>
                <div className="w-full mt-4">
                  {/* Pricing Section */}

                  {/* Rating Section */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center text-yellow-400">
                      <FaStar size={16} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      4.8
                    </span>
                    <span className="text-sm text-gray-400">(17k)</span>
                  </div>

                  {/* Product Details */}
                  <h3 className="text-lg font-semibold text-large-text mb-2">
                    Taylor Farms Broccoli
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Florets Vegetables
                  </p>
                  <div className="flex flex-row gap-2 items-center justify-between">
                    <div className="flex items-start mb-2 flex-col">
                      <span className="ml-2 text-base text-gray-400 line-through">
                        $28.99
                      </span>
                      <div className="flex flex-row items-end gap-2">
                        <span className="text-xl font-bold text-large-text">
                          $14.99
                        </span>
                        <span className="text-sm text-gray-500">/Qty</span>
                      </div>
                    </div>
                    <button className="group text-main-green font-quick-sand flex items-center justify-center gap-2 text-[18px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] px-[15px] py-[10px] rounded-full">
                      Add
                      <LuShoppingCart
                        size={20}
                        className="text-current group-hover:text-white"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/6 min-w-[16.666%] px-2" // Each item takes 25% width
            >
              <div className="relative h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
                <a
                  href="#"
                  className="w-full h-2/3 py-8 px-4 flex justify-center items-center overflow-hidden"
                >
                  <img
                    src="5.png"
                    alt="Product Image"
                    className="max-w-[160px] h-auto object-fit rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </a>
                <div className="w-full mt-4">
                  {/* Pricing Section */}

                  {/* Rating Section */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center text-yellow-400">
                      <FaStar size={16} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      4.8
                    </span>
                    <span className="text-sm text-gray-400">(17k)</span>
                  </div>

                  {/* Product Details */}
                  <h3 className="text-lg font-semibold text-large-text mb-2">
                    Taylor Farms Broccoli
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Florets Vegetables
                  </p>
                  <div className="flex flex-row gap-2 items-center justify-between">
                    <div className="flex items-start mb-2 flex-col">
                      <span className="ml-2 text-base text-gray-400 line-through">
                        $28.99
                      </span>
                      <div className="flex flex-row items-end gap-2">
                        <span className="text-xl font-bold text-large-text">
                          $14.99
                        </span>
                        <span className="text-sm text-gray-500">/Qty</span>
                      </div>
                    </div>
                    <button className="group text-main-green font-quick-sand flex items-center justify-center gap-2 text-[18px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] px-[15px] py-[10px] rounded-full">
                      Add
                      <LuShoppingCart
                        size={20}
                        className="text-current group-hover:text-white"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-1/6 min-w-[16.666%] px-2" // Each item takes 25% width
            >
              <div className="relative h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
                <a
                  href="#"
                  className="w-full h-2/3 py-8 px-4 flex justify-center items-center overflow-hidden"
                >
                  <img
                    src="4.png"
                    alt="Product Image"
                    className="max-w-[160px] h-auto object-fit rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </a>
                <div className="w-full mt-4">
                  {/* Pricing Section */}

                  {/* Rating Section */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center text-yellow-400">
                      <FaStar size={16} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      4.8
                    </span>
                    <span className="text-sm text-gray-400">(17k)</span>
                  </div>

                  {/* Product Details */}
                  <h3 className="text-lg font-semibold text-large-text mb-2">
                    Taylor Farms Broccoli
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Florets Vegetables
                  </p>
                  <div className="flex flex-row gap-2 items-center justify-between">
                    <div className="flex items-start mb-2 flex-col">
                      <span className="ml-2 text-base text-gray-400 line-through">
                        $28.99
                      </span>
                      <div className="flex flex-row items-end gap-2">
                        <span className="text-xl font-bold text-large-text">
                          $14.99
                        </span>
                        <span className="text-sm text-gray-500">/Qty</span>
                      </div>
                    </div>
                    <button className="group text-main-green font-quick-sand flex items-center justify-center gap-2 text-[18px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] px-[15px] py-[10px] rounded-full">
                      Add
                      <LuShoppingCart
                        size={20}
                        className="text-current group-hover:text-white"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
