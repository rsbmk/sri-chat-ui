import { getUserId } from "./utils.js";

const BASE_URL = "https://sri-chat-api.onrender.com/api/v1";

/**
 * Sends a chat message to the server.
 *
 * @param input - The message content to be sent.
 * @returns A promise that resolves to the server's response.
 */

export async function send(input) {
  const thread_id = await getUserId();

  return fetch(`${BASE_URL}/chats/input`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input, thread_id }),
  });
}
