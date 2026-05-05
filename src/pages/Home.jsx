import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Lock, ArrowRight, ShieldCheck, Activity, Folder, Users,
    Calendar, UserPlus, Settings, Stethoscope
} from 'lucide-react';

const Home = () => {
    const { user } = useContext(AuthContext);

    const FeatureItem = ({ icon: Icon, title, desc, delay }) => (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: delay }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '220px' }}
        >
            <div style={{ 
                width: '56px', height: '56px', borderRadius: '50%', 
                border: '1px solid rgba(255, 255, 255, 0.4)', 
                display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px',
                background: 'rgba(0, 0, 0, 0.4)', boxShadow: '0 0 15px rgba(255, 255, 255, 0.05)'
            }}>
                <Icon color="#ffffff" size={22} strokeWidth={1.2} />
            </div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: '600', color: '#ffffff', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{title}</h4>
            <p style={{ margin: 0, fontSize: '12px', color: '#ffffff', lineHeight: '1.8', fontWeight: '300', opacity: 0.8 }}>{desc}</p>
        </motion.div>
    );

    const ActionCard = ({ to, icon: Icon, title, description }) => (
        <motion.div
            whileHover={{ y: -8, boxShadow: '0 0 25px rgba(0, 180, 216, 0.2)' }} whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        >
            <Link to={to} style={{ 
                display: 'flex', flexDirection: 'column', padding: '28px', 
                background: 'rgba(2, 6, 23, 0.75)', backdropFilter: 'blur(20px)',
                textDecoration: 'none', borderRadius: '20px', border: '1px solid rgba(0, 180, 216, 0.2)',
                height: '100%', boxSizing: 'border-box'
            }}>
                <div style={{ marginBottom: '20px' }}><Icon color="#00b4d8" size={26} strokeWidth={1.2} /></div>
                <h3 style={{ margin: '0 0 12px 0', color: '#ffffff', fontSize: '16px', letterSpacing: '0.8px', fontWeight: '600' }}>{title}</h3>
                <p style={{ margin: '0 0 20px 0', color: '#ffffff', fontSize: '13px', flexGrow: 1, lineHeight: '1.8', fontWeight: '300', opacity: 0.7 }}>{description}</p>
                <div style={{ display: 'flex', alignItems: 'center', color: '#00b4d8', fontWeight: '600', fontSize: '11px', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                    Access Portal <ArrowRight size={14} style={{ marginLeft: '6px' }}/>
                </div>
            </Link>
        </motion.div>
    );

    return (
        <>
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;600;700&display=swap');`}
            </style>

            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                backgroundImage: 'url("/background.png")',
                backgroundSize: 'cover', backgroundPosition: 'center',
                zIndex: -1, backgroundColor: '#010409' 
            }} />

            <div style={{ 
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '40px 20px', 
                fontFamily: "'Outfit', sans-serif", 
                color: 'white', minHeight: '100vh'
            }}>
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: '0px' }}
                >
                    <img 
                        src="/logo.png" 
                        alt="MediConnect Logo" 
                        style={{ 
                            height: '340px', 
                            filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.15))' 
                        }} 
                        onError={(e) => e.target.style.display = 'none'}
                    />
                </motion.div>

                {!user ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '900px' }}>
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                            style={{ textAlign: 'center', marginBottom: '50px' }}
                        >
                            <h2 style={{ fontSize: '16px', fontWeight: '200', margin: '0 0 8px 0', color: '#ffffff', letterSpacing: '5px', textTransform: 'uppercase', opacity: 0.7 }}>Welcome to</h2>
                            
                            {/* NEW: Smaller text with subtle white glow */}
                            <h1 style={{ 
                                fontSize: '42px', 
                                fontWeight: '700', 
                                margin: '0 0 24px 0', 
                                color: '#ffffff',
                                letterSpacing: '2px', 
                                textTransform: 'uppercase',
                                textShadow: '0 0 12px rgba(255, 255, 255, 0.4)' 
                            }}>
                                MediConnect
                            </h1>
                            
                            <p style={{ fontSize: '14px', color: '#ffffff', maxWidth: '600px', margin: '0 auto', lineHeight: '2', fontWeight: '300', opacity: 0.8 }}>
                                Connect, Care, and Empower. Access your secure healthcare portal to manage appointments, records, and staff through our next-generation medical interface.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            style={{ marginBottom: '100px' }}
                        >
                            <Link to="/login" style={{ 
                                display: 'flex', alignItems: 'center', gap: '15px', padding: '16px 48px', 
                                background: 'rgba(0, 0, 0, 0.5)', color: '#ffffff', textDecoration: 'none', 
                                borderRadius: '50px', fontWeight: '600', fontSize: '14px',
                                border: '1px solid rgba(0, 180, 216, 0.6)', 
                                boxShadow: '0 0 30px rgba(0, 180, 216, 0.3), inset 0 0 10px rgba(0, 180, 216, 0.1)', 
                                backdropFilter: 'blur(10px)', letterSpacing: '2px', textTransform: 'uppercase'
                            }}>
                                <Lock size={16} color="#00b4d8" strokeWidth={2} /> Secure Login <ArrowRight size={16} color="#00b4d8" />
                            </Link>
                        </motion.div>

                        <div style={{ 
                            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '60px', 
                            borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '60px', width: '100%'
                        }}>
                            <FeatureItem delay={0.6} icon={ShieldCheck} title="Secure Access" desc="Advanced encryption protecting your data." />
                            <FeatureItem delay={0.7} icon={Activity} title="Better Care" desc="Seamless patient management at your fingertips." />
                            <FeatureItem delay={0.8} icon={Folder} title="Management" desc="Centralized records for maximum efficiency." />
                            <FeatureItem delay={0.9} icon={Users} title="Empower" desc="Collaborative tools for modern medical teams." />
                        </div>
                    </div>
                ) : (
                    <div style={{ width: '100%', maxWidth: '1100px', marginTop: '20px' }}>
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                            style={{ textAlign: 'center', marginBottom: '60px' }}
                        >
                            <h1 style={{ color: '#ffffff', fontSize: '32px', margin: '0 0 12px 0', fontWeight: '600', letterSpacing: '-0.5px' }}>
                                Portal / <span style={{color: '#00b4d8'}}>{user.role}</span>
                            </h1>
                            <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: '300', opacity: 0.7, letterSpacing: '1.5px' }}>
                                Connected as: {user.email}
                            </p>
                        </motion.div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                            {user.role === 'Admin' && (
                                <>
                                    <ActionCard to="/admin/schedule" icon={Calendar} title="Master Schedule" description="Comprehensive hospital-wide appointment oversight and database management." />
                                    <ActionCard to="/admin/register" icon={UserPlus} title="Staff Onboarding" description="Securely register and authorize new medical professionals into the system." />
                                    <ActionCard to="/admin/users" icon={Users} title="Identity Management" description="Global user audit and permission level administration." />
                                </>
                            )}
                            {user.role === 'Doctor' && (
                                <>
                                    <ActionCard to="/doctor/schedule" icon={Calendar} title="Clinical Schedule" description="Access your patient queue, medical histories, and start active sessions." />
                                    <ActionCard to="/doctor/profile-settings" icon={Settings} title="Public Profile" description="Modify your professional medical biography and clinical experience details." />
                                </>
                            )}
                            {user.role === 'Patient' && (
                                <>
                                    <ActionCard to="/patient/portal" icon={Activity} title="Personal Health" description="Review your upcoming consultations and past medical record summaries." />
                                    <ActionCard to="/patient/book" icon={Calendar} title="Book Consultation" description="Select a specialist and secure your next healthcare appointment." />
                                </>
                            )}
                            <ActionCard to="/doctors" icon={Stethoscope} title="Medical Directory" description="Explore our network of certified physicians and departments." />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;