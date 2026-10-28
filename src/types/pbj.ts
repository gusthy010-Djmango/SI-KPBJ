export type ConsultationCategory = 
  | 'Perencanaan Pengadaan (RUP & SIRUP)'
  | 'Persiapan Pengadaan (KAK, Spesifikasi & HPS)'
  | 'Pemilihan Penyedia (E-Katalog, Tender & Pengadaan Langsung)'
  | 'Pelaksanaan & Perubahan Kontrak (Addendum/SPK)'
  | 'Mitigasi Risiko & Reviu APIP / Pendampingan';

export type ConsultationMode = 'Daring (Virtual / WhatsApp Call)' | 'Tatap Muka (Desk UKPBJ Setda Mbay)';

export type ConsultationStatus = 'Menunggu Verifikasi' | 'Dijadwalkan' | 'Sedang Ditelaah' | 'Selesai & Rekomendasi Terbit';

export interface ConsultationTicket {
  id: string; // e.g., TKT-NGK-2026-012
  applicantName: string;
  applicantRole: 'PPK' | 'PPTK' | 'Pejabat Pengadaan' | 'Pokja Pemilihan' | 'Penyedia / UMKM' | 'Masyarakat / Pengawas';
  institution: string; // e.g., 'Dinas Pekerjaan Umum & Penataan Ruang'
  contactNumber: string;
  email: string;
  category: ConsultationCategory;
  mode: ConsultationMode;
  preferredDate: string;
  preferredTime: string;
  subject: string;
  description: string;
  attachmentName?: string;
  status: ConsultationStatus;
  createdAt: string;
  assignedAdvisor?: string;
  adviceNotes?: string;
  recommendationPoints?: string[];
  meetingLinkOrVenue?: string;
}

export type ProcurementMethod = 
  | 'E-Purchasing (E-Katalog)'
  | 'Tender'
  | 'Tender Cepat'
  | 'Seleksi'
  | 'Pengadaan Langsung'
  | 'Penunjukan Langsung'
  | 'Swakelola Tipe I'
  | 'Swakelola Tipe II';

export type ProcurementType = 
  | 'Barang'
  | 'Pekerjaan Konstruksi'
  | 'Jasa Konsultansi'
  | 'Jasa Lainnya';

export type PackageStatus = 'Pengumuman' | 'Pendaftaran & Kualifikasi' | 'Pemberian Penjelasan' | 'Evaluasi Penawaran' | 'Penetapan Pemenang' | 'Selesai Kontrak';

export interface ProcurementPackage {
  id: string; // Kode RUP / Tender
  title: string;
  opd: string;
  procurementType: ProcurementType;
  method: ProcurementMethod;
  paguBudget: number; // in Rupiah
  hpsBudget: number; // in Rupiah
  fiscalYear: number;
  status: PackageStatus;
  location: string; // e.g. 'Kecamatan Aesesa', 'Boawae', 'RSUD Aeramo'
  closingDate: string;
  tkdnTargetPct: number;
  description: string;
  requirements: string[];
}

export interface LocalCatalogItem {
  id: string;
  name: string;
  category: 'Pertanian & Pangan' | 'Kerajinan Tenun Flores' | 'Material Konstruksi' | 'Jasa Boga & Jamuan' | 'Jasa Kantor & Keamanan';
  vendorName: string;
  vendorLocation: string; // e.g., 'Mbay', 'Danga', 'Boawae'
  unitPrice: number;
  unit: string;
  tkdnPct: number;
  isUkm: boolean;
  stockStatus: 'Tersedia' | 'Pre-Order (Kapasitas Cukup)';
  description: string;
}

export interface RegulationItem {
  id: string;
  title: string;
  number: string;
  year: number;
  scope: 'Pusat (Perpres/Perlem)' | 'Daerah (Perbup/Kepbup Nagekeo)' | 'Surat Edaran LKPP';
  description: string;
  fileSize: string;
  category: 'Regulasi' | 'Standar Dokumen Pemilihan' | 'Pedoman Teknis';
  downloadUrl?: string;
}

export interface FaqItem {
  question: string;
  category: string;
  answer: string;
}
