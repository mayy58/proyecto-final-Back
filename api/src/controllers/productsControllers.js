const { product, Category, user } = require("../db");
const { Op } = require("sequelize");

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

//! Este controller busca y retorna todos los productos de un usuario
const findProductUser = async (nameuser) => {

  let prod_user = await product.findAll({
      include: {
          model: user,
          attributes: [ "name"],
          where: {
            name: {
              [Op.iLike]: `%${nameuser}%`,
            }
        },
      }}
);

return prod_user;
}

//!Este controller busca los productos por rango de Precios
const findProductPrice = async (max, min) => {
  let prod_price = await product.findAll({
     where: { 
      price: {
        [Op.between]: [min, max],
      }
    }});
  return prod_price;
}

module.exports = { popularProductByCategory, findProductUser, findProductPrice };

