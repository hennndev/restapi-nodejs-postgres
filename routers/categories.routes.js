const express = require("express")
const { getCategories, getCategory, addCategory, updateCategory, deleteCategory } = require("../controllers/categories.controller")
const router = express.Router()

router.get("/api/categories", async(req, res) => await getCategories(req, res))
router.post("/api/categories", async(req, res) => await addCategory(req, res))
router.get("/api/categories/:categoryId", async(req, res) => await getCategory(req, res))
router.update("/api/categories/:categoryId", async(req, res) => await updateCategory(req, res))
router.delete("/api/categories/:categoryId", async(req, res) => await deleteCategory(req, res))


module.exports = router