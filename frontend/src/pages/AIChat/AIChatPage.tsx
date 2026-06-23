import React, { useState } from 'react';
import { Search, Paperclip, Send, User, ChevronRight, Phone, FileText, Globe } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'customer';
  text: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  name: string;
  time: string;
  snippet: string;
  tag: 'ACTIVE AI' | 'HUMAN NEEDED' | 'RESOLVED';
  tagColor: string;
  unread?: number;
  intent?: 'HIGH INTENT' | 'LOW INTENT';
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Marcus Thorne',
    time: '14:20',
    snippet: 'How do I integrate the API with my existi...',
    tag: 'ACTIVE AI',
    tagColor: 'bg-secondary-container text-on-secondary-container',
    unread: 3,
    intent: 'HIGH INTENT'
  },
  {
    id: '2',
    name: 'Sienna West',
    time: '12:05',
    snippet: 'Can you provide a custom quote for 500...',
    tag: 'HUMAN NEEDED',
    tagColor: 'bg-error-container text-on-error-container'
  },
  {
    id: '3',
    name: 'Leo Rodriguez',
    time: 'Yesterday',
    snippet: 'Great, that answers my question perfectly!',
    tag: 'RESOLVED',
    tagColor: 'bg-surface-container-highest text-on-surface-variant'
  }
];

const mockMessages: Message[] = [
  {
    id: 'm1',
    sender: 'customer',
    text: "I've been looking at your 'Pro' plan. How do I integrate the API with my existing Shopify store? We have a high volume of transactions.",
    timestamp: 'Monday, 14:20'
  },
  {
    id: 'm2',
    sender: 'ai',
    text: "Integrating with Shopify is seamless! We have a dedicated plugin that syncs your inventory and order data in real-time. For high-volume stores, our 'Enterprise' relay ensures 99.9% uptime. Would you like me to send over the documentation for the Shopify integration?",
    timestamp: 'Monday, 14:21'
  },
  {
    id: 'm3',
    sender: 'customer',
    text: "Yes, please. Also, does it support multi-currency checkouts?",
    timestamp: 'Monday, 14:22'
  }
];

const AIChatPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-surface">
      
      {/* Left Column: Conversations List */}
      <div className="w-80 border-r border-outline-variant/30 flex flex-col bg-surface-bright flex-shrink-0">
        <div className="p-4 border-b border-outline-variant/30">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-outline" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-outline-variant/50 rounded-full text-sm bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
              placeholder="Search conversations..."
            />
          </div>
          <div className="flex space-x-2">
            {['All', 'Active AI', 'Human Needed'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                  activeTab === tab 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {mockConversations.map((conv, idx) => (
            <div 
              key={conv.id} 
              className={`p-4 border-b border-outline-variant/30 cursor-pointer transition-colors ${
                idx === 0 ? 'bg-primary-fixed border-l-4 border-l-primary' : 'hover:bg-surface-container-lowest border-l-4 border-l-transparent'
              }`}
            >
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-sm font-bold text-on-surface">{conv.name}</h4>
                <span className="text-xs font-semibold text-outline">{conv.time}</span>
              </div>
              <p className="text-sm text-on-surface-variant truncate mb-2">{conv.snippet}</p>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${conv.tagColor}`}>
                  {conv.tag}
                </span>
                {conv.intent && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary-fixed text-on-primary-fixed-variant">
                    {conv.intent}
                  </span>
                )}
                {conv.unread && (
                  <span className="ml-auto w-5 h-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Column: Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-surface">
        
        {/* Chat Header */}
        <div className="h-16 px-6 border-b border-outline-variant/30 bg-surface-bright flex items-center justify-between flex-shrink-0">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden mr-3 border border-outline-variant/50">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Marcus Thorne" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-base font-bold text-on-surface">Marcus Thorne</h2>
              <div className="flex items-center text-xs font-medium text-secondary">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-1.5 animate-pulse"></div>
                Typing...
              </div>
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-error text-white rounded-lg text-sm font-bold hover:bg-on-error-container transition-colors shadow-sm">
            <User className="w-4 h-4 mr-2" />
            Human Takeover
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-surface relative">
           {/* Background dots pattern (simplified for tailwind) */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
           
           <div className="text-center">
             <span className="bg-surface-container px-3 py-1 rounded-full text-xs font-bold text-outline">
               Monday, 14:20
             </span>
           </div>

           {mockMessages.map((msg) => (
             <div key={msg.id} className={`flex ${msg.sender === 'customer' ? 'justify-start' : 'justify-end'}`}>
               
               {msg.sender === 'customer' && (
                 <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0 mt-1 border border-outline-variant/30">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="w-full h-full object-cover" />
                 </div>
               )}

               <div className={`max-w-[70%] relative ${msg.sender === 'ai' ? 'pl-4' : 'pr-4'}`}>
                 <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                   msg.sender === 'ai' 
                    ? 'bg-white border-l-4 border-l-primary border-t border-r border-b border-outline-variant/20 rounded-tr-none' 
                    : 'bg-white border border-outline-variant/30 rounded-tl-none text-on-surface'
                 }`}>
                   {msg.sender === 'ai' && (
                     <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2">SalesPilot AI</div>
                   )}
                   <span className={msg.sender === 'ai' ? 'text-on-surface-variant' : 'text-on-surface'}>{msg.text}</span>
                 </div>
                 
                 {/* Decorative element for AI message */}
                 {msg.sender === 'ai' && (
                   <div className="absolute top-0 -right-2 w-8 h-8 bg-primary rounded-full shadow-md flex items-center justify-center translate-x-1/2">
                      <div className="w-3 h-3 bg-white rounded-sm"></div>
                   </div>
                 )}
               </div>

             </div>
           ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-surface-bright border-t border-outline-variant/30">
          <div className="flex space-x-2 mb-3">
            <button className="px-4 py-1.5 bg-primary-fixed text-on-primary-fixed-variant border border-primary-fixed-dim rounded-full text-xs font-bold hover:bg-primary-fixed-dim transition-colors">
              Send API Docs
            </button>
            <button className="px-4 py-1.5 bg-primary-fixed text-on-primary-fixed-variant border border-primary-fixed-dim rounded-full text-xs font-bold hover:bg-primary-fixed-dim transition-colors">
              Confirm Multi-currency
            </button>
            <button className="px-4 py-1.5 bg-primary-fixed text-on-primary-fixed-variant border border-primary-fixed-dim rounded-full text-xs font-bold hover:bg-primary-fixed-dim transition-colors">
              Ask for Call
            </button>
          </div>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Type a message or use / for commands..." 
              className="w-full pl-4 pr-24 py-3.5 bg-white border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              <button className="p-2 text-outline hover:text-on-surface transition-colors rounded-lg">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-2 bg-primary text-white rounded-lg hover:bg-primary-container transition-colors shadow-sm">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Context Panel */}
      <div className="w-80 border-l border-outline-variant/30 bg-surface-bright flex-shrink-0 overflow-y-auto p-5">
        
        <h3 className="text-xs font-bold text-outline uppercase tracking-wider mb-4">Customer Details</h3>
        
        {/* Lead Score Card */}
        <div className="bg-white border border-outline-variant/30 rounded-xl p-5 shadow-sm mb-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-lg mr-3">
              85
            </div>
            <div>
              <div className="text-xs font-semibold text-outline">Lead Score</div>
              <div className="font-bold text-on-surface">Hot Opportunity</div>
            </div>
          </div>
          <div className="text-xs font-semibold text-outline mb-2">Tags</div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded text-[10px] font-bold">High Intent</span>
            <span className="px-2 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded text-[10px] font-bold">Shopify</span>
            <span className="px-2 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded text-[10px] font-bold">Pro Tier</span>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white border border-primary/20 rounded-xl p-5 shadow-sm mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
          <div className="flex items-center text-primary font-bold text-xs mb-3">
            <FileText className="w-4 h-4 mr-1.5" />
            Conversation Summary
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Marcus is exploring API integration for a high-volume Shopify store. He is interested in the 'Pro' plan but might require 'Enterprise' features for scale.
          </p>
        </div>

        <h3 className="text-xs font-bold text-outline uppercase tracking-wider mb-4">Recommended Products</h3>
        
        <div className="space-y-3 mb-6">
          <div className="bg-white border border-outline-variant/30 rounded-xl p-4 shadow-sm hover:border-primary/50 cursor-pointer transition-colors">
            <div className="flex justify-between items-baseline mb-1">
              <span className="font-bold text-on-surface text-sm">SalesPilot Pro</span>
              <span className="text-secondary font-bold text-xs">$149/mo</span>
            </div>
            <p className="text-xs text-outline">Unlimited AI messages & Shopify Sync</p>
          </div>
          
          <div className="bg-white border border-outline-variant/30 rounded-xl p-4 shadow-sm hover:border-primary/50 cursor-pointer transition-colors">
            <div className="flex justify-between items-baseline mb-1">
              <span className="font-bold text-on-surface text-sm">Enterprise API Add-on</span>
              <span className="text-secondary font-bold text-xs">$49/mo</span>
            </div>
            <p className="text-xs text-outline">Higher rate limits & dedicated relay</p>
          </div>
        </div>

        <h3 className="text-xs font-bold text-outline uppercase tracking-wider mb-4">AI Copilot Replies</h3>
        
        <div className="space-y-3">
          <div className="bg-primary-fixed border border-primary-fixed-dim rounded-xl p-4 cursor-pointer hover:bg-primary-fixed-dim transition-colors text-sm text-on-primary-fixed-variant leading-relaxed">
            "Yes, our Shopify plugin fully supports multi-currency..."
          </div>
          <div className="bg-primary-fixed border border-primary-fixed-dim rounded-xl p-4 cursor-pointer hover:bg-primary-fixed-dim transition-colors text-sm text-on-primary-fixed-variant leading-relaxed">
            "The Pro plan is great for mid-market, but for your volume..."
          </div>
        </div>

      </div>

    </div>
  );
};

export default AIChatPage;
