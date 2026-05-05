import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { motion } from 'framer-motion';
import { Calendar, Clock, Clipboard, ArrowRight, Activity, Search } from 'lucide-react';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        
        API.get('/appointments')
            .then(res => {
                setAppointments(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching schedule", err);
                setError("Failed to load your schedule. Please ensure you are logged in.");
                setLoading(false);
            });
    }, []);

    
    const filteredAppointments = appointments.filter(app => 
        app.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (app.reason && app.reason.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', 
            color: 'white', letterSpacing: '5px', fontWeight: '700', background: '#020617', fontFamily: "'Outfit', sans-serif" 
        }}>
            SYNCHRONIZING DAILY OPERATIONS...
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

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '1100px' }}>
                
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <Activity color="#ffffff" size={64} style={{ filter: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.7))' }} />
                    <h1 style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '8px', textTransform: 'uppercase', textShadow: '0 0 25px white', marginTop: '20px' }}>
                        My Daily Schedule
                    </h1>
                </div>

                {/* SEARCH ENGINE INTERFACE */}
                <div style={{ 
                    marginBottom: '50px', display: 'flex', background: 'rgba(2, 6, 23, 0.8)', 
                    backdropFilter: 'blur(20px)', padding: '30px', borderRadius: '25px', 
                    border: '3px solid #ffffff', boxShadow: '0 0 40px rgba(0, 180, 216, 0.2)' 
                }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={22} color="#00b4d8" style={{ position: 'absolute', left: '18px', top: '16px' }} />
                        <input 
                            type="text" placeholder="Search Patient Vector or Reason..." value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ 
                                width: '100%', padding: '18px 15px 18px 60px', background: 'rgba(255, 255, 255, 0.05)', 
                                border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '15px', color: 'white', 
                                outline: 'none', fontSize: '16px', boxSizing: 'border-box' 
                            }} 
                        />
                    </div>
                </div>
                
                {error && (
                    <div style={{ color: '#ff4d4d', background: 'rgba(255, 77, 77, 0.1)', border: '1px solid #ff4d4d', padding: '15px', borderRadius: '12px', marginBottom: '30px', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                    gap: '30px', 
                    width: '100%' 
                }}>
                    {filteredAppointments.length > 0 ? (
                        filteredAppointments.map(app => (
                            <motion.div 
                                key={app.id}
                                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 180, 216, 0.3)' }}
                                style={{ 
                                    background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(30px)', 
                                    padding: '35px', borderRadius: '30px', border: '3px solid #ffffff',
                                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '380px'
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                                        <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#00b4d8', textShadow: '0 0 10px rgba(0, 180, 216, 0.5)' }}>
                                            {app.patientName}
                                        </h3>
                                        <span style={{ 
                                            padding: '6px 14px', borderRadius: '50px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase',
                                            // Alert Logic: Red for Cancelled
                                            border: `2px solid ${app.status === 'Cancelled' ? '#ff4d4d' : app.status === 'Completed' ? '#10b981' : '#fbbf24'}`,
                                            color: app.status === 'Cancelled' ? '#ff4d4d' : app.status === 'Completed' ? '#10b981' : '#fbbf24',
                                            background: 'rgba(255,255,255,0.05)',
                                            textShadow: `0 0 8px ${app.status === 'Cancelled' ? '#ff4d4d' : app.status === 'Completed' ? '#10b981' : '#fbbf24'}`
                                        }}>
                                            {app.status}
                                        </span>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', opacity: 0.9 }}>
                                            <Calendar size={16} color="#00b4d8" /> 
                                            <span>{new Date(app.date).toLocaleDateString()}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', opacity: 0.9 }}>
                                            <Clock size={16} color="#00b4d8" /> 
                                            <span>{new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>

                                    <div style={{ 
                                        background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '15px', 
                                        border: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '14px', lineHeight: '1.6'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#00b4d8', fontSize: '11px', fontWeight: '700', letterSpacing: '1px' }}>
                                            <Clipboard size={14} /> REASON FOR VISIT
                                        </div>
                                        {app.reason || "No reason provided."}
                                    </div>
                                </div>

                                <button 
                                    onClick={() => navigate(`/doctor/visit/${app.id}`)}
                                    disabled={app.status !== 'Pending'}
                                    style={{ 
                                        marginTop: '30px', padding: '18px', 
                                        cursor: app.status !== 'Pending' ? 'not-allowed' : 'pointer', 
                                        background: app.status !== 'Pending' ? 'rgba(255,255,255,0.1)' : 'rgba(0, 18, 36, 0.9)', 
                                        border: `2px solid ${app.status !== 'Pending' ? 'rgba(255,255,255,0.2)' : '#00b4d8'}`, 
                                        color: app.status !== 'Pending' ? 'rgba(255,255,255,0.4)' : 'white',
                                        borderRadius: '50px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                        transition: '0.3s', boxShadow: app.status === 'Pending' ? '0 0 20px rgba(0, 180, 216, 0.4)' : 'none'
                                    }}
                                >
                                    {app.status === 'Completed' ? 'Visit Finished' : app.status === 'Cancelled' ? 'Visit Cancelled' : 'Authorize Visit'}
                                    <ArrowRight size={18} />
                                </button>
                            </motion.div>
                        ))
                    ) : (
                        <div style={{ 
                            textAlign: 'center', gridColumn: '1 / -1', padding: '80px', background: 'rgba(2, 6, 23, 0.5)', 
                            borderRadius: '30px', border: '2px dashed rgba(255, 255, 255, 0.3)', color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '2px'
                        }}>
                            NO APPOINTMENT VECTORS MATCH THE CURRENT QUERY.
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default DoctorDashboard;