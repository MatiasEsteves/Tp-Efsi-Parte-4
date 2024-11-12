"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import { UserContext } from "../Componentes/UserContext/UserContext";
import Footer from "../Componentes/Footer/index";
import axios from "axios";

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState("login");
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError(null);
  };

  // Validación de los campos del formulario
  const FormValidations = () => {
    if (!username || !password) {
      setError("Todos los campos son requeridos");
      return false;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return false;
    }
    return true;
  };

  // Manejo de registro
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!FormValidations
()) return; // Validar el formulario antes de enviarlo

    try {
      const response = await axios.post("http://localhost:3000/api/user/register", {
        first_name,
        last_name,
        username,
        password,
      });

      if (response.status === 201) {
        const { user, token } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setUser(user);
        router.push(`/`);
      } else {
        setError(response.data.message || "No pudo Registrarse");
      }
    } catch (error) {
      setError("No pudo Registrarse");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!FormValidations
()) return; 

    try {
      const response = await axios.post("http://localhost:3000/api/user/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const { user, token } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setUser(user);
        router.push(`/`);
      } else {
        setError(response.data.message || "Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      setError("Error al iniciar sesión");
    }
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.container}>
          <ul className={styles.navPills} role="tablist">
            <li className={styles.navItem} role="presentation">
              <a
                className={`${styles.navLink} ${
                  activeTab === "login" ? styles.navLinkActive : ""
                }`}
                href="#"
                role="tab"
                aria-selected={activeTab === "login"}
                onClick={() => handleTabChange("login")}
              >
                Login
              </a>
            </li>
            <li className={styles.navItem} role="presentation">
              <a
                className={`${styles.navLink} ${
                  activeTab === "register" ? styles.navLinkActive : ""
                }`}
                href="#"
                role="tab"
                aria-selected={activeTab === "register"}
                onClick={() => handleTabChange("register")}
              >
                Register
              </a>
            </li>
          </ul>

          <div className={styles.tabContent}>
            {activeTab === "login" && (
              <form onSubmit={handleLogin} className={styles.form}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="loginUsername">
                    Username
                  </label>
                  <input
                    type="text"
                    id="loginUsername"
                    className={styles.formControl}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="loginPassword">
                    Password
                  </label>
                  <input
                    type="password"
                    id="loginPassword"
                    className={styles.formControl}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className={styles.btnPrimary}>
                  Sign in
                </button>
                {error && <p className={styles.error}>{error}</p>}
              </form>
            )}

            {activeTab === "register" && (
              <form onSubmit={handleRegister} className={styles.form}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="registerFirstName">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="registerFirstName"
                    className={styles.formControl}
                    onChange={(e) => setFirst_name(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="registerLastName">
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="registerLastName"
                    className={styles.formControl}
                    onChange={(e) => setLast_name(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="registerUsername">
                    Username
                  </label>
                  <input
                    type="text"
                    id="registerUsername"
                    className={styles.formControl}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="registerPassword">
                    Password
                  </label>
                  <input
                    type="password"
                    id="registerPassword"
                    className={styles.formControl}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className={styles.checkboxGroup}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    id="registerCheck"
                    defaultChecked
                  />
                  <label className={styles.checkboxLabel} htmlFor="registerCheck">
                    He leido los terminos y los acepto
                  </label>
                </div>
                <button type="submit" className={styles.btnPrimary}>
                  Registarse
                </button>
                {error && <p className={styles.error}>{error}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}