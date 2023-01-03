const cors = require('cors');
const mysql = require('mysql2');
const express = require('express');

const app = express();

app.use(cors());
app.use(express.json());


const mysqlConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'Loreta0103.',
    database: 'expenses_tracker',
    port: 3306
  };
  
  const connection = mysql.createConnection(mysqlConfig);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is runing on port ${PORT}`));