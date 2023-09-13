import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from 'contexts/AuthContext';

function ForbiddenPage() {
  const navigate = useNavigate();
  const { userRole } = useContext(AuthContext);
  const waitingTime = 3;
  const [timer, setTimer] = useState(waitingTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // If there's no current user, redirect to /auth
    setTimeout(() => {
      navigate(`/${userRole}`, { replace: true });
    }, waitingTime * 1000);
  }, []);

  return (
    <div>
      <h1>Forbidden</h1>
      <p>
        You do not have the necessary permissions to view this page.
        <p>userRole: '{userRole}'</p>
        <p>We will navigate you to home page in {timer} seconds...</p>
      </p>
    </div>
  );
}

export default ForbiddenPage;
