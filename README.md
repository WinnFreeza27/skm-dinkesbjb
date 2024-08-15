# Aplikasi Survey Kepuasan Masyarakat

## Latar Belakang

Aplikasi ini dibuat untuk mempermudah pelaksanaan survey kepuasan masyarakat secara online. Dengan menggunakan aplikasi ini, proses pengumpulan dan analisis data survey menjadi lebih efisien dan terstruktur, sehingga dapat memberikan insight yang lebih baik mengenai tingkat kepuasan masyarakat.

## Teknologi yang Digunakan

- **NextJS**: Framework yang digunakan untuk membangun aplikasi ini dengan dukungan rendering sisi server (SSR) dan pembuatan aplikasi web yang cepat dan scalable.
- **Supabase**: Digunakan untuk pengelolaan data survey, termasuk pertanyaan dan jawaban dari responden. Supabase menyediakan backend yang tangguh dan integrasi yang mudah untuk manajemen data.
- **TailwindCSS + ShadcnUI**: Digunakan untuk membangun antarmuka pengguna (UI) yang responsif dan modern. TailwindCSS memberikan fleksibilitas dalam desain, sementara ShadcnUI menyediakan komponen-komponen UI yang sudah jadi.
- **Google Sheets API**: Digunakan untuk memberikan akses admin agar dapat melihat dan mengelola data survey dalam format sheet yang mudah dibaca dan dianalisis.

## Cara Menjalankan Proyek

1. **Clone repository**:
    ```bash
    git clone https://github.com/WinnFreeza27/skm-dinkesbjb
    cd skm-dinkesbjb
    ```

2. **Instal dependencies**:
    ```bash
    npm install
    ```

3. **Konfigurasi Environment Variables**:
   Buat file `.env.local` di root project dan tambahkan variabel-variabel berikut:
    ```
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    GOOGLE_SHEETS_API_KEY=your-google-sheets-api-key
    ```

4. **Menjalankan Aplikasi Secara Lokal**:
    ```bash
    npm run dev
    ```

5. **Build untuk Produksi**:
    ```bash
    npm run build
    ```

## Fitur Utama

- **Survey Online**: Pengguna dapat mengisi survey secara online melalui antarmuka yang intuitif.
- **Integrasi dengan Google Sheets**: Data survey dapat diakses dan dikelola oleh admin dalam format sheet melalui Google Sheets untuk kemudahan analisis lebih lanjut.
- **Pengelolaan Data Survey dengan Supabase**: Supabase digunakan untuk mengelola pertanyaan dan jawaban responden, memastikan data tersimpan dengan aman dan dapat diakses dengan mudah.
- **Desain Responsif**: Antarmuka yang dioptimalkan untuk tampilan di berbagai ukuran layar.

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan buat pull request atau hubungi saya melalui informasi kontak yang tersedia.

---

Tahapan pembuatan dashboard admin pada aplikasi sedang dikerjakan, nantinya admin bisa mengelola data langsung melalui aplikasi, tapi integrasi dengan sheet tetap akan tersedia untuk kebutuhan lainnya

i'll update soon.
