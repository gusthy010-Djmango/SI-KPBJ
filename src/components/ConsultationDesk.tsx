import React, { useState } from 'react';
import { 
  ConsultationTicket, 
  ConsultationCategory, 
  ConsultationMode,
  ConsultationStatus 
} from '../types/pbj';
import { OPD_LIST, FAQS } from '../data/nagekeoData';
import { 
  MessageSquarePlus, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Calendar, 
  User, 
  Building, 
  Phone, 
  Mail, 
  Download, 
  Printer, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  X
} from 'lucide-react';

interface ConsultationDeskProps {
  tickets: ConsultationTicket[];
  onAddTicket: (ticket: ConsultationTicket) => void;
  selectedTicketId?: string | null;
  onClearSelectedTicketId?: () => void;
  initialTab?: 'form' | 'track' | 'list' | 'faq';
}

export const ConsultationDesk: React.FC<ConsultationDeskProps> = ({
  tickets,
  onAddTicket,
  selectedTicketId,
  onClearSelectedTicketId,
  initialTab = 'list'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'form' | 'track' | 'list' | 'faq'>(
    selectedTicketId ? 'track' : initialTab
  );
  const [searchTicketQuery, setSearchTicketQuery] = useState(selectedTicketId || '');
  const [trackedTicket, setTrackedTicket] = useState<ConsultationTicket | null>(
    selectedTicketId 
      ? tickets.find(t => t.id.toLowerCase() === selectedTicketId.toLowerCase()) || null 
      : tickets[0] || null
  );
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [faqSearch, setFaqSearch] = useState('');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantRole: 'PPK' as ConsultationTicket['applicantRole'],
    institution: OPD_LIST[0],
    contactNumber: '',
    email: '',
    category: 'Persiapan Pengadaan (KAK, Spesifikasi & HPS)' as ConsultationCategory,
    mode: 'Tatap Muka (Desk UKPBJ Setda Mbay)' as ConsultationMode,
    preferredDate: '',
    preferredTime: '10:00 WITA',
    subject: '',
    description: '',
    attachmentName: ''
  });

  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);
  const [createdTicketId, setCreatedTicketId] = useState<string | null>(null);

  const handleSearchTicket = (queryId: string) => {
    const trimmed = queryId.trim().toUpperCase();
    const found = tickets.find(t => t.id.toUpperCase() === trimmed || t.id.toUpperCase().includes(trimmed));
    if (found) {
      setTrackedTicket(found);
    } else {
      setTrackedTicket(null);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.applicantName || !formData.subject || !formData.description) {
      alert('Mohon lengkapi Nama Pemohon, Judul, dan Uraian Permasalahan Konsultasi.');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `TKT-NGK-2026-${randomSuffix}`;

    const newTicket: ConsultationTicket = {
      id: newId,
      applicantName: formData.applicantName,
      applicantRole: formData.applicantRole,
      institution: formData.institution,
      contactNumber: formData.contactNumber || '0812-xxxx-xxxx',
      email: formData.email || 'pemohon@nagekeokab.go.id',
      category: formData.category,
      mode: formData.mode,
      preferredDate: formData.preferredDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      preferredTime: formData.preferredTime,
      subject: formData.subject,
      description: formData.description,
      attachmentName: formData.attachmentName || undefined,
      status: 'Menunggu Verifikasi',
      createdAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WITA'
    };

    onAddTicket(newTicket);
    setCreatedTicketId(newId);
    setTrackedTicket(newTicket);
    setSearchTicketQuery(newId);
    setFormSuccessMessage(`Permohonan konsultasi berhasil diajukan dengan Nomor Tiket: ${newId}`);

    // Reset fields
    setFormData({
      applicantName: '',
      applicantRole: 'PPK',
      institution: OPD_LIST[0],
      contactNumber: '',
      email: '',
      category: 'Persiapan Pengadaan (KAK, Spesifikasi & HPS)',
      mode: 'Tatap Muka (Desk UKPBJ Setda Mbay)',
      preferredDate: '',
      preferredTime: '10:00 WITA',
      subject: '',
      description: '',
      attachmentName: ''
    });
  };

  const filteredTickets = tickets.filter(ticket => {
    if (statusFilter === 'all') return true;
    return ticket.status === statusFilter;
  });

  const filteredFaqs = FAQS.filter(faq => 
    faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
    faq.answer.toLowerCase().includes(faqSearch.toLowerCase()) ||
    faq.category.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with zero-pill metadata */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0F4C3A] mb-2">
            <span>Klinik Konsultasi PBJ Nagekeo</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Layanan Advokasi & Pendampingan Regulasi</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Bebas Biaya</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Desk Konsultasi Pengadaan Barang & Jasa
              </h2>
              <p className="text-stone-600 text-sm mt-1 max-w-2xl">
                Fasilitas pendampingan teknis dan yuridis bagi Pejabat Pembuat Komitmen (PPK), 
                Pokja Pemilihan, Pejabat Pengadaan, serta Penyedia UMKM se-Kabupaten Nagekeo.
              </p>
            </div>

            {/* Segmented Control Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200 shrink-0">
              <button
                onClick={() => { setActiveSubTab('list'); onClearSelectedTicketId?.(); }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeSubTab === 'list' 
                    ? 'bg-white text-stone-900 shadow-xs font-semibold' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Daftar Tiket ({tickets.length})
              </button>
              <button
                onClick={() => setActiveSubTab('form')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeSubTab === 'form' 
                    ? 'bg-white text-stone-900 shadow-xs font-semibold' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Ajukan Tiket Baru
              </button>
              <button
                onClick={() => setActiveSubTab('track')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeSubTab === 'track' 
                    ? 'bg-white text-stone-900 shadow-xs font-semibold' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Lacak Status
              </button>
              <button
                onClick={() => setActiveSubTab('faq')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeSubTab === 'faq' 
                    ? 'bg-white text-stone-900 shadow-xs font-semibold' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                FAQ Regulasi
              </button>
            </div>
          </div>
        </div>

        {/* SUBTAB 1: DAFTAR TIKET KONSULTASI */}
        {activeSubTab === 'list' && (
          <div>
            {/* Filter bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Status:</span>
                <div className="flex items-center gap-1">
                  {['all', 'Menunggu Verifikasi', 'Dijadwalkan', 'Selesai & Rekomendasi Terbit'].map((statusKey) => (
                    <button
                      key={statusKey}
                      onClick={() => setStatusFilter(statusKey)}
                      className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                        statusFilter === statusKey
                          ? 'bg-[#0F4C3A] text-white font-medium'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {statusKey === 'all' ? 'Semua Status' : statusKey}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActiveSubTab('form')}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-[#0F4C3A] rounded-lg hover:bg-[#0B3A2C] transition-colors cursor-pointer whitespace-nowrap"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>Buat Tiket Konsultasi</span>
              </button>
            </div>

            {/* Ticket Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTickets.map((ticket) => (
                <div 
                  key={ticket.id}
                  className="bg-stone-50 border border-stone-200 rounded-lg p-5 flex flex-col justify-between hover:border-stone-400 transition-colors"
                >
                  <div>
                    {/* Unboxed Metadata Header */}
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                      <span className="font-mono font-bold text-[#0F4C3A]">{ticket.id}</span>
                      <span>{ticket.createdAt}</span>
                    </div>

                    <h3 className="text-base font-semibold text-stone-900 mb-2 line-clamp-2">
                      {ticket.subject}
                    </h3>

                    <p className="text-xs text-stone-600 mb-4 line-clamp-3">
                      {ticket.description}
                    </p>

                    {/* Applicant & OPD unboxed list */}
                    <div className="pt-3 border-t border-stone-200 text-xs space-y-1 text-stone-600 mb-4">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="font-medium text-stone-800 truncate">{ticket.applicantName}</span>
                        <span className="text-stone-400">({ticket.applicantRole})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="truncate">{ticket.institution}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between pt-3 border-t border-stone-200 text-xs">
                      <div>
                        <span className="text-stone-500 block text-[11px]">Status</span>
                        <span className={`font-semibold ${
                          ticket.status === 'Selesai & Rekomendasi Terbit' 
                            ? 'text-emerald-700' 
                            : ticket.status === 'Dijadwalkan' 
                            ? 'text-blue-700' 
                            : 'text-amber-700'
                        }`}>
                          {ticket.status}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setTrackedTicket(ticket);
                          setSearchTicketQuery(ticket.id);
                          setActiveSubTab('track');
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 hover:border-stone-300 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <span>Lihat Telaah</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 2: AJUKAN TIKET BARU */}
        {activeSubTab === 'form' && (
          <div className="max-w-4xl mx-auto">
            {formSuccessMessage && (
              <div className="p-4 mb-6 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-sm flex items-start justify-between">
                <div>
                  <p className="font-semibold">{formSuccessMessage}</p>
                  <p className="text-xs text-emerald-800 mt-1">
                    Silakan simpan nomor tiket ini untuk memantau disposisi Pokja dan mengunduh berita acara rekomendasi.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveSubTab('track');
                  }}
                  className="px-3 py-1 text-xs font-medium bg-emerald-700 text-white rounded-md hover:bg-emerald-800 transition-colors cursor-pointer shrink-0 ml-4"
                >
                  Lacak Tiket Sekarang
                </button>
              </div>
            )}

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 sm:p-8">
              <div className="mb-6 pb-4 border-b border-stone-200">
                <h3 className="text-lg font-bold font-serif text-stone-900">
                  Formulir Permohonan Konsultasi & Pendampingan PBJ
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Isikan data secara lengkap dan benar sesuai dokumen perencanaan atau persiapan pengadaan SKPD Anda.
                </p>
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-6">
                {/* Bagian 1: Data Pemohon */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Nama Lengkap Pemohon *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Yohanes V. Liko, S.T."
                      value={formData.applicantName}
                      onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Peran / Jabatan Pemohon *
                    </label>
                    <select
                      value={formData.applicantRole}
                      onChange={(e) => setFormData({ ...formData, applicantRole: e.target.value as ConsultationTicket['applicantRole'] })}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
                    >
                      <option value="PPK">Pejabat Pembuat Komitmen (PPK)</option>
                      <option value="PPTK">Pejabat Pelaksana Teknis Kegiatan (PPTK)</option>
                      <option value="Pejabat Pengadaan">Pejabat Pengadaan</option>
                      <option value="Pokja Pemilihan">Pokja Pemilihan</option>
                      <option value="Penyedia / UMKM">Penyedia / Pelaku Usaha UMKM</option>
                      <option value="Masyarakat / Pengawas">Inspektorat / Pengawas APIP</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Instansi / SKPD / Nama Badan Usaha *
                    </label>
                    <select
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
                    >
                      {OPD_LIST.map((opd) => (
                        <option key={opd} value={opd}>{opd}</option>
                      ))}
                      <option value="Pelaku Usaha Swasta / Koperasi / UMKM Nagekeo">
                        Pelaku Usaha Swasta / Koperasi / UMKM Nagekeo
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="tel"
                      placeholder="0812-xxxx-xxxx"
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Alamat Email Dinas / Instansi
                    </label>
                    <input
                      type="email"
                      placeholder="nama@nagekeokab.go.id"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
                    />
                  </div>
                </div>

                {/* Bagian 2: Substansi Konsultasi */}
                <div className="pt-4 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Kategori Konsultasi PBJ *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as ConsultationCategory })}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
                    >
                      <option value="Perencanaan Pengadaan (RUP & SIRUP)">
                        Perencanaan Pengadaan (Penyusunan RUP & Validasi SiRUP LKPP)
                      </option>
                      <option value="Persiapan Pengadaan (KAK, Spesifikasi & HPS)">
                        Persiapan Pengadaan (Reviu KAK, Spesifikasi Teknis & Analisa HPS)
                      </option>
                      <option value="Pemilihan Penyedia (E-Katalog, Tender & Pengadaan Langsung)">
                        Pemilihan Penyedia (E-Purchasing E-Katalog V6, Tender, Pengadaan Langsung)
                      </option>
                      <option value="Pelaksanaan & Perubahan Kontrak (Addendum/SPK)">
                        Pelaksanaan Kontrak (Addendum Waktu/Biaya, Serah Terima PHO/FHO)
                      </option>
                      <option value="Mitigasi Risiko & Reviu APIP / Pendampingan">
                        Mitigasi Risiko Pengadaan & Probity Advice Bersama APIP
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Metode Konsultasi Yang Dikehendaki *
                    </label>
                    <select
                      value={formData.mode}
                      onChange={(e) => setFormData({ ...formData, mode: e.target.value as ConsultationMode })}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
                    >
                      <option value="Tatap Muka (Desk UKPBJ Setda Mbay)">
                        Tatap Muka (Desk UKPBJ Lantai 2 Setda Mbay)
                      </option>
                      <option value="Daring (Virtual / WhatsApp Call)">
                        Daring (Telekonferensi Virtual / WhatsApp Call)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Waktu Pelaksanaan Yang Diharapkan
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
                      />
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
                      >
                        <option value="09:00 WITA">09:00 WITA (Pagi)</option>
                        <option value="10:30 WITA">10:30 WITA (Pagi)</option>
                        <option value="13:30 WITA">13:30 WITA (Siang)</option>
                        <option value="14:30 WITA">14:30 WITA (Siang)</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Pokok Permasalahan / Judul Konsultasi *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Reviu Perhitungan HPS dan Komposisi PPN 12% Peningkatan Jalan Mbay"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Uraian Rinci Masalah & Pertanyaan Konsultasi *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Jelaskan secara rinci kendala teknis atau yuridis yang dihadapi dalam proses pengadaan agar Pokja UKPBJ dapat menyiapkan bahan telaahan yang tepat..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Nama Dokumen Lampiran (Draft KAK / HPS / Kontrak)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Draft_KAK_Pekerjaan_Drainase_Aesesa.pdf"
                      value={formData.attachmentName}
                      onChange={(e) => setFormData({ ...formData, attachmentName: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
                    />
                    <p className="text-[11px] text-stone-500 mt-1">
                      Berkas fisik dapat diserahkan saat konsultasi tatap muka di Desk UKPBJ Setda Mbay.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveSubTab('list')}
                    className="px-4 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#0F4C3A] hover:bg-[#0B3A2C] rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Kirim Permohonan Konsultasi
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SUBTAB 3: LACAK STATUS TIKET */}
        {activeSubTab === 'track' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Search Input Bar */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Masukkan Nomor Tiket (misal: TKT-NGK-2026-0842)..."
                  value={searchTicketQuery}
                  onChange={(e) => setSearchTicketQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearchTicket(searchTicketQuery);
                  }}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] uppercase font-mono"
                />
              </div>
              <button
                onClick={() => handleSearchTicket(searchTicketQuery)}
                className="w-full sm:w-auto px-5 py-2 text-xs font-semibold text-white bg-[#0F4C3A] hover:bg-[#0B3A2C] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Cari Status Tiket
              </button>
            </div>

            {/* Quick Ticket Selector for demo convenience */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 text-xs text-stone-600">
              <span className="font-semibold text-stone-700 whitespace-nowrap">Tiket Terkini:</span>
              {tickets.slice(0, 4).map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTrackedTicket(t);
                    setSearchTicketQuery(t.id);
                  }}
                  className={`px-2.5 py-1 rounded border transition-colors cursor-pointer whitespace-nowrap font-mono ${
                    trackedTicket?.id === t.id
                      ? 'bg-[#0F4C3A] text-white border-[#0F4C3A]'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {t.id}
                </button>
              ))}
            </div>

            {/* Tracked Ticket Detail Display */}
            {trackedTicket ? (
              <div className="bg-stone-50 border border-stone-200 rounded-xl overflow-hidden">
                {/* Header Strip */}
                <div className="p-6 bg-white border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                      <span className="font-mono font-bold text-lg text-[#0F4C3A]">{trackedTicket.id}</span>
                      <span aria-hidden="true">·</span>
                      <span>Registrasi: {trackedTicket.createdAt}</span>
                    </div>
                    <h3 className="text-xl font-bold font-serif text-stone-900">
                      {trackedTicket.subject}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPrintModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Cetak Berita Acara</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Status Timeline Workflow */}
                  <div className="p-4 bg-white border border-stone-200 rounded-lg">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-3">
                      Tahapan Layanan Konsultasi
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                      <div className="p-3 rounded-md bg-emerald-50 border border-emerald-200">
                        <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>1. Permohonan</span>
                        </div>
                        <p className="text-[11px] text-emerald-700">Terdaftar dalam sistem</p>
                      </div>

                      <div className={`p-3 rounded-md border ${
                        trackedTicket.status !== 'Menunggu Verifikasi'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-amber-50 border-amber-200 text-amber-800'
                      }`}>
                        <div className="flex items-center gap-1.5 text-xs font-bold mb-1">
                          {trackedTicket.status !== 'Menunggu Verifikasi' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                          )}
                          <span>2. Penelaahan</span>
                        </div>
                        <p className="text-[11px] opacity-90">Penugasan Pembina Pokja</p>
                      </div>

                      <div className={`p-3 rounded-md border ${
                        trackedTicket.status === 'Dijadwalkan' || trackedTicket.status === 'Selesai & Rekomendasi Terbit'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-stone-100 border-stone-200 text-stone-500'
                      }`}>
                        <div className="flex items-center gap-1.5 text-xs font-bold mb-1">
                          {trackedTicket.status === 'Dijadwalkan' || trackedTicket.status === 'Selesai & Rekomendasi Terbit' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                          )}
                          <span>3. Diskusi Desk</span>
                        </div>
                        <p className="text-[11px] opacity-90">Tatap Muka / Virtual</p>
                      </div>

                      <div className={`p-3 rounded-md border ${
                        trackedTicket.status === 'Selesai & Rekomendasi Terbit'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-stone-100 border-stone-200 text-stone-500'
                      }`}>
                        <div className="flex items-center gap-1.5 text-xs font-bold mb-1">
                          {trackedTicket.status === 'Selesai & Rekomendasi Terbit' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                          )}
                          <span>4. Rekomendasi</span>
                        </div>
                        <p className="text-[11px] opacity-90">Lembar Rekomendasi Terbit</p>
                      </div>
                    </div>
                  </div>

                  {/* Informational Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-stone-200 rounded-lg text-xs space-y-2">
                      <span className="font-semibold text-stone-900 block text-sm border-b border-stone-100 pb-1 mb-2">
                        Data Pemohon
                      </span>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Nama:</span>
                        <span className="font-medium text-stone-900">{trackedTicket.applicantName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Jabatan:</span>
                        <span className="font-medium text-stone-900">{trackedTicket.applicantRole}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Instansi:</span>
                        <span className="font-medium text-stone-900">{trackedTicket.institution}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Kontak WA:</span>
                        <span className="font-mono text-stone-900">{trackedTicket.contactNumber}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-white border border-stone-200 rounded-lg text-xs space-y-2">
                      <span className="font-semibold text-stone-900 block text-sm border-b border-stone-100 pb-1 mb-2">
                        Jadwal & Penugasan Konsultan
                      </span>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Kategori:</span>
                        <span className="font-medium text-stone-900 truncate max-w-[200px]">{trackedTicket.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Metode:</span>
                        <span className="font-medium text-stone-900">{trackedTicket.mode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Jadwal:</span>
                        <span className="font-semibold text-[#0F4C3A]">
                          {trackedTicket.preferredDate} ({trackedTicket.preferredTime})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Pembina Pokja:</span>
                        <span className="font-medium text-stone-900">
                          {trackedTicket.assignedAdvisor || 'Menunggu penetapan koordinator'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Uraian Masalah */}
                  <div className="p-4 bg-white border border-stone-200 rounded-lg">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                      Deskripsi Masalah Yang Dikonsultasikan
                    </span>
                    <p className="text-sm text-stone-700 leading-relaxed">
                      {trackedTicket.description}
                    </p>
                    {trackedTicket.attachmentName && (
                      <div className="mt-3 pt-2 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-600">
                        <FileText className="w-3.5 h-3.5 text-stone-400" />
                        <span>Lampiran Terkait: <strong>{trackedTicket.attachmentName}</strong></span>
                      </div>
                    )}
                  </div>

                  {/* Lokasi / Tautan Pertemuan */}
                  {trackedTicket.meetingLinkOrVenue && (
                    <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-lg text-xs text-stone-800">
                      <strong className="font-semibold text-stone-900 block mb-1">
                        Tempat / Akses Layanan Konsultasi:
                      </strong>
                      <p>{trackedTicket.meetingLinkOrVenue}</p>
                    </div>
                  )}

                  {/* Hasil Rekomendasi Resmi Pokja UKPBJ */}
                  {trackedTicket.recommendationPoints && (
                    <div className="p-5 bg-white border border-emerald-300 rounded-lg">
                      <div className="flex items-center gap-2 text-emerald-800 font-serif font-bold text-base mb-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        <span>Rekomendasi & Arahan Yuridis UKPBJ Nagekeo</span>
                      </div>
                      {trackedTicket.adviceNotes && (
                        <p className="text-xs text-stone-600 mb-3 italic">
                          "{trackedTicket.adviceNotes}"
                        </p>
                      )}
                      <ul className="space-y-2 text-xs text-stone-800">
                        {trackedTicket.recommendationPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="font-mono font-bold text-[#0F4C3A] shrink-0">{idx + 1}.</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center bg-stone-50 border border-stone-200 rounded-lg text-stone-500">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-stone-400" />
                <p className="font-semibold text-stone-700">Tiket Tidak Ditemukan</p>
                <p className="text-xs mt-1">Pastikan kode tiket yang dimasukkan tepat (contoh: TKT-NGK-2026-0842).</p>
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 4: FAQ REGULASI */}
        {activeSubTab === 'faq' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari regulasi, batasan anggaran pengadaan langsung, aturan e-katalog lokal, PPN 12%..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredFaqs.map((faq, i) => (
                <div key={i} className="p-5 bg-stone-50 border border-stone-200 rounded-lg">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F4C3A] uppercase tracking-wider mb-2">
                    <span>{faq.category}</span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span>Regulasi PBJ Pemerintah</span>
                  </div>
                  <h4 className="text-base font-bold text-stone-900 mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Cetak Berita Acara Rekomendasi Resmi */}
        {isPrintModalOpen && trackedTicket && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Pratinjau Lembar Rekomendasi Resmi
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0F4C3A] rounded-lg hover:bg-[#0B3A2C] transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Cetak Dokumen</span>
                  </button>
                  <button
                    onClick={() => setIsPrintModalOpen(false)}
                    className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Official Government Letterhead */}
              <div className="border border-stone-300 p-8 text-stone-900 bg-white">
                <div className="text-center border-b-2 border-stone-900 pb-4 mb-6">
                  <h4 className="text-sm font-bold tracking-widest uppercase">PEMERINTAH KABUPATEN NAGEKEO</h4>
                  <h3 className="text-base font-bold tracking-wider uppercase">SEKRETARIAT DAERAH</h3>
                  <h2 className="text-lg font-extrabold uppercase font-serif text-[#0F4C3A]">
                    BAGIAN PENGADAAN BARANG DAN JASA (UKPBJ)
                  </h2>
                  <p className="text-xs text-stone-600 mt-1">
                    Jalan Mayor M. Saleh No. 1, Kompleks Kantor Bupati, Mbay, Flores - NTT (86472)
                  </p>
                </div>

                <div className="text-center mb-6">
                  <h5 className="text-sm font-bold uppercase underline tracking-wider">
                    BERITA ACARA KONSULTASI & REKOMENDASI TEKNIS PBJ
                  </h5>
                  <p className="text-xs font-mono text-stone-600 mt-1">
                    Nomor Registrasi: {trackedTicket.id}
                  </p>
                </div>

                <div className="text-xs space-y-3 leading-relaxed mb-6">
                  <p>
                    Pada hari ini telah dilaksanakan sesi konsultasi pengadaan barang dan jasa pada Desk UKPBJ Sekretariat Daerah Kabupaten Nagekeo dengan rincian sebagai berikut:
                  </p>

                  <div className="grid grid-cols-3 gap-1 py-1 border-y border-stone-200">
                    <span className="font-semibold">Nama Pemohon</span>
                    <span className="col-span-2">: {trackedTicket.applicantName} ({trackedTicket.applicantRole})</span>
                    
                    <span className="font-semibold">Instansi / SKPD</span>
                    <span className="col-span-2">: {trackedTicket.institution}</span>
                    
                    <span className="font-semibold">Pokok Konsultasi</span>
                    <span className="col-span-2">: {trackedTicket.subject}</span>
                    
                    <span className="font-semibold">Kategori</span>
                    <span className="col-span-2">: {trackedTicket.category}</span>

                    <span className="font-semibold">Konsultan / Pokja</span>
                    <span className="col-span-2">: {trackedTicket.assignedAdvisor || 'Tim Pokja Pemilihan UKPBJ Nagekeo'}</span>
                  </div>

                  <div>
                    <h6 className="font-bold uppercase text-[11px] mb-1">I. Uraian Masalah & Hasil Pembahasan:</h6>
                    <p className="text-stone-700 pl-3">
                      {trackedTicket.description}
                    </p>
                  </div>

                  <div>
                    <h6 className="font-bold uppercase text-[11px] mb-1">II. Rekomendasi & Ketetapan Regulasi (Perpres 12/2021 & LKPP):</h6>
                    <ul className="list-decimal pl-7 space-y-1 text-stone-800">
                      {trackedTicket.recommendationPoints ? (
                        trackedTicket.recommendationPoints.map((pt, idx) => (
                          <li key={idx}>{pt}</li>
                        ))
                      ) : (
                        <li>Menunggu proses telaah mendalam bersama tim Pokja terkait sebelum penetapan dokumen final.</li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 grid grid-cols-2 text-center text-xs text-stone-800">
                  <div>
                    <p>Pemohon Konsultasi,</p>
                    <div className="h-16"></div>
                    <p className="font-bold underline">{trackedTicket.applicantName}</p>
                    <p className="text-[11px] text-stone-500">{trackedTicket.applicantRole}</p>
                  </div>
                  <div>
                    <p>Mbay, {trackedTicket.preferredDate}</p>
                    <p>Fasilitator / Pokja UKPBJ,</p>
                    <div className="h-16"></div>
                    <p className="font-bold underline">{trackedTicket.assignedAdvisor || 'Ignasius K. Meo, S.T., M.Eng.'}</p>
                    <p className="text-[11px] text-stone-500">NIP. 19780415 200501 1 008</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
