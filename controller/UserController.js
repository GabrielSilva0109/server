const connection = require('../config')

const getUsers = (req, res) => {
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json(results);
    })
}

const getUserById = (req, res) => {
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json(results);
    })
}

const createUser = (req, res) => {
    const { name, password, email, birth, cpf, cep } = req.body

    if (!name || !password || !email) {
        return res.status(400).json({ error: 'Required fields' })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    connection.query("INSERT INTO users (`name`, `password`,`email`,`birth`, `cpf`, `cep`) VALUES (?,?,?,?,?,?);", [name, hashedPassword, email, birth, cpf, cep], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ id: results.insertId, name, email });
    })
}


module.exports = {
    getUsers,
    getUserById,
    createUser,
};