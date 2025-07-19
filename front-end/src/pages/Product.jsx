import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Product.css';
import { Link, useNavigate } from 'react-router-dom';

const Product = () => {
  const [produkList, setProdukList] = useState([]);
  const [form, setForm] = useState({
    id: '',
    makanan: '',
    gambarText: '',
    gambarFile: null,
    harga: '',
    deskripsi: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchProduk = () => {
    fetch("http://localhost/produk/read.php")
      .then(res => res.json())
      .then(data => setProdukList(data));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    setForm(prev => ({ ...prev, gambarFile: e.target.files[0] }));
  };

  const handleSubmit = e => {
  e.preventDefault();

  const isEditing = isEdit;

  if (isEditing) {
    const payload = {
      id: form.id,
      makanan: form.makanan,
      gambar: form.gambarText, // hanya kirim gambarText karena upload file tidak bisa lewat PUT
      harga: form.harga,
      deskripsi: form.deskripsi
    };

    fetch("http://localhost/produk/update.php", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        alert(data.message);
        setForm({
          id: '',
          makanan: '',
          gambarText: '',
          gambarFile: null,
          harga: '',
          deskripsi: ''
        });
        setIsEdit(false);
        fetchProduk();
      } else {
        alert(data.error || "Gagal update produk.");
      }
    });
  } else {
    // TAMBAH BARU – tetap pakai FormData & POST
    const formData = new FormData();
    formData.append("makanan", form.makanan);
    formData.append("harga", form.harga);
    formData.append("deskripsi", form.deskripsi);

    if (form.gambarFile) {
      formData.append("gambar_file", form.gambarFile);
    } else {
      formData.append("gambar_text", form.gambarText);
    }

    fetch("http://localhost/produk/create.php", {
      method: "POST",
      body: formData
    })
    .then(() => {
      alert("Produk berhasil ditambahkan.");
      setForm({
        id: '',
        makanan: '',
        gambarText: '',
        gambarFile: null,
        harga: '',
        deskripsi: ''
      });
      fetchProduk();
    });
  }
};


  const handleEdit = (produk) => {
    setForm({
      id: produk.id,
      makanan: produk.makanan,
      gambarText: produk.gambar,
      gambarFile: null,
      harga: produk.harga,
      deskripsi: produk.deskripsi
    });
    setIsEdit(true);
  };

const handleDelete = (id) => {
  if (!window.confirm("Hapus produk ini?")) return;

  fetch('http://localhost/produk/delete.php', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }), // kirim dalam JSON
  })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        alert(data.message);
        fetchProduk();
      } else {
        alert(data.error || "Gagal menghapus produk.");
      }
    })
    .catch(err => {
      console.error("Error saat delete:", err);
      alert("Terjadi kesalahan saat menghapus produk.");
    });
};


  const handleCancel = () => {
    setIsEdit(false);
    setForm({
      id: '',
      makanan: '',
      gambarText: '',
      gambarFile: null,
      harga: '',
      deskripsi: ''
    });
  };

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div className="d-flex justify-content-between mb-3">
          <Link to="/admin">
            <button className="btn btn-secondary">← Kembali ke Admin</button>
          </Link>
          <button className="btn btn-danger" onClick={() => {
            localStorage.removeItem('user');
            navigate('/login');
          }}>Logout</button>
        </div>

        {/* TABEL PRODUK */}
        <h3>Daftar Produk</h3>
        <table className="table table-bordered">
          <thead className="table-dark">
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
            {produkList.map((produk) => (
              <tr key={produk.id}>
                <td>{produk.id}</td>
                <td>{produk.makanan}</td>
                <td>
                  <img src={produk.gambar} alt={produk.makanan} width="60" />
                </td>
                <td>Rp {parseInt(produk.harga).toLocaleString()}</td>
                <td>{produk.deskripsi}</td>
                <td>
                  <button onClick={() => handleEdit(produk)} className="btn btn-warning btn-sm me-2">Edit</button>
                  <button onClick={() => handleDelete(produk.id)} className="btn btn-danger btn-sm">Hapus</button>
                </td>
              </tr>
            ))}
            {produkList.length === 0 && (
              <tr><td colSpan="6" className="text-center">Belum ada produk</td></tr>
            )}
          </tbody>
        </table>

        <hr className="my-4" />

        {/* FORM TAMBAH/EDIT */}
        <h3>{isEdit ? "Edit Produk" : "Tambah Produk"}</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-2">
            <label className="form-label">Makanan</label>
            <input
              type="text"
              name="makanan"
              value={form.makanan}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Gambar (link atau upload file)</label>
            <input
              type="text"
              name="gambarText"
              value={form.gambarText}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="https://example.com/gambar.jpg"
            />
            <input
              type="file"
              name="gambarFile"
              onChange={handleFileChange}
              className="form-control"
              accept="image/*"
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Harga</label>
            <input
              type="number"
              name="harga"
              value={form.harga}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Deskripsi</label>
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary me-2">
            {isEdit ? "Simpan Perubahan" : "Tambah Produk"}
          </button>
          {isEdit && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Batal
            </button>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
