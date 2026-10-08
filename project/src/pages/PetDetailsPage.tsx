import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { pets } from '../data/petsData';
import { 
  Heart, 
  Share2, 
  Calendar, 
  MapPin, 
  Tag, 
  Check, 
  Info, 
  User, 
  Ruler, 
  PawPrint, 
  Home, 
  DollarSign 
} from 'lucide-react';

const PetDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pet = pets.find(pet => pet.id === id);
  
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pet) {
      document.title = `${pet.name} | PAWS`;
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    } else {
      document.title = 'Pet Not Found | PAWS';
      setIsLoading(false);
    }
  }, [pet]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="container-custom py-16 text-center">
        <div className="max-w-md mx-auto">
          <PawPrint className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h1 className="text-3xl font-bold mb-4">Pet Not Found</h1>
          <p className="text-gray-600 mb-8">
            We couldn't find the pet you're looking for. It may have been adopted or removed from our listings.
          </p>
          <Link to="/pets" className="btn bg-primary-500 text-white hover:bg-primary-600">
            Browse Other Pets
          </Link>
        </div>
      </div>
    );
  }

  const handleThumbnailClick = (index: number) => {
    setActiveImage(index);
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container-custom">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center text-sm">
          <Link to="/" className="text-gray-500 hover:text-primary-500">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/pets" className="text-gray-500 hover:text-primary-500">Pets</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700">{pet.name}</span>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Pet Images */}
            <div>
              <div className="relative mb-4 rounded-lg overflow-hidden aspect-[4/3]">
                <img
                  src={pet.images[activeImage]}
                  alt={`${pet.name} - image ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-primary-50 hover:text-primary-500 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-primary-50 hover:text-primary-500 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {pet.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`rounded-md overflow-hidden flex-shrink-0 w-20 h-20 border-2 ${
                      index === activeImage ? 'border-primary-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${pet.name} - thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Pet Information */}
            <div>
              <div className="flex flex-wrap justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{pet.name}</h1>
                <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full font-medium">
                  ${pet.adoptionFee}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center text-sm bg-primary-100 text-primary-700 rounded-full px-3 py-1">
                  <PawPrint className="h-4 w-4 mr-1" />
                  {pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}
                </span>
                <span className="inline-flex items-center text-sm bg-accent-100 text-accent-700 rounded-full px-3 py-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  {pet.age.charAt(0).toUpperCase() + pet.age.slice(1)}
                </span>
                <span className="inline-flex items-center text-sm bg-secondary-100 text-secondary-700 rounded-full px-3 py-1">
                  <Ruler className="h-4 w-4 mr-1" />
                  {pet.size.charAt(0).toUpperCase() + pet.size.slice(1)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <User className="h-5 w-5 mr-2 text-gray-400" />
                  <span>{pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Tag className="h-5 w-5 mr-2 text-gray-400" />
                  <span>{pet.breed}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                  <span>{pet.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                  <span>Added {formatDate(pet.dateAdded)}</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">{pet.description}</p>
              
              <div className="mb-8">
                <Link
                  to={`/adopt/${pet.id}`}
                  className="btn bg-accent-500 text-white hover:bg-accent-600 w-full md:w-auto"
                >
                  Start Adoption Process
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personality */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center text-gray-900">
                    <Heart className="h-5 w-5 mr-2 text-accent-500" />
                    Personality
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {pet.personality.map((trait, index) => (
                      <span
                        key={index}
                        className="text-sm bg-white px-3 py-1 rounded-full text-gray-700"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Good With */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center text-gray-900">
                    <Check className="h-5 w-5 mr-2 text-primary-500" />
                    Good With
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {pet.goodWith.map((item, index) => (
                      <span
                        key={index}
                        className="text-sm bg-white px-3 py-1 rounded-full text-gray-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Details */}
          <div className="border-t border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-6">Additional Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Medical Information */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center text-gray-900">
                  <Info className="h-5 w-5 mr-2 text-secondary-500" />
                  Medical Information
                </h3>
                <p className="text-gray-700">{pet.medicalInfo}</p>
              </div>
              
              {/* Adoption Fee */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center text-gray-900">
                  <DollarSign className="h-5 w-5 mr-2 text-accent-500" />
                  Adoption Fee Details
                </h3>
                <p className="text-gray-700 mb-2">
                  Adoption fee: <strong>${pet.adoptionFee}</strong>
                </p>
                <p className="text-gray-700 text-sm">
                  The adoption fee helps cover the cost of spay/neuter, vaccinations, microchipping, 
                  and general care while at our shelter.
                </p>
              </div>
            </div>
          </div>
          
          {/* Adoption Steps */}
          <div className="border-t border-gray-200 p-6 md:p-8 bg-primary-50">
            <h2 className="text-2xl font-semibold mb-6">Ready to Adopt {pet.name}?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="bg-primary-100 text-primary-700 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2">1. Schedule a Visit</h3>
                <p className="text-gray-600 text-sm">
                  Meet {pet.name} in person to ensure you're a good match.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="bg-primary-100 text-primary-700 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <User className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2">2. Complete Application</h3>
                <p className="text-gray-600 text-sm">
                  Submit your adoption application for review.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="bg-primary-100 text-primary-700 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <Home className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2">3. Welcome Home</h3>
                <p className="text-gray-600 text-sm">
                  Once approved, welcome {pet.name} to their forever home.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`/adopt/${pet.id}`} className="btn bg-accent-500 text-white hover:bg-accent-600">
                Start Adoption Process
              </Link>
              <button 
                onClick={() => navigate('/contact')}
                className="btn bg-white text-primary-700 hover:bg-gray-100"
              >
                Ask About {pet.name}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export default PetDetailsPage;