import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, MapPin, TagIcon } from 'lucide-react';
import { Pet } from '../../data/petsData';

interface PetListProps {
  pets: Pet[];
  loading?: boolean;
}

const PetList: React.FC<PetListProps> = ({ pets, loading = false }) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-500">Loading pets...</p>
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <div className="text-6xl mb-4">🐾</div>
        <h3 className="text-2xl font-semibold mb-2">No pets found</h3>
        <p className="text-gray-600 mb-6">Try adjusting your search filters to find your perfect companion.</p>
        <button 
          onClick={() => window.location.reload()}
          className="btn bg-primary-500 text-white hover:bg-primary-600"
        >
          View All Pets
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.map(pet => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
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
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-medium bg-primary-500 px-2 py-1 rounded-full">
              {pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}
            </span>
            <span className="text-xs font-medium bg-accent-500 px-2 py-1 rounded-full">
              {pet.age.charAt(0).toUpperCase() + pet.age.slice(1)}
            </span>
            <span className="text-xs font-medium bg-secondary-500 px-2 py-1 rounded-full">
              {pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{pet.name}</h3>
          <span className="text-primary-500 font-bold">${pet.adoptionFee}</span>
        </div>
        <p className="text-gray-500 mb-3">{pet.breed}</p>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{pet.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Added {formatDate(pet.dateAdded)}</span>
        </div>
        <div className="flex mb-4 flex-wrap gap-1">
          {pet.personality.slice(0, 3).map((trait, idx) => (
            <span 
              key={idx} 
              className="inline-flex items-center text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-1"
            >
              <TagIcon className="h-3 w-3 mr-1" />
              {trait}
            </span>
          ))}
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

export default PetList;