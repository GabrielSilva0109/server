require('dotenv').config()
const mysql = require('mysql12')

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}/${process.env.MYSQLDATABASE}`
const connection = mysql.createConnection(urlDB)

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack)
        return
    }
    console.log('Conectado ao banco de dados como id ' + connection.threadId)
})

module.exports = connection
