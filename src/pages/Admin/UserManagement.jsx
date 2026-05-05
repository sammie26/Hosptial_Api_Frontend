import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { motion } from 'framer-motion';
import { Shield, Search, Filter, ArrowRight } from 'lucide-react';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All'); 
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetching identity vectors from the central auth service
        API.get('/auth/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error("Identity synchronization failed", err))
            .finally(() => setLoading(false));
    }, []);

    // Filter logic handling both clearance levels and search queries
    const filteredUsers = users.filter(user => {
        const matchesRole = activeFilter === 'All' || user.role === activeFilter;
        const matchesSearch = user.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesRole && matchesSearch;
    });

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '100px', color: 'white', letterSpacing: '5px', fontWeight: '700', background: '#020617', minHeight: '100vh', fontFamily: "'Outfit', sans-serif" }}>
            DECRYPTING IDENTITY VECTORS...
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

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '1100px' }}>
                
                {/* Visual Identity Icon (Header Text Purged) */}
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <Shield color="#ffffff" size={64} style={{ filter: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.7))' }} />
                </div>

                {/* CONTROL PANEL: Separated Search & Filter */}
                <div style={{ 
                    marginBottom: '60px', display: 'flex', gap: '40px', alignItems: 'center',
                    background: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(20px)', padding: '40px', 
                    borderRadius: '35px', border: '3px solid #ffffff', boxShadow: '0 0 60px rgba(0, 180, 216, 0.2)' 
                }}>
                    
                    {/* Search Vector Input */}
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={22} color="#00b4d8" style={{ position: 'absolute', left: '18px', top: '18px' }} />
                        <input 
                            type="text" placeholder="Search Identity Vector..." value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ 
                                width: '100%', padding: '20px 15px 20px 60px', background: 'rgba(255, 255, 255, 0.05)', 
                                border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '15px', color: 'white', 
                                outline: 'none', fontSize: '18px', boxSizing: 'border-box' 
                            }} 
                        />
                    </div>

                    {/* Clearance Filter Selection */}
                    <div style={{ position: 'relative' }}>
                        <Filter size={18} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '21px' }} />
                        <select 
                            value={activeFilter}
                            onChange={(e) => setActiveFilter(e.target.value)}
                            style={{ 
                                padding: '20px 20px 20px 45px', background: 'rgba(0, 18, 36, 0.9)', color: 'white', 
                                border: '2px solid #00b4d8', borderRadius: '50px', fontWeight: '700', 
                                cursor: 'pointer', outline: 'none', appearance: 'none', minWidth: '220px',
                                boxShadow: '0 0 30px rgba(0, 180, 216, 0.4)', letterSpacing: '1px'
                            }}
                        >
                            <option value="All">ALL CLEARANCE</option>
                            <option value="Admin">ADMINS</option>
                            <option value="Doctor">DOCTORS</option>
                            <option value="Patient">PATIENTS</option>
                        </select>
                    </div>

                    <div style={{ minWidth: '100px', textAlign: 'right', fontSize: '12px', letterSpacing: '2px', opacity: 0.8 }}>
                        {filteredUsers.length} USERS DETECTED
                    </div>
                </div>

                {/* IDENTITY TERMINAL TABLE */}
                <div style={{ 
                    background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(30px)', 
                    borderRadius: '40px', border: '4px solid #ffffff', overflow: 'hidden', 
                    boxShadow: '0 0 50px rgba(255, 255, 255, 0.1)' 
                }}>
                    <table width="100%" style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255, 255, 255, 0.1)', borderBottom: '4px solid #ffffff' }}>
                                <th style={{ padding: '35px', textAlign: 'left', letterSpacing: '4px', fontSize: '12px' }}>EMAIL VECTOR</th>
                                <th style={{ padding: '35px', textAlign: 'left', letterSpacing: '4px', fontSize: '12px' }}>CLEARANCE</th>
                                <th style={{ padding: '35px', textAlign: 'center', letterSpacing: '4px', fontSize: '12px' }}>TERMINAL ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map(u => (
                                    <tr key={u.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.15)', transition: '0.3s' }}>
                                        <td style={{ padding: '30px 35px', color: '#00b4d8', fontWeight: '700', fontSize: '20px' }}>{u.email}</td>
                                        <td style={{ padding: '30px 35px' }}>
                                            <span style={{ 
                                                padding: '8px 20px', borderRadius: '50px', fontSize: '10px', fontWeight: '700', 
                                                textTransform: 'uppercase', background: 'rgba(255,255,255,0.05)', 
                                                border: '2px solid #ffffff', textShadow: '0 0 10px white' 
                                            }}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: '30px 35px', textAlign: 'center' }}>
                                            <button 
                                                onClick={() => navigate(`/admin/users/${u.id}`)}
                                                style={{ 
                                                    padding: '12px 30px', background: 'rgba(0, 18, 36, 0.8)', color: 'white', 
                                                    border: '2px solid #00b4d8', borderRadius: '50px', fontWeight: '700', 
                                                    cursor: 'pointer', boxShadow: '0 0 25px rgba(0, 180, 216, 0.5)',
                                                    display: 'inline-flex', alignItems: 'center', gap: '10px', letterSpacing: '1px'
                                                }}
                                            >
                                                VIEW ACCOUNT <ArrowRight size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ padding: '60px', textAlign: 'center', color: '#64748b', letterSpacing: '2px' }}>
                                        NO IDENTITY VECTORS MATCH THE CURRENT QUERY.
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

export default UserManagement;