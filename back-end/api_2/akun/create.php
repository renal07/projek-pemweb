<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
include '../config.php';

// Ambil input dari JSON
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->username) &&
    isset($data->email) &&
    isset($data->password) &&
    isset($data->role)
) {
    $username = $data->username;
    $email    = $data->email;
    $password = $data->password; // Nanti bisa pakai password_hash
    $role     = $data->role;

    $query = "INSERT INTO akun (username, email, password, role) 
              VALUES ('$username', '$email', '$password', '$role')";

    if (mysqli_query($koneksi, $query)) {
        echo json_encode(["message" => "Akun berhasil ditambahkan."]);
    } else {
        echo json_encode(["error" => "Gagal menambahkan akun.", "sql_error" => mysqli_error($koneksi)]);
    }
} else {
    echo json_encode(["error" => "Data tidak lengkap!"]);
}
?>
