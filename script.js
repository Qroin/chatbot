const entities = {
  "전기화재 통계": {
    message: `
      2024년도 전국 화재는 총 <strong>37,613건</strong>, 그 중 <strong>전기화재는 10,568건</strong>입니다.<br>
      <strong>전기화재 점유율은 28.2%</strong>로 부주의 다음으로 높습니다.<br>
      <strong>대구: 322건 / 경북: 697건</strong>의 전기화재가 발생했습니다.
    `,
    quickReplies: ["대구 통계", "경북 통계", "전기화재 예방"]
  },
  "대구 통계": {
    message: `
      대구광역시에서는 <strong>총 1,205건</strong>의 화재 중 <strong>전기화재는 322건</strong>이었습니다.<br>
      <strong>26.7%</strong>로 부주의(38.2%) 다음으로 많이 발생했습니다.<br>
      주요 원인은 <strong>배선 → 전기설비 → 계절용기기</strong> 순입니다.
    `,
    quickReplies: ["경북 통계", "전기화재 예방", "처음으로"]
  },
  "경북 통계": {
    message: `
      경상북도는 <strong>2,932건</strong>의 화재 중 <strong>전기화재가 697건</strong>으로 <strong>23.8%</strong>입니다.<br>
      <strong>배선/전기설비 → 차량/계절기기</strong> 순으로 발화 요인이 많습니다.
    `,
    quickReplies: ["대구 통계", "전기화재 예방", "처음으로"]
  },
  "전기화재 예방": {
    message: `
      화재는 <strong>가연물, 산소, 발화원</strong>의 3요소가 갖춰질 때 발생합니다.<br>
      에어컨 실외기의 <strong>먼지, 노후배선, 모터 과열</strong> 등이 위험 요소이며,<br>
      <strong>정기적인 청소와 점검</strong>이 중요합니다.
    `,
    quickReplies: ["감전사고 예방", "처음으로"]
  },
  "감전사고 예방": {
    message: `
      감전은 <strong>누전, 노후 전선, 습기</strong>가 많은 환경에서 잘 발생합니다.<br>
      <strong>이상한 냄새나 소리</strong>가 나면 즉시 점검하세요.
    `,
    quickReplies: ["누전차단기", "처음으로"]
  },
  "누전차단기": {
    message: `
      <strong>누전차단기(ELB)</strong>는 전기 누전이나 과전류 발생 시 전기를 자동으로 차단해줍니다.<br>
      <strong>월 1회</strong> '시험 버튼'을 눌러 정상 작동을 확인하는 것이 좋습니다.
    `,
    quickReplies: ["처음으로"]
  },
  "처음으로": {
    message: `
      안녕하세요! 한국전기안전공사입니다.<br>
      전기화재 예방에 도움이 되는 정보를 알려드릴게요.<br>
      아래 메뉴에서 선택해 주세요.
    `,
    quickReplies: ["전기화재 통계", "전기화재 예방", "감전사고 예방"]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const chatLog = document.getElementById("chat-log");
  const quickReplies = document.getElementById("quick-replies");
  const keywordInput = document.getElementById("keyword-input");
  const sendButton = document.getElementById("send-button");

  function appendMessage(text, isUser = false) {
    const message = document.createElement("div");
    message.className = `message ${isUser ? 'user' : 'bot'}`;
    message.innerHTML = `<p>${text}</p>`;
    chatLog.appendChild(message);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function showEntity(keyword) {
    appendMessage(keyword, true); // 사용자 말풍선 먼저 추가
    const entity = entities[keyword];

    if (!entity) {
      appendMessage(`"<strong>${keyword}</strong>"에 대한 정보를 찾을 수 없습니다.`);
      quickReplies.innerHTML = "";
      return;
    }

    appendMessage(entity.message);
    renderQuickReplies(entity.quickReplies);
  }

  function renderQuickReplies(options) {
    quickReplies.innerHTML = "";
    options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => showEntity(option);
      quickReplies.appendChild(btn);
    });
  }

  sendButton.addEventListener("click", () => {
    const keyword = keywordInput.value.trim();
    if (keyword) {
      showEntity(keyword);
      keywordInput.value = "";
    }
  });

  keywordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendButton.click();
  });

  // 초기화
  showEntity("처음으로");
});
