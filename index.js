const express = require("express")
const app = express()
require('dotenv').config()

const connection = require('./config')
const userRoutes = require('./routes/UserRoutes')
const walletRoutes = require('./routes/WalletRoutes')

app.use(express.json())

app.use('/api', userRoutes, walletRoutes)

app.get("/", async (req, res, next) => {
    res.send('Bem vindo ao Servidor')
})

// connection
const port = process.env.PORT || 9001

app.listen(port, () => {
    console.log(`Listening to port ${port}`);

    // Tenta conectar ao banco de dados
    connection.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err.stack);
            return;
        }
        console.log('Conectado ao banco de dados como id ' + connection.threadId);
    });
})