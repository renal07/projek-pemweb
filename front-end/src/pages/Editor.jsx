import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Editor() {
  const [akunList, setAkunList] = useState([]);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'pelanggan'
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost/akun/read.php')
      .then(res => res.json())
      .then(data => setAkunList(data));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const url = isEdit
      ? 'http://localhost/akun/update.php'
      : 'http://localhost/akun/create.php';

    const payload = isEdit ? { id: editId, ...form } : form;

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || "Berhasil!");
        setForm({ username: '', email: '', password: '', role: 'pelanggan' });
        setIsEdit(false);
        setEditId(null);
        fetchData();
      });
  };

  const handleEdit = akun => {
    setForm({
      username: akun.username,
      email: akun.email,
      password: akun.password,
      role: akun.role
    });
    setEditId(akun.id);
    setIsEdit(true);
  };

  const handleDelete = id => {
    if (!window.confirm("Hapus akun ini?")) return;

    fetch('http://localhost/akun/delete.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || "Berhasil dihapus");
        fetchData();
      });
  };

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Daftar Akun</h2>

        {/* Tabel */}
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
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
            {akunList.map((akun) => (
              <tr key={akun.id}>
                <td>{akun.id}</td>
                <td>{akun.username}</td>
                <td>{akun.email}</td>
                <td>{akun.password}</td>
                <td>{akun.role}</td>
                <td>
                  <button
                    onClick={() => handleEdit(akun)}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(akun.id)}
                    className="btn btn-sm btn-danger ms-2"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {akunList.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">Belum ada data</td>
              </tr>
            )}
          </tbody>
        </table>

        <hr className="my-4" />

        {/* Form */}
        <h4>{isEdit ? "Edit Akun" : "Tambah Akun"}</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Password</label>
            <input
              type="text"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="pelanggan">Pelanggan</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary me-2">
            {isEdit ? 'Simpan Perubahan' : 'Tambah Akun'}
          </button>
          {isEdit && (
            <button
              type="button"
              onClick={() => {
                setForm({ username: '', email: '', password: '', role: 'pelanggan' });
                setIsEdit(false);
                setEditId(null);
              }}
              className="btn btn-secondary"
            >
              Batal
            </button>
          )}
        </form>

        <div className="mt-4">
          <button className="btn btn-link" onClick={() => navigate('/admin')}>
            ← Kembali ke Admin
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Editor;
