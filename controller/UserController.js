const pool = require("../database/index")

const userController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from user")
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }
}

module.exports = userController