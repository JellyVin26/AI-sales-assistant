import React, { useState, useEffect } from 'react';
import { Search, Users, TrendingUp, Zap, AlertCircle, Sparkles, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { chatService } from '../../services';
import type { Conversation } from '../../types';

const CustomersPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalConversations, setTotalConversations] = useState(0);

  useEffect(() => {
    fetchConversations();
  }, [page]);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const data = await chatService.getConversations(page, 12);
      setConversations(data.conversations);
      setTotalPages(data.totalPages);
      setTotalConversations(data.total);
    } catch (error) {
      console.error('Failed to fetch customers/conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScore = (conv: Conversation) => {
    // Generate a pseudo-random score based on the number of messages or status
    if (conv.status === 'ACTIVE') return 92;
    if (conv.status === 'CLOSED') return 85;
    return 64;
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)] overflow-y-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-on-surface mb-2">Customers</h1>
          <p className="text-on-surface-variant text-base">
            Manage and monitor your lead pipeline based on AI conversations.
          </p>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            {['AI', 'SR', 'MK'].map((initials, i) => (
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
            <div className="text-sm font-semibold text-on-surface-variant mb-1">Total Conversations</div>
            <div className="text-2xl font-bold text-on-surface">{totalConversations}</div>
          </div>
        </div>
        
        <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-secondary flex items-center justify-center rounded-xl mr-4 shadow-sm shadow-secondary/20">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-on-surface-variant mb-1">Avg. Lead Score</div>
            <div className="text-2xl font-bold text-on-surface">
              {conversations.length > 0 ? Math.floor(conversations.reduce((acc, c) => acc + getScore(c), 0) / conversations.length) : 0}
            </div>
          </div>
        </div>

        <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-primary-container flex items-center justify-center rounded-xl mr-4">
            <Zap className="w-6 h-6 text-on-primary-container" />
          </div>
          <div>
            <div className="text-sm font-semibold text-on-surface-variant mb-1">Active Now</div>
            <div className="text-2xl font-bold text-on-surface">
              {conversations.filter(c => c.status === 'ACTIVE').length}
            </div>
          </div>
        </div>

        <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-error-container flex items-center justify-center rounded-xl mr-4">
            <AlertCircle className="w-6 h-6 text-on-error-container" />
          </div>
          <div>
            <div className="text-sm font-semibold text-on-surface-variant mb-1">Idle Leads</div>
            <div className="text-2xl font-bold text-on-surface">
              {conversations.filter(c => c.status === 'ARCHIVED').length}
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <>
          {/* Customer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {conversations.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-outline-variant/30">
                <p className="text-outline">No customers or conversations found.</p>
              </div>
            ) : (
              conversations.map((conv) => {
                const name = conv.customerName || 'Anonymous Customer';
                const score = getScore(conv);
                const hasInsight = conv.status === 'ACTIVE' && score < 90;
                
                return (
                  <div 
                    key={conv.id} 
                    className={`bg-white border rounded-2xl overflow-hidden flex flex-col shadow-sm transition-shadow hover:shadow-md ${
                      hasInsight ? 'border-primary/50 relative' : 'border-outline-variant/30'
                    }`}
                  >
                    {hasInsight && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                    )}
                    
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <div className="relative mr-4">
                            <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xl font-bold border border-primary/20">
                              {name.charAt(0).toUpperCase()}
                            </div>
                            {conv.status === 'ACTIVE' && (
                              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-secondary border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-on-surface truncate max-w-[120px]" title={name}>{name}</h3>
                            <p className="text-sm text-on-surface-variant truncate max-w-[120px]" title={conv.customerEmail || 'No email'}>
                              {conv.customerEmail || 'No Email'}
                            </p>
                          </div>
                        </div>
                        
                        {/* Score Circle */}
                        <div className="w-12 h-12 rounded-full border-[3px] flex items-center justify-center text-sm font-bold flex-shrink-0"
                             style={{ 
                               borderColor: score >= 80 ? 'var(--color-secondary)' : score >= 60 ? 'var(--color-primary)' : 'var(--color-outline)'
                             }}>
                          {score}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-surface-container-high text-on-surface-variant`}>
                          {conv.status}
                        </span>
                        {hasInsight && (
                          <span className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-primary-fixed text-on-primary-fixed-variant flex items-center`}>
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI INSIGHT
                          </span>
                        )}
                      </div>

                      {hasInsight && (
                        <div className="bg-primary-fixed/50 border border-primary-fixed-dim rounded-xl p-4 mb-4 flex items-start">
                          <Sparkles className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                          <p className="text-sm text-on-primary-fixed-variant leading-relaxed font-medium">
                            Customer is active. Provide a discount code to close the sale faster.
                          </p>
                        </div>
                      )}

                      <div className="text-sm text-outline flex items-center mt-auto">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Last interaction {getTimeAgo(conv.updatedAt)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 border-t border-outline-variant/30 bg-surface-bright mt-auto">
                      <button 
                        onClick={() => alert(hasInsight ? 'Opening Action Required flow...' : 'Opening Purchase History...')}
                        className="py-3 text-sm font-bold text-primary hover:bg-surface-container transition-colors border-r border-outline-variant/30"
                      >
                        {hasInsight ? 'Action Required' : 'Purchase History'}
                      </button>
                      <button 
                        onClick={() => {
                          window.location.href = `/chats?id=${conv.id}`;
                        }}
                        className="py-3 text-sm font-bold text-primary hover:bg-surface-container transition-colors"
                      >
                        View Chat
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button 
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-outline-variant/50 text-outline hover:bg-surface-container transition-colors disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button 
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${
                      pageNum === page 
                        ? 'bg-primary text-white shadow-sm' 
                        : 'bg-white border border-outline-variant/50 text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button 
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border border-outline-variant/50 text-outline hover:bg-surface-container transition-colors disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}

    </div>
  );
};

export default CustomersPage;
