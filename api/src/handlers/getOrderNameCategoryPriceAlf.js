const getOrderNameCategoryControllers = require("../controllers/getOrderNameCategoryControllers")


const getOrderNameCategoryPriceAlf =async(req, res)=>{
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
        const { namecategory } = req.params;
        const response = await getOrderNameCategoryControllers({ namecategory, page, size, orders })
        console.log(response)
        res.status(200).json(response)
       } catch (error) {
        res.status(400).json({error:error.message})
       }
}

module.exports = getOrderNameCategoryPriceAlf