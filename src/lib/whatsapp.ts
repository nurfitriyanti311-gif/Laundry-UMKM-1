// Memvalidasi formulir pemesanan dan menyusun pesan serta tautan WhatsApp sesuai template resmi PRD.

import { CONFIG, type LayananUtama } from '../config';
import { formatBerat, formatRupiah } from './format';
import { type HasilKalkulasi } from './kalkulator';

export type BidangError = 'berat' | 'nama' | 'alamat';

export interface ErrorValidasiPesanan {
  berat?: string;
  nama?: string;
  alamat?: string;
}

export interface DataPesanan {
  layanan: LayananUtama;
  beratAktual: number | null;
  antarJemput: boolean;
  pewangiPremium: boolean;
  namaPelanggan: string;
  alamatPenjemputan: string;
  catatanKhusus: string;
  hasil: HasilKalkulasi;
}

export function validasiPesanan(params: {
  beratRaw: string;
  beratAktual: number | null;
  antarJemput: boolean;
  namaPelanggan: string;
  alamatPenjemputan: string;
}): ErrorValidasiPesanan {
  const errors: ErrorValidasiPesanan = {};
  const { beratRaw, beratAktual, antarJemput, namaPelanggan, alamatPenjemputan } = params;

  if (beratRaw.trim() === '') {
    errors.berat = 'Masukkan estimasi berat cucian minimal 0,1 kg, contoh 3,5.';
  } else if (beratAktual === null || Number.isNaN(beratAktual)) {
    errors.berat = 'Masukkan angka berat yang valid memakai angka dan koma, contoh 2,5.';
  } else if (beratAktual < CONFIG.aturanBerat.minKg) {
    errors.berat = 'Berat cucian harus minimal 0,1 kg, contoh 2,5.';
  } else if (beratAktual > CONFIG.aturanBerat.maksKg) {
    errors.berat = `Berat cucian maksimal ${CONFIG.aturanBerat.maksKg} kg per pesanan, contoh 15.`;
  }

  if (namaPelanggan.trim() === '') {
    errors.nama = 'Isi nama pemesan terlebih dahulu, contoh Budi Santoso.';
  }

  if (antarJemput && alamatPenjemputan.trim() === '') {
    errors.alamat = 'Isi alamat penjemputan lengkap, contoh Jl. Melati No. 12, RT 02.';
  }

  return errors;
}

export function susunPesanWhatsApp(data: DataPesanan): string {
  const {
    layanan,
    beratAktual,
    antarJemput,
    pewangiPremium,
    namaPelanggan,
    alamatPenjemputan,
    catatanKhusus,
    hasil,
  } = data;

  const namaBersih = namaPelanggan.trim();
  const alamatTampil = antarJemput
    ? alamatPenjemputan.trim()
    : CONFIG.teksWajib.alamatAntarSendiri;
  const catatanTampil = catatanKhusus.trim() || '-';
  const beratAktualTampil = beratAktual !== null ? formatBerat(beratAktual) : '0';
  const beratDitagihTampil = formatBerat(hasil.beratDitagih);

  const teksAntarJemput = antarJemput
    ? `Ya (+${formatRupiah(hasil.biayaAntarJemput)})`
    : 'Tidak';
  const teksPewangi = pewangiPremium
    ? `Ya (+${formatRupiah(hasil.biayaPewangi)})`
    : 'Tidak';

  return [
    'Halo Admin Laundry, saya ingin memesan layanan laundry dengan rincian berikut:',
    '',
    `*Nama:* ${namaBersih}`,
    `*Layanan Utama:* ${layanan.nama}`,
    `*Estimasi Berat:* ${beratAktualTampil} kg (Berat Ditagih: ${beratDitagihTampil} kg)`,
    '*Layanan Tambahan:*',
    `- Antar-Jemput: ${teksAntarJemput}`,
    `- Pewangi Premium: ${teksPewangi}`,
    '',
    `*Alamat Penjemputan:* ${alamatTampil}`,
    `*Catatan Khusus:* ${catatanTampil}`,
    '',
    `*Estimasi Total Biaya:* *${formatRupiah(hasil.totalEstimasi)}*`,
    '',
    `_(Catatan: ${CONFIG.teksWajib.klausulEstimasi})_`,
    '',
    'Mohon konfirmasi pesanan dan ketersediaan jadwalnya. Terima kasih!',
  ].join('\n');
}

export function buatTautanWhatsApp(data: DataPesanan): string {
  const pesan = susunPesanWhatsApp(data);
  return `https://wa.me/${CONFIG.infoToko.nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;
}
