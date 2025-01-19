export const userMessageTemplate = (message: string) => `
<div class="flex flex-col gap-1 w-full max-w-[320px] justify-self-end">
  <div class="flex items-center space-x-2 rtl:space-x-reverse">
    <span class="text-sm font-semibold text-gray-900 dark:text-white">Usuario</span>
  </div>
  <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
    <p class="text-sm font-normal text-gray-900 dark:text-white">${message}</p>
  </div>
</div>`;

export const createAssistantMessageTemplate = (parent: HTMLElement) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="flex flex-col gap-1 w-full max-w-[320px]">
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
        <span class="text-sm font-semibold text-gray-900 dark:text-white">Asistente</span>
      </div>
      <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <p id="assistant-message" class="text-sm font-normal text-gray-900 dark:text-white">
          <svg id="loader" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </p>
      </div>
    </div>`;

  parent.appendChild(div);

  const messageElement = div.querySelector("#assistant-message");

  if (!messageElement) {
    throw new Error("Failed to find the message container element.");
  }

  // Retornar una función para agregar chunks al mensaje
  return (chunk: string) => {
    messageElement.textContent += chunk;
  };
};

export async function getUserId() {
  let userId = localStorage.getItem("chatUserId");
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("chatUserId", userId);
  }
  return userId;
}