import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { motion } from 'framer-motion';
import { Calendar, Plus, User, Clock, Trash2, Activity } from 'lucide-react';

const PatientPortal = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/appointments')
            .then(res => {
                setAppointments(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Could not fetch appointments", err);
                setLoading(false);
            });
    }, []);

    const handleCancel = async (id) => {
        if (window.confirm("WARNING: Permanent cancellation of this schedule vector?")) {
            try {
                await API.delete(`/appointments/${id}`);
                setAppointments(appointments.map(app => app.id === id ? { ...app, status: 'Cancelled' } : app));
            } catch (err) {
                alert("Failed to cancel appointment vector.");
            }
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white', letterSpacing: '5px', fontWeight: '700', background: '#020617', fontFamily: "'Outfit', sans-serif" }}>
            SYNCHRONIZING PORTAL DATA...
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px', fontFamily: "'Outfit', sans-serif", color: 'white', minHeight: '100vh', position: 'relative' }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;600;700&display=swap');`}</style>
            
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)', zIndex: -1 }} />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '900px' }}>
                
                {/* RESTRUCTURED HEADER ROW */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-end', 
                    marginBottom: '60px', 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingBottom: '20px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <Activity color="#ffffff" size={42} style={{ filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.7))' }} />
                        <h1 style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '8px', textTransform: 'uppercase', margin: 0, textShadow: '0 0 20px white' }}>
                            My Schedule
                        </h1>
                    </div>
                    
                    <Link to="/patient/book" style={{ 
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 25px', 
                        background: 'rgba(0, 18, 36, 0.6)', border: '2px solid #00b4d8', 
                        color: 'white', textDecoration: 'none', borderRadius: '12px', 
                        fontWeight: '700', fontSize: '13px', letterSpacing: '2px', 
                        textTransform: 'uppercase', boxShadow: '0 0 20px rgba(0, 180, 216, 0.3)',
                        transition: '0.3s'
                    }}>
                        <Plus size={18} /> New Appointment
                    </Link>
                </div>

                {/* APPOINTMENT GRID */}
                <div style={{ display: 'grid', gap: '25px' }}>
                    {appointments.length > 0 ? (
                        appointments.map(app => (
                            <motion.div 
                                key={app.id}
                                whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)' }}
                                style={{ 
                                    padding: '35px', 
                                    background: 'rgba(2, 6, 23, 0.8)', 
                                    backdropFilter: 'blur(20px)', 
                                    border: '1px solid rgba(255, 255, 255, 0.2)', 
                                    borderRadius: '24px', 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    opacity: app.status === 'Cancelled' ? 0.5 : 1
                                }}
                            >
                                {/* Temporal Vector Group */}
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: '10px', fontWeight: '700', color: '#00b4d8', letterSpacing: '2px', display: 'block', marginBottom: '10px' }}>TEMPORAL VECTOR</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <p style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>{new Date(app.date).toLocaleDateString()}</p>
                                        <div style={{ height: '20px', width: '1px', background: 'rgba(255,255,255,0.2)' }} />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                                            <Clock size={16} />
                                            <span style={{ fontSize: '16px' }}>{new Date(app.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Officer Info Group */}
                                <div style={{ flex: 1, paddingLeft: '40px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                                    <label style={{ fontSize: '10px', fontWeight: '700', color: '#00b4d8', letterSpacing: '2px', display: 'block', marginBottom: '10px' }}>ASSIGNED OFFICER</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ padding: '8px', background: 'rgba(0, 180, 216, 0.1)', borderRadius: '10px' }}>
                                            <User size={20} color="#00b4d8" />
                                        </div>
                                        <p style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}> {app.doctorName}</p>
                                    </div>
                                </div>

                                {/* Status & Actions Group */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: '40px' }}>
                                    <span style={{ 
                                        padding: '8px 20px', borderRadius: '10px', fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase',
                                        border: `1px solid ${app.status === 'Confirmed' ? '#10b981' : app.status === 'Cancelled' ? '#ef4444' : '#fbbf24'}`,
                                        color: app.status === 'Confirmed' ? '#10b981' : app.status === 'Cancelled' ? '#ef4444' : '#fbbf24',
                                        background: 'rgba(255, 255, 255, 0.03)'
                                    }}>
                                        {app.status}
                                    </span>
                                    
                                    {app.status === 'Pending' && (
                                        <button 
                                            onClick={() => handleCancel(app.id)}
                                            style={{ 
                                                background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', 
                                                color: '#ef4444', padding: '10px', borderRadius: '12px', 
                                                cursor: 'pointer', transition: '0.3s'
                                            }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div style={{ 
                            textAlign: 'center', padding: '80px', background: 'rgba(2, 6, 23, 0.4)', 
                            borderRadius: '30px', border: '2px dashed rgba(255, 255, 255, 0.1)' 
                        }}>
                            <p style={{ color: 'rgba(255, 255, 255, 0.3)', letterSpacing: '3px', fontSize: '14px', textTransform: 'uppercase' }}>
                                No Schedule Vectors Detected
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default PatientPortal;