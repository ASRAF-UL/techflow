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
import { useParams } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import Footer from "../../components/footer";

function ProductDetails() {
  const { productName } = useParams();
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
  const [products, setProducts] = useState([]);

  // Add this useEffect for fetching products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://adminecommerce.resnova.dev/api/productList"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data); // Assuming the API returns data in a 'data' property
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
      console.log("Product name: ", productName);
      try {
        const response = await axios.get(
          `https://adminecommerce.resnova.dev/api/productDetail?productName=${productName}`
        );
        console.log("single product: ", response.data);
        if (response.data) {
          setProduct(response.data); // Assuming the API returns an array of products
        } else {
          setError("Product not found!!!!");
        }
      } catch (err) {
        setError("Failed to fetch product details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productName]); // Re-run the effect when the productName changes

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
              <img
                src="http://localhost:3000/logo.png"
                alt="logo"
                className="h-[44px]"
              />
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
              <img
                src="http://localhost:3000/logo.png"
                alt="logo"
                className="h-[44px]"
              />
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
        className={`flex flex-row gap-10 px-[10%] transition-all duration-300 h-screen w-full ${
          isScrolled ? "pt-[112px]" : "pt-[230px]"
        }`}
      >
        <div
          className="w-[40%] h-full image-carousel"
          style={{ top: isScrolled ? "7rem" : "12.688rem" }}
        >
          <ImageSlider product={product} />{" "}
          <div className="py-5 w-full">
            <h1 className="font-rajdhani w-full border-b-1 border-black pb-2 text-2xl">
              Frequently Bought Together
            </h1>
            <div className="grid grid-cols-4 gap-4 py-4">
              <img
                src={`https://adminecommerce.resnova.dev/${product.productImageFront}`}
                alt="product"
                className="h-auto w-full object-fit cursor-pointer"
              />
              <div className="col-span-3 py-2 flex flex-col gap-2">
                <h1 className="font-rajdhani w-full text-lg">
                  {product.productName}
                </h1>
                <div className="flex flex-row items-start gap-1">
                  <h1 className="font-rajdhani text-xl">
                    ৳{product.productSellingPrice}
                  </h1>
                  <span className="ml-2 text-lg text-gray-400 line-through">
                    ৳{Number(product.productSellingPrice) + 50}
                  </span>
                </div>
                <button className="flex gap-2 items-center bg-black px-2 py-1 text-white font-rajdhani w-1/3">
                  <FaPlus size={16} color="white" /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[60%] h-full flex flex-col gap-4">
          <h1 className="font-rajdhani w-full pb-2 text-2xl">
            {product.productName}
          </h1>
          <div className="flex flex-row items-start gap-2">
            <span className="text-lg text-gray-400 line-through">
              ৳{Number(product.productSellingPrice) + 50}
            </span>
            <h1 className="font-rajdhani text-2xl">
              ৳{product.productSellingPrice}
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-rajdhani text-md font=[500]">
              Select Color
            </span>
            <div className="flex flex-row gap-4">
              <button className="px-4 py-1 border-1 border-gray-500 text-md font-rajdhani font-[300] hover:shadow-xl">
                M
              </button>
              <button className="px-4 py-1 border-1 border-gray-500 text-md font-rajdhani font-[300] hover:shadow-xl">
                L
              </button>
              <button className="px-4 py-1 border-1 border-gray-500 text-md font-rajdhani font-[200] hover:shadow-xl">
                XL
              </button>
              <button className="px-4 py-1 border-1 border-gray-500 text-md font-rajdhani font-[200] hover:shadow-xl">
                2XL
              </button>
            </div>
            <div className="flex flex-row gap-4 border-b-1 border-black pb-4">
              <div className="flex flex-row items-center justify-between gap-8 px-2 py-1 border border-gray-500">
                <button>
                  <FaMinus size={16} color="black" />
                </button>
                <span className="font-rajdhani text-lg">{1}</span>
                <button>
                  <FaPlus size={16} color="black" />
                </button>
              </div>
              <button className="flex gap-2 items-center bg-gray-900 hover:bg-black px-4 py-1 text-white font-rajdhani">
                <FaPlus size={16} color="white" /> Add to Cart
              </button>
            </div>
            <p
              className="font-rajdhani text-justify"
              dangerouslySetInnerHTML={{ __html: product.productDetail }}
            ></p>
          </div>
        </div>
      </div>
      <div className="w-full px-[10%] flex flex-col gap-4 py-4">
        <h1 className="font-rajdhani w-full border-b-1 border-black pb-2 text-2xl">
          You may also like
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-2 w-full items-center justify-center"
            >
              <img
                src={`https://adminecommerce.resnova.dev/${product.productImageFront}`}
                alt="product"
                className="h-[260px] w-full object-fit cursor-pointer"
              />
              <div className="flex flex-row items-center justify-center -mt-6 gap-2 shadow-lg rounded w-1/2">
                <span className="text-sm text-gray-400 line-through">
                  ৳{Number(product.productSellingPrice) + 50}
                </span>
                <h1 className="font-rajdhani text-md">
                  ৳{product.productSellingPrice}
                </h1>
              </div>
              <button className="w-full flex items-center justify-center gap-2 items-center bg-black px-4 py-1 text-white text-sm font-rajdhani">
                <FaPlus size={16} color="white" /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetails;
