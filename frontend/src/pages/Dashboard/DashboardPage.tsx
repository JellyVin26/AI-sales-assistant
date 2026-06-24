import React, { useState, useEffect } from 'react';
import { MessageSquare, DollarSign, Clock, Target, Calendar, Download, Sparkles, MoreHorizontal, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dashboardService } from '../../services';
import type { DashboardData } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAiBanner, setShowAiBanner] = useState(true);
  const [timeframe, setTimeframe] = useState('Today');
  const [showTimeframeDropdown, setShowTimeframeDropdown] = useState(false);

  const getMultiplier = () => {
    switch (timeframe) {
      case 'Last 7 Days': return 5.5;
      case 'Last 30 Days': return 22.3;
      case 'This Year': return 150.8;
      default: return 1;
    }
  };

  const getStat = (value: number) => Math.floor(value * getMultiplier());

  const handleExport = () => {
    if (!data) return;
    
    // Create CSV content
    const headers = ["Metric", "Value\n"];
    const rows = [
      `Total Chats,${getStat(data.stats.totalChats)}`,
      `Active Customers,${getStat(data.stats.activeCustomers)}`,
      `Avg Response Time,0.8s`,
      `Conversion Rate,12%`,
      `Total Products,${data.stats.totalProducts}`,
      `Total Documents,${data.stats.totalDocuments}`,
    ];
    
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + rows.join("\n");
    const encodedUri = encodeURI(csvContent);
    
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `salespilot_export_${timeframe.replace(/ /g, '_').toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApplySuggestion = () => {
    alert('Suggestion Applied! Bundle Discount has been activated for Product A.');
    setShowAiBanner(false);
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const dashboardData = await dashboardService.getData();
        setData(dashboardData);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <p className="text-error mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-container">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)] overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight mb-1">Good Morning, {user?.firstName || 'User'}</h1>
          <p className="text-on-surface-variant text-base">Here's what's happening with your sales pipeline today.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3 relative">
          <div className="relative">
            <button 
              onClick={() => setShowTimeframeDropdown(!showTimeframeDropdown)}
              className="flex items-center px-4 py-2 border border-outline-variant bg-white text-on-surface rounded-lg text-sm font-medium hover:bg-surface-container-lowest transition-colors"
            >
              <Calendar className="w-4 h-4 mr-2 text-outline" />
              {timeframe}
            </button>
            {showTimeframeDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-outline-variant/50 rounded-xl shadow-lg overflow-hidden z-50">
                {['Today', 'Last 7 Days', 'Last 30 Days', 'This Year'].map(t => (
                  <button 
                    key={t}
                    onClick={() => { setTimeframe(t); setShowTimeframeDropdown(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${timeframe === t ? 'bg-primary-fixed text-primary font-bold' : 'text-on-surface hover:bg-surface-container-lowest'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center px-4 py-2 border border-outline-variant bg-white text-on-surface rounded-lg text-sm font-medium hover:bg-surface-container-lowest transition-colors"
          >
            <Download className="w-4 h-4 mr-2 text-outline" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-xl border border-outline-variant/50 p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Conversations</span>
            <div className="p-2 bg-primary-fixed text-primary rounded-lg">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline mb-1">
            <span className="text-4xl font-bold text-on-surface">{getStat(data?.stats.totalChats || 0)}</span>
            <span className="ml-3 text-sm font-medium text-emerald-600 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              +12%
            </span>
          </div>
          <span className="text-sm text-outline font-medium mt-auto">vs. Previous Period</span>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl border border-outline-variant/50 p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Active Customers</span>
            <div className="p-2 bg-secondary-fixed text-secondary rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline mb-1">
            <span className="text-4xl font-bold text-on-surface">{getStat(data?.stats.activeCustomers || 0)}</span>
            <span className="ml-3 text-sm font-medium text-emerald-600 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              +8%
            </span>
          </div>
          <span className="text-sm text-outline font-medium mt-auto">Engaged with AI</span>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl border border-outline-variant/50 p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Avg Response Time</span>
            <div className="p-2 bg-tertiary-fixed text-tertiary rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline mb-1">
            <span className="text-4xl font-bold text-on-surface">0.8s</span>
            <span className="ml-3 text-sm font-medium text-emerald-600 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
              </svg>
              -15%
            </span>
          </div>
          <span className="text-sm text-outline font-medium mt-auto">Real-time performance</span>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl border border-outline-variant/50 p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Conversion Rate</span>
            <div className="p-2 bg-error-container text-error rounded-lg">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline mb-1">
            <span className="text-4xl font-bold text-on-surface">12%</span>
            <span className="ml-3 text-sm font-medium text-emerald-600 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              +2.4%
            </span>
          </div>
          <span className="text-sm text-outline font-medium mt-auto">Chat to cart success</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-2 space-y-8">
          {/* AI Recommendation Banner */}
          {showAiBanner && (
            <div className="bg-white rounded-2xl border-2 border-primary/20 p-8 relative overflow-hidden transition-all duration-300">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 text-primary/10">
                <Sparkles className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-on-surface">AI Recommendation</h2>
                </div>
                <p className="text-lg text-on-surface-variant leading-relaxed mb-6 max-w-2xl">
                  "Customers frequently ask about <strong className="text-primary">Product A</strong> but often leave without purchasing. Consider adding a <strong className="text-primary">Limited-time Bundle Discount</strong> offer to the AI chat flow for this specific item."
                </p>
                <div className="flex space-x-3">
                  <button 
                    onClick={handleApplySuggestion}
                    className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-container transition-colors"
                  >
                    Apply Suggestion
                  </button>
                  <button 
                    onClick={() => setShowAiBanner(false)}
                    className="px-6 py-2.5 bg-surface-container text-on-surface-variant font-medium rounded-lg hover:bg-surface-container-high transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Conversation Trend */}
            <div className="bg-white rounded-xl border border-outline-variant/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-on-surface">Conversation Trend</h3>
                <span className="text-sm text-outline font-medium">{timeframe}</span>
              </div>
              {/* Chart Placeholder */}
              <div className="h-48 flex items-end justify-between space-x-2 pt-4 border-b border-outline-variant/30">
                <div className="w-full bg-primary-fixed rounded-t-sm h-[40%] hover:bg-primary-fixed-dim transition-colors cursor-pointer"></div>
                <div className="w-full bg-primary-fixed rounded-t-sm h-[60%] hover:bg-primary-fixed-dim transition-colors cursor-pointer"></div>
                <div className="w-full bg-primary-fixed rounded-t-sm h-[50%] hover:bg-primary-fixed-dim transition-colors cursor-pointer"></div>
                <div className="w-full bg-primary-fixed rounded-t-sm h-[80%] hover:bg-primary-fixed-dim transition-colors cursor-pointer"></div>
                <div className="w-full bg-primary-fixed rounded-t-sm h-[70%] hover:bg-primary-fixed-dim transition-colors cursor-pointer"></div>
                <div className="w-full bg-primary-fixed rounded-t-sm h-[100%] hover:bg-primary-fixed-dim transition-colors cursor-pointer"></div>
                <div className="w-full bg-primary-fixed rounded-t-sm h-[90%] hover:bg-primary-fixed-dim transition-colors cursor-pointer"></div>
              </div>
            </div>

            {/* Popular Products */}
            <div className="bg-white rounded-xl border border-outline-variant/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-on-surface">Popular Products</h3>
                <button className="text-outline hover:text-on-surface">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-6">
                {!data || data.popularProducts.length === 0 ? (
                  <div className="text-center text-sm text-outline">No products available yet.</div>
                ) : (
                  <>
                    {data.popularProducts.map((product) => (
                      <div key={product.id}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-on-surface">{product.name}</span>
                          <span className="text-outline font-medium">{product.mentionCount}%</span>
                        </div>
                        <div className="w-full bg-surface-container rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${product.mentionCount}%` }}></div>
                        </div>
                      </div>
                    ))}
                    {(() => {
                      const totalPercentage = data.popularProducts.reduce((acc, p) => acc + p.mentionCount, 0);
                      const othersPercentage = Math.max(0, 100 - totalPercentage);
                      if (othersPercentage > 0) {
                        return (
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="font-medium text-on-surface">Others</span>
                              <span className="text-outline font-medium">{othersPercentage}%</span>
                            </div>
                            <div className="w-full bg-surface-container rounded-full h-2">
                              <div className="bg-outline-variant h-2 rounded-full" style={{ width: `${othersPercentage}%` }}></div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Recent Activity */}
        <div className="bg-white rounded-xl border border-outline-variant/50 flex flex-col h-full">
          <div className="p-6 border-b border-outline-variant/30 flex items-center justify-between">
            <h3 className="text-lg font-bold text-on-surface">Recent Activity</h3>
            <button 
              onClick={() => navigate('/chats')}
              className="text-sm font-semibold text-primary hover:text-primary-container"
            >
              View All
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-outline-variant/30">
              {data?.recentConversations.length === 0 ? (
                <div className="p-6 text-center text-outline text-sm">No recent activity</div>
              ) : (
                data?.recentConversations.map((conv) => (
                  <div key={conv.id} className="p-6 hover:bg-surface-container-lowest transition-colors cursor-pointer group">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary font-bold flex items-center justify-center flex-shrink-0">
                        {conv.customerName ? conv.customerName.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-bold text-on-surface">{conv.customerName || 'Unknown Customer'}</p>
                          <span className="text-xs text-outline font-medium">{new Date(conv.lastMessageAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <p className="text-sm text-on-surface-variant italic mt-1">{conv.messageCount} messages in this thread</p>
                        <div className="mt-2 flex items-center text-xs font-semibold text-secondary">
                          <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${conv.status === 'ACTIVE' ? 'bg-secondary' : 'bg-outline'}`}></div>
                          {conv.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="p-4 border-t border-outline-variant/30 bg-surface-container-lowest text-center rounded-b-xl">
            <span className="text-xs font-semibold text-outline tracking-wide">{data?.recentConversations.length} recent conversations shown</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
