import { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LuShoppingCart } from "react-icons/lu";
import { FaStar } from "react-icons/fa";

export default function TestCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      name: "P 1",
    },
    {
      name: "P 2",
    },
    {
      name: "P 3",
    },
    {
      name: "P 4",
    },
    {
      name: "P 5",
    },
    {
      name: "P 6",
    },
    {
      name: "P 7",
    },
    {
      name: "P 8",
    },
    {
      name: "P 9",
    },
    {
      name: "P 10",
    },
    {
      name: "P 11",
    },
    {
      name: "P 12",
    },
    {
      name: "P 13",
    },
    {
      name: "P 14",
    },
    {
      name: "P 15",
    },
    {
      name: "P 16",
    },
    {
      name: "P 17",
    },
    {
      name: "P 18",
    },
    {
      name: "P 19",
    },
    {
      name: "P 20",
    },
    {
      name: "P 21",
    },
    {
      name: "P 22",
    },
    {
      name: "P 23",
    },
    {
      name: "P 24",
    },
    {
      name: "P 25",
    },
    {
      name: "P 26",
    },
    {
      name: "P 27",
    },
    {
      name: "P 28",
    },
  ];

  // Split products into chunks of 4
  const productChunks = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < products.length; i += 4) {
      chunks.push(products.slice(i, i + 4));
    }
    return chunks;
  }, [products]);

  const totalSlides = productChunks.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="w-full border border-border-gray rounded-2xl hover:border-main-green p-4 flex flex-col items-center shadow-sm hover:shadow-md">
      {/* Heading with navigation buttons */}
      <div className="w-full flex justify-between items-center bg-add-cart p-4 rounded-xl mb-4">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <div className="w-full bg-gray-200 rounded-full h-[2px]">
            <div className="bg-main-green h-[2px] rounded-full w-3/4"></div>
          </div>
        </div>

        <div className="flex gap-2 items-center">
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
      <div className="overflow-hidden w-full">
        <div className="w-full overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {productChunks.map((chunk, index) => (
              <div key={index} className="w-full flex-shrink-0 py-4 px-2">
                <div className="grid grid-rows-4 gap-10">
                  {chunk.map((product, productIndex) => (
                    <div
                      key={productIndex}
                      className="flex flex-row items-center gap-6"
                    >
                      <div className="w-1/4 border-1 border-border-gray rounded-lg h-[90px] w-[90px] flex items-center bg-gray-50">
                        <img
                          src="1.png"
                          alt={product.name}
                          className="w-full h-auto object-fit rounded-lg"
                        />
                      </div>
                      <div className="w-3/4 flex flex-col items-left">
                        <div className="flex items-center gap-1">
                          <div className="flex items-center text-yellow-400">
                            <FaStar size={16} />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            4.8
                          </span>
                          <span className="text-sm text-gray-400">(17k)</span>
                        </div>
                        <h3 className="text-lg font-semibold text-large-text">
                          Taylor Farms Broccoli
                        </h3>
                        <div className="flex items-end gap-1">
                          <span className="text-lg font-bold text-large-text">
                            $14.99
                          </span>
                          <span className="ml-2 text-base text-gray-400 line-through">
                            $28.99
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
