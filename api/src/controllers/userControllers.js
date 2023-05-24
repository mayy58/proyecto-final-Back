const { order, detailOrder, user, product } = require("../db");

//! Devuelve el historial de compra de un usuario
const ShoppinghistoryUser = async (email)=>{

    let us={};
    try {
        us = await user.findOne({where: {email: email}});
        console.log("Usuario Encontrado");
    } catch (error) {
        throw Error("Error al buscar usuario", error);
    }

    let orderuser =[];
    try {
        orderuser = await order.findAll({ 
            where:{userId: us.id},
            include: {
                model: detailOrder,
                attributes: ["quantity", "purchaseprice"],
                include: {
                    model: product,
                    attributes: [ "name", "img" ],
                }
            }
        });
        console.log("Ordenes de compras encontradas");
    } catch (error) {
        throw Error("Error al buscar ordenes de compras del usuario", error);
    }

    return orderuser;
    
}

//! Devuelve el historial de ventas de un usuario
//! Falta probar
const Saleshistoryuser = async (email) =>{

    //* busco primero el id del usuario
    let us={};
    try {
        us = await user.findOne({where: {email: email}});
        console.log("Usuario Encontrado");
    } catch (error) {
        throw Error("Error al buscar usuario", error);
    }
    const usid = us.id;

    //* buscar todas las ordenes de ese vendedor
    let or = []
    try {
        or = await order.findAll({ 
            where: { sellerId: usid},
            include: {
                model: detailOrder,       
            }
        });
        console.log("Orden y Detalle encontrado con exito");
    } catch (error) {
        console.log("Error al buscar ordenes con detalles");
        throw Error("Error al buscar ordenes con detalles", error);
    }

    //* or deberia tener todas las ordenes con sus detalles de ese vendedor
    return or;

}


module.exports = { ShoppinghistoryUser, Saleshistoryuser };
