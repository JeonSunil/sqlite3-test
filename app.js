const express = require('express');
const router = require('./routes/banpick');
const app = express();
const port = 3000;


app.use(express.json()); // JSON 요청 본문 파싱을 위한 미들웨어
app.use('/banpick', router);

app.get('/', (req, res) => {
  res.redirect('/banpick'); // router.handle을 사용하여 /users 핸들러 호출
});

app.listen(port, () => {
  console.log(`http://localhost:${port} 서버 실행 중`);
});