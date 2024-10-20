const express = require("express")
const { getBrands, addBrand, updateBrand } = require("../controllers/brands.controller")
const router = express.Router()

router.get("/api/brands", async(req, res) => await getBrands(req, res))
router.post("/api/brands", async(req, res) => await addBrand(req, res))
router.put("/api/brands/:brandId", async(req, res) => await updateBrand(req, res))
router.delete("/api/brands/:brandId", async(req, res) => await deleteBrand(req, res))

module.exports = router