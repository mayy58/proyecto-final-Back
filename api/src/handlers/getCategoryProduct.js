const findCategoryProduct = require("../controllers/findCategoryProduct")

const getCategoryProduct = async (req, res) => {
    try {
        //! const VER ACA LO DE LA query    que viene del front
        const { name } = req.query;
        const prod = await findCategoryProduct(name);
        res.status(200).json(prod);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }

 module.exports = getCategoryProduct;
 