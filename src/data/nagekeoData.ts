import { 
  ConsultationTicket, 
  ProcurementPackage, 
  LocalCatalogItem, 
  RegulationItem, 
  FaqItem 
} from '../types/pbj';

export const INITIAL_TICKETS: ConsultationTicket[] = [
  {
    id: 'TKT-NGK-2026-0842',
    applicantName: 'Drs. Yohanes V. Liko',
    applicantRole: 'PPK',
    institution: 'Dinas Pekerjaan Umum dan Penataan Ruang Kab. Nagekeo',
    contactNumber: '0812-3849-1102',
    email: 'yohanes.liko@nagekeokab.go.id',
    category: 'Persiapan Pengadaan (KAK, Spesifikasi & HPS)',
    mode: 'Tatap Muka (Desk UKPBJ Setda Mbay)',
    preferredDate: '2026-11-03',
    preferredTime: '10:00 WITA',
    subject: 'Reviu Spesifikasi Agregat & Analisis Harga Satuan Ruas Danga - Mbay',
    description: 'Mohon telaah dan reviu Pokja UKPBJ terkait penggunaan agregat lokal kali Aesesa dalam penyusunan HPS pekerjaan preservasi jalan dan penyesuaian perhitungan PPN 12%.',
    attachmentName: 'Draft_HPS_Preservasi_Danga_Mbay.pdf',
    status: 'Dijadwalkan',
    createdAt: '2026-10-26 09:15 WITA',
    assignedAdvisor: 'Ignasius K. Meo, S.T., M.Eng. (Ketua Pokja II UKPBJ Nagekeo)',
    meetingLinkOrVenue: 'Ruang Rapat UKPBJ, Lantai 2 Gedung Sekretariat Daerah Kab. Nagekeo, Mbay',
    adviceNotes: 'Berkas telaah awal telah diterima. Pokja menyarankan melampirkan hasil uji laboratorium mutu agregat dari Balai Pengujian Material PU Kupang/Ende.',
    recommendationPoints: [
      'Gunakan pedoman AHSP Kementerian PUPR 2024 revisi terbaru',
      'Pemberian bobot preferensi harga komoditas lokal Flores sesuai Perbup Nagekeo tentang P3DN',
      'Klarifikasi metode pengujian kepadatan di lapangan sebelum penetapan KAK'
    ]
  },
  {
    id: 'TKT-NGK-2026-0839',
    applicantName: 'Maria Goreti Wea, S.Farm., Apt.',
    applicantRole: 'Pejabat Pengadaan',
    institution: 'RSUD Aeramo Kabupaten Nagekeo',
    contactNumber: '0852-3910-8841',
    email: 'pengadaan.rsudaeramo@nagekeokab.go.id',
    category: 'Pemilihan Penyedia (E-Katalog, Tender & Pengadaan Langsung)',
    mode: 'Daring (Virtual / WhatsApp Call)',
    preferredDate: '2026-10-30',
    preferredTime: '13:30 WITA',
    subject: 'Prosedur Mini-Kompetisi E-Katalog V6 LKPP untuk Bahan Medis Habis Pakai',
    description: 'Konsultasi mekanisme mini-kompetisi pada etalase obat dan BMHP di platform e-Katalog LKPP Versi 6 jika terdapat lebih dari 2 penyedia terdaftar dengan selisih harga signifikan.',
    attachmentName: 'Daftar_Kebutuhan_BMHP_RSUD_2026.xlsx',
    status: 'Selesai & Rekomendasi Terbit',
    createdAt: '2026-10-24 14:20 WITA',
    assignedAdvisor: 'Petrus S. Nggarang, S.Sos. (Fasilitator Pengadaan LKPP Pratama)',
    meetingLinkOrVenue: 'Telekonferensi Virtual Desk UKPBJ Nagekeo',
    adviceNotes: 'Konsultasi telah dilaksanakan secara daring. Pejabat Pengadaan diarahkan menerapkan filter penyedia terdekat dengan pertimbangan rantai pasok kepulauan.',
    recommendationPoints: [
      'Lakukan negosiasi harga melalui sistem fitur e-Purchasing V6 LKPP',
      'Pastikan dokumen izin edar Kemenkes RI dan waktu pengiriman ke Pelabuhan Marapokot/Bandara Soa Ende terinci dalam syarat pesanan',
      'Simpan bukti screen capture perbandingan harga sebagai lampiran SPK'
    ]
  },
  {
    id: 'TKT-NGK-2026-0831',
    applicantName: 'Bernardus Toda (Direktur CV Flores Mandiri)',
    applicantRole: 'Penyedia / UMKM',
    institution: 'Pelaku Usaha Lokal / Kadin Nagekeo',
    contactNumber: '0813-5321-9980',
    email: 'floresmandiri.mbay@gmail.com',
    category: 'Pemilihan Penyedia (E-Katalog, Tender & Pengadaan Langsung)',
    mode: 'Tatap Muka (Desk UKPBJ Setda Mbay)',
    preferredDate: '2026-11-05',
    preferredTime: '11:00 WITA',
    subject: 'Pendampingan Onboarding Etalase Tenun & Seragam Batik Daerah',
    description: 'Kami ingin mendaftarkan produk tenun ikat Nagekeo motif Dinto dan seragam batik khas Nagekeo ke E-Katalog Lokal Nagekeo agar dapat dibeli oleh dinas-dinas.',
    status: 'Menunggu Verifikasi',
    createdAt: '2026-10-27 11:45 WITA'
  }
];

export const NAGEKEO_PACKAGES: ProcurementPackage[] = [
  {
    id: 'RUP-NGK-2026-4401',
    title: 'Peningkatan Struktur Jalan Ruas Danga - Marapokot (Akses Pelabuhan Laut)',
    opd: 'Dinas Pekerjaan Umum dan Penataan Ruang',
    procurementType: 'Pekerjaan Konstruksi',
    method: 'Tender',
    paguBudget: 6500000000,
    hpsBudget: 6412500000,
    fiscalYear: 2026,
    status: 'Evaluasi Penawaran',
    location: 'Kecamatan Aesesa, Kabupaten Nagekeo',
    closingDate: '08 November 2026',
    tkdnTargetPct: 78,
    description: 'Pekerjaan perkerasan lentur AC-BC, pelebaran bahu jalan beton, dan saluran drainase pasangan batu pada koridor logistik strategis Marapokot.',
    requirements: [
      'Memiliki SBU Jasa Konstruksi Bidang Bangunan Sipil (BS001 / Jalan)',
      'Memiliki NPWP dan status Konfirmasi Status Wajib Pajak (KSWP) Valid',
      'Memiliki Personel Manajerial Ahli Teknik Jalan dan Petugas K3 Konstruksi',
      'Memiliki dukungan ketersediaan Asphalt Mixing Plant (AMP) berizin di wilayah Flores'
    ]
  },
  {
    id: 'RUP-NGK-2026-4402',
    title: 'Pengadaan Paket Makanan Tambahan (PMT) Pangan Lokal Pencegahan Stunting 7 Kecamatan',
    opd: 'Dinas Kesehatan Kabupaten Nagekeo',
    procurementType: 'Barang',
    method: 'E-Purchasing (E-Katalog)',
    paguBudget: 1250000000,
    hpsBudget: 1220000000,
    fiscalYear: 2026,
    status: 'Pendaftaran & Kualifikasi',
    location: 'Kecamatan Aesesa, Boawae, Mauponggo, Wolowae, Nangaroro, Keo Tengah, Aesesa Selatan',
    closingDate: '15 November 2026',
    tkdnTargetPct: 95,
    description: 'Penyediaan makanan tambahan balita gizi kurang dan ibu hamil KEK berbahan baku lokal Nagekeo (telur lokal, olahan ikan segar Marapokot, kacang hijau Mbay).',
    requirements: [
      'Pelaku Usaha Mikro/Kecil berdomisili di Kabupaten Nagekeo',
      'Memiliki Nomor Induk Berusaha (NIB) KBLI Penyedia Makanan Minuman',
      'Memiliki Sertifikat Laik Higiene Sanitasi (SLHS) dari Dinkes'
    ]
  },
  {
    id: 'RUP-NGK-2026-4403',
    title: 'Pembangunan Lanjutan Gedung Poliklinik & Rawat Inap Terpadu RSUD Aeramo',
    opd: 'RSUD Aeramo Nagekeo',
    procurementType: 'Pekerjaan Konstruksi',
    method: 'Tender',
    paguBudget: 8900000000,
    hpsBudget: 8780000000,
    fiscalYear: 2026,
    status: 'Pemberian Penjelasan',
    location: 'Desa Aeramo, Kecamatan Aesesa',
    closingDate: '12 November 2026',
    tkdnTargetPct: 65,
    description: 'Pekerjaan arsitektural, mekanikal elektrikal plumbing (MEP), instalasi gas medik dan tata udara ruang isolasi Rumah Sakit Umum Daerah Aeramo.',
    requirements: [
      'SBU Bangunan Gedung Pelayanan Kesehatan (BG008)',
      'Pengalaman pekerjaan sejenis dalam kurun waktu 4 tahun terakhir',
      'Peralatan utama: Crane/Hoist, Genset mobile, Mesin las, Bar cutter/bender'
    ]
  },
  {
    id: 'RUP-NGK-2026-4404',
    title: 'Pengadaan Traktor Roda 4 & Mesin Pompa Irigasi Pompanisasi Sawah Dataran Mbay',
    opd: 'Dinas Pertanian Kabupaten Nagekeo',
    procurementType: 'Barang',
    method: 'E-Purchasing (E-Katalog)',
    paguBudget: 1850000000,
    hpsBudget: 1840000000,
    fiscalYear: 2026,
    status: 'Selesai Kontrak',
    location: 'Kawasan Irigasi Sutami - Dataran Mbay',
    closingDate: '20 Oktober 2026',
    tkdnTargetPct: 45,
    description: 'Pengadaan alsintan modern guna mendukung ketahanan pangan Nagekeo sebagai lumbung pangan Flores melalui E-Katalog Nasional Alsintan Kementan.',
    requirements: [
      'Penyedia resmi e-Katalog LKPP Etalase Alsintan',
      'Layanan purna jual resmi bergaransi 2 tahun dan ketersediaan teknisi lokal di Flores'
    ]
  },
  {
    id: 'RUP-NGK-2026-4405',
    title: 'Jasa Konsultansi Pengawasan Teknis Rehabilitasi Bendung Irigasi Aesesa',
    opd: 'Dinas Pekerjaan Umum dan Penataan Ruang',
    procurementType: 'Jasa Konsultansi',
    method: 'Seleksi',
    paguBudget: 350000000,
    hpsBudget: 342000000,
    fiscalYear: 2026,
    status: 'Pendaftaran & Kualifikasi',
    location: 'Kecamatan Aesesa',
    closingDate: '10 November 2026',
    tkdnTargetPct: 90,
    description: 'Pengawasan mutu, waktu, dan volume pada pekerjaan rehabilitasi pintu air dan saluran primer bendung air baku pertanian Mbay.',
    requirements: [
      'SBU Jasa Pengawasan Rekayasa Keairan (RK002)',
      'Tenaga Ahli Teknik Pengairan berpengalaman minimal 5 tahun (SKA Madya)'
    ]
  },
  {
    id: 'RUP-NGK-2026-4406',
    title: 'Pengadaan Kain Tenun Ikat Khas Nagekeo untuk Cenderamata Tamu Daerah & ASN',
    opd: 'Dinas Pariwisata dan Kebudayaan',
    procurementType: 'Barang',
    method: 'Pengadaan Langsung',
    paguBudget: 98000000,
    hpsBudget: 96500000,
    fiscalYear: 2026,
    status: 'Pengumuman',
    location: 'Danga - Mbay & Sentra Tenun Dinto',
    closingDate: '05 November 2026',
    tkdnTargetPct: 100,
    description: 'Pemberdayaan kelompok penenun tradisional wanita Nagekeo untuk penyediaan selendang dan sarung tenun pewarna alami khas Mbay dan Boawae.',
    requirements: [
      'Kelompok Pengrajin Tenun / Koperasi UMKM lokal ber-NIB Nagekeo',
      'Surat pernyataan keaslian motif tenun adat Nagekeo bermaterai'
    ]
  }
];

export const LOCAL_CATALOG_ITEMS: LocalCatalogItem[] = [
  {
    id: 'KAT-NGK-001',
    name: 'Beras Premium Mbay Varietas Ciherang & Memberamo (Kemasan 10kg & 25kg)',
    category: 'Pertanian & Pangan',
    vendorName: 'Koperasi Tani Makmur Dataran Mbay',
    vendorLocation: 'Mbay, Kec. Aesesa',
    unitPrice: 14500,
    unit: 'Kg',
    tkdnPct: 100,
    isUkm: true,
    stockStatus: 'Tersedia',
    description: 'Beras putih pulen segar hasil panen sawah beririgasi teknis Waduk Sutami Mbay, tanpa pemutih dan tanpa pengawet kimiawi.'
  },
  {
    id: 'KAT-NGK-002',
    name: 'Kain Tenun Ikat Asli Nagekeo Motif Dinto & Hoba (Pewarna Alam Indigo)',
    category: 'Kerajinan Tenun Flores',
    vendorName: 'Kelompok Tenun Tradisional Woetowolo',
    vendorLocation: 'Kecamatan Mauponggo',
    unitPrice: 850000,
    unit: 'Lembar',
    tkdnPct: 100,
    isUkm: true,
    stockStatus: 'Pre-Order (Kapasitas Cukup)',
    description: 'Kain tenun ikat tenun tangan manual berkualitas tinggi dengan ornamen khas lambang persatuan adat Nagekeo, sangat cocok untuk busana dinas dan cenderamata.'
  },
  {
    id: 'KAT-NGK-003',
    name: 'Agregat Batu Pecah Klas A & B Kali Aesesa (Uji Lab Terstandar PU)',
    category: 'Material Konstruksi',
    vendorName: 'PT Nagekeo Beton Mandiri',
    vendorLocation: 'Desa Marapokot, Kec. Aesesa',
    unitPrice: 285000,
    unit: 'M3 (Meter Kubik)',
    tkdnPct: 92,
    isUkm: false,
    stockStatus: 'Tersedia',
    description: 'Material split dan batu pecah berkualitas tinggi dari aliran sungai Aesesa, lolos uji abrasi dan gradasi untuk pondasi jalan dan struktur beton K-300.'
  },
  {
    id: 'KAT-NGK-004',
    name: 'Kopi Arabika & Robusta Khas Lereng Gunung Ebulobo (Kemasan Drip & Bubuk)',
    category: 'Pertanian & Pangan',
    vendorName: 'UMKM Kopi Flores Ebulobo',
    vendorLocation: 'Kecamatan Boawae',
    unitPrice: 45000,
    unit: 'Pouch 250gr',
    tkdnPct: 100,
    isUkm: true,
    stockStatus: 'Tersedia',
    description: 'Kopi organik khas lereng vulkanik Ebulobo dengan cita rasa rempah dan karamel lembut, etalase jamuan kantor dinas se-Kabupaten Nagekeo.'
  },
  {
    id: 'KAT-NGK-005',
    name: 'Paket Snack Box Tradisional Flores (Kue Rambut, Ubi Rebus, Jagung Bose, Kopi)',
    category: 'Jasa Boga & Jamuan',
    vendorName: 'Catering Danga Sari Rasa',
    vendorLocation: 'Kelurahan Danga, Mbay',
    unitPrice: 25000,
    unit: 'Kotak',
    tkdnPct: 100,
    isUkm: true,
    stockStatus: 'Tersedia',
    description: 'Layanan makanan kudapan rapat dinas menggunakan bahan pangan lokal Nagekeo bersertifikat Higiene Sanitasi Dinkes.'
  },
  {
    id: 'KAT-NGK-006',
    name: 'Pasir Pasang Sungai Aesesa (Bebas Lumpur & Organik)',
    category: 'Material Konstruksi',
    vendorName: 'CV Aesesa Graha Pratama',
    vendorLocation: 'Mbay, Kec. Aesesa',
    unitPrice: 195000,
    unit: 'M3 (Meter Kubik)',
    tkdnPct: 100,
    isUkm: true,
    stockStatus: 'Tersedia',
    description: 'Pasir alam tajam bermutu tinggi hasil endapan sungai Aesesa, sangat baik untuk spesi plesteran dinding dan adukan beton gedung pemerintah.'
  }
];

export const REGULATIONS: RegulationItem[] = [
  {
    id: 'REG-01',
    title: 'Peraturan Presiden Republik Indonesia Nomor 12 Tahun 2021',
    number: 'Perpres No. 12/2021',
    year: 2021,
    scope: 'Pusat (Perpres/Perlem)',
    description: 'Perubahan atas Perpres No. 16 Tahun 2018 tentang Pengadaan Barang/Jasa Pemerintah. Mengatur alokasi minimal 40% anggaran belanja untuk UMKM dan Koperasi serta kewajiban E-Purchasing.',
    fileSize: '3.4 MB',
    category: 'Regulasi'
  },
  {
    id: 'REG-02',
    title: 'Peraturan Lembaga Kebijakan Pengadaan Barang/Jasa Pemerintah No. 12 Tahun 2021',
    number: 'Perlem LKPP No. 12/2021',
    year: 2021,
    scope: 'Pusat (Perpres/Perlem)',
    description: 'Pedoman Pelaksanaan Pengadaan Barang/Jasa Pemerintah Melalui Penyedia (Standar Dokumen Pemilihan Tender/Seleksi dan Tata Cara Evaluasi).',
    fileSize: '5.8 MB',
    category: 'Regulasi'
  },
  {
    id: 'REG-03',
    title: 'Keputusan Bupati Nagekeo tentang Petunjuk Teknis Pelaksanaan E-Katalog Lokal',
    number: 'Kepbup Nagekeo No. 188.45/HK/2024',
    year: 2024,
    scope: 'Daerah (Perbup/Kepbup Nagekeo)',
    description: 'Pedoman pemberdayaan pelaku usaha lokal Nagekeo, tata cara kurasi produk lokal etalase Mbay, dan kewajiban SKPD belanja produk pangan & tenun lokal.',
    fileSize: '1.9 MB',
    category: 'Regulasi'
  },
  {
    id: 'REG-04',
    title: 'Surat Edaran LKPP No. 3 Tahun 2024: Panduan Migrasi & Transaksi E-Katalog V6',
    number: 'SE Kepala LKPP No. 3/2024',
    year: 2024,
    scope: 'Surat Edaran LKPP',
    description: 'Tata cara pengelolaan transaksi, metode mini-kompetisi, negosiasi harga terintegrasi, dan pembayaran digital dalam platform Katalog Elektronik LKPP Versi 6.',
    fileSize: '1.2 MB',
    category: 'Regulasi'
  },
  {
    id: 'DOC-TMP-01',
    title: 'Template Standar Kerangka Acuan Kerja (KAK) Jasa Konstruksi & Konsultansi',
    number: 'Form-UKPBJ-KAK-01',
    year: 2026,
    scope: 'Daerah (Perbup/Kepbup Nagekeo)',
    description: 'Format baku penyusunan KAK bagi PPK di lingkungan Pemkab Nagekeo, memuat uraian pekerjaan, dasar hukum, kualifikasi tenaga ahli, dan matriks risiko.',
    fileSize: '420 KB (DOCX)',
    category: 'Standar Dokumen Pemilihan'
  },
  {
    id: 'DOC-TMP-02',
    title: 'Format Standar Analisis Harga Perkiraan Sendiri (HPS) & Rekap PPN 12%',
    number: 'Form-UKPBJ-HPS-02',
    year: 2026,
    scope: 'Daerah (Perbup/Kepbup Nagekeo)',
    description: 'Template spreadsheet formulir kalkulasi HPS dengan rumus otomatis survei harga pasar, biaya keuntungan overhead, serta pajak pertambahan nilai.',
    fileSize: '310 KB (XLSX)',
    category: 'Standar Dokumen Pemilihan'
  },
  {
    id: 'DOC-TMP-03',
    title: 'Format Berita Acara Reviu Bersama Dokumen Persiapan Pengadaan (BA-DPP)',
    number: 'Form-UKPBJ-BADPP-03',
    year: 2026,
    scope: 'Daerah (Perbup/Kepbup Nagekeo)',
    description: 'Dokumen berita acara wajib antara PPK dan Pokja Pemilihan UKPBJ Nagekeo sebelum tender ditayangkan di SPSE.',
    fileSize: '215 KB (DOCX)',
    category: 'Standar Dokumen Pemilihan'
  }
];

export const FAQS: FaqItem[] = [
  {
    category: 'Klinik Konsultasi PBJ',
    question: 'Siapa saja yang berhak mengajukan konsultasi ke UKPBJ Kabupaten Nagekeo?',
    answer: 'Layanan konsultasi terbuka untuk Pejabat Pembuat Komitmen (PPK), Pejabat Pelaksana Teknis Kegiatan (PPTK), Pejabat Pengadaan, Pokja Pemilihan seluruh OPD/SKPD Pemkab Nagekeo, serta para Penyedia/Pelaku Usaha UMKM lokal Nagekeo dan masyarakat yang membutuhkan informasi kejelasan tata cara pengadaan.'
  },
  {
    category: 'Metode Pengadaan',
    question: 'Berapa batasan nilai anggaran untuk Pengadaan Langsung Barang/Jasa di Nagekeo?',
    answer: 'Sesuai Perpres No. 12 Tahun 2021 Pasal 38, Pengadaan Langsung Barang/Pekerjaan Konstruksi/Jasa Lainnya bernilai paling banyak Rp 200.000.000 (dua ratus juta rupiah). Sedangkan Pengadaan Langsung Jasa Konsultansi bernilai paling banyak Rp 100.000.000 (seratus juta rupiah). Namun demikian, jika barang/jasa sudah tercantum dalam Katalog Elektronik Lokal Nagekeo, metode E-Purchasing wajib diprioritaskan tanpa batasan nilai minimal.'
  },
  {
    category: 'E-Katalog Lokal',
    question: 'Bagaimana cara pelaku usaha/UMKM Nagekeo mendaftarkan produk ke E-Katalog Lokal?',
    answer: 'Pelaku usaha cukup memiliki NIB melalui OSS RBA, NPWP, akun SPSE Nagekeo / LPSE, kemudian masuk ke platform E-Katalog LKPP (Katalog Lokal Pemerintah Kabupaten Nagekeo). Tim Helpdesk UKPBJ Nagekeo siap memberikan pendampingan gratis tanpa dipungut biaya apapun.'
  },
  {
    category: 'Persiapan Pengadaan',
    question: 'Apakah PPK wajib menyampaikan Dokumen Persiapan Pengadaan (DPP) ke UKPBJ untuk direviu?',
    answer: 'Ya, untuk paket pengadaan yang dilaksanakan melalui Tender, Tender Cepat, atau Seleksi, PPK wajib menyerahkan DPP (terdiri dari KAK, Spesifikasi Teknis, HPS, dan Rancangan Kontrak) kepada UKPBJ untuk dilakukan reviu bersama sebelum pengumuman lelang.'
  },
  {
    category: 'Perpajakan & TKDN',
    question: 'Bagaimana penyesuaian tarif PPN dalam penghitungan HPS tahun anggaran berjalan?',
    answer: 'Dalam penyusunan HPS, nilai total harga satuan barang/jasa ditambah PPN sesuai ketentuan peraturan perundang-undangan perpajakan yang berlaku (11% atau 12% sesuai ketetapan Menteri Keuangan), dan dipastikan tidak memasukkan PPN ganda pada item analisa dasar.'
  }
];

export const OPD_LIST = [
  'Dinas Pekerjaan Umum dan Penataan Ruang',
  'Dinas Kesehatan',
  'RSUD Aeramo',
  'Dinas Pendidikan dan Kebudayaan',
  'Dinas Pertanian',
  'Dinas Perindustrian dan Perdagangan',
  'Dinas Pariwisata dan Kebudayaan',
  'Dinas Lingkungan Hidup',
  'Dinas Sosial, Pemberdayaan Perempuan & Anak',
  'Badan Penanggulangan Bencana Daerah (BPBD)',
  'Sekretariat Daerah (Bagian Umum & PBJ)',
  'Kecamatan Aesesa',
  'Kecamatan Boawae',
  'Kecamatan Mauponggo',
  'Kecamatan Wolowae',
  'Kecamatan Nangaroro',
  'Kecamatan Keo Tengah',
  'Kecamatan Aesesa Selatan'
];
