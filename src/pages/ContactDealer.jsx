import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import Footer from '../components/Footer';
import emailjs from '@emailjs/browser';

export default function ContactDealer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      setVehicle(data);
      
      // Pre-fill message
      setFormData(prev => ({
        ...prev,
        message: `Hi, I'm interested in the ${data.title} listed for $${data.price.toLocaleString()}.`
      }));
    } catch (error) {
      console.error('Error fetching vehicle:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in name, email, and message');
      return;
    }

    try {
      // Send email via EmailJS
      await emailjs.send(
        'service_6uyywyn',
        'template_52k747f',
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || 'Not provided',
          vehicle_title: vehicle.title,
          vehicle_price: `$${vehicle.price.toLocaleString()}`,
          message: formData.message
        },
        'ObNA7A-rOjKtGCnFR'  // Your public key
      );

      alert(`Thank you ${formData.name}! We've received your inquiry and will contact you soon at ${formData.email}`);
      navigate(-1);
    } catch (error) {
      console.error('Email send failed:', error);
      alert('Failed to send inquiry. Please call us directly at (518) 542-1234');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Not Found</h1>
          <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">
            ← Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Dealer</h1>
          <p className="text-gray-600 mb-6">Interested in this vehicle? Send us a message!</p>

          {/* Vehicle Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 flex gap-4">
            {vehicle.images?.[0] && (
              <img 
                src={vehicle.images[0]} 
                alt={vehicle.title}
                className="w-24 h-24 object-cover rounded"
              />
            )}
            <div>
              <h2 className="font-bold text-lg text-gray-900">{vehicle.title}</h2>
              <p className="text-2xl font-bold text-green-600">${vehicle.price.toLocaleString()}</p>
            </div>
          </div>

          {/* Contact Form */}
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
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(555) 555-5555"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about your interest..."
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
        <Footer />
    </div>
  );
}