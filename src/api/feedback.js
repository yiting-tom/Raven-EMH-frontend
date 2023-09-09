import { baseUrl } from './base';
import { getAccessToken } from '../utils/auth';

export async function fetchFeedbacksByUserId(userId) {
  console.debug('Fetching feedbacks for user:', userId);
  const token = await getAccessToken();
  try {
    // Make an API request to fetch feedbacks by user ID
    const resp = await fetch(`${baseUrl}/feedback/user/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await resp.json();
    console.debug('Fetched feedbacks for user:', userId, data);
    return data;
  } catch (err) {
    console.error('Error fetching feedbacks for user:', userId, err);
  }
}

export async function fetchAllUsers() {
  const token = await getAccessToken();
  try {
    const resp = await fetch(`${baseUrl}/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await resp.json();
    console.debug('Fetched all users:', data);
    return data;
  } catch (err) {
    console.error('Error fetching all users:', err);
  }
}

export async function updateFeedback(feedbackId, annotations) {
  console.debug('Updating feedback:', feedbackId);
  const token = await getAccessToken();
  try {
    const resp = await fetch(`${baseUrl}/feedback/${feedbackId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        annotations: annotations,
      }),
    });

    if (resp.ok) {
      const data = await resp.json();
      console.debug('Updated feedback:', feedbackId, data);
      return data;
    }
  } catch (err) {
    console.error('Error updating feedback: ', feedbackId, err);
  }
}
