import React from 'react';
import ReactDOM from 'react-dom/client';

// import Admin from 'layouts/Admin/Admin';
// import Doctor from 'layouts/Doctor/Doctor';
// import Patient from 'layouts/Patient/Patient';
import App from 'App';

import 'assets/scss/black-dashboard-react.scss';
import 'assets/demo/demo.css';
import 'assets/css/nucleo-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import BackgroundColorWrapper from './components/BackgroundColorWrapper/BackgroundColorWrapper';
import ThemeContextWrapper from './components/ThemeWrapper/ThemeWrapper';
import 'index.css';
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>,
);

// import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// <BrowserRouter>
//   <Routes>
//     <Route path="/admin/*" element={<Admin />} />
//     <Route path="/doctor/*" element={<Doctor />} />
//     <Route path="/patient/*" element={<Patient />} />
//     <Route
//       path="*"
//       element={<Navigate to="/patient/emh-robot" replace />}
//     />
//   </Routes>
// </BrowserRouter>
