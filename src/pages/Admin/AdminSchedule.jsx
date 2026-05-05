import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { motion } from 'framer-motion';
import { Calendar, Trash2, CheckCircle, XCircle, Clock, Search } from 'lucide-react';

const AdminSchedule = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        API.get('/appointments/admin-all')
            .then(res => setAppointments(res.data))
            .catch(err => console.error("Error loading schedule", err))
            .finally(() => setLoading(false));
    }, []);

    const filteredAppointments = appointments.filter(app => 
        app.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const updateStatus = async (id, status) => {
        try {
            await API.patch(`/appointments/${id}/status`, { status: status });
            setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
        } catch (err) {
            alert("Failed to update status vector.");
        }
    };

    const handlePermanentDelete = async (id) => {
        if (window.confirm("WARNING: Initiate permanent record erasure?")) {
            try {
                await API.delete(`/appointments/${id}/permanent`);
                setAppointments(appointments.filter(a => a.id !== id));
            } catch (err) {
                alert("Failed to permanently delete.");
            }
        }
    };

    if (loading) return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', 
            color: 'white', letterSpacing: '5px', fontWeight: '700', background: '#020617', fontFamily: "'Outfit', sans-serif" 
        }}>
            DECRYPTING SCHEDULE VECTORS...
        </div>
    );

    return (
        <div style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', 
            padding: '60px 20px', fontFamily: "'Outfit', sans-serif", color: 'white', minHeight: '100vh',
            position: 'relative'
        }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;600;700&display=swap');`}</style>
            
            {/* FULL-PAGE ENGULFING GRADIENT */}
            <div style={{ 
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
                background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)',
                zIndex: -1 
            }} />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '1200px' }}>
                
                {/* Visual Header Icon and Title */}
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <Calendar color="#ffffff" size={64} style={{ filter: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.7))' }} />
                    <h1 style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '8px', textTransform: 'uppercase', textShadow: '0 0 25px white', marginTop: '20px' }}>
                        Master Schedule
                    </h1>
                </div>

                {/* SEARCH INTERFACE */}
                <div style={{ 
                    marginBottom: '40px', display: 'flex', background: 'rgba(2, 6, 23, 0.8)', 
                    backdropFilter: 'blur(20px)', padding: '30px', borderRadius: '25px', 
                    border: '3px solid #ffffff', boxShadow: '0 0 40px rgba(0, 180, 216, 0.2)' 
                }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={22} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '16px' }} />
                        <input 
                            type="text" placeholder="Search Patient or Medical Officer..." value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ 
                                width: '100%', padding: '18px 15px 18px 60px', background: 'rgba(255, 255, 255, 0.05)', 
                                border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '15px', color: 'white', 
                                outline: 'none', fontSize: '16px', boxSizing: 'border-box' 
                            }} 
                        />
                    </div>
                </div>

                {/* SCHEDULE TERMINAL TABLE */}
                <div style={{ 
                    background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(30px)', 
                    borderRadius: '40px', border: '4px solid #ffffff', overflow: 'hidden', 
                    boxShadow: '0 0 60px rgba(255, 255, 255, 0.1)' 
                }}>
                    <table width="100%" style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255, 255, 255, 0.1)', borderBottom: '4px solid #ffffff' }}>
                                <th style={{ padding: '30px', textAlign: 'left', letterSpacing: '4px', fontSize: '12px' }}>TIME VECTOR</th>
                                <th style={{ padding: '30px', textAlign: 'left', letterSpacing: '4px', fontSize: '12px' }}>PATIENT</th>
                                <th style={{ padding: '30px', textAlign: 'left', letterSpacing: '4px', fontSize: '12px' }}>MEDICAL OFFICER</th>
                                <th style={{ padding: '30px', textAlign: 'left', letterSpacing: '4px', fontSize: '12px' }}>STATUS</th>
                                <th style={{ padding: '30px', textAlign: 'center', letterSpacing: '4px', fontSize: '12px' }}>OVERRIDE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAppointments.length > 0 ? (
                                filteredAppointments.map(app => (
                                    <tr key={app.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.15)', transition: '0.3s' }}>
                                        <td style={{ padding: '25px 30px', color: '#00b4d8', fontSize: '15px', fontWeight: '600' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <Clock size={16} /> {new Date(app.date).toLocaleString()}
                                            </div>
                                        </td>
                                        <td style={{ padding: '25px 30px', fontWeight: '700', color: 'white', fontSize: '18px' }}>{app.patientName}</td>
                                        <td style={{ padding: '25px 30px', color: '#cbd5e1' }}> {app.doctorName}</td>
                                        <td style={{ padding: '25px 30px' }}>
                                            <span style={{ 
                                                padding: '8px 16px', borderRadius: '50px', fontSize: '10px', fontWeight: '700', 
                                                textTransform: 'uppercase', background: 'rgba(255,255,255,0.05)', 
                                                border: '2px solid #ffffff', textShadow: '0 0 10px white',
                                                color: app.status === 'Completed' ? '#10b981' : app.status === 'Cancelled' ? '#f87171' : '#fbbf24'
                                            }}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '25px 30px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
                                            <button 
                                                onClick={() => updateStatus(app.id, 'Completed')} 
                                                style={{ background: 'none', border: '2px solid #10b981', color: '#10b981', padding: '10px', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)' }} 
                                            >
                                                <CheckCircle size={20} />
                                            </button>
                                            <button 
                                                onClick={() => updateStatus(app.id, 'Cancelled')} 
                                                style={{ background: 'none', border: '2px solid #fbbf24', color: '#fbbf24', padding: '10px', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 0 15px rgba(251, 191, 36, 0.4)' }} 
                                            >
                                                <XCircle size={20} />
                                            </button>
                                            <button 
                                                onClick={() => handlePermanentDelete(app.id)} 
                                                style={{ background: 'none', border: '2px solid #ef4444', color: '#ef4444', padding: '10px', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)' }} 
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ padding: '60px', textAlign: 'center', color: '#64748b', letterSpacing: '2px' }}>
                                        NO SCHEDULE VECTORS MATCH THE CURRENT QUERY.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminSchedule;