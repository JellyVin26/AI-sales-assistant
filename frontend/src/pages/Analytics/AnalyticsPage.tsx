import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Calendar, Download, TrendingUp, Users, DollarSign, Target } from 'lucide-react';

const revenueData = [
  { name: 'Jan', revenue: 4000, target: 3000 },
  { name: 'Feb', revenue: 3000, target: 3200 },
  { name: 'Mar', revenue: 5000, target: 3500 },
  { name: 'Apr', revenue: 4780, target: 4000 },
  { name: 'May', revenue: 5890, target: 4200 },
  { name: 'Jun', revenue: 6390, target: 4500 },
  { name: 'Jul', revenue: 7490, target: 5000 },
];

const customerData = [
  { name: 'Mon', new: 12, churn: 2 },
  { name: 'Tue', new: 19, churn: 1 },
  { name: 'Wed', new: 15, churn: 3 },
  { name: 'Thu', new: 22, churn: 2 },
  { name: 'Fri', new: 28, churn: 0 },
  { name: 'Sat', new: 10, churn: 1 },
  { name: 'Sun', new: 8, churn: 0 },
];

const AnalyticsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)] overflow-y-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-on-surface mb-2">Analytics</h1>
          <p className="text-on-surface-variant text-base">
            Track your sales performance and AI Copilot impact.
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-surface-container text-on-surface-variant rounded-xl text-sm font-bold hover:bg-surface-container-high transition-colors border border-outline-variant/30">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </button>
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-sm hover:bg-primary-container transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-primary-container flex items-center justify-center rounded-xl text-on-primary-container">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="flex items-center text-xs font-bold text-secondary bg-secondary-container/50 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3 mr-1" /> +14.5%
            </span>
          </div>
          <div className="text-sm font-semibold text-on-surface-variant mb-1">Total Revenue</div>
          <div className="text-3xl font-bold text-on-surface">$128,450</div>
        </div>

        <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center rounded-xl text-on-surface">
              <Users className="w-5 h-5" />
            </div>
            <span className="flex items-center text-xs font-bold text-secondary bg-secondary-container/50 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3 mr-1" /> +8.2%
            </span>
          </div>
          <div className="text-sm font-semibold text-on-surface-variant mb-1">Active Customers</div>
          <div className="text-3xl font-bold text-on-surface">3,248</div>
        </div>

        <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-secondary-container flex items-center justify-center rounded-xl text-on-secondary-container">
              <Target className="w-5 h-5" />
            </div>
            <span className="flex items-center text-xs font-bold text-secondary bg-secondary-container/50 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3 mr-1" /> +2.4%
            </span>
          </div>
          <div className="text-sm font-semibold text-on-surface-variant mb-1">Conversion Rate</div>
          <div className="text-3xl font-bold text-on-surface">14.8%</div>
        </div>

        <div className="bg-primary border border-primary-container rounded-2xl p-6 shadow-sm text-white relative overflow-hidden">
          {/* Decorative rings */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full border-4 border-white/10"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-16 h-16 rounded-full border-4 border-white/10"></div>
          
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="text-sm font-bold text-white/80 uppercase tracking-wider">AI Impact</div>
          </div>
          <div className="text-sm font-semibold text-white mb-1 relative z-10">Time Saved by AI</div>
          <div className="text-3xl font-bold text-white relative z-10">142 hrs</div>
          <p className="text-xs text-white/70 mt-2 relative z-10">This month alone</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Revenue Chart */}
        <div className="lg:col-span-2 bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-on-surface">Revenue vs Target</h2>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e5e7eb" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#e5e7eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Area type="monotone" dataKey="target" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorTarget)" name="Target" />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="Actual Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Acquisition Bar Chart */}
        <div className="lg:col-span-1 bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-on-surface mb-6">Customer Acquisition</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Bar dataKey="new" fill="#3b82f6" radius={[4, 4, 0, 0]} name="New Customers" maxBarSize={40} />
                <Bar dataKey="churn" fill="#f87171" radius={[4, 4, 0, 0]} name="Churned" maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AnalyticsPage;
