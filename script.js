const entities = {
  "전기화재 통계": {
    message: `2024년도 전국 화재는 총 <strong>37,613건</strong>, 그 중 <strong>전기화재는 10,568건</strong>입니다.<br>
      <strong>전기화재 점유율은 28.2%</strong>로 부주의 다음으로 높습니다.<br>
      <strong>대구: 322건 / 경북: 697건</strong>의 전기화재가 발생했습니다.`,
    quickReplies: ["대구 통계", "경북 통계", "전기화재 예방"]
  },
  "대구 통계": {
    message: `대구는 <strong>1,205건 중 322건</strong>이 전기화재입니다.<br>
      <strong>26.7%</strong>로 부주의 다음으로 많고,<br>
      주요 원인은 <strong>배선 → 전기설비 → 계절용기기</strong> 순입니다.`,
    quickReplies: ["경북 통계", "전기화재 예방", "처음으로"]
  },
  "경북 통계": {
    message: `경북은 <strong>2,932건 중 697건</strong>이 전기화재입니다.<br>
      <strong>23.8%</strong>이며, <strong>배선/설비 → 차량/계절기기</strong> 순으로 많습니다.`,
    quickReplies: ["대구 통계", "전기화재 예방", "처음으로"]
  },
  "전기화재 예방": {
    message: `화재는 <strong>가연물, 산소, 발화원</strong>이 있어야 발생합니다.<br>
      에어컨 실외기 같은 기기는 먼지, 노후배선 등으로 위험하므로<br>
      <strong>정기 점검과 청소</strong>가 중요합니다.`,
    quickReplies: ["감전사고 예방", "처음으로"]
  },
  "감전사고 예방": {
    message: `감전은 <strong>누전, 낡은 전선, 습기</strong>에서 잘 발생합니다.<br>
      냄새나 소리, 스파크가 느껴지면 <strong>즉시 점검</strong>하세요.`,
    quickReplies: ["누전차단기", "처음으로"]
  },
  "누전차단기": {
    message: `누전차단기(ELB)는 누전/과전류 시 전기를 차단해주는 <strong>필수 안전장치</strong>입니다.<br>
      <strong>월 1회 테스트 버튼</strong>을 눌러 작동 상태를 확인하세요.`,
    quickReplies: ["처음으로"]
  },
  "처음으로": {
    message: `안녕하세요! 한국전기안전공사입니다.<br>전기화재 예방을 위한 정보를 안내해드릴게요.`,
    quickReplies: ["전기화재 통계", "전기화재 예방", "감전사고 예방"]
  }
};

const fuse = new Fuse(Object.keys(entities), { includeScore: true, threshold: 0.4 });

document.addEventListener("DOMContentLoaded", () => {
  const chatLog = document.getElementById("chat-log");
  const keywordInput = document.getElementById("keyword-input");
  const sendButton = document.getElementById("send-button");


  
  
  function typeMessage(htmlText, callback) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlText;
  const plainText = tempDiv.innerText.replace(/\n/g, ' ').replace(/\s+/g, ' '); // 줄바꿈 제거, 스페이스 정리

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

  
 
  function appendMessage(text, isUser = false) {
    const message = document.createElement("div");
    message.className = `message ${isUser ? 'user' : 'bot'}`;
    message.innerHTML = `<p>${text}</p>`;
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

  function findBestMatch(input) {
    const result = fuse.search(input);
    return result.length > 0 && result[0].score <= 0.4 ? result[0].item : null;
  }

function showEntity(input) {
  appendMessage(input, true); // 사용자 메시지

  const keyword = entities[input] ? input : findBestMatch(input);

  if (!keyword || !entities[keyword]) {
    appendMessage(`"<strong>${input}</strong>"에 대한 정보를 찾을 수 없습니다.`);
    return;
  }

  const entity = entities[keyword];

  // 타이핑 효과로 출력
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

keywordInput.addEventListener("focus", () => {
  setTimeout(() => {
    keywordInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 300);
});

  showEntity("처음으로");
});


