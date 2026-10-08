import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <PawPrint className="h-8 w-8 mr-2" />
              <h4 className="text-2xl font-bold">PAWS</h4>
            </div>
            <p className="text-gray-300 mb-4">
              Connecting loving homes with pets in need since 2020. Our mission is to ensure every pet finds a forever home.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook className="h-5 w-5" />} href="#" label="Facebook" />
              <SocialLink icon={<Twitter className="h-5 w-5" />} href="#" label="Twitter" />
              <SocialLink icon={<Instagram className="h-5 w-5" />} href="#" label="Instagram" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xl font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-3">
              <FooterLink to="/pets" label="Adopt a Pet" />
              <FooterLink to="/success-stories" label="Success Stories" />
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/contact" label="Contact Us" />
              <FooterLink to="/volunteer" label="Volunteer" />
              <FooterLink to="/donate" label="Donate" />
            </ul>
          </div>

          {/* Pets */}
          <div>
            <h5 className="text-xl font-semibold mb-4">Find a Pet</h5>
            <ul className="space-y-3">
              <FooterLink to="/pets?type=dogs" label="Dogs" />
              <FooterLink to="/pets?type=cats" label="Cats" />
              <FooterLink to="/pets?type=rabbits" label="Rabbits" />
              <FooterLink to="/pets?type=birds" label="Birds" />
              <FooterLink to="/pets?type=small-animals" label="Small Animals" />
              <FooterLink to="/pets?age=senior" label="Senior Pets" />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-xl font-semibold mb-4">Contact Us</h5>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1 text-accent-400" />
                <span className="text-gray-300">123 Pet Street<br />Anytown, ST 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-accent-400" />
                <span className="text-gray-300">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-accent-400" />
                <span className="text-gray-300">info@pawsadoption.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-gray-300 mb-2">Open Hours:</p>
              <p className="text-gray-300">Mon-Fri: 9AM-6PM<br />Sat-Sun: 10AM-4PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} PAWS: Pet Adoption Web Services. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-accent-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, label }) => {
  return (
    <li>
      <Link 
        to={to} 
        className="text-gray-300 hover:text-accent-400 transition-colors"
      >
        {label}
      </Link>
    </li>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => {
  return (
    <a 
      href={href} 
      aria-label={label}
      className="bg-primary-800 p-2 rounded-full hover:bg-accent-500 transition-colors"
    >
      {icon}
    </a>
  );
};

export default Footer;