const pool = require("../config/db/db")

const getProducts = async(req, res) => {
    try {
        const query = `
            SELECT  p.id as id,
                    p.name as name,
                    p.price as price,
                    p.description as description,
                    p.createdAt as created_at,
                    c.name as category,
                    b.name as brand
            FROM products AS p
            JOIN categories AS c ON p.categoryId = c.id
            JOIN brands AS b ON p.brandId = b.id
            ORDER BY createdAt DESC 
        `
        const result = await pool.query(query);
        res.status(200).json({
            message: "Success get products",
            data: result.rows
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Failed get products"
        })
    }
}
const getProduct = async(req, res) => {
    try {
        const productId = req.params.productId
        const query = `
            SELECT  p.id as id,
                    p.name as name,
                    p.price as price,
                    p.description as description,
                    p.createdAt as created_at,
                    c.name as category,
                    b.name as brand
            FROM products as p
            JOIN categories as c ON p.categoryId = c.id
            JOIN brands as b ON b.brandId = b.id
            WHERE p.id = ${productId}
        `
        const result = await pool.query(query)
        if(result.rows.length === 0) {
            throw new Error("Product not found")
        }
        res.status(200).json({
            message: "Success get product",
            data: result.rows
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed get product."
        })        
    }
}
const addProduct = async(req, res) => {
    try {
        const { name, price, categoryId, description } = req.body
        const result = await pool.query("INSERT INTO products (name, price, categoryId, description) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, price, categoryId, description]
        )
        if(result.rows.length > 0) {
            res.status(201).json({
                message: "Success add new product"
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "Failed add new product"
        })
    }
}
const updateProduct = async(req, res) => {
    try {
        const { name, price, category, description } = req.body
        const productId = req.params.productId
        if(!name || !price || !category || !description) {
            throw new Error("All field is required")
        }
        const result = await pool.query("UPDATE products set name = $1, price = $2, category = $3, description = $4 WHERE id = $5",
            [name, price, category, description, productId]
        )
        if(result.rowCount === 0) {
            throw new Error("Product not found")
        }
        res.status(200).json({
            message: `Success update product with ID = ${productId}`
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed update product"
        })
    }
}
const deleteProduct = async(req, res) => {
    try {
        const productId = req.params.productId
        const result = await pool.query("DELETE FROM users WHERE id = $1", [productId])
        if(result.rows.length > 0) {
            res.status(200).json({
                message: `Success delete product with ID = ${productId}`
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "Failed delete product"
        })
    }
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}