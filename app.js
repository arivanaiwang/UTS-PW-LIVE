Untuk menambahkan statistik singkat ke dashboard yang menampilkan informasi dari basis data, seperti jumlah nelayan, total hasil tangkapan, dan total stok ikan, berikut adalah cara mengubah kode untuk menampilkan data tersebut:


---

1. Perbarui app.js untuk Menyediakan Data Statistik

Tambahkan rute untuk menangani statistik:

app.get('/dashboard', authMiddleware, (req, res) => {
  // Query untuk mendapatkan data statistik
  connection.query(
    'SELECT COUNT(*) AS jumlah_nelayan, SUM(hasil_tangkapan) AS total_tangkapan, SUM(stok_ikan) AS total_stok FROM nelayan',
    (err, results) => {
      if (err) throw err;
      
      // Kirim data ke halaman dashboard
      res.render('dashboard', {
        jumlahNelayan: results[0].jumlah_nelayan,
        totalTangkapan: results[0].total_tangkapan,
        totalStok: results[0].total_stok
      });
    }
  );
});

2. Perbarui Tampilan Dashboard (views/dashboard.html)

Gunakan template rendering sederhana atau langsung masukkan data jika Anda tidak menggunakan engine seperti EJS. Contoh menggunakan HTML sederhana:

<!DOCTYPE html>
<html>
<head>
  <title>Dashboard - Samudera Sejahtera</title>
</head>
<body>
  <h1>Dashboard</h1>
  <p>Jumlah Nelayan: <span id="jumlahNelayan"></span></p>
  <p>Total Hasil Tangkapan: <span id="totalTangkapan"></span></p>
  <p>Total Stok Ikan: <span id="totalStok"></span></p>

  <a href="/logout">Logout</a>

  <script>
    // Ambil data statistik dari server
    fetch('/stats')
      .then(response => response.json())
      .then(data => {
        document.getElementById('jumlahNelayan').innerText = data.jumlah_nelayan;
        document.getElementById('totalTangkapan').innerText = data.total_tangkapan;
        document.getElementById('totalStok').innerText = data.total_stok;
      })
      .catch(err => console.error(err));
  </script>
</body>
</html>


---

3. Tambahkan Endpoint Statistik di app.js

Untuk mengembalikan data statistik dalam format JSON:

app.get('/stats', authMiddleware, (req, res) => {
  connection.query(
    'SELECT COUNT(*) AS jumlah_nelayan, SUM(hasil_tangkapan) AS total_tangkapan, SUM(stok_ikan) AS total_stok FROM nelayan',
    (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    }
  );
});


---

Penjelasan Perubahan:

1. Rute /dashboard: Menampilkan data statistik menggunakan query MySQL. Hasilnya akan dirender di halaman dashboard.


2. Tampilan HTML (dashboard.html): Menampilkan data statistik dengan bantuan JavaScript yang mengambil data JSON dari server dan memperbarui elemen HTML.


3. Endpoint /stats: Memberikan data statistik dalam format JSON untuk diproses di sisi klien.




---

Sekarang dashboard akan menampilkan statistik yang diperbarui secara langsung, memberikan informasi singkat yang berguna untuk manajer perusahaan. Jika Anda ingin mengembangkan lebih lanjut, seperti membuat grafik, Anda bisa menggunakan pustaka seperti Chart.js.
