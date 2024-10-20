const express = require("express")
const router = express.Router()
const { getProducts, getProduct, addProduct, updateProduct, deleteProduct } = require("../controllers/products.controllers")

router.get("/api/products", async(req, res) => await getProducts(req, res))
router.post("/api/products", async(req, res) =>  await addProduct(req, res))
router.get("/api/products/:productId", async(req, res) => await getProduct(req, res))
router.put("/api/products/:productId", async(req, res) => await updateProduct(req, res))
router.delete("/api/products/:productId", async(req, res) => await deleteProduct(req, res))

module.exports = router