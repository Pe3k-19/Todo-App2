const express = require("express");
const app = express();
const mariadb = require("mariadb");
const bodyParser = require("body-parser");
app.use(express.json());
const Joi = require("joi");
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool = mariadb.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// --------------------     GET   --------------------------

app.get("/data", (req, res) => {
  return pool.query("SELECT * FROM ulohy").then((result) => {
    res.json(result);
  });
});

app.get("/", (req, res) => {
  res.send("Hello");
});

// --------------------     POST   --------------------------

app.use(bodyParser.json());
app.post("/", (req, res) => {
  pool.getConnection().then((conn) => {
    if (req.body.newData === "") {
      console.log("Prazdne pole");
    } else {
      conn.query(`INSERT INTO ulohy (title) VALUE ("${req.body.newData}")`);
    }
  });
});

// ------------------------  UPDATE  ----------------------------

app.post("/update/:id", (req, res) => {
  pool.getConnection().then((conn) => {
    if (req.body.newId === "" || req.body.newData === "") {
      console.log("Prazdne pole");
    } else {
      conn.query(
        `UPDATE ulohy SET title = '${req.body.newData}' WHERE id = ${req.body.newId}`
      );
    }
  });
});

// ------------------------  DELETE  ----------------------------

app.post("/delete/:id", (req, res) => {
  pool.getConnection().then((conn) => {
    if (req.body.newId === "") {
      console.log("Prazdne pole");
    } else {
      conn.query(`DELETE FROM ulohy WHERE id = "${req.body.newId}"`);
    }
  });
});

//   -----------------------------SEARCH   ----------------------------

app.post("/search", (req, res) => {
  pool.getConnection().then((conn) => {
    if (req.body.newData === "") {
      console.log("Prazdne pole");
    } else {
      conn
        .query(`SELECT * FROM ulohy WHERE title = '${req.body.newData}'`)
        .then((result) => {
          res.json(result);
          // console.log(result)
        });
    }
  });
});

//  -----------------------  VALIDACIA  ------------------------

function validateTask(task) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(task, schema);
}

// console.log(localDatabase)
app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}...`)
);
