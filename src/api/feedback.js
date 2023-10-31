import axios from 'axios';

import { baseURL } from './base';
import { getAccessToken } from '../utils/auth';

export async function fetchFeedbacksByUserId(userId) {
  console.debug('Fetching feedbacks for user:', userId);
  const token = await getAccessToken();
  try {
    const response = await axios.get(`${baseURL}/feedback/user_id/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.debug('Fetched feedbacks for user:', userId, response.data);
    return response.data;
  } catch (err) {
    console.error('Error fetching feedbacks for user:', userId, err);
    return [];
  }
}

export async function fetchAllUsers() {
  const token = await getAccessToken();
  try {
    const response = await axios.get(`${baseURL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.debug('Fetched all users:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error fetching all users:', err);
    return [];
  }
}

export async function updateFeedback(feedbackId, annotation) {
  console.debug(`Updating feedback '${feedbackId}': `, annotation);
  const token = await getAccessToken();
  try {
    const response = await axios.put(
      `${baseURL}/feedback/${feedbackId}`,
      {
        annotation: annotation,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 200) {
      console.debug('Updated feedback:', feedbackId, response.data);
      return response.data;
    }
  } catch (err) {
    console.error('Error updating feedback: ', feedbackId, err);
    return null;
  }
}
