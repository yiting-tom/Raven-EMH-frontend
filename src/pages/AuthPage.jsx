import * as firebaseAuth from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardTitle, CardSubtitle } from 'reactstrap';
import { styled } from 'styled-components';

// import Logo from 'assets/img/favicon.png';
import { AuthContext } from 'contexts/AuthContext';
import { auth } from 'firebaseApp';
import { color } from 'style.js';

const AuthPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const AuthCard = styled(Card)`
  border-radius: 1rem;
  padding: 2em 0em;
  max-width: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthGroup = styled.div`
  .firebaseui-idp-password {
    border-radius: 1em;
    background-color: ${color.primaryA(0.6)} !important;
  }
  .firebaseui-idp-google {
    border-radius: 1em;
  }
  .firebaseui-id-page-sign-in {
    border-radius: 1em;
    background-color: ${color.primaryA(0.0)} !important;
  }
  .firebaseui-button {
    border-radius: 1em;
  }
  /* .firebaseui-input {
    background-color: ${color.primaryA(0.1)} !important;
  } */
  input:-internal-autofill-selected {
    appearance: menulist-button;
    background-image: none !important;
    background-color: -internal-light-dark(
      /* rgb(232, 240, 254),
      rgba(70, 90, 126, 0.4) */ red,
      red
    ) !important;
    color: fieldtext !important;
  }
`;

function AuthPage() {
  const { currentUser, userRole } = React.useContext(AuthContext);

  // FirebaseUI config.
  const uiConfig = {
    signInOptions: [
      {
        provider: firebaseAuth.GoogleAuthProvider.PROVIDER_ID,
        customParameters: {
          // Forces account selection even when one account
          // is available.
          prompt: 'select_account',
        },
      },
      // Other providers don't need to be given as object.
      {
        provider: firebaseAuth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true,
      },
    ],
    signInFlow: 'popup',
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
    signInSuccessUrl: '/',
  };

  if (currentUser && userRole) {
    return <Navigate to={`/${userRole.toLowerCase()}/emh-robot`} replace />;
  }

  useEffect(() => {
    // Initialize the FirebaseUI widget using Firebase.
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    // Start the UI.
    ui.start('#firebaseui-auth-container', uiConfig);
  }, []);

  return (
    <AuthPageContainer>
      <AuthCard>
        <CardTitle>
          <h2 className="text-center">Log In</h2>
          <CardSubtitle>RavenApp EMH Robot</CardSubtitle>
        </CardTitle>
        <hr />
        <AuthGroup id="firebaseui-auth-container" />
      </AuthCard>
    </AuthPageContainer>
  );
}

export default AuthPage;
