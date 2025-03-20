const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();
const db = new sqlite3.Database('./mydb.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('mydb 데이터베이스에 연결됨.');  
});

router.get('/', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
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
  const sql = `SELECT * FROM users WHERE id = ?`;
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
  const data = req.body;
  const blueBans = data.blue.ban;
  const bluePicks = data.blue.pick;
  const redBans = data.red.ban;
  const redPicks = data.red.pick;

  const insertBanPick = (team, type, champion) => {
    db.run(
      `INSERT INTO banpicks (team, type, champion_id, champion_name) VALUES (?, ?, ?, ?)`,
      [team, type, champion.id, champion.name],
      function (err) {
        if (err) {
          console.error(err.message);
        }
      }
    );
  };

  // blue 팀 ban 저장
  blueBans.forEach((champion) => {
    insertBanPick('blue', 'ban', champion);
  });

  // blue 팀 pick 저장
  bluePicks.forEach((champion) => {
    insertBanPick('blue', 'pick', champion);
  });

  // red 팀 ban 저장
  redBans.forEach((champion) => {
    insertBanPick('red', 'ban', champion);
  });

  // red 팀 pick 저장
  redPicks.forEach((champion) => {
    insertBanPick('red', 'pick', champion);
  });

  res.send('밴픽 데이터가 저장되었습니다.');
});

// router.post('/', (req, res) => {
//   const { name, email } = req.body;
//   db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function (err) {
//     if (err) {
//       console.error(err.message);
//       res.status(500).send('Internal Server Error');
//       return;
//     }
//     res.json({ id: this.lastID });
//   });
// });

// router.put('/:id', (req, res) => {
//   const userId = req.params.id;
//   const { name, email } = req.body;
//   db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId], function (err) {
//     if (err) {
//       console.error(err.message);
//       res.status(500).send('Internal Server Error');
//       return;
//     }
//     res.json({ changes: this.changes });
//   });
// });

// router.delete('/:id', (req, res) => {
//   const userId = req.params.id;
//   db.run('DELETE FROM users WHERE id = ?', userId, function (err) {
//     if (err) {
//       console.error(err.message);
//       res.status(500).send('Internal Server Error');
//       return;
//     }
//     res.json({ changes: this.changes });
//   });
// });

module.exports = router;