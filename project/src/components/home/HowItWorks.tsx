import React from 'react';
import { Search, Heart, FileText, HomeIcon } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: 'Browse',
      description: 'Explore our available pets and find one that matches your lifestyle.',
      color: 'bg-primary-500',
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Meet',
      description: 'Schedule a visit to meet your potential new companion in person.',
      color: 'bg-accent-500',
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'Apply',
      description: 'Complete an adoption application and our team will review it.',
      color: 'bg-secondary-500',
    },
    {
      icon: <HomeIcon className="h-8 w-8" />,
      title: 'Adopt',
      description: 'Finalize the adoption and welcome your new pet into their forever home.',
      color: 'bg-primary-500',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How Adoption Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our adoption process is designed to ensure the best match between pets and their new families.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mx-auto mb-6">
                <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto`}>
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gray-300 transform -translate-y-1/2">
                    <div className="absolute top-0 left-0 w-1/3 h-full bg-primary-500"></div>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;