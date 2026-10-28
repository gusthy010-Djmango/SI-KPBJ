import React, { useState } from 'react';
import { RegulationItem } from '../types/pbj';
import { REGULATIONS } from '../data/nagekeoData';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Search, 
  BookOpen, 
  Copy, 
  Check, 
  Eye, 
  X,
  FileCheck2,
  FolderOpen
} from 'lucide-react';

export const RegulationLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePreviewDoc, setActivePreviewDoc] = useState<RegulationItem | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const filteredRegulations = REGULATIONS.filter((reg) => {
    const matchesSearch = 
      reg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || reg.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getTemplateContent = (reg: RegulationItem) => {
    if (reg.id === 'DOC-TMP-01') {
      return `KERANGKA ACUAN KERJA (KAK) PENGADAAN JASA / KONSTRUKSI
PEMERINTAH KABUPATEN NAGEKEO - TAHUN ANGGARAN 2026

1. LATAR BELAKANG
Pemerintah Kabupaten Nagekeo melalui [Nama SKPD] melaksanakan kegiatan [Nama Paket Kegiatan] guna meningkatkan konektivitas dan pelayanan publik masyarakat di wilayah [Nama Kecamatan/Desa, Nagekeo].

2. MAKSUD DAN TUJUAN
a. Maksud: Sebagai petunjuk pelaksanaan teknis dan pengawasan mutu pekerjaan.
b. Tujuan: Menghasilkan output fisik konstruksi/jasa yang andal, aman, dan tepat waktu sesuai standar teknis Kementerian PUPR/LKPP.

3. TARGET SASARAN KELUARAN (OUTPUT)
Terlaksananya pekerjaan [Nama Pekerjaan] dengan volume [Volume/Ukuran Satuan] sesuai spesifikasi gambar rencana dan analisa teknis.

4. SUMBER PENDANAAN & NILAI PAGU
Kegiatan ini dibiayai dari APBD Kabupaten Nagekeo Tahun Anggaran 2026 pada Dokumen Pelaksanaan Anggaran (DPA) Nomor [Nomor DPA] dengan Nilai Pagu sebesar Rp [Nomor Pagu] (termasuk PPN).

5. JANGKA WAKTU PELAKSANAAN
Jangka waktu pelaksanaan adalah [Jumlah Hari] Hari Kalender terhitung sejak tanggal terbit Surat Perintah Mulai Kerja (SPMK).

6. PERSYARATAN TENAGA AHLI & K3
- 1 Orang Ahli Teknik Pelaksana (SKA Muda)
- 1 Orang Petugas Keselamatan Konstruksi (K3)
- Surat pernyataan komitmen penggunaan material lokal Nagekeo (Agregat Kali Aesesa / Tenun Ikat Nagekeo).

Ditetapkan di Mbay, [Tanggal]
Pejabat Pembuat Komitmen (PPK),
[Nama & Gelar PPK]
NIP. [NIP PPK]`;
    }

    if (reg.id === 'DOC-TMP-02') {
      return `ANALISIS HARGA PERKIRAAN SENDIRI (HPS)
SATUAN KERJA: PEMERINTAH KABUPATEN NAGEKEO

1. Komponen Biaya Pokok (Survey Pasar Minimal 3 Sumber):
- Sumber 1: Distributor / Toko Resmi Wilayah Flores (Mbay / Ende / Bajawa)
- Sumber 2: E-Katalog LKPP / Standar Satuan Harga Bupati Nagekeo (SSH)
- Sumber 3: Kontrak Sejenis 1 Tahun Terakhir

2. Rumus Formula Perhitungan HPS:
   Total Biaya Langsung (Personil + Non Personil / Bahan + Upah + Alat)
   + Keuntungan & Biaya Umum (Overhead & Profit maksimal 15%)
   = Nilai Dasar Pengenaan Pajak (DPP)
   + PPN 12% (Ketetapan UU Perpajakan)
   = Total HPS Final Disahkan PPK

Catatan Integritas: HPS tidak bersifat rahasia, namun rincian HPS per item sebelum pembukaan penawaran wajib dijaga kerahasiaannya sesuai Perpres 12/2021.`;
    }

    return `STANDAR DOKUMEN PEMILIHAN / PAKTA INTEGRITAS
KABUPATEN NAGEKEO

Saya yang bertanda tangan di bawah ini, dalam rangka pengadaan barang/jasa pada Pemerintah Kabupaten Nagekeo, dengan ini menyatakan bahwa:
1. Tidak akan melakukan praktek Korupsi, Kolusi, dan Nepotisme (KKN);
2. Akan mengikuti proses pengadaan secara bersih, transparan, profesional, dan akuntabel;
3. Tidak memberikan atau menjanjikan sesuatu kepada pihak manapun;
4. Mengutamakan pemanfaatan tenaga kerja dan produk lokal Nagekeo (P3DN).

Apabila saya melanggar hal-hal tersebut di atas, saya bersedia menerima sanksi pencabutan izin usaha, dimasukkan dalam Daftar Hitam (Blacklist LKPP), dan/atau digugat secara hukum.`;
  };

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0F4C3A] mb-2">
            <span>Pustaka Hukum & Standar Dokumen</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>JDIH & UKPBJ Setda Kabupaten Nagekeo</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Regulasi PBJ & Template Dokumen Standar
              </h2>
              <p className="text-stone-600 text-sm mt-1 max-w-2xl">
                Kumpulan peraturan perundang-undangan pengadaan barang/jasa pemerintah, 
                keputusan bupati, serta template resmi KAK, HPS, dan berita acara siap pakai bagi PPK dan Pokja.
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200 shrink-0">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Semua ({REGULATIONS.length})
              </button>
              <button
                onClick={() => setSelectedCategory('Regulasi')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'Regulasi'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Regulasi & SE
              </button>
              <button
                onClick={() => setSelectedCategory('Standar Dokumen Pemilihan')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'Standar Dokumen Pemilihan'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Template Dokumen (KAK/HPS)
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl mb-6">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nomor peraturan, judul regulasi perpres, template KAK..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
            />
          </div>
        </div>

        {/* Regulation & Document Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRegulations.map((reg) => (
            <div 
              key={reg.id}
              className="bg-stone-50 border border-stone-200 rounded-xl p-5 flex flex-col justify-between hover:border-stone-400 transition-colors"
            >
              <div>
                {/* Unboxed metadata header */}
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#0F4C3A]">{reg.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>Tahun {reg.year}</span>
                  </div>
                  <span className="font-medium text-stone-700">{reg.scope}</span>
                </div>

                <h3 className="text-base font-bold font-serif text-stone-900 mb-2 leading-snug">
                  {reg.title}
                </h3>

                <p className="text-xs text-stone-600 mb-4 line-clamp-3">
                  {reg.description}
                </p>
              </div>

              <div>
                <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-mono">Ukuran Berkas: {reg.fileSize}</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActivePreviewDoc(reg)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 hover:border-stone-300 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#0F4C3A]" />
                      <span>{reg.category === 'Standar Dokumen Pemilihan' ? 'Lihat Format & Salin' : 'Ringkasan & Telaah'}</span>
                    </button>

                    <a
                      href={reg.scope.includes('Pusat') ? 'https://jdih.lkpp.go.id' : 'https://nagekeokab.go.id'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#0F4C3A] hover:bg-[#0B3A2C] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-300" />
                      <span>Unduh PDF</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Pratinjau Dokumen & Salin Format Template */}
        {activePreviewDoc && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
              <div className="flex items-start justify-between pb-4 border-b border-stone-200 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                    <span className="font-mono font-bold text-[#0F4C3A]">{activePreviewDoc.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>Tahun {activePreviewDoc.year}</span>
                  </div>
                  <h3 className="text-lg font-bold font-serif text-stone-900">
                    {activePreviewDoc.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActivePreviewDoc(null)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                    Uraian Pokok Regulasi / Template
                  </span>
                  <p className="text-stone-700 bg-stone-50 p-4 rounded-lg border border-stone-200 leading-relaxed">
                    {activePreviewDoc.description}
                  </p>
                </div>

                {/* Document Body Content */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Format Struktur Dokumen (Standar UKPBJ)
                    </span>
                    <button
                      onClick={() => handleCopyContent(getTemplateContent(activePreviewDoc))}
                      className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Format Tersalin!' : 'Salin Seluruh Teks'}</span>
                    </button>
                  </div>

                  <pre className="p-4 bg-stone-900 text-stone-100 text-xs rounded-lg overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed max-h-[350px]">
                    {getTemplateContent(activePreviewDoc)}
                  </pre>
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-xs text-stone-500">
                    Format: Dokumen Resmi JDIH & Pedoman LKPP RI
                  </span>

                  <button
                    onClick={() => setActivePreviewDoc(null)}
                    className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
                  >
                    Tutup
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
