import React, { useState, useMemo } from 'react';
import { getSoulAlignment } from '../services/geminiService';
import { Service } from '../types';
import { Sparkles, Calendar, Check, Loader2, ArrowLeft, ArrowRight, Clock, User, ShieldCheck, Heart, Smartphone, Mail, Tag, ScanLine, Ticket, Baby, AlertCircle, DoorOpen, CreditCard, Banknote, Landmark, Wallet } from 'lucide-react';

const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Reformer: Ascension',
    description: 'A gravity-defying reformer class focused on lifting the spirit and the glutes.',
    duration: 50,
    price: 35,
    category: 'group',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Mat: Grounded Faith',
    description: 'Connect to the earth. A restorative flow to center your intentions.',
    duration: 60,
    price: 25,
    category: 'group',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Private: Soul Architecture',
    description: '1-on-1 kinetic worship tailored to your specific anatomical and spiritual needs.',
    duration: 55,
    price: 95,
    category: 'private',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop'
  },
];

const TIME_SLOTS = [
  "07:00 AM", "08:30 AM", "10:00 AM", "12:00 PM", "04:30 PM", "06:00 PM", "07:30 PM"
];

const VALID_PROMOS: Record<string, number> = {
  'ALIGN': 5,
  'WELCOME': 10,
  'SPIRIT': 8
};

const SpiritualMotes = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className={`absolute rounded-full animate-float-slow opacity-0`}
        style={{
          top: `${Math.random() * 60 + 20}%`,
          left: `${Math.random() * 80 + 10}%`,
          width: `${Math.random() * 8 + 4}px`,
          height: `${Math.random() * 8 + 4}px`,
          backgroundColor: i % 2 === 0 ? '#E8B4B8' : '#D4AF37',
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${Math.random() * 5 + 5}s`,
          opacity: 0.4,
          filter: 'blur(1px)'
        }}
      />
    ))}
  </div>
);

const Barcode = () => (
  <div className="flex justify-center items-end gap-[2px] h-12 w-full overflow-hidden opacity-70 mt-4 mix-blend-multiply">
    {[...Array(40)].map((_, i) => (
      <div 
        key={i} 
        className="bg-leen-stone"
        style={{ 
          width: Math.random() > 0.5 ? '2px' : '4px', 
          height: '100%' 
        }} 
      />
    ))}
  </div>
);

export const Services: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [intention, setIntention] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<{ mantra: string; recommendation: string } | null>(null);
  
  // Booking State
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Contact State
  const [userName, setUserName] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [contactType, setContactType] = useState<'email' | 'phone' | null>(null);
  const [isValidContact, setIsValidContact] = useState(false);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'debit' | 'paypal' | 'cashapp' | 'wire'>('debit');

  // Promo & Checkout State
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [ticketId, setTicketId] = useState('');
  
  // Daycare Addon
  const [addDaycare, setAddDaycare] = useState(false);
  const daycarePrice = 5;

  const nextDays = useMemo(() => {
    const days = [];
    const now = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(now.getDate() + i);
      days.push({
        full: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dateNum: d.getDate()
      });
    }
    return days;
  }, []);

  const handleSoulCheck = async () => {
    if (!intention) return;
    setIsAnalyzing(true);
    try {
      const result = await getSoulAlignment(intention);
      setAiResult(result);
      const found = SERVICES.find(s => s.name.toLowerCase().includes(result.recommendation.toLowerCase().split(' ')[0]));
      if (found) setSelectedService(found);
      setStep(2);
    } catch (e) {
      setStep(2);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleContactChange = (val: string, type: 'email' | 'phone') => {
    setContactMethod(val);
    let valid = false;
    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      valid = emailRegex.test(val);
    } else {
      const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      valid = phoneRegex.test(val);
    }
    setIsValidContact(valid);
  };

  const applyPromo = () => {
    const code = promoCode.toUpperCase();
    if (VALID_PROMOS[code]) {
      setDiscount(VALID_PROMOS[code]);
      setPromoError('');
    } else {
      setDiscount(0);
      setPromoError('The spirits do not recognize this code.');
    }
  };

  const handleManifestation = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setTicketId(`LOC-${Math.floor(Math.random() * 100000)}-${new Date().getFullYear()}`);
      setIsProcessing(false);
      setStep(5);
    }, 3000);
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime('');
    setUserName('');
    setContactMethod('');
    setContactType(null);
    setIsValidContact(false);
    setDiscount(0);
    setPromoCode('');
    setAiResult(null);
    setIntention('');
    setAddDaycare(false);
  };

  return (
    // Increased top padding to avoid header collision
    <section id="booking" className="pt-36 pb-24 px-6 bg-leen-cream relative min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Header */}
        {step < 5 && (
          <div className="flex items-center justify-center mb-16 animate-fade-in">
             <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-leen-stone/40">
                <span className={step >= 1 ? "text-leen-rose" : ""}>Alignment</span>
                <span className="w-4 h-px bg-current"></span>
                <span className={step >= 2 ? "text-leen-rose" : ""}>Time</span>
                <span className="w-4 h-px bg-current"></span>
                <span className={step >= 3 ? "text-leen-rose" : ""}>Identity</span>
                <span className="w-4 h-px bg-current"></span>
                <span className={step >= 4 ? "text-leen-rose font-bold" : ""}>Offering</span>
             </div>
          </div>
        )}

        {/* Step 1: Intention & Initial Service Selection */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl text-leen-stone mb-4">Select Your Practice</h2>
              <p className="font-sans font-light text-leen-stone/60">How would you like to align today?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {SERVICES.map((service) => (
                <button 
                  key={service.id}
                  onClick={() => { setSelectedService(service); setStep(2); }}
                  className={`group relative overflow-hidden bg-white p-6 rounded-sm border transition-all duration-500 text-left hover:shadow-xl ${selectedService?.id === service.id ? 'border-leen-rose shadow-md' : 'border-leen-stone/5 hover:border-leen-rose/30'}`}
                >
                  <div className="aspect-square mb-6 overflow-hidden bg-leen-cream rounded-sm">
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <h3 className="font-serif text-xl text-leen-stone mb-1">{service.name}</h3>
                  <div className="flex justify-between items-center text-xs uppercase tracking-widest text-leen-rose mb-3">
                    <span>{service.duration} Min</span>
                    <span>${service.price}</span>
                  </div>
                  <p className="text-sm font-sans font-light text-leen-stone/60 leading-relaxed mb-4">{service.description}</p>
                </button>
              ))}
            </div>

            <div className="bg-white/50 border border-leen-rose/20 p-8 rounded-sm backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6 text-leen-rose">
                <Sparkles size={20} className="animate-pulse" />
                <span className="text-xs uppercase tracking-[0.3em]">Not sure? Let the AI guide you.</span>
              </div>
              <p className="font-serif text-2xl text-leen-stone mb-6">How is your spirit feeling today?</p>
              <div className="flex flex-col md:flex-row gap-4">
                <input 
                  type="text" 
                  value={intention}
                  onChange={(e) => setIntention(e.target.value)}
                  placeholder="I feel ungrounded and seeking peace..."
                  className="flex-1 bg-white border border-leen-stone/10 px-6 py-4 rounded-sm focus:outline-none focus:border-leen-rose transition-colors italic"
                />
                <button 
                  onClick={handleSoulCheck}
                  disabled={isAnalyzing || !intention}
                  className="bg-leen-stone text-white px-8 py-4 uppercase text-xs tracking-[0.2em] hover:bg-leen-rose transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : 'Align My Spirit'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time Selection */}
        {step === 2 && (
          <div className="animate-fade-in">
             <div className="flex items-center gap-4 mb-12">
                <button onClick={() => setStep(1)} className="p-2 hover:bg-leen-stone/5 rounded-full transition-colors text-leen-stone">
                  <ArrowLeft size={20} />
                </button>
                <h2 className="font-serif text-4xl text-leen-stone">When shall we meet?</h2>
             </div>

             {aiResult && (
               <div className="mb-12 p-6 bg-leen-rose/5 border border-leen-rose/20 rounded-sm animate-reveal-up">
                  <p className="font-serif text-lg italic text-leen-stone mb-2">"{aiResult.mantra}"</p>
                  <p className="text-[10px] uppercase tracking-widest text-leen-rose">Recommendation: {aiResult.recommendation}</p>
               </div>
             )}

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                 <div className="flex items-center gap-2 mb-6 text-leen-stone/60">
                   <Calendar size={16} />
                   <span className="text-xs uppercase tracking-widest">Select Date</span>
                 </div>
                 <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                   {nextDays.map((day) => (
                     <button
                      key={day.full}
                      onClick={() => setSelectedDate(day.full)}
                      className={`flex flex-col items-center justify-center p-3 rounded-sm transition-all duration-300 border ${selectedDate === day.full ? 'bg-leen-stone text-white border-leen-stone' : 'bg-white text-leen-stone border-leen-stone/5 hover:border-leen-rose'}`}
                     >
                       <span className="text-[10px] uppercase tracking-tighter opacity-60 mb-1">{day.dayName}</span>
                       <span className="font-serif text-xl">{day.dateNum}</span>
                     </button>
                   ))}
                 </div>
               </div>

               <div>
                  <div className="flex items-center gap-2 mb-6 text-leen-stone/60">
                    <Clock size={16} />
                    <span className="text-xs uppercase tracking-widest">Available Slots</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {TIME_SLOTS.map((time) => (
                      <button
                        key={time}
                        disabled={!selectedDate}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 px-4 rounded-sm text-xs transition-all border disabled:opacity-20 ${selectedTime === time ? 'bg-leen-rose text-white border-leen-rose shadow-md' : 'bg-white text-leen-stone border-leen-stone/5 hover:border-leen-rose/40'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
               </div>
             </div>

             <div className="mt-16 flex justify-end">
               <button 
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(3)}
                className="bg-leen-stone text-white px-12 py-5 uppercase text-xs tracking-[0.2em] hover:bg-leen-rose transition-all flex items-center gap-3 disabled:opacity-30 shadow-lg group"
               >
                 Continue to Details
                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
               </button>
             </div>
          </div>
        )}

        {/* Step 3: User Details */}
        {step === 3 && (
          <div className="animate-fade-in max-w-xl mx-auto">
             <div className="flex items-center gap-4 mb-12">
                <button onClick={() => setStep(2)} className="p-2 hover:bg-leen-stone/5 rounded-full transition-colors text-leen-stone">
                  <ArrowLeft size={20} />
                </button>
                <h2 className="font-serif text-4xl text-leen-stone">Your Covenant</h2>
             </div>

             <div className="space-y-8">
                <div className="relative">
                  <label className="block text-[10px] uppercase tracking-widest text-leen-stone/60 mb-2">Name</label>
                  <User size={16} className="absolute left-4 top-[2.4rem] text-leen-rose" />
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-white border border-leen-stone/10 pl-12 pr-6 py-4 rounded-sm focus:outline-none focus:border-leen-rose transition-colors"
                  />
                </div>
                
                <div>
                   <label className="block text-[10px] uppercase tracking-widest text-leen-stone/60 mb-3">Preferred Reception</label>
                   
                   <div className="flex gap-4 mb-4">
                      <button 
                        onClick={() => { setContactType('phone'); setContactMethod(''); setIsValidContact(false); }}
                        className={`flex-1 py-3 px-4 rounded-sm border flex items-center justify-center gap-2 transition-all ${contactType === 'phone' ? 'bg-leen-stone text-white border-leen-stone shadow-md' : 'bg-white text-leen-stone/60 border-leen-stone/10 hover:border-leen-rose/50'}`}
                      >
                         <Smartphone size={16} />
                         <span className="text-xs uppercase tracking-widest">Mobile</span>
                      </button>
                      <button 
                        onClick={() => { setContactType('email'); setContactMethod(''); setIsValidContact(false); }}
                        className={`flex-1 py-3 px-4 rounded-sm border flex items-center justify-center gap-2 transition-all ${contactType === 'email' ? 'bg-leen-stone text-white border-leen-stone shadow-md' : 'bg-white text-leen-stone/60 border-leen-stone/10 hover:border-leen-rose/50'}`}
                      >
                         <Mail size={16} />
                         <span className="text-xs uppercase tracking-widest">Email</span>
                      </button>
                   </div>

                   {contactType && (
                     <div className="animate-fade-in">
                       <div className="relative">
                         {contactType === 'email' ? (
                           <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-leen-rose" />
                         ) : (
                           <Smartphone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-leen-rose" />
                         )}
                         
                         <input 
                          type={contactType === 'email' ? 'email' : 'tel'}
                          placeholder={contactType === 'email' ? 'spirit@example.com' : '(281) 555-0199'}
                          value={contactMethod}
                          onChange={(e) => handleContactChange(e.target.value, contactType)}
                          className={`w-full bg-white border pl-12 pr-6 py-4 rounded-sm focus:outline-none transition-colors ${
                            contactMethod && !isValidContact ? 'border-red-300 focus:border-red-400' : 
                            isValidContact ? 'border-leen-rose/50 focus:border-leen-rose' : 'border-leen-stone/10'
                          }`}
                         />
                         
                         <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            {isValidContact && <Check size={16} className="text-green-500 animate-reveal-up" />}
                         </div>
                       </div>
                       
                       {contactMethod && !isValidContact && (
                          <p className="text-[10px] text-red-400 mt-1 pl-1 flex items-center gap-1 animate-fade-in">
                             <AlertCircle size={10} />
                             Please enter a valid {contactType} format.
                          </p>
                       )}
                     </div>
                   )}
                </div>
                
                <div className="pt-6 mt-8 flex justify-end">
                  <button 
                    disabled={!userName || !isValidContact || !contactType}
                    onClick={() => setStep(4)}
                    className="w-full bg-leen-stone text-white py-5 uppercase text-xs tracking-[0.3em] hover:bg-leen-rose transition-all flex items-center justify-center gap-3 disabled:opacity-30 shadow-xl"
                  >
                    Proceed to Offering
                    <ArrowRight size={16} />
                  </button>
                </div>
             </div>
          </div>
        )}

        {/* Step 4: The Offering (Checkout) */}
        {step === 4 && (
          <div className="animate-fade-in max-w-2xl mx-auto">
             <div className="bg-white p-6 md:p-10 shadow-2xl border-t-4 border-leen-rose relative overflow-hidden rounded-sm">
                <div className="absolute top-0 right-0 w-64 h-64 bg-leen-gold/5 rounded-full blur-[60px] pointer-events-none"></div>

                <div className="text-center mb-10">
                   <h3 className="font-serif text-3xl text-leen-stone mb-2">Sacred Exchange</h3>
                   <p className="font-sans text-xs uppercase tracking-widest text-gray-400">Complete your offering to secure your place</p>
                </div>

                {/* Summary Section */}
                <div className="space-y-4 mb-8 border-b border-dashed border-gray-200 pb-8">
                   <div className="flex justify-between items-start">
                      <div>
                         <p className="font-serif text-xl text-leen-stone">{selectedService?.name}</p>
                         <p className="text-xs text-gray-500 mt-1">{selectedDate} &middot; {selectedTime}</p>
                      </div>
                      <p className="font-sans text-lg text-leen-stone">${selectedService?.price.toFixed(2)}</p>
                   </div>
                   
                   {/* Daycare Logic */}
                   <div 
                      className={`relative border transition-all duration-700 rounded-sm p-4 cursor-pointer overflow-hidden group ${addDaycare ? 'bg-leen-pink/10 border-leen-rose' : 'bg-leen-cream/30 border-leen-stone/10 hover:border-leen-rose/30'}`}
                      onClick={() => setAddDaycare(!addDaycare)}
                    >
                      <div className="flex items-start gap-4 relative z-10">
                         <div className={`p-2 rounded-full transition-all duration-700 relative overflow-hidden ${addDaycare ? 'bg-leen-rose text-white shadow-lg scale-110' : 'bg-white text-leen-stone/40'}`}>
                            {addDaycare ? (
                              <div className="animate-reveal-up"><DoorOpen size={20} /></div>
                            ) : (
                              <Baby size={20} />
                            )}
                         </div>
                         <div className="flex-1">
                            <h4 className={`font-serif text-lg transition-colors duration-500 ${addDaycare ? 'text-leen-rose' : 'text-leen-stone'} mb-1`}>
                               {addDaycare ? "Sanctuary Opened" : "Open Door for Child"}
                            </h4>
                            <p className="text-xs text-gray-500 pr-4">
                               {addDaycare ? "Space reserved for your 'Little Angel'." : "Add childcare for +$5.00"}
                            </p>
                         </div>
                         <div className="text-right">
                            <p className={`font-sans font-medium transition-colors ${addDaycare ? 'text-leen-rose' : 'text-gray-400'}`}>+${daycarePrice}</p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* PAYMENT GATEWAY */}
                <div className="mb-10">
                    <label className="block text-[10px] uppercase tracking-widest text-leen-stone/60 mb-4 font-bold">Select Method of Offering</label>
                    <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
                        <button 
                            onClick={() => setPaymentMethod('debit')}
                            className={`flex-1 min-w-[100px] py-3 px-2 rounded-sm border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'debit' ? 'bg-leen-stone text-white border-leen-stone shadow-md' : 'bg-white text-gray-400 border-gray-100'}`}
                        >
                            <CreditCard size={16} />
                            <span className="text-[10px] uppercase tracking-widest">Debit/Card</span>
                        </button>
                        <button 
                            onClick={() => setPaymentMethod('paypal')}
                            className={`flex-1 min-w-[100px] py-3 px-2 rounded-sm border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'paypal' ? 'bg-[#003087] text-white border-[#003087] shadow-md' : 'bg-white text-gray-400 border-gray-100'}`}
                        >
                            <Wallet size={16} />
                            <span className="text-[10px] uppercase tracking-widest">PayPal</span>
                        </button>
                        <button 
                            onClick={() => setPaymentMethod('cashapp')}
                            className={`flex-1 min-w-[100px] py-3 px-2 rounded-sm border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'cashapp' ? 'bg-[#00D632] text-white border-[#00D632] shadow-md' : 'bg-white text-gray-400 border-gray-100'}`}
                        >
                            <Banknote size={16} />
                            <span className="text-[10px] uppercase tracking-widest">CashApp</span>
                        </button>
                        <button 
                            onClick={() => setPaymentMethod('wire')}
                            className={`flex-1 min-w-[100px] py-3 px-2 rounded-sm border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'wire' ? 'bg-leen-stone text-white border-leen-stone shadow-md' : 'bg-white text-gray-400 border-gray-100'}`}
                        >
                            <Landmark size={16} />
                            <span className="text-[10px] uppercase tracking-widest">Wire</span>
                        </button>
                    </div>

                    {/* DYNAMIC PAYMENT FORMS */}
                    <div className="bg-gray-50/50 p-6 rounded-sm border border-gray-100 animate-fade-in">
                        {paymentMethod === 'debit' && (
                            <div className="space-y-4">
                                <input type="text" placeholder="Cardholder Name" className="w-full bg-white border border-gray-200 p-3 text-sm rounded-sm focus:outline-none focus:border-leen-stone" />
                                <div className="relative">
                                    <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white border border-gray-200 pl-10 p-3 text-sm rounded-sm focus:outline-none focus:border-leen-stone" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="MM / YY" className="w-full bg-white border border-gray-200 p-3 text-sm rounded-sm focus:outline-none focus:border-leen-stone" />
                                    <input type="text" placeholder="CVC" className="w-full bg-white border border-gray-200 p-3 text-sm rounded-sm focus:outline-none focus:border-leen-stone" />
                                </div>
                            </div>
                        )}
                        {paymentMethod === 'paypal' && (
                            <div className="text-center py-4">
                                <p className="text-xs text-gray-500 mb-4">You will be redirected to PayPal to complete your offering.</p>
                                <button className="bg-[#003087] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90">Connect Wallet</button>
                            </div>
                        )}
                        {paymentMethod === 'cashapp' && (
                            <div className="space-y-4">
                                <label className="text-xs text-gray-500">Your $Cashtag</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                    <input type="text" placeholder="yourtag" className="w-full bg-white border border-gray-200 pl-8 p-3 text-sm rounded-sm focus:outline-none focus:border-[#00D632]" />
                                </div>
                                <p className="text-[10px] text-gray-400 text-center">A request will be sent to your device.</p>
                            </div>
                        )}
                        {paymentMethod === 'wire' && (
                            <div className="space-y-4">
                                <input type="text" placeholder="Bank Name" className="w-full bg-white border border-gray-200 p-3 text-sm rounded-sm focus:outline-none focus:border-leen-stone" />
                                <input type="text" placeholder="Routing Number" className="w-full bg-white border border-gray-200 p-3 text-sm rounded-sm focus:outline-none focus:border-leen-stone" />
                                <input type="text" placeholder="Account Number" className="w-full bg-white border border-gray-200 p-3 text-sm rounded-sm focus:outline-none focus:border-leen-stone" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-end mb-8 pt-4 border-t border-gray-100">
                   <span className="font-serif text-lg text-gray-400">Total Offering</span>
                   <div className="text-right">
                      {discount > 0 && (
                        <p className="text-sm text-gray-400 line-through mb-1">${(selectedService!.price + (addDaycare ? daycarePrice : 0)).toFixed(2)}</p>
                      )}
                      <p className="font-serif text-4xl text-leen-rose">
                        ${((selectedService!.price + (addDaycare ? daycarePrice : 0)) - discount).toFixed(2)}
                      </p>
                   </div>
                </div>

                <button 
                  onClick={handleManifestation}
                  disabled={isProcessing}
                  className="w-full bg-leen-gold text-white py-5 flex items-center justify-center gap-3 hover:bg-leen-stone transition-all duration-500 group relative overflow-hidden shadow-lg"
                >
                   {isProcessing ? (
                     <span className="flex items-center gap-3 animate-pulse">
                        <Sparkles size={16} /> Processing Offering...
                     </span>
                   ) : (
                     <>
                        <span className="relative z-10 text-xs uppercase tracking-[0.3em] font-bold">Process Payment</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                     </>
                   )}
                </button>
             </div>
          </div>
        )}

        {/* Step 5: The Ticket / Confirmation */}
        {step === 5 && (
          <div className="animate-fade-in text-center py-6 relative flex flex-col items-center">
             <SpiritualMotes />

             <div className="mb-8">
               <h2 className="font-serif text-5xl md:text-6xl text-leen-stone mb-2 animate-reveal-up">
                 Passage Granted.
               </h2>
               <p className="font-sans font-light text-leen-stone/60 max-w-md mx-auto leading-relaxed animate-fade-in delay-300">
                 We await your arrival, {userName.split(' ')[0]}.
               </p>
             </div>

             <div className="bg-[#FDFBF7] w-full max-w-sm mx-auto shadow-[0_10px_40px_-5px_rgba(0,0,0,0.1)] relative group animate-reveal-up delay-500 overflow-hidden rounded-sm border-x-2 border-leen-rose/10">
                <div className="absolute -left-3 top-20 w-6 h-6 bg-leen-cream rounded-full"></div>
                <div className="absolute -right-3 top-20 w-6 h-6 bg-leen-cream rounded-full"></div>

                <div className="p-8 pb-4 bg-white relative z-10">
                   <div className="flex justify-between items-start border-b border-dashed border-gray-200 pb-6 mb-6">
                      <div className="text-left">
                         <p className="text-[10px] uppercase tracking-widest text-leen-gold font-bold mb-1">Admit {addDaycare ? '1 + Angel' : 'One'}</p>
                         <h3 className="font-serif text-2xl text-leen-stone">{selectedService?.name}</h3>
                         {addDaycare && <p className="text-[10px] text-leen-rose mt-1 flex items-center gap-1"><Baby size={10} /> Little Angels Access</p>}
                      </div>
                      <Ticket size={24} className="text-leen-rose/30" />
                   </div>

                   <div className="grid grid-cols-2 gap-4 text-left mb-6">
                      <div>
                         <p className="text-[9px] uppercase tracking-widest text-gray-400">Date</p>
                         <p className="font-serif text-lg text-leen-stone">{selectedDate}</p>
                      </div>
                      <div>
                         <p className="text-[9px] uppercase tracking-widest text-gray-400">Time</p>
                         <p className="font-serif text-lg text-leen-stone">{selectedTime}</p>
                      </div>
                      <div className="col-span-2">
                         <p className="text-[9px] uppercase tracking-widest text-gray-400">Guest</p>
                         <p className="font-sans text-sm text-leen-stone truncate">{userName}</p>
                      </div>
                   </div>
                </div>

                <div className="bg-[#FDFBF7] p-6 pt-0 border-t border-dashed border-gray-200 relative z-10">
                   <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-gray-400 mb-2 pt-4">
                      <span>Scan at Entry</span>
                      <span>{ticketId}</span>
                   </div>
                   <Barcode />
                   <div className="flex items-center justify-center gap-2 mt-4 text-leen-rose/50">
                      <ScanLine size={14} className="animate-pulse" />
                      <span className="text-[10px]">Digital Key Active</span>
                   </div>
                </div>
             </div>

             <p className="text-xs text-gray-400 mt-8 max-w-sm mx-auto animate-fade-in delay-700">
                A copy of this key has been sent to {contactMethod}.<br/>
                Please present this barcode upon entering the studio.
             </p>

             <button 
              onClick={resetBooking}
              className="mt-8 text-leen-stone/50 hover:text-leen-stone uppercase text-[10px] tracking-widest border-b border-leen-stone/10 pb-1 transition-all hover:border-leen-stone hover:scale-105"
             >
               Return to Sanctuary
             </button>
          </div>
        )}

      </div>
    </section>
  );
};