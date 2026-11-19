// Menangani input perkiraan berat cucian dan menampilkan pemberitahuan aturan minimum charge 3 kg (FT-02).

import { AlertCircle, Info } from 'lucide-react';
import { type RefObject } from 'react';
import { CONFIG } from '../config';
import { formatBerat } from '../lib/format';

interface InputBeratProps {
  nilaiRaw: string;
  beratAktual: number | null;
  beratDitagih: number;
  kenaMinimumCharge: boolean;
  error?: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onUbah: (nilaiBaru: string) => void;
}

export function InputBerat({
  nilaiRaw,
  beratAktual,
  beratDitagih,
  kenaMinimumCharge,
  error,
  inputRef,
  onUbah,
}: InputBeratProps) {
  const deskripsiId = 'bantuan-berat-cucian';
  const errorId = 'error-berat-cucian';

  return (
    <section
      aria-labelledby="judul-berat-cucian"
      className="rounded-2xl bg-white p-4 sm:p-6"
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 id="judul-berat-cucian" className="text-lg font-semibold text-neutral-900">
            Berat Cucian
          </h2>
          <p className="text-sm text-neutral-600">
            Masukkan perkiraan berat cucian Anda dalam kilogram.
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="input-berat-cucian"
            className="block text-sm font-medium text-neutral-900"
          >
            Perkiraan Berat (kg)
          </label>
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              id="input-berat-cucian"
              name="berat"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="Contoh: 3,5"
              value={nilaiRaw}
              onChange={(event) => onUbah(event.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `${deskripsiId} ${errorId}` : deskripsiId}
              className={`min-h-[44px] w-full rounded-xl border bg-white px-4 py-2 text-base text-neutral-900 tabular-nums placeholder:text-neutral-500 transition-colors duration-200 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
                error ? 'border-red-700' : 'border-neutral-200'
              }`}
            />
            <span
              className="pointer-events-none absolute right-4 text-sm font-medium text-neutral-600"
              aria-hidden="true"
            >
              kg
            </span>
          </div>
          <p id={deskripsiId} className="text-sm text-neutral-600">
            Isi angka desimal, minimal {formatBerat(CONFIG.aturanBerat.minKg)} kg.
          </p>
        </div>

        {kenaMinimumCharge && beratAktual !== null && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-800"
          >
            <Info className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>
              Berat Anda <span className="font-semibold tabular-nums">{formatBerat(beratAktual)} kg</span>.
              Ketentuan minimum charge <span className="font-semibold tabular-nums">{formatBerat(beratDitagih)} kg</span> diberlakukan sehingga biaya dihitung untuk {formatBerat(beratDitagih)} kg.
            </p>
          </div>
        )}

        {error && (
          <div
            id={errorId}
            role="alert"
            className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800"
          >
            <AlertCircle className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </section>
  );
}
