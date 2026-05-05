import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { motion } from 'framer-motion';
import { User, Shield, Award, Phone, Save, Edit3 } from 'lucide-react';

const EditDoctor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        departmentId: '',
        phoneNumber: ''
    });

    useEffect(() => {
        
        const loadInitialData = async () => {
            try {
                const [deptRes, docRes] = await Promise.all([
                    API.get('/departments'),
                    API.get(`/doctors/${id}`)
                ]);
                setDepartments(deptRes.data);
                setFormData(docRes.data);
            } catch (err) {
                console.error("Error loading doctor data", err);
            }
        };
        loadInitialData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/doctors/${id}`, formData);
            navigate(`/doctors/${id}`);
        } catch (err) {
            alert("Failed to update doctor information vector.");
        }
    };

    return (
        <div style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', 
            padding: '60px 20px', fontFamily: "'Outfit', sans-serif", color: 'white', minHeight: '100vh',
            position: 'relative'
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;700&display=swap');
                select option {
                    background-color: #020617;
                    color: white;
                }
            `}</style>
            
            {/* FULL-PAGE ENGULFING RADIAL GRADIENT */}
            <div style={{ 
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
                background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)',
                zIndex: -1 
            }} />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '600px' }}>
                
                {/* Visual Header */}
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <Edit3 color="#ffffff" size={64} style={{ filter: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.7))' }} />
                    <h1 style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '5px', textTransform: 'uppercase', textShadow: '0 0 20px white', marginTop: '20px' }}>
                        Override Profile
                    </h1>
                </div>

                <div style={{ 
                    background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(30px)', padding: '50px', 
                    borderRadius: '40px', border: '3px solid #ffffff', boxShadow: '0 0 80px rgba(0, 180, 216, 0.15)' 
                }}>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
                        
                        {/* Name Input Vector */}
                        <div style={{ position: 'relative' }}>
                            <label style={{ fontSize: '11px', fontWeight: '700', color: '#00b4d8', display: 'block', marginBottom: '10px', letterSpacing: '2px' }}>NAME IDENTITY</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '15px' }} />
                                <input 
                                    style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '12px', color: 'white', outline: 'none', boxSizing: 'border-box' }} 
                                    placeholder="Doctor Name" value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})} required
                                />
                            </div>
                        </div>

                        {/* Sector Selection */}
                        <div style={{ position: 'relative' }}>
                            <label style={{ fontSize: '11px', fontWeight: '700', color: '#00b4d8', display: 'block', marginBottom: '10px', letterSpacing: '2px' }}>ASSIGNED SECTOR</label>
                            <div style={{ position: 'relative' }}>
                                <Shield size={18} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '15px' }} />
                                <select 
                                    style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '12px', color: 'white', outline: 'none', cursor: 'pointer', appearance: 'none' }} 
                                    value={formData.departmentId} onChange={e => setFormData({...formData, departmentId: e.target.value})} required
                                >
                                    <option value="">Select Department Sector</option>
                                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Specialization Vector */}
                        <div style={{ position: 'relative' }}>
                            <label style={{ fontSize: '11px', fontWeight: '700', color: '#00b4d8', display: 'block', marginBottom: '10px', letterSpacing: '2px' }}>FIELD SPECIALIZATION</label>
                            <div style={{ position: 'relative' }}>
                                <Award size={18} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '15px' }} />
                                <input 
                                    style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '12px', color: 'white', outline: 'none', boxSizing: 'border-box' }} 
                                    placeholder="Specialization" value={formData.specialization}
                                    onChange={e => setFormData({...formData, specialization: e.target.value})}
                                />
                            </div>
                        </div>

                        {/* Contact Vector */}
                        <div style={{ position: 'relative' }}>
                            <label style={{ fontSize: '11px', fontWeight: '700', color: '#00b4d8', display: 'block', marginBottom: '10px', letterSpacing: '2px' }}>COMMUNICATION LINK</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={18} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '15px' }} />
                                <input 
                                    style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '12px', color: 'white', outline: 'none', boxSizing: 'border-box' }} 
                                    placeholder="Phone Number" value={formData.phoneNumber}
                                    onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                                />
                            </div>
                        </div>

                        <motion.button 
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 180, 216, 0.8)' }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            style={{ 
                                padding: '20px', background: 'rgba(0, 18, 36, 1)', color: 'white', 
                                border: '3px solid #00b4d8', borderRadius: '60px', fontWeight: '700', 
                                fontSize: '15px', letterSpacing: '4px', textTransform: 'uppercase', 
                                cursor: 'pointer', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                boxShadow: '0 0 30px rgba(0, 180, 216, 0.4)'
                            }}
                        >
                            <Save size={20} />
                            AUTHORIZE OVERRIDE
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default EditDoctor;