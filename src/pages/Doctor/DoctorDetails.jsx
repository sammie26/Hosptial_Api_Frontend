import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../services/api'; 
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Award, Mail, BookOpen, ArrowLeft, Edit3, Shield } from 'lucide-react';

const DoctorDetails = () => {
    const { id } = useParams();
    const { user: currentUser } = useContext(AuthContext); 
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await API.get(`/doctors/${id}`);
                setDoctor(response.data);
            } catch (err) {
                setError(err.response?.status === 404 ? "Dossier not found." : "Error loading identity vector.");
            } finally {
                setLoading(false);
            }
        };
        fetchDoctorDetails();
    }, [id]);

    if (loading) return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', 
            color: 'white', letterSpacing: '5px', fontWeight: '700', background: '#020617', fontFamily: "'Outfit', sans-serif" 
        }}>
            DECRYPTING BIOMETRIC DATA...
        </div>
    );

    if (error) return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', 
            background: '#020617', color: '#ff4d4d', fontFamily: "'Outfit', sans-serif", letterSpacing: '2px' 
        }}>
            {error}
        </div>
    );

    // SAFETY NET: Prevents the white screen crash if the API returns empty data
    if (!doctor) return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', 
            background: '#020617', color: '#ff4d4d', fontFamily: "'Outfit', sans-serif", letterSpacing: '2px' 
        }}>
            DATA FRAGMENT CORRUPTED OR MISSING.
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

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '700px' }}>
                
                {/* Visual Identity Header */}
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px auto', boxShadow: '0 0 40px white' }}>
                        <User color="#00b4d8" size={60} />
                    </div>
                    <h1 style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '6px', textTransform: 'uppercase', textShadow: '0 0 25px white' }}>
                         {doctor.name}
                    </h1>
                </div>

                {/* DOSSIER TERMINAL CARD */}
                <div style={{ 
                    background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(35px)', padding: '50px', 
                    borderRadius: '40px', border: '3px solid #ffffff', boxShadow: '0 0 80px rgba(0, 180, 216, 0.15)' 
                }}>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        
                        {/* Biometric Sector: Department */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <Shield color="#00b4d8" size={24} />
                            <div>
                                <label style={{ fontSize: '10px', fontWeight: '700', color: '#00b4d8', letterSpacing: '2px', textTransform: 'uppercase' }}>Assigned Sector</label>
                                <p style={{ fontSize: '18px', fontWeight: '400', margin: 0 }}>{doctor.departmentName}</p>
                            </div>
                        </div>

                        {/* Biometric Sector: Experience */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <Award color="#00b4d8" size={24} />
                            <div>
                                <label style={{ fontSize: '10px', fontWeight: '700', color: '#00b4d8', letterSpacing: '2px', textTransform: 'uppercase' }}>Service Duration</label>
                                <p style={{ fontSize: '18px', fontWeight: '400', margin: 0 }}>{doctor.yearsOfExperience} Standard Years</p>
                            </div>
                        </div>

                        {/* Biometric Sector: Contact */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <Mail color="#00b4d8" size={24} />
                            <div>
                                <label style={{ fontSize: '10px', fontWeight: '700', color: '#00b4d8', letterSpacing: '2px', textTransform: 'uppercase' }}>Communication Vector</label>
                                <p style={{ fontSize: '18px', fontWeight: '400', margin: 0 }}>{doctor.email}</p>
                            </div>
                        </div>

                        {/* Professional Biography Narrative */}
                        <div style={{ 
                            marginTop: '20px', background: 'rgba(255, 255, 255, 0.05)', padding: '30px', 
                            borderRadius: '25px', border: '1px solid rgba(255, 255, 255, 0.1)' 
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', color: '#00b4d8' }}>
                                <BookOpen size={18} />
                                <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>Professional Narrative</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '15px', color: '#cbd5e1', lineHeight: '1.7', fontStyle: 'italic' }}>
                                "{doctor.bio}"
                            </p>
                        </div>
                    </div>

                    {/* UPDATED NAVIGATION CONTAINER: Added width: 100% and gap: 30px to force separation */}
                    <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '30px', flexWrap: 'wrap' }}>
                        
                        <Link to="/doctors" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00b4d8', textDecoration: 'none', fontSize: '13px', fontWeight: '700', letterSpacing: '2px' }}>
                            <ArrowLeft size={16} /> RETURN TO DIRECTORY
                        </Link>

                        {/* ULTRA-MINIMAL ADMIN BUTTON */}
                        {currentUser?.role === 'Admin' && (
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link 
                                    to={`/doctors/edit/${id}`} 
                                    style={{ 
                                        display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', 
                                        background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.3)', 
                                        color: '#10b981', borderRadius: '30px', textDecoration: 'none', 
                                        fontSize: '9px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase'
                                    }}
                                >
                                    <Edit3 size={12} /> ADMIN OVERRIDE
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DoctorDetails;