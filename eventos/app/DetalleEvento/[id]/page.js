"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from '../DetalleEvento.module.css';
import Footer from '../../Components/Footer';
import PrivateRoute from "@/app/Components/Token/page";

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
        console.error("Error al analizar el usuario del localStorage:", error);
    }

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/api/event/${id}`)
                .then(response => {
                    const eventData = response.data;
                    if (eventData.isPrivate && (!currentUser || !eventData.allowedUsers.includes(currentUser.username))) {
                        setError(new Error("No tienes permiso para ver este evento."));
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
            setError(new Error("ID de evento no proporcionado."));
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const formatStartDate = (startDate) => {
        if (!startDate) return "";
        const date = new Date(startDate);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <PrivateRoute>
            <div className={styles.container}>
                <div className={styles.detalleEvento}>
                    {detailEvent && (
                        <>
                            <h3 className={styles.h3}>{detailEvent.name}</h3>
                            <ul className={styles.ul} style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                <li className={styles.li}><strong>Hora de inicio:</strong> {formatStartDate(detailEvent.start_date)}</li>
                                <li className={styles.li}><strong>Duración:</strong> {detailEvent.duration_in_minutes} minutos</li>
                                <li className={styles.li}><strong>Descripción:</strong> {detailEvent.description}</li>
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
        </PrivateRoute>
    );
}
