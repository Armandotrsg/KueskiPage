// server/index.js
const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const url = require('url');
const mysql = require('mysql2');
const path = require("path");
require('dotenv').config();

const connectionUrl = url.parse(process.env.DATABASE_URL='mysql://pwi7a6giocm5y279gv5b:pscale_pw_44QfZJ2Mu2O7aTq33iPiLLJnDDGuIll1z6IjiImEXqv@aws.connect.psdb.cloud/kueskidb?ssl={"rejectUnauthorized":true}');
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
          res.status(400).send("No se encontró al usuario.");
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
  const curr_date = new Date().toLocaleDateString(
    'es-ES',
    { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').reverse().join('-');
  
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('No se pudo interpretar la información recibida.');
  }

  if (!req.body.column || !req.body.data) {
    res.status(400).send("Formato incorrecto.");
    return;
  }

  const column = req.body.column;
  const new_val = req.body.data;

  var query = "";
  var query2 = "";

  if (typeof column === 'string') {
    console.log("Normal Patch.");
    query = "UPDATE users SET " + column + " = '" + new_val + "' WHERE user_id = " + id + ";";
    query2 = "UPDATE users SET updated_at = '" + curr_date + "' WHERE user_id = " + id + ";";
  }
  else if (column.sector === "addresses"){
    if (!column.mode || !column.name) {
      res.status(400).send("Formato incorrecto.");
      return;
    }
    console.log("Address Patch.");
    if (column.mode === "single"){
      if (!column.address_id) {
        res.status(400).send("Formato incorrecto.");
        console.log("Aborted");
        return;
      }
      query = "UPDATE addresses SET " + column.name + " = '" + new_val + "' WHERE user_id = " + id + " AND address_id = " + column.address_id + ";";
      query2 = "UPDATE addresses SET updated_at = '" + curr_date + "' WHERE user_id = " + id + " AND address_id = " + column.address_id + ";";
    }
    else if (column.mode === "multiple"){
      query = "UPDATE addresses SET " + column.name + " = '" + new_val + "' WHERE user_id = " + id + ";";
      query2 = "UPDATE addresses SET updated_at = '" + curr_date + "' WHERE user_id = " + id + ";";
    }
  }
  else if (column.sector === "identification"){
    if (!column.mode || !column.name) {
      res.status(400).send("Formato incorrecto.");
      return;
    }
    console.log("Identification Patch.");
    if (column.mode === "single"){
      if (!column.identification_id) {
        res.status(400).send("Formato incorrecto.");
        console.log("Aborted");
        return;
      }
      query = "UPDATE identification SET " + column.name + " = '" + new_val + "' WHERE user_id = " + id + " AND identification_id = " + column.identification_id + ";";
      query2 = "UPDATE identification SET updated_at = '" + curr_date + "' WHERE user_id = " + id + " AND identification_id = " + column.identification_id + ";";
    }
    else if (column.mode === "multiple"){
      query = "UPDATE identification SET " + column.name + " = '" + new_val + "' WHERE user_id = " + id + ";";
      query2 = "UPDATE identification SET updated_at = '" + curr_date + "' WHERE user_id = " + id + ";";
    }
  }
  else {
    res.status(400).send("Formato incorrecto.");
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
        connection.query(
          query2
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
      }
    });
  });
});

app.delete("/api/users/:id", async (req, res) => {
  // Encontrar usuario y sus datos
  const id = req.params.id;
  const curr_date = new Date().toLocaleDateString(
    'es-ES',
    { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').reverse().join('-');

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
          res.status(400).send("No se encontró al usuario.");
          console.log("Query sin resultados");
          return;
        } else if (results[0].is_client === 1) {
          res.status(400).send("Usuario es cliente, no se puede nulificar.");
          console.log("Query sin resultados");
          return;
        } else {
          console.log("Usuario encontrado en users, comenzando proceso de borrado...");

          query = "UPDATE users SET ";
          const columns = Object.keys(results[0]);
          columns.forEach(column => {
            if (column != 'user_id' && column != 'created_at' && column != 'updated_at' && column != 'deleted_at'){
              query += column + " = NULL, ";
            }
          });

          query += "deleted_at = '" + curr_date + "', ";

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
                        if (column != 'user_id' && column != 'identification_id'  && column != 'created_at' && column != 'updated_at' && column != 'deleted_at'){
                          query += column + " = NULL, ";
                        }
                      });

                      query += "deleted_at = '" + curr_date + "', ";
            
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
                    if (column != 'user_id' && column != 'address_id'  && column != 'created_at' && column != 'updated_at' && column != 'deleted_at'){
                      query += column + " = NULL, ";
                    }
                  });

                  query += "deleted_at = '" + curr_date + "', ";
        
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
                            if (column != 'user_id' && column != 'identification_id'  && column != 'created_at' && column != 'updated_at' && column != 'deleted_at'){
                              query += column + " = NULL, ";
                            }
                          });

                          query += "deleted_at = '" + curr_date + "', ";
                
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

// ARCO Registers-----------------------------------------------------------------------------------

app.get("/api/arco_registers", (req, res) => {
  var answer;
  pool.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
    } else {
      connection.query(`
      SELECT * FROM registros_arco;
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

app.get("/api/arco_registers/:id", (req, res) => {
  const id = req.params.id;

  pool.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
    } else {
      let query =  `SELECT * FROM registros_arco WHERE registro_arco_id = ` + id + `;`;
      connection.query(
        query, function (err, results, fields) {
        if (err) {
          res.status(500).send("No se pudo leer la base de datos.");
        } else if (!results || results.length === 0) {
          console.log("Query sin resultados");
          res.status(400).end("Usuario no encontrado.");
          connection.release();
          return;
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

app.post("/api/arco_registers", (req, res) => {

  if (!req.body.user_id || !req.body.arco_type || !req.body.message) {
    res.status(400).end("Formato incorrecto.");
    return;
  }

  const user_id = req.body.user_id;
  const arco_type = req.body.arco_type;
  const message = req.body.message;
  const curr_date = new Date().toLocaleDateString(
    'es-ES',
    { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').reverse().join('-');

  pool.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
    } else {
      let query =  `SELECT IFNULL(MAX(registro_arco_id) + 1, 1) FROM registros_arco;`;

      connection.query(
        query, function (err, results, fields) {
        if (err) {
          res.status(500).send("No se pudo leer la base de datos.");
        } else {
          let last_id = results[0]['IFNULL(max(registro_arco_id) + 1, 1)'];

          query =  `ALTER TABLE registros_arco AUTO_INCREMENT = ` + last_id + `;`;

          connection.query(
            query, function (err, results, fields) {
            if (err) {
              res.status(500).send("No se pudo leer la base de datos.");
            } else {
              query =  ` INSERT INTO registros_arco (user_id, arco_type, message, created_at, updated_at)`;
              query += ` VALUES (` + user_id + `,  '`+ arco_type + `', '` + message + `', '` + curr_date + `', '` + curr_date + `');`;

              connection.query(
                query, function (err, results, fields) {
                if (err) {
                  res.status(500).send("No se pudo leer la base de datos.");
                } else {
                  res.end("Se añadió un nuevo registro de derecho ARCO para el usuario: " + user_id + ".");
                  console.log("Query exitosa");
                }
                connection.release(); // <-- libera la conexión después de realizar la consulta
              });
            }
          });
        }
      });
    }
  });
});

app.delete("/api/arco_registers", (req, res) => {

  pool.getConnection(function (err, connection) {
    if (err) {
      console.error(err);
    } else {
      let query =  `DELETE FROM 
                      registros_arco
                    WHERE 
                      registro_arco_id = (
                        SELECT 
                          registro_arco_id
                        FROM (
                          SELECT 
                            MAX(registro_arco_id) AS registro_arco_id
                          FROM 
                            registros_arco
                      ) AS temp
                    );`;

      connection.query(
        query, function (err, results, fields) {
        if (err) {
          res.status(500).send("No se pudo leer la base de datos.");
        } else {

          query =  `SELECT IFNULL(MAX(registro_arco_id) + 1, 1) FROM registros_arco;`;

          connection.query(
            query, function (err, results, fields) {
            if (err) {
              res.status(500).send("No se pudo leer la base de datos.");
            } else {
              let last_id = results[0]['IFNULL(max(registro_arco_id) + 1, 1)'];

              query =  `ALTER TABLE registros_arco AUTO_INCREMENT = ` + last_id + `;`;

              connection.query(
                query, function (err, results, fields) {
                if (err) {
                  res.status(500).send("No se pudo leer la base de datos.");
                } else {
                  res.end("Se borró el ultimo registro.");
                  console.log("Query exitosa");
                }
                connection.release(); // <-- libera la conexión después de realizar la consulta
              });
            }
          });
        }
      });
    }
  });
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