const awsDB = require('../db');

exports.getUsers = (req, res) => {
    const q = "SELECT * FROM users;";

    awsDB.query(q, (error, data) => {
        if (error) return res.status(500).json({ error: 'Erro no servidor AWS' });
        return res.status(200).json(data);
    });
};
