import { useState } from "react";
import {
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosSearch,
  IoIosMenu,
} from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import LeftSideModal from "../../components/sideModal";
import Carousel from "../../components/carousel";
import { RiArrowDownDoubleLine } from "react-icons/ri";
import CarouselProductList from "../../components/carouselProductList";
import { FaArrowRightLong } from "react-icons/fa6";
import FlashSalesCarousel from "../../components/flashSaleCarousel";
import { LuShoppingCart } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import HotDealsCarousel from "../../components/hotDealsCarousel";
import OrganicFoodCarousel from "../../components/organicFoodCarousel";
import TestCarousel from "../../components/testCar";
import HomeCarousel from "../../components/homeCarousel";
import { Link } from "react-router-dom";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState("Shoes");
  const [isSideModalOpen, setIsSideModalOpen] = useState(false);
  const [showNestedModal, setShowNestedModal] = useState(false);
  const [showNestedThirdModal, setShowNestedThirdModal] = useState(false);
  const items = ["Shoes", "Jeans", "T-shirts", "Shirts"];
  const images = ["1.png", "2.png", "1.png", "2.png"];
  const categories = [
    "All",
    "Grocery",
    "Fruits",
    "Juices",
    "Vegetables",
    "Snacks",
    "Organic Foods",
  ];
  const [selected, setSelected] = useState("All");

  return (
    <>
      <div className="flex flex-col items-center overflow-y-auto">
        <div className="h-[37px] w-full px-[calc(7%)] flex justify-between items-center bg-main-green">
          <div className="font-main-font text-white text-[14px] flex justify-between gap-5">
            <a href="#" className="hover:underline">
              About us
            </a>
            <span className="mx-2 text-off-white">|</span>
            <a href="#" className="hover:underline">
              Free Delivery
            </a>
            <span className="mx-2 text-off-white">|</span>
            <a href="#" className="hover:underline">
              Return Policy
            </a>
          </div>
          <div className="font-main-font text-white text-[14px] flex justify-between gap-5 items-center">
            {/* Help Center Dropdown */}
            <div className="dropdown">
              <button className="border-none cursor-pointer h-[37px]">
                Help Center
              </button>
              <ul className="dropdown-content">
                <li>
                  <a href="#">Call Center</a>
                </li>
                <li>
                  <a href="#">Live Chat</a>
                </li>
              </ul>
            </div>
            <span className="mx-2 text-off-white">|</span>
            {/* Language Dropdown */}
            <div className="dropdown">
              <button className="border-none cursor-pointer h-[37px]">
                English
              </button>
              <ul className="dropdown-content">
                <li>
                  <a href="#">English</a>
                </li>
                <li>
                  <a href="#">Japan</a>
                </li>
                <li>
                  <a href="#">French</a>
                </li>
                <li>
                  <a href="#">German</a>
                </li>
                <li>
                  <a href="#">Bangladesh</a>
                </li>
                <li>
                  <a href="#">South Korea</a>
                </li>
              </ul>
            </div>
            <span className="mx-2 text-off-white">|</span>
            {/* Currency Dropdown */}
            <div className="dropdown">
              <button className="border-none cursor-pointer h-[37px]">
                USD
              </button>
              <ul className="dropdown-content">
                <li>
                  <a href="#">USD</a>
                </li>
                <li>
                  <a href="#">Yen</a>
                </li>
                <li>
                  <a href="#">Franc</a>
                </li>
                <li>
                  <a href="#">EURO</a>
                </li>
                <li>
                  <a href="#">BDT</a>
                </li>
                <li>
                  <a href="#">WON</a>
                </li>
              </ul>
            </div>
            <span className="mx-2 text-off-white">|</span>
            <div className="h-[37px] flex items-center">
              <a href="#" className="hover:underline">
                My Account
              </a>
            </div>
          </div>
        </div>
        <div className="h-[110px] w-full px-[calc(7%)] flex justify-between items-center bg-light-green">
          <div className="h-[48px] w-full font-main-font text-white flex flex-row justify-between gap-5 items-center">
            <img src="logo.png" alt="logo" className="h-[44px]" />
            <div className="flex flex-row border-1 border-border-gray px-2 py-1 rounded-full gap-2">
              <div className="relative min-w-[150px] text-dark-black">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`flex justify-between items-center w-full px-4 py-2 ${
                    isOpen ? "text-main-green" : "text-black"
                  } border-r-1 border-border-gray`}
                >
                  {selectedItem}
                  {isOpen ? (
                    <IoIosArrowUp size={18} color="green" />
                  ) : (
                    <IoIosArrowDown size={18} />
                  )}
                </button>
                {isOpen && (
                  <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-2 border-b border-border-gray focus:border-border-green  focus:outline-none"
                    />
                    <ul className="max-h-40 overflow-auto">
                      {items
                        .filter((item) =>
                          item.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((item, index) => (
                          <li
                            key={index}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                              setSelectedItem(item);
                              setSearchTerm("");
                              setIsOpen(false);
                            }}
                          >
                            {item}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center gap-2">
                <input
                  type="text"
                  placeholder="Search for a product or brand"
                  className="min-w-[520px] border-none text-dark-black focus:outline-none"
                />
                <button className="bg-main-green h-[32px] w-[32px] rounded-full flex items-center justify-center">
                  <IoIosSearch size={24} color="white" />
                </button>
              </div>
            </div>
            <div className="flex justify-between text-[20px] text-light-black flex-row gap-4">
              <a href="#" className="hover:text-main-green">
                Wishlist
              </a>
              <a href="#" className="hover:text-main-green">
                Cart
              </a>
            </div>
          </div>
        </div>
        <nav class="px-[calc(7%)] h-[56px] w-full flex justify-between items-center border-1 border-border-gray">
          <div className="relative text-dark-black flex flex-row items-center gap-20 h-full">
            <button
              onClick={() => setIsSideModalOpen(!isSideModalOpen)}
              className="group flex justify-between items-center w-full px-4 py-2 gap-4 hover:text-main-green border-r-1 border-border-gray"
            >
              <IoIosMenu
                size={20}
                className="text-black group-hover:text-main-green"
              />
              Menu
            </button>
            <LeftSideModal
              isOpen={isSideModalOpen}
              onClose={() => {
                setIsSideModalOpen(false);
                setShowNestedModal(false);
                setShowNestedThirdModal(false);
              }}
            >
              <div className="flex flex-row">
                <div className="w-72">
                  <h1>Modal 01</h1>
                  <button onClick={() => setShowNestedModal(true)}>
                    2nd modal open
                  </button>
                </div>
                <div className={`w-72 ${showNestedModal ? "" : "hidden"}`}>
                  <h1>Modal 02</h1>
                  <button onClick={() => setShowNestedThirdModal(true)}>
                    3nd modal open
                  </button>
                </div>
                <div className={`w-72 ${showNestedThirdModal ? "" : "hidden"}`}>
                  Modal 03
                </div>
              </div>
            </LeftSideModal>
            <div className="flex flex-row justify-between items-center gap-10 h-full">
              <div className="dropdown h-full font-semibold text-light-black text-[16px]">
                <button className="border-none cursor-pointer h-full">
                  English
                </button>
                <ul className="dropdown-content">
                  <li>
                    <a href="#">English</a>
                  </li>
                  <li>
                    <a href="#">Japan</a>
                  </li>
                  <li>
                    <a href="#">French</a>
                  </li>
                  <li>
                    <a href="#">German</a>
                  </li>
                  <li>
                    <a href="#">Bangladesh</a>
                  </li>
                  <li>
                    <a href="#">South Korea</a>
                  </li>
                </ul>
              </div>
              <div className="dropdown h-full font-semibold text-light-black text-[16px]">
                <button className="border-none cursor-pointer h-full">
                  Home
                </button>
                <ul className="dropdown-content">
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">Home 01</a>
                  </li>
                  <li>
                    <a href="#">Home 02</a>
                  </li>
                  <li>
                    <a href="#">Home 03</a>
                  </li>
                  <li>
                    <a href="#">Home 04</a>
                  </li>
                </ul>
              </div>
              <div className="dropdown h-full font-semibold text-light-black text-[16px]">
                <button className="border-none cursor-pointer h-full">
                  Product
                </button>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/products">Products</Link>
                  </li>
                  <li>
                    <a href="#">Product 01</a>
                  </li>
                  <li>
                    <a href="#">Product 02</a>
                  </li>
                  <li>
                    <a href="#">Product 03</a>
                  </li>
                  <li>
                    <a href="#">Product 04</a>
                  </li>
                  <li>
                    <a href="#">Product 05</a>
                  </li>
                </ul>
              </div>
              <div className="dropdown h-full font-semibold text-light-black text-[16px]">
                <button className="border-none cursor-pointer h-full">
                  Pages
                </button>
                <ul className="dropdown-content">
                  <li>
                    <a href="#">Pages</a>
                  </li>
                  <li>
                    <a href="#">Pages 01</a>
                  </li>
                  <li>
                    <a href="#">Pages 02</a>
                  </li>
                  <li>
                    <a href="#">Pages 03</a>
                  </li>
                  <li>
                    <a href="#">Pages 04</a>
                  </li>
                  <li>
                    <a href="#">Pages 05</a>
                  </li>
                </ul>
              </div>
              <div className="dropdown h-full font-semibold text-light-black text-[16px]">
                <button className="border-none cursor-pointer h-full">
                  Blog
                </button>
                <ul className="dropdown-content">
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Blog 01</a>
                  </li>
                  <li>
                    <a href="#">Blog 02</a>
                  </li>
                  <li>
                    <a href="#">Blog 03</a>
                  </li>
                  <li>
                    <a href="#">Blog 04</a>
                  </li>
                  <li>
                    <a href="#">Blog 05</a>
                  </li>
                </ul>
              </div>
              <div className="h-full flex flex-row items-center font-semibold text-light-black text-[16px]">
                <a href="#" className="whitespace-nowrap">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center h-full bg-main-green p-[10px] text-white text-[18px] font-semibold tracking-wide">
            <button className="h-[32px] w-[32px] flex justify-center items-center">
              <FaPhoneVolume size={24} />
            </button>
            <span>(+88) 01784251150</span>
          </div>
        </nav>
        <HomeCarousel />
        {/* <div className="min-h-[calc(100vh-220px)] max-h-full w-full px-[7%] bg-[#EFF2F7] pt-16">
          <div className="flex flex-col">
            <h3 className="text-main-purple text-[30px] font-[700] font-quick-sand">
              Suggestion Product
            </h3>
            <h4 className="text-large-text text-[20px] font-[500] font-quick-sand">
              Our Collection
            </h4>
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
          <div className="flex flex-row gap-8">
            <a href="#" className="flex flex-row gap-2 items-center">
              <img src="fb.png" alt="fb" />
              <span className="text-large-text text-[18px] font-[400] font-quick-sand">
                Facebook
              </span>
            </a>
            <a href="#" className="flex flex-row gap-2 items-center">
              <img src="twt.png" alt="fb" />
              <span className="text-large-text text-[18px] font-[400] font-quick-sand">
                Facebook
              </span>
            </a>
            <a href="#" className="flex flex-row gap-2 items-center">
              <img src="insta.png" alt="fb" />
              <span className="text-large-text text-[18px] font-[400] font-quick-sand">
                Facebook
              </span>
            </a>
          </div>
          <h4 className="text-large-text text-[25px] font-[700] font-quick-sand mt-[25px]">
            New Festival Offer
          </h4>
          <span className="rounded bg-main-purple text-[14px] font-[500] font-quick-sand text-white px-5 py-2 cursor-pointer">
            90% Off
          </span>
          <div className="flex items-end gap-1">
            <span className="text-[40px] font-bold text-large-text">
              $65.00
            </span>
            <span className="ml-2 text-[28px] text-main-purple line-through">
              $79.00
            </span>
          </div>
          <span className="text-[14px] text-light-black font-[500]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad quasi
            odit amet cum molestias, nobis nam magnam accusantium consequatur
            labore repellat dignissimos.
          </span>
        </div> */}
        {/* <div
          className="content max-h-[610px] min-h-[610px] w-[calc(86%)] my-8 rounded-[20px] flex"
          style={{
            backgroundImage: "url(bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute w-full top-10 bottom-10 left-0 right-0">
            <Carousel images={images} />
          </div>
          <div className="circle"></div>
          <div className="moving-arrow w-[100px] h-[100px] bg-yellow-300 flex items-center justify-center rounded-full">
            <button className="absolute h-full w-full bg-main-green hover:bg-hover-green flex items-center justify-center rounded-full border-4 border-white">
              <RiArrowDownDoubleLine
                size={36}
                color="white"
                className="animate-wave-icon"
              />
            </button>
          </div>
        </div> */}
        <div className="h-72 w-full px-[calc(7%)] py-5">
          <CarouselProductList />
        </div>
        <div className="h-[360px] w-full px-[calc(7%)] flex flex-row gap-6 py-4">
          <div className="relative w-1/4 h-full bg-card-100 rounded-[20px] overflow-hidden flex items-center">
            <div className="relative flex flex-col w-1/2 items-center justify-center p-4">
              <h1 className="text-[24px] font-quick-sand text-large-text font-bold mb-[16px] leading-[1.5] text-center">
                Everyday Fresh Meat
              </h1>
              <button className="text-white flex items-center gap-2 text-[16px] bg-main-green hover:bg-hover-green font-semibold h-[48px] px-[24px] py-[13px] rounded-full mt-[24px]">
                Shop Now
                <FaArrowRightLong size={18} color="white" />
              </button>
            </div>
            <div className="absolute top-[-10%] right-[-20%] w-[240px] h-[240px] rounded-full bg-circle-100"></div>
            <img
              src="1.png"
              alt="img 1"
              className="absolute w-2/3 h-auto right-[-20%] top-[25%]"
            />
          </div>
          <div className="relative w-1/4 h-full bg-card-200 rounded-[20px] overflow-hidden flex items-center">
            <div className="relative flex flex-col w-1/2 items-center justify-center p-4">
              <h1 className="text-[24px] font-quick-sand text-large-text font-bold mb-[16px] leading-[1.5] text-center">
                Daily Fresh Vegetables
              </h1>
              <button className="text-white flex items-center gap-2 text-[16px] bg-main-green hover:bg-hover-green font-semibold h-[48px] px-[24px] py-[13px] rounded-full mt-[24px]">
                Shop Now
                <FaArrowRightLong size={18} color="white" />
              </button>
            </div>
            <div className="absolute top-[-10%] right-[-20%] w-[240px] h-[240px] rounded-full bg-circle-200"></div>
            <img
              src="2.png"
              alt="img 2"
              className="absolute w-2/3 h-auto right-[-20%] top-[25%]"
            />
          </div>
          <div className="relative w-1/4 h-full bg-card-300 rounded-[20px] overflow-hidden flex items-center">
            <div className="relative flex flex-col w-1/2 items-center justify-center p-4">
              <h1 className="text-[24px] font-quick-sand text-large-text font-bold mb-[16px] leading-[1.5] text-center">
                Everyday Fresh Milk
              </h1>
              <button className="text-white flex items-center gap-2 text-[16px] bg-main-green hover:bg-hover-green font-semibold h-[48px] px-[24px] py-[13px] rounded-full mt-[24px]">
                Shop Now
                <FaArrowRightLong size={18} color="white" />
              </button>
            </div>
            <div className="absolute top-[-10%] right-[-20%] w-[240px] h-[240px] rounded-full bg-circle-300"></div>
            <img
              src="4.png"
              alt="img 3"
              className="absolute w-2/3 h-auto right-[-20%] top-[25%]"
            />
          </div>
          <div className="relative w-1/4 h-full bg-card-400 rounded-[20px] overflow-hidden flex items-center">
            <div className="relative flex flex-col w-1/2 items-center justify-center p-4">
              <h1 className="text-[24px] font-quick-sand text-large-text font-bold mb-[16px] leading-[1.5] text-center">
                Everyday Fresh Fruits
              </h1>
              <button className="text-white flex items-center gap-2 text-[16px] bg-main-green hover:bg-hover-green font-semibold h-[48px] px-[24px] py-[13px] rounded-full mt-[24px]">
                Shop Now
                <FaArrowRightLong size={18} color="white" />
              </button>
            </div>
            <div className="absolute top-[-10%] right-[-20%] w-[240px] h-[240px] rounded-full bg-circle-400"></div>
            <img
              src="7.png"
              alt="img 7"
              className="absolute w-2/3 h-auto right-[-20%] top-[25%]"
            />
          </div>
        </div>

        <FlashSalesCarousel />
        <div className="h-[470px] w-full px-[7%] py-2 flex flex-row gap-5">
          <div className="relative w-1/6 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
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
          <div className="relative w-1/6 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
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
          <div className="relative w-1/6 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
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
          <div className="relative w-1/6 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
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
          <div className="relative w-1/6 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
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
          <div className="relative w-1/6 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
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
        <div className="w-full px-[7%] py-14 flex flex-row gap-5">
          {/* First Card */}
          <div className="w-1/2 h-[320px] rounded-2xl bg-main-green relative flex gap-10">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                backgroundImage: "url(offer_bg.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.06, // Image opacity at 30%
              }}
            ></div>
            <div className="w-2/5 p-4 flex items-center justify-center h-full">
              <img
                src="1.png"
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

          {/* Second Card */}
          <div className="w-1/2 h-[320px] rounded-2xl bg-main-green relative flex gap-10">
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
        </div>
        <div className="w-full px-[7%] py-14 flex flex-col gap-5">
          <div className="w-full flex flex-row justify-between items-center pb-4">
            <h1 className="text-[32px] font-quick-sand text-large-text font-semibold leading-[1]">
              Recommended for you
            </h1>
            <div className="flex space-x-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-[16px] font-medium transition-colors ${
                    selected === category
                      ? "bg-main-green text-white"
                      : "text-light-black"
                  }`}
                  onClick={() => setSelected(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[470px] w-full py-2 flex flex-row gap-5">
            <div className="relative w-1/6 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
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
                <button className="group text-main-green font-quick-sand text-[16px] flex items-center justify-center gap-2 text-[16px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] w-full px-[24px] py-[13px] rounded-full">
                  Add To Cart
                  <LuShoppingCart
                    size={20}
                    className="text-current group-hover:text-white"
                  />
                </button>
              </div>
            </div>
            <div className="relative w-1/6 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
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
                  <span className="text-sm font-medium text-gray-700">4.8</span>
                  <span className="text-sm text-gray-400">(17k)</span>
                </div>

                {/* Product Details */}
                <h3 className="text-lg font-semibold text-large-text mb-2">
                  Taylor Farms Broccoli
                </h3>
                <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
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
            <div className="relative w-1/6 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
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
                  <span className="text-sm font-medium text-gray-700">4.8</span>
                  <span className="text-sm text-gray-400">(17k)</span>
                </div>

                {/* Product Details */}
                <h3 className="text-lg font-semibold text-large-text mb-2">
                  Taylor Farms Broccoli
                </h3>
                <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
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
            <div className="relative w-1/6 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
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
                  <span className="text-sm font-medium text-gray-700">4.8</span>
                  <span className="text-sm text-gray-400">(17k)</span>
                </div>

                {/* Product Details */}
                <h3 className="text-lg font-semibold text-large-text mb-2">
                  Taylor Farms Broccoli
                </h3>
                <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
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
            <div className="relative w-1/6 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
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
                  <span className="text-sm font-medium text-gray-700">4.8</span>
                  <span className="text-sm text-gray-400">(17k)</span>
                </div>

                {/* Product Details */}
                <h3 className="text-lg font-semibold text-large-text mb-2">
                  Taylor Farms Broccoli
                </h3>
                <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
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
            <div className="relative w-1/6 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
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
                  <span className="text-sm font-medium text-gray-700">4.8</span>
                  <span className="text-sm text-gray-400">(17k)</span>
                </div>

                {/* Product Details */}
                <h3 className="text-lg font-semibold text-large-text mb-2">
                  Taylor Farms Broccoli
                </h3>
                <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
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
          <div className="h-[470px] w-full py-2 flex flex-row gap-5">
            <div className="relative w-1/6 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
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
                  <span className="text-sm font-medium text-gray-700">4.8</span>
                  <span className="text-sm text-gray-400">(17k)</span>
                </div>

                {/* Product Details */}
                <h3 className="text-lg font-semibold text-large-text mb-2">
                  Taylor Farms Broccoli
                </h3>
                <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
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
            <div className="relative w-1/6 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
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
                  <span className="text-sm font-medium text-gray-700">4.8</span>
                  <span className="text-sm text-gray-400">(17k)</span>
                </div>

                {/* Product Details */}
                <h3 className="text-lg font-semibold text-large-text mb-2">
                  Taylor Farms Broccoli
                </h3>
                <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
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
            <div className="relative w-1/6 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
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
                  <span className="text-sm font-medium text-gray-700">4.8</span>
                  <span className="text-sm text-gray-400">(17k)</span>
                </div>

                {/* Product Details */}
                <h3 className="text-lg font-semibold text-large-text mb-2">
                  Taylor Farms Broccoli
                </h3>
                <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
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
            <div className="relative w-1/6 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
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
                  <span className="text-sm font-medium text-gray-700">4.8</span>
                  <span className="text-sm text-gray-400">(17k)</span>
                </div>

                {/* Product Details */}
                <h3 className="text-lg font-semibold text-large-text mb-2">
                  Taylor Farms Broccoli
                </h3>
                <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
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
            <div className="relative w-1/6 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
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
                  <span className="text-sm font-medium text-gray-700">4.8</span>
                  <span className="text-sm text-gray-400">(17k)</span>
                </div>

                {/* Product Details */}
                <h3 className="text-lg font-semibold text-large-text mb-2">
                  Taylor Farms Broccoli
                </h3>
                <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
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
            <div className="relative w-1/6 h-full border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-col items-center shadow-sm hover:shadow-md">
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
                  <span className="text-sm font-medium text-gray-700">4.8</span>
                  <span className="text-sm text-gray-400">(17k)</span>
                </div>

                {/* Product Details */}
                <h3 className="text-lg font-semibold text-large-text mb-2">
                  Taylor Farms Broccoli
                </h3>
                <p className="text-sm text-gray-500 mb-4">Florets Vegetables</p>
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
        <HotDealsCarousel />
        <div className="w-full px-[7%] py-14 flex flex-col gap-5">
          <div className="w-full flex flex-row justify-between items-center pb-4">
            <h1 className="text-[32px] font-quick-sand text-large-text font-semibold leading-[1]">
              Daily Best Sells
            </h1>
          </div>
          <div className="h-[550px] w-full flex flex-row gap-5">
            <div className="w-4/6 h-full grid grid-cols-2 gap-4">
              <div className="relative border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-row items-center shadow-sm hover:shadow-md">
                <span className="absolute z-10 top-4 left-4 text-white text-sm font-semibold bg-red-500 rounded-tl-full rounded-br-full h-8 px-4 flex items-center justify-center">
                  Sale 50%
                </span>
                <div className="w-1/2 h-full flex flex-col justify-between">
                  <a
                    href="#"
                    className="h-2/3 py-8 px-4 flex justify-center items-center overflow-hidden"
                  >
                    <img
                      src="22.png"
                      alt="Product Image"
                      className="max-w-[120px] h-auto object-fit rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </a>
                  <div className="flex gap-2 text-large-text font-quick-sand text-xs">
                    <span className="bg-add-cart px-2 py-2 rounded-lg shadow">
                      78 Hours
                    </span>
                    <span className="bg-add-cart px-2 py-2 rounded-lg shadow">
                      65 Min
                    </span>
                    <span className="bg-add-cart px-2 py-2 rounded-lg shadow">
                      43 Sec
                    </span>
                  </div>
                </div>

                <div className="w-1/2 h-full">
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
                  <div className="w-full mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div className="bg-main-green h-1 rounded-full w-3/4"></div>
                    </div>
                    <div className="flex justify-between text-sm text-large-text mb-1">
                      <span>Sold: 30/40</span>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <button className="group text-main-green font-quick-sand text-[16px] flex items-center justify-center gap-2 text-[16px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] w-full px-[24px] py-[13px] rounded-full mt-6">
                    Add To Cart
                    <LuShoppingCart
                      size={20}
                      className="text-current group-hover:text-white"
                    />
                  </button>
                </div>
              </div>
              <div className="relative border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-row items-center shadow-sm hover:shadow-md">
                <span className="absolute z-10 top-4 left-4 text-white text-sm font-semibold bg-red-500 rounded-tl-full rounded-br-full h-8 px-4 flex items-center justify-center">
                  Sale 50%
                </span>
                <div className="w-1/2 h-full flex flex-col justify-between">
                  <a
                    href="#"
                    className="h-2/3 py-8 px-4 flex justify-center items-center overflow-hidden"
                  >
                    <img
                      src="33.png"
                      alt="Product Image"
                      className="max-w-[120px] h-auto object-fit rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </a>
                  <div className="flex gap-2 text-large-text font-quick-sand text-xs">
                    <span className="bg-add-cart px-2 py-2 rounded-lg shadow">
                      78 Hours
                    </span>
                    <span className="bg-add-cart px-2 py-2 rounded-lg shadow">
                      65 Min
                    </span>
                    <span className="bg-add-cart px-2 py-2 rounded-lg shadow">
                      43 Sec
                    </span>
                  </div>
                </div>

                <div className="w-1/2 h-full">
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
                  <div className="w-full mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div className="bg-main-green h-1 rounded-full w-3/4"></div>
                    </div>
                    <div className="flex justify-between text-sm text-large-text mb-1">
                      <span>Sold: 30/40</span>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <button className="group text-main-green font-quick-sand text-[16px] flex items-center justify-center gap-2 text-[16px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] w-full px-[24px] py-[13px] rounded-full mt-6">
                    Add To Cart
                    <LuShoppingCart
                      size={20}
                      className="text-current group-hover:text-white"
                    />
                  </button>
                </div>
              </div>
              <div className="relative border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-row items-center shadow-sm hover:shadow-md">
                <span className="absolute z-10 top-4 left-4 text-white text-sm font-semibold bg-red-500 rounded-tl-full rounded-br-full h-8 px-4 flex items-center justify-center">
                  Sale 50%
                </span>
                <div className="w-1/2 h-full flex flex-col justify-between">
                  <a
                    href="#"
                    className="h-2/3 py-8 px-4 flex justify-center items-center overflow-hidden"
                  >
                    <img
                      src="44.png"
                      alt="Product Image"
                      className="max-w-[120px] h-auto object-fit rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </a>
                  <div className="flex gap-2 text-large-text font-quick-sand text-xs">
                    <span className="bg-add-cart px-2 py-2 rounded-lg shadow">
                      78 Hours
                    </span>
                    <span className="bg-add-cart px-2 py-2 rounded-lg shadow">
                      65 Min
                    </span>
                    <span className="bg-add-cart px-2 py-2 rounded-lg shadow">
                      43 Sec
                    </span>
                  </div>
                </div>

                <div className="w-1/2 h-full">
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
                  <div className="w-full mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div className="bg-main-green h-1 rounded-full w-3/4"></div>
                    </div>
                    <div className="flex justify-between text-sm text-large-text mb-1">
                      <span>Sold: 30/40</span>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <button className="group text-main-green font-quick-sand text-[16px] flex items-center justify-center gap-2 text-[16px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] w-full px-[24px] py-[13px] rounded-full mt-6">
                    Add To Cart
                    <LuShoppingCart
                      size={20}
                      className="text-current group-hover:text-white"
                    />
                  </button>
                </div>
              </div>
              <div className="relative border border-border-gray rounded-2xl hover:border-main-green transition-all duration-300 ease-in-out p-4 flex flex-row items-center shadow-sm hover:shadow-md">
                <span className="absolute z-10 top-4 left-4 text-white text-sm font-semibold bg-red-500 rounded-tl-full rounded-br-full h-8 px-4 flex items-center justify-center">
                  Sale 50%
                </span>
                <div className="w-1/2 h-full flex flex-col justify-between">
                  <a
                    href="#"
                    className="h-2/3 py-8 px-4 flex justify-center items-center overflow-hidden"
                  >
                    <img
                      src="11.png"
                      alt="Product Image"
                      className="max-w-[120px] h-auto object-fit rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </a>
                  <div className="flex gap-2 text-large-text font-quick-sand text-xs">
                    <span className="bg-add-cart px-2 py-2 rounded-lg shadow">
                      78 Hours
                    </span>
                    <span className="bg-add-cart px-2 py-2 rounded-lg shadow">
                      65 Min
                    </span>
                    <span className="bg-add-cart px-2 py-2 rounded-lg shadow">
                      43 Sec
                    </span>
                  </div>
                </div>

                <div className="w-1/2 h-full">
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
                  <div className="w-full mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div className="bg-main-green h-1 rounded-full w-3/4"></div>
                    </div>
                    <div className="flex justify-between text-sm text-large-text mb-1">
                      <span>Sold: 30/40</span>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <button className="group text-main-green font-quick-sand text-[16px] flex items-center justify-center gap-2 text-[16px] bg-add-cart hover:bg-main-green hover:text-white font-semibold h-[43px] w-full px-[24px] py-[13px] rounded-full mt-6">
                    Add To Cart
                    <LuShoppingCart
                      size={20}
                      className="text-current group-hover:text-white"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="w-2/6 h-[550px] rounded-2xl bg-card-300 relative flex flex-col z-10 items-center">
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: "url(pink_bg.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="relative flex items-center justify-center h-1/2 m-4 p-6">
                <img
                  src="2.png"
                  alt="img"
                  className=" h-auto object-fit rounded-lg"
                />
              </div>
              <div className="relative flex flex-col gap-2 items-center">
                <h1 className="text-[34px] font-quick-sand text-large-text font-bold leading-[1] text-center pb-6">
                  Fresh Vegetables
                </h1>
                <div className="flex gap-2 items-center justify-center">
                  <div className="flex gap-2 text-white font-quick-sand">
                    <span className="bg-main-green px-3 py-2 rounded shadow">
                      308 Days
                    </span>
                    <span className="bg-main-green px-3 py-2 rounded shadow">
                      78 Hours
                    </span>
                    <span className="bg-main-green px-3 py-2 rounded shadow">
                      65 Min
                    </span>
                    <span className="bg-main-green px-3 py-2 rounded shadow">
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
          </div>
        </div>
        <div className="w-full px-[7%] py-12">
          <div className="w-full h-[287px] rounded-2xl bg-main-green relative flex flex-row z-10 items-center pl-[50px]">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                backgroundImage: "url(delivery_bg.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="relative flex items-center justify-center h-full -mb-[56px] w-2/8">
              <img
                src="delivery_man.png"
                alt="img"
                className=" h-auto object-fit rounded-lg "
              />
            </div>
            <div className="relative flex flex-col gap-2 items-center p-8 3/8">
              <h1 className="text-[34px] font-quick-sand text-white font-bold leading-[1] text-center px-8 py-2">
                We Delivery on Next Day from 10:00 AM to 08:00 PM
              </h1>
              <div className="flex gap-2 items-center justify-center">
                <div className="flex gap-2 text-white font-quick-sand text-lg">
                  <span className="px-3 py-2">For Orders starts from $100</span>
                </div>
              </div>
              <button className="text-white flex justify-center items-center gap-3 text-[16px] bg-orange-500 hover:bg-orange-600 text-gray-900 hover:text-white font-semibold h-12 px-6 py-3.5 rounded-full mt-6 max-w-[50%] transition-colors duration-200">
                Shop Now
                <FaArrowRightLong size={18} color="white" />
              </button>
            </div>
            <div className="relative flex items-center justify-center h-full p-10 w-3/8">
              <img
                src="2.png"
                alt="img"
                className="h-auto object-fit rounded-lg"
              />
            </div>
          </div>
        </div>
        <OrganicFoodCarousel />
        <div className="w-full px-[7%] mt-10 grid grid-cols-4 gap-4">
          <TestCarousel />
          <TestCarousel />
          <TestCarousel />
          <TestCarousel />
        </div>
      </div>
    </>
  );
}

export default HomePage;
