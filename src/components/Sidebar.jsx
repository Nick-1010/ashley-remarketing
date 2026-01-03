import React from "react";
import { Link } from "react-router-dom";
import { Sailboat, Bus, Caravan, Plus, Phone, Mail, Lock } from "lucide-react";

export default function Sidebar({ onFilterChange, activeCategory }) {
  const handleCategoryClick = (category) => {
    onFilterChange({ category });
  };

  return (
    <aside className="w-64 border-r bg-white h-screen sticky top-0 flex flex-col">
      {/* TOP: Fixed logo section */}
      <div className="px-4 py-6 bg-white">
        <img 
          src="/sizedlogo.png" 
          alt="Ashley Remarketing Services" 
          className="w-full h-auto"
        />
      </div>

      {/* MIDDLE: Scrollable categories section */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <nav className="space-y-2">
          <div className="text-sm uppercase font-semibold mb-2 text-gray-900">Inventory</div>
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => handleCategoryClick('all')}
                className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded hover:bg-slate-50 ${
                  activeCategory === 'all' ? 'bg-slate-100 font-medium' : ''
                }`}
              >
                All Vehicles
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('Boats')}
                className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded hover:bg-slate-50 ${
                  activeCategory === 'Boats' ? 'bg-slate-100 font-medium' : ''
                }`}
              >
                <Sailboat size={16} /> Boats
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('RVs')}
                className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded hover:bg-slate-50 ${
                  activeCategory === 'RVs' ? 'bg-slate-100 font-medium' : ''
                }`}
              >
                <Bus size={16} /> RVs
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('Trailers')}
                className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded hover:bg-slate-50 ${
                  activeCategory === 'Trailers' ? 'bg-slate-100 font-medium' : ''
                }`}
              >
                <Caravan size={16} /> Trailers
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('Other')}
                className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded hover:bg-slate-50 ${
                  activeCategory === 'Other' ? 'bg-slate-100 font-medium' : ''
                }`}
              >
                <Plus size={16} /> Other
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* BOTTOM: Fixed contact info section */}
      <div className="p-4 border-t bg-white/95 backdrop-blur-sm mt-auto">
        <div className="text-sm text-slate-600 space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Contact Dealership</h3>
          {/* Use 'flex items-center' and add a small gap for spacing */}
          <div className="font-medium text-gray-900 flex items-center gap-2"> 
            <Phone size={16} />
            (518) 542-1234
          </div>
          <div className="font-medium text-gray-900 flex items-center gap-2"> 
            <Mail size={16} />
            buyingboats@gmail.com
          </div>

          <hr className ="bg-border/50" />

          <div className="mt-2">
            <Link to="/login" className="underline text-xs hover:text-gray-900 flex items-center gap-1">
              <Lock size={16} /> Staff Login
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}