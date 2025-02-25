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

export default function HotDealsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [salesItems, setSalesItems] = useState(initialSalesItems);

  // Calculate total slides based on number of items minus 3 (since we show 4 at a time)
  const totalSlides = Math.max(salesItems.length - 3, 0);

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
        <h2 className="text-2xl font-bold">Hot Deals Todays</h2>
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
      <div className="overflow-hidden w-full flex gap-2">
        <div className="w-2/6 h-[460px] rounded-2xl bg-main-green relative flex flex-col z-10 items-center">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundImage: "url(offer_bg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.06, // Image opacity at 10%
            }}
          ></div>
          <div className="flex items-center justify-center h-1/3 m-4 p-4">
            <img
              src="2.png"
              alt="img"
              className="max-w-1/2 h-auto object-fit rounded-lg"
            />
          </div>
          <div className="relative flex flex-col gap-8 mt-4 items-center">
            <h1 className="text-[34px] font-quick-sand text-white font-bold leading-[1] text-center">
              Fresh Vegetables
            </h1>
            <div className="flex gap-2 items-center justify-center">
              <div className="flex gap-2">
                <span className="bg-white px-3 py-2 rounded shadow">
                  308 Days
                </span>
                <span className="bg-white px-3 py-2 rounded shadow">
                  78 Hours
                </span>
                <span className="bg-white px-3 py-2 rounded shadow">
                  65 Min
                </span>
                <span className="bg-white px-3 py-2 rounded shadow">
                  43 Sec
                </span>
              </div>
            </div>
            <button className="text-white flex justify-center items-center gap-3 text-[16px] bg-orange-500 hover:bg-orange-600 text-gray-900 hover:text-white font-semibold h-12 px-6 py-3.5 rounded-full mt-6 max-w-[50%] transition-colors duration-200">
              Shop Now
              <FaArrowRightLong size={18} color="white" />
            </button>
          </div>
        </div>
        <div className="w-4/6 overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 25}%)` }}
          >
            <div
              className="w-1/4 min-w-[25%] px-2" // Each item takes 25% width
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
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-2xl font-bold text-large-text">
                      $14.99
                    </span>
                    <span className="text-sm text-gray-500">/Qty</span>
                    <span className="ml-2 text-base text-gray-400 line-through">
                      $28.99
                    </span>
                  </div>

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
                  {/* Progress Bar */}
                  <button className="group text-main-green font-quick-sand text-[16px] flex items-center justify-center gap-2 text-[16px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] w-full px-[24px] py-[13px] rounded-full">
                    Add To Cart
                    <LuShoppingCart
                      size={20}
                      className="text-current group-hover:text-white"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div
              className="w-1/4 min-w-[25%] px-2" // Each item takes 25% width
            >
              <div className="relative h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
                <span className="absolute z-10 top-4 left-4 text-white text-sm font-semibold bg-red-500 rounded-tl-full rounded-br-full h-8 px-4 flex items-center justify-center">
                  Sale 50%
                </span>
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
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-2xl font-bold text-large-text">
                      $14.99
                    </span>
                    <span className="text-sm text-gray-500">/Qty</span>
                    <span className="ml-2 text-base text-gray-400 line-through">
                      $28.99
                    </span>
                  </div>

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
                  {/* Progress Bar */}
                  <button className="group text-main-green font-quick-sand text-[16px] flex items-center justify-center gap-2 text-[16px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] w-full px-[24px] py-[13px] rounded-full">
                    Add To Cart
                    <LuShoppingCart
                      size={20}
                      className="text-current group-hover:text-white"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div
              className="w-1/4 min-w-[25%] px-2" // Each item takes 25% width
            >
              <div className="relative h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
                <span className="absolute z-10 top-4 left-4 text-white text-sm font-semibold bg-blue-800 rounded-tl-full rounded-br-full h-8 px-4 flex items-center justify-center">
                  Best Sale
                </span>
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
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-2xl font-bold text-large-text">
                      $14.99
                    </span>
                    <span className="text-sm text-gray-500">/Qty</span>
                    <span className="ml-2 text-base text-gray-400 line-through">
                      $28.99
                    </span>
                  </div>

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
                  {/* Progress Bar */}
                  <button className="group text-main-green font-quick-sand text-[16px] flex items-center justify-center gap-2 text-[16px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] w-full px-[24px] py-[13px] rounded-full">
                    Add To Cart
                    <LuShoppingCart
                      size={20}
                      className="text-current group-hover:text-white"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div
              className="w-1/4 min-w-[25%] px-2" // Each item takes 25% width
            >
              <div className="relative h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
                <span className="absolute z-10 top-4 left-4 text-white text-sm font-semibold bg-orange-400 rounded-tl-full rounded-br-full h-8 px-4 flex items-center justify-center">
                  New
                </span>
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
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-2xl font-bold text-large-text">
                      $14.99
                    </span>
                    <span className="text-sm text-gray-500">/Qty</span>
                    <span className="ml-2 text-base text-gray-400 line-through">
                      $28.99
                    </span>
                  </div>

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
                  {/* Progress Bar */}
                  <button className="group text-main-green font-quick-sand text-[16px] flex items-center justify-center gap-2 text-[16px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] w-full px-[24px] py-[13px] rounded-full">
                    Add To Cart
                    <LuShoppingCart
                      size={20}
                      className="text-current group-hover:text-white"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div
              className="w-1/4 min-w-[25%] px-2" // Each item takes 25% width
            >
              <div className="relative h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
                <span className="absolute z-10 top-4 left-4 text-white text-sm font-semibold bg-red-500 rounded-tl-full rounded-br-full h-8 px-4 flex items-center justify-center">
                  Sale 50%
                </span>
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
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-2xl font-bold text-large-text">
                      $14.99
                    </span>
                    <span className="text-sm text-gray-500">/Qty</span>
                    <span className="ml-2 text-base text-gray-400 line-through">
                      $28.99
                    </span>
                  </div>

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
                  {/* Progress Bar */}
                  <button className="group text-main-green font-quick-sand text-[16px] flex items-center justify-center gap-2 text-[16px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] w-full px-[24px] py-[13px] rounded-full">
                    Add To Cart
                    <LuShoppingCart
                      size={20}
                      className="text-current group-hover:text-white"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div
              className="w-1/4 min-w-[25%] px-2" // Each item takes 25% width
            >
              <div className="relative h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
                <span className="absolute z-10 top-4 left-4 text-white text-sm font-semibold bg-orange-400 rounded-tl-full rounded-br-full h-8 px-4 flex items-center justify-center">
                  New
                </span>
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
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-2xl font-bold text-large-text">
                      $14.99
                    </span>
                    <span className="text-sm text-gray-500">/Qty</span>
                    <span className="ml-2 text-base text-gray-400 line-through">
                      $28.99
                    </span>
                  </div>

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
                  {/* Progress Bar */}
                  <button className="group text-main-green font-quick-sand text-[16px] flex items-center justify-center gap-2 text-[16px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] w-full px-[24px] py-[13px] rounded-full">
                    Add To Cart
                    <LuShoppingCart
                      size={20}
                      className="text-current group-hover:text-white"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div
              className="w-1/4 min-w-[25%] px-2" // Each item takes 25% width
            >
              <div className="relative h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
                {/* <button className="group absolute z-10 top-4 right-4 flex items-center justify-center gap-2 text-main-green hover:text-white text-sm font-semibold hover:bg-main-green bg-add-cart rounded-full h-10 px-4 transition-all duration-300 ease-in-out">
                Add
                <LuShoppingCart
                  size={16}
                  className="text-main-green group-hover:text-white transition-all duration-300 ease-in-out"
                />
              </button> */}
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
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-2xl font-bold text-large-text">
                      $14.99
                    </span>
                    <span className="text-sm text-gray-500">/Qty</span>
                    <span className="ml-2 text-base text-gray-400 line-through">
                      $28.99
                    </span>
                  </div>

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
                  {/* Progress Bar */}
                  <button className="group text-main-green font-quick-sand text-[16px] flex items-center justify-center gap-2 text-[16px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] w-full px-[24px] py-[13px] rounded-full">
                    Add To Cart
                    <LuShoppingCart
                      size={20}
                      className="text-current group-hover:text-white"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div
              className="w-1/4 min-w-[25%] px-2" // Each item takes 25% width
            >
              <div className="relative h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
                <span className="absolute z-10 top-4 left-4 text-white text-sm font-semibold bg-red-500 rounded-tl-full rounded-br-full h-8 px-4 flex items-center justify-center">
                  Sale 50%
                </span>
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
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-2xl font-bold text-large-text">
                      $14.99
                    </span>
                    <span className="text-sm text-gray-500">/Qty</span>
                    <span className="ml-2 text-base text-gray-400 line-through">
                      $28.99
                    </span>
                  </div>

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
                  {/* Progress Bar */}
                  <button className="group text-main-green font-quick-sand text-[16px] flex items-center justify-center gap-2 text-[16px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] w-full px-[24px] py-[13px] rounded-full">
                    Add To Cart
                    <LuShoppingCart
                      size={20}
                      className="text-current group-hover:text-white"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div
              className="w-1/4 min-w-[25%] px-2" // Each item takes 25% width
            >
              <div className="relative h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
                <span className="absolute z-10 top-4 left-4 text-white text-sm font-semibold bg-blue-800 rounded-tl-full rounded-br-full h-8 px-4 flex items-center justify-center">
                  Best Sale
                </span>
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
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-2xl font-bold text-large-text">
                      $14.99
                    </span>
                    <span className="text-sm text-gray-500">/Qty</span>
                    <span className="ml-2 text-base text-gray-400 line-through">
                      $28.99
                    </span>
                  </div>

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
                  {/* Progress Bar */}
                  <button className="group text-main-green font-quick-sand text-[16px] flex items-center justify-center gap-2 text-[16px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] w-full px-[24px] py-[13px] rounded-full">
                    Add To Cart
                    <LuShoppingCart
                      size={20}
                      className="text-current group-hover:text-white"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div
              className="w-1/4 min-w-[25%] px-2" // Each item takes 25% width
            >
              <div className="relative h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
                <span className="absolute z-10 top-4 left-4 text-white text-sm font-semibold bg-orange-400 rounded-tl-full rounded-br-full h-8 px-4 flex items-center justify-center">
                  New
                </span>
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
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-2xl font-bold text-large-text">
                      $14.99
                    </span>
                    <span className="text-sm text-gray-500">/Qty</span>
                    <span className="ml-2 text-base text-gray-400 line-through">
                      $28.99
                    </span>
                  </div>

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
                  {/* Progress Bar */}
                  <button className="group text-main-green font-quick-sand text-[16px] flex items-center justify-center gap-2 text-[16px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] w-full px-[24px] py-[13px] rounded-full">
                    Add To Cart
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
  );
}
