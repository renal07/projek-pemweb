<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
include '../config.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->id) &&
    isset($data->username) &&
    isset($data->email) &&
    isset($data->password) &&
    isset($data->role)
) {
    $id       = $data->id;
    $username = $data->username;
    $email    = $data->email;
    $password = $data->password;
    $role     = $data->role;

    $query = "UPDATE akun SET 
                username='$username',
                email='$email',
                password='$password',
                role='$role'
              WHERE id=$id";

    if (mysqli_query($koneksi, $query)) {
        echo json_encode(["message" => "Akun berhasil diupdate."]);
    } else {
        echo json_encode(["error" => "Gagal mengupdate akun.", "sql_error" => mysqli_error($koneksi)]);
    }
} else {
    echo json_encode(["error" => "Data tidak lengkap untuk update."]);
}
?>
