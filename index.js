// server/index.js
const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const url = require('url');
const mysql = require('mysql2');
const path = require("path");
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
      SELECT * FROM users LEFT JOIN addresses ON users.user_id = addresses.user_id LEFT JOIN identification ON users.user_id=identification.user_id;
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

              query = "SELECT * FROM identification WHERE user_id = " + id;

              connection.query(
                query
                , function (err, results, fields) {
                  if (err) {
                    res.status(500).send("No se pudo leer la base de datos.");
                  } else {
                    users_results[0].identifications = results;
                    const answer = JSON.stringify(users_results, null, 2);
                    res.send(answer);
                    console.log("Query exitosa");
                  }
                });
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

  if (!req.body.column || !req.body.data) {
    res.status(402).send("Formato incorrecto.");
    return;
  }

  const column = req.body.column;
  const new_val = req.body.data;

  var query = "";

  if (typeof column === 'string') {
    console.log("Normal Patch.");
    query = "UPDATE users SET " + column + " = '" + new_val + "' WHERE user_id = " + id + ";";
  }
  else if (column.sector === "addresses"){
    if (!column.mode || !column.name) {
      res.status(402).send("Formato incorrecto.");
      return;
    }
    console.log("Address Patch.");
    if (column.mode === "single"){
      if (!column.address_id) {
        res.status(402).send("Formato incorrecto.");
        console.log("Aborted");
        return;
      }
      query = "UPDATE addresses SET " + column.name + " = '" + new_val + "' WHERE user_id = " + id + " AND address_id = " + column.address_id + ";";
    }
    else if (column.mode === "multiple"){
      query = "UPDATE addresses SET " + column.name + " = '" + new_val + "' WHERE user_id = " + id + ";";
    }
  }
  else if (column.sector === "identification"){
    if (!column.mode || !column.name) {
      res.status(402).send("Formato incorrecto.");
      return;
    }
    console.log("Identification Patch.");
    if (column.mode === "single"){
      if (!column.identification_id) {
        res.status(402).send("Formato incorrecto.");
        console.log("Aborted");
        return;
      }
      query = "UPDATE identification SET " + column.name + " = '" + new_val + "' WHERE user_id = " + id + " AND identification_id = " + column.identification_id + ";";
    }
    else if (column.mode === "multiple"){
      query = "UPDATE identification SET " + column.name + " = '" + new_val + "' WHERE user_id = " + id + ";";
    }
  }
  else {
    res.status(402).send("Formato incorrecto.");
    return;
  }
  
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
        return;
      } else {
        console.log("Query exitosa");
      }
      connection.release(); // <-- libera la conexión después de realizar la consulta
      res.end("Cambio realizado.");
    });
  });
});

app.delete("/api/users/:id", async (req, res) => {
  // Encontrar usuario y sus datos
  const id = req.params.id;

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
          return;
        } else if (results[0].is_client === 1) {
          res.status(402).send("Usuario es cliente, no se puede nulificar.");
          console.log("Query sin resultados");
          return;
        } else {
          console.log("Usuario encontrado en users, comenzando proceso de borrado...");

          query = "UPDATE users SET ";
          const columns = Object.keys(results[0]);
          columns.forEach(column => {
            if (column != 'user_id'){
              query += column + " = NULL, ";
            }
          });

          query = query.substring(0, query.length - 2);
          query += " WHERE user_id = " + id + ";";

          connection.query(
            query
            , function (err, results, fields) {
            if (err) {
              console.error(err);
              res.status(500).send("No se pudo leer la base de datos.");
              return;
            } else {
              console.log("Query en users exitosa");

              query = `SELECT * FROM addresses WHERE user_id = ` + id + `;`;
              connection.query(
                query
                , function (err, results, fields) {
                if (err) {
                  res.status(500).send("No se pudo leer la base de datos.");
                } else if (!results || results.length === 0) {
                  console.log("Query sin resultados en address.");

                  query = `SELECT * FROM identification WHERE user_id = ` + id + `;`;
                  connection.query(
                    query
                    , function (err, results, fields) {
                    if (err) {
                      res.status(500).send("No se pudo leer la base de datos.");
                    } else if (!results || results.length === 0) {
                      console.log("Query sin resultados en identification.");
                    } else {
                      console.log("Usuario encontrado en identification, comenzando proceso de borrado...");
            
                      query = "UPDATE identification SET ";
                      const columns = Object.keys(results[0]);
                      columns.forEach(column => {
                        if (column != 'user_id' && column != 'identification_id'){
                          query += column + " = NULL, ";
                        }
                      });
            
                      query = query.substring(0, query.length - 2);
                      query += " WHERE user_id = " + id + ";";
            
                      connection.query(
                        query
                        , function (err, results, fields) {
                        if (err) {
                          console.error(err);
                          res.status(500).send("No se pudo leer la base de datos.");
                        } else {
                          console.log("Query en identification exitosa");
                          res.end("Usuario nullificado.");
                          return;
                        }
                      });
                    }
                  });
                } else {
                  console.log("Usuario encontrado en addresses, comenzando proceso de borrado...");
        
                  query = "UPDATE addresses SET ";
                  const columns = Object.keys(results[0]);
                  columns.forEach(column => {
                    if (column != 'user_id' && column != 'address_id'){
                      query += column + " = NULL, ";
                    }
                  });
        
                  query = query.substring(0, query.length - 2);
                  query += " WHERE user_id = " + id + ";";
        
                  connection.query(
                    query
                    , function (err, results, fields) {
                    if (err) {
                      console.error(err);
                      res.status(500).send("No se pudo leer la base de datos.");
                    } else {
                      console.log("Query en addresses exitosa");

                      query = `SELECT * FROM identification WHERE user_id = ` + id + `;`;
                      connection.query(
                        query
                        , function (err, results, fields) {
                        if (err) {
                          res.status(500).send("No se pudo leer la base de datos.");
                        } else if (!results || results.length === 0) {
                          console.log("Query sin resultados en identification.");
                        } else {
                          console.log("Usuario encontrado en identification, comenzando proceso de borrado...");
                
                          query = "UPDATE identification SET ";
                          const columns = Object.keys(results[0]);
                          columns.forEach(column => {
                            if (column != 'user_id' && column != 'identification_id'){
                              query += column + " = NULL, ";
                            }
                          });
                
                          query = query.substring(0, query.length - 2);
                          query += " WHERE user_id = " + id + ";";
                
                          connection.query(
                            query
                            , function (err, results, fields) {
                            if (err) {
                              console.error(err);
                              res.status(500).send("No se pudo leer la base de datos.");
                            } else {
                              console.log("Query en identification exitosa");
                              res.end("Usuario nullificado.");
                              connection.release();
                              return;
                            }
                          });
                        }
                      });
 
                      res.end("Usuario nullificado.");
                      connection.release(); // <-- libera la conexión después de realizar la consulta
                    }
                  });
                }
              });
            }
          });
        }
        
        connection.release(); // <-- libera la conexión después de realizar la consulta
      });
    }

    connection.release(); // <-- libera la conexión después de realizar la consulta
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

// Esto hace que NodeJS sirva los archivos resultado del build de ReactJS
// Esto va antes de nuestros endpoints pero después de la declaración de app.
app.use(express.static(path.resolve("client/dist")));
// Todas las peticiones GET que no manejamos ahora regresarán nuestra React App
// Agrega esto antes del “app.listen”
app.get("*", (req, res) => {
    res.sendFile(path.resolve("client/dist", "index.html"));
});

// Listen ---------------------------|

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});