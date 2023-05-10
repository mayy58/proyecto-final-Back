const { Op } = require('sequelize'); 
const { product } = require("../db")

const getByNameProduct = async (name)=>{

    //Buscamos en la base de datos si el nombre se encuentra
    const productDB = await product?.findAll({
       
        where: { name:{ [Op.iLike]: `%${name}%` }},
        attributes:[ "id", "img", "name", "stock", "description", "price", "isOnSale", "salePrice", "status", "deleteLogic" ],
    })
   //console.log(productDB)
    return productDB;
}

module.exports = getByNameProduct;