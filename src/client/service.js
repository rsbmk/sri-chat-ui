import { getUserId } from "./utils";

const BASE_URL = import.meta.env.PUBLIC_API_URL;

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
