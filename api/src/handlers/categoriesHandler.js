const {
  allCategories,
  incrementPopularity,
  createCategory
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

//! Handlers para cargar categorias
const setCategories = async (req, res) => {
  try {
    const { name, img} = req.body;
    const newCategory = await createCategory({ name, img });
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { getAllCategories, morePopularCategory, setCategories };
