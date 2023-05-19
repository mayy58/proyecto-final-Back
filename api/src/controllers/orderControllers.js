const { order, detailOrder } = require("../db");

//! Crear orden y Detalle de orden
const createOrderYDetail = async ({arrayorder})=>{
    //tiene que entrar un [{order1},{order2},{order3}]

    for (const ord of arrayorder) {
        // ord = {userid, orderDate, totalAmount, paymentMethod, products[{}, {}, {}]}
        // aca desectructurar ord
        const {userid, orderDate, totalAmount, paymentMethod, products } = ord;
        const o = await order.create({orderDate, totalAmount, paymentMethod, userid});
        const orderid = o.id;
        for (const product of products) {
            //iterador = { quantity, productid}
            // aca desectructurar product
            const {quantity, productid} = product;
            
            try {
                const createdDetailOrder = await detailOrder.create({ quantity, productid, orderid });
                console.log('Detalle de orden creado:', createdDetailOrder);
              } catch (error) {
                console.error('Error al crear el detalle de orden:', error);
              }

            try {
                await product.increment({ stock: -quantity }, { where: { id: productid }});
                // La actualización se realizó exitosamente
                console.log('Actualización de stock exitosa');
                const p = product.findByPk({where: { id: productid}});
                if(p.stock <= 0) await product.update({ deleteLogic: false}, {where: { id: productid}},)
                console.log('Borrado Logico de stock exitoso');
              } catch (error) {
                // Error durante la actualización
                console.error('Error al actualizar el stock:', error);
              }

        }
    }

    return 'Orden registrada con exito';  

}

//! Actualizar orden
const updateStateOrder = async (estado, orderid) => {
  try {
    await order.update({status: estado,}, {where: {id: orderid}});
    
    if(estado === 'ENTREGADO' || estado === 'RECHAZADO' || estado === 'CANCELADO'){
      await order.update({ deleteLogic: false,}, {where: {id: orderid}});
    }
    
    // La actualización se realizó exitosamente
    console.log('Actualización de orden exitosa');
  } catch (error) {
    // Error durante la actualización
    console.error('Error al actualizar el orden:', error);
    throw Error('Error al actualizar el orden:', error)
  }
  
}



module.exports = {
  createOrderYDetail,
  updateStateOrder,
  updateCloseOrder
};