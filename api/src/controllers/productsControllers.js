const { product, Category, user, review } = require("../db");
const { Op } = require("sequelize");
const mercadopago = require("mercadopago");
require("dotenv").config();
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

//! Este controller busca y retorna todos los productos ACTIVOS de un usuario

const findProductActiveUser = async (useremail) => {
  let prod_active = []
  try {
    prod_active = await product.findAll({
      where: { 
        deleteLogic: true, 
        stock: {[Op.gt]: 0,}},
        include: {
            model: user,
            attributes: [ "name"],
            where: {
              email: useremail
          },
        }}
  );
  } catch (error) {
    console.log("Error al buscar los productos activos");
  }

  return prod_active;
}

//! Este controller busca y retorna todos los productos INACTIVOS de un usuario
const findProductInactiveUser = async (useremail) => {
  let prod_inactive = [];
  try {
    prod_inactive = await product.findAll({
      where: { 
        deleteLogic: false, 
      },
        include: {
            model: user,
            attributes: [ "name"],
            where: {
              email: useremail
          },
        }}
      );
  } catch (error) {
    console.log("Error al buscar los productos inactivos");
  }

  return  prod_inactive;
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
      stock: { [Op.gt]: 0,},
    },
    include: {
      model: Category,
      attributes: ["id", "name"],
      through: { attributes: [], }
    },

    limit: size,
    offset: page * size
   });
   
  return prod_price;
}

//! Controllers para cargar productos 
const createProduct = async ({ name, img, stock, description, price, isOnSale, salePrice, status, categories, email}) =>{
  let iduser = {};
  try {
    iduser = await user.findOne({where: {email: email}});
    console.log("Usuario encontrado");
  } catch (error) {
    throw new Error('El usuario no esta registrado', error);
  }
  const userId  = iduser.id;
  // le cambio el rol al usuario a vendedor
  try {
    await user.update({ roll: 'SELLER', }, { where: { id: userId,} });
    console.log("Actualizacion realizada");
  } catch (error) {
    throw new Error('Error al actualizar usuario a SELLER', error);
  }
  let categoryID = {}
  try {
    categoryID = await Category.findOne({where: { name: categories }});
    console.log("Categoria encontrada");
  } catch (error) {
    throw new Error('Categoria Incorrecta', error);
  }
  
  let newprod={};
  try {
    newprod = await product.create({ 
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
    console.log("Creacion de producto Realizado");
  } catch (error) {
    throw new Error("Error en la Creacion de producto", error);
  }
    
  newprod.addCategories(categoryID);
  console.log("Relacion con tabla categoria realizada");
  return newprod;
}

  //! Controller para cargar review de producto

  const createReviewProduct = async (id, punctuationproduct, coment) => {
    try {
      const newReview = await review.create({punctuationproduct, coment, productId: id})
    } catch (error) {
      console.log("Error en la creacion del review");
      throw Error("Error en la creacion del review");
    }
    return "Review cargado exitosamente"
  }

//! Controller para buscar un review

const findReviewProduct = (id) => {
  try {
    const review = review.findAll({where: {productId: id}})
  } catch (error) {
    console.log("Error en la buscar el review");
    throw Error("Error en la buscar el review");
  }

  return review;

}

// Update Productos
const updateProductController = async ({
  id,
  name,
  img,
  stock,
  description,
  price,
  isOnSale,
  salePrice,
  status,
  deleteLogic,
  categories,
  email,
  
}) => {

  const idProducto = parseInt(id) 
  const iduser = await user.findOne({where: {email: email}});
  if(!iduser) throw new Error('El usuario no esta registrado');
  const userId  = iduser.id;
  const idCategory = await Category.findOne({ where: { name: categories } });
  const productInstance = await product.findByPk(idProducto);//Esto permite obtener el id del producto despues de eso obtenemos a que categoria esta relacionado este producto
  if (!idCategory) throw new Error('Categoría incorrecta');
  const updateprod = await product.update(
    {
      img,
      name,
      stock,
      description,
      price,
      isOnSale,
      salePrice,
      status,
      deleteLogic,
      userId
    },
    {
      where: {
        id: idProducto
      }
    }
  );
  
  await productInstance.addCategories(idCategory);// Aqui agregamos a esta instancia el idCategoria 
  //a la tabla categoría de acuerdo al id del producto cuando la relaciones es de muchos a muchas
  
  return updateprod;
};


//************************************** */
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

const postPagoMercadoPago = async(products)=>{
  let preference = {
    items:[],

    back_urls:{
      success:"http://localhost:3001",
      failure:"",
      pending:"",
    },
    auto_return: "approved",//en este caso esta aprobado el pago
    binary_mode:true,//en este caso no se acepta el pago pendiente
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


module.exports = { 
  popularProductByCategory, 
  findProductInactiveUser, 
  findProductActiveUser,
  getOrderProduct, 
  findProdCatPrice, 
  createProduct, 
  findNameProdPrice, 
  postPagoMercadoPago, 
  updateProductController,
  createReviewProduct,
  findReviewProduct
 };


