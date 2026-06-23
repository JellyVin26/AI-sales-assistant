import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Rocket, Eye, EyeOff } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        businessName: formData.businessName,
        email: formData.email,
        password: formData.password,
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Header / Logo */}
      <div className="text-center mb-8 z-10">
        <div className="mx-auto w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
          <Rocket className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-on-surface tracking-tight mb-2">SalesPilot</h1>
        <p className="text-on-surface-variant text-sm">Join the AI-driven sales revolution</p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-xl relative z-10">
        
        {/* Register Form Card */}
        <div className="bg-white border border-outline-variant/30 rounded-2xl shadow-xl p-8 w-full relative z-20">
          <h2 className="text-2xl font-bold text-on-surface mb-6">Create your account</h2>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-error-container text-on-error-container px-4 py-3 rounded-lg text-sm font-medium border border-error/20">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-on-surface mb-1.5">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-on-surface"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-on-surface mb-1.5">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-on-surface"
                />
              </div>
            </div>

            <div>
              <label htmlFor="businessName" className="block text-sm font-semibold text-on-surface mb-1.5">
                Business name
              </label>
              <input
                id="businessName"
                type="text"
                required
                value={formData.businessName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-on-surface"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-on-surface mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-white placeholder-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-on-surface"
              />
            </div>

            <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-on-surface mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-white placeholder-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-on-surface pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-outline hover:text-on-surface transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-outline font-medium">At least 8 characters</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-on-surface mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-white placeholder-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-on-surface pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-outline hover:text-on-surface transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="w-4 h-4 text-primary bg-white border-outline-variant/50 rounded focus:ring-primary/50 focus:ring-2 transition-colors"
                />
              </div>
              <label htmlFor="terms" className="ml-2 text-sm text-on-surface-variant">
                I agree to the{' '}
                <a href="#" className="font-semibold text-primary hover:text-primary-container transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-semibold text-primary hover:text-primary-container transition-colors">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70 mt-4"
            >
              {isLoading ? 'Creating account...' : 'Register'}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-8 text-center z-10 flex flex-col items-center">
        <p className="text-sm text-on-surface-variant font-medium mb-8">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-primary hover:text-primary-container transition-colors">
            Sign in
          </Link>
        </p>
        
        <div className="flex items-center text-xs font-bold text-outline tracking-wider uppercase bg-surface-container px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
          System Status: Operational
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
