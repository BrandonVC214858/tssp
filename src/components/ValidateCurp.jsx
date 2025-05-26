import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StepIndicator from './StepIndicator';
import './FormStyles.css';

export default function ValidateCurp({ userData }) {
  const navigate = useNavigate();
  const currentStep = 2;

  // Datos de ejemplo (deberían venir de userData o del estado global)
  const registrationData = {
    curp: 'RETI@39327HCHYR6A1',
    firstName: 'Hugo Alosal',
    lastName: 'Boyer Tirijo',
    birthDate: '27/03/2023',
    gender: 'Hombre',
    state: 'CTI'
  };

  const handleContinue = () => {
    navigate('/subir-identificacion');
  };

  return (
    <div className="curp-validation-container">
      <div className="logo-container">
        <img src="/assets/logo-tss.png" alt="TSSPayments" className="logo" />
      </div>

      <StepIndicator currentStep={currentStep} />

      <div className="curp-result-section">
        <h1>Generador de CURP</h1>
        
        <div className="result-box">
          <h2>Resultado:</h2>
          <div className="curp-display">
            <p className="curp-label">CURP Generada</p>
            <p className="curp-value">{registrationData.curp}</p>
          </div>
        </div>

        <div className="user-data-section">
          <h3>Datos Ingresados:</h3>
          <ul className="user-data-list">
            <li><span>Nombre:</span> {registrationData.firstName}</li>
            <li><span>Apellidos:</span> {registrationData.lastName}</li>
            <li><span>Fecha de Nacimiento:</span> {registrationData.birthDate}</li>
            <li><span>Sexo:</span> {registrationData.gender}</li>
            <li><span>Estado:</span> {registrationData.state}</li>
          </ul>
        </div>

        <div className="action-buttons">
          <button className="back-button">Volver</button>
          <button 
            onClick={handleContinue}
            className="continue-button"
          >
            Continuar
          </button>
        </div>

        <div className="login-alternative">
          <p>O inicia sesión con </p>
          <button className="google-login">
            <img src="/assets/google-icon.png" alt="Google" />
            Continuar con Google
          </button>
        </div>

        <div className="login-prompt">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}