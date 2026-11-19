// Mengelola alur pemesanan satu halaman LaundryCalc dari pemilihan layanan hingga pengiriman ke WhatsApp.

import { type FormEvent, type MouseEvent, useMemo, useRef, useState } from 'react';
import { FormPemesan } from './components/FormPemesan';
import { InfoJamOperasional } from './components/InfoJamOperasional';
import { InputBerat } from './components/InputBerat';
import { KatalogLayanan } from './components/KatalogLayanan';
import { OpsiTambahan } from './components/OpsiTambahan';
import { RingkasanBiaya } from './components/RingkasanBiaya';
import { CONFIG, type KodeLayanan } from './config';
import { parseBeratInput } from './lib/format';
import { hitungEstimasi } from './lib/kalkulator';
import {
  buatTautanWhatsApp,
  type ErrorValidasiPesanan,
  validasiPesanan,
} from './lib/whatsapp';

export default function App() {
  const [kodeLayanan, setKodeLayanan] = useState<KodeLayanan>(
    CONFIG.keadaanAwal.kodeLayananDefault
  );
  const [beratRaw, setBeratRaw] = useState<string>(CONFIG.keadaanAwal.beratAwal);
  const [antarJemput, setAntarJemput] = useState<boolean>(false);
  const [pewangiPremium, setPewangiPremium] = useState<boolean>(false);
  const [namaPelanggan, setNamaPelanggan] = useState<string>('');
  const [alamatPenjemputan, setAlamatPenjemputan] = useState<string>('');
  const [catatanKhusus, setCatatanKhusus] = useState<string>('');
  const [errors, setErrors] = useState<ErrorValidasiPesanan>({});

  const beratRef = useRef<HTMLInputElement>(null);
  const namaRef = useRef<HTMLInputElement>(null);
  const alamatRef = useRef<HTMLTextAreaElement>(null);
  const waTriggerRef = useRef<HTMLAnchorElement>(null);

  const layananTerpilih = useMemo(() => {
    return (
      CONFIG.layananUtama.find((item) => item.kode === kodeLayanan) ??
      CONFIG.layananUtama[0]
    );
  }, [kodeLayanan]);

  const beratAktual = useMemo(() => parseBeratInput(beratRaw), [beratRaw]);

  const hasilKalkulasi = useMemo(
    () =>
      hitungEstimasi({
        layanan: layananTerpilih,
        beratAktual,
        antarJemput,
        pewangiPremium,
      }),
    [layananTerpilih, beratAktual, antarJemput, pewangiPremium]
  );

  const tautanWhatsApp = useMemo(() => {
    if (!hasilKalkulasi.beratValid || namaPelanggan.trim() === '') {
      return '#kirim-pesanan';
    }
    if (antarJemput && alamatPenjemputan.trim() === '') {
      return '#kirim-pesanan';
    }
    return buatTautanWhatsApp({
      layanan: layananTerpilih,
      beratAktual,
      antarJemput,
      pewangiPremium,
      namaPelanggan,
      alamatPenjemputan,
      catatanKhusus,
      hasil: hasilKalkulasi,
    });
  }, [
    hasilKalkulasi,
    layananTerpilih,
    beratAktual,
    antarJemput,
    pewangiPremium,
    namaPelanggan,
    alamatPenjemputan,
    catatanKhusus,
  ]);

  function jalankanValidasiDanFokus(): boolean {
    const hasilValidasi = validasiPesanan({
      beratRaw,
      beratAktual,
      antarJemput,
      namaPelanggan,
      alamatPenjemputan,
    });
    setErrors(hasilValidasi);

    if (hasilValidasi.berat) {
      beratRef.current?.focus();
      return false;
    }
    if (hasilValidasi.nama) {
      namaRef.current?.focus();
      return false;
    }
    if (hasilValidasi.alamat) {
      alamatRef.current?.focus();
      return false;
    }
    return true;
  }

  function handleKlikKirim(event: MouseEvent<HTMLAnchorElement>) {
    if (!jalankanValidasiDanFokus()) {
      event.preventDefault();
    }
  }

  function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (jalankanValidasiDanFokus()) {
      waTriggerRef.current?.click();
    }
  }

  function handleUbahBerat(nilaiBaru: string) {
    setBeratRaw(nilaiBaru);
    if (errors.berat) {
      setErrors((prev) => ({ ...prev, berat: undefined }));
    }
  }

  function handleUbahNama(nilaiBaru: string) {
    setNamaPelanggan(nilaiBaru);
    if (errors.nama) {
      setErrors((prev) => ({ ...prev, nama: undefined }));
    }
  }

  function handleUbahAlamat(nilaiBaru: string) {
    setAlamatPenjemputan(nilaiBaru);
    if (errors.alamat) {
      setErrors((prev) => ({ ...prev, alamat: undefined }));
    }
  }

  function handleToggleAntarJemput() {
    setAntarJemput((prev) => {
      const nilaiBaru = !prev;
      if (!nilaiBaru && errors.alamat) {
        setErrors((errPrev) => ({ ...errPrev, alamat: undefined }));
      }
      return nilaiBaru;
    });
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-6 lg:py-8">
        <header className="mb-6 space-y-1">
          <h1 className="text-2xl font-semibold text-neutral-900">
            {CONFIG.infoToko.namaToko}
          </h1>
          <p className="text-sm text-neutral-600">
            Hitung estimasi biaya cucian Anda dan kirim pesanan ke WhatsApp.
          </p>
          <InfoJamOperasional
            jamBuka={CONFIG.infoToko.jamBuka}
            jamJemput={CONFIG.infoToko.jamJemput}
          />
        </header>

        <form onSubmit={handleSubmitForm} noValidate>
          <a
            ref={waTriggerRef}
            href={tautanWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden"
          >
            Kirim
          </a>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
            <main className="space-y-6 lg:col-span-7">
              <KatalogLayanan
                daftarLayanan={CONFIG.layananUtama}
                kodeTerpilih={kodeLayanan}
                onPilih={setKodeLayanan}
              />

              <InputBerat
                nilaiRaw={beratRaw}
                beratAktual={beratAktual}
                beratDitagih={hasilKalkulasi.beratDitagih}
                kenaMinimumCharge={hasilKalkulasi.kenaMinimumCharge}
                error={errors.berat}
                inputRef={beratRef}
                onUbah={handleUbahBerat}
              />

              <OpsiTambahan
                antarJemput={antarJemput}
                pewangiPremium={pewangiPremium}
                onToggleAntarJemput={handleToggleAntarJemput}
                onTogglePewangiPremium={() => setPewangiPremium((prev) => !prev)}
              />

              <FormPemesan
                namaPelanggan={namaPelanggan}
                alamatPenjemputan={alamatPenjemputan}
                catatanKhusus={catatanKhusus}
                antarJemputAktif={antarJemput}
                errors={errors}
                namaRef={namaRef}
                alamatRef={alamatRef}
                onUbahNama={handleUbahNama}
                onUbahAlamat={handleUbahAlamat}
                onUbahCatatan={setCatatanKhusus}
              />

              <p className="text-sm text-neutral-600 lg:hidden">
                {CONFIG.teksWajib.klausulEstimasi}
              </p>

              <div className="h-24 lg:hidden" aria-hidden="true" />
            </main>

            <div className="lg:col-span-5">
              <RingkasanBiaya
                layanan={layananTerpilih}
                hasil={hasilKalkulasi}
                antarJemput={antarJemput}
                pewangiPremium={pewangiPremium}
                tautanWhatsApp={tautanWhatsApp}
                onKlikKirim={handleKlikKirim}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
