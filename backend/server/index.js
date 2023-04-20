// server/index.js
const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const url = require('url');
const mysql = require('mysql2');
require('dotenv').config();

const connectionUrl = url.parse(process.env.DATABASE_URL);
const auth = connectionUrl.auth.split(':');

const pool = mysql.createPool({
  host: connectionUrl.hostname,
  port: connectionUrl.port,
  user: auth[0],
  password: auth[1],
  database: connectionUrl.pathname.substr(1),
  ssl: {
    rejectUnauthorized: true
  }
});

const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:5173'
}));

const isObjectEmpty = (objectName) => {
  return JSON.stringify(objectName) === "{}";
};

// Users --------------------------

app.get("/api/users", (req, res) => {
  var answer;
  pool.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
    } else {
      connection.query(`
      SELECT * FROM users LEFT JOIN addresses ON users.user_id = addresses.user_id;
      `, function (err, results, fields) {
        if (err) {
          res.status(500).send("No se pudo leer la base de datos.");
        } else {
          console.log(results);
          answer = JSON.stringify(results, null, 2);
          res.end(answer);
          console.log("Query exitosa");
        }
        connection.release(); // <-- libera la conexión después de realizar la consulta
      });
    }
  });
});

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  let answer;
  pool.getConnection(function (err, connection) {
    let query = `SELECT * FROM users WHERE user_id = ` + id + `;`;
    if (err) {
      console.error(err);
    } else {
      connection.query(
        query
        , function (err, results, fields) {
        if (err) {
          res.status(500).send("No se pudo leer la base de datos.");
        } else if (!results || results.length === 0) {
          res.status(401).send("No se encontró al usuario.");
          console.log("Query sin resultados");
        } else {
          const users_results = results;

          query = "SELECT * FROM addresses WHERE user_id = " + id;

          connection.query(
          query
          , function (err, results, fields) {
            if (err) {
              res.status(500).send("No se pudo leer la base de datos.");
            } else {
              users_results[0].addresses = results;
              const answer = JSON.stringify(users_results, null, 2);
              res.send(answer);
              console.log("Query exitosa");
            }
          });
        }
        connection.release(); // <-- libera la conexión después de realizar la consulta
      });
    }
  });
});

app.patch("/api/users/:id", (req, res) => {
  const id = req.params.id;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('No se pudo interpretar la información recibida.');
  }

  const column = req.body.column;
  const new_val = req.body.data;

  const query = "";

  if (column != "address") {
    query = "UPDATE users SET " + column + " = '" + new_val + "' WHERE user_id = " + id + ";";
  }
  
  console.log(query);
  
  pool.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
      res.status(500).send("No se pudo conectar a la base de datos.");
      return;
    }
    connection.query(
      query
      , function (err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).send("No se pudo leer la base de datos.");
      } else {
        console.log("Query exitosa");
      }
      connection.release(); // <-- libera la conexión después de realizar la consulta
      res.end("Cambio realizado.");
    });
  });
});

app.delete("/api/users/:id", (req, res) => {
  // Encontrar usuario y sus datos
  const id = req.params.id;
  let answer;
  pool.getConnection(function (err, connection) {
    let query = `SELECT * FROM users WHERE user_id = ` + id + `;`;
    if (err) {
      console.error(err);
    } else {
      connection.query(
        query
        , function (err, results, fields) {
        if (err) {
          res.status(500).send("No se pudo leer la base de datos.");
        } else if (!results || results.length === 0) {
          res.status(401).send("No se encontró al usuario.");
          console.log("Query sin resultados");
        } else {
          answer = JSON.stringify(results, null, 2);
          console.log("Usuario encontrado, comenzando proceso de borrado...");

          const columns = Object.keys(results[0]);
          columns.forEach(column => {
            if (column != 'user_id'){
              query = "UPDATE users SET " + column + " = NULL WHERE user_id = " + id + ";";
              connection.query(
                query
                , function (err, results, fields) {
                if (err) {
                  console.error(err);
                  res.status(500).send("No se pudo leer la base de datos.");
                }
              });
            }
          });
        }
        connection.release(); // <-- libera la conexión después de realizar la consulta
        res.end("Usuario nulificado.");
      });
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