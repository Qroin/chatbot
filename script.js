import { entities } from './data/entities.js';

const fuse = new Fuse(Object.keys(entities), { includeScore: true, threshold: 0.4 });

document.addEventListener("DOMContentLoaded", () => {
  const chatLog = document.getElementById("chat-log");
  const keywordInput = document.getElementById("keyword-input");
  const sendButton = document.getElementById("send-button");

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

  function typeMessage(htmlText, callback) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlText;
    const plainText = tempDiv.innerText.replace(/\s+/g, ' ');

    const message = document.createElement("div");
    message.className = "message bot typing";
    const p = document.createElement("p");
    message.appendChild(p);
    chatLog.appendChild(message);
    chatLog.scrollTop = chatLog.scrollHeight;

    let i = 0;
    const speed = 20;

    const interval = setInterval(() => {
      if (i < plainText.length) {
        p.textContent += plainText.charAt(i);
        i++;
        chatLog.scrollTop = chatLog.scrollHeight;
      } else {
        clearInterval(interval);
        p.innerHTML = htmlText;
        message.classList.remove("typing");
        if (callback) callback();
      }
    }, speed);
  }

  function findBestMatch(input) {
    const result = fuse.search(input);
    return result.length > 0 && result[0].score <= 0.4 ? result[0].item : null;
  }

  function showEntity(input) {
    const userMessage = document.createElement("div");
    userMessage.className = "message user";
    userMessage.innerHTML = `<p>${input}</p>`;
    chatLog.appendChild(userMessage);
    chatLog.scrollTop = chatLog.scrollHeight;

    const keyword = entities[input] ? input : findBestMatch(input);

    if (!keyword || !entities[keyword]) {
      const errorMessage = document.createElement("div");
      errorMessage.className = "message bot";
      errorMessage.innerHTML = `<p>"<strong>${input}</strong>"에 대한 정보를 찾을 수 없습니다.</p>`;
      chatLog.appendChild(errorMessage);
      return;
    }

    const entity = entities[keyword];
    typeMessage(entity.message, () => {
      appendQuickReplies(entity.quickReplies);
    });
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

  keywordInput.addEventListener("focus", () => {
    setTimeout(() => {
      keywordInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  });

  showEntity("처음으로");
});
