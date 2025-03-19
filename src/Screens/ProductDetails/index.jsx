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
import { LuShoppingCart, LuHeart } from "react-icons/lu";

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
          <div className="h-[37px] w-full px-[calc(7%)] flex justify-between items-center bg-logo-gold">
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
        ) : (
          <div className="h-[37px] w-full px-[calc(7%)] flex justify-between items-center bg-logo-gold">
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
        )}
        {isScrolled ? (
          <div className="h-[75px] w-full px-[calc(7%)] flex justify-between items-center bg-black">
            <div className="h-full w-full font-main-font text-white flex flex-row justify-between gap-5 items-center">
              <img src="logo.png" alt="logo" className="w-[105px] h-full" />
              <div className="h-[48px] flex flex-row border-1 border-gray-500 px-2 py-1 rounded-full gap-2">
                <div className="relative min-w-[150px] text-dark-black">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex justify-between items-center w-full px-4 py-2 ${
                      isOpen ? "text-logo-light" : "text-gray-300"
                    } border-r-1 border-border-gray`}
                  >
                    {selectedItem}
                    {isOpen ? (
                      <IoIosArrowUp size={18} className="text-logo-light" />
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
                        className="w-full p-2 border-b border-border-gray focus:border-logo-gold  focus:outline-none"
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
                <div className="flex justify-between items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search for a product or brand"
                    className="min-w-[520px] border-none text-gray-300 focus:outline-none"
                  />
                  <button className="bg-logo-gold h-[32px] w-[32px] rounded-full flex items-center justify-center cursor-pointer">
                    <IoIosSearch size={24} color="white" />
                  </button>
                </div>
              </div>
              <div className="h-[48px] flex justify-between items-center text-[20px] text-light-black flex-row gap-4">
                <a
                  href="#"
                  className="relative text-sm text-gray-300 hover:text-logo-light flex items-center gap-4"
                >
                  <LuHeart size={24} className="text-gray-300" />
                  <span className="absolute -top-2 left-4 bg-red-500 text-white text-xs font-semibold h-5 w-5 flex justify-center text-center rounded-full">
                    {2}
                  </span>
                  Wishlist
                </a>
                <a
                  href="#"
                  className="relative text-sm text-gray-300 hover:text-logo-light flex items-center gap-4"
                >
                  <LuShoppingCart size={24} className="text-gray-300" />
                  <span className="absolute -top-2 left-4 bg-red-500 text-white text-xs font-semibold h-5 w-5 flex justify-center text-center rounded-full">
                    {2}
                  </span>
                  Cart
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[110px] w-full px-[calc(7%)] flex justify-between items-center bg-black">
            <div className="h-full w-full font-main-font text-white flex flex-row justify-between gap-5 items-center">
              <img src="logo.png" alt="logo" className="w-[105px] h-full" />
              <div className="h-[48px] flex flex-row border-1 border-gray-500 px-2 py-1 rounded-full gap-2">
                <div className="relative min-w-[150px] text-dark-black">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex justify-between items-center w-full px-4 py-2 ${
                      isOpen ? "text-logo-light" : "text-gray-300"
                    } border-r-1 border-border-gray`}
                  >
                    {selectedItem}
                    {isOpen ? (
                      <IoIosArrowUp size={18} className="text-logo-light" />
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
                        className="w-full p-2 border-b border-border-gray focus:border-logo-gold  focus:outline-none"
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
                <div className="flex justify-between items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search for a product or brand"
                    className="min-w-[520px] border-none text-gray-300 focus:outline-none"
                  />
                  <button className="bg-logo-gold h-[32px] w-[32px] rounded-full flex items-center justify-center cursor-pointer">
                    <IoIosSearch size={24} color="white" />
                  </button>
                </div>
              </div>
              <div className="h-[48px] flex justify-between items-center text-[20px] text-light-black flex-row gap-4">
                <a
                  href="#"
                  className="relative text-sm text-gray-300 hover:text-logo-light flex items-center gap-4"
                >
                  <LuHeart size={24} className="text-gray-300" />
                  <span className="absolute -top-2 left-4 bg-red-500 text-white text-xs font-semibold h-5 w-5 flex justify-center text-center rounded-full">
                    {2}
                  </span>
                  Wishlist
                </a>
                <a
                  href="#"
                  className="relative text-sm text-gray-300 hover:text-logo-light flex items-center gap-4"
                >
                  <LuShoppingCart size={24} className="text-gray-300" />
                  <span className="absolute -top-2 left-4 bg-red-500 text-white text-xs font-semibold h-5 w-5 flex justify-center text-center rounded-full">
                    {2}
                  </span>
                  Cart
                </a>
              </div>
            </div>
          </div>
        )}
        {isScrolled ? (
          <nav class="px-[calc(7%)] h-0 opacity-0 w-full flex justify-between items-center">
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
                  <div
                    className={`w-72 ${showNestedThirdModal ? "" : "hidden"}`}
                  >
                    Modal 03
                  </div>
                </div>
              </LeftSideModal>
              <div className="flex flex-row justify-between items-center gap-10 h-full">
                <div className="h-full flex flex-row items-center font-semibold text-light-black text-[16px]">
                  <a
                    href="/"
                    className="whitespace-nowrap hover:text-logo-gold"
                  >
                    Home
                  </a>
                </div>
                <div className="h-full flex flex-row items-center font-semibold text-light-black text-[16px]">
                  <a
                    href="/products"
                    className="whitespace-nowrap hover:text-logo-gold"
                  >
                    Sneakers
                  </a>
                </div>
                <div className="h-full flex flex-row items-center font-semibold text-light-black text-[16px]">
                  <a
                    href="#"
                    className="whitespace-nowrap hover:text-logo-gold"
                  >
                    About Us
                  </a>
                </div>
                <div className="h-full flex flex-row items-center font-semibold text-light-black text-[16px]">
                  <a
                    href="#"
                    className="whitespace-nowrap hover:text-logo-gold"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center h-full bg-logo-gold p-[10px] text-white text-[18px] font-semibold tracking-wide">
              <button className="h-[32px] w-[32px] flex justify-center items-center">
                <FaPhoneVolume size={24} />
              </button>
              <span>(+880) 1533-443596</span>
            </div>
          </nav>
        ) : (
          <nav class="px-[calc(7%)] h-[56px] w-full flex justify-between items-center">
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
                  <div
                    className={`w-72 ${showNestedThirdModal ? "" : "hidden"}`}
                  >
                    Modal 03
                  </div>
                </div>
              </LeftSideModal>
              <div className="flex flex-row justify-between items-center gap-10 h-full">
                <div className="h-full flex flex-row items-center font-semibold text-light-black text-[16px]">
                  <a
                    href="/"
                    className="whitespace-nowrap hover:text-logo-gold"
                  >
                    Home
                  </a>
                </div>
                <div className="h-full flex flex-row items-center font-semibold text-light-black text-[16px]">
                  <a
                    href="/products"
                    className="whitespace-nowrap hover:text-logo-gold"
                  >
                    Sneakers
                  </a>
                </div>
                <div className="h-full flex flex-row items-center font-semibold text-light-black text-[16px]">
                  <a
                    href="#"
                    className="whitespace-nowrap hover:text-logo-gold"
                  >
                    About Us
                  </a>
                </div>
                <div className="h-full flex flex-row items-center font-semibold text-light-black text-[16px]">
                  <a
                    href="#"
                    className="whitespace-nowrap hover:text-logo-gold"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center h-full bg-logo-gold p-[10px] text-white text-[18px] font-semibold tracking-wide">
              <button className="h-[32px] w-[32px] flex justify-center items-center">
                <FaPhoneVolume size={24} />
              </button>
              <span>(+880) 1533-443596</span>
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
