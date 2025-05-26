import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import PromoSection from './components/PromoSection';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UploadIdentification from './components/UploadIdentification';
import ValidateCurp from './components/ValidateCurp';
import Home from "./components/Home";

import PagosServicios from './pages/PagosServicios';
import PredialService from './pages/PredialService';
import JmasService from './pages/JmasService';
import RevalidacionVehicular from './pages/RevalidacionVehicular';

import PageLayout from './pages/PageLayout';
import JmasPage from './pages/JmasPage';
import RevalidacionPage from './pages/RevalidacionPage';
import PredialPage from './pages/PredialPage';

import BarcodeGenerator from "./pages/BarcodeGenerator";
import EscanearPago     from "./pages/EscanearPago";

export default function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          {/* Redirección inicial */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Autenticación en pantalla dividida */}
          <Route path="/login" element={
            <div className="split-screen">
              <LoginForm />
              <PromoSection />
            </div>
          } />

          <Route path="/registro" element={
            <div className="split-screen">
              <RegisterForm />
              <PromoSection />
            </div>
          } />

          {/* Página principal después del login */}
          <Route path="/home" element={<PromoSection />} />

          {/* Pasos adicionales del registro */}
          <Route path="/subir-identificacion" element={
            <div className="split-screen">
              <UploadIdentification />
              <PromoSection />
            </div>
          } />

          <Route path="/validar-curp" element={
            <div className="split-screen">
              <ValidateCurp />
              <PromoSection />
            </div>
          } />

          {/* Servicios */}
          <Route path="/servicios" element={<PagosServicios />} />
          <Route path="/predial" element={<PredialService />} />
          <Route path="/jmas-servicio" element={<JmasService />} />
          <Route path="/revalidacion" element={<RevalidacionVehicular />} />
          <Route path="/"          element={<PromoSection />} />

          <Route path="/jmas" element={<JmasPage />} />
          <Route path="/revalidacion"  element={<RevalidacionPage />} />
          <Route path="/predial"       element={<PredialPage />} />
          <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          

          <Route element={<PageLayout />}>
            <Route path="/generar-codigo" element={<BarcodeGenerator />} />
            <Route path="/escanear-pago"  element={<EscanearPago />} />
          </Route>

          </Route>
        </Routes>
      </div>
    </Router>
  );
}
