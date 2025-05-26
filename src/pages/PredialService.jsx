// src/pages/PredialService.jsx
import React, { useState, useEffect } from 'react';
import { postJson, getJson } from '../services/api';
import './forms.css';

export default function PredialService() {
  const [form, setForm]   = useState({ nombre:'', direccion:'' });
  const [data, setData]   = useState([]);
  const [loading, setLoad] = useState(false);
  const [err, setErr]      = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoad(true);
    setErr('');
    try {
      await postJson('/predial', form);
      await fetchAll();
      setForm({ nombre:'', direccion:'' });
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoad(false);
    }
  };

  const fetchAll = async () => {
    try {
      const all = await getJson('/predial');
      setData(all);
    } catch {
      setErr('No se pudo cargar');
    }
  };

  useEffect(() => { fetchAll(); }, []);

  return (
    <div className="jmas-page-wrapper">
      {/* Navbar decorada */}
      <nav className="navbar-forms">
        <div className="navbar-left">
          <img src="/assets/logo-tss.png" alt="Logo" className="nav-logo" />
          <a href="/predial"      className="nav-item active">Predial</a>
          <a href="/jmas"         className="nav-item">JMAS</a>
          <a href="/revalidacion" className="nav-item">Revalidación</a>
          <a href="/gasnn"        className="nav-item">Gas Natural</a>
        </div>
        <div className="navbar-right">
          <div className="user-menu">
            <img src="/user.jpg" alt="Usuario" className="user-icon" />
            <div className="user-dropdown">
              <button className="user-btn">Perfil</button>
              <button className="user-btn">Cerrar sesión</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Título principal */}
      <h1 className="jmas-title">Impuesto Predial</h1>

      <div className="jmas-content-wrapper">
        {/* Sección de formulario */}
        <section className="jmas-form-section">
          <form onSubmit={submit} className="jmas-form-layout">
            <div className="form-field-group">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Nombre"
                value={form.nombre}
                onChange={e => setForm({ ...form, nombre: e.target.value })}
                className="jmas-input"
                required
              />
            </div>

            <div className="form-field-group">
              <label htmlFor="direccion" className="form-label">Dirección</label>
              <input
                id="direccion"
                name="direccion"
                type="text"
                placeholder="Dirección"
                value={form.direccion}
                onChange={e => setForm({ ...form, direccion: e.target.value })}
                className="jmas-input"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="jmas-submit-button"
            >
              {loading ? 'Enviando…' : 'Registrar consulta'}
            </button>
          </form>

          {err && <p className="jmas-error-message">{err}</p>}
        </section>

        {/* Sección de resultados */}
        <section className="jmas-services-section">
          <h2 className="jmas-subtitle">Resultados</h2>
          <div className="jmas-services-list">
            {data.map(r => (
              <div key={r.clave} className="jmas-service-item">
                <div className="jmas-service-account">Clave: {r.clave}</div>
                <div className="jmas-service-detail">Nombre: {r.nombre}</div>
                <div className="jmas-service-detail">Estatus: {r.estatus}</div>
                <div className="jmas-service-detail">
                  Total a pagar: ${r.total_pagar.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer amarillo */}
      <footer className="footer-yellow" />
    </div>
  );
}
