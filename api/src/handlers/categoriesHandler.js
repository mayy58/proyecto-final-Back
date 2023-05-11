const {
  allCategories,
  incrementPopularity,
} = require("../controllers/categoriesControllers");

const getAllCategories = async (req, res) => {
  try {
    const result = await allCategories();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const morePopularCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await incrementPopularity(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getAllCategories, morePopularCategory };
