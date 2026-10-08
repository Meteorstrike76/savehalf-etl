import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, MapPin } from 'lucide-react';
import { pets, Pet } from '../../data/petsData';

const FeaturedPets: React.FC = () => {
  const featuredPets = pets.filter(pet => pet.isFeatured).slice(0, 4);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Featured Pets</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These adorable companions are waiting for their forever homes. Could you be their perfect match?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {featuredPets.map(pet => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/pets" 
            className="btn-outline inline-flex items-center px-6 py-3 rounded-lg font-medium"
          >
            View All Pets
          </Link>
        </div>
      </div>
    </section>
  );
};

const PetCard: React.FC<{ pet: Pet }> = ({ pet }) => {
  return (
    <div className="card group">
      <div className="relative overflow-hidden">
        <img 
          src={pet.images[0]} 
          alt={pet.name} 
          className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <button 
            className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-primary-50 hover:text-primary-500 transition-colors"
            aria-label="Add to favorites"
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs font-medium bg-primary-500 px-2 py-1 rounded-full">
                {pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}
              </span>
              <span className="text-xs font-medium bg-accent-500 ml-2 px-2 py-1 rounded-full">
                {pet.age.charAt(0).toUpperCase() + pet.age.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{pet.name}</h3>
          <span className="text-primary-500 font-bold">${pet.adoptionFee}</span>
        </div>
        <p className="text-gray-500 mb-3">{pet.breed}</p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{pet.location}</span>
          <span className="mx-2">•</span>
          <Calendar className="h-4 w-4 mr-1" />
          <span>Added {formatDate(pet.dateAdded)}</span>
        </div>
        <Link 
          to={`/pets/${pet.id}`} 
          className="block text-center w-full py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

export default FeaturedPets;