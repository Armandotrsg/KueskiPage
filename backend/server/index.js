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

// Users --------------------------

app.get("/api/users", (req, res) => {
  fs.readFile( __dirname + "/" + "users.json", "utf8", (err, data) => {
    if (err) {
      res.status(400).send("Error al leer el archivo JSON");
    }
    console.log( data );
    res.end( data );
  });
});

app.patch("/api/users", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Error: El cuerpo de la solicitud está vacío.');
  }
  console.log('El cuerpo de la petición', req.body);
  res.end( "Recibido!" )
});

app.post("/api/users", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Error: El cuerpo de la solicitud está vacío.');
  }
  console.log('El cuerpo de la peticion:', req.body);
  res.end( "Recibido!" );
});

app.delete("/api/users", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Error: El cuerpo de la solicitud está vacío.');
  }
  console.log('El cuerpo de la peticion:', req.body);
  res.end( "Recibido!" );
});

// Identification --------------------------

app.get("/api/identification", (req, res) => {
  fs.readFile( __dirname + "/" + "users.json", "utf8", (err, data) => {
    if (err) {
      res.status(400).send("Error al leer el archivo JSON");
    }
    console.log( data );
    res.end( data );
  });
});

app.patch("/api/identification", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Error: El cuerpo de la solicitud está vacío.');
  }
  console.log('El cuerpo de la petición', req.body);
  res.end( "Recibido!" )
});

app.post("/api/identification", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Error: El cuerpo de la solicitud está vacío.');
  }
  console.log('El cuerpo de la peticion:', req.body);
  res.end( "Recibido!" );
});

app.delete("/api/identification", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Error: El cuerpo de la solicitud está vacío.');
  }
  console.log('El cuerpo de la peticion:', req.body);
  res.end( "Recibido!" );
});

// Identification types --------------------------

app.get("/api/identification_type", (req, res) => {
  fs.readFile( __dirname + "/" + "users.json", "utf8", (err, data) => {
    if (err) {
      res.status(400).send("Error al leer el archivo JSON");
    }
    console.log( data );
    res.end( data );
  });
});

app.patch("/api/identification_type", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Error: El cuerpo de la solicitud está vacío.');
  }
  console.log('El cuerpo de la petición', req.body);
  res.end( "Recibido!" )
});

app.post("/api/identification_type", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Error: El cuerpo de la solicitud está vacío.');
  }
  console.log('El cuerpo de la peticion:', req.body);
  res.end( "Recibido!" );
});

app.delete("/api/identification_type", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Error: El cuerpo de la solicitud está vacío.');
  }
  console.log('El cuerpo de la peticion:', req.body);
  res.end( "Recibido!" );
});

// ARCO Registers--------------------------

app.get("/api/arco_registers", (req, res) => {
  fs.readFile( __dirname + "/" + "users.json", "utf8", (err, data) => {
    if (err) {
      res.status(400).send("Error al leer el archivo JSON");
    }
    console.log( data );
    res.end( data );
  });
});

app.patch("/api/arco_registers", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Error: El cuerpo de la solicitud está vacío.');
  }
  console.log('El cuerpo de la petición', req.body);
  res.end( "Recibido!" )
});

app.post("/api/arco_registers", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Error: El cuerpo de la solicitud está vacío.');
  }
  console.log('El cuerpo de la peticion:', req.body);
  res.end( "Recibido!" );
});

app.delete("/api/arco_registers", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Error: El cuerpo de la solicitud está vacío.');
  }
  console.log('El cuerpo de la peticion:', req.body);
  res.end( "Recibido!" );
});

// ARCO type--------------------------

app.get("/api/arco_type", (req, res) => {
  fs.readFile( __dirname + "/" + "users.json", "utf8", (err, data) => {
    if (err) {
      res.status(400).send("Error al leer el archivo JSON");
    }
    console.log( data );
    res.end( data );
  });
});

app.patch("/api/arco_type", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Error: El cuerpo de la solicitud está vacío.');
  }
  console.log('El cuerpo de la petición', req.body);
  res.end( "Recibido!" )
});

app.post("/api/arco_type", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Error: El cuerpo de la solicitud está vacío.');
  }
  console.log('El cuerpo de la peticion:', req.body);
  res.end( "Recibido!" );
});

app.delete("/api/arco_type", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Error: El cuerpo de la solicitud está vacío.');
  }
  console.log('El cuerpo de la peticion:', req.body);
  res.end( "Recibido!" );
});

// Addresses--------------------------

app.get("/api/addresses", (req, res) => {
  fs.readFile( __dirname + "/" + "users.json", "utf8", (err, data) => {
    if (err) {
      res.status(400).send("Error al leer el archivo JSON");
    }
    console.log( data );
    res.end( data );
  });
});

app.patch("/api/addresses", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Error: El cuerpo de la solicitud está vacío.');
  }
  console.log('El cuerpo de la petición', req.body);
  res.end( "Recibido!" )
});

app.post("/api/addresses", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Error: El cuerpo de la solicitud está vacío.');
  }
  console.log('El cuerpo de la peticion:', req.body);
  res.end( "Recibido!" );
});

app.delete("/api/addresses", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Error: El cuerpo de la solicitud está vacío.');
  }
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