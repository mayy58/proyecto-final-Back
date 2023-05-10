const { allCategories } = require("../controllers/categoriesControllers");

const getAllCategories = async (req, res) => {
  try {
    const result = await allCategories();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getAllCategories };
