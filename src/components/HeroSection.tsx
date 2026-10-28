import React from 'react';
import { 
  Building2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  MessageSquareText, 
  Layers, 
  FileCheck2, 
  TrendingUp,
  Search
} from 'lucide-react';

interface HeroSectionProps {
  onOpenConsultationModal: () => void;
  onNavigateTab: (tab: string) => void;
  onTrackTicketClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConsultationModal,
  onNavigateTab,
  onTrackTicketClick
}) => {
  return (
    <div className="relative bg-white border-b border-stone-200">
      {/* Institutional Marquee Hero Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Dignified Headline & Action Triggers */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Unboxed breadcrumb metadata */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0F4C3A] mb-3">
                <span>Pemerintah Kabupaten Nagekeo</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>Bagian Pengadaan Barang & Jasa (UKPBJ)</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-amber-700">LPSE Mbay</span>
              </div>

              {/* Balanced Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] leading-tight font-serif font-bold text-stone-900 mb-4 text-balance">
                Pusat Layanan Konsultasi & Keterbukaan Informasi Pengadaan Barang/Jasa
              </h1>

              {/* Editorial Subtitle */}
              <p className="text-base text-stone-600 leading-relaxed max-w-2xl mb-8">
                Portal resmi Unit Kerja Pengadaan Barang/Jasa (UKPBJ) Sekretariat Daerah Kabupaten Nagekeo. 
                Melayani pendampingan probity advice, reviu dokumen persiapan pengadaan bagi seluruh SKPD, 
                fasilitasi pelaku usaha UMKM masuk E-Katalog Lokal, dan transparansi paket tender daerah.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <button
                  onClick={onOpenConsultationModal}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0F4C3A] rounded-lg hover:bg-[#0B3A2C] transition-colors shadow-sm cursor-pointer whitespace-nowrap active:scale-98"
                >
                  <MessageSquareText className="w-4 h-4 text-amber-300" />
                  <span>Daftar Konsultasi PBJ</span>
                </button>

                <button
                  onClick={onTrackTicketClick}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Search className="w-4 h-4 text-stone-600" />
                  <span>Lacak Tiket Konsultasi</span>
                </button>

                <button
                  onClick={() => onNavigateTab('paket')}
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors whitespace-nowrap"
                >
                  <span>Daftar Paket Tender</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Operational Utility Ribbon - Pattern A from institutional design */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-700 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0F4C3A] shrink-0" />
                <span>
                  <strong className="font-semibold text-stone-900">Jam Layanan Desk:</strong>
                  <br />
                  Senin - Jumat 08.00 - 15.30 WITA
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0F4C3A] shrink-0" />
                <span>
                  <strong className="font-semibold text-stone-900">Lokasi Kantor:</strong>
                  <br />
                  Gedung Setda Lt. 2, Mbay
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong className="font-semibold text-stone-900">Prinsip Pelayanan:</strong>
                  <br />
                  Gratis, Akuntabel & Bebas Pungli
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100 h-full min-h-[300px] flex flex-col justify-end">
              <img 
                src="/src/assets/images/nagekeo_civic_hero_1793181563718.jpg" 
                alt="Pusat Pemerintahan Kabupaten Nagekeo di Mbay dengan latar Gunung Ebulobo"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 bg-gradient-to-t from-stone-950/90 via-stone-950/50 to-transparent p-5 text-white">
                <p className="text-xs font-semibold tracking-wider uppercase text-amber-300 mb-1">
                  Pusat Pemerintahan Mbay · Flores
                </p>
                <p className="text-sm font-medium text-stone-200">
                  Kompleks Perkantoran Pemerintah Daerah Kabupaten Nagekeo, Nusa Tenggara Timur.
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-stone-300 border-t border-white/20 pt-2">
                  <span>Motto Daerah</span>
                  <span className="font-semibold text-amber-200">"The Heart of Flores"</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Key Metrics Strip with Tabular Numerals */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Paket RUP SiRUP</span>
              <Layers className="w-4 h-4 text-[#0F4C3A]" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-stone-900">142 Paket</div>
            <p className="text-xs text-stone-500 mt-1">Total Pagu: Rp 184,5 Miliar</p>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Tender & Seleksi Aktif</span>
              <FileCheck2 className="w-4 h-4 text-[#0F4C3A]" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-stone-900">6 Paket</div>
            <p className="text-xs text-stone-500 mt-1">Tahap Pembuktian & Evaluasi</p>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Etalase E-Katalog Lokal</span>
              <TrendingUp className="w-4 h-4 text-[#0F4C3A]" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-stone-900">34 Komoditas</div>
            <p className="text-xs text-stone-500 mt-1">Beras Mbay, Tenun Dinto & Pasir</p>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Tiket Konsultasi PBJ</span>
              <MessageSquareText className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-stone-900">98,4%</div>
            <p className="text-xs text-stone-500 mt-1">Penyelesaian Rekomendasi Tepat Waktu</p>
          </div>
        </div>
      </div>
    </div>
  );
};
