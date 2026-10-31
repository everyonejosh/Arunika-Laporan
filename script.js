const API_URL = "https://3vr7g5m2re.execute-api.us-east-1.amazonaws.com/permintaan";

const form = document.getElementById("form-laporan");
const hasil = document.getElementById("hasil");
const tombol = document.getElementById("tombol");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  tombol.disabled = true;
  tombol.textContent = "Mengirim...";
  hasil.className = "";
  hasil.textContent = "";

  const payload = {
    nama: document.getElementById("nama").value,
    lokasi: document.getElementById("lokasi").value,
    deskripsi: document.getElementById("deskripsi").value,
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (res.ok) {
      hasil.className = "ok";
      hasil.textContent = "Laporan diterima. Nomor tiket Anda: " + data.tiket;
      form.reset();
    } else {
      hasil.className = "gagal";
      hasil.textContent = "Gagal: " + (data.error || data.pesan || "terjadi kesalahan");
    }
  } catch (err) {
    hasil.className = "gagal";
    hasil.textContent = "Tidak dapat terhubung ke server.";
  } finally {
    tombol.disabled = false;
    tombol.textContent = "Kirim Laporan";
  }
});
