
const { ShoppinghistoryUser, putUserController,getUserIdController, deleteLogicController, Saleshistoryuser} = require("../controllers/userControllers")

//! Handler que busca el historial de compra de un usuario
const getShoppinghistory = async (req, res) =>{
    try {
        const { email } = req.body;
        const shophistory = await ShoppinghistoryUser(email);
        res.status(200).json(shophistory);
    } catch (error) {
        console.log("ERROR");
        res.status(404).json({ error: error.message });
    }

}

//! Handler que busca el historial de venta de un usuario
const getSalesghistory = async (req, res) =>{
    try {
        const { email } = req.body;
        const seleshistory = await Saleshistoryuser(email);
        res.status(200).json(seleshistory);
    } catch (error) {
        console.log("ERROR");
        res.status(404).json({ error: error.message });
    }

}

// nelson
const getIdUserHandler= async(req, res)=>{
    const { id } = req.params;
    //console.log(id)
    try {
        const response = await getUserIdController(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(401).json({error:error.message})
    }
}

//solo actualiza datos que no son sensibles
const putUserHandler = async(req, res)=>{
    try {
        const { id } = req.params;
        const {name, lastName, birthDate, address, picture} = req.body
        const response = await putUserController({id, name, lastName, birthDate, address, picture})
        res.status(200).send("¡Sus datos fueron módificados con exito!")
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

//solo realiza el borrado logico de la cuenta del usuario
const deleteLogicHandler = async(req, res)=>{
    try {
        const { id } = req.params
        const { deleteLogic } = req.body
        deleteLogicController({id, deleteLogic})
        res.status(200).send("¡Su cuenta ha sido dada de baja con exito!")
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    getShoppinghistory,
    getSalesghistory,
    putUserHandler,
    getIdUserHandler,
    deleteLogicHandler

  };