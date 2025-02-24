import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown, IoIosSearch } from "react-icons/io";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState("Shoes");
  const items = ["Shoes", "Jeans", "T-shirts", "Shirts"];

  return (
    <>
      <div className="h-screen w-screen flex flex-col">
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
        <nav class="bg-gray-800 p-4">
          <div class="max-w-7xl mx-auto flex justify-between items-center">
            <div class="text-white text-2xl font-semibold">
              <a href="#">MyWebsite</a>
            </div>
            <ul class="hidden md:flex space-x-8 text-white">
              <li>
                <a href="#" class="hover:bg-gray-700 p-2 rounded">
                  Home
                </a>
              </li>
              <li>
                <a href="#" class="hover:bg-gray-700 p-2 rounded">
                  About
                </a>
              </li>
              <li>
                <a href="#" class="hover:bg-gray-700 p-2 rounded">
                  Services
                </a>
              </li>
              <li>
                <a href="#" class="hover:bg-gray-700 p-2 rounded">
                  Contact
                </a>
              </li>
            </ul>
            <div class="md:hidden flex items-center">
              <button id="hamburger" class="text-white focus:outline-none">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 12h18M3 6h18M3 18h18"></path>
                </svg>
              </button>
            </div>
          </div>
          <ul
            id="mobile-menu"
            class="md:hidden bg-gray-800 space-y-4 text-white p-4 absolute top-16 left-0 right-0 hidden"
          >
            <li>
              <a href="#" class="hover:bg-gray-700 p-2 rounded">
                Home
              </a>
            </li>
            <li>
              <a href="#" class="hover:bg-gray-700 p-2 rounded">
                About
              </a>
            </li>
            <li>
              <a href="#" class="hover:bg-gray-700 p-2 rounded">
                Services
              </a>
            </li>
            <li>
              <a href="#" class="hover:bg-gray-700 p-2 rounded">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default App;
