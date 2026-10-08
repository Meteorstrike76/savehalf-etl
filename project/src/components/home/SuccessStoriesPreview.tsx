import React from 'react';
import { Link } from 'react-router-dom';
import { successStories } from '../../data/petsData';

const SuccessStoriesPreview: React.FC = () => {
  // We'll just display the first 3 success stories for the preview
  const previewStories = successStories.slice(0, 3);

  return (
    <section className="py-16 bg-primary-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Happy Tails</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read heartwarming stories of pets who found their forever homes through PAWS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {previewStories.map((story) => (
            <div key={story.id} className="card overflow-hidden">
              <div className="relative h-60">
                <img
                  src={story.image}
                  alt={`${story.petName} with ${story.adopter}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                  <span className="text-xs font-medium bg-accent-500 px-2 py-1 rounded-full">
                    {story.petType.charAt(0).toUpperCase() + story.petType.slice(1)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {story.petName} was adopted by {story.adopter} in {story.date}
                </p>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {story.story}
                </p>
                <Link
                  to={`/success-stories#${story.id}`}
                  className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center"
                >
                  Read Full Story
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/success-stories"
            className="btn-outline inline-flex items-center px-6 py-3 rounded-lg font-medium"
          >
            View All Success Stories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesPreview;