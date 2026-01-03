import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const phoneNumber = "(518) 542-1234";
  
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber.replace(/[^0-9]/g, '')}`;
  };

  return (
    <footer className="bg-white text-white mt-auto w-full">
      <div className="max-w-screen-2xl mx-auto px-4 py-8">        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ashley Remarketing Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}