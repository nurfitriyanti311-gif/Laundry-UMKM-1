// Menghitung berat ditagih (aturan minimum charge) serta rincian biaya layanan utama dan layanan tambahan.

import { CONFIG, type LayananUtama } from '../config';

export interface ParameterKalkulasi {
  layanan: LayananUtama;
  beratAktual: number | null;
  antarJemput: boolean;
  pewangiPremium: boolean;
}

export interface HasilKalkulasi {
  beratValid: boolean;
  beratAktual: number | null;
  beratDitagih: number;
  kenaMinimumCharge: boolean;
  biayaUtama: number;
  biayaAntarJemput: number;
  biayaPewangi: number;
  biayaTambahan: number;
  totalEstimasi: number;
}

export function hitungBeratDitagih(beratAktual: number): number {
  return Math.max(CONFIG.aturanBerat.minChargeKg, beratAktual);
}

export function hitungEstimasi(params: ParameterKalkulasi): HasilKalkulasi {
  const { layanan, beratAktual, antarJemput, pewangiPremium } = params;
  const beratValid =
    beratAktual !== null &&
    !Number.isNaN(beratAktual) &&
    beratAktual >= CONFIG.aturanBerat.minKg &&
    beratAktual <= CONFIG.aturanBerat.maksKg;

  if (!beratValid || beratAktual === null) {
    return {
      beratValid: false,
      beratAktual: null,
      beratDitagih: 0,
      kenaMinimumCharge: false,
      biayaUtama: 0,
      biayaAntarJemput: 0,
      biayaPewangi: 0,
      biayaTambahan: 0,
      totalEstimasi: 0,
    };
  }

  const beratDitagih = hitungBeratDitagih(beratAktual);
  const kenaMinimumCharge = beratAktual < CONFIG.aturanBerat.minChargeKg;
  const biayaUtama = Math.round(beratDitagih * layanan.hargaPerKg);
  const biayaAntarJemput = antarJemput ? CONFIG.layananTambahan.antarJemput.harga : 0;
  const biayaPewangi = pewangiPremium
    ? Math.round(beratDitagih * CONFIG.layananTambahan.pewangiPremium.harga)
    : 0;
  const biayaTambahan = biayaAntarJemput + biayaPewangi;
  const totalEstimasi = biayaUtama + biayaTambahan;

  return {
    beratValid: true,
    beratAktual,
    beratDitagih,
    kenaMinimumCharge,
    biayaUtama,
    biayaAntarJemput,
    biayaPewangi,
    biayaTambahan,
    totalEstimasi,
  };
}
