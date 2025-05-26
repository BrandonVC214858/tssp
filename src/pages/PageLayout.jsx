import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../pages/PageStyles.css";

export default function PageLayout() {
  return (
    <div className="page-layout">
      {/* Barra de degradado lateral */}
      <div className="side-gradient" />

      {/* NAVBAR */}
      <header className="header">
        <nav className="nav-container">
          <ul className="nav-list">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Inicio
              </NavLink>
            </li>

            <li className="dropdown">
              <span className="nav-link dropdown-toggle" tabIndex={0}>
                Servicios
              </span>

              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    to="/jmas"
                    className={({ isActive }) =>
                      isActive ? "dropdown-link active" : "dropdown-link"
                    }
                  >
                    JMAS
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/gas-natural"
                    className={({ isActive }) =>
                      isActive ? "dropdown-link active" : "dropdown-link"
                    }
                  >
                    Gas Natural
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/revalidacion"
                    className={({ isActive }) =>
                      isActive ? "dropdown-link active" : "dropdown-link"
                    }
                  >
                    Revalidación
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/predial"
                    className={({ isActive }) =>
                      isActive ? "dropdown-link active" : "dropdown-link"
                    }
                  >
                    Predial
                  </NavLink>
                </li>
              </ul>
            </li>

            <li>
              <NavLink
                to="/generar-codigo"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Generar código
              </NavLink>
            </li>
          </ul>

          <img src="/assets/logo-tss.png" alt="TSS Payments" className="logo" />
        </nav>
      </header>

      {/* Contenido de cada página */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
