const express = require('express');
const router = require('./routes/banpick');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors({
  origin: `http://localhost:8000`, // 특정 출처 허용
  methods: 'GET, POST, PUT, DELETE, OPTIONS', // 특정 HTTP 메서드 허용
  allowedHeaders: ['Content-Type'], // 특정 헤더 허용
}));
app.use(express.json()); // JSON 요청 본문 파싱을 위한 미들웨어
app.use('/banpick', router);
app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.redirect('/banpick'); // router.handle을 사용하여 /users 핸들러 호출
// });

app.listen(port, () => {
  console.log(`http://localhost:${port} 서버 실행 중`);
});