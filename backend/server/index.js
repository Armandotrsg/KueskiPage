// server/index.js
const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get("/api/users", (req, res) => {
  res.json({ message: "User 1"});
});

/*app.get("/api/posts", (req, res) => {
  fs.readFile( __dirname + "/" + "posts.json", "utf8", (err, data) => {
    console.log( data );
    res.end( data );
  });
});*/

app.post("/api/users", (req, res) => {
  const {title, content} = req.body;
  console.log('El cuerpo de la peticion:', req.body);
  res.end( "Recibido!" );
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

/*connection.connect((error) => {
  if (error) {
    console.error('Error al conectar con la base de datos:', error);
    return;
  }

  console.log('Conexión a la base de datos establecida correctamente');
});*/