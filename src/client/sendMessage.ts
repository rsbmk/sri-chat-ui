import { createAssistantMessageTemplate, getUserId, userMessageTemplate } from './utils.ts';
const BASE_URL = import.meta.env.PUBLIC_API_URL


export async function handleSendMessage(event: SubmitEvent) {
  event.preventDefault();

  const input = document.getElementById("input") as HTMLInputElement;
  const chat = document.getElementById("chat");
  const loader = document.getElementById("loader") as HTMLDivElement

  if (!input || !chat) return;

  loader.style.display = "flex"

  chat.innerHTML += userMessageTemplate(input.value);
  const thread_id = await getUserId();

  input.disabled = true

  fetch(`${BASE_URL}/chats/input`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: input.value, thread_id }),
  })
    .then(async (response) => {
      input.value = "";
      if (!response.body) {
        throw new Error("ReadableStream not supported in this environment.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      const addChunks = createAssistantMessageTemplate(chat)

      // Procesa los chunks a medida que llegan
      while (true) {
        const { done, value } = await reader.read();
        if (done) break

        const chunk = decoder.decode(value, { stream: true });
        addChunks(chunk);
      }

      input.disabled = false
      input.focus();
    })
    .catch((error) => {
      console.error("Error in streaming fetch:", error);
    }).finally(() => {
      loader.style.display = "none"
    });
}