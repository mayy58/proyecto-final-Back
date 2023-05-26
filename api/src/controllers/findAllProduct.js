const { product } = require('../db')


const findAllProduct = async () => {

  let products = await product?.findAll({
    where: {
      deleteLogic: true,
    },
 
    attributes: ["id","name"]});
  return products;
}

  
module.exports = findAllProduct;