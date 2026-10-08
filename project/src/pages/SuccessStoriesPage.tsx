import React, { useEffect } from 'react';
import { successStories } from '../data/petsData';
import { Heart, Calendar } from 'lucide-react';

const SuccessStoriesPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Success Stories | PAWS';
    
    // Handle hash links for direct story access
    const { hash } = window.location;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="bg-gray-50 py-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Success Stories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read heartwarming tales of our adopted pets and the loving families who welcomed them home. Every adoption creates a unique bond and changes lives forever.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-12">
          {successStories.map((story, index) => (
            <div 
              key={story.id} 
              id={story.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden transition-all ${
                index % 2 === 0 ? 'transform hover:-translate-y-1 hover:shadow-lg' : 'transform hover:translate-y-1 hover:shadow-lg'
              }`}
            >
              <div className="md:flex">
                <div className="md:w-2/5">
                  <div className="h-64 md:h-full bg-gray-300 relative">
                    <img 
                      src={story.image} 
                      alt={`${story.petName} with ${story.adopter}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/40 to-transparent md:bg-none"></div>
                    <div className="absolute bottom-4 left-4 md:hidden">
                      <span className="px-3 py-1 bg-accent-500 text-white rounded-full text-sm">
                        {story.petType.charAt(0).toUpperCase() + story.petType.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:w-3/5 p-6 md:p-8">
                  <div className="hidden md:block mb-4">
                    <span className="px-3 py-1 bg-accent-500 text-white rounded-full text-sm">
                      {story.petType.charAt(0).toUpperCase() + story.petType.slice(1)}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{story.title}</h2>
                  <div className="flex items-center mb-4 text-gray-500 text-sm">
                    <Heart className="h-4 w-4 mr-1 text-accent-500" />
                    <span className="font-medium text-gray-700 mr-2">{story.petName}</span>
                    <span className="mx-2">•</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Adopted {story.date}</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Adopted by <span className="font-medium">{story.adopter}</span>
                  </p>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {story.story}
                  </p>
                  <div className="text-sm italic text-gray-500 border-l-4 border-primary-200 pl-4 py-1">
                    "Adopting a pet is one of the most rewarding experiences. We're so grateful to PAWS for bringing us together."
                    <span className="block mt-1">— {story.adopter}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16 bg-primary-50 rounded-xl p-8 max-w-4xl mx-auto">
          <Heart className="h-12 w-12 mx-auto mb-4 text-accent-500" />
          <h2 className="text-2xl font-bold mb-4">Share Your Story</h2>
          <p className="text-gray-600 mb-6">
            Did you adopt from PAWS? We'd love to hear how your furry friend is doing in their forever home!
          </p>
          <button className="btn bg-primary-500 text-white hover:bg-primary-600">
            Submit Your Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoriesPage;