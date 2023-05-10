

const { product, category } = require('../db')


//! Este controller busca y retorna todos los productos
const findCategoryProduct = async () => {

  let prod_Categ = await product.findAll({  
    include: {
      model: category,
      attributes: ["name"],
      through: { attributes: [], }, 
  }, });

  return prod_Categ;
}

  
module.exports = findCategoryProduct;