const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mydb.db', (err) => {
    if (err) {
        console.error('데이터베이스 연결 실패:', err.message);
    }
    console.log('mydb 데이터베이스에 연결됨.');
});

const tableName = 'banpicks'; // 삭제할 테이블 이름

db.run(`DROP TABLE IF EXISTS ${tableName}`, (err) => {
    if (err) {
        console.error(`테이블 삭제 실패: ${err.message}`);
        process.exit(1);
    } else {
    console.log(`${tableName} 테이블이 삭제되었습니다.`);
    }
    db.close(); // 데이터베이스 연결 종료
});