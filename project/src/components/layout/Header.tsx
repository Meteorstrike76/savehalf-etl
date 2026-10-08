import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PawPrint, Search } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
        >
          <PawPrint className="h-8 w-8" />
          <span className="text-2xl font-bold">PAWS</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Home" />
          <NavLink to="/pets" label="Adopt" />
          <NavLink to="/success-stories" label="Success Stories" />
          <NavLink to="/about" label="About" />
          <NavLink to="/contact" label="Contact" />
          <button 
            className="p-2 text-gray-600 hover:text-primary-500 transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-primary-500 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col py-4 px-6 space-y-4">
            <MobileNavLink to="/" label="Home" />
            <MobileNavLink to="/pets" label="Adopt" />
            <MobileNavLink to="/success-stories" label="Success Stories" />
            <MobileNavLink to="/about" label="About" />
            <MobileNavLink to="/contact" label="Contact" />
            <div className="relative mt-2">
              <input
                type="text"
                placeholder="Search for pets..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link
      to={to}
      className={`text-base font-medium transition-colors ${
        isActive 
          ? 'text-primary-600 hover:text-primary-700' 
          : 'text-gray-600 hover:text-primary-500'
      }`}
    >
      {label}
    </Link>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link
      to={to}
      className={`text-lg font-medium py-2 transition-colors ${
        isActive 
          ? 'text-primary-600 border-l-4 border-primary-500 pl-4' 
          : 'text-gray-600 hover:text-primary-500 pl-5'
      }`}
    >
      {label}
    </Link>
  );
};

export default Header;