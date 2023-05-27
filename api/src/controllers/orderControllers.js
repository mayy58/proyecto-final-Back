const { order, detailOrder, user, product } = require("../db");

//! Funcion auxiliar para actualizar stock

const ActualizarStock= async (id,cantidad) =>{
  try {
    const p = await product.findByPk(id)
    if(p.stock < cantidad) throw Error("No se puede una cantidad mayor")
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

//! Crear orden y Detalle de orden
const createOrderYDetail = async (arrsyOrd)=>{

  console.log(arrsyOrd);

  for (const ord of arrsyOrd) {

    const {comprador, fecha, metodoDePago, productos, total, userId } = ord;
    let use = {};
    let o = {};
    // obtengo id de usuario comprador
    try {
      use = await user.findOne({where: {email: comprador}})
      use ? console.log('Usuario Comprador Encontrado') : console.log('Usuario Comprador NO Encontrado');
    } catch (error) {
      console.error('Usuario no registrado');
      throw Error('Usuario no registrado',error);
    }
    const userCid = use.id; 

    try {
      o = await order.create({orderDate: fecha, totalAmount: total, paymentMethod: metodoDePago, userId: userCid, sellerId: userId});
      console.log('Orden creado:');
    } catch (error) {
      console.error('Error al crear la orden:');
      throw Error('Error al crear la orden:');
    }
    // ahora el detalle
    const orderId = o.id;

    // ahora guardo en la tabla detaiOrder
    for (const p of productos) {
      const {cantidad, id, price} = p;
        
      try {
          const d = await detailOrder.create({ quantity: cantidad, productId: id, orderId , purchaseprice: price});
          console.log('Detalle de orden creado:');
        } catch (error) {
          console.error('Error al crear el detalle de orden:',error);
          throw Error('Error al crear el detalle de orden:',error);
        }
      ActualizarStock(id,cantidad);
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

const getOrderDateController= async()=>{
 
 const arr = await order.findAll(
    {
      where: { 
        deleteLogic: true, 
      },
      order: [["orderDate","asc"]],
      attributes:["orderDate", "totalAmount"]
    }
  );
  const monthlyTotals = [];
  //console.log(arr)
  arr.forEach(item => {
    let anio = item.orderDate.slice(0,4)
    let mes =  item.orderDate.slice(5,7)
     console.log(anio)
    console.log(mes)
   
   // console.log(month)
    const key = `${mes}/${anio}`;

    const existingMonth = monthlyTotals.find(monthTotal => monthTotal[0] === key);

    if (existingMonth) {
      existingMonth[1] += parseFloat(item.totalAmount);
    } else {
      monthlyTotals.push([key, parseFloat(item.totalAmount)]);
    }
  });
console.log(monthlyTotals);
return monthlyTotals;
//return arr;
}


module.exports = {
  createOrderYDetail,
  updateStateOrder,
  getOrderDateController
  //updateCloseOrder
};


