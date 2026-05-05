import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const linkStyle = {
        color: 'rgba(255, 255, 255, 0.6)',
        textDecoration: 'none',
        fontWeight: '700',
        fontSize: '10px',
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        transition: '0.3s',
        padding: '8px 12px',
        borderRadius: '8px',
        textAlign: 'center'
    };

    return (
        <nav style={{
            padding: '20px 50px',
            background: 'rgba(2, 6, 23, 0.85)', 
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            borderBottom: '2px solid #00b4d8', 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 10px 50px rgba(0, 180, 216, 0.2)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            width: '100%',
            boxSizing: 'border-box',
            fontFamily: "'Outfit', sans-serif" 
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;700&display=swap');
                .nav-link:hover {
                    color: #ffffff !important;
                    text-shadow: 0 0 15px rgba(0, 180, 216, 0.8);
                    background: rgba(255, 255, 255, 0.03);
                }
            `}</style>

            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                <motion.img 
                    whileHover={{ scale: 1.05, filter: 'drop-shadow(0 0 25px #00b4d8)' }}
                    src="/logo.png" 
                    alt="Hospital Systems Logo" 
                    style={{ 
                        height: '85px',
                        width: 'auto',
                        filter: 'drop-shadow(0 0 12px rgba(0, 180, 216, 0.7))',
                    }} 
                />
            </Link>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                {user?.role === 'Admin' && (
                    <>
                        <Link to="/admin/schedule" className="nav-link" style={linkStyle}>Master Schedule</Link>
                        <Link to="/admin/users" className="nav-link" style={linkStyle}>Manage Users</Link>
                        <Link to="/admin/departments" className="nav-link" style={linkStyle}>Departments</Link>
                        <Link to="/admin/register" className="nav-link" style={linkStyle}>Register Staff</Link>
                    </>
                )}

                {user?.role === 'Doctor' && (
                    <>
                        <Link to="/doctor/schedule" className="nav-link" style={linkStyle}>My Schedule</Link>
                        <Link to="/doctor/profile-settings" className="nav-link" style={linkStyle}>Edit Profile</Link>
                    </>
                )}

                {user?.role === 'Patient' && (
                    <>
                        <Link to="/patient/portal" className="nav-link" style={linkStyle}>My Portal</Link>
                        <Link to="/patient/book" className="nav-link" style={linkStyle}>Book Appointment</Link>
                    </>
                )}

                {user && (
                    <>
                        <Link to="/doctors" className="nav-link" style={linkStyle}>Doctors Directory</Link>
                        <Link to="/profile" className="nav-link" style={linkStyle}>My Profile</Link>
                    </>
                )}
            </div>

            {user && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                    <div style={{ textAlign: 'right', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '20px' }}>
                        <p style={{ margin: 0, fontSize: '9px', color: '#00b4d8', letterSpacing: '2px', fontWeight: '700' }}>IDENTITY</p>
                        <p style={{ margin: 0, fontSize: '14px', color: 'white', fontWeight: '400' }}>{user.role}</p>
                    </div>
                    
                    <motion.button
                        whileHover={{ scale: 1.05, background: '#ef4444', color: 'white', boxShadow: '0 0 25px rgba(239, 68, 68, 0.5)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogout}
                        style={{
                            cursor: 'pointer',
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#ef4444',
                            border: '2px solid #ef4444',
                            padding: '10px 20px',
                            borderRadius: '50px',
                            fontWeight: '700',
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                            fontSize: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: '0.3s'
                        }}
                    >
                        <LogOut size={14} /> Logout
                    </motion.button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;