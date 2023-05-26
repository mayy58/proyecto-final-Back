const { user, order, Category, product } = require("../db");

const createAdmin = async (req, res) => {
  const { email, password, name, lastName, birthDate, address, nickname } =
    req.body;
  try {
    const existingAdmin = await user.findOne({
      where: {
        email: email,
        roll: "ADMIN",
      },
    });
    if (existingAdmin) {
      return res.status(409).json({
        message: "Ya existe un admin con el mismo correo electrónico.",
      });
    } else {
      const newAdmin = await user.create({
        email: email,
        password: password,
        name: name,
        lastName: lastName,
        birthDate: birthDate,
        address: address,
        nickname: nickname,
        roll: "ADMIN",
      });
      return res
        .status(200)
        .json({ message: `Administrador ${newAdmin.name} creado con éxito` });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const allUser = async (req, res) => {
  try {
    const { status } = req.query;

    let whereClause = {};

    if (status === "active") {
      whereClause.deleteLogic = true;
    } else if (status === "inactive") {
      whereClause.deleteLogic = false;
    }

    const allUsers = await user.findAll({
      where: whereClause,
      attributes: ["id", "nickname", "email", "deleteLogic", "roll"],
    });
    return res.status(200).json(allUsers);
  } catch (error) {
    throw new Error("Error en el servidor");
  }
};

const deleteSelectedUsers = async (ids) => {
  try {
    // Verificar si se proporcionaron IDs válidos
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error("Debe seleccionar un usuario para eliminar");
    }

    for (const id of ids) {
      await user.update({ deleteLogic: false }, { where: { id: id } });
    }
    return { message: "Usuarios eliminados exitosamente" };
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getMoreSell = async (req, res) => {
  try {
    const result = await order.findAll({
      attributes: [[sequelize.literal("COUNT(*)"), "totalSold"], "categoryId"],
      include: {
        model: Category,
        attributes: ["name"],
      },
      group: ["categoryId"],
      raw: true,
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Hubo un error al obtener los productos vendidos por categoría",
    });
  }
};


//! Controller que busca los datos para el grafico de torta "Cantidad de productos por Categoria"
 const PieChart = async () => {
  let cate=[]
  try {
      cate = await Category.findAll();
  } catch (error) {
      console.log("Error al traer categorias")
  }
  let prodxcat = [["CATEGORIA", "CANT. PRODUCTOS", { role: "style" }]];
  // este de abajo para la libreria Chart.js, el de arriba para google chart
  //let prodxcat = [];
  for(const c of cate){
    let prod=[]
    try {
      prod = await product.findAll({
        include:{
          model:Category,
          where: {id: c.id}
        }
      })
    } catch (error) {
      console.log("Error al traer productos por categoria")
    }
    prodxcat.push([c.name, prod.length]);
    // este de abajo para la libreria Chart.js, el de arriba para google chart
    //prodxcat.push({ category: c.name, cantprod: prod.length});
  }

  return prodxcat;

 };



module.exports = { createAdmin, allUser, deleteSelectedUsers, getMoreSell, PieChart };
