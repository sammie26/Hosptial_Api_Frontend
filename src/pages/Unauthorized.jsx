import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const Unauthorized = () => (
    <div style={{ 
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', 
        fontFamily: "'Outfit', sans-serif", color: 'white', textAlign: 'center' 
    }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;700&display=swap');`}</style>
        
        <div style={{ 
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
            background: 'radial-gradient(circle at center, #450a0a 0%, #020617 100%)',
            zIndex: -1 
        }} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <ShieldAlert size={100} color="#ef4444" style={{ marginBottom: '30px', filter: 'drop-shadow(0 0 30px #ef4444)' }} />
            <h1 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '10px', textTransform: 'uppercase', color: '#ef4444', marginBottom: '10px' }}>
                Access Denied
            </h1>
            <p style={{ fontSize: '18px', letterSpacing: '4px', textTransform: 'uppercase', opacity: 0.7, marginBottom: '50px' }}>
                Insufficient Clearance for this Sector
            </p>
            <Link to="/" style={{ 
                padding: '18px 40px', border: '2px solid white', borderRadius: '60px', 
                color: 'white', textDecoration: 'none', fontWeight: '700', letterSpacing: '3px', 
                textTransform: 'uppercase', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '15px' 
            }}>
                <ArrowLeft size={18} /> Return to Neutral Zone
            </Link>
        </motion.div>
    </div>
);

export default Unauthorized;