import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const phoneNumber = "(518) 542-1234";
  
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber.replace(/[^0-9]/g, '')}`;
  };

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-3">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <div>
                <button 
                  onClick={handleCall}
                  className="text-gray-300 hover:text-white"
                >
                  📞 {phoneNumber}
                </button>
              </div>
              <div>
                <a 
                  href="mailto:buyingboats@gmail.com"
                  className="text-gray-300 hover:text-white"
                >
                  ✉️ buyingboats@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <div>
                <a 
                  href="https://www.google.com/maps/place/Ashley+Remarketing+Services/@42.6234982,-73.7417869,17z/data=!3m1!4b1!4m6!3m5!1s0x89dde3559a552ee7:0x834527b177e88f76!8m2!3d42.6234982!4d-73.739212!16s%2Fg%2F11gj_k2rdy?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white block"
                >
                  ⭐ Read Our Google Reviews
                </a>
              </div>
              <div>
                <Link to="/login" className="text-gray-300 hover:text-white block">
                  Staff Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ashley Remarketing Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}