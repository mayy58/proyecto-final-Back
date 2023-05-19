const { Op } = require('sequelize'); 
const { product, Category } = require("../db")

///hecho por nelson para despues controlar en el pull marge request

const getOrderNameProductControllers = async({name, orders })=>{
    
  const productDB = await product?.findAndCountAll({
    where: { name:{ [Op.iLike]: `%${name}%` }},
    //attributes:[ "id", "img", "name", "stock", "description", "price", "isOnSale", "salePrice", "status", "deleteLogic" ],
})
    let ordersProd=[]
    if( orders === "asc" ){
      ordersProd = productDB.rows.sort((a,b)=>a.name.localeCompare(b.name))
    }else{
      ordersProd = productDB.rows.sort((a,b)=> b.name.localeCompare(a.name))
    }
    console.log(productDB)
    return productDB;

}

module.exports = getOrderNameProductControllers;