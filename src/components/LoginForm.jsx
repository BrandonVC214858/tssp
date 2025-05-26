import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css';

export default function LoginForm() {
  const googleBtnRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && window.google.accounts && window.google.accounts.id && googleBtnRef.current) {
        clearInterval(interval);

        window.google.accounts.id.initialize({
          client_id: 'TU_CLIENT_ID_GOOGLE.apps.googleusercontent.com', // Reemplaza con tu ID real
          callback: (response) => {
            console.log("Google Login:", response);
            navigate('/home');
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
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home'); // Redirige tras el login simulado
  };

  return (
    <div className="form-section">
      <h1 className="welcome-heading">
        ¡Hola, Bienvenido a <img src="/assets/logo-tss.png" alt="Logo Inline" className="inline-logo" />!
      </h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Correo electrónico o Usuario</label>
          <input type="text" required />
        </div>

        <div className="input-group">
          <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Contraseña</span>
            <a href="#" className="link-accent">He olvidado mi contraseña</a>
          </label>
          <input type="password" required />
        </div>

        <button type="submit" className="primary-btn">Iniciar sesión</button>

        <div className="separator">
          <span>O inicia sesión con</span>
        </div>

        <div className="g-signin-wrapper" ref={googleBtnRef}></div>

        <div className="helper-links">
          <span>¡Aún no tienes cuenta? <a className="link-accent" href="/registro">Regístrate!</a></span>
        </div>
      </form>
    </div>
  );
}
