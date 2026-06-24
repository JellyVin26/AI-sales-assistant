import React, { useState, useEffect } from 'react';
import { Building, Zap, Bell, Users, CreditCard, Plug, UploadCloud, MoreVertical, Sparkles, UserPlus, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { businessService } from '../../services';

const SettingsPage: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState('Business Profile');
  
  const [businessName, setBusinessName] = useState(user?.business?.name || '');
  const [website, setWebsite] = useState(user?.business?.website || '');
  const [description, setDescription] = useState(user?.business?.description || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [tone, setTone] = useState(80);
  const [latency, setLatency] = useState(95);

  useEffect(() => {
    if (user?.business) {
      setBusinessName(user.business.name || '');
      setWebsite(user.business.website || '');
      setDescription(user.business.description || '');
    }
  }, [user]);

  const handleSaveBusiness = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await businessService.updateBusiness({
        name: businessName,
        website,
        description
      });
      await refreshUser();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update business', err);
      alert('Failed to update business profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { name: 'Business Profile', icon: Building },
    { name: 'AI Settings', icon: Sparkles },
    { name: 'Notifications', icon: Bell },
    { name: 'Team Members', icon: Users },
    { name: 'Subscription', icon: CreditCard },
    { name: 'API Integrations', icon: Plug },
  ];

  const teamMembers = [
    { name: 'Jordan Smith', email: 'jordan@acme.com', role: 'Admin', status: 'Active', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { name: 'Elena Rodriguez', email: 'elena@acme.com', role: 'Editor', status: 'Active', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { name: 'Marcus Chen', email: 'marcus@acme.com', role: 'Viewer', status: 'Pending', avatar: null },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)] overflow-y-auto">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface mb-2">Settings</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar Menu */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.name;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-outline'}`} />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 space-y-8 pb-12">
          
          {/* Business Profile Card */}
          {activeTab === 'Business Profile' && (
          <div className="bg-white border border-outline-variant/30 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant/30">
              <h2 className="text-xl font-bold text-on-surface">Business Profile</h2>
              <p className="text-sm text-on-surface-variant">Manage your company details and identity</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant mb-2">Business Name</label>
                  <input 
                    type="text" 
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant mb-2">Website</label>
                  <input 
                    type="text" 
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://acmesolutions.com" 
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant mb-2">Business Description</label>
                <textarea 
                  rows={3} 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Empowering small businesses with AI-driven lead generation and automated customer support." 
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm resize-none"
                ></textarea>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-surface-container-high rounded-xl flex items-center justify-center border border-outline-variant/30">
                  <div className="w-8 h-8 bg-surface-container-highest rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-primary rotate-45"></div>
                  </div>
                </div>
                <div>
                  <button 
                    onClick={() => alert('Image upload coming soon!')}
                    className="text-sm font-bold text-primary hover:text-primary-container transition-colors"
                  >
                    Change Logo
                  </button>
                  <p className="text-xs text-outline mt-1">SVG, PNG, or JPG (max 2MB)</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-surface-container-lowest border-t border-outline-variant/30 flex justify-end space-x-3 items-center">
              {saveSuccess && (
                <span className="text-sm font-bold text-secondary flex items-center mr-2">
                  <CheckCircle2 className="w-4 h-4 mr-1" /> Saved successfully
                </span>
              )}
              <button 
                onClick={() => {
                  setBusinessName(user?.business?.name || '');
                  setWebsite(user?.business?.website || '');
                  setDescription(user?.business?.description || '');
                }}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-on-surface-variant border border-outline-variant/50 hover:bg-surface-container transition-colors"
              >
                Discard
              </button>
              <button 
                onClick={handleSaveBusiness}
                disabled={isSaving}
                className="flex items-center px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-container transition-colors shadow-sm disabled:opacity-70"
              >
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Save Changes
              </button>
            </div>
          </div>
          )}

          {/* Subscription Card */}
          {activeTab === 'Subscription' && (
          <div className="bg-white border border-primary/20 rounded-2xl shadow-[0_2px_10px_-4px_rgba(59,130,246,0.1)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-8">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded mb-3">
                    Current Plan
                  </span>
                  <h2 className="text-2xl font-bold text-on-surface mb-1">Pro AI Accelerator</h2>
                  <p className="text-sm text-on-surface-variant">Billed monthly • Next billing date: Oct 12, 2024</p>
                </div>
                <div className="mt-4 sm:mt-0 text-right">
                  <div className="flex items-baseline justify-end mb-1">
                    <span className="text-3xl font-bold text-primary">$49</span>
                    <span className="text-sm text-outline font-medium ml-1">/mo</span>
                  </div>
                  <button 
                    onClick={() => alert('Billing integration coming soon!')}
                    className="text-sm font-bold text-primary hover:text-primary-container transition-colors flex items-center justify-end w-full"
                  >
                    Manage Subscription <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-on-surface-variant">AI Credits</span>
                    <span className="font-bold text-on-surface">7,500 / 10,000</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-on-surface-variant">Monthly Leads</span>
                    <span className="font-bold text-on-surface">250 / 500</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-on-surface-variant">Team Seats</span>
                    <span className="font-bold text-on-surface">3 / 5</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Team Members Card */}
          {activeTab === 'Team Members' && (
          <div className="bg-white border border-outline-variant/30 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-on-surface">Team Members</h2>
                <p className="text-sm text-on-surface-variant">Add or manage your team permissions</p>
              </div>
              <button 
                onClick={() => alert('Team invites coming soon!')}
                className="flex items-center px-4 py-2 bg-secondary-container text-on-secondary-container rounded-xl text-sm font-bold hover:bg-secondary-container/80 transition-colors"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Invite User
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-outline-variant/30">
                <thead className="bg-surface-container-lowest">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider">User</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Role</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-outline-variant/30">
                  {teamMembers.map((member, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {member.avatar ? (
                              <img className="h-10 w-10 rounded-full object-cover border border-outline-variant/50" src={member.avatar} alt="" />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline font-bold border border-outline-variant/50">
                                {member.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-on-surface">{member.name}</div>
                            <div className="text-xs text-on-surface-variant">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-on-surface-variant">
                        {member.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {member.status === 'Active' ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-secondary-container/50 text-secondary">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-surface-container text-outline">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => alert('User management coming soon!')}
                          className="text-outline hover:text-on-surface transition-colors p-1 rounded-lg hover:bg-surface-container"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          )}

          {/* AI Personality Card */}
          {activeTab === 'AI Settings' && (
          <div className="bg-white border-2 border-primary-container rounded-2xl shadow-sm relative overflow-hidden">
            {/* Decorative left accent */}
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-primary"></div>
            
            <div className="p-6 pl-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary-fixed rounded-xl flex items-center justify-center mr-4 shadow-sm">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-on-surface">AI Personality & Performance</h2>
                  <p className="text-sm text-on-surface-variant">Configure how SalesPilot interacts with your prospects.</p>
                </div>
              </div>

              <div className="space-y-8 mt-8">
                {/* Tone Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-on-surface">Tone of Voice</label>
                    <span className="text-xs font-bold text-primary">
                      {tone < 33 ? 'Casual' : tone < 66 ? 'Balanced' : 'Professional & Precise'}
                    </span>
                  </div>
                  <div className="relative w-full mb-2 flex items-center">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={tone} 
                      onChange={(e) => setTone(parseInt(e.target.value))}
                      className="w-full h-3 bg-primary-fixed-dim rounded-full appearance-none cursor-pointer accent-primary" 
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-outline uppercase tracking-wider">
                    <span>Casual</span>
                    <span>Balanced</span>
                    <span>Professional</span>
                  </div>
                </div>

                {/* Latency Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-on-surface">Response Latency</label>
                    <span className="text-xs font-bold text-secondary">
                      {latency < 33 ? 'Slow' : latency < 66 ? 'Average' : 'Instant (High Compute)'}
                    </span>
                  </div>
                  <div className="relative w-full mb-2 flex items-center">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={latency} 
                      onChange={(e) => setLatency(parseInt(e.target.value))}
                      className="w-full h-3 bg-primary-fixed-dim rounded-full appearance-none cursor-pointer accent-secondary" 
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-outline uppercase tracking-wider">
                    <span>Slow</span>
                    <span>Average</span>
                    <span>Ultra-Fast</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Coming Soon Placeholders */}
          {(activeTab === 'Notifications' || activeTab === 'API Integrations') && (
            <div className="bg-white border border-outline-variant/30 rounded-2xl shadow-sm p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-outline" />
              </div>
              <h2 className="text-xl font-bold text-on-surface mb-2">{activeTab}</h2>
              <p className="text-sm text-on-surface-variant max-w-sm">
                This settings pane is currently under construction. Check back soon for updates!
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
