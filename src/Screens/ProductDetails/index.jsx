import React, { useState, useEffect } from "react";
import {
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosSearch,
  IoIosMenu,
} from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import LeftSideModal from "../../components/sideModal";
import ImageSlider from "../../components/imageCarousel";
import axios from "axios";
import { useParams } from 'react-router-dom';

function ProductDetails() {
    const { id } = useParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState("Shoes");
  const [isSideModalOpen, setIsSideModalOpen] = useState(false);
  const [showNestedModal, setShowNestedModal] = useState(false);
  const [showNestedThirdModal, setShowNestedThirdModal] = useState(false);
  const items = ["Shoes", "Jeans", "T-shirts", "Shirts"];
  const [product, setProduct] = useState(null); // State to store the product details
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    // Fetch product details from the API
    const fetchProduct = async () => {
        console.log("Product name: ", id)
      try {
        const response = await axios.get(
          `https://adminecommerce.resnova.dev/api/productInformation?id=${id}`
        );
        console.log("single product: ", response.data)
        if (response.data) {
          setProduct(response.data); // Assuming the API returns an array of products
        } else {
          setError('Product not found!!!!');
        }
      } catch (err) {
        setError('Failed to fetch product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Re-run the effect when the productName changes

  if (loading) {
    return <div>Loading...</div>; // Display a loading message
  }

  if (error) {
    return <div>{error}</div>; // Display an error message
  }

  if (!product) {
    return <div>Product not found</div>; // Handle case where product is not found
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header with Dynamic Height */}
      <header
        className={`fixed top-0 left-0 right-0 bg-white shadow-sm z-50 transition-all duration-300 ${
          isScrolled ? "h-[112px]" : "h-[203px]"
        }`}
      >
        {isScrolled ? (
          <div
            className={`h-[37px] opacity-100 w-full px-[7%] flex justify-between items-center bg-main-green transition-all duration-300`}
          >
            <div className="font-main-font text-white text-[14px] flex gap-5">
              <a href="#" className="hover:underline">
                About us
              </a>
              <span className="text-off-white">|</span>
              <a href="#" className="hover:underline">
                Free Delivery
              </a>
              <span className="text-off-white">|</span>
              <a href="#" className="hover:underline">
                Return Policy
              </a>
            </div>
            <div className="font-main-font text-white text-[14px] flex gap-5 items-center">
              <div className="dropdown relative">
                <button className="border-none cursor-pointer h-[37px] hover:underline">
                  Help Center
                </button>
                <ul className="dropdown-content absolute hidden bg-white text-black mt-1 p-2 rounded shadow-lg">
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      Call Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      Live Chat
                    </a>
                  </li>
                </ul>
              </div>
              <span className="text-off-white">|</span>
              <div className="dropdown relative">
                <button className="border-none cursor-pointer h-[37px] hover:underline">
                  English
                </button>
                <ul className="dropdown-content absolute hidden bg-white text-black mt-1 p-2 rounded shadow-lg">
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      English
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      Japan
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      French
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      German
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      Bangladesh
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      South Korea
                    </a>
                  </li>
                </ul>
              </div>
              <span className="text-off-white">|</span>
              <div className="dropdown relative">
                <button className="border-none cursor-pointer h-[37px] hover:underline">
                  USD
                </button>
                <ul className="dropdown-content absolute hidden bg-white text-black mt-1 p-2 rounded shadow-lg">
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      USD
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      Yen
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      Franc
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      EURO
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      BDT
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      WON
                    </a>
                  </li>
                </ul>
              </div>
              <span className="text-off-white">|</span>
              <div className="h-[37px] flex items-center">
                <a href="#" className="hover:underline">
                  My Account
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`h-[37px] opacity-100 w-full px-[7%] flex justify-between items-center bg-main-green transition-all duration-300`}
          >
            <div className="font-main-font text-white text-[14px] flex gap-5">
              <a href="#" className="hover:underline">
                About us
              </a>
              <span className="text-off-white">|</span>
              <a href="#" className="hover:underline">
                Free Delivery
              </a>
              <span className="text-off-white">|</span>
              <a href="#" className="hover:underline">
                Return Policy
              </a>
            </div>
            <div className="font-main-font text-white text-[14px] flex gap-5 items-center">
              <div className="dropdown relative">
                <button className="border-none cursor-pointer h-[37px] hover:underline">
                  Help Center
                </button>
                <ul className="dropdown-content absolute hidden bg-white text-black mt-1 p-2 rounded shadow-lg">
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      Call Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      Live Chat
                    </a>
                  </li>
                </ul>
              </div>
              <span className="text-off-white">|</span>
              <div className="dropdown relative">
                <button className="border-none cursor-pointer h-[37px] hover:underline">
                  English
                </button>
                <ul className="dropdown-content absolute hidden bg-white text-black mt-1 p-2 rounded shadow-lg">
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      English
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      Japan
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      French
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      German
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      Bangladesh
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      South Korea
                    </a>
                  </li>
                </ul>
              </div>
              <span className="text-off-white">|</span>
              <div className="dropdown relative">
                <button className="border-none cursor-pointer h-[37px] hover:underline">
                  USD
                </button>
                <ul className="dropdown-content absolute hidden bg-white text-black mt-1 p-2 rounded shadow-lg">
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      USD
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      Yen
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      Franc
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      EURO
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      BDT
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-100 p-2 block">
                      WON
                    </a>
                  </li>
                </ul>
              </div>
              <span className="text-off-white">|</span>
              <div className="h-[37px] flex items-center">
                <a href="#" className="hover:underline">
                  My Account
                </a>
              </div>
            </div>
          </div>
        )}
        {isScrolled ? (
          <div
            className={`shadow-md h-[75px] w-full px-[7%] flex justify-between items-center bg-light-green`}
          >
            <div className="h-[48px] w-full flex justify-between items-center">
              <img src="logo.png" alt="logo" className="h-[44px]" />
              <div className="flex border border-border-gray px-2 py-1 rounded-full gap-2 w-[700px]">
                <div className="relative min-w-[150px] text-dark-black">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex justify-between items-center w-full px-4 py-2 ${
                      isOpen ? "text-main-green" : "text-black"
                    } border-r border-border-gray`}
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
                        className="w-full p-2 border-b border-border-gray focus:outline-none"
                      />
                      <ul className="max-h-40 overflow-auto">
                        {items
                          .filter((item) =>
                            item
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
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
                <div className="flex flex-1 items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search for a product or brand"
                    className="w-full border-none text-dark-black focus:outline-none"
                  />
                  <button className="bg-main-green h-[32px] w-[32px] rounded-full flex items-center justify-center">
                    <IoIosSearch size={24} color="white" />
                  </button>
                </div>
              </div>
              <div className="flex gap-4 text-[20px] text-light-black">
                <a href="#" className="hover:text-main-green">
                  Wishlist
                </a>
                <a href="#" className="hover:text-main-green">
                  Cart
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`h-[110px] w-full px-[7%] flex justify-between items-center bg-light-green`}
          >
            <div className="h-[48px] w-full flex justify-between items-center">
              <img src="logo.png" alt="logo" className="h-[44px]" />
              <div className="flex border border-border-gray px-2 py-1 rounded-full gap-2 w-[700px]">
                <div className="relative min-w-[150px] text-dark-black">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex justify-between items-center w-full px-4 py-2 ${
                      isOpen ? "text-main-green" : "text-black"
                    } border-r border-border-gray`}
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
                        className="w-full p-2 border-b border-border-gray focus:outline-none"
                      />
                      <ul className="max-h-40 overflow-auto">
                        {items
                          .filter((item) =>
                            item
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
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
                <div className="flex flex-1 items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search for a product or brand"
                    className="w-full border-none text-dark-black focus:outline-none"
                  />
                  <button className="bg-main-green h-[32px] w-[32px] rounded-full flex items-center justify-center">
                    <IoIosSearch size={24} color="white" />
                  </button>
                </div>
              </div>
              <div className="flex gap-4 text-[20px] text-light-black">
                <a href="#" className="hover:text-main-green">
                  Wishlist
                </a>
                <a href="#" className="hover:text-main-green">
                  Cart
                </a>
              </div>
            </div>
          </div>
        )}
        {isScrolled ? (
          <nav
            className={`h-0 opacity-0 px-[7%] w-full flex justify-between items-center border-b border-border-gray transition-all duration-300`}
          >
            <div className="relative text-dark-black flex items-center gap-20 h-full">
              <button
                onClick={() => setIsSideModalOpen(!isSideModalOpen)}
                className="group flex items-center gap-4 hover:text-main-green"
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
                <div className="flex">
                  <div className="w-72 p-4">
                    <h2 className="text-xl font-bold mb-4">Categories</h2>
                    <button
                      onClick={() => setShowNestedModal(true)}
                      className="w-full text-left p-2 hover:bg-gray-100 rounded"
                    >
                      Shop by Category →
                    </button>
                  </div>
                  {showNestedModal && (
                    <div className="w-72 p-4 border-l">
                      <h2 className="text-xl font-bold mb-4">Subcategories</h2>
                      <button
                        onClick={() => setShowNestedThirdModal(true)}
                        className="w-full text-left p-2 hover:bg-gray-100 rounded"
                      >
                        Subcategory Options →
                      </button>
                    </div>
                  )}
                  {showNestedThirdModal && (
                    <div className="w-72 p-4 border-l">
                      <h2 className="text-xl font-bold mb-4">Products</h2>
                      <div className="p-2 hover:bg-gray-100 rounded">
                        Product 1
                      </div>
                      <div className="p-2 hover:bg-gray-100 rounded">
                        Product 2
                      </div>
                      <div className="p-2 hover:bg-gray-100 rounded">
                        Product 3
                      </div>
                    </div>
                  )}
                </div>
              </LeftSideModal>
              <div className="flex gap-10 h-full">
                <div className="dropdown relative h-full">
                  <button className="flex items-center h-full font-semibold text-light-black hover:text-main-green">
                    Home
                  </button>
                  <ul className="dropdown-content absolute hidden bg-white text-black mt-1 p-2 rounded shadow-lg">
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Home 01
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Home 02
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Home 03
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Home 04
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown relative h-full">
                  <button className="flex items-center h-full font-semibold text-light-black hover:text-main-green">
                    Product
                  </button>
                  <ul className="dropdown-content absolute hidden bg-white text-black mt-1 p-2 rounded shadow-lg">
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Product
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Product 01
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Product 02
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Product 03
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Product 04
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Product 05
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown relative h-full">
                  <button className="flex items-center h-full font-semibold text-light-black hover:text-main-green">
                    Pages
                  </button>
                  <ul className="dropdown-content absolute hidden bg-white text-black mt-1 p-2 rounded shadow-lg">
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Pages
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Pages 01
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Pages 02
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Pages 03
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Pages 04
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Pages 05
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown relative h-full">
                  <button className="flex items-center h-full font-semibold text-light-black hover:text-main-green">
                    Blog
                  </button>
                  <ul className="dropdown-content absolute hidden bg-white text-black mt-1 p-2 rounded shadow-lg">
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Blog 01
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Blog 02
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Blog 03
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Blog 04
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Blog 05
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center font-semibold text-light-black hover:text-main-green">
                  <a href="#">Contact Us</a>
                </div>
              </div>
            </div>
            <div className="flex items-center bg-main-green p-[10px] text-white text-[18px] font-semibold">
              <FaPhoneVolume className="mr-2" />
              <span>(+88) 01784251150</span>
            </div>
          </nav>
        ) : (
          <nav
            className={`h-[56px] opacity-100 px-[7%] w-full flex justify-between items-center border-b border-border-gray transition-all duration-300`}
          >
            <div className="relative text-dark-black flex items-center gap-20 h-full">
              <button
                onClick={() => setIsSideModalOpen(!isSideModalOpen)}
                className="group flex items-center gap-4 hover:text-main-green"
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
                <div className="flex">
                  <div className="w-72 p-4">
                    <h2 className="text-xl font-bold mb-4">Categories</h2>
                    <button
                      onClick={() => setShowNestedModal(true)}
                      className="w-full text-left p-2 hover:bg-gray-100 rounded"
                    >
                      Shop by Category →
                    </button>
                  </div>
                  {showNestedModal && (
                    <div className="w-72 p-4 border-l">
                      <h2 className="text-xl font-bold mb-4">Subcategories</h2>
                      <button
                        onClick={() => setShowNestedThirdModal(true)}
                        className="w-full text-left p-2 hover:bg-gray-100 rounded"
                      >
                        Subcategory Options →
                      </button>
                    </div>
                  )}
                  {showNestedThirdModal && (
                    <div className="w-72 p-4 border-l">
                      <h2 className="text-xl font-bold mb-4">Products</h2>
                      <div className="p-2 hover:bg-gray-100 rounded">
                        Product 1
                      </div>
                      <div className="p-2 hover:bg-gray-100 rounded">
                        Product 2
                      </div>
                      <div className="p-2 hover:bg-gray-100 rounded">
                        Product 3
                      </div>
                    </div>
                  )}
                </div>
              </LeftSideModal>
              <div className="flex gap-10 h-full">
                <div className="dropdown relative h-full">
                  <button className="flex items-center h-full font-semibold text-light-black hover:text-main-green">
                    Home
                  </button>
                  <ul className="dropdown-content absolute hidden bg-white text-black mt-1 p-2 rounded shadow-lg">
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Home 01
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Home 02
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Home 03
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Home 04
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown relative h-full">
                  <button className="flex items-center h-full font-semibold text-light-black hover:text-main-green">
                    Product
                  </button>
                  <ul className="dropdown-content absolute hidden bg-white text-black mt-1 p-2 rounded shadow-lg">
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Product
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Product 01
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Product 02
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Product 03
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Product 04
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Product 05
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown relative h-full">
                  <button className="flex items-center h-full font-semibold text-light-black hover:text-main-green">
                    Pages
                  </button>
                  <ul className="dropdown-content absolute hidden bg-white text-black mt-1 p-2 rounded shadow-lg">
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Pages
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Pages 01
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Pages 02
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Pages 03
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Pages 04
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Pages 05
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown relative h-full">
                  <button className="flex items-center h-full font-semibold text-light-black hover:text-main-green">
                    Blog
                  </button>
                  <ul className="dropdown-content absolute hidden bg-white text-black mt-1 p-2 rounded shadow-lg">
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Blog 01
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Blog 02
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Blog 03
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Blog 04
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:bg-gray-100 p-2 block">
                        Blog 05
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center font-semibold text-light-black hover:text-main-green">
                  <a href="#">Contact Us</a>
                </div>
              </div>
            </div>
            <div className="flex items-center bg-main-green p-[10px] text-white text-[18px] font-semibold">
              <FaPhoneVolume className="mr-2" />
              <span>(+88) 01784251150</span>
            </div>
          </nav>
        )}
      </header>

      <div
        className={`grid grid-cols-2 px-[7%] transition-all duration-300 h-screen w-full ${
          isScrolled ? "pt-[112px]" : "pt-[203px]"
        }`}
      >
        <div className="image-carousel">
          <ImageSlider product={product}/> {/* Add the ImageCarousel component here */}
        </div>
        <div className="image-carousel">
          <ImageSlider product={product}/> {/* Add the ImageCarousel component here */}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;