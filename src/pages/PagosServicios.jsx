// src/pages/PagosServicios.jsx
import React, { useState } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";
import { postJson } from "../services/api";
import "./forms.css";

export default function PagosServicios() {
  const SERVICIOS = {
    jmas:         { label: "JMAS Agua",        path: "/jmas" },
    gasnn:        { label: "Gas Natural",      path: "/gasnn" },
    revalidacion: { label: "Revalidación",     path: "/revalidacion" },
    predial:      { label: "Impuesto Predial", path: "/predial" }
  };

  const [service,    setService]    = useState("jmas");
  const [folio,      setFolio]      = useState("");
  const [barcodeB64, setBarcodeB64] = useState("");
  const [scanning,   setScanning]   = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [msg,        setMsg]        = useState({ tipo: null, texto: "" });

  const generarCodigo = async () => {
    if (!folio) {
      return setMsg({ tipo: "error", texto: "Ingrese folio" });
    }
    setMsg({ tipo: null, texto: "" });
    try {
      const res = await postJson(
        `${SERVICIOS[service].path}/barcode`,
        { folio }
      );
      // esperar que la API devuelva { barcode_base64: "data:image/png;base64,..." }
      setBarcodeB64(res.barcode_base64);
    } catch (e) {
      setMsg({ tipo: "error", texto: e.message });
    }
  };

  const startScanner = () => {
    setScanResult(null);
    setMsg({ tipo: null, texto: "" });
    setScanning(true);
  };

  const handleScan = async (result) => {
    if (!result) return;
    setScanning(false);
    setScanResult(result.text);
    // registrar pago en endpoint /pago de cada servicio
    try {
      const resp = await postJson(
        `${SERVICIOS[service].path}/pago`,
        { folio: result.text }
      );
      setMsg({ tipo: "success", texto: `✓ Pago registrado (${resp.message || result.text})` });
    } catch (e) {
      setMsg({ tipo: "error", texto: e.message });
    }
  };

  return (
    <div className="jmas-page-wrapper">
      {/* Navbar homogénea */}
      <nav className="navbar-forms">
        <div className="navbar-left">
          <img src="/assets/logo-tss.png" alt="Logo" className="nav-logo" />
          <a href="/predial"      className="nav-item">Predial</a>
          <a href="/jmas"         className="nav-item">JMAS</a>
          <a href="/revalidacion" className="nav-item">Revalidación</a>
          <a href="/gasnn"        className="nav-item active">Gas Natural</a>
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

      <h1 className="jmas-title">Códigos de Barras y Escaneo</h1>

      <div className="jmas-content-wrapper">
        <section className="jmas-form-section">
          <div className="jmas-form-layout">
            {/* Selección de servicio */}
            <div className="form-field-group">
              <label htmlFor="service" className="form-label">Servicio</label>
              <select
                id="service"
                value={service}
                onChange={e => setService(e.target.value)}
                className="jmas-input jmas-select"
              >
                {Object.entries(SERVICIOS).map(([key,{label}])=>(
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            {/* Generar Código */}
            <div className="form-field-group">
              <label htmlFor="folio" className="form-label">Folio</label>
              <input
                id="folio"
                type="text"
                placeholder="Ingrese folio"
                value={folio}
                onChange={e => setFolio(e.target.value)}
                className="jmas-input"
              />
            </div>
            <button
              className="jmas-submit-button"
              onClick={generarCodigo}
            >
              Generar Código
            </button>

            {barcodeB64 && (
              <div className="barcode-preview" style={{ marginTop: '1rem' }}>
                <img src={barcodeB64} alt="Código de barras generado" />
              </div>
            )}

            {/* Escáner */}
            {!scanning && (
              <button
                className="jmas-submit-button"
                style={{ marginTop: '1.5rem' }}
                onClick={startScanner}
              >
                Escanear Pago
              </button>
            )}
            {scanning && (
              <div style={{ marginTop: '1rem' }}>
                <BarcodeScanner
                  onUpdate={(err, result) => {
                    if (result) handleScan(result);
                  }}
                />
                <button
                  className="jmas-submit-button"
                  style={{ marginTop: '0.5rem' }}
                  onClick={() => setScanning(false)}
                >
                  Cancelar Escaneo
                </button>
              </div>
            )}

            {/* Mensajes */}
            {msg.texto && (
              <p
                className={
                  msg.tipo === "error" ? "jmas-error-message" : "jmas-service-detail"
                }
                style={{ marginTop: '1rem' }}
              >
                {msg.texto}
              </p>
            )}

            {/* Mostrar último resultado de escaneo */}
            {scanResult && (
              <p className="jmas-service-detail" style={{ marginTop: '0.5rem' }}>
                Resultado: {scanResult}
              </p>
            )}
          </div>
        </section>
      </div>

      <footer className="footer-yellow" />
    </div>
  );
}
