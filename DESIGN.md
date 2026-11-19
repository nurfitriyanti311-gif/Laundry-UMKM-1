# Dokumen Desain — LaundryCalc

Dokumen ini mencatat keputusan desain pengguna dan aturan tampilan yang dipakai di seluruh aplikasi.

## 1. Keputusan Desain (Tahap 2)

| Keputusan | Pilihan Dipakai | Alasan |
| :--- | :--- | :--- |
| Kesan visual | Ramah dan hangat (Plus Jakarta Sans) | Terbaca jelas di ponsel dan terasa akrab untuk layanan laundry harian. |
| Warna aksen | Biru (`blue`) | Memberi kesan bersih dan rapi untuk layanan binatu. |
| Sapaan pengguna | Anda | Sopan dan langsung ke maksud untuk seluruh pelanggan. |
| Susunan halaman | Satu halaman bergulir | Pelanggan menyelesaikan pilihan paket hingga kirim pesanan dalam satu alur cepat. |
| Posisi aksi utama | Bar menempel di bawah layar (ponsel) dan panel samping (desktop) | Memenuhi ringkasan biaya langsung (`FT-04`) dan memastikan tombol kirim terlihat tanpa menggulir di layar 360 x 740 px. |
| Gambar | Tanpa gambar | Mempercepat muat halaman di ponsel dan memusatkan perhatian ke tarif serta kalkulator. |

## 2. Keputusan Tampilan per Fitur

- **FT-01 (Katalog & Durasi):** Kartu pilihan berbentuk radio (`role="radiogroup"`) agar tarif, durasi pengerjaan (`1 hari` / `3 hari`), dan deskripsi paket langsung terbaca tanpa membuka dropdown.
- **FT-02 (Input Berat & Min. Charge):** Kolom input teks numerik (`inputMode="decimal"`) yang menerima tanda koma maupun titik, disertai kotak info berikon (`amber-50` / `amber-800`) yang muncul otomatis saat berat berada di bawah 3 kg.
- **FT-03 (Opsi Add-on):** Baris pilihan interaktif (`checkbox` / tombol toggle berarea sentuh minimal 44 x 44 px) untuk `Antar-Jemput` dan `Pewangi Premium`.
- **FT-04 (Floating Price Summary):** Bar menempel di bawah layar ponsel setinggi maksimal 15% tinggi layar yang menampilkan biaya layanan utama, biaya tambahan, total estimasi, dan tombol kirim; pada layar desktop (`lg:`), ringkasan lengkap tampil di kolom kanan.
- **FT-05 (Form Data Pemesan):** Kolom `Nama Pemesan` wajib, `Alamat Penjemputan` tampil dan wajib hanya saat `Antar-Jemput` aktif, serta `Catatan Khusus` opsional.
- **FT-06 (WhatsApp Deep Link):** Tautan resmi `https://wa.me/` yang divalidasi terlebih dahulu sebelum membuka tab baru.
- **FT-07 (Info Jam Operasional Toko):** Dua baris teks ringkas (`text-sm text-neutral-600 tabular-nums`) di bawah deskripsi header tanpa kapsul atau pemisah titik agar tampilan awal ponsel 360 x 740 px tetap ringkas.

## 3. Token Visual & Aturan Gaya

- **Permukaan:** Latar halaman `bg-neutral-50`, kartu dan panel `bg-white`, tanpa kartu bersarang.
- **Garis tepi & sudut:** Garis tepi `border-neutral-200` untuk input, pemisah, dan kartu tidak terpilih; sudut `rounded-2xl` (kartu/panel), `rounded-xl` (tombol/input), `rounded-full` (badge).
- **Warna:** Teks utama `text-neutral-900`, pendukung `text-neutral-600`, placeholder `text-neutral-500`, tombol utama `bg-blue-700 hover:bg-blue-800 text-white`, item terpilih `border-blue-700 bg-blue-50`, cincin fokus `focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2`.
- **Tipografi:** `@fontsource/plus-jakarta-sans` bobot 400, 500, 600. Ukuran minimal 14 px (`text-sm`), isi input minimal 16 px (`text-base`), angka memakai `tabular-nums`.
- **Format angka & teks:** Rupiah memakai spasi (`Rp 50.000`), desimal memakai koma tanpa nol di belakang (`4,5` dan `3`).
