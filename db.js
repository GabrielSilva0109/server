const { Pool } = require('pg')

const host = process.env.POSTGRES_HOST
const user = process.env.POSTGRES_USER
const password = process.env.POSTGRES_PASSWORD
const database = process.env.POSTGRES_DATABASE

const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: 5432,
})

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erro ao conectar com o banco de dados:', err);
    }
    console.log('Conexão bem-sucedida com o banco de dados');
    release(); // Liberar o cliente para que possa ser reutilizado
});


module.exports = pool
