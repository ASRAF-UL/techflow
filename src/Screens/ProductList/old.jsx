import { useState, useEffect, useRef } from "react";
import {
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosSearch,
  IoIosMenu,
} from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import LeftSideModal from "../../components/sideModal";
import Sidebar from "../../components/sidebar";
import ProductDetails from "../../components/productDetails";
import ProductCard from "../../components/productCard";

function ProductList() {
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState("Shoes");
  const [isSideModalOpen, setIsSideModalOpen] = useState(false);
  const [showNestedModal, setShowNestedModal] = useState(false);
  const [showNestedThirdModal, setShowNestedThirdModal] = useState(false);
  const items = ["Shoes", "Jeans", "T-shirts", "Shirts"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      const scrollTop = containerRef.current?.scrollTop || 0;
      setIsScrolled(scrollTop > 0);
    };

    const currentContainer = containerRef.current;
    currentContainer?.addEventListener("scroll", handleScroll);

    return () => {
      currentContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Scroll Container */}
      <div ref={containerRef} className="flex-1 overflow-y-auto">
        {/* Start Nav */}
        <div
          className={`start-nav w-full px-[7%] flex justify-between items-center bg-main-green transition-all duration-300 ${
            isScrolled ? "h-0 opacity-0" : "h-[37px] opacity-100"
          }`}
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

        {/* Fixed Mid Nav */}
        <div
          className={`mid-nav w-full px-[7%] flex justify-between items-center bg-light-green ${
            isScrolled
              ? "fixed top-0 left-0 right-0 z-50 shadow-md h-[75px]"
              : "relative h-[110px]"
          }`}
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

        {/* Last Nav */}
        <nav
          className={`last-nav px-[7%] w-full flex justify-between items-center border-b border-border-gray transition-all duration-300 ${
            isScrolled ? "h-0 opacity-0" : "h-[56px] opacity-100"
          }`}
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

        {/* Content Area */}
        <div className={`flex h-screen w-full bg-gray-100 px-[7%]`}>
          <Sidebar
            isScrolled={isScrolled}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categories={[
              "All",
              "Men's",
              "Women's",
              "Electronics",
              "Home",
              "Sports",
              "Books",
            ]}
          />
          <main className="flex flex-col overflow-y-auto p-6 bg-red-300 w-full">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {selectedCategory === "All" ? "All Products" : selectedCategory}
              </h1>
              {loading ? (
                <p className="text-gray-600">Loading products...</p>
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : (
                <p className="text-gray-600">
                  {filteredProducts.length} products available
                </p>
              )}
            </div>
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={setSelectedProduct}
                  />
                ))}
              </div>
            )}
          </main>
          {selectedProduct && (
            <ProductDetails
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
