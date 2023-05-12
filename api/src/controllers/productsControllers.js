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

//ordena los productos
const getOrderProduct = async(orders)=>{
      const products = await product?.findAll()
      let ordersProd=[]
      if( orders === "asc" ){
        ordersProd = products.sort((a,b)=> a.price - b.price)
      }else if(orders === "desc"){
        ordersProd = products.sort((a,b)=> b.price - a.price)
      }else if(orders === "ascName"){
        ordersProd = products.sort((a,b)=> a.name - b.name)
      }else{
        ordersProd = products.sort((a,b)=> b.name - a.name)
      }

      return ordersProd;
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


//! Controllers para cargar productos **** voy a suponer que me mandan el nombre de la categoria y no el ID pero si el id del usuario que lo carga
const createProduct = async ({ name, img, stock, description, price, isOnSale, salePrice, status, category, userId}) =>{

  const categoryID = await Category.findOne({where: { name: category }});
  const newprod = await product.create({ 
    name, 
    img, 
    stock, 
    description, 
    price, 
    isOnSale, 
    salePrice, 
    status,
    userId
  });
  newprod.addCategories(categoryID);
  return newprod;
}



module.exports = { popularProductByCategory, findProductUser, getOrderProduct, findProductPrice, createProduct };


