import React from 'react';
import { Landmark, MapPin, Phone, Mail, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Instansi Brand & Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F4C3A] text-amber-300 flex items-center justify-center">
                <Landmark className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                UKPBJ Nagekeo
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Bagian Pengadaan Barang dan Jasa Sekretariat Daerah Kabupaten Nagekeo. 
              Melayani pengadaan pemerintah yang transparan, akuntabel, dan mengutamakan produk lokal Flores.
            </p>
            <div className="text-[11px] text-amber-300/80 font-medium">
              "The Heart of Flores · Nagekeo Unggul"
            </div>
          </div>

          {/* Col 2: Alamat & Kontak Resmi */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Sekretariat & Desk Layanan
            </h4>
            <div className="space-y-2 text-stone-400 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-stone-300 shrink-0 mt-0.5" />
                <span>
                  Gedung Sekretariat Daerah Lt. 2, Jl. Mayor M. Saleh No. 1, Mbay, Kec. Aesesa, Kab. Nagekeo, NTT 86472
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-300 shrink-0" />
                <span>Helpdesk: (0386) 21102 / 0812-3849-1102</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-300 shrink-0" />
                <span>ukpbj@nagekeokab.go.id</span>
              </div>
            </div>
          </div>

          {/* Col 3: Layanan Navigasi */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Layanan Utama
            </h4>
            <ul className="space-y-1.5 text-stone-400 text-xs">
              <li>
                <button 
                  onClick={() => onNavigateTab('konsultasi')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Klinik Konsultasi PBJ (Daring & Tatap Muka)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('paket')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Daftar Paket Tender & Seleksi LPSE
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('katalog')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Etalase E-Katalog Lokal Komoditas Mbay
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('simulator')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Simulator Penentuan Metode LKPP & Pajak
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('regulasi')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Format Baku KAK & Standar Dokumen (SDP)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Tautan Eksternal Lembaga Pusat */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Tautan Terkait
            </h4>
            <ul className="space-y-1.5 text-stone-400 text-xs">
              <li>
                <a 
                  href="https://inaproc.lkpp.go.id" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Portal Nasional INAPROC LKPP</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://sirup.lkpp.go.id" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>SiRUP LKPP (Rencana Umum Pengadaan)</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://e-katalog.lkpp.go.id" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Katalog Elektronik LKPP V6</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://nagekeokab.go.id" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Portal Resmi Pemkab Nagekeo</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Quiet copyright */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} Unit Kerja Pengadaan Barang/Jasa (UKPBJ) Pemerintah Kabupaten Nagekeo.
          </div>
          <div className="flex items-center gap-3">
            <span>Sistem Layanan Bebas Pungutan & Terbuka</span>
            <span aria-hidden="true">·</span>
            <span>Flores, Nusa Tenggara Timur</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
