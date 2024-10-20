const pool = require("../config/db/db")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../utils/auth")

const login = async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        if(user.rows === 0) {
            throw new Error("Email not registered")
        } else {
            const checkPassword = bcrypt.compare(password, user.data.password)
            if(!checkPassword) {
                throw new Error("Password incorrect")
            } else {
                const token = generateToken(email)
                res.status(200).json({
                    message: "Success logged in"
                })
            }
        }
    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed logged in"
        })
    }
}
const register = async(req, res) => {
    try {
        const { name, email, password } = req.body
        if(!name || !email || !password) {
            throw new Error("All field is required")
        }
        const checkExistingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        if(checkExistingUser.rows > 0) {
            throw new Error("Email already used")
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const result = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashPassword])
            if(result.rows > 0) {
                res.status(201).json({
                    message: "Success register"
                })
            }
        }
    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed register"
        })
    }
}

module.exports = {
    login, 
    register
}