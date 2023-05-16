const { product, user } = require('../db')

const findAllProduct = async () => {

  let products = await product?.findAndCountAll({
      include: {
        model: user,
        attributes: ["name"],
      },
      limit: size,
      offset: page * size
    });

  return products;
}

  
module.exports = findAllProduct;