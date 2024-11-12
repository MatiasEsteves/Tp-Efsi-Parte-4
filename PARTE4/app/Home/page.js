'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import styles from './Home.module.css';
import PrivateRoute from "../Componentes/Token/page.js"; 
import Footer from "../Componentes/Footer";

function ListadoEvents() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [events, setEvents] = useState([]);  
    const router = useRouter();

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/event");
            setEvents(response.data.events);  
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Procesando pedido</div>;
    }

    if (error) {
        return <div className={styles.error}>{error.message}</div>;
    }

    return (
        <PrivateRoute>
            <div className={styles.container}>
                <h3 className={styles.heading}>Eventos</h3>
                <ul className={styles.eventList}>
                    {events.map(event => (
                        <li key={event.id} className={styles.eventItem}>
                            <h1>{event.name} - {event.category_name}</h1>
                            <button className={styles.eventButton} onClick={() => router.push(`/DetalleEvento/${event.id}`)}>
                                Ver Mas
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer/>
        </PrivateRoute>
        
    );
}

export default ListadoEvents;