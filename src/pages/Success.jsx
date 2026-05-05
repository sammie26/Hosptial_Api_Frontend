import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home, ArrowLeft } from 'lucide-react';

const Success = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message || "Operation completed successfully.";

    return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', 
            fontFamily: "'Outfit', sans-serif", position: 'relative' 
        }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;700&display=swap');`}</style>
            
            <div style={{ 
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
                background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)',
                zIndex: -1 
            }} />

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                style={{ 
                    textAlign: 'center', background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(30px)', 
                    padding: '60px', borderRadius: '40px', border: '3px solid #ffffff', 
                    maxWidth: '550px', boxShadow: '0 0 80px rgba(16, 185, 129, 0.2)' 
                }}
            >
                <CheckCircle color="#10b981" size={85} style={{ marginBottom: '25px', filter: 'drop-shadow(0 0 15px rgba(16, 185, 129, 0.6))' }} />
                <h2 style={{ color: 'white', fontSize: '36px', fontWeight: '700', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '20px' }}>
                    Authorized
                </h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '18px', lineHeight: '1.8', marginBottom: '50px', fontWeight: '200' }}>
                    {message}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <button 
                        onClick={() => navigate('/')} 
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 30px', borderRadius: '50px', border: '2px solid white', background: 'none', color: 'white', cursor: 'pointer', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '12px' }}
                    >
                        <Home size={18} /> Home Vector
                    </button>
                    <button 
                        onClick={() => navigate(-1)} 
                        style={{ padding: '15px 35px', borderRadius: '50px', border: 'none', background: 'white', color: '#020617', cursor: 'pointer', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '12px' }}
                    >
                        Return
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Success;