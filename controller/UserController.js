const connection = require('../config')

const getUsers = (req, res) => {
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json(results);
    });
};

module.exports = {
    getUsers
};