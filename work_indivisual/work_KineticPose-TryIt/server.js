const https = require('https');
const fs = require('fs');
const express = require('express'); 

const app = express();

// 정적 파일 경로 설정
app.use(express.static('./'));

// 루트 경로에 대한 GET 요청 처리
app.get('/', function(req, res) {
  // 클라이언트에게 HTML 파일 직접 전송
  res.sendFile(__dirname + '/work_KineticPose-TryIt.html');
});

// HTTPS 서버 생성 및 설정
https.createServer({
  key: fs.readFileSync('key.pem'), 
  cert: fs.readFileSync('cert.pem') 
}, app).listen(3000, function () {
  console.log('App listening on port 3000! Go to https://localhost:3000/')
});
