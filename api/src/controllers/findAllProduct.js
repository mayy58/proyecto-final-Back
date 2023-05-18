const { product, user } = require('../db')

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