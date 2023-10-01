import axios from 'axios';

import { baseUrl } from './base';

export async function fetchAllChatsByUserId(userId) {
  console.debug('Fetching all chats for user:', userId);
  try {
    console.log(`fetching ${baseUrl}/chat/user/${userId}`);

    const response = await axios.get(`${baseUrl}/chat/user/${userId}`);

    // Return the chat data
    return response.data;
  } catch (err) {
    // Log and re-throw the error to be handled by the caller
    console.error('Error fetching chats for user:', userId, err);
  }
}

export async function sendChatMessage(chatData, robotProfile) {
  console.debug('Sending chat data:', chatData);
  console.debug('Sending robot profile:', robotProfile);
  try {
    const response = await axios.post(
      `${baseUrl}/chat`,
      {
        chat_data: chatData,
        robot_profile: robotProfile,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    // Log and re-throw the error to be handled by the caller
    console.error('Error sending chat message:', chatData, err);
  }
}
