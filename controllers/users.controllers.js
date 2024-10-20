const pool = require("../config/db/db")

const getUsers = async(req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users")
        res.status(200).json({
            message: "Success get users",
            data: result.rows
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed get users"
        })
    }
}
const getUser = async(req, res) => {
    try {
        const userId = req.params.userId
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [userId])
        if(result.rowCount === 0) {
            throw new Error("User not found")
        }
        res.status(200).json({
            message: "Success get user",
            data: result.rows
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed get user"
        })        
    }
}
const updateUser = async(req, res) => {
    try {
        const { name } = req.body
        const userId = req.params.userId
        if(!name) throw new Error("All field is required")
        const result = await pool.query("UPDATE users set name = $1 WHERE id = $2", [name, userId])
        if(result.rowCount === 0) {
            throw new Error("User not found")
        }
        res.status(200).json({
            message: "Success update user"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed update user"
        })
    }
}
const deleteUser = async(req, res) => {
    try {
        const userId = req.params.userId
        const result = await pool.query("DELETE users WHERE id = $1", [userId])
        if(result.rowCount === 0) {
            throw new Error("User not found")
        }
        res.status(200).json({
            message: "Success delete user"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed delete user"
        })
    }
}

module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser
}