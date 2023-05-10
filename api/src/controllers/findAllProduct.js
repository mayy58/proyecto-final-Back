const { product, user } = require('../db')


//! Este controller busca y retorna todos los productos
const findAllProduct = async () => {

  let products = await product.findAll({
      include: {
        model: user,
        attributes: ["name"],
        through: { attributes: [], }, 
      },
    });


  return products;
}

  
module.exports = findAllProduct;