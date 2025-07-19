<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include '../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input || !isset($input['id'])) {
        echo json_encode(["error" => "ID wajib dikirim!"]);
        exit;
    }

    $id = intval($input['id']);

    if ($id <= 0) {
        echo json_encode(["error" => "ID tidak valid!"]);
        exit;
    }

    $fields = [];
    $types = "";
    $values = [];

    if (isset($input['makanan']) && !empty(trim($input['makanan']))) {
        $fields[] = "makanan=?";
        $types .= "s";
        $values[] = trim($input['makanan']);
    }

    if (isset($input['gambar']) && !empty(trim($input['gambar']))) {
        $fields[] = "gambar=?";
        $types .= "s";
        $values[] = trim($input['gambar']);
    }

    if (isset($input['harga']) && is_numeric($input['harga'])) {
        $fields[] = "harga=?";
        $types .= "d";
        $values[] = floatval($input['harga']);
    }

    if (isset($input['deskripsi']) && !empty(trim($input['deskripsi']))) {
        $fields[] = "deskripsi=?";
        $types .= "s";
        $values[] = trim($input['deskripsi']);
    }

    if (count($fields) === 0) {
        echo json_encode(["error" => "Tidak ada data yang dikirim untuk diperbarui!"]);
        exit;
    }

    $setClause = implode(", ", $fields);
    $query = "UPDATE produk SET $setClause WHERE id=?";

    $types .= "i";
    $values[] = $id;

    $stmt = mysqli_prepare($koneksi, $query);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, $types, ...$values);

        if (mysqli_stmt_execute($stmt)) {
            if (mysqli_stmt_affected_rows($stmt) > 0) {
                echo json_encode(["message" => "Produk berhasil diupdate."]);
            } else {
                echo json_encode(["error" => "ID tidak ditemukan atau tidak ada perubahan."]);
            }
        } else {
            echo json_encode(["error" => "Gagal menjalankan query: " . mysqli_error($koneksi)]);
        }

        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(["error" => "Gagal menyiapkan statement: " . mysqli_error($koneksi)]);
    }
} else {
    echo json_encode(["error" => "Gunakan metode PUT untuk update."]);
}
?>
