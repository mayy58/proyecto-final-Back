const { product, Category, user } = require("../db");
const { Op } = require("sequelize");
const mercadopago = require("mercadopago");
require("dotenv").config();
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

const popularProductByCategory = async (limit) => {
  try {
    // Obtener las categorías más populares ordenadas por popularidad de forma descendente
    const popularCategories = await Category.findAll({
      order: [["popularity", "DESC"]],
      limit: limit, // Limitar la cantidad de categorías populares a obtener
    });

    const popularProducts = [];

    // Iterar sobre las categorías populares
    for (const category of popularCategories) {
      // Obtener los productos asociados a la categoría actual
      const products = await product.findAll({
        include: {
          model: Category,
          where: {
            categoryId: category.id,
          },
        },
      });

      // Agregar los productos al array de productos populares
      popularProducts.push(...products);
    }

    return popularProducts;
  } catch (error) {
    console.error(
      `Error al obtener los productos de las categorías más populares: ${error}`
    );
    // Manejo del error
    return [];
  }
};

//! Este controller busca y retorna todos los productos de un usuario
const findProductUser = async (nameuser) => {

  let prod_user = await product.findAll({
    where: { 
      deleteLogic: true, 
      stock: {[Op.gt]: 0,}},
      include: {
          model: user,
          attributes: [ "name"],
          where: {
            name: {
              [Op.iLike]: `%${nameuser}%`,
            }
        },
      }}
);
return prod_user;
}

//ordena los productos
const getOrderProduct = async(orders)=>{ // tendria que recivir el orden y el nombre del producto o categiria
      const products = await product?.findAll()
      let ordersProd=[]
      if( orders === "asc" ){
        ordersProd = products.sort((a,b)=> a.price - b.price)
      }else if(orders === "desc"){
        ordersProd = products.sort((a,b)=> b.price - a.price)
      }else if(orders === "ascName"){
        ordersProd = products.sort((a,b)=> a.name - b.name)
      }else{
        ordersProd = products.sort((a,b)=> b.name - a.name)
      }

      return ordersProd;
}

//!Este controller busca los productos por rango de Precios segun una categoria
const findProdCatPrice = async (namecategory, max, min, page, size) => {

  const category = await Category.findOne({ where: { name: namecategory } });
  if(!category) throw new Error("La categoria especificada no existe")
  
  let prod_price = await product.findAndCountAll({

    include: {
      model: Category,
      where: {
        id: category.id
      },
      through: { attributes: [], }
    },
    
     where: { 
      price: { [Op.between]: [min, max], },
      deleteLogic: true, 
      stock: {[Op.gt]: 0,}
  
    },
    limit: size,
    offset: page * size
  });
  return prod_price;
}

//!Este controller busca los productos por rango de Precios segun un nombre de producto
const findNameProdPrice = async (nameproduct, max, min, page, size) => {
  let prod_price = await product.findAndCountAll({
     where: { 
      price: { [Op.between]: [min, max],  },
      name:{ [Op.iLike]: `%${nameproduct}%` },
      deleteLogic: true, 
      stock: { [Op.gt]: 0,}
    },
    limit: size,
    offset: page * size
   });
   
  return prod_price;
}

//! Controllers para cargar productos 
const createProduct = async ({ name, img, stock, description, price, isOnSale, salePrice, status, categories, email}) =>{
  const iduser = await user.findOne({where: {email: email}});
  if(!iduser) throw new Error('El usuario no esta registrado');
  const userId  = iduser.id;
  const categoryID = await Category.findOne({where: { name: categories }});
  if(!categoryID) throw new Error('Categoria Incorrecta');
  const newprod = await product.create({ 
    name, 
    img, 
    stock, 
    description, 
    price, 
    isOnSale, 
    salePrice, 
    status,
    userId
  });
  newprod.addCategories(categoryID);
  return newprod;
}
const postPagoMercadoPago = async(products)=>{
  let preference = {
    items:[],
    
    back_urls:{
      success:"http://localhost:3001",
      failure:"",
      pending:"",
    },
    auto_return: "approved",//en este caso esta aprovado el pago
    binary_mode:true,//acepta el pago pendiente
  }
  products.forEach(elem => {// aquí debo buscar en la base de datos e ir actualizando stock
    preference.items.push({
      id:elem.id,
      title:elem.name,
      category:"placa de video",
      currency_id:"ARS",//pesos argentinos
      picture_url:elem.img,
      description:elem.description,
      category_id: "art",
      quantity: 2,
      unit_price:elem.price
    })
  });
  console.log(preference)
  const dato = await mercadopago.preferences.create(preference)
  return dato;
}



module.exports = { popularProductByCategory, findProductUser, getOrderProduct, findProdCatPrice, createProduct, findNameProdPrice, postPagoMercadoPago };


