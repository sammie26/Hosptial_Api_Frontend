import { useState } from 'react';
import API from '../services/api';
import { motion } from 'framer-motion';
import { Mail, RefreshCw, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/forgot-password', { email });
            setSubmitted(true);
            setError('');
        } catch (err) {
            setError("No synchronized account found for this email.");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', fontFamily: "'Outfit', sans-serif" }}>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundImage: 'url("/ChatGPT Image May 5, 2026, 08_22_32 PM.png")', backgroundSize: 'cover', zIndex: -1, backgroundColor: '#010409' }} />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(20px)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.2)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                {!submitted ? (
                    <>
                        <RefreshCw color="#00b4d8" size={48} style={{ marginBottom: '20px' }} />
                        <h2 style={{ color: 'white', marginBottom: '10px' }}>Recovery Mode</h2>
                        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', lineHeight: '1.6', marginBottom: '25px' }}>
                            Authorize your email to receive password reset synchronization instructions.
                        </p>
                        
                        {error && <p style={{ color: '#ff4d4d', fontSize: '13px', marginBottom: '15px' }}>{error}</p>}
                        
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} color="rgba(255, 255, 255, 0.5)" style={{ position: 'absolute', left: '15px', top: '15px' }} />
                                <input 
                                    type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required 
                                    style={{ width: '100%', padding: '14px 15px 14px 45px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '12px', color: 'white', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </div>
                            <button type="submit" style={{ padding: '14px', background: '#00b4d8', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Send Reset Link
                            </button>
                        </form>
                    </>
                ) : (
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                        <CheckCircle color="#10b981" size={56} style={{ marginBottom: '20px' }} />
                        <h3 style={{ color: 'white', marginBottom: '10px' }}>Dispatch Successful</h3>
                        <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', fontSize: '14px' }}>
                            If an account exists for <strong style={{ color: '#00b4d8' }}>{email}</strong>, recovery protocols have been sent.[cite: 1]
                        </p>
                        <button onClick={() => setSubmitted(false)} style={{ background: 'none', border: 'none', color: '#00b4d8', cursor: 'pointer', marginTop: '20px', fontSize: '13px' }}>
                            Try alternate email
                        </button>
                    </motion.div>
                )}
                
                <Link to="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.4)', textDecoration: 'none', fontSize: '13px', marginTop: '30px' }}>
                    <ArrowLeft size={16} /> Return to Sign In
                </Link>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;