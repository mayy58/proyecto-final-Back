const { product , user} = require('../db')
const { Op } = require('sequelize'); 

const findByIDProduct = async (id)=>{

    // traigo el producto con ese id y el nombre de el vendedor asociado
    const prod = await product.findByPk(id, {
      where: { 
        deleteLogic: true, 
        stock: {[Op.gt]: 0,}},
      include: {
          model: user,
          attributes: ["name"],
    
        },
      });
    if (!prod) throw Error("El producto no existe");
    return prod;
}

module.exports = findByIDProduct;