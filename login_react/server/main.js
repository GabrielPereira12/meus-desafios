const express = require('express')
const app = express()

const mysql = require('mysql')

const cors = require('cors')

const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "login_user"
})

app.use(cors())
app.use(express.json())

app.post('/register', (req, res) => {
    const { userName } = req.body
    const { userEmail } = req.body
    const { userPassword } = req.body

    let SQL = "INSERT INTO users ( userName, userEmail, userPassword ) VALUES ( ?, ?, ? )"

    db.query(SQL, [userName, userEmail, userPassword], (error, result) => {
        console.error(error)
    })
})

app.post('/faceRegister', (req, res) => {
    const { userFaceDescription } = req.body
    const { userId } = req.body

    let SQL = "UPDATE users SET userFaceDescription = ? WHERE userId = ?"

    db.query(SQL, [userFaceDescription, userId], (error, result) => {
        console.error(error)
    })
})

app.get("/getUsers", (req, res) => {
    let SQL = "SELECT * from users"

    db.query(SQL, (error, result) => {
        if (error) console.log(error)
        else res.send(result)
    })
})

app.listen(3001, () => {
  console.log("Rodando servidor!")
})

/*app.get('/', (req, res) => {
    let SQL = `INSERT INTO users (userId, userName, userEmail, userPassword) VALUES (DEFAULT, "$", "$", "$")`

    db.query((error, result) => {
        console.log(error)
    })
})*/

/*app.get('/', (req, res) => {
    let SQL = `INSERT INTO users (userFaceDescription) VALUES ("$")`

    db.query((error, result) => {
        console.log(error)
    })
})*/