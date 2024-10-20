const express = require("express")
const app = express()
const authRoutes = require("./routers/auth.routes")
const categoriesRoutes = require("./routers/categories.routes")
const productsRoutes = require("./routers/products.routes")
const usersRoutes = require("./routers/users.routes")
require("dotenv").config({})

app.use(express.json())
app.use(authRoutes)
app.use(productsRoutes)
app.use(categoriesRoutes)
app.use(usersRoutes)
app.listen(process.env.PORT || 4000, () => console.log("Server has been created"))