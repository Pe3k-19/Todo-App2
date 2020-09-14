const express = require("express");
const app = express();
const mariadb = require('mariadb');
const bodyParser = require('body-parser')
app.use(express.json());
const Joi = require('joi');
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const pool = mariadb.createPool({
    host: process.env.HOST, 
    user: process.env.USER, 
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});


// const updateTask = (id, text) => {
//     pool.getConnection()
//         .then(conn => {
//         conn.query(`UPDATE ulohy SET name = '${text}' WHERE id = ${id}`)
//         })
// }

// const deleteTask = (id) => {
//     pool.getConnection()
//     .then(conn => {
//         conn.query(`DELETE FROM ulohy WHERE id = ${id}`)
//     })
// }


// --------------------     GET   --------------------------

app.get('/data', (req, res) => {
    return pool.query('SELECT * FROM ulohy')
    .then(result => {
        res.json(result);
    });
});

app.get('/', (req, res) => {
    res.send('Hello');
  });

 
// app.get('/data/:id', (req, res) => {
//     return pool.query('SELECT * FROM ulohy')
//         .then(result => {
//             const task = result.find(task => task.id === parseInt(req.params.id));
//             res.json(task);
//         });
// })
    // const task = localDatabase.find(task => task.id === parseInt(req.params.id));
    // if (!task) return res.status(404).send('Uloha sa nenasla')
    // res.send(task);

// app.get('/tasks', (req, res) => {
//     // res.json([{
//     //     id: 1,
//     //     name: "Hiccup",
//     //     password: 'hiccup'
//     //   }, {
//     //     id: 2,
//     //     name: "King Arthur",
//     //     password: 'king-arthur'
//     //   }]);
//     console.log(getTask())
//     // res.json(getTask())
// });


// app.get('/tasks/:id', (req, res) => {
//     const task = localDatabase.find(task => task.id === parseInt(req.params.id));
//     if (!task) return res.status(404).send('Uloha sa nenasla')
//     res.send(task);
// });



// --------------------     POST   --------------------------

app.use(bodyParser.json())
app.post('/', (req, res) => {
    
    pool.getConnection()
    .then(conn => {
        if(req.body.newData === "") {console.log("Prazdne pole")
    } else {

                conn.query(`INSERT INTO ulohy (title) VALUE ("${req.body.newData}")`
                )}
            })  
});



// ------------------------  PUT  ----------------------------

// updateTask(5, "update");


// app.put('/put/:id', (req, res) => {
//     const task = localDatabase.find(task => task.id === parseInt(req.params.id));
//     if (!task) return res.status(404).send('Uloha sa nenasla')


//     const { error } = validateTask(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     task.name = req.body.name;
//     res.send(task);
// });

// ------------------------  DELETE  ----------------------------

app.delete('/delete/:title', (req, res) => {
    pool.getConnection()
        .then(conn => {
            if(req.body.newData === "") {console.log("Prazdne pole")
    } else {
            conn.query(`DELETE FROM ulohy WHERE title = "${req.body.newData}"`)
        }
    })
});

//  -----------------------  VALIDACIA  ------------------------


function validateTask(task) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(task, schema);
}



// console.log(localDatabase)
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));

