# GitHub Pages에서 PC·모바일 같은 데이터 보기

## 왜 PC와 모바일 결과가 다르게 나오나요?

- **GitHub Pages**는 **정적 파일(HTML, CSS, JS)** 만 제공합니다.
- **Node 서버(server.js)** 는 GitHub Pages에서 **실행되지 않습니다**.
- 그래서 `https://사용자명.github.io/저장소명/` 으로 접속하면:
  - `/api/state` 요청은 **실제 서버가 없어서 실패**하고,
  - 앱은 **각 기기의 브라우저 저장소(localStorage)** 만 사용합니다.
- **PC**와 **모바일**은 서로 다른 기기라 **저장소도 다르기 때문에** 화면에 보이는 데이터가 달라집니다.

---

## 해결: 백엔드를 따로 배포하고 연결하기

1. **백엔드(서버)를 다른 서비스에 배포**  
   - 이 프로젝트의 `server.js` + `data/tennis.json` 을 **Render**, **Railway**, **Fly.io** 등에 배포합니다.
2. **프론트( GitHub Pages )에서 그 백엔드 주소를 쓰도록 설정**  
   - 프로젝트의 **`config.js`** 에서 `TENNIS_API_BASE` 에 배포한 백엔드 주소를 넣습니다.

그러면 GitHub Pages(PC·모바일 모두)가 **같은 백엔드 DB**를 쓰게 되어, **같은 데이터**가 보입니다.

---

## 1. Render에 백엔드 배포 (무료 예시)

1. https://render.com 가입 후 **New → Web Service**
2. 저장소 연결 후 설정:
   - **Root Directory**: 비우거나 프로젝트 루트
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
3. **Create** 후 배포가 끝나면 **서비스 URL**이 나옵니다.  
   예: `https://tennis-club-xxxx.onrender.com`

---

## 2. config.js 에 백엔드 주소 넣기

프로젝트의 **`config.js`** 를 열어서:

```javascript
window.TENNIS_API_BASE = 'https://tennis-club-xxxx.onrender.com';
```

위처럼 **Render에서 준 주소**(끝에 `/` 없이)를 넣고 저장한 뒤, 이 변경을 **커밋·푸시**해서 GitHub Pages에 반영합니다.

---

## 3. 동작 방식

- **GitHub Pages** (PC·모바일):  
  `config.js` 의 `TENNIS_API_BASE` 로 **같은 백엔드**에 요청 → **같은 DB(data/tennis.json)** 사용
- **백엔드(Render 등)**:  
  `GET/POST /api/state` 로 데이터 읽기·쓰기 → **한 군데서만** 데이터가 유지됨

이렇게 하면 **페이지가 전환될 때마다 같은 DB에서 불러오기** 때문에, PC와 모바일 모두 **항상 최신 데이터**가 보이게 됩니다.
