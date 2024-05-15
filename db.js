const mysql = require('mysql')

const hostAWS = process.env.awsHOST
const userAWS = process.env.awsUSER
const passwordAWS = process.env.awsPASSWORD

const awsDB = mysql.createConnection({
    host: hostAWS,
    user: userAWS,
    password: passwordAWS,
    database: "vertex"
})

awsDB.connect((erro) => {
    if(erro){
        console.log("Erro Connection AWS DB", erro)
        return
    } 
    console.log("AWS DB Connection Successfull!")
})

module.exports = awsDB