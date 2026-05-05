import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <p>Loading...</p>;

    if (!user) {
        // Not logged in? Send to login
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Logged in but unauthorized role? Send to home or error
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;