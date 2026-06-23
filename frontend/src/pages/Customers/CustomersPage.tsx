import React from 'react';
import { Search, Users, TrendingUp, Zap, AlertCircle, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  online: boolean;
  score: number;
  tags: string[];
  lastInteraction: string;
  insight?: string;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Elena Rodriguez',
    role: 'CEO',
    company: 'TechFlow Inc.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    online: true,
    score: 92,
    tags: ['VIP', 'SAAS', 'EXPANSION'],
    lastInteraction: '2m ago'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'Founder',
    company: 'Pixel Studio',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    online: false,
    score: 64,
    tags: ['NEW LEAD', 'DESIGN'],
    lastInteraction: '45m ago'
  },
  {
    id: '3',
    name: 'Sarah Jenkins',
    role: 'Operations',
    company: 'Global Logistics',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    online: true,
    score: 78,
    tags: ['LOGISTICS', 'ENTERPRISE'],
    lastInteraction: '3h ago'
  },
  {
    id: '4',
    name: 'Jordan Smith',
    role: 'Marketing Director',
    company: 'Pulse',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    online: true,
    score: 45,
    tags: ['VIP', 'AI INSIGHT'],
    lastInteraction: '2 days ago',
    insight: 'Likely to churn in 30 days based on recent sentiment analysis. Offer retention discount.'
  }
];

const CustomersPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)] overflow-y-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-on-surface mb-2">Customers</h1>
          <p className="text-on-surface-variant text-base">
            Manage and monitor your lead pipeline.
          </p>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            {['JD', 'AS', 'MK'].map((initials, i) => (
              <div 
                key={initials}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-surface
                  ${i === 0 ? 'bg-primary z-30' : i === 1 ? 'bg-secondary -ml-4 z-20' : 'bg-outline-variant -ml-4 z-10'}
                `}
              >
                {initials}
              </div>
            ))}
            <span className="text-sm font-semibold text-on-surface-variant ml-2">Active agents</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-xl mr-4 shadow-sm shadow-primary/20">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-on-surface-variant mb-1">Total Customers</div>
            <div className="text-2xl font-bold text-on-surface">1,284</div>
          </div>
        </div>
        
        <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-secondary flex items-center justify-center rounded-xl mr-4 shadow-sm shadow-secondary/20">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-on-surface-variant mb-1">Avg. Lead Score</div>
            <div className="text-2xl font-bold text-on-surface">84</div>
          </div>
        </div>

        <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-primary-container flex items-center justify-center rounded-xl mr-4">
            <Zap className="w-6 h-6 text-on-primary-container" />
          </div>
          <div>
            <div className="text-sm font-semibold text-on-surface-variant mb-1">Recent Interactions</div>
            <div className="text-2xl font-bold text-on-surface">42</div>
          </div>
        </div>

        <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-error-container flex items-center justify-center rounded-xl mr-4">
            <AlertCircle className="w-6 h-6 text-on-error-container" />
          </div>
          <div>
            <div className="text-sm font-semibold text-on-surface-variant mb-1">Idle Leads</div>
            <div className="text-2xl font-bold text-on-surface">12</div>
          </div>
        </div>
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {mockCustomers.map((customer) => (
          <div 
            key={customer.id} 
            className={`bg-white border rounded-2xl overflow-hidden flex flex-col shadow-sm transition-shadow hover:shadow-md ${
              customer.insight ? 'border-primary/50 relative' : 'border-outline-variant/30'
            }`}
          >
            {customer.insight && (
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            )}
            
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <img src={customer.avatar} alt={customer.name} className="w-14 h-14 rounded-full object-cover border border-outline-variant/30" />
                    {customer.online && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-secondary border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-on-surface">{customer.name}</h3>
                    <p className="text-sm text-on-surface-variant">{customer.role}{customer.role && customer.company ? ', ' : ''}{customer.company}</p>
                  </div>
                </div>
                
                {/* Score Circle */}
                <div className="w-12 h-12 rounded-full border-[3px] flex items-center justify-center text-sm font-bold flex-shrink-0"
                     style={{ 
                       borderColor: customer.score >= 80 ? 'var(--color-secondary)' : customer.score >= 60 ? 'var(--color-primary)' : 'var(--color-outline)'
                     }}>
                  {customer.score}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {customer.tags.map(tag => (
                  <span 
                    key={tag} 
                    className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase ${
                      tag === 'AI INSIGHT' 
                        ? 'bg-primary-fixed text-on-primary-fixed-variant flex items-center' 
                        : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    {tag === 'AI INSIGHT' && <Sparkles className="w-3 h-3 mr-1" />}
                    {tag}
                  </span>
                ))}
              </div>

              {customer.insight && (
                <div className="bg-primary-fixed/50 border border-primary-fixed-dim rounded-xl p-4 mb-4 flex items-start">
                  <Sparkles className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-on-primary-fixed-variant leading-relaxed font-medium">
                    {customer.insight}
                  </p>
                </div>
              )}

              <div className="text-sm text-outline flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Last interaction {customer.lastInteraction}
              </div>
            </div>

            <div className="grid grid-cols-2 border-t border-outline-variant/30 bg-surface-bright">
              <button className="py-3 text-sm font-bold text-primary hover:bg-surface-container transition-colors border-r border-outline-variant/30">
                {customer.insight ? 'Action Required' : 'Purchase History'}
              </button>
              <button className="py-3 text-sm font-bold text-primary hover:bg-surface-container transition-colors">
                {customer.insight ? 'Contact Now' : 'Chat History'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button className="p-2 rounded-lg border border-outline-variant/50 text-outline hover:bg-surface-container transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        {[1, 2, 3, '...', 12].map((page, idx) => (
          <button 
            key={idx}
            className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${
              page === 1 
                ? 'bg-primary text-white shadow-sm' 
                : page === '...'
                  ? 'text-outline cursor-default'
                  : 'bg-white border border-outline-variant/50 text-on-surface hover:bg-surface-container'
            }`}
          >
            {page}
          </button>
        ))}
        <button className="p-2 rounded-lg border border-outline-variant/50 text-outline hover:bg-surface-container transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};

export default CustomersPage;
