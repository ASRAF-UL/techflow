import React from "react";

function App() {
  return (
    <>
      <div className="h-screen w-screen flex flex-col">
        <div className="h-[37px] w-full px-[calc(5%)] flex justify-between items-center bg-main-green">
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
        <div className="h-[110px] w-full px-[calc(5%)] flex justify-between items-center bg-light-green">
          <div className="h-[48px] w-full font-main-font text-white flex flex-row justify-between gap-5 items-center">
            <img src="logo.png" alt="logo" className="h-[44px]" />
            <div className="flex flex-row"></div>
            <div className="flex justify-between text-[20px] text-light-black flex-row gap-4">
              <a href="#">Wishlist</a>
              <a href="#">Cart</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
