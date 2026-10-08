import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { pets } from '../data/petsData';
import { Check, AlertCircle } from 'lucide-react';

const AdoptionFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pet = pets.find(pet => pet.id === id);
  
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    householdMembers: '',
    otherPets: '',
    experience: '',
    reasonForAdoption: '',
    housingType: '',
    homeOwnership: '',
    yardSize: '',
    hoursAlone: '',
    references: '',
    agreeToTerms: false,
  });
  
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (pet) {
      document.title = `Adopt ${pet.name} | PAWS`;
    } else {
      document.title = 'Adoption Application | PAWS';
    }
  }, [pet]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setFormState(prev => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));
  };
  
  const validateForm = (): boolean => {
    const errors: string[] = [];
    
    // Required fields validation
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'address', 
      'city', 'state', 'zip', 'housingType', 'homeOwnership'
    ];
    
    requiredFields.forEach(field => {
      if (!formState[field as keyof typeof formState]) {
        errors.push(`${fieldLabels[field as keyof typeof fieldLabels]} is required`);
      }
    });
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formState.email && !emailRegex.test(formState.email)) {
      errors.push('Please enter a valid email address');
    }
    
    // Phone validation
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (formState.phone && !phoneRegex.test(formState.phone)) {
      errors.push('Please enter a valid phone number');
    }
    
    // Terms agreement
    if (!formState.agreeToTerms) {
      errors.push('You must agree to the terms');
    }
    
    setFormErrors(errors);
    return errors.length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setFormSuccess(true);
        setIsSubmitting(false);
        window.scrollTo(0, 0);
      }, 1500);
    }
  };
  
  if (!pet) {
    return (
      <div className="container-custom py-16 text-center">
        <div className="max-w-md mx-auto">
          <AlertCircle className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h1 className="text-3xl font-bold mb-4">Pet Not Found</h1>
          <p className="text-gray-600 mb-8">
            We couldn't find the pet you're trying to adopt. It may have been removed from our listings.
          </p>
          <Link to="/pets" className="btn bg-primary-500 text-white hover:bg-primary-600">
            Browse Other Pets
          </Link>
        </div>
      </div>
    );
  }
  
  if (formSuccess) {
    return (
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in adopting {pet.name}. We've received your application and will review it as soon as possible. Our team will contact you within 2-3 business days to discuss next steps.
            </p>
            <div className="mb-8 p-6 bg-primary-50 rounded-lg">
              <h3 className="font-semibold mb-2">What Happens Next?</h3>
              <ol className="text-left text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary-200 text-primary-800 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">1</span>
                  <span>Our team reviews your application (2-3 business days)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-200 text-primary-800 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">2</span>
                  <span>We'll contact you to schedule a meet and greet with {pet.name}</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-200 text-primary-800 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">3</span>
                  <span>If approved, we'll finalize adoption paperwork and prepare for {pet.name}'s homecoming</span>
                </li>
              </ol>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn bg-primary-500 text-white hover:bg-primary-600">
                Return to Home
              </Link>
              <Link to="/pets" className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                View More Pets
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 py-8">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-6">
            <img 
              src={pet.images[0]} 
              alt={pet.name} 
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">Adoption Application for {pet.name}</h1>
              <p className="text-gray-600 mb-4">
                Please complete this form to start the adoption process. All fields marked with an asterisk (*) are required.
              </p>
              {formErrors.length > 0 && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  <p className="font-medium">Please fix the following errors:</p>
                  <ul className="list-disc list-inside text-sm mt-1">
                    {formErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formState.firstName}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formState.lastName}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Address Information</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formState.address}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formState.city}
                        onChange={handleChange}
                        className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formState.state}
                        onChange={handleChange}
                        className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formState.zip}
                        onChange={handleChange}
                        className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Home & Living Situation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="housingType" className="block text-sm font-medium text-gray-700 mb-1">
                      Housing Type *
                    </label>
                    <select
                      id="housingType"
                      name="housingType"
                      value={formState.housingType}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select...</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="condo">Condo</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="homeOwnership" className="block text-sm font-medium text-gray-700 mb-1">
                      Do you own or rent? *
                    </label>
                    <select
                      id="homeOwnership"
                      name="homeOwnership"
                      value={formState.homeOwnership}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select...</option>
                      <option value="own">Own</option>
                      <option value="rent">Rent</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="yardSize" className="block text-sm font-medium text-gray-700 mb-1">
                      Yard Size
                    </label>
                    <select
                      id="yardSize"
                      name="yardSize"
                      value={formState.yardSize}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      <option value="no-yard">No Yard</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="hoursAlone" className="block text-sm font-medium text-gray-700 mb-1">
                      Hours pet will be alone
                    </label>
                    <select
                      id="hoursAlone"
                      name="hoursAlone"
                      value={formState.hoursAlone}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      <option value="<4">Less than 4 hours</option>
                      <option value="4-8">4-8 hours</option>
                      <option value="8-10">8-10 hours</option>
                      <option value=">10">More than 10 hours</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="householdMembers" className="block text-sm font-medium text-gray-700 mb-1">
                      Household Members (including ages of children)
                    </label>
                    <textarea
                      id="householdMembers"
                      name="householdMembers"
                      value={formState.householdMembers}
                      onChange={handleChange}
                      rows={3}
                      className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="otherPets" className="block text-sm font-medium text-gray-700 mb-1">
                      Other Pets in Household
                    </label>
                    <textarea
                      id="otherPets"
                      name="otherPets"
                      value={formState.otherPets}
                      onChange={handleChange}
                      rows={3}
                      className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      Previous Experience with Pets
                    </label>
                    <textarea
                      id="experience"
                      name="experience"
                      value={formState.experience}
                      onChange={handleChange}
                      rows={3}
                      className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="reasonForAdoption" className="block text-sm font-medium text-gray-700 mb-1">
                      Why do you want to adopt {pet.name}?
                    </label>
                    <textarea
                      id="reasonForAdoption"
                      name="reasonForAdoption"
                      value={formState.reasonForAdoption}
                      onChange={handleChange}
                      rows={3}
                      className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="references" className="block text-sm font-medium text-gray-700 mb-1">
                      References (Personal or Veterinary)
                    </label>
                    <textarea
                      id="references"
                      name="references"
                      value={formState.references}
                      onChange={handleChange}
                      rows={3}
                      className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      checked={formState.agreeToTerms}
                      onChange={handleChange}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                      Agreement *
                    </label>
                    <p className="text-gray-500">
                      I confirm that all information provided is accurate. I understand that PAWS reserves the right to deny adoption applications for any reason.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => navigate(`/pets/${pet.id}`)}
                  className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-accent-500 text-white hover:bg-accent-600 flex items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const fieldLabels: Record<string, string> = {
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email Address',
  phone: 'Phone Number',
  address: 'Street Address',
  city: 'City',
  state: 'State',
  zip: 'ZIP Code',
  housingType: 'Housing Type',
  homeOwnership: 'Home Ownership Status',
  yardSize: 'Yard Size',
  hoursAlone: 'Hours Alone',
  householdMembers: 'Household Members',
  otherPets: 'Other Pets',
  experience: 'Previous Experience',
  reasonForAdoption: 'Reason for Adoption',
  references: 'References',
};

export default AdoptionFormPage;