import React, { useEffect, useState, useContext } from 'react';
import API from '../../services/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Users, Trash2, Eye, Search } from 'lucide-react';

const DoctorList = () => {
    const { user } = useContext(AuthContext);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await API.get('/doctors');
            setDoctors(response.data);
        } catch (err) {
            setError("Access Restricted: Synchronize credentials and retry.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("WARNING: Permanent erasure of Medical Officer record?")) {
            try {
                await API.delete(`/doctors/${id}`);
                setDoctors(doctors.filter(d => d.id !== id));
            } catch (err) {
                const message = err.response?.status === 403 
                    ? "Authorization Denied: Admin clearance required." 
                    : "Termination sequence failed.";
                alert(message);
            }
        }
    };

    const filteredDoctors = doctors.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.departmentName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white', letterSpacing: '5px', fontWeight: '700', background: '#020617', fontFamily: "'Outfit', sans-serif" }}>
            DECRYPTING OFFICER DIRECTORY...
        </div>
    );

    if (error) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#020617', color: '#ff4d4d', fontFamily: "'Outfit', sans-serif", letterSpacing: '2px' }}>
            {error}
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px', fontFamily: "'Outfit', sans-serif", color: 'white', minHeight: '100vh', position: 'relative' }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;600;700&display=swap');`}</style>
            
            {/* FULL-PAGE ENGULFING RADIAL GRADIENT */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)', zIndex: -1 }} />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '1200px' }}>
                
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <Users color="#ffffff" size={64} style={{ filter: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.7))' }} />
                    <h1 style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '8px', textTransform: 'uppercase', textShadow: '0 0 25px white', marginTop: '20px' }}>
                        Medical Officers
                    </h1>
                </div>

                {/* SEARCH INTERFACE */}
                <div style={{ marginBottom: '40px', display: 'flex', background: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(20px)', padding: '30px', borderRadius: '25px', border: '3px solid #ffffff', boxShadow: '0 0 40px rgba(0, 180, 216, 0.2)' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={22} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '16px' }} />
                        <input 
                            type="text" placeholder="Locate Officer or Sector..." value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '100%', padding: '18px 15px 18px 60px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '15px', color: 'white', outline: 'none', fontSize: '16px', boxSizing: 'border-box' }} 
                        />
                    </div>
                </div>

                <div style={{ background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(30px)', borderRadius: '40px', border: '4px solid #ffffff', overflow: 'hidden', boxShadow: '0 0 60px rgba(255, 255, 255, 0.1)' }}>
                    <table width="100%" style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255, 255, 255, 0.1)', borderBottom: '4px solid #ffffff' }}>
                                <th style={{ padding: '30px', textAlign: 'left', letterSpacing: '4px', fontSize: '12px' }}>OFFICER IDENTITY</th>
                                <th style={{ padding: '30px', textAlign: 'left', letterSpacing: '4px', fontSize: '12px' }}>CONTACT VECTOR</th>
                                <th style={{ padding: '30px', textAlign: 'left', letterSpacing: '4px', fontSize: '12px' }}>SECTOR</th>
                                <th style={{ padding: '30px', textAlign: 'center', letterSpacing: '4px', fontSize: '12px' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDoctors.length > 0 ? (
                                filteredDoctors.map(doctor => (
                                    <tr key={doctor.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.15)', transition: '0.3s' }}>
                                        <td style={{ padding: '25px 30px', fontWeight: '700', color: 'white', fontSize: '18px' }}> {doctor.name}</td>
                                        <td style={{ padding: '25px 30px', color: '#cbd5e1' }}>{doctor.email}</td>
                                        <td style={{ padding: '25px 30px' }}>
                                            <span style={{ padding: '6px 16px', borderRadius: '50px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', border: '1px solid #00b4d8', color: '#00b4d8' }}>
                                                {doctor.departmentName}
                                            </span>
                                        </td>
                                        <td style={{ padding: '25px 30px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
                                            <Link to={`/doctors/${doctor.id}`} style={{ padding: '10px', border: '2px solid #ffffff', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Eye size={20} />
                                            </Link>

                                            {user?.role === 'Admin' && (
                                                <button 
                                                    onClick={() => handleDelete(doctor.id)}
                                                    style={{ background: 'none', border: '2px solid #ef4444', color: '#ef4444', padding: '10px', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)' }}
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ padding: '60px', textAlign: 'center', color: '#64748b', letterSpacing: '2px' }}>
                                        NO OFFICER VECTORS DETECTED.
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

export default DoctorList;