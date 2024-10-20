const pool = require("../config/db/db")


const getCategories = async(req, res) => {
    try {
        const result = await pool.query("SELECT * FROM categories")
        res.status(200).json({
            message: "Success get categories",
            data: result.rows
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed get categories"
        })
    }
}
const getCategory = async(req, res) => {
    try {
        const categoryId = req.params.categoryId
        const result = await pool.query("SELECT * FROM categories WHERE id = $1", [categoryId])
        if(result.rowCount === 0) {
            throw new Error("Category data not found")
        }
        res.status(200).json({
            message: "Success get category",
            data: result.rows
        })
    } catch (error) {
        
    }
}
const addCategory = async(req, res) => {
    try {
        const { name } = req.body
        const result = await pool.query("INSERT INTO categories (name) VALUES ($1) RETURNING *", [name])
        if(result.rows.length > 0) {
            res.status(201).json({
                message: "Success add new category"
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "Failed add new category"
        })
    }
}
const updateCategory = async(req, res) => {
    try {
        const { name } = req.body
        const categoryId = req.params.categoryId
        if(!name) {
            throw new Error("All field is required")
        }
        const result = await pool.query("UPDATE categories set name = $1 WHERE id = $2", [name, categoryId])
        if(result.rowCount === 0) {
            throw new Error("Category data not found")
        }
        res.status(200).json({
            message: "Success update category"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed update category"
        })
    }
}
const deleteCategory = async(req, res) => {
    try {
        const categoryId = req.params.categoryId
        const result = await pool.query("DELETE categories WHERE id = $1", [categoryId])
        if(result.rowCount === 0) {
            throw new Error("Category data not found")
        }
        res.status(200).json({
            message: "Success delete category"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed delete category"
        })
    }
}

module.exports = {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
}