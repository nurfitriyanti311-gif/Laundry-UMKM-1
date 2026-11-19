// Mengumpulkan input nama pemesan, alamat penjemputan kondisional, dan catatan khusus (FT-05).

import { AlertCircle } from 'lucide-react';
import { type RefObject } from 'react';
import { type ErrorValidasiPesanan } from '../lib/whatsapp';

interface FormPemesanProps {
  namaPelanggan: string;
  alamatPenjemputan: string;
  catatanKhusus: string;
  antarJemputAktif: boolean;
  errors: ErrorValidasiPesanan;
  namaRef: RefObject<HTMLInputElement | null>;
  alamatRef: RefObject<HTMLTextAreaElement | null>;
  onUbahNama: (nilai: string) => void;
  onUbahAlamat: (nilai: string) => void;
  onUbahCatatan: (nilai: string) => void;
}

export function FormPemesan({
  namaPelanggan,
  alamatPenjemputan,
  catatanKhusus,
  antarJemputAktif,
  errors,
  namaRef,
  alamatRef,
  onUbahNama,
  onUbahAlamat,
  onUbahCatatan,
}: FormPemesanProps) {
  return (
    <section
      aria-labelledby="judul-data-pemesan"
      className="rounded-2xl bg-white p-4 sm:p-6"
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 id="judul-data-pemesan" className="text-lg font-semibold text-neutral-900">
            Data Pemesan
          </h2>
          <p className="text-sm text-neutral-600">
            Lengkapi data berikut untuk dikirim ke admin toko.
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="input-nama-pemesan"
            className="block text-sm font-medium text-neutral-900"
          >
            Nama Pemesan
          </label>
          <input
            ref={namaRef}
            id="input-nama-pemesan"
            name="nama"
            type="text"
            autoComplete="name"
            placeholder="Contoh: Budi Santoso"
            value={namaPelanggan}
            onChange={(event) => onUbahNama(event.target.value)}
            aria-invalid={Boolean(errors.nama)}
            aria-describedby={errors.nama ? 'error-nama-pemesan' : undefined}
            className={`min-h-[44px] w-full rounded-xl border bg-white px-4 py-2 text-base text-neutral-900 placeholder:text-neutral-500 transition-colors duration-200 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
              errors.nama ? 'border-red-700' : 'border-neutral-200'
            }`}
          />
          {errors.nama && (
            <div
              id="error-nama-pemesan"
              role="alert"
              className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800"
            >
              <AlertCircle className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{errors.nama}</span>
            </div>
          )}
        </div>

        {antarJemputAktif && (
          <div className="space-y-2">
            <label
              htmlFor="input-alamat-jemput"
              className="block text-sm font-medium text-neutral-900"
            >
              Alamat Penjemputan
            </label>
            <textarea
              ref={alamatRef}
              id="input-alamat-jemput"
              name="alamat"
              rows={3}
              autoComplete="street-address"
              placeholder="Contoh: Jl. Melati No. 12, RT 02 / RW 04"
              value={alamatPenjemputan}
              onChange={(event) => onUbahAlamat(event.target.value)}
              aria-invalid={Boolean(errors.alamat)}
              aria-describedby={
                errors.alamat ? 'bantuan-alamat-jemput error-alamat-jemput' : 'bantuan-alamat-jemput'
              }
              className={`w-full rounded-xl border bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-500 transition-colors duration-200 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
                errors.alamat ? 'border-red-700' : 'border-neutral-200'
              }`}
            />
            <p id="bantuan-alamat-jemput" className="text-sm text-neutral-600">
              Wajib diisi karena opsi Antar-Jemput aktif.
            </p>
            {errors.alamat && (
              <div
                id="error-alamat-jemput"
                role="alert"
                className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800"
              >
                <AlertCircle className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{errors.alamat}</span>
              </div>
            )}
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="input-catatan-khusus"
            className="block text-sm font-medium text-neutral-900"
          >
            Catatan Khusus (Opsional)
          </label>
          <textarea
            id="input-catatan-khusus"
            name="catatan"
            rows={2}
            placeholder="Contoh: Pisahkan baju putih atau bahan sutra"
            value={catatanKhusus}
            onChange={(event) => onUbahCatatan(event.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-500 transition-colors duration-200 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
          />
          <p className="text-sm text-neutral-600">
            Kosongkan jika tidak ada permintaan khusus.
          </p>
        </div>
      </div>
    </section>
  );
}
