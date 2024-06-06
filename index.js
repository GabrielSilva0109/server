const express = require("express")
const cors = require('cors')
const app = express()
require('dotenv').config()

const corsOptions = {
    origin: 'https://vertex-tecno.vercel.app', 
    optionsSuccessStatus: 200 
}

// Use o middleware cors com as opções definidas
app.use(cors(corsOptions))

const connection = require('./config')
const userRoutes = require('./routes/UserRoutes')
const walletRoutes = require('./routes/WalletRoutes')
const ativosRoutes = require('./routes/AtivosRoutes')
const despesasRoutes = require('./routes/DespesasRoutes')
const investimentosRoutes = require('./routes/InvestimentoRoutes')

app.use(express.json())

app.use('/api', userRoutes, walletRoutes, ativosRoutes, despesasRoutes, investimentosRoutes)

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