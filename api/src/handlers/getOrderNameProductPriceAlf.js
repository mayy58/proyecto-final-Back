const getOrderNameProductControllers = require("../controllers/getOrderNameProductControllers")

const getOrderNameProductPriceAlf = async(req, res)=>{
    try {
        const { name, orders } = await req.query
        
        const response = await getOrderNameProductControllers({ name, orders })
         console.log(response)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).send("Error de información")
    }

}

module.exports = getOrderNameProductPriceAlf;