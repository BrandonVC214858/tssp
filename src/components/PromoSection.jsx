import React from 'react';
import { Link } from 'react-router-dom';     // 👈 Nuevo
import './FormStyles.css';

export default function PromoSection() {
  return (
    <div className="promo-section">
      <div className="promo-content">
        <h2 className="promo-heading">
          Realiza tus pagos<br />
          de forma más cómoda<br />
          <span className="brand-highlight">con TSSPayments</span>
        </h2>

        <p>Puedes realizar pagos en:</p>

        {/* Badges -> ahora son enlaces */}
        <div className="store-badges">
          {/* JMAS Agua */}
          <Link to="/jmas-servicio">
            <img src="/assets/jmas.png" alt="JMAS" />
          </Link>

          {/* Gas Natural (usa la vista genérica de servicios) */}
          <Link to="/servicios">
            <img src="/assets/GN.png" alt="Gas Natural" />
          </Link>

          {/* Impuesto Predial */}
          <Link to="/predial">
            <img src="/assets/catastro.png" alt="Catastro" />
          </Link>

          {/* Revalidación Vehicular */}
          <Link to="/revalidacion">
            <img src="/assets/pagos_chihuahua.png" alt="Pagos Chihuahua" />
          </Link>
        </div>

        <div className="phones-section">
          <img
            src="/assets/celulares.png"
            alt="App TSSPayments"
            className="phones-image"
          />
        </div>
      </div>
    </div>
  );
}
