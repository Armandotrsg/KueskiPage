// server/index.js
const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

pool.getConnection(function (err, connection) {
  if (err) {
    console.error(err);
  } else {
    connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      address_id INT,
      ADD FOREIGN KEY
      edad INT NOT NULL,
      PRIMARY KEY (id)
    );
    `, function (err, results, fields) {
      if (err) {
        console.error(err);
      } else {
        console.log(results);
        console.log("Query exitosa")
      }
      connection.release(); // <-- libera la conexión después de realizar la consulta
    });
  }
});

pool.getConnection(function (err, connection) {
  if (err) {
    console.error(err);
  } else {
    connection.query(`
    SHOW DATABASES;
    `, function (err, results, fields) {
      if (err) {
        console.error(err);
      } else {
        console.log(results);
        console.log("Query exitosa")
      }
      connection.release(); // <-- libera la conexión después de realizar la consulta
    });
  }
});

const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:5173'
}));

// Users --------------------------

app.get("/api/users", (req, res) => {
  fs.readFile( __dirname + "/" + "users.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("No se pudo leer la base de datos.");
    }
    console.log( data );
    res.end( data );
  });
});

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile( __dirname + "/" + "users.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("No se pudo leer la base de datos.");
    }
    const users = JSON.parse(data);
    const user = users[id];

    if (user !== undefined) { // Verificar si user está definido y no es undefined
      console.log(user);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(user, null, 2));
    } else {
      res.status(404).send("Usuario \"" + id + "\" no encontrado.");
    }
  });
});

app.patch("/api/users/:id", (req, res) => {
  const id = req.params.id;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('No se pudo interpretar la información recibida.');
  }

  fs.readFile( __dirname + "/" + "users.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("No se pudo leer la base de datos.");
    }
    const users = JSON.parse(data);
    const user = users[id];

    if (user !== undefined) { // Verificar si user está definido y no es undefined
      console.log(user);
      console.log("Modificado por:\n", req.body)
      res.end("Recibido.");
    } else {
      res.status(404).send("Usuario \"" + id + "\" no encontrado.");
    }
  });
});

app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('No se pudo interpretar la información recibida.');
  }

  fs.readFile( __dirname + "/" + "users.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("No se pudo leer la base de datos.");
    }
    const users = JSON.parse(data);
    const user = users[id];

    if (user !== undefined) { // Verificar si user está definido y no es undefined
      console.log(user);
      console.log("Modificado por:\n", req.body)
      res.end("Recibido.");
    } else {
      res.status(404).send("Usuario \"" + id + "\" no encontrado.");
    }
  });
});

// ARCO Registers--------------------------

app.get("/api/arco_registers", (req, res) => {
  fs.readFile( __dirname + "/" + "users.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("No se pudo leer la base de datos.");
    }
    console.log( data );
    res.end( data );
  });
});

app.post("/api/arco_registers", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('No se pudo interpretar la información recibida.');
  }
  console.log('El cuerpo de la peticion:', req.body);
  res.end( "Recibido!" );
});

// Listen ---------------------------|

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});