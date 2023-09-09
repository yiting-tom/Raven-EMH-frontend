import { auth } from '../firebaseApp';

export async function getAccessToken() {
  try {
    let token = await auth.currentUser.getIdToken(true);
    console.debug('getAccessToken:', token ? 'success' : 'failed');
    return token;
  } catch (err) {
    console.error('getAccessToken error:', err);
  }
}
