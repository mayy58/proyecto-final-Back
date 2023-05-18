const { createOrder, updateOrder } = require("../controllers/orderControllers")

//! Nueva orden
const setOrder = async (req, res) =>{
    try {
        const { } = req.body;
        const newProduct = await createOrder({  });
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

}

//! Actualizar estado de orden
const updateOrder = async (req, res) => {
    try {
        const { estado, id } = req.query;
        const updateO = await updateOrder({estado, id});
        res.status(200).json(updateO);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}


module.exports = {
    setOrder,
    updateOrder};