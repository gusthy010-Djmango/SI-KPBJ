/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ConsultationDesk } from './components/ConsultationDesk';
import { PackageList } from './components/PackageList';
import { EKatalogLokal } from './components/EKatalogLokal';
import { MethodSimulator } from './components/MethodSimulator';
import { RegulationLibrary } from './components/RegulationLibrary';
import { Footer } from './components/Footer';
import { INITIAL_TICKETS, NAGEKEO_PACKAGES, LOCAL_CATALOG_ITEMS } from './data/nagekeoData';
import { ConsultationTicket } from './types/pbj';
import { 
  MessageSquareText, 
  ArrowRight, 
  FileCheck2, 
  ShoppingBag, 
  Building2, 
  Layers, 
  Sparkles,
  Search,
  CheckCircle2,
  Calendar
} from 'lucide-react';

const STORAGE_KEY = 'si_kpbj_nagekeo_tickets_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [tickets, setTickets] = useState<ConsultationTicket[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved tickets', e);
    }
    return INITIAL_TICKETS;
  });

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [consultationDeskInitialTab, setConsultationDeskInitialTab] = useState<'form' | 'track' | 'list' | 'faq'>('list');

  // Persist tickets to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    } catch (e) {
      console.warn('Failed to save tickets', e);
    }
  }, [tickets]);

  const handleAddTicket = (newTicket: ConsultationTicket) => {
    setTickets(prev => [newTicket, ...prev]);
    setSelectedTicketId(newTicket.id);
  };

  const handleOpenConsultationModal = () => {
    setConsultationDeskInitialTab('form');
    setSelectedTicketId(null);
    setActiveTab('konsultasi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTrackTicketClick = () => {
    setConsultationDeskInitialTab('track');
    setSelectedTicketId(tickets[0]?.id || null);
    setActiveTab('konsultasi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPackageForConsultation = (packageTitle: string, opd: string) => {
    setConsultationDeskInitialTab('form');
    setSelectedTicketId(null);
    setActiveTab('konsultasi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-stone-900 flex flex-col font-sans">
      {/* Strict 1-Row 3-Zone Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenConsultationModal={handleOpenConsultationModal}
      />

      <main className="flex-1">
        {/* TAB 1: BERANDA / HOME PORTAL */}
        {activeTab === 'beranda' && (
          <div>
            <HeroSection
              onOpenConsultationModal={handleOpenConsultationModal}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onTrackTicketClick={handleTrackTicketClick}
            />

            {/* Featured Section 1: Klinik Konsultasi Spot & Quick Form Callout */}
            <section className="py-12 bg-white border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-stone-200 shadow-xs h-72">
                    <img 
                      src="/src/assets/images/pbj_consultation_desk_1793181563689.jpg" 
                      alt="Desk Konsultasi Pengadaan Barang dan Jasa UKPBJ"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-5">
                      <p className="text-white text-xs font-medium">
                        Pendampingan Teknis Pokja Pemilihan bersama PPK SKPD Nagekeo
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0F4C3A] mb-2">
                      <span>Layanan Tatap Muka & Virtual</span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span>Mitigasi Temuan Pemeriksaan</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-3">
                      Klinik Konsultasi PBJ (Si-KOLABORASI)
                    </h2>

                    <p className="text-stone-600 text-sm leading-relaxed mb-6">
                      Ragu dalam menyusun Kerangka Acuan Kerja (KAK), penetapan HPS agregat jalan, 
                      perhitungan PPN 12%, atau transaksi mini-kompetisi e-Katalog V6? 
                      Konsultasikan segera dengan Fasilitator & Pokja UKPBJ Kabupaten Nagekeo sebelum dokumen ditandatangani.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs text-stone-700">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Reviu KAK & HPS sebelum lelang</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Pendampingan E-Purchasing LKPP V6</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Konsultasi perubahan/addendum kontrak</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Lembar Berita Acara Rekomendasi Resmi</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleOpenConsultationModal}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#0F4C3A] rounded-lg hover:bg-[#0B3A2C] transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                      >
                        <MessageSquareText className="w-4 h-4 text-amber-300" />
                        <span>Ajukan Permohonan Konsultasi</span>
                      </button>

                      <button
                        onClick={() => {
                          setConsultationDeskInitialTab('list');
                          setActiveTab('konsultasi');
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <span>Lihat Riwayat Tiket ({tickets.length})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Section 2: Paket Tender Pilihan Aktif */}
            <section className="py-12 bg-[#F8FAFC] border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0F4C3A] mb-1">
                      <span>Paket Pengadaan Terkini</span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span>LPSE Kabupaten Nagekeo</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-stone-900">
                      Paket Tender & E-Purchasing Prioritas Daerah
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('paket');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F4C3A] hover:underline cursor-pointer"
                  >
                    <span>Buka Seluruh Paket Pengadaan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {NAGEKEO_PACKAGES.slice(0, 3).map((pkg) => (
                    <div 
                      key={pkg.id}
                      className="bg-white border border-stone-200 rounded-xl p-5 flex flex-col justify-between hover:border-stone-400 transition-colors shadow-xs"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                          <span className="font-mono font-bold text-[#0F4C3A]">{pkg.id}</span>
                          <span className="font-medium text-amber-800">{pkg.status}</span>
                        </div>
                        <h4 className="text-base font-bold font-serif text-stone-900 mb-2 line-clamp-2">
                          {pkg.title}
                        </h4>
                        <p className="text-xs text-stone-600 mb-4 line-clamp-2">
                          {pkg.description}
                        </p>
                        <div className="text-xs text-stone-500 space-y-1 mb-4">
                          <div>OPD: <strong className="text-stone-800">{pkg.opd}</strong></div>
                          <div>Metode: <strong className="text-stone-800">{pkg.method}</strong></div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-stone-500 block text-[11px]">Nilai HPS</span>
                          <span className="font-mono font-bold text-stone-900 tabular-nums">
                            {formatRupiah(pkg.hpsBudget)}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            handleSelectPackageForConsultation(pkg.title, pkg.opd);
                          }}
                          className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
                        >
                          Konsultasikan
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Section 3: E-Katalog Komoditas Mbay & P3DN */}
            <section className="py-12 bg-white border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0F4C3A] mb-1">
                      <span>Gerakan Bangga Buatan Nagekeo</span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span>Etalase Komoditas Flores</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-stone-900">
                      Beras Irigasi Mbay & Tenun Pewarna Alam Dinto
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('katalog');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F4C3A] hover:underline cursor-pointer"
                  >
                    <span>Buka Etalase E-Katalog Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {LOCAL_CATALOG_ITEMS.slice(0, 3).map((item) => (
                    <div key={item.id} className="p-5 bg-stone-50 border border-stone-200 rounded-xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                          <span className="font-mono text-[#0F4C3A] font-bold">{item.id}</span>
                          <span className="font-medium text-stone-700">{item.category}</span>
                        </div>
                        <h4 className="text-base font-bold font-serif text-stone-900 mb-2 line-clamp-2">
                          {item.name}
                        </h4>
                        <p className="text-xs text-stone-600 mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        <p className="text-xs text-stone-500">Penyedia: <strong className="text-stone-800">{item.vendorName} ({item.vendorLocation})</strong></p>
                      </div>

                      <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs mt-4">
                        <div>
                          <span className="font-mono font-bold text-sm text-[#0F4C3A] tabular-nums">
                            {formatRupiah(item.unitPrice)}
                          </span>
                          <span className="text-stone-500"> / {item.unit}</span>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab('katalog');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-md hover:bg-stone-100 transition-colors cursor-pointer"
                        >
                          Simulasi Beli
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: KLINIK KONSULTASI PBJ */}
        {activeTab === 'konsultasi' && (
          <ConsultationDesk
            tickets={tickets}
            onAddTicket={handleAddTicket}
            selectedTicketId={selectedTicketId}
            onClearSelectedTicketId={() => setSelectedTicketId(null)}
            initialTab={consultationDeskInitialTab}
          />
        )}

        {/* TAB 3: INFORMASI PAKET PENGADAAN LPSE */}
        {activeTab === 'paket' && (
          <PackageList
            onSelectPackageForConsultation={handleSelectPackageForConsultation}
          />
        )}

        {/* TAB 4: KATALOG LOKAL NAGEKEO */}
        {activeTab === 'katalog' && (
          <EKatalogLokal />
        )}

        {/* TAB 5: SIMULATOR METODE & KALKULATOR HPS/PAJAK */}
        {activeTab === 'simulator' && (
          <MethodSimulator />
        )}

        {/* TAB 6: PUSTAKA REGULASI & TEMPLATE KAK */}
        {activeTab === 'regulasi' && (
          <RegulationLibrary />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer 
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
