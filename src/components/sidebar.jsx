import React from "react";
import { ListFilter, Tag, Zap } from "lucide-react";
import PropTypes from "prop-types";

const categories = [
  { name: "Mega Deal", count: 43 },
  { name: "New Arrival", count: 48 },
  { name: "Top Selling", count: 240 },
  { name: "Free Delivery", count: 353 },
  {
    name: "Men's",
    count: 938,
    subcategories: [
      { name: "T-Shirts", count: 431 },
      { name: "Shirts", count: 92 },
      { name: "Pants", count: 156 },
      { name: "Jackets", count: 259 },
    ],
  },
  {
    name: "Women's",
    count: 842,
    subcategories: [
      { name: "Dresses", count: 324 },
      { name: "Tops", count: 278 },
      { name: "Skirts", count: 124 },
      { name: "Accessories", count: 116 },
    ],
  },
  {
    name: "Women's",
    count: 842,
    subcategories: [
      { name: "Dresses", count: 324 },
      { name: "Tops", count: 278 },
      { name: "Skirts", count: 124 },
      { name: "Accessories", count: 116 },
    ],
  },
  {
    name: "Women's",
    count: 842,
    subcategories: [
      { name: "Dresses", count: 324 },
      { name: "Tops", count: 278 },
      { name: "Skirts", count: 124 },
      { name: "Accessories", count: 116 },
    ],
  },
  {
    name: "Women's",
    count: 842,
    subcategories: [
      { name: "Dresses", count: 324 },
      { name: "Tops", count: 278 },
      { name: "Skirts", count: 124 },
      { name: "Accessories", count: 116 },
    ],
  },
];

function Sidebar({ selectedCategory, onSelectCategory }) {
  return (
    <div className="w-96 bg-white shadow-lg h-screen p-4 overflow-y-auto">
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="space-y-0">
            <button
              onClick={() => onSelectCategory(category.name)}
              className={`w-full flex items-center justify-between px-2 rounded-lg`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`h-4 w-4 flex items-center justify-center ${
                    selectedCategory === category.name
                      ? "bg-blue-400"
                      : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`h-1 w-1 rounded-full ${
                      selectedCategory === category.name
                        ? "bg-white"
                        : "bg-gray-300"
                    }`}
                  ></div>
                </div>
                <span
                  className={`${
                    category.subcategories ? "" : "text-blue-400 font-[600]"
                  }`}
                >
                  {category.name}
                </span>
              </div>
              <span className="text-sm text-gray-500 px-1 bg-gray-200 rounded">
                {category.count}
              </span>
            </button>

            {category.subcategories && (
              <div className="ml-6 space-y-1">
                {category.subcategories.map((sub) => (
                  <button
                    key={sub.name}
                    onClick={() => onSelectCategory(sub.name)}
                    className={`w-full flex items-center justify-between p-2 text-sm rounded-md`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-4 w-4 flex items-center justify-center ${
                          selectedCategory === category.name
                            ? "bg-blue-400"
                            : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`h-1 w-1 rounded-full ${
                            selectedCategory === category.name
                              ? "bg-white"
                              : "bg-gray-300"
                          }`}
                        ></div>
                      </div>
                      <span>{sub.name}</span>
                    </div>
                    <span className="text-gray-500 px-1 bg-gray-200 rounded">
                      {sub.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default Sidebar;
