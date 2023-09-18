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
    return [];
  }
}

export async function sendChatMessage(userId, username, message, parentId) {
  console.debug(
    'Sending chat message:',
    message,
    'for user:',
    userId,
    'with parent ID:',
    parentId,
    'and username:',
    username,
  );
  try {
    const response = await axios.post(
      `${baseUrl}/chat`,
      {
        chat: {
          user_id: userId,
          username: username ? username : 'Anonymous',
          request: message,
          parent_id: parentId,
        },
        format_dict: {
          model_name: 'Alpha Noble',
          model_personality:
            'practical, sincere, talkative, thoughtful and considerate',
        },
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
    console.error('Error sending chat message:', message, err);
  }
}
