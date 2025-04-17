import { entities } from './data/entities.js';

document.addEventListener("DOMContentLoaded", () => {
  const chatLog = document.getElementById("chat-log");
  const keywordInput = document.getElementById("keyword-input");
  const sendButton = document.getElementById("send-button");

  function appendMessage(text, isUser = false) {
    const message = document.createElement("div");
    message.className = `message ${isUser ? 'user' : 'bot'}`;
    const p = document.createElement("p");
    p.innerHTML = text;
    message.appendChild(p);
    chatLog.appendChild(message);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function appendQuickReplies(choices) {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.gap = "8px";

    choices.forEach(choice => {
      const btn = document.createElement("div");
      btn.className = "quick-reply";
      btn.textContent = choice;
      btn.onclick = () => showEntity(choice);
      container.appendChild(btn);
    });

    chatLog.appendChild(container);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function showEntity(input) {
    appendMessage(input, true);

    const entity = entities[input];
    if (!entity) {
      appendMessage(`"<strong>${input}</strong>"에 대한 정보를 찾을 수 없습니다.`);
      return;
    }

    appendMessage(entity.message);
    appendQuickReplies(entity.quickReplies);
  }

  sendButton.addEventListener("click", () => {
    const keyword = keywordInput.value.trim();
    if (keyword) {
      showEntity(keyword);
      keywordInput.value = "";
    }
  });

  keywordInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendButton.click();
  });

  showEntity("처음으로");
});
