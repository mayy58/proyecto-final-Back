const { ShoppinghistoryUser, Saleshistoryuser} = require("../controllers/userControllers")


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


module.exports = {
    getShoppinghistory,
    getSalesghistory
  };