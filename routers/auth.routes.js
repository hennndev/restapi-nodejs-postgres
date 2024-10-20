const express = require("express")
const router = express.Router()
const { login, register } = require("../controllers/auth.controllers")

router.post("/api/auth/login", async(req, res) => await login(req, res))
router.post("/api/auth/register", async(req, res) => await register(req, res))

module.exports = router