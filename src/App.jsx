import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';


import Home from './pages/Home';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';
import Profile from './pages/Profile';
import Success from './pages/Success';
import ForgotPassword from './pages/ForgotPassword';


import DepartmentManagement from './pages/Admin/DepartmentManagement';
import UserManagement from './pages/Admin/UserManagement';
import RegisterUser from './pages/Admin/RegisterUser';
import AccountInfo from './pages/Admin/AccountInfo';
import AdminSchedule from './pages/Admin/AdminSchedule'; 

import DoctorList from './pages/Doctor/DoctorList';
import DoctorDetails from './pages/Doctor/DoctorDetails';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import EditDoctor from './pages/Doctor/EditDoctor';
import VisitRecord from './pages/Doctor/VisitRecord';
import DoctorProfileSettings from './pages/Doctor/DoctorProfileSettings';


import PatientPortal from './pages/Patient/PatientPortal';
import BookAppointment from './pages/Patient/BookAppointment';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/success" element={<Success />} />

           
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['Admin', 'Doctor', 'Patient']}>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path="/doctors" element={
              <ProtectedRoute allowedRoles={['Admin', 'Doctor', 'Patient']}>
                <DoctorList />
              </ProtectedRoute>
            } />

            <Route path="/doctors/:id" element={
              <ProtectedRoute allowedRoles={['Admin', 'Doctor', 'Patient']}>
                <DoctorDetails />
              </ProtectedRoute>
            } />

            
            
            <Route path="/admin/schedule" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminSchedule />
              </ProtectedRoute>
            } />

            <Route path="/doctors/edit/:id" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <EditDoctor />
              </ProtectedRoute>
            } />

            <Route path="/admin/departments" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <DepartmentManagement />
              </ProtectedRoute>
            } />

            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <UserManagement />
              </ProtectedRoute>
            } />

            <Route path="/admin/users/:id" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AccountInfo />
              </ProtectedRoute>
            } />

            <Route path="/admin/register" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <RegisterUser />
              </ProtectedRoute>
            } />

            
            <Route path="/doctor/schedule" element={
              <ProtectedRoute allowedRoles={['Doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            } />

            <Route path="/doctor/profile-settings" element={
              <ProtectedRoute allowedRoles={['Doctor']}>
                <DoctorProfileSettings />
              </ProtectedRoute>
            } />

            <Route path="/doctor/visit/:appointmentId" element={
              <ProtectedRoute allowedRoles={['Doctor']}>
                <VisitRecord />
              </ProtectedRoute>
            } />

            
            <Route path="/patient/portal" element={
              <ProtectedRoute allowedRoles={['Patient']}>
                <PatientPortal />
              </ProtectedRoute>
            } />

            <Route path="/patient/book" element={
              <ProtectedRoute allowedRoles={['Patient']}>
                <BookAppointment />
              </ProtectedRoute>
            } />

            
            <Route path="*" element={<div style={{ textAlign: 'center' }}><h2>404 - Page Not Found</h2></div>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;