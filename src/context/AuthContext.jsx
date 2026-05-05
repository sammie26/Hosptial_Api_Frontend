import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserStr = localStorage.getItem('user');

        if (token && storedUserStr) {
            try {
                const decoded = jwtDecode(token);
                const isExpired = decoded.exp * 1000 < Date.now();

                if (isExpired) {
                    logout();
                } else {
                    
                    setUser(JSON.parse(storedUserStr));
                }
            } catch (err) {
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = (authData) => {
        
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', JSON.stringify(authData));

        
        
        setUser(authData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};