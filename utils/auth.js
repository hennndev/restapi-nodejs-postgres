const jwt = require("jsonwebtoken")

const generateToken = (key, secret, expiresTime) => {
    return jwt.sign({[key]: key}, secret, {expiresIn: expiresTime})
}

module.exports = {
    generateToken
}