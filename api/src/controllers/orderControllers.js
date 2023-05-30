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
      use = await user.findOne({where: {email: comprador.email}})
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
const updateStateOrder = async (estado, id) => {
  try {
        
    if(estado === 'ENVIADO')
          await order.update({status: estado,}, {where: {id: id}});
    else 
          await order.update({ deleteLogic: false, status: estado,}, {where: {id: id}});
    
    // La actualización se realizó exitosamente
    console.log('Actualización de orden exitosa');
  } catch (error) {
    // Error durante la actualización
    console.error('Error al actualizar el orden:', error);
    throw Error('Error al actualizar el orden:', error)
  }
  return 'Actualización de orden exitosa';
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
    //let anio = item.orderDate.slice(0,4)
    let mes =  item.orderDate.slice(5,7)
     //console.log(anio)
    //console.log(mes)
   
   // console.log(month)
    const key = `${mes}`;

    const existingMonth = monthlyTotals.find(monthTotal => monthTotal[0] === key);

    if (existingMonth) {
      existingMonth[1] += parseFloat(item.totalAmount);
    } else {
      monthlyTotals.push([key, parseFloat(item.totalAmount)]);
    }
  });
  const arregloNuevo = [];

  for (let i = 0; i < monthlyTotals.length; i++) {
    const elemento = monthlyTotals[i];
    const codigo = elemento[0];
    let mes;
    let importe = elemento[1];
  
    switch (codigo) {
      case '01':
        mes = 'Enero';
        break;
      case '02':
        mes = 'Febrero';
        break;
      case '03':
        mes = 'Marzo';
        break;
      case '04':
        mes = 'Abril';
        break;
      case '05':
        mes = 'Mayo';
        break;
      case '06':
        mes = "Junio";
        break;
      case '07':
        mes = "Julio";
        break;
      case '08':
        mes = "Agosto";
      case '09':
        mes = 'Setiembre';
        break;
      case '10':
        mes = "Octubre";
        break;
      case '11':
        mes = "Noviembre";
        break;
      case '12':
        mes = "Diciembre";
       break;
    }
  
    arregloNuevo.push([ mes, importe]);
  }
// console.log(arregloNuevo);
// return arregloNuevo;
return arregloNuevo;
}


module.exports = {
  createOrderYDetail,
  updateStateOrder,
  getOrderDateController
  //updateCloseOrder
};

