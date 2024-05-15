const awsDB = require('../db')

export const getUsers = (req, res) => {
    const q =  "SELECT * FROM users;"

    awsDB.query(q, (error, data) => {
        if (error) return res.status(500).json({ error: 'Erro in server AWS' })
        return res.status(200).json(data)
    })
}