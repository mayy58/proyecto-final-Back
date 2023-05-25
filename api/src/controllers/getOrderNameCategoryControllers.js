const { Op } = require('sequelize'); 
const { product, Category } = require("../db")


///hecho por nelson para despues controlar en el pull marge request
const  getOrderNameCategoryControllers =async({namecategory, page, size, orders})=>{
 
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
  console.log({name,orders})
  const cat = await Category?.findOne({ where: { name:{ [Op.iLike]: `%${namecategory}%` }}},)
  const idCategory = cat.id
  const productDB = await product?.findAndCountAll({
    order: [[`${name}`, `${orders}`]],
    where :{    deleteLogic: true, 
      stock: { [Op.gt]: 0,},
    },
    include: {
      model: Category,
      attributes: ["name"],
      where: {
        id: idCategory
      },
      through: { attributes: [] }
    },
    //attributes:[ "id", "img", "name", "stock", "description", "price", "isOnSale", "salePrice", "status", "deleteLogic" ],
    limit: size,
    offset: page * size
})
  return productDB;

}

module.exports= getOrderNameCategoryControllers;