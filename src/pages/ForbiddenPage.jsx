import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from 'contexts/AuthContext';

function ForbiddenPage() {
  const navigate = useNavigate();
  const { currentUser, userRole } = useContext(AuthContext);
  const waitingTime = 5;

  useEffect(() => {
    // If there's no current user, redirect to /auth
    if (!currentUser || !userRole) {
      navigate('/auth', { replace: true });
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <h1>Forbidden</h1>
      <p>
        You do not have the necessary permissions to view this page.
        <p>userRole: '{userRole}'</p>
        <p>We will navigate you to log in page in {waitingTime} seconds...</p>
      </p>
    </div>
  );
}

export default ForbiddenPage;
