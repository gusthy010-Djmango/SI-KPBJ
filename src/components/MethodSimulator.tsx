import React, { useState } from 'react';
import { 
  Calculator, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  Check, 
  FileSpreadsheet, 
  Percent, 
  Sparkles,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { ProcurementType } from '../types/pbj';

export const MethodSimulator: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'method' | 'tax'>('method');

  // Simulator State
  const [procType, setProcType] = useState<ProcurementType>('Barang');
  const [budgetAmount, setBudgetAmount] = useState<number>(150000000);
  const [isInKatalog, setIsInKatalog] = useState<boolean>(true);
  const [isComplex, setIsComplex] = useState<boolean>(false);
  const [isSoleSource, setIsSoleSource] = useState<boolean>(false);
  const [isEmergency, setIsEmergency] = useState<boolean>(false);

  // Tax Calculator State
  const [contractValue, setContractValue] = useState<number>(250000000);
  const [ppnRate, setPpnRate] = useState<number>(12); // Default 12%
  const [taxCategory, setTaxCategory] = useState<'barang' | 'konstruksi_kecil' | 'konstruksi_menengah' | 'konsultansi' | 'jasa_lain'>('konstruksi_kecil');
  const [applyRetention, setApplyRetention] = useState<boolean>(true); // 5% retention for civil works
  const [isTaxCopied, setIsTaxCopied] = useState<boolean>(false);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Determine procurement method based on Perpres 12/2021
  const getMethodRecommendation = () => {
    if (isEmergency) {
      return {
        method: 'Pengadaan Khusus Penanganan Keadaan Darurat',
        legalBasis: 'Pasal 59 Perpres 16/2018 jo Perpres 12/2021',
        description: 'Dapat dilakukan penunjukan langsung penyedia terdekat tanpa batas pagu anggaran untuk penyelamatan jiwa manusia atau kerusakan infrastruktur vital pasca bencana di Nagekeo.',
        leadTime: '1 - 3 Hari Kerja',
        authority: 'PPK dengan penetapan status tanggap darurat Bupati Nagekeo'
      };
    }

    if (isSoleSource) {
      return {
        method: 'Penunjukan Langsung',
        legalBasis: 'Pasal 38 ayat (4) & Pasal 41 ayat (4) Perpres 12/2021',
        description: 'Dilakukan jika barang/jasa bersifat khusus, tarif resmi pemerintah, pemegang hak paten tunggal, atau penyedia tunggal yang tidak memiliki substitusi.',
        leadTime: '3 - 5 Hari Kerja',
        authority: 'Pejabat Pengadaan (s.d. 200 Juta) atau Pokja Pemilihan (> 200 Juta)'
      };
    }

    if (isInKatalog) {
      return {
        method: 'E-Purchasing (E-Katalog LKPP / E-Katalog Lokal Nagekeo)',
        legalBasis: 'Pasal 38 ayat (1) Perpres 12/2021 & Inpres No. 2 Tahun 2022',
        description: 'Wajib diprioritaskan oleh seluruh SKPD Pemkab Nagekeo apabila barang/jasa sudah tercantum dalam etalase LKPP atau Katalog Lokal Nagekeo tanpa batasan nilai anggaran.',
        leadTime: '1 - 4 Hari Kerja (Sesuai kesepakatan pesanan)',
        authority: 'Pejabat Pengadaan (s.d. 200 Juta) / PPK (> 200 Juta)'
      };
    }

    // When NOT in Katalog
    if (procType === 'Jasa Konsultansi') {
      if (budgetAmount <= 100000000) {
        return {
          method: 'Pengadaan Langsung Jasa Konsultansi',
          legalBasis: 'Pasal 41 ayat (1) Perpres 12/2021',
          description: 'Pengadaan langsung kepada konsultan perorangan atau badan usaha berizin dengan nilai pagu sampai dengan Rp 100.000.000.',
          leadTime: '3 - 7 Hari Kerja',
          authority: 'Pejabat Pengadaan SKPD'
        };
      } else {
        return {
          method: isComplex ? 'Seleksi Jasa Konsultansi (Dua Tahap / Dua Sampul)' : 'Seleksi Sederhana Jasa Konsultansi',
          legalBasis: 'Pasal 41 ayat (2) Perpres 12/2021 & Perlem LKPP 12/2021',
          description: 'Seleksi umum melalui portal SPSE LPSE Nagekeo dengan evaluasi kualitas dan biaya.',
          leadTime: '21 - 30 Hari Kerja',
          authority: 'Pokja Pemilihan UKPBJ Nagekeo'
        };
      }
    }

    // Barang / Pekerjaan Konstruksi / Jasa Lainnya
    if (budgetAmount <= 200000000) {
      return {
        method: `Pengadaan Langsung ${procType}`,
        legalBasis: 'Pasal 38 ayat (2) Perpres 12/2021',
        description: `Pengadaan langsung kepada 1 (satu) Pelaku Usaha UMKM lokal Nagekeo ber-NIB untuk nilai pengadaan sampai dengan Rp 200.000.000 dengan bukti SPK atau kuitansi.`,
        leadTime: '3 - 5 Hari Kerja',
        authority: 'Pejabat Pengadaan SKPD'
      };
    } else {
      // Above 200 Million
      if (!isComplex && procType !== 'Pekerjaan Konstruksi') {
        return {
          method: 'Tender Cepat (SPSE SIKaP)',
          legalBasis: 'Pasal 38 ayat (3) Perpres 12/2021',
          description: 'Tender cepat memanfaatkan Sistem Informasi Kinerja Penyedia (SIKaP) LKPP karena spesifikasi barang/jasa standar dan pelaku usaha telah terkualifikasi otomatis.',
          leadTime: '3 - 5 Hari Kerja',
          authority: 'Pokja Pemilihan UKPBJ Nagekeo'
        };
      } else {
        return {
          method: `Tender Pascakualifikasi Satu Sampul (${procType})`,
          legalBasis: 'Pasal 38 ayat (5) Perpres 12/2021 & Standar Dokumen Pemilihan LKPP',
          description: `Tender umum terbuka melalui SPSE LPSE Kabupaten Nagekeo dengan evaluasi administrasi, teknis, kualifikasi, dan harga terendah.`,
          leadTime: '18 - 25 Hari Kerja',
          authority: 'Pokja Pemilihan UKPBJ Nagekeo'
        };
      }
    }
  };

  const rec = getMethodRecommendation();

  // Calculation for Tax and Retention
  const pphRates = {
    barang: { rate: 0.015, label: 'PPh Pasal 22 (1.5%)' },
    konstruksi_kecil: { rate: 0.0175, label: 'PPh Final Konstruksi Kualifikasi Kecil (1.75%)' },
    konstruksi_menengah: { rate: 0.0265, label: 'PPh Final Konstruksi Menengah/Besar (2.65%)' },
    konsultansi: { rate: 0.035, label: 'PPh Final Jasa Konsultansi (3.5%)' },
    jasa_lain: { rate: 0.02, label: 'PPh Pasal 23 Jasa Lainnya (2%)' }
  };

  const activePph = pphRates[taxCategory];
  // Calculate Base, PPN, PPh, Retention
  // Assume contractValue is inclusive of PPN (Standard SPK Pemda)
  const baseValue = Math.round(contractValue / (1 + (ppnRate / 100)));
  const calculatedPpn = contractValue - baseValue;
  const calculatedPph = Math.round(baseValue * activePph.rate);
  const calculatedRetention = applyRetention ? Math.round(baseValue * 0.05) : 0;
  const netDisbursement = contractValue - calculatedPpn - calculatedPph - calculatedRetention;

  const handleCopyTaxSummary = () => {
    const text = [
      `LEMBAR KALKULASI PAJAK & POTONGAN SP2D/SPM PENGADAAN`,
      `Pemerintah Kabupaten Nagekeo - NTT`,
      `-------------------------------------------------------`,
      `Nilai SPK / Bruto Kontrak : ${formatRupiah(contractValue)}`,
      `Dasar Pengenaan Pajak (DPP) : ${formatRupiah(baseValue)}`,
      `PPN (${ppnRate}%) Terutang        : ${formatRupiah(calculatedPpn)}`,
      `${activePph.label}     : ${formatRupiah(calculatedPph)}`,
      `Retensi Pemeliharaan (5%)  : ${formatRupiah(calculatedRetention)}`,
      `-------------------------------------------------------`,
      `Estimasi Bersih (Netto)    : ${formatRupiah(netDisbursement)}`,
      `Catatan: Nilai dapat disesuaikan dengan bukti setor SSP Bendahara Pengeluaran.`
    ].join('\n');

    navigator.clipboard.writeText(text);
    setIsTaxCopied(true);
    setTimeout(() => setIsTaxCopied(false), 2500);
  };

  return (
    <section className="py-10 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0F4C3A] mb-2">
            <span>Instrumen Kerja Mandiri PPK & Penyedia</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Standar Perpres 12/2021 & Regulasi Keuangan Daerah</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Simulator Metode Pemilihan & Kalkulator Keuangan PBJ
              </h2>
              <p className="text-stone-600 text-sm mt-1 max-w-2xl">
                Alat bantu otomatis untuk menentukan metode pengadaan yang sah menurut regulasi LKPP 
                serta menghitung estimasi pemotongan pajak (PPN, PPh) dan retensi fisik.
              </p>
            </div>

            {/* Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-lg border border-stone-200 shrink-0">
              <button
                onClick={() => setActiveTool('method')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeTool === 'method'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Penentu Metode Pemilihan
              </button>
              <button
                onClick={() => setActiveTool('tax')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeTool === 'tax'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Kalkulator Pajak & Retensi SPK
              </button>
            </div>
          </div>
        </div>

        {/* TOOL 1: PENENTU METODE PEMILIHAN LKPP */}
        {activeTool === 'method' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls Column */}
            <div className="lg:col-span-6 bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-5">
              <h3 className="text-base font-bold font-serif text-stone-900 pb-3 border-b border-stone-200">
                Parameter Paket Pengadaan SKPD
              </h3>

              {/* 1. Jenis Pengadaan */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  1. Jenis Pengadaan
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Barang', 'Pekerjaan Konstruksi', 'Jasa Konsultansi', 'Jasa Lainnya'] as ProcurementType[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setProcType(t)}
                      className={`px-3 py-2 text-xs rounded-lg border transition-colors cursor-pointer text-left ${
                        procType === t
                          ? 'bg-[#0F4C3A] text-white border-[#0F4C3A] font-semibold'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Nilai Pagu Anggaran */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                    2. Nilai Pagu Anggaran (DPA/RUP)
                  </label>
                  <span className="font-mono font-bold text-sm text-[#0F4C3A] tabular-nums">
                    {formatRupiah(budgetAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min={10000000}
                  max={10000000000}
                  step={10000000}
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#0F4C3A]"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1 font-mono">
                  <span>Rp 10 Jt</span>
                  <span>Rp 200 Jt (Batas PL)</span>
                  <span>Rp 2 M</span>
                  <span>Rp 10 M</span>
                </div>
              </div>

              {/* 3. Status E-Katalog */}
              <div className="pt-2 border-t border-stone-100">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  3. Ketersediaan Pada Katalog Elektronik LKPP / Lokal Nagekeo
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsInKatalog(true)}
                    className={`px-3 py-2 text-xs rounded-lg border transition-colors cursor-pointer ${
                      isInKatalog
                        ? 'bg-emerald-800 text-white border-emerald-800 font-semibold'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    Tersedia di Katalog (E-Purchasing)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsInKatalog(false)}
                    className={`px-3 py-2 text-xs rounded-lg border transition-colors cursor-pointer ${
                      !isInKatalog
                        ? 'bg-[#0F4C3A] text-white border-[#0F4C3A] font-semibold'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    Belum Tercantum / Non-Katalog
                  </button>
                </div>
              </div>

              {/* 4. Kondisi Khusus / Pengecualian */}
              <div className="pt-2 border-t border-stone-100 space-y-2 text-xs">
                <span className="font-semibold uppercase tracking-wider text-stone-700 block">
                  4. Karakteristik & Kondisi Khusus
                </span>

                <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-stone-50">
                  <input
                    type="checkbox"
                    checked={isComplex}
                    onChange={(e) => setIsComplex(e.target.checked)}
                    className="rounded text-[#0F4C3A] focus:ring-[#0F4C3A]"
                  />
                  <span>Pekerjaan bersifat kompleks / teknologi tinggi / risiko besar</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-stone-50">
                  <input
                    type="checkbox"
                    checked={isSoleSource}
                    onChange={(e) => setIsSoleSource(e.target.checked)}
                    className="rounded text-[#0F4C3A] focus:ring-[#0F4C3A]"
                  />
                  <span>Pemegang hak paten tunggal / tarif resmi pemerintah / penyedia tunggal</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-stone-50">
                  <input
                    type="checkbox"
                    checked={isEmergency}
                    onChange={(e) => setIsEmergency(e.target.checked)}
                    className="rounded text-[#0F4C3A] focus:ring-[#0F4C3A]"
                  />
                  <span>Penanganan Keadaan Darurat Bencana Alam / Force Majeure</span>
                </label>
              </div>
            </div>

            {/* Output Recommendation Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white border-2 border-[#0F4C3A] rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0F4C3A] uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#0F4C3A]" />
                  <span>Hasil Rekomendasi Sesuai Perpres 12/2021</span>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mb-3">
                  {rec.method}
                </h4>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-6 bg-stone-50 p-4 rounded-lg border border-stone-200">
                  {rec.description}
                </p>

                <div className="space-y-3 text-xs border-t border-stone-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Dasar Hukum LKPP:</span>
                    <strong className="text-stone-900 text-right">{rec.legalBasis}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Kewenangan Eksekusi:</span>
                    <strong className="text-stone-900 text-right">{rec.authority}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Estimasi Waktu Proses:</span>
                    <strong className="font-mono text-[#0F4C3A] text-right">{rec.leadTime}</strong>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
                  <span className="text-stone-500">Butuh pendampingan khusus?</span>
                  <a
                    href="#konsultasi"
                    className="inline-flex items-center gap-1 font-semibold text-[#0F4C3A] hover:underline"
                  >
                    <span>Konsultasikan ke Pokja</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Reference rules memo */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 text-xs text-stone-600 space-y-2">
                <strong className="font-semibold text-stone-900 block">
                  Pedoman Ringkas Batasan Nilai Pengadaan:
                </strong>
                <p>• <strong>E-Purchasing:</strong> Wajib diutamakan tanpa batasan nilai jika barang/jasa tayang di katalog.</p>
                <p>• <strong>Pengadaan Langsung:</strong> Barang/Konstruksi s.d. Rp 200.000.000; Konsultansi s.d. Rp 100.000.000.</p>
                <p>• <strong>Tender Cepat:</strong> Nilai &gt; Rp 200.000.000 untuk barang/jasa spesifikasi standar yang ada di SIKaP.</p>
                <p>• <strong>Tender Umum:</strong> Nilai &gt; Rp 200.000.000 untuk konstruksi non-katalog atau pekerjaan non-standar.</p>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 2: KALKULATOR PAJAK & RETENSI PEMDA */}
        {activeTool === 'tax' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Column */}
            <div className="lg:col-span-6 bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-5">
              <h3 className="text-base font-bold font-serif text-stone-900 pb-3 border-b border-stone-200">
                Data Kontrak & Tarif Perpajakan Daerah
              </h3>

              {/* Nilai Bruto SPK */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Nilai Kontrak / SPK (Termasuk PPN)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-xs text-stone-500">Rp</span>
                  <input
                    type="number"
                    value={contractValue}
                    onChange={(e) => setContractValue(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-10 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] font-mono font-bold"
                  />
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Format nominal: {formatRupiah(contractValue)}
                </p>
              </div>

              {/* Kategori Jasa & Tarif PPh */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Kategori Pekerjaan & Tarif PPh Terkait
                </label>
                <select
                  value={taxCategory}
                  onChange={(e) => setTaxCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
                >
                  <option value="konstruksi_kecil">Pekerjaan Konstruksi - Kualifikasi Usaha Kecil (PPh Final 1.75%)</option>
                  <option value="konstruksi_menengah">Pekerjaan Konstruksi - Menengah/Besar (PPh Final 2.65%)</option>
                  <option value="barang">Pengadaan Barang Fisik / Material (PPh Pasal 22 - 1.5%)</option>
                  <option value="konsultansi">Jasa Konsultansi Berbadan Usaha (PPh Final 3.5%)</option>
                  <option value="jasa_lain">Jasa Lainnya / Kebersihan / Keamanan (PPh Pasal 23 - 2%)</option>
                </select>
              </div>

              {/* Tarif PPN */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Tarif Pajak Pertambahan Nilai (PPN)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPpnRate(11)}
                    className={`px-3 py-2 text-xs rounded-lg border transition-colors cursor-pointer text-center ${
                      ppnRate === 11
                        ? 'bg-[#0F4C3A] text-white border-[#0F4C3A] font-semibold'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    PPN 11% (Ketentuan Lama)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPpnRate(12)}
                    className={`px-3 py-2 text-xs rounded-lg border transition-colors cursor-pointer text-center ${
                      ppnRate === 12
                        ? 'bg-[#0F4C3A] text-white border-[#0F4C3A] font-semibold'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    PPN 12% (Ketentuan Terbaru)
                  </button>
                </div>
              </div>

              {/* Retensi Pemeliharaan 5% */}
              <div className="pt-2 border-t border-stone-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={applyRetention}
                    onChange={(e) => setApplyRetention(e.target.checked)}
                    className="rounded text-[#0F4C3A] focus:ring-[#0F4C3A]"
                  />
                  <span>
                    Terapkan <strong>Potongan Retensi Pemeliharaan 5%</strong> (Wajib untuk Pekerjaan Konstruksi sampai masa FHO)
                  </span>
                </label>
              </div>
            </div>

            {/* Calculation Breakdown Output */}
            <div className="lg:col-span-6 bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h4 className="text-base font-bold font-serif text-stone-900">
                  Rincian Potongan & Realisasi Netto SP2D
                </h4>
                <button
                  onClick={handleCopyTaxSummary}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                >
                  {isTaxCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isTaxCopied ? 'Tersalin' : 'Salin Resume'}</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-stone-600">Nilai SPK / Bruto Kontrak:</span>
                  <span className="font-mono font-bold text-sm text-stone-900 tabular-nums">
                    {formatRupiah(contractValue)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-t border-stone-100">
                  <span className="text-stone-600">Dasar Pengenaan Pajak (DPP):</span>
                  <span className="font-mono font-semibold text-stone-800 tabular-nums">
                    {formatRupiah(baseValue)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-t border-stone-100 text-rose-700">
                  <span>Potongan PPN ({ppnRate}%):</span>
                  <span className="font-mono font-semibold tabular-nums">
                    - {formatRupiah(calculatedPpn)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-t border-stone-100 text-rose-700">
                  <span>Potongan {activePph.label}:</span>
                  <span className="font-mono font-semibold tabular-nums">
                    - {formatRupiah(calculatedPph)}
                  </span>
                </div>

                {applyRetention && (
                  <div className="flex justify-between items-center py-1 border-t border-stone-100 text-amber-700">
                    <span>Retensi Jaminan Pemeliharaan (5% dari DPP):</span>
                    <span className="font-mono font-semibold tabular-nums">
                      - {formatRupiah(calculatedRetention)}
                    </span>
                  </div>
                )}

                {/* Net Disbursement Result */}
                <div className="pt-4 border-t-2 border-stone-300 bg-emerald-50/50 p-4 rounded-lg">
                  <span className="text-stone-600 block text-xs">
                    Estimasi Pembayaran Bersih Diterima Penyedia (Netto Rekening):
                  </span>
                  <span className="font-mono font-bold text-2xl text-emerald-800 tabular-nums block mt-1">
                    {formatRupiah(netDisbursement)}
                  </span>
                  <p className="text-[11px] text-stone-500 mt-2">
                    * Retensi 5% sebesar {formatRupiah(calculatedRetention)} akan dicairkan setelah Berita Acara Final Hand Over (FHO) diterbitkan atau diganti dengan Jaminan Pemeliharaan Bank.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
