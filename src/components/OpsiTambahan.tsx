// Menampilkan opsi layanan tambahan Antar-Jemput dan Pewangi Premium (FT-03).

import { Check } from 'lucide-react';
import { CONFIG } from '../config';
import { formatRupiah } from '../lib/format';

interface OpsiTambahanProps {
  antarJemput: boolean;
  pewangiPremium: boolean;
  onToggleAntarJemput: () => void;
  onTogglePewangiPremium: () => void;
}

export function OpsiTambahan({
  antarJemput,
  pewangiPremium,
  onToggleAntarJemput,
  onTogglePewangiPremium,
}: OpsiTambahanProps) {
  const { antarJemput: itemAntarJemput, pewangiPremium: itemPewangi } =
    CONFIG.layananTambahan;

  return (
    <section
      aria-labelledby="judul-layanan-tambahan"
      className="rounded-2xl bg-white p-4 sm:p-6"
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 id="judul-layanan-tambahan" className="text-lg font-semibold text-neutral-900">
            Layanan Tambahan
          </h2>
          <p className="text-sm text-neutral-600">
            Tambahkan pengantaran atau pewangi sesuai kebutuhan Anda.
          </p>
        </div>

        <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
          <button
            type="button"
            role="checkbox"
            aria-checked={antarJemput}
            onClick={onToggleAntarJemput}
            className={`flex min-h-[56px] w-full items-start justify-between gap-4 px-3 py-3 text-left transition-colors duration-200 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
              antarJemput ? 'bg-blue-50' : 'bg-white hover:bg-neutral-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors duration-150 ${
                  antarJemput
                    ? 'border-blue-700 bg-blue-700 text-white'
                    : 'border-neutral-300 bg-white'
                }`}
              >
                {antarJemput && <Check className="h-3.5 w-3.5" />}
              </span>
              <div className="space-y-1">
                <div className="text-base font-medium text-neutral-900">
                  {itemAntarJemput.nama}
                </div>
                <div className="text-sm text-neutral-600">{itemAntarJemput.catatan}</div>
              </div>
            </div>
            <span className="shrink-0 text-sm font-semibold text-neutral-900 tabular-nums whitespace-nowrap">
              +{formatRupiah(itemAntarJemput.harga)}
            </span>
          </button>

          <button
            type="button"
            role="checkbox"
            aria-checked={pewangiPremium}
            onClick={onTogglePewangiPremium}
            className={`flex min-h-[56px] w-full items-start justify-between gap-4 px-3 py-3 text-left transition-colors duration-200 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
              pewangiPremium ? 'bg-blue-50' : 'bg-white hover:bg-neutral-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors duration-150 ${
                  pewangiPremium
                    ? 'border-blue-700 bg-blue-700 text-white'
                    : 'border-neutral-300 bg-white'
                }`}
              >
                {pewangiPremium && <Check className="h-3.5 w-3.5" />}
              </span>
              <div className="space-y-1">
                <div className="text-base font-medium text-neutral-900">
                  {itemPewangi.nama}
                </div>
                <div className="text-sm text-neutral-600">{itemPewangi.catatan}</div>
              </div>
            </div>
            <span className="shrink-0 text-sm font-semibold text-neutral-900 tabular-nums whitespace-nowrap">
              +{formatRupiah(itemPewangi.harga)} / kg ditagih
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
