<?php
include 'config.php';

// Tambah akun
if (isset($_POST['tambah'])) {
    $username = $_POST['username'];
    $email    = $_POST['email'];
    $password = $_POST['password'];
    $role     = $_POST['role'];

    $query = "INSERT INTO akun (username, email, password, role)
              VALUES ('$username', '$email', '$password', '$role')";
    mysqli_query($koneksi, $query);
    header("Location: account.php");
}

// Edit akun
if (isset($_POST['edit'])) {
    $id       = $_POST['id'];
    $username = $_POST['username'];
    $email    = $_POST['email'];
    $password = $_POST['password'];
    $role     = $_POST['role'];

    $query = "UPDATE akun SET 
                username='$username',
                email='$email',
                password='$password',
                role='$role'
              WHERE id=$id";
    mysqli_query($koneksi, $query);
    header("Location: account.php");
}

// Hapus akun
if (isset($_GET['hapus'])) {
    $id = $_GET['hapus'];
    mysqli_query($koneksi, "DELETE FROM akun WHERE id=$id");
    header("Location: account.php");
}

// Data akun
$data = mysqli_query($koneksi, "SELECT * FROM akun");

// Untuk form edit
$editMode = false;
if (isset($_GET['edit'])) {
    $editMode = true;
    $idEdit = $_GET['edit'];
    $result = mysqli_query($koneksi, "SELECT * FROM akun WHERE id=$idEdit");
    $akunEdit = mysqli_fetch_assoc($result);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Data Akun</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container mt-4">
    <h2 class="mb-4 text-center">Daftar Akun</h2>

    <!-- Tabel akun -->
    <table class="table table-bordered table-striped">
        <thead class="table-dark">
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Role</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
        <?php while ($row = mysqli_fetch_assoc($data)) : ?>
            <tr>
                <td><?= $row['id'] ?></td>
                <td><?= $row['username'] ?></td>
                <td><?= $row['email'] ?></td>
                <td><?= $row['password'] ?></td>
                <td><?= $row['role'] ?></td>
                <td>
                    <a href="account.php?edit=<?= $row['id'] ?>" class="btn btn-sm btn-warning">Edit</a>
                    <a href="account.php?hapus=<?= $row['id'] ?>" class="btn btn-sm btn-danger" onclick="return confirm('Hapus akun ini?')">Hapus</a>
                </td>
            </tr>
        <?php endwhile; ?>
        </tbody>
    </table>

    <hr class="my-4">

    <!-- Form Tambah/Edit akun -->
    <h4><?= $editMode ? "Edit Akun" : "Tambah Akun" ?></h4>
    <form method="post" action="account.php">
        <?php if ($editMode): ?>
            <input type="hidden" name="id" value="<?= $akunEdit['id'] ?>">
        <?php endif; ?>

        <div class="mb-2">
            <label class="form-label">Username</label>
            <input type="text" name="username" class="form-control" required value="<?= $editMode ? $akunEdit['username'] : '' ?>">
        </div>

        <div class="mb-2">
            <label class="form-label">Email</label>
            <input type="email" name="email" class="form-control" required value="<?= $editMode ? $akunEdit['email'] : '' ?>">
        </div>

        <div class="mb-2">
            <label class="form-label">Password</label>
            <input type="text" name="password" class="form-control" required value="<?= $editMode ? $akunEdit['password'] : '' ?>">
        </div>

        <div class="mb-3">
            <label class="form-label">Role</label>
            <select name="role" class="form-select" required>
                <option value="pelanggan" <?= ($editMode && $akunEdit['role'] == 'pelanggan') ? 'selected' : '' ?>>Pelanggan</option>
                <option value="admin" <?= ($editMode && $akunEdit['role'] == 'admin') ? 'selected' : '' ?>>Admin</option>
            </select>
        </div>

        <button type="submit" name="<?= $editMode ? 'edit' : 'tambah' ?>" class="btn btn-primary">
            <?= $editMode ? 'Simpan Perubahan' : 'Tambah Akun' ?>
        </button>
        <a href="account.php" class="btn btn-secondary">Batal</a>
    </form>

    <div class="mt-4">
        <a href="index.php" class="btn btn-link">← Kembali ke Index</a>
    </div>
</div>
</body>
</html>
