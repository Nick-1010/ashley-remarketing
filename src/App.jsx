import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ListingCard from "./components/ListingCard";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import VehicleDetail from "./pages/VehicleDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import { supabase } from "./lib/supabaseClient";
import ContactDealer from "./pages/ContactDealer";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import SellPage from "./pages/SellPage";
import AboutPage from "./pages/AboutPage";

function Marketplace() {
  const [filters, setFilters] = useState({
    category: 'all',
  });
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);
  
  const fetchInventory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .order('created_at', { ascending: false });
    
      if (error) throw error;
      setInventory(data || []);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilters(prev => ({ ...prev, ...newFilter }));
  };

  const filteredItems = inventory.filter(item => {
    const matchesCategory = filters.category === 'all' || item.category === filters.category;
    return matchesCategory;
  });

    return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
        
      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
  
      {/* Sidebar - Hidden on mobile unless menu is open */}
      <div className={`
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition-transform duration-300 ease-in-out
        fixed md:static inset-y-0 left-0 z-40
      `}>
        <Sidebar onFilterChange={handleFilterChange} activeCategory={filters.category} />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col w-full">
        <Header />
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Vehicle Listings</h1>
            <p className="text-gray-600">{filteredItems.length} vehicles found</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading vehicles...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 w-full">
                {filteredItems.map((item) => (
                  <ListingCard key={item.id} item={item} />
                ))}
              </div>
              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No vehicles found matching your filters.</p>
                </div>
              )}
            </>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/vehicle/:id" element={<VehicleDetail />} />
        <Route path="/contact/:id" element={<ContactDealer />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}