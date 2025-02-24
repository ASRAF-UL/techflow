import { useState } from "react";
import {
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosSearch,
  IoIosMenu,
} from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import LeftSideModal from "./components/sideModal";
import Carousel from "./components/carousel";
import { RiArrowDownDoubleLine } from "react-icons/ri";
import CarouselProductList from "./components/carouselProductList";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState("Shoes");
  const [isSideModalOpen, setIsSideModalOpen] = useState(false);
  const [showNestedModal, setShowNestedModal] = useState(false);
  const [showNestedThirdModal, setShowNestedThirdModal] = useState(false);
  const items = ["Shoes", "Jeans", "T-shirts", "Shirts"];
  const images = ["1.png", "2.png", "1.png", "2.png"];

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
                    <a href="#">Product</a>
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
        {/* <div
          className="content h-[calc(100%-19rem)] w-[calc(86%)] my-8 rounded-[20px] flex"
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
        <div
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
        </div>
        <div className="h-72 w-full px-[calc(7%)] py-5">
          <CarouselProductList />
        </div>
        <div className="h-[360px] w-full px-[calc(7%)] flex flex-row">
          <div></div>
        </div>
      </div>
    </>
  );
}

export default App;
