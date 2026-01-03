import React from "react";
import { Phone } from "lucide-react";

export default function Header() {
  const phoneNumber = "(518) 542-1234";
  
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber.replace(/[^0-9]/g, '')}`;
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-end px-8 py-4 border-b bg-white shadow-sm">
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