const { Op, Error } = require("sequelize");
const { user, order, Category, product, detailOrder } = require("../db");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.KEY_SENDGRID);

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
    const existingAdminByEmail = await user.findOne({
      where: {
        email: email,
      },
    });

    const existingAdminByNickname = await user.findOne({
      where: {
        nickname: nickname,
      },
    });

    if (existingAdminByEmail) {
      throw new Error("Existe un admin con el mismo correo electrónico.");
    }

    if (existingAdminByNickname) {
      throw new Error("Existe un admin con el mismo nickname.");
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

    const msg = {
      to: `${newAdmin.email}`,
      from: `tukimarket.contacto@gmail.com`,
      subject: "Bienvenido a TukiMarket",
      text: `Hola! ${newAdmin.name} Bienvenido a TukiMarket!`,
      html: `<strong>Hola ${newAdmin.name} Felicidades, eres nuestro nuevo administrador. Confiamos en ti!</strong>`,
    };

    sgMail
      .send(msg)
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });

    return { message: `Administrador ${newAdmin.name} creado con éxito` };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
const allUser = async () => {
  try {
    const users = await user.findAll({
      attributes: ["id", "name", "email", "roll", "deleteLogic"],
    });
    return users;
  } catch (error) {
    throw new Error("Error al cargar los datos");
  }
};

//const deleteSelectedUsers = async (ids) => {
//  try {
//    // Verificar si se proporcionaron IDs válidos
//    if (!Array.isArray(ids) || ids.length === 0) {
//      throw new Error("Debe seleccionar un usuario para eliminar");
//    }
//
//    for (const id of ids) {
//      await user.update({ deleteLogic: false }, { where: { id: id } });
//      await product.update({ deleteLogic: false }, { where: { userId: id } });
//    }
//    return { message: "Usuarios y productos dados de baja exitosamente" };
//  } catch (error) {
//    throw new Error(error.message);
//  }
//};

const deleteSelectedUsers = async (action, ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error(
      "Debe seleccionar al menos un usuario para realizar la acción"
    );
  }

  if (action === "delete") {
    for (const id of ids) {
      await user.update({ deleteLogic: false }, { where: { id } });
      await product.update({ deleteLogic: false }, { where: { userId: id } });
    }
    return {
      message: "Usuarios y productos marcados como eliminados",
    };
  } else if (action === "restore") {
    for (const id of ids) {
      await user.update({ deleteLogic: true }, { where: { id } });
      await product.update({ deleteLogic: true }, { where: { userId: id } });
    }
    return {
      message: "Usuarios y productos restaurados exitosamente",
    };
  } else {
    throw new Error("Acción no válida");
  }
};

const registerPercentege = async () => {
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
    return { googlePercentage, directPercentage };
  } catch (error) {
    throw new Error(error.message);
  }
};

//! Controller que busca los datos para el grafico de torta "Cantidad de productos por Categoria"
const PieChart = async () => {
  let cate = [];
  try {
    cate = await Category.findAll();
  } catch (error) {
    console.log("Error al traer categorias");
  }
  let prodxcat = [["CATEGORIA", "CANT. PRODUCTOS", { role: "style" }]];

  for (const c of cate) {
    let prod = [];

    try {
      prod = await product.findAll({
        include: {
          model: Category,
          where: { id: c.id },
        },
      });
    } catch (error) {
      console.log("Error al traer productos por categoria");
    }
    prodxcat.push([c.name, prod.length]);
  }

  return prodxcat;
};

//! Busca la cantidad de productos en oferta para tejeta de admin
const findCountSaleProduct = async () => {
  let sales = [];
  try {
    sales = await product.findAll({
      where: { isOnSale: true },
    });
  } catch (error) {
    console.log("Error al traer productos de oferta");
  }
  return sales.length;
};

//! Cant Ventas x vendedor
const findCountVentasXVendedor = async () => {
  let vend = [];
  try {
    vend = await user.findAll({
      attributes: ["id", "name"],
      where: { roll: "SELLER" },
    });
  } catch (error) {
    console.log("Error al traer los vendedores", error);
  }
  const ventXvend = [["VENDEDOR", "FACTURACION", { role: "style" }]];
  for (const v of vend) {
    try {
      vend = await order.sum("totalAmount", { where: { sellerId: v.id } });
    } catch (error) {
      console.log("ERROR", error);
    }
    if (vend === null) vend = 0;
    ventXvend.push([v.name, vend]);
  }

  console.log(ventXvend);
  return ventXvend;
};

const deliveredProducts = async () => {
  try {
    const totalVendidos = await detailOrder.sum("quantity", {
      include: [
        {
          model: order,
          where: { status: "ENTREGADO" },
          attributes: [],
        },
        {
          model: product,
          attributes: [],
        },
      ],
    });

    return totalVendidos;
  } catch (error) {
    throw Error("Error al obtener la cantidad de productos vendidos");
  }
};

module.exports = {
  createAdmin,
  allUser,
  deleteSelectedUsers,
  PieChart,
  registerPercentege,
  deliveredProducts,
  findCountVentasXVendedor,
  findCountSaleProduct,
};
