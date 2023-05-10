const popularProductByCategory = require("../controllers/productsControllers");

const getPopularProduct = async () => {
  try {
    const result = await popularProductByCategory();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getPopularProduct };
