// @ts-check
import { handleSendMessage } from "./sendMessage";

const form = document.getElementById("input-form");
form?.addEventListener("submit", handleSendMessage);
