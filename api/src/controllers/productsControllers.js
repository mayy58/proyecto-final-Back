const { product, Category } = require("../db");

const popularProductByCategory = async (limit) => {
  try {
    // Obtener las categorías más populares ordenadas por popularidad de forma descendente
    const popularCategories = await Category.findAll({
      order: [["popularity", "DESC"]],
      limit: limit, // Limitar la cantidad de categorías populares a obtener
    });

    const popularProducts = [];

    // Iterar sobre las categorías populares
    for (const category of popularCategories) {
      // Obtener los productos asociados a la categoría actual
      const products = await product.findAll({
        include: {
          model: Category,
          where: {
            categoryId: category.id,
          },
        },
      });

      // Agregar los productos al array de productos populares
      popularProducts.push(...products);
    }

    return popularProducts;
  } catch (error) {
    console.error(
      `Error al obtener los productos de las categorías más populares: ${error}`
    );
    // Manejo del error
    return [];
  }
};

module.exports = popularProductByCategory;