"use client";

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';
import { UserContext } from '../Components/UserContext/UserContext';
import Footer from '../Components/Footer/index';
import axios from "axios";

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState('login');
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

  const handleRegister = async(e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/api/user/register", {
        first_name, last_name, username, password 
      });

      if (response.status === 201) {
        const { user, token } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setUser(user);
        router.push(`/`);
      } else {
        setError(response.data.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      setError(error.response?.data?.message || "Error al registrarse");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/user/login", {
        username, password
      });

      if (response.status === 200) {
        const { user, token } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setUser(user);
        router.push(`/`);
      } else {
        setError(response.data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      setError(error.response?.data?.message || "Usuario o contraseña incorrectos");
    }
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.container}>
          <ul className={styles.navPills} role="tablist">
            <li className={styles.navItem} role="presentation">
              <a
                className={`${styles.navLink} ${activeTab === 'login' ? styles.navLinkActive : ''}`}
                href='#'
                role="tab"
                aria-selected={activeTab === 'login'}
                onClick={() => handleTabChange('login')}
              >
                Login
              </a>
            </li>
            <li className={styles.navItem} role="presentation">
              <a
                className={`${styles.navLink} ${activeTab === 'register' ? styles.navLinkActive : ''}`}
                href='#'
                role="tab"
                aria-selected={activeTab === 'register'}
                onClick={() => handleTabChange('register')}
              >
                Register
              </a>
            </li>
          </ul>

          <div className={styles.tabContent}>
            {error && <p className={styles.errorMessage}>{error}</p>} {/* Mensaje de error */}

            {activeTab === 'login' && (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="loginEmail">Username</label>
                  <input 
                    type="text" 
                    id="loginEmail" 
                    className={styles.formControl} 
                    required 
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="loginPassword">Password</label>
                  <input 
                    type="password" 
                    id="loginPassword" 
                    className={styles.formControl} 
                    required 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className={styles.btnPrimary}>Sign in</button>
              </form>
            )}

            {activeTab === 'register' && (
              <form onSubmit={handleRegister} className={styles.form}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="registerName">Name</label>
                  <input 
                    type="text" 
                    id="registerName" 
                    className={styles.formControl} 
                    onChange={(e) => setFirst_name(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="lastName">Last name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className={styles.formControl} 
                    onChange={(e) => setLast_name(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="registerUsername">Username</label>
                  <input 
                    type="text" 
                    id="registerUsername" 
                    className={styles.formControl} 
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="registerPassword">Password</label>
                  <input 
                    type="password" 
                    id="registerPassword" 
                    className={styles.formControl} 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className={styles.checkboxGroup}>
                  <input className={styles.checkbox} type="checkbox" id="registerCheck" defaultChecked />
                  <label className={styles.checkboxLabel} htmlFor="registerCheck">
                    I have read and agree to the terms
                  </label>
                </div>
                <button type="submit" className={styles.btnPrimary}>Sign up</button>
              </form>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
