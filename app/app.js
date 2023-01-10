const cors = require('cors');
const mysql = require('mysql2');
const express = require('express');
const bcrypt = require('bcrypt');
const e = require('cors')

require ('dotenv').config();

console.log(process.env.MYSQL_HOST)

const app = express();

app.use(cors());
app.use(express.json());


const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
  };
  
const connection = mysql.createConnection(mysqlConfig);

/*app.get('/expenses', (req, res) => {
  connection.execute('SELECT * FROM expenses', (err, result) => {
    res.send(result);
  });
});*/

/*app.get('/expenses/:id', (req, res) => {
  const { id }  = req.params;
  connection.execute('SELECT * FROM expenses WHERE userId=?', [id], (err, result) => {
    res.send(result);
  });
});*/

app.get('/expenses', (req, res) => {
  const { userId }  = req.query;
  connection.execute('SELECT * FROM expenses WHERE userId=?', [userId], (err, expenses) => {
    res.send(expenses);
  });
});

app.post('/expenses', (req, res) => {
  const { type, amount, userId } = req.body;

  connection.execute(
    'INSERT INTO expenses (type, amount, userId) VALUES (?, ?, ?)',
    [type, amount, userId],
    () => {
      connection.execute(
        'SELECT * FROM expenses WHERE userId=?', 
         [userId], 
         (err, expenses) => {
            res.send(expenses);
      });
    });
});
  

app.post('/register', (req, res) => {
  const { name, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 12);
  bcrypt.compareSync()


  connection.execute(
    'INSERT INTO users (name, password ) VALUES (?, ?)',
    [name, hashedPassword],
    (err, result) => {
            res.sendStatus(200);
      })
    });


app.post('/login', (req, res) => {
  const { name, password } = req.body;

  connection.execute(
    'SELECT * FROM users WHERE name=?',
    [name],
    (err, result) => {
     if (result.length === 0) {
      res.send('Incorrect username or password');
    } else {
        const passwordHash = result[0].password
        const isPasswordCorrect = bcrypt.compareSync(password, passwordHash);
        if (isPasswordCorrect) {
          res.send(result[0]);
        } else {
          res.send('Incorrect user name or password');
        }
     }
    }
  );
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Server is runing on port ${PORT}`));