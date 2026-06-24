import React, { useState, useEffect } from 'react';
import { Search, Paperclip, Send, User, ChevronRight, Phone, FileText, Globe, Loader2 } from 'lucide-react';
import { chatService } from '../../services';
import type { Conversation, Message } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useSearchParams } from 'react-router-dom';

const AIChatPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('All');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [replyText, setReplyText] = useState('');

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await chatService.getConversations(1, 50);
        setConversations(data.conversations);
        
        const targetId = searchParams.get('id');
        if (targetId) {
          const targetConv = data.conversations.find(c => c.id === targetId);
          if (targetConv) {
            handleSelectConversation(targetConv);
          } else {
            // Might be on another page, but just fallback to first for now
            if (data.conversations.length > 0) handleSelectConversation(data.conversations[0]);
          }
        } else if (data.conversations.length > 0) {
          handleSelectConversation(data.conversations[0]);
        }
      } catch (err) {
        console.error('Failed to fetch conversations', err);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  const handleSelectConversation = async (conv: Conversation) => {
    setActiveConversation(conv);
    setMessagesLoading(true);
    try {
      const fullConv = await chatService.getConversation(conv.id);
      setMessages(fullConv.messages);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleTakeover = async () => {
    if (!activeConversation) return;
    try {
      const updatedConv = await chatService.takeoverConversation(activeConversation.id);
      setActiveConversation(updatedConv);
      setConversations(conversations.map(c => c.id === updatedConv.id ? updatedConv : c));
    } catch (err) {
      console.error('Failed to takeover conversation', err);
      alert('Failed to takeover conversation');
    }
  };

  const handleSendReply = async () => {
    if (!activeConversation || !replyText.trim()) return;
    try {
      const newMsg = await chatService.replyToConversation(activeConversation.id, replyText);
      setMessages([...messages, newMsg]);
      setReplyText('');
    } catch (err) {
      console.error('Failed to send reply', err);
      alert('Failed to send reply');
    }
  };

  const filteredConversations = conversations.filter(conv => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Active AI') return conv.status === 'ACTIVE';
    if (activeTab === 'Human Needed') return conv.status === 'CLOSED'; // Just as an example
    return true;
  });

  const getStatusColor = (status: string) => {
    if (status === 'ACTIVE') return 'bg-secondary-container text-on-secondary-container';
    if (status === 'CLOSED') return 'bg-surface-container-highest text-on-surface-variant';
    return 'bg-error-container text-on-error-container';
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-surface">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
          {filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-outline text-sm">No conversations found.</div>
          ) : (
            filteredConversations.map((conv) => (
              <div 
                key={conv.id} 
                onClick={() => handleSelectConversation(conv)}
                className={`p-4 border-b border-outline-variant/30 cursor-pointer transition-colors ${
                  activeConversation?.id === conv.id ? 'bg-primary-fixed border-l-4 border-l-primary' : 'hover:bg-surface-container-lowest border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-sm font-bold text-on-surface">{conv.customerName || 'Unknown Customer'}</h4>
                  <span className="text-xs font-semibold text-outline">
                    {new Date(conv.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant truncate mb-2">
                  {conv.messages && conv.messages.length > 0 ? conv.messages[0].content : 'No messages yet...'}
                </p>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(conv.status)}`}>
                    {conv.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Middle Column: Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-surface">
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="h-16 px-6 border-b border-outline-variant/30 bg-surface-bright flex items-center justify-between flex-shrink-0">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary font-bold flex items-center justify-center mr-3 border border-outline-variant/50">
                  {activeConversation.customerName ? activeConversation.customerName.charAt(0).toUpperCase() : '?'}
                </div>
                <div>
                  <h2 className="text-base font-bold text-on-surface">{activeConversation.customerName || 'Unknown Customer'}</h2>
                  <div className="flex items-center text-xs font-medium text-secondary">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-1.5 animate-pulse"></div>
                    {activeConversation.status}
                  </div>
                </div>
              </div>
              <button 
                onClick={handleTakeover}
                className="flex items-center px-4 py-2 bg-error text-white rounded-lg text-sm font-bold hover:bg-on-error-container transition-colors shadow-sm"
              >
                <User className="w-4 h-4 mr-2" />
                Human Takeover
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-surface relative">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
               
               {messagesLoading ? (
                 <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                 </div>
               ) : messages.length === 0 ? (
                 <div className="text-center text-outline text-sm mt-10">No messages in this conversation.</div>
               ) : (
                 messages.map((msg) => (
                   <div key={msg.id} className={`flex ${msg.role !== 'USER' ? 'justify-end' : 'justify-start'}`}>
                     
                     {/* Incoming (Customer) Avatar */}
                     {msg.role === 'USER' && (
                       <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant text-xs font-bold mr-3 flex-shrink-0 mt-1 border border-outline-variant/30">
                          {activeConversation.customerName ? activeConversation.customerName.charAt(0).toUpperCase() : '?'}
                       </div>
                     )}

                     <div className={`max-w-[70%] relative`}>
                       <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                         msg.role !== 'USER' 
                          ? `bg-primary border-transparent text-white rounded-tr-none` 
                          : 'bg-white border border-outline-variant/20 rounded-tl-none'
                       }`}>
                         {msg.role !== 'USER' && (
                           <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${msg.role === 'SYSTEM' ? 'text-error-container' : 'text-primary-fixed'}`}>
                             {msg.role === 'SYSTEM' ? 'Business Owner (You)' : 'SalesPilot AI'}
                           </div>
                         )}
                         {msg.role === 'USER' && (
                           <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                             {activeConversation.customerName || 'Customer'}
                           </div>
                         )}
                         <span className={msg.role !== 'USER' ? 'text-white' : 'text-on-surface'}>{msg.content}</span>
                       </div>
                     </div>

                     {/* Outgoing (AI/Admin) Avatar */}
                     {msg.role !== 'USER' && (
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ml-3 flex-shrink-0 mt-1 border border-outline-variant/30 ${msg.role === 'SYSTEM' ? 'bg-error' : 'bg-primary'}`}>
                          {msg.role === 'SYSTEM' ? 'YOU' : 'AI'}
                       </div>
                     )}

                   </div>
                 ))
               )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-surface-bright border-t border-outline-variant/30">
              <div className="relative">
                <input 
                  type="text" 
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                  placeholder="Type a message to reply as Admin..." 
                  className="w-full pl-4 pr-24 py-3.5 bg-white border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                  <button onClick={handleSendReply} className="p-2 bg-primary text-white rounded-lg hover:bg-primary-container transition-colors shadow-sm">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-outline">
            Select a conversation to start chatting
          </div>
        )}
      </div>

      {/* Right Column: Context Panel */}
      <div className="w-80 border-l border-outline-variant/30 bg-surface-bright flex-shrink-0 overflow-y-auto p-5">
        {activeConversation ? (
          <>
            <h3 className="text-xs font-bold text-outline uppercase tracking-wider mb-4">Customer Details</h3>
            <div className="bg-white border border-outline-variant/30 rounded-xl p-5 shadow-sm mb-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-lg mr-3">
                  {activeConversation.status === 'ACTIVE' ? '85' : '50'}
                </div>
                <div>
                  <div className="text-xs font-semibold text-outline">Lead Score</div>
                  <div className="font-bold text-on-surface">
                    {activeConversation.status === 'ACTIVE' ? 'Hot Opportunity' : 'Cold Lead'}
                  </div>
                </div>
              </div>
              <div className="text-xs font-semibold text-outline mb-2">Email</div>
              <div className="font-medium text-sm text-on-surface mb-4">
                {activeConversation.customerEmail || 'No email provided'}
              </div>
              <div className="text-xs font-semibold text-outline mb-2">Started At</div>
              <div className="font-medium text-sm text-on-surface">
                {new Date(activeConversation.createdAt).toLocaleString()}
              </div>
            </div>

            <h3 className="text-xs font-bold text-outline uppercase tracking-wider mb-4">Conversation Summary</h3>
            <div className="bg-white border border-primary/20 rounded-xl p-5 shadow-sm mb-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                This is a live conversation between the SalesPilot AI and the customer. The AI is handling queries based on your business knowledge base and product inventory.
              </p>
            </div>
          </>
        ) : (
          <div className="text-center text-outline mt-10 text-sm">
            Context will appear here when a conversation is selected.
          </div>
        )}
      </div>

    </div>
  );
};

export default AIChatPage;
