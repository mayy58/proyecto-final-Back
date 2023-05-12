const { product, Category } = require('../db');

//! Este controller busca y retorna todos los productos
const findCategoryProduct = async (catname, page, size) => {

  const category = await Category.findOne({ where: { name: catname } });
  if(!category) throw new Error("La categoria especificada no existe")

  const prod_categ = await product.findAndCountAll({
    include: {
      model: Category,
      where: {
        id: category.id
      },
      through: { attributes: [] }
    },
    limit: size,
    offset: page * size
  });

  return prod_categ;
}

  
module.exports = findCategoryProduct;