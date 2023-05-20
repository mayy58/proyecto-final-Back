const { createOrderYDetail, updateStateOrder } = require("../controllers/orderControllers")

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


module.exports = {
    setOrder,
    updateOrder};