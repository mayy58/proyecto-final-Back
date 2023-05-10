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

const incrementPopularity = async (categoryId) => {
  const category = await Category.increment(
    {
      popularity: 1,
    },
    {
      where: { categoryId: categoryId },
    }
  );
  await category.save();
  console.log(
    `Se ha incrementado la popularidad de la categoría ${category.name}`
  );
};

module.exports = { allCategories, incrementPopularity };
