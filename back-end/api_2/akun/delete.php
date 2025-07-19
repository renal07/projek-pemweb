<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
include '../config.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
    echo json_encode(["error" => "ID tidak ditemukan!"]);
    exit;
}

$id = $data->id;
$query = "DELETE FROM akun WHERE id=$id";

if (mysqli_query($koneksi, $query)) {
    echo json_encode(["message" => "Akun berhasil dihapus."]);
} else {
    echo json_encode(["error" => "Gagal menghapus akun.", "sql_error" => mysqli_error($koneksi)]);
}
?>
