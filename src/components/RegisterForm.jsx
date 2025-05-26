import React, { useEffect, useRef, useState } from 'react';
import StepIndicator from './StepIndicator';
import './FormStyles.css';
import UploadIdentification from './UploadIdentification';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const googleBtnRef = useRef(null);

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    nacimiento: '',
    telefono: '',
    estado: '',
    ciudad: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && window.google.accounts?.id && googleBtnRef.current) {
        clearInterval(interval);

        window.google.accounts.id.initialize({
          client_id: 'TU_CLIENT_ID_GOOGLE.apps.googleusercontent.com',
          callback: (response) => {
            console.log("Google Login:", response);
          }
        });

        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: "outline",
          size: "large",
          shape: "rectangular",
          text: "continue_with",
          logo_alignment: "left",
          width: "100%"
        });
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="form-section">
      <div className="logo-container">
        <img src="/assets/logo-tss.png" alt="TSSPayments" className="logo" />
      </div>

      <StepIndicator currentStep={step} />

      <form className="auth-form">
        {step === 1 && (
          <>
            <div className="input-group">
              <label>Nombre Completo <span className="required">*</span></label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={e => setFormData({ ...formData, nombre: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label>Dirección de correo electrónico <span className="required">*</span></label>
              <input
                type="email"
                required
                value={formData.correo}
                onChange={e => setFormData({ ...formData, correo: e.target.value })}
              />
            </div>

            <div className="double-group">
              <div className="input-group">
                <label>Fecha de nacimiento</label>
                <input
                  type="date"
                  value={formData.nacimiento}
                  onChange={e => setFormData({ ...formData, nacimiento: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Número de teléfono</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                />
              </div>
            </div>

            <div className="double-group">
              <div className="input-group">
                <label>Estado</label>
                <input
                  type="text"
                  value={formData.estado}
                  onChange={e => setFormData({ ...formData, estado: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Ciudad</label>
                <input
                  type="text"
                  value={formData.ciudad}
                  onChange={e => setFormData({ ...formData, ciudad: e.target.value })}
                />
              </div>
            </div>

            <button type="button" className="primary-btn" onClick={() => setStep(2)}>Continuar</button>

            <div className="separator">
              <span>O inicia sesión con</span>
            </div>

            <div className="g-signin-wrapper" ref={googleBtnRef}></div>

            <div className="helper-links">
              <span>¿Ya tienes cuenta? <a className="link-accent" href="/login">Inicia sesión!</a></span>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="curp-step">
            <h2 className="section-title">Generador de CURP</h2>

            <div className="curp-box">
              <h3 style={{ marginBottom: '0.5rem' }}>Resultado:</h3>

              <div className="curp-result">
                CURP Generada: <span>RETH030327HCHYRGA1</span>
              </div>

              <div className="curp-data">
                <div className="input-group">
                  <input type="text" disabled value={`Nombre: ${formData.nombre}`} />
                  <input type="text" disabled value={`Correo: ${formData.correo}`} />
                  <input type="text" disabled value={`Fecha de Nacimiento: ${formData.nacimiento}`} />
                  <input type="text" disabled value={`Teléfono: ${formData.telefono}`} />
                  <input type="text" disabled value={`Estado: ${formData.estado}`} />
                  <input type="text" disabled value={`Ciudad: ${formData.ciudad}`} />
                </div>
              </div>

              <div className="double-group" style={{ marginTop: '2rem', gap: '1rem' }}>
                <button
                  type="button"
                  className="primary-btn"
                  style={{ backgroundColor: '#f5a623' }}
                  onClick={() => setStep(1)}
                >
                  Volver
                </button>
                <button type="button" className="primary-btn" onClick={() => setStep(3)}>
                  Continuar
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
        <>
          <UploadIdentification 
            onBack={() => setStep(2)} 
            onContinue={() => {
              // Aquí termina el formulario y redirige
              navigate('/login'); // O la ruta de tu login
            }} 
          />
        </>
        )}
      </form>
    </div>
  );
}
