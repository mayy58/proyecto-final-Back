const getOrderNameCategoryControllers = require("../controllers/getOrderNameCategoryControllers")


const getOrderNameCategoryPriceAlf =async(req, res)=>{
       try {
        const { name, orders } = req.query
        const response = await getOrderNameCategoryControllers({ name, orders })
        console.log(response)
        res.status(200).json(response)
       } catch (error) {
        res.status(400).json({error:error.message})
       }
}

module.exports = getOrderNameCategoryPriceAlf