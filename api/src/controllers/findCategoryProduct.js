const { product, Category } = require('../db')
const { Op } = require("sequelize");


//! Este controller busca y retorna todos los productos de una categoria
const findCategoryProduct = async (name) => {

  let prod_Categ = await Category.findAll({  
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      }
    },
    include: {
      model: product,
      attributes: [ "id", "img", "name", "price"],
      through: { attributes: [], }, 
    }, });

  
  return prod_Categ[0].products;
}

  
module.exports = findCategoryProduct;