export const entities = {
  "전기화재 통계": {
    message: `
      2024년도 전국 화재는 총 <strong>37,613건</strong>,<br>
      그 중 <strong>전기화재는 10,568건</strong>입니다.<br>
      <img src="images/test.jpg" alt="통계 이미지" style="width:100%; margin-top:10px;">
    `,
    quickReplies: ["대구 통계", "경북 통계", "전기화재 예방"]
  },
  "대구 통계": {
    message: `
      대구는 총 <strong>1,205건</strong>의 화재 중 전기화재가 <strong>322건</strong> 발생했습니다.<br>
      주요 원인은 <strong>배선 → 전기설비 → 계절용기기</strong> 순입니다.
    `,
    quickReplies: ["경북 통계", "전기화재 예방", "처음으로"]
  },
  "경북 통계": {
    message: `
      경북은 <strong>2,932건</strong> 중 <strong>697건</strong>이 전기화재입니다.<br>
      점유율은 <strong>23.8%</strong>로 두 번째로 많습니다.
    `,
    quickReplies: ["대구 통계", "전기화재 예방", "처음으로"]
  },
  "전기화재 예방": {
    message: `
      화재는 <strong>가연물, 산소, 발화원</strong>이 모이면 발생합니다.<br>
      노후 배선, 먼지 낀 전기기기, 모터 과열 등을 주의하세요.
    `,
    quickReplies: ["감전사고 예방", "처음으로"]
  },
  "감전사고 예방": {
    message: `
      감전은 <strong>누전, 낡은 전선, 습기</strong> 많은 환경에서 발생합니다.<br>
      누전차단기 점검이 필요합니다!
    `,
    quickReplies: ["누전차단기", "처음으로"]
  },
  "누전차단기": {
    message: `
      누전차단기(ELB)는 누전이나 과전류 시 전기를 자동 차단합니다.<br>
      월 1회 시험 버튼을 눌러 정상 작동을 확인하세요!
    `,
    quickReplies: ["처음으로"]
  },
  "처음으로": {
    message: `
      안녕하세요! 한국전기안전공사입니다.<br>
      전기화재 예방에 도움이 되는 정보를 알려드릴게요.
    `,
    quickReplies: ["전기화재 통계", "전기화재 예방", "감전사고 예방"]
  }
};
