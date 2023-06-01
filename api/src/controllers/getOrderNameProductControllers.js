const { Op } = require('sequelize'); 
const { product, Category } = require("../db")

///hecho por nelson para despues controlar en el pull marge request

const getOrderNameProductControllers = async({ nameproduct,size, page, orders })=>{
  //console.log({nameproduct, page, size, orders})
    
  
  let name = "name"
    if(orders==="ascPrice"){ //ordena por precio
      name = "price"
      orders= "ASC"
    }else  if(orders==="descPrice"){
      name = "price"
      orders= "DESC"
    }
    if(orders==="asc"){ // orderna por name
      orders= "ASC"
    }else if(orders==="desc"){
      orders= "DESC"
    }

   // console.log(name, orders)
    const productDB = await product?.findAndCountAll({
      where: { 
        name:{ [Op.iLike]: `%${nameproduct}%` },
        deleteLogic: true, 
        stock: { [Op.gt]: 0,}
      },
      include: {
        model: Category,
        attributes: ["name"],
        through: {
            attributes: [],
        },
    },
      order: [[`${name}`, `${orders}`]],
      attributes:[ "id", "img", "name", "stock", "description", "price", "isOnSale", "salePrice", "status", "deleteLogic", "userId" ],
      limit: size,
      offset: page * size,
    })
  return productDB;

}

module.exports = getOrderNameProductControllers;