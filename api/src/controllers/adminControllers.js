

const { Op } = require("sequelize");

const { user, order, Category, product } = require("../db");


const createAdmin = async (
  picture,
  email,
  password,
  name,
  lastName,
  birthDate,
  address,
  nickname
) => {
  try {
    const existingAdmin = await user.findOne({
      where: {
        email: email,
        nickname: nickname,
      },
    });
    if (existingAdmin) {
      throw new Error("Existe un admin con el mismo correo electrónico.");
    }

    const newAdmin = await user.create({
      email: email,
      password: password,
      name: name,
      lastName: lastName,
      birthDate: birthDate,
      address: address,
      nickname: nickname,
      picture: picture,
      roll: "ADMIN",
    });

    return { message: `Administrador ${newAdmin.name} creado con éxito` };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const allUser = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: ["id", "name", "email", "roll", "deleteLogic"],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    throw new Error(error.message);
  }
};

const registerPercentege = async (req, res) => {
  try {
    const totalUsers = await user.count();
    console.log(totalUsers);
    const googleUsers = await user.count({
      where: { googleId: { [Op.not]: null } },
    });
    console.log(googleUsers);
    const directUsers = totalUsers - googleUsers;

    const googlePercentage = (googleUsers / totalUsers) * 100;
    const directPercentage = (directUsers / totalUsers) * 100;
    console.log(googlePercentage);
    console.log(directPercentage);
    return res.status(200).json({ googlePercentage, directPercentage });
  } catch (error) {
    return res.status(500).json({ error: error.message });
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



module.exports = { createAdmin, allUser, deleteSelectedUsers, PieChart,  registerPercentege, };

