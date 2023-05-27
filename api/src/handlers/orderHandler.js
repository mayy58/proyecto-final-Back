const { createOrderYDetail, updateStateOrder,getOrderDateController } = require("../controllers/orderControllers")

//! Nueva orden
const setOrder = async (req, res) =>{
    try {        
        const newProduct = await createOrderYDetail(req.body);
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

}

//! Actualizar estado de orden
const updateOrder = async (req, res) => {
    try {
        const { estado, id } = req.query;
        const updateO = await updateStateOrder({estado, id});
        res.status(200).json(updateO);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
const getOrderDateHandler =async(req, res)=>{

    try {
        const dataNew = req.query
        const response = await getOrderDateController()  
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    setOrder,
    updateOrder,
    getOrderDateHandler};