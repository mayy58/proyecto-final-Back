const findCategoryProduct = require("../controllers/findCategoryProduct");

const getCategoryProduct = async (req, res) => {

  try {
    //! const VER ACA LO DE LA query    que viene del front
    const { namecategory } = req.params;
    console.log(namecategory);
    const prod = await findCategoryProduct(namecategory);
    res.status(200).json(prod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = getCategoryProduct;