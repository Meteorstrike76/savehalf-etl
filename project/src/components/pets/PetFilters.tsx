import React from 'react';
import { Search, X } from 'lucide-react';

interface FiltersProps {
  filters: {
    type: string;
    age: string;
    gender: string;
    size: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    type: string;
    age: string;
    gender: string;
    size: string;
  }>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  applyFilters: () => void;
  resetFilters: () => void;
}

const PetFilters: React.FC<FiltersProps> = ({ 
  filters, 
  setFilters, 
  searchTerm, 
  setSearchTerm, 
  applyFilters, 
  resetFilters 
}) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or breed..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Pet Type
          </label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="dog">Dogs</option>
            <option value="cat">Cats</option>
            <option value="rabbit">Rabbits</option>
            <option value="bird">Birds</option>
            <option value="small-animal">Small Animals</option>
          </select>
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <select
            id="age"
            name="age"
            value={filters.age}
            onChange={handleFilterChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Ages</option>
            <option value="puppy">Puppy/Kitten</option>
            <option value="young">Young</option>
            <option value="adult">Adult</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
            Size
          </label>
          <select
            id="size"
            name="size"
            value={filters.size}
            onChange={handleFilterChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Sizes</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <button
          onClick={resetFilters}
          className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          Reset Filters
        </button>
        <button
          onClick={applyFilters}
          className="btn bg-primary-500 text-white hover:bg-primary-600"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default PetFilters;