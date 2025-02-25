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
];

export default function HotDealsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [salesItems, setSalesItems] = useState(initialSalesItems);

  const totalSlides = Math.ceil(salesItems.length); // Since we show 2 items per slide

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  //   // Auto-slide every 3 seconds
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       nextSlide();
  //     }, 6000);

  //     // Clear interval on component unmount
  //     return () => clearInterval(interval);
  //   }, [nextSlide]); // Add nextSlide as a dependency

  // Timer to decrement time every second
  //   useEffect(() => {
  //     const timer = setInterval(() => {
  //       setSalesItems((prevItems) =>
  //         prevItems.map((item) => {
  //           let { days, hours, minutes, seconds } = item;

  //           if (seconds > 0) seconds--;
  //           else {
  //             seconds = 59;
  //             if (minutes > 0) minutes--;
  //             else {
  //               minutes = 59;
  //               if (hours > 0) hours--;
  //               else {
  //                 hours = 23;
  //                 if (days > 0) days--;
  //               }
  //             }
  //           }

  //           return { ...item, days, hours, minutes, seconds };
  //         })
  //       );
  //     }, 1000);

  //     return () => clearInterval(timer);
  //   }, []);

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
      <div className="overflow-hidden w-full flex gap-4 bg-yellow-300">
        <div className="w-2/6 h-[460px] rounded-2xl bg-main-green relative flex gap-10 z-10">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundImage: "url(offer_bg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.06, // Image opacity at 10%
            }}
          ></div>
          <div className="w-2/5 p-4 flex items-center justify-center h-full">
            <img
              src="2.png"
              alt="img"
              className="max-w-full h-auto object-fit rounded-lg"
            />
          </div>
          <div className="relative flex flex-col gap-2 mt-2 flex-start items-start py-[24px]">
            <div className="h-[80px] w-[80px] mb-[16px] bg-white p-4 rounded-full">
              <img
                src="offer_logo.png"
                alt="img"
                className="w-full h-auto object-fit rounded-full"
              />
            </div>
            <h1 className="text-[34px] font-quick-sand text-white font-bold leading-[1] text-center">
              $5 off your first order
            </h1>
            <div className="flex gap-2">
              <span className="text-[14px] font-quick-sand text-white font-semibold leading-[1.5]">
                Delivery by 6:15am
              </span>
              <span className="text-[14px] font-quick-sand text-orange-400 font-semibold leading-[1.5]">
                expired Aug 5
              </span>
            </div>
            <button className="group text-large-text flex justify-center items-center gap-3 text-[16px] bg-white hover:bg-hover-green text-gray-900 hover:text-white font-semibold h-12 px-6 py-3.5 rounded-full mt-6 max-w-[50%] transition-colors duration-200">
              Shop Now
              <FaArrowRightLong
                size={18}
                className="group-hover:text-white transition-colors duration-200"
              />
            </button>
          </div>
        </div>
        <div
          className="w-4/6 h-[460px] flex transition-transform duration-500 ease-in-out gap-4 bg-red-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <div className="relative w-1/4 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
            <button className="group absolute z-10 top-4 right-4 flex items-center justify-center gap-2 text-main-green hover:text-white text-sm font-semibold hover:bg-main-green bg-add-cart rounded-full h-10 px-4 transition-all duration-300 ease-in-out">
              Add
              <LuShoppingCart
                size={16}
                className="text-main-green group-hover:text-white transition-all duration-300 ease-in-out"
              />
            </button>
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
                <span className="text-sm font-medium text-gray-700">4.8</span>
                <span className="text-sm text-gray-400">(17k)</span>
              </div>

              {/* Product Details */}
              <h3 className="text-lg font-semibold text-large-text mb-2">
                Taylor Farms Broccoli
              </h3>
              <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
              {/* Progress Bar */}
              <div className="w-full mb-2">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-main-green h-1 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between text-sm text-large-text mb-1">
                  <span>Sold: 30/40</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-1/4 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
            <button className="group absolute z-10 top-4 right-4 flex items-center justify-center gap-2 text-main-green hover:text-white text-sm font-semibold hover:bg-main-green bg-add-cart rounded-full h-10 px-4 transition-all duration-300 ease-in-out">
              Add
              <LuShoppingCart
                size={16}
                className="text-main-green group-hover:text-white transition-all duration-300 ease-in-out"
              />
            </button>
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
                <span className="text-sm font-medium text-gray-700">4.8</span>
                <span className="text-sm text-gray-400">(17k)</span>
              </div>

              {/* Product Details */}
              <h3 className="text-lg font-semibold text-large-text mb-2">
                Taylor Farms Broccoli
              </h3>
              <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
              {/* Progress Bar */}
              <div className="w-full mb-2">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-main-green h-1 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between text-sm text-large-text mb-1">
                  <span>Sold: 30/40</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-1/4 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
            <button className="group absolute z-10 top-4 right-4 flex items-center justify-center gap-2 text-main-green hover:text-white text-sm font-semibold hover:bg-main-green bg-add-cart rounded-full h-10 px-4 transition-all duration-300 ease-in-out">
              Add
              <LuShoppingCart
                size={16}
                className="text-main-green group-hover:text-white transition-all duration-300 ease-in-out"
              />
            </button>
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
                <span className="text-sm font-medium text-gray-700">4.8</span>
                <span className="text-sm text-gray-400">(17k)</span>
              </div>

              {/* Product Details */}
              <h3 className="text-lg font-semibold text-large-text mb-2">
                Taylor Farms Broccoli
              </h3>
              <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
              {/* Progress Bar */}
              <div className="w-full mb-2">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-main-green h-1 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between text-sm text-large-text mb-1">
                  <span>Sold: 30/40</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-1/4 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
            <button className="group absolute z-10 top-4 right-4 flex items-center justify-center gap-2 text-main-green hover:text-white text-sm font-semibold hover:bg-main-green bg-add-cart rounded-full h-10 px-4 transition-all duration-300 ease-in-out">
              Add
              <LuShoppingCart
                size={16}
                className="text-main-green group-hover:text-white transition-all duration-300 ease-in-out"
              />
            </button>
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
                <span className="text-sm font-medium text-gray-700">4.8</span>
                <span className="text-sm text-gray-400">(17k)</span>
              </div>

              {/* Product Details */}
              <h3 className="text-lg font-semibold text-large-text mb-2">
                Taylor Farms Broccoli
              </h3>
              <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
              {/* Progress Bar */}
              <div className="w-full mb-2">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-main-green h-1 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between text-sm text-large-text mb-1">
                  <span>Sold: 30/40</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-1/4 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
            <button className="group absolute z-10 top-4 right-4 flex items-center justify-center gap-2 text-main-green hover:text-white text-sm font-semibold hover:bg-main-green bg-add-cart rounded-full h-10 px-4 transition-all duration-300 ease-in-out">
              Add
              <LuShoppingCart
                size={16}
                className="text-main-green group-hover:text-white transition-all duration-300 ease-in-out"
              />
            </button>
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
                <span className="text-sm font-medium text-gray-700">4.8</span>
                <span className="text-sm text-gray-400">(17k)</span>
              </div>

              {/* Product Details */}
              <h3 className="text-lg font-semibold text-large-text mb-2">
                Taylor Farms Broccoli
              </h3>
              <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
              {/* Progress Bar */}
              <div className="w-full mb-2">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-main-green h-1 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between text-sm text-large-text mb-1">
                  <span>Sold: 30/40</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-1/4 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
            <button className="group absolute z-10 top-4 right-4 flex items-center justify-center gap-2 text-main-green hover:text-white text-sm font-semibold hover:bg-main-green bg-add-cart rounded-full h-10 px-4 transition-all duration-300 ease-in-out">
              Add
              <LuShoppingCart
                size={16}
                className="text-main-green group-hover:text-white transition-all duration-300 ease-in-out"
              />
            </button>
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
                <span className="text-sm font-medium text-gray-700">4.8</span>
                <span className="text-sm text-gray-400">(17k)</span>
              </div>

              {/* Product Details */}
              <h3 className="text-lg font-semibold text-large-text mb-2">
                Taylor Farms Broccoli
              </h3>
              <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
              {/* Progress Bar */}
              <div className="w-full mb-2">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-main-green h-1 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between text-sm text-large-text mb-1">
                  <span>Sold: 30/40</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-1/4 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
            <button className="group absolute z-10 top-4 right-4 flex items-center justify-center gap-2 text-main-green hover:text-white text-sm font-semibold hover:bg-main-green bg-add-cart rounded-full h-10 px-4 transition-all duration-300 ease-in-out">
              Add
              <LuShoppingCart
                size={16}
                className="text-main-green group-hover:text-white transition-all duration-300 ease-in-out"
              />
            </button>
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
                <span className="text-sm font-medium text-gray-700">4.8</span>
                <span className="text-sm text-gray-400">(17k)</span>
              </div>

              {/* Product Details */}
              <h3 className="text-lg font-semibold text-large-text mb-2">
                Taylor Farms Broccoli
              </h3>
              <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
              {/* Progress Bar */}
              <div className="w-full mb-2">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-main-green h-1 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between text-sm text-large-text mb-1">
                  <span>Sold: 30/40</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-1/4 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
            <button className="group absolute z-10 top-4 right-4 flex items-center justify-center gap-2 text-main-green hover:text-white text-sm font-semibold hover:bg-main-green bg-add-cart rounded-full h-10 px-4 transition-all duration-300 ease-in-out">
              Add
              <LuShoppingCart
                size={16}
                className="text-main-green group-hover:text-white transition-all duration-300 ease-in-out"
              />
            </button>
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
                <span className="text-sm font-medium text-gray-700">4.8</span>
                <span className="text-sm text-gray-400">(17k)</span>
              </div>

              {/* Product Details */}
              <h3 className="text-lg font-semibold text-large-text mb-2">
                Taylor Farms Broccoli
              </h3>
              <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
              {/* Progress Bar */}
              <div className="w-full mb-2">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-main-green h-1 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between text-sm text-large-text mb-1">
                  <span>Sold: 30/40</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-1/4 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
            <button className="group absolute z-10 top-4 right-4 flex items-center justify-center gap-2 text-main-green hover:text-white text-sm font-semibold hover:bg-main-green bg-add-cart rounded-full h-10 px-4 transition-all duration-300 ease-in-out">
              Add
              <LuShoppingCart
                size={16}
                className="text-main-green group-hover:text-white transition-all duration-300 ease-in-out"
              />
            </button>
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
                <span className="text-sm font-medium text-gray-700">4.8</span>
                <span className="text-sm text-gray-400">(17k)</span>
              </div>

              {/* Product Details */}
              <h3 className="text-lg font-semibold text-large-text mb-2">
                Taylor Farms Broccoli
              </h3>
              <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
              {/* Progress Bar */}
              <div className="w-full mb-2">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-main-green h-1 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between text-sm text-large-text mb-1">
                  <span>Sold: 30/40</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
