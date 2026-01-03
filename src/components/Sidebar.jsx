import React, { useState } from "react";
import { Sailboat, Truck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar({ onFilterChange, activeCategory }) {
  const handleCategoryClick = (category) => {
    onFilterChange({ category });
  };

  return (
    <aside className="w-72 border-r p-4 flex flex-col justify-between bg-white">
      <div>
        <nav className="space-y-2">
          <div className="text-sm uppercase font-semibold mb-2 text-gray-900">Categories</div>
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => handleCategoryClick('all')}
                className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded hover:bg-gray-600 ${
                  activeCategory === 'all' ? 'bg-red-600' : ''
                }`}
              >
                All Vehicles
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('boats')}
                className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded hover:bg-gray-600 ${
                  activeCategory === 'boats' ? 'bg-red-600' : ''
                }`}
              >
                <Sailboat size={16} /> Boats
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('rvs')}
                className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded hover:bg-gray-600 ${
                  activeCategory === 'rvs' ? 'bg-red-600' : ''
                }`}
              >
                <Truck size={16} /> RVs
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}