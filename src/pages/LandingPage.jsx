import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function LandingPage() {
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img 
              src="/sizedlogo.png" 
              alt="Ashley Remarketing Services" 
              className="h-16"
            />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            {/* About Us Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowAboutDropdown(true)}
              onMouseLeave={() => setShowAboutDropdown(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
                About Us
                <ChevronDown size={16} />
              </button>

              {showAboutDropdown && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border py-2">
                  <Link 
                    to="/about"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Our Story
                  </Link>
                  <Link 
                    to="/contact"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Contact Us
                  </Link>
                  <a 
                    href="https://www.google.com/maps/place/Ashley+Remarketing+Services/@42.6234982,-73.7417869,17z/data=!3m1!4b1!4m6!3m5!1s0x89dde3559a552ee7:0x834527b177e88f76!8m2!3d42.6234982!4d-73.739212!16s%2Fg%2F11gj_k2rdy?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Reviews
                  </a>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Quality Boats, RVs & Trailers
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your trusted source for pre-owned recreational vehicles. 
            Browse our inventory or sell your vehicle with confidence.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/marketplace"
              className="px-8 py-4 bg-red-600 text-white text-lg rounded-lg hover:bg-red-700 font-medium"
            >
              Browse Inventory
            </Link>
            <Link 
              to="/sell"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 text-lg rounded-lg hover:bg-gray-50 font-medium"
            >
              Sell Your Vehicle
            </Link>
          </div>
        </div>
      </section>

      {/* Features/Benefits Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Ashley Remarketing?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🚤</div>
              <h3 className="text-xl font-bold mb-2">Quality Selection</h3>
              <p className="text-gray-600">
                Carefully curated inventory of boats, RVs, and trailers
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-bold mb-2">Trusted Service</h3>
              <p className="text-gray-600">
                Years of experience helping customers find their perfect vehicle
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Fair Prices</h3>
              <p className="text-gray-600">
                Competitive pricing on all our inventory
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">Ashley Remarketing Services</h3>
            <p className="text-gray-400 text-sm">
              Your trusted source for quality recreational vehicles.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Contact</h3>
            <p className="text-gray-400 text-sm">Phone: (518) 542-1234</p>
            <p className="text-gray-400 text-sm">Email: buyingboats@gmail.com</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <Link to="/marketplace" className="block text-gray-400 text-sm hover:text-white mb-2">
              Browse Inventory
            </Link>
            <Link to="/sell" className="block text-gray-400 text-sm hover:text-white mb-2">
              Sell Your Vehicle
            </Link>
            <Link to="/login" className="block text-gray-400 text-sm hover:text-white">
              Staff Login
            </Link>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Ashley Remarketing Services. All rights reserved.
        </div>
      </footer>
    </div>
  );
}