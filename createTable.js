const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mydb.db', (err) => {
  if (err) {
      console.error(err.message);
}
console.log('mydb 데이터베이스에 연결됨.');
});

db.run(`CREATE TABLE IF NOT EXISTS banpick (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT)`, (err) => {
  // ?  테이블 생성 | 조건문 => users테이블이 존재하지 않을때 | (id => 열의 이름) NOT NULL 을 할떄는 무조건 띄워야 한다. NOTNULL이 아닌 NOT NULL
  if (err) {
    console.error(err.message);
  } else {
  console.log('테이블이 생성되었습니다.');
  }
});