"use client";

import React, { useContext } from "react";
import Footer from "./Components/Footer";
import styles from "./page.module.css";
import { UserContext } from "./Components/UserContext/UserContext";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const handleViewEvents = () => {
    if (user) {
      router.push("/Home");
    } else {
      router.push("/LoginForm");
    }
  };

  return (
    <>
      <main className={styles.mainContent}>
        <h1 className={styles.h1}>
          ¡Hola, {user ? ` ${user.username}` : ""}! Bienvenido a tu espacio de
          eventos
        </h1>
        <button onClick={handleViewEvents} className={styles.viewEventsButton}>
          Ver eventos
        </button>
      </main>
      <Footer />
    </>
  );
}
