import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import AuthPage from 'pages/AuthPage';
import NotFoundPage from 'pages/NotFoundPage';

import { AuthContext } from './contexts/AuthContext';
import Admin from './layouts/AdminLayout/AdminLayout';
import Doctor from './layouts/DoctorLayout/DoctorLayout';
import Patient from './layouts/PatientLayout/PatientLayout';
import ForbiddenPage from './pages/ForbiddenPage';
import InfoPage from './pages/InfoPage';
import ProfilePage from './pages/ProfilePage';

function NavigationManager() {
  const { currentUser, userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && userRole) {
      switch (userRole) {
        case 'admin':
          navigate('/admin', { replace: true });
          break;
        case 'doctor':
          navigate('/doctor', { replace: true });
          break;
        case 'patient':
          navigate('/patient', { replace: true });
          break;
        default:
          navigate('/info', { replace: true });
          break;
      }
    }
    navigate('/auth', { replace: true });
  }, [currentUser]);

  return null; // this component does not render anything
}

function App() {
  return (
    <BrowserRouter>
      <NavigationManager />
      <Routes>
        <Route path="/info" element={<InfoPage />} />
        <Route path="/" element={<InfoPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/doctor/*" element={<Doctor />} />
        <Route path="/patient/*" element={<Patient />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
