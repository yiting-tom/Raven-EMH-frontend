const PrivateRoute = ({ userRole, requiredRole, children, fallback }) => {
  if (!userRole) {
    console.debug('No user role provided returning fallback for', userRole);
    return fallback;
  }

  if (userRole === requiredRole) {
    console.debug(
      'User role matches required role returning children',
      userRole,
      requiredRole,
    );
    return children;
  }

  console.debug(
    'User role does not match required role returning fallback',
    userRole,
  );
  return fallback;
};

export default PrivateRoute;
