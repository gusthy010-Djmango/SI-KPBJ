import React, { useState } from 'react';
import { LocalCatalogItem } from '../types/pbj';
import { LOCAL_CATALOG_ITEMS } from '../data/nagekeoData';
import { 
  ShoppingBag, 
  Sparkles, 
  CheckCircle, 
  MapPin, 
  Plus, 
  Minus, 
  Calculator, 
  FileText, 
  ArrowRight,
  Store,
  FileCheck2,
  Copy,
  Check
} from 'lucide-react';

interface CartItem {
  item: LocalCatalogItem;
  quantity: number;
}

export const EKatalogLokal: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOrderDraftOpen, setIsOrderDraftOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const filteredItems = LOCAL_CATALOG_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleAddToCart = (item: LocalCatalogItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) => 
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQty = (itemId: string, delta: number) => {
    setCart((prev) => 
      prev
        .map((c) => {
          if (c.item.id === itemId) {
            const nextQty = c.quantity + delta;
            return nextQty > 0 ? { ...c, quantity: nextQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const cartSubtotal = cart.reduce((acc, curr) => acc + curr.item.unitPrice * curr.quantity, 0);
  const cartPpn = Math.round(cartSubtotal * 0.12);
  const cartTotal = cartSubtotal + cartPpn;

  const handleCopyDraft = () => {
    const lines = [
      `DRAFT SIMULASI SURAT PESANAN E-PURCHASING (E-KATALOG LOKAL NAGEKEO)`,
      `Tanggal: ${new Date().toLocaleDateString('id-ID')}`,
      `----------------------------------------------------`,
      ...cart.map(c => `- ${c.item.name} (${c.quantity} ${c.item.unit}) @ ${formatRupiah(c.item.unitPrice)} = ${formatRupiah(c.item.unitPrice * c.quantity)} [Penyedia: ${c.item.vendorName}]`),
      `----------------------------------------------------`,
      `Subtotal: ${formatRupiah(cartSubtotal)}`,
      `PPN (12%): ${formatRupiah(cartPpn)}`,
      `Total Estimasi SP: ${formatRupiah(cartTotal)}`,
      `Catatan: Pengadaan mengacu pada Instruksi Presiden P3DN dan Perbup Nagekeo tentang Pemberdayaan Produk Unggulan Daerah.`
    ].join('\n');

    navigator.clipboard.writeText(lines);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0F4C3A] mb-2">
            <span>Pemberdayaan Produk Dalam Negeri (P3DN)</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Etalase E-Katalog Lokal Pemkab Nagekeo</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Afirmasi UMKM & Koperasi</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Katalog Elektronik Komoditas Unggulan Flores
              </h2>
              <p className="text-stone-600 text-sm mt-1 max-w-2xl">
                Dukung ketahanan ekonomi daerah Nagekeo dengan memprioritaskan belanja beras irigasi Mbay, 
                tenun ikat pewarna alam motif Dinto, bahan material kali Aesesa, dan jamuan pangan lokal.
              </p>
            </div>

            {/* Shopping Cart Trigger Bar */}
            {cart.length > 0 && (
              <button
                onClick={() => setIsOrderDraftOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0F4C3A] hover:bg-[#0B3A2C] rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap"
              >
                <Calculator className="w-4 h-4 text-amber-300" />
                <span>Simulasi Pesanan ({cart.length} Produk · {formatRupiah(cartTotal)})</span>
              </button>
            )}
          </div>
        </div>

        {/* Hero Showcase Card with generated local products photo */}
        <div className="mb-10 rounded-xl overflow-hidden border border-stone-200 bg-stone-50 grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0F4C3A] uppercase tracking-wider mb-2">
                <span>Inisiatif Gerakan Belanja Produk Nagekeo</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3">
                Mandat Alokasi 40% Belanja APBD untuk Pelaku Usaha Lokal
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                Sesuai Perpres 12/2021 dan Surat Edaran Bupati Nagekeo, seluruh Pejabat Pembuat Komitmen (PPK) 
                dan Pejabat Pengadaan diwajibkan membeli produk kebutuhan dinas melalui E-Katalog Lokal. 
                Proses E-Purchasing cepat, terhindar dari tender berbelit, dan langsung memberdayakan kelompok tani serta pengrajin tenun ibu-ibu Nagekeo.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-200 text-xs">
              <div>
                <span className="text-stone-500 block text-[11px]">Beras Mbay</span>
                <span className="font-semibold text-stone-900">100% Pangan Lokal</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Tenun Nagekeo</span>
                <span className="font-semibold text-stone-900">Motif Resmi Dinto</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Agregat Aesesa</span>
                <span className="font-semibold text-stone-900">Uji Lab Teknis PUPR</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[250px] bg-stone-200">
            <img 
              src="/src/assets/images/ekatalog_lokal_nagekeo_1793181564031.jpg" 
              alt="Etalase E-Katalog Lokal Nagekeo Beras Mbay dan Tenun Adat"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-stone-200 no-scrollbar">
          {[
            { id: 'all', label: 'Semua Komoditas' },
            { id: 'Pertanian & Pangan', label: 'Beras & Pangan Mbay' },
            { id: 'Kerajinan Tenun Flores', label: 'Tenun Adat Nagekeo' },
            { id: 'Material Konstruksi', label: 'Material & Agregat Kali' },
            { id: 'Jasa Boga & Jamuan', label: 'Jamuan & Snack Dinas' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#0F4C3A] text-white font-semibold shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Catalog Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="bg-stone-50 border border-stone-200 rounded-xl p-5 flex flex-col justify-between hover:border-stone-400 transition-colors"
            >
              <div>
                {/* Unboxed Metadata Header */}
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span className="font-mono text-[#0F4C3A] font-bold">{item.id}</span>
                  <span className="font-medium text-stone-700">{item.category}</span>
                </div>

                <h4 className="text-base font-bold font-serif text-stone-900 mb-2 leading-snug">
                  {item.name}
                </h4>

                <p className="text-xs text-stone-600 mb-4 line-clamp-3">
                  {item.description}
                </p>

                {/* Vendor and location details */}
                <div className="space-y-1 text-xs text-stone-600 mb-4 pt-3 border-t border-stone-200">
                  <div className="flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="font-medium text-stone-800">{item.vendorName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{item.vendorLocation}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs mb-3">
                  <div>
                    <span className="text-stone-500 block text-[11px]">Harga Satuan Katalog</span>
                    <span className="text-base font-bold font-mono text-[#0F4C3A] tabular-nums">
                      {formatRupiah(item.unitPrice)}
                    </span>
                    <span className="text-stone-500 text-[11px]"> / {item.unit}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-stone-500 block text-[11px]">Kadar TKDN</span>
                    <span className="font-mono font-bold text-stone-800 tabular-nums">{item.tkdnPct}%</span>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-800 bg-white border border-stone-300 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer active:scale-98"
                >
                  <Plus className="w-3.5 h-3.5 text-[#0F4C3A]" />
                  <span>Tambahkan Ke Simulasi Pesanan</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Simulasi Pesanan / Surat Pesanan SP */}
        {isOrderDraftOpen && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#0F4C3A]">
                    Simulasi E-Purchasing OPD Nagekeo
                  </span>
                  <h3 className="text-lg font-bold font-serif text-stone-900">
                    Kalkulasi Rencana Pembelian E-Katalog Lokal
                  </h3>
                </div>
                <button
                  onClick={() => setIsOrderDraftOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8 text-stone-500 text-xs">
                  Keranjang simulasi kosong. Silakan pilih produk dari etalase.
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="divide-y divide-stone-200">
                    {cart.map((c) => (
                      <div key={c.item.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                        <div className="flex-1">
                          <h5 className="font-semibold text-stone-900">{c.item.name}</h5>
                          <p className="text-stone-500">{c.item.vendorName} · {formatRupiah(c.item.unitPrice)} / {c.item.unit}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQty(c.item.id, -1)}
                            className="w-6 h-6 rounded bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-stone-200 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono font-bold w-8 text-center tabular-nums">{c.quantity}</span>
                          <button
                            onClick={() => handleUpdateQty(c.item.id, 1)}
                            className="w-6 h-6 rounded bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-stone-200 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="font-mono font-bold text-stone-900 tabular-nums text-right w-28">
                          {formatRupiah(c.item.unitPrice * c.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Totals */}
                  <div className="pt-4 border-t border-stone-200 bg-stone-50 p-4 rounded-lg text-xs space-y-2">
                    <div className="flex justify-between text-stone-600">
                      <span>Subtotal Belanja:</span>
                      <span className="font-mono font-semibold tabular-nums text-stone-900">{formatRupiah(cartSubtotal)}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>PPN 12%:</span>
                      <span className="font-mono font-semibold tabular-nums text-stone-900">{formatRupiah(cartPpn)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                      <span>Total Nilai Surat Pesanan (SP):</span>
                      <span className="font-mono text-[#0F4C3A] tabular-nums">{formatRupiah(cartTotal)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setCart([])}
                      className="text-xs text-rose-600 hover:underline cursor-pointer"
                    >
                      Kosongkan Daftar
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyDraft}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Tersalin Ke Clipboard' : 'Salin Resume SP'}</span>
                      </button>

                      <a
                        href="https://e-katalog.lkpp.go.id"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0F4C3A] hover:bg-[#0B3A2C] rounded-lg transition-colors"
                      >
                        <span>Buka E-Katalog LKPP V6</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Onboarding Guide for Local Flores MSMEs */}
        <div className="p-6 sm:p-8 bg-stone-50 border border-stone-200 rounded-xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0F4C3A] uppercase tracking-wider mb-2">
              <span>Panduan Pelaku Usaha Lokal</span>
            </div>
            <h4 className="text-xl font-bold font-serif text-stone-900 mb-2">
              Cara Mendaftarkan Usaha Anda ke E-Katalog Lokal Nagekeo
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 mb-6">
              Pemerintah Kabupaten Nagekeo membuka pintu seluas-luasnya bagi pengrajin tenun, koperasi tani, 
              penyedia ATK, percetakan, katering, dan bengkel konstruksi lokal untuk menjadi rekanan resmi pemerintah daerah.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-white border border-stone-200 rounded-lg">
                <span className="font-mono font-bold text-[#0F4C3A] text-sm block mb-1">01. Legalitas Usaha</span>
                <p className="text-stone-700">
                  Miliki Nomor Induk Berusaha (NIB) berbasis risiko melalui portal OSS RBA dan NPWP usaha yang aktif.
                </p>
              </div>

              <div className="p-4 bg-white border border-stone-200 rounded-lg">
                <span className="font-mono font-bold text-[#0F4C3A] text-sm block mb-1">02. Akun LPSE / SPSE</span>
                <p className="text-stone-700">
                  Daftarkan akun penyedia ke LPSE Kabupaten Nagekeo di Kantor Bupati Mbay (verifikasi berkas 1 hari kerja).
                </p>
              </div>

              <div className="p-4 bg-white border border-stone-200 rounded-lg">
                <span className="font-mono font-bold text-[#0F4C3A] text-sm block mb-1">03. Tayang Produk LKPP</span>
                <p className="text-stone-700">
                  Login ke e-katalog.lkpp.go.id, pilih etalase lokal Pemkab Nagekeo, unggah foto produk & spesifikasi harga.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
