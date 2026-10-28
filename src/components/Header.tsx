import React from 'react';
import { Landmark, CalendarPlus, Search, HelpCircle, FileText, ShoppingBag, Calculator } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenConsultationModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenConsultationModal 
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark in display face */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-[#0F4C3A] text-white flex items-center justify-center shadow-xs">
              <Landmark className="w-5 h-5 text-amber-300" />
            </div>
            <button 
              onClick={() => setActiveTab('beranda')}
              className="text-left cursor-pointer group"
            >
              <span className="text-lg font-bold tracking-tight text-stone-900 group-hover:text-[#0F4C3A] transition-colors whitespace-nowrap block">
                UKPBJ Kabupaten Nagekeo
              </span>
              <span className="text-[11px] font-medium text-stone-500 tracking-wider uppercase block">
                Pemerintah Daerah · Nusa Tenggara Timur
              </span>
            </button>
          </div>

          {/* Zone 2: 4-5 concise single-line nav links with subtle hover states */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            <button 
              onClick={() => setActiveTab('beranda')}
              className={`hover:text-[#0F4C3A] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'beranda' ? 'text-[#0F4C3A] border-[#0F4C3A] font-semibold' : 'border-transparent'
              }`}
            >
              Beranda
            </button>
            <button 
              onClick={() => setActiveTab('konsultasi')}
              className={`hover:text-[#0F4C3A] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'konsultasi' ? 'text-[#0F4C3A] border-[#0F4C3A] font-semibold' : 'border-transparent'
              }`}
            >
              Klinik Konsultasi
            </button>
            <button 
              onClick={() => setActiveTab('paket')}
              className={`hover:text-[#0F4C3A] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'paket' ? 'text-[#0F4C3A] border-[#0F4C3A] font-semibold' : 'border-transparent'
              }`}
            >
              Paket Pengadaan
            </button>
            <button 
              onClick={() => setActiveTab('katalog')}
              className={`hover:text-[#0F4C3A] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'katalog' ? 'text-[#0F4C3A] border-[#0F4C3A] font-semibold' : 'border-transparent'
              }`}
            >
              Katalog Lokal
            </button>
            <button 
              onClick={() => setActiveTab('simulator')}
              className={`hover:text-[#0F4C3A] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'simulator' ? 'text-[#0F4C3A] border-[#0F4C3A] font-semibold' : 'border-transparent'
              }`}
            >
              Simulator & HPS
            </button>
            <button 
              onClick={() => setActiveTab('regulasi')}
              className={`hover:text-[#0F4C3A] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'regulasi' ? 'text-[#0F4C3A] border-[#0F4C3A] font-semibold' : 'border-transparent'
              }`}
            >
              Regulasi & Template
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenConsultationModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0F4C3A] rounded-lg hover:bg-[#0B3A2C] transition-colors shadow-xs whitespace-nowrap cursor-pointer active:scale-98"
            >
              <CalendarPlus className="w-4 h-4 text-amber-300" />
              <span>Ajukan Konsultasi</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar for small screens */}
        <div className="lg:hidden flex items-center justify-between gap-1 py-2 overflow-x-auto border-t border-stone-100 text-xs no-scrollbar">
          <button 
            onClick={() => setActiveTab('beranda')}
            className={`px-3 py-1.5 whitespace-nowrap rounded-md ${activeTab === 'beranda' ? 'bg-stone-100 font-semibold text-[#0F4C3A]' : 'text-stone-600'}`}
          >
            Beranda
          </button>
          <button 
            onClick={() => setActiveTab('konsultasi')}
            className={`px-3 py-1.5 whitespace-nowrap rounded-md ${activeTab === 'konsultasi' ? 'bg-stone-100 font-semibold text-[#0F4C3A]' : 'text-stone-600'}`}
          >
            Konsultasi
          </button>
          <button 
            onClick={() => setActiveTab('paket')}
            className={`px-3 py-1.5 whitespace-nowrap rounded-md ${activeTab === 'paket' ? 'bg-stone-100 font-semibold text-[#0F4C3A]' : 'text-stone-600'}`}
          >
            Paket
          </button>
          <button 
            onClick={() => setActiveTab('katalog')}
            className={`px-3 py-1.5 whitespace-nowrap rounded-md ${activeTab === 'katalog' ? 'bg-stone-100 font-semibold text-[#0F4C3A]' : 'text-stone-600'}`}
          >
            Katalog
          </button>
          <button 
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 whitespace-nowrap rounded-md ${activeTab === 'simulator' ? 'bg-stone-100 font-semibold text-[#0F4C3A]' : 'text-stone-600'}`}
          >
            Simulator
          </button>
          <button 
            onClick={() => setActiveTab('regulasi')}
            className={`px-3 py-1.5 whitespace-nowrap rounded-md ${activeTab === 'regulasi' ? 'bg-stone-100 font-semibold text-[#0F4C3A]' : 'text-stone-600'}`}
          >
            Regulasi
          </button>
        </div>
      </div>
    </header>
  );
};
