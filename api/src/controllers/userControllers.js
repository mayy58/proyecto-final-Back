const { order, detailOrder, user, product } = require("../db");

const findShoppinghistoryUser = async (emailuser)=>{
    const us = await user.findOne({where: {email: emailuser}})
    const usid = us.id;
    //tal vez lo tenga que hacer al reves consultar detaill y incluir a orden, no se 
    const orderuser = order.findAll({ where:{userId: usid}});
    let history = [];
    
    for (const o of orderuser) {
        let detOrden = {}
        detOrden = {
            nroOrden: o.id,
            fecha: o.orderDate,
            total: o.totalAmount
        }
        const detail = await detailOrder.findAll({where: {orderId: o.id}})
        for (const d of detail) {
            const prod = product.findByPk({where: {id: d.productId}})
            detOrden = {
                    detalle: [...detail, {
                    nameproduct: prod.name,
                    cantidad: d.quantity,
                    precioUni: prod.price
                    }]
            }
            
        }
        
    history.push(detOrden);   
    }
    
return history;
}

module.exports = findShoppinghistoryUser;