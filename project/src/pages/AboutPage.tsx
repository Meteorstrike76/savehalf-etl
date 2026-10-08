import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Calendar, PawPrint, Award, Shield } from 'lucide-react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = 'About Us | PAWS';
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-800 to-primary-700 text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story & Mission</h1>
            <p className="text-xl opacity-90 mb-6">
              At PAWS, we believe every pet deserves a loving home. Since 2020, we've been dedicated to rescuing, rehabilitating, and rehoming pets in need.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
              <div className="md:w-1/3">
                <div className="bg-primary-50 p-6 rounded-full inline-flex">
                  <PawPrint className="h-24 w-24 text-primary-500" />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                  PAWS: Pet Adoption Web Services is committed to finding loving, permanent homes for all pets in our care. We work to reduce pet overpopulation through education and accessible spay/neuter programs.
                </p>
                <p className="text-gray-700">
                  We believe in treating all animals with kindness and respect, and we strive to create a better world for pets through adoption, education, and community outreach.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <Heart className="h-12 w-12 mx-auto mb-4 text-accent-500" />
                <h3 className="text-xl font-semibold mb-2">Compassion</h3>
                <p className="text-gray-600">
                  We treat every animal with love and respect, ensuring their physical and emotional needs are met.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <Shield className="h-12 w-12 mx-auto mb-4 text-primary-500" />
                <h3 className="text-xl font-semibold mb-2">Advocacy</h3>
                <p className="text-gray-600">
                  We speak for those who cannot speak for themselves, championing animal welfare in our community.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <Award className="h-12 w-12 mx-auto mb-4 text-secondary-500" />
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-gray-600">
                  We strive for the highest standards in animal care and adoption services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our History */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
            
            <div className="space-y-12">
              <TimelineItem 
                year="2020"
                title="The Beginning"
                description="PAWS was founded by a group of passionate animal lovers who saw the need for a modern, accessible pet adoption service in our community."
                icon={<Calendar className="h-6 w-6" />}
              />
              
              <TimelineItem 
                year="2021"
                title="Growing Our Reach"
                description="We expanded our operations to include foster programs and partnerships with local veterinarians, allowing us to help more pets find homes."
                icon={<Users className="h-6 w-6" />}
                reverse
              />
              
              <TimelineItem 
                year="2022"
                title="Digital Transformation"
                description="Launched our first website and digital adoption process, making it easier than ever for families to find their perfect pet companion."
                icon={<Heart className="h-6 w-6" />}
              />
              
              <TimelineItem 
                year="2023"
                title="Community Focus"
                description="Created educational programs and community events to promote responsible pet ownership and raise awareness about animal welfare."
                icon={<PawPrint className="h-6 w-6" />}
                reverse
              />
              
              <TimelineItem 
                year="Today"
                title="Looking Forward"
                description="We continue to innovate and improve our services, always with our mission at heart: connecting loving homes with pets in need."
                icon={<Award className="h-6 w-6" />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated individuals who make our mission possible. Our team brings together diverse skills and a shared passion for animal welfare.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <TeamMember 
              name="Sarah Johnson"
              title="Founder & Executive Director"
              image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
              bio="Sarah founded PAWS after 15 years in animal welfare. Her vision and leadership guide our organization's growth and impact."
            />
            
            <TeamMember 
              name="Michael Rodriguez"
              title="Adoption Coordinator"
              image="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
              bio="Michael ensures our adoption process runs smoothly and that every pet finds the perfect match for their forever home."
            />
            
            <TeamMember 
              name="Dr. Emily Chen"
              title="Veterinary Director"
              image="https://images.pexels.com/photos/3808768/pexels-photo-3808768.jpeg"
              bio="Dr. Chen oversees all medical care for our animals, ensuring they're healthy and ready for their new homes."
            />
            
            <TeamMember 
              name="David Wilson"
              title="Outreach Coordinator"
              image="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
              bio="David manages our community programs, events, and educational initiatives, spreading awareness about animal welfare."
            />
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Plus our amazing team of volunteers, foster families, and supporters who make our work possible every day!
            </p>
            <Link to="/volunteer" className="btn-outline inline-flex items-center px-6 py-3 rounded-lg font-medium">
              Join Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-accent-500 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl opacity-90 mb-8">
              Whether you're looking to adopt, foster, volunteer, or donate, there are many ways to support our mission and help animals in need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pets" className="btn bg-white text-accent-700 hover:bg-gray-100">
                Adopt a Pet
              </Link>
              <Link to="/contact" className="btn bg-transparent border-2 border-white hover:bg-white/10">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  reverse?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description, icon, reverse = false }) => {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-4`}>
      <div className="md:w-1/4 flex justify-center md:justify-end">
        <div className="bg-primary-100 text-primary-700 w-16 h-16 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="md:w-3/4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-accent-500 font-bold mb-2">{year}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

interface TeamMemberProps {
  name: string;
  title: string;
  image: string;
  bio: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, title, image, bio }) => {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md">
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-primary-600 text-sm mb-2">{title}</p>
        <p className="text-gray-600 text-sm">{bio}</p>
      </div>
    </div>
  );
};

export default AboutPage;