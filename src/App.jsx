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

function Marketplace() {
  const [filters, setFilters] = useState({
    category: 'all',
  });
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

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
      {/* Sidebar - Full height on left */}
      <Sidebar onFilterChange={handleFilterChange} activeCategory={filters.category} />

      {/* Main content area - Right side */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-x-hidden">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Today's Picks for You</h1>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading vehicles...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 w-full">
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
        <Route path="/" element={<Marketplace />} />
        <Route path="/vehicle/:id" element={<VehicleDetail />} />
        <Route path="/contact/:id" element={<ContactDealer />} />  {/* This line */}
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