# Sistem Pelaporan Kerusakan Fasilitas - PT Arunika Teknologi

Website pelaporan kerusakan fasilitas berbasis **serverless architecture** di AWS Academy Learner Lab. Karyawan mengirim laporan lewat browser, laporan diberi nomor tiket unik, masuk antrean, diproses otomatis, lalu administrator menerima email.

## Website

https://everyonejosh.github.io/Arunika-Laporan/

## Alur Sistem

```
GitHub Pages (website)
      |
      v
Amazon API Gateway   POST /permintaan
      |
      v
AWS Lambda PENERIMA  (validasi data, buat nomor tiket)
      |
      v
Amazon SQS           (antrean laporan)
      |
      v
AWS Lambda PEMROSES  (dipicu pesan di antrean)
      |
      v
Amazon SNS           (publikasi notifikasi)
      |
      v
Email Administrator  (nomor tiket, nama, lokasi, deskripsi)
```

## Komponen

| Komponen | Fungsi |
|---|---|
| GitHub Pages | Hosting website statis (HTML, CSS, JavaScript) |
| Amazon API Gateway (HTTP API) | Pintu masuk `POST /permintaan`, dengan CORS |
| AWS Lambda PENERIMA | Memeriksa kelengkapan data, membuat nomor tiket `TKT-XXXXXX`, mengirim laporan ke SQS |
| Amazon SQS | Antrean laporan, laporan tetap tersimpan saat pemroses dihentikan |
| AWS Lambda PEMROSES | Dijalankan otomatis oleh pesan di SQS, lalu mengirim notifikasi ke SNS |
| Amazon SNS | Mengirim email ke administrator (subscriber terkonfirmasi) |

Tidak ada Amazon EC2 maupun server yang dikelola manual.

## Struktur Repository

```
.
├── index.html   # website (HTML, CSS, dan JavaScript dalam satu file)
└── README.md    # dokumentasi
```

## Format Data

Permintaan ke API:

```json
{
  "nama": "Andi",
  "lokasi": "Ruang Administrasi",
  "deskripsi": "Komputer tidak bisa menyala"
}
```

Respons sukses:

```json
{
  "pesan": "Laporan diterima",
  "tiket": "TKT-A8D210"
}
```

## Alur Kerja Git

```bash
git add .
git commit -m "pesan perubahan"
git push      # kirim ke GitHub
git pull      # ambil versi terbaru
```

Perubahan di branch `main` otomatis diterapkan ke GitHub Pages.

## Pengujian Keandalan

1. Nonaktifkan trigger SQS pada Lambda PEMROSES.
2. Kirim beberapa laporan: tiket tetap terbit dan pesan menunggu di antrean.
3. Aktifkan kembali trigger: laporan yang menunggu diproses dan email diterima.
