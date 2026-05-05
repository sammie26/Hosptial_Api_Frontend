import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { motion } from 'framer-motion';
import { User, Shield, Briefcase, FileText, Save, Settings } from 'lucide-react';

const DoctorProfileSettings = () => {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [doctorId, setDoctorId] = useState(null);
    const [formData, setFormData] = useState({
        name: '', email: '', departmentId: '', bio: '', yearsOfExperience: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                
                const [deptRes, docRes] = await Promise.all([
                    API.get('/departments'),
                    API.get('/doctors/me')
                ]);
                
                setDepartments(deptRes.data);
                setDoctorId(docRes.data.id);
                setFormData({ 
                    name: docRes.data.name, 
                    email: docRes.data.email, 
                    departmentId: docRes.data.departmentId,
                    bio: docRes.data.bio,
                    yearsOfExperience: docRes.data.yearsOfExperience
                });
            } catch (err) {
                console.error(err);
                alert("Failed to synchronize profile data.");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/doctors/${doctorId}`, formData);
            navigate('/success', { state: { message: "Public identity vector updated successfully." } });
        } catch (err) {
            alert("Update sequence failed.");
        }
    };

    if (loading) return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', 
            color: 'white', letterSpacing: '5px', fontWeight: '700', background: '#020617', fontFamily: "'Outfit', sans-serif" 
        }}>
            DECRYPTING SETTINGS...
        </div>
    );

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

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '700px' }}>
                
                {/* Visual Header */}
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <Settings color="#ffffff" size={64} style={{ filter: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.7))' }} />
                    <h1 style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '5px', textTransform: 'uppercase', textShadow: '0 0 20px white', marginTop: '20px' }}>
                        Profile Configuration
                    </h1>
                </div>

                <div style={{ 
                    background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(30px)', padding: '50px', 
                    borderRadius: '40px', border: '3px solid #ffffff', boxShadow: '0 0 80px rgba(0, 180, 216, 0.15)' 
                }}>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
                        
                        {/* Primary Identity Row */}
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <label style={{ fontSize: '11px', fontWeight: '700', color: '#00b4d8', display: 'block', marginBottom: '10px', letterSpacing: '2px' }}>NAME VECTOR</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '15px' }} />
                                    <input 
                                        style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '12px', color: 'white', outline: 'none', boxSizing: 'border-box' }} 
                                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required 
                                    />
                                </div>
                            </div>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <label style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '10px', letterSpacing: '2px' }}>EMAIL (LOCKED)</label>
                                <input 
                                    style={{ width: '100%', padding: '15px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'rgba(255,255,255,0.4)', outline: 'none', boxSizing: 'border-box' }} 
                                    value={formData.email} readOnly 
                                />
                            </div>
                        </div>

                        {/* Professional Sector Row */}
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ flex: 2 }}>
                                <label style={{ fontSize: '11px', fontWeight: '700', color: '#00b4d8', display: 'block', marginBottom: '10px', letterSpacing: '2px' }}>ASSIGNED SECTOR</label>
                                <div style={{ position: 'relative' }}>
                                    <Shield size={18} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '15px' }} />
                                    <select 
                                        style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '12px', color: 'white', outline: 'none', cursor: 'pointer', appearance: 'none' }} 
                                        value={formData.departmentId} onChange={e => setFormData({...formData, departmentId: e.target.value})} required
                                    >
                                        {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontSize: '11px', fontWeight: '700', color: '#00b4d8', display: 'block', marginBottom: '10px', letterSpacing: '2px' }}>EXP (YEARS)</label>
                                <div style={{ position: 'relative' }}>
                                    <Briefcase size={18} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '15px' }} />
                                    <input 
                                        style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '12px', color: 'white', outline: 'none', boxSizing: 'border-box' }} 
                                        type="number" min="0" value={formData.yearsOfExperience} onChange={e => setFormData({...formData, yearsOfExperience: parseInt(e.target.value)})} 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Professional Biography Segment */}
                        <div>
                            <label style={{ fontSize: '11px', fontWeight: '700', color: '#00b4d8', display: 'block', marginBottom: '10px', letterSpacing: '2px' }}>IDENTITY NARRATIVE</label>
                            <div style={{ position: 'relative' }}>
                                <FileText size={18} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '15px' }} />
                                <textarea 
                                    style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '15px', color: 'white', outline: 'none', minHeight: '140px', boxSizing: 'border-box', lineHeight: '1.6' }} 
                                    placeholder="Enter professional medical background..."
                                    value={formData.bio} 
                                    onChange={e => setFormData({...formData, bio: e.target.value})} 
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
                            AUTHORIZE UPDATES
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default DoctorProfileSettings;