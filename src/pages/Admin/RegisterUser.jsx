import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, UserCheck, Shield, Eye, EyeOff, Check, Circle } from 'lucide-react';

const RegisterUser = () => {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Doctor'); 
    const [name, setName] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    
    const [showPassword, setShowPassword] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Identity Constraint Verification Logic
    const requirements = [
        { label: '6+ CHARACTERS', test: (p) => p.length >= 6 },
        { label: 'UPPERCASE VECTOR', test: (p) => /[A-Z]/.test(p) },
        { label: 'LOWERCASE VECTOR', test: (p) => /[a-z]/.test(p) },
        { label: 'NUMERIC DIGIT', test: (p) => /[0-9]/.test(p) },
        { label: 'SPECIAL CHARACTER', test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) }
    ];

    useEffect(() => {
        API.get('/departments') 
            .then(res => setDepartments(res.data))
            .catch(err => console.error("Sector synchronization failed", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const payload = {
            email,
            password,
            role,
            name,
            departmentId: departmentId ? parseInt(departmentId) : 0 
        };

        try {
            await API.post('/auth/register', payload);
            navigate('/success', { state: { message: `New ${role} identity synchronized.` } });
        } catch (err) {
            if (err.response?.data && Array.isArray(err.response.data)) {
                setError(err.response.data[0].description);
            } else {
                setError(err.response?.data?.message || "Identity synchronization failed.");
            }
        } finally {
            setLoading(false);
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
                select option { background-color: #020617; color: white; }
            `}</style>
            
            <div style={{ 
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
                background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)',
                zIndex: -1 
            }} />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '550px' }}>
                
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <UserPlus color="#ffffff" size={64} style={{ filter: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.7))' }} />
                    <h1 style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '5px', textTransform: 'uppercase', textShadow: '0 0 20px white', marginTop: '20px' }}>
                        Register Users
                    </h1>
                </div>

                <div style={{ 
                    background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(30px)', padding: '50px', 
                    borderRadius: '40px', border: '3px solid #ffffff', boxShadow: '0 0 80px rgba(0, 180, 216, 0.15)' 
                }}>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        
                        <div style={{ position: 'relative' }}>
                            <Shield size={20} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '18px' }} />
                            <select 
                                value={role} 
                                onChange={(e) => setRole(e.target.value)}
                                style={{ width: '100%', padding: '18px 15px 18px 50px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '15px', color: 'white', outline: 'none', cursor: 'pointer', appearance: 'none' }}
                            >
                                <option value="Admin">ADMIN CLEARANCE</option>
                                <option value="Doctor">DOCTOR CLEARANCE</option>
                                <option value="Patient">PATIENT CLEARANCE</option>
                            </select>
                        </div>

                        <div style={{ position: 'relative' }}>
                            <Mail size={20} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '18px' }} />
                            <input 
                                type="email" placeholder="Email Vector" value={email} 
                                onChange={e => setEmail(e.target.value)} required 
                                style={{ width: '100%', padding: '18px 15px 18px 50px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '15px', color: 'white', outline: 'none', boxSizing: 'border-box' }}
                            />
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ position: 'relative' }}>
                                <Lock size={20} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '18px' }} />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Access Key" value={password} 
                                    onChange={e => setPassword(e.target.value)} required
                                    style={{ width: '100%', padding: '18px 50px 18px 50px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '15px', color: 'white', outline: 'none', boxSizing: 'border-box' }}
                                />
                                <div 
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '15px', top: '18px', cursor: 'pointer', color: '#00b4d8' }}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </div>
                            </div>

                            {/* ACTIVE IDENTITY REQUIREMENT CHECKLIST */}
                            <div style={{ 
                                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', 
                                background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '15px',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                {requirements.map((req, index) => {
                                    const isMet = req.test(password);
                                    return (
                                        <div key={index} style={{ 
                                            display: 'flex', alignItems: 'center', gap: '10px',
                                            color: isMet ? '#10b981' : 'rgba(255,255,255,0.4)',
                                            fontSize: '10px', fontWeight: '700', letterSpacing: '1px',
                                            transition: '0.3s'
                                        }}>
                                            {isMet ? <Check size={14} /> : <Circle size={14} opacity={0.5} />}
                                            {req.label}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {(role === 'Doctor' || role === 'Patient') && (
                            <div style={{ position: 'relative' }}>
                                <UserCheck size={20} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '18px' }} />
                                <input 
                                    type="text" placeholder="Designated Full Name" value={name} 
                                    onChange={e => setName(e.target.value)} required 
                                    style={{ width: '100%', padding: '18px 15px 18px 50px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '15px', color: 'white', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </div>
                        )}

                        {role === 'Doctor' && (
                            <div style={{ position: 'relative' }}>
                                <select 
                                    value={departmentId} 
                                    onChange={e => setDepartmentId(e.target.value)} required 
                                    style={{ width: '100%', padding: '18px', background: 'rgba(0, 18, 36, 0.6)', border: '1px solid #00b4d8', borderRadius: '15px', color: 'white', outline: 'none', cursor: 'pointer' }}
                                >
                                    <option value="" disabled>Assigned Sector...</option>
                                    {departments.map(dept => (
                                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <motion.button 
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 180, 216, 0.8)' }}
                            whileTap={{ scale: 0.95 }}
                            type="submit" disabled={loading}
                            style={{ 
                                padding: '20px', background: 'rgba(0, 18, 36, 1)', color: 'white', 
                                border: '3px solid #00b4d8', borderRadius: '60px', fontWeight: '700', 
                                fontSize: '15px', letterSpacing: '4px', textTransform: 'uppercase', 
                                cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px'
                            }}
                        >
                            {loading ? 'SYNCHRONIZING...' : `AUTHORIZE IDENTITY`}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterUser;