import React from 'react';
import './FormStyles.css';

export default function StepIndicator({ currentStep }) {
  const steps = [
    'Datos Personales',
    'CURP',
    'Identificación'
  ];

  return (
    <div className="steps-indicator">
      {steps.map((label, index) => (
        <div
          key={index}
          className={`step ${currentStep === index + 1 ? 'active' : ''}`}
        >
          <div className="circle">{index + 1}</div>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
