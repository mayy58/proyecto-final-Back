const getOrderNameProductControllers = require("../controllers/getOrderNameProductControllers")

const getOrderNameProductPriceAlf = async(req, res)=>{
          //* paginado
          const pageAsNumber = Number.parseInt(req.query.page);
          const sizeAsNumbre = Number.parseInt(req.query.size);
   
          let page = 0;
          if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) 
                 page = pageAsNumber;
   
          let size = 6;
          if(!Number.isNaN(sizeAsNumbre) && sizeAsNumbre > 0 && sizeAsNumbre < 10) 
                 size = sizeAsNumbre;
   
       //** */
    try {

        const { orders } = req.query;
        const { nameproduct } = req.params;
        
        const response = await getOrderNameProductControllers({ nameproduct, size, page, orders })
         console.log(response)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).send("Error de información")
    }

}

module.exports = getOrderNameProductPriceAlf;