import { Link } from "react-router-dom";
import { useState } from "react";
import { Phone, Mail } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function SellPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleType: 'Boat',
    vehicleInfo: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.vehicleInfo) {
      alert('Please fill in name, email, and vehicle information');
      return;
    }

    try {
      // Send email via EmailJS
      await emailjs.send(
        'service_6uyywyn',  // Your service ID
        'template_52k747f',  // Same template (or create a new one for sell inquiries)
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || 'Not provided',
          vehicle_title: `${formData.vehicleType} - Sell Inquiry`,
          vehicle_price: 'N/A',
          message: `Vehicle Type: ${formData.vehicleType}\n\nVehicle Info: ${formData.vehicleInfo}\n\nAdditional Details: ${formData.message || 'None provided'}`
        },
        'ObNA7A-rOjKtGCnFR'  // Your public key
      );

      alert(`Thank you ${formData.name}! We'll review your inquiry and contact you soon at ${formData.email}`);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        vehicleType: 'Boat',
        vehicleInfo: '',
        message: ''
      });
    } catch (error) {
      console.error('Email send failed:', error);
      alert('Failed to send inquiry. Please call us directly at (518) 542-1234');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link to="/">
            <img 
              src="/sizedlogo.png" 
              alt="Ashley Remarketing Services" 
              className="h-16"
            />
          </Link>
          <Link 
            to="/"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Sell Your Vehicle to ARS
            </h1>
            <p className="text-xl text-gray-600">
              Looking to sell your boat, RV, or trailer? We're interested! 
              Fill out the form below and we'll get back to you shortly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Inquiry Form</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="(555) 555-5555"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Type *
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="Boat">Boat</option>
                    <option value="RV">RV</option>
                    <option value="Trailer">Trailer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Information *
                  </label>
                  <textarea
                    name="vehicleInfo"
                    value={formData.vehicleInfo}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    placeholder="Year, make, model, mileage, condition, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    placeholder="Any additional information you'd like to share..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium"
                >
                  Submit Inquiry
                </button>
              </div>
            </div>

            {/* Right: Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Sell to ARS?</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Quick and easy process</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Fair market value offers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Fast payment upon agreement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>We handle all paperwork</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Years of experience in the industry</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us Directly</h3>
                <div className="space-y-4">
                  <a 
                    href="tel:5185421234"
                    className="flex items-center gap-3 text-gray-700 hover:text-red-600"
                  >
                    <Phone size={20} />
                    <span>(518) 542-1234</span>
                  </a>
                  <a 
                    href="mailto:buyingboats@gmail.com"
                    className="flex items-center gap-3 text-gray-700 hover:text-red-600"
                  >
                    <Mail size={20} />
                    <span>buyingboats@gmail.com</span>
                  </a>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> After submitting, we'll review your vehicle information 
                  and reach out within 1-2 business days to discuss next steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-8">
        <div className="max-w-6xl mx-auto text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Ashley Remarketing Services. All rights reserved.
        </div>
      </footer>
    </div>
  );
}