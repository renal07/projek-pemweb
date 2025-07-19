<?php
include 'config.php';

// Tambah Produk
if (isset($_POST['tambah'])) {
    $makanan   = $_POST['makanan'];
    $gambar = '';

if (!empty($_FILES['gambar_file']['name'])) {
    $namaFile = basename($_FILES['gambar_file']['name']);
    $targetDir = "uploads/";
    $targetPath = $targetDir . $namaFile;

    // Pastikan folder uploads/ ada
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0777, true);
    }

    if (move_uploaded_file($_FILES['gambar_file']['tmp_name'], $targetPath)) {
        $gambar = $targetPath;
    }
} elseif (!empty($_POST['gambar_text'])) {
    $gambar = $_POST['gambar_text'];
}

    $harga     = $_POST['harga'];
    $deskripsi = $_POST['deskripsi'];

    $query = "INSERT INTO produk (makanan, gambar, harga, deskripsi)
              VALUES ('$makanan', '$gambar', '$harga', '$deskripsi')";
    mysqli_query($koneksi, $query);
    header("Location: product.php");
}

// Edit Produk
if (isset($_POST['edit'])) {
    $id        = $_POST['id'];
    $makanan   = $_POST['makanan'];
    $gambar = '';

if (!empty($_FILES['gambar_file']['name'])) {
    $namaFile = basename($_FILES['gambar_file']['name']);
    $targetDir = "uploads/";
    $targetPath = $targetDir . $namaFile;

    // Pastikan folder uploads/ ada
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0777, true);
    }

    if (move_uploaded_file($_FILES['gambar_file']['tmp_name'], $targetPath)) {
        $gambar = $targetPath;
    }
} elseif (!empty($_POST['gambar_text'])) {
    $gambar = $_POST['gambar_text'];
}

    $harga     = $_POST['harga'];
    $deskripsi = $_POST['deskripsi'];

    $query = "UPDATE produk SET 
                makanan='$makanan', 
                gambar='$gambar', 
                harga='$harga', 
                deskripsi='$deskripsi' 
              WHERE id=$id";
    mysqli_query($koneksi, $query);
    header("Location: product.php");
}

// Hapus Produk
if (isset($_GET['hapus'])) {
    $id = $_GET['hapus'];
    mysqli_query($koneksi, "DELETE FROM produk WHERE id=$id");
    header("Location: product.php");
}

// Ambil data produk
$data = mysqli_query($koneksi, "SELECT * FROM produk");

// Untuk Form Edit
$editMode = false;
if (isset($_GET['edit'])) {
    $editMode = true;
    $idEdit = $_GET['edit'];
    $result = mysqli_query($koneksi, "SELECT * FROM produk WHERE id=$idEdit");
    $produkEdit = mysqli_fetch_assoc($result);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Data Produk</title>
    <!-- Bootstrap CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container mt-4">
    <h2 class="mb-4 text-center">Daftar Produk Kedai Ramen</h2>

    <!-- Tabel Produk -->
    <table class="table table-bordered table-striped">
        <thead class="table-dark">
            <tr>
                <th>ID</th>
                <th>Makanan</th>
                <th>Gambar</th>
                <th>Harga</th>
                <th>Deskripsi</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
        <?php while ($row = mysqli_fetch_assoc($data)) : ?>
            <tr>
                <td><?= $row['id'] ?></td>
                <td><?= $row['makanan'] ?></td>
                <td>
    <?php if (str_starts_with($row['gambar'], 'http')): ?>
        <img src="<?= $row['gambar'] ?>" alt="gambar" width="60">
    <?php else: ?>
        <img src="<?= $row['gambar'] ?>" alt="gambar" width="60">
    <?php endif; ?>
</td>

                <td><?= $row['harga'] ?></td>
                <td><?= $row['deskripsi'] ?></td>
                <td>
                    <a href="product.php?edit=<?= $row['id'] ?>" class="btn btn-sm btn-warning">Edit</a>
                    <a href="product.php?hapus=<?= $row['id'] ?>" class="btn btn-sm btn-danger" onclick="return confirm('Hapus produk ini?')">Hapus</a>
                </td>
            </tr>
        <?php endwhile; ?>
        </tbody>
    </table>

    <hr class="my-4">

    <!-- Form Tambah/Edit -->
    <h4><?= $editMode ? "Edit Produk" : "Tambah Produk" ?></h4>
    <form method="post" action="product.php" enctype="multipart/form-data">
        <?php if ($editMode): ?>
            <input type="hidden" name="id" value="<?= $produkEdit['id'] ?>">
        <?php endif; ?>

        <div class="mb-2">
            <label class="form-label">Makanan</label>
            <input type="text" name="makanan" class="form-control" required value="<?= $editMode ? $produkEdit['makanan'] : '' ?>">
        </div>

        <div class="mb-2">
    <label class="form-label">Gambar (isi link atau pilih file)</label>
    <input type="text" name="gambar_text" class="form-control mb-2" placeholder="https://example.com/gambar.jpg"
        value="<?= $editMode ? $produkEdit['gambar'] : '' ?>">

    <input type="file" name="gambar_file" class="form-control">
</div>


        <div class="mb-2">
            <label class="form-label">Harga</label>
            <input type="number" name="harga" class="form-control" required value="<?= $editMode ? $produkEdit['harga'] : '' ?>">
        </div>

        <div class="mb-3">
            <label class="form-label">Deskripsi</label>
            <textarea name="deskripsi" class="form-control" required><?= $editMode ? $produkEdit['deskripsi'] : '' ?></textarea>
        </div>

        <button type="submit" name="<?= $editMode ? 'edit' : 'tambah' ?>" class="btn btn-primary">
            <?= $editMode ? 'Simpan Perubahan' : 'Tambah Produk' ?>
        </button>
        <a href="product.php" class="btn btn-secondary">Batal</a>
    </form>

    <div class="mt-4">
        <a href="index.php" class="btn btn-link">← Kembali ke Index</a>
    </div>
</div>
</body>
</html>
