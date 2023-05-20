const { findUser, findShoppinghistoryUser} = require("../controllers/userControllers")


const getUser = async (req, res) =>{
    try {
        const { } = req.body;
        const users = await findUser({  });
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

}


const getShoppinghistory = async (req, res) =>{
    try {
        const { useremail } = req.body;
        const shophistory = await findShoppinghistoryUser({ useremail });
        res.status(200).json(shophistory);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

}

module.exports = { getUser, getShoppinghistory}