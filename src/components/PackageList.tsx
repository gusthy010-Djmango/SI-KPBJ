import React, { useState } from 'react';
import { ProcurementPackage } from '../types/pbj';
import { NAGEKEO_PACKAGES, OPD_LIST } from '../data/nagekeoData';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Building2, 
  ExternalLink, 
  FileCheck, 
  ArrowUpRight,
  ShieldAlert,
  Percent,
  X,
  MessageSquarePlus
} from 'lucide-react';

interface PackageListProps {
  onSelectPackageForConsultation: (packageTitle: string, opd: string) => void;
}

export const PackageList: React.FC<PackageListProps> = ({ 
  onSelectPackageForConsultation 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [selectedOpd, setSelectedOpd] = useState<string>('all');
  const [detailModalPackage, setDetailModalPackage] = useState<ProcurementPackage | null>(null);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const filteredPackages = NAGEKEO_PACKAGES.filter((pkg) => {
    const matchesSearch = 
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'all' || pkg.procurementType === selectedType;
    const matchesMethod = selectedMethod === 'all' || pkg.method === selectedMethod;
    const matchesOpd = selectedOpd === 'all' || pkg.opd === selectedOpd;

    return matchesSearch && matchesType && matchesMethod && matchesOpd;
  });

  return (
    <section className="py-10 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0F4C3A] mb-2">
            <span>Transparansi Pengadaan Daerah</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>LPSE Pemerintah Kabupaten Nagekeo</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Tahun Anggaran 2026</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Informasi Paket Pengadaan Barang & Jasa
              </h2>
              <p className="text-stone-600 text-sm mt-1 max-w-2xl">
                Daftar paket RUP, tender konstruksi, seleksi konsultansi, dan e-purchasing etalase lokal 
                lingkup Organisasi Perangkat Daerah (OPD) se-Kabupaten Nagekeo.
              </p>
            </div>

            <div className="text-xs text-stone-500 font-mono">
              Menampilkan {filteredPackages.length} dari {NAGEKEO_PACKAGES.length} Paket
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white border border-stone-200 rounded-xl p-5 mb-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative md:col-span-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama ruas, gedung, alat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
              />
            </div>

            {/* Procurement Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
              >
                <option value="all">Semua Jenis Pengadaan</option>
                <option value="Pekerjaan Konstruksi">Pekerjaan Konstruksi</option>
                <option value="Barang">Barang</option>
                <option value="Jasa Konsultansi">Jasa Konsultansi</option>
                <option value="Jasa Lainnya">Jasa Lainnya</option>
              </select>
            </div>

            {/* Method Filter */}
            <div>
              <select
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
              >
                <option value="all">Semua Metode Pemilihan</option>
                <option value="Tender">Tender</option>
                <option value="E-Purchasing (E-Katalog)">E-Purchasing (E-Katalog)</option>
                <option value="Seleksi">Seleksi</option>
                <option value="Pengadaan Langsung">Pengadaan Langsung</option>
              </select>
            </div>

            {/* OPD Filter */}
            <div>
              <select
                value={selectedOpd}
                onChange={(e) => setSelectedOpd(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
              >
                <option value="all">Semua OPD / SKPD Nagekeo</option>
                {OPD_LIST.map((opd) => (
                  <option key={opd} value={opd}>{opd}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPackages.map((pkg) => (
            <div 
              key={pkg.id}
              className="bg-white border border-stone-200 rounded-xl p-6 flex flex-col justify-between hover:border-[#0F4C3A]/40 transition-colors shadow-xs"
            >
              <div>
                {/* Unboxed Metadata Header */}
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#0F4C3A]">{pkg.id}</span>
                    <span aria-hidden="true">·</span>
                    <span>{pkg.procurementType}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-stone-800">{pkg.method}</span>
                  </div>
                  <span className="font-medium text-amber-800">{pkg.status}</span>
                </div>

                <h3 className="text-lg font-bold font-serif text-stone-900 mb-2 leading-snug">
                  {pkg.title}
                </h3>

                <p className="text-xs text-stone-600 mb-4 line-clamp-2">
                  {pkg.description}
                </p>

                {/* Location and OPD unboxed rows */}
                <div className="space-y-1.5 text-xs text-stone-600 mb-5">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{pkg.opd}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{pkg.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Batas Akhir / Penutupan: <strong>{pkg.closingDate}</strong></span>
                  </div>
                </div>
              </div>

              <div>
                {/* Financial Figures Strip with Tabular Numerals */}
                <div className="pt-4 border-t border-stone-200 grid grid-cols-2 gap-4 text-xs mb-4">
                  <div>
                    <span className="text-stone-500 block text-[11px]">Nilai Pagu Anggaran</span>
                    <span className="font-mono font-bold text-sm text-stone-900 tabular-nums">
                      {formatRupiah(pkg.paguBudget)}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Harga Perkiraan Sendiri (HPS)</span>
                    <span className="font-mono font-bold text-sm text-[#0F4C3A] tabular-nums">
                      {formatRupiah(pkg.hpsBudget)}
                    </span>
                  </div>
                </div>

                {/* Footer Action Strip */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                  <div className="text-xs text-stone-500">
                    Target TKDN: <strong className="font-mono tabular-nums text-stone-800">{pkg.tkdnTargetPct}%</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDetailModalPackage(pkg)}
                      className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Detail Dokumen
                    </button>
                    <button
                      onClick={() => onSelectPackageForConsultation(pkg.title, pkg.opd)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#0F4C3A] hover:bg-[#0B3A2C] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <MessageSquarePlus className="w-3.5 h-3.5 text-amber-300" />
                      <span>Konsultasi Paket</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="p-12 text-center bg-white border border-stone-200 rounded-xl text-stone-500">
            <ShieldAlert className="w-8 h-8 mx-auto mb-2 text-stone-400" />
            <p className="font-semibold text-stone-700">Tidak Ada Paket Yang Sesuai</p>
            <p className="text-xs mt-1">Coba sesuaikan kata kunci pencarian atau ubah filter jenis pengadaan.</p>
          </div>
        )}

        {/* Modal Detail Paket */}
        {detailModalPackage && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
              <div className="flex items-start justify-between pb-4 border-b border-stone-200 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                    <span className="font-mono font-bold text-[#0F4C3A]">{detailModalPackage.id}</span>
                    <span aria-hidden="true">·</span>
                    <span>Tahun {detailModalPackage.fiscalYear}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-amber-800">{detailModalPackage.status}</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-stone-900">
                    {detailModalPackage.title}
                  </h3>
                </div>
                <button
                  onClick={() => setDetailModalPackage(null)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 text-xs sm:text-sm">
                {/* Uraian Pekerjaan */}
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                    Uraian Ruang Lingkup Pengadaan
                  </span>
                  <p className="text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-lg border border-stone-200">
                    {detailModalPackage.description}
                  </p>
                </div>

                {/* Anggaran */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs">
                  <div>
                    <span className="text-stone-500 block">Pagu Anggaran Pemda:</span>
                    <span className="font-mono font-bold text-base text-stone-900 tabular-nums">
                      {formatRupiah(detailModalPackage.paguBudget)}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Harga Perkiraan Sendiri (HPS):</span>
                    <span className="font-mono font-bold text-base text-[#0F4C3A] tabular-nums">
                      {formatRupiah(detailModalPackage.hpsBudget)}
                    </span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-stone-200 flex justify-between text-stone-600">
                    <span>Satuan Kerja / Pengguna Anggaran:</span>
                    <strong className="text-stone-900">{detailModalPackage.opd}</strong>
                  </div>
                </div>

                {/* Persyaratan Kualifikasi */}
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                    Syarat Kualifikasi Penyedia & Personel Teknis
                  </span>
                  <ul className="space-y-1.5 bg-stone-50 p-4 rounded-lg border border-stone-200 text-xs text-stone-800">
                    {detailModalPackage.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <FileCheck className="w-4 h-4 text-[#0F4C3A] shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tombol Aksi */}
                <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-end gap-3">
                  <a
                    href="https://inaproc.lkpp.go.id"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                  >
                    <span>Buka Portal SPSE LKPP</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => {
                      onSelectPackageForConsultation(detailModalPackage.title, detailModalPackage.opd);
                      setDetailModalPackage(null);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0F4C3A] hover:bg-[#0B3A2C] rounded-lg transition-colors cursor-pointer"
                  >
                    <MessageSquarePlus className="w-3.5 h-3.5 text-amber-300" />
                    <span>Konsultasikan Paket Ini</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
