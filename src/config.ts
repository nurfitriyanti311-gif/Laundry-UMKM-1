// Menyimpan seluruh data bisnis resmi dari PRD dan pilihan desain aplikasi LaundryCalc.

export type KodeLayanan = 'L01' | 'L02' | 'L03';

export interface LayananUtama {
  kode: KodeLayanan;
  nama: string;
  hargaPerKg: number;
  durasiHari: number;
  deskripsi: string;
}

export interface LayananTambahanItem {
  kode: 'T01' | 'T02';
  nama: string;
  harga: number;
  tipeHitung: 'flat' | 'per_billed_kg';
  catatan: string;
}

export const CONFIG = {
  infoToko: {
    namaAplikasi: 'LaundryCalc',
    namaToko: 'Laundry UMKM',
    nomorWhatsApp: '6281234567890',
    radiusJemputMaksKm: 5,
  },
  aturanBerat: {
    minKg: 0.1,
    maksKg: 500,
    minChargeKg: 3.0,
    langkahKg: 0.1,
  },
  keadaanAwal: {
    kodeLayananDefault: 'L02' as KodeLayanan,
    beratAwal: '',
  },
  layananUtama: [
    {
      kode: 'L01',
      nama: 'Cuci Lipat',
      hargaPerKg: 6000,
      durasiHari: 3,
      deskripsi: 'Dicuci, dikeringkan, dilipat tanpa setrika (Min. charge 3 kg)',
    },
    {
      kode: 'L02',
      nama: 'Cuci Setrika',
      hargaPerKg: 8000,
      durasiHari: 3,
      deskripsi: 'Dicuci, disetrika, dilipat rapi (Min. charge 3 kg)',
    },
    {
      kode: 'L03',
      nama: 'Cuci Setrika Ekspres',
      hargaPerKg: 15000,
      durasiHari: 1,
      deskripsi: 'Sama dengan Cuci Setrika, selesai besok (Min. charge 3 kg)',
    },
  ] satisfies LayananUtama[],
  layananTambahan: {
    antarJemput: {
      kode: 'T01',
      nama: 'Antar-Jemput',
      harga: 10000,
      tipeHitung: 'flat',
      catatan: 'Area penjemputan radius max 5 km',
    } satisfies LayananTambahanItem,
    pewangiPremium: {
      kode: 'T02',
      nama: 'Pewangi Premium',
      harga: 2000,
      tipeHitung: 'per_billed_kg',
      catatan: 'Aroma mewah pilihan tahan lama (Downy Passion / Mystique)',
    } satisfies LayananTambahanItem,
  },
  teksWajib: {
    klausulEstimasi:
      'Total di atas adalah estimasi awal. Berat pasti akan ditimbang kembali saat pakaian diterima oleh kasir/kurir laundry.',
    alamatAntarSendiri: 'Antar Sendiri ke Toko',
  },
} as const;
