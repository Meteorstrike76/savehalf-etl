import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Page Not Found | PAWS';
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full text-center">
        <PawPrint className="h-16 w-16 text-primary-500 mx-auto mb-6" />
        <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          It seems this page has wandered off. Don't worry, there are plenty of other furry friends to discover on our site!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn bg-primary-500 text-white hover:bg-primary-600">
            Go Home
          </Link>
          <Link to="/pets" className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
            Find a Pet
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;