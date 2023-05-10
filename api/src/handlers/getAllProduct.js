const findAllProduct = require("../controllers/findAllProduct");

const getAllProduct = async (req, res) => {
  try {
    const prod = await findAllProduct();
    res.status(200).json(prod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllProduct;
