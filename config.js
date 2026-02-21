// GitHub Pages는 HTML/JS만 제공하고 서버( Node.js )를 돌리지 않습니다.
// 그래서 PC와 모바일이 각자 브라우저 저장소만 써서 서로 다른 데이터가 보입니다.
// 해결: 백엔드( server.js + data/tennis.json )를 Render·Railway 등에 배포한 뒤,
//       아래에 그 주소를 넣으면 PC·모바일 모두 같은 DB를 사용합니다.
// 같은 PC에서 npm start 로 접속할 때는 비워 두세요.
// 예: 'https://tennis-api.onrender.com' (끝에 슬래시 없이)
window.TENNIS_API_BASE = '';
