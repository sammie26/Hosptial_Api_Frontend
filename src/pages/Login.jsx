import { useState, useContext } from 'react';
import { loginUser } from '../services/api'; 
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Key, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    
    const { login } = useContext(AuthContext); 
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await loginUser({ email, password });
            if (response.data && response.data.token) {
                login(response.data);
                navigate('/');
            }
        } catch (err) {
            const message = err.response?.status === 401 
                ? "Invalid identity credentials." 
                : "Secure server connection failed.";
            setError(message);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: "'Outfit', sans-serif" }}>
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;600;700&display=swap');`}
            </style>
            
            <div style={{ 
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
                background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)',
                zIndex: -1 
            }} />

            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                style={{ 
                    background: 'rgba(2, 6, 23, 0.85)', 
                    backdropFilter: 'blur(35px)', 
                    padding: '60px 50px', 
                    borderRadius: '40px', 
                    border: '3px solid #ffffff', 
                    boxShadow: '0 0 80px rgba(0, 180, 216, 0.15)', 
                    width: '100%', 
                    maxWidth: '450px' 
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '45px' }}>
                    <div style={{ 
                        display: 'inline-flex', padding: '20px', borderRadius: '50%', 
                        border: '2px solid rgba(255,255,255,0.8)', marginBottom: '25px',
                        boxShadow: '0 0 30px rgba(255,255,255,0.1)'
                    }}>
                        <ShieldCheck color="#ffffff" size={48} strokeWidth={1.5} />
                    </div>
                    <h2 style={{ color: '#ffffff', fontSize: '26px', letterSpacing: '6px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '15px' }}>
                        Identity Access
                    </h2>
                    <p style={{ color: '#ffffff', fontSize: '14px', letterSpacing: '2px', fontWeight: '200', opacity: 0.8 }}>
                        AUTHORIZE SESSION TO CONTINUE
                    </p>
                </div>

                {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#ff4d4d', background: 'rgba(255, 77, 77, 0.05)', border: '1px solid #ff4d4d', padding: '15px', borderRadius: '15px', fontSize: '13px', marginBottom: '30px', textAlign: 'center', fontWeight: '600', letterSpacing: '1px' }}>
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div style={{ position: 'relative' }}>
                        <Mail size={18} color="#00b4d8" style={{ position: 'absolute', left: '20px', top: '18px' }} />
                        <input 
                            type="email" placeholder="EMAIL ADDRESS" value={email} onChange={(e) => setEmail(e.target.value)} required 
                            style={{ 
                                width: '100%', padding: '18px 20px 18px 55px', background: 'rgba(255, 255, 255, 0.05)', 
                                border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '18px', color: 'white', 
                                fontSize: '15px', outline: 'none', boxSizing: 'border-box', fontFamily: "'Outfit', sans-serif", letterSpacing: '1px'
                            }}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Key size={18} color="#00b4d8" style={{ position: 'absolute', left: '20px', top: '18px' }} />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} required 
                            style={{ 
                                width: '100%', padding: '18px 55px 18px 55px', background: 'rgba(255, 255, 255, 0.05)', 
                                border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '18px', color: 'white', 
                                fontSize: '15px', outline: 'none', boxSizing: 'border-box', fontFamily: "'Outfit', sans-serif", letterSpacing: '1px'
                            }}
                        />
                        <div 
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ position: 'absolute', right: '20px', top: '18px', cursor: 'pointer', opacity: 0.6 }}
                        >
                            {showPassword ? <EyeOff size={18} color="#00b4d8" /> : <Eye size={18} color="#00b4d8" />}
                        </div>
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 180, 216, 0.8)' }} whileTap={{ scale: 0.95 }}
                        type="submit" style={{ 
                            padding: '20px', background: 'rgba(0, 18, 36, 1)', color: 'white', 
                            border: '3px solid #00b4d8', borderRadius: '60px', 
                            fontWeight: '700', fontSize: '14px', cursor: 'pointer', 
                            letterSpacing: '4px', textTransform: 'uppercase', display: 'flex', 
                            alignItems: 'center', justifyContent: 'center', gap: '15px',
                            marginTop: '20px', boxShadow: '0 0 20px rgba(0, 180, 216, 0.4)'
                        }}
                    >
                        SIGN IN <ArrowRight size={20} strokeWidth={2.5} />
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;