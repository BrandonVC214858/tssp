import React from 'react';

export default function UploadIdentification({ onContinue, onBack }) {
  return (
    <form id="uploadForm" className="auth-form">
      <div className="input-group">
        <label htmlFor="identificationUpload">Subir Identificación Oficial</label>
        <input type="file" name="identification" id="identificationUpload" required />
        <span className="error-message" id="identificationError"></span>
      </div>

      <p className="qr-instruction">Escanea el código QR para subir tu foto</p>
      <div className="qr-code-container">
        {/* Aquí puedes insertar un componente QR si lo necesitas */}
      </div>

      <div className="double-group" style={{ marginTop: '2rem' }}>
        <button type="button" className="primary-btn" onClick={onBack}>Volver</button>
        <button type="submit" className="primary-btn" onClick={onContinue}>Terminar Registro</button>
      </div>
    </form>
  );
}
