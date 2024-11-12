"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from '../DetalleEvento.module.css';
import Footer from '../../Componentes/Footer';

export default function DetalleEvento({ params }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [detailEvent, setDetailEvent] = useState(null);
    const router = useRouter();

    const id = params.id;
    let currentUser = null;

    try {
        const userData = localStorage.getItem("user");
        if (userData) {
            currentUser = JSON.parse(userData);
        }
    } catch (error) {
        console.error("Error:", error);
    }

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/api/event/${id}`)
                .then(response => {
                    const eventData = response.data;
                    if (eventData.isPrivate && (!currentUser || !eventData.allowedUsers.includes(currentUser.username))) {
                        setError(new Error("Error Procesando Pedido"));
                    } else {
                        setDetailEvent(eventData);
                    }
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        } else {
            setError(new Error("Error Procesando Pedido."));
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <div>Procesando pedidos</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const formatStartDate = (startDate) => {
        if (!startDate) return "";
        const date = new Date(startDate);
        return date.toLocaleTimeString();
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.detalleEvento}>
                    {detailEvent && (
                        <>
                            <h3 className={styles.h3}>{detailEvent.name}</h3>
                            <ul className={styles.ul} style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                <li className={styles.li}><strong>Comienza a las </strong> {formatStartDate(detailEvent.start_date)}</li>
                                <li className={styles.li}><strong>Dura </strong> {detailEvent.duration_in_minutes} minutos</li>
                                <li className={styles.li}><strong></strong> {detailEvent.description}</li>
                            </ul>
                        </>
                    )}
                    <button
                        className={styles.btnBack}
                        onClick={() => router.push('/Home')}
                    >
                        Volver
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}