const { popularProductByCategory, findProductUser, findProductPrice } = require("../controllers/productsControllers");


const getPopularProduct = async () => {
  try {
    const result = await popularProductByCategory();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//! Este Handler solicita los productos de un usuario a su controller
const getProductsUser = async (req, res) => {
    try {
        const { nameuser }  = req.params;
        const prod = await findProductUser(nameuser);
        res.status(200).json(prod);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }

 //! Handlers para traer los productos por un rango de precios
 const getPriceRange = async (req, res) => {
  try {
    const { max, min } = req.query;
    const prodPrice = await findProductPrice(max, min);
    res.status(200).json(prodPrice);
    
  } catch (error) {
    res.status(404).json({ error: error.message });
  }

 }

module.exports = { getPopularProduct, getProductsUser, getPriceRange};

