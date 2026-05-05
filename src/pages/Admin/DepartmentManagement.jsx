import { useEffect, useState } from 'react';
import API from '../../services/api';
import { motion } from 'framer-motion';
import { Building, Plus, Layers } from 'lucide-react';

const DepartmentManagement = () => {
    const [departments, setDepartments] = useState([]);
    const [newDeptName, setNewDeptName] = useState('');
    const [status, setStatus] = useState(null);

    useEffect(() => { fetchDepartments(); }, []);

    const fetchDepartments = () => {
        API.get('/departments')
            .then(res => setDepartments(res.data))
            .catch(() => setStatus({ type: 'error', message: 'Sync failed.' }));
    };

    const handleAddDepartment = async (e) => {
        e.preventDefault();
        try {
            await API.post('/departments', { name: newDeptName });
            setNewDeptName('');
            setStatus({ type: 'success', message: 'Sector Mapped.' });
            fetchDepartments(); 
        } catch (err) { setStatus({ type: 'error', message: 'Mapping Error.' }); }
    };

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '60px 20px', 
            fontFamily: "'Outfit', sans-serif", 
            color: 'white',
            minHeight: '100vh',
            position: 'relative'
        }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;700&display=swap');`}</style>
            
            {/* 
              FULL-PAGE ENGULFING GRADIENT 
              
            */}
            <div style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100vw', 
                height: '100vh', 
                background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)',
                zIndex: -1 
            }} />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '900px' }}>
                
                {/* Visual Icon Header */}
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <Layers color="#ffffff" size={64} style={{ filter: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.6))' }} />
                </div>

                {/* High-Contrast Action Form */}
                <form onSubmit={handleAddDepartment} style={{ 
                    marginBottom: '70px', 
                    display: 'flex', 
                    gap: '40px', // Extensive gap to prevent overlap
                    background: 'rgba(2, 6, 23, 0.8)', 
                    backdropFilter: 'blur(20px)', 
                    padding: '40px', 
                    borderRadius: '35px', 
                    border: '3px solid #ffffff', 
                    boxShadow: '0 0 60px rgba(0, 180, 216, 0.2)' 
                }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Building size={24} color="#00b4d8" style={{ position: 'absolute', left: '18px', top: '18px' }} />
                        <input 
                            type="text" 
                            placeholder="Designate New Sector..." 
                            value={newDeptName} 
                            onChange={(e) => setNewDeptName(e.target.value)} 
                            required 
                            style={{ 
                                width: '100%', 
                                padding: '20px 15px 20px 60px', 
                                background: 'rgba(255, 255, 255, 0.05)', 
                                border: '1px solid rgba(255, 255, 255, 0.4)', 
                                borderRadius: '15px', 
                                color: 'white', 
                                outline: 'none', 
                                fontSize: '18px',
                                boxSizing: 'border-box' 
                            }} 
                        />
                    </div>
                    <button 
                        type="submit" 
                        style={{ 
                            padding: '0 45px', 
                            background: 'rgba(0, 18, 36, 0.9)', 
                            color: 'white', 
                            border: '3px solid #00b4d8', 
                            borderRadius: '60px', 
                            fontWeight: '700', 
                            fontSize: '14px',
                            letterSpacing: '2px',
                            cursor: 'pointer', 
                            boxShadow: '0 0 35px rgba(0, 180, 216, 0.6)',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <Plus size={22} style={{ marginRight: '12px', verticalAlign: 'middle' }} /> ADD SECTOR
                    </button>
                </form>

                {/* Data Terminal Table */}
                <div style={{ 
                    background: 'rgba(2, 6, 23, 0.9)', 
                    backdropFilter: 'blur(30px)', 
                    borderRadius: '40px', 
                    border: '4px solid #ffffff', 
                    overflow: 'hidden', 
                    boxShadow: '0 0 50px rgba(255, 255, 255, 0.1)' 
                }}>
                    <table width="100%" style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255, 255, 255, 0.1)', borderBottom: '4px solid #ffffff' }}>
                                <th style={{ padding: '35px', textAlign: 'left', letterSpacing: '4px', fontSize: '13px', color: '#00b4d8' }}>VECTOR ID</th>
                                <th style={{ padding: '35px', textAlign: 'left', letterSpacing: '4px', fontSize: '13px' }}>SECTOR NAME</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map(dept => (
                                <tr key={dept.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.15)', transition: '0.3s' }}>
                                    <td style={{ padding: '30px 35px', color: '#00b4d8', fontWeight: '700', fontSize: '22px' }}>{dept.id}</td>
                                    <td style={{ padding: '30px 35px', color: 'white', fontWeight: '400', fontSize: '22px', textShadow: '0 0 15px rgba(255, 255, 255, 0.5)' }}>{dept.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default DepartmentManagement;