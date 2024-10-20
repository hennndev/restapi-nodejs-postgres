const pool = require("../config/db/db")


const getBrands = async(req, res) => {
    try {
        const result = await pool.query("SELECT * FROM brands")
        res.status(200).json({
            message: "Success get brands",
            data: result.rows
        })
     } catch (error) {
        res.status(400).json({
            message: "Failed get brands"
        })
    }
}

const addBrand = async(req, res) => {
    try {
        const { name } = req.body
        const brandName = name.toLowerCase()
        const checkExistingBrand = await pool.query("SELECT * FROM brands WHERE id = $1", [brandName])
        if(checkExistingBrand.rows > 0) {
            throw new Error("Brand already added")
        }
        await pool.query("INSERT INTO brands (name) VALUES($1) RETURNING *", [brandName])
        res.status(200).json({
            message: "Success add new brand"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed add new brand"
        })
    }
}

const updateBrand = async(req, res) => {
    try {
        const { name } = req.body
        if(!name) {
            throw new Error("Name field is required")
        }
        const brandId = req.params.brandId
        const brandName = name.toLowerCase()
        const result = await pool.query("UPDATE brands set name = $1 WHERE id = $2", [brandName, brandId])
        if(result.rowCount === 0) {
            throw new Error("Brand data not found")
        }
        res.status(200).json({
            message: "Success update brand"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed update brand"
        })
    }
}

const deleteBrand = async(req, res) => {
    try {
        const brandId = req.params.brandId
        const result = await pool.query("DELETE brands WHERE id = $1", [brandId])
        if(result.rowCount === 0) {
            throw new Error("Brand data not found")
        }
        res.status(200).json({
            message: "Success delete brand"
        })    
    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed delete brand"
        })
    }
}

module.exports = {
    getBrands,
    addBrand,
    updateBrand,
    deleteBrand
}