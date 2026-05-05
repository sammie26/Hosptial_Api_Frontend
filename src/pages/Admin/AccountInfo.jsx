import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { motion } from 'framer-motion';
import { User, Shield, Save, Trash, Mail, Key } from 'lucide-react';

const AccountInfo = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [editEmail, setEditEmail] = useState('');
    
    const [actionMessage, setActionMessage] = useState('');

    useEffect(() => {
        
        API.get(`/auth/users/${id}`)
            .then(res => {
                setUser(res.data);
                setEditEmail(res.data.email);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load user data.");
                setLoading(false);
            });
    }, [id]);

    const handleUpdateEmail = async () => {
        if (!editEmail || !editEmail.includes('@')) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            await API.put(`/auth/users/${id}/email`, { newEmail: editEmail });
            setUser({ ...user, email: editEmail });
            setIsEditingEmail(false);
            setActionMessage("Email successfully updated!");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to update email.");
        }
    };

    const handleResetPassword = async () => {
        if (!newPassword || newPassword.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        try {
            await API.post(`/auth/users/${id}/reset-password`, { newPassword });
            setActionMessage("Password successfully reset!");
            setShowPasswordInput(false);
            setNewPassword('');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to reset password.");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`Are you absolutely sure you want to delete ${user.email}? This cannot be undone.`)) {
            return;
        }

        try {
            await API.delete(`/auth/users/${id}`);
            navigate('/admin/users');
        } catch (err) {
            console.error(err);
            alert("Failed to delete user.");
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white', letterSpacing: '5px', fontWeight: '700', background: '#020617', fontFamily: "'Outfit', sans-serif" }}>
            DECRYPTING IDENTITY VECTOR...
        </div>
    );

    return (
        <div style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', 
            padding: '60px 20px', fontFamily: "'Outfit', sans-serif", color: 'white', minHeight: '100vh',
            position: 'relative'
        }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;700&display=swap');`}</style>
            
            {/* FULL-PAGE ENGULFING GRADIENT */}
            <div style={{ 
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
                background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)',
                zIndex: -1 
            }} />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '500px' }}>
                
                {/* Visual Header Icon */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ width: '90px', height: '90px', borderRadius: '50%', border: '3px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px auto', boxShadow: '0 0 30px white' }}>
                        <User color="#00b4d8" size={50} />
                    </div>
                    <h1 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '5px', textTransform: 'uppercase', textShadow: '0 0 20px white' }}>
                        Account Information
                    </h1>
                </div>

                <div style={{ 
                    background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(35px)', padding: '50px', 
                    borderRadius: '40px', border: '3px solid #ffffff', boxShadow: '0 0 80px rgba(0, 0, 0, 0.8)' 
                }}>
                    
                    {actionMessage && <p style={{ color: '#10b981', textAlign: 'center', fontWeight: '700', fontSize: '15px', marginBottom: '30px', textShadow: '0 0 10px #10b981' }}>{actionMessage}</p>}

                    <div style={{ marginBottom: '40px' }}>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ fontSize: '11px', fontWeight: '700', color: '#00b4d8', display: 'block', marginBottom: '12px', letterSpacing: '3px' }}>IDENTITY VECTOR</label>
                            {!isEditingEmail ? (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span style={{ fontSize: '16px' }}>{user.email}</span>
                                    <button onClick={() => setIsEditingEmail(true)} style={{ background: 'none', border: 'none', color: '#00b4d8', cursor: 'pointer', fontWeight: '700', textDecoration: 'underline', fontSize: '12px' }}>EDIT</button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <input value={editEmail} onChange={e => setEditEmail(e.target.value)} style={{ flex: 1, padding: '12px', background: 'black', color: 'white', border: '1px solid #00b4d8', borderRadius: '12px', outline: 'none' }} />
                                    <button onClick={handleUpdateEmail} style={{ background: '#00b4d8', border: 'none', color: 'white', padding: '12px', borderRadius: '12px', cursor: 'pointer' }}><Save size={20} /></button>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label style={{ fontSize: '11px', fontWeight: '700', color: '#00b4d8', letterSpacing: '3px' }}>CLEARANCE</label>
                            <span style={{ fontSize: '14px', fontWeight: '700', color: 'white', border: '2px solid white', padding: '6px 18px', borderRadius: '50px', textShadow: '0 0 10px white' }}>
                                {user.role}
                            </span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '25px', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            {!showPasswordInput ? (
                                <button onClick={() => setShowPasswordInput(true)} style={{ width: '100%', padding: '18px', borderRadius: '50px', border: '3px solid white', background: 'none', color: 'white', fontWeight: '700', letterSpacing: '2px', cursor: 'pointer' }}>Reset Password</button>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <input type="password" placeholder="New Key Vector" value={newPassword} onChange={e => setNewPassword(e.target.value)} style={{ width: '100%', border: '1px solid white', background: 'black', borderRadius: '15px', padding: '15px', color: 'white', boxSizing: 'border-box', outline: 'none' }} />
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <button onClick={handleResetPassword} style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: '700', cursor: 'pointer' }}>SAVE</button>
                                        <button onClick={() => setShowPasswordInput(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: '700', cursor: 'pointer' }}>CANCEL</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button onClick={handleDelete} style={{ width: '100%', padding: '20px', borderRadius: '50px', border: '3px solid #ef4444', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', fontWeight: '700', letterSpacing: '2px', cursor: 'pointer', boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)' }}>ERASE IDENTITY</button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AccountInfo;