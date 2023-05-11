const { product , user} = require('../db')

const findByIDProduct = async (id)=>{

    // traigo el producto con ese id y el nombre de el vendedor asociado
    const prod = await product.findByPk(id, {
        include: {
          model: user,
          attributes: ["name"],
    
        },
      });
    if (!prod) throw Error("El producto no existe");
    return prod;
}

module.exports = findByIDProduct;