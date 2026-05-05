import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { motion } from 'framer-motion';
import { Calendar, User, Shield, Activity, ClipboardList, Send } from 'lucide-react';

const BookAppointment = () => {
    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    
    const [formData, setFormData] = useState({ 
        departmentId: '', 
        doctorId: '', 
        appointmentDate: '', 
        reason: '' 
    });
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getMinDateTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [deptRes, docRes] = await Promise.all([
                    API.get('/departments'),
                    API.get('/doctors')
                ]);
                setDepartments(deptRes.data);
                setDoctors(docRes.data);
            } catch (err) {
                console.error("Failed to load booking data", err);
            }
        };
        fetchInitialData();
    }, []);

    const handleDeptChange = (e) => {
        const id = e.target.value;
        setFormData({ ...formData, departmentId: id, doctorId: '' });

        if (!id) {
            setFilteredDoctors([]);
            return;
        }

        const matched = doctors.filter(d => 
            (d.departmentId == id) || (d.departmentID == id)
        );
        
        setFilteredDoctors(matched);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedDate = new Date(formData.appointmentDate);
        if (selectedDate < new Date()) {
            alert("Unless you have a time machine, please select a future date and time!");
            return;
        }

        setLoading(true);

        try {
            const userStr = localStorage.getItem('user'); 
            const user = userStr ? JSON.parse(userStr) : null;

            if (!user || !user.patientId) {
                alert("Patient profile not found. Please ensure you are logged in correctly.");
                setLoading(false);
                return;
            }

            const payload = {
                doctorId: parseInt(formData.doctorId),
                patientId: parseInt(user.patientId), 
                appointmentDate: formData.appointmentDate,
                reason: formData.reason, 
                createdByUserId: user.id || "" 
            };

            await API.post('/appointments', payload);
            alert("Appointment booked successfully!");
            navigate('/patient/portal');
        } catch (err) {
            console.error("Booking Error Response:", err.response?.data);
            const errorMsg = err.response?.data?.errors 
                ? Object.values(err.response.data.errors).flat().join(", ")
                : "Could not book appointment. Please check the data.";
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', 
            padding: '60px 20px', fontFamily: "'Outfit', sans-serif", color: 'white', minHeight: '100vh',
            position: 'relative'
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;700&display=swap');
                select option { background-color: #020617; color: white; }
                input[type="datetime-local"]::-webkit-calendar-picker-indicator {
                    filter: invert(1);
                    cursor: pointer;
                }
            `}</style>
            
            <div style={{ 
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
                background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)',
                zIndex: -1 
            }} />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '550px' }}>
                
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <Calendar color="#ffffff" size={64} style={{ filter: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.7))' }} />
                    <h1 style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '5px', textTransform: 'uppercase', textShadow: '0 0 20px white', marginTop: '20px' }}>
                        Schedule Appointment
                    </h1>
                </div>

                <div style={{ 
                    background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(30px)', padding: '50px', 
                    borderRadius: '40px', border: '3px solid #ffffff', boxShadow: '0 0 80px rgba(0, 180, 216, 0.15)' 
                }}>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        
                        <div style={{ position: 'relative' }}>
                            <label style={{ fontSize: '11px', fontWeight: '700', color: '#00b4d8', display: 'block', marginBottom: '12px', letterSpacing: '2px' }}>1. SECTOR SELECTION</label>
                            <div style={{ position: 'relative' }}>
                                <Shield size={18} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '15px' }} />
                                <select 
                                    value={formData.departmentId} 
                                    onChange={handleDeptChange} 
                                    required 
                                    style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '15px', color: 'white', outline: 'none', cursor: 'pointer', appearance: 'none' }}
                                >
                                    <option value="">-- Choose Department --</option>
                                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div style={{ position: 'relative' }}>
                            <label style={{ fontSize: '11px', fontWeight: '700', color: '#00b4d8', display: 'block', marginBottom: '12px', letterSpacing: '2px' }}>2. ASSIGNED OFFICER</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '15px' }} />
                                <select 
                                    disabled={!formData.departmentId}
                                    value={formData.doctorId}
                                    onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
                                    required
                                    style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '15px', color: 'white', outline: 'none', cursor: 'pointer', appearance: 'none', opacity: !formData.departmentId ? 0.3 : 1 }}
                                >
                                    <option value="">-- Choose Medical Officer --</option>
                                    {filteredDoctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div style={{ position: 'relative' }}>
                            <label style={{ fontSize: '11px', fontWeight: '700', color: '#00b4d8', display: 'block', marginBottom: '12px', letterSpacing: '2px' }}>3. TIME VECTOR</label>
                            <div style={{ position: 'relative' }}>
                                <Activity size={18} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '15px' }} />
                                <input 
                                    type="datetime-local" 
                                    min={getMinDateTime()} 
                                    value={formData.appointmentDate}
                                    onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})} 
                                    required 
                                    style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '15px', color: 'white', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </div>
                        </div>

                        <div style={{ position: 'relative' }}>
                            <label style={{ fontSize: '11px', fontWeight: '700', color: '#00b4d8', display: 'block', marginBottom: '12px', letterSpacing: '2px' }}>4. REASON FOR VISIT</label>
                            <div style={{ position: 'relative' }}>
                                <ClipboardList size={18} color="#00b4d8" style={{ position: 'absolute', left: '15px', top: '15px' }} />
                                <textarea 
                                    placeholder="Briefly describe symptoms or purpose..."
                                    value={formData.reason}
                                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                                    style={{ width: '100%', padding: '15px 15px 15px 45px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '15px', color: 'white', outline: 'none', minHeight: '120px', resize: 'none', boxSizing: 'border-box' }}
                                />
                            </div>
                        </div>

                        <motion.button 
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 180, 216, 0.8)' }}
                            whileTap={{ scale: 0.95 }}
                            type="submit" 
                            disabled={loading || !formData.doctorId}
                            style={{ 
                                padding: '20px', background: 'rgba(0, 18, 36, 1)', color: 'white', 
                                border: '3px solid #00b4d8', borderRadius: '60px', fontWeight: '700', 
                                fontSize: '15px', letterSpacing: '4px', textTransform: 'uppercase', 
                                cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'
                            }}
                        >
                            <Send size={20} />
                            {loading ? "PROCESSING..." : "CONFIRM SCHEDULE"}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default BookAppointment;