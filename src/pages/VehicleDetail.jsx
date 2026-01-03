import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChevronLeft, MapPin, Calendar, DollarSign } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import Footer from '../components/Footer';

export default function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

    // Fetch vehicle from Supabase
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
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      setVehicle(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading vehicle details...</p>
      </div>
    );
  }

  // If vehicle not found, show error
  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Not Found</h1>
          <Link to="/" className="text-blue-600 hover:underline">
            ← Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const images = vehicle.images || [vehicle.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white hover:text-gray-700"
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Image Gallery */}
            <div className="md:w-2/3">
              <div className="relative bg-gray-900">
                <img
                  src={images[currentImageIndex]}
                  alt={vehicle.title}
                  className="w-full h-96 object-contain"
                />
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                    >
                      ›
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 border-2 rounded ${
                        currentImageIndex === index
                          ? 'border-blue-600'
                          : 'border-gray-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-20 h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="md:w-1/3 p-6">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {vehicle.category}
                </span>
                {vehicle.condition && (
                  <span className={`inline-block ml-2 px-3 py-1 text-sm rounded-full ${
                    vehicle.condition === 'New'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {vehicle.condition}
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {vehicle.title}
              </h1>

              <div className="flex items-baseline mb-6">
                <DollarSign className="w-8 h-8 text-green-600" />
                <span className="text-4xl font-bold text-green-600">
                  {vehicle.price.toLocaleString()}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                {vehicle.location && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{vehicle.location}</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <Link 
                  to={`/contact/${vehicle.id}`}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium mb-3 block text-center"
                >
                  Contact Dealer
                </Link>
              </div>

              {vehicle.description && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 text-sm">{vehicle.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}