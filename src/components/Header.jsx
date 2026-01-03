import React from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export default function Header() {
  const phoneNumber = "(518) 542-1234";
  
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber.replace(/[^0-9]/g, '')}`;
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-white">
      <Link 
        to="/" 
        className="hover:opacity-80 transition-opacity"
      >
        <img 
          src="/sizedlogo.png" 
          alt="Ashley Remarketing Services" 
          className="h-20"
        />
      </Link>
      <button
        onClick={handleCall}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
      >
        <Phone size={18} />
        <span>{phoneNumber}</span>
      </button>
    </header>
  );
}