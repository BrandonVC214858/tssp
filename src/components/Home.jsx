// src/components/PromoSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './FormStyles.css';

const SERVICES = [
  { to: '/jmas-servicio',         img: '/assets/jmas.png',            alt: 'JMAS',             label: 'Pagar JMAS' },
  { to: '/servicios?service=gasnn', img: '/assets/GN.png',             alt: 'Gas Natural',      label: 'Pagar Gas Natural' },
  { to: '/predial',               img: '/assets/catastro.png',        alt: 'Catastro',         label: 'Pagar Predial' },
  { to: '/revalidacion',          img: '/assets/pagos_chihuahua.png', alt: 'Pagos Chihuahua',  label: 'Revalidación' }
];

export default function PromoSection() {
  return (
    <div className="promo-section">
      <div className="promo-content">
        <h2 className="promo-heading">
          Realiza tus pagos<br/>
          de forma más cómoda<br/>
          <span className="brand-highlight">con TSSPayments</span>
        </h2>

        <p>Selecciona el servicio:</p>
        <div className="store-badges grid grid-cols-2 md:grid-cols-4 gap-6">
          {SERVICES.map(s => (
            <Link
              key={s.to}
              to={s.to}
              className="badge-card relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
            >
              <img
                src={s.img}
                alt={s.alt}
                className="w-full h-24 object-contain bg-white p-4"
              />
              <div className="service-label absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center py-1">
                <span className="text-sm font-semibold">{s.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
