import React, { useState, useEffect } from 'react';
import { Menu, X, Search, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenPartsSearch: () => void;
  onOpenQuoteModal: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenPartsSearch,
  onOpenQuoteModal,
  onScrollToSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tabName: string, sectionId?: string) => {
    setActiveTab(tabName);
    setMobileMenuOpen(false);
    if (tabName === 'HOME' && sectionId) {
      setTimeout(() => onScrollToSection(sectionId), 100);
    }
  };

  const navLinks = [
    { label: 'Home', id: 'HOME' },
    { label: 'Products', id: 'PRODUCTS' },
    { label: 'Company', id: 'COMPANY' },
    { label: 'Markets', id: 'MARKETS' },
    { label: 'Brands', id: 'BRANDS' },
    { label: 'Machinery', id: 'MACHINERY' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-in fade-in slide-in-from-top-4 ${
      isScrolled 
        ? 'bg-[#02060D]/90 shadow-2xl border-b border-white/10 backdrop-blur-2xl py-1' 
        : 'bg-[#02060D]/60 backdrop-blur-xl border-b border-white/5 py-0'
    }`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-20 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Left Side Group: Logo and Navigation Links grouped with 3px space */}
        <div className="flex items-center gap-[3px]">
          {/* Zone 1: Brand */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('HOME', 'hero');
            }}
            className="hover:opacity-95 active:scale-98 transition-all duration-300 mr-2"
          >
            <Logo />
          </a>

          {/* Zone 2: Navigation Links (Highly compact with smaller fonts & paddings) */}
          <div className="hidden xl:flex items-center gap-[2px]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id, link.id === 'HOME' ? 'hero' : undefined)}
                className={`text-[9.5px] font-bold uppercase tracking-[0.12em] px-3.5 py-2 rounded-full transition-all duration-300 btn-glass-hover relative overflow-hidden group/item active:scale-95 ${
                  activeTab === link.id 
                    ? 'text-[#FFB800] bg-white/5' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {/* Subtle animated underline */}
                <span className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 h-[2px] bg-[#FFB800] transition-all duration-300 rounded-full ${
                  activeTab === link.id ? 'w-3' : 'w-0 group-hover/item:w-3'
                }`} />
              </button>
            ))}
            <button
              onClick={() => handleNavClick('CONTACT')}
              className={`text-[9.5px] font-bold uppercase tracking-[0.12em] px-3.5 py-2 rounded-full transition-all duration-300 btn-glass-hover relative overflow-hidden group/item active:scale-95 ${
                activeTab === 'CONTACT' ? 'text-[#FFB800] bg-white/5' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="relative z-10">Contact</span>
              {/* Subtle animated underline */}
              <span className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 h-[2px] bg-[#FFB800] transition-all duration-300 rounded-full ${
                activeTab === 'CONTACT' ? 'w-3' : 'w-0 group-hover/item:w-3'
              }`} />
            </button>
          </div>
        </div>

        {/* Zone 3: Actions (Compact so Request Quota stays strictly inline) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPartsSearch}
            className="hidden sm:flex items-center gap-1.5 text-[9.5px] font-black uppercase tracking-widest text-[#FFB800] hover:text-white hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Parts Search</span>
          </button>
          
          <button
            onClick={onOpenQuoteModal}
            className="hidden md:flex bg-[#FFB800] hover:bg-white text-[#02060D] font-black px-4.5 py-2 rounded-full text-[9.5px] uppercase tracking-widest hover:-translate-y-0.5 hover:scale-104 active:scale-95 transition-all duration-300 shadow-lg shadow-[#FFB800]/10 items-center gap-1.5 whitespace-nowrap"
          >
            REQUEST QUOTA <ArrowRight className="w-3 h-3" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-white hover:text-[#FFB800] active:scale-90 transition-all duration-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-16 right-6 w-[280px] bg-[#02060D]/95 backdrop-blur-3xl border border-white/10 rounded-[30px] p-6 shadow-2xl flex flex-col gap-3 text-center z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id, link.id === 'HOME' ? 'hero' : undefined)}
              className="text-sm font-bold uppercase tracking-[0.15em] text-slate-300 hover:text-[#FFB800] py-2 transition-colors duration-300 border-b border-white/5 last:border-0"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('CONTACT')}
            className="text-sm font-bold uppercase tracking-[0.15em] text-slate-300 hover:text-[#FFB800] py-2 transition-colors duration-300 border-b border-white/5"
          >
            Contact
          </button>
          <button
            onClick={() => {
              onOpenPartsSearch();
              setMobileMenuOpen(false);
            }}
            className="mt-2 w-full bg-[#FFB800] hover:bg-white text-[#02060D] py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center shadow-lg shadow-[#FFB800]/10 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
          >
            Parts Search
          </button>
          <button
            onClick={() => {
              onOpenQuoteModal();
              setMobileMenuOpen(false);
            }}
            className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center border border-white/10 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
          >
            Request Quota
          </button>
        </div>
      )}
    </nav>
  );
};
