import axios from 'axios';

import { baseUrl } from './base';
import { getAccessToken } from '../utils/auth';

export async function fetchFeedbacksByUserId(userId) {
  console.debug('Fetching feedbacks for user:', userId);
  const token = await getAccessToken();
  try {
    const response = await axios.get(`${baseUrl}/feedback/user/${userId}`, {
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
    const response = await axios.get(`${baseUrl}/user`, {
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

export async function updateFeedback(feedbackId, annotations) {
  console.debug('Updating feedback:', feedbackId);
  const token = await getAccessToken();
  try {
    const response = await axios.put(
      `${baseUrl}/feedback/${feedbackId}`,
      {
        annotations: annotations,
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
