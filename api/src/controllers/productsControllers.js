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

////////ECHO POR NELSON  ////////////////////////
const getOrderPriceProduct = async(orders)=>{
      const products = await product?.findAll()
      let orderPrice=[]
      if( orders === "asc" ){
        orderPrice = products.sort((a,b)=> a.price - b.price)
      }else{
        orderPrice = products.sort((a,b)=> b.price - a.price)
      }
      return orderPrice;
}


module.exports = { popularProductByCategory, findProductUser, getOrderPriceProduct };

