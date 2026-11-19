// Menyediakan fungsi pemformatan tunggal untuk nominal Rupiah, angka berat desimal, dan pembacaan input berat.

const formatterRibuan = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 0,
});

export function formatRupiah(nominal: number): string {
  const bulat = Math.round(nominal);
  return `Rp ${formatterRibuan.format(bulat)}`;
}

export function formatBerat(kg: number): string {
  const bersih = Math.round(kg * 100) / 100;
  if (Number.isInteger(bersih)) {
    return String(bersih);
  }
  return String(bersih).replace('.', ',');
}

export function parseBeratInput(raw: string): number | null {
  const dibersihkan = raw.trim().replace(',', '.');
  if (dibersihkan === '') {
    return null;
  }
  if (!/^-?\d+(\.\d+)?$/.test(dibersihkan)) {
    return Number.NaN;
  }
  const angka = Number(dibersihkan);
  return Number.isFinite(angka) ? angka : Number.NaN;
}
