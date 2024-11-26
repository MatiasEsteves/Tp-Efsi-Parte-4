"use client";

import React, { useContext, useEffect } from "react";
import Footer from "./Components/Footer";
import styles from "./page.module.css";
import { UserContext } from "./Components/UserContext/UserContext";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      router.push("/Home");
    } 
  }, [user, router]); 

  return (
    <>
      <main className={styles.mainContent}>
        <h1 className={styles.h1}>
          ¡Hola, {user ? ` ${user.username}` : ""}! Bienvenido a tu espacio de
          eventos
        </h1>
        <button onClick={()=>router.push("/Home")} className={styles.viewEventsButton}>
          Ver eventos
        </button>
      </main>
      <Footer />
    </>
  );
}
