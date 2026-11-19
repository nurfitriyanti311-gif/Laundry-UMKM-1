// Menampilkan pilihan paket layanan utama (FT-01) beserta tarif per kg, lama pengerjaan, dan deskripsi resmi.

import { Check, Clock } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import { type KodeLayanan, type LayananUtama } from '../config';
import { formatRupiah } from '../lib/format';

interface KatalogLayananProps {
  daftarLayanan: readonly LayananUtama[];
  kodeTerpilih: KodeLayanan;
  onPilih: (kode: KodeLayanan) => void;
}

export function KatalogLayanan({
  daftarLayanan,
  kodeTerpilih,
  onPilih,
}: KatalogLayananProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, indeks: number) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      const berikutnya = (indeks + 1) % daftarLayanan.length;
      onPilih(daftarLayanan[berikutnya].kode);
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const sebelumnya = (indeks - 1 + daftarLayanan.length) % daftarLayanan.length;
      onPilih(daftarLayanan[sebelumnya].kode);
    }
  }

  return (
    <section aria-labelledby="judul-pilih-layanan" className="space-y-3">
      <div className="space-y-1">
        <h2 id="judul-pilih-layanan" className="text-lg font-semibold text-neutral-900">
          Pilih Layanan
        </h2>
        <p className="text-sm text-neutral-600">
          Pilih satu paket cucian yang Anda butuhkan.
        </p>
      </div>

      <div
        role="radiogroup"
        aria-labelledby="judul-pilih-layanan"
        className="grid grid-cols-1 gap-3"
      >
        {daftarLayanan.map((layanan, indeks) => {
          const terpilih = layanan.kode === kodeTerpilih;

          return (
            <button
              key={layanan.kode}
              type="button"
              role="radio"
              aria-checked={terpilih}
              onClick={() => onPilih(layanan.kode)}
              onKeyDown={(event) => handleKeyDown(event, indeks)}
              className={`min-h-[44px] w-full rounded-2xl border p-4 text-left transition-colors duration-200 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
                terpilih
                  ? 'border-blue-700 bg-blue-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-neutral-900">
                      {layanan.nama}
                    </span>
                    {terpilih && (
                      <span
                        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-700 text-white"
                        aria-hidden="true"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-600">{layanan.deskripsi}</p>
                </div>

                <div className="shrink-0 text-right">
                  <div className="text-base font-semibold text-neutral-900 tabular-nums whitespace-nowrap">
                    {formatRupiah(layanan.hargaPerKg)} / kg
                  </div>
                  <div className="mt-1 inline-flex items-center justify-end gap-1 text-sm text-neutral-600 tabular-nums whitespace-nowrap">
                    <Clock className="h-4 w-4 text-neutral-500" aria-hidden="true" />
                    <span>Selesai {layanan.durasiHari} hari</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
