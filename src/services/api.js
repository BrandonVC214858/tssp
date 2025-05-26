// src/services/api.js
// ----------------------------------------------
// Servicio centralizado para llamadas a AWS API Gateway
// En desarrollo usamos setupProxy para redirigir /prod/... a los dominios de AWS

// Rutas relativas (proxy en desarrollo) ------------------------------------------------
const JMAS_BASE_URL         = "https://nvyfmt7sgd.execute-api.us-west-2.amazonaws.com/prod/jmas";
const PREDIAL_BASE_URL      = "https://2s19gmoi2l.execute-api.us-west-2.amazonaws.com/prod/predial ";
const REVALIDACION_BASE_URL = "https://lrjxs6izo0.execute-api.us-west-2.amazonaws.com/prod/revalidacion";

// Endpoints de generación de código de barras -----------------------------------------
const JMAS_BARCODE_URL         = "https://x42iej2av3.execute-api.us-west-2.amazonaws.com/prod/barcode/jmas";
const PREDIAL_BARCODE_URL      = "https://03yraqdm7l.execute-api.us-west-2.amazonaws.com/prod/barcode/predial";
const REVALIDACION_BARCODE_URL = "https://k48v40lcjc.execute-api.us-west-2.amazonaws.com/prod/barcode/revalidacion";

// Endpoints de registro de pago tras escaneo -----------------------------------------
const JMAS_PAGO_URL         = "/prod/pago/jmas";
const PREDIAL_PAGO_URL      = "/prod/pago/predial";
const REVALIDACION_PAGO_URL = "https://k48v40lcjc.execute-api.us-west-2.amazonaws.com/prod/barcode/revalidacion";

// Helper GET genérico ------------------------------------------------------------------
export async function getJson(url) {
  const res = await fetch(url, { mode: "cors" });
  if (!res.ok) throw new Error(`GET ${res.status}: ${await res.text()}`);
  return res.json();
}

// Helper POST genérico -----------------------------------------------------------------
export async function postJson(url, payload) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`POST ${res.status}: ${await res.text()}`);
  return res.json();
}

// ─────────────────────────────────────────────────────────────────────────────────────
// Módulo JMAS -------------------------------------------------------------------------
/**
 * Obtiene todos los registros JMAS
 */
export const getJmas              = ()          => getJson(JMAS_BASE_URL);
/**
 * Registra un servicio JMAS
 */
export const postJmas             = data        => postJson(JMAS_BASE_URL, data);
/**
 * Genera código de barras para JMAS
 */
export const generarBarcodeJmas   = id          => postJson(JMAS_BARCODE_URL, { id });
/**
 * Registra un pago JMAS tras escaneo
 */
export const registrarPagoJmas    = codigo      => postJson(JMAS_PAGO_URL,     { codigo });

// Módulo Predial ----------------------------------------------------------------------
export const getPredialData         = ()       => getJson(PREDIAL_BASE_URL);
export const postPredial            = data     => postJson(PREDIAL_BASE_URL, data);
export const generarBarcodePredial  = id       => postJson(PREDIAL_BARCODE_URL, { id });
export const registrarPagoPredial   = codigo   => postJson(PREDIAL_PAGO_URL,    { codigo });

// Módulo Revalidación Vehicular -------------------------------------------------------
export const getRevalidacionData         = ()       => getJson(REVALIDACION_BASE_URL);
export const postRevalidacion            = data     => postJson(REVALIDACION_BASE_URL, data);
export const generarBarcodeRevalidacion  = id       => postJson(REVALIDACION_BARCODE_URL, { id });
export const registrarPagoRevalidacion   = codigo   => postJson(REVALIDACION_PAGO_URL,    { codigo });


