import React, { useState, useEffect } from 'react';
import { postJson, getJson } from '../services/api';
import './forms.css';

export default function PredialService() {
  const [form, setForm] = useState({ nombre: '', direccion: '' });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  // Carga inicial de datos
  useEffect(() => { fetchAll(); }, []);
  const fetchAll = async () => {
    try {
      const items = await getJson('/predial');
      setData(items);
    } catch {
      setErr('No se pudo cargar');
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr('');
    try {
      await postJson('/predial', form);
      setForm({ nombre: '', direccion: '' });
      fetchAll();
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="jmas-page-wrapper">
      {/* Navbar decorado */}
      <nav className="navbar-forms">
        <div className="navbar-left">
          <img src="/assets/logo-tss.png" alt="Logo" className="nav-logo" />
          <a href="/predial" className="nav-item">Predial</a>
          <a href="/jmas" className="nav-item">JMAS</a>
          <a href="/revalidacion" className="nav-item active">Revalidación</a>
          <a href="/gasnn" className="nav-item">Gas Natural</a>
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
            {['nombre', 'direccion'].map((field) => (
              <div key={field} className="form-field-group">
                <label htmlFor={field} className="form-label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  id={field}
                  name={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={e => setForm({ ...form, [field]: e.target.value })}
                  className="jmas-input"
                  required
                />
              </div>
            ))}

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
            {data.map((r) => (
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

      {/* Footer */}
      <footer className="footer-yellow" />
    </div>
  );
}
