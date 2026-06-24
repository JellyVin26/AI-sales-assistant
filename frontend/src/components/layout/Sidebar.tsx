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
import { chatService } from '../../services';

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
  const { user, logout } = useAuth();
  
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [customerName, setCustomerName] = React.useState('');
  const [customerEmail, setCustomerEmail] = React.useState('');
  const [initialMessage, setInitialMessage] = React.useState('');
  const [isStartingChat, setIsStartingChat] = React.useState(false);

  const handleStartChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.business?.id) {
      alert('Business profile is incomplete. Please set it up in settings first.');
      return;
    }
    
    setIsStartingChat(true);
    try {
      const response = await chatService.sendMessage(user.business.id, {
        customerName: customerName.trim() || undefined,
        customerEmail: customerEmail.trim() || undefined,
        message: initialMessage.trim() || 'Hello!',
      });
      setIsModalOpen(false);
      setCustomerName('');
      setCustomerEmail('');
      setInitialMessage('');
      // Navigate to the chat page with the new conversation ID using href to ensure full reload
      window.location.href = `/chats?id=${response.conversationId}`;
    } catch (err) {
      console.error('Failed to start chat', err);
      alert('Failed to start a new chat. Check console for details.');
    } finally {
      setIsStartingChat(false);
    }
  };

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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary-container text-white py-2.5 px-4 rounded-lg font-medium transition-colors shadow-sm"
          >
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

      {/* New Chat Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-lowest">
              <h3 className="text-lg font-bold text-on-surface">Simulate New Customer</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-outline hover:text-on-surface transition-colors">
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>
            
            <form onSubmit={handleStartChat} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-1">Customer Name (Optional)</label>
                <input 
                  type="text" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2 border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-1">Customer Email (Optional)</label>
                <input 
                  type="email" 
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="e.g. john@example.com"
                  className="w-full px-4 py-2 border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-1">Initial Message *</label>
                <textarea 
                  required
                  rows={3}
                  value={initialMessage}
                  onChange={(e) => setInitialMessage(e.target.value)}
                  placeholder="e.g. Hi, I'm interested in your products!"
                  className="w-full px-4 py-2 border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm resize-none"
                />
              </div>
              
              <div className="pt-4 flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-bold text-on-surface-variant hover:bg-surface-container rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isStartingChat || !initialMessage.trim()}
                  className="flex items-center px-4 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-container rounded-xl transition-colors disabled:opacity-70"
                >
                  {isStartingChat ? 'Starting...' : 'Start Chat'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
