const findAllProduct = require("../controllers/findAllProduct")
const getByNameProduct = require("../controllers/getByNameProduct")

const getProduct = async (req, res) => {
    //* paginado
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumbre = Number.parseInt(req.query.size);
    
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) 
        page = pageAsNumber;
    
    let size = 6;
    if(!Number.isNaN(sizeAsNumbre) && sizeAsNumbre > 0 && sizeAsNumbre < 10) 
        size = sizeAsNumbre;
    
    //****** */
    let prod={};
    try {
        const {name} = req.query;
        name ?
            prod = await getByNameProduct(name, page, size)
        :
            prod = await findAllProduct() // a esta no le agrego paginado porque no se ha solicitado aun

        res.status(200).json(prod);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }


module.exports = getProduct;



