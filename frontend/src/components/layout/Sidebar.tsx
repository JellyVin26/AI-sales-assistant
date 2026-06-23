import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Package, 
  BookOpen, 
  Users, 
  BarChart2, 
  Settings, 
  LifeBuoy, 
  LogOut,
  Plus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Chats', href: '/chats', icon: MessageSquare },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Knowledge Base', href: '/knowledge', icon: BookOpen },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart2 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-surface-bright border-r border-outline-variant/30">
      <div className="flex-1 flex flex-col min-h-0 pt-6 pb-4">
        {/* Logo */}
        <div className="flex items-center px-6 flex-shrink-0">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center mr-3">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary tracking-tight">SalesPilot</h1>
            <p className="text-[10px] text-outline font-medium uppercase tracking-wider">AI-Driven Sales</p>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="px-4 mt-8 mb-4">
          <button className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary-container text-white py-2.5 px-4 rounded-lg font-medium transition-colors">
            <Plus className="w-5 h-5" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      isActive ? 'text-white' : 'text-outline group-hover:text-on-surface'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="flex-shrink-0 flex flex-col p-4 space-y-1 border-t border-outline-variant/30">
        <a
          href="#"
          className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
        >
          <LifeBuoy className="mr-3 flex-shrink-0 h-5 w-5 text-outline group-hover:text-on-surface" />
          Support
        </a>
        <button
          onClick={logout}
          className="group w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
        >
          <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-outline group-hover:text-on-surface" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
