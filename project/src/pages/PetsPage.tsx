import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PetFilters from '../components/pets/PetFilters';
import PetList from '../components/pets/PetList';
import { pets, Pet } from '../data/petsData';

const PetsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const initialType = queryParams.get('type') || '';

  const [filters, setFilters] = useState({
    type: initialType,
    age: '',
    gender: '',
    size: '',
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPets, setFilteredPets] = useState<Pet[]>(pets);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Adoptable Pets | PAWS';
    
    // Apply initial filters if any are set in the URL
    if (initialType) {
      filterPets();
    }
  }, []);

  const filterPets = () => {
    setLoading(true);
    
    // Simulate API request delay
    setTimeout(() => {
      let filtered = [...pets];
      
      // Apply type filter
      if (filters.type) {
        filtered = filtered.filter(pet => pet.type === filters.type);
      }
      
      // Apply age filter
      if (filters.age) {
        filtered = filtered.filter(pet => pet.age === filters.age);
      }
      
      // Apply gender filter
      if (filters.gender) {
        filtered = filtered.filter(pet => pet.gender === filters.gender);
      }
      
      // Apply size filter
      if (filters.size) {
        filtered = filtered.filter(pet => pet.size === filters.size);
      }
      
      // Apply search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase().trim();
        filtered = filtered.filter(
          pet => 
            pet.name.toLowerCase().includes(term) || 
            pet.breed.toLowerCase().includes(term)
        );
      }
      
      setFilteredPets(filtered);
      setLoading(false);
    }, 500);
  };

  const resetFilters = () => {
    setFilters({
      type: '',
      age: '',
      gender: '',
      size: '',
    });
    setSearchTerm('');
    setFilteredPets(pets);
  };

  const applyFilters = () => {
    filterPets();
  };

  return (
    <div className="py-8 bg-gray-50">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Adoptable Pets</h1>
          <p className="text-gray-600">
            Browse our available pets and find your perfect companion. Use the filters to narrow your search.
          </p>
        </div>
        
        <PetFilters 
          filters={filters}
          setFilters={setFilters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          applyFilters={applyFilters}
          resetFilters={resetFilters}
        />
        
        <PetList pets={filteredPets} loading={loading} />
      </div>
    </div>
  );
};

export default PetsPage;