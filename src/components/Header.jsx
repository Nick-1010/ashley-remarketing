import React from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export default function Header() {
  const phoneNumber = "(518) 542-1234";
  
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber.replace(/[^0-9]/g, '')}`;
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 py-3 md:py-4 border-b bg-white shadow-sm">
      <button
        onClick={handleCall}
        className="flex items-center gap-2 px-3 md:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm md:text-base"
      >
        <Phone size={16} className="md:hidden" />
        <Phone size={18} className="hidden md:block" />
        <span className="hidden sm:inline">{phoneNumber}</span>
        <span className="sm:hidden">Call</span>
      </button>
    </header>
  );
}