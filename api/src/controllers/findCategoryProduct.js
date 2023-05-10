const { product, Category } = require('../db')
const { Op } = require("sequelize");


//! Este controller busca y retorna todos los productos
const findCategoryProduct = async (name) => {

  let prod_Categ = await Category.findAll({  
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      }
    },
    include: {
      model: product,
      attributes: [ "id", "name", "price"],
      through: { attributes: [], }, 
    }, });

  
  return prod_Categ;
}

  
module.exports = findCategoryProduct;