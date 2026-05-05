import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { motion } from 'framer-motion';
import { Activity, User, Calendar, CheckCircle, XCircle } from 'lucide-react';

const VisitRecord = () => {
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        API.get(`/appointments/${appointmentId}`)
            .then(res => {
                setAppointment(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [appointmentId]);

    const handleCompleteVisit = async () => {
        setSubmitting(true);
        try {
            // Status update remains the primary action vector
            await API.patch(`/appointments/${appointmentId}/status`, { status: 'Completed' });
            navigate('/success', { state: { message: `Visit with ${appointment.patientName} completed successfully!` } });
        } catch (err) {
            console.error(err);
            alert("Error finalizing the clinical record.");
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', 
            color: 'white', letterSpacing: '5px', fontWeight: '700', background: '#020617', fontFamily: "'Outfit', sans-serif" 
        }}>
            INITIALIZING CLINICAL VECTOR...
        </div>
    );

    if (!appointment) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#020617' }}>
            <p style={{ color: '#ff4d4d', letterSpacing: '2px', fontWeight: '700' }}>IDENTITY NOT DETECTED OR ACCESS DENIED.</p>
        </div>
    );

    return (
        <div style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', 
            padding: '60px 20px', fontFamily: "'Outfit', sans-serif", color: 'white', minHeight: '100vh',
            position: 'relative'
        }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;600;700&display=swap');`}</style>
            
            {/* FULL-PAGE ENGULFING RADIAL GRADIENT */}
            <div style={{ 
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
                background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)',
                zIndex: -1 
            }} />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '850px' }}>
                
                {/* Header Icon and Terminal Title */}
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <Activity color="#ffffff" size={64} style={{ filter: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.7))' }} />
                    <h1 style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '8px', textTransform: 'uppercase', textShadow: '0 0 25px white', marginTop: '20px' }}>
                        Active Observation
                    </h1>
                </div>

                <div style={{ 
                    background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(35px)', padding: '50px', 
                    borderRadius: '40px', border: '3px solid #ffffff', boxShadow: '0 0 80px rgba(0, 180, 216, 0.15)' 
                }}>
                    
                    {/* Patient Context Sector */}
                    <div style={{ 
                        background: 'rgba(255, 255, 255, 0.05)', padding: '30px', borderRadius: '25px', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '10px' 
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <User color="#00b4d8" size={28} />
                                <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: 'white' }}>{appointment.patientName}</h3>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#00b4d8' }}>
                                <Calendar size={18} />
                                <span>{new Date(appointment.date).toLocaleString()}</span>
                            </div>
                        </div>
                        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px' }}>
                            <label style={{ fontSize: '11px', fontWeight: '700', color: '#00b4d8', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                                Primary Symptom Vector
                            </label>
                            <p style={{ margin: 0, fontStyle: 'italic', color: '#cbd5e1', fontSize: '16px' }}>
                                "{appointment.reason || 'None provided.'}"
                            </p>
                        </div>
                    </div>

                    {/* Action Sector - Shifted up following removal of Observations text area */}
                    <div style={{ display: 'flex', gap: '25px', marginTop: '40px' }}>
                        <motion.button 
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCompleteVisit} 
                            disabled={submitting} 
                            style={{ 
                                flex: 2, padding: '20px', background: 'rgba(0, 18, 36, 1)', 
                                color: '#10b981', border: '3px solid #10b981', borderRadius: '60px', 
                                cursor: submitting ? 'not-allowed' : 'pointer', fontWeight: '700', 
                                fontSize: '15px', letterSpacing: '2px', textTransform: 'uppercase',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'
                            }}
                        >
                            <CheckCircle size={20} />
                            {submitting ? 'PROCESSING...' : 'FINALIZE CLINICAL RECORD'}
                        </motion.button>

                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/doctor/schedule')} 
                            style={{ 
                                flex: 1, padding: '20px', background: 'rgba(255, 255, 255, 0.05)', 
                                color: 'white', border: '2px solid white', borderRadius: '60px', 
                                cursor: 'pointer', fontWeight: '700', fontSize: '12px', 
                                letterSpacing: '2px', textTransform: 'uppercase',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                            }}
                        >
                            <XCircle size={18} />
                            ABORT
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default VisitRecord;