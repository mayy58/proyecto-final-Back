const { Category } = require("../db");

const allCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ["name", "img"],
    });
    return categories;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
};

module.exports = { allCategories };
