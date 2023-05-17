const { product, user } = require('../db')

const findAllProduct = async (page, size) => {

  let products = await product?.findAndCountAll({
      where: { 
        deleteLogic: true, 
        stock: {[Op.gt]: 0,}},
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