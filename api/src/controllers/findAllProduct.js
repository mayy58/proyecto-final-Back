const { product, user } = require('../db')


//! Este controller busca y retorna todos los productos
const findAllProduct = async () => {

  let products = await product?.findAll({
      include: {
        model: user,
        attributes: ["name"],
  
      },
    });


  return products;
}

  
module.exports = findAllProduct;