const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mydb.db', (err) => {
  if (err) {
      console.error(err.message);
}
console.log('mydb 데이터베이스에 연결됨.');
});

const userData = {};

const data = `INSERT INTO test(name, age) VALUES(?, ?)`;
db.run(data, [userData.name, userData.age], (err) => {
  if (err) {
    return console.error(err.message);
  } else {
  console.log(`${this.lastID}의 데이터가 성공적으로 추가 되었습니다.`);
  }
});