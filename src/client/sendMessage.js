import { send } from "./service.ts";
import { createAssistantMessageTemplate, userMessageTemplate } from "./utils.ts";
const SCROLL_HEIGHT = 1000;

const input = document.getElementById("input");
const chat = document.getElementById("chat");
const loader = document.getElementById("loader");

/**
 * Handles the submission of the message input form.
 * @param {SubmitEvent} event The submission event.
 * @returns {Promise<void>}
 */
export async function handleSendMessage(event) {
  event.preventDefault();
  if (!input || !chat) return;

  toogleLoader();
  chat.innerHTML += userMessageTemplate(input.value);
  input.disabled = true;

  try {
    const response = await send(input.value);
    input.value = "";
    if (!response.body) {
      throw new Error("ReadableStream not supported in this environment.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    const addChunks = createAssistantMessageTemplate(chat);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      addChunks(chunk);
      chat.scrollTo(0, chat.scrollHeight + SCROLL_HEIGHT);
    }

    input.disabled = false;
  } catch (error) {
    console.error("Error in streaming fetch:", error);
  } finally {
    input.focus();
    toogleLoader();
  }
}

function toogleLoader() {
  loader.style.display = loader.style.display === "flex" ? "none" : "flex";
}
