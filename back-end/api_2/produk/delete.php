<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include '../config.php';

// Hanya respons jika method DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Ambil isi body JSON
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    // Validasi ID
    if (!isset($data['id'])) {
        echo json_encode(["error" => "ID tidak ditemukan dalam request body."]);
        exit;
    }

    $id = intval($data['id']);

    // Query DELETE
    $query = "DELETE FROM produk WHERE id = $id";
    $result = mysqli_query($koneksi, $query);

    if ($result) {
        echo json_encode(["message" => "Produk berhasil dihapus."]);
    } else {
        echo json_encode(["error" => "Gagal menghapus produk."]);
    }

} else {
    echo json_encode(["error" => "Gunakan metode DELETE."]);
}
