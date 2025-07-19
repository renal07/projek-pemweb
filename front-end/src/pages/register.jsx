import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'pelanggan',
  });

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    fetch("http://localhost/kedai-ramen/api/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Pendaftaran berhasil. Silakan login.");
          navigate("/login");
        } else {
          alert(data.message || "Gagal mendaftar.");
        }
      })
      .catch(err => {
        console.error("Register error:", err);
        alert("Terjadi kesalahan saat mendaftar.");
      });
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '80px' }}>
      <div className="border p-4 rounded shadow-sm bg-light text-center">
        <h2 className="mb-4">Buat Akun Baru</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="form-control mb-3"
            placeholder="Username"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control mb-3"
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control mb-3"
            placeholder="Password"
            required
          />
          <button type="submit" className="btn btn-danger w-100">
            Daftar
          </button>
        </form>
        <div className="mt-3">
          <button onClick={() => navigate("/login")} className="btn btn-link">
            ← Kembali ke Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
