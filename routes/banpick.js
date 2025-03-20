const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const qs = require('querystring');

const router = express.Router();
const db = new sqlite3.Database('./mydb.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('mydb 데이터베이스에 연결됨.');  
});

router.get('/', (req, res) => {
  db.all('SELECT * FROM banpick', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM banpick WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: `${id}를 찾을 수 없어요.` });
    }
  });
});

router.post('/save', (req, res) => {
  const data = JSON.stringify(req.body);
  console.log(data);
  db.run("INSERT INTO banpick (data) VALUES (?)", [data], function(err) {
    if (err) {
      return console.log(err.message);
    }
    res.send({ id: this.lastID });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const data = JSON.stringify(req.body);
  db.run("UPDATE banpick SET data = ? WHERE id = ?", [data, id], function(err) {
    if (err) {
      return console.log(err.message);
    }
    res.send({ changes: this.changes });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM banpick WHERE id = ?", [id], function(err) {
    if (err) {
      return console.log(err.message);
    }
    res.send({ changes: this.changes });
  });
});

module.exports = router;