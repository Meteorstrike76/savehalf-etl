import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, PawPrint, Bone } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-700 to-primary-900 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -top-12 -left-12 text-primary-400 opacity-20">
        <PawPrint className="w-48 h-48" />
      </div>
      <div className="absolute -bottom-12 -right-12 text-primary-400 opacity-20">
        <PawPrint className="w-48 h-48" />
      </div>
      <div className="absolute top-1/4 right-1/4 text-accent-400 opacity-20">
        <Bone className="w-24 h-24" />
      </div>
      <div className="absolute bottom-1/4 left-1/4 text-accent-400 opacity-20">
        <Heart className="w-24 h-24" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Make a Difference in a Pet's Life</h2>
          <p className="text-lg md:text-xl opacity-90 mb-10">
            Whether you're looking to adopt, foster, volunteer, or donate, every contribution helps us continue our mission of finding loving homes for pets in need.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <ActionCard 
              title="Adopt" 
              description="Give a pet a forever home and change both your lives for the better."
              link="/pets"
              linkText="Find a Pet"
            />
            <ActionCard 
              title="Foster" 
              description="Provide temporary care for a pet while they wait for their permanent home."
              link="/foster"
              linkText="Learn More"
            />
            <ActionCard 
              title="Volunteer" 
              description="Donate your time and skills to help pets and the shelter thrive."
              link="/volunteer"
              linkText="Get Involved"
            />
            <ActionCard 
              title="Donate" 
              description="Your contribution helps provide food, shelter, and medical care."
              link="/donate"
              linkText="Give Today"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/contact" 
              className="btn bg-white text-primary-700 hover:bg-gray-100"
            >
              Contact Us
            </Link>
            <Link 
              to="/about" 
              className="btn bg-transparent border-2 border-white hover:bg-white/10"
            >
              About Our Mission
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ActionCardProps {
  title: string;
  description: string;
  link: string;
  linkText: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, description, link, linkText }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-colors">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-white/90 mb-4 text-sm">{description}</p>
      <Link 
        to={link} 
        className="inline-block text-accent-300 hover:text-accent-200 font-medium text-sm"
      >
        {linkText} →
      </Link>
    </div>
  );
};

export default CallToAction;