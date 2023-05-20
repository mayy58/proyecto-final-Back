const { order, detailOrder, user, product } = require("../db");

//! Crear orden y Detalle de orden
const createOrderYDetail = async (ord)=>{

        const {comprador, fecha, total, metodoDePago, productos } = ord;
        let use = {};
        let o = {};
        try {
          use = await user.findOne({where: {email: comprador}})
          console.log('Usuario Comprador Encontrado');
        } catch (error) {
          console.error('Usuario no registrado');
          throw Error('Usuario no registrado');
        }
                
        const userId = use.id;
        console.log("ID DE USUARIO:", userId);
        try {
          o = await order.create({orderDate: fecha, totalAmount: total, paymentMethod: metodoDePago, userId });
          console.log('Orden creado:');
        } catch (error) {
          console.error('Error al crear la orden:');
          throw Error('Error al crear la orden:');
        }
        
        const orderId = o.id;
        for (const prod of productos) {

            // aca desectructurar product
            const {cantidad, id} = prod;
            
            try {
                const d = await detailOrder.create({ quantity: cantidad, productId: id, orderId });
                console.log('Detalle de orden creado:');
              } catch (error) {
                console.error('Error al crear el detalle de orden:');
                throw Error('Error al crear el detalle de orden:');
              }

            try {
                const p = await product.findByPk(id)
                await p.increment('stock',{by: -cantidad } );
                // La actualización se realizó exitosamente
                console.log('Actualización de stock exitosa');
                
                if(p.stock <= 0) {
                  try {
                    await product.update({ deleteLogic: false}, {where: { id: id}},)
                    console.log('Borrado Logico de product exitoso');                    
                  } catch (error) {
                    console.error('Error actualizar borrado logico de producto:');
                    throw Error('Error actualizar borrado logico de producto:');
                  }
                }
              } catch (error) {
                // Error durante la actualización
                console.error('Error al actualizar el stock:');
                throw Error('Error al actualizar el stock:');
              }

        }

    return 'Orden registrada con exito';  

}

//! Actualizar orden
const updateStateOrder = async (estado, orderid) => {
  try {
        
    if(estado === 'ENTREGADO' || estado === 'RECHAZADO' || estado === 'CANCELADO')
      await order.update({ deleteLogic: false, status: estado,}, {where: {id: orderid}});
    
    else await order.update({status: estado,}, {where: {id: orderid}});
    
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
  //updateCloseOrder
};


// try {
  
//   console.log('Detalle de orden creado:', createdDetailOrder);
// } catch (error) {
//   console.error('Error al crear el detalle de orden:', error);
// }
