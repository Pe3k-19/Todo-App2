const express = require("express");
const app = express();
const mariadb = require("mariadb");
// const bodyParser = require("body-parser");
app.use(express.json());
require("dotenv").config();
// const Joi = require("joi");
// app.use(bodyParser.urlencoded({ extended: true }));

//   ---------------------------   CONNECTION  -----------------------------

const pool = mariadb.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// --------------------     GET   --------------------------

app.get("/data", (req, res) => {
  return pool
    .query("SELECT * FROM ulohy")
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/", (req, res) => {
  res.send("Hello");
});

// --------------------     POST   --------------------------

app.post("/post", (req, res) => {
  pool
    .getConnection()
    .then((conn) => {
      if (req.body.newData === "") {
        conn.query(`SELECT * FROM ulohy WHERE title = ''`).then((result) => {
          res.json(result);

          console.log("Prazdne pole pre POST");
        });
      } else {
        conn.query(`INSERT INTO ulohy (title) VALUE ("${req.body.newData}")`);
        res.json("ok");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// ------------------------  UPDATE  ----------------------------

app.post("/update/:id", (req, res) => {
  pool
    .getConnection()
    .then((conn) => {
      if (req.body.newId === "" || req.body.newData === "") {
        conn.query(`SELECT * FROM ulohy WHERE title = ''`).then((result) => {
          res.json(result);
          console.log("Prazdne pole pre UPDATE");
        });
      } else {
        conn.query(
          `UPDATE ulohy SET title = '${req.body.newData}' WHERE id = ${req.body.newId}`
        );
        res.json("Update ok");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// ------------------------  DELETE  ----------------------------

app.post("/delete/:id", (req, res) => {
  pool
    .getConnection()
    .then((conn) => {
      if (req.body.newId == "") {
        conn.query(`SELECT * FROM ulohy WHERE title = ''`).then((result) => {
          res.json(result);
          console.log("Prazdne pole pre DELETE");
        });
      } else {
        conn.query(`DELETE FROM ulohy WHERE id = "${req.body.newId}"`);
        res.json("Delete ok");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

//   -----------------------------SEARCH   ----------------------------

app.post("/search", (req, res) => {
  pool.getConnection().then((conn) => {
    if (req.body.newData === "") {
      conn.query(`SELECT * FROM ulohy WHERE title = ''`).then((result) => {
        res.json(result);

        console.log("Prazdne pole pre SEARCH");
      });
    } else {
      conn
        .query(`SELECT * FROM ulohy WHERE title = '${req.body.newData}'`)
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
});

//  -----------------------  VALIDACIA  ------------------------

// function validateTask(task) {
//   const schema = {
//     name: Joi.string().min(3).required(),
//   };

//   return Joi.validate(task, schema);
// }

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}...`)
);
