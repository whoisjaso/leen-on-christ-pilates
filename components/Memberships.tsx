import React, { useState } from 'react';
import { Check, Star, Wind, Crown, ArrowRight, User, Mail, Smartphone, AlertCircle, Loader2, ArrowLeft, Baby, Heart, Lock, Key, CreditCard, Wallet, Banknote, Landmark, Sparkles } from 'lucide-react';

const TIERS = [
  {
    id: 'vessel',
    name: "The Vessel",
    subtitle: "Drop-In Class",
    price: 35,
    period: "/class",
    description: "For the seeker who needs a momentary realignment.",
    features: ["Single Reformer or Mat Session", "Access to Boutique", "Complimentary Water", "Little Angels Access: +$5"],
    icon: Wind,
    color: "bg-white",
    highlight: false,
    daycareCost: 5,
    isSubscription: false
  },
  {
    id: 'disciple',
    name: "The Disciple",
    subtitle: "Monthly Covenant",
    price: 250,
    period: "/month",
    description: "Commit to the practice. Consistency creates reality.",
    features: ["8 Classes Monthly", "Priority Booking Window", "5% Boutique Discount", "1 Guest Pass / Month", "Little Angels Access: +$10/mo"],
    icon: Star,
    color: "bg-leen-cream border-leen-rose/30",
    highlight: false,
    daycareCost: 10,
    isSubscription: true
  },
  {
    id: 'kingdom',
    name: "The Kingdom",
    subtitle: "Unlimited Ascension",
    price: 380,
    period: "/month",
    description: "Complete immersion. The body becomes a living temple.",
    features: ["Unlimited Classes", "Private Concierge Booking", "15% Boutique Discount", "Access to VIP Workshops", "Little Angels Access: Included"],
    icon: Crown,
    color: "bg-leen-stone text-leen-cream",
    highlight: true,
    daycareCost: 0,
    isSubscription: true
  }
];

export const Memberships: React.FC = () => {
  // Flow State: 0 = Selection, 1 = Auth(Login/Signup), 2 = Pre-Proceed(Vow) & Payment, 3 = Success
  const [step, setStep] = useState(0);
  const [selectedTier, setSelectedTier] = useState<typeof TIERS[0] | null>(null);
  const [addDaycare, setAddDaycare] = useState(false);
  
  // Auth State
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [authEmail, setAuthEmail] = useState('');
  const [authPass, setAuthPass] = useState('');
  const [authName, setAuthName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'debit' | 'paypal' | 'cashapp' | 'wire'>('debit');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectTier = (tier: typeof TIERS[0]) => {
    setSelectedTier(tier);
    setStep(1); // Go to Auth
    setAddDaycare(false); 
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth check
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        setIsLoggedIn(true);
        setStep(2); // Proceed to The Vow
    }, 1500);
  };

  const handleSealCovenant = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2500);
  };

  const calculateTotal = () => {
    if (!selectedTier) return 0;
    return selectedTier.price + (addDaycare ? selectedTier.daycareCost : 0);
  };

  return (
    <div className="min-h-screen py-32 px-6 relative overflow-hidden bg-[#FDFBF7]">
        {/* Background ambience */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-leen-cream to-white z-0 pointer-events-none"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-leen-rose/10 rounded-full blur-[100px] animate-float z-0 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
            
            {/* Header / Nav Back */}
            {step > 0 && step < 3 && (
               <button 
                onClick={() => setStep(step - 1)}
                className="mb-8 flex items-center gap-2 text-leen-stone/50 hover:text-leen-stone transition-colors"
               >
                 <ArrowLeft size={16} />
                 <span className="text-xs uppercase tracking-widest">Return</span>
               </button>
            )}

            {/* STEP 0: TIER SELECTION */}
            {step === 0 && (
              <div className="animate-fade-in">
                <div className="text-center mb-20">
                    <span className="text-xs uppercase tracking-[0.4em] text-leen-rose mb-4 block animate-fade-in">Join the Fold</span>
                    <h1 className="font-serif text-5xl md:text-6xl text-leen-stone mb-6 animate-fade-in">The Covenant</h1>
                    <p className="font-sans font-light text-leen-stone/60 max-w-2xl mx-auto leading-relaxed">
                        Choose the level of commitment that resonates with your spirit. 
                        This is not a transaction; it is an investment in your metaphysical architecture.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {TIERS.map((tier, idx) => (
                        <div 
                            key={idx}
                            className={`relative p-8 rounded-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${tier.color} ${tier.highlight ? 'shadow-2xl scale-105 border border-leen-gold/20' : 'border border-gray-100 shadow-sm'}`}
                        >
                            {tier.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-leen-gold text-white px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-md">
                                    Most Transcendent
                                </div>
                            )}

                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${tier.highlight ? 'bg-white/10 text-leen-gold' : 'bg-leen-stone/5 text-leen-rose'}`}>
                                <tier.icon size={24} strokeWidth={1.5} />
                            </div>

                            <h3 className={`font-serif text-3xl mb-1 ${tier.highlight ? 'text-white' : 'text-leen-stone'}`}>{tier.name}</h3>
                            <p className={`text-xs uppercase tracking-widest mb-6 ${tier.highlight ? 'text-white/50' : 'text-gray-400'}`}>{tier.subtitle}</p>

                            <div className="flex items-baseline mb-6">
                                <span className={`text-4xl font-serif ${tier.highlight ? 'text-leen-gold' : 'text-leen-stone'}`}>${tier.price}</span>
                                <span className={`text-sm ${tier.highlight ? 'text-white/40' : 'text-gray-400'}`}>{tier.period}</span>
                            </div>

                            <p className={`font-sans text-sm mb-8 leading-relaxed ${tier.highlight ? 'text-white/70' : 'text-gray-500'}`}>
                                {tier.description}
                            </p>

                            <div className="space-y-4 mb-8">
                                {tier.features.map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Check size={16} className={tier.highlight ? 'text-leen-gold' : 'text-leen-rose'} />
                                        <span className={`text-sm ${tier.highlight ? 'text-white/80' : 'text-gray-600'}`}>{feat}</span>
                                    </div>
                                ))}
                            </div>

                            <button 
                                onClick={() => handleSelectTier(tier)}
                                className={`w-full py-4 uppercase text-xs tracking-[0.2em] transition-colors ${
                                tier.highlight 
                                ? 'bg-leen-gold text-white hover:bg-white hover:text-leen-stone' 
                                : 'bg-leen-stone text-white hover:bg-leen-rose'
                            }`}>
                                Begin Journey
                            </button>
                        </div>
                    ))}
                </div>
              </div>
            )}

            {/* STEP 1: AUTHENTICATION */}
            {step === 1 && selectedTier && (
               <div className="max-w-md mx-auto animate-fade-in">
                   <div className="bg-white p-10 shadow-2xl rounded-sm border-t-4 border-leen-rose">
                       <div className="text-center mb-8">
                           <h2 className="font-serif text-3xl text-leen-stone">Identify Thyself</h2>
                           <p className="text-xs uppercase tracking-widest text-gray-400 mt-2">Access to the Covenant requires credentials.</p>
                       </div>

                       <div className="flex bg-gray-50 p-1 rounded-sm mb-8">
                           <button 
                             onClick={() => setAuthMode('signup')}
                             className={`flex-1 py-2 text-xs uppercase tracking-widest transition-all ${authMode === 'signup' ? 'bg-white shadow-sm text-leen-stone' : 'text-gray-400 hover:text-leen-stone'}`}
                           >
                             Initiate
                           </button>
                           <button 
                             onClick={() => setAuthMode('login')}
                             className={`flex-1 py-2 text-xs uppercase tracking-widest transition-all ${authMode === 'login' ? 'bg-white shadow-sm text-leen-stone' : 'text-gray-400 hover:text-leen-stone'}`}
                           >
                             Return
                           </button>
                       </div>

                       <form onSubmit={handleAuth} className="space-y-6">
                           {authMode === 'signup' && (
                               <div>
                                   <label className="text-[10px] uppercase font-bold text-gray-400 mb-2 block">Full Name</label>
                                   <div className="relative">
                                       <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-leen-rose" />
                                       <input 
                                         required
                                         type="text" 
                                         value={authName}
                                         onChange={(e) => setAuthName(e.target.value)}
                                         className="w-full bg-leen-cream border border-gray-100 pl-10 p-3 text-sm focus:outline-none focus:border-leen-stone" 
                                         placeholder="Spirit Name" 
                                       />
                                   </div>
                               </div>
                           )}
                           <div>
                               <label className="text-[10px] uppercase font-bold text-gray-400 mb-2 block">Email Address</label>
                               <div className="relative">
                                   <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-leen-rose" />
                                   <input 
                                     required
                                     type="email" 
                                     value={authEmail}
                                     onChange={(e) => setAuthEmail(e.target.value)}
                                     className="w-full bg-leen-cream border border-gray-100 pl-10 p-3 text-sm focus:outline-none focus:border-leen-stone" 
                                     placeholder="you@example.com" 
                                   />
                               </div>
                           </div>
                           <div>
                               <label className="text-[10px] uppercase font-bold text-gray-400 mb-2 block">Passkey</label>
                               <div className="relative">
                                   <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-leen-rose" />
                                   <input 
                                     required
                                     type="password" 
                                     value={authPass}
                                     onChange={(e) => setAuthPass(e.target.value)}
                                     className="w-full bg-leen-cream border border-gray-100 pl-10 p-3 text-sm focus:outline-none focus:border-leen-stone" 
                                     placeholder="••••••••" 
                                   />
                               </div>
                           </div>

                           <button 
                             type="submit" 
                             disabled={isProcessing}
                             className="w-full bg-leen-stone text-white py-4 uppercase text-xs tracking-[0.2em] hover:bg-leen-rose transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                           >
                               {isProcessing ? <Loader2 size={16} className="animate-spin" /> : (authMode === 'signup' ? 'Create Vessel' : 'Enter Sanctuary')}
                           </button>
                       </form>
                   </div>
               </div>
            )}

            {/* STEP 2: THE VOW & PAYMENT */}
            {step === 2 && selectedTier && (
               <div className="max-w-2xl mx-auto animate-fade-in">
                   <div className="bg-white shadow-2xl overflow-hidden rounded-sm relative">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-leen-gold/5 rounded-full blur-[80px]"></div>

                       <div className="p-10 md:p-14 border-b border-gray-100 text-center">
                          <h2 className="font-serif text-4xl text-leen-stone mb-2">The Vow</h2>
                          <p className="text-xs uppercase tracking-widest text-gray-400">Review your commitment before sealing</p>
                       </div>

                       <div className="p-10 md:p-14 space-y-8">
                          {/* Summary */}
                          <div className="flex justify-between items-start border-b border-dashed border-gray-200 pb-8">
                             <div>
                                <h3 className="font-serif text-2xl text-leen-stone">{selectedTier.name}</h3>
                                <p className="text-xs uppercase tracking-wide text-gray-400 mt-1">{selectedTier.subtitle}</p>
                             </div>
                             <div className="text-right">
                                <p className="font-serif text-2xl text-leen-rose">${selectedTier.price}</p>
                                <p className="text-[10px] text-gray-400">{selectedTier.period}</p>
                             </div>
                          </div>

                          {/* Daycare Logic */}
                          {selectedTier.daycareCost > 0 ? (
                             <div 
                                className={`relative border transition-all duration-500 rounded-sm p-5 cursor-pointer overflow-hidden ${addDaycare ? 'bg-leen-pink/10 border-leen-rose' : 'bg-leen-cream/30 border-leen-stone/10 hover:border-leen-rose/30'}`}
                                onClick={() => setAddDaycare(!addDaycare)}
                             >
                                <div className="flex items-start gap-4 relative z-10">
                                   <div className={`p-2 rounded-full transition-colors ${addDaycare ? 'bg-leen-rose text-white' : 'bg-white text-leen-stone/40'}`}>
                                      <Baby size={20} />
                                   </div>
                                   <div className="flex-1">
                                      <h4 className="font-serif text-lg text-leen-stone mb-1">Little Angels Access</h4>
                                      <p className="text-xs text-gray-500 leading-relaxed pr-4">
                                         Open the door for your child. Unlimited daycare access for the duration of your membership.
                                      </p>
                                   </div>
                                   <div className="text-right">
                                      <p className="font-sans text-leen-rose font-medium">+${selectedTier.daycareCost}/mo</p>
                                      {addDaycare && <Check size={16} className="text-green-500 ml-auto mt-2" />}
                                   </div>
                                </div>
                             </div>
                          ) : (
                             <div className="bg-leen-gold/10 border border-leen-gold/20 p-5 rounded-sm flex items-start gap-4">
                                <div className="p-2 rounded-full bg-leen-gold text-white">
                                   <Crown size={20} />
                                </div>
                                <div>
                                   <h4 className="font-serif text-lg text-leen-stone mb-1">Little Angels Included</h4>
                                   <p className="text-xs text-gray-600">
                                      As royalty of the Kingdom, childcare is provided at no extra cost. Your family is our family.
                                   </p>
                                </div>
                             </div>
                          )}
                          
                          {/* PAYMENT GATEWAY */}
                          <div className="mt-8">
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

                             {/* Forms */}
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

                          {/* Total & Action */}
                          <div className="pt-4">
                             <div className="flex justify-between items-end mb-8">
                                <span className="font-serif text-xl text-gray-400">Monthly Offering</span>
                                <div className="text-right">
                                   <p className="font-serif text-5xl text-leen-stone">${calculateTotal()}</p>
                                   <p className="text-xs text-gray-400 mt-1">Billed monthly &middot; Cancel anytime</p>
                                </div>
                             </div>

                             <button 
                                onClick={handleSealCovenant}
                                disabled={isProcessing}
                                className="w-full bg-leen-stone text-white py-6 text-sm uppercase tracking-[0.3em] hover:bg-leen-rose transition-all flex items-center justify-center gap-4 group relative overflow-hidden shadow-2xl"
                             >
                                {isProcessing ? (
                                   <span className="flex items-center gap-3 animate-pulse">
                                      <Loader2 size={16} className="animate-spin" /> Consecrating...
                                   </span>
                                ) : (
                                   <>
                                      <span className="relative z-10 font-bold">Seal The Covenant</span>
                                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                   </>
                                )}
                             </button>
                          </div>
                       </div>
                   </div>
               </div>
            )}

            {/* STEP 3: INITIATION (Success) */}
            {step === 3 && (
               <div className="text-center py-20 animate-reveal-up">
                  <div className="mb-8 relative inline-block">
                     <div className="absolute inset-0 bg-leen-gold/20 rounded-full blur-xl animate-pulse"></div>
                     <Star size={64} className="text-leen-gold relative z-10 fill-leen-gold/20" strokeWidth={1} />
                  </div>
                  
                  <h2 className="font-serif text-6xl text-leen-stone mb-6">Welcome to the Fold.</h2>
                  <p className="font-sans text-lg font-light text-leen-stone/70 max-w-lg mx-auto leading-relaxed mb-12">
                     Your commitment has been recorded in the ethereal plane. <br/>
                     An initiation packet has been sent to your vessel.
                  </p>

                  <div className="inline-block p-8 bg-white shadow-lg border-t-4 border-leen-rose rounded-sm">
                     <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Member ID</p>
                     <p className="font-serif text-3xl text-leen-stone tracking-wider">LOC-{Math.floor(Math.random() * 10000)}-25</p>
                  </div>
                  
                  <div className="mt-16">
                     <button 
                       onClick={() => { setStep(0); setSelectedTier(null); }}
                       className="text-leen-stone/50 hover:text-leen-stone uppercase text-xs tracking-widest border-b border-transparent hover:border-leen-stone pb-1 transition-all"
                     >
                        Return to Sanctuary
                     </button>
                  </div>
               </div>
            )}

        </div>
    </div>
  );
};