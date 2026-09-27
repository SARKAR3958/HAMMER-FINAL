import React, { useState } from 'react';
import { Youtube, ArrowRight } from 'lucide-react';
import { SAMPLE_PARTS, PartItem } from '../data/partsData';
import { PreloadedImage } from './PreloadedImage';

interface ProductGalleryProps {
  onSelectPart: (part: PartItem) => void;
  onOpenQuoteModal: (part?: PartItem) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  onOpenQuoteModal
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Undercarriage Parts', 'Hydraulic Pumps & Motors', 'Engine Components', 'Transmission & Final Drive'];

  const filteredParts = activeCategory === 'ALL'
    ? SAMPLE_PARTS
    : SAMPLE_PARTS.filter(p => p.category === activeCategory);

  return (
    <section id="product-gallery" className="pb-24 px-6 lg:px-16 xl:px-20 bg-[#02060D] text-white">
      <div className="max-w-[1440px] mx-auto space-y-16">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-[#FFB800]">
              <span className="w-6 h-px bg-[#FFB800]"></span>
              Premium Inventory
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-tight">
              Verified Industrial <br />
              <span className="text-slate-500">Components.</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.open('https://youtube.com', '_blank')}
              className="text-[11px] font-black uppercase tracking-widest text-[#FFB800] flex items-center gap-2 hover:text-white transition-colors btn-glass-hover px-4 py-2 rounded-full"
            >
              <Youtube className="w-4 h-4" />
              Watch Technical Demos
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-white/5 rounded-2xl w-fit animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-[#FFB800] text-[#02060D] shadow-lg shadow-[#FFB800]/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {filteredParts.map((part, idx) => (
            <div
              key={part.id}
              className="group relative bg-white/5 border border-white/5 rounded-3xl overflow-hidden hover:border-[#FFB800]/50 hover:-translate-y-1.5 active:scale-98 transition-all duration-500 flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div 
                onClick={() => onOpenQuoteModal(part)}
                className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer"
              >
                <PreloadedImage
                  src={part.imageUrl}
                  alt={part.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02060D]/80 via-transparent to-transparent opacity-60"></div>
                
                {/* Floating Tag Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  <span className="px-3 py-1 rounded-full bg-[#02060D]/80 backdrop-blur-md text-[#FFB800] text-[9px] font-black uppercase tracking-widest border border-white/10 shadow-sm">
                    {part.brand}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-white text-[9px] font-black uppercase tracking-widest shadow-sm">
                    In Stock
                  </span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-2">
                  <h3 
                    onClick={() => onOpenQuoteModal(part)}
                    className="text-lg font-black uppercase tracking-tight text-white leading-tight cursor-pointer hover:text-[#FFB800] transition-colors line-clamp-2"
                  >
                    {part.name}
                  </h3>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{part.category}</div>
                </div>

                <button
                  onClick={() => onOpenQuoteModal(part)}
                  className="group/btn w-full bg-[#FFB800] text-[#02060D] font-black text-[10px] py-4 rounded-2xl uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg shadow-[#FFB800]/10 hover:bg-white hover:text-[#02060D] hover:-translate-y-0.5 hover:scale-102 active:scale-95 transition-all duration-300"
                >
                  REQUEST QUOTA <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
