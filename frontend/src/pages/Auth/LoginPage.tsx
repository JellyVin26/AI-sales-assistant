import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Rocket, Eye, EyeOff, Sparkles } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Header / Logo */}
      <div className="text-center mb-12 z-10">
        <div className="mx-auto w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
          <Rocket className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-on-surface tracking-tight mb-2">SalesPilot</h1>
        <p className="text-on-surface-variant text-sm">Elevate your productivity with AI</p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-4xl relative z-10 flex justify-center lg:justify-start lg:pl-16 xl:pl-32">
        
        {/* Left Card: Login Form */}
        <div className="bg-white border border-outline-variant/30 rounded-2xl shadow-xl p-8 w-full max-w-md relative z-20">
          <h2 className="text-2xl font-bold text-on-surface mb-8">Welcome back</h2>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-error-container text-on-error-container px-4 py-3 rounded-lg text-sm font-medium border border-error/20">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-on-surface mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-white placeholder-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-on-surface"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="block text-sm font-semibold text-on-surface">
                  Password
                </label>
                <a href="#" className="text-sm font-semibold text-primary hover:text-primary-container transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-white placeholder-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-on-surface pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-outline hover:text-on-surface transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70 mt-2"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/30"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider font-semibold">
                <span className="bg-white px-3 text-outline">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                type="button"
                className="flex justify-center items-center py-2.5 px-4 border border-outline-variant/50 rounded-xl bg-white text-sm font-semibold text-on-surface hover:bg-surface-container-lowest transition-colors"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
                Google
              </button>
              <button
                type="button"
                className="flex justify-center items-center py-2.5 px-4 border border-outline-variant/50 rounded-xl bg-white text-sm font-semibold text-on-surface hover:bg-surface-container-lowest transition-colors"
              >
                <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" className="w-5 h-5 mr-2" />
                Apple
              </button>
            </div>
          </form>
        </div>

        {/* Right Card: AI Insight (Hidden on smaller screens) */}
        <div className="hidden lg:block absolute left-1/2 ml-20 top-1/2 -translate-y-1/2 w-full max-w-md z-10">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-10 pl-24 shadow-sm h-[85%] flex flex-col justify-center">
            
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-secondary-container/50 text-on-secondary-container rounded-full text-xs font-bold tracking-wide uppercase mb-6 w-max">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Insight</span>
            </div>
            
            <h3 className="text-3xl font-bold text-on-surface mb-4 leading-tight">Close deals faster</h3>
            <p className="text-on-surface-variant mb-8 text-base leading-relaxed">
              SalesPilot's neural engine predicts lead sentiment in real-time, helping you prioritize the right conversations at the right time.
            </p>
            
            <div className="border-t border-outline-variant/30 pt-6">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Sarah Chen" 
                  className="w-10 h-10 rounded-full object-cover border border-outline-variant/30"
                />
                <div className="ml-3">
                  <p className="text-sm font-bold text-on-surface">Sarah Chen</p>
                  <p className="text-xs text-on-surface-variant">VP Sales, CloudScale</p>
                </div>
              </div>
              <p className="text-sm text-on-surface-variant italic font-medium">
                "The most intuitive sales tool I've used in a decade."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-12 text-center z-10 flex flex-col items-center">
        <p className="text-sm text-on-surface-variant font-medium mb-8">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-primary hover:text-primary-container transition-colors">
            Sign up
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

export default LoginPage;
