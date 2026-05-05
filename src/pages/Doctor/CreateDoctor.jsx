import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Building } from 'lucide-react';

const CreateDoctor = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [deptId, setDeptId] = useState('');
    const [departments, setDepartments] = useState([]);
    const [status, setStatus] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        
        API.get('/departments')
            .then(res => setDepartments(res.data))
            .catch(() => setStatus({ type: 'error', message: 'Sector synchronization failed.' }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            await API.post('/doctors', { 
                name, 
                email, 
                departmentId: parseInt(deptId) 
            });
            
            setStatus({ type: 'success', message: 'Medical Officer successfully authorized.' });
            setTimeout(() => navigate('/doctors'), 2000);
        } catch (err) {
            const errorMsg = err.response?.data?.errors?.Name?.[0] || 'Authorization sequence failed.';
            setStatus({ type: 'error', message: errorMsg });
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
                
                /* Neutralizing browser default dropdown styles */
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

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '550px' }}>
                
                {/* Visual Onboarding Icon */}
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <UserPlus color="#ffffff" size={64} style={{ filter: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.7))' }} />
                </div>

                <div style={{ 
                    background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(30px)', padding: '50px', 
                    borderRadius: '40px', border: '3px solid #ffffff', boxShadow: '0 0 80px rgba(0, 180, 216, 0.15)' 
                }}>
                    
                    {status && (
                        <div style={{ 
                            color: status.type === 'success' ? '#10b981' : '#ff4d4d', 
                            background: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 77, 77, 0.1)', 
                            border: `1px solid ${status.type === 'success' ? '#10b981' : '#ff4d4d'}`, 
                            padding: '15px', borderRadius: '12px', fontSize: '14px', marginBottom: '30px', textAlign: 'center' 
                        }}>
                            {status.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
                        
                        {/* Name Input Vector */}
                        <div style={{ position: 'relative' }}>
                            <Building size={20} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '18px' }} />
                            <input 
                                type="text" placeholder="Designated Full Name" value={name} 
                                onChange={(e) => setName(e.target.value)} required 
                                style={{ width: '100%', padding: '18px 15px 18px 50px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '15px', color: 'white', outline: 'none', boxSizing: 'border-box' }}
                            />
                        </div>
                        
                        {/* Email Input Vector */}
                        <div style={{ position: 'relative' }}>
                            <Mail size={20} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '18px' }} />
                            <input 
                                type="email" placeholder="Official Email Vector" value={email} 
                                onChange={(e) => setEmail(e.target.value)} required 
                                style={{ width: '100%', padding: '18px 15px 18px 50px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '15px', color: 'white', outline: 'none', boxSizing: 'border-box' }}
                            />
                        </div>

                        {/* Sector Dropdown Selection */}
                        <div style={{ position: 'relative' }}>
                            <select 
                                value={deptId} 
                                onChange={(e) => setDeptId(e.target.value)} required 
                                style={{ width: '100%', padding: '18px', background: 'rgba(0, 18, 36, 0.6)', border: '1px solid #00b4d8', borderRadius: '15px', color: 'white', outline: 'none', cursor: 'pointer', appearance: 'none' }}
                            >
                                <option value="">SELECT ASSIGNED SECTOR</option>
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <motion.button 
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 180, 216, 0.8)' }}
                            whileTap={{ scale: 0.95 }}
                            type="submit" 
                            style={{ 
                                padding: '20px', background: 'rgba(0, 18, 36, 1)', color: 'white', 
                                border: '3px solid #00b4d8', borderRadius: '60px', fontWeight: '700', 
                                fontSize: '15px', letterSpacing: '4px', textTransform: 'uppercase', 
                                cursor: 'pointer', marginTop: '20px',
                                boxShadow: '0 0 30px rgba(0, 180, 216, 0.4)'
                            }}
                        >
                            SAVE MEDICAL OFFICER
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default CreateDoctor;