import React from 'react';
import { MessageSquare, DollarSign, Clock, Target, Calendar, Download, Sparkles, MoreHorizontal } from 'lucide-react';

const DashboardPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight mb-1">Good Morning, Alex</h1>
          <p className="text-on-surface-variant text-base">Here's what's happening with your sales pipeline today.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="flex items-center px-4 py-2 border border-outline-variant bg-white text-on-surface rounded-lg text-sm font-medium hover:bg-surface-container-lowest transition-colors">
            <Calendar className="w-4 h-4 mr-2 text-outline" />
            Today
          </button>
          <button className="flex items-center px-4 py-2 border border-outline-variant bg-white text-on-surface rounded-lg text-sm font-medium hover:bg-surface-container-lowest transition-colors">
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
            <span className="text-4xl font-bold text-on-surface">24</span>
            <span className="ml-3 text-sm font-medium text-emerald-600 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              +12%
            </span>
          </div>
          <span className="text-sm text-outline font-medium mt-auto">Today vs. Yesterday</span>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl border border-outline-variant/50 p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Sales Assisted</span>
            <div className="p-2 bg-secondary-fixed text-secondary rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline mb-1">
            <span className="text-4xl font-bold text-on-surface">$1,240</span>
            <span className="ml-3 text-sm font-medium text-emerald-600 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              +8%
            </span>
          </div>
          <span className="text-sm text-outline font-medium mt-auto">Attributed to AI chats</span>
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
          <div className="bg-white rounded-2xl border-2 border-primary/20 p-8 relative overflow-hidden">
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
                <button className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-container transition-colors">
                  Apply Suggestion
                </button>
                <button className="px-6 py-2.5 bg-surface-container text-on-surface-variant font-medium rounded-lg hover:bg-surface-container-high transition-colors">
                  Dismiss
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Conversation Trend */}
            <div className="bg-white rounded-xl border border-outline-variant/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-on-surface">Conversation Trend</h3>
                <span className="text-sm text-outline font-medium">Last 7 Days</span>
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
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-on-surface">Product A (Pro Pack)</span>
                    <span className="text-outline font-medium">42%</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-on-surface">Product B (Basic)</span>
                    <span className="text-outline font-medium">28%</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-on-surface">Cloud Add-on</span>
                    <span className="text-outline font-medium">15%</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-on-surface">Others</span>
                    <span className="text-outline font-medium">15%</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2">
                    <div className="bg-outline-variant h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Recent Activity */}
        <div className="bg-white rounded-xl border border-outline-variant/50 flex flex-col h-full">
          <div className="p-6 border-b border-outline-variant/30 flex items-center justify-between">
            <h3 className="text-lg font-bold text-on-surface">Recent Activity</h3>
            <button className="text-sm font-semibold text-primary hover:text-primary-container">View All</button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-outline-variant/30">
              <div className="p-6 hover:bg-surface-container-lowest transition-colors cursor-pointer group">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary font-bold flex items-center justify-center flex-shrink-0">JD</div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-bold text-on-surface">John Doe</p>
                      <span className="text-xs text-outline font-medium">2m ago</span>
                    </div>
                    <p className="text-sm text-on-surface-variant italic mt-1">"How long is shipping to NY?"</p>
                    <div className="mt-2 flex items-center text-xs font-semibold text-secondary">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary mr-1.5"></div>
                      AI Responded
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 hover:bg-surface-container-lowest transition-colors cursor-pointer group">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed text-secondary font-bold flex items-center justify-center flex-shrink-0">SM</div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-bold text-on-surface">Sarah Miller</p>
                      <span className="text-xs text-outline font-medium">15m ago</span>
                    </div>
                    <p className="text-sm text-on-surface-variant italic mt-1">"Purchased Product A -..."</p>
                    <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-secondary-container text-on-secondary-container">
                      SALE: $499
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 hover:bg-surface-container-lowest transition-colors cursor-pointer group">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-tertiary font-bold flex items-center justify-center flex-shrink-0">RK</div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-bold text-on-surface">Robert King</p>
                      <span className="text-xs text-outline font-medium">42m ago</span>
                    </div>
                    <p className="text-sm text-on-surface-variant italic mt-1">"Need help with API integratio..."</p>
                    <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-primary-fixed text-on-primary-fixed-variant">
                      Human Requested
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 hover:bg-surface-container-lowest transition-colors cursor-pointer group">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-outline-variant/30 text-on-surface-variant font-bold flex items-center justify-center flex-shrink-0">EL</div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-bold text-on-surface">Emily Lee</p>
                      <span className="text-xs text-outline font-medium">1h ago</span>
                    </div>
                    <p className="text-sm text-on-surface-variant italic mt-1">"Comparing features with..."</p>
                    <div className="mt-2 flex items-center text-xs font-semibold text-[#D97706]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D97706] mr-1.5"></div>
                      AI Negotiating
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-outline-variant/30 bg-surface-container-lowest text-center rounded-b-xl">
            <span className="text-xs font-semibold text-outline tracking-wide">8 active conversations currently</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
