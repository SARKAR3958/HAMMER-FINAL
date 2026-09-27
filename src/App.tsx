import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { OurAdvantages } from './components/OurAdvantages';
import { CustomManufacturing } from './components/CustomManufacturing';
import { BrandsWeWorkWith } from './components/BrandsWeWorkWith';
import { ProductGallery } from './components/ProductGallery';
import { AboutUs } from './components/AboutUs';
import { LeaveUsMessage } from './components/LeaveUsMessage';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';

// Page Components
import { ProductsPage } from './pages/ProductsPage';
import { CompanyPage } from './pages/CompanyPage';
import { MarketsPage } from './pages/MarketsPage';
import { BrandsPage } from './pages/BrandsPage';
import { MachineryPage } from './pages/MachineryPage';
import { IndustryPage } from './pages/IndustryPage';
import { ContactPage } from './pages/ContactPage';

import { PartsSearchModal } from './components/PartsSearchModal';
import { GetQuoteModal } from './components/GetQuoteModal';
import { WhatsAppChatModal } from './components/WhatsAppChatModal';
import { VideoModal } from './components/VideoModal';
import { ALL_PRELOAD_IMAGES, PartItem } from './data/partsData';
import { useGlobalImageCache } from './components/PreloadedImage';

export default function App() {
  const [activeTab, setActiveTab] = useState('HOME');
  
  // Global Image Preloader & Cache
  const { progress, isPreloading } = useGlobalImageCache(ALL_PRELOAD_IMAGES);

  // Modal states
  const [isPartsSearchOpen, setIsPartsSearchOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<PartItem | null>(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleScrollToSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      const offset = 100; // Account for fixed header
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenQuoteWithPart = (part?: PartItem) => {
    setSelectedPart(part || null);
    setIsQuoteModalOpen(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'PRODUCTS':
        return <ProductsPage onOpenQuoteModal={handleOpenQuoteWithPart} />;
      case 'COMPANY':
        return (
          <CompanyPage 
            onPlayVideo={() => setIsVideoOpen(true)} 
            onOpenRFQ={() => handleOpenQuoteWithPart()} 
          />
        );
      case 'MARKETS':
        return <MarketsPage />;
      case 'BRANDS':
        return <BrandsPage />;
      case 'MACHINERY':
        return <MachineryPage />;
      case 'INDUSTRY':
        return <IndustryPage />;
      case 'CONTACT':
        return <ContactPage />;
      case 'HOME':
      default:
        return (
          <>
            {/* 3. Hero Slider */}
            <HeroSlider
              onInitiateRFQ={() => handleOpenQuoteWithPart()}
              onOpenPartsSearch={() => setIsPartsSearchOpen(true)}
            />

            {/* 4. Our Advantages Section */}
            <OurAdvantages />

            {/* 5. Custom Manufacturing Services Section */}
            <CustomManufacturing
              onSelectMachinery={() => setIsPartsSearchOpen(true)}
            />

            {/* 6. Product Gallery Section */}
            <ProductGallery
              onSelectPart={(part) => handleOpenQuoteWithPart(part)}
              onOpenQuoteModal={(part) => handleOpenQuoteWithPart(part)}
            />

            {/* 7. About Us Section */}
            <AboutUs
              onPlayVideo={() => setIsVideoOpen(true)}
              onOpenRFQ={() => handleOpenQuoteWithPart()}
            />

            {/* 8. Brands We Work With Section */}
            <BrandsWeWorkWith
              onBrandClick={() => setIsPartsSearchOpen(true)}
            />

            {/* 9. Leave Us Message Section */}
            <LeaveUsMessage />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#02060D] font-sans text-white selection:bg-[#FFB800] selection:text-black antialiased relative">
      {/* 0. App Premium Splash Screen */}
      <SplashScreen />

      {/* Top Preloader Progress Indicator */}
      {isPreloading && (
        <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-white/10 overflow-hidden pointer-events-none">
          <div
            className="h-full bg-[#FFB800] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* 1. Navigation Bar - Fixed */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPartsSearch={() => setIsPartsSearchOpen(true)}
        onOpenQuoteModal={() => handleOpenQuoteWithPart()}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Page Layout */}
      <main className="pt-0">
        {renderContent()}
      </main>

      {/* 10. Footer */}
      <Footer onNavClick={setActiveTab} />

      {/* Direct Modals */}
      <PartsSearchModal
        isOpen={isPartsSearchOpen}
        onClose={() => setIsPartsSearchOpen(false)}
        onOpenQuoteModal={(part) => handleOpenQuoteWithPart(part)}
      />

      <GetQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => {
          setIsQuoteModalOpen(false);
          setSelectedPart(null);
        }}
        selectedPart={selectedPart}
      />

      <WhatsAppChatModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </div>
  );
}
