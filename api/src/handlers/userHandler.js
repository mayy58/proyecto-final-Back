const { ShoppinghistoryUser, putUserController} = require("../controllers/userControllers")


// const getUser = async (req, res) =>{
//     try {
//         //const { } = req.body;
//         const users = await findUser();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(404).json({ error: error.message });
//     }

// }
const putUserHandler =(req, res)=>{
    try {
        const { id } = req.query;
        const {name, lastname, birthDate, address, roll, deleteLogic} = req.body
        const response = putUserController({id, name, nickname})
    } catch (error) {
        
    }
}

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
module.exports = {
    getShoppinghistory,putUserHandler
  };