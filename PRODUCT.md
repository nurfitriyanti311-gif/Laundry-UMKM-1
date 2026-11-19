# Dokumen Produk — LaundryCalc

Dokumen ini merangkum daftar fitur, prioritas, ketergantungan, dan keputusan bisnis dari PRD LaundryCalc & Catalog (v0.1).

## 1. Daftar Fitur

| Kode | Nama Fitur | Prioritas | Ketergantungan | Status |
| :--- | :--- | :--- | :--- | :--- |
| FT-01 | Tampilan Katalog & Durasi | Must Have | - | Selesai |
| FT-02 | Input Berat & Notifikasi Min. Charge | Must Have | FT-01 | Selesai |
| FT-03 | Opsi Add-on Terintegrasi | Must Have | FT-01, FT-02 | Selesai |
| FT-04 | Floating Price Summary | Must Have | FT-01, FT-02, FT-03 | Selesai |
| FT-05 | Form Data Pemesan | Must Have | FT-03 | Selesai |
| FT-06 | WhatsApp Deep Link Button | Must Have | FT-01, FT-02, FT-03, FT-04, FT-05 | Selesai |
| FT-07 | Info Jam Operasional Toko | Should Have | - | Selesai |

## 2. Ringkasan Aturan Bisnis dari PRD

- **BL-01 (Minimum Charge):** Berat ditagih adalah nilai terbesar antara `3,0` kg dan berat aktual yang dimasukkan (`maks(3,0; W_aktual)`). Berat aktual minimal `0,1` kg (tidak boleh `0` atau negatif).
- **BL-02 (Tarif Layanan & Tambahan):**
  - `L01` Cuci Lipat: `Rp 6.000`/kg (estimasi 3 hari).
  - `L02` Cuci Setrika: `Rp 8.000`/kg (estimasi 3 hari).
  - `L03` Cuci Setrika Ekspres: `Rp 15.000`/kg (estimasi 1 hari).
  - `T01` Antar-Jemput: `Rp 10.000` flat per pesanan (radius maksimal 5 km).
  - `T02` Pewangi Premium: `Rp 2.000`/kg dikalikan berat ditagih.
- **BL-03 (Pengiriman ke WhatsApp):** Validasi Nama Pelanggan wajib diisi, Alamat wajib diisi jika Antar-Jemput aktif, dan berat harus lebih dari `0`. Pesan disusun sesuai template PRD dan dikirim via `https://wa.me/<nomor>?text=<pesan>`.

## 3. Keputusan Klarifikasi PRD (Tahap 1)

1. **Format penulisan Rupiah:** Memakai spasi setelah `Rp`, contoh `Rp 50.000` (dipakai konsisten di tampilan antarmuka dan template pesan WhatsApp).
2. **Kondisi awal saat halaman dibuka:** Paket `Cuci Setrika` (`L02`) terpilih otomatis dan kolom berat cucian dalam keadaan kosong.
3. **Ketelitian input berat & pembulatan:** Menerima angka desimal kelipatan `0,1` kg (koma maupun titik), dan setiap hasil perkalian rupiah dibulatkan ke bilangan bulat rupiah terdekat.
4. **Nomor WhatsApp toko di konfigurasi:** Memakai nomor contoh berformat valid `6281234567890` di `src/config.ts` agar tautan WhatsApp dapat langsung diuji dan mudah diganti pemilik toko.
5. **Kolom alamat saat Antar-Jemput tidak aktif:** Disembunyikan dari layar dan otomatis terisi `"Antar Sendiri ke Toko"` pada template WhatsApp.
6. **Penamaan add-on Pewangi Premium:** Menggunakan label `"Pewangi Premium"` pada ringkasan serta template WhatsApp sesuai BL-02 dan JSON konfigurasi PRD, dengan catatan aroma `Downy Passion / Mystique`.
7. **Format jam operasional (FT-07):** Memakai format resmi pada Bagian 11 PRD (`08:00 - 20:00 WIB` dan `09:00 - 17:00 WIB`).
