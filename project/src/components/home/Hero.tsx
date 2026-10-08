import React from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, Heart } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
      </div>
      <div className="container-custom relative z-10 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect <span className="text-accent-400">Furry</span> Companion
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-lg mx-auto lg:mx-0">
              Connecting loving homes with pets in need. Browse our adoptable pets and find your new best friend today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/pets" className="btn bg-accent-500 hover:bg-accent-600 text-white">
                Find a Pet
              </Link>
              <Link to="/about" className="btn bg-white/10 hover:bg-white/20 text-white border border-white/20">
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg" 
                  alt="Adorable black and white cat"
                  className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg transform translate-y-4"
                />
                <img 
                  src="https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg" 
                  alt="Cute rabbit"
                  className="w-full h-40 md:h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img 
                  src="https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg" 
                  alt="Happy golden retriever"
                  className="w-full h-56 md:h-72 object-cover rounded-lg shadow-lg"
                />
                <img 
                  src="https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg" 
                  alt="Orange tabby cat"
                  className="w-full h-36 md:h-44 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-accent-500 opacity-10 filter blur-3xl -z-10"></div>
            <div className="absolute -bottom-6 -right-6 text-accent-400 animate-bounce-slow">
              <Heart className="w-16 h-16 fill-current opacity-70" />
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative mt-12 md:mt-16 max-w-3xl mx-auto">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="petType" className="block text-gray-700 text-sm font-medium mb-1">Pet Type</label>
                <select
                  id="petType"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50 py-3 px-4 bg-gray-50 text-gray-900"
                >
                  <option value="">Any Pet</option>
                  <option value="dog">Dogs</option>
                  <option value="cat">Cats</option>
                  <option value="rabbit">Rabbits</option>
                  <option value="bird">Birds</option>
                  <option value="small-animal">Small Animals</option>
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="location" className="block text-gray-700 text-sm font-medium mb-1">Location</label>
                <select
                  id="location"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50 py-3 px-4 bg-gray-50 text-gray-900"
                >
                  <option value="">Any Location</option>
                  <option value="main">Main Shelter</option>
                  <option value="foster">Foster Homes</option>
                  <option value="satellite">Satellite Locations</option>
                </select>
              </div>
              <div className="md:self-end">
                <button className="btn bg-primary-500 hover:bg-primary-600 text-white w-full md:w-auto px-8">
                  <SearchIcon className="h-5 w-5 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;