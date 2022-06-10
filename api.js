const client = require('./dbconnection.js')
const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(cors())

const port = 3300;

app.listen(port, () => {
    console.log(`Server is on port ${port}`)
})

client.connect();

app.get('/students', cors(), async (req, res) => {
    client.query(`Select * from students`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/students/search/:name', cors(), async (req, res) => {
    client.query(`Select * from students where lastname LIKE '%${req.params.name}%' OR firstname LIKE '%${req.params.name}%'`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})

app.post('/students', async (req, res) => {
    const student = req.body;
    console.log(student)
    let insertData = `insert into students(id, firstname, lastname, phonenumber, zip, statecode, statename)
values (${student.id}, '${student.firstname}', '${student.lastname}', '${student.phonenumber}','${student.zip}','${student.statecode}','${student.statename}')`

    client.query(insertData, (err, result) => {
        if (!err) {
            res.send('Data was inserted successful!')
        } else {
            console.log(err.message)
        }
    })
    client.end;
})

