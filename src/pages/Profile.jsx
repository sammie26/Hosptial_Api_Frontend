import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, ShieldCheck, Activity } from 'lucide-react';

const Profile = () => {
    const { user } = useContext(AuthContext);

    if (!user) return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', 
            color: 'white', letterSpacing: '5px', background: '#020617', fontFamily: "'Outfit', sans-serif" 
        }}>
            DECRYPTING IDENTITY...
        </div>
    );

    return (
        <div style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', 
            padding: '80px 20px', fontFamily: "'Outfit', sans-serif", color: 'white', minHeight: '100vh',
            position: 'relative'
        }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;700&display=swap');`}</style>
            
            <div style={{ 
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
                background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)',
                zIndex: -1 
            }} />

            <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                style={{ 
                    background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(35px)', padding: '60px', 
                    borderRadius: '40px', border: '3px solid #ffffff', width: '100%', maxWidth: '500px',
                    textAlign: 'center', boxShadow: '0 0 80px rgba(255, 255, 255, 0.1)'
                }}
            >
                <div style={{ marginBottom: '40px' }}>
                    <Activity color="#00b4d8" size={50} style={{ marginBottom: '20px' }} />
                    <h2 style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '6px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
                        My Profile
                    </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <Mail color="#00b4d8" size={20} />
                        <label style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '2px', opacity: 0.5 }}>EMAIL</label>
                        <p style={{ margin: 0, fontSize: '20px', fontWeight: '400' }}>{user.email}</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                        <ShieldCheck color="#10b981" size={20} />
                        <label style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '2px', opacity: 0.5 }}>AUTHORIZATION LEVEL</label>
                        <span style={{ 
                            background: 'white', color: '#020617', padding: '10px 25px', 
                            borderRadius: '50px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '12px' 
                        }}>
                            {user.role}
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;