import axios from 'axios';

import { baseURL } from './base';

export async function fetchAllChatsByUserIdAndRobotId(userId, robotId) {
  console.debug(
    `Fetching all chats for user: "${userId}" with robot "${robotId}"`,
  );
  try {
    const response = await axios.get(`${baseURL}/chat/`, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',

      },
      params: {
        user_id: userId,
        robot_id: robotId,
      },
    });
    console.debug('response.data:', response.data);
    return response.data;
  } catch (error) {
    console.error('An error occurred while making the request', error);
  }
}

export async function sendChatMessage(chatData, robotProfile) {
  const request = {
    chat_data: chatData,
    robot_profile: robotProfile,
  };
  console.debug('Sending chat message:', request);
  try {
    const response = await axios.post(`${baseURL}/chat`, request, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.debug('response.data:', response.data);
    return response.data;
  } catch (err) {
    // Log and re-throw the error to be handled by the caller
    console.error('Error sending chat message:', request, err);
  }
}
