<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
include '../config.php';

// Coba baca JSON input (jika ada)
$jsonInput = json_decode(file_get_contents("php://input"));

// Cek apakah data dikirim via JSON atau form-data
if ($jsonInput && isset($jsonInput->makanan)) {
    // ✅ DATA DARI JSON (application/json)
    $makanan    = $jsonInput->makanan;
    $harga      = $jsonInput->harga;
    $deskripsi  = $jsonInput->deskripsi;
    $gambar     = $jsonInput->gambar; // Berupa URL

} else {
    // ✅ DATA DARI FORM-DATA (multipart/form-data)
    $makanan    = $_POST['makanan'] ?? '';
    $harga      = $_POST['harga'] ?? '';
    $deskripsi  = $_POST['deskripsi'] ?? '';
    $gambar     = '';

    // Cek apakah gambar dikirim via upload file
    if (!empty($_FILES['gambar_file']['name'])) {
        $namaFile = basename($_FILES['gambar_file']['name']);
        $targetDir = "../uploads/";
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }
        $targetPath = $targetDir . $namaFile;

        if (move_uploaded_file($_FILES['gambar_file']['tmp_name'], $targetPath)) {
            $gambar = "uploads/" . $namaFile;
        } else {
            echo json_encode(["error" => "Gagal upload gambar"]);
            exit;
        }
    } elseif (!empty($_POST['gambar_text'])) {
        // Alternatif: Kirim URL gambar dari form
        $gambar = $_POST['gambar_text'];
    } else {
        echo json_encode(["error" => "Gambar tidak ditemukan"]);
        exit;
    }
}

// Validasi semua field
if (empty($makanan) || empty($harga) || empty($deskripsi) || empty($gambar)) {
    echo json_encode(["error" => "Semua field wajib diisi"]);
    exit;
}

// Insert ke database
$query = "INSERT INTO produk (makanan, gambar, harga, deskripsi) VALUES (?, ?, ?, ?)";
$stmt = mysqli_prepare($koneksi, $query);
mysqli_stmt_bind_param($stmt, "ssds", $makanan, $gambar, $harga, $deskripsi);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["message" => "Produk berhasil ditambahkan."]);
} else {
    echo json_encode(["error" => "Gagal insert: " . mysqli_error($koneksi)]);
}
?>
