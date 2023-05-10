const findAllProduct = require("../controllers/findAllProduct")
const getByNameProduct = require("../controllers/getByNameProduct")

const getProduct = async (req, res) => {
    let prod={};
    try {
        const {name} = req.query;
        name ?
            prod = await getByNameProduct(name)
        :
            prod = await findAllProduct()

        res.status(200).json(prod);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }

module.exports = getProduct;