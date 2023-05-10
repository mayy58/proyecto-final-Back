const findByIDProduct = require("../controllers/findByIDProduct")

const getProductByID = async (req, res) => {
    let prod = {};
    try {
        const { id } = req.params;
        if(id){ prod = await findByIDProduct(id);}
        else throw new Error("No existe ese Producto")
        res.status(200).json(prod);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }

 module.exports = getProductByID;
 