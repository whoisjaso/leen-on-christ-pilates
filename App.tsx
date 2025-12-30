import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Shop } from './components/Shop';
import { Daycare } from './components/Daycare';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { Founder } from './components/Founder';
import { ParticleBackground } from './components/ParticleBackground';
import { ScriptureFlow } from './components/ScriptureFlow';
import { SavedItems } from './components/SavedItems';
import { Memberships } from './components/Memberships';
import { CartDrawer } from './components/CartDrawer';
import { CartProvider } from './context/CartContext';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return (
          <>
            <Hero onExplore={() => setCurrentPage('booking')} />
            <div className="relative z-10">
              <Founder />
              <Services />
              <ScriptureFlow />
              <Daycare />
              <Testimonials />
            </div>
          </>
        );
      case 'booking':
        return <div className="relative z-10"><Services /></div>;
      case 'shop':
        return <div className="relative z-10"><Shop /></div>;
      case 'saved':
        return <div className="relative z-10"><SavedItems /></div>;
      case 'memberships':
        return <div className="relative z-10"><Memberships /></div>;
      case 'daycare':
        return <div className="relative z-10"><Daycare /></div>;
      case 'founder':
        return (
          <div className="pt-20 relative z-10">
            <Founder />
          </div>
        );
      case 'admin':
        return <div className="relative z-10"><AdminDashboard /></div>;
      default:
        return <Hero onExplore={() => setCurrentPage('booking')} />;
    }
  };

  return (
    <CartProvider>
      <div className="antialiased text-leen-stone bg-leen-cream min-h-screen flex flex-col font-sans selection:bg-leen-rose selection:text-white relative">
        <ParticleBackground />
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <CartDrawer />
        
        <main className="flex-grow">
          {renderPage()}
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;