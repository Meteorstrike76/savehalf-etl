import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import FeaturedPets from '../components/home/FeaturedPets';
import HowItWorks from '../components/home/HowItWorks';
import SuccessStoriesPreview from '../components/home/SuccessStoriesPreview';
import CallToAction from '../components/home/CallToAction';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'PAWS: Pet Adoption Web Services';
  }, []);

  return (
    <div>
      <Hero />
      <FeaturedPets />
      <HowItWorks />
      <SuccessStoriesPreview />
      <CallToAction />
    </div>
  );
};

export default HomePage;