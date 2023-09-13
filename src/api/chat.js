import { baseUrl } from './base';

/**
 * Fetches all chat data associated with a user by their ID.
 *
 * @param {string} userId - The ID of the user.
 * @returns {object[]} - An array of chat objects.
 * The structure of the returned object:
 *   data: [  // array of chat objects
 *     {
 *        "audio": "...",          // Base64 encoded audio string
 *        "children_ids": [...],   // Array of child chat IDs
 *        "id": "...",             // Chat ID
 *        "parent_id": "...",      // Parent chat ID if exists
 *        "request": "...",        // Request message from the user
 *        "response": "...",       // Response message from the server
 *        "status": "...",         // Status of the chat message, e.g., "ACTIVATING"
 *        "user_id": "...",        // User ID associated with the chat
 *        "video": "..."           // Base64 encoded video string
 *     },
 *     ...
 */
export async function fetchAllChatsByUserId(userId) {
  console.debug('Fetching all chats for user:', userId);
  try {
    // Fetch chat data by user ID from the server
    const res = await fetch(`${baseUrl}/chat/user/${userId}`);

    // Parse the returned JSON data
    const data = await res.json();

    // Return the chat data
    return data;
  } catch (err) {
    // Log and re-throw the error to be handled by the caller
    console.error('Error fetching chats for user:', userId, err);
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
    // Send chat message to the server
    const resp = await fetch(`${baseUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat: {
          user_id: userId,
          username: username,
          request: message,
          parent_id: parentId,
        },
        format_dict: {
          model_name: 'Alpha Noble',
          model_personality:
            'practical, sincere, talkative, thoughtful and considerate',
        },
      }),
    });

    if (resp.ok) {
      const data = await resp.json();
      return data;
    }
  } catch (err) {
    // Log and re-throw the error to be handled by the caller
    console.error('Error sending chat message:', message, err);
  }
}
