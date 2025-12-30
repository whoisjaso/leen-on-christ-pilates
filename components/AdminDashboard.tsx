import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';
import { 
  TrendingUp, Users, DollarSign, Calendar, Server, Database, 
  Activity, Star, Edit2, Trash2, Plus, X, MessageSquare, CheckCircle2, Lock
} from 'lucide-react';

// Data reset to ZERO as requested
const DATA_REVENUE = [
  { name: 'Mon', uv: 0 },
  { name: 'Tue', uv: 0 },
  { name: 'Wed', uv: 0 },
  { name: 'Thu', uv: 0 },
  { name: 'Fri', uv: 0 },
  { name: 'Sat', uv: 0 },
  { name: 'Sun', uv: 0 },
];

const DATA_CLASS_TYPES = [
  { name: 'Reformer', pv: 0 },
  { name: 'Mat', pv: 0 },
  { name: 'Private', pv: 0 },
  { name: 'Daycare', pv: 0 },
];

const DATA_RETENTION = [
  { name: 'Week 1', active: 0, churn: 0 },
  { name: 'Week 2', active: 0, churn: 0 },
  { name: 'Week 3', active: 0, churn: 0 },
  { name: 'Week 4', active: 0, churn: 0 },
];

const INITIAL_TESTIMONIALS: any[] = []; // Empty start

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ author: '', location: '', text: '', rating: 5 });
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Admin password should be set via VITE_ADMIN_PASSWORD environment variable
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || '';
    if (adminPassword && password === adminPassword) {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-leen-stone px-6">
        <div className="bg-white p-12 rounded-sm shadow-2xl max-w-md w-full text-center animate-reveal-up">
           <Lock size={48} className="mx-auto text-leen-rose mb-6" />
           <h2 className="font-serif text-3xl text-leen-stone mb-2">The Inner Sanctum</h2>
           <p className="text-xs uppercase tracking-widest text-gray-400 mb-8">Administrator Access Only</p>
           
           <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Passkey"
                className="w-full bg-leen-cream border border-gray-200 p-4 text-center tracking-[0.5em] focus:outline-none focus:border-leen-rose transition-colors"
                autoFocus
              />
              {authError && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wide">Access Denied</p>}
              <button type="submit" className="w-full bg-leen-gold text-white py-4 uppercase text-xs tracking-widest hover:bg-leen-stone transition-colors">
                 Enter
              </button>
           </form>
        </div>
      </div>
    );
  }

  const handleOpenModal = (testimonial?: any) => {
    if (testimonial) {
      setEditingId(testimonial.id);
      setFormData({ author: testimonial.author, location: testimonial.location, text: testimonial.text, rating: testimonial.rating });
    } else {
      setEditingId(null);
      setFormData({ author: '', location: '', text: '', rating: 5 });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      setTestimonials(prev => prev.map(t => t.id === editingId ? { ...formData, id: editingId } : t));
      setSuccessMsg('Testimonial Updated');
    } else {
      const newTestimonial = { ...formData, id: Date.now() };
      setTestimonials(prev => [newTestimonial, ...prev]);
      setSuccessMsg('New Testimony Added');
    }
    setIsModalOpen(false);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to remove this witness from the sanctuary?")) {
      setTestimonials(prev => prev.filter(t => t.id !== id));
      setSuccessMsg('Testimonial Removed');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <div className="bg-[#F9F7F2] min-h-screen pt-24 pb-20 px-6 lg:pt-40 lg:pb-32 lg:px-12">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-24 gap-6">
          <div className="animate-reveal-up">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-leen-stone">Welcome back, Aileen.</h1>
            <p className="text-gray-400 text-sm lg:text-base mt-3 font-sans tracking-wide">The studio's vibration is currently high and ascending.</p>
          </div>
          <div className="text-left md:text-right animate-reveal-up delay-100">
            <p className="text-[10px] uppercase tracking-[0.4em] text-leen-rose font-bold mb-2">System Status</p>
            <div className="flex items-center gap-3 justify-start md:justify-end">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                <p className="font-serif text-xl lg:text-2xl text-leen-stone italic">Divine Flow Optimal</p>
            </div>
          </div>
        </div>

        {/* Status Notification */}
        {successMsg && (
          <div className="fixed top-28 right-6 z-[150] bg-leen-stone text-leen-cream px-8 py-5 rounded-sm shadow-2xl flex items-center gap-4 animate-fade-in border-l-4 border-leen-gold">
            <CheckCircle2 size={20} className="text-leen-gold" />
            <span className="text-xs uppercase tracking-widest font-medium">{successMsg}</span>
          </div>
        )}

        {/* Backend & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12 mb-12 lg:mb-20">
            <div className="lg:col-span-1 bg-leen-stone text-white p-8 lg:p-12 rounded-xl shadow-lg relative overflow-hidden flex flex-col justify-between h-full min-h-[300px]">
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <Activity size={180} />
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-6">Frequency Response</h3>
                  <p className="text-4xl lg:text-5xl font-serif italic mb-3">24ms</p>
                  <p className="text-[10px] text-green-400 uppercase tracking-widest">Active Latency</p>
                </div>
                <div className="mt-8 pt-8 border-t border-white/10">
                   <div className="flex items-center gap-3 text-xs text-white/60">
                      <Database size={16} />
                      <span>Syncing with Cloud Temple</span>
                   </div>
                </div>
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
              {[
                { label: 'Total Revenue', val: '$0.00', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Active Disciples', val: '0', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Classes Booked', val: '0', icon: Calendar, color: 'text-leen-rose', bg: 'bg-leen-pink/20' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-8 lg:p-10 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-8">
                    <div className={`p-4 lg:p-5 rounded-full ${stat.bg} ${stat.color}`}>
                      <stat.icon size={28} strokeWidth={1.5} />
                    </div>
                    <span className="text-gray-400 text-xs font-bold bg-gray-50 px-2 py-1 rounded-full">--</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-serif text-leen-stone mb-2">{stat.val}</h3>
                  <p className="text-[10px] uppercase text-gray-400 tracking-[0.25em] font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-20">
          <div className="bg-white p-10 lg:p-14 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-12">
              <h3 className="font-serif text-2xl lg:text-3xl text-leen-stone">Revenue Ascension</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-leen-rose"></div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400">Projected</span>
                </div>
              </div>
            </div>
            <div className="h-80 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA_REVENUE}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E8B4B8" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#E8B4B8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11, fontWeight: 500}} dy={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11, fontWeight: 500}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', padding: '12px' }} 
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#5D576B' }}
                  />
                  <Area type="monotone" dataKey="uv" stroke="#E8B4B8" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-10 lg:p-14 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-serif text-2xl lg:text-3xl text-leen-stone mb-12">Offerings Distribution</h3>
            <div className="h-80 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DATA_CLASS_TYPES}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0"/>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11, fontWeight: 500}} dy={15} />
                  <Tooltip 
                    cursor={{fill: '#FDFBF7'}} 
                    contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', padding: '12px' }}
                  />
                  <Bar dataKey="pv" fill="#D4AF37" radius={[6, 6, 0, 0]} barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Testimonial Management Section */}
        <div className="bg-white p-10 lg:p-14 rounded-xl shadow-sm border border-gray-100 mb-12 lg:mb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 lg:mb-16 gap-6">
                <div>
                    <h3 className="font-serif text-3xl lg:text-4xl text-leen-stone">Witness Management</h3>
                    <p className="text-gray-400 text-xs lg:text-sm mt-2 tracking-wide">Curate the voices that echo within the sanctuary.</p>
                </div>
                <button 
                  onClick={() => handleOpenModal()}
                  className="bg-leen-stone text-white px-8 py-4 text-[10px] lg:text-xs uppercase tracking-[0.25em] hover:bg-leen-rose transition-all flex items-center gap-3 shadow-lg group rounded-sm"
                >
                  <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                  Invite New Witness
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="text-gray-400 text-[10px] uppercase tracking-widest border-b border-gray-100">
                            <th className="pb-6 lg:pb-8 font-semibold pl-4">Author</th>
                            <th className="pb-6 lg:pb-8 font-semibold">Witness Statement</th>
                            <th className="pb-6 lg:pb-8 font-semibold">Sanctity (Rating)</th>
                            <th className="pb-6 lg:pb-8 font-semibold text-right pr-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-leen-stone divide-y divide-gray-50">
                        {testimonials.map((t) => (
                            <tr key={t.id} className="group hover:bg-gray-50/50 transition-colors">
                                <td className="py-8 lg:py-10 pl-4 align-top w-1/4">
                                    <p className="font-serif text-xl leading-none mb-2">{t.author}</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{t.location}</p>
                                </td>
                                <td className="py-8 lg:py-10 pr-12 align-top max-w-2xl">
                                    <p className="italic text-gray-600 leading-relaxed font-serif text-lg">"{t.text}"</p>
                                </td>
                                <td className="py-8 lg:py-10 align-top w-1/6">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} className={i < t.rating ? 'fill-leen-gold text-leen-gold' : 'text-gray-200'} />
                                        ))}
                                    </div>
                                </td>
                                <td className="py-8 lg:py-10 text-right align-top pr-4 w-1/6">
                                    <div className="flex justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <button 
                                          onClick={() => handleOpenModal(t)}
                                          className="p-3 text-leen-stone/60 hover:text-leen-stone hover:bg-white rounded-full shadow-sm transition-all border border-transparent hover:border-gray-100"
                                          title="Edit witness"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button 
                                          onClick={() => handleDelete(t.id)}
                                          className="p-3 text-leen-stone/60 hover:text-red-500 hover:bg-white rounded-full shadow-sm transition-all border border-transparent hover:border-gray-100"
                                          title="Remove witness"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {testimonials.length === 0 && (
              <div className="text-center py-24 lg:py-32 border-2 border-dashed border-gray-100 rounded-xl mt-8">
                 <MessageSquare size={48} className="mx-auto text-gray-200 mb-6" />
                 <p className="font-serif text-2xl text-gray-300">The sanctuary is currently silent.</p>
                 <p className="text-xs uppercase tracking-widest text-gray-300 mt-2">Awaiting first testimonies.</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};