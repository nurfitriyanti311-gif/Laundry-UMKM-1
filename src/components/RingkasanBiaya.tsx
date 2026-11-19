// Menampilkan ringkasan biaya langsung (FT-04) dan tombol kirim pesanan ke WhatsApp (FT-06) untuk desktop dan ponsel.

import { MessageCircle } from 'lucide-react';
import { type MouseEvent } from 'react';
import { CONFIG, type LayananUtama } from '../config';
import { formatBerat, formatRupiah } from '../lib/format';
import { type HasilKalkulasi } from '../lib/kalkulator';

interface RingkasanBiayaProps {
  layanan: LayananUtama;
  hasil: HasilKalkulasi;
  antarJemput: boolean;
  pewangiPremium: boolean;
  tautanWhatsApp: string;
  onKlikKirim: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export function RingkasanBiaya({
  layanan,
  hasil,
  antarJemput,
  pewangiPremium,
  tautanWhatsApp,
  onKlikKirim,
}: RingkasanBiayaProps) {
  return (
    <>
      <aside
        aria-labelledby="judul-ringkasan-biaya"
        className="hidden lg:block lg:sticky lg:top-6"
      >
        <div className="space-y-6 rounded-2xl bg-white p-6">
          <div className="space-y-1">
            <h2 id="judul-ringkasan-biaya" className="text-lg font-semibold text-neutral-900">
              Ringkasan Biaya
            </h2>
            <p className="text-sm text-neutral-600">
              {hasil.beratValid
                ? `Dihitung untuk ${formatBerat(hasil.beratDitagih)} kg ditagih.`
                : 'Isi perkiraan berat untuk melihat estimasi.'}
            </p>
          </div>

          <div className="space-y-3 border-t border-b border-neutral-200 py-4 text-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-medium text-neutral-900">Biaya Layanan Utama</div>
                <div className="text-neutral-600">
                  {layanan.nama}
                  {hasil.beratValid ? ` (${formatBerat(hasil.beratDitagih)} kg)` : ''}
                </div>
              </div>
              <div className="font-semibold text-neutral-900 tabular-nums whitespace-nowrap">
                {formatRupiah(hasil.biayaUtama)}
              </div>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-medium text-neutral-900">Biaya Tambahan</div>
                {!antarJemput && !pewangiPremium && (
                  <div className="text-neutral-600">Tidak ada tambahan dipilih</div>
                )}
                {antarJemput && (
                  <div className="text-neutral-600">
                    Antar-Jemput
                    {hasil.beratValid ? ` (${formatRupiah(hasil.biayaAntarJemput)})` : ''}
                  </div>
                )}
                {pewangiPremium && (
                  <div className="text-neutral-600">
                    Pewangi Premium
                    {hasil.beratValid ? ` (${formatRupiah(hasil.biayaPewangi)})` : ''}
                  </div>
                )}
              </div>
              <div className="font-semibold text-neutral-900 tabular-nums whitespace-nowrap">
                {formatRupiah(hasil.biayaTambahan)}
              </div>
            </div>
          </div>

          <div className="flex items-baseline justify-between gap-4">
            <span className="text-base font-medium text-neutral-900">Total Estimasi</span>
            <span className="text-3xl font-semibold text-neutral-900 tabular-nums whitespace-nowrap">
              {formatRupiah(hasil.totalEstimasi)}
            </span>
          </div>

          <p className="text-sm text-neutral-600">{CONFIG.teksWajib.klausulEstimasi}</p>

          <a
            href={tautanWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onKlikKirim}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-base font-semibold text-white transition-colors duration-200 ease-out hover:bg-blue-800 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 whitespace-nowrap"
          >
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>Kirim ke WhatsApp</span>
          </a>
        </div>
      </aside>

      <div
        role="region"
        aria-label="Ringkasan biaya dan kirim pesanan"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)] lg:hidden"
      >
        <div className="mx-auto max-w-3xl space-y-2">
          <div className="flex items-center justify-between gap-3 text-sm text-neutral-600 tabular-nums">
            <span className="truncate">
              Utama: <strong className="font-medium text-neutral-900">{formatRupiah(hasil.biayaUtama)}</strong>
            </span>
            <span className="shrink-0">
              Tambahan: <strong className="font-medium text-neutral-900">{formatRupiah(hasil.biayaTambahan)}</strong>
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm text-neutral-600">Total Estimasi</div>
              <div className="text-xl font-semibold text-neutral-900 tabular-nums whitespace-nowrap">
                {formatRupiah(hasil.totalEstimasi)}
              </div>
            </div>

            <a
              href={tautanWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onKlikKirim}
              className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 ease-out hover:bg-blue-800 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Kirim ke WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
